import { KarouselOptions } from "../types";
import { convertStyleObjToString } from "../utils";

let counter = 0;

export class KarouselModel {
  id: string;
  options: Partial<KarouselOptions>;
  currentPage: number = 1;
  totalPages: number = 1;
  totalSlides: number;

  constructor(totalSlides: number, options: Partial<KarouselOptions>) {
    this.id = `karousel-${++counter}`;
    this.options = options;
    this.totalSlides = totalSlides;
    this.initialize = this.initialize.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.goToPrevious = this.goToPrevious.bind(this);
    this.getContainerAttributes = this.getContainerAttributes.bind(this);
    this.getSliderAttributes = this.getSliderAttributes.bind(this);
    this.getTrackAttributes = this.getTrackAttributes.bind(this);
    this.getSlideAttributes = this.getSlideAttributes.bind(this);
    this.getControlsAttributes = this.getControlsAttributes.bind(this);
    this.getButtonAttributes = this.getButtonAttributes.bind(this);
    this.getIndicatorAttributes = this.getIndicatorAttributes.bind(this);
  }

  get slideIndex() {
    const { slidesToScroll = 1 } = this.options;
    return (this.currentPage - 1) * slidesToScroll;
  }

  get slidePush() {
    const { slidesToShow = 1 } = this.options;
    return this.currentPage === this.totalPages ? slidesToShow - (this.totalSlides - this.slideIndex) : 0;
  }

  get activeSlides() {
    const { slidesToShow = 1 } = this.options;
    return Array.from({ length: slidesToShow }, (_, index) => (this.slideIndex - this.slidePush + index + 1));
  }

  get trackOffset() {
    return `${(this.slideIndex - this.slidePush) * -100 / this.totalSlides}%`;
  }

  get trackWidth() {
    const { slidesToShow = 1 } = this.options;
    return `${(100 * this.totalSlides) / slidesToShow}%`;
  }

  initialize() {
    const { slidesToShow = 1, slidesToScroll = 1 } = this.options;
    this.totalPages = 1 + Math.ceil((this.totalSlides - slidesToShow) / slidesToScroll);
    return this;
  }

  goToPage(page: number) {
    if (page < 1) {
      this.currentPage = this.totalPages;
    } else if (page > this.totalPages) {
      this.currentPage = 1;
    } else {
      this.currentPage = page;
    }
  }

  goToNext() {
    this.goToPage(this.currentPage + 1);
  }

  goToPrevious() {
    this.goToPage(this.currentPage - 1);
  }

  getContainerAttributes() {
    const { classes } = this.options;
    return {
      'aria-live': 'polite',
      class: classes?.container,
      id: this.id,
    };
  }

  getSliderAttributes() {
    const { classes } = this.options;

    return {
      class: classes?.slider,
      style: convertStyleObjToString({
        overflow: 'hidden',
      }),
    };
  }

  getTrackAttributes() {
    const { classes, speed = 300 } = this.options;

    return {
      class: classes?.track,
      style: convertStyleObjToString({
        display: 'flex',
        transform: `translateX(${this.trackOffset})`,
        transition: `transform ${speed}ms ease-in-out`,
        width: this.trackWidth,
      }),
    };
  }

  getSlideAttributes(slide: number) {
    const { classes } = this.options;

    return {
      'aria-hidden': !this.activeSlides.includes(slide),
      class: classes?.slide,
      style: convertStyleObjToString({
        width: '100%',
      }),
    };
  }

  getControlsAttributes() {
    const { classes } = this.options;

    return {
      'aria-controls': this.id,
      'aria-label': 'carousel buttons',
      class: classes?.controls,
    };
  }

  getButtonAttributes(direction: 'next' | 'previous') {
    const { classes } = this.options;

    return {
      class: classes?.button,
      onclick: () => direction === 'next'
        ? this.goToNext() : this.goToPrevious(),
      type: 'button',
    };
  }

  getIndicatorAttributes(page: number) {
    const { classes } = this.options;

    return {
      class: classes?.indicator,
      onclick: () => this.goToPage(page),
      type: 'button',
    };
  }
}