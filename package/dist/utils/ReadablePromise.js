"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ReadablePromise {
    constructor(executor) {
        this.then = (onFulfilled) => {
            this.thenable.then(onFulfilled);
            return this;
        };
        this.read = () => {
            if (this.result instanceof Promise)
                throw this.result;
            if (this.result instanceof Error)
                throw this.result;
            return this.result;
        };
        this.thenable = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                resolve(yield executor());
            }
            catch (err) {
                reject(err);
            }
        }));
        this.result = this.thenable.then((result) => (this.result = result), (error) => (this.result = error));
    }
}
exports.default = ReadablePromise;
