const AlgerToken = artifacts.require("AlgerToken");
const Algernon = artifacts.require("Algernon");

module.exports = async function(deployer) {
  const cap = 10 ** 8
  await deployer.deploy(AlgerToken, cap);
  console.log(`alg token address ${AlgerToken.address}`)
  await deployer.deploy(Algernon, AlgerToken.address);
};
