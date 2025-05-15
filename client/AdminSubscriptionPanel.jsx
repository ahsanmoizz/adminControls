import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminSubscriptionPlans() {
  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/subscription-plans");
    setPlans(res.data);
  };

  const handleSave = async (planKey, updated) => {
    await axios.put(`http://localhost:5000/api/admin/subscription-plans/${planKey}`, updated);
    alert("✅ Plan updated!");
    fetchPlans();
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Subscription Plans</h2>

      {plans.map((plan) => (
        <div key={plan.plan_key} className="border p-4 mb-6 rounded bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>

          <label className="block">Max Messages</label>
          <input
            type="number"
            defaultValue={plan.max_messages}
            onChange={(e) => (plan.max_messages = e.target.value)}
            className="border px-2 py-1 rounded w-full mb-2"
          />

          <label className="block">Max Transactions</label>
          <input
            type="number"
            defaultValue={plan.max_transactions}
            onChange={(e) => (plan.max_transactions = e.target.value)}
            className="border px-2 py-1 rounded w-full mb-2"
          />

          <label className="block">Price USD</label>
          <input
            type="number"
            defaultValue={plan.price_usd}
            onChange={(e) => (plan.price_usd = e.target.value)}
            className="border px-2 py-1 rounded w-full mb-2"
          />

          <label className="block">Features (comma separated)</label>
          <input
            type="text"
            defaultValue={plan.features?.join(",")}
            onChange={(e) => (plan.features = e.target.value.split(","))}
            className="border px-2 py-1 rounded w-full mb-2"
          />
                        <label className="block">Country Pricing (JSON: {"{\"IN\":1800,\"CN\":3000}"})</label>
<input
  type="text"
  defaultValue={JSON.stringify(plan.country_prices || {})}
  onChange={(e) => {
    try {
      const value = JSON.parse(e.target.value);
      setPlans((prev) =>
        prev.map((p) =>
          p.plan_key === plan.plan_key ? { ...p, country_prices: value } : p
        )
      );
    } catch {
      alert("Invalid JSON");
    }
  }}
  className="border px-2 py-1 rounded w-full mb-2"
/>

          <button
            className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
            onClick={() => handleSave(plan.plan_key, plan)}
          >
            Save Changes
          </button>
        </div>
      ))}
    </div>
  );
}
