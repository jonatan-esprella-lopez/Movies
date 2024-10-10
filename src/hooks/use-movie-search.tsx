import { useState } from "react";
import { Movie } from "../interfaces/movie.interface";
import { getMoviesSearch, getMovieDetails } from "../services/movie-service";
import { imageApi } from "../services/movie-api";
import Nofound from "../assets/movies/movie-void.svg";

export function useMovieSearch() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const handleQueryChange = (inputQuery: string) => {
    setQuery(inputQuery);
    getMoviesSearch(inputQuery).then(movies => setSearchResults(movies));
  };

  return {
    query,
    searchResults,
    handleQueryChange,
  };
}


export const useMovieDetails = (movieId: number) => {
  const movie = getMovieDetails(movieId)

  return movie;
};


export const useMovieImage = (posterMovie: string) => {
    if ( posterMovie == null ) {
        return Nofound;
    }
    return imageApi(posterMovie);
}
