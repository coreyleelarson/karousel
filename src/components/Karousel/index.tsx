import {
  Children,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface KarouselOptions {
  autoplay?: boolean;
  autoplaySpeed?: number;
  buttons?: boolean;
  classes?: Record<string, string>;
  indicators?: boolean;
  slidesToScroll?: number;
  slidesToShow?: number;
  speed?: number;
}

export const Karousel = (props: PropsWithChildren<KarouselOptions>) => {
  const {
    autoplay = false,
    autoplaySpeed = 3000,
    buttons = false,
    children,
    classes,
    indicators = false,
    slidesToScroll = 1,
    slidesToShow = 1,
    speed = 300,
  } = props;
  const [currentSegment, setCurrentSegment] = useState<number>(1);
  const autoplayTimer = useRef<NodeJS.Timer>();
  const slideCount = useMemo(() => Children.count(children), [children]);
  const segmentCount = useMemo(() => 1 + Math.ceil((slideCount - slidesToShow) / slidesToScroll), [slideCount, slidesToScroll, slidesToShow]);
  const trackWidth = useMemo(() => `${(100 * slideCount) / slidesToShow}%`, [slideCount, slidesToShow]);
  const trackOffset = useMemo(
    () => {
      const slideIndex = (currentSegment - 1) * slidesToScroll;
      const slidePush = currentSegment === segmentCount ? slidesToShow - (slideCount - slideIndex) : 0;
      return `${(slideIndex - slidePush) * -100 / slideCount}%`;
    },
    [currentSegment, segmentCount, slideCount, slidesToScroll, slidesToShow]
  );

  const goToPrevious = useCallback(() => setCurrentSegment(currentSegment - 1), [currentSegment]);
  const goToNext = useCallback(() => setCurrentSegment(currentSegment + 1), [currentSegment]);

  const startTimer = useCallback(() => {
    if (autoplay) {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
      autoplayTimer.current = setInterval(goToNext, autoplaySpeed);
    }
  }, [autoplay, autoplaySpeed, autoplayTimer, goToNext]);

  const pauseTimer = useCallback(() => {
    if (autoplay && autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
  }, [autoplay, autoplayTimer]);

  useEffect(() => {
    const timeoutTimer = setTimeout(startTimer, speed);
    return () => {
      clearTimeout(timeoutTimer);
      pauseTimer();
    };
  }, [autoplay, pauseTimer, startTimer, speed]);

  useEffect(() => {
    if (currentSegment < 1) {
      setCurrentSegment(segmentCount);
    } else if (currentSegment > segmentCount) {
      setCurrentSegment(1);
    }
  }, [currentSegment, segmentCount]);

  return (
    <div className={classes?.container}>
      <div className={classes?.carousel} style={{ overflow: "hidden" }}>
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
            <div className={classes?.slide} key={index} style={{ width: '100%' }}>
              {child}
            </div>
          ))}
        </div>
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
          {[...Array(segmentCount)].map((_, index) => (
            <button
              className={[
                classes?.indicator,
                index === currentSegment && classes?.indicatorActive,
              ]
                .filter(Boolean)
                .join(" ")}
              key={index}
              onClick={() => setCurrentSegment(index + 1)}
              type="button"
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
