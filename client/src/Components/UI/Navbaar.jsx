import React, { useState } from "react";
import logo from "../../assets/push.svg";
import { ethers } from "ethers";
import HoverBorderGradient from "../../Components/UI/Hover-border-gradient";
import { NavLink } from "react-router-dom";

const contractAddress = "0x312319c3f8311EbFca17392c7A5Fef674a48Fa72";

const Navbaar = () => {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        console.error("MetaMask not detected, please download it");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setProvider(provider);
      setSigner(signer);
      setAddress(address);
    } catch (err) {
      console.error("Error connecting to MetaMask:", err);
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setAddress(null);
  };

  const formatAddress = (address) => {
    if (!address) return "";
    const start = address.substring(0, 3);
    const end = address.substring(address.length - 3);
    return `${start}...${end}`;
  };

  return (
    <div className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg backdrop-grayscale absolute top-0 right-0 text-white w-full h-[4rem]">
      <div className="flex items-center justify-between px-[5rem] mt-2">
        <NavLink to="/">
          <img className="w-[40px]" src={logo} alt="Logo" />
        </NavLink>
        <div className="flex justify-center items-center gap-6">
        
        <NavLink to="/buy">
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-m px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buy Item</button>
        </NavLink>
        
        <NavLink to="/list">
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-m px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">List Item</button>
        </NavLink>
        <div>
          {!address ? (
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-black text-white flex items-center space-x-12 px-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 bg-opacity-50"
              onClick={connectWallet}
            >
              Connect Wallet
            </HoverBorderGradient>
          ) : (
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="div"
              className="bg-black text-white flex items-center space-x-12 px-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 bg-opacity-50"
            >
              <button onClick={disconnectWallet}>Disconnect Wallet</button>
              <h3>Address: {formatAddress(address)}</h3>
            </HoverBorderGradient>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Navbaar;
