export type ReadableResults<Expected> = Promise<void> | Error | Expected;
export type ReadablePromiseExecutor<T> = (resolve: (value: T | PromiseLike<T>) => void) => Promise<T> | T;
declare class ReadablePromise<T> extends Promise<T> {
    private result;
    constructor(executor: ReadablePromiseExecutor<T>);
    read: () => ReadableResults<T>;
}
export default ReadablePromise;
