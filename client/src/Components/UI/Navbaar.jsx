import React, { useState } from "react";
import logo from "../../assets/logo2.png";
import { ethers } from "ethers";
import HoverBorderGradient from "../../Components/UI/Hover-border-gradient";
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const contractAddress = "0x654E671DBB480Dc3cC956Ee23C9A83163CeadE29";

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
    toast.info("To completely logout, please disconnect from MetaMask browser extension.");
  };

  const formatAddress = (address) => {
    if (!address) return "";
    const start = address.substring(0, 4);
    const end = address.substring(address.length - 4);
    return `${start}...${end}`;
  };

  return (
    <div className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg backdrop-grayscale absolute top-0 right-0 text-white w-full h-[4rem] border-b-2 border-b-blue-500">
      <div className="flex items-center justify-between pr-[5rem] mt-2">
        <NavLink to="/">
          <img className=" pl-5 w-[230px]" src={logo} alt="Logo" />
        </NavLink>
        <div className="flex justify-center items-center gap-6">
        <NavLink to="/list">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-indigo-800 text-white flex items-center space-x-1 px-6 text-sm  "
            >
              <span className="text-lg">List Item</span>
            </HoverBorderGradient>
          </NavLink>
          <NavLink to="/shop">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-indigo-800 text-white flex items-center space-x-1 px-6 text-sm "
            >
              <span className="text-lg">Go to shop</span>
            </HoverBorderGradient>
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
                <button onClick={disconnectWallet}>
                  {formatAddress(address)}
                </button>
              </HoverBorderGradient>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbaar;
