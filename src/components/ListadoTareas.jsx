import { useState, useEffect } from "react";
import Error from "./Error"
import EliminarTask from "./EliminarTask"
import Tareas from "./Tareas"

const ListadoTareas = ({tareas, setTareas, eliminarTarea, proyectos, proyectoSeleccionado, tareasProyecto, setTareasProyecto}) => {
  

  const [ tarea, setTarea] = useState('');

  const [ error, setError ] = useState(false);


  const handleKeyDown = (e) => {
    e.key === "Enter" && handleAñadir();
  };

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  const handleAñadir = () => {
    if (tarea === "") {
      setError(true);
      return;
    }

    if (/^\d+$/.test(tarea)) {
      setError(true);
      return;
    }

    setError(false);

    const objetoTarea = {
      id: generarId(),
      tarea,
      proyecto: proyectoSeleccionado
    };

    setTareas([...tareas, objetoTarea]);
    setTarea("");
  };

  useEffect(() => {
    const tareasProyecto = tareas.filter(
      (tarea) => tarea.proyecto === proyectoSeleccionado
    );
    setTareasProyecto(tareasProyecto);
  }, [tareas, proyectoSeleccionado]);


  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5 md:mx-20">
        <h2 className="font-black text-3xl text-center text-green-700 pt-5 md:pt-0">Agrega una Tarea</h2>
    
        <p className="text-lg mt-2 text-center">
          {'"De pequeños comienzos, surgen grandes cosas"'}
        </p>

          {proyectos && proyectos.length ? (
            <p className="text-lg text-center mb-5 font-bold">Proyecto: {proyectoSeleccionado}</p>
          ): (
            <div className="text-center">
              <span className="text-red-500">No hay proyectos disponibles</span>
            </div>
          )}


        { error && <Error> <p>Ingresa una tarea</p> </Error> }

        <div className="relative mt-2 rounded shadow-sm">
          <input type="text" className="mt-1 px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-700 focus:ring-green-700 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Ejemplo: Aprender Hooks"
          value={tarea}
          onChange={e => setTarea(e.target.value)}
          onKeyDown={handleKeyDown} 
          />
          <div className="absolute inset-y-0 right-0 flex items-center mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer bg-green-700 text-white rounded-xl" onClick={handleAñadir}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          </div>
        </div>
        { tareasProyecto  && tareasProyecto.length ? (
        <>
        <p className="text-center pt-2 pb-5">Tus tareas pendientes</p>

        { tareasProyecto.map( tareaB => (
          <Tareas 
            key={tareaB.id}
            tareaB={tareaB}
            eliminarTarea={eliminarTarea}
          />
        ) ) }

      { tareasProyecto.length >= 5 && <EliminarTask tareas={tareas} setTareas={setTareas} proyectoSeleccionado={proyectoSeleccionado} /> }  

      </>

      ): (
        <>
          <p className="text-center pt-2 pb-5">No tienes tareas pendientes</p>
        </>
      )}

    </div> 
  )
 
}  

export default ListadoTareas
