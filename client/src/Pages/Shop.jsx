import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyContractABI from "../abis/abi.json";
import Navbaar from "../Components/UI/Navbaar";
import eth from "../assets/eth.png";
import "../index.css";

const contractABI = MyContractABI;
const contractAddress = "0x654E671DBB480Dc3cC956Ee23C9A83163CeadE29";

const Shop = () => {
  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fetchedItems, setFetchedItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllItems();
  }, []);

  async function fetchAllItems() {
    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const items = await contract.getAllItems();
      const formattedItems = items.map((item) => ({
        id: item.id.toString(),
        name: item.name,
        category: item.category,
        cost: ethers.utils.formatEther(item.cost.toString()),
      }));

      setAllItems(formattedItems);
    } catch (error) {
      console.error("Error fetching all items:", error);
      toast.error("Error fetching all items");
    }
    setLoading(false);
  }

  async function fetchItemsByName(name) {
    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const items = await contract.getAllItems();
      const matchingItems = items
        .map((item) => ({
          id: item.id.toString(),
          name: item.name,
          category: item.category,
          cost: ethers.utils.formatEther(item.cost.toString()),
        }))
        .filter((item) => item.name.toLowerCase() === name.toLowerCase() && (selectedCategory === "" || item.category === selectedCategory));

      if (matchingItems.length > 0) {
        setFetchedItems(matchingItems);
        console.log("Fetched Items:", matchingItems);
      } else {
        console.error("Items not found");
        setFetchedItems([]);
        toast.error("Items not found");
      }
    } catch (error) {
      console.error("Error fetching items by name:", error);
      toast.error("Error fetching items by name");
    }
    setLoading(false);
  }

  async function fetchItemsByCategory(category) {
    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const items = await contract.getAllItems();
      const filteredItems = items
        .map((item) => ({
          id: item.id.toString(),
          name: item.name,
          category: item.category,
          cost: ethers.utils.formatEther(item.cost.toString()),
        }))
        .filter((item) => item.category === category);

      if (filteredItems.length > 0) {
        setFetchedItems(filteredItems);
        console.log("Fetched Items by Category:", filteredItems);
      } else {
        console.error("Items not found for category");
        setFetchedItems([]);
        toast.error("Items not found for category");
      }
    } catch (error) {
      console.error("Error fetching items by category:", error);
      toast.error("Error fetching items by category");
    }
    setLoading(false);
  }

  async function handleSearch() {
    if (searchName.trim() !== "") {
      await fetchItemsByName(searchName);
    } else {
      // Fetch all items if no name is provided
      fetchAllItems();
    }
  }

  async function handleCategoryChange(event) {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === "") {
      // If no category selected, show all items
      fetchAllItems();
    } else {
      // Fetch items by selected category
      await fetchItemsByCategory(category);
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
        toast.error("User denied account access");
      }
    } else {
      console.error("Metamask is not installed");
      toast.error("Metamask is not installed");
    }
  }

  async function buyItem(id, cost) {
    const signer = await connectToMetamask();
    if (!signer) return;

    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const tx = await contract.buy(id, {
        value: ethers.utils.parseEther(cost),
      });
      console.log("Transaction sent:", tx);

      const receipt = await tx.wait();
      console.log("Transaction mined:", receipt);

      toast.success("Transaction successful!");

      contract.on("Buy", (buyer, orderId, itemId) => {
        console.log(
          `Item bought: Buyer = ${buyer}, Order ID = ${orderId}, Item ID = ${itemId}`
        );
      });
    } catch (error) {
      console.error("Error buying item:", error.message);
      toast.error("Error buying item: " + error.message);
    }
  }

  return (
    <div className="p-4">
      <Navbaar />
      <ToastContainer />
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
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="ml-2 rounded border border-blue-gray-200 bg-transparent px-3 py-2 rounded-lg text-sm font-normal text-white outline outline-0 transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
        >
          <option value="" disabled>
              Select a category
            </option>
            <option
              value="Automobile"
            >
              Automobile
            </option>
            <option
              value="Electronics"
            >
              Electronics
            </option>
            <option value="Furniture">Furniture</option>
            <option
              value="Action figures"
            >
              Action figures
            </option>
            <option
              value="Vintage"
            >
              Vintage
            </option>
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-4 pt-10">
        {loading && <span className="loader "></span>}
        {!loading && fetchedItems.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {fetchedItems.map((item) => (
              <div
                key={item.id}
                className="text-white cardd p-6 rounded-lg shadow-lg max-w-sm flex flex-col justify-center items-center"
              >
                <img
                  src={eth}
                  alt="Sample"
                  className="w-20 object-cover mb-4 rounded"
                />
                <p className="text-lg"> {item.name}</p>
                <p className="text-lg">Category: {item.category}</p>
                <p className="text-lg mt-1">{item.cost} ETH</p>
                <button
                  onClick={() => buyItem(item.id, item.cost)}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 mt-3"
                >
                  <span className="relative px-6 py-1.5 transition-all ease-in duration-75 bg-gray-600 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Buy
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
        {!loading && allItems.length > 0 && fetchedItems.length === 0 && (
          <div className="grid grid-cols-3 gap-12 px-16">
            {allItems.map((item) => (
              <div
                key={item.id}
                className="text-white cardd p-6 rounded-lg shadow-lg max-w-sm flex flex-col justify-center items-center"
              >
                <img
                  src={eth}
                  alt="Sample"
                  className="w-20 object-cover mb-4 rounded"
                />
                <p className="text-lg"> {item.name}</p>
                <p className="text-lg">Category: {item.category}</p>
                <p className="text-lg mt-1">{item.cost} ETH</p>
                <button
                  onClick={() => buyItem(item.id, item.cost)}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 mt-3"
                >
                  <span className="relative px-6 py-1.5 transition-all ease-in duration-75 bg-gray-600 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Buy
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
