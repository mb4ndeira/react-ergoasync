import ReadablePromise from "../utils/ReadablePromise";
declare type Suspensible<T> = ((suspend: () => void) => Promise<T> | T) | Promise<T> | ReadablePromise<T>;
declare type FakeReadablePromise = {
    read: () => Promise<void>;
};
declare const useAsync: <T>(suspensible: Suspensible<T>, configs: {
    readHere: boolean;
}) => [FakeReadablePromise | ReadablePromise<T>, (solvedValue: T) => void];
export default useAsync;
