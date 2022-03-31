import { ResponsiveKarouselOptions } from './../types';
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { ResponsiveOptions } from "../types"

export const useResponsive = (options: ResponsiveOptions) => {
  if (typeof window === 'undefined') return { responsiveOptions: options };
  
  const { responsive } = options;

  const responsiveWithMQL = useMemo(() => {
    const sortedResponsive = responsive.slice().sort((a, b) => b.breakpoint - a.breakpoint);
    return sortedResponsive.map(instance => ({ ...instance, mql: window.matchMedia(`(min-width: ${instance.breakpoint}px)`) }));
  }, [responsive]);

  const getMatchedOptions = useCallback(() => responsiveWithMQL.find(instance => instance.mql.matches)?.options, [responsiveWithMQL]);

  const [matchedOptions, setMatchedOptions] = useState<ResponsiveKarouselOptions | undefined>(getMatchedOptions);
  const responsiveOptions = useMemo(() => ({ ...options, ...(matchedOptions || {}) }), [matchedOptions, options]);
  
  useLayoutEffect(() => {
    const handler = () => setMatchedOptions(getMatchedOptions);
    responsiveWithMQL.forEach(instance => instance.mql.addEventListener('change', handler));
    return () => {
      responsiveWithMQL.forEach(instance => instance.mql.removeEventListener('change', handler));
    };
  }, [getMatchedOptions, responsiveWithMQL]);

  return { responsiveOptions };
}


// import { useEffect, useMemo, useState } from "react";
// import { ResponsiveKarouselOptions, ResponsiveOptions } from "../types";

// export const useResponsive = (options: ResponsiveOptions) => {
//   const { responsive } = options;
//   const [matchedOptions, setMatchedOptions] = useState<ResponsiveKarouselOptions>();
//   const sortedResponsive = useMemo(() => responsive.slice().sort((a, b) => b.breakpoint - a.breakpoint), [responsive]);
//   const responsiveOptions = useMemo(() => ({ ...options, ...(matchedOptions || {}) }), [matchedOptions, options]);

//   useEffect(() => {
//     const responsiveWithMQL = sortedResponsive.map(instance => ({ ...instance, mql: window.matchMedia(`(min-width: ${instance.breakpoint}px)`) }));  
//     const handler = () => setMatchedOptions(responsiveWithMQL.find(instance => instance.mql.matches)?.options);
//     handler();
//     responsiveWithMQL.forEach(instance => instance.mql?.addEventListener('change', handler));
//     return () => {
//       responsiveWithMQL.forEach(instance => instance.mql?.addEventListener('change', handler));
//     }
//   }, [sortedResponsive]);

//   return { responsiveOptions };
// }