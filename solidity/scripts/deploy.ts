import { ethers } from "hardhat";

async function main() {
  //Asset Token
  const assetFactory = await ethers.getContractFactory(
    "assetToken"
  );
  const assetContract = await assetFactory.deploy();

  await assetContract.deployed();
  console.log("Contract deployed to:", assetContract.address);

  //Asset Token Factory
  const assetTokenFactoryFactory = await ethers.getContractFactory(
    "assetTokenFactory"
  );
  const assetTokenFactoryContract = await assetTokenFactoryFactory.deploy();

  await assetTokenFactoryContract.deployed();
  console.log("Contract deployed to:", assetTokenFactoryContract.address);
  
  // //Platform Entry Point
  // const platformEntryPointFactory = await ethers.getContractFactory(
  //   "platformEntryPoint"
  // );
  // const platformEntryPointContract = await platformEntryPointFactory.deploy();

  // await platformEntryPointContract.deployed();
  // console.log("Contract deployed to:", platformEntryPointContract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
