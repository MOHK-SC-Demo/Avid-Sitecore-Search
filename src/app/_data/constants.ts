import { DEFAULT_IMG_URL } from './customizations';

export const DEFAULT_IMAGE = DEFAULT_IMG_URL;

export const HIGHLIGHT_DATA: {
  pre: string;
  post: string;
  highlightTag: HighlightTag;
} = {
  pre: '<b>',
  post: '</b>',
  highlightTag: 'b',
};

export const BASE_PATH = process.env.SEARCH_PATH || '';
export const PAGE_EVENTS_DEFAULT = 'page';
export const PAGE_EVENTS_HOME = 'home';
export const PAGE_EVENTS_PDP = 'pdp';
export const PAGE_EVENTS_SEARCH = 'search';
export const ENTITY_CONTENT = 'content';
