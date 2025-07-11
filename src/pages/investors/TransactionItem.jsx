import { BiWallet, BiMoneyWithdraw } from 'react-icons/bi';
import { FaChartLine } from 'react-icons/fa';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import moment from 'moment';

const TransactionItem = ({ transaction }) => {
  // Status color mapping
  const statusColors = {
    success: 'bg-green-500',
    pending: 'bg-amber-500',
    failed: 'bg-red-500',
    declined: 'bg-red-500'
  };

  // Icon mapping with explicit color control
  const getTransactionIcon = () => {
    const type = transaction.type.toLowerCase();
    const statusColor = getStatusTextColor();
    
    // Base icon props with forced color
    const iconProps = {
      className: `w-5 h-5 text-${statusColor}-500`,
      style: { color: 'inherit' } // Override any inline color styles
    };

    const icons = {
      'investment deposit': <BiWallet {...iconProps} />,
      'copytrade deposit': <BiWallet {...iconProps} />,
      'withdrawal': <BiMoneyWithdraw {...iconProps} />,
      'investment': <FaChartLine {...iconProps} />,
      'deposit': <BiWallet {...iconProps} />,
      'transfer': <FaMoneyBillTransfer {...iconProps} />
    };

    return icons[type] || icons['deposit'];
  };

  // Get status background color class
  const getStatusBgColor = () => {
    const status = transaction.status.toLowerCase();
    return statusColors[status] || 'bg-gray-400';
  };

  // Get status text color class
  const getStatusTextColor = () => {
    const status = transaction.status.toLowerCase();
    if (status === 'success') return 'green';
    if (status === 'pending') return 'amber';
    return 'red';
  };

  return (
    <div className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-l-0 last:pb-0 group">
      {/* Timeline dot */}
      <div className={`absolute left-0 w-4 h-4 rounded-full -translate-x-1/2 ${getStatusBgColor()} border-4 border-white dark:border-gray-800 z-10`}></div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-bg-dark rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${getStatusBgColor()} bg-opacity-10`}>
            {getTransactionIcon()}
          </div>
          <div>
            <h4 className="font-medium capitalize">{transaction.type}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {moment(transaction.createdAt).fromNow()}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className={`text-lg font-semibold ${transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </p>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBgColor()} bg-opacity-20 text-${getStatusTextColor()}-800 dark:text-${getStatusTextColor()}-200`}>
            {transaction.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;