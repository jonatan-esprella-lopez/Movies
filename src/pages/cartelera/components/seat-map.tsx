import { useCarteleraStore } from "@/stores/Cartelera-store";

import { roomPrices, SEAT_NUMBERS, SEAT_ROWS } from "@/constants.tsx";

import { Seat } from "@/interfaces/cartelera.interface";
import "./seat-map.css";


interface SeatMapProps {
  movieId: number;
  roomType: keyof typeof roomPrices | null;
}

export const SeatMap: React.FC<SeatMapProps> = ({ movieId, roomType }) => {
  const { 
    seats, 
    selectedSeats, 
    toggleSeatStatus 
  } = useCarteleraStore();


  const seatPrice = roomType ? roomPrices[roomType] : 0;

  const handleSeatMapChange = (
    updatedSeats: Seat[],
    row: string,
    number: number
  ) => {
    // This function is currently not needed, but you can keep logging if desired
    console.log("handleSeatMapChange:", row, number, updatedSeats[0]?.status);
    // Remove any logic that uses 'status' or updates unused state
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
