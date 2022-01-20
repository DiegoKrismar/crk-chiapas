/* **********************************************************************************
* 
*                                    VARIABLES GLOBALES
*
************************************************************************************ */
var banderaLocalStorage = true;
var nombreObjeto = null;
var array = null;
/* ***********************************************************************************
*
* 								FUNCIONES Y PROCEDIMIENTOS
*
************************************************************************************ */

function aleatorioArreglo(arreglo){
    /*
	*NOMBRE: aleatorioArreglo
	*UTILIDAD: Revuelve el arreglo de elementos 
	*ENTRADAS: ninguna
	*SALIDAS: ninguna
    */
    // ********************* VARIABLES ***********************
    var vector = null; // Nuevo vector a 
    // *******************************************************

    if(banderaLocalStorage){
        nombreObjeto = PREFIJO;
        array = generateNumericArray(arreglo); 
        generarArreglo(); // Crea/Verifica los elementos en el local storage
        vector = creaArregloNuevo(); // Crea un arreglo aleatorio cuyo primer elemento sea el elementoActual del local storage
    }else{
        vector = generateNumericArray(arreglo);
        mezclar(vector);
    }
    return vector;
    
}

function generateNumericArray(arreglo){
     // *********** VARIABLES *********************
    var array = []; // Arreglo que contendrá los números
    // *******************************************
    for (let index = 0; index < arreglo.length; index++) { array.push(index); } // Agregamos la cantidad de números correspondiente a la longitud del arreglo
    return array; // Regresamos el arreglo
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
