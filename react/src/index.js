import React from 'react';
import ReactDOM from 'react-dom/client';
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
// import UserList from './pages/UserList/UserList';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <LogIn /> },
  { path: '/home', element: <Home /> },
  { path: '/signup', element: <SignUp /> }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);