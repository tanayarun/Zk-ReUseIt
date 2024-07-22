import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import MyContractABI from "../abis/abi.json";
import Navbaar from "../Components/UI/Navbaar";

const Shop = () => {
  const [searchName, setSearchName] = useState("");
  const [fetchedItem, setFetchedItem] = useState(null);
  const [allItems, setAllItems] = useState([]);

  const contractABI = MyContractABI;
  const contractAddress = "0x654E671DBB480Dc3cC956Ee23C9A83163CeadE29";

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
          <div className=" text-white bg-blue-800 p-6 rounded-lg shadow-lg max-w-sm">
            <p className="text-lg">ID: {fetchedItem.id}</p>
            <p className="text-lg">Name: {fetchedItem.name}</p>
            <p className="text-lg">Category: {fetchedItem.category}</p>
            <p className="text-lg">Cost: {fetchedItem.cost} ETH</p>
          </div>
        )}
        {allItems.length > 0 && !fetchedItem && (
          <div className="flex flex-wrap justify-center gap-4">
            {allItems.map((item) => (
              <div key={item.id} className=" text-white bg-blue-800 p-6 rounded-lg shadow-lg max-w-sm">
                <p className="text-lg">ID: {item.id}</p>
                <p className="text-lg">Name: {item.name}</p>
                <p className="text-lg">Category: {item.category}</p>
                <p className="text-lg">Cost: {item.cost} ETH</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
