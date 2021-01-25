//puts New Smart contracts in the BlockChain, it migrates them.
const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
