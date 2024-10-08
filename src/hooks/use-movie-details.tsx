import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/movie-service";
import { SingleMovieDetails } from "../interfaces/single-movie-details";

export const useMovieDetails = (movieId: number) => {
  const [movie, setMovie] = useState<SingleMovieDetails | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieDetails = await getMovieDetails(movieId);
      setMovie(movieDetails);
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  return movie;
};