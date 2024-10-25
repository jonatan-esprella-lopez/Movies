import { useEffect } from "react";
import { useMovieStore } from "../../stores/movie-store";
import { imageApi } from "../../services/movie-api";
import YouTube from "react-youtube";
import { ButtonMovie } from "../../pages/home/components/button-movie";
import { StarRating } from "./star-rating";
import CloseIcon from "../../assets/modal/Icon.svg";

export const ModalDetailMovie = (): JSX.Element => {
  const {
    selectedMovie,
    trailerMovie,
    setModalMovie,
    setSelectedMovieDetails,
  } = useMovieStore();

  const { 
    id = 0, 
    title = "", 
    overview = "", 
    poster_path = "", 
    vote_average = 0, 
    release_date = "", 
    genres = [], 
    runtime = 0 
  } = selectedMovie || {};

  useEffect(() => {
      setSelectedMovieDetails(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedMovie, setSelectedMovieDetails]);

  const handleCloseModal = () => setModalMovie(false);

  return (
    <section className="contenedor-modal-details" onClick={handleCloseModal}>
      <div className="rotar-multiejes" onClick={(e) => e.stopPropagation()}>
        <img
          src={imageApi(poster_path)}
          className="portada-modal"
          alt="Movie Poster"
        />
        <StarRating voteAverage={vote_average} />
      </div>
      <div className="details-modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleCloseModal} className="close-button">
          <img src={CloseIcon} alt="Cerrar" />
        </button>
        <h3 className="title-movie">{title}</h3>
        <p className="description-movie">{overview}</p>
        <div className="details-movie">
          {release_date.substring(0, 4)} <span>●</span>
          {genres.length > 0 ? genres.map(genre => genre.name).join(' / ') : 'No genres available'} <span>●</span>
          {Math.floor(runtime / 60)}h {runtime % 60}m
        </div>

        {trailerMovie && (
          <YouTube
            videoId={trailerMovie.key}
            className="reproductor skeleton-image"
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
    </section>
  );
};
