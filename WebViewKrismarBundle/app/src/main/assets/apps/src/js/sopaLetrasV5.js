/***********************************************************************************
*                           *.*.*.*.*.*.* RUTINA SOPA DE LETRAS V5*.*.*.*.*.*.* 
*************************************************************************************/
/***********************************************************************************
* 
*                            *.*.*.*.*.*.* VARIABLES GLOBALES*.*.*.*.*.*.* 
*
*************************************************************************************/
var bandRetro = 0;//Bandera para saber si esta en retroalimentación
var colorLine = null;//Color de la linea a pintar
var bandCrono = true;//Bandera para no/seguir el conteo del cronometro
var divConte = ".d_cuadroCrucigrama"//Contenedor del crucigrama
var numPosId = [];//arreglo de las posibles filas
var arIds = [];//Contendrá los 2 id del div del principio y fin de una palabra
var arIdOn = [];
var bandSent = null;
var contadorLines = 0;//contador de núm de lineas marcadas
var terminaCont = false;//bandera del tiempo
var dirTiempoCrono = null;//Almacena la dirección del proceso que cuenta el tiempo
var numAciertos = 0;//contador de num de aciertos
var numErrores = 0;//contador de num de errores
var tmpSolucion = null;
var minutoAct = 0;
var segundoAct = 0;
var numPorc = 0;
var gradosGira = 0;
/*************************************************************************************
*
* 					*.*.*.*.*.*.* FUNCIONES Y PROCEDIMIENTOS*.*.*.*.*.*.* 
*
**************************************************************************************/
function evaluaActividad(){
	//INTERFAZ RED
	//NOMBRE: evaluarActividad.
	//UTILIDAD: Evalua las soluciones en la actividad.
	//ENTRADAS: Ninguna.
	//SALIDAS: Ninguna.
	/*********VARIABLES*********/
	var aciertosEval = 0;
	var erroresEval = 0;
	var porcPar = 0;
	/******************************/
	detieneCronometro();
	stopCrono();
	$(".d_inputOn").off("click").css("cursor","default");//Removemos los eventos a las letras
	$(".d_input").off("click").css("cursor","default");//Removemos los eventos a las letras
	$(".d_leyenda").fadeOut();//Desaparece el div con el anuncion de fin de tiempo
	addEval();//Agrega el color de eval mal

	aciertosEval+= numAciertos;//agrega los aciertos
	erroresEval = numPalabras-numAciertos;//agrega los errores
	
	aciertos+=aciertosEval;//agrega los aciertos correctos
	errores+=erroresEval;//agrega los errores

	porcPar = parseInt((100*aciertos)/(aciertos+errores));//realiza el calculo para saber el porcentaje
	
	if(aciertosEval==numPalabras){//compara si el porcentaje es mayor de 75
		//fillBarBien();//si es mayor agrega bien
	}else{
		//fillBarMal();//si es menor agrega mal
		/********VER SOLUCIÓN*******/
		activarBtn("#idSolucion");
		$("#idSolucion").addClass("solution");
		/*********************************/
	}
	
	(porcPar >= 75) ? fillBarBien() : fillBarMal();
	evaluaDefault();
}

function evaluarAct(){
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
	$(".d_input").off("click").css("cursor","default");//Removemos los eventos a las letras
	$(".d_leyenda").fadeOut();//Desaparece el div con el anuncion de fin de tiempo
	addEval();//Agrega el color de eval mal
	
	aciertosEval+= numAciertos;//agrega los aciertos
	numErrores = numPalabras-numAciertos;//agrega los errores
	
	aciertos+=aciertosEval;//agrega los aciertos correctos
	errores+=numErrores;//agrega los errores
	
	porcPar = (100*aciertos)/(aciertos+errores);//realiza el calculo para saber el porcentaje
	if(porcPar>=75){//compara si el porcentaje es mayor de 75
		fillBarBien();//si es mayor agrega bien
	}else{
		fillBarMal();//si es menor agrega mal
		/********VER SOLUCIÓN*******/
		activarBtn("#idSolucion");
		$("#idSolucion").addClass("solution");
		/*********************************/
	}
	evaluaDefault();
}

