import { useState, useMemo, useEffect } from "react";

import ReadablePromise from "../utils/ReadablePromise";

type Suspensible<T> =
  | ((suspend: () => void) => Promise<T> | T)
  | Promise<T>
  | ReadablePromise<T>;

type FakeReadablePromise = { read: () => Promise<void> };

// test it on the app
// check for render count
// type returns
// use configs

const useAsync = <T>(
  suspensible: Suspensible<T>,
  configs: { readHere: boolean }
): [ReadablePromise<T> | FakeReadablePromise, (solvedValue: T) => void] => {
  const fakeReadablePromise = { read: () => new Promise<void>(() => {}) };

  const [result, setResult] = useState<
    ReadablePromise<T> | FakeReadablePromise
  >(fakeReadablePromise);

  const suspendedSuspensible = useMemo(() => {
    if (suspensible instanceof ReadablePromise) return suspensible;
    if (suspensible instanceof Promise)
      return new ReadablePromise(() => suspensible);

    return new ReadablePromise(() => suspensible(suspend));
  }, []);

  useEffect(() => {
    setResult(suspendedSuspensible);
  }, []);

  const solver = (solvedValue: T) => {
    setResult(new ReadablePromise(() => solvedValue));
  };

  const suspend = () => {
    setResult(fakeReadablePromise);
  };

  return [result, solver];
};

export default useAsync;
