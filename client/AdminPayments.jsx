// src/admin/AdminPayments.jsx

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:5000/api/admin/payments");
      setPayments(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Payments</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">User</th>
              <th className="p-2">Plan</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Provider</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{p.user_id}</td>
                <td className="p-2">{p.plan_key}</td>
                <td className="p-2">${p.amount}</td>
                <td className="p-2">{p.provider}</td>
                <td className="p-2">{new Date(p.created_at).toLocaleString()}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
