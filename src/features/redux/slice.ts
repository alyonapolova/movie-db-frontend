import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchMoviesThunk } from './thunk.ts/fetchMoviesThunk';

export interface IMoviesList {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MoviesState {
  moviesList: IMoviesList[];
  favMovies: IMoviesList[];
  page: number;
  totalPages: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  moviesList: [],
  favMovies: [],
  page: 1,
  totalPages: null,
  isLoading: false,
  error: null,
};

export const MoviesSlice = createSlice({
  name: 'favoriteMovies',
  initialState,
  reducers: {
    addToFav(state, action: PayloadAction<IMoviesList>) {
      const existingIndex = state.favMovies.findIndex(
        (mov) => mov.id === action.payload.id
      );

      if (existingIndex === -1) {
        state.favMovies.push(action.payload);
      } else {
        state.favMovies[existingIndex] = action.payload;
      }
    },
    removeFromFav(state, action: PayloadAction<{ id: number }>) {
      state.favMovies = state.favMovies.filter(
        (item) => item.id !== action.payload.id
      );
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchMoviesThunk.fulfilled,
        (
          state,
          action: PayloadAction<{ results: IMoviesList[]; total_pages: number }>
        ) => {
          state.moviesList = action.payload.results;
          state.totalPages = action.payload.total_pages;
        }
      )
      .addCase(
        fetchMoviesThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? 'An unknown error occurred';
        }
      );
  },
});

export const { addToFav, removeFromFav, setPage } = MoviesSlice.actions;
