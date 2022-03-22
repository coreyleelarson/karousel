import { Story } from "@storybook/react";
import { Karousel as KarouselComponent, KarouselOptions } from ".";

export default {
  title: "Karousel",
  component: KarouselComponent,
};

const Template: Story<KarouselOptions> = (args: any) => (
  <KarouselComponent {...args} classes={{ button: 'button', buttonNext: 'next', buttonPrevious: 'previous', container: 'container', indicators: 'indicators', slide: 'slide' }}>
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
Karousel.args = {
  autoplay: false,
  buttons: true,
  indicators: true,
  slidesToScroll: 1,
  slidesToShow: 1,
};
