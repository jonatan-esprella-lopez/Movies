import { useEffect, useState } from "react";
import { useMovieStore } from "../../stores/movie-store";

import { imageApi } from "../../services/movie-api";
import { getMoviesMostValued } from "../../services/movie-service";

import { HeaderNav } from "../../components/header";
import { DateSelector } from "./components/date-selector";
import { Footer } from "../../components/footer/footer";
import { SingleMovieDetails } from "../../interfaces/movie.interface";
import "./cartelera.css";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const Cartelera = (): JSX.Element => {
  const {
      selectedMovie,
      setSelectedMovie
  } = useMovieStore()

  const {
    id = 0,
    title = "",    
  } = selectedMovie || {};

  const [movies, setMovies] = useState<SingleMovieDetails[]>([]);
  const [imagen, setImagen] = useState<string | undefined>();
  const navigate = useNavigate();

  const [seatMapPerMovie, setSeatMapPerMovie] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    getMoviesMostValued().then((movies) => {
      setMovies(movies);
    });
  }, []);

  const handleMovieSelected = (movie: SingleMovieDetails): void => {
    setSelectedMovie(movie);
    setImagen(imageApi(movie.poster_path, "w400"));
    window.scrollTo({ top: 425, behavior: 'smooth' });
    
  
    navigate(getFormattedMoviePath());
  };

  const handleSeatMapChange = (movieId: string, seatMap: any) => {
    setSeatMapPerMovie((prevSeatMap) => ({
      ...prevSeatMap,
      [movieId]: seatMap, 
    }));
  };

  const getFormattedMoviePath = (): string => {
    return selectedMovie ? `/cartelera/${selectedMovie.id}` : "";
  };

  return (
    <main className="container-main">
      <HeaderNav />
      <h2>Selecciona una pelicula</h2>
      <section className="conteiner-movies-cartelera">
        {movies.map((movie) => {
          const portada = imageApi(movie.poster_path, "w200");
          return (
            <div className="cartelera-movie" key={movie.id} onClick={() => handleMovieSelected(movie)}>
              <img src={`${portada}`} alt="" />
            </div>
          );
        })}
      </section>
        <section className="Selected-mov-Cartelera">
          <img src={imagen} alt="" />
          <section className="conte">
            <h3>Seleccione el formato</h3>
            <nav className="nav-type-room">
              <Link to="./2D">
                <button>2D</button>
              </Link>
              <Link to="./3D">
                <button>3D</button>
              </Link>
              <Link to="./doble-atmos">
                <button>Doble atmos</button>
              </Link>
              <Link to="./4D">
                <button>4D</button>
              </Link>
              <Link to="./Reality">
                <button>Realidad virtual</button>
              </Link>
            </nav>
            <p>{title}</p>
            <Outlet/>
          </section>
        </section>
              <DateSelector/>
      <Footer />
    </main>
  );
};
