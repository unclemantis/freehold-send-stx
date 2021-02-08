import {
    makeContractCall,
    broadcastTransaction,
    standardPrincipalCVFromAddress,
    createAddress,
    uintCV,
    PostConditionMode,
} from '@stacks/transactions';

import {
    StacksTestnet,
} from '@stacks/network';

export async function sendSTX(Amount: number, Address: string) {
    const network = new StacksTestnet();
    const amount = uintCV(Amount);
    const address = Address;
    const recipient = standardPrincipalCVFromAddress(createAddress(address));
    const txOptions = {
        contractAddress: "STPB5VV8AJ70JCRZSKADKK68S74VSBR10TR0G5CH",
        contractName: 'send-stx',
        functionName: 'transfer',
        functionArgs: [amount, recipient],
        senderKey: '2eb45dfc2d709cf19562a6e8533d5c3a0a780af27d505896504b8505a55de4ab01',
        validateWithAbi: true,
        network,
        postConditionMode: PostConditionMode.Allow,
    };

    const transaction = await makeContractCall(txOptions);
    const txid = await broadcastTransaction(transaction, network);

    console.log(txid);
}