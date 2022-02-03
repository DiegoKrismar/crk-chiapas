
/********************************************************************************************************************************************************************************************
*
*																				CONSTANTES
*
*********************************************************************************************************************************************************************************************/

/********************************************************************************************************************************************************************************************
*
*																				VARIABLES
*
*********************************************************************************************************************************************************************************************/
var minutosEval = null;
var segundosEval = null;
var intervalTimeEval = null;
var bandEvaluacion = false;
var bandera=false;
var arrayBancoInputs = [];
/********************************************************************************************************************************************************************************************
*
*																		FUNCIONES Y PROCEDIMIENTOS (PLANTILLA JS)
*
*********************************************************************************************************************************************************************************************/

function borraSolucionActividad(){
	/*
	* NOMBRE: borraSolucionActividad. 
	* UTILIDAD: Borra la solución de la actividad en curso.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	$(".d_contegrlevarespuesta").removeClass("d_contegrlevarespuesta_seleccion");
}

function iniciaActividad() {
	/*
	* NOMBRE: iniciaActividad.
	* UTILIDAD: Quita opacidad inicial, ejecuta el codigo que iniciliza la aplicación.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	iniciaDefault();
	generaActividad();
	iniciaCronometroEval();
	$(".d_fondo").before("<form id = 'formInput'></form>");
}

function verSolucionCorr(){
	/*
	* NOMBRE: verSolucionCorr
	* UTILIDAD: Muestra la solución de un ejercicio.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	desactivarBtn(".d_btnsolucion");
	solucionCorrecta();
	tmpSolucion = setTimeout(function(){
		activarBtn(".d_btnsolucion");
		solucionUsuario();
	},5000);
}

function evaluaActividad(){
	/*
	* NOMBRE: evaluarActividad.
	* UTILIDAD: Evalua las soluciones en la actividad.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	bandEvaluacion = true;
	$(".d_contegrlevarespuesta").css("cursor", "default");
	$(".d_contegrlevarespuesta").off("click");
	$(".d_contegrlevarespuesta").unbind('mouseenter mouseleave');
	//agregaInputs();
	validaResp();
	evaluaDefault();
	detieneCronometroEval();
}
/**********************************************************************************************************************************************************************
*
*														FUNCIONES Y PROCEDIMIENTOS DE LA EVALUACION
*
**********************************************************************************************************************************************************************/

function iniciaCronometroEval(){
	/*
	* NOMBRE: iniciaCronometroEval
	* UTILIDAD: Inicia el conteo regresico para el cronometro de la actividad.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	* VARIABLES: Ninguna.
	*/
	intervalTimeEval = setInterval(ctrlTimeEval, 1000);//Se asigna el intervalo de tiempo
}

function ctrlTimeEval(){
	/*
	* NOMBRE:ctrlTimeEval
	* UTILIDAD: Muestrta el tiempo restante para responder la actividad.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/	
	valorCeroMin = null;
	valorCeroSeg = null;
	if(segundosEval == 0 && minutosEval > 0){
		segundosEval = 60;
		minutosEval--;
	}
	segundosEval--;
	if(minutosEval <= 9){
		valorCeroMin = "0";
	}else{
		valorCeroMin = "";
	}
	if(segundosEval <= 9){
		valorCeroSeg = "0";
	}else{
		valorCeroSeg = "";
	}
	if(minutosEval == 0 && segundosEval == 0){//Se acabo el tiempo
		segundosEval = 0;
		detieneCronometroEval();
		evaluaActividad();
	}
	$("#cronometro").text(valorCeroMin+minutosEval+":"+valorCeroSeg+segundosEval);
}

function detieneCronometroEval(){
	/*
	* NOMBRE: detieneCronometroEval
	* UTILIDAD: Detiene el cronometro de cuenta regresiva de la actividad.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	clearInterval(intervalTimeEval);
}

$(window).on("load",function(){
	/*
	* NOMBRE: N/A
	* UTILIDAD: Obtiene el tiempo que tendrá la actividad.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	ceroMin = null;
	ceroSeg = null;
	minutosEval = Number($("#time").val().split("-")[0]);
	segundosEval = Number($("#time").val().split("-")[1]);
	if(minutosEval < 9){
		ceroMin = "0";
	}else{
		ceroMin = "";
	}
	if(segundosEval < 9){
		ceroSeg = "0";
	}else{
		ceroSeg = "";
	}
	$("#cronometro").text(ceroMin+minutosEval+":"+ceroSeg+segundosEval);
	
});

// function agregaInputs(){
// 	/*
// 	* NOMBRE: agregaInputs.
// 	* UTILIDAD: Agrega inputs de preguntas y respuestas al formulario que se envia para guardar en la base de datos.
// 	* ENTRADAS: Ninguna.
// 	* SALIDAS: Ninguna.
// 	*/
// 	$(".d_opcion").each(function(index){//Por cada division de pregunta
// 		pregunta = $(this).find(".d_pregunta").find(".d_preguntatxt").text();
// 		$("#formInput").append("<input hidden type = 'text' name = 'datos[]' value = 'Preg_"+pregunta+"'>");//Agrega pregunta
// 		/*
// 		* El switch se utilizará en caso de que sea agregado otro tipo de respuestas(combos, radio-button, etc.).
// 		*/
// 		switch($(this).attr("tipo")){
// 			case "om"://Opción multiple
// 				insertaOm($(this),(index+1));
// 				break;
// 		}
// 	});
// }

// function insertaOm(objeto, indice){
// 	/*
// 	* NOMBRE: insertaOm.
// 	* UTILIDAD: Inserta un input, recupera las respuestas de opción multiple.
// 	* ENTRADAS: objeto > div(jquery), contenedor de respuestas y pregunta.
// 				indice > númerico, número de indice del objeto.
// 	* SALIDAS
// 	*/
// 	letraSel = null;//Letra que se asignara al input "S" ó ""
// 	letraRes = null;//Letra que se asignará en caso de ser un input de respuesta
// 	valorRes = null;//Valor de la respuesta, los aciertos valen 1, en caso de error = 0
// 	txtOruta = null;//Puede ser la ruta de una imagen ó texto	
// 	$(".d_res"+indice).each(function(){//Por cada conjunto de respuestas de una pregunta
// 		if($(this).hasClass('d_respuesta_seleccion')){//Es la respuesta seleccionada
// 			letraSel = "S";
// 		}else{
// 			letraSel = "";
// 		}
// 		if($(this).find(".d_respuestatxt").text() == ""){//No ay texto -> es una ruta de imagen
// 			txtOruta = $(this).find(".d_respuestatxt").find("img").attr("src");
// 			if(arBancoPregs[(indice-1)].respuesta == $(this).find(".d_respuestatxt").find("img").attr("src")){//Es la respuesta
// 				letraRes = "R";
// 				valorRes = 1;
// 			}else{
// 				letraRes = "D";
// 				valorRes = 0;
// 			}
// 		}else{//Hay texto
// 			txtOruta = $(this).find(".d_respuestatxt").text();
// 			if(arBancoPregs[(indice-1)].respuesta == $(this).find(".d_respuestatxt").text()){//Es la respuesta
// 				letraRes = "R";
// 				valorRes = 1;
// 			}else{
// 				letraRes = "D";
// 				valorRes = 0;
// 			}
// 		}
// 		$("#formInput").append("<input hidden type = 'text' name = 'datos[]' value = 'Resp"+letraRes+letraSel+"_"+valorRes+"_"+txtOruta+"' >");//Agergo el input con los valores de la respuesta ó distractor
// 	});
// }

function solucionCorrecta(){
	/*
	* NOMBRE: solucionCorrecta.
	* UTILIDAD: Muestra la respuesta correcta de cada pregunta.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	arBancoPregs.forEach(function(item, index){//Para cada elemento del banco de preguntas
		contieneMal = 0;
		contieneBien = 0;
		$(".d_res"+(index+1)).each(function(){
			if($(this).hasClass("d_contegrlevarespuesta_mal")){
				contieneMal++;
			}
			if($(this).hasClass("d_contegrlevarespuesta_bien")){
				contieneBien++;
			}
		});
		$(".d_res"+(index+1)).each(function(){
			respuesta = null;
			if(compruebaItem(item.respuesta)){
				itemSplit = item.respuesta.split("/");
				respuestaSplit = itemSplit[1];//Repuesta correcta
				respuesta = $(this).find(".d_contegrlevarespuestatxt").hasClass(respuestaSplit);
				if(respuesta == true){
					respuesta = item.respuesta
				}
			}else{
				respuesta = $(this).find(".d_contegrlevarespuestatxt").html();
			}
			if(respuesta == item.respuesta){
				$(this).addClass("d_contegrlevarespuesta_bien");
				if(contieneMal > 0){
					resUsu = $($(".d_contegrlevapreguntaopcion")[index]).find(".d_contegrlevarespuesta_mal");
					resUsu.addClass("rusr");
					resUsu.removeClass("d_contegrlevarespuesta_mal");
				}else if(contieneBien == 0 && contieneMal == 0){
					$(this).addClass("delete");
				}
			}
		});
	});
}




function solucionUsuario(){
	/*
	* NOMBRE: solucionUsuario
	* UTILIDAD: Muestra la solución del usuario.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	$(".d_contegrlevapreguntaopcion").each(function(item){//Para cada conenedor de pregunta
		itmRuser = $($(".d_contegrlevapreguntaopcion")[item]);
		if(itmRuser.find(".rusr").text() != "" ){//Existe solución incorrecta
			itmRuser.find(".d_contegrlevarespuesta_bien").removeClass("d_contegrlevarespuesta_bien");
			itmRuser.find(".rusr").addClass("d_contegrlevarespuesta_mal");
			itmRuser.find(".rusr").removeClass("rusr");
		}else if(itmRuser.find(".delete").text() != "" ){//Existe solución incorrecta
			itmRuser.find(".d_contegrlevarespuesta_bien").removeClass("d_contegrlevarespuesta_bien");
			itmRuser.find(".delete").removeClass("delete");
		}
	});
}


function validaResp(){
	/*
	* NOMBRE: validaResp.
	* UTILIDAD: Valida las respuestas del usuario con las correctas.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/	
	respuesta = null;//Será la respuesta correcta
	arBancoPregs.forEach(function(item, index){//Para cada item del banco de preguntas
		txtRespUsu = null;//Respuesta del usuario puede ser texto o la ruta de una imagen
		opcion = $($(".d_contegrlevapreguntaopcion")[index]);//Opcion (div jquery)
		respuestausu = $(opcion.find(".d_contegrlevarespuesta_seleccion"));//Respuesta del usuario
		compRes = compruebaItem(item.respuesta);//Comprueba que es la ruta de una imagen
		if(compRes){//Es la ruta de una imagen
			itemSplit = item.respuesta.split("/");
			respuesta = itemSplit[1];//Repuesta correcta
			txtRespUsu = respuestausu.find(".d_contegrlevarespuestatxt").hasClass(respuesta);
			if(txtRespUsu == true){
				txtRespUsu = respuesta;
			}
		}else{
			respuesta = item.respuesta;//Repuesta correcta
			txtRespUsu =  respuestausu.find(".d_contegrlevarespuestatxt").html()
		}
		if(txtRespUsu == respuesta){//Es la respuesta correcta
			
			$(opcion.find(".d_contegrlevarespuesta_seleccion")).addClass("d_contegrlevarespuesta_bien");
			aciertos++;
		}else{
			$(opcion.find(".d_contegrlevarespuesta_seleccion")).addClass("d_contegrlevarespuesta_mal");
			errores++;
		}
		$(opcion.find(".d_contegrlevarespuesta_seleccion")).removeClass("d_contegrlevarespuesta_seleccion");
	});
	if(aciertos < totalPreguntas){//Hubo errores
		playIncorrecto();
		activarBtn(".d_btnsolucion");
	}else{
		playCorrecto();
	}
}

function generaActividad() {	
	/*
	* NOMBRE: generaActividad
	* UTILIDAD: genera la actividad del cuestionario.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	exercisePositions = getExerFromMemory();
	arBancoPregs = getTopicFromPositions(exercisePositions);
	arBancoPregs.forEach(function(item, index){//Para cada elemento del banco de preguntas
		agregaPreg(item,index);
	});
	$(".d_respuesta").hover(function(){
		$(this).addClass("d_respuesta_hover");
		}, function(){
		$(this).removeClass("d_respuesta_hover");
	});
}


function agregaPreg(item,index){
	/*
	* NOMBRE: agregaPreg
	* UTILIDAD: Agrega una pregunta.
	* ENTRADAS: item > elemento del banco de preguntas
				index > númerico, indice del item
	* SALIDAS: Ninguna.
	*/
    arOpciones = [item.respuesta,item.distractor1,item.distractor2,item.distractor3];
    arOpciones.sort(function(){return Math.random()-0.5});
   $("#conteTexto").append("<div class='d_contegrlevapreguntaopcion'  tipo = '"+item.tipo+"'> <div class='d_contegrlevapregunta'> <div class='d_contegrlevapreguntabullet'> <svg class='d_contegrlevapreguntabulletcorner' viewBox='0 0 61.354 83.829'> <polygon points='61.354,0 61.354,83.829 0,83.829 9.511,0 '></polygon> </svg> <div class='d_contegrlevapreguntabulletshadow'></div> <div class='d_contegrlevapreguntabullettxt'>"+(index+1)+"</div> </div> <div class='d_contegrlevapreguntatxt'>"+item.pregunta+"</div> </div> <div class='d_contegrlevarespuestas'></div></div>");
    arOpciones.forEach(function(itemO, indexO){//Para la respuesta y sus distractores	
        agregaRespDis(itemO, indexO, (index+1));
    });
	$(".d_res"+(index+1)).click(function(){
		$(".d_res"+(index+1)).removeClass("d_contegrlevarespuesta_seleccion");
		$(this).addClass("d_contegrlevarespuesta_seleccion");
		activarBtn(".d_btnsopcgrldelete");
		if($(".d_contegrlevarespuesta_seleccion").length == totalPreguntas){
			activarBtn(".d_btnsopcgrleval");
		}
	});
}

function agregaRespDis(item, index, noPreg){
	/*
	* NOMBRE:agregaRespDis.
	* UTILIDAD: Agrega las posibles respuestas de cada pregunta.
	* ENTRADAS: item > texto o ruta de la imagen de la posible/respuesta.
				index > número, indice de la respuesta.
				noPreg > número, no. de la pregunta.
	* SALIDAS: Ninguna.
	*/
    letra = null;//Letra de la respuesta.
	contItem = null;//Contenido de la respuesta(imagen ó texto)
	compItem = compruebaItem(item);//comprueba que la respuesta sea una imagen.
	splitItem = null;//Para quitar el "img/"
    switch(index){//Dependiendo del indice
        case 0:
            letra = "a";
            break;
        case 1:
            letra = "b";
            break;
        case 2:
            letra = "c";
            break;
        case 3:
            letra = "d";
            break;
    }
	if(compItem){//Ay imagen
		// contItem = "<img src = '"+item+"'>";
		splitItem = item.split("/");
		contItem = splitItem[1]
		// console.log(contItem);
		$($(".d_contegrlevarespuestas")[($(".d_contegrlevarespuestas").length-1)]).append(" <div class='d_contegrlevarespuesta d_res"+noPreg+"'> <div class='d_contegrlevarespuestabullet'> <div class='d_contegrlevarespuestabulletin'>"+letra+"</div> </div> <div class='d_contegrlevarespuestatxt d_contegrlevarespuestaimg "+contItem+"'></div> </div>");
	}else{//Es texto
		contItem = item;
		$($(".d_contegrlevarespuestas")[($(".d_contegrlevarespuestas").length-1)]).append(" <div class='d_contegrlevarespuesta d_res"+noPreg+"'> <div class='d_contegrlevarespuestabullet'> <div class='d_contegrlevarespuestabulletin'>"+letra+"</div> </div> <div class='d_contegrlevarespuestatxt'>"+contItem+"</div> </div>");
	}
    
}

function compruebaItem(itemR){
	/*
	* NOMBRE: compruebaItem
	* UTILIDAD: Comprueba que el item que se recibe contenga una extension de imagen.
	* ENTRADAS: itemR > cadena
	* SALIDAS: Valos false o true
	*/
	arItem = itemR.split("/");
	// arExtensiones = ["png","jpg","svg"];
	// arExtensiones.forEach(function(item){//Para cada formato de imagenes
	// 	if(arItem.indexOf(item) != -1){
	// 		contaItem++
	// 	}
	// });
	if(arItem.length == 2){
		return true;
	}else{
		return false;
	}
}



function muestraRespuestas(){//El contenido de esta funcion debe ser definido por cada programador, en cada rutina
	contaPreg = 0;
	contaRes = 0;
	contadorBien = 0;
	$("#formInput").find("input").each(function(index){
		contentRes = null;
		valorInput = $(this).val().split("_");
		claseNueva = "";
		letraRes = null;
		if(valorInput[0] == "Preg"){//Agrega la pregunta
			contaPreg++;
			contaRes = 0;
			$("#conteTexto").append('<div class="d_opcion"><div class="d_pregunta"><table class="d_preguntanum"><tr><td>'+contaPreg+'</td></tr></table><table class="d_preguntatxt"><tr><td>'+obtenRespCompleta(valorInput)+'</td></tr></table></div>');
			arrayBancoInputs.push(obtenRespCompleta(valorInput));			
		}else{//Agrega las respuestas
			switch(contaRes++){
				case 0:
					letraRes = "a";
					break;
				case 1:
					letraRes = "b";
					break;
				case 2:
					letraRes = "c";
					break;
				case 3:
					letraRes = "d";
					break;
			}
			if(valorInput[0].length == 6){//Fue seleccionada
				if(valorInput[0].split("")[4] == "R"){
					claseNueva ="d_contegrlevarespuesta_bien";
					contadorBien++
				}else{
					claseNueva ="d_contegrlevarespuesta_mal";
				}
				
			}
			if(compruebaItem(obtenRespCompleta(valorInput))){
				contentRes = "<img src = '"+obtenRespCompleta(valorInput)+"'/>";
			}else{
				contentRes = obtenRespCompleta(valorInput);
			}
			$($(".d_opcion")[(contaPreg-1)]).append('<div class="d_respuesta d_res'+contaPreg+' '+claseNueva+'"><table class="d_respuestavineta"><tr><td>'+letraRes+'</td></tr></table> <table class="d_respuestatxt"><tr><td>'+contentRes+'</td></tr></table></div>');
		}
	});
	if(contadorBien < totalPreguntas){
		activarBtn("#idSolucion");
		tmpItms = [];
		arrayBancoInputs.forEach(function(itmPregta, indexPreg){
			arBancoPregs.forEach(function(itm, index){
				if(itm.pregunta == itmPregta)	{
					tmpItms.push(itm);
				}
			});
		});
		arBancoPregs = tmpItms;
		tmpItms = null;
	}
}

function obtenRespCompleta(valorIn){
	cadena = "";
	valor = 0;
	if(isNaN(valorIn[1])){//Es cadena
		valor = 1;
	}else{//es no
		valor = 2;
	}
	valorIn.forEach(function(item, index){
		if(index >= valor){
			if(cadena ==""){
				cadena = item;
			}else{
				cadena = cadena+"_"+item;
			}
		}
	});
	return cadena;
}