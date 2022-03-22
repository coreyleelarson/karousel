import {
  Children,
  PropsWithChildren,
  useMemo,
} from "react";
import { useKarousel } from "../../hooks";
import { KarouselOptions } from "../../types";

export type KarouselProps = PropsWithChildren<Partial<KarouselOptions>>;

export const Karousel = (props: KarouselProps) => {
  const { children, ...options } = props;
  const { buttons, classes, indicators } = options;
  const slideCount = useMemo(() => Children.count(children), [children]);

  const {
    getButtonProps,
    getContainerProps,
    getIndicatorProps,
    getSlideProps,
    getSliderProps,
    getTrackProps,
    pageCount,
  } = useKarousel(slideCount, options);

  return (
    <div {...getContainerProps()}>
      <div {...getSliderProps()}>
        <div {...getTrackProps()}>
          {Children.map(children, (child, index) => (
            <div {...getSlideProps()} key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>
      {buttons && (
        <>
          <button {...getButtonProps('previous')}>Previous</button>
          <button {...getButtonProps('next')}>Next</button>
        </>
      )}
      {indicators && (
        <div className={classes?.indicators}>
          {[...Array(pageCount)].map((_, index) => (
            <button key={index} {...getIndicatorProps(index)}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
