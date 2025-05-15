// SuperAdminPanel.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuperAdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [appDisabled, setAppDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('userToken'); // Assumes JWT is stored here

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/superadmin/allUsers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch users');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlockToggle = async (userId, currentBlocked) => {
    try {
      const res = await axios.post(
        '/api/superadmin/blockUser',
        { userId, block: !currentBlocked },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Failed to update user status');
    }
  };

  const handleRoleChange = async (email, newRole) => {
    try {
      const res = await axios.post(
        '/api/superadmin/assignRole',
        { email, role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Failed to update user role');
    }
  };

  const toggleAppStatus = async () => {
    try {
      const res = await axios.post(
        '/api/superadmin/toggleApp',
        { disable: !appDisabled },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      setAppDisabled(!appDisabled);
    } catch (err) {
      console.error(err);
      alert('Failed to update app status');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">SuperAdmin Panel</h1>
      
      <div className="mb-6">
        <button
          onClick={toggleAppStatus}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          {appDisabled ? 'Enable App' : 'Disable App'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Blocked</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="py-2 px-4 border">{user.id}</td>
                  <td className="py-2 px-4 border">{user.name}</td>
                  <td className="py-2 px-4 border">{user.role}</td>
                  <td className="py-2 px-4 border">
                    {user.blocked ? 'Yes' : 'No'}
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() =>
                        handleBlockToggle(user.id, user.blocked)
                      }
                      className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
                    >
                      {user.blocked ? 'Unblock' : 'Block'}
                    </button>
                    <select
                      defaultValue={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.email, e.target.value)  
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">SuperAdmin</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminPanel;
