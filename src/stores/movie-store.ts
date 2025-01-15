import { create } from "zustand";
import { fetchTrailer, getMovieDetails, getMoviesMostValued, getMoviesSearch } from "../services/movie-service";
import { SingleMovieDetails, UserSeatsSelected } from "../interfaces/single-movie-details";
import { persist, devtools} from "zustand/middleware";



interface MovieStore {
  query: string;
  idMovie: number;
  SelectedSeatUser: UserSeatsSelected[];
  modalMovie: boolean;
  loadMovies: () => Promise<void>;
  
  setMovies: (movies: SingleMovieDetails[]) => void;
  imagen: string | undefined;
  movies: SingleMovieDetails[];
  detailsMovie: SingleMovieDetails | null;
  selectedMovie: SingleMovieDetails | null;
  searchResults: SingleMovieDetails[];
  trailerMovie: { key: string } | null; 
  setSelectedMovieDetails: (id: number) => void;
  setMovieDetails: (movieID: number) => void; 
  setQuery: (query: string) => void;
  setSelectedMovie: (SingleMovieDetails: SingleMovieDetails) => void;
  fetchSearchResults: (query: string) => void;
  setModalMovie: (isOpen: boolean) => void;
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

  // setSelectedSeatMovie: (SelectedSeatUser: UserSeatsSelected) => {
    

  // },

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
