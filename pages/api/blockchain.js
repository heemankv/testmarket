import React, { useContext, useEffect, useState } from "react";
import web3 from "web3";
import { ethers } from "ethers";

import MarketPlace from "../../artifacts/contracts/MarketPlace.sol/MarketPlace.json";
import { BlockchainContext } from "../../context/BlockchainContext";
import { MarketPlaceAddress } from "../../config";

async function useGetNecessities(getProvider) {
  const provider = await getProvider();
  const signer = provider?.getSigner();

  let Marketplace = new ethers.Contract(
    MarketPlaceAddress,
    MarketPlace.abi,
    signer
  );

  return [provider, signer, Marketplace];
}

// async function BuyNFT(getProvider, connectedAccount) {
//   const [provider, signer, Parentcontract, Childcontract] =
//     await useGetNecessities(getProvider);
//   try {
//     let mintingTransaction = await Parentcontract.mint({
//       from: signer.getAddress(),
//       value: web3.utils.toWei("1"),
//     });
//     const mintingconfirmation = await mintingTransaction.wait();
//     console.log(mintingconfirmation, "mintingconfirmation");
//     console.log(
//       parseInt(
//         BigInt(mintingconfirmation.events[1].args.tokenId._hex).toString(10)
//       )
//     );
//     return true;
//   } catch (err) {
//     console.log(err, "error");
//     alert(err.message);
//     return false;
//   }
//   return false;
// }

// async function GetEngagementPoints(getProvider, connectedAccount) {
//   const [provider, signer, Parentcontract, Childcontract] =
//     await useGetNecessities(getProvider);
//   try {
//     let t1 = await Childcontract.mintEngagementPoints(
//       connectedAccount,
//       600,
//       "0x00"
//     );

//     console.log(t1, "transaction");

//     // need to return true
//   } catch (err) {
//     console.log(err, "error");
//     alert(err.message);
//     // need to return false
//   }
// }

// async function UpgradeNFT(getProvider, connectedAccount, nftId, newlevel) {
//   const [provider, signer, Parentcontract, Childcontract] =
//     await useGetNecessities(getProvider);
//   try {
//     let t2 = await Childcontract.upgradeSNFT(
//       nftId,
//       newlevel,
//       web3.utils.encodePacked(nftId),
//       {
//         from: signer.getAddress(),
//       }
//     );

//     const tx2 = await t2.wait();
//     console.log(tx2, "tx2");
//   } catch (err) {
//     console.log(err, "error");
//     alert(err.message);
//   }
//   return false;
// }

// async function CheckLevel(getProvider, nftId) {
//   const [provider, signer, Parentcontract, Childcontract] =
//     await useGetNecessities(getProvider);

//   let level = -1;

//   try {
//     let count = await Parentcontract.getLevel(nftId, ChildAddress);
//     level = parseInt(BigInt(count._hex).toString(10));
//   } catch (err) {
//     console.log(err, "error");
//     alert(err.message);
//   }
//   return level;
// }

async function AddUser(getProvider, isseller, pan, uname) {
  const [provider, signer, Marketplace] = await useGetNecessities(getProvider);
  try {
    let user = await Marketplace.addUser(isseller, pan, uname);
    console.log(user, " is the first ");
    let tx2 = await user.wait();
    console.log(tx2, " is the second ");

    return tx2?.transactionHash;
  } catch (err) {
    console.log(err, "error");
    alert(err.message);
  }
  return null;
}

async function GetUser2(getProvider) {
  const [provider, signer, Marketplace] = await useGetNecessities(getProvider);
  console.log("qq");

  try {
    let user = await Marketplace.getUser2();
    console.log("qqq");

    return user;
  } catch (err) {
    console.log(err, "error");
    alert(err.message);
  }
  return null;
}

async function GetUser(getProvider, addr) {
  const [provider, signer, Marketplace] = await useGetNecessities(getProvider);
  console.log("qq");

  try {
    let user = await Marketplace.getUser(addr);
    console.log("qqq");

    return user;
  } catch (err) {
    console.log(err, "error");
    alert(err.message);
  }
  return null;
}

async function ListAllProducts(getProvider, addr) {
  const [provider, signer, Marketplace] = await useGetNecessities(getProvider);

  try {
    let user = await Marketplace.getProducts();
    console.log("qqq");
    
    return user;
  } catch (err) {
    console.log(err, "error");
    alert(err.message);
  }
  return null;
}

async function ListAllSellerProducts(getProvider, addr) {
  const [provider, signer, Marketplace] = await useGetNecessities(getProvider);

  try {
    let user = await Marketplace.getProductofSeller(addr);
    console.log("qqq");
    return user;
  } catch (err) {
    console.log(err, "error");
    alert(err.message);
  }
  return null;
}

async function ListBuyerInvoices(getProvider, addr) {
  const [provider, signer, Marketplace] = await useGetNecessities(getProvider);

  try {
    let user = await Marketplace.getInvoice(addr);
    console.log("is the error");
    return user;
  } catch (err) {
    console.log(err, " is the error");
    alert(err.message);
  }
  return null;
}

async function AddProducts(getProvider, price, name) {
  const [provider, signer, Marketplace] = await useGetNecessities(getProvider);

  try {
    let user = await Marketplace.addProduct(price, name);
    console.log(user, " weew");
    let user2 = await user;
    //TODO: find 2nd transaction

    return user;
  } catch (err) {
    console.log(err, "error");
    alert(err.message);
  }
  return null;
}

async function BuyProducts(getProvider, id, price) {
  const [provider, signer, Marketplace] = await useGetNecessities(getProvider);
  console.log("sdfsd");

  try {
    let user = await Marketplace.buyProduct(id, {
      from: signer.getAddress(),
      value: web3.utils.toWei(price),
    });

    console.log(user, "sdfsd");

    let t2 = user.wait();
    console.log(t2, " 2323");

    //TODO: find 2nd transaction

    return user;
  } catch (err) {
    console.log(err, "error");
    alert(err.message);
  }
  return null;
}

// async function GetComposableCount(getProvider) {
//   const [provider, signer, Parentcontract, Childcontract] =
//     await useGetNecessities(getProvider);
//   let value = -1;
//   try {
//     let count = await Parentcontract.getComposableCount();
//     value = parseInt(BigInt(count._hex).toString(10));
//   } catch (err) {
//     console.log(err, "error");
//     alert(err.message);
//   }
//   return value;
// }

// async function CheckOwnership(getProvider, connectedAccount) {
//   const [provider, signer, Parentcontract, Childcontract] =
//     await useGetNecessities(getProvider);

//   let value = 0;
//   try {
//     let t1 = await Parentcontract.getComposableId(connectedAccount);
//     value = parseInt(BigInt(t1._hex).toString(10));
//   } catch (err) {
//     console.log(err, "error");
//     alert(err.message);
//   }
//   return value;
// }

// async function OwnerOfNFT(getProvider, nftId) {
//   const [provider, signer, Parentcontract, Childcontract] =
//     await useGetNecessities(getProvider);

//   try {
//     let t1 = await Parentcontract.ownerOf(nftId);
//     console.log(t1, "owner");
//     return t1;
//   } catch (err) {
//     console.log(err, "error");
//   }
//   return undefined;
// }

export {
  AddUser,
  GetUser2,
  GetUser,
  ListAllSellerProducts,
  AddProducts,
  ListAllProducts,
  BuyProducts,
  ListBuyerInvoices,
};
