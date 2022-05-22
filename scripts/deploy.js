const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const MarketPlaceContract = await hre.ethers.getContractFactory(
    "MarketPlace"
  );
  const MarketPlace = await MarketPlaceContract.deploy();
  await MarketPlace.deployed();
  console.log("MarketPlace deployed to:", MarketPlace.address);
  fs.writeFileSync(
    "./config.js",
    `
  export const MarketPlaceAddress = "${MarketPlace.address}"

  `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
