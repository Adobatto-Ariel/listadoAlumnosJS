function mostrarError(error) {
  Swal.fire({
    icon: "error",
    title: "Error!",
    width: 450,
    color: "#fff",
    background: "rgba(255, 0, 0, 0.795)",
    text: error.toUpperCase(),
    timer: 4000
  });
}
function eliminado() {
  Swal.fire({
    position: "top-end",
    icon: "success",
    width: 300,
    title: `Eliminado`,
    showConfirmButton: false,
    timer: 1500
  });
}

const alert = {
  mostrarError,
  eliminado
};

export default alert;
