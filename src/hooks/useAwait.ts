import { useState, useMemo } from "react";

import ReadablePromise from "../utils/ReadablePromise";

class Suspenser {
  public read = () => {
    throw new Promise(() => {});
  };
}

const useAsync = <T>(
  executor: () => T | Promise<T>,
  configs: { suspend: boolean } = { suspend: false }
): [() => ReturnType<ReadablePromise<T>["read"]>, (solvedValue: T) => void] => {
  const promise = useMemo<ReadablePromise<T>>(
    () => new ReadablePromise(executor),
    []
  );

  const [reader, setReader] = useState<ReadablePromise<T> | Suspenser>(
    configs.suspend === true ? new Suspenser() : promise
  );

  const resolver = (solvedValue: T) => {
    setReader(new ReadablePromise(() => solvedValue));
  };

  return [() => reader.read(), resolver];
};

export default useAsync;
