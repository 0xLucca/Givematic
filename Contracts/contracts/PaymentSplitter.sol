// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PaymentSplitter is Ownable {
    event PayeeAdded(address account, uint256 shares);
    event ERC20PaymentReleased(IERC20 indexed token, address to, uint256 amount);
    event PaymentReceived(address from, uint256 amount);

    string public name;
    string public category;

    address public tokenAddress;
    uint256 public totalShares;
    uint256 public totalReleased;

    mapping(address => uint256) public shares;
    address[] public payees;

    /**
     * @dev Creates an instance of `PaymentSplitter` where each account in `payees` is assigned the number of shares at
     * the matching position in the `shares` array.
     *
     * All addresses in `payees` must be non-zero. Both arrays must have the same non-zero length, and there must be no
     * duplicates in `payees`.
     */
    constructor(string memory _name, string memory _category, address[] memory _payees, uint256[] memory shares_, address tokenAddress_){
        require(_payees.length == shares_.length, "PaymentSplitter: payees and shares length mismatch");
        require(_payees.length > 0, "PaymentSplitter: no payees");

        name = _name;
        category = _category;
        tokenAddress = tokenAddress_;

        for (uint256 i = 0; i < _payees.length; i++) {
            addPayee(_payees[i], shares_[i]);
        }
    }

    function donate(uint256 amount) public onlyOwner{
        uint256 payment;
        address account;
        IERC20 token = IERC20(tokenAddress);
        for(uint256 i = 0; i < payees.length; i++){
            account = payees[i];
            payment = _pendingPayment(account, amount);
            SafeERC20.safeTransferFrom(token, msg.sender, account, payment);
            emit ERC20PaymentReleased(token, account, payment);
        }
        totalReleased += amount;
        emit PaymentReceived(msg.sender, amount);
    }
    
    /**
     * @dev Getter for the total shares held by payees.
     */
    function getTotalShares() public view returns (uint256) {
        return totalShares;
    }

    /**
     * @dev Getter for the total amount of Ether already released.
     */
    function getTotalReleased() public view returns (uint256) {
        return totalReleased;
    }

    /**
     * @dev Getter for the amount of shares held by an account.
     */
    function getShares(address account) public view returns (uint256) {
        return shares[account];
    }

    /**
     * @dev Getter for the address of the payee number `index`.
     */
    function payee(uint256 index) public view returns (address) {
        return payees[index];
    }

    /**
     * @dev internal logic for computing the pending payment of an `account` given the token historical balances and
     * already released amounts.
     */
    function _pendingPayment(
        address account,
        uint256 totalReceived
    ) private view returns (uint256) {
        return (totalReceived * shares[account]) / totalShares;
    }

    /**
     * @dev Add a new payee to the contract.
     * @param account The address of the payee to add.
     * @param shares_ The number of shares owned by the payee.
     */
    function addPayee (address account, uint256 shares_) public onlyOwner {
        require(account != address(0), "PaymentSplitter: account is the zero address");
        require(shares_ > 0, "PaymentSplitter: shares are 0");
        require(shares[account] == 0, "PaymentSplitter: account already has shares");

        payees.push(account);
        shares[account] = shares_;
        totalShares = totalShares + shares_;
        emit PayeeAdded(account, shares_);
    }
}
