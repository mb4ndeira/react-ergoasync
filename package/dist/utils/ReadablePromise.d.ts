declare class ReadablePromise<T> {
    private result;
    constructor(executor: () => Promise<T> | T);
    read: () => Promise<void> | Error | T;
}
export default ReadablePromise;
