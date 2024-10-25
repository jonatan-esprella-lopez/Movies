import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HeaderNav } from "../../components/header";
import { imageApi } from "../../services/movie-api";
import "./movie-card.css";
import {
  fetchActorsMovie,
  fetchMovieDetailsById,
} from "../../services/movie-service";
import { VibeModal } from "./vibe-modal";
import { SingleMovieDetails } from "../../interfaces/single-movie-details";
import { Cast } from "../../interfaces/get-credits-response";
import { Footer } from "../../components/footer/footer";
import { StarRating } from "../../components/modal-details-movie/star-rating";
import { useMovieStore } from "../../stores/movie-store";

export const MovieView = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<SingleMovieDetails>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [actors, setActors] = useState<Cast[]>([]);
  
  useEffect(() => {
    if (id) {
      fetchActorsMovie(parseInt(id))
      .then((response) => {
        setActors(response);
          console.log(actors);
        })
        .catch((error) => {
          console.log("El error es de los actores", error);
        });
        
      fetchMovieDetailsById(parseInt(id))
      .then((response) => {
          setMovieDetails(response?.data);
          console.log(id);
        })
        .catch((error) => {
          console.error("Error fetching movie details:", error);
        });
      }
  }, [id]);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const portada = movieDetails ? imageApi(movieDetails.poster_path) : "";

  return (
    <section className="container-main">
      <HeaderNav />
      <section className="conteiner-details-movie">
        <article className="poster-section">
          <div className="rotar-multiejes">
            <img src={portada} className="portada-modal" alt="Movie Poster" />
            {movieDetails &&
              <StarRating voteAverage={parseFloat(movieDetails.vote_average.toFixed(1))} />
            }
          </div>
        </article>
        <section className="details-section">
          {movieDetails && (
            <>
              <h1>
                Pelicula: {movieDetails.title} (
                {movieDetails.release_date?.substring(0, 4)})
              </h1>
              <div className="rating-section">
                <span className="user-rating">Puntuación de usuarios</span>
                <button className="vibe-button" onClick={toggleModal}>
                  ¿Cuál es tu vibra?
                </button>
              </div>
              <div className="movie-info">
                <strong className="country-movie">
                  {movieDetails.origin_country || "N/A"}
                </strong>
                <div className="conteiner-genres">
                  {movieDetails.genres?.length > 0
                    ? movieDetails.genres.map((genre) => (
                        <p className="genres-movie">{genre.name}</p>
                      ))
                    : "No genres available"}
                </div>
              </div>
              <div className="movie-overview">
                <h2>Vista general</h2>
                <p>{movieDetails.overview || "No overview available."}</p>
              </div>

              <div className="watch-now">
                <Link to="/cartelera">
                  <button className="conteiner-btn-1">Reservar asiento</button>
                </Link>
              </div>
            </>
          )}
        </section>
      </section>

      <section className="contain-reparto">
        {actors &&
          actors.map((actor) => {
            const actorImage = actor.profile_path
              ? imageApi(actor.profile_path)
              : ""; 
              
            return (
              <div key={actor.id} className="reparto">
                {actor.profile_path && (
                  <img src={actorImage} alt={actor.name} />
                )}
                <p>Nombre: {actor.name}</p>
                <p>Personaje: {actor.character}</p>
                <p>Popularidad: {actor.popularity}</p>
              </div>
            );
          })}
      </section>

      <VibeModal isOpen={isModalOpen} onClose={toggleModal} />
      <Footer />
    </section>
  );
};
