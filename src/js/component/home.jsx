import React, { useState, useEffect } from "react";

const Home = () => {
  const [tarea, setTarea] = useState("");
  const [listaTareas, setListaTareas] = useState([]);

  useEffect(() => {
    cargarTareas();
  }, []);

  function cargarTareas() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/agamero")
      .then(response => response.json())
      .then(data => {
        setListaTareas(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function crearListaTareas() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/agamero", {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        setListaTareas([]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function agregarTarea(event) {
    if (event.key === "Enter") {
      const nuevaTarea = { label: tarea, done: false };
      const nuevaLista = [...listaTareas, nuevaTarea];
      fetch("https://assets.breatheco.de/apis/fake/todos/user/agamero", {
        method: "PUT",
        body: JSON.stringify(nuevaLista),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          setListaTareas(nuevaLista);
          setTarea("");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  function eliminarTarea(index) {
    const nuevaListaTareas = [...listaTareas];
    nuevaListaTareas.splice(index, 1);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/agamero", {
      method: "PUT",
      body: JSON.stringify(nuevaListaTareas),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        setListaTareas(nuevaListaTareas);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function limpiarTareas() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/agamero", {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(data => {
        setListaTareas([]);
      })
      .catch(error => {
        console.log(error);
      });
  }



  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <h1 style={{ textAlign: 'center', color: 'blue' }}>Lista de tareas</h1>
      <input
        type="text"
        value={tarea}
        onChange={(event) => setTarea(event.target.value)}
        onKeyDown={agregarTarea}
        placeholder="Tareas pendientes"
        style={{
          width: "500px",
          height: "50px",
          backgroundImage: "url('https://i.ibb.co/WK4CHC6/fondo-papel-textura-brillante-beige.jpg')",
          borderBottom: "2px solid black",
          paddingBottom: "10px"
        }}
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
              <h3> {tarea.label}{" "}</h3>
              <button
                type="button"
                onClick={() => eliminarTarea(index)}
                className="btn"
                style={{ marginLeft: "auto" }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </li>
          ))}
          <h6 className="length">{listaTareas.length} Tareas pendientes</h6>
        </ul>
      </div>
      <button onClick={limpiarTareas}>Limpiar Tareas</button>
    </div>
  );
            }
          

export default Home;
