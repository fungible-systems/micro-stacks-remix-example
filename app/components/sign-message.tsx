import { useOpenSignMessage } from '@micro-stacks/react';
import { useState } from 'react';

export const SignMessage = () => {
  const { openSignMessage, isRequestPending } = useOpenSignMessage();
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null as any);
  return (
    <div>
      {response && (
        <>
          <pre>
            <code>{JSON.stringify(response, null, 2)}</code>
          </pre>
        </>
      )}
      <input
        onChange={e => setMessage(e.currentTarget.value)}
        placeholder="Enter a message to sign!"
      />
      <button onClick={() => openSignMessage({ message, onFinish: setResponse })}>
        {isRequestPending ? 'request pending...' : 'Sign message'}
      </button>
    </div>
  );
};
