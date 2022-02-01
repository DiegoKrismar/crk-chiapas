/***********************************************************************************
 *
 *                                    CONSTANTES
 *
 *************************************************************************************/
//Ninguno
/***********************************************************************************
 *
 *                                    VARIABLES GLOBALES
 *
 *************************************************************************************/
startInit = false; //Determina que NO hay canvas 3d en la aplicacion
vistaStart = "btnBlock"; //Vista con que se inicia
viewShow = ["d_viewBlock", "d_viewCode"]; //Vistas que se muestran al mismo tiempo
vistaPrevia = false;
//objetivo = "Prender y apagar un LED varias veces en un tiempo determinado haciendo uso del bloque pulso";

addbloquesInstruccion = [
	"Del menú Elementos, selecciona y arrastra al espacio de trabajo un elemento LED. Selecciona este elemento y oprime el primer botón que está arriba a la derecha, configura su color en Verde 1 y cambia su estado a Encendido.",
]; //Almacena instrucciones por cada paso

validacion =  [{"tipo":"elemento","subtipo":"led","id":"p_led-0","nivel":"0","contenido":{"nombre":"led_4","color":"green","estado":"HIGH","pin":"4"},"contenido_condicion":[],"contenido_entonces":[],"contenido_otro":[]}]
preguntasRef = ["¿Qué pasa si cambias Verde 1 por Amarillo 1?"];

errores = [
	{
		error:
			"¡Atención! Paso 1: El elemento LED no está configurado de manera correcta (Verde 1, Encendido)",
		estado: 1,
	},
];
utilizados = ["c_led"]; //Bloques que se utilizan en esta practica
//SON LOS MENUS QUE NO SE OCUPAN EN CADA PRACTICA, SI ALGUNO DE ELLOS SE OCUPA SOLO HAY QUE ELIMINARLO DEL ARRAY
//noUtilizados = ["d_pxbelementcolor","d_pxbfunctioncolor","d_pxbstructurecolor","d_pxbvariablecolor","d_pxbmatcolor"];
noUtilizados = ["d_pxbstructurecolor","d_pxbvariablecolor","d_pxbmatcolor", "d_pxbfunctioncolor"];
/*************************************************************************************
 *
 * 								FUNCIONES Y PROCEDIMIENTOS
 *
 **************************************************************************************/
$(document).ready(function () {});
$(window).resize(function () {});
$(window).on("load", function () {
	cargaPractica();
});

function cargaPractica() {
	banderaPreview = true;
	$("#validar").css("display", "block");
	$(".d_pxbviewcodedownloadbtn").css("display", "none");
	$(".libre").css("display", "none");
	for (let i = 0; i < noUtilizados.length; i++) {
		$("." + noUtilizados[i]).css("display", "none");
	}
	for (let i = 0; i < utilizados.length; i++) {
		$("." + utilizados[i]).css("display", "block");
	}
}
