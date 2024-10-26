import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HeaderNav } from "../../components/header";
import { imageApi } from "../../services/movie-api";
import "./movie-card.css";
import {
  fetchActorsMovie,
  getMovieDetails,
} from "../../services/movie-service";
import { VibeModal } from "./vibe-modal";
import { SingleMovieDetails } from "../../interfaces/single-movie-details";
import { Cast } from "../../interfaces/get-credits-response";
import { Footer } from "../../components/footer/footer";
import { StarRating } from "../../components/modal-details-movie/star-rating";
import { useMovieStore } from "../../stores/movie-store";

export const MovieView = (): JSX.Element => {
  const {
    selectedMovie,
    detailsMovie,
    setMovieDetails,
  } = useMovieStore();

  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [actors, setActors] = useState<Cast[]>([]);
  
 
  useEffect(() => {
    if (id) {
      const movieId = parseInt(id);
      fetchActorsMovie(movieId)
      .then((response) => { setActors(response);})
      .catch((error) => {
        console.log("El error es de los actores", error);
      });
      
      getMovieDetails(movieId)
      .then((response) => setMovieDetails(response))
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
      }
    }, [id, setMovieDetails]);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const portada = selectedMovie ? imageApi(selectedMovie.poster_path) : "";

  return (
    <section className="container-main">
      <HeaderNav />
      <section className="conteiner-details-movie">
        <article className="poster-section rotar-multiejes">
            <img src={portada} className="portada-modal" alt="Movie Poster" />
            {selectedMovie &&
              <StarRating voteAverage={parseFloat(selectedMovie.vote_average.toFixed(1))} />
            }
        </article>

          {selectedMovie &&
        <section className="details-section">
              <h1>
                Pelicula: {selectedMovie.title} (
                {selectedMovie.release_date?.substring(0, 4)})
              </h1>
              
              <div className="movie-info">
                <strong className="country-movie">
                  {selectedMovie.origin_country || "N/A"}
                </strong>
                <div className="conteiner-genres">
                  {selectedMovie.genres?.length > 0
                    ? selectedMovie.genres.map((genre) => (
                        <p className="genres-movie">{genre.name}</p>
                      ))
                    : "No genres available"}
                </div>
                <button className="vibe-button" onClick={toggleModal}>
                  ¿Cuál es tu vibra?
                </button>
              </div>
              <div className="movie-overview">
                <h2>Vista general</h2>
                <p>{selectedMovie.overview || "No overview available."}</p>
              </div>

              <div className="watch-now">
                <Link to="/cartelera">
                  <button className="conteiner-btn-1">Reservar asiento</button>
                </Link>
              </div>
        </section>
        }
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
