require('dotenv').config();
const Voodollz = artifacts.require("Voodollz")
const truffleAssert = require('truffle-assertions')
const bip39 = require('bip39')
const { hdkey } = require('ethereumjs-wallet')

const getAccounts = async (count) => {
  const seed = await bip39.mnemonicToSeed(process.env.MNEMONIC);
  const hdk = hdkey.fromMasterSeed(seed);
  const accounts = []

  for(let i = 0; i < count; i++) {
    const addressNode = hdk.derivePath(`m/44'/60'/0'/0/${i}`)
    const address = addressNode.getWallet().getAddressString()
    const pk = addressNode.getWallet().getPrivateKeyString()

    accounts.push({
      address,
      pk
    })
  }
  
  return accounts
}

contract('Voodollz', () => {
  let contract, deployer, holderOne, holderTwo

  before(async () => {
    [deployer, holderOne, holderTwo] = await getAccounts(3)
  })

  beforeEach(async () => contract = await Voodollz.new(''))

  describe('Presalable', () => {
    it('must be default presale', async () => {
      const res = await contract.presaled()
      assert.equal(res, true)
    })

    describe('presale', () => {
      describe('when not presaled', () => {
        beforeEach(() => {
          return contract.unpresale()
        })

        it('must be set presale as true', async () => {
          await truffleAssert.passes(contract.presale())
          const res = await contract.presaled()
          assert.equal(res, true)
        })
      })

      describe('when presaled', () => {
        it('must be fails', async () => {
          await truffleAssert.fails(contract.presale())
        })
      })
    })

    describe('unpresale', () => {
      describe('when not presaled', () => {
        beforeEach(() => {
          return contract.unpresale()
        })

        it('must be fails', async () => {
          await truffleAssert.fails(contract.unpresale())
        })
      })

      describe('when presaled', () => {
        it('must be set presale as false', async () => {
          await truffleAssert.passes(contract.unpresale())
          const res = await contract.presaled()
          assert.equal(res, false)
        })
      })
    })
  })

  describe('Pausable', () => {
    describe('pause', () => {
      describe('when not paused', () => {
        it('must be set presale as true', async () => {
          await truffleAssert.passes(contract.pause())
          const res = await contract.paused()
          assert.equal(res, true)
        })
      })

      describe('when paused', () => {
        beforeEach(() => contract.pause())

        it('must be fails', async () => {
          await truffleAssert.fails(contract.pause())
        })
      })
    })

    describe('unpause', () => {
      describe('when not paused', () => {
        it('must be fails', async () => {
          await truffleAssert.fails(contract.unpause())
        })
      })

      describe('when paused', () => {
        beforeEach(() => {
          return contract.pause()
        })

        it('must be set presale as false', async () => {
          await truffleAssert.passes(contract.unpause())
          const res = await contract.paused()
          assert.equal(res, false)
        })
      })
    })
  })

  describe('setBaseURI', () => {
    it('must be set baseTokenURI', async () => {
      const baseURI = 'baseURI'
      await truffleAssert.passes(contract.setBaseURI(baseURI))
      assert.equal(await contract.baseTokenURI(), baseURI)
    })
  })

  describe('mint', () => {
    beforeEach(() => contract.unpresale())

    it('when everything is ok must be minted token', async () => {
      await truffleAssert.passes(
        contract.mint(
          1,
          { from: holderOne.address, value: web3.utils.toWei('0.05') }
        )
      )

      assert.equal(await contract.balanceOf(holderOne.address), 1)
    })

    it('when presale must be fails', async () => {
      await contract.presale()
      await truffleAssert.fails(
        contract.mint(
          1,
          { from: holderOne.address, value: web3.utils.toWei('0.05') }
        )
      )
    })

    it('when amount > 5 must be fails', async () => {
      await truffleAssert.fails(
        contract.mint(
          6,
          { from: holderOne.address, value: web3.utils.toWei('0.3') }
        )
      )
    })

    it('when price is not corrent must be fails', async () => {
      await truffleAssert.fails(
        contract.mint(
          1,
          { from: holderOne.address, value: web3.utils.toWei('0.02') }
        )
      )
    })
  })

  describe('presaleMint', () => {
    let validSign, unvalidSign

    before(async () => {
      validSign = (await web3.eth.accounts.sign(
        web3.utils.keccak256(holderOne.address),
        deployer.pk,
      )).signature

      unvalidSign = (await web3.eth.accounts.sign(
        web3.utils.keccak256(holderOne.address),
        holderOne.pk,
        ''
      )).signature
    })
    

    it('when valid sign must be minted', async () => {
      await truffleAssert.passes(
        contract.presaleMint(
          1,
          validSign,
          { from: holderOne.address, value: web3.utils.toWei('0.05') }
        )
      )

      assert.equal(await contract.balanceOf(holderOne.address), 1)
    })

    it('when bad sign must be fails', async () => {
      await truffleAssert.fails(
        contract.presaleMint(
          1,
          unvalidSign,
          { from: holderOne.address, value: web3.utils.toWei('0.05') }
        )
      )
    })

    describe('when not presaled', () => {
      beforeEach(() => contract.unpresale())

      it('must be fails', async () => {
        await truffleAssert.fails(
          contract.presaleMint(
            1,
            validSign,
            { from: holderOne.address, value: web3.utils.toWei('0.05') }
          )
        )
      })
    })
  })

  describe('giveAway', () => {
    it('must be minted to address', async () => {
      await truffleAssert.passes(
        contract.giveAway(holderOne.address)
      )

      assert.equal(await contract.balanceOf(holderOne.address), 1)
    })
  })

  describe('deposit', () => {
    beforeEach(() => contract.unpresale())

    it('must be set claimable eth', async () => {
      await truffleAssert.passes(
        contract.mint(
          2,
          { from: holderOne.address, value: web3.utils.toWei('0.1') }
        )
      )

      await truffleAssert.passes(
        contract.mint(
          1,
          { from: holderTwo.address, value: web3.utils.toWei('0.05') }
        )
      )

      await truffleAssert.passes(
        contract.deposit(
          { value: web3.utils.toWei('6') }
        )
      )

      assert.equal(web3.utils.fromWei(await contract.claimableBalance(holderOne.address)), 4)
      assert.equal(web3.utils.fromWei(await contract.claimableBalance(holderTwo.address)), 2)

      truffleAssert.eventEmitted(
        await contract.claim(
          { from: holderOne.address }
        ),
        'EthClaimed',
      )

      assert.equal(web3.utils.fromWei(await contract.claimableBalance(holderOne.address)), 0)
    })

    it('when eth value is 0 must be fails', async () => {
      await truffleAssert.passes(
        contract.mint(
          1,
          { from: holderOne.address, value: web3.utils.toWei('0.05') }
        )
      )

      await truffleAssert.fails(
        contract.deposit(
          { value: web3.utils.toWei('0') }
        )
      )
    })
  })

  describe('burn', () => {
    beforeEach(() => contract.unpresale())
    
    it('must be burn token', async () => {
      await truffleAssert.passes(
        contract.mint(
          1,
          { from: holderOne.address, value: web3.utils.toWei('0.05') }
        )
      )

      assert.equal(await contract.balanceOf(holderOne.address), 1)

      await truffleAssert.passes(contract.burn(151, { from: holderOne.address }))

      assert.equal(await contract.balanceOf(holderOne.address), 0)
    })

    it('when caller not owner must be fails', async () => {
      await truffleAssert.passes(
        contract.mint(
          1,
          { from: holderOne.address, value: web3.utils.toWei('0.05') }
        )
      )

      await truffleAssert.fails(contract.burn(151, { from: holderTwo.address }))
    })
  })
})