import ReadablePromise from "./ReadablePromise";
declare const useSuspenser: () => [suspenser: ReadablePromise<void>, unsuspend: () => void];
export default useSuspenser;
