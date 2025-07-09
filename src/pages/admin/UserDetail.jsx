import { FiUser, FiMail, FiPhone, FiDollarSign, FiCheck, FiX, FiTrash2, FiClock } from 'react-icons/fi';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import defaultAvatar from './../../assets/images/default.jpg';

const UserDetail = ({ user, onStatusChange, onDelete, onFund, onClose, updating, deleting }) => {
  return (
    <div className="bg-card rounded-xl border border-card-border overflow-hidden max-w-md mx-auto relative z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/20 p-4 flex justify-between items-center border-b border-card-border">
        <h3 className="text-lg font-semibold text-white">User Details</h3>
        <button 
          onClick={onClose}
          className="text-gray-300 hover:text-white transition-colors"
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>
      
      {/* Profile Section */}
      <div className="p-4">
        <div className="flex flex-col items-center mb-4">
          <img 
            src={user.photo || defaultAvatar} 
            alt={user.firstName} 
            className="h-20 w-20 rounded-full border-4 border-card mb-3 object-cover"
          />
          <h2 className="text-lg font-bold text-white text-center">
            {user.firstName} {user.lastName}
          </h2>
          <div className="mt-1">
            <StatusBadge status={user.status} />
          </div>
        </div>

        {/* User Info Grid - Compact version */}
        <div className="grid grid-cols-1 gap-2 mb-4">
          <InfoItem 
            icon={<FiUser className="h-4 w-4" />}
            label="Full Name"
            value={`${user.firstName || 'Not provided'} ${user.lastName || ''}`}
          />
          
          <InfoItem 
            icon={<FiMail className="h-4 w-4" />}
            label="Email"
            value={user.email}
          />
          
          <InfoItem 
            icon={<FiPhone className="h-4 w-4" />}
            label="Phone"
            value={user.phone || 'Not provided'}
          />
        </div>

        {/* Wallet Summary - Compact version */}
        {/* <div className="hidden bg-bg-dark rounded-lg p-3 mb-4 border border-card-border">
          <h4 className="text-xs font-semibold mb-2 text-gray-400">Wallet Summary</h4>
          <div className="grid grid-cols-3 gap-1">
            <WalletItem label="Balance" value={user.wallet?.balance} />
            <WalletItem label="Profit" value={user.wallet?.profit} />
            <WalletItem label="Referral" value={user.wallet?.referralBalance} />
          </div>
        </div> */}

        {/* Action Buttons - Stacked on mobile */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <ActionButton
            onClick={() => user.status === 'active' 
              ? onStatusChange('deactivate', user) 
              : onStatusChange('approve', user)}
            disabled={updating}
            active={user.status === 'active'}
            updating={updating}
            icon={<FiCheck className="h-4 w-4" />}
            label={user.status === 'active' ? 'Deactivate' : 'Activate'}
          />

          <ActionButton
            onClick={onFund}
            icon={<FiDollarSign className="h-4 w-4" />}
            label="Fund"
            primary
          />

          <ActionButton
            onClick={() => onDelete(user)}
            disabled={deleting}
            updating={deleting}
            icon={<FiTrash2 className="h-4 w-4" />}
            label="Delete"
            danger
          />
        </div>
      </div>
    </div>
  );
};

// Sub-components for better organization
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center p-2 rounded-lg bg-bg-dark">
    <div className="p-1.5 rounded-full bg-primary/10 text-primary mr-2">
      {icon}
    </div>
    <div className="overflow-hidden">
      <p className="text-xs text-gray-400 truncate">{label}</p>
      <p className="text-sm font-medium text-white truncate">{value}</p>
    </div>
  </div>
);

const WalletItem = ({ label, value }) => (
  <div className="text-center">
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-sm font-medium text-white">${(value || 0).toLocaleString()}</p>
  </div>
);

const ActionButton = ({ onClick, disabled, updating, icon, label, active, primary, danger }) => {
  let className = "flex flex-col items-center justify-center cursor-pointer  p-2 rounded-lg transition-colors ";
  className += disabled ? "cursor-not-allowed " : "cursor-pointer ";
  if (primary) {
    className += "bg-primary/10 text-primary hover:bg-primary/20 ";
  } else if (danger) {
    className += "bg-red-500/10 text-red-500 hover:bg-red-500/20 ";
  } else if (active) {
    className += "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 ";
  } else {
    className += "bg-green-500/10 text-green-500 hover:bg-green-500/20 ";
  }

  if (disabled) {
    className += "opacity-70";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {updating ? (
        <LoadingIndicator size={3} />
      ) : (
        <>
          <span className="mb-0.5">{icon}</span>
          <span className="text-xs">{label}</span>
        </>
      )}
    </button>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    active: {
      color: 'bg-green-500/10 text-green-500',
      icon: <FiCheck className="h-3 w-3 mr-1" />,
      text: 'Active'
    },
    pending: {
      color: 'bg-orange-500/10 text-orange-500',
      icon: <FiClock className="h-3 w-3 mr-1" />,
      text: 'Pending'
    },
    deactivated: {
      color: 'bg-red-500/10 text-red-500',
      icon: <FiX className="h-3 w-3 mr-1" />,
      text: 'Deactivated'
    },
    denied: {
      color: 'bg-red-500/10 text-red-500',
      icon: <FiX className="h-3 w-3 mr-1" />,
      text: 'Denied'
    }
  };

  const config = statusConfig[status] || {
    color: 'bg-gray-500/10 text-gray-500',
    icon: <FiUser className="h-3 w-3 mr-1" />,
    text: 'Unknown'
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.icon}
      {config.text}
    </span>
  );
};

export default UserDetail;