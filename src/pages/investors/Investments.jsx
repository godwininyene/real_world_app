import { useState, useEffect } from 'react';
import { BiPlus, BiTrendingUp } from 'react-icons/bi';
import Invest from './Invest';
import moment from 'moment/moment';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import { FaChartLine, FaCoins } from 'react-icons/fa';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import axios from '../../lib/axios';
import StatsCard from '../../components/common/StatsCard';

export default function Investments() {
    const [invest, setInvestState] = useState(false);
    const [stats, setStats] = useState({
        amount: 0,
        profit: 0,
        totalInvest: 0
    });
    const [investments, setInvestments] = useState([]);
    const [wallet, setWallet] = useState(null);
    const [loading, setLoading] = useState({
        stats: false,
        investments: false
    });
    
    const fetchStats = async () => {
        setLoading(prev => ({...prev, stats: true}));
        try {
            const res = await axios.get('api/v1/stats/users');
            setWallet(res.data.data.stats.wallet);
            setStats({
                totalInvest: res.data.data.stats.total_investment,
                amount: res.data.data.stats.total_amount,
                profit: res.data.data.stats.total_profit.toFixed(2)
            });
        } catch(err) {
            console.error('Failed to fetch stats:', err);
        } finally {
            setLoading(prev => ({...prev, stats: false}));
        }
    };

    const fetchInvestments = async() => {
        setLoading(prev => ({...prev, investments: true}));
        try {
            const res = await axios.get('api/v1/users/me/investments');
            setInvestments(res.data.data.investments);
        } catch(error) {
            console.error('Failed to fetch investments:', error);
        } finally {
            setLoading(prev => ({...prev, investments: false}));
        }
    };

    useEffect(() => {
        fetchStats();
        fetchInvestments();
    }, []);

    const formatCurrency = (value) => `$${value?.toLocaleString() || '0'}`;

    return (
        <div className="min-h-screen ">
            {invest ? (
               
                <Invest 
                    onBack={() => setInvestState(false)} 
                    wallet={wallet} 
                    onInvestComplete={() => {
                        fetchInvestments(); 
                        fetchStats();
                    }} 
                />
            ) : (
                <div className="container mx-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-text-light">
                                Investment Portfolio
                            </h1>
                            <p className="text-gray-400 mt-1">
                                Track and manage your investments
                            </p>
                        </div>
                        
                        <button 
                            onClick={() => setInvestState(true)}
                            className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg shadow hover:shadow-md transition-all"
                        >
                            <BiPlus className="text-xl" />
                            <span>New Investment</span>
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatsCard
                            icon={<BiTrendingUp className="w-6 h-6" />}
                            title="Total Profit"
                            value={loading.stats ? '...' : formatCurrency(parseFloat(stats.profit))}
                            description="All time earnings"
                            color="green"
                        />
                        <StatsCard
                            icon={<FaChartLine className="w-6 h-6" />}
                            title="Total Investments"
                            value={loading.stats ? '...' : stats.totalInvest || '0'}
                            description="Active investments"
                            color="blue"
                        />
                        <StatsCard
                            icon={<RiMoneyDollarCircleLine className="w-6 h-6" />}
                            title="Total Invested"
                            value={loading.stats ? '...' : formatCurrency(stats.amount)}
                            description="Capital deployed"
                            color="purple"
                        />
                    </div>

                    {/* Investments Grid */}
                    <div className="mb-8 bg-card p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-text-light flex items-center gap-2">
                                <FaCoins className="text-blue-500" />
                                Your Investments
                            </h2>
                            <div className="text-sm text-gray-400">
                                Showing {investments.length} {investments.length === 1 ? 'item' : 'items'}
                            </div>
                        </div>

                        {loading.investments ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-gray-800 rounded-xl shadow-sm p-6 h-48 animate-pulse"></div>
                                ))}
                            </div>
                        ) : investments.length === 0 ? (
                            <div className="bg-gray-800 rounded-2xl p-12 text-center border border-dashed border-gray-200 dark:border-gray-700">
                                <div className="max-w-md mx-auto">
                                    <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                                        <FaCoins className="text-3xl text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-medium text-text-light mb-2">
                                        No Investments Found
                                    </h3>
                                    <p className="text-gray-400 mb-6">
                                        Start growing your portfolio with your first investment
                                    </p>
                                    <button
                                        onClick={() => setInvestState(true)}
                                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg shadow transition-all"
                                    >
                                        Begin Investing
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {investments.map((investment) => (
                                    <InvestmentCard 
                                        key={investment.id} 
                                        investment={investment} 
                                        formatCurrency={formatCurrency}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

const InvestmentCard = ({ investment, formatCurrency }) => {
    
    // Calculate time remaining and progress differently based on available data
    const calculateProgress = () => {
        if (investment.expiryDate && investment.createdAt) {
            const now = new Date();
            const startDate = new Date(investment.createdAt);
            const endDate = new Date(investment.expiryDate);
            
            const totalDuration = endDate - startDate;
            const elapsed = now - startDate;
            
            // Ensure we don't go over 100% or below 0%
            return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
        }
        return 0; // Default if dates aren't available
    };

    const calculateTimeRemaining = () => {
        if (!investment.expiryDate) return null;
        
        const now = new Date();
        const endDate = new Date(investment.expiryDate);
        const diffMs = endDate - now;
        
        if (diffMs <= 0) return "Completed";
        
        // Convert to appropriate units
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        if (diffDays > 0) {
            return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} left`;
        } else if (diffHrs > 0) {
            return `${diffHrs} ${diffHrs === 1 ? 'hour' : 'hours'} left`;
        } else {
            return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} left`;
        }
    };

    const progress = calculateProgress();
    const timeRemaining = calculateTimeRemaining();

    const statusColors = {
        active: {
            bg: 'bg-blue-900/30',
            text: 'text-blue-400',
            icon: 'text-blue-500'
        },
        completed: {
            bg: 'bg-green-900/30',
            text: 'text-green-400',
            icon: 'text-green-500'
        },
        pending: {
            bg: 'bg-amber-900/30',
            text: 'text-amber-400',
            icon: 'text-amber-500'
        },
        default: {
            bg: 'bg-gray-700',
            text: 'text-gray-300',
            icon: 'text-gray-500'
        }
    };

    const status = investment.status.toLowerCase();
    const colors = statusColors[status] || statusColors.default;

    return (
        <div className="bg-bg-dark rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-500 overflow-hidden">
            {/* Card Header */}
            <div className={`px-3 py-4 ${colors.bg} flex justify-between items-center`}>
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${colors.bg} ${colors.icon}`}>
                        <FaChartLine className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm text-text-light">
                            {investment?.plan?.name || 'Investment Plan'}
                        </h3>
                        <p className="text-sm text-gray-400">
                            {investment.plan?.percentage}% ROI
                        </p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.text}`}>
                    {investment.status}
                </span>
            </div>

            {/* Card Body */}
            <div className="p-3">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-sm text-gray-400">Invested</p>
                        <p className="font-medium">{formatCurrency(investment.amount)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Profit</p>
                        <p className="font-medium text-green-400">
                            {formatCurrency(investment.profit)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Started</p>
                        <p className="font-medium text-sm">
                            {moment(investment.createdAt).format('MMM D, h:mm A')}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Ends</p>
                        <p className="font-medium text-sm">
                            {moment(investment.expiryDate).format('MMM D, h:mm A')}
                        </p>
                    </div>
                </div>

                {/* Progress Bar - Only show if investment is active */}
                {status === 'active' && (
                    <div className="mb-2">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                            <span>Progress</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Time Remaining */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                    {timeRemaining ? (
                        <span className="text-sm text-gray-400">
                            {timeRemaining}
                        </span>
                    ) : (
                        <span className="text-sm text-gray-400">
                            {status === 'completed' ? 'Completed' : 'N/A'}
                        </span>
                    )}
                  
                </div>
            </div>
        </div>
    );
};