import { useEffect, useState } from "react";
import Traduccion from './typesTraduction';


export default function Types() {
    const [types, setTypes] = useState([]);
    
    const nameTypes = async (nameType) =>{
        const api = await fetch(`https://pokeapi.co/api/v2/type/${nameType}`)
        const typesApi = await api.json();
        return typesApi;
    }

    useEffect(() => {
        const obtenerTypes = async () => {
            const api = await fetch(`https://pokeapi.co/api/v2/type?limit=21&offset=0`);
            const typesApi = await api.json();
            
            const infoTypes = await Promise.all(
                typesApi.results.map(async (type) => {
                    const info = await nameTypes(type.name);
                    return info;
                })
            );
            setTypes(infoTypes);
        }

        obtenerTypes();
    }, []);


    return (
        <div className="container-fluid mt-5 mb-5">
            <h1 className="mt-5">TIPOS</h1>
            <div className="row justify-content-center mx-auto">
                {/* {console.log(types)} */}
                {types.map((type, index) => (
                    <div className={`card alert alert-primary mr-3 mx-auto border border-primary ${type.name}`} style={{ width: '300px', height: 'auto' }} key={index}>
                        <div class="card-body">
                            <h5 class="card-title"> Tipo: {Traduccion[type.name]} </h5> {/* Traduciendo los tipos */}
                            <p class="card-text">  </p>
                            <p class="card-text"> </p>
                            <p class="card-text"> </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}