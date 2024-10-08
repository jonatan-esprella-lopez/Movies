import { useState, useEffect } from "react";
import { Movie } from "../../../interfaces/movie.interface";
import { CardMovie } from "../../../components/card-movie";
import { ModalDetailMovie } from "../../../components/modal-details-movie/modal-detail-movie";
import { useMovieStore } from "../../../stores/movie-store";


export function MostValued() {
  const{
    mostValuedMovie,
    fetchPopularMovies
  } = useMovieStore()

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
   fetchPopularMovies();
  }, [fetchPopularMovies]);

  return (
    <main className="container-main">
      <h1>Mas Valoradas</h1>
      <section className="main-container-movie conteiner-movies">
        {mostValuedMovie.map((movie) => (
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
