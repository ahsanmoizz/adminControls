import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminTxViewer() {
  const [filters, setFilters] = useState({ user: "", type: "", source: "", ip: "" });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const res = await axios.get(`/api/admin/all-transactions?${queryParams}`);
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions(); // fetch all initially
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🛡️ Admin Transaction Viewer</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="user"
          placeholder="User Address"
          value={filters.user}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="ip"
          placeholder="IP Address"
          value={filters.ip}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">All Types</option>
          <option value="ETH">ETH</option>
          <option value="BTC">BTC</option>
          <option value="USDT">USDT</option>
        </select>
        <select
          name="source"
          value={filters.source}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">All Sources</option>
          <option value="moonpay">MoonPay</option>
          <option value="bridge">Bridge</option>
          <option value="manual">Manual</option>
          <option value="internal">Internal</option>
        </select>
      </div>

      <button
        onClick={fetchTransactions}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        🔍 Fetch Transactions
      </button>

      <ul className="mt-6 space-y-4">
        {loading && <p>Loading...</p>}
        {!loading && transactions.length === 0 && (
          <p className="text-gray-500">No transactions found.</p>
        )}
        {!loading &&
          transactions.map((tx, i) => (
            <li key={i} className="p-4 bg-white shadow rounded border">
              <div className="text-sm text-gray-700">
                <strong>{tx.direction.toUpperCase()}</strong> — {tx.amount} {tx.token} from{" "}
                <span className="font-mono">{tx.user_address}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Source: {tx.source} | IP: {tx.ip} | Status: {tx.status}
              </div>
              {tx.tx_hash && (
                <div className="text-xs text-blue-600 mt-1">
                  Tx Hash:{" "}
                  <a
                    href={`https://etherscan.io/tx/${tx.tx_hash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {tx.tx_hash.slice(0, 10)}...
                  </a>
                </div>
              )}
              <div className="text-xs text-gray-400 mt-1">
                Date: {new Date(tx.created_at).toLocaleString()}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
