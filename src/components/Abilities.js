import { useState, useEffect } from "react"
import Mayus from "./capital_letters";

export default function Abilities() {
    const [ability, setAbility] = useState([]);
    const [loading, setLoading] = useState(true);
    const [num, setNum] = useState(0);
    const [error, setError] = useState(null);

    const url="https://pokeapi.co/api/v2/ability/";

    const obtenerHabili = async (infoH) => {
        const api = await fetch(`${url}${infoH}`);
        const resApi = await api.json();
        return resApi;
    }

    useEffect(()=> {
        const infoHabili = async () =>{
            try{
                const api = await fetch(`${url}?limit=20&offset=${num}`);
                const resApi = await api.json();

                if(!api.ok){
                    throw new Error(`Error ${api.status}: ${api.statusText}`);
                }

                const nameHabi = await Promise.all(
                    resApi.results.map(async (nameHa) =>{
                        const info = await obtenerHabili(nameHa.name);
                        return info;
                    })
                )
                setAbility(nameHabi);
            }catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };
        infoHabili();
    }, [num]);
    
    if (loading) return <div className="alert alert-success" role="alert"> Cargando datos...</div>;
    if (error) return <div className="alert alert-danger" role="alert"> Error: {error}</div>;

    const obtenerNombreEnEspanol = (abi) => {
        const nombre = abi.names.find(entry => entry.language.name === "es"); //entry → Es el parámetro que representa cada objeto dentro del array flavor_text_entries.
        return nombre ? nombre.name : "Descripción no disponible en español.";
    };

    const obtenerDescripcionEnEspanol = (abi) => {
        const descripcion = abi.flavor_text_entries.find(entry => entry.language.name === "es"); //entry → Es el parámetro que representa cada objeto dentro del array flavor_text_entries.
        return descripcion ? descripcion.flavor_text : "Descripción no disponible en español.";
    };


    return(
        <div className="container-fluid mt-5 mb-5">
            <h1 className="mt-5">HABILIDADES</h1>
            <div className="row justify-content-center mx-auto">
                {ability.map((abi, index) => (
                    <div className={`card alert alert-primary mr-3 mx-auto border border-primary`} style={{ width: '500px', height: 'auto' }} key={index}>
                        <div className="card-body">
                            <h3 className="card-title"> {obtenerNombreEnEspanol(abi)} (<Mayus word={abi.name}/>) </h3>
                            <p className="card-text"> Descripción: {obtenerDescripcionEnEspanol(abi)} </p>
                            <p className="card-text"> Algunos pokemon que poseen la habilidad:  </p>
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col"> Num. </th>
                                        <th scope="col"> Pokemon </th>
                                    </tr>
                                </thead>
                                {abi.pokemon.slice(0, 5).map((poke,id) =>(
                                    <tbody>
                                        <tr>
                                        
                                            <th scope="row"> {id+1} </th>
                                            <td> <Mayus word={poke.pokemon.name}/> </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
  //que se desgloce la informacion de los pokemon que usan esa habilidad con un boton Collapse bootstrap