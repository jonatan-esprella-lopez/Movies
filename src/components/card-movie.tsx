import Star from "../assets/movies/star.svg";
import { Movie } from "../interfaces/movie.interface";
import { imageApi } from "../services/movie-api";
import { useMovieStore } from "../stores/movie-store";

interface Props {
  movie: Movie;
}

export function CardMovie({ movie }: Props) {
  const { setModalMovie, setSelectedMovie } = useMovieStore();

  const handleSearchSubmit = () => {
    setSelectedMovie(movie);
    setModalMovie(true); 
  };

  const getStarsClass = (voteAverage: number) =>
    voteAverage > 5 ? "container-stars" : "container-stars-low";

  const portada = imageApi(movie.poster_path);

  return (
    <article key={movie.id}>
      {movie.poster_path ? (
        <div className="portada-movie" onClick={handleSearchSubmit}>
          <img src={`${portada}`} alt={movie.title} className="movie-image" />
          <div className={getStarsClass(movie.vote_average)}>
            <img src={Star} alt="star" />
            {parseFloat(movie.vote_average.toFixed(1))}
          </div>
        </div>
      ) : (
        <div>
          {/* No se que poner aqui XD */}
        </div>
      )}
    </article>
  );
}
