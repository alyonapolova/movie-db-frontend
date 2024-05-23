import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store';
import {
  IMoviesList,
  addToFav,
  removeFromFav,
  setPage,
} from '../features/redux/slice';
import {
  favMoviesSelector,
  moviesSelector,
  pageSelector,
  totalPagesSelector,
} from '../features/redux/selectors';

const IMG_URL = 'https://image.tmdb.org/t/p/w300';

export const MoviesList = () => {
  const dispatch = useDispatch();
  const favMovies = useAppSelector(favMoviesSelector);
  const moviesList = useAppSelector(moviesSelector);
  const page = useAppSelector(pageSelector);
  const totalPages = useAppSelector(totalPagesSelector);

  const handleToggleClick = (mov: IMoviesList) => {
    const isInFav = favMovies.some((item: IMoviesList) => item.id === mov.id);
    if (isInFav) {
      dispatch(removeFromFav(mov));
    } else {
      dispatch(addToFav(mov));
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));
    }
  };

  return (
    <>
      <ul className="container">
        {moviesList.length !== 0 ? (
          moviesList.map((item: IMoviesList) => (
            <li className="item" key={item.id}>
              <img src={`${IMG_URL}/${item.poster_path}`} />
              <p>{item.title}</p>
              <button type="button" onClick={() => handleToggleClick(item)}>
                {favMovies.length !== 0 &&
                favMovies.some((mov: IMoviesList) => mov.id === item.id)
                  ? 'remove from fav'
                  : ' Add to fav'}
              </button>
            </li>
          ))
        ) : (
          <p>No data</p>
        )}
      </ul>

      {totalPages && totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
          {page > 2 && <span>...</span>}
          {page > 1 && (
            <button type="button" onClick={() => handlePageChange(page - 1)}>
              {page - 1}
            </button>
          )}
          <button type="button" className="current">
            {page}
          </button>
          {page < totalPages && (
            <button type="button" onClick={() => handlePageChange(page + 1)}>
              {page + 1}
            </button>
          )}
          {page < totalPages - 1 && <span>...</span>}
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </div>
      )}
    </>
  );
};
