import * as t from "../types";
import * as a from "../protocol-v2/types";
import BN from "bn.js";
const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");
const aave = require("../addresses.json");

import { utils, ethers } from "ethers";

const chai = require("chai");
const expect = chai.expect;

const Greeter: t.GreeterContract = artifacts.require("Greeter");

const RPC_HOST = "http://localhost:8545";

contract("Test", async (accounts) => {
  describe("Test", async () => {
    it("Should return the new greeting once it's changed", async function () {
      const greeter = await Greeter.new("Hello, world!");

      expect(await greeter.greet()).to.equal("Hello, world!");

      await greeter.setGreeting("Hola, mundo!");
      expect(await greeter.greet()).to.equal("Hola, mundo!");
    });

    it("should connect to aave contracts", async () => {
      console.log("AAVE [" + aave.AAVE + "]");

      const provider = new ethers.providers.JsonRpcProvider(RPC_HOST);

      const lpap = a.LendingPoolAddressesProviderFactory.connect(
        aave.LendingPoolAddressesProvider,
        provider
      );
      const lendingPoolAddr = await lpap.getLendingPool();
      console.log("LendingPool [" + lendingPoolAddr + "]");

      expect(lendingPoolAddr).to.be.equal(aave.LendingPool);
    });
  });
});
