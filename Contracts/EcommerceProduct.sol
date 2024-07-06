// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EcommerceProduct {
    address payable  public owner;
    uint256 public price;

    event ProductBought(address buyer, uint256 amountPaid);
    event PriceChanged(uint256 oldPrice, uint256 newPrice);

    constructor(uint256 _price) {
        owner = payable(msg.sender);
        price = _price;
    }

    function buyProduct() public payable {
        require(msg.value == price, "Incorrect payment");
        owner.transfer(msg.value);
        emit ProductBought(msg.sender, msg.value); // Emit event on successful purchase
        // Transfer ownership here (if needed)
    }

    function sellProduct(uint256 newPrice) public {
        require(msg.sender == owner, "Only the owner can change the price");
        uint256 oldPrice = price;
        price = newPrice;
        emit PriceChanged(oldPrice, newPrice); // Emit event on price change
    }
}
