import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import {
  fetchTrailer,
  getMovieDetails,
  getMoviesMostValued,
  getMoviesSearch,
} from "@/services/movie-service";

import type { SingleMovieDetails } from "@/interfaces/single-movie-details";
import { Seat } from "@/interfaces/cartelera.interface";

interface MovieReservation {
  movieId: number;
  roomId: number;
  date: string;
  time: string;
  price: number;
  seats: Seat[];
}

interface MovieStore {
  detailsMovie: SingleMovieDetails | null;
  idMovie: number;
  imagen: string | undefined;
  movies: SingleMovieDetails[];
  query: string;
  searchResults: SingleMovieDetails[];
  trailerMovie: { key: string } | null;
  reservations: MovieReservation[];

  fetchSearchResults: (query: string) => void;
  loadMovies: () => Promise<void>;
  setMovieDetails: (movieID: number) => void;
  setMovies: (movies: SingleMovieDetails[]) => void;
  setQuery: (query: string) => void;
  setMovieTrailer: (id: number) => void;
  addReservation: (reservation: MovieReservation) => void;
  removeReservation: (movieId: number) => void;
}

export const useMovieStore = create(
  devtools(
    persist<MovieStore>(
      (set, get) => ({
        query: "",
        idMovie: 0,
        movies: [],
        imagen: undefined,
        SelectedSeatUser: [],
        modalMovie: false,
        detailsMovie: null,
        trailerMovie: null,
        searchResults: [],
        reservations: [],

        setMovies: (movies) => set({ movies }),
        
        setQuery: (query) => {
          set({ query });
          getMoviesSearch(query)
            .then((movies) => set({ searchResults: movies }))
            .catch((error) => 
              console.error(
                "Error al obtener los resultados de búsqueda:", 
                error
              )
            );
        },


        /**Hay que eliminar esta funcion */
        fetchSearchResults: (query) => {
          getMoviesSearch(query)
            .then((movies) => set({ searchResults: movies }))
            .catch((error) =>
              console.error(
                "Error al obtener los resultados de búsqueda:",
                error
              )
            );
        },


        setMovieTrailer: (movieId) => {
          fetchTrailer(movieId)
            .then((trailer) => set({ trailerMovie: trailer ?? null }))
            .catch((error) =>
              console.error("Error al obtener el tráiler:", error)
            );
        },



        setMovieDetails: (movieId: number) => {
          getMovieDetails(movieId)
            .then((detailsMovie) => set({ detailsMovie: detailsMovie ?? null }))
            .catch((error) =>
              console.error(
                "Error al obtener el detalle de la pelicular",
                error
              )
            );
        },
        

        loadMovies: async () => {
          const movies = await getMoviesMostValued();
          set({ movies });
        },

        
        addReservation: (reservation: MovieReservation) => {
          set((state) => ({
            reservations: [...state.reservations, reservation],
          }));
        },

        removeReservation: (movieId: number) => {
          set((state) => ({
            reservations: state.reservations.filter(
              (reservation) => reservation.movieId !== movieId
            ),
          }));
        },

        
      }),
      { name: "moviesData" }
    ),
    { name: "MovieStore" }
  )
);
