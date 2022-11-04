import { useState, useMemo, useEffect } from "react";

import ReadablePromise, {
  ReadablePromiseExecutor,
} from "../utils/ReadablePromise";

const useAwait = <T>(
  thenable: ReadablePromiseExecutor<T>,
  callback?: () => void
): ReadablePromise<T | void> => {
  const [suspenser, setSuspenser] = useState<ReadablePromise<T | void>>(
    new ReadablePromise<void>(() => {})
  );

  const promise = useMemo(() => new ReadablePromise<T>(thenable), []);

  useEffect(() => {
    promise.then(() => {
      if (callback) callback();
      unsuspend();
    });
  }, []);

  const unsuspend = () => {
    setSuspenser(promise);
  };

  return suspenser;
};

export default useAwait;
