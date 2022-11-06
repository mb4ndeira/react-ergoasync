import { useState } from "react";

import ReadablePromise from "../utils/ReadablePromise";

type FakeSuspenser = { read: () => Promise<void> };

type Suspenser = ReadablePromise<void> | FakeSuspenser;

const useSuspenser = (): [suspenser: Suspenser, unsuspend: () => void] => {
  const [suspenser, setSuspenser] = useState<Suspenser>({
    read: () => new Promise<void>(() => {}),
  });

  const unsuspend = () => {
    setSuspenser(new ReadablePromise<void>(() => {}));
  };

  return [suspenser, unsuspend];
};

export default useSuspenser;
