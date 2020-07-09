import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import Web3 from "web3";

function App() {
  const [ethBalance, setEthBalance] = useState([]);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.enable();
      let adress = provider.provider.selectedAddress;
      let balance = await provider.getBalance(adress);
      // console.log(provider.getTransactionCount(adress));
      return setEthBalance(ethers.utils.formatEther(balance));
    } else {
      setEthBalance(`Please install metamask`);
    }
  };

  useEffect(() => {
    loadWeb3();
  });
  return (
    <div className="App">
      <h2>Bonsai</h2>
      <h3>{ethBalance}</h3>
    </div>
  );
}

export default App;
