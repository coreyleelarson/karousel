import { Story } from "@storybook/react";
import { Karousel as KarouselComponent, KarouselProps } from ".";

export default {
  title: "Karousel",
  component: KarouselComponent,
};

const Template: Story<KarouselProps> = (args: any) => (
  <KarouselComponent {...args}>
    <span>Slide 1</span>
    <span>Slide 2</span>
    <span>Slide 3</span>
  </KarouselComponent>
);

export const Karousel = Template.bind({});
Karousel.args = { buttons: true, indicators: true };
