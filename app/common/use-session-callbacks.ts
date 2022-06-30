import { useFetcher } from '@remix-run/react';
import { useCallback } from 'react';

export const useSessionCallbacks = () => {
  const fetcher = useFetcher();

  /**
   * Session callback
   *
   * This function will pass the dehydrated state of the micro-stacks client
   * to the /session/save endpoint via a Remix Action.
   *
   * Doing so allows for the client to exist on the server side.
   */
  const handleSetSession = useCallback(
    async (dehydatedState: string) => {
      console.log('setting session');
      const data = new FormData();
      data.set('dehydratedState', dehydatedState);
      await fetcher.submit(data, {
        method: 'post',
        action: '/session/save',
      });
    },
    [fetcher]
  );

  /**
   * Sign out callback
   *
   * This function will destroy a session by sending a POST request to
   * /session/destroy.
   */
  const handleDestroySession = useCallback(async () => {
    await fetcher.submit(null, {
      method: 'post',
      action: '/session/destroy',
    });
  }, [fetcher]);

  return {
    handleSetSession,
    handleDestroySession,
  };
};
