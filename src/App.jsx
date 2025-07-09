import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import AuthenticatedLayout from './layouts/AuthenticatedLayout'
import GuestLayout from './layouts/GuestLayout'

//Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import Users from './pages/admin/Users'
import Transactions from './pages/admin/Transactions'
import Investments from './pages/admin/Investments'
import CopyTrade from './pages/admin/CopyTrade'
import AdminCopytradeInvestments from './pages/admin/CopytradeInvestments';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Auth Routes - Wrapped in GuestLayout */}
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
        </Route>

         <Route element={<AuthenticatedLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path='admin/transactions' element={<Transactions />}/>
          <Route path='/admin/investments' element={<Investments />}/>
          <Route path='admin/copy_trade' element={<CopyTrade />}></Route>
          <Route path='/admin/copy_trade_investments' element={<AdminCopytradeInvestments />}></Route>
          {/* Add all other protected routes here */}
        </Route>


        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  )
}

export default App