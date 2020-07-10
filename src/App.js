import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import MAINNET_TOKENS from './constants/tokens/mainnet'



const provider = new ethers.providers.Web3Provider(window.ethereum);
const tokenLogo = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`

function App() {
  const [ethBalance, setEthBalance] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const getAdress = () => {
    return provider.provider.selectedAddress;
  };


  const getTransactions = async () => {
    const provider = new ethers.providers.EtherscanProvider();
    const adress = getAdress();
    const history = await provider.getHistory(adress);
    return setTransactionHistory(history);
  };

  useEffect(() => {
    console.log(MAINNET_TOKENS)
    const loadWeb3 = async () => {
      if (window.ethereum) {
        await window.ethereum.enable();
        const adress = getAdress();
        await getTransactions();
        const balance = await provider.getBalance(adress);
        return setEthBalance(ethers.utils.formatEther(balance));
      } else {
        setEthBalance(`Please install metamask`);
      }
    };
    loadWeb3();
  }, []);


  return (
    <div className="App">
      <h2>Bonsai</h2>
      <h3>Ethereum balance: {ethBalance}</h3>
      {transactionHistory.map((transaction, key) => (
        <li key={transaction.hash}>
          <a href={`https://etherscan.io/tx/${transaction.hash}`}>
            {transaction.hash}
          </a>
          <p>
            {transaction.from === "0x3Ef3e95e5025D89966695DA57c3ed031eeBC1bd0"
              ? "sent"
              : "received"}
          </p>
        </li>
      ))}
    </div>
  );
}

export default App;
