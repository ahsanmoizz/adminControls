// src/components/AdminSidebar.jsx
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <h2 className="text-lg font-bold mb-6">🛠 Admin Panel</h2>
      <ul className="space-y-3">
        <li><Link to="/admin/super" className="hover:text-yellow-300">Super Admin Panel</Link></li>
        <li><Link to="/admin/fees" className="hover:text-yellow-300">Set EVM Fees</Link></li>
        <li><Link to="/admin/non-evm-fees" className="hover:text-yellow-300">Set Non-EVM Fees</Link></li>
        <li><Link to="/admin/withdraw-evm" className="hover:text-yellow-300">Withdraw EVM Fees</Link></li>
        <li><Link to="/admin/payments" className="hover:text-yellow-300">User Payments</Link></li>
        <li><Link to="/admin/subscriptions" className="hover:text-yellow-300">Manage Subscriptions</Link></li>
        <li><Link to="/admin/users" className="hover:text-yellow-300">View Users</Link></li>
        <li><Link to="admin/txviewer" className="hover:text-yellow-300">View Transactions</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
