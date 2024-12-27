import { PurchaseModal } from "./purchase-modal";
import "./seat-map.css";
import { useCarteleraStore } from "../../../stores/Cartelera-store";
import { SEAT_NUMBERS, SEAT_ROWS } from "../../../constants";

export const SeatMap = (movieId: number) => {
  const {
    seats,
    selectedSeats,
    isModalOpen,
    ticketPrice,
    toggleSeatStatus,
    openModal,
    closeModal,
    confirmPurchase,
  } = useCarteleraStore();

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

  const totalCost =
    (selectedSeats[movieId]?.filter((seat) => seat.status === "selected")
      .length || 0) * ticketPrice;

  return (
    <div className="seat-map-container">
      <div className="screen">Pantalla</div>
      <div className="seat-grid">
        {SEAT_ROWS.map((row: string) => (
          <div key={row} className="seat-row">
            {SEAT_NUMBERS.map((number: number) => {
              if (number === 9 || number === 10) {
                return <div key={`null-${number}`} className="seat-null">{row}</div>;
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
                  onClick={() => toggleSeatStatus(String(movieId), row, number)}
                >
                  {number > 10 ? number - 2 : number}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="seat-summary">
        <h3>Resumen de Compra</h3>
        <p>Asientos Seleccionados: {selectedSeats[movieId]?.length || 0}</p>
        <p>Total a Pagar: Bs {totalCost.toFixed(2)}</p>
        <button className="btn-purchase" onClick={openModal}>
          Comprar Entradas
        </button>
      </div>
      {isModalOpen && (
        <PurchaseModal
          selectedSeats={selectedSeats[movieId]?.length || 0}
          totalCost={totalCost}
          onClose={closeModal}
          onConfirmPurchase={() => confirmPurchase(String(movieId))}
        />
      )}
    </div>
  );
};