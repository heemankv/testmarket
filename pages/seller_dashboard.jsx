import React, { Fragment, useContext, useEffect, useState } from "react";
import web3 from "web3";
import { useRouter } from "next/router";
import {
  AppContextProps,
  BlockchainContext,
} from "../context/BlockchainContext";
import Image from "next/image";
import { ListAllSellerProducts, AddProducts, GetUser } from "./api/blockchain";
import { BigNumber } from "ethers";
import Avatar from "../public/images/aa.jpg";

const Card = (props) => {
  console.log(props, " is props");
  console.log(parseInt(props?.element.price._hex), " is porps");
  return (
    <div className="bg-blue-500 pl-1 w-72 h-20 rounded-lg shadow-md">
      <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
        <div className="my-auto">
          <p className="font-bold">
            {props?.element.name ? props.element.name : "Item #..."}
          </p>
          <p className="text-lg">
            {props?.element
              ? parseInt(props?.element.price._hex)
              : "Price #..."}
            &nbsp;Eth &nbsp;&nbsp; &nbsp;Id:&nbsp;
            {props?.element
              ? parseInt(props?.element.productId._hex)
              : "Price #..."}
          </p>
          <p className="text-lg"></p>
        </div>
        <div className="my-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
function Seller_dashboard() {
  const [ans, setAns] = useState(undefined);
  const [productList, setProductList] = useState(undefined);

  const [price, setPrice] = useState(0);
  const [productName, setProductName] = useState("");

  const router = useRouter();
  const { getProvider, connectedAccount } = useContext(BlockchainContext);

  async function getUser2() {
    console.log(connectedAccount, " is lol");
    if (connectedAccount) {
      let response = await GetUser(getProvider, connectedAccount);
      console.log(response, " qwer");
      // let tx2 = await response.wait();
      // console.log(tx2, "tyu");
      setAns(response);
      return response;
    }
    return null;
  }

  async function listProducts() {
    let response = await ListAllSellerProducts(getProvider, connectedAccount);
    setProductList(response);
    console.log(response);
  }

  async function addProduct() {
    let response = await AddProducts(getProvider, parseInt(price), productName);
    console.log(response);
  }

  useEffect(() => {
    getUser2();
    listProducts();
  }, [connectedAccount, getProvider]);
  console.log(parseInt(price));
  console.log(typeof parseInt(price));
  console.log(parseInt(0x0c), "fdfdfd");

  return (
    <div className="h-screen pt-8  md:flex px-0 ">
      <div className="md:w-1/2  px-0  md:flex md:justify-center   md:mx-4">
        <div className="px-0 ">
          <p className="text-5xl text-left pb-8 "> Seller Dashboard</p>
          <div className=" bg-white rounded-lg w-max border border-gray-200 shadow-md">
            <div className="items-center md:flex md:justify-center pb-5">
              <div className=" md:w-1/2 mx-12  ">
                <Image
                  className="mb-3 w-24 h-24 rounded-full shadow-sm"
                  src={Avatar}
                  alt="Bonnie image"
                  height={200}
                  width={200}
                />
                <h5 className="mb-1 text-xl text-center font-medium  dark:text-black">
                  {ans ? ans[2] : "Bonnie Green"}
                </h5>
                <h5 className="text-sm text-gray-500 text-center dark:text-gray-400">
                  {ans ? ans[3] : "Pan number"}
                </h5>
              </div>
              <div className=" md:w-1/2 mx-12 ">
                <div className="flex mt-4 space-x-3 lg:mt-6">
                  <input
                    className="w-full px-4 py-2 text-sm text-black bg-gray-100  border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-blue-500"
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="flex mt-4 space-x-3 lg:mt-6">
                  <input
                    className="w-full px-4 py-2 text-sm text-black bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-blue-500"
                    type="text"
                    placeholder="Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div className="flex mt-4 space-x-3 lg:mt-6">
                  <button
                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                      console.log("clicked");
                      addProduct();
                    }}
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="md:w-1/2 md:flex justify-center">
        <div className="md:w-1/2 ">
          <div className="flex justify-between md:mx-6">
            <p className="text-xl md:text-3xl">Your Products</p>
            <button
              placeholder="Refresh"
              onClick={(e) => {
                e.preventDefault();
                listProducts();
              }}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-black dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              <p className="text-white">Refresh</p>
            </button>
          </div>
          <body className=" justify-center  font-ssans flex">
            <div className="mx-auto mb-8  mx-8 mt-4 space-y-6">
              {/*  mapping */}
              {productList?.map((product) => (
                <Card key={product.id} element={product} />
              ))}
              {/* <Card props={element} /> */}
            </div>
          </body>
        </div>
      </div>
    </div>
  );
}
Seller_dashboard.layout = "L1";
export default Seller_dashboard;
