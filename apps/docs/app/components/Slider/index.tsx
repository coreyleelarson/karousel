import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps extends RadixSlider.SliderProps {
  label?: string;
}

export const Slider = (props: SliderProps) => {
  const { label, ...sliderProps } = props;

  return (
    <div className="slider-container">
      {label && <label>{label}</label>}
      <RadixSlider.Root {...sliderProps} className="slider">
        <RadixSlider.Track className="slider__track">
          <RadixSlider.Range className="slider__range" />
        </RadixSlider.Track>
        <RadixSlider.Thumb className="slider__thumb" />
      </RadixSlider.Root>
    </div>
  );
};
