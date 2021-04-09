const { expect } = require("chai");

const hre = require("hardhat");

import "../protocol-v2/test-suites/test-baave/__setup.spec.ts";

describe("Greeter", function () {
  before(async () => {});

  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await hre.ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");

    await greeter.deployed();
    expect(await greeter.greet()).to.equal("Hello, world!");

    await greeter.setGreeting("Hola, mundo!");
    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
