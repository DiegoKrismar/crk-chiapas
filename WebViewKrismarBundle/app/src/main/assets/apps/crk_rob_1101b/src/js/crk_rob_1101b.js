/***********************************************************************************
 *
 *                               *.*.*.*.*.*.* CONSTANTES*.*.*.*.*.*.*
 *
 *************************************************************************************/
//Path de ubicación de imágenes
var PREFIJO = IP + "src/img/crk_rob_1101b_"; //Almacena parte de la ruta donde se ubican los archivos de imagen
var TOTACTIVIDADES = 6; //Almacena el total de actividades, definelo
var HAYNIVEL = false; //Indica si existe o no nivel en la aplicación para mostrar/ocultar icono
var HAYVELAPP = false; //Determina si la aplicación requiere fijar velocidad de ejecución (definela)
var NIVEL = 5; //Define el nivel de tu actividad
var MAXDIGIT = 2; //Es el tope de escritura de digitos en los divs
/***********************************************************************************
 *
 *                         *.*.*.*.*.*.* VARIABLES GLOBALES*.*.*.*.*.*.*
 *
 *************************************************************************************/
//Arreglo donde se almacenan las preguntas, respuestas y distractores
//Orden para el arreglo
//[0] --> Pregunta
//[1] -->Respuesta
//[2] -->Distractor 1
//[3] -->Distractor 2
// y continuar asi hasta que se completen según el guión

var arPreguntas = [
	[
		" ¿En qué siglo se comenzó a utilizar la palabra robot?",
		"En el siglo XX",
		"En el siglo XIX",
		"En el siglo XVIII",
		"En el siglo XVI",
	],
	[
		"¿Quiénes utilizaron por primera vez la palabra robot?",
		"Los hermanos Carpek",
		"Isaac Asimov",
		"Steve Jobs",
		"Bill Gates",
	],
	[
		"¿En dónde se utilizó por primera vez la palabra robot?",
		"En una obra de teatro",
		"En un libro",
		"En el periódico",
		"En la radio",
	],
	[
		"¿Qué significa la palabra checa robota?",
		"Trabajo duro y pesado",
		"Trabajo ligero",
		"Día del trabajo",
		"Muñeco",
	],
	[
		"¿Quiénes, de los que se mencionan, intervienen en la producción de un robot?",
		"Ingenieros y psicólogos",
		"Presidentes y embajadores",
		"Biólogos y estilistas",
		"Periodistas y sacerdotes",
	],
	[
		"¿Cuál es la diferencia principal entre un robot y una máquina?",
		"El robot apoya en varias tareas al ser humano ",
		"La máquina es un objeto físico",
		"Los robots hablan",
		"Las máquinas se prenden y se apagan",
	],
	[
		"¿Cómo se puede clasificar a un desarmador?",
		"Como una máquina",
		"Como un robot",
		"Como un juguete",
		"Como un aparato",
	],
	[
		"¿Cómo se puede clasificar a un tostador?",
		"Como una máquina",
		"Como un robot",
		"Como un juguete",
		"Como un aparato",
	],
	[
		"Todos los que se mencionan son actividades de una máquina, ¿excepto?",
		"Tocar el violín",
		"Lavar ropa",
		"Planchar ropa",
		"Tostar pan",
	],
	[
		"Todas las que se mencionan son actividades de robots, ¿excepto?",
		"Ventilar una recámara",
		"Detectar si el sonido sube a 80 decibeles",
		"Girar si encuentra un objeto en frente para no chocar",
		"Detectar un incendio",
	],
	[
		"Todas las que se mencionan son características de una máquina, ¿excepto?",
		"Puede ser autónomo",
		"Su funcionamiento requiere de intervención humana",
		"No responde a estímulos del entorno",
		"Complementa la actividad el trabajo humano",
	],
	[
		"Todas las que se mencionan son características de un robot, ¿excepto?",
		"Es dependiente del humano",
		"Actúa como lo haría un humano",
		"Responde a estímulos del entorno",
		"Es posible reprogramar su actividad",
	],
	[
		"Todas las características que se mencionan son características de un robot, ¿excepto?",
		"Realiza una y solamente una tarea específica",
		"Aprende del contexto que le rodea",
		"Realiza actividades, dependiendo del entorno ",
		"Puede realizar varias tareas",
	],
	[
		"Todas las que se mencionan son actividades de un robot, ¿excepto?",
		"Licuar y mezclar alimentos",
		"Registrar a una persona en un hotel",
		"Detectar diferentes materiales en la luna",
		"Realizar cirugías",
	],
];
var numOpciones = 4; //total de opciones a mostrar respuestas/distractores por pregunta

