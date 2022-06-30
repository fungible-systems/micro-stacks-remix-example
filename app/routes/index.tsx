import { WalletConnectButton } from '~/components/wallet-connect-button';
import { UserCard } from '~/components/user-card';
import { SignMessage } from '~/components/sign-message';

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <WalletConnectButton />
      <UserCard />
      <SignMessage />
    </div>
  );
}
