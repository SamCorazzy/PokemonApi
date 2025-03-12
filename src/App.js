import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pokemons from "./components/Pokemons";
import Types from "./components/Types";
import Moves from "./components/Moves";
import Abilities from "./components/Abilities";


function App() {

  const infoApi = () => {
    return (
      <div>
        <p>BIENVENIDO A LA POKEAPI HECHA POR SAMUEL</p>
      </div>
    )
  }
  

  return (
    <div className="App"> 
    <header className="App-header">
       <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <Router>
          <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
              <div className="col-2 text-left">
                <Link className="navbar-brand" to="/">
                  PokemonAPI
                </Link>
              </div>
              <div className="col-10">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="col-10 collapse navbar-collapse justify-content-center" id="navbarNav">
                  <ul className="navbar-nav  mx-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/Home" data-toggle="collapse" data-target=".navbar-collapse.show">
                        HOME <span className="sr-only">(current)</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Pokemons" data-toggle="collapse" data-target=".navbar-collapse.show">
                        POKEMONS <span className="sr-only"></span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Types" data-toggle="collapse" data-target=".navbar-collapse.show">
                        TIPÓS
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                      <a className="nav-link" href="#">
                        MOVIMIENTOS
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        HABILIDADES
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/Home" element={infoApi()}></Route>
            <Route path="/Pokemons" element={<Pokemons />}></Route>
            <Route path="/Types" element={<Types />}></Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
