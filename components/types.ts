/**
 * @format html
 */
export type HTML = string;

/**
 * @format image-uri
 */
export type Image = string;

/**
 * @format video-uri
 */
export type Video = string;

export interface Instagram {
  data: Datum[];
  paging: Paging;
}

interface Datum {
  media_url: string;
  media_type: MediaType;
  caption: string;
  permalink: string;
  id: string;
}

enum MediaType {
  CarouselAlbum = "CAROUSEL_ALBUM",
  Video = "VIDEO",
}

interface Paging {
  cursors: Cursors;
  next: string;
}

interface Cursors {
  before: string;
  after: string;
}
