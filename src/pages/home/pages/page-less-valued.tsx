import { useEffect } from "react";
import { CardMovie } from "../../../components/card-movie";
import { ModalDetailMovie } from "../../../components/modal-details-movie/modal-detail-movie";
import { useMovieStore } from "../../../stores/movie-store";

export function LessValued() {
  const {
    modalMovie,
    lessValuedMovie,
    selectedMovie,
    fetchLessValuedMovies
  } = useMovieStore()

    useEffect(() => {
    fetchLessValuedMovies();
  }, [fetchLessValuedMovies]);

  return (
    <main className="container-main">
      <h1>Menos Valoradas</h1>
      <section className="main-container-movie conteiner-movies">
        {lessValuedMovie.map((movie) => (
          <CardMovie  key={movie.id} movie={movie}/>
        ))}
      </section>
      {modalMovie && selectedMovie && (
          <section className="conteniner-modal-movie">
            <ModalDetailMovie />
          </section>
        )}
    </main>
  );
}
