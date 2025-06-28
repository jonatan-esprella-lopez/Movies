import { useNavigate } from "react-router-dom";

import { useMovieStore } from "@/stores/movie-store";

import Informacion from "@/assets/movies/informacion.svg";
import Play from "@/assets/movies/Icon.svg";

import "./button-movie.css"

export const ButtonMovie = () => {
  const navigate = useNavigate();
  const { 
    detailsMovie
  } = useMovieStore()
  
  const getFormattedMoviePath = (): string => {
    return detailsMovie ? `/movie/${detailsMovie.id}` : "";
  };

  const handleModalMovie = (): void => {
    if(detailsMovie){
      navigate(getFormattedMoviePath());
    }
  };

  return (
    <div className="container-btns-banner">
      <button className="conteiner-btn-1" onClick={handleModalMovie}>
        <img src={Play} alt="Ver Ahora" className="icon-button-slider" />
        <span>Ver Ahora</span>
      </button>

      <button className="conteiner-btn-2">
        <img src={Informacion} alt="Ver Después" className="icon-button-slider" />
        <span>Ver Después</span>
      </button>
    </div>
  );
}