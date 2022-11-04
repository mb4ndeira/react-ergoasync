import React, { SuspenseProps } from "react";
import ReadablePromise from "../utils/ReadablePromise";
declare const Suspense: React.FC<{
    cause?: ReadablePromise<unknown> | ReadablePromise<unknown>[];
    children: React.ReactNode;
} & SuspenseProps>;
export default Suspense;
