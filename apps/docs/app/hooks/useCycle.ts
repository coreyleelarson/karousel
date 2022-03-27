import { useCallback, useEffect, useState } from "react";

export const useCycle = (
  options: string[],
  autoCycleTime?: number
): [string, () => void] => {
  const [index, setIndex] = useState<number>(0);

  const cycle = useCallback(
    () =>
      setIndex((prevIndex: number) => {
        let nextIndex = prevIndex + 1;
        if (nextIndex > options.length - 1) nextIndex = 0;
        return nextIndex;
      }),
    [options]
  );

  useEffect(() => {
    if (autoCycleTime !== undefined) {
      const interval = setInterval(cycle, autoCycleTime);
      return () => {
        clearInterval(interval);
      };
    }
  }, [autoCycleTime, cycle]);

  return [options[index], cycle];
};
