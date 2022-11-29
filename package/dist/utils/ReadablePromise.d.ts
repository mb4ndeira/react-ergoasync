declare class ReadablePromise<T> {
    private result;
    private thenable;
    constructor(executor: () => Promise<T> | T);
    then: (onFulfilled?: ((value?: T) => unknown) | undefined) => this;
    read: () => Promise<void> | Error | T;
}
export default ReadablePromise;