var contenedorRespuesta = "d_contenedor_respuesta";
var contenedorClick = "opcionesbase";

/**Evaluaciones bien***/
var balonBien = "d_balon_acierto"; //Clase del balon bien
var balonBienRebote = "d_balonrebote_bien"; //Clase del balon rebote bien
var opcionBaseBien = "d_positivo"; //Clase de opcion base bien
var nomPorteria = "porteria"; //nombre de imagen para secuencia --> red_his_6204b_PORTERIA2.png  --> red_his_6204b_FUTBOL_ PORTERIA2.png
var imgMaxPorteria = 11; //numero max de imagenes de la porteria
/*************************/

/**Evaluaciones mal***/
var balonMal = "d_balon_fallo"; //Clase del balon bien
var balonMalRebote = "d_balonrebote_mal"; //Clase del balon bien
var opcionBaseMal = "d_negativo"; //Clase de opcion base mal
/*************************/

/***********************************************************************************
 *
 *                                    VARIABLES GLOBALES
 *
 *************************************************************************************/
var ejer = null; //Vector con un ejercicio
var respuesta = null; //Respuesta de un ejercicio seleccionado
var contaPorte = 0; //Contador para cambiar las imagenes de la portería
var tmpSolucion = null;
var respUser = null; //almacena la respuesta del usuario
var actividad = 1; //Número de actividad actual
var contaPorteria = 0;
/*************************************************************************************
 *
 *                               FUNCIONES Y PROCEDIMIENTOS
 *
 **************************************************************************************/
function creaEjer() {
	/*
	 * NOMBRE: creaEjer
	 * UTILIDAD: Crea un ejercicio nuevo
	 * ENTRADAS: NInguna
	 * SALIDAS: NInguna
	 */
	/******VARIABLES*******/
	var arrOpciones = [];
	/************************/
	arPreguntas.sort(function () {
		return Math.random() - 0.5;
	}); //Mezclo las preguntas
	ejer = arPreguntas[0]; //Recupero la pregunta y respuestas
	$("#idPregunta").text(ejer[0]); //Muestro la pregunta
	$("." + contenedorRespuesta).addClass("opcionHover");
	respuesta = ejer[1]; //Recupero la respuesta Correcta
	ejer.splice(0, 1); //elimina la respuesta del arreglo y nose repita

	for (j = 0; j < numOpciones; j++) arrOpciones.push(j + 1); //realiza ciclos y agrega según el número de respuestas

	for (i = 0; i < numOpciones; i++) {
		arrOpciones.sort(function () {
			return Math.random() - 0.5;
		}); //Mezclo los id para mostrar respuestas

		$("#idResp" + arrOpciones[0])
			.text(ejer[0])
			.attr("num", arrOpciones[0]);

		$("#" + contenedorClick + arrOpciones[0]).attr(
			"onclick",
			"validaResp(idResp" + arrOpciones[0] + ")"
		); //agrego evento onlick
		arrOpciones.splice(0, 1); //Elimino el no de id de las respuestas
		ejer.splice(0, 1); //Elimino el no de id de las respuestas
	}
	arPreguntas.splice(0, 1); //Elimino la pregunta actual del vector de preguntas
}

