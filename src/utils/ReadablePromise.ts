export type ReadableResults<Expected> = Promise<void> | Error | Expected;

export type ReadablePromiseExecutor<T> = (
  resolve: (value: T | PromiseLike<T>) => void
) => Promise<T> | T;

class ReadablePromise<T> extends Promise<T> {
  private result: Error | T | null = null;

  constructor(executor: ReadablePromiseExecutor<T>) {
    super((resolve, reject) =>
      new Promise<T>(executor).then(
        (result) => {
          this.result = result;
          resolve(result);
        },
        (error: Error) => {
          this.result = error;
          reject(error);
        }
      )
    );
  }

  public read = (): ReadableResults<T> => {
    if (this.result === null) throw this;
    if (this.result instanceof Error) throw this.result;

    return this.result;
  };
}

export default ReadablePromise;
