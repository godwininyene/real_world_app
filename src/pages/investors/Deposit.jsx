import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BiArrowBack, BiCheckCircle, BiCopy } from 'react-icons/bi';
import { FiArrowRight, FiUpload } from 'react-icons/fi';
import { RiBankLine, RiWallet3Line, RiSmartphoneLine } from 'react-icons/ri';
import axios from '../../lib/axios';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';
import InputField from '../../components/common/InputField';
import { AiOutlineTransaction } from 'react-icons/ai';

const Deposit = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [amount, setAmount] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [depositType, setDepositType] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const fetchPaymentOptions = async () => {
    try {
      const response = await axios.get('api/v1/paymentOptions');
      setPaymentOptions(response.data.data.paymentOptions);
    } catch (err) {
      console.error('Failed to fetch payment options:', err);
      setError('Failed to load payment options. Please try again later.');
    }
  };

  useEffect(() => {
    fetchPaymentOptions();
  }, []);

  const getPaymentIcon = (payOption) => {
    switch (payOption.toLowerCase()) {
      case 'bank':
        return <RiBankLine className="text-indigo-500 text-2xl" />;
      case 'mobile wallet':
        return <RiSmartphoneLine className="text-blue-500 text-2xl" />;
      case 'crypto wallet':
        return <RiWallet3Line className="text-purple-500 text-2xl" />;
      default:
        return <RiWallet3Line className="text-gray-500 text-2xl" />;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceipt(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!receipt) {
      toast.error("Please upload payment proof");
      return;
    }

    setProcessing(true);
    
    try {
      const formData = new FormData();
      formData.append('type', depositType);
      formData.append('amount', amount);
      formData.append('receipt', receipt);
      formData.append('paymentChannel', paymentMethod.payOption.toLowerCase());

      await axios.post('api/v1/users/me/transactions', formData);
      setSuccess(true);
      setStep(4);
      toast.success('Deposit submitted successfully!');
    } catch (err) {
      setError(err?.response?.data?.message || 'Deposit failed. Please try again.');
      toast.error(err?.response?.data?.message || 'Deposit failed. Please try again.');
    } finally {
      setProcessing(false);
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
        className="flex cursor-pointer items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors"
      >
        <BiArrowBack className="text-xl" />
        <span className="font-medium">Back</span>
      </button>

      {/* Progress Steps */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-light mb-4">
          {step === 1 && 'Select Deposit Type'}
          {step === 2 && 'Choose Payment Method'}
          {step === 3 && 'Complete Deposit'}
          {step === 4 && 'Deposit Submitted'}
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
                {stepNumber === 1 && 'Type'}
                {stepNumber === 2 && 'Method'}
                {stepNumber === 3 && 'Details'}
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

      {/* Step 1: Deposit Type */}
      {step === 1 && (
        <div className="space-y-4">
          <div 
            onClick={() => {
              setDepositType('investment deposit');
              setStep(2);
            }}
            className="p-4 border border-gray-500  rounded-xl cursor-pointer hover:border-indigo-300   hover:bg-indigo-900/10 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-900/20 rounded-lg text-indigo-400">
                <RiBankLine className="text-2xl" />
              </div>
              <div>
                <h3 className="font-medium text-text-light">Investment Deposit</h3>
                <p className="text-sm text-gray-400">
                  Funds will be available for investment plans
                </p>
              </div>
              <FiArrowRight className="ml-auto text-gray-400" />
            </div>
          </div>

          <div 
            onClick={() => {
              setDepositType('copytrade deposit');
              setStep(2);
            }}
            className="p-4 border border-gray-500 rounded-xl cursor-pointer hover:border-indigo-300  hover:bg-indigo-900/10  transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-900/20 rounded-lg text-purple-400">
                <RiWallet3Line className="text-2xl" />
              </div>
              <div>
                <h3 className="font-medium text-text-light">Copytrade Deposit</h3>
                <p className="text-sm text-gray-400">
                  Funds will be available for copy trading
                </p>
              </div>
              <FiArrowRight className="ml-auto text-gray-400" />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Payment Method */}
      {step === 2 && (
        <div className="space-y-4">
          {paymentOptions.map(option => (
            <div
              key={option.id}
              onClick={() => {
                setPaymentMethod(option);
                setStep(3);
              }}
               className="p-4 border border-gray-500  rounded-xl cursor-pointer hover:border-indigo-300   hover:bg-indigo-900/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-900/20 rounded-lg text-blue-400">
                  {getPaymentIcon(option.payOption)}
                </div>
                <div>
                  <h3 className="font-medium text-text-light capitalize">
                    {option.payOption === 'bank' ? 'Bank Transfer' : 
                     option.payOption === 'mobile wallet' ? 'Mobile Wallet' : 
                     option.payOption === 'crypto wallet' ? 'Crypto Wallet' : option.payOption}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {option.bank || option.payOption}
                  </p>
                </div>
                <FiArrowRight className="ml-auto text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 3: Deposit Details */}
      {step === 3 && paymentMethod && (
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Payment Method Details */}
          <div className="bg-indigo-900/10 p-5 rounded-xl border border-indigo-900">
            <h3 className="font-medium text-indigo-200 mb-3">
              {paymentMethod.payOption === 'bank' ? 'Bank Transfer' : 
               paymentMethod.payOption === 'mobile wallet' ? 'Mobile Wallet' : 
               paymentMethod.payOption === 'crypto wallet' ? 'Crypto Wallet' : paymentMethod.payOption} Details
            </h3>
            
            {paymentMethod.payOption.toLowerCase() === 'crypto wallet' ? (
              <div className="space-y-4">
                {/* Network */}
                <div className="flex justify-between py-2 border-b border-indigo-900">
                  <span className="text-sm text-indigo-300">Network:</span>
                  <span className="text-sm font-medium text-indigo-200">
                    {paymentMethod.bank}
                  </span>
                </div>
                
                {/* Wallet Address */}
                <div className="py-2">
                  <span className="text-sm text-indigo-300 block mb-1">
                    Wallet Address:
                  </span>
                  <div className="flex items-center gap-2 bg-indigo-900/20 p-3 rounded-lg border border-indigo-900">
                    <span className="text-sm font-mono break-all flex-1">
                      {paymentMethod.accountNumber}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        copyToClipboard(paymentMethod.accountNumber);
                      }}
                      className="cursor-pointer text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 p-1"
                      title="Copy to clipboard"
                    >
                      <BiCopy className="text-lg" />
                    </button>
                  </div>
                </div>

                {/* QR Code */}
                {paymentMethod.image && (
                  <div className="py-2">
                    <span className="text-sm text-indigo-700 dark:text-indigo-300 block mb-2">
                      Wallet QR Code:
                    </span>
                    <div className="flex justify-center bg-white p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                      <img 
                        src={paymentMethod.image} 
                        alt="Crypto Wallet QR Code" 
                        className="w-40 h-40 object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Warnings */}
                <div className="bg-yellow-900/10 p-3 rounded-lg border border-yellow-800">
                  <h4 className="text-yellow-300 text-sm font-semibold mb-1">
                    Important:
                  </h4>
                  <ul className="text-yellow-300 text-xs space-y-1">
                    <li className="flex items-start">
                      <span className="mr-1">•</span>
                      Only send {paymentMethod.bank} to this address
                    </li>
                    <li className="flex items-start">
                      <span className="mr-1">•</span>
                      Select the {paymentMethod.bank} network when transferring
                    </li>
                    <li className="flex items-start">
                      <span className="mr-1">•</span>
                      Incorrect transfers may result in lost funds
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between py-2 border-b border-indigo-100 dark:border-indigo-900/20">
                  <span className="text-sm text-indigo-700 dark:text-indigo-300">Bank:</span>
                  <span className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
                    {paymentMethod.bank}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-indigo-100 dark:border-indigo-900/20">
                  <span className="text-sm text-indigo-700 dark:text-indigo-300">Account Number:</span>
                  <span className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
                    {paymentMethod.accountNumber}
                  </span>
                </div>
                {paymentMethod.extra && (
                  <div className="py-2 text-sm text-indigo-700 dark:text-indigo-300">
                    {paymentMethod.extra}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Amount Input */}
          <div>
            <div className="relative">
              <span className="absolute left-2 top-[37px] z-50 text-gray-400">$</span>
              <InputField
                label=" Amount to Deposit"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                />
            </div>
          </div>

          {/* Receipt Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Payment Proof
            </label>
            <div className="flex flex-col items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-500 border-dashed rounded-xl cursor-pointer bg-gray-700 hover:bg-gray-600/50 transition-colors overflow-hidden">
                {previewImage ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={previewImage} 
                      alt="Receipt preview" 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <FiUpload className="text-white text-2xl" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                    <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG (MAX. 2MB)
                    </p>
                  </div>
                )}
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            isLoading={processing}
            disabled={processing}
            className="w-full py-3"
            variant="primary"
          >
            <AiOutlineTransaction className="mr-2" />
            Submit Deposit
          </Button>
        </form>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="text-center py-8">
          <div className="mx-auto w-20 h-20 bg-green-100  rounded-full flex items-center justify-center mb-6">
            <BiCheckCircle className="text-4xl text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-text-light mb-2">
            Deposit Submitted!
          </h2>
          <p className="text-gray-400 mb-6">
            Your deposit of {formatCurrency(amount)} is being processed. You'll receive a confirmation email shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/investor/transactions"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition-colors"
            >
              View Transactions
            </Link>
            <button
              onClick={() => {
                setStep(1);
                setAmount('');
                setReceipt(null);
                setPaymentMethod(null);
                setPreviewImage('');
                setSuccess(false);
              }}
              className="px-6 cursor-pointer py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg shadow transition-colors"
            >
              New Deposit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deposit;