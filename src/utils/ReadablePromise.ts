/**
 * Represents an ongoing promise that is readable by React components.
 *
 * This class provides a `read` method for suspending React components until the promise is resolved.
 *
 * @param executor - a function that returns a value or promise.
 */
class ReadablePromise<T> {
  private result: Promise<T | void | Error> | T | Error;
  private thenable: Promise<T>;

  constructor(executor: () => Promise<T> | T) {
    this.thenable = new Promise(async (resolve, reject) => {
      try {
        resolve(await executor());
      } catch (err) {
        reject(err);
      }
    });

    this.result = this.thenable.then(
      (result) => (this.result = result),
      (error: Error) => (this.result = error)
    );
  }

  public then = (onFulfilled?: (value?: T) => unknown) => {
    this.thenable.then(onFulfilled);

    return this;
  };

  public read = (): Promise<void> | Error | T => {
    if (this.result instanceof Promise) throw this.result;
    if (this.result instanceof Error) throw this.result;

    return this.result;
  };
}

export default ReadablePromise;
