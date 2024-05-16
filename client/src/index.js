import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Accounts from './pages/Accounts';

const router = createBrowserRouter([
  {
    path: '/', element: <Navbar />, children: [
      { path: '/', element: <Home /> },
      { path: 'users', element: <Accounts /> },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);