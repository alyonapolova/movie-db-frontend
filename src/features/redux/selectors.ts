import { RootState } from '../../store';

export const moviesSelector = (state: RootState) => state.movies.moviesList;
export const favMoviesSelector = (state: RootState) => state.movies.favMovies;
export const pageSelector = (state: RootState) => state.movies.page;
export const totalPagesSelector = (state: RootState) =>
  state.movies.totalPages ?? 0;
