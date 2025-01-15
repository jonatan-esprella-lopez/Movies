import { useMovieStore } from "../stores/movie-store";
import { imageApi } from "../services/movie-api";

import { CardMovieProps } from "../interfaces/common.interfaces";
import NoFoundMovie from "../assets/movies/movie-void.svg"
import Star from "../assets/movies/star.svg";

export function CardMovie({ movie }: CardMovieProps):JSX.Element {
  const { 
    setModalMovie, 
    setSelectedMovie 
  } = useMovieStore();

  const {
    title,
    poster_path,
    vote_average,
  } = movie;
  
  const handleSearchSubmit = (): void => {
    setSelectedMovie(movie);
    setModalMovie(true); 
  };

  const portada = imageApi(poster_path, "w300");

  return (
    <article>
          <div className="portada-movie" onClick={handleSearchSubmit}>
          <img src={poster_path ? portada : NoFoundMovie} alt={title} className="movie-image" />
          <div className={`container-stars${vote_average > 5 ? "" : "-low"}`}>
            <img src={Star} alt="star" />
            {vote_average.toFixed(1)}
          </div>
        </div>
    </article>
  );
}

