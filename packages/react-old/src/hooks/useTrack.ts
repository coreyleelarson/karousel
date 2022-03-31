import { useMemo } from "react";
import { TrackOptions } from "../types";

export const useTrack = (options: TrackOptions) => {
  const { currentPage, draggedX, pageCount, slideCount, slidesToScroll, slidesToShow } = options;
  const trackWidth = useMemo(() => `${(100 * slideCount) / slidesToShow}%`, [slideCount, slidesToShow]);
  const slideIndex = useMemo(() => (currentPage - 1) * slidesToScroll, [currentPage, slidesToScroll]);
  const slidePush = useMemo(() => currentPage === pageCount ? slidesToShow - (slideCount - slideIndex) : 0,
    [currentPage, pageCount, slideCount, slideIndex, slidesToShow]);
  const activeSlides = useMemo(() => Array.from({ length: slidesToShow }, (_, index) => (slideIndex - slidePush + index + 1)),
    [slideIndex, slidePush, slidesToShow]);
  const trackOffset = useMemo(() => `calc(${(slideIndex - slidePush) * -100 / slideCount}% - ${draggedX}px)`,
    [slideIndex, slidePush, slideCount, draggedX]);

  return { activeSlides, trackOffset, trackWidth };
}