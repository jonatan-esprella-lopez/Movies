import { create } from 'zustand';
import { Movie } from '../interfaces/movie.interface';
import { DisplayMovieStatus } from '../interfaces/interfaces';
import { getMoviesSearch, getAllMovies, getMoviesLessValued, getMoviesMostValued } from '../services/movie-service';

interface MovieStore {
  displayMoviesStatus: DisplayMovieStatus;
  query: string;
  id: number;
  searchResults: Movie[];
  popularMovies: Movie[];
  lessValuedMovie: Movie[];
  mostValuedMovie: Movie[];
  setQuery: (query: string) => void;
  fetchPopularMovies: () => void;
  fetchLessValuedMovies: () => void;
  fetchSearchResults: (query: string) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  displayMoviesStatus: 'ALL',
  query: '',
  id: 0,
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
    });
  },


  fetchLessValuedMovies: () => {
    getMoviesLessValued().then((movies) => {
      set({ lessValuedMovie: movies });
    });
  },

  fetchMostValuedMovies: () => {
    getMoviesMostValued().then((movies) => {
      set({ mostValuedMovie: movies });
    });
  },


  fetchSearchResults: (query) => {
    getMoviesSearch(query).then((movies) => {
      set({ searchResults: movies });
    });
  },

}));
