"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ReadablePromise_1 = __importDefault(require("../utils/ReadablePromise"));
const useAsync = (suspensible, configs) => {
    const fakeReadablePromise = { read: () => new Promise(() => { }) };
    const [result, setResult] = (0, react_1.useState)(fakeReadablePromise);
    const suspendedSuspensible = (0, react_1.useMemo)(() => {
        if (suspensible instanceof ReadablePromise_1.default)
            return suspensible;
        if (suspensible instanceof Promise)
            return new ReadablePromise_1.default(() => suspensible);
        return new ReadablePromise_1.default(() => suspensible(suspend));
    }, []);
    (0, react_1.useEffect)(() => {
        setResult(suspendedSuspensible);
    }, []);
    const solver = (solvedValue) => {
        setResult(new ReadablePromise_1.default(() => solvedValue));
    };
    const suspend = () => {
        setResult(fakeReadablePromise);
    };
    return [result, solver];
};
exports.default = useAsync;
