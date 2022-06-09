import { alumnosTop } from "../main.js";

export function renderTop3() {
  console.log(alumnosTop);
  let tablaAlumnosTop = document.getElementById("tablaTop3");
  if (localStorage.getItem("theme") == "dark") {
    tablaAlumnosTop.innerHTML = `
            <table class="table table-dark table-striped w-100">
            <thead>
            <tr>
                <th scope="col">Posición</th>
                <th scope="col">Nombre</th>
                <th scope="col">Puntos</th>
                <th scope="col">Beneficio</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                <th scope="row">1</th>
                <td>${alumnosTop[0].nombre.toUpperCase()}</td>
                <td>${alumnosTop[0].puntos}</td>
                <td>50%OFF en Cursos</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>${alumnosTop[1].nombre.toUpperCase()}</td>
                <td>${alumnosTop[1].puntos}</td>
                <td>30%OFF en Cursos</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>${alumnosTop[2].nombre.toUpperCase()}</td>
                <td>${alumnosTop[2].puntos}</td>
                <td>15%OFF en Cursos</td>
                </tr>
                </tbody>
                </table>`;
  } else {
    tablaAlumnosTop.innerHTML = `
                <table class="table table-light table-striped w-100">
                <thead>
                <tr>
                    <th scope="col">Posición</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Puntos</th>
                    <th scope="col">Beneficio</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>${alumnosTop[0].nombre.toUpperCase()}</td>
                    <td>${alumnosTop[0].puntos}</td>
                    <td>50%OFF en Cursos</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>${alumnosTop[1].nombre.toUpperCase()}</td>
                    <td>${alumnosTop[1].puntos}</td>
                    <td>30%OFF en Cursos</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>${alumnosTop[2].nombre.toUpperCase()}</td>
                    <td>${alumnosTop[2].puntos}</td>
                    <td>15%OFF en Cursos</td>
                    </tr>
                    </tbody>
                    </table>`;
  }
}
