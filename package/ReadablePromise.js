"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReadablePromise extends Promise {
    constructor(executor) {
        super((resolve, reject) => new Promise(executor).then((result) => {
            this.result = result;
            resolve(result);
        }, (error) => {
            this.result = error;
            reject(error);
        }));
        this.result = null;
        this.read = () => {
            if (this.result === null)
                throw this;
            if (this.result instanceof Error)
                throw this.result;
            return this.result;
        };
    }
}
exports.default = ReadablePromise;
