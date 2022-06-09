/* ================ import =================== */

import alert from "./modules/alert.js";
const { mostrarError, eliminado } = alert;

import theme from "./modules/theme.js";
const { botonText, darkMode, lightMode } = theme;

import { avatarTOP } from "./modules/fetch.js";

import { renderTop3 } from "./modules/topTres.js";

/* =========================================== */

let baseDatos = [];
export let alumnosTop = [];
const listaAlumnos = document.querySelector("#lista-alumnos");
const formulario = document.querySelector("#form");

listaAlumnos.addEventListener("click", borrarAlumno);

formulario.addEventListener("submit", capturarAlumno);

function capturarAlumno(evt) {
  evt.preventDefault();
  //console.log(evt);

  class Alumno {
    constructor(nombre, asistencias, desafios, nota, puntos, id) {
      this.nombre = nombre;
      this.asistencias = asistencias;
      this.desafios = desafios;
      this.nota = nota;
      this.puntos = puntos;
      this.id = id;
    }
  }

  let capturaNombre = document.querySelector("#nombre").value.toUpperCase();
  let capturaNota = document.querySelector("#nota").value;
  let capturaAsist = document.querySelector("#asistencias").value;
  let capturaDesafios = document.querySelector("#desafios").value;
  let puntos;
  let id;
  if (
    capturaNombre !== "" &&
    capturaNota !== "" &&
    capturaAsist !== "" &&
    capturaDesafios !== ""
  ) {
    if (capturaNota <= 0 || capturaNota > 10) {
      mostrarError("Debe ingresar un nota entre 1 y 10");
    } else if (capturaAsist < 0 || capturaAsist > 15) {
      mostrarError("Solo se puede registrar hasta 15 asistencias");
    } else if (capturaDesafios < 0 || capturaDesafios > 10) {
      mostrarError("Solo se puede registrar hasta 10 entregas");
    } else {
      id = Date.now();

      puntos =
        Number(capturaAsist) + Number(capturaDesafios) + Number(capturaNota);

      let nuevoAlumno = new Alumno(
        capturaNombre,
        capturaAsist,
        capturaDesafios,
        capturaNota,
        puntos,
        id
      );

      baseDatos.push(nuevoAlumno);

      capturaNota >= 7 && alumnosTop.push(nuevoAlumno);

      console.log(baseDatos);
      console.log(alumnosTop);

      renderHTML();
      formulario.reset();
    }
  } else {
    mostrarError("DEBE COMPLETAR TODOS LOS CAMPOS");

    return;
  }
}

/* --------------DATOS EN HTML----------------------- */

function renderHTML() {
  baseDatos.length >= 0 && limpiarHTML();
  baseDatos.forEach(alumno => {
    const btnBorrar = document.createElement("a");
    btnBorrar.classList = "borrar-alumno";
    btnBorrar.innerText = "❌";
    btnBorrar.setAttribute("title", "Eliminar");

    const fila = document.createElement("tr");
    fila.innerHTML = `
            <td>${alumno.nombre.toUpperCase()}</td>
            <td>${alumno.asistencias}</td>
            <td>${alumno.desafios}</td>
            <td>${alumno.nota}</td>
            <td>${alumno.puntos}</td>`;
    fila.appendChild(btnBorrar);
    fila.dataset.alumnoId = alumno.id;
    listaAlumnos.appendChild(fila);
  });
  syncroStorage();
  avatarTOP();
}

function syncroStorage() {
  localStorage.setItem("alumnos", JSON.stringify(baseDatos));
  localStorage.setItem("alumnosTop", JSON.stringify(alumnosTop));
}

function limpiarHTML() {
  while (listaAlumnos.firstChild) {
    listaAlumnos.removeChild(listaAlumnos.firstChild);
  }
}

function borrarAlumno(evt) {
  console.log(evt);
  const idAlumno = evt.target.parentElement.dataset.alumnoId;
  baseDatos = baseDatos.filter(alumno => alumno.id != idAlumno);
  alumnosTop = alumnosTop.filter(alumno => alumno.id != idAlumno);
  eliminado();
  renderHTML();
  console.log(baseDatos);
  console.log(alumnosTop);
}

/* ------------------ TOP3 ----------------------- */

let top3 = document.getElementById("btn-top3");
top3.addEventListener("click", ordenaTop);
function ordenaTop() {
  if (alumnosTop.length >= 3) {
    alumnosTop.sort((a, b) => {
      if (a.puntos < b.puntos) {
        return 1;
      }
      if (a.puntos > b.puntos) {
        return -1;
      }
      return 0;
    });
    renderTop3();
  } else {
    mostrarError(
      "Debe haber al menos TRES alumnos  con nota de proyecto APROBADO"
    );
  }
}

/*-------------------  DARK MODE ------------------ */

let botonDark = document.querySelector("#darkMode");

botonDark.addEventListener("click", function () {
  localStorage.getItem("theme") == "dark" ? lightMode() : darkMode();
});

/* ------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  baseDatos = JSON.parse(localStorage.getItem("alumnos")) || [];
  alumnosTop = JSON.parse(localStorage.getItem("alumnosTop")) || [];
  console.log(baseDatos);
  console.log(alumnosTop);

  renderHTML();
  if (localStorage.getItem("theme") == "dark") {
    darkMode();
    botonText.textContent = "LIGHT";
  } else {
    lightMode();
    botonText.textContent = "DARK";
  }
});
