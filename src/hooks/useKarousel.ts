import { useMemo } from "react";
import { ButtonHTMLAttributes, Children, HTMLAttributes, ReactNode } from "react";
import { KarouselOptions } from "../types";
import { useAutoplay } from "./useAutoplay";
import { useDraggable } from "./useDraggable";
import { usePaging } from "./usePaging";
import { useTrack } from "./useTrack";

export const useKarousel = (items: ReactNode, options: KarouselOptions) => {
  const { classes, speed = 300 } = options;
  const slideCount = useMemo(() => Children.count(items), [items]);
  const { currentPage, goToNext, goToPage, goToPrevious, pageCount } = usePaging({ ...options, slideCount });
  const { pauseTimer, startTimer } = useAutoplay({ ...options, onNext: goToNext });
  const { draggableEvents, draggedX, isDragging } = useDraggable({ ...options,
    onDragEnd: startTimer,
    onDragStart: pauseTimer,
    onNext: goToNext,
    onPrevious: goToPrevious,
  });
  const { trackOffset, trackWidth } = useTrack({
    ...options,
    currentPage,
    draggedX,
    pageCount,
    slideCount,
  });

  const getContainerProps = (): HTMLAttributes<HTMLDivElement> => ({
    className: classes?.container
  });

  const getSliderProps = (): HTMLAttributes<HTMLDivElement> => ({ className: classes?.carousel, style: { overflow: "hidden" } });

  const getTrackProps = (): HTMLAttributes<HTMLDivElement> => ({
    ...draggableEvents,
    className: classes?.track,
    style: {
      display: "flex",
      transform: `translateX(${trackOffset})`,
      transition: !isDragging ? `transform ${speed}ms ease-in-out` : undefined,
      width: trackWidth,
    },
  });

  const getSlideProps = (): HTMLAttributes<HTMLDivElement> => ({
    className: classes?.slide,
    style: { width: '100%' },
  });

  const getButtonProps = (direction: 'next' | 'previous'): ButtonHTMLAttributes<HTMLButtonElement> => ({
    className: [classes?.button, classes?.buttonPrevious]
      .filter(Boolean)
      .join(" "),
    onClick: direction === 'next' ? goToNext : goToPrevious,
    type: 'button',
  });

  const getIndicatorProps = (index: number): ButtonHTMLAttributes<HTMLButtonElement> => ({
    className: [
      classes?.indicator,
      index === currentPage && classes?.indicatorActive,
    ]
      .filter(Boolean)
      .join(" "),
    onClick: () => goToPage(index + 1),
    type: 'button',
  });

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