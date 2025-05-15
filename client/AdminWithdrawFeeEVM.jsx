import { useEffect, useState } from "react";
import { ethers } from "ethers";
import MultiAssetABI from "../abi/MultiAssetWalletABI.json";

const MULTI_ASSET_ADDRESS = process.env.REACT_APP_MULTI_ASSET_ADDRESS;

export default function AdminWithdrawFees() {
  const [tokenAddress, setTokenAddress] = useState("0x0000000000000000000000000000000000000000"); // ETH default
  const [collectedFee, setCollectedFee] = useState("0");

  const fetchFee = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(MULTI_ASSET_ADDRESS, MultiAssetABI, provider);
      const fee = await contract.getCollectedFee(tokenAddress);
      setCollectedFee(ethers.utils.formatEther(fee));
    } catch (err) {
      console.error("Error fetching fee:", err);
    }
  };

  const handleWithdraw = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(MULTI_ASSET_ADDRESS, MultiAssetABI, signer);

      const tx = await contract.withdrawCollectedFees(tokenAddress);
      await tx.wait();
      alert("✅ Fees withdrawn!");
      fetchFee();
    } catch (err) {
      console.error("Withdraw failed:", err);
      alert("❌ Withdraw failed. Check admin permissions.");
    }
  };

  useEffect(() => {
    fetchFee();
  }, [tokenAddress]);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Admin: Fee Management</h2>

      <label className="block mb-2 font-medium">Token Address (0x0 = ETH)</label>
      <input
        type="text"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="0x0 or ERC-20 address"
      />

      <p className="mb-4 text-gray-700">
        💰 <strong>Collected Fee:</strong> {collectedFee} {tokenAddress === "0x0000000000000000000000000000000000000000" ? "ETH" : "Tokens"}
      </p>

      <button
        onClick={handleWithdraw}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Withdraw Collected Fees
      </button>
    </div>
  );
}
