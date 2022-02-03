/***********************************************************************************
 *
 *                                    CONSTANTES
 *
 *************************************************************************************/
//Path de ubicación de imágenes
var PREFIJO = IP + "src/img/crk_rob_1102b_"; //Almacena parte de la ruta donde se ubican los archivos de imagen
var TOTACTIVIDADES = 1; //Almacena el total de actividades, definelo

var HAYNIVEL = false; //Indica si existe o no nivel en la aplicación para mostrar/ocultar icono
var HAYVELAPP = false; //Determina si la aplicación requiere fijar velocidad de ejecución (definela)

var NIVEL = 1; //Define el nivel de tu actividad
var MAXDIGIT = 2; //Es el tope de escritura de digitos en los divs
/***********************************************************************************
 *
 *                                    VARIABLES GLOBALES
 *
 *************************************************************************************/
/***VER DOCUMENTACIÓN RUTINA SOPA DE LETRAS V5***/

/*Arreglo que almacena;
	posición[0] -->Palabra a encontrar en la sopa la letras.
	posición[1] -->Color de referencia de la palabra.
	posición[2] -->Descripción a mostrar. En caso de no existir descripción dejar la posición vacia.*/
//NOTA : Es importante respetar el orden de los elementos en caso de no existir dejar la posición en vacio
var arPalabras = [];

var numPalabras = 6; //numero total de palabras en el ejercicio a buscar en la sopa de letras
var medidasSopaFilas = 15; //Número de elementos filas (hacia abajo) para la sopa de letras
var medidasSopaColumnas = 15; //Número de elementos d_input columnas (hacia la derecha) de la sopa de letras
var numInterfaz = 1; //interfaz RED = 1 --- interfaz HAB = 2

var claseEvalBien = "d_opcion_bien"; //clase para evaluar bien (Es necesario agrega una clase)
var claseEvalMal = "d_opcion_mal"; //clase para evaluar mal (Es necesario agrega una clase)

var minuto = -1; //Almacena los minutos de la aplicación
var segundo = -1; //Almacena los segundos de la aplicación 60

var elementosAgregaEval = "#eval"; //id de los elementos a los que se le agregara la evaluación --> ejemplo #num1 , #num2 , #num3 --> solo enviar el #num que corresponde alo general
var noSegundoRetro = 5000; //almacen al tiempo de retroalimentación en milisegundos
var htmlInicio = null; //corresponde al html limpio de la actividad

/////////////VARIABLES NO RUTINA////////////////////
var arrPalabrasBanco = [
	"plástico",
	"energía",
	"electricidad",
	"aire",
	"agua",
	"sensores",
	"sentidos",
	"metal",
	"llantas",
	"brazos",
	"piernas",
	"cerebro",
	"manos",
	"instrucciones",
	"controlador",
	"programación",
	"partes",
	"mecánica",
];

var arrColores = [
	"#662D91",
	"#603813",
	"#ED1E79",
	"#01BFA5",
	"#F7931E",
	"#0171BC",
]; //colores para el color de palabras a encontrar en la sopa
/*************************************************************************************
 *
 * 					*.*.*.*.*.*.* FUNCIONES Y PROCEDIMIENTOS*.*.*.*.*.*.*
 *
 **************************************************************************************/
function generarPalabras() {
	/*
	 * NOMBRE: iniciaActividad.
	 * UTILIDAD: Genera el contenido de la actividad, esta función es para generar las palabras, colores y descripciones si asi lo corresponde.
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */

	arrNumPos = aleatorioArreglo(arrPalabrasBanco);
	colorIndex = aleatorioArreglo(arrColores);

	for (i = 1; i <= numPalabras; i++) {
		arPalabras.push([
			arrPalabrasBanco[arrNumPos[i - 1]],
			arrColores[colorIndex[i - 1]],
			"",
		]); //agrega palabra, color y descripción
		$("#palabra" + i)
			.html(capitalizeFirstLetter(arrPalabrasBanco[arrNumPos[i - 1]]))
			.css("color", arrColores[colorIndex[i - 1]]); //agrega al elemento
	}
}

