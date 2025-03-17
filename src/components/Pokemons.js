import { useState, useEffect } from "react";
import Traduccion from './typesTraduction';
import Mayusculas from './capital_letters';

export default function Pokemons() {
    const [detalles, setDetalles] = useState([]);
    const [num, setNum] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

const url = "https://pokeapi.co/api/v2/pokemon/";
    
const obtenerPoke = async (info) => {
    try {
      const api = await fetch(`${url}${info.toLowerCase()}`); // Convertir a minúsculas para evitar errores
      if (!api.ok) throw new Error("Pokémon no encontrado");
      const infoPoke = await api.json();
      setDetalles([infoPoke]); // Guardar la respuesta en detalles
      return infoPoke;
    } catch (error) {
      console.error(error);
      setDetalles([]); // Vaciar detalles si hay error
    }
  };

    const masPoke = async () =>{
        setNum(num + 10);
        window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza hacia arriba con animación
        // console.log(num);
        
    } 

    const menosPoke = async () =>{
        setNum( num => num >= 0 ? setNum(num - 10) : 0 );
        window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza hacia arriba con animación
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim() === "") return;
        obtenerPoke(search);
      };

      const mostrarTodos = () => {
        setDetalles([]);  // Limpia los resultados de búsqueda
        setSearch("");    // Borra el input de búsqueda  
        // // Forzar un cambio en num para asegurar que useEffect se dispare
        setNum((prevNum) => (prevNum === 0 ? 1 : 0));
        
      };

      useEffect(() => {
        const reqApi = async () => {
          setLoading(true);
          try {
            const api = await fetch(`${url}?limit=10&offset=${num}`);
            const pokemonApi = await api.json();
            if (!api.ok) {
              throw new Error(`Error ${api.status}: ${api.statusText}`);
            }
            
            // Obtener los detalles de cada Pokémon
            const detallesPoke = await Promise.all(
              pokemonApi.results.map(async (pokemon) => {
                return await obtenerPoke(pokemon.name);
              })
            );
      
            setDetalles(detallesPoke); // Actualiza los Pokémon en pantalla
            setError(null);  // Resetea el error si todo salió bien
          } catch (error) {
            setError(error.message);
            setDetalles([]); // En caso de error, limpia los detalles
          } finally {
            setLoading(false);
          }
        };
      
        reqApi();
      }, [num]); // ⚠ Aquí es clave: solo se ejecuta cuando `num` cambia

      if (loading) return <div className="alert alert-success" role="alert"> Cargando datos...</div>;
      if (error) return <div className="alert alert-danger" role="alert"> Error: {error}</div>;  


    return(
        <div className="container-fluid mt-5 mb-5">
        {/* Barra de búsqueda */}
        <div className="d-flex justify-content-end flex-grow-1">
        <button className="btn btn-secondary my-2 my-sm-0 mr-2 todos" type="button" onClick={mostrarTodos}>
            Mostrar todos
        </button>
            <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
                <input className="form-control mr-2 search" type="search" placeholder="BUSCAR POKEMON" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <button className="btn btn-outline-success my-2 my-sm-0 buscar" type="submit">
                    <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                </button>
            </form>
        </div>
            <h1 className="mt-5">Pokemon</h1>
            <div className="row justify-content-center mx-auto">
            {detalles.length > 0 ? (
                detalles.map((pokemon, index) => (
                    <div className={`card alert alert-primary mr-3 mx-auto border border-primary ${pokemon.types[0].type.name}`} style={{ width: '300px', height: 'auto' }} key={index}>
                        <img src={pokemon.sprites.front_default} className="card-img-top mx-auto pokemon-img" alt={pokemon.name}  title={Mayusculas({ word: pokemon.name })}></img>
                        <div className="card-body">
                            <h3 className="card-title"> <Mayusculas word={pokemon.name} /> </h3>
                            <p className="card-text"> Pokemon #{pokemon.id} </p>
                            <p className="card-text">Altura: {pokemon.height/10} m </p>
                            <p className="card-text">Peso: {pokemon.weight/10} Kg</p>
                            <p className="card-text"> Tipo(s): {pokemon.types.map((type) => Traduccion[type.type.name]).join(', ')}</p>{/* Este método se encarga de manejar tanto los Pokémon de un solo tipo como los de múltiples tipos, mostrando los tipos correctamente en la tarjeta de cada Pokémon. */}

                        </div>
                    </div>

                ))
            ) : (
                <p className="text-center mt-3">No se ha encontrado ningún Pokémon.</p>
            )}
                
            </div>
            {/* If para mostrar el boton de anterior y siguiente dependiendo si num es 10 o mayor a 10 */}
            <div>
                {num >= 10 && search.length === 0 ? (
                <div className="masPokes">
                    <button className="btn btn-primary" type="button" onClick={menosPoke}>Atrás</button>
                    <button className="btn btn-primary" type="button" onClick={masPoke}>Siguiente</button>
                </div>
                ) : search.length === 0 ? (
                    <button className="btn btn-primary" type="button" onClick={masPoke}>Siguiente</button>
                ): (<p className="text-center mt-3">No se ha encontrado ningún Pokémon.</p>)
                }
            </div>
            
        </div>
    )
}