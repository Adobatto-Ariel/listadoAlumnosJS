let avatar = document.querySelector("#autoridades");
export function avatarTOP() {
  fetch("https://randomuser.me/api/")
    .then(res => res.json())
    .then(data => {
      let foto = data.results[0].picture.large;
      let apellido = data.results[0].name.last;
      let nombre = data.results[0].name.first;

      avatar.innerHTML = `
      <p class=" fst-italic">Estudiante de Coder Academy</p>
      <img src="${foto}" width="120px" class="img-fluid rounded-circle">
      <p class="fst-italic">${nombre} ${apellido}</p>
      `;
    })
    .catch(function (err) {
      console.log(err);
    });
}
