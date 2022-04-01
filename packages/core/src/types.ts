export interface KarouselModelValues {
  id?: string;
  options?: Partial<KarouselOptions>;
  updater?: VoidFunction;
}
export interface KarouselOptions {
  autoplay: boolean;
  autoplaySpeed: number;
  classes: Record<string, string>,
  draggable: boolean;
  slidesToScroll: number;
  slidesToShow: number;
  speed: number;
}