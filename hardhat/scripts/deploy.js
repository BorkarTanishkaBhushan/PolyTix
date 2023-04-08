const main = async () => {
  const projectContractFactory = await hre.ethers.getContractFactory('ProjectName');
  const projectContract = await projectContractFactory.deploy("PolyTix", "PT");
  await projectContract.deployed();
  const [deployer] = await hre.ethers.getSigners();

  console.log("Contract deployed to: ", projectContract.address)

  // let txn = await projectContract.register("tanu",  {value: hre.ethers.utils.parseEther('0.2')});
  let txn = await projectContract.safeMint("Blockchain Event", deployer.address, 5) 
  await txn.wait();
  console.log("Event added");
}

const runMain = async () => {
  try {
      await main();
      process.exit(0);
  } catch (error) {
      console.log(error);
      process.exit(1);
  }
}

runMain();

// https://www.testnets.dev/
// https://testnets.opensea.io/assets/mumbai/