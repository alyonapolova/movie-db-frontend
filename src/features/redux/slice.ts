import { createSlice } from '@reduxjs/toolkit';
import { fetchMoviesThunk } from './thunk.ts/fetchMoviesThunk';

const initialState = {
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
    addToFav(state, action) {
      const existingIndex = state.favMovies.findIndex(
        (mov) => mov.id === action.payload.id
      );

      if (existingIndex === -1) {
        state.favMovies.push(action.payload);
      } else {
        state.favMovies[existingIndex] = action.payload;
      }
    },
    removeFromFav(state, action) {
      state.favMovies = state.favMovies.filter(
        (item) => item.id !== action.payload.id
      );
    },
    setPage(state, action) {
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
      })
      .addCase(fetchMoviesThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { addToFav, removeFromFav, setPage } = MoviesSlice.actions;
