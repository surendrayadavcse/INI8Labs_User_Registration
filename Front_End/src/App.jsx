import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDob, setNewDob] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8002/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8002/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, dob }),
      });
      if (response.ok) {
        fetchUsers();
        setName('');
        setEmail('');
        setDob('');
        setMessage('User added successfully');
        setTimeout(() => {
          setMessage("")
        }, 2000);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage('Error adding user');
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8002/users/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchUsers();
        setMessage('User deleted successfully');
        setTimeout(() => {
          setMessage("")
        }, 2000);
        
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Error deleting user');
    }
  };

  const updateUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8002/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName, email: newEmail, dob: newDob }),
      });
      if (response.ok) {
        fetchUsers();
        setMessage('User updated successfully');
        setTimeout(() => {
          setMessage('');
        }, 2000);
       
        setNewName('');
        setNewEmail('');
        setNewDob('');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Error updating user');
    }
  };

  return (
    <div className="form-container">
      <h1>User Registration</h1>
      
      
      <form onSubmit={addUser} className='form-css'>
      <h2>Add New User</h2>
        <label >Name</label>
        <input type="text"  value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Email</label>
        <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Date of Birth</label>

        <input className='datecss'  type="date" placeholder='Enter Date' value={dob} onChange={(e) => setDob(e.target.value)} required />
        <button type="submit">Add User</button>
        {message && <p>{message}</p>}
      </form>
      {users.length > 0 && (
        <div className="user-list">
          <h3>Registered Users</h3>
          {users.map(user => (
            <div key={user._id} className="user">
              <p>ID: {user._id}</p>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Date of Birth: {user.dob}</p>
              
              <div className='update-css'>
                <input className='inp' type="text" placeholder="New Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                <input className='inp' type="email" placeholder="New Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                <input className='inp' type="date" value={newDob} onChange={(e) => setNewDob(e.target.value)} />
                <button onClick={() => updateUser(user._id)}>Update</button>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
