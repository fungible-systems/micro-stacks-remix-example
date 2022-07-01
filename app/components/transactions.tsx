import { useNetwork, useOpenStxTokenTransfer } from '@micro-stacks/react';

const StxTokenTransferButton = () => {
  const { openStxTokenTransfer, isRequestPending } = useOpenStxTokenTransfer();

  return (
    <button
      onClick={() =>
        openStxTokenTransfer({
          recipient: 'ST1X6M947Z7E58CNE0H8YJVJTVKS9VW0PHEG3NHN3',
          amount: '1',
          memo: 'ty',
        })
      }
    >
      {isRequestPending ? 'request pending...' : 'send 1 uSTX (testnet)'}
    </button>
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
