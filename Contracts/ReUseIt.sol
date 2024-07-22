// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract ReUseIt {
    address public owner;

    struct Item {
        uint256 id;
        string name;
        string category;
        uint256 cost;
    }

    struct Order {
        uint256 time;
        Item item;
    }

    mapping(uint256 => Item) public items;
    uint256[] public itemIds;  // Array to keep track of all item IDs
    mapping(address => mapping(uint256 => Order)) public orders;
    mapping(address => uint256) public orderCount;

    event Buy(address buyer, uint256 orderId, uint256 itemId);
    event List(string name, uint256 cost);

    constructor() {
        owner = msg.sender;
    }

    function list(
        uint256 id,
        string memory name,
        string memory category,
        uint256 cost
    ) public {
        // Create Item
        Item memory item = Item(id, name, category, cost);

        // Add Item to mapping
        items[id] = item;

        // Add item ID to array
        itemIds.push(id);

        // Emit event
        emit List(name, cost);
    }

    function buy(uint256 _id) public payable {
        // Fetch item
        Item memory item = items[_id];

        // Require enough ether to buy item
        require(msg.value >= item.cost, "Not enough Ether provided");

        // Create order
        Order memory order = Order(block.timestamp, item);

        // Add order for user
        orderCount[msg.sender]++; // <-- Order ID
        orders[msg.sender][orderCount[msg.sender]] = order;

        // Emit event
        emit Buy(msg.sender, orderCount[msg.sender], item.id);
    }

    function withdraw() public {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }

    function getAllItems() public view returns (Item[] memory) {
        Item[] memory allItems = new Item[](itemIds.length);
        for (uint256 i = 0; i < itemIds.length; i++) {
            allItems[i] = items[itemIds[i]];
        }
        return allItems;
    }   
}
