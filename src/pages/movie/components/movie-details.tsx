import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { imageApi } from "@/services/movie-api";
import { getMovieDetails } from "@/services/movie-service";

import { useMovieStore } from "@/stores/movie-store";

import { StarRating } from "@/components/modal-details-movie/star-rating";

export interface MovieDetailsProps {
    onVibeClick: () => void;
}

export const MovieDetails = ({ onVibeClick }: MovieDetailsProps): JSX.Element | null => {
    const {
        detailsMovie,
        setMovieDetails
    } = useMovieStore();
    
    const { 
        title = "", 
        overview = "", 
        poster_path = "", 
        vote_average = 0, 
        release_date = "", 
        origin_country = "",
        genres = [], 
    } = detailsMovie || {};
    
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
          const movieId = parseInt(id);
          
          getMovieDetails(movieId)
            .then(() => { 
              setMovieDetails(movieId)
            })
            .catch((error) => console.error("Error fetching detalles de pelicula:", error));
        }
      }, [id, setMovieDetails]);
    
      const handleReserve =  (): void => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
            navigate(getFormattedMoviePath());
      }


      const getFormattedMoviePath = (): string => {
        return detailsMovie ? `/cartelera/${detailsMovie.id}` : "";
      };
    
    const posterUrl = poster_path ? imageApi(poster_path, "w200") : "";

    return (
        <section className="conteiner-details-movie">
            <article className="poster-section rotar-multiejes">
                <img src={posterUrl} className="portada-modal" alt="Movie Poster" />
                <StarRating voteAverage={parseFloat(vote_average.toFixed(1))} />
            </article>
            
            <section className="details-section">
                <h1>
                    {title} ({release_date?.substring(0, 4)})
                </h1>
                <div className="movie-info">
                    <strong className="country-movie">
                        {origin_country || "N/A"}
                    </strong>
                    <div className="conteiner-genres">
                        {genres?.length > 0
                            ? genres.map((genre) => (
                                <p className="genres-movie">{genre.name}</p>
                            ))
                        : "No genres available"}
                    </div>
                    <button className="vibe-button" onClick={onVibeClick}>
                        ¿Cuál es tu vibra?
                    </button>
                </div>
                <div className="movie-overview">
                    <h2>Vista general</h2>
                    <p>{overview || "No overview available."}</p>
                </div>
                <button className="btn-1-reserve" onClick={handleReserve}>Reservar asiento</button>
            </section>
        </section>
    );
};
