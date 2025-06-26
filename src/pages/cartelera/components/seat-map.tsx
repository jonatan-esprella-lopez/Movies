import "./seat-map.css";
import { useCarteleraStore } from "../../../stores/Cartelera-store";
import { SEAT_NUMBERS, SEAT_ROWS, ROOM_PRICES } from "../../../constants.tsx";
import { useState } from "react";
import { Seat } from "@/interfaces/cartelera.interface";

type Seats = Seat[];

interface SeatMapProps {
  movieId: number;
  roomType: "standard" | "premium" | "vip"; // Tipo de sala
}

interface SeatMapMovie {
  movieId: number;
  seats: Seats;
}

export const SeatMap: React.FC<SeatMapProps> = ({ movieId, roomType }) => {
  const { seats, selectedSeats, toggleSeatStatus } = useCarteleraStore();
  const seatPrice = ROOM_PRICES[roomType];

  // Estado local para almacenar información de la sala por movieId
  const [seatMapMovies, setSeatMapMovies] = useState<SeatMapMovie[]>([]);

  const handleSeatMapChange = (
    movieId: number,
    updatedSeats: Seat[],
    row: string,
    number: number
  ) => {
    setSeatMapMovies((prev) => {
      const index = prev.findIndex((seatMap) => seatMap.movieId === movieId);
      console.log("handleSeatMapChange:", row, number, updatedSeats[0].status);
      if(status === "reserved") {
        getSeatColor("available");
      }
      if (index === -1) {
        return [...prev, { movieId, seats: updatedSeats }];
      }
      const newState = [...prev];
      newState[index].seats = updatedSeats;
      return newState;
    });
  };

  const totalCost =
    (selectedSeats[String(movieId)]?.reduce((total, seat) => {
      return seat.status === "selected" ? total + seatPrice : total;
    }, 0)) || 0;

  const getSeatColor = (status: string): string => {
    switch (status) {
      case "available":
        return "#374151";
      case "reserved":
        return "black";
      case "selected":
        return "#FED941";
      default:
        return "white";
    }
  };

  return (
    <section className="seat-map-container">
      <div className="screen">Pantalla</div>
      <div className="seat-grid">
        {SEAT_ROWS.map((row: string) => (
          <div key={row} className="seat-row">
            {SEAT_NUMBERS.map((number: number) => {
              if (number === 9 || number === 10) {
                return (
                  <div key={`null-${number}`} className="seat-null">
                    {/* Puedes dejarlo vacío o mostrar algo, según tu diseño */}
                  </div>
                );
              }
              const seat = seats.find(
                (seat) => seat.row === row && seat.number === number
              );
              return (
                <div
                  key={`${row}-${number}`}
                  className="seat"
                  style={{
                    backgroundColor: getSeatColor(
                      seat ? seat.status : "available"
                    ),
                  }}
                  onClick={() => {
                    toggleSeatStatus(String(movieId), row, number);
                    handleSeatMapChange(movieId, seats, row, number);
                  }}
                >
                  {number > 10 ? number - 2 : number}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="seat-summary">
        <p>Asientos Seleccionados: {selectedSeats[String(movieId)]?.length || 0}</p>
        <p>Total a Pagar: Bs {totalCost.toFixed(2)}</p>
      </div>
    </section>
  );
};
