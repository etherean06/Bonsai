import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {
  const [ethBalance, setEthBalance] = useState([]);

  const getAdress = () => {
    return provider.provider.selectedAddress;
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      let adress = getAdress();
      let balance = await provider.getBalance(adress);
      return setEthBalance(ethers.utils.formatEther(balance));
    } else {
      setEthBalance(`Please install metamask`);
    }
  };

  const getTransactions = async () => {
    let provider = new ethers.providers.EtherscanProvider();
    let history = await provider.getHistory(getAdress());
    return console.log(history.filter(history => history.from === '0x3Ef3e95e5025D89966695DA57c3ed031eeBC1bd0'));
  };

  useEffect(() => {
    loadWeb3();
    getTransactions();
  });

  return (
    <div className="App">
      <h2>Bonsai</h2>
      <h3>Ethereum balance: {ethBalance}</h3>
    </div>
  );
}

export default App;
