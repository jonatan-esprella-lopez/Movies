import { useEffect } from "react";
import { CardMovie } from "../../../components/card-movie";
import { ModalDetailMovie } from "../../../components/modal-details-movie/modal-detail-movie";
import { useMovieStore } from "../../../stores/movie-store";

export function AllMovies() {
  const {
    modalMovie,
    popularMovies,
    fetchPopularMovies,
  } = useMovieStore();

  useEffect(() => {
    fetchPopularMovies();
  }, [fetchPopularMovies]);

  return (
    <main className="container-main">
      <h1>Todas las Películas</h1>

      <section className="main-container-movie conteiner-movies">
        {popularMovies.map((movie) => (
          <CardMovie key={movie.id} movie={movie} />
        ))}
      </section>

      {modalMovie && (
        <section className="conteniner-modal-movie">
          <ModalDetailMovie/>
        </section>
      )}
    </main>
  );
}
