class ReadablePromise<T> {
  private result: Promise<T | void | Error> | T | Error;

  constructor(executor: () => Promise<T> | T) {
    this.result = new Promise<T>(async (resolve, reject) => {
      try {
        resolve(await executor());
      } catch (err) {
        reject(err);
      }
    }).then(
      (result) => (this.result = result),
      (error: Error) => (this.result = error)
    );
  }

  public read = (): Promise<void> | Error | T => {
    if (this.result instanceof Promise) throw this.result;
    if (this.result instanceof Error) throw this.result;

    return this.result;
  };
}

export default ReadablePromise;
