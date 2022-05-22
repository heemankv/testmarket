import React, { Fragment, useContext, useEffect, useState } from "react";
import web3 from "web3";
import { useRouter } from "next/router";
import {
  AppContextProps,
  BlockchainContext,
} from "../context/BlockchainContext";
import {
  ListAllProducts,
  BuyProducts,
  ListBuyerInvoices,
  GetUser,
} from "./api/blockchain";
import { BigNumber } from "ethers";
import Image from "next/image";
import Avatar from "../public/images/aa.jpg";

const Card = (props) => {
  console.log(props, " is props");
  console.log(parseInt(props?.element?.price?._hex), " is porps");
  return (
    <div className="bg-blue-500 pl-1 w-72 h-20 rounded-lg shadow-md">
      <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
        <div className="my-auto">
          <p className="font-bold">
            {props?.element.name ? props.element.name : "Item #..."}
          </p>
          <p className="text-lg">
            {props?.element
              ? parseInt(props?.element?.price?._hex)
              : "Price #..."}
            &nbsp;Eth &nbsp;&nbsp; &nbsp;Id:&nbsp;
            {props?.element
              ? parseInt(props?.element.productId._hex)
              : "Price #..."}
          </p>
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

const ICard = (props) => {
  console.log(props.element[3][2], " is dfS");
  return (
    <div className="bg-blue-500 pl-1 w-72 h-20 rounded-lg shadow-md">
      <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
        <div className="my-auto">
          <p className="font-bold">
            {props?.element[3][2] ? props.element[3][2] : "Item #..."}
          </p>
          <p className="text-lg">
            {props?.element
              ? parseInt(props?.element?.amount?._hex)
              : "Price #..."}
            &nbsp;Eth &nbsp;&nbsp; &nbsp;Id:&nbsp;
            {props?.element ? parseInt(props?.element.id._hex) : "Price #..."}
            &nbsp;&nbsp; &nbsp;Span:&nbsp;
            {props?.element ? props?.element.buyer.pan : "Price #..."}
          </p>
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
function User_dashboard() {
  const [ans, setAns] = useState(undefined);
  const [productList, setProductList] = useState(undefined);
  const [invoiceList, setInvoiceList] = useState(undefined);
  const [productId, setProductId] = useState(undefined);

  const router = useRouter();
  const { getProvider, connectedAccount } = useContext(BlockchainContext);

  async function listProducts() {
    let response = await ListAllProducts(getProvider, connectedAccount);
    setProductList(response);

    console.log(response);
  }

  async function listInvoices() {
    let response = await ListBuyerInvoices(getProvider, connectedAccount);
    setInvoiceList(response);

    console.log(response);
  }

  async function buyProduct() {
    console.log(productId);
    console.log(productList);
    console.log(productList[productId]);
    if (productList.length > productId) {
      let response = await BuyProducts(
        getProvider,
        parseInt(productList[productId].productId),
        productList[productId].price.toString()
      );
    } else {
      console.log("Product not found");
    }

    // console.log(response);
  }

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

  useEffect(() => {
    getUser2();
    listProducts();
    listInvoices();
  }, [connectedAccount, getProvider]);
  //   console.log(parseInt(0x0c), "fdfdfd");

  console.log(invoiceList, " is the ");
  return (
    <div className="h-screen  md:flex ">
      <div className="md:w-2/5 md:mx-4 md:flex md:justify-center mb-4">
        <div>
          <p className="text-5xl text-left pb-8 "> User Dashboard</p>
          <div className=" text-black bg-white rounded-lg w-max border  ">
            <div className="md:flex  items-center  ">
              <div className="mx-14 ">
                <Image
                  className="mb-3 w-24 h-24 rounded-full shadow-sm"
                  src={Avatar}
                  alt="Bonnie image"
                  height={200}
                  width={200}
                />
                <h5 className=" mx-14 mb-1 text-xl font-medium text-center">
                  {ans ? ans[2] : "Bonnie Green"}
                </h5>
                <span className="  mx-14 text-sm text-gray-500 dark:text-gray-400">
                  {ans ? ans[3] : "Pan number"}
                </span>
              </div>

              <div className=" md:w-1/2 mx-12 ">
                <p className="text-center">Buy a product</p>
                <div className="flex justify-center mt-4 space-x-3 lg:mt-6">
                  <input
                    className="w-full px-1 py-2 text-sm  bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-blue-500"
                    type="number"
                    placeholder="Product Id"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </div>
                <div className="flex justify-center mt-4 mb-4 space-x-3 lg:mt-6">
                  <button
                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                      console.log("clicked");
                      buyProduct();
                    }}
                  >
                    Buy Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-3/5 md:flex justify-center ">
        <div className="md:max-w-1/2 md:mx-8 ">
          <div className="flex justify-between mx-0 lg:mx-8">
            <div className="text-2xl"> Products</div>
            <button
              placeholder="Refresh"
              onClick={(e) => {
                e.preventDefault();
                listProducts();
              }}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              Refresh
            </button>
          </div>
          <div className="antialiased  font-ssans flex">
            <div className="mx-auto mb-8   mt-4 space-y-6">
              {productList?.map((product) => (
                <Card key={product.id} element={product} />
              ))}
            </div>
          </div>
        </div>
        <div className="md:max-w-1/2 md:mx-8 ">
          <div className="flex justify-between mx-0 lg:mx-8">
            <div className="text-2xl"> Invoices</div>
            <button
              placeholder="Refresh"
              onClick={(e) => {
                e.preventDefault();
                listInvoices();
              }}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              Refresh
            </button>
          </div>
          <body className="antialiased  font-ssans flex">
            <div className="mx-auto mb-8   mt-4 space-y-6">
              {invoiceList?.map((product) => (
                <ICard key={product.id} element={product} />
              ))}
            </div>
          </body>
        </div>
      </div>
    </div>
  );
}

User_dashboard.layout = "L1";
export default User_dashboard;
