import "./pages-home.css"
import { useEffect, useState } from "react";
import { CardMovie } from "../../../components/card-movie";
import { ModalDetailMovie } from "../../../components/modal-details-movie/modal-detail-movie";
import { useMovieStore } from "../../../stores/movie-store";
import { SingleMovieDetails } from "../../../interfaces/movie.interface";
import { getMoviesMostValued } from "../../../services/movie-service";

export function MostValued(): JSX.Element {
  const{ 
    modalMovie 
  } = useMovieStore();
  const [movie, setMovie] = useState<SingleMovieDetails[]>([]);

  useEffect(() => {
    getMoviesMostValued().then((movies) => {
      setMovie(movies)
    }).catch((error) => {
      console.error('Error al obtener las películas', error);
    });
  }, [getMoviesMostValued]);

  return (
    <main className="container-main">
      <h1>Mas Valoradas</h1>
      <section className="conteiner-movies">
        {movie.map((movie) => (
          <CardMovie  key={movie.id} movie={movie}/>
        ))}   
      </section>
      {modalMovie && (
          <section className="conteniner-modal-movie">
            <ModalDetailMovie />
          </section>
        )}
    </main>
  );
}
