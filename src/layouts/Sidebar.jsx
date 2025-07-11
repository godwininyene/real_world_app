import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaMoneyCheckAlt, 
  FaExchangeAlt, 
  FaCog,  
  FaTimes,  
} from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import logo from './../assets/images/logo.png';
import { HiOutlineLogout } from 'react-icons/hi';
import { logout } from '../utils/logout';
import { useState, useEffect } from "react";
import defaultAvatar from './../assets/images/default.jpg';

const Sidebar = ({ isOpen, onClose, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  // Close sidebar when route changes - fixed implementation
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

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

  const user_links = [
    { name: "Dashboard", path: "/investor/dashboard", icon: <FaTachometerAlt /> },
    { name: "Investments", path: "/investor/investments", icon: <FaMoneyCheckAlt /> },
    { name: "Copytrade", path: "/investor/copy_trades", icon: <FaMoneyCheckAlt /> },
    { name: "Transactions", path: "/investor/transactions", icon: <FaMoneyBillTransfer /> },
    { name: "Settings", path: "/investor/settings", icon: <FaCog /> },
  ];

  const admin_links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Manage Users", path: "/admin/users", icon: <FaCog /> },
    { name: "Transactions", path: "/admin/transactions", icon: <FaExchangeAlt /> },
    { name: "Investments", path: "/admin/investments", icon: <FaMoneyCheckAlt /> },
    { name: "Copy Trades", path: "/admin/copy_trade", icon: <FaMoneyCheckAlt /> },
    { name: "Copy Trade Investments", path: "/admin/copy_trade_investments", icon: <FaMoneyCheckAlt /> },
  ];

  const links = user.role === "admin" ? admin_links : user_links;

  // Improved active link detection
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden" 
          onClick={onClose}
        />
      )}

      <aside 
        className={`fixed lg:relative inset-y-0 left-0 z-30 w-64 bg-card border-r border-card-border transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-200 ease-in-out overflow-y-auto flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-card-border">
          <div className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-8 w-auto" 
            />
            <span className="text-xl font-bold">TRW</span>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden text-text-light hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="p-4 space-y-1 flex-grow">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive(link.path) 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-text-light hover:bg-bg-dark hover:text-white'
              }`}
            >
              <span className="mr-3">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>

        {/* User Profile Section with Logout */}
        <div className="p-4 border-t border-card-border">
          <div className="flex items-center space-x-3 mb-4">
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
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.firstName + ' ' + user.lastName}</p>
              <p className="text-xs text-text-light truncate">{user.email}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            disabled={processing}
            className={`w-full cursor-pointer flex items-center justify-center px-4 py-2 rounded-lg text-sm ${
              processing 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
            }`}
          >
            <HiOutlineLogout className="mr-2" />
            {processing ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;