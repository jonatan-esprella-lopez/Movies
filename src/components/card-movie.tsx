import Star from "../assets/movies/star.svg";
import { Movie } from "../interfaces/movie.interface";
import NoFoundImage from "../assets/movies/movie-void.svg";
import { imageApi } from "../services/movie-api";



interface props{
    movie: Movie;
    onOpenModal: (movie: Movie) => void;
}

export function CardMovie ({ movie, onOpenModal }: props) {
    const getStarsClass = (voteAverage: number) => 
        voteAverage > 5 ? "container-stars" : "container-stars-low";
    const portada = imageApi(movie.poster_path);
    return(
        <article>
            <div key={movie.id} className="portada-movie" onClick={() => onOpenModal(movie)}>
                {movie.poster_path ?
                    (
                        <div>
                            <img src={`${portada}`} alt={movie.title} className="movie-image"/>
                        </div>
                    ):(
                        <div className="movie-void">
                            <img src={ NoFoundImage } alt={movie.title} />
                            <p>No found 404</p>
                        </div>
                    )
                }
                <div className={getStarsClass(movie.vote_average)}>
                    <img src={Star} alt="star" />
                    {parseFloat(movie.vote_average.toFixed(1))}
                </div>
            </div>
        </article>
    )
}