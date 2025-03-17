import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pokemons from "./components/Pokemons";
import Types from "./components/Types";
import Moves from "./components/Moves";
import Abilities from "./components/Abilities";
import "./components.css";
import React, { useState } from "react";


function App() {
  

  const InfoApi = () => {
    return (
      <div >
        <p>BIENVENIDO A LA POKEAPI HECHA POR SAMUEL</p>
      </div>
    )
  }
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <div className="App"> 
    <header className="App-header">
       <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top letraMenu">
          <div className="container d-flex justify-content-between align-items-center">
            {/* Logo */}
            <Link className="navbar-brand" to="/">
              POKEMONAPI
            </Link>

            {/* Botón de colapso */}
            <button 
              className="navbar-toggler" 
              type="button" 
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Menú colapsable */}
            <div className={`collapse navbar-collapse ${isOpen ? "show" : ""} `} id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>
                    INICIO <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Pokemons" onClick={() => setIsOpen(false)}>
                    POKEMONS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Types" onClick={() => setIsOpen(false)}>
                    TIPOS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Moves" onClick={() => setIsOpen(false)}>
                    MOVIMIENTOS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Abilities" onClick={() => setIsOpen(false)}>
                    HABILIDADES
                  </Link>
                </li>
              </ul>

            </div>
          </div>
        </nav>
          <Routes>
            <Route path="/" element={InfoApi()}></Route>
            <Route path="/Pokemons" element={<Pokemons />}></Route>
            <Route path="/Types" element={<Types />}></Route>
            <Route path="/Moves" element={<Moves />}></Route>
            <Route path="/Abilities" element={<Abilities />}></Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
