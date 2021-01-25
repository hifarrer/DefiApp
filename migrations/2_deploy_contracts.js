//puts New Smart contracts in the BlockChain, it migrates them.
const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require("TokenFarm")

module.exports = async function(deployer, network, accounts) {

  //Deploy Mock DAI Token
  await deployer.deploy(DaiToken)
  //once finished, we fetch it from the network
  const daiToken = await DaiToken.deployed()

  //Deploy Dapp Token
  await deployer.deploy(DappToken)
  //once finished, we fetch it from the network
  const dappToken = await DappToken.deployed()

  //Deploy TokenFarm
  await deployer.deploy(TokenFarm, dappToken.address, daiToken.address);
  const tokenFarm = await TokenFarm.deployed()

  //Transfer all tokens to TokenFarm (1 million)
  await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

  //Transfer 100 Mock DAI tokens to investor
  await daiToken.transfer(accounts[1], '1000000000000000000000000')

};
