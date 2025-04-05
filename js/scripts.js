// variables globales
let displayCero; // 👈🏽  variable para saber si el display tiene un 0
let resultado;
let valorActual;
let registroOperacion;
// variables RegExp
const rgExNum = /^\d/; //👈🏽 busco caracteres numéricos
const rgExTxt = /[a-zÇ\'\¡]/i; // 👈🏽  busco caractéres alfabéticos
const regExOper = /[+\-*\/%]/; // 👈🏽  busco los operadores

// ⬜️ OBTENGO ELEMENTOS DEL DOM

// capturo el contenedor de la calculadora
const contenedorCalc = document.getElementById("calculadora-container");
// capturo el display de la calculadora
const display = document.getElementById("display");
// capturo los dígitos del display
const digitoDisplay = document.getElementById("digito-display");
digitoDisplay.value = "0";
displayCero = true; // 👈🏽  inicializo la variable en true para saber si el display tiene un 0

// capturo el digito del operador dentro del display
const digitoRegistro = document.getElementById("digito-operador");
digitoRegistro.value = null;

// capturo los botones de la calculadora y le agrego un event listener
const teclas = document.querySelectorAll(".calculadora-tecla");
teclas.forEach((tecla) => {
  tecla.addEventListener("click", () => {
    HandlerDisplay(tecla.id);
  });
});

function HandlerDisplay(key) {
  // si el display tiene un 0 y el key es un número lo reemplazo por el número
  if (digitoDisplay.value === "0" && rgExNum.test(key) && displayCero) {
    digitoDisplay.value = key;
    digitoRegistro.value = digitoDisplay.value;
    displayCero = false;
    //
  } else if (rgExNum.test(key)) {
    /* ↘️ RECIBO NUMERO */
    digitoDisplay.value += key;
    digitoRegistro.value = digitoDisplay.value;
    return;
    //
  } else if (key === "." || key === ",") {
    /* ↘️ RECIBO SEPARADOR DE DECIMALES */

    digitoDisplay.value += ".";
    digitoRegistro.value = digitoDisplay.value;
  } else if (key === "Clear") {
    /* ↘️ RECIBO AC */
    digitoDisplay.value = "0";
    digitoRegistro.value = "";
    displayCero = true; //
    // console.log("presionaste AC");
  } else if (key === "Backspace") {
    /* ↘️ RECIBO BACKSPACE */
    digitoDisplay.value = digitoDisplay.value.slice(0, -1);
    if (digitoDisplay.value.length === 0) {
      digitoDisplay.value = "0";
      displayCero = true;
    }
    return;
  }

  // si el key es un operador y el display no tiene un 0 lo concateno al display
  /* ↘️ RECIBO OPERADOR */
  else if (regExOper.test(key) && !displayCero) {
    let ultimodigito = digitoDisplay.value[digitoDisplay.value.length - 1];
    console.log("el ultimo digito  es " + ultimodigito);
    console.log("el key es " + key);
    if (ultimodigito === key) {
      // si el operador es igual al último dígito lo reemplazo por el nuevo operador
      digitoDisplay.value = digitoDisplay.value.slice(0, -1) + key;
    } else {
      digitoDisplay.value = digitoDisplay.value + key;
    }
  }

  // si el key es igual a "Enter" o "=" evalúo la operación
  else if (key === "Enter" || key === "=") {
    // evalúo la operación
    resultado = eval(digitoRegistro.value);
    digitoRegistro.value = digitoRegistro.value + "=" + resultado;
    digitoDisplay.value = resultado;
  }
}

// escucho el teclado y filtro las teclas presionadas busando coincidencias del innerText del elemento con la tecla presionada
// les agrego la clase hover para que se vea el efecto de la tecla presionada
// onkeydown = (event) => {

//   let key = event.key;
//   console.log("la tecla presionada es " + key);
//   teclas.forEach((tecla) => {
//     if (key === tecla.id) {
//       tecla.classList.add("hover");
//       HandlerDisplay(key);
//       setTimeout(() => {
//         tecla.classList.remove("hover");
//       }, 200);
//     }
//   });
// };

// ⚠️ ANALIZO EL INPUT
// function PulseDetect(key) {
//   // key === "Enter"
//   //   ? HandlerOp("=") // console.log("presionaste ENTER")
//   //   : //
//   //   key === "AC" // borro display
//   //   ? HandlerOp("AC")
//   //   : //
//   //   rgExNum.test(key)
//   //   ? HandlerNum(parseFloat(key)) //console.log(key + " es un número ")
//   //   : //
//   //   regExOper.test(key)
//   //   ? HandlerOp(key) // console.log(key + " es un operador")
//   //   : //
//   //     console.log(key + " NO SE LO QUE ES");
// }
