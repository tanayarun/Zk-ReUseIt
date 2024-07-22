import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import MyContractABI from "../abis/abi.json";
import Navbaar from "../Components/UI/Navbaar";

const contractABI = MyContractABI;
const contractAddress = "0x3e8bfE7377dd7df1b98DeF3e8Ae68Bcf41d6465D";

const BuyItem = () => {
  const [buyId, setBuyId] = useState("");
  const [cost, setCost] = useState("");

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return signer;
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.error("Metamask is not installed");
    }
  }

  async function buyItem(id, cost) {
    const signer = await connectToMetamask();
    if (!signer) return;

    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const tx = await contract.buy(id, { value: ethers.utils.parseEther(cost) });
      console.log("Transaction sent:", tx);

      const receipt = await tx.wait();
      console.log("Transaction mined:", receipt);

      // Listen for the Buy event
      contract.on("Buy", (buyer, orderId, itemId) => {
        console.log(`Item bought: Buyer = ${buyer}, Order ID = ${orderId}, Item ID = ${itemId}`);
      });
    } catch (error) {
      console.error("Error buying item:", error.message);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await buyItem(buyId, cost);

    setBuyId("");
    setCost("");

    console.log("Bought");
  };

  return (
    <div>
      <Navbaar />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center items-center pt-20">
        <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
          <input
            type="text"
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            value={buyId}
            onChange={(e) => setBuyId(e.target.value)}
            required
          />
          <label className="pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 px-2">
            ID
          </label>
        </div>
        <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
          <input
            type="text"
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
          <label className="pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 px-2">
            Cost
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Buy Item
        </button>
      </form>

    </div>
  );
};

export default BuyItem;
