import LoadingIndicator from '../../components/common/LoadingIndicator';
import coverImage from './../../assets/images/forex.jpeg';
import defaultAvatar from './../../assets/images/default.jpg'
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineTransaction } from 'react-icons/ai';
import axios from '../../lib/axios';
import InputField from '../../components/common/InputField';
import SelectField from '../../components/common/SelectField';
import { toast } from 'react-toastify';
import { FiCopy } from 'react-icons/fi';

const FundAccount = ({user, onBack, onFunded = () => Object}) => {
    const [processing, setProcessing] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        setProcessing(true);
        
        try {
            const response = await axios.patch(`api/v1/users/${user.id}/wallets`, form);
            if(response.data.status === 'success') {
                toast.success('Wallet funded successfully!');
                e.target.reset();
                onFunded(response.data.data.user);
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Error updating wallet');
        } finally {
            setProcessing(false);
        }
    };

    const formatWalletAddress = (address) => {
        if (!address) return '';
        if (address.length <= 16) return address;
        return `${address.substring(0, 8)}...${address.substring(address.length - 8)}`;
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.info('Wallet address copied!');
    };

    return (
        <div className="min-h-screen bg-card rounded-2xl p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header with Back Button */}
                <header className="mb-6">
                    <button 
                        onClick={onBack}
                        className="cursor-pointer flex items-center gap-2 text-primary-dark dark:text-primary-light hover:text-primary-darker dark:hover:text-primary transition-colors"
                    >
                        <BiArrowBack className="w-5 h-5" />
                        <span className="font-medium">Back to Users</span>
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-5 max-w-4xl gap-4">
                    {/* User Profile Card */}
                    <div className="md:col-span-2 relative">
                        <div className="bg-bg-dark rounded-xl shadow-sm overflow-hidden border border-slate-600">
                            {/* Cover Image */}
                            <div 
                                className="h-32 bg-cover bg-center relative"
                                style={{ backgroundImage: `url(${coverImage})` }}
                            >
                                <div className="absolute border-b border-slate-600 inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                            </div>

                            {/* Profile Content */}
                            <div className="px-5 pb-6 relative">
                                {/* Avatar */}
                                <div className="flex justify-center -mt-16 mb-4">
                                    <div className="relative">
                                        <img 
                                            src={(user.photo && user.photo != 'default.png') ? user.photo : defaultAvatar} 
                                            alt="User profile" 
                                            className="h-28 w-28 rounded-full border-4 border-slate-700 object-cover shadow-md"
                                        />
                                        <div className={`absolute bottom-0 right-2 w-4 h-4 rounded-full border-2 border-slate-700 ${
                                            user.status === 'active' ? 'bg-green-500' : 
                                            user.status === 'pending' ? 'bg-amber-500' : 
                                            'bg-red-500'
                                        }`}></div>
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="text-center mb-6">
                                    <h2 className="text-xl font-bold text-text-light ">
                                        {`${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Unknown'}
                                    </h2>
                                    <p className="text-sm text-slate-300 mt-1">
                                        {user.email}
                                    </p>
                                    <div className="mt-2 inline-flex items-center bg-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                                        Status: 
                                        <span className={`ml-1 ${
                                            user.status === 'active' ? 'text-green-400' : 
                                            user.status === 'pending' ? 'text-amber-400' : 
                                            'text-red-400'
                                        }`}>
                                            {user.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Wallet Summary */}
                                <div className="grid grid-cols-3 gap-2 mb-6">
                                    <div className="bg-card py-2 rounded-lg text-center">
                                        <p className="text-xs text-text-light ">Balance</p>
                                        <p className="font-semibold text-slate-300">
                                            ${user?.wallet?.balance?.toLocaleString() || '0.00'}
                                        </p>
                                    </div>
                                    <div className="bg-card py-2 rounded-lg text-center">
                                        <p className="text-xs text-text-light ">Profit</p>
                                         <p className="font-semibold text-slate-300">
                                            ${user?.wallet?.profit?.toLocaleString() || '0.00'}
                                        </p>
                                    </div>
                                    <div className="bg-card py-2 rounded-lg text-center">
                                        <p className="text-xs text-text-light ">Referral</p>
                                         <p className="font-semibold text-slate-300">
                                            ${user?.wallet?.referralBalance?.toLocaleString() || '0.00'}
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Channels */}
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
                                        Payment Channels
                                    </h3>
                                    
                                    {user?.bankAccounts?.length === 0 ? (
                                        <div className="text-center py-4 text-slate-500 dark:text-slate-400 text-sm">
                                            No payment channels available
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {user?.bankAccounts?.map((account, index) => (
                                                <div key={index} className="bg-slate-50 dark:bg-slate-600 p-3 rounded-lg">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Network</p>
                                                            <p className="text-sm font-medium text-slate-800 dark:text-white">
                                                                {account.network || 'N/A'}
                                                            </p>
                                                        </div>
                                                        <button 
                                                            onClick={() => copyToClipboard(account.walletAddress)}
                                                            className="text-slate-400 hover:text-primary-dark dark:hover:text-primary-light transition-colors"
                                                            title="Copy address"
                                                        >
                                                            <FiCopy className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <div className="mt-2">
                                                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Wallet Address</p>
                                                        <p className="text-sm font-mono text-slate-800 dark:text-white break-all">
                                                            {account.walletAddress}
                                                        </p>
                                                        <p className="md:hidden text-xs font-mono text-slate-500 dark:text-slate-400">
                                                            {formatWalletAddress(account.walletAddress)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fund Account Form */}
                    <div className="md:col-span-3">
                        <div className="bg-bg-dark rounded-xl shadow-sm overflow-hidden border border-slate-600">
                            <div className="px-6 py-5 border-b border-slate-600">
                                <h2 className="text-xl font-bold text-text-light ">
                                    Fund User Account
                                </h2>
                                <p className="text-sm text-slate-500  mt-1">
                                    Select wallet type and enter amount to fund
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="space-y-6">
                                    <SelectField
                                        options={[
                                            {value:'balance', label:'Main Balance'},
                                            {value:'copytradeBalance', label:'Copytrade Balance'},
                                            {value:'profit', label:'Trading Profit'},
                                            {value: 'copytradeProfit', label:'Copytrade Profit'},
                                            {value:'referralBalance', label:'Referral Balance'} 
                                        ]}
                                        label={'Wallet Type'}
                                        name={'wallet_type'}
                                        classNames="dark:bg-slate-600 dark:border-slate-500"
                                    />

                                    <InputField 
                                         uncontrolled={true}
                                        name={'amount'}
                                        type='number'
                                        placeholder={'0.00'}
                                        label={'Amount (USD)'}
                                        classNames="dark:bg-slate-600 dark:border-slate-500"
                                    />

                                    <div className="pt-2">
                                        <button 
                                            type="submit"
                                            disabled={processing} 
                                            className="w-full cursor-pointer flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {processing ? (
                                                <>
                                                    <LoadingIndicator className="w-5 h-5" />
                                                    <span>Processing...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <AiOutlineTransaction className="w-5 h-5" />
                                                    <span>Fund Account</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FundAccount;