import { KarouselModel, KarouselOptions } from "@karousel/core";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { convertAttributesToProps } from '../utils';

export const useKarousel = (totalItems: number, options: Partial<KarouselOptions>) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const model = useRef<KarouselModel>(new KarouselModel(totalItems, options).initialize());

  const wrappedCallback = useCallback((callback) => (...args) => {
    callback(...args);
    forceUpdate();
  }, [forceUpdate]);

  const getContainerProps = useCallback(() =>
    convertAttributesToProps(model.current.getContainerAttributes()), [model.current]);

  const getSliderProps = useCallback(() =>
    convertAttributesToProps(model.current.getSliderAttributes()), [model.current]);
  
  const getTrackProps = useCallback(() =>
    convertAttributesToProps(model.current.getTrackAttributes()), [model.current]);

  const getSlideProps = useCallback((slide: number) =>
    convertAttributesToProps(model.current.getSlideAttributes(slide)), [model.current]);
  
  const getControlsProps = useCallback(() =>
    convertAttributesToProps(model.current.getControlsAttributes()), [model.current]);
  
  const getButtonProps = useCallback((direction: 'next' | 'previous') => {
    const buttonProps = convertAttributesToProps(model.current.getButtonAttributes(direction));
    return {
      ...buttonProps,
      onClick: wrappedCallback(buttonProps.onClick),
    };
  }, [forceUpdate, model.current]);
  
  const getIndicatorProps = useCallback((page: number) => {
    const indicatorProps = convertAttributesToProps(model.current.getIndicatorAttributes(page));
    return {
      ...indicatorProps,
      onClick: wrappedCallback(indicatorProps.onClick),
    };
  }, [model.current]);
  
  return {
    currentPage: model.current.currentPage,
    getButtonProps,
    getContainerProps,
    getControlsProps,
    getIndicatorProps,
    getSlideProps,
    getSliderProps,
    getTrackProps,
    totalPages: model.current.totalPages,
  };
}