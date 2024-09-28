import React from 'react';
import './SuccessPopup.css'; // Stile per il popup

const SuccessPopup = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-box">
                <h3>Personaggio creato con successo!</h3>
                <p>Il personaggio è stato aggiunto alla lista.</p>
                <button className="btn btn-primary" onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default SuccessPopup;
