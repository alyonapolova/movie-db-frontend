import axios from 'axios';
import { api_key, base_url } from '../config';
import { Genre, GenreResponse, SearchResult } from './interfaces.ts';

axios.defaults.baseURL = base_url;

export async function getSearch(
  text: string,
  page = 1,
  perPage = 6
): Promise<SearchResult> {
  const res = await axios.get<SearchResult>('/search/movie', {
    params: {
      api_key,
      region: 'hu',
      query: text,
      page,
      perPage,
    },
  });

  if (res.data.results.length === 0) {
    throw new Error('No data');
  }

  return res.data;
}

export async function getGenres(): Promise<Genre[]> {
  const res = await axios.get<GenreResponse>('/genre/movie/list', {
    params: {
      api_key,
      language: 'en-EN',
    },
  });

  return res.data.genres;
}
