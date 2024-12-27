import { create } from "zustand";
import { Seat, SeatStatus } from "../interfaces/cartelera.interface";
import { persist } from "zustand/middleware";
import { SEATS } from "../constants";

type Seats = Seat[];
type SeatsMap = Record<string, Seats>;

interface MovieStoreState {
  seats: Seats;
  selectedSeats: SeatsMap;
  isModalOpen: boolean;
  ticketPrice: number;
  toggleSeatStatus: (movieId: string, row: string, number: number) => void;
  openModal: () => void;
  closeModal: () => void;
  confirmPurchase: (movieId: string) => void;
}

export const useCarteleraStore = create<MovieStoreState>()(
  persist<MovieStoreState>(
    (set) => ({
      // Borrar
      seats: SEATS,
      selectedSeats: {} as SeatsMap,
      isModalOpen: false,
      ticketPrice: 10.48,
      toggleSeatStatus: (
        movieId: string,
        row: string,
        number: number
      ): void => {
        set((state) => {
          const statusMap: Record<SeatStatus, SeatStatus> = {
            available: "selected",
            selected: "available",
            reserved: 'reserved'
          };
          
          const updatedSeats = (
            state.selectedSeats[movieId] || SEATS
          ).map((seat) =>
            seat.row === row && seat.number === number
              ? {
                  ...seat,
                  status: statusMap[seat.status],
                }
              : seat
          );

          return {
            selectedSeats: { ...state.selectedSeats, [movieId]: updatedSeats },
          };
        });
      },
      openModal: () => set({ isModalOpen: true }),
      closeModal: () => set({ isModalOpen: false }),

      confirmPurchase: (movieId: string) =>
        set((state) => {
          const updatedSeats = state.selectedSeats[movieId]?.map((seat) =>
            seat.status === "selected"
              ? { ...seat, status: "reserved" as SeatStatus }
              : seat
          );

          return {
            seats: state.seats.map((seat) =>
              updatedSeats?.find(
                (s) => s.row === seat.row && s.number === seat.number
              ) || seat
            ),
            selectedSeats: {
              ...state.selectedSeats,
              [movieId]: updatedSeats || [],
            },
            isModalOpen: false,
          };
        }),
    }),
    { name: "MovieStoreState" }
  )
);
