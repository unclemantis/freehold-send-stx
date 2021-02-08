import { estimateContractDeploy, makeContractDeploy, broadcastTransaction, PostConditionMode} from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';
const BigNum = require('bn.js');
import fs = require('fs');

const network = new StacksTestnet();

const txOptions = {
  contractName: 'send-stx',
  codeBody: fs.readFileSync('./contracts/send-stx.clar').toString(),
  senderKey: '2eb45dfc2d709cf19562a6e8533d5c3a0a780af27d505896504b8505a55de4ab01',
  network,
  postConditionMode: PostConditionMode.Allow,
};

export async function deployContract() {
  const transaction = await makeContractDeploy(txOptions);
  await estimateContractDeploy(transaction, network);
  const txid = await broadcastTransaction(transaction, network);
  console.log(txid);
};

deployContract();