// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract MarketPlace {
    using Counters for Counters.Counter;
    Counters.Counter private _productIds; 
    Counters.Counter private _invoiceIds; 
    Counters.Counter private _totalUsers;

    struct User {
      address payable id;
      bool isSeller;  // true for seller
      string pan;
      string name;
    }
    
    struct Product {
      uint256 productId;
      uint price;
      string name;
      User seller;
    }
    
    struct Invoice {
      uint256 id;
      uint256 amount;
      bool paid;
      Product productId;
      User seller;
      User buyer;
    }


    Product[] public allProducts; // added the array

    // buyer to their Invoices
    // number of invoices for a buyer (mapped against his addresss)
    mapping(address => Invoice[]) public invoices;

    // seller to Product
    // products corresponding to a seller. 
    mapping (address => Product[]) public products;
    
    // // seller to Invoice
    // // Invoice corresponding to a seller. 
    // mapping (address => Invoice[]) public invoices;

    // address to User
    mapping (address => User) public users;

    
    function addUser( bool _isSeller, string memory _pan, string memory _name)  public returns(User memory) {
      users[msg.sender] = User(payable(msg.sender),_isSeller,_pan,_name);  
    _totalUsers.increment();
    return  users[msg.sender];
    }

    function getUser(address addr) public view returns(User memory) {
    return users[addr];
    }

    function getUser2() public view returns(User memory) {
    return users[msg.sender];
    }

     
    function addProduct(uint price, string memory name) public {
        // require((bytes(getUser(msg.sender).pan).length <=0),"User does not exist");
        require(users[msg.sender].isSeller == true, "The user is not a seller");
        
        Product memory product = Product(_productIds.current(), price, name,  getUser(msg.sender));

        products[msg.sender].push(product);

        allProducts.push(product);
        
        _productIds.increment();
    }

    function getProductofSeller(address addr) public view returns(Product[] memory) {
        // require((bytes(getUser(addr).pan).length <=0),"User does not exist");
        require(users[addr].isSeller == true, "The user is not a seller");

        Product[] memory lproduct = products[addr];
        return lproduct;
    }


    function getProducts() public view returns(Product[] memory) {
    return allProducts;
    }

    function buyProduct(uint256 productId) public payable returns(Invoice memory) {
        // require product must exist
        Product memory prod = allProducts[productId];
    
        uint price = prod.price;
        // require(msg.value >= price, "Insufficient Balance");

        User memory seller = prod.seller;
        
        require(price <= msg.value, "The price is not correct");
        require(seller.id != msg.sender, "The seller is the same as the buyer");

        Invoice memory inv = Invoice(_invoiceIds.current(),price,false,prod,getUser(msg.sender),seller);

        // money transaction
        (seller.id).transfer(msg.value);


        _invoiceIds.increment();
        inv.paid = true;
        invoices[msg.sender].push(inv);
        return inv;
    }

    function getInvoice(address buyer) public view returns (Invoice[] memory){
      Invoice[] memory lInvoices = invoices[buyer];
      return lInvoices;
    }
}