export type SeatStatus = "available" | "reserved" | "selected";

export interface Seat {
    row: string;
    number: number;
    status: SeatStatus;
}
  
export interface SeatMapProps {
    movieId: number;
    seatMap: Seat[] | null;
    onSeatMapChange: (movieId: number, seatMap: Seat[]) => void;
}

export interface DateItem {
    day: string;
    date: number;
    month: string;
  }
  
export interface DateSelectorProps {
    selectedDate: number;
    onDateSelect: (date: number) => void;
  }