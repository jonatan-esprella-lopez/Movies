import { Seat } from "./interfaces/cartelera.interface";

export const SEATS: Seat[] = [];

export const SEAT_NUMBERS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
];

export const SEAT_ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

export const showtimesByDate: { [key: number]: string[] } = {
  24: ["12:30", "15:45", "18:15"],
  25: ["13:00", "16:00", "19:00", "22:00"],
  26: ["11:00", "14:30", "17:30", "20:30"],
  27: ["12:30", "15:45", "18:15"],
  28: ["13:00", "16:00", "19:00", "22:00"],
  29: ["11:00", "14:30", "17:30", "20:30"],
};

export const roomsByTime: { [key: string]: string[] } = {
  "12:30": ["Sala 1", "Sala 3"],
  "15:45": ["Sala 2", "Sala VIP", "Sala VIP 1"],
  "18:15": ["Sala 1", "Sala 4"],
  "13:00": ["Sala 5"],
  "16:00": ["Sala VIP", "Sala 2"],
  "19:00": ["Sala 3", "Sala 4"],
  "22:00": ["Sala VIP"],
  "11:00": ["Sala 1"],
  "14:30": ["Sala 2", "Sala 3"],
  "17:30": ["Sala 4"],
  "20:30": ["Sala VIP", "Sala 1"],
};

export const roomPrices: { [key: string]: { type: string; price: number } } = {
  "Sala 1": { type: "standard", price: 12 },
  "Sala 2": { type: "standard", price: 12 },
  "Sala 3": { type: "standard", price: 12 },
  "Sala 4": { type: "standard", price: 12 },
  "Sala 5": { type: "standard", price: 12 },
  "Sala VIP": { type: "VIP", price: 30 },
  "Sala Premium": { type: "premium", price: 36 },
};
