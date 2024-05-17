import React from 'react';
import './UserList.css';
import User from './Components/User';

const users = [
  { 
    name: "Tony Stark",
    email: "tstark@gmail.com",
    usertype: "Consumer"
  }
  // ,
  //  { 
  //   name: "Steve Rogers",
  //    email: "srogers@gmail.com",
  //    usertype: "Consumer"
  // }
  //,
  // { 
  //   name: "Bruce Banner",
  //   email: "bbanner@gmail.com",
  //   usertype: "Merchant"
  // },
  // { 
  //   name: "Clint Barton",
  //   email: "cbarton@gmail.com",
  //   usertype: "Merchant"
  // },
  // { 
  //   name: "Thor Odinson",
  //   email: "todinson@gmail.com",
  //   usertype: "Merchant"
  // },
];

const UserList = () => {
  return (
    <div>
      <h1 className="UserList">FARM-TO-TABLE USERS</h1>

      <div id="UserBorder">
        <p className="UName">Name</p>
        <p className="UEmail">Email</p>
        <p className="UUserType">User Type</p>
      </div>
      <div className="UOuputBorder">
        <div id="UUserOutput">
          {users.map((user, index) => (
          <User
            key={index}
            name={user.name}
            email={user.email}
            usertype={user.usertype}
          />
          ))}
        </div>

      </div>
    </div>
  );
}

export default UserList;
