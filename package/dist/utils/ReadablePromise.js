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
class ReadablePromise extends Promise {
    constructor(thenable) {
        super((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = thenable instanceof Promise ? yield thenable : yield thenable();
                this.result = result;
                resolve(result);
            }
            catch (error) {
                this.result = error;
                reject(error);
            }
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
