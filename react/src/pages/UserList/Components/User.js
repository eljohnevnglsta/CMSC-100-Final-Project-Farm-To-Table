import React from 'react';
import './User.css';

const User = ({ name, email, usertype }) => {
  return (
    <div className="User">
      <div className="User-content">
        <p className="Name">{name}</p>
        <p className="Email">{email}</p>
        <p className="UserType">{usertype}</p>
      </div>
    </div>
  );
};

export default User;
