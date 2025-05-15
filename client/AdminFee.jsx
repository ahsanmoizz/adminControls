import { useState } from "react";
import { ethers } from "ethers";
import ContractABI from "../abi/YourContractABI.json";
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
import MultiAssetWalletABI from "../abi/MultiAssetWallet.json";
const WALLET_CONTRACT_ADDRESS = process.env.REACT_APP_MULTI_ASSET_WALLET;

export default function AdminFees() {
  const [feeType, setFeeType] = useState("deposit");
  const [value, setValue] = useState("");
  const [newAdmin, setNewAdmin] = useState("");
  const [removeAdminAddress, setRemoveAdminAddress] = useState("");

  const addAdmin = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, signer);
    const tx = await contract.addAdmin(newAdmin);
    await tx.wait();
    alert("✅ Admin Added");
  };
  
  const removeAdmin = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, signer);
    const tx = await contract.removeAdmin(removeAdminAddress);
    await tx.wait();
    alert("❌ Admin Removed");
  };
  const pauseContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(WALLET_CONTRACT_ADDRESS, MultiAssetWalletABI, signer);
  
    const tx = await contract.pause();
    await tx.wait();
    alert("⏸️ Contract Paused");
  };
  
  const unpauseContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(WALLET_CONTRACT_ADDRESS, MultiAssetWalletABI, signer);
  
    const tx = await contract.unpause();
    await tx.wait();
    alert("▶️ Contract Unpaused");
  };

  const updateFee = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, signer);

    const newFee = parseInt(value);
    if (newFee < 0 || newFee > 1000) return alert("Fee must be 0-10%");

    let tx;
    if (feeType === "deposit") tx = await contract.setDepositFee(newFee);
    if (feeType === "withdrawal") tx = await contract.setWithdrawalFee(newFee);
    if (feeType === "transaction") tx = await contract.setTransactionFee(newFee);
    if (feeType === "escrow") tx = await contract.setEscrowServiceFee(newFee);
    if (feeType === "multisig") tx = await contract.setMultisigServiceFee(newFee);

    await tx.wait();
    alert("✅ Fee Updated!");
  };

  return (
    <div className="p-6 max-w-md mx-auto">

<div className="mt-8">
  <h3 className="font-semibold mb-2">Owner: Add Admin</h3>
  <input
    type="text"
    placeholder="New Admin Address"
    value={newAdmin}
    onChange={(e) => setNewAdmin(e.target.value)}
    className="border p-2 w-full mb-2"
  />
  <button
    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
    onClick={addAdmin}
  >
    Add Admin
  </button>
</div>

<div className="mt-6">
  <h3 className="font-semibold mb-2">Owner: Remove Admin</h3>
  <input
    type="text"
    placeholder="Admin Address to Remove"
    value={removeAdminAddress}
    onChange={(e) => setRemoveAdminAddress(e.target.value)}
    className="border p-2 w-full mb-2"
  />
  <button
    className="bg-red-600 text-white px-4 py-2 rounded w-full"
    onClick={removeAdmin}
  >
    Remove Admin
  </button>
  
  <h3 className="font-semibold mb-2">Emergency Controls</h3>
  <button onClick={pauseContract} className="bg-red-600 text-white px-4 py-2 rounded w-full mb-2">
    ⏸️ Pause Contract
  </button>
  <button onClick={unpauseContract} className="bg-green-600 text-white px-4 py-2 rounded w-full">
    ▶️ Unpause Contract
  </button>

</div>


      <h2 className="text-xl font-bold mb-4">Admin: Update Fees</h2>
      <select
        value={feeType}
        onChange={(e) => setFeeType(e.target.value)}
        className="border p-2 w-full mb-2"
      >
        <option value="deposit">Deposit Fee</option>
        <option value="withdrawal">Withdrawal Fee</option>
        <option value="transaction">Transaction Fee</option>
        <option value="escrow">Escrow Service Fee</option>
        <option value="multisig">Multisig Service Fee</option>
      </select>
      <input
        type="number"
        placeholder="Fee (in basis points, e.g., 50 = 0.5%)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
        onClick={updateFee}
      >
        Update Fee
      </button>
    </div>
  );
}
