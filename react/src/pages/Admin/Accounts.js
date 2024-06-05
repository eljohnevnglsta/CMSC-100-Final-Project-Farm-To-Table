import { useEffect, useState } from 'react';
import '../../stylesheets/Admin/UserManagement.css';
import Navbar from '../../components/navbar';
import { Link } from 'react-router-dom';


export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [maxCodeLength, setMaxCodeLength] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [foundUser, setFoundUser] = useState(null);

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
    })
      .then(response => response.json())
      .then(body => {
        setUsers(body);
        setTotalUsers(body.length);

        const maxLength = Math.max(...body.map(user => user.lastName.length));
        setMaxCodeLength(maxLength);
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

  return (
    <div>
      <Navbar links={navElements} />
      <div className="header">
        <h2>Customer Management</h2>
        <p>Find all customers here.</p>
      </div>
      <div className="user-management-container">
        <div className="total-users">
          <h2 style={{paddingLeft: '10px'}}>All Customers ({totalUsers})</h2>
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
            <p style={{paddingLeft: '20px'}}>Name</p>
            <p>Email</p>
            <p style={{paddingRight: '290px'}}>User Type</p>
          </div>

          {foundUser ? (
            <div key={foundUser.email} className="user-item">
              <Link to={`/user-management/${foundUser.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <p style={{ paddingLeft: '20px' }}>{foundUser.firstName} {foundUser.middleName} {foundUser.lastName}</p>
              </Link>
              <p style={{ paddingLeft: '60px', minWidth: '200px' }}>{foundUser.email}</p>
              <p style={{ paddingLeft: '60px', minWidth: '100px' }}>{foundUser.userType}</p>
              <button className="delete-button" onClick={() => handleDelete(foundUser.email)}>Delete</button>
            </div>
          ) : (
            users.map((user, i) => (
              <div key={i} className="user-item">
                <Link to={`/user-management/${user.email}`} style={{ textDecoration: 'none', color: 'inherit', width: `${maxCodeLength * 29}px` }}>
                  <p style={{ paddingLeft: '20px' }}>{user.firstName} {user.middleName} {user.lastName}</p>
                </Link>
                <p style={{ paddingLeft: '10px', minWidth: '200px' }}>{user.email}</p>
                <p style={{ paddingLeft: '60px', minWidth: '100px' }}>{user.userType}</p>
                <button className="delete-button" onClick={() => handleDelete(user.email)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const navElements = [
  { title: 'Product Management', path: '/admin' },
  { title: 'Order Management', path: '/order-management' },
  { title: 'Sales Report', path: '/sales-report' },
  { title: 'Profile', path: '/profile' },
];

