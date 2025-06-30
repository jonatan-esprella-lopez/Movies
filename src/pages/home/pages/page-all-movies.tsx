import { useEffect, useState } from "react";

import { CardMovie } from "@/components/card-movie";
import { ModalDetailMovie } from "@/components/modal-details-movie/modal-detail-movie";
import { useMovieStore } from "@/stores/movie-store";

import "./pages-home.css";

export function AllMovies() {
  const [modalMovie, setModalMovie] = useState<Boolean>(false)
  const {
    movies, 
    loadMovies 
  } = useMovieStore();

  useEffect(() => {
    loadMovies();
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
