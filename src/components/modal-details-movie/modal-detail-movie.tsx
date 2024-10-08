import { useMovieDetails } from "../../hooks/use-movie-details"
import { useState } from "react";
import CloseIcon from "../../assets/modal/Icon.svg";
import YouTube from "react-youtube";
import { ButtonMovie } from "../../pages/home/components/button-movie";
import { StarRating } from "./star-rating";
import { ModalMoviesProps } from "./modal.interface";
import { fetchTrailer } from "../../services/movie-service";
import { imageApi } from "../../services/movie-api";

const URL_IMAGE = imageApi;

export const ModalDetailMovie = ({ modalMovie, movieId, onClose }: ModalMoviesProps) => {
  const movie = useMovieDetails(movieId);
  const [trailer, setTrailer] = useState<{ key: string } | null>(null);

  if (!modalMovie || !movie) return null;

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

    const fetchMovieTrailer = async () => {
      try {
        const fetchedTrailer = await fetchTrailer(movieId);
        if (fetchedTrailer && fetchedTrailer.key) {
          setTrailer({ key: fetchedTrailer.key });
        } else {
          setTrailer(null); 
        }
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
        setTrailer(null); 
      }
    };

    if (movieId) {
      fetchMovieTrailer();
    }

  return (
    <article className="contenedor-modal-details" onClick={onClose}>
      <div className="rotar-multiejes" onClick={handleModalClick}>
        <img src={`${URL_IMAGE}${movie.poster_path}`} className="portada-modal" alt="Movie Poster" />
        <StarRating voteAverage={movie.vote_average} />
      </div>
      <div className="details-modal" onClick={handleModalClick}>
        <button onClick={onClose} className="close-button">
          <img src={CloseIcon} alt="Cerrar" />
        </button>
        <h3 className="title-movie">{movie.title}</h3>
        <p className="description-movie">{movie.overview}</p>
        <div className="details-movie">
          {movie.release_date.substring(0, 4)} <span>●</span> 
          {movie.genres.map(genre => genre.name).join(' / ')} <span>●</span> 
          {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
        </div>
        {trailer && (
          <YouTube
            videoId={trailer.key}
            className="reproductor skeleton-image "
            containerClassName="youtube-container"
            opts={{
              playerVars: {
                autoplay: 1,
                controls: 1,
              },
            }}
          />
        )}
        <div className="conteiner-button-details">
          <ButtonMovie />
        </div>
      </div>
    </article>
  );
};
