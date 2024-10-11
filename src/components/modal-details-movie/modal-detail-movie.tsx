import { useEffect, useState } from "react";
import CloseIcon from "../../assets/modal/Icon.svg";
import YouTube from "react-youtube";
import { ButtonMovie } from "../../pages/home/components/button-movie";
import { StarRating } from "./star-rating";
import { imageApi } from "../../services/movie-api";
import { SingleMovieDetails } from "../../interfaces/single-movie-details";
import { useMovieStore } from "../../stores/movie-store";

export const ModalDetailMovie = () => {
const {
  modalMovie,
  selectedMovie,
  setModalMovie,
} = useMovieStore();

  const [movie, setMovie] = useState<SingleMovieDetails | null>(null); 
  const [trailer, setTrailer] = useState<{ key: string } | null>(null);
  console.log("El resultado:", selectedMovie?.genres)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // if (movieId) {
    //   const fetchMovieDetails = async () => {
    //     try {
    //       const movieDetails = await getMovieDetails(movieId);
    //       setMovie(movieDetails);
    //     } catch (error) {
    //       console.error("Error fetching movie details:", error);
    //     }
    //   };

    //   const fetchMovieTrailer = async () => {
    //     try {
    //       const fetchedTrailer = await fetchTrailer(movieId);
    //       if (fetchedTrailer && fetchedTrailer.key) {
    //         setTrailer({ key: fetchedTrailer.key });
    //       } else {
    //         setTrailer(null); 
    //       }
    //     } catch (error) {
    //       console.error("Error fetching movie trailer:", error);
    //       setTrailer(null); 
    //     }
    //   };

    //   fetchMovieDetails();
    //   fetchMovieTrailer();
    // }
  }, [selectedMovie]);

  const handleCloseModal = () => {
    setModalMovie(false);
  };


  if (!modalMovie || !selectedMovie) return null;

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <article className="contenedor-modal-details" onClick={handleCloseModal}>
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
        {trailer && (
          <YouTube
            videoId={trailer.key}
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
    </article>
  );
};
