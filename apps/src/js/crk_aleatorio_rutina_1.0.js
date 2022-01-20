/*******************************************************************************************************************************************************
*
* 																RUTINA GENERACIÓN DE EJERCICIOS ALEATORIOS CRK - EVALUACIÓN
*
********************************************************************************************************************************************************/
/**
* @fileoverview Librería para generar una serie de ejercicios para las actividades CRK de evaluación.
* @version 1.0
* @date 06/08/21
*/
/***********************************************************************************
* 
*                                    VARIABLES GLOBALES
*
*************************************************************************************/
/**
 * @param {Array} repeated: Almacena los elementos que se han repetido enre cada 'Celda', para evitar elegir los mismos
 * @param {Array} exercisePositions: Almacena las posiciones del ejercicio actual
 * @param {Object} valoresSecciones: JSON que almacena los parametros para cálcular las distintas series de ejericios de cada sección
*/
var repeated = [];
var exercisePositions = [];
var valoresSecciones = [];
/***********************************************************************************
* 
*                                    FUNCIONES
*
*************************************************************************************/
function shuffle(arr) {
	/*
	* NOMBRE: shuffle.
	* UTILIDAD: Mezcla un array de entrada de forma aleatoria y lo regresa.
	* ENTRADAS: arr --> Arreglo a mezclar.
	* SALIDAS: arr --> Arreglo mezclado.
	*/
    var j,temp; //Variables auxiliares
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr; //Regresar el array mezclado 
};

function getRandomFromArray(arr){
	/*
	* NOMBRE: getRandomFromArray.
	* UTILIDAD: Obtiene un elemento al 'azar' de un array.
	* ENTRADAS: arr --> Arreglo de dónde se obtendrá el elemento.
	* SALIDAS: ran --> Elemento obtenido al 'azar'.
	*/
	let ran = arr[Math.floor(Math.random() * arr.length)]; // Obtener el elemento al azar del array
	while(!(repeated.indexOf(ran)==-1)){ //Mientras este elemento ya se haya obtenido antes, obtener otro
		ran = arr[Math.floor(Math.random() * arr.length)];;
	}
	return ran; //Regresar el elemento obtenido
}

function deleteFromArray(element, arr){
	/*
	* NOMBRE: deleteFromArray.
	* UTILIDAD: Elimina un elemento de un array.
	* ENTRADAS: element --> Elemento a eliminar, arr --> Arreglo de dónde se eliminará el elemento.
	* SALIDAS: arr --> Array con el elemento eliminado
	*/
	let index = arr.indexOf(element); //Obtener el indice del elemento a eliminar 
	arr.splice(index, 1); //Eliminar el elemento del array
	return arr; //Regresar el elemento
}

function setRandomForced(json){
	/*
	* NOMBRE: setRandomForced.
	* UTILIDAD: Crea un objeto, el servirá como 'memoria' de los ejercicios generados. 
	* ENTRADAS: Ninguna.
	* SALIDAS: mem --> JSON que contiene una seríe de arrays los cuales representan los 'n' ejercicios generados
	*/
	let positions = [];
	let localArray = [];
	let random, result; //Variables auxiliares
	/**
	 *@typeof {Object} mem
	 *@property {Array} positionsArray: Almacena un cojunto de arrays que contienen las posiciones de los ejercicios generados
	*/
	let aux = "positions"+json.SC;
	let mem = {
		[aux]:[]
	};
	
	for(var i=0;i<json.NP;i++){ //Generar un array con las posiciones, representa las preguntas
		positions.push(i);
	}
	positions = shuffle(positions); //Mezclar las posiciones 
	for(var i=0;i<json.CC;i++){ //Llenar las celdas de memoria
		localArray = [];
		if(i>0){
			for(var j=0;j<json.MP;j++){
				auxRandom = getRandomFromArray(mem.aux[i-1]);
				repeated.push(auxRandom);
				localArray.push(auxRandom);
			}
		}
		while(localArray.length<json.LC){
			random = getRandomFromArray(positions);
			positions = deleteFromArray(random, positions);
			localArray.push(random);
			positions = shuffle(positions);
		}
		mem[aux].push(shuffle(localArray));
	}
	return mem;
}

