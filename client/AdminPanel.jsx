import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [customerRequests, setCustomerRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("userToken"); // Get JWT token

  useEffect(() => {
    fetchNewEnrollments();
    fetchCustomerCareRequests();
  }, []);

  // 📌 Fetch newly enrolled users
  const fetchNewEnrollments = async () => {
    try {
      const res = await axios.get("/api/admin/newEnrollments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnrolledUsers(res.data);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
      alert("Failed to fetch new enrollments.");
    }
  };

  // 📌 Fetch customer care requests
  const fetchCustomerCareRequests = async () => {
    try {
      const res = await axios.get("/api/admin/customerCareRequests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomerRequests(res.data);
    } catch (err) {
      console.error("Error fetching customer requests:", err);
      alert("Failed to fetch customer care requests.");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* 🔹 Newly Enrolled Users Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Newly Enrolled Users</h2>
        {loading ? (
          <p>Loading...</p>
        ) : enrolledUsers.length === 0 ? (
          <p>No new enrollments in the last 7 days.</p>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Enrollment Date</th>
              </tr>
            </thead>
            <tbody>
              {enrolledUsers.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="py-2 px-4 border">{user.id}</td>
                  <td className="py-2 px-4 border">{user.name || "N/A"}</td>
                  <td className="py-2 px-4 border">{user.email || "N/A"}</td>
                  <td className="py-2 px-4 border">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 🔹 Customer Care Requests Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Customer Care Requests</h2>
        {loading ? (
          <p>Loading...</p>
        ) : customerRequests.length === 0 ? (
          <p>No customer care requests found.</p>
        ) : (
          <ul className="list-disc pl-6">
            {customerRequests.map((request) => (
              <li key={request.id} className="py-2">
                <strong>{request.customer_name}:</strong> {request.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
