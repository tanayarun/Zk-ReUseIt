import React, { useEffect, useState } from "react";
import pushLogo from "./assets/push.svg";
import "./App.css";
import { ethers } from "ethers";
import counterAbi from "./abis/counterAbi.json";
import { NavLink } from "react-router-dom";

const contractAddress = "0x312319c3f8311EbFca17392c7A5Fef674a48Fa72";

function App() {
  const [count, setCount] = useState(0);
  const [address, setAddress] = useState();
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.error("MetaMask not detected, please download it");
    } else {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setProvider(provider);
        setSigner(signer);
        setAddress(address);
      } catch (err) {
        console.error("Error connecting to MetaMask:", err);
      }
    }
  };
  

  const disconnectWallet = async () => {
    if (provider) {
      await provider.send("wallet_requestPermissions", [{ eth_accounts: {} }]);
      setProvider(null);
      setSigner(null);
      setAddress(null);
    }
  };

  const switchChain = async (chainId) => {
    if (provider) {
      try {
        await provider.send("wallet_switchEthereumChain", [{ chainId: ethers.utils.hexlify(chainId) }]);
      } catch (err) {
        console.error("Error switching chain:", err);
      }
    }
  };

  const getCounter = async () => {
    if (signer) {
      try {
        const contract = new ethers.Contract(contractAddress, counterAbi, signer);
        const counter = await contract.getCounter();
        setCount(counter.toNumber());
      } catch (err) {
        console.error("Error getting counter value:", err);
      }
    }
  };

  const incrementCounter = async () => {
    if (signer) {
      try {
        const contract = new ethers.Contract(contractAddress, counterAbi, signer);
        const tx = await contract.increment();
        await tx.wait();
        getCounter();
      } catch (err) {
        console.error("Error incrementing counter:", err);
      }
    }
  };

  const decrementCounter = async () => {
    if (signer) {
      try {
        const contract = new ethers.Contract(contractAddress, counterAbi, signer);
        const tx = await contract.decrement();
        await tx.wait();
        getCounter();
      } catch (err) {
        console.error("Error decrementing counter:", err);
      }
    }
  };

  return (
    <>
      <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
        <img src={pushLogo} className="logo" alt="Push logo" />
      </a>
      <h1 className="ha">Zk-ReUseIt</h1>
      <div className="wallet">
        {!address ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <div>
            <button onClick={disconnectWallet}>Disconnect Wallet</button>
            <h3>Address: {address}</h3>
          </div>
        )}
      </div>
      <div className="flex-body">
        <button onClick={() => switchChain(1)}>Switch to Mainnet</button>
        <button onClick={() => switchChain(11155111)}>Switch to Sepolia</button>
      </div>
      <div className="card">
        <div>
          <button onClick={getCounter}>Get Counter Value</button>
          {count !== undefined && <h4>Counter Value: {count}</h4>}
        </div>
        <div className="flex-body">
          <button onClick={incrementCounter}>Increment Counter</button>
          <button onClick={decrementCounter}>Decrement Counter</button>
        </div>
      </div>

      <div className="flex justify-center text-center">
          <NavLink to="/shop">
              <span className="text-lg bg-black text-white py-2 px-4 rounded-lg">Go to shop!</span>
          </NavLink>
        </div>
    </>
  );
}

export default App;