import { useEffect, useState } from "react";
import { Movie } from "../../../interfaces/movie.interface";
import { CardMovie } from "../../../components/card-movie";
import { ModalDetailMovie } from "../../../components/modal-details-movie/modal-detail-movie";
import { useMovieStore } from "../../../stores/movie-store";



export function AllMovies() {
  const {
    popularMovies,
    fetchPopularMovies
  } = useMovieStore()

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [modalMovie, setModalMovie] = useState<boolean>(false);
  
  useEffect(() => {
    fetchPopularMovies();
  }, [fetchPopularMovies])

  const handleOpenModal = async (movie: Movie) => {
    setSelectedMovie(movie);
    setModalMovie(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main className="container-main">
      <h1>Todas las Películas</h1>
      
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
