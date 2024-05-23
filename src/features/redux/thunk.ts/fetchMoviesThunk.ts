import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSearch } from '../../../api';
import { IMoviesList } from '../slice';

interface FetchMoviesArgs {
  query: string;
  page: number;
}

interface FetchMoviesResponse {
  results: IMoviesList[];
  total_pages: number;
}

interface MyKnownError {
  error: string;
}

export const fetchMoviesThunk = createAsyncThunk<
  FetchMoviesResponse,
  FetchMoviesArgs,
  {
    rejectValue: MyKnownError;
  }
>('movies/searchMovies', async ({ query, page }, thunkApi) => {
  try {
    const data = await getSearch(query, page);
    return data as FetchMoviesResponse;
  } catch (err) {
    return thunkApi.rejectWithValue({ error: err.message });
  }
});
