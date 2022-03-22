export interface KarouselOptions {
  autoplay: boolean;
  autoplaySpeed: number;
  buttons: boolean;
  classes: Record<string, string>;
  draggable: boolean;
  indicators: boolean;
  responsive: ResponsiveKarouselOption[];
  slidesToScroll: number;
  slidesToShow: number;
  speed: number;
}

export interface ResponsiveKarouselOption {
  breakpoint: number;
  options: Omit<KarouselOptions, 'responsive'>;
}

export interface AutoplayOptions extends KarouselOptions {
  onNext: () => void;
}

export interface DraggableOptions extends KarouselOptions {
  onDragEnd?: () => void;
  onDragStart?: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export interface PagingOptions extends KarouselOptions {
  slideCount: number;
}

export interface ResponsiveOptions extends KarouselOptions {}

export interface TrackOptions extends KarouselOptions {
  currentPage: number;
  draggedX: number;
  pageCount: number;
  slideCount: number;
}