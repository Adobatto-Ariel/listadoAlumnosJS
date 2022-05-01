let tutor
nombreTutor = () =>{
    tutor = prompt("Bienvenido TUTOR 👋\nIngrese su nombre:");
} 
nombreTutor()
if(tutor != ""){
    document.getElementById("parrafo").innerHTML = `<p style="font-size:30px; text-align: center;">
    <strong>Bienvenido ${tutor.toUpperCase()}
    <p style="text-align: center;">Ingresa los datos de tus estudiantes<br><i style="font-size: 12px;">(Total de 15 clases, 10 desafios y 1 proyecto final)</i></p>`
}else{
    alert("DEBE INGRESAR SU NOMBRE")
    nombreTutor()
}
let contadorAlumnos=0;
let boton = document.getElementById("agregar")
boton.onclick = () =>{
    function Alumno(nombre,asistencias,desafios,nota,puntos){
        this.nombre=nombre;
        this.asistencias=asistencias;
        this.desafios=desafios;
        this.nota=nota;
        this.puntos=puntos;
    }
    let capturaNombre = document.getElementById("nombre").value;
    let capturaNota = document.getElementById("nota").value;
    let capturaAsist = document.getElementById("asistencias").value;
    let capturaDesafios = document.getElementById("desafios").value;
    let puntos;
    if(capturaNombre !== "" && capturaNota !== "" && capturaAsist !== "" && capturaDesafios !== ""){
        if(capturaNota<=0 || capturaNota>10){
            alert("Debe ingresar un nota entre 1 y 10")
        }else if(capturaAsist<0 || capturaAsist>15){
                alert("Solo se puede registrar hasta 15 asistencias")
            }else if(capturaDesafios<0 || capturaDesafios>10){
                    alert("Solo se puede registrar hasta 10 entregas")
                }else{
                    puntos = Number(capturaAsist) + Number(capturaDesafios) + Number(capturaNota);
                    contadorAlumnos+=1;
                    let nuevoAlumno = new Alumno
                    (capturaNombre,capturaAsist,capturaDesafios,capturaNota,puntos);
                    agregarAlumno(nuevoAlumno);
                }
    }else{
        alert("DEBE COMPLETAR TODOS LOS CAMPOS")
    }    
}
let baseDatos = [];
function agregarAlumno(alumno){
    baseDatos.push(alumno);
    if(alumno.nota>=7){
        document.getElementById("table").innerHTML += ` <tbody>
        <td>${alumno.nombre.toUpperCase()}</td>
        <td>${alumno.asistencias}</td>
        <td>${alumno.desafios}</td>
        <td>${alumno.nota}</td>
        <td class="text-success">APROBADO</td>
        <td>${alumno.puntos}</td>
        </tbody>`;
    }else{
        document.getElementById("table").innerHTML+= `<tbody>
            <td>${alumno.nombre.toUpperCase()}</td>
            <td>${alumno.asistencias}</td>
            <td>${alumno.desafios}</td>
            <td>${alumno.nota}</td>
            <td class="text-danger">DESAPROBADO</td>
            <td>${alumno.puntos}</td>
        </tbody>`;
    }
}
let top3 = document.getElementById("btn-top3")
top3.onclick = () =>{
    if(contadorAlumnos>3){
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
            <table class="table">
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
        alert("Debe ingresar al menos TRES alumnos para generar el TOP3")
    }
} 
 
