import React, { useState, useEffect } from 'react';
import '../stylesheets/Profile.css'; // Assuming you have a CSS file named Profile.css
import axios from 'axios'; 
import Navbar from '../components/navbar';

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
    return (
        <div className="profile-page">
            <Navbar links={navElements} />
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
            </div>
        </div>
    );
}

const navElements = [
    { title: 'Home', path: '/home' },
    { title: 'Orders', path: '/orders' }
];