const express = require('express');
const Character = require('../models/Character');
const router = express.Router();

// Route per ottenere tutti i personaggi
router.get('/characters', async (req, res) => {
    try {
        const characters = await Character.find();
        res.json(characters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route per ottenere un singolo personaggio
router.get('/characters/:id', async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) return res.status(404).json({ message: 'Character not found' });
        res.json(character);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route per aggiornare un personaggio
router.put('/characters/:id', async (req, res) => {
    try {
        const updatedCharacter = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCharacter) return res.status(404).json({ message: 'Character not found' });
        res.json(updatedCharacter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route per aggiungere un nuovo personaggio
router.post('/characters', async (req, res) => {
    const character = new Character(req.body);
    try {
        const newCharacter = await character.save();
        res.status(201).json(newCharacter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route per eliminare un personaggio
router.delete('/characters/:id', async (req, res) => {
    try {
        const character = await Character.findByIdAndDelete(req.params.id);
        if (!character) return res.status(404).json({ message: 'Personaggio non trovato' });
        res.json({ message: 'Personaggio eliminato con successo' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
