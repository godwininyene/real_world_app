import logo from './../assets/images/logo.png';
import { useState } from 'react';
import   {  FaBars,  FaChevronDown, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa'
const Header = ({ onMenuToggle, user }) => {
  console.log(user);
  
  const [profileOpen, setProfileOpen] = useState(false);

  // Mock user data
  // const user = { name: "John Doe", email: "john@example.com" };

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
      <div className="relative">
        <button 
          className="flex items-center space-x-2 focus:outline-none"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <FaUserCircle className="text-xl text-text-light" />
          <span className="hidden md:inline">{user.firstName}</span>
          <FaChevronDown className={`text-xs transition-transform ${profileOpen ? 'transform rotate-180' : ''}`} />
        </button>

        {/* Profile Dropdown */}
        {profileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg border border-card-border z-10">
            <div className="p-4 border-b border-card-border">
              <p className="text-sm font-medium">{user.firstName}</p>
              <p className="text-xs text-text-light truncate">{user.email}</p>
            </div>
            <div className="py-1">
              <a 
                href="#"
                className="flex items-center px-4 py-2 text-sm text-text-light hover:bg-bg-dark hover:text-white"
              >
                <FaCog className="mr-2" />
                Settings
              </a>
              <a 
                href="#"
                className="flex items-center px-4 py-2 text-sm text-text-light hover:bg-bg-dark hover:text-white"
              >
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header