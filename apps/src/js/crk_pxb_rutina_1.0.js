/***********************************************************************************
 *
 *                                    CONSTANTES
 *
 *************************************************************************************/
const maxLengthPractices = 15000; //Numero de caracteres maximos en BD
const expirationPractices = 31556952000; //Milisegundos que tiene de vigencia las practicas (1 año)
getType = "pxb"; //Variable para saber si es simulador o armado
const KEY = "81";
const KEY_2 = "87";
const KEY_3 = "69";
const KEY_4 = "82"
const domainsWithDB = []; //Definición de dominios que tiene permitido hacer uso de las funciones de DB
/***********************************************************************************
 *
 *                                    VARIABLES GLOBALES
 *
 *************************************************************************************/
var totalViews = 0; //Total de vistas abiertas
var statusBlock = false; //Vista bloques esta oculto
var statusCode = false; //Vista codigo esta oculto
var statusEntorno3d = false; //Vista simulador esta oculto
var statusBtnelements = true; //Almacena si el menu de componentes esta desplegado o no
var statusBtncomponents = true; //Almacena si el menu de componentes esta desplegado o no
var timeAnima = 500; //Timepo de animaciones de abrir menus de elementos (bloques) y componentes (entorno 3d)
var vistaStart; //Vista con que se inicia
var viewShow = []; //Vistas que se muestran al mismo tiempo
var banderaPreview = false; //Bandera que nos indica si se realiza la comprobacion por pasos o no
var vistaPrevia; //Bandera que nos indica si la Vista previa esta activa o no
var banderaCrono; //Bandera para iniciar o detener el cronometro
var dataPractices = undefined; //Guarda info de práctica del usuario
var showedWarning = false;
var repeatedPracticeIndex = undefined;
var sendedToDBFinished = false; //Variable que indica si la p´ractica ha sido enviada a la DB como finalizada;
var nomPracBD = [];
var timeInterval; //Variable para el timeout para ocultar los mensajes
var timeIntervalWarining; //Variable para el timeout para ocultar los mensajes de warning de lo bloques
var eventClick = false; // Variable para saber si es evento click
var eventArrow = false; // variable para saber si es evento arrow key
/*DEFINICIÓN DE VARIABLES QUE SE UTILIZAN EN EL SIM DE BLOQUES Y 3D*/
var is3D = false;
var save_components;

var configWindow = 0; //Para activar el enter en la ventana de configuración
/*  0, ninguna ventana está abierta
 *  1, ventana de cargar está abierta
 *  2, ventana de guardar está abierta
 *  3, ventana de descargar .ino está abierta
 *  4, ventana de configración de elementos
 */
var flagAdjustScroll = true; //Bandera para saber si se debe ajustar el Scroll
/*************************************************************************************
 *
 * 								FUNCIONES Y PROCEDIMIENTOS
 *
 **************************************************************************************/
