import './App.css'
import {Counter} from "./features/counter/Counter.tsx";
import {useEffect} from "react";
import {getGenres, getSearch} from "./api";

function App() {
    useEffect(() => {
        getGenres().then(console.log);
        getSearch('shrek').then(console.log);
    }, []);


  return (
    <>
        The Greatest App Probably
        <Counter incrementValue={5} />
    </>
  )
}

export default App
