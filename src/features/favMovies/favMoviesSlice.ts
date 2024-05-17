import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favMovies: JSON.parse(localStorage.getItem('favMovies')) || [],
};

export const favMoviesSlice = createSlice({
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
      localStorage.setItem('favMovies', JSON.stringify(state.favMovies));
    },
  },
});

export const { addToFav } = favMoviesSlice.actions;
