import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <Link to="/">Your movies</Link>
      <Link to="/search">Search movies</Link>
    </header>
  );
};
