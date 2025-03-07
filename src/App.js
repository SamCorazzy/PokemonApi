import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pokemons from "./components/Pokemons";
import Types from "./components/Types";
import Moves from "./components/Moves";
import Abilities from "./components/Abilities";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <Router>
          <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div class="container-fluid">
              <Link class="navbar-brand" href="#">
                PokemonAPI
              </Link>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav  mx-auto">
                  <li class="nav-item active">
                    <Link class="nav-link" to="/Home">
                      HOME <span class="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/Pokemons">
                      POKEMONS <span class="sr-only"></span>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      TIPÓS
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      MOVIMIENTOS
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      HABILIDADES
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/Pokemons" element={<Pokemons />}></Route>
            <Route path="/Home" element={""}></Route>
          </Routes>
        </Router>
        
      </header>
      <script
        src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct"
        crossorigin="anonymous"
      ></script>
    </div>
  );
}

export default App;
