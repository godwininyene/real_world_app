import { useEffect, useState } from 'react';
import { BiTransferAlt, BiPlus, BiMinus, BiCreditCard } from 'react-icons/bi';
import { FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';
import { RiExchangeDollarLine } from 'react-icons/ri';
import moment from 'moment/moment';
import Modal from '../../components/CustomModal';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import BankAccounts from './BankAccounts';
import axios from '../../lib/axios';
import { Link } from 'react-router-dom';

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [accountModal, setAccountModal] = useState(false);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const res = await axios.get('api/v1/users/me/transactions');
            setTransactions(res.data.data.transactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const getStatusColor = (status) => {
        switch(status.toLowerCase()) {
            case 'success':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'failed':
            case 'declined':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const getTypeIcon = (type) => {
        const lowerType = type.toLowerCase();
        if (lowerType.includes('deposit')) {
            return <FiArrowDownLeft className="text-green-500" />;
        } else if (lowerType.includes('withdrawal')) {
            return <FiArrowUpRight className="text-red-500" />;
        }
        return <RiExchangeDollarLine className="text-blue-500" />;
    };

    const getPaymentChannelIcon = (channel) => {
        switch(channel.toLowerCase()) {
            case 'bank payment':
                return <BiCreditCard className="text-purple-500" />;
            case 'crypto wallet':
                return <BiTransferAlt className="text-indigo-500" />;
            case 'mobile transfer':
                return <BiTransferAlt className="text-blue-500" />;
            default:
                return <BiTransferAlt className="text-gray-500" />;
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                    to='/investor/deposit'
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-emerald-500/30 text-emerald-400 font-medium rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all"
                >
                    <BiPlus className="text-xl" />
                    <span>Deposit Funds</span>
                </Link>
                <Link
                    to='/investor/withdrawal'
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-blue-500/30 text-blue-400 font-medium rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all"
                >
                    <BiMinus className="text-xl" />
                    <span>Withdraw Funds</span>
                </Link>
                <button 
                    onClick={() => setAccountModal(true)}
                    className="flex cursor-pointer items-center justify-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-purple-500/30 text-purple-400 font-medium rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                    <BiCreditCard className="text-xl" />
                    <span>Withdrawal Wallets</span>
                </button>
            </div>

            {/* Transaction History */}
            <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-500 flex justify-between items-center">
                    <h2 className="text-xl font-semibold flex items-center gap-2 text-text-light">
                        <BiTransferAlt className="text-blue-500" />
                        Transaction History
                    </h2>
                    <span className="text-sm text-gray-400">
                        Showing {transactions.length} {transactions.length === 1 ? 'transaction' : 'transactions'}
                    </span>
                </div>

                {loading ? (
                    <div className="p-12 flex justify-center">
                        <LoadingIndicator type="pulse" size={10} />
                    </div>
                ) : transactions.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-20 h-20 mx-auto bg-gray-100  rounded-full flex items-center justify-center mb-6">
                                <BiTransferAlt className="text-3xl text-gray-400" />
                            </div>
                            <h3 className="text-xl font-medium text-text-light mb-2">
                                No Transactions Yet
                            </h3>
                            <p className="text-gray-400 mb-6">
                                Get started by making your first deposit
                            </p>
                            <Link
                                to='/investor/deposit'
                                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium rounded-lg shadow transition-all"
                            >
                                Deposit Funds
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-500">
                        {transactions.map((transaction) => (
                            <div key={transaction.id} className="p-6 hover:bg-indigo-900/20 transition-colors">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    {/* Transaction Type and Details */}
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-lg ${
                                            transaction.type.toLowerCase().includes('deposit') 
                                                ? 'bg-green-900/50 text-green-400'
                                                : 'bg-red-900/50 text-red-400'
                                        }`}>
                                            {getTypeIcon(transaction.type)}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-400 capitalize">
                                                {transaction.type}
                                            </h3>
                                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    {getPaymentChannelIcon(transaction.paymentChannel)}
                                                    <span>{transaction.paymentChannel}</span>
                                                </div>
                                                <span>•</span>
                                                <span>{moment(transaction.createdAt).format('MMM D, h:mm A')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Amount and Status */}
                                    <div className="flex flex-col items-end gap-2">
                                        <div className={`text-lg font-semibold ${
                                            transaction.type.toLowerCase().includes('deposit') 
                                                ? 'text-green-600 dark:text-green-400'
                                                : 'text-red-600 dark:text-red-400'
                                        }`}>
                                            {transaction.type.toLowerCase().includes('deposit') ? '+' : '-'}
                                            {formatCurrency(transaction.amount)}
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                            {transaction.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Receipt Link if available */}
                                {transaction.receipt && (
                                    <div className="mt-4 pt-4 border-t border-gray-500">
                                        <a 
                                            href={transaction.receipt} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-sm  text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                        >
                                            <BiCreditCard />
                                            View Receipt
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bank Accounts Modal */}
            <Modal show={accountModal} maxWidth="md" onClose={() => setAccountModal(false)}>
                <BankAccounts />
            </Modal>
        </div>
    );
}

// Helper function to format currency
function formatCurrency(value) {
    if (!value) return '$0.00';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return '$' + num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}