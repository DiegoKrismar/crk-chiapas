/***********************************************************************************
* 
*                                    VARIABLES GLOBALES
*
*************************************************************************************/
var ejer = null;//Vector con un ejercicio
var respuesta = null;//Respuesta de un ejercicio seleccionado
var contaPorte = 0;//Contador para cambiar las imagenes de la portería
var tmpSolucion=null;
var respUser =null;//almacena la respuesta del usuario
var actividad = 1;//Número de actividad actual
var contaPorteria = 0;


/*************************************************************************************
*
*                               FUNCIONES Y PROCEDIMIENTOS
*
**************************************************************************************/
function creaEjer(){
    /*
    * NOMBRE: creaEjer
    * UTILIDAD: Crea un ejercicio nuevo
    * ENTRADAS: NInguna
    * SALIDAS: NInguna
    */
	/******VARIABLES*******/
	var arrOpciones = [];
	/************************/
	arPreguntas.sort(function(){return Math.random()-0.5});//Mezclo las preguntas
    ejer = arPreguntas[0];//Recupero la pregunta y respuestas
	$("#idPregunta").text(ejer[0]);//Muestro la pregunta
    respuesta = ejer[1];//Recupero la respuesta Correcta
	ejer.splice(0,1);//elimina la respuesta del arreglo y nose repita
	
	for(j=0; j<numOpciones; j++) arrOpciones.push(j+1);//realiza ciclos y agrega según el número de respuestas

	for(i=0 ;i<numOpciones;i++){
        arrOpciones.sort(function(){return Math.random()-0.5});//Mezclo los id para mostrar respuestas
        $("#idResp"+arrOpciones[0]).text(ejer[0]).attr("num",arrOpciones[0]).attr("onclick","validaResp(idResp"+arrOpciones[0]+")");//agrego evento onlick
        arrOpciones.splice(0,1);//Elimino el no de id de las respuestas
		ejer.splice(0,1);//Elimino el no de id de las respuestas
    }
    arPreguntas.splice(0,1);//Elimino la pregunta actual del vector de preguntas
}

function validaResp(num){
    // alert();
    /*
    * NOMBRE: validaResp
    * UTILIDAD: Valida que una respuesta sea in/correcta
    * ENTRADAS: Recibe el objeto que tiene dentro la respuesta
    * SALIDAS: Ninguna
    */
    /******VARIABLES*******/

    respUser = $(num);//Recupero la respuesta del usuario
	/************************/
	for(i=0; i<numOpciones; i++) $("#idResp"+(i+1)).removeAttr("onclick");//remueve atributo onclick a respuestas
    
    $(".d_opcionesbase").css("cursor","default");//Quito la manita

    if($(num).text() == respuesta){//compara la resp del usuario con la correcta

        $("#balon").addClass(balonBien);//agrega clase bien
        $("#balonRebote").addClass(balonBienRebote);
        setTimeout("animaBien()",350);//realiza la animacion de la porteria

        setTimeout(function(){
			$("#opcionesbase"+$(num).attr("num")).addClass(opcionBaseBien);//agrega clase bien
			correctoDefault();
            $("#idGol").text(aciertos);//muestra aciertos
            $("#idInt").text(actividad);//muestra intentos
            evaluaActividad();
        },3000);
		
    }else{//Incorrecto
        $("#idGol").text(aciertos);//muestra aciertos
        $("#idInt").text(actividad);//muestra errores
		
        $(".d_balon").addClass(balonMal);//agrega clase mal 
        $(".d_balonrebote").addClass(balonMalRebote);
		
		setTimeout(function(){
			$("#opcionesbase"+$(num).attr("num")).addClass(opcionBaseMal);//agrega a respuesta mal
        },1000);
		
        setTimeout(function(){
			$(".d_balon").addClass(balonMal);//agrega clase mal
			$(".d_balonrebote").addClass(balonMalRebote);
            incorrectoDefault();
            evaluaActividad();
        },3000);
    }
}

function animaBien(){
    /*
    * NOMBRE: animaBien
    * UTILIDAD: Realiza el cambio de imagenes de la porteria
    * ENTRADAS: Ninguna
    */
    contaPorte++;//incrementa el contador
    // $("#porteria").css({"background-image":"url("+PREFIJO+nomPorteria+contaPorte+".png"});//agrega imagenes de porteria
    contaPorteria+=10;
    $("#porteria").css({"background-position":contaPorteria+"% 0%"});//agrega imagenes de porteria
    setTimeout(function(){
        if(contaPorte < imgMaxPorteria){//si es menor al max num de img 
            animaBien();//termina
        }
    },100);
}

function verSolucionCorr(){
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
	$("#opcionesbase"+$(respUser).attr("num")).removeClass(opcionBaseMal);//quita clase mal a la respuesta del usuario

	for(i=1; i<=numOpciones; i++){
		if($("#opcionesbase"+i).find("td").text()  == respuesta){//compara el contenido de las respuestas con el correcto
			$("#opcionesbase"+i).addClass(opcionBaseBien);//agrega clase bien
			respuestaCorrecta = i;
			break;
		}
	}

    tmpSolucion=setTimeout(function(){
        activarBtn("#idSolucion");
		$("#opcionesbase"+respuestaCorrecta).removeClass(opcionBaseBien);//remueve clase mal
		$("#opcionesbase"+$(respUser).attr("num")).addClass(opcionBaseMal);//agrega clase mal
    },3000);
}

function siguienteActividad(){
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
	$(".d_opcionesbase").css("cursor","pointer");
	/***REMUEVE CLASES A LAS RESPUESTAS/DISTRACTORES****/
    $(".d_opcionesbase").removeClass(opcionBaseBien).removeClass(opcionBaseMal);
    $(".d_balonrebote").removeClass(balonBienRebote).removeClass(balonMalRebote);
    $("#balon").removeClass(balonBien).removeClass(balonMal);
}

function evaluaActividad(){
    /*
    * NOMBRE: evaluarActividad.
    * UTILIDAD: Evalua las soluciones en la actividad.
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    evaluaDefault();
}

function iniciaActividad(){
    /*
    * NOMBRE: iniciaActividad.
    * UTILIDAD: Quita opacidad inicial, ejecuta el codigo que iniciliza la aplicación.
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    iniciaDefault();
    creaEjer();
}