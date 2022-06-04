const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

let accounts;
let paymentSplitter;
let testToken;

let payeesAddresses;
let payeesShares = [10,90];

describe("PaymentSplitter", function () {
    this.beforeAll(async function () {
        accounts = await ethers.getSigners();
        payeesAddresses = [accounts[1].address, accounts[2].address]
        const testTokenFactory = await ethers.getContractFactory("testToken")
        testToken = await testTokenFactory.deploy(ethers.utils.parseUnits("10000"));
        await testToken.deployed();
        console.log(payeesAddresses,payeesShares)
    });
  
    this.beforeEach(async function () {
        const PaymentSplitter = await ethers.getContractFactory("PaymentSplitter");

        paymentSplitter = await PaymentSplitter.deploy(payeesAddresses, payeesShares, testToken.address);
        
        await paymentSplitter.deployed();

        await testToken.connect(accounts[0]).approve(paymentSplitter.address, ethers.utils.parseUnits("10000"));
    });

    it("Should have approved the contract to spend erc20 token", async function () {
        expect(await testToken.allowance(accounts[0].address, paymentSplitter.address)).to.equal(ethers.utils.parseUnits("10000"));
    })

    it("Should send 10 to acc1 and 90 to acc2", async function () {
        let accountBalance = ethers.utils.formatUnits(
            await testToken.balanceOf(accounts[0].address)
        );
        console.log(accountBalance)

        const tx0 = await paymentSplitter.donate(ethers.utils.parseUnits("100"));
        await tx0.wait();

        accountBalance = ethers.utils.formatUnits(
            await testToken.balanceOf(accounts[0].address)
        );
        console.log(accountBalance)

        let trasuryBalance = ethers.utils.formatUnits(
            await testToken.balanceOf(accounts[1].address)
        );

        let beneficiaryBalance = ethers.utils.formatUnits(
            await testToken.balanceOf(accounts[2].address)
        );

        expect(trasuryBalance).to.equal((10).toFixed(1));
        expect(beneficiaryBalance).to.equal((90).toFixed(1));
    });
})