import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Karousel } from "karousel";
import { useState } from "react";
import { useToggle } from "~/hooks/useToggle";
import { Checkbox } from "../Checkbox";
import { CodeBlock } from "../CodeBlock";
import { Slider } from "../Slider";

const classes = {
  button: "button",
  buttonNext: "button--next",
  buttonPrevious: "button--previous",
  container: "karousel",
  controls: "controls",
  indicators: "indicators",
  indicator: "indicator",
  indicatorActive: "indicator--active",
  slide: "slide",
};

export const Configurator = () => {
  const [slidesToScroll, setSlidesToScroll] = useState<number>(1);
  const [slidesToShow, setSlidesToShow] = useState<number>(2);
  const [autoplay, toggleAutoplay] = useToggle(true);
  const [buttons, toggleButtons] = useToggle(true);
  const [draggable, toggleDraggable] = useToggle(true);
  const [indicators, toggleIndicators] = useToggle(true);
  const [styled, toggleStyled] = useToggle(true);
  const codeProps = [
    autoplay && "autoplay",
    buttons && "buttons",
    draggable && "draggable",
    indicators && "indicators",
    slidesToScroll > 1 && `slidesToScroll={${slidesToScroll}}`,
    slidesToShow > 1 && `slidesToShow={${slidesToShow}}`,
  ]
    .filter(Boolean)
    .join("\n  ");
  const code = `
<Karousel${codeProps.length > 0 ? `\n  ${codeProps}\n` : ""}>
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
  `;

  return (
    <section className="demo">
      <div className="demo__viewport">
        <Karousel
          autoplay={autoplay}
          buttons={buttons}
          draggable={draggable}
          classes={styled ? classes : undefined}
          indicators={indicators}
          slidesToScroll={slidesToScroll}
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
        <p>Configure the demo using the controls below.</p>
      </div>
      <div className="demo__code">
        <CodeBlock code={code} />
        <button
          className="demo__code__copy"
          onClick={() => navigator.clipboard.writeText(code)}
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </div>
      <div className="demo__controls">
        <Slider
          label="Slides To Scroll"
          min={1}
          max={10}
          onValueChange={(value) => setSlidesToScroll(value[0])}
          step={1}
          value={[slidesToScroll]}
        />
        <Slider
          label="Slides To Show"
          min={1}
          max={10}
          onValueChange={(value) => setSlidesToShow(value[0])}
          step={1}
          value={[slidesToShow]}
        />
        <Checkbox
          checked={autoplay}
          label="Autoplay"
          onCheckedChange={toggleAutoplay}
        />
        <Checkbox
          checked={buttons}
          label="Buttons"
          onCheckedChange={toggleButtons}
        />
        <Checkbox
          checked={draggable}
          label="Draggable"
          onCheckedChange={toggleDraggable}
        />
        <Checkbox
          checked={indicators}
          label="Indicators"
          onCheckedChange={toggleIndicators}
        />
        <Checkbox
          checked={styled}
          label="Styled"
          onCheckedChange={toggleStyled}
        />
      </div>
    </section>
  );
};
