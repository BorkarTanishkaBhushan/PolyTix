const main = async () => {
  const projectContractFactory = await hre.ethers.getContractFactory('ProjectName');
  const projectContract = await projectContractFactory.deploy("PolyTix", "PT");
  await projectContract.deployed();
  const [deployer] = await hre.ethers.getSigners();

  console.log("Contract deployed to: ", projectContract.address)

  
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