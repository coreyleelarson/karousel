import { ButtonHTMLAttributes, HTMLAttributes, useCallback } from "react";
import { applyDefaults } from "../defaults";
import { KarouselOptions } from "../types";
import { useAutoplay } from "./useAutoplay";
import { useDraggable } from "./useDraggable";
import { usePaging } from "./usePaging";
import { useResponsive } from "./useResponsive";
import { useTrack } from "./useTrack";

export const useKarousel = (slideCount: number, options: Partial<KarouselOptions>) => {
  // Ensure options are defaulted.
  const defaultedOptions = applyDefaults(options);
  const { classes, speed } = defaultedOptions;

  // Ensure options are responsive.
  const { responsiveOptions } = useResponsive(defaultedOptions);

  const { currentPage, goToNext, goToPage, goToPrevious, pageCount } = usePaging({ ...responsiveOptions, slideCount });
  const { pauseTimer, startTimer } = useAutoplay({ ...responsiveOptions, onNext: goToNext });
  const { draggableEvents, draggedX, isDragging } = useDraggable({
    ...responsiveOptions,
    onDragEnd: startTimer,
    onDragStart: pauseTimer,
    onNext: goToNext,
    onPrevious: goToPrevious,
  });
  const { trackOffset, trackWidth } = useTrack({
    ...responsiveOptions,
    currentPage,
    draggedX,
    pageCount,
    slideCount,
  });

  const getContainerProps = useCallback((): HTMLAttributes<HTMLDivElement> => ({
    className: classes?.container
  }), [classes]);

  const getSliderProps = useCallback((): HTMLAttributes<HTMLDivElement> => ({
    className: classes?.carousel,
    style: { overflow: "hidden" },
  }), [classes]);

  const getTrackProps = useCallback((): HTMLAttributes<HTMLDivElement> => ({
    ...draggableEvents,
    className: classes?.track,
    style: {
      display: "flex",
      transform: `translateX(${trackOffset})`,
      transition: !isDragging ? `transform ${speed}ms ease-in-out` : undefined,
      width: trackWidth,
    },
  }), [classes, isDragging, speed, trackOffset, trackWidth]);

  const getSlideProps = useCallback((): HTMLAttributes<HTMLDivElement> => ({
    className: classes?.slide,
    style: { width: '100%' },
  }), [classes]);

  const getButtonProps = useCallback((direction: 'next' | 'previous'): ButtonHTMLAttributes<HTMLButtonElement> => ({
    className: [classes?.button, direction === 'next' ? classes?.buttonNext : classes?.buttonPrevious]
      .filter(Boolean)
      .join(" "),
    onClick: direction === 'next' ? goToNext : goToPrevious,
    type: 'button',
  }), [classes, goToNext, goToPrevious]);

  const getIndicatorProps = useCallback((index: number): ButtonHTMLAttributes<HTMLButtonElement> => ({
    className: [
      classes?.indicator,
      index === currentPage && classes?.indicatorActive,
    ]
      .filter(Boolean)
      .join(" "),
    onClick: () => goToPage(index),
    type: 'button',
  }), [classes, currentPage, goToPage]);

  return {
    getButtonProps,
    getSliderProps,
    getContainerProps,
    getIndicatorProps,
    getSlideProps,
    getTrackProps,
    pageCount,
  };
}