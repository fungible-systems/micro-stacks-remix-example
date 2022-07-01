import type { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import * as MicroStacks from '@micro-stacks/react';
import { useSessionCallbacks } from '~/common/use-session-callbacks';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

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
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MicroStacks.ClientProvider>
      </body>
    </html>
  );
}
