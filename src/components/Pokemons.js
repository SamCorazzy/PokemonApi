import { useState, useEffect } from "react";
import Traduccion from './typesTraduction';
import Mayusculas from './capital_letters';

export default function Pokemons() {
    const [detalles, setdetalles] = useState([]);
    const [num, setNum] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

const url = "https://pokeapi.co/api/v2/pokemon/";
    
    const obtenerPoke = async (info) =>{
        const api = await fetch(`${url}${info}`);
        const infoPoke = await api.json();
        return infoPoke;
    }

    const masPoke = async () =>{
        setNum(num + 10);
        window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza hacia arriba con animación
        // console.log(num);
        
    } 

    const menosPoke = async () =>{
        setNum( num => num >= 0 ? setNum(num - 10) : 0 );
        window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza hacia arriba con animación
    }

    useEffect(() => {
        const reqApi = async () => {
            // console.log(num);
            try {
                const api = await fetch(`${url}?limit=10&offset=${num}`);
                const pokemonApi = await api.json();
                if (!api.ok) {
                    throw new Error(`Error ${api.status}: ${api.statusText}`);
                }
              // Obtener los detalles de cada Pokémon después de obtener los nombres
                const detalles = await Promise.all(
                    pokemonApi.results.map(async (pokemon) => {
                    const info = await obtenerPoke(pokemon.name);
                    return info; // Devuelve la información detallada del Pokémon
                    })
                );
                setdetalles(detalles); // Almacena los detalles de los Pokémon
            } catch (error){
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        reqApi();
      }, [num]); // Solo se ejecuta una vez cuando el componente se monta

      if (loading) return <div className="alert alert-success" role="alert"> Cargando datos...</div>;
      if (error) return <div className="alert alert-danger" role="alert"> Error: {error}</div>;  


    return(
        <div className="container-fluid mt-5 mb-5">
            <h1 className="mt-5">Pokemon</h1>
            <div className="row justify-content-center mx-auto">
                {detalles.map((pokemon, index) => (
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

                ))}
            </div>
            {/* If para mostrar el boton de anterior y siguiente dependiendo si num es 10 o mayor a 10 */}
            <div>
                {num >= 10 ? (
                <div className="masPokes">
                    <button className="btn btn-primary" type="button" onClick={menosPoke}>Atrás</button>
                    <button className="btn btn-primary" type="button" onClick={masPoke}>Siguiente</button>
                </div>
                ) : (
                    <button className="btn btn-primary" type="button" onClick={masPoke}>Siguiente</button>
                )}
            </div>
            
        </div>
    )
}