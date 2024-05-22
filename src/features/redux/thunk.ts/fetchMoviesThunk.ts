import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSearch } from '../../../api';

export const fetchMoviesThunk = createAsyncThunk(
  'movies/searchMovies',
  async ({ query, page }, { rejectWithValue }) => {
    try {
      const data = await getSearch(query, page);
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
