// SPDX-License-Identifier: MIT
pragma solidity >0.4.23 <0.9.0;

import "./PaymentSplitter.sol";

contract Givematic {
    
    event PaymentSplitterCreated(string name, string category, address[] payees, uint256[] shares, address tokenAddress);

    PaymentSplitter[] public paymentSplitters;

    constructor(){ 
    }

    function createPaymentSplitter(string memory name, string memory category, address[] memory payees, uint256[] memory shares, address tokenAddress) public {
        PaymentSplitter paymentSplitter = new PaymentSplitter(
            name,
            category,
            payees,
            shares,
            tokenAddress
        );
        paymentSplitters.push(paymentSplitter);
        emit  PaymentSplitterCreated(name, category, payees, shares, tokenAddress);
    }

    function getPaymentSplitters() external view returns(PaymentSplitter[] memory _paymentSplitters){
       _paymentSplitters = new PaymentSplitter[](paymentSplitters.length);
       uint count;
       for(uint i=0;i<paymentSplitters.length; i++){
            _paymentSplitters[count] = paymentSplitters[i];
            count++;
        }
    }
}

    