function iniciaActividad() {
	/*
	 * NOMBRE: iniciaActividad.
	 * UTILIDAD: Quita opacidad inicial, ejecuta el codigo que iniciliza la aplicación.
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	$(".d_cronometroact").show();

	iniciaDefault();
	htmlInicio = $(".d_contegrlactinf").html(); //almacena el html inicial de la actividad
	generarPalabras(); //llama a función que genera las palabras o bien el arreglo correspondiente
	creaSopa(); //llama a función para crear sopa
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function detieneCronometro() {
	//Función vacía para evitar errores
}

function trazaLinea(id1, id2, id1a, id2b, palabra) {
	//Modificación de la función original para encajar con el diseño

	//Primero debemos saber cual va a ser el id1 y el id2
	var arOrden = getOrden(id1, id2, id1a, id2b);
	var distRecta = 0; //Distancia de la recta
	//Id 1 y 2 ordenados
	var ide1 = arOrden[0];
	var ide2 = arOrden[1];

	/*Coordenadas para el calculo de la distancia de la recta*/
	var x1 = $("#" + ide1).position().left; //calcula left y top de cada letra inicio y final de palabra
	var y1 = $("#" + ide1).position().top;
	var x2 = $("#" + ide2).position().left;
	var y2 = $("#" + ide2).position().top;

	var anchoT = $(divConte).width();
	var altoT = $(divConte).height();

	var margUp = (100 * $("#" + ide1).position().top) / altoT - 1;
	var margLef = (100 * $("#" + ide1).position().left) / anchoT - 2;

	$("#significado").removeClass("pulse").text();
	$("#significado").removeAttr("style");
	$(divConte).before(
		"<div class = 'prueba' id = 'idLinea" + contadorLines + "'></div>"
	); //agrega el elemento

	//Calculando la distancia de la recta
	distRecta = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	//Convierto la distancia de la recta a %
	distRecta = (100 * distRecta) / anchoT + numPorc;

	var mAB = null;
	var angAB = null;

	//Obteniendo la m y el angulo de inclinacion
	mAB = (y2 - y1) / (x2 - x1);

	//Obteniendo el angulo de inclinación
	//angAB = ((180*Math.atan(mAB))/ Math.PI)+gradosGira;
	angAB = (180 * Math.atan(mAB)) / Math.PI;
	//Caclculando el top

	if (bandRetro != 0) {
		$("#idLinea" + contadorLines).css({
			position: "absolute",
			top: margUp + "%",
			left: margLef + "%",
			width: distRecta + "%",
		}); //si no es retro
	} else {
		$("#idLinea" + contadorLines).transition({
			position: "absolute",
			top: margUp + "%",
			left: margLef + "%",
			width: distRecta + "%",
		}); //si es retro
	}
	$("#idLinea" + contadorLines).css("background-color", colorLine); //agrega el color de la liena marcada

	if (bandSent == 1) {
		$("#idLinea" + contadorLines).css({
			top: margUp - 2.9 + "%",
			left: margLef + 3.5 + "%",
		}); //si no es retro
		$("#idLinea" + contadorLines).css({
			transform: "rotate(" + angAB + "deg)",
			"transform-origin": "left",
		});
	} else if (bandSent == 2) {
		$("#idLinea" + contadorLines).css({
			top: margUp - 2 + "%",
			left: margLef + 2 + "%",
		}); //si no es retro
		$("#idLinea" + contadorLines).css({
			transform: "rotate(" + angAB + "deg)",
			"transform-origin": "left",
		});
	} else if (bandSent == 3) {
		$("#idLinea" + contadorLines).css({
			top: margUp - 2 + "%",
			left: margLef + 6 + "%",
		}); //si no es retro
		$("#idLinea" + contadorLines).css({
			transform: "rotate(" + (angAB - 180) + "deg)",
			"transform-origin": "left",
		});
	}

	if (bandRetro == 0) {
		playCorrecto();
		if (bandCrono == true) {
			numAciertos++;
			if (numAciertos == arPalabras.length) {
				//compara el num de aciertos
				$(".d_cuadroCrucigrama").css("z-index", "0");
				//detieneCronometro();
				stopCrono();
				if (numInterfaz == 1) {
					//según la interfaz manda llamar
					evaluaActividad();
				} else {
					evaluarAct();
				}
				$(".d_input").off("click").css("cursor", "default"); //descativa el click de las letras
			}
		}
	}

	setTimeout(function () {
		contadorLines++;
	}, 200);
}

