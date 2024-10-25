import "./pages-home.css";
import { useEffect, useState } from "react";
import { CardMovie } from "../../../components/card-movie";
import { ModalDetailMovie } from "../../../components/modal-details-movie/modal-detail-movie";
import { SingleMovieDetails } from "../../../interfaces/movie.interface";
import { getAllMovies } from "../../../services/movie-service";
import { useMovieStore } from "../../../stores/movie-store";

export function AllMovies() {
  const { modalMovie } = useMovieStore();
  const [movie, setMovie] = useState<SingleMovieDetails[]>([]);

  useEffect(() => {
    getAllMovies()
      .then((movies) => {
        setMovie(movies);
      })
      .catch((error) => {
        console.error("Error al obtener las películas", error);
      });
  }, []);

  return (
    <main className="container-main">
      <h1>Todas las peliculas</h1>
      <section className="conteiner-movies">
        {movie.map((movie) => (
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
