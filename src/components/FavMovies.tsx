import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { Genre, SearchResultItem, getGenres } from '../api';
import { removeFromFav } from '../features/redux/slice';
import { favMoviesSelector } from '../features/redux/selectors';
import { genresSelector } from '../features/genres/genresSelectors';
import { getAllGenres } from '../features/genres/genresSlice';

const IMG_URL = 'https://image.tmdb.org/t/p/w300';

export const FavMovies = () => {
  const allGenresList = useAppSelector(genresSelector);
  const favMovies = useAppSelector(favMoviesSelector);
  const dispatch = useAppDispatch();
  const [selectedGenresIds, setSelectedGenresIds] = useState<number[]>([]);

  const fetchGenres = useCallback(async () => {
    const response = await getGenres();
    dispatch(getAllGenres(response));
  }, [dispatch]);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const handleGenreSearch = (id: number) => {
    setSelectedGenresIds((prev) =>
      prev.includes(id)
        ? prev.filter((genreId) => genreId !== id)
        : [...prev, id]
    );
  };

  const filteredFavMovies = useMemo(() => {
    let filteredMovies = [...favMovies];

    if (selectedGenresIds.length >= 1) {
      filteredMovies = filteredMovies.filter((item) =>
        selectedGenresIds.every((id) => item.genre_ids.includes(id))
      );
    }

    return filteredMovies;
  }, [selectedGenresIds, favMovies]);

  const favGenreIds = useMemo<Set<number>>(() => {
    const genreIdsArray: number[][] = filteredFavMovies.map(
      (mov) => mov.genre_ids
    );
    const flattenedGenreIds: number[] = genreIdsArray.flat();
    const uniqGenresIds: Set<number> = new Set<number>(flattenedGenreIds);
    return uniqGenresIds;
  }, [filteredFavMovies]);

  const favGenres = useMemo(() => {
    const nameArray = allGenresList.filter((genre: Genre) =>
      favGenreIds.has(genre.id)
    );

    return nameArray;
  }, [favGenreIds, allGenresList]);

  const handleRemoveFromFav = (mov: SearchResultItem) => {
    dispatch(removeFromFav(mov));
  };

  const handleClearFilters = () => {
    setSelectedGenresIds([]);
  };

  return (
    <div>
      <h2>Your library</h2>
      <h3>Filter by genre</h3>

      <div className="genresList">
        {favGenres.map((item: Genre) => (
          <button
            type="button"
            className="genreItem"
            key={item.id}
            data-id={item.id}
            onClick={() => handleGenreSearch(item.id)}
          >
            {item.name}
            {selectedGenresIds.includes(item.id) ? '+' : '-'}
          </button>
        ))}
        <button type="button" onClick={handleClearFilters}>
          Clear Filters
        </button>
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