function mixMemory(memoryArrays){
	/*
	* NOMBRE: mixMemory.
	* UTILIDAD: En caso de que se le indique al algoritmo que puede haber 'n' elementos repetidos entre ejericios, forzar a que no salgan en las mismas posiciones
	* ENTRADAS: memoryArrays --> Ejercicios generados por el algoritmo, conjunto de arrays.
	* SALIDAS: memoryArrays --> Ejercicios generados por el algoritmo, mezclados para no repetir, en caso de que se haya indicado que puede contener repetidos , conjunto de arrays.
	*/
	let i = 0;
	let j;
	while(i<memoryArrays[0].length){
		buffer = [];
		j = 0;
		while(j<memoryArrays.length){
			if(buffer.indexOf(memoryArrays[j][i]) != -1){ //Está en el buffer, se repiten las MP  preguntas en posición
				memoryArrays[j] = shuffle(memoryArrays[j]);
				j = 0;
				i = 0;
			}else{
				j++;
			}
		}
		i++;
	}
	return memoryArrays;
}

function init(memory){
	/*
	* NOMBRE: init.
	* UTILIDAD: Inicio del flujo para crear la 'memoria', cálcula los parametros de la ecuación que debe de cumplirse para el funcionamiento del algoritmo. 
	* ENTRADAS: memory --> Elemento obtenido del localStorage que representa la memoria.
	* SALIDAS: mem --> JSON que contiene una seríe de arrays los cuales representan los 'n' ejercicios generados
	*/
	/**
	 *@typeof {Object} memory
	 *@property {Array} positionsArray: Almacena un cojunto de arrays que contienen las posiciones de los ejercicios generados
	*/
	memory = {
		"positionsArray": []
	}
	for(let i = 0; i < valoresSecciones.length; i++){
		valoresSecciones[i] = setParameters(valoresSecciones[i]);
		mem = setRandomForced(valoresSecciones[i]); //Generar los ejercicios de forma forzada
		memory.positionsArray.push(mem);
		
	}
	localStorage.setItem('memory_'+PREFIJOACT, JSON.stringify(memory));
} 

function initSingle(json){
	/*
	* NOMBRE: initSingle.
	* UTILIDAD: Inicializa un conjunto de Arrays para una sola sección. 
	* ENTRADAS: Ninguna.
	* SALIDAS: json --> JSON que contiene los parametros con los que se generarán los ejercicios
	*/
	let positions = [];
	let localArray = [];
	let random, result; //Variables auxiliares
	let aux = [];
	for(var i=0;i<json.NP;i++){ //Generar un array con las posiciones, representa las preguntas
		positions.push(i);
	}
	positions = shuffle(positions); //Mezclar las posiciones 
	for(var i=0;i<json.CC;i++){ //Llenar las celdas de memoria
		localArray = [];
		if(i>0){
			for(var j=0;j<json.MP;j++){
				auxRandom = getRandomFromArray(aux[i-1]);

				repeated.push(auxRandom);
				localArray.push(auxRandom);
			}
		}
		while(localArray.length<json.LC){
			random = getRandomFromArray(positions);
			positions = deleteFromArray(random, positions);
			localArray.push(random);
			positions = shuffle(positions);
		}
		aux.push(shuffle(localArray));
	}
	return aux;
}

function getExerFromMemory(){
	/*
	* NOMBRE: getExerFromMemory.
	* UTILIDAD: Obtiene un ejercicio (array) de la 'memoria' que se encuentra en el localStorage
	* ENTRADAS: Ninguna.
	* SALIDAS: current --> Ejercicio obtenido de la 'memoria' (array) que representa las posiciones de las preguntas que se mostrarán al usuario
	*/
	let memory = JSON.parse(localStorage.getItem("memory_"+PREFIJOACT)); //Obtener el localStorage
	let current;
	if(memory == null || memory == undefined ||  memory.positionsArray.length == 0){ //Si está vacio el localStorage, necesario generar de nuevo ejercicios
		init(memory); //Iniciar el flujo para generar ejercicios nuevos
		current = getExerFromMemory(); // Obtener un ejercicio de la 'memoria' creada
	}else{ //Si hay ejercicios en la 'memoria'
		current = getCellExercise(memory)
		localStorage.setItem('memory_'+PREFIJOACT, JSON.stringify(memory)); //Volver a colocar el JSON de ejercicios en 'memoria' (localStorage)
	}
	return current;
}

