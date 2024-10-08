import { useEffect } from 'react';

import "../../style/inicio-movie.css";
import { HeaderNav } from "../../components/header";
import { MovieSlider } from "../../components/movie-slider/movie-slider";
import { Outlet } from 'react-router-dom';
import { useMovieStore } from '../../stores/movie-store';

export function Home() {
  const { 
    query,
    setQuery,
    fetchPopularMovies
  } = useMovieStore()
  
  useEffect(() => {
    fetchPopularMovies();
  }, [fetchPopularMovies])

  return (
    <main className="container-main">
      <HeaderNav
        query={query}
        updateQuery={setQuery}
      />

      <MovieSlider /> 
      <Outlet />      
    </main>
  );
};