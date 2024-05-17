import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres } from '../api';
import { getAllGenres } from '../features/genres/genresSlice';
import { genresSelector } from '../features/genres/genresSelectors';

const IMG_URL = 'https://image.tmdb.org/t/p/w300';

export const FavMovies = ({ query }) => {
  const allGenresList = useSelector(genresSelector);
  const dispatch = useDispatch();
  const [genresNames, setGenresNames] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  const favMovies = useAppSelector((state) => state.favorite.favMovies);

  const searchMovies = favMovies.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase().trim())
  );

  const favGenres = useMemo(() => {
    const genreIdsArray = favMovies.map((mov) => mov.genre_ids);
    return new Set([].concat(...genreIdsArray));
  }, [favMovies]);

  const fetchGenres = useCallback(async () => {
    const response = await getGenres();
    dispatch(getAllGenres(response));
  }, []);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    const nameArray = allGenresList.filter((genre) => favGenres.has(genre.id));
    setGenresNames(nameArray);
  }, [favGenres, allGenresList]);

  const handleGenreSearch = (e) => {
    const genreId = e.currentTarget.getAttribute('data-id');

    setSelectedGenreId(genreId);
  };

  console.log(selectedGenreId);
  const filteredMoviesByGenre = selectedGenreId
    ? favMovies.filter((item) => item.genre_ids.includes(selectedGenreId))
    : favMovies;

  console.log(filteredMoviesByGenre);
  return (
    <>
      <div>
        <h2>Your library</h2>
        <h3>Filter by genre</h3>
        <ul className="genresList">
          {genresNames &&
            genresNames.map((item) => (
              <li
                className="genreItem"
                key={item.id}
                data-id={item.id}
                onClick={handleGenreSearch}
              >
                {item.name}
              </li>
            ))}
        </ul>
        <ul className="container">
          {query
            ? searchMovies.map((item) => (
                <li className="item" key={item.id}>
                  <img src={`${IMG_URL}/${item.poster_path}`} />
                  {item.title}
                </li>
              ))
            : favMovies.map((item) => (
                <li className="item" key={item.id}>
                  <img src={`${IMG_URL}/${item.poster_path}`} />
                  {item.title}
                </li>
              ))}
        </ul>
      </div>
    </>
  );
};
