import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { Genre, getGenres } from '../api';
import { IMoviesList, removeFromFav } from '../features/redux/slice';
import { favMoviesSelector } from '../features/redux/selectors';
import { genresSelector } from '../features/genres/genresSelectors';
import { getAllGenres } from '../features/genres/genresSlice';

const IMG_URL = 'https://image.tmdb.org/t/p/w300';

interface IPropTypes {
  query: string;
}

export const FavMovies: FC<IPropTypes> = ({ query }) => {
  const allGenresList = useAppSelector(genresSelector);
  const favMovies = useAppSelector(favMoviesSelector);
  const dispatch = useAppDispatch();
  const [genresNames, setGenresNames] = useState<Genre[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [filteredFavMovies, setFilteredFavMovies] = useState<IMoviesList[]>([]);

  const fetchGenres = useCallback(async () => {
    const response = await getGenres();
    dispatch(getAllGenres(response));
  }, [dispatch]);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const favGenres = useMemo<Set<number>>(() => {
    const genreIdsArray: number[][] = favMovies.map((mov) => mov.genre_ids);
    const flattenedGenreIds: number[] = genreIdsArray.flat();
    const uniqGenresIds: Set<number> = new Set<number>(flattenedGenreIds);
    return uniqGenresIds;
  }, [favMovies]);

  useEffect(() => {
    const nameArray = allGenresList.filter((genre: Genre) =>
      favGenres.has(genre.id)
    );
    setGenresNames(nameArray);
  }, [favGenres, allGenresList]);

  const handleGenreSearch = (e: React.MouseEvent<HTMLElement>) => {
    const genreId = Number(e.currentTarget.getAttribute('data-id'));
    setSelectedGenreId(genreId);
  };

  const filterMoviesAndGenres = useCallback(() => {
    let filteredMovies = favMovies;

    if (selectedGenreId) {
      filteredMovies = filteredMovies.filter((item) =>
        item.genre_ids.includes(selectedGenreId)
      );
    }

    if (query) {
      filteredMovies = filteredMovies.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase().trim())
      );
    }

    setFilteredFavMovies(filteredMovies);

    const relevantGenres = allGenresList.filter((genre) =>
      filteredMovies.some((movie) => movie.genre_ids.includes(genre.id))
    );

    setGenresNames(relevantGenres);
  }, [favMovies, selectedGenreId, query, allGenresList]);

  useEffect(() => {
    filterMoviesAndGenres();
  }, [favMovies, selectedGenreId, query, filterMoviesAndGenres]);

  const handleRemoveFromFav = (mov: IMoviesList) => {
    dispatch(removeFromFav(mov));
  };

  const handleClearFilters = () => {
    setSelectedGenreId(null);
    setFilteredFavMovies(favMovies);
  };

  return (
    <div>
      <h2>Your library</h2>
      <h3>Filter by genre</h3>
      <button type="button" onClick={handleClearFilters}>
        Clear Filters
      </button>
      <div className="genresList">
        {genresNames.map((item: Genre) => (
          <button
            type="button"
            className="genreItem"
            key={item.id}
            data-id={item.id}
            onClick={handleGenreSearch}
          >
            {item.name}
          </button>
        ))}
      </div>
      <ul className="container">
        {filteredFavMovies.map((item) => (
          <li className="item" key={item.id}>
            <div
              className="movie-img"
              style={{
                backgroundImage: `url(${IMG_URL}/${item.poster_path})`,
              }}
            ></div>
            <p className="title">{item.title}s</p>
            <button type="button" onClick={() => handleRemoveFromFav(item)}>
              remove from fav
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
