import { Karousel } from "karousel";
import { useState } from "react";
import { useToggle } from "~/hooks/useToggle";

// const classes = {
//   button: 'button',
//   buttonNext: 'button--next',
//   buttonPrevious: 'button--previous',
//   container: 'karousel',
//   controls: 'controls',
//   indicators: 'indicators',
//   indicator: 'indicator',
//   indicatorActive: 'indicator--active',
//   slide: 'slide',
// };

export default function Demos() {
  const [slidesToShow, setSlidesToShow] = useState<number>(2);
  const [buttons, toggleButtons] = useToggle(false);
  const [indicators, toggleIndicators] = useToggle(false);

  return (
    <div className="container">
      <h1>Demos</h1>
      <section>
        <h2>Unstyled</h2>
        <Karousel
          buttons={buttons}
          indicators={indicators}
          slidesToShow={slidesToShow}
        >
          <span>Item 1</span>
          <span>Item 2</span>
          <span>Item 3</span>
          <span>Item 4</span>
          <span>Item 5</span>
          <span>Item 6</span>
          <span>Item 7</span>
          <span>Item 8</span>
          <span>Item 9</span>
          <span>Item 10</span>
        </Karousel>
      </section>
      <input
        min={1}
        max={10}
        onChange={e => setSlidesToShow(Number(e.target.value))}
        step={1}
        type="range"
        value={slidesToShow}
      />
      <input checked={buttons} onChange={toggleButtons} type="checkbox" />
      <input checked={indicators} onChange={toggleIndicators} type="checkbox" />
    </div>
  );
}
