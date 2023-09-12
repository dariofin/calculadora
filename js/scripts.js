// capturar el digto del diplay
const digitoDisplay = document.getElementById("digito-display");
console.log(digitoDisplay.value);
// escucho el teclado, si es número lo ejecuto en la calculadora
document.addEventListener("keydown", (e) =>
  /\d/.test(e.key) ? setDigito(e.key) : console.log(e.key)
);
// función que maneja el dígito arriba
const setDigito = function (key) {
  console.log("key recibido = " + key);
  digitoDisplay.value =
    digitoDisplay.value == 0 ? key : digitoDisplay.value + key;
};

// capturo todos los botones
const botones = document.getElementsByClassName("calculadora-tecla");
// console.log(botones);
//recorro los botones y le agrego un event listener
