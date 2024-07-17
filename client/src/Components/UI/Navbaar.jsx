import React, { useState } from 'react';
import logo from "../../assets/push.svg";
import { ethers } from "ethers";
import counterAbi from "../../abis/counterAbi.json";
import HoverBorderGradient from "../../Components/UI/Hover-border-gradient";

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
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      
      setProvider(provider);
      setSigner(signer);
      setAddress(address);
    } catch (err) {
      console.error("Error connecting to MetaMask:", err);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (provider) {
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }]
        });
        setProvider(null);
        setSigner(null);
        setAddress(null);
      }
    } catch (err) {
      console.error("Error disconnecting from MetaMask:", err);
    }
  };

  return (
    <div className='bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg backdrop-grayscale absolute top-0 right-0 text-white w-full h-[4rem]'>
      <div className='flex items-center justify-between px-[5rem] mt-2'>
        <div><img className="w-[40px]" src={logo} alt="" /></div>
        
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
          <>
            <button onClick={disconnectWallet}>Disconnect Wallet</button>
            <h3>Address: {address}</h3>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbaar;
