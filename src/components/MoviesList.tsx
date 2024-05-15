import { useDispatch } from 'react-redux';
import { addToFav } from '../features/favMovies/favMoviesSlice';

const IMG_URL = 'https://image.tmdb.org/t/p/w300';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

interface MoviesListProps {
  results: Movie[];
}

export const MoviesList: React.FC<MoviesListProps> = ({ results }) => {
  const dispatch = useDispatch();

  const handleClick = (mov) => {
    console.log(mov);
    dispatch(addToFav(mov));
  };

  return (
    <ul>
      {results &&
        results.map((item) => (
          <li key={item.id}>
            <img src={`${IMG_URL}/${item.poster_path}`} />
            <p>{item.title}</p>
            <button type="button" onClick={() => handleClick(item)}>
              Add to fav
            </button>
          </li>
        ))}
    </ul>
  );
};
