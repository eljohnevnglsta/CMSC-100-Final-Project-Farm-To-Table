import React, { useState, useEffect } from 'react';
import '../stylesheets/Profile.css'; // Assuming you have a CSS file named Profile.css
import axios from 'axios'; 
import Navbar from '../components/navbar';
import rootbg from '../images/profile-img.jpeg';

const getUserData = async (email) => {
    const url = 'http://localhost:3001/get-user-by-email';
    try {
        const response = await axios.post(url, { email: email }, {withCredentials: true, credentials: 'include'});
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

const handleLogout = async () => {
    const response = await axios.post('http://localhost:3001/logout',{},  {withCredentials: true, credentials: 'include'});
    console.log(response.data);
    localStorage.removeItem('user');
    localStorage.removeItem('type');
    window.location.href = '/login';
} 

export default function Profile() {
    const email = JSON.parse(localStorage.getItem('user'));
    const [userData, setUserData] = useState({});
    useEffect(() => {
        getUserData(email)
            .then(data => setUserData(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, [email]);
    return (
        <div className="profile-page">
            <Navbar links={userData.userType === "admin" ? navElements2 : navElements} />
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
                        <span>{userData.firstName}</span>
                    </div>
                    <div className="field">
                        <label>Middle Name:</label>
                        <span>{userData.middleName}</span>
                    </div>
                    <div className="field">
                        <label>Last Name:</label>
                        <span>{userData.lastName}</span>
                    </div>
                    <div className="field">
                        <label>Email:</label>
                        <span>{userData.email}</span>
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