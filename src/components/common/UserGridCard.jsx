import { FiEye, FiUserCheck, FiUserX, FiDollarSign } from 'react-icons/fi';
import StatusBadge from './StatusBadge';
import LoadingIndicator from './LoadingIndicator';
import defaultAvatar from './../../assets/images/default.jpg';
import{  FaUserCheck} from 'react-icons/fa'

const UserGridCard = ({ 
  user, 
  onView, 
  onStatusChange, 
  onFund,
  loading,
  updating,
  isSelected
}) => {
  return (
    <div className="bg-card rounded-xl border border-card-border overflow-hidden hover:border-primary/30 transition-colors">
      <div className="h-32 bg-cover bg-center bg-gradient-to-r from-primary/20 to-primary/10"></div>
      <div className="px-4 pb-4 relative">
        <div className="flex justify-center -mt-16 mb-4">
          <img 
            src={user.photo || defaultAvatar} 
            alt={user.firstName} 
            className="h-24 w-24 rounded-full border-4 border-card"
          />
        </div>
        
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold">
            {`${user.firstName} ${user.lastName}`.trim() || 'Unknown'}
          </h3>
          <p className="text-sm text-text-light">{user.email}</p>
          <div className="mt-2">
            <StatusBadge status={user.status} />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center mb-4">
          <div>
            <p className="text-xs text-text-light">Balance</p>
            <p className="font-medium">${user.wallet?.balance?.toLocaleString() || '0'}</p>
          </div>
          <div>
            <p className="text-xs text-text-light">Profit</p>
            <p className="font-medium">${user.wallet?.profit?.toLocaleString() || '0'}</p>
          </div>
          <div>
            <p className="text-xs text-text-light">Referral</p>
            <p className="font-medium">${user.wallet?.referralBalance?.toLocaleString() || '0'}</p>
          </div>
        </div>
        
        <div className="flex justify-between gap-2">
          <button
            onClick={() => onView(user)}
            className="cursor-pointer flex-1 bg-bg-dark text-primary hover:bg-primary/10 py-2 rounded flex items-center justify-center gap-1"
          >
            <FiEye className="h-4 w-4" /> View
          </button>
          
          {user.status === 'pending' ? (
            <button
              onClick={() => onStatusChange('approve', user)}
              disabled={updating && isSelected}
              className="cursor-pointer flex-1 bg-green-500/10 text-green-500 hover:bg-green-500/20 py-2 rounded flex items-center justify-center gap-1"
            >
              {updating && isSelected ? (
                <LoadingIndicator size={3} />
              ) : (
                <>
                  <FiUserCheck className="h-4 w-4" /> Approve
                </>
              )}
            </button>
          ) : user.status === 'active' ?(
            <button
              onClick={() => onStatusChange('deactivate', user)}
              disabled={updating && isSelected}
              className="cursor-pointer flex-1 px-2 bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 py-2 rounded flex items-center justify-center gap-1"
            >
              {updating && isSelected ? (
                <LoadingIndicator size={3} />
              ) : (
                <>
                  <FiUserX className="h-4 w-4" /> Deactivate
                </>
              )}
            </button>
          ):(
            <button
              onClick={() => onStatusChange('approve', user)}
              className="text-green-500 cursor-pointer bg-green-500/10 hover:text-green-600 flex-1 px-2 flex py-2 rounded items-center justify-center gap-1"
              disabled={updating && isSelected}
            >
              {updating && isSelected ? (
                  <LoadingIndicator size={4} />
              ) : (
                <>
                 <FaUserCheck className="h-5 w-5" />Activate
                </>
                 
              )}
            </button>
          )}
          
          <button
            onClick={() => onFund(user)}
            className="cursor-pointer flex-1 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 py-2 rounded flex items-center justify-center gap-1"
          >
            <FiDollarSign className="h-4 w-4" /> Fund
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserGridCard;