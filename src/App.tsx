import './App.css';
import { Route, Routes } from 'react-router-dom';
import { RoutesList } from './config/routes.ts';
import { SearchPage } from './pages/SearchPage.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { Header } from './components/header/Header.jsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={RoutesList.search} element={<SearchPage />} />
        <Route path={RoutesList.home} element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
