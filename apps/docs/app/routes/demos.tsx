import { Karousel } from "karousel";

const classes = {
  button: 'button',
  buttonNext: 'button--next',
  buttonPrevious: 'button--previous',
  container: 'karousel',
  controls: 'controls',
  indicators: 'indicators',
  indicator: 'indicator',
  indicatorActive: 'indicator--active',
  slide: 'slide',
};

export default function Demos() {
  return (
    <div className="container">
      <h1>Demos</h1>
      <section>
        <h2>Unstyled</h2>
        <Karousel buttons indicators>
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
        <pre>
          
        </pre>
      </section>
      <hr />
      <section>
        <h2>Single Item</h2>
        <Karousel buttons classes={classes} indicators>
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
        <pre>
          
        </pre>
      </section>
      <hr />
      <section>
        <h2>Multiple Items</h2>
        <Karousel buttons classes={classes} indicators slidesToScroll={3} slidesToShow={3}>
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
      <hr />
      <section>
        <h2>Autoplay</h2>
        <Karousel autoplay buttons classes={classes} indicators>
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
    </div>
  );
}
