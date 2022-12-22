import web3 from "./web3";
import Lottery from "./Lottery.json";

console.log(web3)
const instance = new web3.eth.Contract(
  Lottery.abi,
  "0x7995454C2a05405e45d3185A68312a3AC6e34D49"
);

export default instance;
