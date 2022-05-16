let baseDatos = [];
const listaAlumnos = document.querySelector('#lista-alumnos')
const formulario = document.querySelector('#form')

listaAlumnos.addEventListener('click', borrarAlumno)

formulario.addEventListener('submit', capturarAlumno)

function capturarAlumno(evt){
    evt.preventDefault();
    
    function Alumno(nombre,asistencias,desafios,nota,puntos,id){
        this.nombre=nombre;
        this.asistencias=asistencias;
        this.desafios=desafios;
        this.nota=nota;
        this.puntos=puntos
        this.id=id;

    }
    
    let capturaNombre = document.querySelector("#nombre").value.toUpperCase();
    let capturaNota = document.querySelector("#nota").value;
    let capturaAsist = document.querySelector("#asistencias").value;
    let capturaDesafios = document.querySelector("#desafios").value;
    let puntos;
    let id;
    if(capturaNombre !== "" && capturaNota !== "" && capturaAsist !== "" && capturaDesafios !== ""){
        if(capturaNota<=0 || capturaNota>10){
            mostrarError("Debe ingresar un nota entre 1 y 10")
        }else if(capturaAsist<0 || capturaAsist>15){
                mostrarError("Solo se puede registrar hasta 15 asistencias")
            }else if(capturaDesafios<0 || capturaDesafios>10){
                    mostrarError("Solo se puede registrar hasta 10 entregas")
                }else{
                    id = Date.now();
                    puntos = Number(capturaAsist) + Number(capturaDesafios) + Number(capturaNota);
                    let nuevoAlumno = new Alumno
                    (capturaNombre,capturaAsist,capturaDesafios,capturaNota,puntos,id);
                    baseDatos.push(nuevoAlumno);//Alumno: comentarioObj  baseDatos: comentarios
                    console.log(baseDatos)
                    renderHTML()
                    formulario.reset()
                }
    }else{
        mostrarError("DEBE COMPLETAR TODOS LOS CAMPOS");
        return;
    }    
}

/* --------------DATOS EN HTML----------------------- */
function renderHTML(){
    if(baseDatos.length>0){
        limpiarHTML()
        baseDatos.forEach(alumno => {
            const btnBorrar = document.createElement('a');
            btnBorrar.classList= "borrar-alumno";
            btnBorrar.innerText = ' ❌'
            btnBorrar.setAttribute('title','Eliminar')
    
            const fila = document.createElement('tr');
            fila.innerHTML = `
            <td>${alumno.nombre.toUpperCase()}</td>
            <td>${alumno.asistencias}</td>
            <td>${alumno.desafios}</td>
            <td>${alumno.nota}</td>
            <td>${alumno.puntos}</td>`
            fila.appendChild(btnBorrar)
            fila.dataset.alumnoId = alumno.id;
            listaAlumnos.appendChild(fila)
        })
        syncroStorage();
    }
}

function syncroStorage(){
    localStorage.setItem('alumnos', JSON.stringify(baseDatos))
}

function limpiarHTML(){
    while(listaAlumnos.firstChild){
        listaAlumnos.removeChild(listaAlumnos.firstChild)
    }
}

function borrarAlumno(evt){
    //console.log(evt.target.parentElement.dataset.alumnoId)
    //console.log(baseDatos)
    const idAlumno = evt.target.parentElement.dataset.alumnoId
    baseDatos = baseDatos.filter( alumno => alumno.id != idAlumno)
    //console.log(baseDatos)
    renderHTML() // quitamos el alumno del html
}



/* ------------------ TOP3 ----------------------- */

let top3 = document.getElementById("btn-top3")
top3.onclick = () =>{
    if(baseDatos.length>=3){
        baseDatos.sort((a,b) => {
        if (a.puntos < b.puntos){
            return 1;
        }
        if(a.puntos > b.puntos){
            return -1;
        }
        return 0;
        });
        console.log(baseDatos)
        document.getElementById("tablaTop3").innerHTML= 
            `
            <table class="table" id="tablaTOP">
            <thead class="text-light">
            <tr>
                <th scope="col">Posición</th>
                <th scope="col">Nombre</th>
                <th scope="col">Puntos</th>
                <th scope="col">Beneficio</th>
            </tr>
            </thead>
            <tbody class="text-light">
            <tr>
                <th scope="row">1</th>
                <td>${baseDatos[0].nombre.toUpperCase()}</td>
                <td>${baseDatos[0].puntos}</td>
                <td>50%OFF en Cursos</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>${baseDatos[1].nombre.toUpperCase()}</td>
                <td>${baseDatos[1].puntos}</td>
                <td>30%OFF en Cursos</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>${baseDatos[2].nombre.toUpperCase()}</td>
                <td>${baseDatos[2].puntos}</td>
                <td>15%OFF en Cursos</td>
            </tr>
            </tbody>
        </table>` 
    } else{
        mostrarError("Debe ingresar al menos TRES alumnos para generar el TOP3")
    }
}


document.addEventListener("DOMContentLoaded", () => {
    baseDatos = JSON.parse(localStorage.getItem("alumnos")) || [];
    console.log(baseDatos)
    renderHTML()
}) 
 
/* ------- MENSAJE ERROR ---------------- */
function mostrarError(error){
    const msjError = document.createElement('p')
    msjError.textContent = `✖ ${error} ❗❗`;
    msjError.classList.add('msjError')

    const contenido = document.querySelector('.contenido');
    contenido.appendChild(msjError);

    setTimeout(()=>{
        msjError.remove()
    }, 3000)
}