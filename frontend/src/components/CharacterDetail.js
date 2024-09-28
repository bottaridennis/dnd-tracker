import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCharacterById, updateCharacter } from '../services/characterService'; // Funzioni per ottenere e aggiornare un singolo personaggio
import './CharacterDetail.css'; // Importa il file CSS

const CharacterDetail = () => {
    const { id } = useParams(); // Ottieni l'ID dal parametro dell'URL
    const [character, setCharacter] = useState(null);
    const [hitPoints, setHitPoints] = useState({ max: 0, current: 0 });
    const [openStats, setOpenStats] = useState({}); // Stato per gestire le statistiche aperte
    const [isEditing, setIsEditing] = useState(false); // Stato per gestire la modalità modifica

    const fetchCharacter = async () => {
        try {
            const data = await getCharacterById(id);
            setCharacter(data);
            setHitPoints({ max: data.hitPoints.max, current: data.hitPoints.current });
        } catch (error) {
            console.error('Error fetching character:', error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedCharacter = { ...character, hitPoints: { max: hitPoints.max, current: hitPoints.current } };
            await updateCharacter(id, updatedCharacter); // Usa una funzione per aggiornare il personaggio
            fetchCharacter(); // Ricarica il personaggio per vedere le modifiche
        } catch (error) {
            console.error('Error updating character:', error);
        }
    };

    const handleStatChange = (stat, value) => {
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            stats: {
                ...prevCharacter.stats,
                [stat]: Math.max(1, prevCharacter.stats[stat] + value), // Non permettere valori inferiori a 1
            },
        }));
    };

    const toggleStatDropdown = (stat) => {
        setOpenStats((prev) => ({
            ...prev,
            [stat]: !prev[stat], // Alterna l'apertura della tendina
        }));
    };

    useEffect(() => {
        fetchCharacter();
    }, [id]);

    if (!character) return <div className="text-center">Loading...</div>; // Mostra un caricamento finché i dati non sono pronti

    // Calcola i modificatori delle statistiche
    const calculateModifier = (stat) => {
        return Math.floor((stat - 10) / 2);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">{character.name}</h2>
            <h5>Classe: {character.class}</h5>
            <h5>Razza: {character.race}</h5>
            <h5>Livello: {character.level}</h5>

            {/* Modalità Modifica */}
            <div className="text-center mb-3">
                <button className="btn btn-secondary" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Disabilita Modifica' : 'Abilita Modifica'}
                </button>
            </div>

            {/* Tabella per Forza */}
            <div className="card mt-3 strength">
                <div className="card-header" onClick={() => toggleStatDropdown('strength')}>
                    <h4>Forza: {character.stats.strength}</h4>
                </div>
                {openStats.strength && (
                    <div className="card-body">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Atletica</td>
                                    <td>{character.skills.athletics + calculateModifier(character.stats.strength)}</td>
                                </tr>
                                <tr>
                                    <td>
                                        Valore
                                        {isEditing && (
                                            <div>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => handleStatChange('strength', 1)}>+</button>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => handleStatChange('strength', -1)}>-</button>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={character.stats.strength}
                                                onChange={e => setCharacter({ ...character, stats: { ...character.stats, strength: parseInt(e.target.value) } })}
                                            />
                                        ) : (
                                            character.stats.strength
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Tabella per Destrezza */}
            <div className="card mt-3 dexterity">
                <div className="card-header" onClick={() => toggleStatDropdown('dexterity')}>
                    <h4>Destrezza: {character.stats.dexterity}</h4>
                </div>
                {openStats.dexterity && (
                    <div className="card-body">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Rapidità di Mano</td>
                                    <td>{character.skills.acrobatics + calculateModifier(character.stats.dexterity)}</td>
                                </tr>
                                <tr>
                                    <td>Furtività</td>
                                    <td>{character.skills.stealth + calculateModifier(character.stats.dexterity)}</td>
                                </tr>
                                <tr>
                                    <td>Valore
                                        {isEditing && (
                                            <div>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => handleStatChange('dexterity', 1)}>+</button>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => handleStatChange('dexterity', -1)}>-</button>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={character.stats.dexterity}
                                                onChange={e => setCharacter({ ...character, stats: { ...character.stats, dexterity: parseInt(e.target.value) } })}
                                            />
                                        ) : (
                                            character.stats.dexterity
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Tabella per Costituzione */}
            <div className="card mt-3 constitution">
                <div className="card-header" onClick={() => toggleStatDropdown('constitution')}>
                    <h4>Costituzione: {character.stats.constitution}</h4>
                </div>
                {openStats.constitution && (
                    <div className="card-body">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Valore
                                        {isEditing && (
                                            <div>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => handleStatChange('constitution', 1)}>+</button>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => handleStatChange('constitution', -1)}>-</button>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={character.stats.constitution}
                                                onChange={e => setCharacter({ ...character, stats: { ...character.stats, constitution: parseInt(e.target.value) } })}
                                            />
                                        ) : (
                                            character.stats.constitution
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Tabella per Intelligenza */}
            <div className="card mt-3 intelligence">
                <div className="card-header" onClick={() => toggleStatDropdown('intelligence')}>
                    <h4>Intelligenza: {character.stats.intelligence}</h4>
                </div>
                {openStats.intelligence && (
                    <div className="card-body">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Storia</td>
                                    <td>{character.skills.history + calculateModifier(character.stats.intelligence)}</td>
                                </tr>
                                <tr>
                                    <td>Arcano</td>
                                    <td>{character.skills.arcana + calculateModifier(character.stats.intelligence)}</td>
                                </tr>
                                <tr>
                                    <td>Valore
                                        {isEditing && (
                                            <div>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => handleStatChange('intelligence', 1)}>+</button>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => handleStatChange('intelligence', -1)}>-</button>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={character.stats.intelligence}
                                                onChange={e => setCharacter({ ...character, stats: { ...character.stats, intelligence: parseInt(e.target.value) } })}
                                            />
                                        ) : (
                                            character.stats.intelligence
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Tabella per Saggezza */}
            <div className="card mt-3 wisdom">
                <div className="card-header" onClick={() => toggleStatDropdown('wisdom')}>
                    <h4>Saggezza: {character.stats.wisdom}</h4>
                </div>
                {openStats.wisdom && (
                    <div className="card-body">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Medicina</td>
                                    <td>{character.skills.medicine + calculateModifier(character.stats.wisdom)}</td>
                                </tr>
                                <tr>
                                    <td>Percezione</td>
                                    <td>{character.skills.perception + calculateModifier(character.stats.wisdom)}</td>
                                </tr>
                                <tr>
                                    <td>Valore
                                        {isEditing && (
                                            <div>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => handleStatChange('wisdom', 1)}>+</button>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => handleStatChange('wisdom', -1)}>-</button>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={character.stats.wisdom}
                                                onChange={e => setCharacter({ ...character, stats: { ...character.stats, wisdom: parseInt(e.target.value) } })}
                                            />
                                        ) : (
                                            character.stats.wisdom
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Tabella per Carisma */}
            <div className="card mt-3 charisma">
                <div className="card-header" onClick={() => toggleStatDropdown('charisma')}>
                    <h4>Carisma: {character.stats.charisma}</h4>
                </div>
                {openStats.charisma && (
                    <div className="card-body">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Persuasione</td>
                                    <td>{character.skills.persuasion + calculateModifier(character.stats.charisma)}</td>
                                </tr>
                                <tr>
                                    <td>Intimidazione</td>
                                    <td>{character.skills.intimidation + calculateModifier(character.stats.charisma)}</td>
                                </tr>
                                <tr>
                                    <td>Valore
                                        {isEditing && (
                                            <div>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => handleStatChange('charisma', 1)}>+</button>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => handleStatChange('charisma', -1)}>-</button>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={character.stats.charisma}
                                                onChange={e => setCharacter({ ...character, stats: { ...character.stats, charisma: parseInt(e.target.value) } })}
                                            />
                                        ) : (
                                            character.stats.charisma
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Punti vita e statistiche secondarie */}
            <div className="card mt-3">
                <div className="card-header">
                    <h4>Statistiche Secondarie</h4>
                </div>
                <div className="card-body">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Classe Armatura (CA)</td>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={character.armorClass}
                                            onChange={e => setCharacter({ ...character, armorClass: parseInt(e.target.value) })}
                                        />
                                    ) : (
                                        character.armorClass
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Punti Ferita (PF)</td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={hitPoints.current}
                                        onChange={e => setHitPoints({ ...hitPoints, current: parseInt(e.target.value) })}
                                    /> /
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={hitPoints.max}
                                        onChange={e => setHitPoints({ ...hitPoints, max: parseInt(e.target.value) })}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Iniziativa</td>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={character.initiative}
                                            onChange={e => setCharacter({ ...character, initiative: parseInt(e.target.value) })}
                                        />
                                    ) : (
                                        character.initiative
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Velocità</td>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={character.speed}
                                            onChange={e => setCharacter({ ...character, speed: parseInt(e.target.value) })}
                                        />
                                    ) : (
                                        character.speed
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tiri di Salvezza */}
            <div className="card mt-3">
                <div className="card-header">
                    <h4>Tiri di Salvezza</h4>
                </div>
                <div className="card-body">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Forza</td>
                                <td>{calculateModifier(character.stats.strength)}</td>
                            </tr>
                            <tr>
                                <td>Destrezza</td>
                                <td>{calculateModifier(character.stats.dexterity)}</td>
                            </tr>
                            <tr>
                                <td>Costituzione</td>
                                <td>{calculateModifier(character.stats.constitution)}</td>
                            </tr>
                            <tr>
                                <td>Intelligenza</td>
                                <td>{calculateModifier(character.stats.intelligence)}</td>
                            </tr>
                            <tr>
                                <td>Saggezza</td>
                                <td>{calculateModifier(character.stats.wisdom)}</td>
                            </tr>
                            <tr>
                                <td>Carisma</td>
                                <td>{calculateModifier(character.stats.charisma)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={handleUpdate}>Aggiorna Personaggio</button>
            </div>
        </div>
    );
};

export default CharacterDetail;