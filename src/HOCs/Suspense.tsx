import React, {
  SuspenseProps as IReactSuspenseProps,
  Suspense as ReactSuspense,
} from "react";

import ReadablePromise from "../utils/ReadablePromise";

import ErrorBoundary from "./ErrorBoundary";

type Cause =
  | (() => Promise<unknown | void | Error> | unknown | Error)
  | ReadablePromise<unknown>;

interface ISuspenseProps {
  cause?: Cause | Cause[];
  loading: React.ReactNode;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

const Reader: React.FC<{
  promises: Cause[];
  children: React.ReactNode;
}> = ({ promises, children }) => {
  promises.forEach((promise) =>
    promise instanceof ReadablePromise ? promise.read() : promise()
  );

  return <>{children}</>;
};

/**
 * Custom React.Suspense component that provides error boundary functionality, and a way to declare it's children suspenders on itself.
 */
const Suspense: React.FC<ISuspenseProps & IReactSuspenseProps> = ({
  cause = [],
  loading,
  fallback = null,
  children,
  ...rest
}) => {
  if (!(cause instanceof Array)) cause = [cause];

  const FilledSuspense = ({ children }: { children: React.ReactNode }) => (
    <ReactSuspense {...rest} fallback={loading} children={children} />
  );

  const SuspenseWithBoundary: React.FC<{
    children: React.ReactNode;
  }> = ({ children }) => (
    <ErrorBoundary fallback={fallback}>
      <FilledSuspense children={children} />
    </ErrorBoundary>
  );

  if (cause.length == 0) return <SuspenseWithBoundary children={children} />;

  return (
    <SuspenseWithBoundary>
      <Reader promises={cause} children={children} />
    </SuspenseWithBoundary>
  );
};

export default Suspense;
