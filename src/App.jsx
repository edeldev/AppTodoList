import React, { useState, useEffect } from "react";
import ListadoProyectos from "./components/ListadoProyectos";
import ListadoTareas from "./components/ListadoTareas";
import Header from "./components/Header";

function App() {
  const [proyectos, setProyectos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [tareasProyecto, setTareasProyecto] = useState([]);

  // Obtener proyectos almacenados en localStorage al cargar la página
  useEffect(() => {
    const proyectosGuardados = localStorage.getItem("proyectos");
    if (proyectosGuardados) {
      setProyectos(JSON.parse(proyectosGuardados));
    }
  }, []);

  // Guardar proyectos en localStorage cuando se actualice el estado
  useEffect(() => {
    localStorage.setItem("proyectos", JSON.stringify(proyectos));
  }, [proyectos]);

  // Obtener tareas almacenadas en localStorage al cargar la página
  useEffect(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
      setTareas(JSON.parse(tareasGuardadas));
    }
  }, []);

  // Guardar tareas en localStorage cuando se actualice el estado
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  const eliminarProyecto = (id) => {
    const proyectosActualizados = proyectos.filter(
      (proyecto) => proyecto.id !== id
    );
    setProyectos(proyectosActualizados);
  };

  const eliminarTarea = (id) => {
    const tareasActualizadas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasActualizadas);
  };

  return (
    <div className="container mx-auto mt-8">
      <Header proyectos={proyectos} />

      <div className="mt-12 md:flex">
        <ListadoProyectos
          proyectos={proyectos}
          setProyectos={setProyectos}
          tareas={tareas}
          eliminarProyecto={eliminarProyecto}
          proyectoSeleccionado={proyectoSeleccionado}
          setProyectoSeleccionado={setProyectoSeleccionado}
          tareasProyecto={tareasProyecto}
          setTareasProyecto={setTareasProyecto}
        />

        <ListadoTareas
          tareas={tareas}
          setTareas={setTareas}
          eliminarTarea={eliminarTarea}
          proyectos={proyectos}
          proyectoSeleccionado={proyectoSeleccionado}
          tareasProyecto={tareasProyecto}
          setTareasProyecto={setTareasProyecto}
        />
      </div>
    </div>
  );
}

export default App;
