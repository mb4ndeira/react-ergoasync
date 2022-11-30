import React, { SuspenseProps as IReactSuspenseProps } from "react";
import ReadablePromise from "../utils/ReadablePromise";
declare const Suspense: React.FC<{
    cause?: ReadablePromise<unknown> | ReadablePromise<unknown>[];
    children: React.ReactNode;
} & IReactSuspenseProps>;
export default Suspense;
