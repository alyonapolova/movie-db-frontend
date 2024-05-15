import { ChangeEvent, useState } from 'react';
import { MoviesList } from '../components/MoviesList';
import { Search } from '../components/Search';
import { getSearch } from '../api';
import { Link } from 'react-router-dom';

export const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  const getData = async () => {
    const data = await getSearch(query);
    setMovies(data);
  };

  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearQuery = () => {
    setQuery('');
    setMovies([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div>
      <Link to="/">Home Page</Link>
      <Search
        query={query}
        onChangeQuery={onChangeQuery}
        clearQuery={clearQuery}
        handleSubmit={handleSubmit}
      />
      <MoviesList {...movies} />
    </div>
  );
};
