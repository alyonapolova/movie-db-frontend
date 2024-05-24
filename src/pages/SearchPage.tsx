import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { MoviesList } from '../components/MoviesList';
import { Search } from '../components/Search';
import { useAppDispatch, useAppSelector } from '../store';
import { pageSelector } from '../features/redux/selectors';
import { fetchMoviesThunk } from '../features/redux/thunk.ts/fetchMoviesThunk';

export const SearchPage = () => {
  const page = useAppSelector(pageSelector);
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();

  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearQuery = () => {
    setQuery('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(fetchMoviesThunk({ query, page: 1 }));
  };

  useEffect(() => {
    dispatch(fetchMoviesThunk({ query, page }));
  }, [page]);

  return (
    <div>
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
