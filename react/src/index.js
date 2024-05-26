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
import Admin from './pages/Admin/AdminHome';
import ProductManagement from './pages/Admin/ManageProducts';
import OrderManagement from './pages/Admin/OrderManagement';
import SalesReport from './pages/Admin/SalesReport';
import UserManagement from './pages/Admin/Accounts';

const router = createBrowserRouter([
  { path: '/', element: <Root /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/home', element: <Home /> },
  { path: '/orders', element: <Orders /> },
  { path: '/profile', element: <Profile /> },

  //admin pages
  { path: '/admin', element: <Admin /> },
  { path: '/sales-report', element: <SalesReport /> },
  { path: '/products', element: <ProductManagement /> },
  { path: '/user-management', element: <UserManagement /> },
  { path: '/order-management', element: <OrderManagement /> }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);










