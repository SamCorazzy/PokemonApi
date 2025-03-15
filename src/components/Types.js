import { useEffect, useState } from "react";
import Traduccion from './typesTraduction';


export default function Types() {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = "https://pokeapi.co/api/v2/type/";
    
    const nameTypes = async (nameType) =>{
        const api = await fetch(`${url}${nameType}`)
        const typesApi = await api.json();
        return typesApi;
    }

    useEffect(() => {
        const obtenerTypes = async () => {
            try{
                const api = await fetch(`${url}?limit=21`);
                // const api = await fetch("https://pokeapi.co/api/v2/typeX?limit=21"); //prueba de errores
                const typesApi = await api.json();
                if (!api.ok) {
                    throw new Error(`Error ${api.status}: ${api.statusText}`);
                }
                
                const infoTypes = await Promise.all(
                    typesApi.results.map(async (type) => {
                        const info = await nameTypes(type.name);
                        return info;
                    })
                );
                setTypes(infoTypes);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
            
        };

        obtenerTypes();
    }, []);

    if (loading) return <div className="alert alert-success" role="alert"> Cargando datos...</div>;
    if (error) return <div className="alert alert-danger" role="alert"> Error: {error}</div>;


    return (
        <div className="container-fluid mt-5 mb-5">
            <h1 className="mt-5">TIPOS</h1>
            <div className="row justify-content-center mx-auto">
                {/* {console.log(types)} */}
                {types.map((type, index) => (
                    <div className={`card alert alert-primary mr-3 mx-auto border border-primary ${type.name}`} style={{ width: '300px', height: 'auto' }} key={index}>
                        <div className="card-body">
                            <h5 className="card-title"> Tipo: {Traduccion[type.name]} </h5> {/* Traduciendo los tipos */}
                            {type.sprites?.["generation-viii"]?.["sword-shield"]?.name_icon ? (
                                <img src={type.sprites["generation-viii"]["sword-shield"].name_icon}  style={{ width: '150px', height: 'auto' }} alt="Sprite Gen VIII"/>
                            ) : (
                            <p className="alert alert-danger">No disponible</p>
                            )}
                            <p className="card-text"> </p>
                            <p className="card-text"> </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}