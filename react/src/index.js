import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importing the pages
import Root from './pages/Root';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Home from './pages/Home';
import Orders from './pages/Order';
import Profile from './pages/Profile';
import Admin from './pages/AdminHome';
import ProductManagement from './pages/ManageProducts';
// import SalesReport from './pages/Admin/SalesReport';
// import AdminApproval from './pages/Admin/AdminApproval';
import UserManagement from './pages/Accounts';

const router = createBrowserRouter([
  { path: '/', element: <Root /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/home', element: <Home /> },
  { path: '/orders', element: <Orders /> },
  { path: '/profile', element: <Profile /> },
  { path: '/admin', element: <Admin /> },
  // { path: '/sales', element: <SalesReport /> },
  { path: '/products', element: <ProductManagement /> },
  { path: '/users', element: <UserManagement /> },
  // { path: '/approval', element: <AdminApproval /> }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);










