import { useNavigate } from "react-router-dom";
import { useMovieStore } from "../../../stores/movie-store";
import Play from "../../../assets/movies/Icon.svg";
import Informacion from "../../../assets/movies/informacion.svg";
import "./button-movie.css"

export const ButtonMovie = (): JSX.Element => {
  const navigate = useNavigate();
  const { 
    selectedMovie, 
    setModalMovie 
  } = useMovieStore()
  
  const getFormattedMoviePath = (): string => {
    return selectedMovie ? `/movie/${selectedMovie.id}` : "";
  };

  const handleModalMovie = (): void => {
    if(selectedMovie){
      setModalMovie(false);
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