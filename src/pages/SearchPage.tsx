import { ChangeEvent, useEffect, useState } from 'react';
import { MoviesList } from '../components/MoviesList';
import { Search } from '../components/Search';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { moviesSelector, pageSelector } from '../features/redux/selectors';
import { fetchMoviesThunk } from '../features/redux/thunk.ts/fetchMoviesThunk';

export const SearchPage = () => {
  const moviesList = useAppSelector(moviesSelector);
  const page = useAppSelector(pageSelector);
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();

  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearQuery = () => {
    setQuery('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchMoviesThunk({ query, page: 1 }));
  };

  useEffect(() => {
    dispatch(fetchMoviesThunk({ query, page }));
  }, [page]);

  return (
    <div>
      <Link to="/">Home Page</Link>
      <Search
        query={query}
        onChangeQuery={onChangeQuery}
        clearQuery={clearQuery}
        handleSubmit={handleSubmit}
      />
      <MoviesList />
    </div>
  );
};
