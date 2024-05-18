import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import user from './pages/Login';

// Importing the pages
import Root from './pages/Root';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Home from './pages/Home';

const router = createBrowserRouter([
  { path: '/', element: <Root /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/home', element: <Home />, children: [
    // { path: '/products', element: <Products /> },
    // { path: '/cart', element: <Cart /> },
    // { path: '/orders', element: <Orders /> },
  ]}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);










