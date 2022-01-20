var elementoActual = 0; //Elemento que aleatorio del array
var crearSubArreglo = false; 
var subarreglo=[]; 

function crearArray(numero){
    /*
    * NOMBRE: crearArray.
    * UTILIDAD: Crea el arreglo que va a almacenarse en el local storage.
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    // **************** VARIABLES ********************************
    var obj = null; // Objeto que gaurdará el array
    var bandera = 0; // Bandera para que no aparezca al principio el último elemento que se mostró
    // ***********************************************************
    /* Ciclo para verificar que en caso de que ya existiera el objeto en el local storage, el último que paso no sea el primero del nuevo que se creará */
    while(bandera == 0){ //Mientras la bandera sea cero
        array.sort(function(){return Math.random() - 0.5}); //Mezcla los elementos
        if(numero == undefined) { //Si es la primera vez que crea el local storage
            bandera = 1; // Bandera cambia a 1
        } 
        else { //Si ya existia en el local storage
            var aux = array[0]; //Obtenemos el primero elemento que puede aparecer
            if(typeof numero == "number" || typeof numero == "string"){
                if(aux != numero){ // Si el primero es diferente al último anterior 
                    bandera = 1; // Bandera cambia a 1
                }
            }
            else if(typeof numero == "object"){
                let band = true;
                for (let i = 0; i < aux.length; i++) {
                    if(aux[i] != numero[i]) band = false;
                }
                if(!(band == true && (aux.length == numero.length))) bandera = 1;
            }
        }
    };
    /* Fin ciclo */

    obj = {
        arreglo: array,
        ultimo: array[0]
    }; //Creamos el objeto con el arreglo y el valor del primer elemento
    if(nombreObjeto == undefined || nombreObjeto == null) nombreObjeto = "objeto";
    localStorage.setItem(nombreObjeto, JSON.stringify(obj)); // Guardamos el nuevo valor en el local storage
    elementoActual = obj.ultimo; // El valor del elemento que se va a mostrar cambia
};

function crearSubarreglos(i){
	 /*
    * NOMBRE: crearSubarreglos.
    * UTILIDAD: Crea arreglos auxiliares con el local storage para el desarrollo de la actividad.
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
	// ******************************* VARIABLES *********************************************
    var cantidad = 0;
	// ******************************************************************************************
    // cantidad = subarreglo.length;
    // if(excepcion == undefined){
        // for(let i = 1; i <= cantidad; i++){
            var obj = null; // Objeto que gaurdará el array
            var arreglo = subarreglo[i-1];
            arreglo.sort(function(){return Math.random() - 0.5}); //Mezcla los elementos
            obj = {
                arreglo: arreglo,
                actual: arreglo[0]
            }; //Creamos el objeto con el arreglo y el valor del primer elemento
            localStorage.setItem(nombreSubarreglos+i, JSON.stringify(obj)); // Guardamos el nuevo valor en el local storage
        // }
    // }
}

function getElemento(numero){
    /*
    * NOMBRE: getElemento.
    * UTILIDAD: Regresa el valor actual de cierto array.
    * ENTRADAS: numero -> Numero del arreglo que se va a conseguir el valor actual.
    * SALIDAS: Ninguna.
    */
   var objeto = JSON.parse(localStorage.getItem(nombreSubarreglos+numero));
   return objeto.actual;
}

function getArreglo(numero){
    /*
    * NOMBRE: getArreglo.
    * UTILIDAD: Regresa el arreglo especificado.
    * ENTRADAS: numero -> Numero del arreglo que se va a conseguir el valor actual.
    * SALIDAS: Ninguna.
    */
   var objeto = JSON.parse(localStorage.getItem(nombreSubarreglos+numero));
   return objeto.arreglo;
}

