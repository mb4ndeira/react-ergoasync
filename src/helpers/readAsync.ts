import ReadablePromise from "../utils/ReadablePromise";

const readAsync = <T>(executor: () => T | Promise<T>) =>
  new ReadablePromise(executor).read;

export default readAsync;
