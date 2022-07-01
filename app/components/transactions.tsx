import { useNetwork, useOpenStxTokenTransfer } from '@micro-stacks/react';
import { useState } from 'react';
import { CodeBlock } from '~/components/code-block';

const StxTokenTransferButton = () => {
  const { openStxTokenTransfer, isRequestPending } = useOpenStxTokenTransfer();
  const [response, setResponse] = useState(null as any);
  const [recipient, setRecipient] = useState('ST3TA5AJCJ2W58JV9VHAKD17DA739Y195QQHC8RSR');

  return (
    <>
      {response && <CodeBlock code={response} />}
      <input onChange={e => setRecipient(e.currentTarget.value)} placeholder="ST3T...8RSR" />
      <button
        onClick={() =>
          openStxTokenTransfer({
            recipient,
            amount: '1',
            memo: 'ty',
            onFinish: setResponse,
          })
        }
      >
        {isRequestPending ? 'request pending...' : 'send 1 uSTX (testnet)'}
      </button>
    </>
  );
};

export const Transactions = () => {
  const { isMainnet, setNetwork } = useNetwork();
  return (
    <div>
      <h4>STX transfer</h4>
      {isMainnet ? (
        <button onClick={() => setNetwork('testnet')}>switch to testnet</button>
      ) : (
        <StxTokenTransferButton />
      )}
    </div>
  );
};
