import { useState } from "react";
import Error from "./Error";
import EliminarProyect from "./EliminarProyect";
import Proyectos from "./Proyectos";

const ListadoProyectos = ({ proyectos, setProyectos, tareas, eliminarProyecto, proyectoSeleccionado, setProyectoSeleccionado, setTareasProyecto }) => {
  const [proyecto, setProyecto] = useState('');
  const [error, setError] = useState(false);

  const handleKeyDown = (e) => {
    e.key === "Enter" && handleAñadir();
  };

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  }

  const handleAñadir = () => {
    // Validación de Proyectos
    if (proyecto === '') {
      setError(true);
      return;
    }

    if (/^\d+$/.test(proyecto)) {
      setError(true);
      return;
    }

    setError(false);

    // ObjetoProyecto
    const objetoProyecto = {
      id: generarId(),
      proyecto
    }

    setProyectos([...proyectos, objetoProyecto]);

    // Reiniciar o limpiar al agregar Proyecto
    setProyecto('');
  }

  const seleccionProyecto = (proyectoName) => {
    if (proyectoSeleccionado === proyectoName) {
      // Si el proyecto ya estaba seleccionado, lo deseleccionamos y eliminamos las tareas
      setProyectoSeleccionado(null);
      setTareasProyecto([]);
    } else {
      // Si se selecciona otro proyecto, actualizamos el proyecto seleccionado y las tareas
      setProyectoSeleccionado(proyectoName);
  
      // Filtramos las tareas por el proyecto seleccionado
      const tareasProyecto = tareas.filter((tarea) => tarea.proyecto === proyectoName);
      setTareasProyecto(tareasProyecto);
    }
  };
  

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center text-blue-700 pb-5">Agrega un proyecto</h2>

      {error && <Error> <p>Ingresa un proyecto</p> </Error>}

      <div className="relative mt-2 rounded shadow-sm">
        <input type="text" className="mt-1 px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-700 focus:ring-blue-700 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Ejemplo: React" value={proyecto}
          onChange={e => setProyecto(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute inset-y-0 right-0 flex items-center mx-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer bg-blue-700 text-white rounded-xl" onClick={handleAñadir}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>

      {proyectos && proyectos.length ? (
        <>
          <p className="text-center pt-2 pb-5">Tus proyectos pendientes</p>

          {proyectos.map(proyectoB => (
            <Proyectos
              key={proyectoB.id}
              proyectoB={proyectoB}
              eliminarProyecto={eliminarProyecto}
              seleccionProyecto={seleccionProyecto}
              proyectoSeleccionado={proyectoSeleccionado}
            />
          ))}

          {proyectos.length >= 5 && <EliminarProyect setProyectos={setProyectos} />}

        </>

      ) : (
          <>
            <p className="text-center pt-2 pb-5">No tienes proyectos pendientes</p>
          </>
        )}

    </div>
  )
}

export default ListadoProyectos;