function getCellExercise(memory){
	/*
	* NOMBRE: getCellExercise.
	* UTILIDAD: Obtiene un conjunto de ejercicios de la memoria, dependiendo de las secciones existentes
	* ENTRADAS: Ninguna.
	* SALIDAS: exercise --> Array que contiene las posiciones de las preguntas a desplegar en el ejercicio actual. (Contiene un array con 'n' preguntas por cada sección)
	*/
	let exercise = []
	let aux;
	for(let i = 0 ; i < memory.positionsArray.length; i++){
		aux = "positions"+i;
		if(memory.positionsArray[i][aux] == " " || memory.positionsArray[i][aux].length == 0){
			valoresSecciones[i] = setParameters(valoresSecciones[i]);
			memory.positionsArray[i][aux] = initSingle(valoresSecciones[i]);
		}
		exercise.push(memory.positionsArray[i][aux].shift());
	}
	return exercise 
}

function setParameters(json){
	/*
	* NOMBRE: setParameters.
	* UTILIDAD: Obtiene la cantidad máxima de ejercicios que puede generar con las preguntas que se tienen y el porcentaje de máximo repetidos
				Utiliza la desigualdad ((NP + (MP*(CC-1)))>=(LC*CC)) --> (((NP-MP)/(LC-MP))=(CC))
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna
	*/
	/**
	 * @param {Int} MP: Máximo de preguntas parecidos (en cantidad de elementos)
	 * @param {Int} CC: Caltidad de Celdas de memoría distinta que se pueden generar con los valores establecidos
	*/
	if(json.PP>50){ //No se debe de superar el 50% de parecidos debido a la desigualdad  ((LC-MP)>=(MP)) --> ((LC/2)>=(MP)), con MP expresado en elementos y NO en porcentaje
		json.PP = 50;
	}
	json.MP = Math.trunc(json.PP); //Por si expresan el porcentaje en flotante, obtener la parte entera
	json.MP = Math.trunc(json.LC*(json.MP/100)); //Convertir el porcentaje a número de elementos
	json.CC = Math.trunc(((json.NP-json.MP)/(json.LC-json.MP))); //Cálcular la cantidad de 'celdas' que se pueden generar con el porcentaje de repetidos y la cantidad de preguntas 
	return json;
}

function getTopicFromPositions(pos){
	/*
	* NOMBRE: getTopicFromPositions.
	* UTILIDAD: Llena un array con las preguntas, usando el array de posiciones obtenido por el algorimo
	* ENTRADAS: pos --> Array que contiene las posiciones de las preguntas a desplegar en el ejercicio actual.
	* SALIDAS: arrayTopics --> Array que contiene las preguntas a desplegar en el ejercicio actual
	*/
	arrayTopics = [];
	for(let i = 0; i < pos.length; i++){
		for(let j = 0; j < pos[i].length; j++){
			arrayTopics.push(allSections[i][pos[i][j]])
		}
	}
	
	if(arrayTopics.length<totalPreguntas){ //Faltan más preguntas, sacarlas del total, NO se guardarán en memoria, pueden repetirse en un futuro
		let restantes = totalPreguntas - arrayTopics.length;
		let j,k;
		while(arrayTopics.length!=totalPreguntas){ //Mientras NO tengamos todas las preguntas requeridas
			j = getRandomInt(0, allSections.length);
			i = getRandomInt(0, allSections[j].length);
			if(!(arrayTopics.includes(allSections[j][i]))){ //Si no está la pregunta ya en el ejercicio generado, agregarla
				arrayTopics.push(allSections[j][i]);
			}
		}
	}
	return arrayTopics;
}

function getRandomInt(min, max) {
	/*
	* NOMBRE: getRandomInt.
	* UTILIDAD: Función para generar un número entero dentro de un intervalo
	* ENTRADAS: Min --> Limite inferior del intervalo (Incluido), max --> Limite superior del intervalo (Excluido)
	* SALIDAS: random --> número entero dentro de un intervalo
	*/
	let random = Math.floor(Math.random() * (max - min)) + min;
	return random;
}