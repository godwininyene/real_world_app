import { useEffect, useState } from 'react';
import { 
  BiSave, 
  BiTrashAlt, 
  BiWallet,
  BiEditAlt,
  BiPlus
} from 'react-icons/bi';
import { 
  BsBank, 
  BsEye, 
  BsEyeSlash,
  BsCreditCard,
  BsQrCode
} from 'react-icons/bs';
import { GiBank } from 'react-icons/gi';
import { FaBitcoin } from 'react-icons/fa';
import axios from '../../lib/axios';
import Modal from '../../components/CustomModal';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import InputField from '../../components/common/InputField';
import SelectField from '../../components/common/SelectField';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import { toast } from 'react-toastify';

const PaymentOptions = () => {
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Payment option types
  const paymentTypes = [
    { value: 'bank', label: 'Bank Transfer', icon: <BsBank className="mr-2" /> },
    { value: 'mobile_wallet', label: 'Mobile Wallet', icon: <BiWallet className="mr-2" /> },
    { value: 'crypto_wallet', label: 'Crypto Wallet', icon: <FaBitcoin className="mr-2" /> },
    { value: 'card', label: 'Credit/Debit Card', icon: <BsCreditCard className="mr-2" /> }
  ];

  useEffect(() => {
    fetchPaymentOptions();
  }, []);

  const fetchPaymentOptions = async () => {
    setLoadingOptions(true);
    try {
      const res = await axios.get('api/v1/paymentOptions');
      if (res.data.status === 'success') {
        setPaymentOptions(res.data.data.paymentOptions);
        setFetched(true);
      }
    } catch (err) {
      console.log('Error fetching payment options:', err);
      toast.error(err.response?.data?.message || 'Error fetching payment options');
    } finally {
      setLoadingOptions(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    const formData = new FormData(e.target);

    try {
      const res = await axios.post('api/v1/paymentOptions', formData);
      if (res.data.status === 'success') {
        toast.success('Payment option added successfully!');
        setPaymentOptions(prev => [res.data.data.paymentOption, ...prev]);
        e.target.reset();
        setShowForm(false);
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        const newErrors = {};
        err.response.data.errors.forEach(el => {
          for (let key in el) {
            newErrors[key] = el[key];
          }
        });
        setErrors(newErrors);
      }
      console.log('Error saving payment option:', err);
      toast.error(err.response?.data?.message || 'Error saving payment option');
    } finally {
      setProcessing(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    const formData = new FormData(e.target);

    try {
      const res = await axios.patch(`api/v1/paymentOptions/${selectedOption.id}`, formData);
      if (res.data.status === 'success') {
        toast.success('Payment option updated successfully!');
        setPaymentOptions(prev => 
          prev.map(option => 
            option.id === selectedOption.id ? res.data.data.paymentOption : option
          )
        );
        setEditModal(false);
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        const newErrors = {};
        err.response.data.errors.forEach(el => {
          for (let key in el) {
            newErrors[key] = el[key];
          }
        });
        setErrors(newErrors);
      }
      console.log('Error updating payment option:', err);
      toast.error(err.response?.data?.message || 'Error updating payment option');
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this payment option?')) return;

    setDeleting(true);
    try {
      await axios.delete(`api/v1/paymentOptions/${selectedOption.id}`);
      setPaymentOptions(prev => prev.filter(option => option.id !== selectedOption.id));
      setEditModal(false);
      toast.success('Payment option deleted successfully!');
    } catch (err) {
      console.log('Error deleting payment option:', err);
      toast.error(err.response?.data?.message || 'Failed to delete payment option');
    } finally {
      setDeleting(false);
    }
  };

  const getOptionIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'bank':
        return <BsBank className="text-blue-500" />;
      case 'mobile wallet':
        return <BiWallet className="text-green-500" />;
      case 'crypto wallet':
        return <FaBitcoin className="text-orange-500" />;
      case 'card':
        return <BsCreditCard className="text-purple-500" />;
      default:
        return <BsBank className="text-gray-500" />;
    }
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BsBank className="text-blue-600 dark:text-blue-400" /> 
          Payment Options
        </h1>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Add Payment Option Form */}
        {showForm ? (
          <div className="bg-slate-800 rounded-lg shadow p-6 col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add New Payment Option</h2>
              <button
                onClick={() => setShowForm(false)}
                className="cursor-pointer text-gray-500 hover:text-gray-300"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <SelectField
                name="payOption"
                label="Payment Method Type"
                options={['Bank Transfer', 'Mobile Wallet', 'Crypto Wallet']}
                required
                error={errors.payOption}
                variant="outline"
                classNames="border-slate-700"
              />

              <InputField
                name="bank"
                label="Bank Name / Wallet Provider"
                placeholder="e.g. Chase Bank, PayPal, Bitcoin"
                required
                error={errors.bank}
                variant="outline"
                classNames="border-slate-700"
                uncontrolled={true}
              />

              <InputField
                name="accountNumber"
                label="Account Number / Wallet Address"
                placeholder="Enter account details"
                required
                error={errors.accountNumber}
                variant="outline"
                classNames="border-slate-700"
                uncontrolled={true}
              />
              <div>
                <label className="block text-sm font-medium mb-1">
                    Image/QR Code
                </label>
                <div className="flex items-center gap-2">
                    <label className="flex-1 cursor-pointer border border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-slate-700">
                        <input 
                        type="file" 
                        name="image" 
                        accept="image/*" 
                        className="hidden"
                        />
                        <BsQrCode className="mx-auto h-8 w-8 text-gray-400" />
                        <span className="mt-2 block text-sm text-gray-500 dark:text-gray-400">
                        Upload Image
                        </span>
                    </label>
                </div>
                    {errors.image && (
                    <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                    )}
              </div>
                <InputField
                  name="extra"
                  label="Additional Info (Optional)"
                  placeholder="e.g. Info on what coin to deposit"
                  error={errors.extra}
                  variant="outline"
                  classNames="border-slate-700"
                  isRequired={false}
                  uncontrolled={true}
                />

                 <Button
                    type='submit'
                    isLoading={processing}
                    disabled={processing}
                    icon={<BiSave/>}
                    className="w-full"
                >
                    Save Payment Option
                </Button>
            </form>
          </div>
        ) : (
          <div className="lg:col-span-1 flex items-center justify-center self-start">
            <button
              onClick={() => setShowForm(true)}
              className="cursor-pointer w-full h-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <BiPlus className="h-10 w-10 text-gray-400  mb-2" />
              <span className="text-gray-400 font-medium">
                Add New Payment Option
              </span>
            </button>
          </div>
        )}

        {/* Payment Options List */}
        <div className="bg-slate-800 rounded-lg shadow overflow-hidden lg:col-span-3">
          <div className="p-4 border-b border-gray-600  flex justify-between items-center">
            <h2 className="font-semibold text-lg text-text-light">All Payment Options</h2>
            <span className="text-sm text-gray-400">
              {paymentOptions.length} {paymentOptions.length === 1 ? 'Option' : 'Options'}
            </span>
          </div>

          {loadingOptions ? (
            <div className="p-8 text-center">
              <LoadingIndicator type="dots" size={8} />
            </div>
          ) : paymentOptions.length > 0 ? (
            <div className="divide-y divide-slate-600">
              {paymentOptions.map(option => (
                <div 
                  key={option.id} 
                  className="p-4 hover:bg-slate-700 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedOption(option);
                    setEditModal(true);
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 rounded-full bg-slate-700 text-gray-300">
                      {getOptionIcon(option.payOption)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-text-light">
                        {option.bank}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {option.accountNumber}
                      </p>
                      {option.extra && (
                        <p className="text-sm text-gray-400 mt-1">
                          {option.extra}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        option.displayStatus 
                          ? ' bg-green-900 text-green-200'
                          : ' bg-gray-700 text-gray-200'
                      }`}>
                        {option.displayStatus ? (
                          <>
                            <BsEye className="mr-1" /> Visible
                          </>
                        ) : (
                          <>
                            <BsEyeSlash className="mr-1" /> Hidden
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                  
                  {option.image && (
                    <div className="mt-3 flex justify-center">
                      <img 
                        src={option.image} 
                        alt="Payment method" 
                        className="h-24 object-contain rounded border border-slate-400"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState 
              title="No payment options found"
              description="Add your first payment option to get started"
              icon={<BsBank className="h-12 w-12 text-gray-400" />}
            />
          )}
        </div>
      </div>

      {/* Edit Payment Option Modal */}
      <Modal show={editModal} maxWidth="md" onClose={() => setEditModal(false)}>
        {selectedOption && (
          <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden relative z-50">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
              <h2 className="font-bold text-slate-300">Edit Payment Option</h2>
              <button
                onClick={() => setEditModal(false)}
                className="cursor-pointer text-gray-500 hover:text-gray-300"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="p-6 space-y-4 text-white" >
              <SelectField
                name="payOption"
                label="Payment Method Type"
                options={['Bank Transfer', 'Mobile Wallet', 'Crypto Wallet']}
                defaultValue={selectedOption.payOption}
                required
                error={errors.payOption}
                isRequired={false}
                variant="outline"
                classNames="border-slate-700"
              />

              <InputField
                name="bank"
                label="Bank Name / Wallet Provider"
                placeholder="e.g. Chase Bank, PayPal, Bitcoin"
                defaultValue={selectedOption.bank}
                required
                error={errors.bank}
                variant="outline"
                classNames="border-slate-700"
                uncontrolled={true}
              />

              <InputField
                name="accountNumber"
                label="Account Number / Wallet Address"
                placeholder="Enter account details"
                defaultValue={selectedOption.accountNumber}
                required
                error={errors.accountNumber}
                variant="outline"
                classNames="border-slate-700"
                uncontrolled={true}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-slate-300 text-gray-500">
                    Image/QR Code
                  </label>
                  <div className="flex flex-col items-center gap-2">
                    {selectedOption.image && (
                      <img 
                        src={selectedOption.image} 
                        alt="Current payment option" 
                        className="h-24 object-contain rounded border border-gray-200 dark:border-slate-600 mb-2"
                      />
                    )}
                    <label className="w-full cursor-pointer border border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-2 text-center hover:bg-gray-50 dark:hover:bg-slate-700">
                      <input 
                        type="file" 
                        name="image" 
                        accept="image/*" 
                        className="hidden"
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedOption.image ? 'Change Image' : 'Upload Image'}
                      </span>
                    </label>
                  </div>
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                  )}
                </div>

                <InputField
                  name="extra"
                  label="Additional Info (Optional)"
                  placeholder="e.g. Branch name, network type"
                  defaultValue={selectedOption.extra}
                  error={errors.extra}
                  isRequired={false}
                  variant="outline"
                  classNames="dark:bg-slate-700 dark:border-slate-700"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
                  disabled={deleting}
                >
                  {deleting ? (
                    <LoadingIndicator size={4} />
                  ) : (
                    <>
                      <BiTrashAlt className="h-5 w-5" /> Delete
                    </>
                  )}
                </button>
                
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditModal(false)}
                    className="cursor-pointer px-4 py-2 border text-slate-300 border-slate-600 rounded-lg text-sm font-medium hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                   <Button
                        type='submit'
                        isLoading={processing}
                        disabled={processing}
                        icon={<BiSave/>}
                        className="w-full"
                    >
                        Save Changes
                    </Button>


                </div>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PaymentOptions;