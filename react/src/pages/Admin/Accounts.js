import { useEffect, useState } from 'react';
import '../../stylesheets/Admin/UserManagement.css';
import Navbar from '../../components/navbar';
import UserDetails from './UserDetails';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [foundUser, setFoundUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const user = users.find(user =>
        `${user.firstName} ${user.middleName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFoundUser(user);
    } else {
      setFoundUser(null);
    }
  }, [searchQuery, users]);

  const fetchUsers = () => {
    fetch('http://localhost:3001/show-all-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials: 'include'
    })
      .then(response => response.json())
      .then(body => {
        setUsers(body.filter(user => user.userType !== 'admin'));
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const handleDelete = (email) => {
    fetch('http://localhost:3001/delete-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      withCredentials: true,
      credentials: 'include'
    })
      .then(response => response.json())
      .then(result => {
        if (result.deletedCount > 0) {
          fetchUsers();
        } else {
          console.error('Failed to delete user');
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <Navbar links={navElements} />
      <div className="header">
        <h2>Customer Management</h2>
        <p>Find all customers here.</p>
      </div>
      <div className="user-management-container">
        <div className="total-users">
          <h2 style={{paddingLeft: '10px'}}>All Customers ({users.length})</h2>
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="user-list">
          <div className="table-header">
            <p className="table-header-item">Name</p>
            <p className="table-header-item">Email</p>
            <p className="table-header-item">User Type</p>
          </div>

          {foundUser ? (
            <div key={foundUser.email} className="user-item">
              <span onClick={() => handleUserClick(foundUser)} className="user-name">
                {foundUser.firstName} {foundUser.middleName} {foundUser.lastName}
              </span>
              <p className="user-email">{foundUser.email}</p>
              <p className="user-type">{foundUser.userType}</p>
              <button className="delete-button" onClick={() => handleDelete(foundUser.email)}>Delete</button>
            </div>
          ) : (
            users.map((user, i) => (
              <div key={i} className="user-item">
                <span onClick={() => handleUserClick(user)} className="user-name">
                  {user.firstName} {user.middleName} {user.lastName}
                </span>
                <p className="user-email">{user.email}</p>
                <p className="user-type">{user.userType}</p>
                <button className="delete-button" onClick={() => handleDelete(user.email)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>

      {showPopup && selectedUser && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <UserDetails email={selectedUser.email} closePopup={closePopup}/>
          </div>
        </div>
      )}
    </div>
  );
}

const navElements = [
  { title: 'Product Management', path: '/admin' },
  { title: 'Order Management', path: '/order-management' },
  { title: 'Sales Report', path: '/sales-report' },
  { title: 'Profile', path: '/profile' },
];
