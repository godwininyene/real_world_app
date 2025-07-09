import { Outlet, Link } from "react-router-dom";
import { FaShieldAlt, FaLock, FaEnvelope, FaUserAlt } from "react-icons/fa";
const GuestLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-darker to-bg-dark flex flex-col">
      {/* Header */}
      <header className="py-6 px-6 flex justify-between items-center">
        <Link to='/' className="text-2xl font-bold text-primary hover:text-primary-light transition-colors cursor-pointer">
          The Real World
        </Link>
        <nav className="flex items-center space-x-4">
          <a href="#" className="text-text-light hover:text-primary-light transition-colors">
            Help Center
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-card rounded-2xl shadow-2xl border border-card-border overflow-hidden">
            {/* Decorative Header */}
            <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-3 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 rounded-full">
                  <FaShieldAlt className="text-white text-2xl" />
                </div>
              </div>
            </div>

            {/* Form Container */}
            <div className="p-8">
              <Outlet />
            </div>
          </div>

        
        </div>
      </main>

    
    </div>
  );
};

export default GuestLayout