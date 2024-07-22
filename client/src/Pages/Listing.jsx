import React, { useState } from "react";
import { ethers } from "ethers";
import MyContractABI from "../abis/abi.json";
import Navbaar from "../Components/UI/Navbaar";

const Listing = () => {
  const [listingId, setListingId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [fetchId, setFetchId] = useState("");
  const [fetchedItem, setFetchedItem] = useState(null);
  const [allItems, setAllItems] = useState([]); // State for all items

  const contractABI = MyContractABI;
  const contractAddress = "0x654E671DBB480Dc3cC956Ee23C9A83163CeadE29";

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

  async function listItem(id, name, category, cost) {
    const signer = await connectToMetamask();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const tx = await contract.list(id, name, category, ethers.utils.parseEther(cost));
      console.log("Transaction Hash:", tx.hash);

      await tx.wait();
      console.log("Transaction Confirmed");

      contract.on("List", (name, cost) => {
        console.log(`Item listed: Name = ${name}, Cost = ${cost}`);
      });
    } catch (error) {
      console.error("Error listing item:", error);
    }
  }

  async function fetchItem(itemId) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const item = await contract.items(itemId);

      // Process the fetched item
      const processedItem = {
        id: item.id.toString(),
        name: item.name,
        category: item.category,
        cost: ethers.utils.formatEther(item.cost.toString())
      };

      setFetchedItem(processedItem);
      console.log('Fetched Item:', processedItem);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  }

  async function fetchAllItems() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const items = await contract.getAllItems();
      console.log("All Items:", items);

      // Process and structure the items array
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    await listItem(listingId, name, category, cost);

    setListingId("");
    setName("");
    setCategory("");
    setCost("");

    console.log('Listing Successful');
  };

  return (
    <div>
      <Navbaar />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 justify-center items-center pt-20"
      >
        <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
          <input
            type="text"
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            value={listingId}
            onChange={(e) => setListingId(e.target.value)}
            required
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            ID
          </label>
        </div>

        <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
          <input
            type="text"
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Name
          </label>
        </div>

        <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
          <input
            type="text"
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Category
          </label>
        </div>

        <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
          <input
            type="number"
            step="0.01"
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Cost (in ETH)
          </label>
        </div>

        <button
          type="submit"
          className="w-40 inline-block rounded bg-blue-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.3),0_4px_18px_0_rgba(0,0,0,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.3),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.3),0_4px_18px_0_rgba(0,0,0,0.2)]">
          List Item
        </button>
      </form>

      <div className="flex flex-col items-center gap-3 pt-20">
        <input
          type="text"
          placeholder="Enter ID to fetch item"
          value={fetchId}
          onChange={(e) => setFetchId(e.target.value)}
          className="peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        />
        <button
          type="button"
          onClick={() => fetchItem(fetchId)}
          className="w-40 inline-block rounded bg-blue-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.3),0_4px_18px_0_rgba(0,0,0,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.3),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.3),0_4px_18px_0_rgba(0,0,0,0.2)]">
          Fetch Item
        </button>
        <button
          type="button"
          onClick={fetchAllItems}
          className="w-40 inline-block rounded bg-blue-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.3),0_4px_18px_0_rgba(0,0,0,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.3),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.3),0_4px_18px_0_rgba(0,0,0,0.2)]">
          Fetch All Items
        </button>
        <div className="pt-12">
          {allItems.length > 0 && (
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-xl text-white">All Items</h2>
              {allItems.map((item) => (
                <div key={item.id} className="text-white">
                  <p>ID: {item.id}</p>
                  <p>Name: {item.name}</p>
                  <p>Category: {item.category}</p>
                  <p>Cost: {item.cost} ETH</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {fetchedItem && (
          <div className="flex flex-col items-center gap-2 pt-12 pb-5">
            <h2 className="text-xl text-white">Fetched Item Details</h2>
            <p className="text-white">ID: {fetchedItem.id}</p>
            <p className="text-white">Name: {fetchedItem.name}</p>
            <p className="text-white">Category: {fetchedItem.category}</p>
            <p className="text-white">Cost: {fetchedItem.cost} ETH</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listing;
