import { KarouselOptions } from "./types"

export const applyDefaults = (options: Partial<KarouselOptions>): KarouselOptions => {
  const {
    autoplay = DefaultOptions.autoplay,
    autoplaySpeed = DefaultOptions.autoplaySpeed,
    buttons = DefaultOptions.buttons,
    classes = DefaultOptions.classes,
    draggable = DefaultOptions.draggable,
    indicators = DefaultOptions.draggable,
    slidesToScroll = DefaultOptions.slidesToScroll,
    slidesToShow = DefaultOptions.slidesToShow,
    speed = DefaultOptions.speed,
  } = options;

  return {
    autoplay,
    autoplaySpeed,
    buttons,
    classes,
    draggable,
    indicators,
    slidesToScroll,
    slidesToShow,
    speed,
  };
};

export const DefaultOptions = {
  autoplay: false,
  autoplaySpeed: 3000,
  buttons: false,
  classes: {},
  draggable: false,
  indicators: false,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 300,
}