"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ReadablePromise_1 = __importDefault(require("../utils/ReadablePromise"));
const Reader = ({ promises, children }) => {
    promises.forEach((promise) => promise instanceof ReadablePromise_1.default ? promise.read() : promise());
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
};
const Suspense = (_a) => {
    var { cause = [], children } = _a, rest = __rest(_a, ["cause", "children"]);
    if (!(cause instanceof Array))
        cause = [cause];
    if (cause.length == 0)
        return (0, jsx_runtime_1.jsx)(react_1.Suspense, Object.assign({}, rest, { children: children }));
    return ((0, jsx_runtime_1.jsx)(react_1.Suspense, Object.assign({}, rest, { children: (0, jsx_runtime_1.jsx)(Reader, { promises: cause, children: children }) })));
};
exports.default = Suspense;
