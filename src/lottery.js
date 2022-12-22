import web3 from "./web3";
import Lottery from "./Lottery.json";

console.log(web3)
const instance = new web3.eth.Contract(
  Lottery.abi,
  "0x3012EA13718a306688685770560A6B8CD1789034"
);

export default instance;
