import { useState, useEffect } from "react";

import "./seat-map.css";

type SeatStatus = "available" | "reserved" | "selected";

interface Seat {
  row: string;
  number: number;
  status: SeatStatus;
}

interface SeatMapProps {
  movieId: number;
  seatMap: Seat[] | null;

  onSeatMapChange: (movieId: number, seatMap: Seat[]) => void;
}

const seatRows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const seatNumbers = Array.from({ length: 18 }, (_, i) => i + 1);

export const SeatMap = ({ movieId, seatMap, onSeatMapChange }: SeatMapProps | any) => {
 
  const [seats, setSeats] = useState<Seat[]>(
    seatRows.flatMap((row) =>
      seatNumbers.map((number) => ({
        row,
        number,
        status: "available" as SeatStatus,
      }))
    )
  );

  useEffect(() => {
    if (seatMap) {
      setSeats(seatMap);
    }
  }, [seatMap]);

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
    onSeatMapChange(movieId, newSeats);
  };

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
              if (number === 9 || number === 10) return <div className="seat-null"></div>;
              
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
