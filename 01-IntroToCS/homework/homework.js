'use strict'
function BinarioADecimal(num) {
  // tu codigo aca
  let nuevo = num.split("");
  let resultado = 0;
  for(let i = 0; i < num.length; i++){
     resultado += nuevo[i] * Math.pow(2, nuevo.length - 1 - i);
  }
  return resultado;
}

function DecimalABinario(num) {
  // tu codigo aca
  let array = [];
  while(num > 0){
    array.unshift(num % 2)
    num = Math.floor(num/2);
  }
  return array.join("");
}


module.exports = {
  BinarioADecimal,
  DecimalABinario,
}




