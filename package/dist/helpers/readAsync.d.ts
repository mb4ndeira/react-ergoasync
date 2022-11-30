declare const readAsync: <T>(executor: () => T | Promise<T>) => () => Error | Promise<void> | T;
export default readAsync;
