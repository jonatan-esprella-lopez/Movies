import "./purchase-modal.css";

interface PurchaseModalProps {
  selectedSeats: number;
  totalCost: number;
  onClose: () => void;
  onConfirmPurchase: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  selectedSeats,
  totalCost,
  onClose,
  onConfirmPurchase,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmar Compra</h2>
        <p>Asientos seleccionados: {selectedSeats}</p>
        <p>Total a pagar: Bs{totalCost}</p>
        <div className="modal-actions">
          <button className="btn-confirm" onClick={onConfirmPurchase}>
            Confirmar Compra
          </button>
          <button className="btn-close" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
