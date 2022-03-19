import {
  Children,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface KarouselProps {
  autoplay?: boolean;
  autoplaySpeed?: number;
  buttons?: boolean;
  classes?: Record<string, string>;
  indicators?: boolean;
  transitionSpeed?: number;
}

export const Karousel = (props: PropsWithChildren<KarouselProps>) => {
  const {
    autoplay = false,
    autoplaySpeed = 3000,
    buttons = false,
    children,
    classes,
    indicators = false,
    transitionSpeed = 300,
  } = props;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const slideCount = useMemo(() => Children.count(children), [Children]);
  const trackWidth = useMemo(() => `${100 * slideCount}%`, [slideCount]);
  const trackOffset = useMemo(
    () => `${currentIndex * -(100 / slideCount)}%`,
    [currentIndex, slideCount]
  );
  const autoplayTimer = useRef<NodeJS.Timer>();

  const goToSlide = (nextIndex: number) =>
    setCurrentIndex((previousIndex) => {
      if (nextIndex < 0) return slideCount - 1;
      if (nextIndex > slideCount - 1) return 0;
      return nextIndex;
    });

  const goToPrevious = () => goToSlide(currentIndex - 1);

  const goToNext = () => goToSlide(currentIndex + 1);

  const startTimer = () => {
    if (autoplay) {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
      autoplayTimer.current = setInterval(goToNext, autoplaySpeed);
    }
  };

  const pauseTimer = () => {
    if (autoplay && autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
  };

  useEffect(() => {
    const timeoutTimer = setTimeout(startTimer, transitionSpeed);
    return () => {
      clearTimeout(timeoutTimer);
      pauseTimer();
    };
  }, [currentIndex, transitionSpeed]);

  return (
    <div className={classes?.container} style={{ overflow: "hidden" }}>
      <div
        className={classes?.track}
        style={{
          display: "flex",
          transform: `translateX(${trackOffset})`,
          transition: "transform 300ms ease-in-out",
          width: trackWidth,
        }}
      >
        {Children.map(children, (child, index) => (
          <div className={classes?.slide} key={index} style={{ width: "100%" }}>
            {child}
          </div>
        ))}
      </div>
      {buttons && (
        <>
          <button
            className={[classes?.button, classes?.buttonPrevious]
              .filter(Boolean)
              .join(" ")}
            onClick={goToPrevious}
            type="button"
          >
            Previous
          </button>
          <button
            className={[classes?.button, classes?.buttonNext]
              .filter(Boolean)
              .join(" ")}
            onClick={goToNext}
            type="button"
          >
            Next
          </button>
        </>
      )}
      {indicators && (
        <div className={classes?.indicators}>
          {Children.map(children, (_, index) => (
            <button
              className={[
                classes?.indicator,
                index === currentIndex && classes?.indicatorActive,
              ]
                .filter(Boolean)
                .join(" ")}
              key={index}
              onClick={() => goToSlide(index)}
              type="button"
            >
              Slide {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
