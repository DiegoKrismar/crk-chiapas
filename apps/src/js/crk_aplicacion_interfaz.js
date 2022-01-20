/***********************************************************************************
* 
*                                    CONSTANTES
*
*************************************************************************************/
//
/***********************************************************************************
* 
*                                    VARIABLES GLOBALES
*
*************************************************************************************/
var totReactivos = 0;//Almacena el total de reactivos.

var actividad = 1;//Contador para las actividades
var aciertos = 0;//Almacena los aciertos
var errores = 0;//Almacena los errores
var porcentaje = null;//Almacena la efectividad en la actividad
var device = null;//Determina la plataforma sobre la cual se ejecuta el script
var iniciada = false; //Para saber si se acaba de iniciar la actividad 

//Ninguno
/*************************************************************************************
*
* 								FUNCIONES Y PROCEDIMIENTOS
*
**************************************************************************************/
$(document).ready(function(){
    /*
	* NOMBRE: ready.
	* UTILIDAD: Detecta el documento esta listo
	* SALIDAS: Ninguna.
    */
  
});
$(window).resize(function() {
    /*
	* NOMBRE: resize.
	* UTILIDAD: Detecta el resize del navegador
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    reajusteContegrl();//Reajusta div contenedor de la aplicacion
});
$(window).on('load',function(){
    /*
	* NOMBRE: load.
	* UTILIDAD: Una vez abierto el dom
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    reajusteContegrl();//Reajusta div contenedor de la aplicacion
	$(".d_emergenteclose").on("click", function(){
		if(!iniciada){
			iniciaActividad();
			iniciada = true;
		}
	});
	for(i=0; i<TOTACTIVIDADES; i++){
		$(".d_marcadorgrl").append(" <div id='foquito"+i+"' class='d_marcadorgrlpoint'></div>")
	}
	muestraInstrucciones();
});

$(window).on("orientationchange",function(event){
    /*
	* NOMBRE: orientationchange.
	* UTILIDAD: Detecta cambio de orientacion del dispositivo
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    reajusteContegrl();//Reajusta div contenedor de la aplicacion
})

function reajusteContegrl(){
    /*
	* NOMBRE: reajusteContegrl.
	* UTILIDAD: Reajusta div contenedor de la aplicacion
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    var getGrlwidth = $(document).outerWidth();//Obtiene el ancho del documento
    var getGrlheight = $(document).outerHeight();//Obtiene el alto del documento
    var getParentwidth = $(".d_contegrlactcenter").outerWidth();//Obtiene el ancho del contenedor padre
    var getParentheight = $(".d_contegrlactcenter").outerHeight();//Obtiene el alto del contenedor padre
    var getElementwidth = $(".d_contegrlactinf").outerWidth();//Obtiene el ancho del contenedor
    var getElementheight = $(".d_contegrlactinf").outerHeight();//Obtiene el alto del contenedor
    if(getGrlwidth <= getGrlheight){//Portrait
        if((getParentwidth*1.5) < getParentheight){//Resize vertical
            $(".d_contegrlactinf").css({'width':getParentwidth,'height':(getParentwidth*1.5)});//Asigna alto y ancho al contenedor
        }
        else if((getParentwidth*1.5) > getParentheight){//Resize horizontal
            $(".d_contegrlactinf").css({'width':(getParentheight/1.5),'height':getParentheight});//Asigna alto y ancho al contenedor
        }
    }
    if(getGrlheight < getGrlwidth){//Landscape
        if((getParentheight*1.5) < getParentwidth){//Resize vertical
            $(".d_contegrlactinf").css({'width':(getParentheight*1.5),'height':getParentheight});//Asigna alto y ancho al contenedor
        }
        else if((getParentheight*1.5) > getParentwidth){//Resize horizontal
            $(".d_contegrlactinf").css({'width':getParentwidth,'height':(getParentwidth/1.5)});//Asigna alto y ancho al contenedor
        }
    }
    getParentwidth = $(".d_contegrlactcenter").outerWidth();//Obtiene el ancho del contenedor padre
    getParentheight = $(".d_contegrlactcenter").outerHeight();//Obtiene el alto del contenedor padre
    getElementwidth = $(".d_contegrlactinf").outerWidth();//Obtiene el ancho del contenedor
    getElementheight = $(".d_contegrlactinf").outerHeight();//Obtiene el alto del contenedor
    $(".d_contegrlactinf").css({'top':'calc(50% - '+(getElementheight/2)+'px)','left':'calc(50% - '+(getElementwidth/2)+'px)'});//Asigna los nuevos margenes al contenedor
}

////////////////////////////////////////////////////////////////////
///
///
//		PROGRAMACIÓN 
//
//
////////////////////////////////////////////////////////////////////

function desactivarBtn(btn){
	/* NOMBRE: desactivarBtn.
	 * UTILIDAD: Remueve el evento onclick el botón y la opacidad la fija a 0.3 (desactivar).
	 * ENTRADAS: btn > id del botón a desactivar.
	 * SALIDAS: Ninguna.
	 */
	$(btn).css({ opacity: 0.3 });
    $(btn).css( "cursor", "default" );
    $(btn).removeAttr("onclick");

	if(btn == "#idSolucion"){
		$("#idSolucion").css("opacity","1");
		$(".d_btnsoluciontxt").css("opacity","1");
	}
}

function activarBtn(btn,funcion){
	/* NOMBRE: activarBtn.
	 * UTILIDAD: Agrega el evento onclick con su función correspondiente, así como fijar la opacidad a 1 (activar).
	 * ENTRADAS: btn > id del botón a activar,
				 funcion > nombre de la función a asociar.
	 * SALIDAS: Ninguna.
	 */
	$(btn).css({ opacity: 1 });
    $(btn).css( "cursor", "pointer" );


	switch(true){
		case (btn == "#btngrlnext" && funcion != undefined):
			$(btn).attr("onclick",funcion);
			break;
		case (btn == "#btngrlnext" && funcion == undefined):
			$(btn).attr("onclick","siguienteActividad()");
			break;
		case (btn == "#btngrleval" && funcion == undefined):
			$(btn).attr("onclick","evaluaActividad()");
			break;
		case (btn == "#btngrleval" && funcion != undefined):
			$(btn).attr("onclick",funcion);
			break;
		case (btn == "#idSolucion" && funcion != undefined):
			$(btn).attr("onclick",funcion);
			break;
		case (btn == "#idSolucion" && funcion == undefined):
			$(btn).attr("onclick","showSolution();");
			break;
		default:
			$(btn).attr("onclick",funcion);
	}
	if(btn == "#idSolucion"){
		$(".d_btnsolucion").css("display","block");
	}
}


function siguienteDefault(){
	/*
	* NOMBRE: evaluaDefault
	* UTILIDAD: Realiza siguiente por default.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna
	* VARIABLES: Ninguna.
	***************/
	actividad++;//Incrementa el número de la activad.
	desactivarBtn("#btngrlnext");
  	desactivarBtn("#idSolucion");
    clearTimeout(tmpSolucion);
    desactivarBtn("#btngrleval");
	$(".d_btnsolucion").css("display","none");
    $(".d_btnsoluciontxt").css({"display":"none"});//Oculta txt
	$("input").attr("autocomplete","off");
}

function correctoDefault(){
	/*
	* NOMBRE: correctoDefault
	* UTILIDAD: Realiza procedimientos al evaluar ejercicio como correcto.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	* VARIABLES: Ninguna.
	***************/
	playCorrecto();
	fillBarBien();
	aciertos++;
}
function incorrectoDefault(){
	/*
	* NOMBRE: incorrectoDefault
	* UTILIDAD: Realiza procedimientos al evaluar ejercicio como incorrecto.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	* VARIABLES: Ninguna.
	**************/
	activarBtn("#idSolucion");
	playIncorrecto();
	fillBarMal();
	errores++;
}
function iniciaDefault(){
	/*
	* NOMBRE: iniciaDefault
	* UTILIDAD: Inicia cronómetro y muestra ejercicio inicial.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	* VARIABLES: Ninguna.
	*******************/

	// $("#opacidadInicialGral").hide();
	// $("#instruccionesGeneral").hide();
	// iniciaCronometro();
	$("input").attr("autocomplete","off");

	// speechSynthesis.cancel();//cancela audio de intrucciones
	// bandHabla = false;
	desactivarBtn("#btngrlnext");
    desactivarBtn("#btngrleval");

}
function evaluaDefault(){
	/*
	* NOMBRE: evaluaDefault
	* UTILIDAD: Realiza evaluación por default.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna
	* VARIABLES: Ninguna.
	***************/
	// detieneCronometro();
	desactivarBtn("#btngrleval");
	//desactivarBtn("#btnBorrar");

	// ocultaInformacion();



	if(actividad == TOTACTIVIDADES){//Se alcanzó la última actividad
		despliegaDetallesEval();
        finished = true;
	}else{//Todavía hay actividades por contestar
		activarBtn("#btngrlnext");
	}
	
}

function despliegaDetallesEval(){
	/* NOMBRE: despliegaDetallesEval.
	* UTILIDAD: Muestra en pantalla el concentrado de la evaluación.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	// $("#menuConfiguracion").hide();
	// $("#plecaSquares").show();
	totReactivos = aciertos + errores;
	porcentaje = (aciertos*100)/totReactivos;

	document.getElementById("numAciertosEval").innerHTML = aciertos;
	document.getElementById("numErroresEval").innerHTML = errores;
	document.getElementById("numPorcentajeEval").innerHTML = parseInt(porcentaje)+"%";
    preguntaEvaluar();
}
function fillBarBien(){
	/*
	* NOMBRE: fillBarBien.
	* UTILIDAD: Llena de color verde un circulo.
	* ENTRADAS: Ninguna
	* SALIDAS:
	* VARIABLES: Ninguna.
	*************/
	$("#foquito"+(actividad-1)).addClass("d_marcadorgrlpoint_bien");
	
}
function fillBarMal(){
	/*
	* NOMBRE: fillBarMal.
	* UTILIDAD: Llena de color rojo un circulo.
	* ENTRADAS: Ninguna
	* SALIDAS: 
	* VARIABLES: Ninguna.
	*************/
	$("#foquito"+(actividad-1)).addClass("d_marcadorgrlpoint_mal");


}
// function showSolution(){
// 	/*
// 	* NOMBRE: showSolution.
// 	* UTILIDAD: Muestra la solucion.
// 	* ENTRADAS: Ninguna.
// 	* SALIDAS: Ninguna.
// 	*/
//     console.log("SHOWSOLUTION");
// 	$(".d_btnsolucion").removeClass("d_btnsolucion_pulse");//Quita efecto de pulse
//     $(".d_btnsoluciontxt").css({"display":"flex"});//Muestra txt
//     var setTime = setTimeout(function(){
//         $(".d_btnsolucion").addClass("d_btnsolucion_pulse");//Agrega efecto de pulse
//         $(".d_btnsoluciontxt").css({"display":"none"});//Oculta txt
//         clearTimeout(setTime);//Limpia tiempo
//     },5000);
// }



