import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genresList: [],
};

export const genresSlice = createSlice({
  name: 'genresAction',
  initialState,
  reducers: {
    getAllGenres(state, action) {
      state.genresList = action.payload;
    },
  },
});

export const { getAllGenres } = genresSlice.actions;
