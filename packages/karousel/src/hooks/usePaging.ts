import { useCallback, useEffect, useMemo, useState } from "react";
import { PagingOptions } from "../types";

export const usePaging = (options: PagingOptions) => {
  const { slideCount, slidesToScroll, slidesToShow } = options;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageCount = useMemo(() => 1 + Math.ceil((slideCount - slidesToShow) / slidesToScroll), [slideCount, slidesToScroll, slidesToShow]);
  const goToPage = useCallback((page: number) => setCurrentPage(page), []);
  const goToPrevious = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);
  const goToNext = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);

  useEffect(() => {
    if (currentPage < 1) {
      goToPage(pageCount);
    } else if (currentPage > pageCount) {
      goToPage(1);
    }
  }, [currentPage, goToPage, pageCount]);

  return { currentPage, goToPage, setCurrentPage, goToPrevious, goToNext, pageCount };
}