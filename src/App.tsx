import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './layouts/Header/header';
import Home from './layouts/Home';
import List from './layouts/List';
import { Outlet } from 'react-router-dom';
import movieService from './services/movieService';
import { MovieModel } from './models/Movie';

function App() {

  const [movies, setMovies] = useState<MovieModel[]>([]);

  const fetchMovies = async () => {
    try {
      const movie_list = await movieService.getMovies();

      console.log(movie_list);

      setMovies(movie_list);
    } catch (error) {
      console.log('Error en App: ', error)
    }
  }

  useEffect(() => {
    fetchMovies();

   


  }, [])

  return (
    <div>
      <Header></Header>
      <Home></Home>
      <List movies={movies}></List>
    </div>
  );
}

export default App;
