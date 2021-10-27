const Voodollz = artifacts.require("Voodollz");
const CommunityWallet = artifacts.require("CommunityWallet");

module.exports = async function(deployer) {
  await deployer.deploy(Voodollz, 'ipfs://QmYmw6m5fe6dbfqdLtMXGjwmXNt2cxZWcAyFZ9DHRcwZy4/');
  await deployer.deploy(CommunityWallet);
};
