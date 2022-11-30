import React, {
  SuspenseProps as IReactSuspenseProps,
  Suspense as ReactSuspense,
} from "react";

import ReadablePromise from "../utils/ReadablePromise";

type Cause =
  | (() => Promise<unknown | void | Error> | unknown | Error)
  | ReadablePromise<unknown>;

const Reader: React.FC<{
  promises: Cause[];
  children: React.ReactNode;
}> = ({ promises, children }) => {
  promises.forEach((promise) =>
    promise instanceof ReadablePromise ? promise.read() : promise()
  );

  return <>{children}</>;
};

const Suspense: React.FC<
  {
    cause?: ReadablePromise<unknown> | ReadablePromise<unknown>[];
    children: React.ReactNode;
  } & IReactSuspenseProps
> = ({ cause = [], children, ...rest }) => {
  if (!(cause instanceof Array)) cause = [cause];

  if (cause.length == 0) return <ReactSuspense {...rest} children={children} />;

  return (
    <ReactSuspense {...rest}>
      <Reader promises={cause} children={children} />
    </ReactSuspense>
  );
};

export default Suspense;
