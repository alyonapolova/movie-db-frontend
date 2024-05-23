import { RootState } from '../../store';

export const genresSelector = (state: RootState) => state.genres.genresList;
