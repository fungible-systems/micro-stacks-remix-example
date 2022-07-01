import { Network } from '~/components/network';

export const Header = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
      <div>Remix + micro-stacks</div>
      <Network />
    </header>
  );
};
