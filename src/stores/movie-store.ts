import { create } from "zustand";
import { Movie } from "../interfaces/movie.interface";
import { fetchTrailer, getAllMovies, getMovieDetails, getMoviesLessValued, getMoviesMostValued, getMoviesSearch } from "../services/movie-service";
import { SingleMovieDetails } from "../interfaces/single-movie-details";
import { persist } from "zustand/middleware";

interface MovieStore {
  query: string;
  idMovie: number;
  modalMovie: boolean;
  detailsMovie: Movie | null;
  selectedMovie: SingleMovieDetails | null;
  searchResults: Movie[];
  popularMovies: Movie[];
  lessValuedMovie: Movie[];
  mostValuedMovie: Movie[];
  trailerMovie: { key: string } | null; 
  setSelectedMovieDetails: (id: number) => void; 
  setQuery: (query: string) => void;
  setSelectedMovie: (movie: Movie | null) => void;
  fetchPopularMovies: () => void;
  fetchLessValuedMovies: () => void;
  fetchMostValuedMovies: () => void;
  fetchSearchResults: (query: string) => void;
  setModalMovie: (isOpen: boolean) => void;
}

export const useMovieStore = create(persist<MovieStore>(
  (set) => ({
  query: '',
  idMovie: 0,
  modalMovie: false,
  detailsMovie: null,
  selectedMovie: null,
  trailerMovie: null,
  searchResults: [],
  popularMovies: [],
  lessValuedMovie: [],
  mostValuedMovie: [],

  setQuery: (query) => {
    set({ query });
    getMoviesSearch(query).then((movies) => {
      set({ searchResults: movies });
    });
  },
  
  fetchPopularMovies: () => {
    getAllMovies().then((movies) => {
      set({ popularMovies: movies });
      set({ searchResults: movies });
    });
  },

  fetchLessValuedMovies: () => {
    getMoviesLessValued().then((movies) => {
      set({ lessValuedMovie: movies });
      set({ searchResults: movies });
    });
  },

  fetchMostValuedMovies: () => {
    getMoviesMostValued().then((movies) => {
      set({ mostValuedMovie: movies });
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

  setSelectedMovie: (movie: any) => {
    getMovieDetails(movie.id)
      .then((details: any) => {
        set({ selectedMovie: details });
      })
      .catch((error: any) => {
        console.error("Error al obtener los detalles de la película:", error);
      });
  },

  setModalMovie: (isOpen) => {
    set({ modalMovie: isOpen });
  },

}),{
 name: 'moviesData' 
}
));