function verSolucionCorr(){
	/*
	* NOMBRE: verSolucionCorr
	* UTILIDAD: Muestra la solución correcta de un ejercicio.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	* VARIABLES 
	**************/
	/*************/
	
	desactivarBtn("#idSolucion");
	$(".d_input").off("click").css("cursor","default");//Removemos los eventos a las letras
	$(".d_inputOn").off("click").css("cursor","default");//Removemos los eventos a las letras
	$("."+claseEvalMal).attr("mal","mal");//agrega atributo a los elementos que estan mal
	$("."+claseEvalMal).addClass(claseEvalBien);//agrega la clase bien
	$("."+claseEvalBien).removeClass(claseEvalMal);//remueve al clase mal
	
	if(bandRetro == 0){//si se trata de retroalimentación
		$(".prueba").attr("existe",1);//agrega atributo
		retroAlimenta();//función para pintar lineas
	}else{
		$(".prueba").show();//muestra todas las lineas
	}
	
	tmpSolucion = setTimeout(function(){
		activarBtn("#idSolucion");
		var cantidad = $(".prueba").size();//cuenta todos los elementos que marcan las palabras en el crucigrama
		var arElimBien = [];
		var arElimina = [];
		
		
		for(g = 0;g<cantidad;g++){
			if($($(".prueba").get(g)).attr("existe") == undefined){//si no tiene el atributo
				$($(".prueba").get(g)).hide();//oculta los elementos
			}
		}
		for(y = 0;y<cantidad;y++){
			var objeto = $("."+claseEvalBien).get(y);//obtiene todos los elementos con la clase bien
			if($(objeto).attr("mal") == "mal"){//si tiene el atributo mal
				arElimBien.push($(objeto));
			}
		}
		for(k = 0;k<arElimBien.length;k++){
			arElimBien[k].addClass(claseEvalMal);//agrega clase mal
			arElimBien[k].removeClass(claseEvalBien);//remueve la calse bien
		}
	},noSegundoRetro);
}

function addEval(){
	for(e=1;e<=arPalabras.length;e++){//Recorro el vector de las palabras con significado
		if($("#palabra"+e).attr("eval") != "bien"){//si el eval es diferente de bien
			$(elementosAgregaEval+e).addClass(claseEvalMal);//agrega la clase mal
		}
	}	
}