function validaResp(num) {
	/*
	 * NOMBRE: validaResp
	 * UTILIDAD: Valida que una respuesta sea in/correcta
	 * ENTRADAS: Recibe el objeto que tiene dentro la respuesta
	 * SALIDAS: Ninguna
	 */
	/******VARIABLES*******/
	respUser = $(num); //Recupero la respuesta del usuario
    $("." + contenedorRespuesta).removeClass("opcionHover");
	/************************/
	for (i = 0; i < numOpciones; i++)
		$("#" + contenedorClick + (i + 1)).removeAttr("onclick"); //remueve atributo onclick a respuestas

	$("." + contenedorRespuesta).css("cursor", "default"); //Quito la manita
	$("#robot").removeClass("d_robot_detenido").addClass("d_robot_tiro");

	if ($(num).text() == respuesta) {
		//compara la resp del usuario con la correcta
		$("#balon").addClass(balonBien); //agrega clase bien
		$("#balonRebote").addClass(balonBienRebote);
		
		correctoDefault();
		$("#opcionesbase" + $(num).attr("num")).addClass(opcionBaseBien); //agrega clase bien
		$("#idGol").text(aciertos); //muestra aciertos
		$("#idInt").text(actividad); //muestra intentos
		
		setTimeout("animaBien()", 2479.8); //realiza la animacion de la porteria

		setTimeout(function () {
			$("#balon").hide();
			$("#robot").hide();
			evaluaActividad();
		}, 6000);
	} else {
		//Incorrecto

		$(".d_balon").addClass(balonMal); //agrega clase mal
		$(".d_balonrebote").addClass(balonMalRebote);

        incorrectoDefault();
	    $("#opcionesbase" + $(num).attr("num")).addClass(opcionBaseMal);//agrega a respuesta mal
        $("#idGol").text(aciertos); //muestra aciertos
		 $("#idInt").text(actividad); //muestra errores

		setTimeout(function () {
			$(".d_balon").addClass(balonMal); //agrega clase mal			
			$(".d_balonrebote").addClass(balonMalRebote);
		}, 2479.8);

		setTimeout(function () {
			$("#balon").hide();
			$("#robot").hide();
			evaluaActividad();
		}, 6000);
	}
}

function animaBien() {
	/*
	 * NOMBRE: animaBien
	 * UTILIDAD: Realiza el cambio de imagenes de la porteria
	 * ENTRADAS: Ninguna
	 */
	contaPorte++; //incrementa el contador
	// $("#porteria").css({"background-image":"url("+PREFIJO+nomPorteria+contaPorte+".png"});//agrega imagenes de porteria
	contaPorteria += 10;
	$("#porteria").css({ "background-position": contaPorteria + "% 0%" }); //agrega imagenes de porteria
	setTimeout(function () {
		if (contaPorte < imgMaxPorteria) {
			//si es menor al max num de img
			animaBien(); //termina
		}
	}, 100);
}

function showSolution() {
	/*
	 * NOMBRE: verSolucionCorr
	 * UTILIDAD: Muestra la solucion de un ejercicio
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	/*******VARIABLES*******/
	var respuestaCorrecta = null;
	/*************************/
	desactivarBtn("#idSolucion");
	$("#opcionesbase" + $(respUser).attr("num")).removeClass(opcionBaseMal); //quita clase mal a la respuesta del usuario

	for (i = 1; i <= numOpciones; i++) {
		if (
			$("#opcionesbase" + i)
				.find("td")
				.text() == respuesta
		) {
			//compara el contenido de las respuestas con el correcto
			$("#opcionesbase" + i).addClass(opcionBaseBien); //agrega clase bien
			respuestaCorrecta = i;
			break;
		}
	}

	tmpSolucion = setTimeout(function () {
		activarBtn("#idSolucion");
		$("#opcionesbase" + respuestaCorrecta).removeClass(opcionBaseBien); //remueve clase mal
		$("#opcionesbase" + $(respUser).attr("num")).addClass(opcionBaseMal); //agrega clase mal
	}, 3000);
}

function siguienteActividad() {
	/*
	 * NOMBRE: siguienteActividad.
	 * UTILIDAD: Cambia al siguiente ejercicio.
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	siguienteDefault();
	creaEjer();
	contaPorte = 0;
	contaPorteria = 0;
	$("." + contenedorRespuesta).css("cursor", "pointer");
	$("#balon").show();
	$("#robot").show().removeClass("d_robot_tiro").addClass("d_robot_detenido");

	/***REMUEVE CLASES A LAS RESPUESTAS/DISTRACTORES****/
	$("." + contenedorRespuesta)
		.removeClass(opcionBaseBien)
		.removeClass(opcionBaseMal);
	$(".d_balonrebote")
		.removeClass(balonBienRebote)
		.removeClass(balonMalRebote);
	$("#balon").removeClass(balonBien).removeClass(balonMal);
}

function evaluaActividad() {
	/*
	 * NOMBRE: evaluarActividad.
	 * UTILIDAD: Evalua las soluciones en la actividad.
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	evaluaDefault();
}

function iniciaActividad() {
	/*
	 * NOMBRE: iniciaActividad.
	 * UTILIDAD: Quita opacidad inicial, ejecuta el codigo que iniciliza la aplicación.
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	iniciaDefault();
	creaEjer();
}
