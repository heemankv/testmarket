import React, { Fragment, useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import router, { useRouter } from "next/router";
import {
  AppContextProps,
  BlockchainContext,
} from "../context/BlockchainContext.tsx";

const Layout = (props) => {
  const { connectedAccount, connectWallet, disconnect } =
    useContext(BlockchainContext);
  useEffect(() => {
    if (!connectedAccount) {
      router.push("/");
    }
  }, [connectedAccount]);

  if (connectedAccount) {
    return (
      <div className="flex flex-col  justify-between bg-white text-white px-5 md:px-0 min-h-screen">
        <div className="md:mx-10 ">
          <Navbar />
        </div>
        <div className="text-black  md:mx-12 px-5">{props.children}</div>
        {/* <Footer /> */}
      </div>
    );
  } else {
    return (
      <div>
        Proceeding to Login Page{" "}
        {() => {
          if (connectedAccount) {
            router.push("/Profile");
          } else {
            router.push("/Login");
          }
        }}
      </div>
    );
  }
};

export default Layout;
