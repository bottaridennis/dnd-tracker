import React, { useEffect, useState } from 'react';
import { getCharacters, deleteCharacterById } from '../services/characterService';
import { Link } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';
import './CharacterList.css';

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [characterToDelete, setCharacterToDelete] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const fetchCharacters = async () => {
        try {
            const data = await getCharacters();
            setCharacters(data);
        } catch (error) {
            console.error('Errore nel recupero dei personaggi:', error);
        }
    };

    const handleDelete = async () => {
        if (characterToDelete) {
            try {
                await deleteCharacterById(characterToDelete._id); // Assicurati che l'ID sia corretto
                setCharacters(characters.filter(char => char._id !== characterToDelete._id)); // Aggiorna la lista
                setShowConfirmation(false); // Nascondi il popup
                setCharacterToDelete(null); // Reset del personaggio da eliminare
            } catch (error) {
                console.error('Errore nell\'eliminazione del personaggio:', error);
            }
        }
    };

    const confirmDelete = (character) => {
        setCharacterToDelete(character);
        setShowConfirmation(true);
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
        setCharacterToDelete(null);
    };

    useEffect(() => {
        fetchCharacters();
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center text-white">Lista Personaggi</h1>
            <div className="row">
                {characters.map(char => (
                    <div className="col-md-4 mb-4" key={char._id}>
                        <div className="card character-card">
                            <div className="card-header">
                                <h5 className="card-title">{char.name}</h5>
                            </div>
                            <div className="card-body">
                                <p><strong>Classe:</strong> {char.class}</p>
                                <p><strong>Livello:</strong> {char.level}</p>
                                <Link to={`/character/${char._id}`} className="btn btn-primary">Dettagli</Link>
                                <button
                                    className="btn btn-danger ms-2"
                                    onClick={() => confirmDelete(char)}
                                >
                                    Elimina
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup di conferma */}
            <DeleteConfirmation
                show={showConfirmation}
                onConfirm={handleDelete}
                onCancel={cancelDelete}
                characterName={characterToDelete?.name}
            />
        </div>
    );
};

export default CharacterList;
