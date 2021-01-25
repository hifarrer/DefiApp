# DefiApp
Defi App that allows to stake a coin, get a token as reward and gain interest on it.


Download and install node.js
Download and install Ganache 
Download and install Git command tool 
Download and install Atom (text editor)
In Settings/Packages install Solidity lanaguage and autocomplete

On Git cmd tool browse to desired directory
cd Documents/Github/
(-b for branch starter-code)
git clone -b starter-code https://github.com/dappuniversity/defi_tutorial
git checkout master

On cmd prompt
Navigate to git folder
npm install 
(to install dependencies)

Open Ganache

Contract #1: "mock" DAI
Contract #2: Dapp Token 
Contract #3: TokenFarm

On CMD prompt 
truffle console
dev> tokenFarm = await TokenFarm.deployed()
//await waits for the function to finish, because blockchain is slow
//truffle console is a JS runtime env that lets you use the blockchain

dev> tokenFarm.address
//retrieves blockchain address
dev> tokenFarm.name()
//retrieves blockchain name

//Apply code changes

On CMD
truffle compile
truffle migrate --reset 
//reset because once it is published, the code is immutable, it doesn't change
//so basically you can only replace it.
//so you create a new contract on the BC and you get a new address!

truffle console
mDai = await DaiToken.deployed()
accounts = await web3.eth.getAccounts()
accounts[1]
balance = await mDai.balanceOf(accounts[1])
balance
balance.toString()
formattedBalance = web3.utils.fromWei(balance)
//to do the inverse
web3.utils.toWei('1.5','Ether')

created TokenFarm.test.js //this file has some test scenarios
on CMD
truffle test 

//to test/run scripts 
truffle exec scripts/issue-token.js 

//Start Server
On CMD
npm run start
