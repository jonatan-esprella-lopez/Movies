import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { fetchTrailer, getMovieDetails, getMoviesMostValued, getMoviesSearch } from "@/services/movie-service";

import type { SingleMovieDetails } from "@/interfaces/single-movie-details";




interface MovieStore {
  detailsMovie: SingleMovieDetails | null;
  idMovie: number;
  imagen: string | undefined;
  modalMovie: boolean;
  movies: SingleMovieDetails[];
  query: string;
  searchResults: SingleMovieDetails[];
  selectedMovie: SingleMovieDetails | null;
  trailerMovie: { key: string } | null; 
  fetchSearchResults: (query: string) => void;
  loadMovies: () => Promise<void>;
  setModalMovie: (isOpen: boolean) => void;
  setMovieDetails: (movieID: number) => void; 
  setMovies: (movies: SingleMovieDetails[]) => void;
  setQuery: (query: string) => void;
  setSelectedMovie: (SingleMovieDetails: SingleMovieDetails) => void;
  setSelectedMovieDetails: (id: number) => void;
}


// TODO: implemntar devtools
export const useMovieStore = create(
  devtools(
  persist<MovieStore>(
  (set) => ({
  query: '',
  idMovie: 0,
  movies: [],
  imagen: undefined,
  SelectedSeatUser: [],
  modalMovie: false,
  detailsMovie: null,
  selectedMovie: null,
  trailerMovie: null,
  searchResults: [],


  setMovies: (movies) => set({ movies }),
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


  setMovieDetails: (movieId: number): void => {
    getMovieDetails(movieId)
    .then((detailsMovie) => set({ detailsMovie: detailsMovie ?? null }))
    .catch((error) => console.error("Error al obtener el detalle de la pelicular", error));
  },

  loadMovies: async () => {
    const movies = await getMoviesMostValued();
    set({ movies });
  },

  setModalMovie: (isOpen) => {
    set({ modalMovie: isOpen });
    if ( isOpen == false ) set({selectedMovie: null});  
  },
  
}),
{ name: 'moviesData' }
),
{ name: 'MovieStore' }
)
);


// interface MovieStore {
//   selectedMovie: SingleMovieDetails | null;
//   setSelectedMovie: (movie: SingleMovieDetails) => void;
//   selectedSeats: Seat[];
//   seatPrice: number;
//   addSeat: (seat: Seat) => void;
//   removeSeat: (seat: Seat) => void;
//   clearSeats: () => void;
//   totalAmount: () => number;
// }

// export const useMovieStore = create<MovieStore>((set) => ({
//   selectedMovie: null,
//   setSelectedMovie: (movie) => set({ selectedMovie: movie }),
//   selectedSeats: [],
//   seatPrice: 50, // Precio por asiento
//   addSeat: (seat) => set((state) => ({
//     selectedSeats: [...state.selectedSeats, seat],
//   })),
//   removeSeat: (seat) => set((state) => ({
//     selectedSeats: state.selectedSeats.filter(
//       (s) => !(s.row === seat.row && s.number === seat.number)
//     ),
//   })),
//   clearSeats: () => set({ selectedSeats: [] }),
//   totalAmount: () => set((state) => state.selectedSeats.length * state.seatPrice),
// }));
