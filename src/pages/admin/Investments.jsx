import { useEffect, useState } from 'react';
import { 
  BiTransferAlt, 
  BiFilterAlt, 
  BiSearch, 
  BiCalendar,
  BiTrendingUp,
  BiWallet,
  BiTime,
  BiCheckCircle,
  BiXCircle,
  BiLoaderCircle
} from 'react-icons/bi';
import moment from 'moment';
import axios from '../../lib/axios';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import SelectField from '../../components/common/SelectField';
import EmptyState from '../../components/common/EmptyState';
import StatsCard from '../../components/common/StatsCard';

export default function Investments({ auth }) {
    const [investments, setInvestments] = useState([]);
    const [filteredInvestments, setFilteredInvestments] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        status: 'all',
        dateRange: 'all',
        plan: 'all'
    });
    const [stats, setStats] = useState({
        totalInvested: 0,
        totalProfit: 0,
        activeInvestments: 0
    });

    const fetchInvestments = async () => {
        try {
            setProcessing(true);
            const res = await axios.get('api/v1/investments');
            setInvestments(res.data.data.investments);
            setFilteredInvestments(res.data.data.investments);
            calculateStats(res.data.data.investments);
            setFetched(true);
        } catch (error) {
            console.log(error);
        } finally {
            setProcessing(false);
        }
    };

    const calculateStats = (investments) => {
        const totalInvested = investments.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
        const totalProfit = investments.reduce((sum, inv) => sum + parseFloat(inv.profit || 0), 0);
        const activeInvestments = investments.filter(inv => inv.status === 'active').length;
        
        setStats({
            totalInvested,
            totalProfit,
            activeInvestments
        });
    };

    const applyFilters = () => {
        let result = [...investments];
        
        // Apply status filter
        if (filters.status !== 'all') {
            result = result.filter(inv => inv.status === filters.status);
        }
        
        // Apply search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(inv => 
                inv.user.name.toLowerCase().includes(term) || 
                inv.plan?.name?.toLowerCase().includes(term) ||
                inv.amount.toString().includes(term)
            );
        }
        
        // Apply date range filter (example implementation)
        if (filters.dateRange !== 'all') {
            const now = moment();
            result = result.filter(inv => {
                const created = moment(inv.createdAt);
                switch(filters.dateRange) {
                    case 'today':
                        return created.isSame(now, 'day');
                    case 'week':
                        return created.isSame(now, 'week');
                    case 'month':
                        return created.isSame(now, 'month');
                    default:
                        return true;
                }
            });
        }
        
        setFilteredInvestments(result);
        calculateStats(result);
    };

    useEffect(() => {
        fetchInvestments();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, searchTerm, investments]);

    const statusBadge = (status) => {
        const baseClass = "text-xs px-2 py-1 rounded-full flex items-center gap-1";
        switch(status) {
            case 'active':
                return <span className={`${baseClass}   bg-green-900 text-green-200`}>
                    <BiTrendingUp className="h-3 w-3" /> Active
                </span>;
            case 'completed':
                return <span className={`${baseClass}  bg-blue-900 text-primary `}>
                    <BiCheckCircle className="h-3 w-3" /> Completed
                </span>;
            case 'denied':
                return <span className={`${baseClass} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`}>
                    <BiXCircle className="h-3 w-3" /> Denied
                </span>;
            default:
                return <span className={`${baseClass} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`}>
                    <BiLoaderCircle className="h-3 w-3" /> Pending
                </span>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCard
                    icon={<BiWallet className="h-5 w-5" />}
                    title="Total Invested"
                    value={`$${stats.totalInvested.toLocaleString()}`}
                    color="blue"
                />
                
                <StatsCard
                    icon={<BiTrendingUp className="h-5 w-5" />}
                    title="Total Profit"
                    value={`$${stats.totalProfit.toLocaleString()}`}
                    color="green"
                />
                
                <StatsCard
                    icon={<BiTime className="h-5 w-5" />}
                    title="Active Investments"
                    value={stats.activeInvestments}
                    color="purple"
                />
            </div>

            {/* Filters Section */}
            <div className="bg-card rounded-xl border border-card-border p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BiSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search investments..."
                            className="pl-10 w-full p-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                        <SelectField
                            options={['all', 'active', 'completed', 'denied']}
                            value={filters.status}
                            onChange={(e) => setFilters({...filters, status: e.target.value})}
                            label="Status"
                            variant="outline"
                            classNames="dark:bg-slate-700 dark:border-slate-700"
                        />
                        
                        <SelectField
                            options={['all', 'today', 'week', 'month']}
                            value={filters.dateRange}
                            onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                            label="Date Range"
                            variant="outline"
                            classNames="dark:bg-slate-700 dark:border-slate-700"
                            icon={<BiCalendar className="h-4 w-4" />}
                        />
                    </div>
                </div>
            </div>

            {/* Investments Table */}
            <div className="bg-card rounded-xl border border-card-border  overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="font-semibold text-lg flex items-center gap-2">
                        <BiTransferAlt className="text-blue-400" /> 
                        Investment History
                    </h2>
                    <span className="text-sm text-gray-400">
                        {filteredInvestments.length} {filteredInvestments.length === 1 ? 'Record' : 'Records'}
                    </span>
                </div>

                {processing && !fetched ? (
                    <div className="p-8 text-center">
                        <LoadingIndicator type="dots" size={8} />
                    </div>
                ) : filteredInvestments.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-card-border">
                            <thead className="bg-bg-dark">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User/Plan</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dates</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-card-border">
                                {filteredInvestments.map((investment) => (
                                    <tr key={investment.id} className="hover:bg-bg-dark transition-colors">
                                        <td className="px-4 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-bg-dark  flex items-center justify-center">
                                                    {`${investment.user?.firstName.charAt(0) || ''} ${investment.user?.lastName.charAt(0) || ''}`.trim() || 'Unknown'}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-white">
                                                        {`${investment.user?.firstName || ''} ${investment.user?.lastName || ''}`.trim() || 'Unknown'}
                                                    </div>
                                                    <div className="text-sm text-gray-400">
                                                        {investment?.plan?.name || 'No Plan'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm font-medium text-white">
                                                ${parseFloat(investment.amount).toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                Profit: ${parseFloat(investment?.profit || 0).toFixed(2)}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm text-white">
                                                {moment(investment.createdAt).format('MMM D, YYYY')}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {moment(investment.expiryDate).fromNow()}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            {statusBadge(investment.status)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <EmptyState 
                        title="No investments found"
                        description="Try adjusting your search or filter criteria"
                        icon={<BiTransferAlt className="h-12 w-12 text-gray-400" />}
                    />
                )}
            </div>
        </div>
    );
}