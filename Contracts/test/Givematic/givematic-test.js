const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

let accounts;
let givematic;
let paymentSplitter;
let testToken;

let payeesAddresses;
let payeesShares = [10,90];

describe("Givematic", function () {
    this.beforeAll(async function () {
        accounts = await ethers.getSigners();

        payeesAddresses = [accounts[1].address, accounts[2].address]

        const testTokenFactory = await ethers.getContractFactory("testToken")
        testToken = await testTokenFactory.deploy(ethers.utils.parseUnits("10000"));
        await testToken.deployed();

        //console.log(payeesAddresses,payeesShares)
    });
  
    this.beforeEach(async function () {
        const Givematic = await ethers.getContractFactory("Givematic")
        givematic = await Givematic.deploy();
        await givematic.deployed();
    });

    it("Should deploy a new PaymentSplitter", async function () {
        const tx0 = await givematic.createPaymentSplitter("TestSplitter", "TestCategory", payeesAddresses, payeesShares, testToken.address);
        await tx0.wait()

        let contracts = await givematic.getPaymentSplitters()
        console.log(contracts)
        expect(contracts.length).to.not.equal(0);
    });

    it("Should be able to donate", async function () {
        const tx0 = await givematic.createPaymentSplitter("TestSplitter", "TestCategory", payeesAddresses, payeesShares, testToken.address);
        await tx0.wait()

        let contracts = await givematic.getPaymentSplitters()

        const PaymentSplitter = await ethers.getContractFactory("PaymentSplitter")
        paymentSplitter = await PaymentSplitter.attach(contracts[0])

        await testToken.connect(accounts[0]).approve(paymentSplitter.address, ethers.utils.parseUnits("10000"));
        expect(await testToken.allowance(accounts[0].address, paymentSplitter.address)).to.equal(ethers.utils.parseUnits("10000"));

        const tx1 = await paymentSplitter.donate(ethers.utils.parseUnits("100"));
        await tx1.wait();

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