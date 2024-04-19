require("@nomiclabs/hardhat-waffle");
const fs = require("fs");

const privateKey = process.env.privateKey;
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    buildbear: {
      url: "https://rpc.buildbear.io/excessive-clea-f8a588ff",
      accounts: [privateKey],
      chainId: 16729,
    },
  },
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
