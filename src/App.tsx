import './App.css';
import { useEffect } from 'react';
import { getGenres, getSearch } from './api';
import { Route, Routes } from 'react-router-dom';
import { RoutesList } from './config/routes.ts';
import { SearchPage } from './pages/SearchPage.tsx';
import { HomePage } from './pages/HomePage.tsx';

function App() {
  // useEffect(() => {
  //   getGenres().then(console.log);
  //   getSearch('shrek').then(console.log);
  // }, []);

  return (
    <>
      <Routes>
        <Route path={RoutesList.search} element={<SearchPage />} />
        <Route path={RoutesList.home} element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
