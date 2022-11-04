import React, { SuspenseProps, Suspense as ReactSuspense } from "react";
import ReadablePromise from "../utils/ReadablePromise";

const Reader: React.FC<{
  promises: ReadablePromise<unknown>[];
  children: React.ReactNode;
}> = ({ promises, children }) => {
  promises.forEach((promise) => promise.read());

  return <>{children}</>;
};

const Suspense: React.FC<
  {
    cause?: ReadablePromise<unknown> | ReadablePromise<unknown>[];
    children: React.ReactNode;
  } & SuspenseProps
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
