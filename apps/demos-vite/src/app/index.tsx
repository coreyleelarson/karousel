import { Karousel } from "@karousel/core";
import styles from "./styles.module.css";

export const App = () => {
  return (
    <Karousel
      autoplay
      autoplaySpeed={5000}
      buttons
      classes={{
        container: styles.carousel,
        button: styles.button,
        buttonNext: styles.next,
        buttonPrevious: styles.previous,
        indicator: styles.indicator,
        indicatorActive: styles.active,
        indicators: styles.indicators,
        slide: styles.slide,
      }}
      indicators
      transitionSpeed={1000}
    >
      <span>Slide 1</span>
      <span>Slide 2</span>
      <span>Slide 3</span>
    </Karousel>
  );
};
