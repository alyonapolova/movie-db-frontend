import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IGenres {
  id: number;
  name: string;
}

interface IGenresState {
  genresList: IGenres[];
}

const initialState: IGenresState = {
  genresList: [],
};

export const GenresSlice = createSlice({
  name: 'genresAction',
  initialState,
  reducers: {
    getAllGenres(state, action: PayloadAction<IGenres[]>) {
      state.genresList = action.payload;
    },
  },
});

export const { getAllGenres } = GenresSlice.actions;
