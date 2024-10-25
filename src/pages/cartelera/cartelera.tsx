import { useEffect, useState } from "react";
import { Footer } from "../../components/footer/footer";
import { HeaderNav } from "../../components/header";
import { useMovieStore } from "../../stores/movie-store";
import { getMoviesMostValued } from "../../services/movie-service";
import { imageApi } from "../../services/movie-api";
import "./cartelera.css";
import { Movie } from "../../interfaces/movie.interface";
import { SeatMap } from "./componets/seat-map";
import { DateSelector } from "./componets/date-selector";

export const Cartelera = () => {
    const {
        selectedMovie,
        setSelectedMovie
    } = useMovieStore()
  const [movies, setMovies] = useState<Movie[]>([]);
  const [imagen, setImagen] = useState<string | undefined>();

  const [seatMapPerMovie, setSeatMapPerMovie] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    getMoviesMostValued().then((movies) => {
      setMovies(movies);
      console.log(selectedMovie)
    });
    console.log(selectedMovie);
  }, []);

  const handleMovieSelected = (movie: Movie): void => {
    setSelectedMovie(movie);
    setImagen(imageApi(movie.poster_path));
  };

  const handleSeatMapChange = (movieId: string, seatMap: any) => {
    setSeatMapPerMovie((prevSeatMap) => ({
      ...prevSeatMap,
      [movieId]: seatMap, 
    }));
  };

  return (
    <main className="container-main">
      <HeaderNav />
      
      <section className="conteiner-movies-cartelera">
        {movies.map((movie) => {
          const portada = imageApi(movie.poster_path);
          return (
            <div className="cartelera-movie" key={movie.id} onClick={() => handleMovieSelected(movie)}>
              <img src={`${portada}`} alt="" />
            </div>
          );
        })}
      </section>
      {/* <DateSelector/> */}
      {selectedMovie && (
        <section className="Selected-mov-Cartelera">
          <img src={imagen} alt="" />
          <section className="conte">
            <nav className="nav-type-room">
              <p>2D</p>
              <p>3D</p>
              <p>Doble atmos</p>
              <p>4D</p>
              <p>Realidad Virtual</p>
            </nav>
            <p>{selectedMovie.title}</p>
            {/* <SeatMap
              movieId={selectedMovie.id}
              seatMap={seatMapPerMovie[selectedMovie.id] || null} 
              onSeatMapChange={handleSeatMapChange} 
            /> */}
          </section>
        </section>
      )}
    
      <Footer />
    </main>
  );
};
