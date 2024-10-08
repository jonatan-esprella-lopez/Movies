import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NoFound } from "../../no-found/no-found";
import { Movie } from "../../../interfaces/movie.interface";
import { CardMovie } from "../../../components/card-movie";
import { ModalDetailMovie } from "../../../components/modal-details-movie/modal-detail-movie";
import { useMovieStore } from "../../../stores/movie-store";


export function SearchMovie() {
  const {
    searchResults,
    fetchSearchResults
  } = useMovieStore();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.toString();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [modalMovie, setModalMovie] = useState<boolean>(false);

  const handleOpenModal = async (movie: Movie) => {
    setSelectedMovie(movie);
    setModalMovie(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    fetchSearchResults(query);
  }, [fetchSearchResults]);

  return (
    <main className="container-main">
      <h1>Busqueda de pelicula</h1>
      <section className="main-container-movie conteiner-movies">
          {searchResults.map((movie) => (
            <CardMovie  key={movie.id} movie={movie} onOpenModal={handleOpenModal}/>
          ))}
      </section>
      {modalMovie && selectedMovie && (
          <section className="conteniner-modal-movie">
            <ModalDetailMovie
              modalMovie={modalMovie} 
              movieId={selectedMovie.id} 
              onClose={() => setModalMovie(false)}
            />
          </section>
        )}

      {searchResults.length === 0 && <NoFound/>}
    </main>
  );
}
