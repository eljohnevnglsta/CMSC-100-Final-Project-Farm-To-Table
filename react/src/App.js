import Root from './pages/Root';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Home from './pages/Home';
import Orders from './pages/Order';
import Profile from './pages/Profile';
import Admin from './pages/Admin/AdminHome';
import ProductManagement from './pages/Admin/ManageProducts';
import OrderManagement from './pages/Admin/OrderManagement';
import SalesReport from './pages/Admin/SalesReport';
import UserManagement from './pages/Admin/Accounts';
import Layout from './pages/Layout';
import Missing from './pages/Missing';

import RequireAuth from './components/requireauth';
import { Routes, Route } from 'react-router-dom';

const ROLES = {
  'User': 1,
  'Admin': 0
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/root" element={<Root />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />

        {/* User routes */}
        <Route element={<RequireAuth allowedRoles={[1,2]} />}>
          <Route path="home" element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin routes */}
        <Route element={<RequireAuth allowedRoles={[2]} />}>
          <Route path="admin" element={<Admin />} />
          <Route path="sales-report" element={<SalesReport />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="order-management" element={<OrderManagement />} />
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;