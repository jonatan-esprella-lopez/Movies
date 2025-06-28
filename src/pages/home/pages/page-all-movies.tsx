import { useEffect, useState } from "react";

import { getAllMovies } from "@/services/movie-service";

import { CardMovie } from "@/components/card-movie";
import { ModalDetailMovie } from "@/components/modal-details-movie/modal-detail-movie";

import type { SingleMovieDetails } from "@/interfaces/single-movie-details";

import "./pages-home.css";

export function AllMovies() {
  const [modalMovie, setModalMovie] = useState<Boolean>(false)
  const [movies, setMovies] = useState<SingleMovieDetails[]>([]);

  useEffect(() => {
    getAllMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch((error) => {
        console.error("Error al obtener las películas", error);
      });
  }, []);

  return (
    <main className="container-main">
      <h1>Todas las peliculas</h1>
      <section className="conteiner-movies">
        {movies.map((movie) => (
          <CardMovie  key={movie.id} movie={movie} setModalMovie={setModalMovie}/>
        ))}
      </section>
      {modalMovie && (
          <section className="conteniner-modal-movie">
            <ModalDetailMovie setModalMovie={setModalMovie} />
          </section>
        )}
    </main>
  );
}
