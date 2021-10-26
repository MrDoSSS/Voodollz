const Voodollz = artifacts.require("Voodollz");

module.exports = function(deployer) {
  deployer.deploy(Voodollz, 'ipfs://QmYmw6m5fe6dbfqdLtMXGjwmXNt2cxZWcAyFZ9DHRcwZy4/');
};
