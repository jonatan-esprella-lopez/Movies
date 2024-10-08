import { useState } from "react";
import { Movie } from "../interfaces/movie.interface";
import { getMoviesSearch } from "../services/movie-service";

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
