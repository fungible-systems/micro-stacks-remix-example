import {
  bufferCVFromString,
  contractPrincipalCV,
  falseCV,
  intCV,
  listCV,
  noneCV,
  responseErrorCV,
  responseOkCV,
  someCV,
  standardPrincipalCV,
  stringAsciiCV,
  stringUtf8CV,
  trueCV,
  tupleCV,
  uintCV,
} from 'micro-stacks/clarity';
import { useOpenSignStructuredMessage } from '@micro-stacks/react';
import { useState } from 'react';
import { CodeBlock } from '~/components/code-block';

const ADDRESS = 'SP2JXKMSH007NPYAQHKJPQMAQYAD90NQGTVJVQ02B';

const structuredData = tupleCV({
  a: intCV(-1),
  b: uintCV(1),
  c: bufferCVFromString('test'),
  d: trueCV(),
  e: someCV(trueCV()),
  f: noneCV(),
  g: standardPrincipalCV(ADDRESS),
  h: contractPrincipalCV(ADDRESS, 'test'),
  i: responseOkCV(trueCV()),
  j: responseErrorCV(falseCV()),
  k: listCV([trueCV(), falseCV()]),
  l: tupleCV({
    a: trueCV(),
    b: falseCV(),
  }),
  m: stringAsciiCV('hello world'),
  another: tupleCV({
    a: trueCV(),
    b: falseCV(),
    deep: tupleCV({
      a: trueCV(),
      b: falseCV(),
    }),
  }),
  n: stringUtf8CV('hello \u{1234}'),
  o: listCV([]),
});

export const SignStructuredMessage = () => {
  const { openSignStructuredMessage, isRequestPending } = useOpenSignStructuredMessage();
  const [response, setResponse] = useState(null as any);
  return (
    <div>
      <h4>Sign a message</h4>
      {response && <CodeBlock code={response} />}
      <button
        onClick={() =>
          openSignStructuredMessage({
            message: structuredData,
            onFinish: setResponse,
          })
        }
      >
        {isRequestPending ? 'request pending...' : 'Sign message'}
      </button>
    </div>
  );
};
