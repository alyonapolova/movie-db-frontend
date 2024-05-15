import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favMovies: JSON.parse(localStorage.getItem('favMovies')) || [],
};

export const favMoviesSlice = createSlice({
  name: 'favoriteMovies',
  initialState,
  reducers: {
    addToFav(state, action) {
      state.favMovies.push(action.payload);
      localStorage.setItem('favMovies', JSON.stringify(state.favMovies));
    },
  },
});

export const { addToFav } = favMoviesSlice.actions;
