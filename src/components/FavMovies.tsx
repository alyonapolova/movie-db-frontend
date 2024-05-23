import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { getGenres } from '../api';
import { removeFromFav } from '../features/redux/slice';
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
  const [genresNames, setGenresNames] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  const fetchGenres = useCallback(async () => {
    const response = await getGenres();
    dispatch(getAllGenres(response));
  }, [dispatch]);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const favGenres = useMemo(() => {
    const genreIdsArray = favMovies?.map((mov) => mov.genre_ids);
    return new Set([].concat(...genreIdsArray));
  }, [favMovies]);

  useEffect(() => {
    const nameArray = allGenresList.filter((genre) => favGenres.has(genre.id));
    setGenresNames(nameArray);
  }, [favGenres, allGenresList]);

  const handleGenreSearch = (e) => {
    const genreId = Number(e.currentTarget.getAttribute('data-id'));
    setSelectedGenreId(genreId);
  };

  const handleRemoveFromFav = (mov) => {
    dispatch(removeFromFav(mov));
  };

  const filteredMovies = useMemo(() => {
    let movies = favMovies;

    if (selectedGenreId) {
      movies = movies.filter((item) =>
        item.genre_ids.includes(selectedGenreId)
      );
    }

    if (query) {
      movies = movies.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase().trim())
      );
    }

    return movies;
  }, [favMovies, selectedGenreId, query]);

  const handleClearFilters = () => {
    setSelectedGenreId(null);
  };

  return (
    <div>
      <h2>Your library</h2>
      <h3>Filter by genre</h3>
      <button type="button" onClick={handleClearFilters}>
        Clear Filters
      </button>
      <div className="genresList">
        {genresNames.map((item) => (
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
        {filteredMovies.map((item) => (
          <li className="item" key={item.id}>
            <img src={`${IMG_URL}/${item.poster_path}`} alt={item.title} />
            {item.title}
            <button type="button" onClick={() => handleRemoveFromFav(item)}>
              remove from fav
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
