import React, { useEffect, useState } from 'react';
import { getCharacters } from '../services/characterService'; // Assicurati di avere questa funzione per ottenere i personaggi
import './CharacterSelector.css'; // Importa il CSS per il componente

const CharacterSelector = () => {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [statSearchTerm, setStatSearchTerm] = useState('');

    const fetchCharacters = async () => {
        try {
            const data = await getCharacters();
            setCharacters(data);
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };

    useEffect(() => {
        fetchCharacters();
    }, []);

    const handleCharacterChange = (event) => {
        const characterId = event.target.value;
        const character = characters.find(char => char._id === characterId);
        setSelectedCharacter(character);
        setStatSearchTerm(''); // Resetta il termine di ricerca quando si cambia personaggio
    };

    const calculateModifier = (stat) => {
        return Math.floor((stat - 10) / 2);
    };

    // Statistiche da cercare
    const allStats = {
        strength: { name: 'Forza', value: selectedCharacter?.stats?.strength },
        dexterity: { name: 'Destrezza', value: selectedCharacter?.stats?.dexterity },
        constitution: { name: 'Costituzione', value: selectedCharacter?.stats?.constitution },
        intelligence: { name: 'Intelligenza', value: selectedCharacter?.stats?.intelligence },
        wisdom: { name: 'Saggezza', value: selectedCharacter?.stats?.wisdom },
        charisma: { name: 'Carisma', value: selectedCharacter?.stats?.charisma },
        armorClass: { name: 'Classe Armatura (CA)', value: selectedCharacter?.armorClass },
        hitPoints: { name: 'Punti Ferita (PF)', value: `${selectedCharacter?.hitPoints?.current} / ${selectedCharacter?.hitPoints?.max}` },
        initiative: { name: 'Iniziativa', value: selectedCharacter?.initiative },
        speed: { name: 'Velocità', value: selectedCharacter?.speed },
    };

    // Filtra le statistiche in base alla ricerca
    const filteredStats = Object.values(allStats).filter(stat =>
        stat.name.toLowerCase().includes(statSearchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2 className="text-center text-white">Seleziona Personaggio e Cerca Statistica</h2>

            <select className="form-select mb-3" onChange={handleCharacterChange} defaultValue="">
                <option value="" disabled>Scegli un personaggio</option>
                {characters.map(character => (
                    <option key={character._id} value={character._id}>{character.name}</option>
                ))}
            </select>

            {selectedCharacter && (
                <div>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Cerca una statistica..."
                        value={statSearchTerm}
                        onChange={(e) => setStatSearchTerm(e.target.value)}
                    />

                    {filteredStats.length > 0 ? (
                        <div className="card mt-3">
                            <div className="card-header">
                                <h4>Statistiche Trovate:</h4>
                            </div>
                            <div className="card-body">
                                <ul className="list-group">
                                    {filteredStats.map(stat => (
                                        <li className="list-group-item" key={stat.name}>
                                            <strong>{stat.name}:</strong> {stat.value} | Modificatore: {calculateModifier(stat.value)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="text-white mt-3">Nessuna statistica trovata.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CharacterSelector;
