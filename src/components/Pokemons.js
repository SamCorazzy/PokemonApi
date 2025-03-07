import { useState, useEffect } from "react";
import Traduccion from './typesTraduction';

export default function Pokemons() {
    const [detalles, setdetalles] = useState([]);
    const [num, setNum] = useState(0);

    
    const obtenerPoke = async (info) =>{
        const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${info}`);
        const infoPoke = await api.json();
        return infoPoke;
    }

    const masPoke = async () =>{
        setNum(num + 10);
        console.log(num);
        
    } 

    const menosPoke = async () =>{
        setNum( num => num >= 0 ? setNum(num - 10) : 0 );
    }

    const mayusculas = (name) =>{
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return name;
    }

    useEffect(() => {
        const reqApi = async () => {
            console.log(num);
            const api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${num}`);
            const pokemonApi = await api.json();
          // Obtener los detalles de cada Pokémon después de obtener los nombres
            const detalles = await Promise.all(
                pokemonApi.results.map(async (pokemon) => {
                const info = await obtenerPoke(pokemon.name);
                return info; // Devuelve la información detallada del Pokémon
                })
            );
            setdetalles(detalles); // Almacena los detalles de los Pokémon
        };
    
        reqApi();
      }, [num]); // Solo se ejecuta una vez cuando el componente se monta

    return(
        <div className="container-fluid mt-5 mb-5">
            <h1 className="mt-5">Pokemon</h1>
            <div className="row justify-content-center mx-auto">
                {detalles.map((pokemon, index) => (
                    <div class="card alert alert-primary mr-3 mx-auto border border-primary" style={{ width: '300px', height: 'auto' }} key={index}>
                        <img src={pokemon.sprites.front_default} class="card-img-top mx-auto" alt={pokemon.name} title={mayusculas(pokemon.name)} style={{ width: 'auto', height: 'auto' }} ></img>
                        <div class="card-body">
                            <h5 class="card-title"> {mayusculas(pokemon.name)} </h5>
                            <p class="card-text"> Pokemon #{pokemon.id} </p>
                            <p class="card-text">Altura: {pokemon.height/10} m </p>
                            <p class="card-text">Peso: {pokemon.weight/10} Kg</p>
                            <p className="card-text"> Tipos: {pokemon.types.map((type) => Traduccion[type.type.name]).join(', ')}</p>{/* Este método se encarga de manejar tanto los Pokémon de un solo tipo como los de múltiples tipos, mostrando los tipos correctamente en la tarjeta de cada Pokémon. */}

                        </div>
                    </div>

                ))}
            </div>
            {/* If para mostrar el boton de anterior y siguiente dependiendo si num es 10 o mayor a 10 */}
            <div>
                {num >= 10 ? (
                <>
                    <button onClick={menosPoke}>Atrás</button>
                    <button onClick={masPoke}>Siguiente</button>
                </>
                ) : (
                    <button onClick={masPoke}>Siguiente</button>
                )}
            </div>
            
        </div>
    )
}