import { useState } from "react";
import pushLogo from "./assets/push.svg";

import "./App.css";
 import { ethers } from "ethers";

import counterAbi from "./abis/counterAbi.json";
const contractAddress = "0x312319c3f8311EbFca17392c7A5Fef674a48Fa72";

function App() {
  const [count, setCount] = useState(0);
  const [address, setAddress] = useState();
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.error("MEtamask not detected, pls download it");
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setProvider(provider);
      setSigner(signer);
      setAddress(address);
    }
  };

  const disconnectWallet = async () => { 
    await provider.send("wallet_revokePermissions", [{
      eth_accounts: {}
    }]);

    setProvider(null);
    setSigner(null);
    setAddress(null);
  };

  const switchChain = async (chainId) => { };

  const getCounter = async () => { };

  const incrementCounter = async () => { };

  const decrementCounter = async () => { };

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
    </>
  );
}

export default App;
