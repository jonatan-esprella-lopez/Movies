import { imageApi } from "../services/movie-api";
import Nofound from "../assets/movies/movie-void.svg";

export const useMovieImage = (posterMovie: string) => {
    if ( posterMovie == null ) {
        return Nofound;
    }
    return imageApi(posterMovie);
}