import React, { useEffect, useState } from 'react';
import { AiOutlineTransaction } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { FiClock, FiDollarSign, FiUsers } from 'react-icons/fi';
import axios from '../../lib/axios';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import InputField from '../../components/common/InputField';

const Invest = ({ onBack, wallet, onInvestComplete }) => {
    const [user, setUser] = useState();
    const [loadingPlans, setPlanState] = useState(false);
    const [plans, loadPlans] = useState([]);
    const [selectedPlan, setSelectPlan] = useState();
    const [processing, setProcessing] = useState(false);
    const [amount, setAmount] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const getMe = async () => {
        const res = await axios.get('api/v1/users/me');
        setUser(res.data.data.user);
    };

    const fetchPlan = async () => {
        setPlanState(true);
        try {
            const res = await axios.get('api/v1/plans');
            loadPlans(res.data.data.plans);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load investment plans');
        } finally {
            setPlanState(false);
        }
    };

    useEffect(() => {
        fetchPlan();
        getMe();
    }, []);

    const invest = async (e) => {
        e.preventDefault();
        const amountNum = parseFloat(amount);

        if (!selectedPlan) {
            toast.error("Please select a plan first");
            return;
        }
        
        if (user?.wallet?.balance < amountNum) {
            toast.error(`Insufficient wallet balance. Available: $${user?.wallet?.balance.toLocaleString()}`);
            return;
        }
        
        if (amountNum < selectedPlan.minDeposit) {
            toast.error(`Minimum investment for this plan is $${selectedPlan.minDeposit.toLocaleString()}`);
            return;
        } else if (amountNum > selectedPlan.maxDeposit) {
            toast.error(`Maximum investment for this plan is $${selectedPlan.maxDeposit.toLocaleString()}`);
            return;
        }

        setProcessing(true);
        try {
            const data = {
                planId: selectedPlan.id,
                amount: amountNum
            };
            await axios.post(`api/v1/users/me/investments`, data);
            toast.success("Investment started successfully!");
            onInvestComplete();
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Investment failed. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    const filteredPlans = plans.filter(plan => {
        if (activeTab === 'all') return true;
        if (activeTab === 'short') return plan.timingParameter === 'hours';
        if (activeTab === 'medium') return plan.timingParameter === 'days' && plan.planDuration <= 5;
        if (activeTab === 'long') return plan.timingParameter === 'days' && plan.planDuration > 5;
        return true;
    });

   
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
                    <h1 className="text-3xl font-bold text-text-light">New Investment</h1>
                    <p className="text-gray-400 mt-1">
                        Choose a plan that matches your investment goals by clicking on any of 
                        the plans listed below
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Plans Section */}
                <div className="lg:col-span-2">
                    {/* Plan Filter Tabs */}
                    <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
                        <div className="flex space-x-2">
                            {[
                                { id: 'all', label: 'All Plans' },
                                { id: 'short', label: 'Short Term' },
                                { id: 'medium', label: 'Medium Term' },
                                { id: 'long', label: 'Long Term' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium whitespace-nowrap ${
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

                    {/* Plans Grid */}
                    {loadingPlans ? (
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
                            {filteredPlans.map((plan) => (
                                <motion.div 
                                    key={plan.id}
                                    whileHover={{ y: -5 }}
                                    onClick={() => setSelectPlan(plan)}
                                    className={`bg-bg-dark rounded-2xl shadow-sm p-6 cursor-pointer transition-all duration-200 border ${
                                        selectedPlan?.id === plan.id 
                                            ? 'border-indigo-500 ring-2 ring-indigo-500/10' 
                                            : 'border-gray-400  hover:border-indigo-300 dark:hover:border-indigo-500'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-sm font-bold text-text-light">
                                            {plan.name}
                                        </h3>
                                        <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 text-sm font-bold px-3 py-1 rounded-full">
                                            {plan.percentage}% ROI
                                        </span>
                                    </div>
                                    
                                    <p className="text-gray-400 mb-6 text-sm">
                                        {plan.description}
                                    </p>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm">
                                            <FiClock className="text-indigo-500" />
                                            <span>
                                                Duration: <strong>{plan.planDuration} {plan.timingParameter}</strong>
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <FiDollarSign className="text-indigo-500" />
                                            <span>
                                                Range: <strong>${plan.minDeposit.toLocaleString()} - ${plan.maxDeposit.toLocaleString()}</strong>
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <FiUsers className="text-indigo-500" />
                                            <span>
                                                Referral: <strong>{plan.referalBonus}% bonus</strong>
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
                                Investment Summary
                            </h2>
                            <p className="text-gray-400 text-sm">
                                {selectedPlan ? `Selected: ${selectedPlan.name}` : 'No plan selected'}
                            </p>
                        </div>
                        
                        <form onSubmit={invest} className="p-6 space-y-6">
                            {/* Balance */}
                            <div>
                                <label className="block text-md text-[#5A607F] mb-2">
                                   Available Balance
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        readOnly
                                        value={`$${(user?.wallet?.balance || 0).toLocaleString()}`}
                                        className="w-full py-2 px-4 transition-all duration-200 focus:outline-none border border-card-border rounded-lg bg-bg-dark text-white placeholder-text-light focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                                    />
                                    <span className="absolute right-4 top-[10px] text-gray-400">
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
                                        name="name"
                                        label="Investment Amount"
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                   
                                </div>
                                {selectedPlan && (
                                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        Minimum: ${selectedPlan.minDeposit.toLocaleString()} | Maximum: ${selectedPlan.maxDeposit.toLocaleString()}
                                    </p>
                                )}
                            </div>

                            {/* Selected Plan Details */}
                            {selectedPlan && (
                                <div className="bg-indigo-900/20 rounded-lg p-4">
                                    <h3 className="font-medium text-indigo-200 mb-2">
                                        Plan Details
                                    </h3>
                                    <ul className="text-sm space-y-1.5 text-indigo-300">
                                        <li className="flex justify-between">
                                            <span>ROI Percentage:</span>
                                            <span className="font-medium">{selectedPlan.percentage}%</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Duration:</span>
                                            <span className="font-medium">
                                                {selectedPlan.planDuration} {selectedPlan.timingParameter}
                                            </span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Referral Bonus:</span>
                                            <span className="font-medium">{selectedPlan.referalBonus}%</span>
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                isLoading={processing}
                                disabled={!selectedPlan || processing}
                                className="w-full py-3"
                                variant="primary"
                            >
                                <AiOutlineTransaction className="mr-2" />
                                {selectedPlan ? 'Confirm Investment' : 'Select a Plan First'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invest;