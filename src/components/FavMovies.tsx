import { useAppSelector } from '../store';
const IMG_URL = 'https://image.tmdb.org/t/p/w300';

export const FavMovies = ({ query }) => {
  const favMovies = useAppSelector((state) => state.favorite.favMovies);

  const searchMovies = favMovies.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase().trim())
  );

  return (
    <>
      <div>
        Favorites
        {query
          ? searchMovies.map((item) => (
              <div key={item.id}>
                <img src={`${IMG_URL}/${item.poster_path}`} />
                {item.title}
              </div>
            ))
          : favMovies.map((item) => (
              <div key={item.id}>
                <img src={`${IMG_URL}/${item.poster_path}`} />
                {item.title}
              </div>
            ))}
      </div>
    </>
  );
};
