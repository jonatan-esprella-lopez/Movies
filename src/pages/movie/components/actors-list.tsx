
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { imageApi } from "../../../services/movie-api";

import { Cast } from "../../../interfaces/get-credits-response";
import { fetchActorsMovie } from "../../../services/movie-service";
import NoFoundActor from "../../../assets/movies/movie-void.svg"

export const ActorsList = (): JSX.Element => {
    const [actors, setActors] = useState<Cast[]>([]);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
          const movieId = parseInt(id);

          fetchActorsMovie(movieId)
            .then(setActors)
            .catch((error) => console.error("Error fetching actores:", error));          
        }
      }, [id, fetchActorsMovie]);

return(
    <>
        <h2 className="title-actors">Reparto Principal</h2>
        <section className="actors-container">
            {actors.map((actor) => (
                <div key={actor.id} className="actor-card">
                    <img
                        src={actor.profile_path ? imageApi(actor.profile_path, "w200") : NoFoundActor}
                        alt={actor.name}
                        className="actor-image"
                        />
                    <p className="actor-name">Actor: {actor.name}</p>
                    <p className="actor-character">{actor.character}</p>
                    <p className="actor-popularity">Popularidad: {actor.popularity}</p>
                </div>
            ))}
        </section>
    </>
    )   
};
