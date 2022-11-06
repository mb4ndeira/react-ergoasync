export declare type ReadableResults<Expected> = Promise<void> | Error | Expected;
export declare type ReadablePromiseExecutor<T> = (() => Promise<T> | T) | Promise<T>;
declare class ReadablePromise<T> extends Promise<T> {
    private result;
    constructor(thenable: ReadablePromiseExecutor<T>);
    read: () => ReadableResults<T>;
}
export default ReadablePromise;
