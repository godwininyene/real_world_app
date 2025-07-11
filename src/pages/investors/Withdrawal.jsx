import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack, BiCheckCircle, BiCopy } from 'react-icons/bi';
import { FiArrowRight } from 'react-icons/fi';
import { RiBankLine, RiWallet3Line } from 'react-icons/ri';
import axios from '../../lib/axios';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';
import InputField from '../../components/common/InputField';
import { FaMoneyBillTransfer } from 'react-icons/fa6';

const Withdrawal = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [step, setStep] = useState(1);
  const [walletType, setWalletType] = useState('');
  const [amount, setAmount] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const availableBalance = user?.wallet?.[walletType] || 0;

  const getMe = async () => {
    const res = await axios.get('api/v1/users/me');
    setUser(res.data.data.user);
  };

  const fetchBankAccounts = async () => {
    try {
      const res = await axios.get('api/v1/users/me/banks');
      setAccounts(res.data.data.accounts);
    } catch (err) {
      console.error('Error fetching bank accounts:', err);
      toast.error('Failed to load withdrawal accounts');
    }
  };

  useEffect(() => {
    fetchBankAccounts();
    getMe();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!bankAccount) {
      toast.error("Please select a wallet address");
      return;
    }
    
    if (parseFloat(amount) > parseFloat(availableBalance)) {
      toast.error("Amount exceeds available balance");
      return;
    }

    setProcessing(true);
    
    try {
      const formData = new FormData();
      formData.append('type', 'withdrawal');
      formData.append('amount', amount);
      formData.append('payOption', walletType);
      formData.append('bank_id', bankAccount);

      await axios.post('api/v1/users/me/transactions', formData);
      toast.success('Withdrawal placed successfully');
      setSuccess(true);
      setStep(4);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Withdrawal failed. Please try again.';
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setProcessing(false);
    }
  };

  const getWalletName = () => {
    switch (walletType) {
      case 'balance':
        return 'Investment Balance';
      case 'copytradeBalance':
        return 'Copytrade Balance';
      case 'referralBalance':
        return 'Referral Earnings';
      default:
        return '';
    }
  };

  const formatCurrency = (value) => {
    if (!value) return '$0.00';
    return '$' + parseFloat(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="max-w-md mx-auto p-6">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex cursor-pointer items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-8 transition-colors"
      >
        <BiArrowBack className="text-xl" />
        <span className="font-medium">Back</span>
      </button>

      {/* Progress Steps */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-light mb-4">
          {step === 1 && 'Select Withdrawal Source'}
          {step === 2 && 'Choose Destination'}
          {step === 3 && 'Enter Amount'}
          {step === 4 && 'Withdrawal Requested'}
        </h1>
        
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= stepNumber 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-400 text-gray-200'
              }`}>
                {stepNumber}
              </div>
              <div className={`text-xs mt-1 ${
                step >= stepNumber 
                  ? 'text-indigo-400 font-medium' 
                  : 'text-gray-400'
              }`}>
                {stepNumber === 1 && 'Source'}
                {stepNumber === 2 && 'Destination'}
                {stepNumber === 3 && 'Amount'}
                {stepNumber === 4 && 'Complete'}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300" 
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Select Wallet Source */}
      {step === 1 && (
        <div className="space-y-4">
          <div 
            onClick={() => {
              setWalletType('balance');
              setStep(2);
            }}
            className="p-4 border border-gray-500 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-900/10 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-900/20 rounded-lg text-indigo-400">
                <RiBankLine className="text-2xl" />
              </div>
              <div>
                <h3 className="font-medium text-text-light">Investment Balance</h3>
                <p className="text-sm text-gray-400">
                  Available: {formatCurrency(user?.wallet?.balance)}
                </p>
              </div>
              <FiArrowRight className="ml-auto text-gray-400" />
            </div>
          </div>

          <div 
            onClick={() => {
              setWalletType('copytradeBalance');
              setStep(2);
            }}
            className="p-4 border border-gray-500 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-900/10 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-900/20 rounded-lg text-purple-400">
                <RiWallet3Line className="text-2xl" />
              </div>
              <div>
                <h3 className="font-medium text-text-light">Copytrade Balance</h3>
                <p className="text-sm text-gray-400">
                  Available: {formatCurrency(user?.wallet?.copytradeBalance)}
                </p>
              </div>
              <FiArrowRight className="ml-auto text-gray-400" />
            </div>
          </div>

          <div 
            onClick={() => {
              setWalletType('referralBalance');
              setStep(2);
            }}
            className="p-4 border border-gray-500 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-900/10 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-900/20 rounded-lg text-blue-400">
                <RiWallet3Line className="text-2xl" />
              </div>
              <div>
                <h3 className="font-medium text-text-light">Referral Earnings</h3>
                <p className="text-sm text-gray-400">
                  Available: {formatCurrency(user?.wallet?.referralBalance)}
                </p>
              </div>
              <FiArrowRight className="ml-auto text-gray-400" />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Select Destination */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-indigo-900/10 p-4 rounded-xl border border-indigo-900">
            <h3 className="font-medium text-indigo-200 mb-2">
              Withdrawing from {getWalletName()}
            </h3>
            <div className="flex justify-between py-2 border-b border-indigo-900">
              <span className="text-sm text-indigo-300">Available Balance:</span>
              <span className="text-sm font-medium text-indigo-200">
                {formatCurrency(availableBalance)}
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-text-light mb-3">Select Withdrawal Destination</h3>
            {accounts.length > 0 ? (
              <div className="space-y-3">
                {accounts.map(account => (
                  <div
                    key={account.id}
                    onClick={() => {
                      setBankAccount(account.id);
                      setStep(3);
                    }}
                    className={`p-4 border rounded-xl cursor-pointer transition-colors ${
                      bankAccount === account.id 
                        ? 'border-indigo-500 bg-indigo-900/20' 
                        : 'border-gray-500 hover:border-indigo-300 hover:bg-indigo-900/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-700 rounded-lg">
                        <RiWallet3Line className="text-lg text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-text-light">{account.network}</h4>
                        <p className="text-sm text-gray-400 truncate">{account.walletAddress}</p>
                      </div>
                      <FiArrowRight className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-red-900/10 border border-red-900 rounded-xl">
                <p className="text-red-300 text-center">
                  No withdrawal wallets found. Please add a wallet first.
                </p>
                <Button
                  onClick={() => navigate('/investor/transactions')}
                  className="mt-3 w-full"
                  variant="outline"
                >
                  Add Withdrawal Account
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Enter Amount */}
      {step === 3 && (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="bg-indigo-900/10 p-4 rounded-xl border border-indigo-900">
            <h3 className="font-medium text-indigo-200 mb-2">
              Withdrawal Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between py-1 border-b border-indigo-900">
                <span className="text-sm text-indigo-300">Source:</span>
                <span className="text-sm font-medium text-indigo-200">
                  {getWalletName()}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-indigo-900">
                <span className="text-sm text-indigo-300">Destination:</span>
                <span className="text-sm font-medium text-indigo-200">
                  {accounts.find(a => a.id === bankAccount)?.network || ''}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-sm text-indigo-300">Available:</span>
                <span className="text-sm font-medium text-indigo-200">
                  {formatCurrency(availableBalance)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="relative">
              <span className="absolute left-2 top-[37px] z-50 text-gray-400">$</span>
              <InputField
                label="Amount to Withdraw"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                max={availableBalance}
                min="10"
                required
              />
            </div>
           
          </div>

          {accounts.find(a => a.id === bankAccount) && (
            <div className="bg-gray-800 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-300">
                  {accounts.find(a => a.id === bankAccount)?.network} Address
                </h4>
                <button
                  onClick={() => copyToClipboard(accounts.find(a => a.id === bankAccount)?.walletAddress)}
                  className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1"
                >
                  <BiCopy className="text-base" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="text-xs font-mono bg-gray-900 p-2 rounded break-all">
                {accounts.find(a => a.id === bankAccount)?.walletAddress}
              </p>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-900/20 text-red-300 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            isLoading={processing}
            disabled={processing || !amount || parseFloat(amount) > parseFloat(availableBalance)}
            className="w-full py-3"
            variant="primary"
          >
            <FaMoneyBillTransfer className="mr-2" />
            Request Withdrawal
          </Button>
        </form>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="text-center py-8">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <BiCheckCircle className="text-4xl text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-text-light mb-2">
            Withdrawal Requested!
          </h2>
          <p className="text-gray-400 mb-6">
            Your withdrawal of {formatCurrency(amount)} is being processed. You'll receive a confirmation email shortly.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => navigate('/investor/transactions')}
              className="px-6"
              variant="primary"
            >
              View Transactions
            </Button>
            <Button
              onClick={() => {
                setStep(1);
                setAmount('');
                setBankAccount('');
                setWalletType('');
                setSuccess(false);
              }}
              className="px-6"
              variant="outline"
            >
              New Withdrawal
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdrawal;