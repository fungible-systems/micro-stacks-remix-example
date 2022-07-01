import { useOpenSignMessage } from '@micro-stacks/react';
import { useState } from 'react';
import { CodeBlock } from '~/components/code-block';

export const SignMessage = () => {
  const { openSignMessage, isRequestPending } = useOpenSignMessage();
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null as any);
  return (
    <div>
      <h4>Sign a message</h4>
      {response && <CodeBlock code={response} />}
      <input
        onChange={e => setMessage(e.currentTarget.value)}
        placeholder="Enter a message to sign!"
      />
      <button
        disabled={message === ''}
        onClick={() => openSignMessage({ message, onFinish: setResponse })}
      >
        {isRequestPending ? 'request pending...' : 'Sign message'}
      </button>
    </div>
  );
};
