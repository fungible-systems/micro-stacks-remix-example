import { useAccount, useOpenContractCall, useOpenContractDeploy } from '@micro-stacks/react';
import {
  bufferCV,
  bufferCVFromString,
  intCV,
  noneCV,
  standardPrincipalCV,
  stringAsciiCV,
  stringUtf8CV,
  trueCV,
  tupleCV,
  uintCV,
} from 'micro-stacks/clarity';
import {
  createAssetInfo,
  createNonFungiblePostCondition,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  NonFungibleConditionCode,
  PostConditionMode,
} from 'micro-stacks/transactions';
import { useState } from 'react';
import { CodeBlock } from '~/components/code-block';
import { utf8ToBytes } from 'micro-stacks/common';

export const FakerTx = () => {
  const [response, setResponse] = useState(null as any);
  const { openContractCall, isRequestPending } = useOpenContractCall();
  const { stxAddress } = useAccount();

  const callFaker = async () => {
    const args = [
      uintCV(1234),
      intCV(-234),
      bufferCV(utf8ToBytes('hello, world')),
      stringAsciiCV('hey-ascii'),
      stringUtf8CV('hey-utf8'),
      standardPrincipalCV('ST1X6M947Z7E58CNE0H8YJVJTVKS9VW0PHEG3NHN3'),
      trueCV(),
    ];

    const postConditions = [
      makeStandardSTXPostCondition(stxAddress!, FungibleConditionCode.LessEqual, '100'),
    ];

    await openContractCall({
      contractAddress: 'ST1X6M947Z7E58CNE0H8YJVJTVKS9VW0PHEG3NHN3',
      contractName: 'faker',
      functionName: 'rawr',
      functionArgs: args,
      attachment: 'This is an attachment',
      postConditions,
      onFinish: async (data: any) => {
        console.log('finished faker!', data);
        setResponse(data);
      },
      onCancel: () => {
        console.log('popup closed!');
      },
    });
  };

  return (
    <div>
      <h4>Faker contract call</h4>
      {response && <CodeBlock code={response} />}
      <button onClick={() => callFaker()}>
        {isRequestPending ? 'request pending...' : 'Call Faker'}
      </button>
    </div>
  );
};
export const demoTokenContract = `
(define-fungible-token connect-token)
(begin (ft-mint? connect-token u10000000 tx-sender))
(define-public (transfer
    (recipient principal)
    (amount uint)
  )
  (ok (ft-transfer? connect-token amount tx-sender recipient))
)
(define-public (faucet)
  (ok (ft-mint? connect-token u100 tx-sender))
)
(define-non-fungible-token hello-nft uint)
(begin (nft-mint? hello-nft u1 tx-sender))
(begin (nft-mint? hello-nft u2 tx-sender))
`;
export const ContractDeploy = () => {
  const [response, setResponse] = useState(null as any);
  const { openContractDeploy, isRequestPending } = useOpenContractDeploy();

  const callContractDeploy = async () => {
    await openContractDeploy({
      contractName: `demo-deploy-${new Date().getTime().toString()}`,
      codeBody: demoTokenContract,
      onFinish: async (data: any) => {
        console.log('finished contract deploy!', data);
        setResponse(data);
      },
      onCancel: () => {
        console.log('popup closed!');
      },
    });
  };

  return (
    <div>
      <h4>Deploy a contract!</h4>
      {response && <CodeBlock code={response} />}
      <button onClick={() => callContractDeploy()}>
        {isRequestPending ? 'request pending...' : 'Deploy a contract'}
      </button>
    </div>
  );
};
export const StellaTokens = () => {
  const [response, setResponse] = useState(null as any);
  const { openContractCall, isRequestPending } = useOpenContractCall();

  const callStellaTokenFaucet = async () => {
    await openContractCall({
      contractAddress: 'ST6G7N19FKNW24XH5JQ5P5WR1DN10QWMKQSPSTK7',
      contractName: 'stella-the-cat',
      functionName: 'faucet',
      functionArgs: [],
      postConditionMode: PostConditionMode.Allow,
      onFinish: async (data: any) => {
        console.log('finished stella tokens!', data);
        setResponse(data);
      },
      onCancel: () => {
        console.log('popup closed!');
      },
    });
  };

  return (
    <div>
      <h4>Get Stella Tokens!</h4>
      {response && <CodeBlock code={response} />}
      <button onClick={() => callStellaTokenFaucet()}>
        {isRequestPending ? 'request pending...' : 'Call Stella :)'}
      </button>
    </div>
  );
};

export const FailingBNSFunction = () => {
  const [response, setResponse] = useState(null as any);
  const { stxAddress } = useAccount();
  const { openContractCall, isRequestPending } = useOpenContractCall();

  const callFailingBnsFunction = async () => {
    if (!stxAddress) return;
    // this will fail because the address does not own the name
    const functionArgs = [
      bufferCVFromString('id'), // namespace
      bufferCVFromString('stella'), // name
      standardPrincipalCV('ST1X6M947Z7E58CNE0H8YJVJTVKS9VW0PHEG3NHN3'), // recipient
      noneCV(), // zonefile
    ];
    await openContractCall({
      contractAddress: 'ST000000000000000000002AMW42H',
      contractName: 'bns',
      functionName: 'name-transfer',
      functionArgs,
      attachment: 'This is an attachment',
      postConditions: [
        createNonFungiblePostCondition(
          stxAddress, // the sender
          NonFungibleConditionCode.DoesNotOwn, // will not own this NFT anymore
          createAssetInfo('ST000000000000000000002AMW42H', 'bns', 'names'), // bns NFT
          tupleCV({
            name: bufferCVFromString('stella'),
            namespace: bufferCVFromString('id'),
          }) // the name
        ),
      ],
      onFinish: data => {
        console.log('finished failing bns call!', data);
        setResponse(data);
      },
    });
  };

  return (
    <div>
      <h4>BNS function (failing)</h4>
      {response && <CodeBlock code={response} />}
      <button onClick={() => callFailingBnsFunction()}>
        {isRequestPending ? 'request pending...' : 'Call BNS'}
      </button>
    </div>
  );
};
