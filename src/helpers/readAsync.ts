import ReadablePromise from "../utils/ReadablePromise";

/**
 * readAsync is a helper function that creates a new instance of the `ReadablePromise` class and returns its `read` method.
 *
 * Useful when you want to create a `ReadablePromise` and access its `read` method in a single step.
 *
 * @param executor - a function that returns a value or promise (this function will be passed to the constructor of `ReadablePromise`).
 */

const readAsync = <T>(executor: () => T | Promise<T>) =>
  new ReadablePromise(executor).read;

export default readAsync;
