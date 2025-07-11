import React, { useEffect, useState } from 'react';
import { BiSave, BiTrash, BiCopy } from 'react-icons/bi';
import { FiX } from 'react-icons/fi';
import { RiBankLine, RiWallet3Line } from 'react-icons/ri';
import { MdAdd } from 'react-icons/md';
import axios from '../../lib/axios';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';

const BankAccounts = () => {
  const [addNewBank, setAddBankState] = useState(false);
  const [error, setError] = useState({});
  const [processing, setProcessing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [banks, setBanks] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const fetchMyAccounts = async () => {
    try {
      const res = await axios.get('api/v1/users/me/banks');
      if (res.data.status === 'success') {
        setBanks(res.data.data.accounts);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch accounts');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyAccounts();
  }, []);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (accountId) => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this account?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              setDeletingId(accountId);
              const res = await axios.delete(`api/v1/users/me/banks/${accountId}`);
              if (res.status === 204) {
                setBanks(banks.filter(bank => bank.id !== accountId));
                toast.success('Account deleted successfully');
              }
            } catch (error) {
              toast.error(error?.response?.data?.message || 'Failed to delete account');
              console.error(error);
            } finally {
              setDeletingId(null);
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError({});

    const formElement = e.target;
    const form = new FormData(formElement);
    const jsonData = Object.fromEntries(form);

    try {
      const res = await axios.post('api/v1/users/me/banks', jsonData);
      if (res.data.status === 'success') {
        setBanks([...banks, res.data.data.account]);
        toast.success('Account added successfully');
        setAddBankState(false);
        formElement.reset();
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setError(error.response.data.errors);
      }
      toast.error(error?.response?.data?.message || 'Failed to save account. Please try again');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 relative z-50 rounded-xl bg-bg-dark">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-text-light">
          Withdrawal Accounts
        </h2>
        {!addNewBank ? (
          <Button
            onClick={() => setAddBankState(true)}
            variant="primary"
            icon={<MdAdd className="" />}
          >
            Add New Account
          </Button>
        ) : (
          <Button
            onClick={() => setAddBankState(false)}
            variant="outline"
            icon={<FiX className="" />}
          >
            Cancel
          </Button>
        )}
      </div>

      {addNewBank ? (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-500 mb-6">
          <h3 className="font-medium text-text-light mb-4">
            Add New Withdrawal Account
          </h3>
          <form onSubmit={submit}>
            <InputField
                name="network"
                placeholder="e.g. Bitcoin, Ethereum, Bank Name"
                label="Network Name"
                error={error.network}
                icon={<RiBankLine />}
                classNames='mb-4'
                uncontrolled={true}
            />
            <InputField
                name="walletAddress"
                placeholder="Wallet address"
                label="Wallet Address"
                error={error.walletAddress}
                uncontrolled={true}
                icon={<RiWallet3Line />}
            />
           
            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                isLoading={processing}
                disabled={processing}
                variant="primary"
                icon={<BiSave />}
                className="w-full md:w-auto"
              >
                Save Account
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          {banks?.length > 0 ? (
            banks.map((bank) => (
              <div 
                key={bank.id} 
                className="relative bg-gray-800 rounded-xl border border-gray-500 p-5 hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-500 dark:text-indigo-400">
                      {bank.network.toLowerCase().includes('bank') ? (
                        <RiBankLine className="text-2xl" />
                      ) : (
                        <RiWallet3Line className="text-2xl" />
                      )}
                    </div>
                    <div>
                      <label className='text-xs text-gray-400'>Network</label>
                      <p className="font-medium text-text-light">{bank.network}</p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className='text-xs text-gray-400'>Wallet/Account Details</label>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm break-all flex-1 text-text-light">
                        {bank.walletAddress}
                      </p>
                      <button
                        onClick={() => copyToClipboard(bank.walletAddress, bank.id)}
                        className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 p-1"
                        title="Copy to clipboard"
                      >
                        {copiedId === bank.id ? (
                          <span className="text-xs text-green-500">Copied!</span>
                        ) : (
                          <BiCopy className="text-lg" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDelete(bank.id)}
                  disabled={deletingId === bank.id}
                  className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  title="Delete account"
                >
                  {deletingId === bank.id ? (
                    <LoadingIndicator className="h-4 w-4" />
                  ) : (
                    <BiTrash className="h-4 w-4" />
                  )}
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-4 bg-gray-800 rounded-xl border border-gray-500">
              <RiWallet3Line className="mx-auto text-4xl text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">
                No Withdrawal Accounts
              </h3>
              <p className="text-gray-400 mb-6">
                You haven't added any withdrawal accounts yet.
              </p>
              <div className="flex justify-center">
                <Button
                onClick={() => setAddBankState(true)}
                variant="primary"
                icon={<MdAdd />}
                >
                    Add Your First Account
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BankAccounts;