const hre = require('hardhat');
const main = async () => {
  const hyperverseAdmin = '0xD847C7408c48b6b6720CCa75eB30a93acbF5163D';
  const baseTokenURI = "ipfs://QmZbWNKJPAjxXuNFSEaksCJVd1M6DaKQViJBYPK2BdpDEP/";
  const PFP = await hre.ethers.getContractFactory('Pfp');
  const pfp = await PFP.deploy(hyperverseAdmin, baseTokenURI);
  await pfp.deployed();
  console.log(`PFP deployed to: ${pfp.address}`);

  const Factory = await hre.ethers.getContractFactory('PfpFactory');
  const pfpFactory = await Factory.deploy(pfp.address, hyperverseAdmin);
  await pfpFactory.deployed();
  console.log('PFP Factory deployed to: ', pfpFactory.address);


};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();