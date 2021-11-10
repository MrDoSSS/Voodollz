const Voodollz = artifacts.require("Voodollz");
const CommunityWallet = artifacts.require("CommunityWallet");

module.exports = async function(deployer) {
  await deployer.deploy(Voodollz, 'ipfs://QmWjaFpssv6SiZmSEzGrqWKmcWXxUF52ETExMrpyHvoyub/');
  // await deployer.deploy(CommunityWallet);
};
