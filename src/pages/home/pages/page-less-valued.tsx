import { useEffect, useState } from "react";

import { CardMovie } from "@/components/card-movie";
import { ModalDetailMovie } from "@/components/modal-details-movie/modal-detail-movie";
import { useMovieStore } from "@/stores/movie-store";

import "./pages-home.css";

export function LessValued() {
  const [modalMovie, setModalMovie] = useState<Boolean>(false)
  const {
    lessValuedMovies,
    loadLessValuedMovies,
  } = useMovieStore();

  useEffect(() => {
    loadLessValuedMovies()
  }, []);

  return (
    <main className="container-main">
      <h1>Menos Valoradas</h1>
      <section className="conteiner-movies">
        {lessValuedMovies.map((movie) => (
          <CardMovie  key={movie.id} movie={movie} setModalMovie={setModalMovie}/>
        ))}
      </section>
      {modalMovie && (
          <section className="conteniner-modal-movie">
            <ModalDetailMovie setModalMovie={setModalMovie}/>
          </section>
        )}
    </main>
  );
}
