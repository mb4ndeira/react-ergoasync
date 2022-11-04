import ReadablePromise, { ReadablePromiseExecutor } from "./ReadablePromise";
declare const useAwait: <T>(thenable: ReadablePromiseExecutor<T>, callback?: () => void) => ReadablePromise<void | T>;
export default useAwait;
