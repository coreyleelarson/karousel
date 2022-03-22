import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { ResponsiveOptions } from "../types";

export const useResponsive = (options: ResponsiveOptions) => {
  const { responsive } = options;

  // Sorts breakpoints ascending and adds a media query listener.
  const parsedResponsive = useMemo(() => {
    const sorted = responsive.slice().sort((a, b) => a.breakpoint - b.breakpoint);
    return sorted.map(instance => ({ ...instance, mql: window.matchMedia(`(min-width: ${instance.breakpoint}px)`) }));
  }, [responsive]);

  // Gets the matched options based on media query listeners..
  const getResponsiveOptions = useCallback(() => {
    const matchedOptions = parsedResponsive.find(instance => instance.mql.matches)?.options;
    return { ...options, ...matchedOptions };
  }, [options, parsedResponsive]);

  const [responsiveOptions, setResponsiveOptions] = useState(getResponsiveOptions);

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const handler = () => setResponsiveOptions(getResponsiveOptions);
      parsedResponsive.forEach(instance => instance.mql.addEventListener('change', handler));
      return () => {
        parsedResponsive.forEach(instance => instance.mql.removeEventListener('change', handler));
      }
    }
  }, [parsedResponsive]);

  return { responsiveOptions };
}