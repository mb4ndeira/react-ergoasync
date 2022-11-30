import ReadablePromise from "../utils/ReadablePromise";
declare const useAsync: <T>(executor: () => T | Promise<T>, configs?: {
    suspend: boolean;
}) => [() => Error | Promise<void> | T, (solvedValue: T) => void];
export default useAsync;
