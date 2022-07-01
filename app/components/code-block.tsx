export const CodeBlock = ({ code }: { code: any }) => {
  return (
    <pre
      style={{
        overflow: 'scroll',
        backgroundColor: 'black',
        color: 'white',
        padding: '20px',
      }}
    >
      <code>{JSON.stringify(code, null, 2)}</code>
    </pre>
  );
};
