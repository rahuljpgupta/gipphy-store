import { GiphyFetch } from "@giphy/js-fetch-api";
import { config } from '../config';
import { GIPPHY_COUNT_PER_REQUEST } from '../constants';

const giphyFetch = new GiphyFetch(config.gipphyApiKey);

export const fetchGifs = (offset) => giphyFetch.trending({ offset, limit: GIPPHY_COUNT_PER_REQUEST });

export const searchGifs = (text) => giphyFetch.search(text);
