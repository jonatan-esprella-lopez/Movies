import React, { useState, useEffect } from "react";
import "./seat-map.css";

// Tipos de estado del asiento
type SeatStatus = "available" | "reserved" | "selected";

// Interfaz para representar un asiento
interface Seat {
  row: string;
  number: number;
  status: SeatStatus;
}

// Props del componente SeatMap
interface SeatMapProps {
  movieId: string;
  seatMap: Seat[] | null; // Mapa de asientos guardado o null
  onSeatMapChange: (movieId: string, seatMap: Seat[]) => void; // Callback para actualizar el mapa de asientos
}

const seatRows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const seatNumbers = Array.from({ length: 18 }, (_, i) => i + 1);

export const SeatMap: React.FC<SeatMapProps> = ({ movieId, seatMap, onSeatMapChange }) => {
  // Estado local para los asientos
  const [seats, setSeats] = useState<Seat[]>(
    seatRows.flatMap((row) =>
      seatNumbers.map((number) => ({
        row,
        number,
        status: "available" as SeatStatus,
      }))
    )
  );

  // Cargar el mapa de asientos guardado si existe
  useEffect(() => {
    if (seatMap) {
      setSeats(seatMap);
    }
  }, [seatMap]);

  // Función para cambiar el estado de un asiento
  const toggleSeatStatus = (row: string, number: number) => {
    const newSeats = seats.map((seat) =>
      seat.row === row && seat.number === number
        ? {
            ...seat,
            status:
              seat.status === "available"
                ? "selected"
                : seat.status === "selected"
                ? "reserved"
                : "available",
          }
        : seat
    );

    setSeats(newSeats);
    onSeatMapChange(movieId, newSeats); // Notificamos el cambio al componente padre
  };

  // Función para determinar el color del asiento basado en su estado
  const getSeatColor = (status: SeatStatus): string => {
    switch (status) {
      case "available":
        return "white";
      case "reserved":
        return "black";
      case "selected":
        return "blue";
      default:
        return "white";
    }
  };

  return (
    <div className="seat-map-container">
      <div className="screen">Pantalla</div>
      <div className="seat-grid">
        {seatRows.map((row) => (
          <div key={row} className="seat-row">
            {seatNumbers.map((number) => {
              const seat = seats.find((seat) => seat.row === row && seat.number === number);
              return (
                <div
                  key={`${row}-${number}`}
                  className="seat"
                  style={{ backgroundColor: getSeatColor(seat!.status) }}
                  onClick={() => toggleSeatStatus(row, number)}
                >
                  {number}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
