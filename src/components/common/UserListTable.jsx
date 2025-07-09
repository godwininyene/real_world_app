import { FiEye, FiUserCheck, FiUserX, FiDollarSign} from 'react-icons/fi';
import StatusBadge from './StatusBadge';
import LoadingIndicator from './LoadingIndicator';
import defaultAvatar from './../../assets/images/default.jpg';
import { BiTrashAlt} from 'react-icons/bi'
import{  FaUserCheck} from 'react-icons/fa'

const UserListTable = ({ 
  users, 
  onView, 
  onStatusChange, 
  onDelete, 
  onFund,
  loading,
  selectedUser,
  deleting,
  updating
}) => {
  return (
    <div className="bg-card rounded-xl border border-card-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-card-border">
          <thead className="bg-bg-dark">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">Balance</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-card-border">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center">
                  <LoadingIndicator type="dots" size={8} />
                </td>
              </tr>
            ) : users.length ? (
              users.map(user => (
                <tr key={user.id} className="hover:bg-bg-dark transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <img 
                        src={user.photo || defaultAvatar} 
                        alt={user.firstName} 
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium">
                          {`${user.firstName} ${user.lastName}`.trim() || 'Unknown'}
                        </div>
                        <div className="text-sm text-text-light">
                          {user.phone || 'No phone'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {user.email}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium">
                    ${user.wallet?.balance?.toLocaleString() || '0'}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-4 py-4 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button onClick={() => onView(user)} className="cursor-pointer text-primary hover:text-primary-light">
                        <FiEye className="h-5 w-5" />
                      </button>
                      {user.status === 'pending' ? (
                        <button
                          onClick={() => onStatusChange('approve', user)}
                          disabled={updating && selectedUser?.id === user.id}
                          className="text-green-500 cursor-pointer hover:text-green-400"
                        >
                          {updating && selectedUser?.id === user.id ? (
                            <LoadingIndicator size={4} />
                          ) : (
                            <FiUserCheck className="h-5 w-5" />
                          )}
                        </button>
                      ): user.status === 'active' ? (
                        <button
                            onClick={() => onStatusChange('deactivate', user)}
                            className="text-orange-500 cursor-pointer  hover:text-orange-400"
                            disabled={updating && selectedUser?.id === user.id}
                          >
                            {updating && selectedUser?.id === user.id ? (
                                <LoadingIndicator size={4} />
                            ) : (
                                <FiUserX  className="h-5 w-5" />
                            )}
                        </button>
                      ):(
                        <button
                            onClick={() => onStatusChange('approve', user)}
                            className="text-green-600 cursor-pointer dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                            disabled={updating && selectedUser?.id === user.id}
                        >
                            {updating && selectedUser?.id === user.id ? (
                                <LoadingIndicator size={4} />
                            ) : (
                                <FaUserCheck className="h-5 w-5" />
                            )}
                        </button>
                      )}
                     
                      <button
                        onClick={() => onDelete(user)}
                        className="text-red-600 cursor-pointer dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        disabled={deleting && selectedUser?.id === user.id}
                      >
                        {deleting && selectedUser?.id === user.id ? (
                            <LoadingIndicator size={4} />
                        ) : (
                            <BiTrashAlt className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-text-light">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListTable;