import { useNavigate } from "react-router-dom";
import { useMovieStore } from "../../../stores/movie-store";
import Play from "../../../assets/movies/Icon.svg";
import Informacion from "../../../assets/movies/informacion.svg";

export function ButtonMovie() {
  const { selectedMovie, setModalMovie } = useMovieStore()
  const navigate = useNavigate();
  
  const getFormattedMoviePath = () => {
    if (!selectedMovie) return '';
    return `/movie/${selectedMovie.id}`; 
  };
  const handleModalMovie = () => {
    setModalMovie(false);
    if (selectedMovie) {
      navigate(getFormattedMoviePath());
    }
  };

  return (
    <div className="container-btns-banner">
      <button className="conteiner-btn-1" onClick={handleModalMovie}>
        <img src={Play} alt="Ver Ahora" className="icon-button-slider" />
        <span>Ver Ahora</span>
      </button>

      <button className="conteiner-btn-2" onClick={() => console.log("Ver Después clickeado")}>
        <img src={Informacion} alt="Ver Después" className="icon-button-slider" />
        <span>Ver Después</span>
      </button>
    </div>
  );
}