function moverElemento(numero){
    /*
    * NOMBRE: moverElemento.
    * UTILIDAD: Permite ir moviendo el valor dentro del array.
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    // *************** VARIABLES *********************
    var objeto = null;
    var arreglo = null;
    // ***********************************************
    if(numero == undefined){ // Cuando vamos a mover el objeto que cambia al refrescar la página
        objeto = JSON.parse(localStorage.getItem(nombreObjeto));
        arreglo = objeto.arreglo;
        for (var i = 0; i < arreglo.length; i++) { // Se recorre todo el arreglo
            let elemento = arreglo[i];
            if (typeof elemento == "object") {
                let ultimo = objeto.ultimo;
                let bandera = true;
                for (let index = 0; index < elemento.length; index++) {
                    if(elemento[index] != ultimo[index]){ 
                        bandera = false;
                    }
                }
                if (bandera == true && (ultimo.length == elemento.length)) {
                    objeto.ultimo = arreglo[i+1];
                    elementoActual = objeto.ultimo
                    break;
                }
            }
            else if(typeof elemento == "number" || typeof elemento == "string") {    
                if(elemento == objeto.ultimo){ // Cuando encuentre el número
                    objeto.ultimo = arreglo[i+1]; // Se modifica el valor del objeto
                    elementoActual = objeto.ultimo; // El valor del elemento que se va a mostrar cambia
                    break; // Termina el ciclo
                }
            }
        }
        array = arreglo; // El array que se manipula en el programa es el del objeto
        localStorage.setItem(nombreObjeto, JSON.stringify(objeto)); // Asignamos nuevamente al objeto
    }
    else { // Cuando se va a mover un arreglo dentro de la actividad
        objeto = JSON.parse(localStorage.getItem(nombreSubarreglos+numero));
        arreglo = objeto.arreglo;
        for (var i = 0; i < arreglo.length; i++) { // Se recorre todo el arreglo
            if((arreglo[i] == objeto.actual) && (arreglo[i] != arreglo[arreglo.length-1])){ // Cuando encuentre el número
                objeto.actual = arreglo[i+1]; // Se modifica el valor del objeto
                localStorage.setItem(nombreSubarreglos+numero, JSON.stringify(objeto)); // Asignamos nuevamente al objeto
                break; // Termina el ciclo
            } 
            else if(objeto.actual == arreglo[arreglo.length-1]){
                crearSubarreglos(numero);
                break;
            } 
        }       
    }
}

function generarArreglo() {
    /*
    * NOMBRE: generarArreglo.
    * UTILIDAD: Crea el un array en el local storage y nos permite utilizar los elementos que contiene.
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    // **************** VARIABLES ********************
    var objeto = JSON.parse(localStorage.getItem(nombreObjeto)); // Obtenemos el valor del local storage
    var cantidad = subarreglo.length;
    // ***********************************************
    if (objeto == null) { // Si nunca se ha creado el objeto en el local storage
        crearArray();
		if(!(typeof crearSubArreglo === 'undefined')){
            if(crearSubArreglo){for (let i = 1; i <= cantidad; i++) {crearSubarreglos(i);}}
		}
	}
    else { // Si ya existia
        let arreglo = objeto.arreglo; // Obtenemos el arreglo
        let ultimo = objeto.ultimo; // Obtenemos el último elemento que se mostro
        if(typeof ultimo == "number" || typeof ultimo == "string"){
            if(arreglo[arreglo.length-1] != ultimo) // Sí no es el último elemento del arreglo
                moverElemento(); 
            else // Si es el ultimo elemento
                crearArray(ultimo);
        }
        else if(typeof ultimo == "object"){
            let arraux = [];
            let bandera = true;
            arraux = arreglo[arreglo.length -1];
            for (let i = 0; i < arraux.length; i++) {
                if(arraux[i] != ultimo[i]) bandera == false;
            }
            if(bandera == true && (arraux.length == ultimo.length))
                crearArray(ultimo);
            else
                moverElemento();
        }
    }
}

function creaArregloNuevo(){
    /*
    * NOMBRE: creaArregloNuevo.
    * UTILIDAD: Genera un arreglo aleatorio con el elementoActual del arreglo de local storage como primer elemento de un nuevo arreglo.
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    // **************** VARIABLES ********************
    var newArr = []; // Nuevo arreglo
    var pos = array.indexOf(elementoActual); // Posición del elementoActual en el arreglo
    // ***********************************************
    newArr = array.slice(); // Copiamos el arreglo
    newArr.splice(pos, 1); // Eliminamos el elemento actual
    mezclar(newArr); // Revolvemos el arreglo
    newArr.unshift(elementoActual); // Colocamos como primer elemento a elementoActual
    return newArr; // Regresamos el arreglo
}

function mezclar(bar){
    // *********** VARIABLES *********************
    var m = bar.length-1;
    // *******************************************
    for (let i = m; i > 1; i--){
        let alea=Math.floor(i*Math.random());
        let temp=bar[i];
        bar[i]=bar[alea];
        bar[alea]=temp;
    }
}