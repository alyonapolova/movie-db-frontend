import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSearch } from '../../../api';

interface FetchMoviesArgs {
  query: string;
  page: number;
}

export const fetchMoviesThunk = createAsyncThunk(
  'movies/searchMovies',
  async ({ query, page }: FetchMoviesArgs) => {
    const data = await getSearch(query, page);
    return data;
  }
);
