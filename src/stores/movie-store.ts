import { create } from 'zustand';
import { Movie } from '../interfaces/movie.interface';
import { DisplayMovieStatus } from '../interfaces/interfaces';
import { 
  getMoviesSearch, 
  getAllMovies, 
  getMoviesLessValued, 
  getMoviesMostValued,
} from '../services/movie-service';


interface MovieStore {
  displayMoviesStatus: DisplayMovieStatus;
  query: string;
  idMovie: number;
  modalMovie: boolean;
  detailsMovie: Movie | null;
  selectedMovie: Movie | null;
  searchResults: Movie[];
  popularMovies: Movie[];
  lessValuedMovie: Movie[];
  mostValuedMovie: Movie[];
  setQuery: (query: string) => void;
  setSelectedMovie: (movie: Movie | null) => void;
  fetchPopularMovies: () => void;
  fetchLessValuedMovies: () => void;
  fetchMostValuedMovies: () => void;
  fetchSearchResults: (query: string) => void;
  setModalMovie: (isOpen: boolean) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  displayMoviesStatus: 'ALL',
  query: '',
  idMovie: 0,
  modalMovie: false,
  detailsMovie: null,
  selectedMovie: null,
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

  setSelectedMovie: (movie) => {
    set({ selectedMovie: movie });
  },

  setModalMovie: (isOpen) => {
    set({ modalMovie: isOpen });
  },


}));
