import './App.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import GuestLayout from './layouts/GuestLayout';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Transactions from './pages/admin/Transactions';
import Investments from './pages/admin/Investments';
import CopyTrade from './pages/admin/CopyTrade';
import AdminCopytradeInvestments from './pages/admin/CopytradeInvestments';
import Plans from './pages/admin/Plans';

// Investor Pages
import InvestorDashboard from './pages/investors/Dashboard';
import InvestorInvestments from './pages/investors/Investments';
import CopyTradeInvestments from './pages/investors/CopyTradeInvestments';
import InvestorTransactions from './pages/investors/Transactions';
import Deposit from './pages/investors/Deposit';
import Withdrawal from './pages/investors/Withdrawal';
import InvestorSettings from './pages/investors/Settings'

// Others
import NotFound from './pages/NotFound';
// import Error from './components/Error';
import { requireAuth } from './utils/protect';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Auth Routes - Wrapped in GuestLayout */}
        <Route path="/" element={<GuestLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          {/* <Route path="reset-password/:token" element={<ResetPassword />} /> */}
        </Route>

        {/* Authenticated Routes */}
        <Route path="/" element={<AuthenticatedLayout />}>
          {/* Admin Related Routes */}
          <Route path="admin" loader={async({ request }) => await requireAuth(request, 'admin')}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="plans" element={<Plans />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="investments" element={<Investments />} />
            <Route path="copy_trade" element={<CopyTrade />} />
            <Route path="copy_trade_investments" element={<AdminCopytradeInvestments />} />
           
          </Route>

          {/* Investor Related Routes */}
          <Route path="investor" loader={({ request }) => requireAuth(request, 'user')}>
            <Route path="dashboard" element={<InvestorDashboard />} />
            <Route path='investments' element={<InvestorInvestments />}/>
            <Route path='copy_trades' element={<CopyTradeInvestments />}/>
            <Route path='transactions' element={<InvestorTransactions />}/>
            <Route path='deposit' element={<Deposit/>}/>
            <Route path='withdrawal' element={<Withdrawal/>}/>
            <Route path='settings' element={<InvestorSettings/>}/>
          </Route>
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;