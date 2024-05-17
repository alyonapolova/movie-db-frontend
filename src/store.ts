import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { favMoviesSlice } from './features/favMovies/favMoviesSlice';
import { genresSlice } from './features/genres/genresSlice';

export const store = configureStore({
  reducer: {
    favorite: favMoviesSlice.reducer,
    genres: genresSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
