import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import * as MicroStacks from '@micro-stacks/react';
import { useSessionCallbacks } from '~/common/use-session-callbacks';
import { getSession } from '~/common/session.server';
import { createServerClient } from '~/common/client.server';
import { useMicroStacksClient } from '@micro-stacks/react';
import { useEffect, useState } from 'react';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  return {
    dehydratedState: createServerClient(session).dehydrate(),
  };
};

function useEnsureConsistentSession(dehydratedState?: string) {
  const [hasRun, setHasRun] = useState(false);
  const { handleSetSession } = useSessionCallbacks();
  const client = useMicroStacksClient();
  const localClient = client.dehydrate();

  useEffect(() => {
    if (!hasRun) {
      if (localClient !== dehydratedState) {
        void handleSetSession(localClient);
      }
      setHasRun(true);
    }
  }, [handleSetSession, hasRun, dehydratedState, localClient]);
}

const EnsureConsistentState = () => {
  const { dehydratedState } = useLoaderData();
  useEnsureConsistentSession(dehydratedState);
  return null;
};
export default function App() {
  const { handleSetSession, handleDestroySession } = useSessionCallbacks();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MicroStacks.ClientProvider
          appName={'New Remix App'}
          appIconUrl={'https://remix.run/remix-v1.jpg'}
          onPersistState={handleSetSession}
          onSignOut={handleDestroySession}
          network={'testnet'}
        >
          <EnsureConsistentState />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MicroStacks.ClientProvider>
      </body>
    </html>
  );
}
