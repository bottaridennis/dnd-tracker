const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const characterRoutes = require('./routes/characterRoutes'); // Importa le route

const app = express();
app.use(express.json());
app.use(cors());

// Connessione a MongoDB
mongoose.connect('mongodb://localhost:27017/dndTracker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Usa le route dei personaggi
app.use('/api', characterRoutes); // Assicurati che questo sia corretto

// Avvia il server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
