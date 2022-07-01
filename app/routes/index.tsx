import { WalletConnectButton } from '~/components/wallet-connect-button';
import { UserCard } from '~/components/user-card';
import { SignMessage } from '~/components/sign-message';
import { Header } from '~/components/header';
import { Transactions } from '~/components/transactions';

export default function Index() {
  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        lineHeight: '1.4',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '10px',
      }}
    >
      <Header />
      <h1>Welcome to Remix</h1>
      <WalletConnectButton />
      <UserCard />
      <SignMessage />
      <Transactions />
    </div>
  );
}
