import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUser, FiLock, FiBell, FiMail, FiCamera } from 'react-icons/fi';
import { RiShieldKeyholeLine, RiLogoutCircleLine } from 'react-icons/ri';
import axios from '../../lib/axios';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import InputField from '../../components/common/InputField';
import defaultAvatar from '../../assets/images/default.jpg';
import { toast } from 'react-toastify';
import Button from '../../components/common/Button';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const initialUser = JSON.parse(localStorage.getItem('user'));
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(initialUser?.photo || defaultAvatar);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Profile form
  const { 
    register: registerProfile, 
    handleSubmit: handleProfileSubmit, 
    formState: { errors: profileErrors, isDirty: profileIsDirty },
    reset: resetProfile
  } = useForm({
    defaultValues: {
      firstName: initialUser?.firstName || '',
      lastName: initialUser?.lastName || '',
      email: initialUser?.email || '',
      phone: initialUser?.phone || '',
    }
  });

  const [passwordErrors, setPasswordErrors] = useState({
    password: '',
    passwordCurrent: '',
    passwordConfirm: ''
  });

  const tabs = [
    { id: 'profile', icon: <FiUser className="text-lg" />, label: 'Profile' },
    { id: 'security', icon: <RiShieldKeyholeLine className="text-lg" />, label: 'Security' },
    { id: 'notifications', icon: <FiBell className="text-lg" />, label: 'Notifications' },
  ];

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitProfile = async (e) => {
    e.preventDefault()
    setLoading(true);
    
    try {
      const formData = new FormData(e.target);
    //   formData.append('firstName', data.firstName);
    //   formData.append('lastName', data.lastName);
    //   formData.append('email', data.email);
    //   formData.append('phone', data.phone);
      if (selectedFile) {
        formData.append('photo', selectedFile);
      }

      const response = await axios.patch('/api/v1/users/updateMe', formData);
      
      if(response.data.status === 'success'){
        const updatedUser = response.data.data.user;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        resetProfile({
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          phone: updatedUser.phone
        }, { keepDirty: false });
        setAvatarPreview(updatedUser.photo || defaultAvatar);
        setSelectedFile(null);
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const onChangePassword = async (e) => {
    e.preventDefault();
    setPasswordErrors({});
    const data = new FormData(e.target);
    const dataToSend = Object.fromEntries(data);
    setLoading(true);
    try {
      const response = await axios.patch('/api/v1/users/updateMyPassword', dataToSend);

      if (response.data.status === 'success') {
        toast.success('Password updated successfully');
        e.target.reset();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
      if(error.response?.data?.errors){
        setPasswordErrors(error.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sticky top-6">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-100 dark:border-gray-700 mb-3">
                <img 
                  src={avatarPreview} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
                <label className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-1 text-xs cursor-pointer">
                  <FiCamera className="inline mr-1" />
                  Change
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <h2 className="font-bold text-lg text-gray-800 dark:text-white">
                {initialUser?.firstName} {initialUser?.lastName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{initialUser?.email}</p>
            </div>

            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                <RiLogoutCircleLine className="text-lg" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Profile Information</h2>
               
              </div>
              
              <form onSubmit={onSubmitProfile}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <InputField
                    name="firstName"
                    label="First Name"
                    register={registerProfile}
                    error={profileErrors.firstName}
                    defaultValue={initialUser.firstName}
                    placeholder="Enter your first name"
                    uncontrolled={true}
                  />

                  <InputField
                    name="lastName"
                    label="Last Name"
                    register={registerProfile}
                    error={profileErrors.lastName}
                    defaultValue={initialUser.lastName}
                    placeholder="Enter your last name"
                    uncontrolled={true}
                  />

                  <InputField
                    name="email"
                    label="Email Address"
                    type="email"
                    register={registerProfile}
                     defaultValue={initialUser.email}
                    validation={{
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    }}
                    error={profileErrors.email}
                    placeholder="Enter your email"
                    icon={<FiMail />}
                    uncontrolled={true}
                  />

                  <InputField
                    name="phone"
                    label="Phone Number"
                    type="tel"
                    register={registerProfile}
                    defaultValue={initialUser.phone}
                    error={profileErrors.phone}
                    placeholder="Enter your phone number"
                    uncontrolled={true}
                  />
                </div>
                <div className="flex justify-end">
                    <Button
                        //   onClick={handleProfileSubmit(onSubmitProfile)}
                        disabled={loading}
                        isLoading={loading}
                        
                        size="sm"
                        type='submit'
                    >
                    Save Changes
                    </Button>
                </div>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Change Password</h3>
                  <form onSubmit={onChangePassword}>
                    <div className="space-y-4">
                      <InputField
                        name="passwordCurrent"
                        label="Current Password"
                        type="password"
                        error={passwordErrors.passwordCurrent}
                        placeholder="Enter current password"
                        icon={<FiLock />}
                        uncontrolled={true}
                      />

                      <InputField
                        name="password"
                        label="New Password"
                        type="password"
                        error={passwordErrors.password}
                        placeholder="Enter new password"
                        icon={<FiLock />}
                        uncontrolled={true}
                      />

                      <InputField
                        name="passwordConfirm"
                        label="Confirm New Password"
                        type="password"
                        error={passwordErrors.passwordConfirm}
                        placeholder="Confirm new password"
                        icon={<FiLock />}
                        uncontrolled={true}
                      />

                      <div className="flex justify-end pt-2">
                        <Button
                          type="submit"
                          loading={loading}
                          size="sm"
                        >
                          Update Password
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-200 dark:border-red-800">
                  <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Advanced Security</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable 2FA
                      </Button>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <h4 className="font-medium text-red-600 dark:text-red-400">Delete Account</h4>
                        <p className="text-sm text-red-500 dark:text-red-400">Permanently remove your account</p>
                      </div>
                      <Button variant="danger" size="sm">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Email Notifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">Account Activity</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Important notifications about your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="flex justify-between items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">Investment Updates</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Notifications about your investments</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="flex justify-between items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">Promotional Offers</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Special offers and news</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Push Notifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">Transaction Alerts</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified for all transactions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="flex justify-between items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">Market Updates</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Important market changes</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}