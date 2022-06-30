import type { Session } from '@remix-run/server-runtime/sessions';
import { createClient, createStorage } from '@micro-stacks/client';
import { getSession, saveSession } from '~/common/session.server';

export const createServerClient = (session: Session) =>
  createClient({
    storage: createStorage({
      storage: {
        getItem(key) {
          return session.get(key);
        },
        setItem(key, value) {
          session.set(key, value);
        },
        removeItem(key) {
          session.unset(key);
        },
      },
    }),
  });

export async function serverSideSessionHandler(request: Request) {
  const [session, data] = await Promise.all([getSession(request), request.formData()]);

  const dehydratedState = data.get('dehydratedState') as string | undefined;

  if (dehydratedState) {
    const client = createServerClient(session);
    client.hydrate(dehydratedState);
    return saveSession(session);
  }
  return null;
}
