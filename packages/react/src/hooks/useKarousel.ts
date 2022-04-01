import { KarouselModel, KarouselOptions } from "@karousel/core";
import { useCallback, useReducer, useRef } from "react";
import { convertAttributesToProps } from '../utils';

export const useKarousel = (totalItems: number, options: Partial<KarouselOptions>) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const model = useRef<KarouselModel>(new KarouselModel(totalItems, { options, updater: forceUpdate }).initialize());

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
  
  const getAutoplayButtonProps = useCallback(() =>
    convertAttributesToProps(model.current.getAutoplayButtonAttributes()), [forceUpdate, model.current]);

  const getDirectionButtonProps = useCallback((direction: 'next' | 'previous') =>
    convertAttributesToProps(model.current.getDirectionButtonAttributes(direction)), [forceUpdate, model.current]);
  
  const getIndicatorButtonProps = useCallback((page: number) =>
    convertAttributesToProps(model.current.getIndicatorButtonAttributes(page)), [model.current]);
  
  return {
    currentPage: model.current.currentPage,
    getAutoplayButtonProps,
    getContainerProps,
    getControlsProps,
    getDirectionButtonProps,
    getIndicatorButtonProps,
    getSlideProps,
    getSliderProps,
    getTrackProps,
    totalPages: model.current.totalPages,
  };
}