import { useNetwork } from '@micro-stacks/react';

export const Network = () => {
  const { isMainnet, setNetwork } = useNetwork();
  return (
    <div
      style={{
        cursor: 'pointer',
      }}
      onClick={() => {
        setNetwork(isMainnet ? 'testnet' : 'mainnet');
      }}
    >
      Network mode: {isMainnet ? 'mainnet' : 'testnet'}
    </div>
  );
};
