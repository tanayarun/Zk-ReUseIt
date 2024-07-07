// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Ecommerce6 {
    address public owner;

    struct Item {
        uint256 id;
        string name;
        string category;
        uint256 cost;
        uint256 rating;
    }

    struct Order {
        uint256 time;
        Item item;
    }

    mapping(uint256 => Item) public items;
    mapping(address => mapping(uint256 => Order)) public orders;
    mapping(address => uint256) public orderCount;

    event Buy(address buyer, uint256 orderId, uint256 itemId);
    event List(string name, uint256 cost);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }
    // Ye wala button/function check karo pehle -- ye wala listing produck ke liye hai
    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        uint256 _cost,
        uint256 _rating
    ) public onlyOwner {
        // Create Item
        Item memory item = Item(
            _id,
            _name,
            _category,
            _cost,
            _rating
        );

        // Add Item to mapping
        items[_id] = item;

        // Emit event
        emit List(_name, _cost);
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

    // function withdraw() public onlyOwner {
    //     (bool success, ) = owner.call{value: address(this).balance}("");
    //     require(success, "Withdrawal failed");
    // }
}
