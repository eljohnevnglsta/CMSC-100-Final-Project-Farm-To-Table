import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
// import UserList from './pages/UserList/UserList';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <LogIn/>  */}
    {/* <SignUp/>  */}
    <Home/> 
    {/* <UserList/>  */}
  </React.StrictMode>
);