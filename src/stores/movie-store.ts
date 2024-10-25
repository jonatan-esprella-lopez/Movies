import { create } from "zustand";
import { Movie } from "../interfaces/movie.interface";
import { fetchTrailer, getMovieDetails, getMoviesSearch } from "../services/movie-service";
import { SingleMovieDetails } from "../interfaces/single-movie-details";
import { persist } from "zustand/middleware";


interface MovieStore {
  query: string;
  idMovie: number;
  modalMovie: boolean;
  detailsMovie: Movie | null;
  selectedMovie: SingleMovieDetails;
  searchResults: Movie[];
  trailerMovie: { key: string } | null; 
  setSelectedMovieDetails: (id: number) => void; 
  setQuery: (query: string) => void;
  setSelectedMovie: (SingleMovieDetails: SingleMovieDetails) => void;
  fetchSearchResults: (query: string) => void;
  setModalMovie: (isOpen: boolean) => void;
}

// TODO: devtools
export const useMovieStore = create(
  persist<MovieStore>(
  (set) => ({
  query: '',
  idMovie: 0,
  modalMovie: false,
  detailsMovie: null,
  selectedMovie: [],
  trailerMovie: null,
  searchResults: [],

  setQuery: (query) => {
    set({ query });
    getMoviesSearch(query).then((movies) => {
      set({ searchResults: movies });
    });
  },

  fetchSearchResults: (query) => {
    getMoviesSearch(query).then((movies) => {
      set({ searchResults: movies });
    });
  },

  setSelectedMovieDetails: (movieId) => {
    fetchTrailer(movieId).then((trailer) => {  
      set({ trailerMovie: trailer ?? null }); 
    });
  },

  setSelectedMovie: (movie: SingleMovieDetails) => {
    getMovieDetails(movie.id)
      .then((details: SingleMovieDetails[]) => {
        set({ selectedMovie: details });
      })
      .catch((error: SingleMovieDetails[]) => {
        console.error("Error al obtener los detalles de la película:", error);
      });
  },

  setModalMovie: (isOpen) => {
    set({ modalMovie: isOpen });
    if ( isOpen == false ) set({selectedMovie: []});  
  },

}),{
 name: 'moviesData' 
}
));
