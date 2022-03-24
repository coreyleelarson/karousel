import { useEffect, useMemo, useState } from "react";
import { ResponsiveKarouselOption, ResponsiveOptions } from "../types";

type ResponsiveKarouselOptionsWithMQL = ResponsiveKarouselOption & { mql?: MediaQueryList };

export const useResponsive = (options: ResponsiveOptions) => {
  if (typeof window === 'undefined') return { responsiveOptions: options };

  const { responsive } = options;

  // Sorts breakpoints descending and adds a media query listener.
  const parsedResponsive: ResponsiveKarouselOptionsWithMQL[] = useMemo(() => {
    const sorted = responsive.slice().sort((a, b) => b.breakpoint - a.breakpoint);
    return sorted.map(instance => ({ ...instance, mql: window.matchMedia(`(min-width: ${instance.breakpoint}px)`) }));
  }, [responsive]);

  // Gets the matched options based on media query listeners.
  const getResponsiveOptions = () => {
    const matchedOptions = parsedResponsive.find(instance => instance.mql?.matches)?.options;
    return { ...options, ...matchedOptions };
  };
  const [responsiveOptions, setResponsiveOptions] = useState(getResponsiveOptions);
  const handler = () => setResponsiveOptions(getResponsiveOptions);

  useEffect(() => {
    handler();
    parsedResponsive.forEach(instance => instance.mql?.addEventListener('change', handler));
    return () => {
      parsedResponsive.forEach(instance => instance.mql?.removeEventListener('change', handler));
    }
  }, [parsedResponsive]);

  return { responsiveOptions };
}