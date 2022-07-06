import { usePutFile } from '@micro-stacks/react';
import { CodeBlock } from '~/components/code-block';
import { useState } from 'react';

const PutFile = () => {
  const [filename, setFilename] = useState('hello-world');
  const [contents, setContents] = useState('');
  const [path, setPath] = useState(null as null | string);
  const { isLoading, error, hasError, data, putFile } = usePutFile(`${filename}.json`, contents, {
    onSuccess: path => setPath(path),
  });

  const preview = () => {
    if (hasError) return <CodeBlock code={error} />;
    if (isLoading) return <div>Loading!!</div>;
    if (data) return <CodeBlock code={data} />;
    return null;
  };

  return (
    <div>
      <h3>Put file</h3>
      {preview()}
      <input onChange={e => setFilename(e.currentTarget.value)} placeholder={'filename'} />
      <br />
      <input onChange={e => setContents(e.currentTarget.value)} placeholder={'message'} />
      <br />
      <button disabled={contents === '' || !filename} onClick={putFile}>
        put it!!
      </button>
    </div>
  );
};

export const Gaia = () => {
  return <PutFile />;
};
