import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface ShowtimeData {
  date: number;
  time: string | null;
  room: string | null;
}

interface CarteleraStore {
  selectedMovieId: number | null;
  showtimeData: { [movieId: number]: ShowtimeData };
  setSelectedMovie: (movieId: number) => void;
  setShowtimeData: (movieId: number, data: ShowtimeData) => void;
}

export const useCarteleraStore = create(
  persist<CarteleraStore>(
    (set) => ({
      selectedMovieId: null,
      showtimeData: {},
      setSelectedMovie: (movieId) => set({ selectedMovieId: movieId }),
      setShowtimeData: (movieId, data) =>
        set((state) => ({
          showtimeData: { ...state.showtimeData, [movieId]: data },
        })),
    }),
    { name: 'cartelera-store' } // clave para el almacenamiento en localStorage
  )
);
