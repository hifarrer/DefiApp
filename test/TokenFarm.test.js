const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require("TokenFarm")

require('chai')
  .use(require('chai-as-promised'))
  .should()

  function tokens(n){
    return web3.utils.toWei(n,'Ether')
  }

contract('TokenFarm', ([owner, investor]) => {
  let daiToken, dappToken, tokenFarm //read variable

  before(async () => {
    //Load Contracts
    daiToken = await DaiToken.new()
    dappToken = await DappToken.new()
    tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

    //Transfer all Dapp tokens to farm (1 million)
      //option 1
        //await dappToken.transfer(tokenFarm.address,'1000000000000000000000000')
      //option 2
        //await dappToken.transfer(tokenFarm.address, web3.utils.toWei('1000000','Ether'))
      //option 3 using Helper Function "tokens" above
    await dappToken.transfer(tokenFarm.address,tokens('1000000'))

    //Send tokens to investor
    await daiToken.transfer(investor, tokens('100'),{from: owner })
    //await daiToken.transfer(accounts[1], tokens('100'),{from: accounts[0] })

  })

  //Write tests here
  describe('Mock DAI Deployment', async () => {
    it('has a name', async () => {
      const name = await daiToken.name()
      assert.equal(name,'Mock DAI Token')//checking the name is "Mock Dai Token"
      //assert is a testing function to make sure about something
      //chai Assertion library (https://www.chaijs.com/))
    })
  })

  describe('Dapp Token Deployment', async () => {
    it('has a name', async () => {
      const name = await dappToken.name()
      assert.equal(name,'DApp Token')//checking the name is "Mock Dapp Token"
    })
  })

  describe('Token Farm Deployment', async () => {
    it('has a name', async () => {
      const name = await tokenFarm.name()
      assert.equal(name,'Dapp Token Farm')//checking the name is "Mock Dapp Token"
    })
  })

  it('contract has tokens', async()=>{
    let balance = await dappToken.balanceOf(tokenFarm.address)
    assert.equal(balance.toString(), tokens('1000000'))
  })

  describe('Farming tokens', async () => {
    it('rewards investors for staking mDai tokens', async () => {
      let result

      //Check investor balanace before staking
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance is correct before staking')

      //Stake Mock DAI Tokens
      await daiToken.approve(tokenFarm.address, tokens('100'), { from: investor }) //we approve the tokens
      await tokenFarm.stakeTokens(tokens('100'), { from: investor })//then we stake the tokens

      //Check staking results
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('0'), 'investor Mock DAI wallet balance correct after staking')

      result = await daiToken.balanceOf(tokenFarm.address)
      assert.equal(result.toString(), tokens('100'), 'Token Farm Mock DAI wallet balance correct after staking')

      result = await tokenFarm.stakingBalance(investor)
      assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')

      result = await tokenFarm.isStaking(investor)
      assert.equal(result.toString(), 'true', 'investor staking status correct after staking')

      //Issue Tokens
      await tokenFarm.issueTokens({ from: owner })

      // Check balances after issuance
      result = await dappToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor DApp Token wallet balance after issuance')

      //Ensure that only owner can issue Tokens
      await tokenFarm.issueTokens({ from: investor }).should.be.rejected;

      //Unstake tokens
      await tokenFarm.unstakeTokens({ from: investor })

      //Check result status after Unstaking
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'),'investor Mock DAI wallet balance correct after staking')

      result = await daiToken.balanceOf(TokenFarm.address)
      assert.equal(result.toString(), tokens('0'),'Token Farm Mock DAI balance correct after staking')

      result = await tokenFarm.stakingBalance(investor)
      assert.equal(result.toString(), tokens('0'),'investor staking balance correct after staking')

      result = await tokenFarm.isStaking(investor)
      assert.equal(result.toString(), 'false','investor staking status correct after staking')


    })



  })

})
