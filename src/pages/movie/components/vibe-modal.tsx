import './vibe-modal.css';

interface VibeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const VibeModal = ({ isOpen, onClose }: VibeModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>¿Cuál es tu vibra?</h2>
                <p>Comparte cómo te hizo sentir la película. Elige una emoción:</p>
                <div className="vibe-options">
                    <button>😊</button>
                    <button>😂</button>
                    <button>🤔</button>
                    <button>😢</button>
                    <button>😡</button>
                </div>
                <button className="btn-1" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};
