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
    getControlProps,
    getIndicatorProps,
    getSlideProps,
    getSliderProps,
    getTrackProps,
    pageCount,
  } = useKarousel(slideCount, options);

  return (
    <div {...getContainerProps()}>
      <div {...getSliderProps()}>
        <ul {...getTrackProps()}>
          {Children.map(children, (child, index) => (
            <li {...getSlideProps(index + 1)} key={index}>
              {child}
            </li>
          ))}
        </ul>
      </div>
      <fieldset {...getControlProps()}>
        {buttons && (
          <>
            <button {...getButtonProps('previous')}>Previous</button>
            <button {...getButtonProps('next')}>Next</button>
          </>
        )}
        {indicators && (
          <div className={classes?.indicators}>
            {[...Array(pageCount)].map((_, index) => (
              <button key={index + 1} {...getIndicatorProps(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </fieldset>
    </div>
  );
};
