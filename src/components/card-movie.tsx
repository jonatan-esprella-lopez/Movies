import { useMovieStore } from "../stores/movie-store";
import { imageApi } from "../services/movie-api";
import Star from "../assets/movies/star.svg";
import { CardMovieProps } from "../interfaces/common.interfaces";

export function CardMovie({ movie }: CardMovieProps):JSX.Element {
  const { 
    setModalMovie, 
    setSelectedMovie 
  } = useMovieStore();
  
  const handleSearchSubmit = () => {
    setSelectedMovie(movie);
    setModalMovie(true); 
  };

  const getStarsClass = (voteAverage: number) =>
    voteAverage > 5 ? "container-stars" : "container-stars-low";

  const voteAverage = movie.vote_average ?? 0;
  const portada = imageApi(movie.poster_path);

  return (
    <article key={movie.id}>
        <div className="portada-movie" onClick={handleSearchSubmit}>
          <img src={`${portada}`} alt={movie.title} className="movie-image" />
          <div className={getStarsClass(movie.vote_average)}>
            <img src={Star} alt="star" />
            {parseFloat(voteAverage.toFixed(1))}
          </div>
        </div>
    </article>
  );
}

