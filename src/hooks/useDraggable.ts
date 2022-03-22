import { MouseEvent, useCallback, useMemo, useState } from "react";
import { DraggableOptions } from "../types";

export const useDraggable = (options: DraggableOptions) => {
  const { draggable, onDragStart, onDragEnd, onNext, onPrevious } = options;
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<number>(0);
  const [dragX, setDragX] = useState<number>(0);
  const draggedX = useMemo(() => dragStart - dragX, [dragStart, dragX]);

  const handleDragStart = useCallback((e: MouseEvent) => {
    if (draggable) {
      onDragStart?.();
      setDragStart(e.clientX);
      setDragX(e.clientX);
      setIsDragging(true);
    }
  }, [draggable, onDragStart]);

  const handleDrag = useCallback((e: MouseEvent) => {
    if (draggable && isDragging) {
      setDragX(e.clientX);
    }
  }, [draggable, isDragging]);

  const handleDragEnd = useCallback(() => {
    if (draggable && isDragging) {
      onDragEnd?.();
      setIsDragging(false);
      setDragStart(0);
      setDragX(0);
  
      const delta = dragStart - dragX;
  
      if (delta > 50) {
        onNext();
      } else if (delta < -50) {
        onPrevious();
      }
    }
  }, [draggable, dragStart, dragX, isDragging, onDragEnd, onNext, onPrevious]);

  const draggableEvents = {
    onMouseDown: handleDragStart,
    onTouchStart: handleDragStart,
    onMouseMove: handleDrag,
    onTouchMove: handleDrag,
    onMouseUp: handleDragEnd,
    onTouchEnd: handleDragEnd,
  };

  return { draggableEvents, draggedX, isDragging };
}