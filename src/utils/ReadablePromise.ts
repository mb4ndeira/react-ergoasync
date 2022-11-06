export type ReadableResults<Expected> = Promise<void> | Error | Expected;

export type ReadablePromiseExecutor<T> = (() => Promise<T> | T) | Promise<T>;

class ReadablePromise<T> extends Promise<T> {
  private result: Error | T | null = null;

  constructor(thenable: ReadablePromiseExecutor<T>) {
    super(async (resolve, reject) => {
      try {
        const result =
          thenable instanceof Promise ? await thenable : await thenable();
        this.result = result;
        resolve(result);
      } catch (error) {
        this.result = error as Error;
        reject(error);
      }
    });
  }

  public read = (): ReadableResults<T> => {
    if (this.result === null) throw this;
    if (this.result instanceof Error) throw this.result;

    return this.result;
  };
}

export default ReadablePromise;
