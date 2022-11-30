import React, { SuspenseProps as IReactSuspenseProps } from "react";
import ReadablePromise from "../utils/ReadablePromise";
type Cause = (() => Promise<unknown | void | Error> | unknown | Error) | ReadablePromise<unknown>;
interface ISuspenseProps {
    cause?: Cause | Cause[];
    loading: React.ReactNode;
    fallback?: React.ReactNode;
    children: React.ReactNode;
}
declare const Suspense: React.FC<ISuspenseProps & IReactSuspenseProps>;
export default Suspense;
