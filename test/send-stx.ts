import { Client, Provider, ProviderRegistry } from "@blockstack/clarity";
import { assert } from "chai";
import { providerWithInitialAllocations } from "./providerWithInitialAllocations";
import * as balances from "../balances.json";

describe("send stx contract test suite", () => {
  let sendStxClient: Client;
  let provider: Provider;

  before(async () => {
    ProviderRegistry.registerProvider(providerWithInitialAllocations(balances));
    provider = await ProviderRegistry.createProvider();
    sendStxClient = new Client("SP30JX68J79SMTTN0D2KXQAJBFVYY56BZJEYS3X0B.send-stx", "send-stx", provider);
  });

  it("should have a valid syntax", async () => {
    await sendStxClient.checkContract();
  });

  describe("deploying an instance of the contract", () => {
    before(async () => {
      await sendStxClient.deployContract();
    });

    it("wallet address has been funded", async () => {
      const tx = sendStxClient.createTransaction({ method: { name: "transfer", args: ["u123", "'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"] } });
      await tx.sign("SP30JX68J79SMTTN0D2KXQAJBFVYY56BZJEYS3X0B")
      const receipt = await sendStxClient.submitTransaction(tx);
      assert.isTrue(receipt.success);
    });

  });

  after(async () => {
    await provider.close();
  });
});