function evaluarAct() {
	//INTERFAZ HAB
	//NOMBRE: evaluarAct.
	//UTILIDAD: Evalua los ejercicios de las actividades de la aplicación.
	//ENTRADAS: id > cadena, es el id de la respuesta seleccionada.
	//SALIDAS: Ninguna.
	/**********VARIABLES***********/
	var aciertosEval = 0;
	var erroresEval = 0;
	var porcPar = 0;
	/*********************************/
	detieneCronometro();
	stopCrono();
	$(".d_input").off("click").css("cursor", "default"); //Removemos los eventos a las letras
	$(".d_leyenda").fadeOut(); //Desaparece el div con el anuncion de fin de tiempo
	addEval(); //Agrega el color de eval mal

	aciertosEval += numAciertos; //agrega los aciertos
	numErrores = numPalabras - numAciertos; //agrega los errores

	porcPar = (100 * aciertos) / (aciertos + errores); //realiza el calculo para saber el porcentaje
	if (porcPar >= 75) {
		//compara si el porcentaje es mayor de 75
		fillBarBien(); //si es mayor agrega bien
	} else {
		fillBarMal(); //si es menor agrega mal
		/********VER SOLUCIÓN*******/
		activarBtn("#idSolucion");
		$("#idSolucion").addClass("solution");
		/*********************************/
	}
	evaluaDefault();
}

// DEBUG

// function addPal(palabra) {
// 	/*
// 	 * NOMBRE: addPal
// 	 * UTILIDAD: Agrega la palabra
// 	 * ENTRADAS: Recibe la palabra para agregar
// 	 * SALIDAS: Ninguna
// 	 * VARIABLES************/
// 	var idInput = null; //Será el id del input
// 	var valorInput = null; //Valor del input donde comenzará la palabra
// 	var sentido = null; //Sera el sentido en el que se agregará la palabra
// 	var arSentidos = [1, 2, 3, 4, 5, 6, 7, 8]; //Indices para los sentidos posibles
// 	//var arSentidos = [7];//Indices para los sentidos posibles
// 	palabra = palabra.toLocaleUpperCase();
// 	/**********************/
// 	//1, izquierda-derecha appendId
// 	//2, derecha-izquierda appendDi
// 	//3, ariba-abajo appendArAb
// 	//4, abajo-arriba appendAbAr
// 	//5, diagonal, izquierda-derecha, arriba-abajo appendDidArAb
// 	//6, diagonal, derecha-izquierda, abajo-arriba appendDdiAbAr
// 	//7, diagonal, derecha-izquierda, arriba-abajo appenDdiArAb
// 	//8, diagonal, izquierda-derecha, abajo-arriba appenDdiArAb
// 	do {
// 		idInput = getIdInput(); //Obtengo un id aleatorio
// 		if ($(idInput).text() == "") {
// 			//Si el valor de ese input esta vacío
// 			valorInput = 0;
// 		} else {
// 			//Si esta ocupado
// 			valorInput = 1;
// 		}
// 	} while (valorInput != 0);

// 	arSentidos = arSentidos.sort(function () {
// 		return Math.random() - 0.5;
// 	});
// 	sentido = arSentidos[0];
// 	console.log(palabra, numFila, numCol);
// 	switch (sentido) {
// 		case 1:
// 			appendId(palabra, numFila, numCol, "id");
// 			break;
// 		case 2:
// 			appendId(palabra, numFila, numCol, "di");
// 			break;
// 		case 3:
// 			appendId(palabra, numFila, numCol, "ArAb");
// 			break;
// 		case 4:
// 			appendId(palabra, numFila, numCol, "AbAr");
// 			break;
// 		case 5:
// 			appendId(palabra, numFila, numCol, "DidArAb");
// 			break;
// 		case 6:
// 			appendId(palabra, numFila, numCol, "DdiAbAr");
// 			break;
// 		case 7:
// 			appendId(palabra, numFila, numCol, "DdiArAb");
// 			break;
// 		case 8:
// 			appendId(palabra, numFila, numCol, "DdiAbAb");
// 			break;
// 	}
// }
