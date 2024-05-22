import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genresList: [],
};

export const GenresSlice = createSlice({
  name: 'genresAction',
  initialState,
  reducers: {
    getAllGenres(state, action) {
      state.genresList = action.payload;
    },
  },
});

export const { getAllGenres } = GenresSlice.actions;
