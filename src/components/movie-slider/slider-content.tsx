import { Movie } from "../../interfaces/movie.interface";
import { ButtonMovie } from "../../pages/home/components/button-movie";
import NoFoundImage from "../../assets/movies/movie-void.svg"

const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

interface SliderContentProps {
  movies: Movie[];
  currentIndex: number;
}

export const SliderContent = ({ movies, currentIndex }: SliderContentProps) => (
  <div className="slider-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
    {movies.map((movie, index) => (
      <div className="slide" key={index}>
        {movie.poster_path ?
            (
              <img
                src={movie.backdrop_path !== null ? `${URL_IMAGE}${movie.backdrop_path}` : `${URL_IMAGE}${movie.poster_path}`}
                alt={`Imagen de la película ${movie.title}`}
              />
            ):(
                <div className="movie-void">
                    <img src={ NoFoundImage } alt={movie.title} />
                    <p>Error 404</p>
                </div>
            )
        }
        <ButtonMovie />
      </div>
    ))}
  </div>
);
