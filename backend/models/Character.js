const mongoose = require('mongoose');

// Definizione dello schema per i personaggi D&D
const CharacterSchema = new mongoose.Schema({
    name: { type: String, required: true },                // Nome del personaggio
    class: { type: String, required: true },               // Classe del personaggio (es: Guerriero, Mago)
    race: { type: String, required: true },                // Razza del personaggio (es: Elfo, Nano)
    alignment: { type: String },                           // Allineamento del personaggio (es: Caotico Neutrale)
    level: { type: Number, default: 1 },                   // Livello del personaggio
    hitPoints: {                                           // Punti ferita
        max: { type: Number, default: 10 },                  // PF massimi
        current: { type: Number, default: 10 }               // PF attuali
    },
    stats: {                                               // Statistiche del personaggio
        strength: { type: Number, default: 10 },             // Forza
        dexterity: { type: Number, default: 10 },            // Destrezza
        constitution: { type: Number, default: 10 },         // Costituzione
        intelligence: { type: Number, default: 10 },         // Intelligenza
        wisdom: { type: Number, default: 10 },               // Saggezza
        charisma: { type: Number, default: 10 }              // Carisma
    },
    skills: {                                              // Abilità
        athletics: { type: Number, default: 0 },             // Atletica (Forza)
        acrobatics: { type: Number, default: 0 },            // Acrobazia (Destrezza)
        stealth: { type: Number, default: 0 },               // Furtività (Destrezza)
        history: { type: Number, default: 0 },               // Storia (Intelligenza)
        arcana: { type: Number, default: 0 },                // Arcano (Intelligenza)
        investigation: { type: Number, default: 0 },         // Investigazione (Intelligenza)
        nature: { type: Number, default: 0 },                // Natura (Intelligenza)
        medicine: { type: Number, default: 0 },              // Medicina (Saggezza)
        perception: { type: Number, default: 0 },            // Percezione (Saggezza)
        insight: { type: Number, default: 0 },               // Intuizione (Saggezza)
        survival: { type: Number, default: 0 },              // Sopravvivenza (Saggezza)
        persuasion: { type: Number, default: 0 },            // Persuasione (Carisma)
        intimidation: { type: Number, default: 0 },          // Intimidazione (Carisma)
        performance: { type: Number, default: 0 },           // Recitazione (Carisma)
        deception: { type: Number, default: 0 }              // Inganno (Carisma)
    },
    armorClass: { type: Number, default: 10 },             // Classe armatura
    initiative: { type: Number, default: 0 },              // Iniziativa
    speed: { type: Number, default: 9 },                  // Velocità di movimento
    savingThrows: {                                        // Tiri salvezza
        strength: { type: Number, default: 0 },         // Tiro salvezza su Forza
        dexterity: { type: Number, default: 0 },        // Tiro salvezza su Destrezza
        constitution: { type: Number, default: 0 },     // Tiro salvezza su Costituzione
        intelligence: { type: Number, default: 0 },     // Tiro salvezza su Intelligenza
        wisdom: { type: Number, default: 0 },           // Tiro salvezza su Saggezza
        charisma: { type: Number, default: 0 }          // Tiro salvezza su Carisma
    },
    inventory: {
        coins: {
            copper: { type: Number, default: 0 },
            silver: { type: Number, default: 0 },
            gold: { type: Number, default: 0 },
        },
        items: [
            {
                name: { type: String, required: true },
                description: { type: String },
                image: { type: String }, // URL o nome dell'immagine
            }
        ]
    }
}, { collection: 'pgs' });  // Specifica la collezione 'pgs' per i personaggi

// Esporta il modello
const Character = mongoose.model('Character', CharacterSchema);
module.exports = Character;
