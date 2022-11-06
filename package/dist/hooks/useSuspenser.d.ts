import ReadablePromise from "../utils/ReadablePromise";
declare type FakeSuspenser = {
    read: () => Promise<void>;
};
declare type Suspenser = ReadablePromise<void> | FakeSuspenser;
declare const useSuspenser: () => [suspenser: Suspenser, unsuspend: () => void];
export default useSuspenser;
