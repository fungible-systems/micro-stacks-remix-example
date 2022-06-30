import { useCurrentStxAddress } from '@micro-stacks/react';

export const UserCard = () => {
  const stxAddress = useCurrentStxAddress();
  if (!stxAddress) return <h2>No active session</h2>;
  return <h2>{stxAddress}</h2>;
};
