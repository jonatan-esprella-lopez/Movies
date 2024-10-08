import { useState, useEffect } from "react";
import { Movie } from "../../../interfaces/movie.interface";
import { getMoviesLessValued, fetchMovie } from "../../../services/movie-service";
import { CardMovie } from "../../../components/card-movie";
import { ModalDetailMovie } from "../../../components/modal-details-movie/modal-detail-movie";

export function LessValued() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [modalMovie, setModalMovie] = useState<boolean>(false);
  const [trailer, setTrailer] = useState<{ key: string } | null>(null);

  const handleOpenModal = async (movie: Movie) => {
    setSelectedMovie(movie);
    setModalMovie(true);
    
    const movieData = await fetchMovie(movie.id);
    if (movieData && movieData.key) {
      setTrailer({ key: movieData.key });
    } else {
      setTrailer(null); 
    }
  
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  useEffect(() => {
    const loadLessValuedMovies = async () => {
      const fetchedMovies = await getMoviesLessValued();
      setMovies(fetchedMovies);
    };

    loadLessValuedMovies();
  }, []);

  return (
    <main className="container-main">
      <h1>Menos Valoradas</h1>
      <section className="main-container-movie conteiner-movies">
        {movies.map((movie) => (
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
