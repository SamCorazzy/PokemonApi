import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pokemons from "./components/Pokemons";
import Types from "./components/Types";
import Moves from "./components/Moves";
import Abilities from "./components/Abilities";
import "./components.css"


function App() {
  

  const InfoApi = () => {
    return (
      <div >
        <p>BIENVENIDO A LA POKEAPI HECHA POR SAMUEL</p>
      </div>
    )
  }
  

  return (
    <div className="App"> 
    <header className="App-header">
       <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <Router>
          <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top letraMenu">
            <div className="grid-container">
              <div className="col small text-left d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  POKEMONAPI
                </Link>
              </div>
              <div className="col large">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-left d-flex align-items-center" id="navbarNav">
                  <ul className="navbar-nav  mx-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/" data-toggle="collapse" data-target=".navbar-collapse.show">
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
                    <li className="nav-item">
                      <Link className="nav-link" to="/Moves">
                        MOVIMIENTOS
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Abilities">
                        HABILIDADES
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col small text-left d-flex align-items-center">
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="BUSCAR" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0 buscar" type="submit">BUSCAR</button>
                </form>
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
