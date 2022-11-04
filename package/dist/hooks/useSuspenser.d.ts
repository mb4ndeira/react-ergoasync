import ReadablePromise from "../utils/ReadablePromise";
declare const useSuspenser: () => [suspenser: ReadablePromise<void>, unsuspend: () => void];
export default useSuspenser;
