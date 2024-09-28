import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CharacterList from './components/CharacterList'; // Componente per la lista dei personaggi
import CharacterForm from './components/CharacterForm'; // Componente per la creazione di un personaggio
import CharacterDetail from './components/CharacterDetail'; // Componente per i dettagli del personaggio
import CharacterSelector from './components/CharacterSelector'; // Componente per la selezione dei personaggi
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import './App.css'; // Importa il CSS generale

const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#5b4965' }}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">BtB</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Lista Personaggi</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create">Crea Personaggio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/selector">Seleziona Personaggio</Link> {/* Link per la selezione */}
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/create" element={<CharacterForm />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/selector" element={<CharacterSelector />} /> {/* Percorso per il selettore */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
