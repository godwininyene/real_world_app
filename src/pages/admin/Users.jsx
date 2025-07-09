import { useState, useEffect } from 'react';
import { FiUsers, FiGrid, FiList, FiSearch, FiFilter, FiCheckCircle,FiClock,FiDollarSign } from 'react-icons/fi';
import axios from '../../lib/axios';
import UserStatsCard from '../../components/common/UserStatsCard';
import UserListTable from '../../components/common/UserListTable';
import UserGridCard from '../../components/common/UserGridCard';
import EmptyState from '../../components/common/EmptyState';
import SelectField from '../../components/common/SelectField';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import Modal from '../../components/CustomModal';
import UserDetail from './UserDetail';
import FundAccount from './FundAccount';
import { FaUserCheck } from 'react-icons/fa6';
import { toast } from 'react-toastify';

export default function Users() {
  const [displayStyle, setDisplayStyle] = useState('list');
  const [screen, setScreen] = useState('list');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, searchTerm, users]);

   const updateUserInList = (user, action = "update") => {
        if (action === "delete") {
            setUsers(prev => prev.filter(u => u.id !== user.id));
        } else {
            setUsers(prev => prev.map(u => u.id === user.id ? user : u));
        }
    };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('api/v1/users');
      setUsers(res.data.data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...users];
    
    if (filters.status !== 'all') {
      result = result.filter(user => user.status === filters.status);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.firstName.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term) ||
        user.phone?.toLowerCase().includes(term)
      );
    }
    
    setFilteredUsers(result);
  };

  const updateUserStatus = async (status, user) => {
     if (!window.confirm(`Are you sure you want to ${status} this account?`)) return;
    setSelectedUser(user);
    try {
      setUpdating(true);
      const res = await axios.patch(`api/v1/users/${user.id}/status`, { status });
      setUsers(prev => prev.map(u => u.id === user.id ? res.data.data.user : u));
      setSelectedUser(res.data.data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const deleteUser = async (user) => {
    if (!window.confirm(`Are you sure you want to delete ${user.firstName}? This action will delete all the user related data`)) return;
    
    setDeleting(true);
    try {
        const res = await axios.delete(`api/v1/users/${user.id}`);
        if (res.status === 204) {
            updateUserInList(user, 'delete');
            toast.success("User deleted successfully");
            setUserModal(false);
        }
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete user");
        console.error(error);
    } finally {
        setDeleting(false);
    }
};

  return (
    <div className="space-y-6">
        {screen === 'list' && <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                <FiUsers className="text-primary" /> 
                User Management
                </h1>
        
                <div className="flex items-center gap-2">
                <button 
                    onClick={() => setDisplayStyle('list')}
                    className={`p-2 rounded-lg ${displayStyle === 'list' ? 'bg-primary/10 text-primary' : 'bg-card text-text-light'}`}
                >
                    <FiList className="h-5 w-5" />
                </button>
                <button 
                    onClick={() => setDisplayStyle('grid')}
                    className={`p-2 rounded-lg ${displayStyle === 'grid' ? 'bg-primary/10 text-primary' : 'bg-card text-text-light'}`}
                >
                    <FiGrid className="h-5 w-5" />
                </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-card rounded-xl border border-card-border p-4">
                <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-text-light" />
                    </div>
                    <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 w-full p-2 border border-card-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent bg-bg-dark"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <SelectField
                    options={[
                    { value: 'all', label: 'All Status' },
                    { value: 'active', label: 'Active' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'deactivated', label: 'Deactivated' }
                    ]}
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    icon={<FiFilter className="h-4 w-4" />}
                    variant="outline"
                />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <UserStatsCard
                icon={<FiUsers size={20} />}
                title="Total Users"
                value={filteredUsers.length}
                color="blue"
                />
                <UserStatsCard
                icon={<FiCheckCircle size={20} />}
                title="Active Users"
                value={filteredUsers.filter(u => u.status === 'active').length}
                color="green"
                />
                <UserStatsCard
                icon={<FiClock size={20} />}
                title="Pending Users"
                value={filteredUsers.filter(u => u.status === 'pending').length}
                color="orange"
                />
                <UserStatsCard
                icon={<FiDollarSign size={20} />}
                title="Total Balance"
                value={`$${filteredUsers.reduce((sum, user) => sum + (user.wallet[0]?.balance || 0), 0).toLocaleString()}`}
                color="purple"
                />
            </div>

            {/* Users Display */}
            {loading && !users.length ? (
                <div className="flex justify-center p-12">
                <LoadingIndicator type="dots" size={10} />
                </div>
            ) : filteredUsers.length > 0 ? (
                displayStyle === 'list' ? (
                <UserListTable 
                    users={filteredUsers} 
                    onView={(user) => { setSelectedUser(user); setUserModal(true); }}
                    onStatusChange={updateUserStatus}
                    onFund={(user) => { setSelectedUser(user); setScreen('fund'); }}
                    loading={loading}
                    updating={updating}
                    selectedUser={selectedUser}
                    onDelete={deleteUser}
                    deleting={deleting}
                />
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUsers.map(user => (
                    <UserGridCard
                        key={user.id}
                        user={user}
                        onView={() => { setSelectedUser(user); setUserModal(true);}}
                        onStatusChange={updateUserStatus}
                        onFund={() => { setSelectedUser(user); setScreen('fund'); }}
                        loading={loading}
                        isSelected={selectedUser?.id === user.id}
                        updating={updating}
                    />
                    ))}
                </div>
                )
            ) : (
                <EmptyState 
                title="No users found"
                description="Try adjusting your search or filter criteria"
                icon={<FiUsers className="h-12 w-12 text-text-light" />}
                />
            )}

            {/* User Detail Modal */}
            <Modal show={userModal} maxWidth="sm" onClose={() => setUserModal(false)}>
                {selectedUser && (
                <UserDetail 
                    user={selectedUser}
                    onClose={() => setScreen('list')}
                    onStatusChange={updateUserStatus}
                    onFund={() =>{ setScreen('fund'); setUserModal(false);}}
                    statusBadge={statusBadge}
                    updating={updating}
                />
                )}
            </Modal>
        </>}

      {/* Fund User Screen */}
      {screen === 'fund' && (
        <FundAccount 
          user={selectedUser} 
          onBack={() => setScreen('list')}
          onFunded={(user) => {
            setSelectedUser(user);
            setUsers(prev => prev.map(u => u.id === user.id ? user : u));
          }}
        />
      )}
    </div>
  );
}

// Helper function for status badge
const statusBadge = (status) => {
    const baseClass = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
    switch(status) {
        case 'active':
            return <span className={`${baseClass} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`}>
                <FaUserCheck className="h-4 w-4 mr-1" /> Active
            </span>;
        case 'denied':
            return <span className={`${baseClass} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`}>
                <FaUserTimes className="h-4 w-4 mr-1" /> Denied
            </span>;
        case 'pending':
            return <span className={`${baseClass} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`}>
                <FaUserClock className="h-4 w-4 mr-1" /> Pending
            </span>;
        case 'deactivated':
            return <span className={`${baseClass} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`}>
                <FaUserTimes className="h-4 w-4 mr-1" /> Deactivated
            </span>;
        default:
            return <span className={`${baseClass} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`}>
                Unknown
            </span>;
    }
};