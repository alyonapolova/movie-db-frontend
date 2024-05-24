import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchMoviesThunk } from './thunk.ts/fetchMoviesThunk';
import { SearchResultItem } from '../../api';

interface MoviesState {
  moviesList: SearchResultItem[];
  favMovies: SearchResultItem[];
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
    addToFav(state, action: PayloadAction<SearchResultItem>) {
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
      .addCase(fetchMoviesThunk.fulfilled, (state, action) => {
        state.moviesList = action.payload.results;
        state.totalPages = action.payload.total_pages;
      });
  },
});

export const { addToFav, removeFromFav, setPage } = MoviesSlice.actions;
