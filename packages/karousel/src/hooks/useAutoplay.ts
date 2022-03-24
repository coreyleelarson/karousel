import { useCallback, useEffect, useRef } from "react";
import { AutoplayOptions } from "../types";

export const useAutoplay = (options: AutoplayOptions) => {
  const { autoplay, autoplaySpeed, onNext, speed } = options;
  const autoplayTimer = useRef<NodeJS.Timer>();

  const pauseTimer = useCallback(() => {
    if (autoplay && autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
  }, [autoplay, autoplayTimer]);

  const startTimer = useCallback(() => {
    if (autoplay) {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
      autoplayTimer.current = setInterval(onNext, autoplaySpeed);
    }
  }, [autoplay, autoplaySpeed, autoplayTimer, onNext]);

  useEffect(() => {
    const timeoutTimer = setTimeout(startTimer, speed);
    return () => {
      clearTimeout(timeoutTimer);
      pauseTimer();
    };
  }, [autoplay, pauseTimer, startTimer, speed]);

  return { pauseTimer, startTimer };
}