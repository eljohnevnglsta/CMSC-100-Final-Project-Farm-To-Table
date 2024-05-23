import React from 'react';
import rootbg from '../images/root-img.jpg';
import '../stylesheets/Root.css';
import Navbar from '../components/navbar';

export default function Root() {
    return (
        <div className="root-container">
            <Navbar links = {navElements}/>
            <div className="root-content">
                <img
                    src={rootbg}
                    alt="peter-wendt-r5-KSMkyo-Sc-unsplash"
                    border="0"
                />
                <h1>Welcome to Our Farm-to-Table Platform</h1>
                <p>
                    Our mission is to bridge the gap between farmers and consumers, fostering a direct connection that brings fresh, locally sourced produce straight to your table. As part of the Department of Agriculture's initiative, our e-commerce website facilitates seamless transactions, empowering farmers to showcase their harvests and enabling customers to make informed choices. Explore our catalog of farm-fresh goods and support sustainable agriculture today!
                </p>
                <p>Sign up now to start shopping!</p>
            </div>
        </div>
    );
}

const navElements = [
    { title: 'Login', path: '/login' },
    { title: 'Signup', path: '/signup' },
    { title: 'Admin View', path: '/admin' },
]
