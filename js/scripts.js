// variables globales
let resultado;
let valorActual;
let valorAcumulado;
let operacionEsperaValor = false;
// variables RegExp
const rgExNum = /^\d/; //👈🏽 busco caracteres numéricos
const rgExTxt = /[a-zÇ\'\¡]/i; // 👈🏽  busco caractéres alfabéticos
const regExOper = /[+\-*\/%]/; // 👈🏽  busco los operadores

// ⬜️ obtengo elementos del DOM
// #️⃣ DIGITOS
// capturo el digito principal del display
const digitoDisplay = document.getElementById("digito-display");
digitoDisplay.value = "0";
valorActual = digitoDisplay.value;

// capturo el digito del operador dentro del display
const digitoOperador = document.getElementById("digito-operador");
let operadorActual = digitoOperador.value;
digitoOperador.value = "";

// ⚠️ BOTONES
// capturo todos los botones en un HTMLcollection y lo convierto a array
const botones = Array.from(
  document.getElementsByClassName("calculadora-tecla")
);
// Agrego listeners a todos los botones
botones.map((boton) =>
  boton.addEventListener("click", () => PulseDetect(boton.outerText))
);
// console.log(botones);

// ⚠️ ANALIZO EL INPUT
function PulseDetect(key) {
  key === "Enter"
    ? HandlerOp("=") // console.log("presionaste ENTER")
    : //
    key === "AC" // borro display
    ? HandlerOp("AC")
    : //
    rgExNum.test(key)
    ? HandlerNum(parseFloat(key)) //console.log(key + " es un número ")
    : //
    regExOper.test(key)
    ? HandlerOp(key) // console.log(key + " es un operador")
    : //
      console.log(key + " NO SE LO QUE ES");
}

// 👂🏼 detecto el tipo de caracter pulsado en el teclado
onkeydown = (event) => {
  let key = event.key;
  key === "Enter"
    ? HandlerOp("=") // console.log("presionaste ENTER")
    : key === "Clear"
    ? (digitoDisplay.value = "0")
    : rgExNum.test(key)
    ? HandlerNum(parseFloat(key)) //console.log(key + " es un número ")
    : regExOper.test(key)
    ? HandlerOp(key, valorActual) // console.log(key + " es un operador")
    : rgExTxt.test(key)
    ? console.log(key + " es un TEXTO ")
    : console.log(key + " NO SE LO QUE ES");
};

onkeyup = (event) => {
  //acá voy a togglear las clases hover en los botones
  console.log(event.code);
  console.log(
    "el valor del display es 👉🏼 " +
      digitoDisplay.value +
      " ⦂ " +
      typeof digitoDisplay.value
  );
  console.log("el valorActual es " + valorActual + " " + typeof valorActual);
  console.log(
    "el valor Acumulado es " + valorAcumulado + " " + typeof valorAcumulado
  );
};

// 🖐 PROCESA NUMEROS
function HandlerNum(key) {
  // console.log("el key llega como " + typeof key); //
  if (digitoDisplay.value === "0") {
    digitoDisplay.value = key;
    valorActual = parseFloat(key);
  } else {
    // valorActual = valorActual + key;
    digitoDisplay.value = digitoDisplay.value + key;
    valorActual = parseFloat(digitoDisplay.value);
  }
}

// 🖐 OPERACIONES
function HandlerOp(operador, valorActual) {
  operacionEsperaValor = true;
  // si presiona +
  if (operador === "+") {
    digitoOperador.value = "+";
  }
  // key === "+" ? Sumar(valorActual) : console.log("nine");

  // key === "="
  //   ? (digitoDisplay.value = valorActual)
  //   : key === "AC"
  //   ? (digitoDisplay.value = "0")
  //   : (digitoDisplay.value = digitoDisplay.value + key);
}

function HoverToggle(key) {
  document.getElementById(key)
    ? document.getElementById(key).classList.toggle("hover")
    : console.log("no");
}

//recorro los botones y le agrego un event listener

// ⚠️ OPERACIONES
function Sumar(...value) {
  value.length == 1
    ? (digitoDisplay.value = value[0])
    : (valorAcumulado = parseFloat(value[0]) + parseFloat(value[1]));
}

console.log("el valor del display es 👉🏼 " + digitoDisplay.value);
