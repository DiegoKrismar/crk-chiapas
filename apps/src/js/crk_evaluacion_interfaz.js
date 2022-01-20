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
var actividad = 1;//Contador para las actividades
var aciertos = 0;//Almacena los aciertos
var errores = 0;//Almacena los errores
var porcentaje = null;//Almacena la efectividad en la actividad
var tmpSolucion=null;
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
});
$(window).on('load',function(){
    /*
	* NOMBRE: load.
	* UTILIDAD: Una vez abierto el dom
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
	$(".d_emergenteclose").on("click", function(){
		if(!iniciada){
			iniciaActividad();
			iniciada = true;
		}
	});
	muestraInstrucciones();
});
$(window).on("orientationchange",function(event){
    /*
	* NOMBRE: orientationchange.
	* UTILIDAD: Detecta cambio de orientacion del dispositivo
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
})
function showSolution(){
	/*
	* NOMBRE: showSolution.
	* UTILIDAD: Muestra la solucion.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	desactivarBtn(".d_btnsolucion");
	$(".d_btnsolucion").removeClass("d_btnsolucion_pulse");//Quita efecto de pulse
    $(".d_btnsoluciontxt").css({"display":"flex"});//Muestra txt
	solucionCorrecta();
    var setTime = setTimeout(function(){
        $(".d_btnsolucion").addClass("d_btnsolucion_pulse");//Agrega efecto de pulse
        $(".d_btnsoluciontxt").css({"display":"none"});//Oculta txt
        clearTimeout(setTime);//Limpia tiempo
		solucionUsuario();
		activarBtn(".d_btnsolucion")
    },5000);
}


////////////////////////////////////////////////////////////////////
///
///
//		PROGRAMACIÓN 
//
//
////////////////////////////////////////////////////////////////////
function iniciaDefault(){
	/*
	* NOMBRE: iniciaDefault
	* UTILIDAD: Inicia cronómetro y muestra ejercicio inicial.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	* VARIABLES: Ninguna.
	*******************/
	$("#opacidadInicialGral").hide();
	$("#instruccionesGeneral").hide();
	// iniciaCronometro();
	$("input").attr("autocomplete","off");

	// speechSynthesis.cancel();//cancela audio de intrucciones
	// bandHabla = false;
    desactivarBtn(".d_btnsopcgrldelete");
    desactivarBtn(".d_btnsopcgrleval");
	desactivarBtn(".d_btnsolucion")

}
function desactivarBtn(btn){
	/* NOMBRE: desactivarBtn.
	 * UTILIDAD: Remueve el evento onclick el botón y la opacidad la fija a 0.3 (desactivar).
	 * ENTRADAS: btn > id del botón a desactivar.
	 * SALIDAS: Ninguna.
	 */
	$(btn).css({ opacity: 0.3 });
    $(btn).css( "cursor", "default" );
    $(btn).removeAttr("onclick");

	if(btn == ".d_btnsolucion"){
		$(".d_btnsolucion").css("opacity","1");
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
		case (btn == ".d_btnsopcgrleval" && funcion == undefined):
			$(btn).attr("onclick","evaluaActividad();");
			break;
		case (btn == ".d_btnsopcgrleval" && funcion != undefined):
			$(btn).attr("onclick",funcion);
			break;
		case (btn == ".d_btnsolucion" && funcion != undefined):
			$(btn).attr("onclick",funcion);
			break;
		case (btn == ".d_btnsolucion" && funcion == undefined):
			$(btn).attr("onclick","showSolution();");
			break;
        case (btn == ".d_btnsopcgrldelete" && funcion == undefined):
            $(btn).attr("onclick","preguntaDelete();");
            break;
        case (btn == ".d_btnsopcgrldelete" && funcion != undefined):
            $(btn).attr("onclick", funcion);
            break;
		default:
			$(btn).attr("onclick",funcion);
	}
	if(btn == ".d_btnsolucion"){
		$(".d_btnsolucion").css("display","block");
		
	}
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
	desactivarBtn(".d_btnsopcgrleval");
	desactivarBtn(".d_btnsopcgrldelete");

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

function borraRespuestas(){
	desactivarBtn(".d_btnsopcgrldelete");
	desactivarBtn(".d_btnsopcgrleval");
	borraSolucionActividad();
	ocultaEmergentes();

}