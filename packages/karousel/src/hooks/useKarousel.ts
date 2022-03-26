import { useId } from "@react-aria/utils";
import { ButtonHTMLAttributes, HTMLAttributes, useCallback, useMemo } from "react";
import { applyDefaults } from "../defaults";
import { KarouselOptions } from "../types";
import { useAutoplay } from "./useAutoplay";
import { useDraggable } from "./useDraggable";
import { usePaging } from "./usePaging";
import { useResponsive } from "./useResponsive";
import { useTrack } from "./useTrack";

export const useKarousel = (slideCount: number, options: Partial<KarouselOptions>) => {
  // Ensure unique id.
  const id = useId();

  // Ensure options are defaulted.
  const defaultedOptions = useMemo(() => applyDefaults(options), [options]);
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
  const { activeSlides, trackOffset, trackWidth } = useTrack({
    ...responsiveOptions,
    currentPage,
    draggedX,
    pageCount,
    slideCount,
  });

  const getContainerProps = useCallback((): HTMLAttributes<HTMLDivElement> => ({
    'aria-live': 'polite',
    id,
    className: classes?.container
  }), [classes]);

  const getSliderProps = useCallback((): HTMLAttributes<HTMLDivElement> => ({
    className: classes?.carousel,
    style: { overflow: "hidden" },
  }), [classes]);

  const getTrackProps = useCallback((): HTMLAttributes<HTMLUListElement> => ({
    ...draggableEvents,
    className: classes?.track,
    style: {
      display: "flex",
      listStyle: 'none',
      margin: 0,
      padding: 0,
      transform: `translateX(${trackOffset})`,
      transition: !isDragging ? `transform ${speed}ms ease-in-out` : undefined,
      width: trackWidth,
    },
  }), [classes, isDragging, speed, trackOffset, trackWidth]);

  const getSlideProps = useCallback((slide: number): HTMLAttributes<HTMLLIElement> => {
    const isActive = activeSlides.includes(slide);
    return {
      'aria-hidden': !isActive,
      className: [classes?.slide, !isActive && classes?.slideInactive].filter(Boolean).join(' '),
      style: { width: '100%' },
    };
  }, [activeSlides, classes]);

  const getControlProps = useCallback((): HTMLAttributes<HTMLFieldSetElement> => ({
    'aria-controls': id,
    'aria-label': 'carousel buttons',
    className: classes?.controls,
  }), [classes]);

  const getButtonProps = useCallback((direction: 'next' | 'previous'): ButtonHTMLAttributes<HTMLButtonElement> => ({
    className: [classes?.button, direction === 'next' ? classes?.buttonNext : classes?.buttonPrevious]
      .filter(Boolean)
      .join(" "),
    onClick: direction === 'next' ? goToNext : goToPrevious,
    type: 'button',
  }), [classes, goToNext, goToPrevious]);

  const getIndicatorProps = useCallback((page: number): ButtonHTMLAttributes<HTMLButtonElement> => ({
    className: [
      classes?.indicator,
      page === currentPage && classes?.indicatorActive,
    ]
      .filter(Boolean)
      .join(" "),
    onClick: () => goToPage(page),
    type: 'button',
  }), [classes, currentPage, goToPage]);

  return {
    getButtonProps,
    getContainerProps,
    getControlProps,
    getIndicatorProps,
    getSlideProps,
    getSliderProps,
    getTrackProps,
    pageCount,
  };
}