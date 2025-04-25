import { useEffect, useState } from "react";
import Traduccion from "./typesTraduction"
import Mayusculas from './capital_letters';

export default function Moves() {
    const [moves, setMoves] = useState([]);
    const [num, setNum] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const url = "https://pokeapi.co/api/v2/move/";

    const namesMoves = async (nameMoves) =>{
        try{
            const api = await fetch(`${url}${nameMoves.toLowerCase()}`);
            if (!api.ok) throw new Error("Movimiento no encontrado");
            const moveApi = await api.json();
            setMoves([moveApi]); // Guardar la respuesta en detalles
            return moveApi;
        } catch (error) {
            console.error(error);
            setMoves([]); // Vaciar detalles si hay error
        }
    }

    const masMoves = async () =>{
        setNum(num + 30);
        window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza hacia arriba con animación
        // console.log(num);
    } 

    const menosMoves = async () =>{
        setNum( num => num >= 0 ? setNum(num - 30) : 0 );
        window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza hacia arriba con animación
    }

    const obtenerDescripcionEnEspanol = (mov) => {
        const descripcion = mov.flavor_text_entries.find(entry => entry.language.name === "es"); //entry → Es el parámetro que representa cada objeto dentro del array flavor_text_entries.
        return descripcion ? descripcion.flavor_text : "Descripción no disponible en español.";
    };
    
    const mostrarTodos = () => {
        setMoves([]);  // Limpia los resultados de búsqueda
        setSearch("");    // Borra el input de búsqueda  
        // // Forzar un cambio en num para asegurar que useEffect se dispare
        setNum((prevNum) => (prevNum === 0 ? 1 : 0));
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim() === "") return;
        namesMoves(search);
    };

    useEffect(() => {
        const obtenerMoves = async () => {
            try{
                const api = await fetch(`${url}?limit=30&offset=${num}`);
                const moveApi = await api.json();

                if(!api.ok){
                    throw new Error(`Error ${api.status}: ${api.statusText}`);
                }

                const nameMoves = await Promise.all(
                    moveApi.results.map(async (move) =>{
                        const infoName = await namesMoves(move.name);
                        return infoName;
                    })
                );
                setMoves(nameMoves);
            }catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };
        obtenerMoves();
    }, [num]);

    if (loading) return <div className="alert alert-success" role="alert"> Cargando datos...</div>;
    if (error) return <div className="alert alert-danger" role="alert"> Error: {error}</div>;

    return(
        <div className="container-fluid mt-5 mb-5">
            <div className="d-flex justify-content-end flex-grow-1 pt-4">
                <button className="btn btn-secondary my-2 my-sm-0 mr-2 todos" type="button" onClick={mostrarTodos}>
                    Mostrar todos
                </button>
                <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
                    <input className="form-control mr-2 search" type="search" placeholder="BUSCAR MOVIMIENTO" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <button className="btn btn-outline-success my-2 my-sm-0 buscar" type="submit">
                        <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                    </button>
                </form>
            </div>
            <h1 className="mt-5">MOVIMIENTOS</h1>
            <div className="row justify-content-center mx-auto">
                {/* {console.log(types)} */}
                {moves.length > 0 ? (
                    moves.map((mov, index) => (
                        <div className={`card alert alert-primary mr-3 mx-auto border border-primary ${mov.type.name}`} style={{ width: '500px', height: 'auto' }} key={index}>
                            <div className="card-body">
                                <h3 className="card-title"> {mov.names[5].name} (<Mayusculas word={mov.name}/>) </h3>
                                <p className="card-text"> Descripción: {obtenerDescripcionEnEspanol(mov)} </p>
                                <p className="card-text"> Movimiento de tipo: {Traduccion[mov.type.name]} </p>
                                <p className="card-text"> Poder: {mov.power || "--"} </p>
                                <p className="card-text"> Puntos de poder: {mov.pp} </p>
                                <p className="card-text"> Precisión: {mov.accuracy} </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center mt-3">No se ha encontrado ningún Movimiento.</p>
                )}
            </div>
            {/* If para mostrar el boton de anterior y siguiente dependiendo si num es 10 o mayor a 10 */}
            <div>
                {num >= 30 && search.length === 0 ? (
                <div className="masPokes">
                    <button className="btn btn-primary" type="button" onClick={menosMoves}>Atrás</button>
                    <button className="btn btn-primary" type="button" onClick={masMoves}>Siguiente</button>
                </div>
                )  : search.length === 0 ? (
                    <button className="btn btn-primary" type="button" onClick={masMoves}>Siguiente</button>
                ) : (<></>)
                }
            </div>
            

        </div>

    )
}