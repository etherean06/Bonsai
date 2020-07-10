import React, { Component } from "react";
import getWeb3 from "../../getWeb3";

class GetAccount extends Component {
  state = {
    web3: null,
    accounts: null,
    balance: null,
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      await web3.eth.getBalance(
        accounts[0],
        function (error, wei) {
          if (!error) {
            return this.setState({ balance: web3.utils.fromWei(wei, "ether") });
          }
        }.bind(this)
      );

      this.setState({ web3, accounts });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div style={{textAlign: 'center'}}>
        <h2>Eth Balance</h2>
        <p>{this.state.balance} Eth</p>
        <p>{this.state.accounts}</p>
      </div>
    );
  }
}

export default GetAccount;
