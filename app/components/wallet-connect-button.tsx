import { useAccount, useAuth } from '@micro-stacks/react';

export const WalletConnectButton = () => {
  const { authenticate, isLoading, signOut, isSignedIn } = useAuth();
  const {} = useAccount();
  const label = isLoading ? 'Loading...' : isSignedIn ? 'Sign out' : 'Connect Stacks wallet';
  return (
    <button
      onClick={() => {
        if (isSignedIn) void signOut();
        else void authenticate();
      }}
    >
      {label}
    </button>
  );
};
