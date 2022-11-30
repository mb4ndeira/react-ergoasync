"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReadablePromise_1 = __importDefault(require("../utils/ReadablePromise"));
const readAsync = (executor) => new ReadablePromise_1.default(executor).read;
exports.default = readAsync;
