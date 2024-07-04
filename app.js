let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let numeroMaximoDeIntentos = 3;

/* 
Document nos permite conectarnos con el archivo html. El parametro recibe un texto, que será un identificador del elemento que queremos usar.

Pueden usarse distintos identificadores para acceder a un elemento. Algunos pueden ser:
    - Tipo de elemento (Debe ser el unico de ese tipo)
    - Clase
*/
function asignarTextoElemento(nombreElemento, texto){
    let elemento = document.querySelector(nombreElemento);
    elemento.innerHTML = texto;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);

    console.log(intentos);
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos == 1) ? 'vez' : 'veces'}`);
        habilitarBoton('reiniciar');
    } else {
        // El usuario no acertó
        intentos ++;
        if (intentos > numeroMaximoDeIntentos){
            asignarTextoElemento('p', 'Alcanzaste el número máximo de intentos');
            deshabilitarBoton('intentar');
            habilitarBoton('reiniciar');
        } else {
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p', 'El número secreto es menor');
            } else {
                asignarTextoElemento('p', 'El número secreto es mayor');
            }
        }
        limpiarCaja();
    }
}

function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    console.log(numeroGenerado);

    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
        deshabilitarBoton('reiniciar');
        deshabilitarBoton('intentar');
    } else {
        //Si el numero generado está incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            console.log(listaNumerosSorteados);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego(){
    //Limpiar la caja
    limpiarCaja();
    //Deshabilitar el boton nuevo juego
    deshabilitarBoton('reiniciar');
    habilitarBoton('intentar');
    //Indicar mensaje de intervalo de números
    //Generar el número aleatorio   
    //Inicializar el numero de intentos
    condicionesIniciales();
}

function habilitarBoton(idBoton){
    //Accediendo al elemento con su id mediante getElementById
    document.getElementById(idBoton).removeAttribute('disabled');
}

function deshabilitarBoton(idBoton){
    //Accediendo al elemento con su id mediante querySelector('#...')
    document.querySelector('#' + idBoton).setAttribute('disabled', 'true');
}

condicionesIniciales();