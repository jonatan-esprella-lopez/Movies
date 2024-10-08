import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NoFound } from "../../no-found/no-found";
import { getMoviesSearch, fetchMovie} from "../../../services/movie-service";
import { Movie } from "../../../interfaces/movie.interface";
import { CardMovie } from "../../../components/card-movie";
import { ModalDetailMovie } from "../../../components/modal-details-movie/modal-detail-movie";


export function SearchMovie() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.toString();

 

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
    const loadAllValuedMovies = async () => {
      const fetchedMovies = await getMoviesSearch(query);
      setMovies(fetchedMovies);
    };

    loadAllValuedMovies();
  }, [query]);

  return (
    <main className="container-main">
      <h1>Busqueda de pelicula</h1>
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

      {movies.length === 0 && <NoFound/>}
    </main>
  );
}
