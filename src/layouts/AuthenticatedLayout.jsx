import Sidebar from "./Sidebar"
import Header from "./Header"
import { useState} from "react";
import { Outlet } from "react-router-dom";

const AuthenticatedLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="flex h-screen bg-bg-darker text-white overflow-hidden">
      {/* Sidebar - Hidden on mobile by default */}
      <Sidebar user={user} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header user={user} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-bg-dark">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout