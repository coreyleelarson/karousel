import { useMemo } from "react";
import { TrackOptions } from "../types";

export const useTrack = (options: TrackOptions) => {
  const {
    currentPage = 1,
    draggedX = 0,
    pageCount = 0,
    slideCount = 0,
    slidesToScroll,
    slidesToShow,
  } = options;

  const trackWidth = useMemo(() => `${(100 * slideCount) / slidesToShow}%`, [slideCount, slidesToShow]);
  const trackOffset = useMemo(
    () => {
      const slideIndex = (currentPage - 1) * slidesToScroll;
      const slidePush = currentPage === pageCount ? slidesToShow - (slideCount - slideIndex) : 0;
      return `calc(${(slideIndex - slidePush) * -100 / slideCount}% - ${draggedX}px)`;
    },
    [currentPage, draggedX, pageCount, slideCount, slidesToScroll, slidesToShow]
  );

  return { trackOffset, trackWidth };
}