function siguienteActividad(){
	/*INTERFACE RED
	* NOMBRE: siguienteActividad.
	* UTILIDAD: Cambia al siguiente ejercicio.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/	
	siguienteDefault();
	arPalabras = [];//reinicia variables 
	numAciertos = 0;
	aciertosEval = 0;
	numErrores = 0;
	bandRetro = 0;
	$(".d_contenido").html(htmlInicio);//agrega el html inicial
	$(".prueba").remove();//quita todas las lienas pintadas
	generarPalabras();//agrega las generación de palabras
	creaSopa();//crea de nuevo la sopa
}

function siguienteAct(){
	//INTERFACE HAB
	/* NOMBRE: siguienteAct.
	* UTILIDAD: Genera el siguiente ejercicio de la actividad.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	siguienteDefault();
	arPalabras = [];//reinicia variables 
	numAciertos = 0;
	aciertosEval = 0;
	numErrores = 0;
	bandRetro = 0;
	$(".d_contenido").html(htmlInicio);//agrega el html inicial
	$(".prueba").remove();//quita todas las lienas pintadas
	generarPalabras();//agrega las generación de palabras
	creaSopa();//crea de nuevo la sopa
}
/*************************************************************************************
*
* 	*.*.*.*.*.*.* FUNCIONES Y PROCEDIMIENTOS DE LA RUTINA*.*.*.*.*.*.* 
*
**************************************************************************************/
function creaSopa(){
    /*
    * NOMBRE: creaSopa
    * UTILIDAD: Genera cuadricula e invoca función que agrega las palabras a la sopa de letras
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna
	*/
    /***** VARIABLES********/
	var arNewPal = [];//almacena las palabras que se van a mostrar
    /**************************/
	$("#significado").text("Da clic en la primera y última letra de la palabra que ubicaste.").addClass("pulse");//agrega texto
	minutoAct = minuto;
	segundoAct = segundo;	
	$("#conteTiempo").text("00:"+"0"+(minutoAct+1)+":"+"00");//Se añade el tiempo inicial
	startCrono();//comienza el tiempo
	
    for(i =0 ;i<arPalabras.length;i++)
        arNewPal.push(arPalabras[i][0]);//almacena las palabras
	
	
	for(k=0; k<=medidasSopaFilas; k++)
		numPosId.push(k);//almacena las filas a crear
	 
	addCuadros();//Añade las filas y renglones
    addPalabras(arNewPal);//Añade las palabras en 8 diferentes sentidos(aleatorios)  
    addLetrasDis();//agrega las letras distractores
}

function addCuadros(){
    /*
    * NOMBRE: addCuadros
    * UTILIDAD: Añade las filas y los renglones
    * ENTRADAS: Recibe la clase o el id del div que va a contener la cuadricula
    * SALIDAS: Ninguna
    * VARIABLES************/
    var i = 1;//Contador
    /**********************/
    $("#conteCuadro").append("<div class = 'd_cuadroCrucigrama'></div>");//Se agrega el contenedor
    do{
        $(".d_cuadroCrucigrama").append("<div class = 'fila' id = 'idFila"+i+"'></div>");//Se añaden las filas
        i++;
    }while(i<medidasSopaFilas+1);
	
	numPorc = 100/medidasSopaColumnas;
	
     for(e = 1;e<medidasSopaColumnas+1;e++){
        for(r = 1;r<medidasSopaColumnas+1;r++){	
            $("#idFila"+e).append("<div class='d_inputOn'  id = 'idInputOn"+e+"ren"+r+"'><table class = 'd_input' id = 'idFila"+e+"ren"+r+"'><tr><td></td></tr></table></div>");//Se añaden los renglones
        }
    }
	
	$(".d_inputOn").css("width",numPorc+"%");
    $(".d_inputOn").click(function(){
        validaPalabra($(this).attr("id"));//agrega evento para validar la palabra
    });
}

function addPalabras(arPalabras){
    /*
    * NOMBRE: addPalabras
    * UTILIDAD: Añade las palabras en el vector
    * ENTRADAS: Recibe el vector con palabras
    * SALIDAS: Ninguna
    * VARIABLES*************/
    var vectorPal = arPalabras;//Contiene las palabras
    /***********************/
    do{
        var palabra = null;//Será una sola palabra
        if(vectorPal.length != 0){//Si el vector tiene una o más palabras
            palabra = vectorPal[0];//Recupero la palabra
            addPal(palabra);//Invoco la función que agrega la palabra
            vectorPal.splice(0,1);//Elimino la palabra ya que ha sido agregada
        }
    }while(vectorPal.length != 0);
}

function addPal(palabra){
    /*
    * NOMBRE: addPal
    * UTILIDAD: Agrega la palabra
    * ENTRADAS: Recibe la palabra para agregar
    * SALIDAS: Ninguna
    * VARIABLES************/
    var idInput = null;//Será el id del input
    var valorInput = null;//Valor del input donde comenzará la palabra
    var sentido = null;//Sera el sentido en el que se agregará la palabra
    var arSentidos = [1,2,3,4,5,6,7,8];//Indices para los sentidos posibles
    //var arSentidos = [7];//Indices para los sentidos posibles
    palabra = palabra.toLocaleUpperCase();
    /**********************/
    //1, izquierda-derecha appendId
    //2, derecha-izquierda appendDi
    //3, ariba-abajo appendArAb
    //4, abajo-arriba appendAbAr
    //5, diagonal, izquierda-derecha, arriba-abajo appendDidArAb 
    //6, diagonal, derecha-izquierda, abajo-arriba appendDdiAbAr
    //7, diagonal, derecha-izquierda, arriba-abajo appenDdiArAb
    //8, diagonal, izquierda-derecha, abajo-arriba appenDdiArAb
    do{
        idInput = getIdInput();//Obtengo un id aleatorio
        if($(idInput).text() == ""){//Si el valor de ese input esta vacío
            valorInput = 0;
        }else{//Si esta ocupado
            valorInput = 1;
        }
    }while(valorInput != 0); 
     
    arSentidos = arSentidos.sort(function(){return Math.random()-0.5});
    sentido = arSentidos[0];
    switch(sentido){
        case 1:
            appendId(palabra,numFila,numCol,"id");
            break;
        case 2:
            appendId(palabra,numFila,numCol,"di");
            break;
        case 3:
            appendId(palabra,numFila,numCol,"ArAb");
            break;
        case 4:
            appendId(palabra,numFila,numCol,"AbAr");
            break;
        case 5:
            appendId(palabra,numFila,numCol,"DidArAb");
            break;
        case 6:
            appendId(palabra,numFila,numCol,"DdiAbAr");
            break;
        case 7:
            appendId(palabra,numFila,numCol,"DdiArAb");
            break;
        case 8:
            appendId(palabra,numFila,numCol,"DdiAbAb");
            break;
    }    
}

function getIdInput(){
    var idInput = null;
    numPosId = numPosId.sort(function(){return Math.random()-0.5});//revuelve los id disponibles
    numFila = numPosId[0];
    numPosId = numPosId.sort(function(){return Math.random()-0.5});//revuelve los id disponibles
    numCol = numPosId[0];
    idInput = "#idFila"+numFila+"ren"+numCol;//elige según las filas y columnas
    return idInput;
}

var numFila = null;
var numCol = null;

function appendId(palabra,noFila,noCol,sentido){
  //Agrega de izquierda a derecha
    var longPal = palabra.length;//Longitud de la palabra
    var arPalabra = palabra.split("");//Separo la palabra en un vector
    var contaCol = noCol;//Comienzo de la columna
    var i = 0;//Contador
    var vectorCuadritos = [];//Contendra los inputs en donde se va a agregar una letra
    var cuadrito = null;
    if(sentido == "ArAb" || sentido == "AbAr" || sentido == "DidArAb" || sentido == "DdiAbAr"|| sentido == "DdiArAb" || sentido == "DdiAbAb"){
        var contaFila = noFila
    }
    do{
        if(sentido == "ArAb" || sentido == "AbAr"){//Si el sentido es arriba-abajo o viceversa
            cuadrito = $("#idFila"+contaFila+"ren"+noCol);//Es el cuadrito donde se va a agregar una letra
        }else if(sentido == "DidArAb" || sentido == "DdiAbAr" || sentido  == "DdiArAb" || sentido  == "DdiAbAb"){//Si el sentido es diagonal-arriba-abajo
            cuadrito = $("#idFila"+contaFila+"ren"+contaCol);//Es el cuadrito donde se va a agregar una letra
        }else{//Si el sentido es izquierda-derecha, o viceversa
            cuadrito = $("#idFila"+noFila+"ren"+contaCol);//Es el cuadrito donde se va a agregar una letra
        }
        if($(cuadrito).text() == "" && $(cuadrito).length != 0){//Si el cuadrito está vacio
            
            vectorCuadritos.push($(cuadrito));//Se agrega este input al vector
            
        }else if($(cuadrito).text() == arPalabra[i] && $(cuadrito).length != 0){//Si el cuadrito tiene la misma letra que la que se va a agregar
            vectorCuadritos.push($(cuadrito));//Se agrega este input al vector
        }else{//Si no esta vacío o no tiene la misma letra, se debe cambiar de ubicación
            i = longPal;
            vectorCuadritos = [];
            addPal(palabra)
        }
        i++
        if(sentido == "id"){//Este sentido las agrega de izquierda a aderecha
            contaCol++
        }else if(sentido == "di"){//Este sentido las agrega de derecha a izquierda
            contaCol--
        }else if(sentido == "ArAb"){
            contaFila++
        }else if(sentido  == "AbAr"){
            contaFila--
        }else if(sentido == "DidArAb"){
            contaFila++
            contaCol++
        }else if(sentido == "DdiAbAr"){
            contaFila--
            contaCol--
        }else if(sentido == "DdiArAb"){
            contaCol--
            contaFila++
        }else if(sentido == "DdiAbAb"){
            contaCol++
            contaFila--
        }
    }while(i<longPal);
    //Al terminar el ciclo while, se agregan las letras en cada input recuperado
    for(o = 0;o<arPalabra.length;o++){
        var letra = arPalabra[o];//Se obtiene una letra de la palabra
        var lugar = vectorCuadritos[o];//Se obtiene el lugar que ocupará la letra
        $(lugar).find("td").text(letra);//Se agrega la letra a dicho lugar
        if(o == 0){
            $(lugar).attr("p",arPalabra.join(""));
        }else if(o == arPalabra.length-1){
            if($(lugar).attr("p") != undefined){
                var otraResp = $(lugar).attr("p");
                $(lugar).attr("p",arPalabra.join("")+","+otraResp);
            }else{
                $(lugar).attr("p",arPalabra.join(""));
            }  
        }
    }
}

function addLetrasDis(){
    /*
    * NOMBRE: addLetrasDis
    * UTILIDAD: Agrega letras aleatoriamente en espacios vacios
    * ENTRADAS: Ninguna
    * SALIDAS:Ninguna
    * VARIABLES************/
    var arLetras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z","Á","É","Í","Ó","Ú"];//Abecedario y vocales con acento
    /**********************/
    for(i = 0;i<$(".d_input").length;i++){//Recorro cada cuadrito  
        var objeto = $(".d_input").get(i);//Obtengo cada uno 
        var letra = $(objeto).text();//Obtengo el texto
        arLetras = arLetras.sort(function(){return Math.random()-0.5});//Mezclo el abecedario
        if(letra == ""){//Si el espacio está vacío
            $(objeto).find("td").text(arLetras[0]);//Agrego una letra aleatoriamente
        }     
    }
}

function validaPalabra(id){
	/*
    * NOMBRE: validaResp
    * UTILIDAD: Valida si la palabra que se seleccionó es correcta
    * ENTRADAS: Recibe el id y el atributo p del div con el mismo id
    * SALIDAS: Ninguna
    * VARIABLES************/
    //Ninguna
    /**********************/
	arIdOn.push([$("#"+id).attr("id")]);//Se insertan en un vector
    arIds.push([$("#"+id).find("table").attr("id"), $("#"+id).find("table").attr("p")]);//Se insertan en un vector
    for(i = 0;i<arIds.length;i++){//Se recorre el vector de ids
        var ids = arIds[i];//Se recupera el id
        var id = ids[0];//Se recupera el otro id
        $("#"+id).css({"font-weight":"bold"});//Se coloca negritas la primera letra seleccionada
    }
    if(arIds.length == 2){//Si ya se seleccionaron 2 ids
        califica(arIds, arIdOn);//Se invoca la función que califica
        arIds = [];//Se limpia el div de los ids
        arIdOn = [];//Se limpia el div de los ids
    }
}

function califica(vector, vector1){
    /*
    * NOMBRE: califica
    * UTILIDAD: Califica una palabra correcta o incorrecta
    * ENTRADAS: Ninguna
    * SALIDAS: Ninguna
	*/
	/*********** VARIABLES************/
    //Se declararon con estos nombres debido a que existen 2 id y 2 palabras para comparar
    var id1 = vector[0][0];//Id1
    var palabra1 = vector[0][1];//Palabra 1
    var id2 = vector[1][0];//Id2
    var palabra2 = vector[1][1];//Palabra2
	var id1a = vector1[0][0];//Id1
    var id2b = vector1[1][0];//Id2
    /***********************************/
    $(".d_input").removeAttr("style");//Se remueve el atributo style, de esta manera se quitan las letras negritas
    if(palabra1 == palabra2 && palabra1 != undefined && palabra2 != undefined && id1 != id2){// Si las palabras son iguales, diferentes a undefined y los id tambien diferentes
        //Remueven los atributos p
		$("#"+id1).removeAttr("p");
		$("#"+id2).removeAttr("p");
		if(bandRetro == 0){
			if(numInterfaz == 1){
				activarBtn("#btnEvaluarActividad");//Se activa el btn para evaluar
			}else{
				activarBtn("#btnEvaluar");//Se activa el btn para evaluar
			}
		}
		muestraSigni(palabra1);//Muestra el significado
		trazaLinea(id1,id2,id1a,id2b,palabra1);//Traza la linea
        }else if(id1 == id2){//Si se selecciona la misma letra
        }else{
            if(palabra1 != undefined && palabra2 != undefined){//Si las palabras son diferentes de undefinded
                var vectorPalabra1 = palabra1.split(",");//Vector con las palabras del atributo P
                var vectorPalabra2 = palabra2.split(",");//Vector con las palabras del atributo P
                var pal = null;//Palabra sola
                var vectorReal = null;//Vector con más de una palabra
                if(vectorPalabra1.length == 2 || vectorPalabra2.length == 2){
                    if(vectorPalabra1.length == 2){
                        vectorReal = vectorPalabra1
                        pal = vectorPalabra2[0];
                    }else if(vectorPalabra2.length == 2){
                    vectorReal = vectorPalabra2;
                    pal = vectorPalabra1[0];
					}
                      
					for(j = 0;j<vectorReal.length;j++){
                        var word = vectorReal[j];
						 if(word == pal){
							j = vectorReal.length;
							muestraSigni(word);	
							trazaLinea(id1,id2,id1a,id2b,palabra1);//Traza la linea
							compruebaRem(id1,word)
							compruebaRem(id2,word)
							
							function compruebaRem(id,word1){
								var atrP = $("#"+id).attr("p").split(",");
								var newP = null;
								$("#"+id).removeAttr("p");
								if(atrP.length > 1){
									var pos = atrP.indexOf(word1);
									atrP.splice(pos,1);
									$("#"+id).attr("p",atrP[0]);
								}
							}
						}
					}       
				}
            }else{
				$("#significado").removeClass("pulse").text("");
                $("#significado").text("No formaste ninguna palabra");
                $("#significado").removeAttr("style");
                playIncorrecto();
            }
        }
}

function muestraSigni(palabra){
    /*
    * NOMBRE: showSig
    * UTILIDAD: Muestra el significado de una palabra
    * ENTRADAS: Recibe la palabra
    * SALIDAS: Ninguna
    * VARIABLES************/
    //Ninguna
    /**********************/
    for(i = 0;i<arPalabras.length;i++){//Se recorre el vector de las palabras
        var pal = null;//Será la palabra
        pal = arPalabras[i][0].toUpperCase();//Palabra convertida a mayuscula
        if(pal==palabra){//Si se encuentra la misma palabra
            if(bandRetro == 0){//Si no esta retroalimentado
                $("#significado").text(arPalabras[i][2]);//Se muestra el significado
                //Se dejo este código comentado en caso de necesitar que se borre solo el significado de las palabras
                setTimeout(function(){
                    $("#significado").fadeOut(function(){//Desaparece el significado
                        $(this).text("");
                        $("#significado").fadeIn();  
                    });
                },5000); 
                i = arPalabras.length;
            }
        }
    }
   
   for(e=1;e<=arPalabras.length;e++){//Recorro el vector de las palabras con significado
		var palOp = $("#palabra"+e).text().toUpperCase();//Obtengo el texto en mayusculas
        if(palOp == palabra){//Si la palabra que encontre es la misma a la de la opción
            //console.log(elementosAgregaEval+e)
			$(elementosAgregaEval+e).addClass(claseEvalBien);
			$("#palabra"+e).attr("eval","bien");
			colorLine = $("#palabra"+e).css("color");//Obtengo el color de la linea
			e = arPalabras.length;//termina el ciclo
		}
	}
}

function trazaLinea(id1,id2, id1a,id2b,palabra){
        //Primero debemos saber cual va a ser el id1 y el id2
        var arOrden = getOrden(id1,id2,id1a,id2b);
        var distRecta = 0;//Distancia de la recta
        //Id 1 y 2 ordenados
        var ide1 = arOrden[0];
        var ide2 = arOrden[1];

        /*Coordenadas para el calculo de la distancia de la recta*/
        var x1 = $("#"+ide1).position().left;//calcula left y top de cada letra inicio y final de palabra
        var y1 = $("#"+ide1).position().top;
        var x2 = $("#"+ide2).position().left;
        var y2 = $("#"+ide2).position().top;	

        var anchoT = $(divConte).width();
        var altoT = $(divConte).height();
		
        var margUp =((100*$("#"+ide1).position().top)/altoT);
        var margLef = ((100*$("#"+ide1).position().left)/anchoT);

		$("#significado").removeClass("pulse").text();
		$("#significado").removeAttr("style");
        $(divConte).before("<div class = 'prueba' id = 'idLinea"+contadorLines+"'></div>");//agrega el elemento 
		
        //Calculando la distancia de la recta
        distRecta = Math.sqrt((Math.pow((x2-x1),2))+(Math.pow((y2-y1),2)));
        //Convierto la distancia de la recta a %
        distRecta = ((100*distRecta)/anchoT)+numPorc;

		var mAB = null;
		var angAB = null;
		
		//Obteniendo la m y el angulo de inclinacion
		mAB = ((y2-y1)/(x2-x1));
	
		//Obteniendo el angulo de inclinación
		//angAB = ((180*Math.atan(mAB))/ Math.PI)+gradosGira;
		angAB = ((180*Math.atan(mAB))/ Math.PI);
		//Caclculando el top

		
		if(bandRetro != 0){
			$("#idLinea"+contadorLines).css({"position":"absolute","top":(margUp)+"%","left":margLef+"%","width":distRecta+"%"});//si no es retro
		}else{
			$("#idLinea"+contadorLines).transition({"position":"absolute","top":(margUp)+"%","left":margLef+"%","width":distRecta+"%"});//si es retro
        }
        $("#idLinea"+contadorLines).css("background-color",colorLine);//agrega el color de la liena marcada
		

		if(bandSent == 1){
			$("#idLinea"+contadorLines).css({"top":(margUp-2.9)+"%","left":margLef+3.5+"%"});//si no es retro
			$("#idLinea"+contadorLines).css({"transform":"rotate("+angAB+"deg)" , "transform-origin":"left"}); 
		}else if(bandSent == 2){
			$("#idLinea"+contadorLines).css({"top":(margUp-2)+"%","left":margLef+2+"%"});//si no es retro
			$("#idLinea"+contadorLines).css({"transform":"rotate("+angAB+"deg)" , "transform-origin":"left"}); 
		}else if(bandSent == 3){
			$("#idLinea"+contadorLines).css({"top":(margUp-2)+"%","left":margLef+6+"%"});//si no es retro
			$("#idLinea"+contadorLines).css({"transform":"rotate("+(angAB-180)+"deg)" , "transform-origin":"left"}); 
		}

		if(bandRetro == 0){
			playCorrecto();
			if(bandCrono == true){
				numAciertos++
				if(numAciertos == arPalabras.length){//compara el num de aciertos
					$(".d_cuadroCrucigrama").css("z-index","0");
					detieneCronometro();
					stopCrono();
					if(numInterfaz == 1){//según la interfaz manda llamar
						evaluaActividad();
					}else{
						evaluarAct();
					}
					$(".d_input").off("click").css("cursor","default");//descativa el click de las letras
				}
			}
		}
		
        setTimeout(function(){
            contadorLines++;
        },200);
    }
	
function getOrden(id1,id2 , id1a,id2b){//obtiene el orden para pintar la linea
        var noFila1 = getFilaRen(id1,1);
        var noFila2 = getFilaRen(id2,1);
        var noRen1 = getFilaRen(id1,2);
        var noRen2 = getFilaRen(id2,2);
        var arId = [];
		var arIdDia = [];
        if(noFila1 == noFila2){
            bandSent = 0; 
            if(Number(noRen1)>Number(noRen2)){
                arId = [id2b,id1a];
            }else{
                arId = [id1a,id2b];
            }
        }else if(noRen1 == noRen2){
            bandSent = 1;
            if(Number(noFila1)>Number(noFila2)){
                arId = [id2b,id1a];
            }else{
                arId = [id1a,id2b];
            }
        }else{
            if(Number(noFila1)>Number(noFila2)){
                arId = [id2b,id1a];
				arIdDia = [id2,id1];
            }else{
                arId = [id1a,id2b];
				arIdDia = [id1,id2];
            }
			
            var renglon1 = arIdDia[0].split("a")[1].split("r")[1].split("n")[1];
            var renglon2 = arIdDia[1].split("a")[1].split("r")[1].split("n")[1];
            if(Number(renglon1)>Number(renglon2)){
                bandSent = 3;//diagonal a la izquierda
            }else{
                bandSent = 2;//diagonal a la derecha
            }
        }
        return arId;
    }
	
function getFilaRen(id,no){
        var fila = id.split("a")[1].split("r")[0];//obtiene el numd e fila
        var renglon = id.split("a")[1].split("r")[1].split("n")[1];//obtiene el num de renglones
        if(no == 1){
             return fila;
        }else{
             return renglon;
        }
}
  
function retroAlimenta(){
    /*
    * NOMBRE: retroAlimenta
    * UTILIDAD: Muestra las palabras que faltarón por encontrar
    * ENTRADAS: Ninguna
    * SALIDAS: Ninguna
    * VARIABLES************/
    var objId = [];//Vector para los id de las letras de inicio y fin
    var conta = 0;//Contador para saber si se encontraron resultados
    /**********************/
	bandRetro = 1;
    $(".d_leyenda").fadeOut();//Desaparece el div con el anuncion de fin de tiempo
    $(".d_input").off("click").css("cursor","default");//Removemos los eventos a las letras
    for(i = 0;i<$(".d_input").length;i++){//Recorremos los divs con letras
        var objeto = $(".d_input").get(i);//Recupero cada div individualmente
        var atrP = $(objeto).attr("p");//Obtengo su atributo p
        arIds = [];//Se debe limpiar este vector para que se le inserten 2 id
        if(atrP != undefined){//Si el atributo p esta definido
            recuperaId($(objeto).attr("id"),i);//Se busca el otro id donde termina la palabra
            i = $(".d_input").length;//termina el ciclo
            conta++//Incrementa
        }            
    }
    if(conta != 0){//Si se encontraron ids
        sendLinea();//Se invoca la función que pinta la linea
    }
    function sendLinea(){
        /*
        * NOMBRE: sendLinea
        * UTILIDAD: Invoca la función para pintar lineas y activa la bandera de retroalimentación
        * ENTRADAS: Ninguna
        * SALIDAS: Ninguna
        * VARIABLES************/
        //Ninguna
        /**********************/
        bandRetro = 1;//Activa bandera
        validaPalabra($("#"+objId[0][0]).parent().attr("id"));//Es como si diera click a un cuadrito
        validaPalabra($("#"+objId[0][1]).parent().attr("id"));//Es como si diera click a un cuadrito
        setTimeout(function(){
			if(bandRetro ==1){
				retroAlimenta();
			}
           
        },500);//Se invoca la función de retroalimentación 
    }
    function recuperaId(atrId,no){
        /*
        * NOMBRE: recuperaId
        * UTILIDAD: Recupera un id con un atributo p igual a otro
        * ENTRADAS: Recibe el id del que va a obtener el atributo y el no desde donde empieza a buscar
        * SALIDAS: Ninguna
        * VARIABLES************/
        var obj = null;
        var atrP = null;
        /**********************/
        for(p =(no+1);p<$(".d_input").length;p++){//Recorre los cuadritos
            obj = $(".d_input").get(p);//Obtiene individualmente
            atrP = $(obj).attr("p");//Recupera su atributo p
            if(atrP == $("#"+atrId).attr("p")){//Si los atributos son iguales
                objId.push([atrId,$(obj).attr("id")]);//Se inserta en el vector de los id
                p = $(".d_input").length;//Se finaliza el ciclo 
            }
        }
    } 
}

function startCrono(){
	/*
	 * NOMBRE: iniciaCronometro.
	 * UTILIDAD: Inicia el cronómetro de la actividad.
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	dirTiempoCrono = setInterval(tiempoCal,1000);//Se sigue contando el tiempo
}

function tiempoCal(){
	/*
	* NOMBRE: tiempoPandilla.
	* UTILIDAD: Aumenta las variables que simulan el cronometro.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
    var obj = $("#conteTiempo");
	segundoAct--;
	if(segundoAct == 0 && terminaCont == false){//Si ya se alcanzaron los 60 segundos que forman el minuto
		segundoAct = 60;//Se resetea el valor de los segundos
		minutoAct--;//Se adiciona uno al contador de minutos
	}
	
	if(minutoAct == 0){
		if(segundoAct <= 9){
			if(segundoAct == 0){
				detieneCronometro();
				obj.html("00:0"+minutoAct + ":" + "0" + segundoAct)
				//setTimeout("stopCrono()",1000);
				stopCrono();
				 if(aciertos == arPalabras.length){//Si los aciertos son todos
                        playCorrecto();
                    }else{//Si se equivoco en alguno
                        $(".d_cuadroCrucigrama").css("z-index","0");//Se cambia el z-index
                        playIncorrecto();
                        $(".d_leyenda").slideDown();//Muestra el anuncio de fin de tiempo
						activarBtn("#btnEvaluarActividad");
                        //activarBtn("#btnEvaluarActividad","retroAlimenta()");//Se activa el btn para evaluar
                    }
			}else if(segundoAct == 1){
				terminaCont = true;
				
				obj.html("00:0"+minutoAct + ":" + "0" + segundoAct);
			}else{
							
				obj.html("00:0"+minutoAct + ":" + "0" + segundoAct);
			}
		}else{//los minutos son mayores a 10
			obj.html("00:0"+minutoAct + ":" + segundoAct);
		}
           obj.addClass("pulseReloj");//Se agrega la clase para la animación del relog
       }else{
		if(segundoAct <= 9){
			obj.html("00:0"+minutoAct + ":" + "0" + segundoAct);
		}else{//los minutos son mayores a 10
			obj.html("00:0"+minutoAct + ":" + segundoAct);
		}
	}
}

function stopCrono(){
	/* NOMBRE: detieneCronometro.
	 * UITLIDAD: Detiene el cronómetro de la actividad.
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	clearInterval(dirTiempoCrono);//Detenemos el tiempo global
}