$(window).resize(function () {
	/*
	 * NOMBRE: resize.
	 * UTILIDAD: Detecta el resize del navegador
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */

	resetMenunavopen(); //Resetea menu nav superior
});
$(window).on("load", function () {});
$(window).on("orientationchange", function (event) {
	/*
	 * NOMBRE: orientationchange.
	 * UTILIDAD: Detecta cambio de orientacion del dispositivo
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	resetViewactions(); //Resetea btn menu views
});
function iniciaPxb(){
    /*
    * NOMBRE: iniciaPxb.
    * UTILIDAD: Inicia campos que se ocupan para programacion x bloques
    * ENTRADAS: Ninguno.
    * SALIDAS: Ninguna.
    */
    /*POR EL MOMENTO TODO ESTA CONTENIDO EN EL DOM DE LA INTERFAZ Y SE MUESTRAN SOLO LOS ELEMENTOS NECESARIOS, ESTO CAMBIARA AL HACER MODIFICACIONES EN LA INTERFAZ*/
    $("nav, div, section").remove(".d_armado");
    $("nav, div, section").remove(".d_instructivo");
    $("nav, div, section").remove(".d_simulacion");
    /****************************************************/
    $("#"+vistaStart).trigger( "click" );//Inicia con la vista de bloques al iniciar
    vistaShow()//Vistas que se ven en la aplicacion
    
    $(".d_pxbbloquesviewspopup").hide(); //Oculta la ventana de carga/guardar
	adjustInterface(); //Ajusta algunos elementos de la interfaz
}
function addMovepreview() {
	/*
	 * NOMBRE: addMovepreview.
	 * UTILIDAD: Accion de mover al emergente preview de pxb
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	$(".d_pxbpreview").draggable({
		//Drag de los botones desde el menu
		containment: ".d_pxbconte",
		start: function () {},
		drag: function () {},
		stop: function () {},
	});
}
function menunavOpen() {
	/*
	 * NOMBRE: menunavOpen.
	 * UTILIDAD: Abre menu de nav supeior en portrait
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	$(".d_pxbnav").toggleClass("d_pxbnav_menu"); //Agrega estilos para menu superior de navegacion
}
function resetMenunavopen() {
	/*
	 * NOMBRE: resetMenunavopen.
	 * UTILIDAD: Resetea menu nav superior
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	$(".d_pxbnav").removeClass("d_pxbnav_menu"); //Quita estilos para menu superior navegacion
}
function vistaShow() {
	/*
	 * NOMBRE: vistaShow.
	 * UTILIDAD: Vistas que se ven en la aplicacion
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	var totalViews = ["d_viewBlock", "d_viewCode", "d_viewEntorno3d"]; //Vistas totales
	totalViews.forEach(function (item) {
		//Recorre las vistas totales
		if (viewShow.includes(item) === false) {
			//Identifica si viewShow (definido en cada app) no incluye alguno
			$("nav, div, section, article").remove("." + item.toString()); //Elimina los que no incluya
		}
	});
}
function viewActions(getName) {
	/*
	 * NOMBRE: viewActions.
	 * UTILIDAD: Muestra y agrega datos a la vista que se selecciono
	 * ENTRADAS: getName > nombre de la vista que se da click.
	 * SALIDAS: Ninguna.
	 */
	if (getOrientation === "landscape") {
		//Orientacion landscape
		if (eval("status" + getName + " === false")) {
			//No esta presionado el btn
			totalViews++; //Incrementa numero de vistas abiertas
			eval("status" + getName + " = true"); //Cambia status de btn a presionado
			$("#btn" + getName).addClass("d_pxbmenubtn_active"); //Agrega estilos de activado
			$(".d_pxbviewsconte").removeClass("d_pxb1 d_pxb2 d_pxb3"); //Remueve todas los estilos que indican el tamano de las views
			$("#view" + getName).show(); //Muestra la view que se presiono en el btn
			$(".d_pxbviewsconte").addClass("d_pxb" + totalViews); //Agrega la estilos del tamano de la view
		} else {
			//Si esta presionado el btn
			if (totalViews > 1) {
				//Hay mas de una vista abierta
				$(".d_pxbviewsconte").removeClass("d_pxb" + totalViews); //Remueve el estilo del tamaño de la view que presiono el btn
				totalViews--; //Decrementa numero de vistas abiertas
				eval("status" + getName + " = false"); //Cambia status de btn a no presionado
				$("#btn" + getName).removeClass("d_pxbmenubtn_active"); //Quita estilos de activado
				$("#view" + getName).hide(); //Oculta la view que se presiono en el btn
				$(".d_pxbviewsconte").addClass("d_pxb" + totalViews); //Agrega la estilos del tamano de la view
			}
		}
	} else {
		//Orientacion portrait
		totalViews = 1; //Simpre es 1 view
		statusBlock = false; //Resetea btn presionado
		statusCode = false; //Resetea btn presionado
		statusEntorno3d = false; //Resetea btn presionado
		eval("status" + getName + " = true"); //Cambia status de btn a presionado
		$(".d_pxbmenubtn").removeClass("d_pxbmenubtn_active"); //Remueve todos los estilos de los btns
		$("#btn" + getName).addClass("d_pxbmenubtn_active"); //Agrega estilos de activado a btn seleccionado
		$(".d_pxbviewsconte").removeClass("d_pxb1 d_pxb2 d_pxb3"); //Remueve estilos de tamano de las view
		$(".d_pxbviewscontein").hide(); //Oculta todas las views
		$(".d_pxbviewsconte").addClass("d_pxb" + totalViews); //Agrega estilos del tamano de la view
		$("#view" + getName).show(); //Muestra la view
	}
	if (statusBlock === true) {
		//Vista bloques esta visible
		resetResizebloques(); //Resetea la posicion del menu
		resetOpenbtnconte(); //Resetea acciones de btn de elemntos (bloques)
	}
	if (statusEntorno3d === true) {
		//Para entorno3d si hay reajuste 3d
		resetResize3darea(); //Resetea la posicion del menu
		reajusteConte3d(); //Reajusta el contenido 3d en resize
	}
}
function resetViewactions() {
	/*
	 * NOMBRE: resetViewactions.
	 * UTILIDAD: Resetea btn menu views
	 * ENTRADAS: Ninguno
	 * SALIDAS: Ninguna.
	 */
	totalViews = 0; //Total de vistas abiertas
	statusBlock = false; //Vista bloques esta oculto
	statusCode = false; //Vista codigo esta oculto
	statusEntorno3d = false; //Vista simulador esta oculto
	$(".d_pxbmenubtn").removeClass("d_pxbmenubtn_active"); //Remueve estilos de los btns de las view
}
function menuSide(getBtn) {
	/*
	 * NOMBRE: resetViewactions.
	 * UTILIDAD: Abre menu lateral de elementos (bloques) y componentes (entorno3d)
	 * ENTRADAS: getBtn > btn que se presiona de elementos o componentes
	 * SALIDAS: Ninguna.
	 */
	var getSide = $(getBtn).attr("id").split("w")[1]; //Almacena id de btn de menu laterar que esta siendo presionado
	if (getSide === "elements") {
		//Abre y cierra menu de elementos
		resizeBloques(); //Escala el area de drop, para que este visible junto con el menu de elementos
	} else {
		//Abre y cierra menu de componentes
		resize3darea(); //Escala el area de 3d, para que este visible junto con el menu de components
	}
}

/*CODIGO PROGRAMACION*/
/*****************/
var paso; //Variable que lleva la cuenta del "paso" en el que se va
var addbloquesInstruccion2;
var hasFinished = false;
var inReflex = false;

function setArrow(flag) {
	$("#d_pxbbloquesstepsscrollbtn").empty();
	if (flag == "inReflex") {
		//En los puntos de reflexión
		addbloquesInstruccion2 = addbloquesInstruccion; //Almacenar las instrucciones
		addbloquesInstruccion = preguntasRef; //Agrega las preguntas de Reflexion
		clickbloquesPasos(); //Simula clic en el paso 1
		$(".d_pxbbloquesstepsbtnsicon").css("display", "block");
		banderaPreview = false;
		$("#d_pxbbloquesstepsscrollbtn").prepend(
			'<div class="d_pxbentorno3dstepsscrolliconprev"><svg viewBox="0 0 30 30"><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M13.108,15.004c0.384,0.384,0.764,0.761,1.142,1.139 c1.56,1.557,3.12,3.116,4.679,4.675c0.31,0.309,0.394,0.719,0.228,1.104c-0.156,0.363-0.517,0.59-0.93,0.577 c-0.265-0.01-0.485-0.124-0.674-0.311c-1.296-1.297-2.592-2.593-3.889-3.889c-0.856-0.855-1.71-1.708-2.564-2.563 c-0.452-0.451-0.452-1.019,0.001-1.472c2.151-2.149,4.303-4.299,6.453-6.45c0.286-0.286,0.625-0.382,1.008-0.266 c0.367,0.112,0.596,0.374,0.662,0.755c0.055,0.32-0.027,0.608-0.261,0.842c-1.425,1.427-2.852,2.854-4.278,4.278 c-0.493,0.495-0.988,0.987-1.481,1.481C13.173,14.935,13.144,14.967,13.108,15.004z"></path></svg></div>'
		);
		$(".d_pxbentorno3dstepsscrolliconprev")
			.off()
			.on("pointerdown touchstart", function () {
				//pointerdown btns pasos simulacion
				setArrow("inInstruction");
			});
	} else if (flag == "inInstruction") {
		addbloquesInstruccion = addbloquesInstruccion2;
		clickbloquesPasos();
		$("#d_pxbbloquesstepsscrollbtn").append(
			'<div class="d_pxbentorno3dstepsscrolliconprev_giro"><svg viewBox="0 0 30 30"><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M13.108,15.004c0.384,0.384,0.764,0.761,1.142,1.139 c1.56,1.557,3.12,3.116,4.679,4.675c0.31,0.309,0.394,0.719,0.228,1.104c-0.156,0.363-0.517,0.59-0.93,0.577 c-0.265-0.01-0.485-0.124-0.674-0.311c-1.296-1.297-2.592-2.593-3.889-3.889c-0.856-0.855-1.71-1.708-2.564-2.563 c-0.452-0.451-0.452-1.019,0.001-1.472c2.151-2.149,4.303-4.299,6.453-6.45c0.286-0.286,0.625-0.382,1.008-0.266 c0.367,0.112,0.596,0.374,0.662,0.755c0.055,0.32-0.027,0.608-0.261,0.842c-1.425,1.427-2.852,2.854-4.278,4.278 c-0.493,0.495-0.988,0.987-1.481,1.481C13.173,14.935,13.144,14.967,13.108,15.004z"></path></svg></div>'
		);
		$(".d_pxbentorno3dstepsscrolliconprev_giro")
			.off()
			.on("pointerdown touchstart", function () {
				//pointerdown btns prev next
				setArrow("inReflex");
			});
	}
	$("#d_pxbbloquesstepsscrollbtn").css({
		width: (errores.length + 2) * 2.4 + "rem",
	});
	$(".d_pxbbloquesstepstxtclose").trigger("mousedown");
}

$(document).on("click", "#validar", function () {
	/*
	 * NOMBRE: .
	 * UTILIDAD: Clic del boton Play
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	let correcto = false;

	if (banderaPreview) {
		//Nos ayuda a comparar pasos
		correcto = comparaTodo(validacion, principal);
	}

	if (correcto || !banderaPreview) {
		$("#validar").css("display", "none"); //Oculta el boton de Play
		$(".d_pxbviewcodedownloadbtn").css("display", "block"); //Muestra el boton descargar INO
		$("#d_pxbviewbloqueswarning").css("display", "none");

		if (correcto) {
			//Significa que completo los pasos
			hasFinished = true;
			$("#d_pxbviewbloquesmessagegrl").css("display", "block"); //Munestra mensaje de Felicidades
			setArrow("inReflex");
		} else {
			$("#d_pxbviewbloqueswarning").empty();
			$("#d_pxbviewbloqueswarning").append(
				'<li id="e_T">Cargando Vista previa.</li>'
			);
			$("#d_pxbviewbloqueswarning").css("display", "block");
		}

		restartCSS();
		vistaPrevia = true;
		
		secuencial = [];
		transformaSecuencial(principal, 0);
		//console.log.log(secuencial);

		//Para el audio del zumbador
		context.resume().then(() => {
			//console.log.log("Playback resumed successfully");
		});

		setTimeout(function () {
			$("#d_pxbviewbloqueswarning").css("display", "none");
			$("#d_pxbviewbloquesmessagegrl").css("display", "none");
			$(".d_pxbpreview").css("display", "block"); //Muestra el Simulador
			$(".d_pxbbloquesstepstxtclose").trigger("mousedown");
			funcionalidadPreview();
		}, 3000);
		//Bloquear funcionalidades de uso de la DB
		switchDBuse();
	} else {
		$("#d_pxbviewbloqueswarning").empty();
		$("#d_pxbviewbloqueswarning").append(
			'<li id="e_T">¡Atención! Aun faltan pasos y/o hay bloques extra.</li>'
		);
		$("#d_pxbviewbloqueswarning").css("display", "block");
		setTimeout(function () {
			$("#d_pxbviewbloqueswarning").css("display", "none");
		}, 3000);
	}
	$("#d_pxbbloquesstepsbtns_1").removeClass("d_flash");
});

$(document).on("click", ".d_pxbpreviewtitleclose", function () {
	$("#d_pxbviewbloqueswarning").empty();
	$("#d_pxbviewbloqueswarning").append(
		'<li id="e_T">Cerrando Vista previa al terminar la simulación.</li>'
	);
	$("#d_pxbviewbloqueswarning").css("display", "block");
	vistaPrevia = false;
	closePreview();
	switchDBuse();
});

function closePreview() {
	ondas.forEach((element) => {
		element.pause();
	});
	ondas2.forEach((element) => {
		element.pause();
	});
	$("#d_pxbviewbloqueswarning").css("display", "none");
	$(".d_pxbpreview").css("display", "none");
	$("#validar").css("display", "block");
	banderaCrono = false;
	for (let i = 0; i < pool_variables_predefinidas.length; i++) {
		$("#" + pool_variables_predefinidas[i].nombre)
			.parent("div")
			.addClass("ocultaElemento");
	}
	for (let i = 0; i < pool_variables_push.length; i++) {
		$("#" + pool_variables_push[i].nombre)
			.parent("div")
			.addClass("ocultaElemento");
	}
}

//EVENTOS PARA SIMULADOR LOS PUSH BUTTON EN DESKTOP Y MOBILE
$(document).keydown(function (e) {
	//Evento con las flechas del teclado para HIGH
	if (e.keyCode == KEY && vistaPrevia && !eventClick) {
		$("#pushButton_0").attr("estado", "HIGH");
		$("#pushButton_0").css({
			"border-color": "green",
			"border-width": "1px",
			"border-style": "solid",
		});
		eventArrow = true;
	} else if (e.keyCode == KEY_2 && vistaPrevia && !eventClick) {
		$("#pushButton_1").attr("estado", "HIGH");
		$("#pushButton_1").css({
			"border-color": "green",
			"border-width": "1px",
			"border-style": "solid",
		});
		eventArrow = true;
	} else if (e.keyCode == KEY_3 && vistaPrevia && !eventClick) {
		$("#pushButton_2").attr("estado", "HIGH");
		$("#pushButton_2").css({
			"border-color": "green",
			"border-width": "1px",
			"border-style": "solid",
		});
		eventArrow = true;
	} else if (e.keyCode == KEY_4 && vistaPrevia && !eventClick) {
		$("#pushButton_3").attr("estado", "HIGH");
		$("#pushButton_3").css({
			"border-color": "green",
			"border-width": "1px",
			"border-style": "solid",
		});
		eventArrow = true;
	}
});
$(document).keyup(function (e) {
	//Evento con las flechas del teclado para LOW
	if (e.keyCode == KEY && vistaPrevia && !eventClick) {
		$("#pushButton_0").attr("estado", "LOW");
		$("#pushButton_0").css({
			"border-color": "green",
			"border-width": "0px",
			"border-style": "solid",
		});
		eventArrow = false;
	} else if (e.keyCode == KEY_2 && vistaPrevia && !eventClick) {
		$("#pushButton_1").attr("estado", "LOW");
		$("#pushButton_1").css({
			"border-color": "green",
			"border-width": "0px",
			"border-style": "solid",
		});
		eventArrow = false;
	} else if (e.keyCode == KEY_3 && vistaPrevia && !eventClick) {
		$("#pushButton_2").attr("estado", "LOW");
		$("#pushButton_2").css({
			"border-color": "green",
			"border-width": "0px",
			"border-style": "solid",
		});
		eventArrow = false;
	} else if (e.keyCode == KEY_4 && vistaPrevia && !eventClick) {
		$("#pushButton_3").attr("estado", "LOW");
		$("#pushButton_3").css({
			"border-color": "green",
			"border-width": "0px",
			"border-style": "solid",
		});
		eventArrow = false;
	}
});
// Eventos para moviles
$(document).on("pointerdown", "#pushButton_0", function () {
	//Evento al dar clic o touch en mobile
	if (!eventArrow) {
		$("#pushButton_0").attr("estado", "HIGH");
		eventClick = true;
	}
});
$(document).on("pointerup", "#pushButton_0", function () {
	if (!eventArrow) {
		$("#pushButton_0").attr("estado", "LOW");
		eventClick = false;
	}
});
$(document).on("pointerdown", "#pushButton_1", function () {
	if (!eventArrow) {
		$("#pushButton_1").attr("estado", "HIGH");
		eventClick = true;
	}
});
$(document).on("pointerup", "#pushButton_1", function () {
	if (!eventArrow) {
		$("#pushButton_1").attr("estado", "LOW");
		eventClick = false;
	}
});
$(document).on("pointerdown", "#pushButton_2", function () {
	if (!eventArrow) {
		$("#pushButton_2").attr("estado", "HIGH");
		eventClick = true;
	}
});
$(document).on("pointerup", "#pushButton_2", function () {
	if (!eventArrow) {
		$("#pushButton_2").attr("estado", "LOW");
		eventClick = false;
	}
});
$(document).on("pointerdown", "#pushButton_3", function () {
	if (!eventArrow) {
		$("#pushButton_3").attr("estado", "HIGH");
		eventClick = true;
	}
});
$(document).on("pointerup", "#pushButton_3", function () {
	if (!eventArrow) {
		$("#pushButton_3").attr("estado", "LOW");
		eventClick = false;
	}
});
function restartCSS() {
	$("#led_4").css("background-color", "white");
	$("#led_4").attr("estado", "LOW");
	$("#led_5").css("background-color", "white");
	$("#led_5").attr("estado", "LOW");
	$("#led_6").css("background-color", "white");
	$("#led_6").attr("estado", "LOW");
	$("#led_7").css("background-color", "white");
	$("#led_7").attr("estado", "LOW");
	$("#led_10").css("background-color", "white");
	$("#led_10").attr("estado", "LOW");
	$("#led_11").css("background-color", "white");
	$("#led_11").attr("estado", "LOW");
	$("#led_12").css("background-color", "white");
	$("#led_12").attr("estado", "LOW");
	$("#led_13").css("background-color", "white");
	$("#led_13").attr("estado", "LOW");

	$("#rgb1").css("background-color", "white");
	$("#rgb1").attr("estado", "LOW");
	$("#rgb2").css("background-color", "white");
	$("#rgb2").attr("estado", "LOW");
	$("#rgb3").css("background-color", "white");
	$("#rgb3").attr("estado", "LOW");

	$("#zumbador_8").css("display", "none");
	$("#zumbador_9").css("display", "none");

	$("#pushButton_0").attr("estado", "LOW");
	$("#pushButton_1").attr("estado", "LOW");
	$("#pushButton_2").attr("estado", "LOW");
	$("#pushButton_3").attr("estado", "LOW");
}

var secuencial = [];
var variablesPreview = [];
var variablesGlobales = [];
var variablesFor = [];
var rgb1;
var rgb2;
var rgb3;
var zum1;
var zum2;
var ondas;
var ondas2;
var op;

function funcionalidadPreview() {
	//Solo muestra los elementos que hay
	for (let i = 0; i < pool_variables_predefinidas.length; i++) {
		$("#" + pool_variables_predefinidas[i].nombre)
			.parent("div")
			.removeClass("ocultaElemento");
	}
	for (let i = 0; i < pool_variables_push.length; i++) {
		$("#" + pool_variables_push[i].nombre)
			.parent("div")
			.removeClass("ocultaElemento");
	}

	addMovepreview();
	banderaCrono = true;
	cronometro();
	variablesGlobales = [];
	rgb1 = {
		r: "0",
		g: "0",
		b: "0",
	};
	rgb2 = {
		r: "0",
		g: "0",
		b: "0",
	};
	rgb3 = {
		r: "0",
		g: "0",
		b: "0",
	};
	ondas = [];
	ondas2 = [];
	zum1 = {
		freq: 0,
		estado: "LOW",
	};
	zum2 = {
		freq: 0,
		estado: "LOW",
	};
	simulacion(secuencial);
}
function transformaSecuencial(array, acarreo) {
	for (let i = 0; i < array.length; i++) {
		if (array[i].tipo === "estructura") {
			let posIni = secuencial.length + acarreo;

			secuencial.push({
				tipo: "estructura",
				subtipo: array[i].subtipo,
				inicio: posIni,
				destino: -1,
			}); //Se inserta la cabecera

			//Aqui deberia ir la bandera "condicion", sin embargo, se agrega mas adelante

			if (array[i].subtipo === "para") {
				secuencial.push(array[i].contenido); //Se inserta la condicion puede ser un objeto o un array
			} else {
				secuencial.push(array[i].contenido_condicion); //Se inserta la condicion que es un array de 1 objeto
			}

			secuencial.push({ subtipo: "entonces" }); //Se inserta la bandera "entonces"

			let posEntonces = secuencial.length + acarreo;

			transformaSecuencial(array[i].contenido_entonces, 1);

			let posOtro = secuencial.length + acarreo;

			secuencial.splice(posIni + 1 - acarreo, 0, {
				subtipo: "condicion",
				tipo: array[i].subtipo,
				entonces: posEntonces,
				otro: secuencial.length + acarreo + 1,
			}); //Aqui se agrega la banedra de "condicion"

			transformaSecuencial(array[i].contenido_otro, 1);

			secuencial.push({
				subtipo: "fin",
				tipo: array[i].subtipo,
				destino: posIni,
				condicionPos: posIni + 1,
			});

			secuencial.splice(posOtro + 1 - acarreo, 0, {
				subtipo: "otro",
				destino: secuencial.length + acarreo,
			}); //Se inserta la bandera "otro"
		} else {
			secuencial.push(array[i]);
		}
	}
}
async function simulacion(array) {
	variablesPreview = []; //Guarda variables locales
	variablesFor = []; //Guarda los valores de las variables usadas en el For
	let activo = {
		subtipo: "",
		nombre: "",
		contenido1: "",
		contenido2: "",
	};

	let onda;
	let condicion = false;
	let banderaCondicion = false;
	let banderaSi = false;
	let banderaPara = false;
	let indexPara = 0;
	let banderaHaz = false;
	let banderaMientras = false;
	let banderaOtro = false;
	let banderaFin = false;
	let banderaLoop = false; //No se ocupa
	let entoncesPos = 0; //Al parecer no se ocupa
	let posOtro = 0;
	let posAux = 0; //No se ocupa
	let arrayOtro = [];
	let arryCondicionhaz = [];
	let arrayBanderaFin = [];
	let i = 0;
	while (i < array.length && vistaPrevia) {
		//console.log.log("Paso: " + i);
		if (Array.isArray(array[i])) {
			if (banderaCondicion || banderaMientras) {
				//Checa condiciones
				condicion = condicionPreview(array[i]);
				arryCondicionhaz.push(condicion);
				//console.log.log(condicion);
				banderaCondicion = false;
			}
		} else {
			switch (array[i].subtipo) {
				case "led":
					if (array[i].contenido.estado === "HIGH") {
						//if($("#"+array[i].contenido.nombre).attr('estado') === 'LOW'){
						$("#" + array[i].contenido.nombre).css(
							"background-color",
							array[i].contenido.color
						);
						$("#" + array[i].contenido.nombre).attr("estado", "HIGH");
						//}
					} else {
						//if($("#"+array[i].contenido.nombre).attr('estado') === 'HIGH'){
						$("#" + array[i].contenido.nombre).css("background-color", "white");
						$("#" + array[i].contenido.nombre).attr("estado", "LOW");
						//}
					}
					activo.nombre = array[i].contenido.nombre;
					activo.contenido1 = array[i].contenido.color;
					activo.subtipo = array[i].subtipo;
					break;
				case "rgb":
					let colorRGBHex;

					if (array[i].contenido.nombre === "rgb1") {
						if (
							array[i].contenido.color === "otro" &&
							array[i].contenido.estado === "HIGH"
						) {
							if (parseInt(array[i].contenido.colorR) != -1) {
								rgb1.r = array[i].contenido.colorR;
							}
							if (parseInt(array[i].contenido.colorG) != -1) {
								rgb1.g = array[i].contenido.colorG;
							}
							if (parseInt(array[i].contenido.colorB) != -1) {
								rgb1.b = array[i].contenido.colorB;
							}
						} else if (
							array[i].contenido.color === "otro" &&
							array[i].contenido.estado === "LOW"
						) {
							rgb1.r = "0";
							rgb1.g = "0";
							rgb1.b = "0";
						} else {
							rgb1.r = array[i].contenido.colorR;
							rgb1.g = array[i].contenido.colorG;
							rgb1.b = array[i].contenido.colorB;
						}

						colorRGBHex = "#" + fullColorHex(rgb1.r, rgb1.g, rgb1.b);
					} else if (array[i].contenido.nombre === "rgb2") {
						if (
							array[i].contenido.color === "otro" &&
							array[i].contenido.estado === "HIGH"
						) {
							if (parseInt(array[i].contenido.colorR) != -1) {
								rgb2.r = array[i].contenido.colorR;
							}
							if (parseInt(array[i].contenido.colorG) != -1) {
								rgb2.g = array[i].contenido.colorG;
							}
							if (parseInt(array[i].contenido.colorB) != -1) {
								rgb2.b = array[i].contenido.colorB;
							}
						} else if (
							array[i].contenido.color === "otro" &&
							array[i].contenido.estado === "LOW"
						) {
							rgb2.r = "0";
							rgb2.g = "0";
							rgb2.b = "0";
						} else {
							rgb2.r = array[i].contenido.colorR;
							rgb2.g = array[i].contenido.colorG;
							rgb2.b = array[i].contenido.colorB;
						}
						colorRGBHex = "#" + fullColorHex(rgb2.r, rgb2.g, rgb2.b);
					} else {
						//rgb3
						if (
							array[i].contenido.color === "otro" &&
							array[i].contenido.estado === "HIGH"
						) {
							if (parseInt(array[i].contenido.colorR) != -1) {
								rgb3.r = array[i].contenido.colorR;
							}
							if (parseInt(array[i].contenido.colorG) != -1) {
								rgb3.g = array[i].contenido.colorG;
							}
							if (parseInt(array[i].contenido.colorB) != -1) {
								rgb3.b = array[i].contenido.colorB;
							}
						} else if (
							array[i].contenido.color === "otro" &&
							array[i].contenido.estado === "LOW"
						) {
							rgb3.r = "0";
							rgb3.g = "0";
							rgb3.b = "0";
						} else {
							rgb3.r = array[i].contenido.colorR;
							rgb3.g = array[i].contenido.colorG;
							rgb3.b = array[i].contenido.colorB;
						}
						colorRGBHex = "#" + fullColorHex(rgb3.r, rgb3.g, rgb3.b);
					}

					if (array[i].contenido.estado === "HIGH") {
						//if($("#"+array[i].contenido.nombre).attr('estado') === 'LOW'){
						$("#" + array[i].contenido.nombre).css(
							"background-color",
							colorRGBHex
						);
						$("#" + array[i].contenido.nombre).attr("estado", "HIGH");
						//}
					} else {
						//if($("#"+array[i].contenido.nombre).attr('estado') === 'HIGH'){
						$("#" + array[i].contenido.nombre).css("background-color", "white");
						$("#" + array[i].contenido.nombre).attr("estado", "LOW");
						//}
					}

					//console.log.log(rgb1);

					activo.nombre = array[i].contenido.nombre;
					activo.contenido1 = colorRGBHex;
					activo.subtipo = array[i].subtipo;
					break;
				case "zumbador":
					// //console.log.log("ZOMBAA");
					if (array[i].contenido.estado === "HIGH") {
						$("#" + array[i].contenido.nombre).css("display", "block");
						//Set de frecuencia en la variable onda
						let duracion = parseInt(array[i].contenido.duracion);
						if (duracion === 0) {
							if (array[i].contenido.nombre === "zumbador_8") {
								ondas.forEach((element) => {
									if (
										parseInt(zum1.freq) ==
										parseInt(array[i].contenido.frecuencia)
									) {
										////console.log.log('Frecuencia igual, no pausar');
									} else {
										element.pause();
									}
								});
								if (zum1.freq != parseInt(array[i].contenido.frecuencia)) {
									zum1.freq = array[i].contenido.frecuencia;
									onda = T("pulse", {
										freq: parseInt(array[i].contenido.frecuencia),
										mul: 0.1,
									});
									ondas.push(onda);
									onda.play();
								} else {
									////console.log.log("Se evita el traslape de frecuencias iguales(zum1)");
								}
							} else {
								ondas2.forEach((element) => {
									if (
										parseInt(zum2.freq) ==
										parseInt(array[i].contenido.frecuencia)
									) {
										////console.log.log('Frecuencia igual, no pausar');
									} else {
										element.pause();
									}
								});
								if (zum2.freq != parseInt(array[i].contenido.frecuencia)) {
									zum2.freq = array[i].contenido.frecuencia;
									onda = T("pulse", {
										freq: parseInt(array[i].contenido.frecuencia),
										mul: 0.1,
									});
									ondas2.push(onda);
									onda.play();
								} else {
									////console.log.log("Se evita el traslape de frecuencias iguales(zum2)");
								}
							}
						} else {
							creaonda(parseInt(array[i].contenido.frecuencia), duracion);
						}
					} else {
						//Apaga el zumbador
						if (array[i].contenido.nombre === "zumbador_8") {
							zum1.freq = 0;
							ondas.forEach((element) => {
								element.pause();
							});
						} else {
							zum2.freq = 0;
							ondas2.forEach((element) => {
								element.pause();
							});
						}
						$("#" + array[i].contenido.nombre).css("display", "none");
					}
					activo.nombre = array[i].contenido.nombre;
					activo.contenido1 = array[i].contenido.frecuencia;
					activo.subtipo = array[i].subtipo;
					break;
				case "delay":
					await sleep(parseInt(array[i].contenido.tiempo));
					break;
				case "pulso":
					//console.log.log(activo);

					let segundo = 1000;
					if (
						(array[i - 1].subtipo == "led" ||
							array[i - 1].subtipo == "rgb" ||
							array[i - 1].subtipo == "zumbador") &&
						i > 0
					) {
						switch (activo.subtipo) {
							case "led":
								for (
									let k = 0;
									k < parseInt(array[i].contenido.segundos);
									k++
								) {
									for (
										let j = 0;
										j < parseInt(array[i].contenido.repeticiones);
										j++
									) {
										$("#" + activo.nombre).css(
											"background-color",
											activo.contenido1
										);
										$("#" + activo.nombre).attr("estado", "HIGH");
										await sleep(
											segundo / parseInt(array[i].contenido.repeticiones) / 2
										);
										$("#" + activo.nombre).css("background-color", "white");
										$("#" + activo.nombre).attr("estado", "LOW");
										await sleep(
											segundo / parseInt(array[i].contenido.repeticiones) / 2
										);
									}
								}
								break;
							case "rgb":
								for (
									let k = 0;
									k < parseInt(array[i].contenido.segundos);
									k++
								) {
									for (
										let j = 0;
										j < parseInt(array[i].contenido.repeticiones);
										j++
									) {
										$("#" + activo.nombre).css(
											"background-color",
											activo.contenido1
										);
										$("#" + activo.nombre).attr("estado", "HIGH");
										await sleep(
											segundo / parseInt(array[i].contenido.repeticiones) / 2
										);
										$("#" + activo.nombre).css("background-color", "white");
										$("#" + activo.nombre).attr("estado", "LOW");
										await sleep(
											segundo / parseInt(array[i].contenido.repeticiones) / 2
										);
									}
								}
								break;
							case "zumbador":
								//console.log.log(array[i]);
								onda = T("pulse", {
									freq: parseInt(activo.contenido1),
									mul: 0.1,
								});
								for (
									let k = 0;
									k < parseInt(array[i].contenido.segundos);
									k++
								) {
									for (
										let j = 0;
										j < parseInt(array[i].contenido.repeticiones);
										j++
									) {
										onda.play();
										await sleep(
											segundo / parseInt(array[i].contenido.repeticiones) / 2
										);
										$(".d_pxbpreviewconteinbuzzer").css("display", "none");
										//console.log.log("low");
										onda.pause();
										await sleep(
											segundo / parseInt(array[i].contenido.repeticiones) / 2
										);
									}
								}
								break;
							default:
								break;
						}
					}
					break;
				case "push":
					//Vacio por el momento
					break;
				case "mientras":
					//Vacio
					break;
				case "haz":
					//Vacio
					break;
				case "para":
					//Vacio
					break;
				case "variable":
					if (array[i].contenido.opcion === "crear") {
						let existeVar = false;
						if (array[i].contenido.alcance === "local") {
							for (let a = 0; a < variablesPreview.length; a++) {
								if (array[i].contenido.nombre === variablesPreview[a].nombre) {
									existeVar = true;
									break;
								}
							}
							if (!existeVar) {
								variablesPreview.push({
									nombre: array[i].contenido.nombre,
									tipo: array[i].contenido.tipo,
									valor: array[i].contenido.valor,
								});
							}
						} else {
							for (let a = 0; a < variablesGlobales.length; a++) {
								if (array[i].contenido.nombre === variablesGlobales[a].nombre) {
									existeVar = true;
									break;
								}
							}
							if (!existeVar) {
								variablesGlobales.push({
									nombre: array[i].contenido.nombre,
									tipo: array[i].contenido.tipo,
									valor: array[i].contenido.valor,
								});
							}
						}
					}
					break;
				case "operacion":
					let izq, der;
					let nivelOp = 0;
					let banderaLocal = "";

					if (array[i].contenido_condicion.length === 1) {
						izq = array[i].contenido_condicion[0].contenido.nombre;
						banderaLocal = array[i].contenido_condicion[0].contenido.alcance;
					}

					if (array[i].contenido_entonces.length === 1) {
						let auxDer = operacionSim(array[i].contenido_entonces[0]);
						der = eval(auxDer);
					}

					if (nivelOp === 0) {
						////console.log.log(variablesPreview.length);
						if (banderaLocal === "local") {
							for (let a = 0; a < variablesPreview.length; a++) {
								////console.log.log(i);
								if (variablesPreview[a].nombre === izq) {
									variablesPreview[a].valor = der;
									break;
								}
							}
						} else {
							for (let a = 0; a < variablesGlobales.length; a++) {
								////console.log.log(i);
								if (variablesGlobales[a].nombre === izq) {
									variablesGlobales[a].valor = der;
									break;
								}
							}
						}
					}
					break;
				case "condicion":
					//entoncesPos = array[i].entonces;
					posOtro = array[i].otro;
					banderaCondicion = true;
					if (array[i].tipo === "haz") {
						banderaHaz = true;
					} else if (array[i].tipo === "para") {
						banderaPara = true;
					} else if (array[i].tipo === "mientras") {
						banderaMientras = true;
					} else if (array[i].tipo === "si" || array[i].tipo === "si_otro") {
						banderaSi = true;
					}
					break;
				case "entonces":
					if (banderaHaz && banderaFin) {
						if (!condicion) {
							i = posOtro - 1;
							// //console.log.log("hazfintru");
						}
						banderaHaz = false;
						banderaFin = false;
					} else if (banderaHaz) {
						banderaHaz = false;
					} else if (banderaPara) {
						if (
							eval(
								variablesFor[indexPara].valor +
									variablesFor[indexPara].comparacion +
									variablesFor[indexPara].valor_final
							)
						) {
							variablesFor[indexPara].valor =
								variablesFor[indexPara].valor +
								variablesFor[indexPara].incremento;
						} else {
							variablesFor[indexPara].sigue = false;
							i = posOtro - 1;
						}
					} else if (banderaMientras && !banderaSi) {
						//condicion = true
						if (!arryCondicionhaz[arryCondicionhaz.length - 1]) {
							banderaFin = true;
							arrayBanderaFin.push(banderaFin);
							if (arrayBanderaFin.length > 2) {
								let n = arrayOtro.length - 2;
								n = n - 1;
								// //console.log.log("killme",i);
								i = posOtro + n;
								// //console.log.log("killme2",i);
							} else {
								// //console.log.log("killme",i);
								i = posOtro - 1;
								// //console.log.log("killme2",i);
							}
						} else {
							// //console.log.log("entre a el else");
							banderaOtro = true;
							banderaFin = false;
							arrayBanderaFin.push(banderaFin);
						}
						arryCondicionhaz.pop();
					} else {
						if (condicion) {
							banderaOtro = true;
							arrayOtro.push(banderaOtro);
							// //console.log.log("AGREGA",arrayOtro);
						} else {
							banderaOtro = false;
							arrayOtro.push(banderaOtro);
							if (arrayOtro.length > 2) {
								let n = arrayOtro.length - 2;
								n = n - 1;
								i = posOtro + n;
							} else {
								// //console.log.log("otro",i);
								i = posOtro - 1;
								// //console.log.log("otro2",i);
							}
						}
					}
					break;
				case "otro":
					// //console.log.log("VE ULTIMO", arrayOtro);
					if (arrayOtro.length > 2) {
						let n = arrayOtro.length - 2;
						n = n - 1;
						if (arrayOtro[arrayOtro.length - 1]) {
							// //console.log.log("LOL1",i);
							i = array[i].destino + n;
							// //console.log.log("LOL2",i);
							// banderaOtro = false;
						}
					} else {
						if (arrayOtro[arrayOtro.length - 1]) {
							// //console.log.log("LOL1",i);
							i = array[i].destino - 1;
							// //console.log.log("LOL2",i);
							// banderaOtro = false;
						}
					}

					break;
				case "fin":
					if (array[i].tipo != "si" && array[i].tipo != "si_otro") {
						if (array[i].tipo === "para") {
							if (variablesFor[indexPara].sigue === true) {
								i = array[i].destino - 1;
							} else {
								if (variablesFor.length > 0) {
									variablesFor.splice(-1, 1);
									indexPara = indexPara - 1;
								}
								if (indexPara === 0) {
									banderaPara = false;
								}
							}
						} else if (array[i].tipo === "mientras") {
							// //console.log.log("Fin: meitrneas "+banderaFin);
							if (!arrayBanderaFin[arrayBanderaFin.length - 1]) {
								if (arrayBanderaFin.length > 2) {
									let n = arrayOtro.length - 2;
									n = n - 1;
									// //console.log.log("svmnif",i);
									i = array[i].destino + n;
									//  //console.log.log("svmnif",i);
								} else {
									// //console.log.log("svmnelse",i);
									i = array[i].destino - 1;
									//  //console.log.log("svmnelse",i);
								}
							}
							arrayBanderaFin.pop();
						} else {
							// //console.log.log("Enciende banderaFin = Paso: "+i);
							banderaFin = true;
							if (arryCondicionhaz[arryCondicionhaz.length - 1]) {
								// //console.log.log("svmnif",i);
								i = array[i].destino - 1;
								// //console.log.log("svmnif",i);
							}
							arryCondicionhaz.pop();
						}
					} else {
						banderaSi = false;
						// //console.log.log("ANTE DELETE",arrayOtro);
						arrayOtro.pop();
						// //console.log.log("DEPUES DEL", arrayOtro);
					}
					break;
				default:
					//Aqui cae el bloque de contenido del Para
					if (variablesFor.length === 0) {
						variablesFor.push({
							nombre: array[i].nombre,
							valor: parseInt(array[i].valor_inicial),
							comparacion: array[i].comparacion,
							incremento: parseInt(array[i].incremento),
							valor_final: parseInt(array[i].valor_final),
							sigue: true,
						});
						indexPara = 0;
					} else {
						let existe = false;
						for (let k = 0; k < variablesFor.length; k++) {
							if (variablesFor[k].nombre === array[i].nombre) {
								existe = true;
								indexPara = k;
								break;
							}
						}
						if (!existe) {
							variablesFor.push({
								nombre: array[i].nombre,
								valor: parseInt(array[i].valor_inicial),
								comparacion: array[i].comparacion,
								incremento: parseInt(array[i].incremento),
								valor_final: parseInt(array[i].valor_final),
								sigue: true,
							});
							//console.log.log(variablesFor.length);
							let total = variablesFor.length;
							indexPara = total - 1;
						}
					}
			}
		}
		await sleep(10);
		i++;
	}

	if (vistaPrevia) {
		//console.log.log("Se inició nueva secuencia");
		simulacion(secuencial);
	} else {
		//Se ha presionado el btn de cerra vista previa
	}
}

async function creaonda(frecuencia, duracion) {
	onda = T("pulse", { freq: frecuencia, mul: 0.1 });
	onda.play();
	await sleep(duracion);
	onda.pause();
}
function condicionPreview(array) {
	let aux = false;
	for (let i = 0; i < array.length; i++) {
		switch (array[i].subtipo) {
			case "led":
				if (
					array[i].contenido.estado ===
					$("#" + array[i].contenido.nombre).attr("estado")
				) {
					aux = true;
				} else {
					aux = false;
				}
				break;
			case "push":
				// //console.log.log("#" + array[i].contenido.nombre.attr("estado"));
				if (
					array[i].contenido.estado ===
					$("#" + array[i].contenido.nombre).attr("estado")
				) {
					aux = true;
				} else {
					aux = false;
				}
				break;
			case "variable":
				//Para booleanos
				let valorVar = false;
				if (array[i].contenido.alcance === "local") {
					for (let a = 0; a < variablesPreview.length; a++) {
						if (variablesPreview[a].nombre === array[i].contenido.nombre) {
							valorVar = variablesPreview[a].valor;
							break;
						}
					}
				} else {
					for (let a = 0; a < variablesGlobales.length; a++) {
						if (variablesGlobales[a].nombre === array[i].contenido.nombre) {
							valorVar = variablesGlobales[a].valor;
							break;
						}
					}
				}
				if (valorVar === "true") {
					aux = true;
				} else {
					aux = false;
				}
				break;
			case "comparacion":
				op = "";
				//console.log.log(array);
				let auxCon = condicionComparacion(
					array[i].contenido_condicion[0],
					array[i].contenido_entonces[0],
					array[i].contenido.eleccion
				);
				//console.log.log(auxCon);
				if (eval(auxCon)) {
					aux = true;
				} else {
					aux = false;
				}
				break;
		}
	}
	return aux;
}
function condicionComparacion(parteIzq, parteDer, comparacion) {
	op = op + "(";
	if (parteIzq.tipo === "matematicas") {
		op = condicionComparacion(
			parteIzq.contenido_condicion[0],
			parteIzq.contenido_entonces[0],
			parteIzq.contenido.eleccion
		);
	} else {
		switch (parteIzq.subtipo) {
			case "variable":
				op = op + condicionVariable(parteIzq.contenido);
				break;
			case "valor":
				op = op + parteIzq.contenido.valor;
				break;
			case "led":
				if (
					parteIzq.contenido.estado ===
					$("#" + parteIzq.contenido.nombre).attr("estado")
				) {
					aux = true;
				} else {
					aux = false;
				}
				op = op + aux;
				break;
			case "push":
				if (
					parteIzq.contenido.estado ===
					$("#" + parteIzq.contenido.nombre).attr("estado")
				) {
					aux = true;
				} else {
					aux = false;
				}
				op = op + aux;
				break;
		}
	}
	op = op + " " + comparacion + " ";
	if (parteDer.tipo === "matematicas") {
		op = condicionComparacion(
			parteDer.contenido_condicion[0],
			parteDer.contenido_entonces[0],
			parteDer.contenido.eleccion
		);
	} else {
		switch (parteDer.subtipo) {
			case "variable":
				op = op + condicionVariable(parteDer.contenido);
				break;
			case "valor":
				op = op + parteDer.contenido.valor;
				break;
			case "led":
				if (
					parteDer.contenido.estado ===
					$("#" + parteDer.contenido.nombre).attr("estado")
				) {
					aux = true;
				} else {
					aux = false;
				}
				op = op + aux;
				break;
			case "push":
				if (
					parteDer.contenido.estado ===
					$("#" + parteDer.contenido.nombre).attr("estado")
				) {
					aux = true;
				} else {
					aux = false;
				}
				op = op + aux;
				break;
		}
	}
	return op + ")";
}
function condicionVariable(variable) {
	let valorVar = false;
	if (variable.alcance === "local") {
		for (let a = 0; a < variablesPreview.length; a++) {
			if (variablesPreview[a].nombre === variable.nombre) {
				valorVar = variablesPreview[a].valor;
				break;
			}
		}
	} else {
		for (let a = 0; a < variablesGlobales.length; a++) {
			if (variablesGlobales[a].nombre === variable.nombre) {
				valorVar = variablesGlobales[a].valor;
				break;
			}
		}
	}

	return valorVar;
}
function operacionSim(derecha) {
	let der = "";
	if (derecha.tipo === "matematicas") {
		der =
			"(" +
			operacionSim(derecha.contenido_condicion[0]) +
			" " +
			derecha.contenido.eleccion +
			" " +
			operacionSim(derecha.contenido_entonces[0]) +
			")";
	} else {
		if (derecha.subtipo === "variable") {
			if (derecha.contenido.alcance === "local") {
				for (let a = 0; a < variablesPreview.length; a++) {
					if (derecha.contenido.nombre === variablesPreview[a].nombre) {
						der = variablesPreview[a].valor;
						break;
					}
				}
			} else {
				for (let a = 0; a < variablesGlobales.length; a++) {
					if (derecha.contenido.nombre === variablesGlobales[a].nombre) {
						der = variablesGlobales[a].valor;
						break;
					}
				}
			}
		} else {
			der = derecha.contenido.valor;
		}
	}

	return der;
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
var rgbToHex = function (rgb) {
	var hex = Number(rgb).toString(16);
	if (hex.length < 2) {
		hex = "0" + hex;
	}
	return hex;
};
var fullColorHex = function (r, g, b) {
	var red = rgbToHex(r);
	var green = rgbToHex(g);
	var blue = rgbToHex(b);
	return red + green + blue;
};
function cronometro() {
	let tiempo = {
		hora: 0,
		minuto: 0,
		segundo: 0,
	};

	let tiempo_corriendo = setInterval(() => {
		//Segundos
		tiempo.segundo++;
		if (tiempo.segundo >= 60) {
			tiempo.segundo = 0;
			tiempo.minuto++;
		}

		// Minutos
		if (tiempo.minuto >= 60) {
			tiempo.minuto = 0;
			tiempo.hora++;
		}
		////console.log.log(tiempo.segundo);
		$("#hora").text(tiempo.hora < 10 ? "0" + tiempo.hora : tiempo.hora);
		$("#minuto").text(tiempo.minuto < 10 ? "0" + tiempo.minuto : tiempo.minuto);
		$("#segundo").text(
			tiempo.segundo < 10 ? "0" + tiempo.segundo : tiempo.segundo
		);

		if (!banderaCrono) {
			clearInterval(tiempo_corriendo);

			$("#hora").text("00");
			$("#minuto").text("00");
			$("#segundo").text("00");
		}
	}, 1000);
}
/********************************************************************** */
//Codigo para comparar pasos
function comparaArrays(original, ideal) {
	//ideal es el que se va creando con los bloques
	//original = validacion
	//ideal = principal
	//Estato 1 = no realizado
	//Estado 2 = incorrecto
	//Estado 3 = correcto
	for (let i = 0; i < original.length; i++) {
		paso = paso + 1;
		if (typeof ideal[i] === "undefined") {
			//ESTA VACIO
			//O no esta completo
			////console.log.log("undefined xd");
			//errores[contador-1].estado = 1;
		} else {
			//NO ESTA VACIO
			if (ideal[i].tipo === original[i].tipo) {
				if (ideal[i].subtipo === original[i].subtipo) {
					if (
						ideal[i].tipo === "estructura" ||
						ideal[i].tipo === "matematicas"
					) {
						//Casos estructuras
						if (
							ideal[i].subtipo === "para" ||
							ideal[i].tipo === "matematicas"
						) {
							let bandera_est = compareJSON(
								ideal[i].contenido,
								original[i].contenido
							);
							if (bandera_est) {
								//Correcto
								errores[paso - 1].estado = 3;
							} else {
								errores[paso - 1].estado = 2;
							}
						} else {
							//Poner en estado correcto al If, If/else, Do-While, While
							errores[paso - 1].estado = 3;
						}

						if (original[i].contenido_condicion.length > 0) {
							paso = paso;
							bandera = comparaArrays(
								original[i].contenido_condicion,
								ideal[i].contenido_condicion
							);
						}

						if (original[i].contenido_entonces.length > 0) {
							paso = paso;
							bandera = comparaArrays(
								original[i].contenido_entonces,
								ideal[i].contenido_entonces
							);
						}

						if (original[i].contenido_otro.length > 0) {
							paso = paso;
							bandera = comparaArrays(
								original[i].contenido_otro,
								ideal[i].contenido_otro
							);
						}
					} else {
						let bandera = compareJSON(
							ideal[i].contenido,
							original[i].contenido
						);
						if (bandera) {
							//Correcto
							errores[paso - 1].estado = 3;
						} else {
							//Incorrecto
							errores[paso - 1].estado = 2;
						}
					}
				} else {
					errores[paso - 1].estado = 2;
				}
			} else {
				errores[paso - 1].estado = 2;
			}
		}
	}
}

var moreWarnings = false;
function comparaPasos() {
	let correctSteps = 0;
	if (banderaPreview) {
		//Esta bandera se enciende(TRUE) en la practica
		let valida = 0;

		paso = 0; //Se reinicia la variable contador

		$("#d_pxbviewbloqueswarning").empty();
		//Resetea estados de los pasos
		for (let k = 0; k < errores.length; k++) {
			errores[k].estado = 1;
		}
		comparaArrays(validacion, principal);

		let bandera_error = false;

		for (let i = 0; i < errores.length; i++) {
			$("#d_pxbbloquesstepsbtns_" + (i + 1)).removeClass(
				"d_pxbbloquesstepsbtns_valida"
			);
			$("#d_pxbbloquesstepsbtns_" + (i + 1)).removeClass(
				"d_pxbbloquesstepsbtns_novalida"
			);

			if (errores[i].estado === 2) {
				$("#d_pxbbloquesstepsbtns_" + (i + 1)).addClass(
					"d_pxbbloquesstepsbtns_novalida"
				);
				if ($("#d_pxbviewbloqueswarning li").length >= 4 && !moreWarnings) {
					if ($("#viewMore").attr("showed") == "true") {
					} else {
						$("#d_pxbviewbloqueswarning").append(
							'<li id="viewMore" onclick="moreWarnings = true;comparaPasos();" class="li_viewmore" showed="true">Ver más ...</li>'
						);
					}
				} else {
					$("#d_pxbviewbloqueswarning").append(
						'<li id="e_' + i + '">' + errores[i].error + "</li>"
					);
				}
				$("#d_pxbbloquesstepsbtns_" + (i + 1)).removeClass("d_flash");
				bandera_error = true;
			} else if (errores[i].estado === 3) {
				$("#d_pxbbloquesstepsbtns_" + (i + 1)).addClass(
					"d_pxbbloquesstepsbtns_valida"
				);
				$("#d_pxbbloquesstepsbtns_" + (i + 1)).removeClass("d_flash");
				$("#d_pxbbloquesstepsbtns_" + (i + 2)).addClass("d_flash");
				correctSteps++;
			}
		}
		if (moreWarnings && $("#d_pxbviewbloqueswarning li").length >= 4) {
			$("#d_pxbviewbloqueswarning").append(
				'<li id="viewLess" onclick="moreWarnings = false;comparaPasos();" class="li_viewless" showed="true">Ver menos ...</li>'
			);
		}
		//ENVIAR A DB CUANDO UN USUARIO TERMINA LA PRÁCTICA, BUSCAR MEJOR MÉTODO(?)
		/*if(correctSteps == addbloquesInstruccion.length && !sendedToDBFinished){
            $('#validar').addClass('d_flash_playbtn');
            sendedToDBFinished = true;
            putPractices(crk_IDAlumno,'Finalizada',crk_Origin,crk_User,crk_UserName,crk_UserType,crk_UserGroup,crk_UserGrade,1);
        }*/
		if (bandera_error) {
			clearInterval(timeIntervalWarining);
			$("#d_pxbviewbloqueswarning").css("display", "block");
			timeIntervalWarining = setTimeout(function () {
				$("#d_pxbviewbloqueswarning").css("display", "none");
			}, 8000);
		} else {
			$("#d_pxbviewbloqueswarning").css("display", "none");
		}
	}
}

function adjustScroll() {
	/*
	 * NOMBRE: adjustScroll.
	 * UTILIDAD: Hace un scrollTop para mantener al alcance el bloque de TERMINA y facilitar el arrastre de elementos
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	if (flagAdjustScroll) {
		var scroll = $(".d_pxbviewdropconte");
		scroll.animate({ scrollTop: scroll.prop("scrollHeight") }, 800);
	}
}

function comparaTodo(ideal, original) {
	let bandera = true;

	if (ideal.length == original.length) {
		for (let i = 0; i < ideal.length; i++) {
			if (ideal[i].tipo === original[i].tipo) {
				if (ideal[i].subtipo === original[i].subtipo) {
					if (
						ideal[i].tipo === "estructura" ||
						ideal[i].tipo === "matematicas"
					) {
						bandera = comparaTodo(
							ideal[i].contenido_condicion,
							original[i].contenido_condicion
						);
						if (bandera === false) {
							return false;
						} else {
							bandera = comparaTodo(
								ideal[i].contenido_entonces,
								original[i].contenido_entonces
							);
							if (bandera === false) {
								return false;
							} else {
								bandera = comparaTodo(
									ideal[i].contenido_otro,
									original[i].contenido_otro
								);
								if (bandera === false) {
									return false;
								}
							}
						}
					} else {
						bandera = compareJSON(ideal[i].contenido, original[i].contenido);
						if (bandera === false) {
							return false;
						}
					}
				} else {
					bandera = false;
				}
			} else {
				bandera = false;
			}
		}
	} else {
		bandera = false;
	}
	return bandera;
}
/********************************************************************* */
function vaciaPrograma() {
	principal = [];
	$("#programa").empty();
}
/*function vaciaPrograma2() {
    let confirmacion = confirm("¿Deseas comenzar un Nuevo Proyecto?. Se perderá tu progreso no guardado.");
    if (confirmacion) {
        vaciaPrograma();
    }
}*/
//Prototipo de funcion de carga
function combo(raiz, padre) {
	let clon = $(raiz).clone();
	if ($(clon).attr("subtipo") === "si_otro") {
		$(clon).find("span.siotrotext").text("Si");
		$(clon).find("span.ifelsetext").text("If");
	} else if ($(clon).attr("subtipo") === "haz") {
		$(clon).find("span.hazmientrastext").text("Mientras");
		$(clon).find("span.dowhiletext").text("While");
	}
	arrastra(raiz, clon);
	$(clon).attr("id", itemId);
	alto();
	$(padre).append(clon);
	agregaBloqueL(saveDrag);
	if($(clon).attr("subtipo") === "si"){
		$(clon).find("div.d_pxbopcionbtntxt2").show()
	}
	return clon;
}
function recreaHTML(array, padre) {
	for (let i = 0; i < array.length; i++) {
		let raiz;
		let guia;
		//Si es Estructura o Matematicas
		if (array[i].tipo === "estructura" || array[i].tipo === "matematicas") {
			let banderaE = false;
			let banderaP = false;
			let banderaM = false;
			let banderaD = false;
			switch (array[i].subtipo) {
				case "si_otro":
					raiz = $("#d_ifelse");
					banderaE = true;
					break;
				case "si":
					raiz = $("#d_if");
					banderaE = true;
					break;
				case "mientras":
					raiz = $("#d_while");
					banderaD = true;
					break;
				case "haz":
					raiz = $("#d_dowhile");
					banderaD = true;
					break;
				case "para":
					raiz = $("#d_for");
					banderaP = true;
					break;
				case "comparacion":
					raiz = $("#d_compare");
					banderaM = true;
					break;
				case "operacion":
					raiz = $("#d_operation");
					banderaM = true;
					break;
			}

			guia = combo(raiz, padre);

			if (banderaM === true && array[i].contenido != false) {
				buscaRutaLogica($(guia).attr("id"), principal, array[i].contenido);
				$(guia).children("div.d_mat_texto").text(array[i].contenido.eleccion);
			}

			if (banderaP === true && array[i].contenido != false) {
				buscaRutaLogica($(guia).attr("id"), principal, array[i].contenido);
				$(guia)
					.find("div.d_para_texto")
					.text(
						"(int " +
							array[i].contenido.nombre +
							"=" +
							array[i].contenido.valor_inicial +
							"; " +
							array[i].contenido.nombre +
							array[i].contenido.comparacion +
							array[i].contenido.valor_final +
							";" +
							array[i].contenido.nombre +
							"=" +
							array[i].contenido.nombre +
							"+" +
							array[i].contenido.incremento +
							")"
					);
			}

			if (banderaE === true && array[i].contenido != false) {
				buscaRutaLogica($(guia).attr("id"), principal, array[i].contenido);
			}

			if (banderaD === true && array[i].contenido != false) {
				buscaRutaLogica($(guia).attr("id"), principal, array[i].contenido);
			}

			if (array[i].contenido_condicion.length > 0) {
				$(guia).attr("contenido", "1");
				recreaHTML(
					array[i].contenido_condicion,
					$(guia).children("[tipo=condicion]")
				);
			}
			if (array[i].contenido_entonces.length > 0) {
				recreaHTML(
					array[i].contenido_entonces,
					$(guia).children("[tipo=entonces]")
				);
			}
			if (array[i].contenido_otro.length > 0) {
				recreaHTML(array[i].contenido_otro, $(guia).children("[tipo=otro]"));
			}
		} else {
			//Si es Elemento o Funcion
			switch (array[i].subtipo) {
				case "led":
					raiz = $("#d_led");
					break;
				case "rgb":
					raiz = $("#d_rgb");
					break;
				case "zumbador":
					raiz = $("#d_buzzer");
					break;
				case "motor":
					raiz = $("#d_motor");
					break;
				case "push":
					raiz = $("#d_pushbutton");
					break;
				case "pulso":
					raiz = $("#d_pulse");
					break;
				case "delay":
					raiz = $("#d_delay");
					break;
				case "pulsado":
					raiz = $("#d_timepushed");
					break;
				case "break":
					raiz = $("#d_break");
					break;
				case "variable":
					raiz = $("#d_variable");
					break;
				case "valor":
					raiz = $("#d_value");
					break;
			}
			guia = combo(raiz, padre);
			if (array[i].contenido != false) {
				recreaHTMLCSS(guia, array[i].contenido);
				buscaRutaLogica($(guia).attr("id"), principal, array[i].contenido);
			}
		}

		comparaPasos();
	}
}

function recreaHTMLCSS(bloque, contenido) {
	/*
	 * NOMBRE: recreaHTMLCSS
	 * UTILIDAD: Inserta los valores dentro de los BLOQUES dependiendo de los valores de entrada
	 * ENTRADAS: bloque --> Elemento HTML, contenido --> Contenido del JSON.
	 * SALIDAS: Ninguna.
	 */
	switch ($(bloque).attr("subtipo")) {
		case "led":
			let led_nombre = contenido.nombre;
			switch (led_nombre) {
				case "led_4":
					
					led_nombre = "Verde 1";
					break;
				case "led_5":
					
					led_nombre = "Amarillo 1";
					break;
				case "led_6":
					
					led_nombre = "Rojo 1";
					break;
				case "led_7":
					
					led_nombre = "Azul 1";
					break
				case "led_10":
					
					led_nombre = "Verde 2";
					break;
				case "led_11":
					
					led_nombre = "Amarillo 2";
					break;
				case "led_12":
					
					led_nombre = "Rojo 2";
					break;
				case "led_13":
					
					led_nombre = "Azul 2";
			}
			$(bloque).find("[tipo=icono]").css("background-color", contenido.color);
			resizeObserver.observe($(bloque)[0]); //Agregar el listener del resize
			$(bloque).find("span.confconte").prev().text(''); //Se le quitó el NOMBRE
			$(bloque).find("span.confconte").text("(" + led_nombre + "): = " + contenido.estado); //Insertar el PIN y el ESTADO
			break;
		case "rgb":
			let color =
				"rgb(" +
				contenido.colorR +
				"," +
				contenido.colorG +
				"," +
				contenido.colorB +
				")";

			$(bloque)
				.find("[tipo=icono]")
				.css(
					"background-color",
					"rgb(" +
						contenido.colorR +
						"," +
						contenido.colorG +
						"," +
						contenido.colorB +
						")"
				);

			$(bloque).find("span.confconte").text("(" +contenido.pinR +"," +contenido.pinG +"," +contenido.pinB +"): " +color.substring(3, color.length) +" = " +contenido.estado);
			resizeObserver.observe($(bloque)[0]); //Agregar el listener del resize
			$(bloque).find("span.confconte").prev().text(''); //Se le quitó el NOMBRE
			break;
		case "zumbador":
			let zum_freq = contenido.frecuencia;
			let zum_dur = contenido.duracion;

			if (contenido.estado === "HIGH") {
				$(bloque).find("[tipo=icono]").css("background-color", "#8cc63f");
				//$(bloque).find("span.confconte").text("(" + contenido.pin + "): " + zum_freq + " hz - " + zum_dur + " ms");
				$(bloque).find("span.confconte").text("(" + contenido.pin + "): " + zum_freq + " hz."); //Se le quitó la duración
			}
			if (contenido.estado === "LOW") {
				$(bloque).find("[tipo=icono]").css("background-color", "#c63f48");
				$(bloque).find("span.confconte").text("(" + contenido.pin + "): LOW");
			}
			resizeObserver.observe($(bloque)[0]); //Agregar el listener del resize
			$(bloque).find("span.confconte").prev().text(''); //Se le quitó el NOMBRE
			break;
		case "motor":
			switch (contenido.direccion) {
				case "right":
					$(bloque)
						.children("div .d_pxbopcionbtnimg")
						.children("span")
						.css("background-position", "88.88% 44.44%");
					$(bloque)
						.find("span.confconte")
						.text(": " + contenido.nombre + ", Giro derecha");
					break;
				case "left":
					$(bloque)
						.children("div .d_pxbopcionbtnimg")
						.children("span")
						.css("background-position", "99.99% 33.33%");
					$(bloque)
						.find("span.confconte")
						.text(": " + contenido.nombre + ", Giro izquierda");
					break;
				case "stop":
					$(bloque)
						.children("div .d_pxbopcionbtnimg")
						.children("span")
						.css("background-position", "88.88% 33.33%");
					$(bloque)
						.find("span.confconte")
						.text(": " + contenido.nombre + ", Parar");
					break;
			}
			break;
		case "push":
			if (contenido.estado === "HIGH") {
				$(bloque).find("[tipo=icono]").css("background-color", "#8cc63f");
			}
			if (contenido.estado === "LOW") {
				$(bloque).find("[tipo=icono]").css("background-color", "#c63f48");
			}
			resizeObserver.observe($(bloque)[0]); //Agregar el listener del resize
			$(bloque).find("span.confconte").prev().text(''); //Se le quitó el NOMBRE
			$(bloque).find("span.confconte").text("(" + contenido.pin + "): " + contenido.estado); //Insertar el PIN y ESTADO
			break;
		case "pulsado":
			if (contenido.estado === "HIGH") {
				$(bloque).find("[tipo=icono]").css("background-color", "#8cc63f");
			}
			if (contenido.estado === "LOW") {
				$(bloque).find("[tipo=icono]").css("background-color", "#c63f48");
			}
			break;
		case "valor":
			$(bloque).find("div.d_variable_texto").text(contenido.valor);
			break;
		case "variable":
			if (contenido.opcion == "crear") {
				//Para la creación de variabes, mostrar nombre y alcance
				$(bloque)
					.find("div.d_variable_texto")
					.text(contenido.nombre + " : " + contenido.alcance);
			} else {
				//Para el uso de la variable, solamente mostrar el nombre
				$(bloque).find("div.d_variable_texto").text(contenido.nombre);
			}
			break;
		case "delay":
			let delay_tiempo = parseInt(contenido.tiempo);
			if (delay_tiempo % 1000 === 0) {
				$(bloque)
					.find("span.confconte")
					.text(": " + delay_tiempo / 1000 + "s");
			} else {
				$(bloque)
					.find("span.confconte")
					.text(": " + delay_tiempo + "ms");
			}
			break;
		case "pulso":
			$(bloque)
				.find("span.confconte")
				.text(
					": " +
						contenido.repeticiones +
						" Pulsaciones en " +
						contenido.segundos +
						" seg"
				);
			break;
	}
}

let resizeObserver = new ResizeObserver((target) => {
	/*
	 * NOMBRE: ResizeObserver.
	 * UTILIDAD: Observer para el cambio de estilos en los bloques
	 * ENTRADAS: taregt --> Arreglo que contiene el historial de los elementos modificados.
	 * SALIDAS: Ninguna.
	 */
	for (let entry of target) { //Recorrer el historial
		let id = entry.target.id //Obtener el ID de cada elemento modificado
		if($('#'+id).length>0){ //Si existe el elemento (debido al historial)
			//DEPENDIENDO DEL NIVEL DEL ELEMENTO
			let Parent1 = $('#'+id).parent(); //Condición
			let Parent2 = Parent1.parent(); //Comparación
			let Parent3 = Parent2.parent(); //Condición
			let Parent4 = Parent3.parent(); // Comparación
			let Parent5 = Parent4.parent(); //Condición
			let Parent6 = Parent5.parent(); //Este debe de ser de tipo estructura
			let childrens = $('#'+id).children(); //Obtener los hijos del elemento
			let menuElements = parseInt($('.d_pxbviewelementsbtn').css('right').split('.')[0]);  //Cuando el menú de elementos está abajo, hay espacio suficiente para mostrar texto

			if((Parent6.attr('tipo') == 'estructura' ) && (Parent5.attr('tipo') == 'condicion') && (menuElements < 0)){ //Cuando el parent 6 es una estructura & se encuentra en la condición el elemento & el menú de elementos está a la izquierda
				$(childrens[2]).hide(); //Ocultar el contenedor del texto
				$(childrens[1]).css({'width': '100%'}); //Redimencionar a 2.9 el icono
			}else{
				$(childrens[2]).show(); //Mostrar el contenedor del texto
				$(childrens[1]).css({'width': '2.4rem'}); //Regresar icono a tamaño original
			}
		}
	  }
});
  

/*CODIGO PROGRAMACION 2*/
/*****************/
/*************************************************************************************
 *
 *  FUNCIONES Y PROCEDIMIENTOS PARA CARGA Y DESCARGA DE PRÁCTICA DESDE BASE DE DATOS
 *
 **************************************************************************************/
var hidden = 0;

var bandera_menu; //Bandera que nos ayuda a diferenciar entre el menu de carga(true) y menu de descarga (false)
function cleanPractices() {
	/*
	 * NOMBRE: cleanPractices.
	 * UTILIDAD: Revisa la fecha de creación de cada practica de un usuario, elimina las que superan el tiempo de expiración
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	let lastPracticeDate;
	let datePractice;
	let dateNow = new Date();
	let dateLimit = dateNow.getTime();
	dataPractices.forEach((element) => {
		datePractice = new Date(parseInt(element.saved_datetime));
		lastPracticeDate = datePractice.getTime();
		if (dateLimit - lastPracticeDate >= expirationPractices) {
			deletePractices(element);
		}
	});
}

function guardaBD(nombre_estructura) {
	/*
	 * NOMBRE: guardaBD
	 * UTILIDAD: Revisa si el nombre de la practica ya existe en las almacenadas anteriormente
	 * ENTRADAS: nombre_estructura --> Nombre de la practica a almacenar.
	 * SALIDAS: Ninguna.
	 */
	let bandera = 2;
	for (var i = 0; i < dataPractices.length; i++) {
		if (dataPractices[i].saved_name === nombre_estructura) {
			bandera = 1;
			index = dataPractices[i].saved_practice_id;
			break;
		}
	}
	if (bandera == 1) {
		if (showedWarning) {
			updatePractices();
			showedWarning = false;
		} else {
			showMessage("Proyecto existente, ¿Deseas reemplazarlo?", 2);
		}
	} else if (bandera == 2) {
		//NO EXISTE SE DEBE DE CREAR
		if (
			JSON.stringify(is3D ? save_components : principal).length <=
			maxLengthPractices
		) {
			putPractices(crk_IDAlumno, nombre_estructura, crk_Origin, 0);
		} else {
			showMessage(
				"Longiditud de práctica no permitido (menos de 15000 caracteres)",
				3
			);
		}
	}
}

function delete_row(event) {
	/*
	 * NOMBRE: delete_row
	 * UTILIDAD: Cambia el attr hide al row que disparo el evento y muestra el dialogo de confirmación
	 * ENTRADAS: event --> elemento que éjecutó la función.
	 * SALIDAS: Ninguna.
	 */
	let id = $(event).attr("id").split("_")[1];
	$("#row_" + id).attr("hide", "true");
	$(".container_confirm").show();
}

function syncProjects() {
	/*
	 * NOMBRE: syncProjects
	 * UTILIDAD: Sincroniza los proyectos en la Db y la interfaz del cliente, edita y borra
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	let toDelete = [];
	let toKeep = [];
	let toUpdate = [];
	let validateNames = [];
	let validNames = true;

	let aux = {
		practica_id: "",
		saved_name: "",
		saved_datetime: "",
	};

	$(".t_row").each(function (index) {
		aux = {
			practica_id: "",
			saved_name: "",
			saved_datetime: "",
		};
		let currentState = $(this).attr("hide");
		let currentID = $(this).attr("id").split("_")[1];
		if (currentState == "true") {
			//A eliminar
			$("#row_" + currentID).hide();
			toDelete.push($("#name_" + currentID).attr("practica_id"));
		} else {
			aux.practica_id = $("#name_" + currentID).attr("practica_id");
			aux.saved_name = $("#name_" + currentID).text();
			if (aux.saved_name != "") {
				validateNames.push(aux.saved_name);
				toKeep.push(aux);
			}
		}
	});

	if (validateNames.length > 0) validNames = checkRepeated(validateNames);
	if (!validNames) {
		showMessage("Verifica los nombres de tus proyectos", 4);
	} else {
		//Update de nombres
		toUpdate = checkUpdatedNames(toKeep);

		//console.log.log("A actualizar: ");
		//console.log.log(toUpdate);
		//console.log.log("A eliminar: ");
		//console.log.log(toDelete);
		syncInDB(toUpdate, toDelete);
	}
}

function syncInDB(toUpdate, toDelete) {
	/*
	 * NOMBRE: syncInDB.
	 * UTILIDAD: Sincroniza la DB con las prácticas que ha modificado y/o eliminado el usuario
	 * ENTRADAS: toUpdate --> Array que contiene la info de las prácticas a actualizar, toDelete --> Array que contiene el ID de las prácticas a eliminar.
	 * SALIDAS: Ninguna.
	 */
	if (toDelete.length > 0) {
		$.ajax({
			url: crk_Domain + "/index.php/CRKcontroller/deletePracticesArray",
			method: "POST",
			data: { toDelete: toDelete },
			success: function () {
				showEditDelete();
				showMessage("Proyecto eliminado.", 4);
				$(".container_confirm").hide();
			},
		});
	}

	if (toUpdate.length > 0) {
		$.ajax({
			url: crk_Domain + "/index.php/CRKcontroller/updatePracticesArray",
			method: "POST",
			data: { toUpdate: toUpdate },
			success: function () {
				showMessage("Nombre(s) actualizado(s).", 1);
			},
		});
	}
}

function checkRepeated(array) {
	/*
	 * NOMBRE: checkRepeated
	 * UTILIDAD: Revisa, de forma recursiva, si existen elementos repetidos en un Array
	 * ENTRADAS: array --> Array a revisar.
	 * SALIDAS: flag --> Boolean que indica si se encontraron elementos repetidos.
	 */
	let flag = false;
	array.forEach(function (valor, indice, array) {
		array[indice] = array[indice].toLowerCase();
		array[indice] = array[indice].replace(/\s/g, "");
	});
	if (array.length == 1) {
		flag = true;
	} else {
		let current = array.shift();
		if (array.includes(current) && current != "") {
			flag = false;
		} else {
			flag = checkRepeated(array);
		}
	}
	return flag;
}

function checkUpdatedNames(toKeep) {
	/*
	 * NOMBRE: checkUpdatedNames
	 * UTILIDAD: Revisa los nombres de los elementos, en busca de repetidos
	 * ENTRADAS: toKeep --> Array que contiene los nombres de los elementos a mantener.
	 * SALIDAS: toUpdate --> Array que contiene los elementos a actualizar.
	 */
	let toUpdate = [];
	toKeep.forEach((element) => {
		let currentid = element.practica_id;
		dataPractices.forEach((element2) => {
			if (currentid == element2.practica_id) {
				if (!(element.saved_name == element2.saved_name)) {
					//Nombres distintos, no pasa nada
					element.saved_datetime = new Date().getTime();
					toUpdate.push(element);
				}
			}
		});
	});
	return toUpdate;
}

$(document).on("click", ".d_pxbbloquesviewspopupcontebtnscancel", function () {
	//Ocultar los input del menú de editar/eliminar
	if (configWindow == 0) {
		$("#name_input_1, #name_input_2, #name_input_3, .container_confirm").hide();
		$(".name_hidden").show();
		$("#e_1, #e_2, #e_3").attr("onclick", "edit_name_row(this)");
	}
	//Cerrar la ventana de cargar/guardar práctica
	$(".d_pxbbloquesviewspopup").hide();
	$(".d_pxbbloquesviewspopupcontebtnsaccept").show();
	showMessage("", 0);
	$(".d_pxbbloquesviewspopuptitle").css("background-color", "#009eb3");
	configWindow = 0;
	//Quitar los onclick de las palomitas
	$(".d_pxbbloquesviewspopupcontebtnsaccept").attr("onclick", "");
});

function uploadProject() {
	/*
	 * NOMBRE: uploadProject.
	 * UTILIDAD: Almacena en la DB la práctica actual
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	nombre_estructura = $("#menuNombre").val(); //Obtiene el nombre del input
	guardaBD(nombre_estructura); //Guarda en DB
	configWindow = 0; //Regresa la variable que indica que se debe ejecutar al presionar Enter
}

function timeConverter(UNIX_timestamp) {
	UNIX_timestamp = parseInt(UNIX_timestamp);
	var a = new Date(UNIX_timestamp);
	var months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var time =
		date + "/" + month + "/" + year + " - " + hour + ":" + min + ":" + sec;
	return time;
}

function compareJSON(obj1, obj2) {
	/*
	 * NOMBRE: compareJSON.
	 * UTILIDAD: Compara dos objetos JSON
	 * ENTRADAS: obj1 --> Objeto JSON1, obj2 --> Objeto JSON2.
	 * SALIDAS: flag --> Bandera que indica si los objetos son iguales o no. True si son iguales, false de lo contrario
	 */
	let flag = true;
	if (Object.keys(obj1).length == Object.keys(obj2).length) {
		for (key in obj1) {
			if (obj1[key] == obj2[key]) {
				continue;
			} else {
				flag = false;
				break;
			}
		}
	} else {
		flag = false;
	}
	return flag;
}
/*************************************************************************************
 *
 *  FUNCIONES Y PROCEDIMIENTOS PARA CARGA Y DESCARGA DE MAQUETA EN TXT Y LOCALSTORAGE
 *
 **************************************************************************************/
/*var readXml = null;
function subirArchivo(input) {
    /*
     * NOMBRE: SubirArchivo.
     * UTILIDAD: En esta función se obtiene el txt y se parsea a JSON.
     * ENTRADAS: Recibe el input completo del html.
     * SALIDAS: Un json que tiene la estructura de un proyecto.
     
    //console.log.log(input);
    let file = input.files[0];
    //console.log.log(file);
    let reader = new FileReader();

    reader.onload = function (e) {
        readXml = e.target.result;
        let json = JSON.parse(readXml);
        armaMaqueta(json)
        //console.log.log(json)
    };
    reader.readAsText(file);
}
function armaMaqueta(json) {
    
     * NOMBRE: armaMaqueta.
     * UTILIDAD: Se encarga de vaciar programa, recrear el HTML y al final el codigo.
     * ENTRADAS: json, que trae la estructura un proyecto.
     * SALIDAS: Ninguna.
     
    let proyecto = json.proyecto;;
    vaciaPrograma();
    recreaHTML(proyecto, $("#programa"));
    creaYActualiza();
}

$(document).on('click', '#guardaMaqueta', function () {
    /*
     * NOMBRE: guardaMaqueta.
     * UTILIDAD: Selector que lanza evento para descargar la maqueta del proyecto
     * ENTRADAS: Ninguno.
     * SALIDAS: Ninguna.
     
    descargaArchivos(xml, nombre_archivo, 'text/plain', "#b")
});

function guardaLocal() {
    /*
     * NOMBRE: guardaLocal.
     * UTILIDAD: Guarda la informacion del proyecto en localStorage, se asigna nombre
     * ENTRADAS: Ninguno.
     * SALIDAS: Ninguna.
     
    let dialogo = $(
        '<div class="" title="Guardar estructura">' +
        '<p>Escribe el nombre del archivo</p>' +
        '<input type="text" placeholder="Nombre" id="estructura-config-dialog">' +
        '</div>'
    ); //Fin del dialogo

    $(dialogo).dialog({
        autoOpen: true,
        modal: true,
        buttons: {
            'Aceptar': function () {
                let selector = $("#estructura-config-dialog");
                let valor = $(selector).val();
                if (valor !== "") {
                    nombre_estructura = valor;
                    $("#obtieneValoresLocal").click();
                    $(this).dialog("close");
                    ////console.log.log(nombre_archivo);
                } else {
                    window.alert("Nombra tu archivo para continuar.")
                }

            },
            'Cancelar': function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            $(this).dialog('destroy').remove();
        }
    }); //fin codigo dialogo
}

$(document).on('click', '#obtieneValoresLocal', function () {
    /*
     * NOMBRE: obtieneValoresLocal.
     * UTILIDAD: Obtiene los proyectos de local storage, posterior se guardan los nuevos valores obtenidos y valida
     * si ya exite algun proyecto con el mismo nombre para sobrescribir
     * ENTRADAS: Ninguno.
     * SALIDAS: Ninguna.
         let allLocal = JSON.parse(localStorage.getItem("proyecto"));
    let bandera = 0;
    let index;
    if (allLocal == null) {
        let local = {
            nombre: "Valentín",
            fecha: new Date(),
            grado: "Secundaria",
            proyectos: []

        }
        var objetoEstructura = {
            nombre: nombre_estructura,
            proyecto: principal,
        };
        local.proyectos.push(objetoEstructura);
        localStorage.setItem("proyecto", JSON.stringify(local));

    } else {
        let nomproyec = allLocal.proyectos;
        //console.log.log(nomproyec)
        for (var i = 0; i < nomproyec.length; i++) {
            //console.log.log(nomproyec[i].nombre)
            //console.log.log(nombre_estructura)
            if (nomproyec[i].nombre === nombre_estructura) {
                bandera = 1;
                index = i;
                break;
            } else {
                bandera = 2;
            }
        }

        if (bandera == 1) {
            if (confirm("Este proyecto ya existe, ¿Quiere sobre escribirlo?")) {
                allLocal.proyectos[index].proyecto = principal;
                //console.log.log(allLocal)
                localStorage.setItem("proyecto", JSON.stringify(allLocal));
            } else {

            }
        } else if (bandera == 2) {
            var objetoEstructura = {
                nombre: nombre_estructura,
                proyecto: principal,
            };
            allLocal.proyectos.push(objetoEstructura)
            localStorage.setItem("proyecto", JSON.stringify(allLocal));
        }

    }
});

function getLocal() {
    /*
     * NOMBRE: guardaMaqueta.
     * UTILIDAD: Obtiene valores de localStorage del proyecto seleccionado en un Select, carga todo el contenido.
     * ENTRADAS: Ninguno.
     * SALIDAS: Ninguna.
    let local = JSON.parse(localStorage.getItem("proyecto"));
    if (local == null) {
        window.alert("No hay proyectos!");
    } else {
        let itens = local.proyectos;

        let dialogo = $(
            '<div class="" title="Cargar proyecto">' +
            '<p>Elije proyecto</p>' +
            '<select id="mySelect"></select>' +
            '</div>'
        ); //Fin del dialogo
        $(dialogo).dialog({
            autoOpen: true,
            modal: true,
            buttons: {
                'Aceptar': function () {
                    let selector = $("#mySelect");
                    let valor = $(selector).val();
                    if (valor !== "") {
                        nombre_estructura = valor;
                        $("#abreProyectoLocal").click();
                        $(this).dialog("close");
                    } else {
                        window.alert("Nombra tu archivo para continuar.")
                    }

                },
                'Cancelar': function () {
                    $(this).dialog("close");
                }
            },
            close: function () {
                $(this).dialog('destroy').remove();
            }
        }); //fin codigo dialogo
        for (var i = 0; i < itens.length; i++) {
            var item = itens[i].nombre;
            var element = document.createElement("option");
            element.innerText = item;
            var selectElem = document.getElementById("mySelect");
            selectElem.append(element);
        }
    }
}


//ABRE EL PROYECTO DE LOCAL STORAGE
$(document).on('click', '#abreProyectoLocal', function () {
    /*
     * NOMBRE: abreProyectoLocal.
     * UTILIDAD: Se encarga de abrir los pryectos locales y avisa que se perdera el que se tenia abierto.
     * ENTRADAS: Ninguno.
     * SALIDAS: Ninguna.
    let proyecto = nombre_estructura;
    let local = JSON.parse(localStorage.getItem("proyecto"));
    let proyectos = local.proyectos;
    for (var i = 0; i < proyectos.length; i++) {
        if (proyecto == proyectos[i].nombre) {
            var pos = i;
        }
    }
    //Se llama a la funcion que "carga" el proyecto
    let cargaP = confirm("Se perderá tu progreso no guardado. ¿Deseas continuar?");
    if (cargaP) {
        vaciaPrograma();
       
    
        //console.log.log(JSON.stringify( proyectos[pos].proyecto));
        recreaHTML(proyectos[pos].proyecto, $("#programa"));
        creaYActualiza();
    }
});


//DESCARGA LA MAQUETA EN UN TXT
// function generaXML() {
//     /*
//      * NOMBRE: generaXML.
//      * UTILIDAD: Obtiene el codigo principal y lo guarda en un JSON, luego pide nombre del archivo donde se guardara
//      * el json.
//      * ENTRADAS: Ninguno.
//      * SALIDAS: Ninguna.
//      
//     var json = {
//         nombre: "txt",
//         proyecto: principal,
//     }
//     xml = JSON.stringify(json);
//     let dialogo = $(
//         '<div class="" title="Guardar Maqueta">' +
//         '<p>Escribe el nombre del archivo</p>' +
//         '<input type="text" placeholder="Nombre" id="maqueta-config-dialog">' +
//         '</div>'
//     ); //Fin del dialogo

//     $(dialogo).dialog({
//         autoOpen: true,
//         modal: true,
//         buttons: {
//             'Aceptar': function () {
//                 let selector = $("#maqueta-config-dialog");
//                 let valor = $(selector).val();
//                 if (valor !== "") {
//                     nombre_archivo = valor + ".txt";
//                     $("#guardaMaqueta").click();
//                     $(this).dialog("close");
//                     //console.log.log(nombre_archivo);
//                 } else {
//                     window.alert("Nombra tu archivo para continuar.")
//                 }

//             },
//             'Cancelar': function () {
//                 $(this).dialog("close");
//             }
//         },
//         close: function () {
//             $(this).dialog('destroy').remove();
//         }
//     }); //fin codigo dialogo
//     //console.log.log(doc);
//     //Funcion para generar el archivo xml
// }

*/

function traduceTexto(texto) {
	/*
	 * NOMBRE: traduceTexto.
	 * UTILIDAD: Se encarga de traducir palabras reservadas en los pasos de la práctica.
	 * ENTRADAS: texto, es un array con los pasos.
	 * SALIDAS: regresa el texto la palabra reservada traducida.
	 */
	let arrayTexto = texto.split(" ");
	let bandera_punto = false;
	let cadena = "";

	for (let i = 0; i < arrayTexto.length; i++) {
		let last = undefined;
		//console.log.log(arrayTexto[i]);
		if (arrayTexto[i].slice(-1) === "." || arrayTexto[i].slice(-1) === ",") {
			last = arrayTexto[i].substr(arrayTexto[i].length - 1);
			arrayTexto[i] = arrayTexto[i].slice(0, -1);
		}
		switch (arrayTexto[i]) {
			case "Zumbador":
				arrayTexto[i] = "Buzzer";
				break;
			case "Retardo":
				arrayTexto[i] = "Delay";
				break;
			case "Pulso":
				arrayTexto[i] = "Pulse";
				break;
			case "Detener":
				arrayTexto[i] = "Break";
				break;
			case "Zumbador":
				arrayTexto[i] = "Buzzer";
				break;
			case "Si":
				arrayTexto[i] = "If";
				break;
			case "Si/otro":
				arrayTexto[i] = "If/else";
				break;
			case "Mientras":
				arrayTexto[i] = "While";
				break;
			case "Hacer/Mientras":
				arrayTexto[i] = "Do/While";
				break;
			case "Repetir":
				arrayTexto[i] = "For";
				break;
			case "Entonces":
				arrayTexto[i] = "Then";
				break;
			case "Otro":
				arrayTexto[i] = "Else";
				break;
		}
		if (last != undefined) {
			arrayTexto[i] = arrayTexto[i] + last;
		}
		cadena = cadena + arrayTexto[i] + " ";
	}
	return cadena;
}

function cambiaIdioma() {
	/*
	 * NOMBRE: cambiaIdioma.
	 * UTILIDAD: Cambia el idioma de algunos elementos del HTML.
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	let idioma = document.getElementById("select-lenguaje");

	if (idioma.value === "Ingles") {
		$(".esp").css("display", "none");
		$(".eng").css("display", "block");
		if (is3D) {
		} else {
			let padre = $("#d_pxbbloquesstepstxt").find("p").text();
			let cambio = traduceTexto(padre);
			$("#d_pxbbloquesstepstxt").find("p").text(cambio);
		}
	} else {
		$(".eng").css("display", "none");
		$(".esp").css("display", "block");
		if (is3D) {
		} else {
			let pos = $("#d_pxbbloquesstepsscrollbtn")
				.find(".d_pxbbloquesstepsbtns_resalte")
				.text();
			$("#d_pxbbloquesstepstxt")
				.find("p")
				.text(addbloquesInstruccion[pos - 1]);
		}
	}
}

function descargaArchivos(text, name, type, id) {
	/*
	 * NOMBRE: descargaArchivos.
	 * UTILIDAD: Se encarga de guardar el contenido en un archivo y despues lo descarga.
	 * ENTRADAS: text; el contenido del archivo, name; nombre del archivo, type; tipo del archivo,
	 * id; sirve para identificar que etiqueta lanzo el evento.
	 * SALIDAS: Ninguna.
	 */
	let a = document.querySelector(id);
	let file = new Blob([text], {
		type: type,
	});
	a.href = URL.createObjectURL(file);
	a.download = name;
}

// function descargaCodigoINO() {

// }

$(document).on("click", "#descargaCodigoINO", function () {
	/*
	 * NOMBRE: guardaCodigo.
	 * UTILIDAD: Selector que lanza evento para descargar el codigo.ino del proyecto
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	let text = generaCodigo(principal);
	descargaArchivos(
		text,
		$("#inputMenuDescargar").val() + ".ino",
		"text/plain",
		"#a"
	);
	showMessage("Tu código se descargó.", 1);
	$(".d_pxbbloquesviewspopupcontebtnsaccept")
		.attr("onclick", "")
		.css("opacity", ".5");
	configWindow = 0;
});

function ventanaCarga() {
	/*
	 * NOMBRE: ventanaCarga.
	 * UTILIDAD: Abre una ventana para poder cargar un archivo local que sea txt
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	let dialogo = $(
		'<div class="" title="Cargar Archivo">' +
			"<p>Selecciona Archivo</p>" +
			'<input type="file" id="cargar-proyecto-dialog">' +
			"</div>"
	); //Fin del dialogo
	$(dialogo).dialog({
		autoOpen: true,
		modal: true,
		buttons: {
			Aceptar: function () {
				let archivo = document.querySelector("#cargar-proyecto-dialog");
				/*VALIDAR QUE HAYA SELECCIONADO UN ARCHIVO*/
				let fileV = archivo.files[0];

				if (fileV.type === "text/plain") {
					subirArchivo(archivo);
					$(this).dialog("close");
				} else {
					alert("Archivo no valido");
					//console.log.log("Archivo no valido");
				}
			},
			Cancelar: function () {
				$(this).dialog("close");
			},
		},
		close: function () {
			$(this).dialog("destroy").remove();
		},
	});
}
/***********************************************************************************
 *
 *           FUNCIONALIDAD DE CARGAR / EDITAR / ELIMINAR y GUARDAR PRÁCTICAS
 *
 *************************************************************************************/
function adjustInterface() {
	/*
	 * NOMBRE: adjustInterface.
	 * UTILIDAD: Ajusta algunos elementos de la interface, como la validación de los input para descargar el código, se ejecuta una vez que el documento se ha cargado
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	//Eventos de los input para editar los nombres de prácticas
	$("#name_input_1, #name_input_2, #name_input_3").keydown(function (e) {
		if (e.which == 13) {
			e.preventDefault();
			let id = e.target.id.split("_")[2];
			let name1 = $("#name_input_" + id).val(); //Obtener el valor del input
			//Verificar que no sea este vacio
			var noSpacesString = name1.replace(/ /g, ""); // "DoIhavespaces?"
			if (noSpacesString.length != 0) {
				//Nombre valido
				//Ocultar el input y mostrar el DIV
				$("#name_input_" + id).hide();
				$("#name_" + id)
					.text(name1)
					.show();
				//Regresar funcionalidad de edición de nombre al btn
				$("#e_" + id).attr("onclick", "edit_name_row(this)");
				$(".d_pxbbloquesviewspopupcontebtnsaccept")
					.attr("onclick", "syncProjects()")
					.css("opacity", "1");
			} else {
				showMessage("Nombre no valido", 4);
			}
		}
	});

	$(document).on("click", ".btn_cancelar", function () {
		//Cerrar la ventana de cargar/guardar práctica
		$(".container_confirm").hide();
		for (var i = 1; i <= 3; i++) {
			if ($("#name_" + i).text() != "") {
				$("#row_" + i).attr("hide", "false");
			}
		}
	});

	//Validación del  nombre del archivo A GUARDAR EN DB
	$("#menuNombre").keyup(function () {
		validateName(this.value);
	});

	//Listener para el enter, cuando se edita el nombre de un proyecto
	$("#name_1, #name_2, #name_3").keyup(function () {
		$(".d_pxbbloquesviewspopupcontebtnsaccept")
			.attr("onclick", "syncProjects()")
			.css("opacity", "1");
	});

	//Validación del nombre del archivo a GUARDAR EN LA PC
	$("#inputMenuDescargar").keyup(function () {
		validateName2(this.value);
	});

	//Funcionalidades para los botones que despliegan las ventanas CARGAR/DESCARGAR/EDITAR/BORRAR
	$("#cargarProyecto").attr("onclick", "showWindowRead()");
	$("#guardarProyecto").attr("onclick", "showWindowWrite()");
	$("#editarBorrarProyecto").attr("onclick", "showEditDelete()");

	//Revisar el dominio
	//checkDomain(crk_Domain);
	switchDBuse();

	//Draggable de la ventana de confi de elementos
	$(".d_pxbbloquespopupin").draggable({
		handle: ".d_pxbbloquespopuptitle",
		containment: ".d_pxbconte",
	});

	//Listener para la tecla Enter en el simulador
	$(document).keyup(function (event) {
		if (event.which === 13) {
			//console.log.log(configWindow);
			switch (configWindow) {
				case 0:
					break;
				case 4:
					popupbtnAccept();
					break;
				default:
					$(".d_pxbbloquesviewspopupcontebtnsaccept").click();
					break;
			}
		}
	});
}

function switchDBuse(){
	/*
	* NOMBRE: switchDBuse.
	* UTILIDAD: Aplica el uso / restricción del uso de las funciones de DB en el simulador de bloques
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	let indi = parseInt($('#editarBorrarProyecto').css('opacity'));
	if(indi){ //Está activa, desactivar
		$("#editarBorrarProyecto, #cargarProyecto, #guardarProyecto").css({ opacity: "0.5", cursor: "default" }).attr("onclick", "");
	}else{ //No está activa, activar
		$("#cargarProyecto").attr("onclick", "showWindowRead()");
		$("#guardarProyecto").attr("onclick", "showWindowWrite()");
		$("#editarBorrarProyecto").attr("onclick", "showEditDelete()");
		$("#editarBorrarProyecto, #cargarProyecto, #guardarProyecto").css({ opacity: "1", cursor: "pointer"})
	}
}

function checkDomain(domain) {
	/*
	 * NOMBRE: checkDomain.
	 * UTILIDAD: Revisa el dominio desde el cual se accede a la aplicación, para saber si se le permite o no el acceso a la funcionalidad de carga en la DB
	 * ENTRADAS: domain --> Dominio desde el cual se accede a la aplicación.
	 * SALIDAS: Ninguna.
	 */
	//console.log.log('Dominio de acceso: '+crk_Domain);
	let withDB = false;
	let posicion;
	for (var i = 0; i < domainsWithDB.length; i++) {
		posicion = domain.includes(domainsWithDB[i]);
		if (posicion) {
			withDB = true;
			crk_Domain = domainsWithDB[i];
			break;
		}
	}
	if (withDB && crk_IDAlumno != "-") {
		//Este dominio puede usar la DB
		getPractices(crk_IDAlumno, crk_Origin); //Ir por ls prácticas una vez abierto el simulador
		manejaAsincronia(cleanPractices); //Limpiar las prácticas que tengan más tiempo del definido
	} else {
		switchDBuse();
	}
}

function descargaCodigo() {
	/*
	 * NOMBRE: descargaCodigo.
	 * UTILIDAD: Despliega ventana para dar nombre al archivo.ino depues lanza el selector guardaCodigo
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	configWindow = 3;
	$("#menuDescargar").css("display", "block");
	$("#menuCargar").css("display", "none");
	$("#menuGuardar").css("display", "none");
	$(".d_pxbbloquesviewspopuptitletxt").text("Descargar código");
	$(".d_pxbbloquesviewspopup").removeClass("hidden").show();
	$(".d_pxbbloquesviewspopupcontebtnsaccept")
		.attr("onclick", "")
		.css("opacity", ".5");
	$("#inputMenuDescargar").val("");
	$(".container_load").hide();
	$(".d_pxbbloquesviewspopupin").css("width", "20rem");
}

function validateName(value) {
	/*
	 * NOMBRE: validateName.
	 * UTILIDAD: Valida que el nombre de la práctica a guardar exista y NO sea repetido
	 * ENTRADAS: valie --> elemento obtenido del input
	 * SALIDAS: Ninguna.
	 */
	if (value.length > 0) {
		for (var i = 0; i < dataPractices.length; i++) {
			if (dataPractices[i].saved_name === value) {
				//Nombre repetido
				$(document).on("click", ".d_pxbbloquesviewspopupcontebtnsaccept", "");
				showMessage("Proyecto existente, ¿Deseas reemplazarlo?", 2);
				repeatedPracticeIndex = dataPractices[i].practica_id;
				$(".d_pxbbloquesviewspopupcontebtnsaccept").css("opacity", "1").attr("onclick", "updatePractices()");
				return;
			}
		}
		$(".d_pxbbloquesviewspopupcontebtnsaccept").attr("onclick", is3D ? "saveObjinf(); uploadProject();" : "uploadProject()").css("opacity", "1");
		showMessage("", 0);
	} else {
		$(".d_pxbbloquesviewspopupcontebtnsaccept").attr("onclick", "").css("opacity", ".5");
		showMessage("Nombra tu archivo para continuar.", 3);
	}
}

function validateName2(value) {
	/*
	 * NOMBRE: validateName2.
	 * UTILIDAD: Valida que el nombre de la práctica a guardar en PC no tenga espacios y sea valido para decargar en la PC
	 * ENTRADAS: value --> elemento obtenido del input
	 * SALIDAS: Ninguna.
	 */
	let validName = false;
	if (value.length > 0) {
		validName = isValid(true, value);
		if (validName) {
			showMessage("", 0);
			$(".d_pxbbloquesviewspopupcontebtnsaccept")
				.attr("onclick", '$("#descargaCodigoINO").click()')
				.css("opacity", "1");
		} else {
			$(".d_pxbbloquesviewspopupcontebtnsaccept")
				.attr("onclick", "")
				.css("opacity", ".5");
			showMessage("Nombre no valido.", 3);
		}
	} else {
		$(".d_pxbbloquesviewspopupcontebtnsaccept")
			.attr("onclick", "")
			.css("opacity", ".5");
		showMessage("Nombra tu archivo para continuar.", 3);
	}
}

function isValid(flag, value) {
	/*
	 * NOMBRE: isValid.
	 * UTILIDAD: Verifica si el valor de entrada es aceptado por una expresión regular especificada
	 * ENTRADAS: flag --> Indica si se va a verificar un nombre o un Entero positivo
	 * SALIDAS: Ninguna.
	 */
	var rg1;
	if (flag) {
		//Nombre para la descarga de código
		rg1 = /^[a-zA-Z0-9]*$/; //Only Alpha Numeric String, no spaces.
	} else {
		//Entero positivo, para la creación de variables y valores
		rg1 = /^[0-9]*$/; //Only Numeric no spaces.
	}
	return rg1.test(value);
}

function showMessage(mssg, code, window, bloque) {
	/*
	 * NOMBRE: showMessage.
	 * UTILIDAD: Despliega una ventana en la interfaz por unos segundos con un mensaje especificado
	 * ENTRADAS: mssg --> Mensaje a desplegar en la ventana, code --> Código para saber de qué color pintar la ventana (1=done, 2=warning, 3=error).
	 * SALIDAS: Ninguna.
	 */
	clearInterval(timeInterval);
	if (window) {
		$("#bloqueWarning").empty().removeClass("hidden");
		$("#bloqueWarning").text(mssg);
		timeInterval = setTimeout(() => {
			if (code == 3) {
				$("#bloqueWarning").addClass("hidden");
			}
		}, 800);
	} else {
		$("#warning").empty().removeClass("hidden");
		$(".d_pxbbloquesviewspopuptitle").removeClass("to_blue");
		$("<p>" + mssg + "</p>").appendTo("#warning");
		timeInterval = setTimeout(() => {
			if (code == 1) {
				$("#warning").addClass("hidden");
				$(".d_pxbbloquesviewspopup").addClass("hidden");
			}
			if (code == 4) {
				$("#warning").addClass("hidden");
			}
		}, 800);
		if (code == 2) {
			showedWarning = true;
		}
	}
}

function showEditDelete() {
	/*
	 * NOMBRE: showEditDelete.
	 * UTILIDAD: Muestra la ventana de editar/borrar las prácticas e inserta las p´racticas en la tabla.
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	bandera_menu = true;
	showMessage("", 0);
    $(".d_pxbnav").removeClass('d_pxbnav_menu');//Agrega estilos para quitar menu superior de navegacion
	$("#menuCargar").css("display", "block");
	$(".d_pxbbloquesviewspopuptitletxt").text("Mis proyectos");
	$("#menuGuardar, #menuDescargar").css("display", "none");
	$(".d_pxbbloquesviewspopup").removeClass("hidden").show();
	$("#menuCargar, #menuDescargar, .t_row").css("display", "none");
	//$(".d_pxbbloquesviewspopupin").css("width", "33rem");
	$(".d_pxbbloquesviewspopupcontebtnsaccept")
		.attr("onclick", "")
		.css("opacity", ".5");
	$("#row_1, #row_2, #row_3").attr("hide", "false");
	//Reiniciar la tabla que contiene las prácticas
	$("#name_1, #name_2, #name_3").empty().removeAttr("disabled");
	hidden = 0;
	getPractices(crk_IDAlumno, crk_Origin);
	manejaAsincronia(ventanaSelectPractices);
}

function showWindowRead() {
	/*
	 * NOMBRE: showWindowRead.
	 * UTILIDAD: Despliega la ventana, LEE DE LA DB LAS PRÁCTICAS y despliega los nombres de las prácticas en el SELECT (LEER DE DB)
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */

	bandera_menu = true;
	configWindow = 1;
	showMessage("", 0);
    $(".d_pxbnav").removeClass('d_pxbnav_menu');//Agrega estilos para quitar menu superior de navegacion
	$("#menuCargar").css("display", "block");
	$(".d_pxbbloquesviewspopuptitletxt").text("Cargar proyecto");
	$("#menuGuardar, #menuDescargar").css("display", "none");
	$(".d_pxbbloquesviewspopup").removeClass("hidden").show();
	$("#menuDescargar").css("display", "none");
	$(".d_pxbbloquesviewspopupin").css("width", "20rem");
	$(".d_pxbbloquesviewspopupcontebtnsaccept")
		.attr("onclick", "")
		.css("opacity", ".5");
	//Reiniciar la tabla que contiene las prácticas
	$("#name_1, #name_2, #name_3").removeAttr("disabled");
	$("#row_1, #row_2, #row_3").removeClass("selected");
	$(".container_load").hide();
	$(".d_pxbbloquesviewspopupcontebtnsaccept").show();
	getPractices(crk_IDAlumno, crk_Origin);
	manejaAsincronia(showSelectPractices);
}

function showWindowWrite() {
	/*
	 * NOMBRE: showWindowWrite.
	 * UTILIDAD: Despliega la ventana para ESCRIBIR UNA PRÁCTICA EN LA DB (GUARDAR EN DB)
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	bandera_menu = false;
	configWindow = 2;
	//Por defecto, desactivar el btn de aceptar del guardado
    $(".d_pxbnav").removeClass('d_pxbnav_menu');//Agrega estilos para quitar menu superior de navegacion
	$(".d_pxbbloquesviewspopupcontebtnsaccept").show().css("opacity", ".5");
	$("#menuCargar, #menuDescargar").css("display", "none");
	$("#menuGuardar").css("display", "block");
	$(".d_pxbbloquesviewspopuptitletxt").text("Guardar proyecto");
	$(".d_pxbbloquesviewspopup").removeClass("hidden").show();
	$("#menuNombre").val("");
	$(".container_load").hide();
	$(".d_pxbbloquesviewspopupin").css("width", "20rem");
	getPractices(crk_IDAlumno, crk_Origin);
	manejaAsincronia(ventanaSelectPractices);
}

function ventanaSelectPractices(itens) {
	/*
	 * NOMBRE: ventanaSelectPractices.
	 * UTILIDAD: Llena la tabla con los nombres de las prácticas en la DB para un usuario
	 * ENTRADAS: itens --> Array de JSON con las prácticas en cada posición
	 * SALIDAS: Ninguna.
	 */
	if (bandera_menu) {
		//Llenar las prácticas encontradas
		let element;
		$("#menuArchivo").empty();
		if (dataPractices.length > 0) {
			$(".container_load").show();
			for (var i = 0; i < dataPractices.length; i++) {
				$("#row_" + (i + 1)).show();
				//$('#name_'+(i+1)).val(dataPractices[i].saved_name).attr('practica_id', dataPractices[i].practica_id);
				$("#name_" + (i + 1))
					.text(dataPractices[i].saved_name)
					.attr("practica_id", dataPractices[i].practica_id);
				$("#date_" + (i + 1)).text(
					timeConverter(dataPractices[i].saved_datetime)
				);
			}
		} else {
			//No tiene prácticas, ocultar la tabla y mostrar el mensaje de que no tiene nada en DB
			$(".container_load").css("display", "none");
			showMessage("No tienes proyectos guardados", 0);
			$(".d_pxbbloquesviewspopupcontebtnsaccept")
				.attr("onclick", "")
				.css("opacity", ".5");
		}
	} else {
		//Es false para cuando se muestra la ventana de guardar
		if (dataPractices.length >= 3) {
			//Deshabilitar el input y mostrar el mensaje de que ha llegado al limite de prácticas guardadas
			$("#menuNombre").attr("disabled", "disabled");
			showMessage("Ya no puedes guardar más prácticas (Max. 3).", 3);
		} else {
			$("#menuNombre").removeAttr("disabled");
		}
	}
}

function showSelectPractices() {
	/*
	 * NOMBRE: showSelectPractices.
	 * UTILIDAD: Llena el SELECT con los nombres de las prácticas en la DB para un usuario
	 * ENTRADAS: itens --> Array de JSON con las prácticas en cada posición
	 * SALIDAS: Ninguna.
	 */
	if (bandera_menu) {
		//Es true para llenar la tabla que contiene las prácticas
		let element;
		$("#menuArchivo").empty();
		if (dataPractices.length > 0) {
			for (var i = 0; i < dataPractices.length; i++) {
				var item = dataPractices[i].saved_name;
				element = document.createElement("option");
				element.innerText = item;
				document.getElementById("menuArchivo").append(element);
			}
			/*DEPENDIENDO DEL SIMULADOR DEL QUE VENGA*/
			$(".d_pxbbloquesviewspopupcontebtnsaccept")
				.attr("onclick", is3D ? "openObjinf()" : "downloadProject()")
				.css("opacity", "1");
		} else {
			//No tiene prácticas, ocultar la tabla y mostrar el mensaje de que no tiene nada en DB
			element = document.createElement("option");
			element.innerText = "No tienes proyectos guardados";
			document.getElementById("menuArchivo").append(element);
			$(".d_pxbbloquesviewspopupcontebtnsaccept")
				.attr("onclick", "")
				.css("opacity", ".5");
		}
	}
}

function downloadProject() {
	/*
	 * NOMBRE: downloadProject.
	 * UTILIDAD: Despliega la práctica selecionada por el usuario de la DB
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	flagAdjustScroll = false;
	let nombre_estructura = $("#menuArchivo").val();
	for (var i = 0; i < dataPractices.length; i++) {
		if (nombre_estructura == dataPractices[i].saved_name) {
			var pos = i;
			break;
		}
	}
	if (showedWarning) {
		vaciaPrograma();
		recreaHTML(JSON.parse(dataPractices[pos].saved_json), $("#programa"));
		creaYActualiza();
		configWindow = 0;
		showMessage("Práctica cargada con éxito", 1);
		$(".d_pxbdropblocks").find("div").removeClass("d_pxbopcionbtn"); //Quita estilos de btn del menu lateral, para asignarle unos nuevos en la parte de bloques
		showedWarning = false;
		$(".d_pxbbloquesviewspopupcontebtnsaccept").attr("onclick", "").css("opacity", ".5");
		simulatedSort = false;
	} else {
		showMessage("Se perderá tu progreso no guardado. ¿Deseas continuar?", 2);
	}
	flagAdjustScroll = true;
}

function edit_name_row(evt) {
	/*
	 * NOMBRE: edit_name_row.
	 * UTILIDAD: Muestra el input y oculta el div que contiene el nombre del proyecto
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	let id = $(evt).attr("id").split("_")[1];
	let name1 = $("#name_" + id).text();
	$("#name_" + id).hide();
	$("#name_input_" + id)
		.val(name1)
		.show();

	//Quitar la funcionalidad de edición de nombre al btn
	$("#e_" + id).attr("onclick", "");
}
/***********************************************************************************
 *
 *           FUNCIONAES QUE REALIZAN PETICIONES A LA DB y MÁS
 *
 *************************************************************************************/

function getPractices(userID, prefijo) {
	/*
	 * NOMBRE: getPractices.
	 * UTILIDAD: OBTIENE las practicas de un usuario, usando su ID
	 * ENTRADAS: userID --> ID del usuario
	 * SALIDAS: Ninguna.
	 */
	//console.log.log('Prefijo de la app: '+prefijo);
	//console.log.log('ID de usuario: '+userID);
	let dataAux = [];
	dataPractices = undefined;
	$.ajax({
		url: crk_Domain + "/index.php/CRKcontroller/getPractices",
		method: "POST",
		data: { userID: userID, prefijo: prefijo },
		success: function (data) {
			for (let i = 0; i < JSON.parse(data).length; i++) {
				if (JSON.parse(data)[i].saved_name != "") {
					dataAux.push(JSON.parse(data)[i]);
				}
			}
			dataPractices = dataAux;
		},
	});
}

function putPractices(idAlumno, nombre_estructura, saved_origin, finished) {
	/*
	 * NOMBRE: putPractices.
	 * UTILIDAD: INSERTA en la DB una practica
	 * ENTRADAS: idAlumno --> ID del alumno, nombre_estructura --> nombre de la practica a guardar, saved_origin --> nomenclatura de la actividad actual, user --> usuario user_name --> nombre de usuario, user_type --> tipo de usuarop, user_group --> grupo del usuario, user_grade --> grado del usuario
	 * SALIDAS: Ninguna.
	 */
	let timestamp = new Date().getTime();
	/*AGREGAR CONDICIÓN PARA DISCRIMINAR SI ES DE ENTORNO 3D O BLOQUES*/
	let principalString = JSON.stringify(is3D ? save_components : principal);
	$.ajax({
		url: crk_Domain + "/index.php/CRKcontroller/putPractices",
		method: "POST",
		data: {
			idAlumno: idAlumno,
			nombre_estructura: nombre_estructura,
			timestamp: timestamp,
			saved_origin: saved_origin,
			principalString: principalString,
			finished: finished, //INDICA SI ES QUE SE HA TERMINADO LA PRÁCTICA (1) O ES SOLO UN PROGRESO (1)
		},
		success: function () {
			showMessage("Tu práctica se guardó con éxito.", 1);
			$(".d_pxbbloquesviewspopupcontebtnsaccept")
				.attr("onclick", "")
				.css("opacity", ".5");
		},
	});
}

function updatePractices() {
	/*
	 * NOMBRE: updatePractices
	 * UTILIDAD: Actualiza una practica en la DB
	 * ENTRADAS: saved_practice_id --> ID de la practica a actualizar
	 * SALIDAS: Ninguna.
	 */
	let timestamp = new Date().getTime();
	if(is3D)saveObjinf()
	let principalString = JSON.stringify(is3D ? save_components : principal);
	let practica_id = repeatedPracticeIndex;
	$.ajax({
		url: crk_Domain + "/index.php/CRKcontroller/updatePractices",
		method: "POST",
		data: {
			practica_id: practica_id,
			timestamp: timestamp,
			principalString: principalString,
		},
		success: function () {
			showMessage("Tu práctica se actualizó con éxito", 1);
		},
	});
}

function deletePractices(element) {
	/*
	 * NOMBRE: deletePractices.
	 * UTILIDAD: Elimina la practica indicada
	 * ENTRADAS: saved_practice_id --> ID de la práctica a eliminar.
	 * SALIDAS: Ninguna.
	 */
	$.ajax({
		url: crk_Domain + "/index.php/CRKcontroller/deletePractices",
		method: "POST",
		data: { practica_id: element.practica_id },
		success: function () {},
	});
}

function manejaAsincronia(callBack) {
	/*
	 * NOMBRE: manejaAsincronia
	 * UTILIDAD: Maneja la asincronia de las peticiones a la DB y llama a la función de llenar el SELECT de las practicas almacenadas
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	if (dataPractices != undefined) {
		callBack();
	} else {
		setTimeout(() => {
			manejaAsincronia(callBack);
		}, 100);
	}
}
