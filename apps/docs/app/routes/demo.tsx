import { Karousel } from "karousel";
import { useState } from "react";
import { LinksFunction } from "remix";
import { Checkbox } from "~/components/Checkbox";
import { CodeBlock } from "~/components/CodeBlock";
import { Slider } from "~/components/Slider";
import { useToggle } from "~/hooks/useToggle";
import demoStyles from "~/styles/routes/demo.css";

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

export const links: LinksFunction = () => [
  { href: demoStyles, rel: "stylesheet" },
];

export default function Demo() {
  const [slidesToScroll, setSlidesToScroll] = useState<number>(1);
  const [slidesToShow, setSlidesToShow] = useState<number>(2);
  const [autoplay, toggleAutoplay] = useToggle(true);
  const [buttons, toggleButtons] = useToggle(true);
  const [indicators, toggleIndicators] = useToggle(true);
  const [styled, toggleStyled] = useToggle(true);
  const codeProps = [
    autoplay && "autoplay",
    buttons && "buttons",
    indicators && "indicators",
    slidesToScroll > 1 && `slidesToScroll={${slidesToScroll}}`,
    slidesToShow > 1 && `slidesToShow={${slidesToShow}}`,
  ]
    .filter(Boolean)
    .join(" ");
  const code = `
<Karousel ${codeProps}>
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
    <div className="container">
      <h1>Demo</h1>
      <section>
        <Karousel
          autoplay={autoplay}
          buttons={buttons}
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
          checked={indicators}
          label="Indicators"
          onCheckedChange={toggleIndicators}
        />
        <Checkbox
          checked={styled}
          label="Styled"
          onCheckedChange={toggleStyled}
        />
      </section>
      <CodeBlock code={code} />
    </div>
  );
}
