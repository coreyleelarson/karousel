import { Story } from "@storybook/react";
import { Karousel as KarouselComponent, KarouselProps } from "../components/Karousel";

export default {
  title: "components/Karousel",
  component: KarouselComponent,
};

const Template: Story<KarouselProps> = (args: any) => (
  <KarouselComponent
    {...args}
    draggable
    slidesToShow={1}
    responsive={[
      { breakpoint: 496, options: { slidesToShow: 2 } },
      { breakpoint: 768, options: { slidesToShow: 4 } },
    ]}
  >
    <span>Slide 1</span>
    <span>Slide 2</span>
    <span>Slide 3</span>
    <span>Slide 4</span>
    <span>Slide 5</span>
    <span>Slide 6</span>
    <span>Slide 7</span>
    <span>Slide 8</span>
    <span>Slide 9</span>
    <span>Slide 10</span>
  </KarouselComponent>
);

export const Karousel = Template.bind({});
