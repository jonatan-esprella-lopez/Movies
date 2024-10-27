import "./pages-home.css"
import { useEffect, useState } from "react";
import { CardMovie } from "../../../components/card-movie";
import { ModalDetailMovie } from "../../../components/modal-details-movie/modal-detail-movie";
import { useMovieStore } from "../../../stores/movie-store";
import { getMoviesLessValued } from "../../../services/movie-service";
import { SingleMovieDetails } from "../../../interfaces/movie.interface";

export function LessValued(): JSX.Element {
  const{ 
    modalMovie 
  } = useMovieStore();
  const [movies, setMovies] = useState<SingleMovieDetails[]>([]);

  useEffect(() => {
    getMoviesLessValued().then((movies) => {
      setMovies(movies)
    }).catch((error) => {
        console.error('Error al obtener las películas', error);
    });
  }, [getMoviesLessValued]);

  return (
    <main className="container-main">
      <h1>Menos Valoradas</h1>
      <section className="conteiner-movies">
        {movies.map((movie) => (
          <CardMovie  key={movie.id} movie={movie}/>
        ))}
      </section>
      {modalMovie && (
          <section className="conteniner-modal-movie">
            <ModalDetailMovie />
          </section>
        )}
    </main>
  );
}
