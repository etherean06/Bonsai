import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import GetAccount from "./components/metamask/GetAccount";

const App = () => {
  return <GetAccount />;
};

export default App;
