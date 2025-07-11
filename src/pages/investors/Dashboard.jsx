import { Link } from 'react-router-dom';
import { BiWallet, BiMoneyWithdraw, BiCopy } from 'react-icons/bi';
import { FaUsersLine } from 'react-icons/fa6';
import { BsCashCoin } from 'react-icons/bs';
import { FaChartLine, FaHistory } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import { HiPresentationChartBar } from 'react-icons/hi';
import axios from '../../lib/axios';
import StatsCard from '../../components/common/StatsCard';
import ProfileSection from './ProfileSection';
import TransactionItem from './TransactionItem';
import InvestmentItem from './InvestmentItem';
export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [deposits, setDeposits] = useState();
    const[total_copytrade_deposit, setCopytradeDeposits] =useState()
    const [investments, setInvestments] = useState([]);
    const [wallet, setWallet] = useState(null);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [processing, setProcessing] = useState(false);
    const reffid = useRef();


    const fetchStats = async () => {
        setProcessing(true);
        try {
            const [statsRes, transactionsRes] = await Promise.all([
                axios.get('api/v1/stats/users'),
                axios.get('api/v1/transactions/recent')
            ]);
            setInvestments(statsRes.data.data.stats.investments);
            setDeposits(statsRes.data.data.stats.total_deposit);
            setCopytradeDeposits(statsRes.data.data.stats.total_copytrade_deposit);
            setWallet(statsRes.data.data.stats.wallet);
            setRecentTransactions(transactionsRes.data.data.transactions);
            setFetched(true);
        } catch (err) {
            setFetched(true);
            console.error(err);
        } finally {
            setProcessing(false);
        }
    };

    useEffect(() => {
        const doMining = async () => {
            await axios.patch('api/v1/investments/mine');
            await axios.get('api/v1/users/me').then()
        };
        fetchStats();
        doMining();
    }, []);


    return (
        <div className="min-h-screen">
            {/* User Profile Section */}
            <ProfileSection user={user} />
            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatsCard
                    icon={<BiWallet className="w-6 h-6" />}
                    title="Account Balance"
                    value={`$${wallet?.balance.toLocaleString() || 0}`}
                    color="blue"
                />
                <StatsCard
                    icon={<BiWallet className="w-6 h-6" />}
                    title="Copytrade Balance"
                    value={`$${wallet?.copytradeBalance.toLocaleString() || 0}`}
                    color="purple"
                />
                <StatsCard
                    icon={<FaUsersLine className="w-6 h-6" />}
                    title="Referral Balance"
                    value={`$${wallet?.referralBalance.toLocaleString() || 0}`}
                    color="green"
                />
                <StatsCard
                    icon={<BsCashCoin className="w-6 h-6" />}
                    title="Total Deposit"
                    value={`$${deposits?.toLocaleString() || 0}`}
                    color="amber"
                />
                <StatsCard
                    icon={<BsCashCoin className="w-6 h-6" />}
                    title="Total Copytrade Deposit"
                    value={`$${total_copytrade_deposit?.toLocaleString() || 0}`}
                    color="purple"
                />
                <StatsCard
                    icon={<BiMoneyWithdraw className="w-6 h-6" />}
                    title="Total Accrued Profit"
                    value={`$${wallet?.profit.toLocaleString() || 0}`}
                    color="green"
                />
                <StatsCard
                    icon={<BiMoneyWithdraw className="w-6 h-6" />}
                    title="Copytrade Profit"
                    value={`$${wallet?.copytradeProfit.toLocaleString() || 0}`}
                    color="blue"
                />
            </div>

            {/* Main Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Transactions Section */}
                <div className="bg-card rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FaHistory className="inline-block w-5 h-5" /> Recent Transactions
                        </h2>
                        <Link 
                            to="/manage/investor/transactions" 
                            className="text-sm text-primary-light hover:underline"
                        >
                            View All
                        </Link>
                    </div>
                    
                    {recentTransactions.length > 0 ? (
                        <div className="space-y-4">
                            {recentTransactions.slice(0, 5).map((transaction) => (
                                <TransactionItem key={transaction.id} transaction={transaction} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                            No recent transactions found
                        </div>
                    )}
                </div>

                {/* Investments Section */}
                <div className="bg-card rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <HiPresentationChartBar className="inline-block w-5 h-5" /> Recent Investments
                        </h2>
                        <Link 
                            to="/manage/investor/investments" 
                            className="text-sm text-primary-light hover:underline"
                        >
                            View All
                        </Link>
                    </div>
                    
                    {investments.length > 0 ? (
                        <div className="space-y-4">
                            {investments.slice(0, 3).map((investment) => (
                                <InvestmentItem key={investment.id} investment={investment} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6">
                            <p className="text-gray-500 dark:text-gray-400 mb-4">No active investments</p>
                            <Link
                                to="/manage/investor/investments"
                                className="inline-flex items-center gap-2 px-6 py-2 bg-primary-light text-white rounded-lg hover:bg-primary-dark transition-colors"
                            >
                                <FaChartLine className="w-5 h-5" /> Start Investing
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}