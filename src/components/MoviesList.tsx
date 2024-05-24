import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store';
import { addToFav, removeFromFav } from '../features/redux/slice';
import {
  favMoviesSelector,
  moviesSelector,
  totalPagesSelector,
} from '../features/redux/selectors';
import { SearchResultItem } from '../api';
import { Paginator } from './Paginator';

const IMG_URL = 'https://image.tmdb.org/t/p/w300';

export const MoviesList = () => {
  const dispatch = useDispatch();
  const favMovies = useAppSelector(favMoviesSelector);
  const moviesList = useAppSelector(moviesSelector);
  const totalPages = useAppSelector(totalPagesSelector);

  const handleToggleClick = (mov: SearchResultItem) => {
    const isInFav = favMovies.some(
      (item: SearchResultItem) => item.id === mov.id
    );
    if (isInFav) {
      dispatch(removeFromFav(mov));
    } else {
      dispatch(addToFav(mov));
    }
  };

  return (
    <>
      <ul className="container">
        {moviesList.length !== 0 &&
          moviesList.map((item: SearchResultItem) => (
            <li className="item" key={item.id}>
              <div
                className="movie-img"
                style={{
                  backgroundImage: `url(${IMG_URL}/${item.poster_path})`,
                }}
              ></div>

              <p className="title">{item.title}</p>
              <button type="button" onClick={() => handleToggleClick(item)}>
                {favMovies.length !== 0 &&
                favMovies.some((mov: SearchResultItem) => mov.id === item.id)
                  ? 'remove from fav'
                  : ' Add to fav'}
              </button>
            </li>
          ))}
      </ul>

      {totalPages ? <Paginator /> : ''}
    </>
  );
};
