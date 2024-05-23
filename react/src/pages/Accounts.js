import { useEffect, useState } from 'react';
import '../stylesheets/UserManagement.css';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []); // empty dependency array means this effect runs only once after the initial render

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
      body: JSON.stringify({ email }), // send the email of the user to be deleted
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
    <div className="user-management-container">
      <div className="total-users">
        <h2>Total Users</h2>
        <p>{totalUsers}</p>
      </div>

      <div className="user-list">
        <div className="table-header">
          <p style={{ paddingLeft: '20px' }}>Name</p>
          <p>Products Ordered</p>
          <p style={{ paddingRight: '300px' }}>Date Joined</p>
        </div>

        {users.map((user, i) => (
          <div key={i} className="user-item">
            <p style={{ paddingLeft: '20px' }}>{user.firstName}</p>
            <p style={{ paddingRight: 'px' }}>{user.lastName}</p>
            <p style={{ paddingRight: '100px' }}>{user.email}</p>
            <button onClick={() => handleDelete(user.email)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
