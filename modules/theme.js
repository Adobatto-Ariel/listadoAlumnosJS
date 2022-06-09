let body = document.querySelector("body");
let main = document.querySelector("main");
let header = document.querySelector("header");
let footer = document.querySelector("footer");
let formIngreso = document.querySelector(".card");
let tabla = document.querySelector("#table");
let botonText = document.querySelector(".button-text");
function darkMode() {
  body.setAttribute("class", "bodyDark");
  header.setAttribute("class", "headerDark");
  main.setAttribute("class", "darkMain");
  botonText.textContent = "LIGHT";
  formIngreso.setAttribute("id", "cardDark");
  tabla.setAttribute("class", "tablaDark");
  footer.setAttribute("class", "footerDark");

  localStorage.setItem("theme", "dark");
}
function lightMode() {
  body.setAttribute("class", "bodyLight");
  header.setAttribute("class", "headerLight");
  main.setAttribute("class", "lightMain");
  botonText.textContent = "DARK";
  formIngreso.setAttribute("id", "cardLight");
  tabla.setAttribute("class", "tablaLight");
  footer.setAttribute("class", "footerLight");

  localStorage.setItem("theme", "light");
}

const theme = {
  botonText,
  darkMode,
  lightMode
};

export default theme;
