import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminNonEvmFees() {
  const [fees, setFees] = useState([]);
  const [collected, setCollected] = useState([]);
  const [edit, setEdit] = useState({});

  const fetchAll = async () => {
    const feeRes = await axios.get("/api/admin/non-evm/fees");
    const colRes = await axios.get("/api/admin/non-evm/collected");
    setFees(feeRes.data.fees);
    setCollected(colRes.data.collected);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const updateFee = async (coin, value) => {
    await axios.post("/api/admin/non-evm/fee", { coin, percent: value });
    fetchAll();
  };

  const withdrawFee = async (coin) => {
    const res = await axios.post("/api/admin/non-evm/withdraw", { coin });
    alert(`✅ Withdrawn ${res.data.withdrawn} ${coin}`);
    fetchAll();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Non-EVM Fees</h2>

      {fees.map((fee) => {
        const collectedAmt = collected.find(c => c.coin === fee.coin)?.total_amount || "0";

        return (
          <div key={fee.coin} className="mb-4 border p-4 rounded shadow-sm">
            <h3 className="font-semibold mb-2">{fee.coin}</h3>
            <label>Fee %</label>
            <input
              type="number"
              className="border px-2 py-1 rounded w-full mb-2"
              value={edit[fee.coin] ?? fee.fee_percent}
              onChange={(e) => setEdit({ ...edit, [fee.coin]: e.target.value })}
            />
            <button
              onClick={() => updateFee(fee.coin, edit[fee.coin])}
              className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => withdrawFee(fee.coin)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Withdraw Fee ({collectedAmt})
            </button>
          </div>
        );
      })}
    </div>
  );
}
