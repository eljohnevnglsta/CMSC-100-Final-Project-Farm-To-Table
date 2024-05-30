import React, { useState, useEffect, useContext } from 'react';
import '../stylesheets/Profile.css'; // Assuming you have a CSS file named Profile.css
import axios from 'axios'; 
import Navbar from '../components/navbar';
import rootbg from '../images/profile-img.jpeg';
import AuthContext from '../context/authprovider';
import { useNavigate } from 'react-router-dom';

const getUserData = async (email) => {
    const url = 'http://localhost:3001/get-user-by-email';
    
    try {
        const response = await axios.post(url, { email: email });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

const email = JSON.parse(sessionStorage.getItem('user'));
const userData = await getUserData(email);

export default function Profile() {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    const handleLogout = () => {
        axios.post('http://localhost:3001/logout');
        sessionStorage.clear();
        setAuth({});
        navigate('/login');
    } 

    return (
        <div className="profile-page">
            <Navbar links={auth.userType == "customer" ? navElements : navElements2} />
            <div id="ProfileBackground">
          <img
                    src={rootbg}
                    alt="peter-wendt-r5-KSMkyo-Sc-unsplash"
                    border="0"
                />
            <div className='profile-container'>
                <h1>Profile</h1>
                <div className="profile-details">
                    <div className="field">
                        <label>First Name:</label>
                        <span>{auth.fname}</span>
                    </div>
                    <div className="field">
                        <label>Middle Name:</label>
                        <span>{auth.mname}</span>
                    </div>
                    <div className="field">
                        <label>Last Name:</label>
                        <span>{auth.lname}</span>
                    </div>
                    <div className="field">
                        <label>Email:</label>
                        <span>{auth.email}</span>
                    </div>
                </div>
                <button id='logoutbutton' onClick={handleLogout}> Logout </button>
            </div>
            </div>
        </div>
    );
}

const navElements = [
    { title: 'Home', path: '/home' },
    { title: 'Orders', path: '/orders' }
];

const navElements2 = [
    { title: 'Product Management', path: '/admin' },
    { title: 'User Management', path: '/user-management' },
    { title: 'Sales Report', path: '/sales-report' },
    { title: 'Order Management', path: '/order-management' },
]; 