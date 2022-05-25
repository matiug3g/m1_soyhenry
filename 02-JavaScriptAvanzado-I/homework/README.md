
# Homework JavaScript Avanzado I

## Scope & Hoisting

Determiná que será impreso en la consola, sin ejecutar el código.

> Investiga cuál es la diferencia entre declarar una variable con `var` y directamente asignarle un valor.

```javascript
x = 1;
var a = 5;
var b = 10;
var c = function(a, b, c) {
   // var a = 8
   // var b = 9
   // var c = 10
  var x = 10;
  console.log(x); // 10. No vale 1 por que ejecuta el contexto de arriba
  console.log(a); // 8
  var f = function(a, b, c) {
   // var a = 8
   // var b = 9
   // var c = 10
    b = a; // PASANDO POR REFERNCIA, valor: 8
    console.log(b); // 8
    b = c; // b = 10, pasa a tomar el valor de C
    var x = 5;
  }
  f(a,b,c); // nuevo contexto
  console.log(b); // 9, ya que la funcion F se elimina
}
c(8,9,10); // se genera un nuevo contexto
console.log(b); // 10
console.log(x); // 1
```

```javascript
console.log(bar);
console.log(baz); // bar is not defined (si hubiera estado arriba, lo define.)
foo();
function foo() { console.log('Hola!'); }
var bar = 1;
baz = 2;

// creation phase
// foo function(){..}
// bar: undefined
// execution phase
// bar undefined
// baz is not defined
// foo(); nueva creation phase
// foo(); execution phase console.log Hola
// define BAR 1
// define BAZ 2 
// Finaliza

```

```javascript
var instructor = "Tony";
if(true) { // solo las funciones generan contexto de ejecucion. Siempre será true y genera la variable instructor y la almacena en memory
    var instructor = "Franco";
}
console.log(instructor); // Franco
```

```javascript
var instructor = "Tony";
console.log(instructor); // Tony
(function() {
   if(true) {
      var instructor = "Franco";
      console.log(instructor); // Franco
   }
})(); // se va Franco, por que ya se invoco el contexto
console.log(instructor); // Tony
```

```javascript
var instructor = "Tony";
let pm = "Franco";
if (true) {
    var instructor = "The Flash"; // modifica el contexto global por VAR
    let pm = "Reverse Flash"; // nace y muere aca  en las llaves
    console.log(instructor); // The flash
    console.log(pm); // Reverse
}
console.log(instructor); // The flash
console.log(pm); // Franco
```
### Coerción de Datos

¿Cuál crees que será el resultado de la ejecución de estas operaciones?:

```javascript
6 / "3" // Intenta transformar a traves de number el "3" -> Number("3") = 2.
"2" * "3" // Lo mismo que arriba. = 6
4 + 5 + "px" // La suma de strings, es mas fuerte que la suma de numeros
"$" + 4 + 5 // concatena $45
"4" - 2  // forza el 4 string a number = 2
"4px" - 2 // NaN 
7 / 0 // infinite
{}[0] // 0
parseInt("09") // parsea el nro a entero = 9
5 && 2 // analiza si uno es true, si lo es sigue analizando 
2 && 5 // si no lo es, para de analizar.
5 || 0 // para que seguir analizando si el 1ro es true?
0 || 5 // si el primero no es true, pasa al 2do
[3]+[3]-[10] // los concatena y despues lo forza a nro restandolos.
3>2>1 // true > 1 false
[] == ![] // doble igual evalua valor, lo forza a ser igual. Triple igual analiza tipo de dato y valor
```

> Si te quedó alguna duda repasá con [este artículo](http://javascript.info/tutorial/object-conversion).


### Hoisting

¿Cuál es el output o salida en consola luego de ejecutar este código? Explicar por qué:

```javascript
function test() {
   console.log(a); // undefined
   console.log(foo()); // 2

   var a = 1;
   function foo() {
      return 2;
   }
}

test();
```

Y el de este código? :

```javascript
var snack = 'Meow Mix';

function getFood(food) {
    if (food) {
        var snack = 'Friskies';
        return snack;
    }
    return snack; // retorna undefined. Si fuese LET friskies, aca se buscaria al contexto padre, por lo tanto daria Meow Mix.
    // Cuando se genera el contexto de getFood, se declara SNACK, pero nunca entra por que es true.
}

getFood(false); // si fuera TRUE, seria Friskies
```


### This

¿Cuál es el output o salida en consola luego de ejecutar esté código? Explicar por qué:

```javascript
var fullname = 'Juan Perez';
var obj = {
   fullname: 'Natalia Nerea',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname;
      }
   }
};

console.log(obj.prop.getFullname()); // En obj -> prop -> ejecutar GetFullName. Seria Aurelio de Rosa
var test = obj.prop.getFullname; // Le asignamos la función
// Pasa a ser function () {return this.fullname}

console.log(test()); // Se ejecuta en el contexto global, pasa a buscar a fullname = Juan.Perez
```

### Event loop

Considerando el siguiente código, ¿Cuál sería el orden en el que se muestra por consola? ¿Por qué?

```javascript
function printing() {
   console.log(1); // Se ejecuta primero
   setTimeout(function() { console.log(2); }, 1000); // Se va al web api
   setTimeout(function() { console.log(3); }, 0); // Se va al web api, cuando finalize el tiempo, pone al queue el console.log 3
   console.log(4); // Imprime luego del 1.
} 

printing(); // Una vez finalizado los console log, ejecuta lo que esta en cola. 
 // Queue: console log 3, y despues console log 2
 // Console log 3
 // console log 2
```
