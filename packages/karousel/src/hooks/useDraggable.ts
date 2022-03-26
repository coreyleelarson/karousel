import {
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { DraggableOptions } from "../types";

export const useDraggable = (options: DraggableOptions) => {
  const { draggable, onDragStart, onDragEnd, onNext, onPrevious } = options;
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<number>(0);
  const [dragX, setDragX] = useState<number>(0);
  const draggedX = useMemo(() => dragStart - dragX, [dragStart, dragX]);

  const handleDragStart = useCallback((e: ReactMouseEvent | ReactTouchEvent) => {
    if (draggable) {
      onDragStart?.();
      if (e.nativeEvent instanceof TouchEvent) {
        setDragStart(e.nativeEvent.touches[0].clientX);
        setDragX(e.nativeEvent.touches[0].clientX);
      } else if (e.nativeEvent instanceof MouseEvent) {
        setDragStart(e.nativeEvent.clientX);
        setDragX(e.nativeEvent.clientX);
      }
      setIsDragging(true);
    }
  }, [draggable, onDragStart]);

  const handleDrag = useCallback((e: ReactMouseEvent | ReactTouchEvent) => {
    if (draggable && isDragging) {
      if (e.nativeEvent instanceof TouchEvent) {
        setDragX(e.nativeEvent.touches[0].clientX);
      } else if (e.nativeEvent instanceof MouseEvent) {
        setDragX(e.nativeEvent.clientX);
      }
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