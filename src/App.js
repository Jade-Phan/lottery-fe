import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
import { ethers } from 'ethers';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: '',
      players: [],
      balance: '',
      value: '',
      message: '',
      winner: '',
      account: ''
    };
  }
  async send() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async componentDidMount() {
    const owner = await lottery.methods.owner().call();
    const players = await lottery.methods.players().call();
    const balance = await web3.eth.getBalance(lottery.options.address)

    this.setState({ owner, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts(console.log);

    this.setState({ message: 'Waiting for transaction to process...' });

    await lottery.methods.buyTickets(this.state.value).send({
      from: accounts[0],
      value: web3.utils.toWei("1000000", "ether")
    });

    this.setState({ message: 'congratulations, you have successfully entered the lottery.' });
  }

  onClick = async () => {
    console.log(web3);
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Picking a Winner, please wait...' });

    await lottery.methods.generateWinners().send({
      from: accounts[0],
    });

    this.setState({ winner: await lottery.methods.winner().call() })
    this.setState({ message: "We have a winner. the winner is " });
  }

  render() {
    return (
      <div>
        
        <h2> Lottery Contract </h2>
        <p>
          This contract is managed by {this.state.owner}
        </p>
        <p>
          There are currently {this.state.players.length} people entered this lottery
          to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4> Want to try your luck ? </h4>
          <div>
            <label> Amount of ether to enter </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />
        <label> Time to pick a winner </label>
        <button onClick={this.onClick}> Pick a winner</button>
        <hr />
        <h4> {this.state.message} {this.state.winner}</h4>
      </div>
    );
  }
}

export default App;