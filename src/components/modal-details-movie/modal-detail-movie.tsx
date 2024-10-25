import { useEffect } from "react";
import { useMovieStore } from "../../stores/movie-store";
import { imageApi } from "../../services/movie-api";
import YouTube from "react-youtube";

import { ButtonMovie } from "../../pages/home/components/button-movie";
import { StarRating } from "./star-rating";
import CloseIcon from "../../assets/modal/Icon.svg";

export const ModalDetailMovie = () => {
  const {
    modalMovie,
    selectedMovie,
    trailerMovie,
    setModalMovie,
    setSelectedMovieDetails,
  } = useMovieStore();

  useEffect(() => {
    if (selectedMovie) {
      setSelectedMovieDetails(selectedMovie.id);
    }
    window.scrollTo({
      top: 0, 
      behavior: 'smooth',
    });
  }, [selectedMovie]);

  const handleCloseModal = () => {
    setModalMovie(false);
  };

  if (!modalMovie) return null;

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <section className="contenedor-modal-details" onClick={handleCloseModal}>
      <div className="rotar-multiejes" onClick={handleModalClick}>
        <img src={imageApi(selectedMovie.poster_path)} className="portada-modal" alt="Movie Poster" />
        <StarRating voteAverage={selectedMovie.vote_average} />
      </div>
      <div className="details-modal" onClick={handleModalClick}>
        <button onClick={handleCloseModal} className="close-button">
          <img src={CloseIcon} alt="Cerrar" />
        </button>
        <h3 className="title-movie">{selectedMovie.title}</h3>
        <p className="description-movie">{selectedMovie.overview}</p>
        <div className="details-movie">
          {selectedMovie.release_date?.substring(0, 4)} <span>●</span>
          {selectedMovie.genres?.length > 0 ? selectedMovie.genres.map(genre => genre.name).join(' / ') : 'No genres available'} <span>●</span>
          {Math.floor(selectedMovie.runtime / 60)}h {selectedMovie.runtime % 60}m
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
