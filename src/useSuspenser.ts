import { useState } from "react";

import ReadablePromise from "./ReadablePromise";

const useSuspenser = (): [
  suspenser: ReadablePromise<void>,
  unsuspend: () => void
] => {
  const [suspenser, setSuspenser] = useState(
    new ReadablePromise<void>(() => {})
  );

  const unsuspend = () => {
    setSuspenser(new ReadablePromise<void>((resolve) => resolve()));
  };

  return [suspenser, unsuspend];
};

export default useSuspenser;
