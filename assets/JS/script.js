const listaDeTareas = document.querySelector("#tareas");
const tareaInput = document.querySelector("#nuevaTarea");
const btnAgregar = document.querySelector("#agregarTarea");
const cuentaTareas = document.querySelector("#total");
const cuentaRealizadas = document.querySelector("#realizadas");
const tareas = [
  { id: 1, tarea: "Programar riego", completada: false },
  { id: 2, tarea: "Ejecutar retolavado", completada: false },
  { id: 3, tarea: "Abrir compuertas", completada: false },
];

renderList(tareas);

btnAgregar.addEventListener("click", () => {
  const nombreTarea = tareaInput.value;
  if (nombreTarea === "") {
    alert("Debes escribir una tarea para poder asignarla.");
  }

  let lastId = 0;
  if (tareas.length > 0) {
    lastId = tareas[tareas.length - 1].id;
  }

  const nuevaTarea = {
    id: lastId + 1,
    tarea: nombreTarea,
    completada: false,
  };
  tareas.push(nuevaTarea);
  tareaInput.value = "";
  renderList(tareas);
});

function renderList(tareas) {
  let html = "";
  let tareasRealizadas = 0;
  for (const tarea of tareas) {
    html += `
      <tr id="tarea-${tarea.id}">
        <td class="id-container">${tarea.id}</td>
        <td>${tarea.tarea}</td>
        <td class="checkbox-container"><input type="checkbox" id="checkbox-${
          tarea.id
        }" ${tarea.completada ? "checked" : ""} onclick="marcarRealizada(${
      tarea.id
    })"></td>
        <td><button onclick="borrarTarea(${tarea.id})">Borrar</button></td>
      </tr>`;

    if (tarea.completada) {
      tareasRealizadas++;
    }
  }
  listaDeTareas.innerHTML = html;
  cuentaTareas.innerHTML = `${tareas.length}`;
  cuentaRealizadas.innerHTML = tareasRealizadas;
}

function marcarRealizada(id) {
  const tarea = tareas.find((tareas) => tareas.id === id);
  tarea.completada = !tarea.completada;
  renderList(tareas);
}

function borrarTarea(id) {
  const index = tareas.findIndex((ele) => ele.id === id);
  tareas.splice(index, 1);
  renderList(tareas);
}
