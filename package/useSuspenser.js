"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ReadablePromise_1 = __importDefault(require("./ReadablePromise"));
const useSuspenser = () => {
    const [suspenser, setSuspenser] = (0, react_1.useState)(new ReadablePromise_1.default(() => { }));
    const unsuspend = () => {
        setSuspenser(new ReadablePromise_1.default((resolve) => resolve()));
    };
    return [suspenser, unsuspend];
};
exports.default = useSuspenser;
