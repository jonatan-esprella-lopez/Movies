import "./pages-home.css"
import { useEffect, useState } from "react";
import { NoFound } from "../../../components/no-found";
import { useSearchParams } from "react-router-dom";
import { CardMovie } from "../../../components/card-movie";
import { ModalDetailMovie } from "../../../components/modal-details-movie/modal-detail-movie";
import { useMovieStore } from "../../../stores/movie-store";

export function SearchMovie(): JSX.Element {
  const {
    searchResults,
    fetchSearchResults
  } = useMovieStore();

  const [searchParams] = useSearchParams();
  const [modalMovie, setModalMovie] = useState<Boolean>(false)
  const query = searchParams.get('query') || '';

  useEffect(() => {
    fetchSearchResults(query);
  }, [fetchSearchResults]);

  return (
    <main className="container-main">
      <h1>Busqueda de pelicula</h1>
      <section className="conteiner-movies">
          {searchResults.map((movie) => (
            <CardMovie  key={movie.id} movie={movie} setModalMovie={setModalMovie} />
          ))}
      </section>
      {modalMovie && (
          <section className="conteniner-modal-movie">
            <ModalDetailMovie setModalMovie={setModalMovie}/>
          </section>
        )}

      {searchResults.length === 0 && <NoFound/>}
    </main>
  );
}
