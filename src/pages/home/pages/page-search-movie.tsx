import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NoFound } from "../../../components/no-found";
import { CardMovie } from "../../../components/card-movie";
import { ModalDetailMovie } from "../../../components/modal-details-movie/modal-detail-movie";
import { useMovieStore } from "../../../stores/movie-store";

export function SearchMovie() {
  const {
    modalMovie,
    selectedMovie,
    searchResults,
    fetchSearchResults
  } = useMovieStore();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.toString();

  useEffect(() => {
    fetchSearchResults(query);
  }, [fetchSearchResults]);

  return (
    <main className="container-main">
      <h1>Busqueda de pelicula</h1>
      <section className="main-container-movie conteiner-movies">
          {searchResults.map((movie) => (
            <CardMovie  key={movie.id} movie={movie} />
          ))}
      </section>
      {modalMovie && selectedMovie && (
          <section className="conteniner-modal-movie">
            <ModalDetailMovie />
          </section>
        )}

      {searchResults.length === 0 && <NoFound/>}
    </main>
  );
}
