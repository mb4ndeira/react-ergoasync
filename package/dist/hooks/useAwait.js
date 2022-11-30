"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ReadablePromise_1 = __importDefault(require("../utils/ReadablePromise"));
class Suspenser {
    constructor() {
        this.read = () => {
            throw new Promise(() => { });
        };
    }
}
const useAsync = (executor, configs = { suspend: false }) => {
    const promise = (0, react_1.useMemo)(() => new ReadablePromise_1.default(executor), []);
    const [reader, setReader] = (0, react_1.useState)(configs.suspend === true ? new Suspenser() : promise);
    const resolver = (solvedValue) => {
        setReader(new ReadablePromise_1.default(() => solvedValue));
    };
    return [() => reader.read(), resolver];
};
exports.default = useAsync;
