import { useEffect, useState } from "react";
import { KarouselOptions, ResponsiveOptions } from "../types";

export const useResponsive = (options: ResponsiveOptions) => {
  const { responsive } = options;
  const [responsiveOptions, setResponsiveOptions] = useState<KarouselOptions>(options);

  useEffect(() => {
    const sorted = responsive.slice().sort((a, b) => a.breakpoint - b.breakpoint);
    const matchedOptions = sorted.find(instance => window.matchMedia(`(min-width: ${instance.breakpoint}px)`).matches);
    setResponsiveOptions({ ...options, ...matchedOptions?.options });
  }, [responsive]);

  return { responsiveOptions };
}