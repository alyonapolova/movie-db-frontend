import { Link } from 'react-router-dom';
import { FavMovies } from '../components/FavMovies';
import { Search } from '../components/Search';
import { ChangeEvent, useState } from 'react';

export const HomePage = () => {
  const [query, setQuery] = useState('');
  const [newQuery, setNewQuery] = useState('');

  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearQuery = () => {
    setQuery('');
    setNewQuery('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewQuery(query);
  };

  return (
    <div>
      <Link to="/search">Search</Link>
      <Search
        query={query}
        onChangeQuery={onChangeQuery}
        clearQuery={clearQuery}
        handleSubmit={handleSubmit}
      />
      <FavMovies query={newQuery} />
    </div>
  );
};
