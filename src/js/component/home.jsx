import React, { useState } from "react";

const Home = () => {
  const [tarea, setTarea] = useState("");
  const [listaTareas, setListaTareas] = useState([]);

  function agregarTarea(event) {
    if (event.key === "Enter") {
      setListaTareas([...listaTareas, tarea]);
      setTarea("");
    }
  }

  function eliminarTarea(index) {
    const nuevaListaTareas = [...listaTareas];
    nuevaListaTareas.splice(index, 1);
    setListaTareas(nuevaListaTareas);
  }

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <h1 style={{ textAlign: 'center', color: 'blue' }}>lista de tareas</h1>
      <input
        type="text" value={tarea}
        onChange={(event) => setTarea(event.target.value)}
        onKeyDown={agregarTarea}
        placeholder="Tareas pendientes"
        style={{ width: "500px", height: "50px", backgroundImage: "url('https://i.ibb.co/WK4CHC6/fondo-papel-textura-brillante-beige.jpg')", borderBottom: "2px solid black", paddingBottom: "10px" }}

      />
      <div id="libreta" style={{ width: "500px" }}>
        <ul>
          {listaTareas.map((tarea, index) => (
            <li
              style={{
                maxWidth: "500px",
                height: "50px",
                background: "white",
                borderBottom: "1px solid grey",
                paddingBottom: "10px",
                display: "flex",
                backgroundImage: "url('https://i.ibb.co/WK4CHC6/fondo-papel-textura-brillante-beige.jpg')"
              }}
              key={index}
            >
              <h3> {tarea}{" "}</h3>
              <button
                type="button"
                onClick={() => eliminarTarea(index)}
                className="btn"
                style={{ marginLeft: "auto" }}
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </li>
          ))}
          <h6 className="length">{listaTareas.length} Tareas pendientes</h6>
        </ul>
      </div>

    </div>
  );
};

export default Home;
