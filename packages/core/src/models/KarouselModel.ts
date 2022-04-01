import { KarouselModelValues, KarouselOptions } from "../types";
import { convertStyleObjToString } from "../utils";

let counter = 0;

export class KarouselModel {
  currentPage: number = 1;
  dragX: number = 0;
  dragXStart: number = 0;
  id: string;
  options: Partial<KarouselOptions>;
  isDragging: boolean = false;
  totalPages: number = 1;
  totalSlides: number;
  updater: VoidFunction;

  constructor(totalSlides: number, values?: KarouselModelValues) {
    const { id, options, updater } = values || {};
    this.id = id || `karousel-${++counter}`;
    this.options = options;
    this.updater = updater;
    this.totalSlides = totalSlides;
    this.initialize = this.initialize.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragMove = this.dragMove.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.goToPrevious = this.goToPrevious.bind(this);
    this.getContainerAttributes = this.getContainerAttributes.bind(this);
    this.getSliderAttributes = this.getSliderAttributes.bind(this);
    this.getTrackAttributes = this.getTrackAttributes.bind(this);
    this.getSlideAttributes = this.getSlideAttributes.bind(this);
    this.getControlsAttributes = this.getControlsAttributes.bind(this);
    this.getDirectionButtonAttributes = this.getDirectionButtonAttributes.bind(this);
    this.getAutoplayButtonAttributes = this.getAutoplayButtonAttributes.bind(this);
    this.getIndicatorButtonAttributes = this.getIndicatorButtonAttributes.bind(this);
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
    return `calc(${(this.slideIndex - this.slidePush) * -100 / this.totalSlides}% - ${this.dragXStart - this.dragX}px)`;
  }

  get trackWidth() {
    const { slidesToShow = 1 } = this.options;
    return `${(100 * this.totalSlides) / slidesToShow}%`;
  }

  private dragStart(e: MouseEvent) {
    const { draggable } = this.options;

    if (draggable) {
      document.addEventListener('mousemove', this.dragMove);
      document.addEventListener('mouseup', this.dragEnd);
  
      this.isDragging = true;
      this.dragX = e.clientX;
      this.dragXStart = e.clientX;
      this.updater();
    }
  }

  private dragMove(e: MouseEvent) {
    const { draggable } = this.options;

    if (draggable && this.isDragging) {
      this.dragX = e.clientX;
      this.updater();
    }
  }

  private dragEnd() {
    const { draggable } = this.options;

    if (draggable) {
      document.removeEventListener('mousemove', this.dragMove);
      document.removeEventListener('mouseup', this.dragEnd);
      
      const delta = this.dragXStart - this.dragX;
  
      this.isDragging = false;
      this.dragX = 0;
      this.dragXStart = 0;
      
      if (delta > 50) {
        this.goToNext();
      } else if (delta < -50) {
        this.goToPrevious();
      }
  
      this.updater();
    }
  }



  private goToPage(page: number) {
    if (page < 1) {
      this.currentPage = this.totalPages;
    } else if (page > this.totalPages) {
      this.currentPage = 1;
    } else {
      this.currentPage = page;
    }
    
    this.updater();
  }

  private goToNext() {
    this.goToPage(this.currentPage + 1);
  }

  private goToPrevious() {
    this.goToPage(this.currentPage - 1);
  }

  initialize() {
    const { slidesToShow = 1, slidesToScroll = 1 } = this.options;
    this.totalPages = 1 + Math.ceil((this.totalSlides - slidesToShow) / slidesToScroll);
    return this;
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
      onmousedown: this.dragStart,
      style: convertStyleObjToString({
        display: 'flex',
        transform: `translateX(${this.trackOffset})`,
        transition: !this.isDragging && `transform ${speed}ms ease-in-out`,
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
      'aria-label': 'Carousel Buttons',
      class: classes?.controls,
    };
  }

  getDirectionButtonAttributes(direction: 'next' | 'previous') {
    const { classes } = this.options;

    return {
      'aria-label': direction === 'next' ? 'Next Page' : 'Previous Page',
      class: classes?.button,
      onclick: direction === 'next' ? this.goToNext : this.goToPrevious,
      type: 'button',
    };
  }

  getAutoplayButtonAttributes() {
    const { classes } = this.options;

    return {
      class: classes?.button,
      type: 'button',
    };
  }

  getIndicatorButtonAttributes(page: number) {
    const { classes } = this.options;

    return {
      'aria-label': `Page ${page}`,
      class: classes?.indicator,
      onclick: () => this.goToPage(page),
      type: 'button',
    };
  }
}