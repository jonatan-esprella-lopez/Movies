import { Seat } from "./interfaces/cartelera.interface";

export const SEATS: Seat[] = [
  { row: "A", number: 1, status: "available" },
  { row: "A", number: 2, status: "available" },
  { row: "A", number: 3, status: "available" },
  { row: "B", number: 1, status: "available" },
  { row: "B", number: 2, status: "reserved" },
  { row: "B", number: 3, status: "available" },
  { row: "C", number: 1, status: "available" },
  { row: "C", number: 2, status: "available" },
  { row: "C", number: 3, status: "reserved" },
];

export const SEAT_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]; // Números de asientos por fila
export const SEAT_ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]; // Define las filas de asientos

export const ROOM_PRICES = {
  standard: 30,   // Precio por asiento en sala estándar
  premium: 50,    // Precio por asiento en sala premium
  vip: 80         // Precio por asiento en sala VIP
};
