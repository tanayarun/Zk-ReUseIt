import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import MyContractABI from "../abis/abi.json";
import Navbaar from "../Components/UI/Navbaar";
import ModalTSuccess from "../Components/UI/Modal";
import eth from '../assets/eth.png'

const contractABI = MyContractABI;
const contractAddress = "0x654E671DBB480Dc3cC956Ee23C9A83163CeadE29";

const Shop = () => {
  const [searchName, setSearchName] = useState("");
  const [fetchedItem, setFetchedItem] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    fetchAllItems();
  }, []);

  async function fetchAllItems() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const items = await contract.getAllItems();
      const formattedItems = items.map(item => ({
        id: item.id.toString(),
        name: item.name,
        category: item.category,
        cost: ethers.utils.formatEther(item.cost.toString())
      }));

      setAllItems(formattedItems);
    } catch (error) {
      console.error('Error fetching all items:', error);
    }
  }

  async function fetchItemByName(name) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      // Fetch all items first
      const items = await contract.getAllItems();

      // Find item by name
      const item = items.find(item => item.name.toLowerCase() === name.toLowerCase());

      if (item) {
        const processedItem = {
          id: item.id.toString(),
          name: item.name,
          category: item.category,
          cost: ethers.utils.formatEther(item.cost.toString())
        };
        setFetchedItem(processedItem);
        console.log('Fetched Item:', processedItem);
      } else {
        console.error('Item not found');
        setFetchedItem(null); // Clear fetched item if not found
      }
    } catch (error) {
      console.error('Error fetching item by name:', error);
    }
  }

  async function handleSearch() {
    if (searchName.trim() !== "") {
      await fetchItemByName(searchName);
    }
  }

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

      // Show success message in modal
      setModalMessage("Transaction successful!");
      setIsModalOpen(true);

      // Listen for the Buy event
      contract.on("Buy", (buyer, orderId, itemId) => {
        console.log(`Item bought: Buyer = ${buyer}, Order ID = ${orderId}, Item ID = ${itemId}`);
      });
    } catch (error) {
      console.error("Error buying item:", error.message);
    }
  }

  return (
    <div className="p-4">
      <Navbaar />
      <div className="pt-16 mb-4 flex justify-center items-center">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="ml-2 inline-block rounded bg-blue-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-xl focus:bg-blue-600 focus:shadow-xl focus:outline-none active:bg-blue-700"
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 pt-10">
        {fetchedItem && (
          <div className="text-white bg-blue-800 p-6 rounded-lg shadow-lg max-w-sm">
            <img src="https://via.placeholder.com/150" alt="Sample" className="w-full h-40 object-cover mb-4 rounded" />
            <p className="text-lg">ID: {fetchedItem.id}</p>
            <p className="text-lg">Name: {fetchedItem.name}</p>
            <p className="text-lg">Category: {fetchedItem.category}</p>
            <p className="text-lg">Cost: {fetchedItem.cost} ETH</p>
            <button
              onClick={() => buyItem(fetchedItem.id, fetchedItem.cost)}
              className="mt-2 inline-block rounded bg-green-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-xl focus:bg-green-600 focus:shadow-xl focus:outline-none active:bg-green-700"
            >
              Buy
            </button>
          </div>
        )}
        {allItems.length > 0 && !fetchedItem && (
          <div className="flex flex-wrap justify-center gap-4">
            {allItems.map((item) => (
              <div key={item.id} className="text-white bg-blue-800 p-6 rounded-lg shadow-lg max-w-sm">
                <img src={eth} alt="Sample" className="w-20 object-cover mb-4 rounded" />
                <p className="text-lg">ID: {item.id}</p>
                <p className="text-lg">Name: {item.name}</p>
                <p className="text-lg">Category: {item.category}</p>
                <p className="text-lg">Cost: {item.cost} ETH</p>
                <button
                  onClick={() => buyItem(item.id, item.cost)}
                  className="mt-2 inline-block rounded bg-green-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-xl focus:bg-green-600 focus:shadow-xl focus:outline-none active:bg-green-700"
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ModalTSuccess isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} message={modalMessage} />
    </div>
  );
};

export default Shop;
