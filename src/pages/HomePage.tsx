import { Link } from 'react-router-dom';
import { FavMovies } from '../components/FavMovies';
import { Search } from '../components/Search';
import { ChangeEvent, FormEvent, useState } from 'react';

export const HomePage = () => {
  const [query, setQuery] = useState<string>('');
  const [newQuery, setNewQuery] = useState<string>('');

  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearQuery = () => {
    setQuery('');
    setNewQuery('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setNewQuery(query);
  };

  return (
    <div>
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
