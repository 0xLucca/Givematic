const main = async () => {
    const givematicFactory = await hre.ethers.getContractFactory("Givematic");
    const givematic = await givematicFactory.deploy();
    await givematic.deployed();
    console.log("Contract deployed to:", givematic.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
  