require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 * ${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
 * process.env.NEXT_PRIVATE_KEY
 */
module.exports = {
  solidity: "0.8.4",
  /*settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "rinkeby",*/
   networks: {
     rinkeby: {
       url: `https://rinkeby.infura.io/v3/abd998c635554f51a7464676979eb3ad`,
       accounts: ['e80fc63d97a3fc4ce1083867e2e41436db60e5cd87ba12ca4f2b2709b6ec52fe'],
     },
   },
};
