import type { ActionFunction } from '@remix-run/node';
import { serverSideSessionHandler } from '~/common/client.server';

export const action: ActionFunction = async ({ request }) => {
  return serverSideSessionHandler(request);
};
