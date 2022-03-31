import { KarouselOptions } from '@karousel/core';
import { Children, PropsWithChildren, useMemo } from 'react';
import { useKarousel } from '../../hooks';

export type KarouselProps = PropsWithChildren<Partial<KarouselOptions>>;

export const Karousel = (props: KarouselProps) => {
  const { children, ...options } = props;
  const totalItems = useMemo(() => Children.count(children), [children]);
  const karousel = useKarousel(totalItems, options);

  return (
    <div {...karousel.getContainerProps()}>
      <div {...karousel.getSliderProps()}>
        <div {...karousel.getTrackProps()}>
          {Children.map(children, (child, index) => (
            <div key={index} {...karousel.getSlideProps(index + 1)}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <fieldset {...karousel.getControlsProps()}>
        <button {...karousel.getButtonProps('previous')} type="button">
          Previous
        </button>
        <button {...karousel.getButtonProps('next')} type="button">
          Next
        </button>
        <ul>
          {[...Array(karousel.totalPages)].map((_, index) => (
            <li key={index}>
              <button {...karousel.getIndicatorProps(index + 1)} type="button">
                Page {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </fieldset>
    </div>
  );
}