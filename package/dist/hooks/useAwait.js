"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ReadablePromise_1 = __importDefault(require("../utils/ReadablePromise"));
const useAwait = (thenable, callback) => {
    const [suspenser, setSuspenser] = (0, react_1.useState)(new ReadablePromise_1.default(() => { }));
    const promise = (0, react_1.useMemo)(() => new ReadablePromise_1.default(thenable), []);
    (0, react_1.useEffect)(() => {
        promise.then(() => {
            if (callback)
                callback();
            unsuspend();
        });
    }, []);
    const unsuspend = () => {
        setSuspenser(promise);
    };
    return suspenser;
};
exports.default = useAwait;
