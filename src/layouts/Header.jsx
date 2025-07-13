import logo from './../assets/images/logo.png';
import { useState, useRef, useEffect } from 'react';
import { FaBars, FaChevronDown, FaCog, FaSignOutAlt } from 'react-icons/fa';
import defaultAvatar from './../assets/images/default.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../utils/logout';
const Header = ({ onMenuToggle, user }) => {  
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
   const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
  const handleLogout = async () => {
    setProcessing(true);
    try {
      await logout(navigate);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <header className="bg-card border-b border-card-border p-4 flex items-center justify-between">
      {/* Left Section - Mobile Menu Button */}
      <div className="flex items-center">
        <button 
          onClick={onMenuToggle}
          className="lg:hidden mr-4 text-text-light hover:text-white"
        >
          <FaBars className="text-xl" />
        </button>
        
        {/* Optional: Logo in header for mobile */}
        <div className="lg:hidden flex items-center">
          <img 
            src={logo}
            alt="Company Logo" 
            className="h-6 w-auto mr-2" 
          />
          <span className="font-bold">TRW</span>
        </div>
      </div>

      {/* Right Section - User Profile */}
      <div className="cursor-pointer relative" ref={dropdownRef}>
        <button 
          className="flex items-center space-x-2 focus:outline-none"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          {user?.photo ? (
            <img 
              src={user.photo} 
              alt="User Profile" 
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <img 
              src={defaultAvatar} 
              alt="Default Avatar" 
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <span className="hidden md:inline">{user.firstName}</span>
          <FaChevronDown className={`text-xs transition-transform ${profileOpen ? 'transform rotate-180' : ''}`} />
        </button>

        {/* Profile Dropdown */}
        {profileOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-card rounded-md shadow-lg border border-card-border z-10 overflow-hidden">
            <div className="p-4 border-b border-card-border flex items-center">
              <div className="mr-3 flex-shrink-0">
                {user?.photo ? (
                  <img 
                    src={user.photo} 
                    alt="User Profile" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <img 
                    src={defaultAvatar} 
                    alt="Default Avatar" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user.firstName}</p>
                <p className="text-xs text-text-light truncate max-w-[160px]">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="py-1">
              <Link
                to="/investor/settings"
                className="flex items-center px-4 py-2 text-sm text-text-light hover:bg-bg-dark hover:text-white"
                onClick={() => setProfileOpen(false)}
              >
                <FaCog className="mr-2" />
                Settings
              </Link>
              <button
               onClick={handleLogout}
               disabled={processing}
                className={`cursor-pointer flex w-full items-center px-4 py-2 text-sm text-text-light hover:bg-bg-dark hover:text-white
                  ${
                  processing 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : ''
                }`}
              >
                <FaSignOutAlt className="mr-2" />
               
                {processing ? 'Signing out...' : ' Sign Out'}
               
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;