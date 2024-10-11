import { Link } from "react-router-dom";
import { MovieButton } from "../../../components/button"
import { useMovieStore } from "../../../stores/movie-store";
import Play from "../../../assets/movies/Icon.svg";
import Informacion from "../../../assets/movies/informacion.svg";

export function ButtonMovie() {
    const {
        setModalMovie
    } = useMovieStore();

    const handleModalMovie = () => {
        setModalMovie(false)
    }
    
return(
    <div className="container-btns-banner">
        <Link to="/movie" className="button-link" onClick={handleModalMovie}>
            <MovieButton icon={Play} text="Ver Ahora" className="conteiner-btn-1"/>
        </Link>
        <MovieButton icon={Informacion} text="Ver Después" className="conteiner-btn-2" />
    </div>
)}