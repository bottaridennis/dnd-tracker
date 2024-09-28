import React from 'react';
import './DeleteConfirmation.css'; // Crea uno stile per il popup

const DeleteConfirmation = ({ show, onConfirm, onCancel, characterName }) => {
  if (!show) return null;

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-box">
        <h3>Elimina {characterName}?</h3>
        <p>Sei sicuro di voler eliminare questo personaggio?</p>
        <div className="confirmation-buttons">
          <button className="btn btn-danger" onClick={onConfirm}>Elimina</button>
          <button className="btn btn-secondary" onClick={onCancel}>Annulla</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
