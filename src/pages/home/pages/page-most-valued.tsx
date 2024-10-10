import { useEffect } from "react";
import { Movie } from "../../../interfaces/movie.interface";
import { CardMovie } from "../../../components/card-movie";
import { ModalDetailMovie } from "../../../components/modal-details-movie/modal-detail-movie";
import { useMovieStore } from "../../../stores/movie-store";

export function MostValued() {
  const{
    selectedMovie,
    modalMovie,
    popularMovies,
    setModalMovie,
    setSelectedMovie,
    fetchMostValuedMovies
  } = useMovieStore()

  useEffect(() => {
    fetchMostValuedMovies();
  }, [fetchMostValuedMovies]);

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalMovie(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  return (
    <main className="container-main">
      <h1>Mas Valoradas</h1>
      <section className="main-container-movie conteiner-movies">
        {popularMovies.map((movie) => (
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
    </main>
  );
}
