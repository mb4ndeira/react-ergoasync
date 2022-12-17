import { useState, useMemo } from "react";

import ReadablePromise from "../utils/ReadablePromise";

class Suspenser {
  public read = () => {
    throw new Promise(() => {});
  };
}

/**
 * Returns a React readable promise reader, and a resolver function to overide it's result.
 *
 * @param executor - a function that returns a value or promise (this function will be passed to the constructor of `ReadablePromise`).
 *
 * @param configs - an optional object with configuration options. Currently, the only supported
 * option is `suspend`, which determines whether the `read` method should purposefully suspend it's caller component for undetermined time. The default value
 * is `false`.
 *
 * @returns an array with two elements. The first element is the `read` method of a `ReadablePromise` instance, which
 * gets the value resolved from the `executor` function. The second element is a resolver function, that can override
 * the resolved value of the promise.
 */
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
