import React, { useState } from 'react';
import { addCharacter } from '../services/characterService'; // Usa addCharacter invece di createCharacter
import './CharacterForm.css'; // Importa il CSS per la grafica

const CharacterForm = () => {
    const [character, setCharacter] = useState({
        name: '',
        class: '',
        race: '',
        level: 1,
        stats: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
        },
        hitPoints: {
            max: 10,
            current: 10,
        },
        initiative: 0,
        speed: 9,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCharacter({ ...character, [name]: value });
    };

    const handleStatChange = (stat, value) => {
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            stats: {
                ...prevCharacter.stats,
                [stat]: parseInt(value, 10),
            },
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addCharacter(character); // Usa addCharacter per creare il nuovo personaggio
            // Reset form o mostra un messaggio di successo
        } catch (error) {
            console.error('Errore nella creazione del personaggio:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center text-white">Crea un Nuovo Personaggio</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nome del Personaggio</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={character.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Classe</label>
                        <input
                            type="text"
                            className="form-control"
                            name="class"
                            value={character.class}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Razza</label>
                        <input
                            type="text"
                            className="form-control"
                            name="race"
                            value={character.race}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Livello</label>
                        <input
                            type="number"
                            className="form-control"
                            name="level"
                            value={character.level}
                            onChange={handleInputChange}
                            min="1"
                            required
                        />
                    </div>
                </div>

                {/* Statistiche Primarie */}
                <div className="row">
                    {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map((stat) => (
                        <div className="col-md-4 mb-3" key={stat}>
                            <label className="form-label">{stat.charAt(0).toUpperCase() + stat.slice(1)}</label>
                            <input
                                type="number"
                                className="form-control"
                                name={stat}
                                value={character.stats[stat]}
                                onChange={(e) => handleStatChange(stat, e.target.value)}
                                min="1"
                                required
                            />
                        </div>
                    ))}
                </div>

                {/* Punti Ferita e Altri Dettagli */}
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Punti Ferita Massimi</label>
                        <input
                            type="number"
                            className="form-control"
                            name="maxHitPoints"
                            value={character.hitPoints.max}
                            onChange={(e) => setCharacter({ ...character, hitPoints: { ...character.hitPoints, max: parseInt(e.target.value, 10) } })}
                            min="1"
                            required
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Punti Ferita Attuali</label>
                        <input
                            type="number"
                            className="form-control"
                            name="currentHitPoints"
                            value={character.hitPoints.current}
                            onChange={(e) => setCharacter({ ...character, hitPoints: { ...character.hitPoints, current: parseInt(e.target.value, 10) } })}
                            min="1"
                            required
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Iniziativa</label>
                        <input
                            type="number"
                            className="form-control"
                            name="initiative"
                            value={character.initiative}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Velocità</label>
                        <input
                            type="number"
                            className="form-control"
                            name="speed"
                            value={character.speed}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Crea Personaggio</button>
            </form>
        </div>
    );
};

export default CharacterForm;
