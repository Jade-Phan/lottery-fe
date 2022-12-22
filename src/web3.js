// const Web3 = require('web3')

// export const web3 = () => {
//     const rpcURL = 'https://goerli.infura.io/v3/89ebcbc9e7f0455391bfcb048253c88e' // Your RPC URL goes here
//     const web3 = new Web3(rpcURL)
//     return web3
// }


 

import Web3 from 'web3'; 


//current provider is the provider injected by MetaMask 
let web3;

//typeof is used to check if window is defined 
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running.
  //Connect metamask to the webapp 
  window.ethereum.enable(); 
  web3 = new Web3(window.web3.currentProvider);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider( 'https://goerli.infura.io/v3/89ebcbc9e7f0455391bfcb048253c88e');
  web3 = new Web3(provider);
} 

export default web3;
