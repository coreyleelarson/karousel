import { Karousel } from "@karousel/react";

export const DocsOverview = () => {
  return (
    <>
      <h1>Overview</h1>
      <Karousel
        classes={{
          button: 'testing-button',
          container: 'testing-container',
          track: 'testing-track',
        }}
        slidesToScroll={2}
        slidesToShow={3}
      >
        <span>Item 1</span>
        <span>Item 2</span>
        <span>Item 3</span>
        <span>Item 4</span>
        <span>Item 5</span>
        <span>Item 6</span>
      </Karousel>
    </>
  );
}
