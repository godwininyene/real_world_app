import { useState, useEffect } from 'react';
import { BiChart, BiWalletAlt, BiPlus } from 'react-icons/bi';
import InvestCopyTrade from './InvestCopyTrade';
import moment from 'moment/moment';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import { FaChartLine, FaArrowRight } from 'react-icons/fa';
import { RiUserFollowLine } from 'react-icons/ri';
import axios from '../../lib/axios';
import StatsCard from '../../components/common/StatsCard';

export default function CopyTradeInvestments() {
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
                totalInvest: res.data.data.stats.total_copytrade_investment,
                amount: res.data.data.stats.total_copytrade_amount,
                profit: res.data.data.stats.wallet.copytradeProfit.toFixed(2)
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
            const res = await axios.get('api/v1/users/me/copy-trade-investments');
            setInvestments(res.data.data.investments);
        } catch(error) {
            console.error('Failed to fetch copy trade investments:', error);
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
        <div className="min-h-screen">
            {invest ? (
                <InvestCopyTrade 
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
                                Copy Trade Portfolio
                            </h1>
                            <p className="text-gray-400 mt-1">
                                Follow expert traders and replicate their strategies
                            </p>
                        </div>
                        <button 
                            onClick={() => setInvestState(true)}
                            className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg shadow hover:shadow-md transition-all"
                        >
                            <BiPlus className="text-xl" />
                            <span>New Copy Trade</span>
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatsCard
                            icon={<FaChartLine className="w-6 h-6" />}
                            title="Copy Trade Profit"
                            value={loading.stats ? '...' : formatCurrency(stats.profit)}
                            description="All time earnings"
                            color="green"
                        />
                        <StatsCard
                            icon={<RiUserFollowLine className="w-6 h-6" />}
                            title="Active Trades"
                            value={loading.stats ? '...' : stats.totalInvest || '0'}
                            description="Following traders"
                            color="blue"
                        />
                        <StatsCard
                            icon={<BiWalletAlt className="w-6 h-6" />}
                            title="Total Invested"
                            value={loading.stats ? '...' : formatCurrency(stats.amount)}
                            description="Capital deployed"
                            color="purple"
                        />
                    </div>

                    {/* Copy Trades Grid */}
                    <div className="mb-8 bg-card p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-text-light flex items-center gap-2">
                                <RiUserFollowLine className="text-blue-500" />
                                Your Copy Trades
                            </h2>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Showing {investments.length} {investments.length === 1 ? 'trade' : 'trades'}
                            </div>
                        </div>

                        {loading.investments ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 h-64 animate-pulse"></div>
                                ))}
                            </div>
                        ) : investments.length === 0 ? (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-dashed border-gray-200 dark:border-gray-700">
                                <div className="max-w-md mx-auto">
                                    <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                                        <RiUserFollowLine className="text-3xl text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-medium text-text-light mb-2">
                                        No Copy Trades Found
                                    </h3>
                                    <p className="text-gray-400 mb-6">
                                        Start following expert traders to begin copy trading
                                    </p>
                                    <button
                                        onClick={() => setInvestState(true)}
                                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg shadow transition-all"
                                    >
                                        Start Copy Trading
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {investments.map((investment) => (
                                    <CopyTradeCard 
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

const CopyTradeCard = ({ investment, formatCurrency }) => {
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
        default: {
            bg: 'bg-gray-700',
            text: 'text-gray-300',
            icon: 'text-gray-500'
        }
    };

    const status = investment.status.toLowerCase();
    const colors = statusColors[status] || statusColors.default;
    const monthlyReturn = investment.copyTrade?.monthlyReturn || 0;
    const isPositiveReturn = monthlyReturn > 0;

    return (
        <div className="bg-bg-dark rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-500 overflow-hidden">
            {/* Card Header */}
            <div className={`px-6 py-4 ${colors.bg} flex justify-between items-center`}>
                <div className="flex items-center gap-3">
                    {investment.copyTrade?.image ? (
                        <img 
                            src={investment.copyTrade.image} 
                            alt="Trader" 
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-800"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                            <RiUserFollowLine className="w-5 h-5 text-gray-400" />
                        </div>
                    )}
                    <div>
                        <h3 className="font-semibold text-text-light">
                            {investment.copyTrade?.tradeName || 'Trader'}
                        </h3>
                        <p className="text-sm text-gray-400">
                            {investment.copyTrade?.tradeUsername || '@username'}
                        </p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.text}`}>
                    {investment.status}
                </span>
            </div>

            {/* Card Body */}
            <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-sm text-gray-400">Invested</p>
                        <p className="font-medium">{formatCurrency(investment.amount)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Stop Loss</p>
                        <p className="font-medium">{investment.stopLoss}%</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Started</p>
                        <p className="font-medium">
                            {moment(investment.createdAt).format('MMM D')}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Performance</p>
                        <p className={`font-medium ${
                            isPositiveReturn 
                                ? 'text-green-400' 
                                : 'text-red-400'
                        }`}>
                            {monthlyReturn}%
                        </p>
                    </div>
                </div>

                {/* Performance Indicator */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">
                            Monthly return
                        </span>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};