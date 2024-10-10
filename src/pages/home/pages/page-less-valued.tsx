import { useEffect } from "react";
import { Movie } from "../../../interfaces/movie.interface";
import { CardMovie } from "../../../components/card-movie";
import { ModalDetailMovie } from "../../../components/modal-details-movie/modal-detail-movie";
import { useMovieStore } from "../../../stores/movie-store";

export function LessValued() {
  const {
    modalMovie,
    lessValuedMovie,
    selectedMovie,
    setSelectedMovie,
    setModalMovie,
    fetchLessValuedMovies
  } = useMovieStore()

    useEffect(() => {
    fetchLessValuedMovies();
  }, [fetchLessValuedMovies]);

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalMovie(true);
  };

  return (
    <main className="container-main">
      <h1>Menos Valoradas</h1>
      <section className="main-container-movie conteiner-movies">
        {lessValuedMovie.map((movie) => (
          <CardMovie  key={movie.id} movie={movie} onOpenModal={handleOpenModal}/>
        ))}
      </section>
      {modalMovie && selectedMovie && (
          <section className="conteniner-modal-movie">
            <ModalDetailMovie
              movieId={selectedMovie.id} 
            />
          </section>
        )}
    </main>
  );
}
