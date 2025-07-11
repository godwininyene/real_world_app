import React, { useEffect, useState } from 'react';
import { AiOutlineTransaction } from 'react-icons/ai';
import { BiArrowBack, BiUser, BiDollar, BiTrendingUp } from 'react-icons/bi';
import { FiUsers, FiPercent } from 'react-icons/fi';
import axios from '../../lib/axios';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import { motion } from 'framer-motion';
import InputField from '../../components/common/InputField';

const InvestCopyTrade = ({ onBack, wallet, onInvestComplete }) => {
    const [user, setUser] = useState();
    const [loadingTrades, setTradeState] = useState(false);
    const [trades, setTrades] = useState([]);
    const [selectedTrade, setSelectedTrade] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [amount, setAmount] = useState('');
    const [stopLoss, setStopLoss] = useState('90.0');
    const [activeTab, setActiveTab] = useState('all');

    const getMe = async () => {
        const res = await axios.get('api/v1/users/me');
        setUser(res.data.data.user);
    };

    const fetchTrades = async () => {
        setTradeState(true);
        try {
            const res = await axios.get('api/v1/copytrades');
            setTrades(res.data.data.copytrades);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load copy trades');
        } finally {
            setTradeState(false);
        }
    };

    useEffect(() => {
        fetchTrades();
        getMe();
    }, []);

    const formatCurrency = (value) => {
        if (!value) return '$0.00';
        const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
        return '$' + num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const handleAmountChange = (e) => {
        const value = e.target.value.replace(/,/g, '');
        if (!isNaN(value)) {
            setAmount(value);
        }
    };

    const filteredTrades = trades.filter(trade => {
        if (activeTab === 'all') return true;
        if (activeTab === 'high') return trade.monthlyReturn >= 20;
        if (activeTab === 'medium') return trade.monthlyReturn >= 10 && trade.monthlyReturn < 20;
        if (activeTab === 'low') return trade.monthlyReturn < 10;
        return true;
    });

    const invest = async (e) => {
        e.preventDefault();
        const amountNum = parseFloat(amount.replace(/,/g, ''));

        if (!selectedTrade) {
            toast.error("Please select a trader first");
            return;
        }

        if (amountNum <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        if (amountNum < selectedTrade.minDeposit) {
            toast.error(`Minimum investment is ${formatCurrency(selectedTrade.minDeposit)}`);
            return;
        }

        if (user?.wallet?.copytradeBalance < amountNum) {
            toast.error(`Insufficient copy trading wallet balance`);
            return;
        }

        setProcessing(true);
        try {
            const data = {
                copyTradeId: selectedTrade.id,
                amount: amountNum,
                stopLoss: parseFloat(stopLoss),
                fees: selectedTrade.fees
            };
            await axios.post(`api/v1/users/me/copy-trade-investments`, data);
            toast.success("Copy trade started successfully!");
            onInvestComplete();
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Investment failed. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto bg-card p-4 rounded-xl">
            {/* Header with back button */}
            <div className="flex items-center gap-6 mb-8">
                <button 
                    onClick={onBack}
                    className="p-2 rounded-full bg-gray-100 cursor-pointer text-gray-500 hover:bg-gray-700 transition-colors"
                >
                    <BiArrowBack className="h-5 w-5" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-text-light">New Copy Trade</h1>
                    <p className="text-gray-400 mt-1">
                        Follow expert traders and replicate their strategies by clicking on 
                        any of the traders below.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Trades Section */}
                <div className="lg:col-span-2">
                    {/* Performance Filter Tabs */}
                    <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
                        <div className="flex space-x-2">
                            {[
                                { id: 'all', label: 'All Traders' },
                                { id: 'high', label: 'High Return' },
                                { id: 'medium', label: 'Medium Return' },
                                { id: 'low', label: 'Low Return' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 cursor-pointer py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                                        activeTab === tab.id
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-100  text-gray-700  hover:bg-gray-200'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Trades Grid */}
                    {loadingTrades ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 h-64 animate-pulse">
                                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
                                    <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredTrades.map((trade) => (
                                <motion.div 
                                    key={trade.id}
                                    whileHover={{ y: -5 }}
                                    onClick={() => setSelectedTrade(trade)}
                                    className={`bg-bg-dark rounded-2xl shadow-sm p-6 cursor-pointer transition-all duration-200 border ${
                                        selectedTrade?.id === trade.id 
                                            ? 'border-indigo-500 ring-2 ring-indigo-500/10' 
                                            : 'border-gray-400  hover:border-indigo-300 dark:hover:border-indigo-500'
                                    }`}
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        {trade.image ? (
                                            <img 
                                                src={trade.image} 
                                                alt={trade.tradeName}
                                                className="h-14 w-14 rounded-full object-cover border-2 border-gray-500 shadow-sm"
                                            />
                                        ) : (
                                            <div className="h-14 w-14 rounded-full bg-indigo-100  flex items-center justify-center">
                                                <BiUser className="text-indigo-500  text-2xl" />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="text-lg font-bold text-text-light">
                                                {trade.tradeName || 'Expert Trader'}
                                            </h3>
                                            <p className="text-gray-400 text-sm">
                                                {trade.tradeUsername}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm">
                                            <BiTrendingUp className="text-indigo-500" />
                                            <span>
                                                Monthly Return: <strong className={`${
                                                    trade.monthlyReturn >= 0 
                                                        ? 'text-green-400' 
                                                        : 'text-red-400'
                                                }`}>
                                                    {trade.monthlyReturn}%
                                                </strong>
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <FiUsers className="text-indigo-500" />
                                            <span>
                                                Investors: <strong>{trade.investors.toLocaleString()}</strong>
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <BiDollar className="text-indigo-500" />
                                            <span>
                                                Min Deposit: <strong>{formatCurrency(trade.minDeposit)}</strong>
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <FiPercent className="text-indigo-500" />
                                            <span>
                                                Fees: <strong>{trade.fees}%</strong>
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Investment Form */}
                <div>
                    <div className="bg-bg-dark rounded-2xl shadow-sm border border-gray-400 sticky top-8">
                        <div className="p-6 border-b border-gray-400">
                            <h2 className="text-xl font-bold text-text-light mb-1">
                                Trade Summary
                            </h2>
                            <p className="text-gray-400 text-sm">
                                {selectedTrade ? `Selected: ${selectedTrade.tradeName}` : 'No trader selected'}
                            </p>
                        </div>
                        
                        <form onSubmit={invest} className="p-6 space-y-6">
                            {/* Copy Trading Balance */}
                            <div>
                                <label className="block text-md text-[#5A607F] mb-2">
                                    Copy Trading Balance
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        readOnly
                                        value={formatCurrency(user?.wallet?.copytradeBalance)}
                                        className="w-full py-2 px-4 transition-all duration-200 focus:outline-none border border-card-border rounded-lg bg-bg-dark text-white placeholder-text-light focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                                    />
                                    <span className="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400">
                                        USD
                                    </span>
                                </div>
                            </div>

                            {/* Amount Input */}
                            <div>
                               
                                <div className="relative">
                                    <span className="absolute left-2 top-[37px] z-50 text-gray-400">
                                        $
                                    </span>
                                    <InputField
                                        label="Investment Amount"
                                        type="number"
                                        value={amount}
                                        onChange={handleAmountChange}
                                    />
                                </div>
                                {selectedTrade && (
                                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        Minimum: {formatCurrency(selectedTrade.minDeposit)}
                                    </p>
                                )}
                                {user?.wallet?.copytradeBalance < parseFloat(amount || 0) && (
                                    <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                                        Insufficient copy trading balance
                                    </p>
                                )}
                            </div>

                            {/* Stop Loss */}
                            <div>
                                {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Stop Loss (%)
                                </label> */}
                                <div className="relative">
                                    <InputField
                                        label=" Stop Loss (%)"
                                        type="number"
                                        value={stopLoss}
                                        min="0"
                                        max="100"
                                        step="0.1"
                                        onChange={(e) => setStopLoss(e.target.value)}
                                    />
                                   
                                    <span className="absolute right-4 top-[37px] z-50 text-gray-500 dark:text-gray-400">
                                        %
                                    </span>
                                </div>
                            </div>

                            {/* Selected Trade Details */}
                            {selectedTrade && (
                                <div className="bg-indigo-900/20 rounded-lg p-4">
                                    <h3 className="font-medium text-indigo-200 mb-2">
                                        Trader Details
                                    </h3>
                                    <ul className="text-sm space-y-1.5 text-indigo-300">
                                        <li className="flex justify-between">
                                            <span>Monthly Return:</span>
                                            <span className={`font-medium ${
                                                selectedTrade.monthlyReturn >= 0 
                                                    ? 'text-green-400' 
                                                    : 'text-red-400'
                                            }`}>
                                                {selectedTrade.monthlyReturn}%
                                            </span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Investors:</span>
                                            <span className="font-medium">{selectedTrade.investors.toLocaleString()}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Trading Fees:</span>
                                            <span className="font-medium">{selectedTrade.fees}%</span>
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {/* Fees and Total */}
                            {selectedTrade && amount && (
                                <div className="bg-indigo-900/20 rounded-lg p-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">Amount:</span>
                                        <span className="font-medium">{formatCurrency(amount)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Fees ({selectedTrade.fees}%):</span>
                                        <span className="font-medium">
                                            {formatCurrency((parseFloat(amount) * (selectedTrade.fees / 100)))}
                                        </span>
                                    </div>
                                    <div className="border-t border-gray-500 mt-2 pt-2">
                                        <div className="flex justify-between font-medium">
                                            <span className="text-gray-200">Total:</span>
                                            <span>
                                                {formatCurrency(parseFloat(amount) + (parseFloat(amount) * (selectedTrade.fees / 100)))}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                isLoading={processing}
                                disabled={!selectedTrade || processing || !amount || (user?.wallet?.copytradeBalance < parseFloat(amount))}
                                className="w-full py-3"
                                variant="primary"
                            >
                                <AiOutlineTransaction className="mr-2" />
                                {selectedTrade ? 'Confirm Copy Trade' : 'Select a Trader First'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestCopyTrade;