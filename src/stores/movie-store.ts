import { create } from "zustand";
import { fetchTrailer, getMovieDetails, getMoviesSearch } from "../services/movie-service";
import { SingleMovieDetails } from "../interfaces/single-movie-details";
import { persist } from "zustand/middleware";


interface MovieStore {
  query: string;
  idMovie: number;
  modalMovie: boolean;
  detailsMovie: SingleMovieDetails | null;
  selectedMovie: SingleMovieDetails | null;
  searchResults: SingleMovieDetails[];
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
  selectedMovie: null,
  trailerMovie: null,
  searchResults: [],

  setQuery: (query) => {
    set({ query });
    getMoviesSearch(query).then((movies) => {
      set({ searchResults: movies });
    });
  },

  fetchSearchResults: (query) => {
    getMoviesSearch(query)
      .then((movies) => set({ searchResults: movies }))
      .catch((error) => console.error("Error al obtener los resultados de búsqueda:", error));
  },

  setSelectedMovieDetails: (movieId) => {
    fetchTrailer(movieId)
      .then((trailer) => set({ trailerMovie: trailer ?? null }))
      .catch((error) => console.error("Error al obtener el tráiler:", error));
  },

  setSelectedMovie: (movie: SingleMovieDetails) => {
    getMovieDetails(movie.id)
      .then((details) => set({ selectedMovie: details ?? null }))
      .catch((error) => console.error("Error al obtener los detalles de la película:", error));
  },

  setModalMovie: (isOpen) => {
    set({ modalMovie: isOpen });
    if ( isOpen == false ) set({selectedMovie: null});  
  },

}),{
 name: 'moviesData' 
}
));
