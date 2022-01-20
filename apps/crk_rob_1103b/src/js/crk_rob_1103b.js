/***********************************************************************************
* 
*                                    CONSTANTES
*
*************************************************************************************/
//Path de ubicación de imágenes
var PREFIJO = IP+"src/img/crk_rob_1103b_";//Almacena parte de la ruta donde se ubican los archivos de imagen
var TOTACTIVIDADES = 3;//Almacena el total de actividades, definelo

var HAYNIVEL = false;//Indica si existe o no nivel en la aplicación para mostrar/ocultar icono
var HAYVELAPP = false;//Determina si la aplicación requiere fijar velocidad de ejecución (definela)

var NIVEL = 5;//Define el nivel de tu actividad
var MAXDIGIT = 2;//Es el tope de escritura de digitos en los divs
/***********************************************************************************
* 
*                                    VARIABLES GLOBALES
*
*************************************************************************************/
var htmlInicio;//almacena el html de la actividad sin contestar para borrar
var tmpSolucion;

var arrRobots = [
      [1,"articulados",1,2,3],
      [2,"móviles",4,5,6],
      [3,"androides",7,8,9],
      [4,"zoomórficos",10,11,12],
      [5,"híbridos",13,14,15],
];
var arrSeleccion = [];
var numImgSeleccion = 0;
/*******RUTINA DE LOCAL STORAGE*******/
var arrAux = []; // Arreglo auxiliar de indíces de preguntas a elegir
var arrRob = [0,1,2,4,3];
var nombreObjeto = "crk_rob_1103b";
/*************************************************************************************
*
* 								FUNCIONES Y PROCEDIMIENTOS
*
**************************************************************************************/
function iniciaActividad(){
	/*
	* NOMBRE: iniciaActividad.
	* UTILIDAD: Quita opacidad inicial, ejecuta el codigo que iniciliza la aplicación.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
      */
  		
      // array = generateNumericArray(arrRobots);
      // console.log(array)
      htmlOriginal = $(".d_contegrlactcenter").html();//obtiene el html de la actividad
      iniciaDefault();
      desactivarBtn("#btngrleval");
      generaContenido();
}

function generaContenido(){
      /*
	* NOMBRE: generaContenido.
	* UTILIDAD: Genera las imágenes aleatorias para el contenido de la actividad.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
      * VARIABLES****/
      var arrRobots1 = [
            [1,"articulados",1,2,3],
            [2,"móviles",4,5,6],
            [3,"androides",7,8,9],
            [4,"zoomórficos",10,11,12],
            [5,"híbridos",13,14,15],
      ];
      var arrMuestraImgs = [];
      var arrNumImgs = [];
      var arrPosiciones = [2,3,4];
      var numImgs = [1,2,3,3,2,1,2,1,3,3];
      var numTotImgs = 0;
      var arrImagenesOpciones = [];
      /************************************/
      
      // //Seleccion la accion y personaje para el ejercicio
	// generarArreglo();
  	// console.log("----> "+arrAux.indexOf(elementoActual) +'=='+ -1)
	// if(arrAux.indexOf(elementoActual) == -1) { // Si no existe el indice de esa pregunta en el arreglo
      // 	console.log("----> "+elementoActual)
	// 	arrRob.push(elementoActual);
	// 	arrAux.push(elementoActual); // Agregamos el índice de la pregunta
	// 	i++; // Aumentamos la cantidad de preguntas seleccionadas
	// }
  	// console.log("****** "+arrAux)

      $(".d_imagenes").show();//muestra imagenes
      // console.log(arrRob[0])
      // console.log(arrRobots[arrRob[0]])
      //Agrega la opcion seleccionada y muestra enunciado
      mezclar(arrRob);
      arrSeleccion = arrRobots[arrRob[0]];
      //console.log(arrRobots[arrRob[0]])
      arrMuestraImgs.push(arrRobots[arrRob[0]]);
      $("#p_texto").text("Seleccionar los robots "+arrSeleccion[1]);

      //elimina el elegido del arreglo de muestra
      for(let a = 0; a < arrRobots1.length; a++){
            if(arrRobots1[a][0] == arrSeleccion[0]){
                  arrRobots1.splice(a,1);
            }
      }

      mezclar(arrRobots1);
      for(let i = 0; i < 3; i++) arrMuestraImgs.push(arrRobots1[i]);

      //Genera arreglo de opciones de opciones de imagenes
      do{
            numTotImgs = 0;
            arrNumImgs = [];
            mezclar(numImgs);
            for(let a = 0; a < 4; a++){
                  numTotImgs+=numImgs[a];
                  arrNumImgs.push(numImgs[a]);
            }

      }while(numTotImgs != 6);

      mezclar(arrNumImgs);

      //genera las imagenes que se mostran en la actividad
      for(let a = 0; a < arrMuestraImgs.length; a++){
            mezclar(arrPosiciones);
            arrPosiciones.sort(function(){return Math.random()-0.5});
            for(let i = 0; i < arrNumImgs[a]; i++){
                  arrImagenesOpciones.push([arrMuestraImgs[a][0],arrMuestraImgs[a][arrPosiciones[i]]]);
            }
      }

      numImgSeleccion = arrNumImgs[0];

      mezclar(arrImagenesOpciones);

      //agrega la clase de la imagen y agrega evento.
      for(let b = 1; b <= 6; b++){
            $("#p_robot"+b).addClass("d_robot"+arrImagenesOpciones[b-1][1]).attr("onclick","seleccion("+b+")").attr("num",arrImagenesOpciones[b-1][0]);
      }
}

function seleccion(numPregunta){
      /*
	* NOMBRE: seleccion.
	* UTILIDAD: Valida lo que selecciono el usuario.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
      * VARIABLES****/
      var numSeleccion = 0;

      //Compara para saber si ya fue seleccionado
      if( $(".d_imagen"+numPregunta).attr("seleccion") == undefined){
            $(".d_imagen"+numPregunta).removeClass("d_imagenHover").addClass("d_select").attr("seleccion","1");
      }else{
            $(".d_imagen"+numPregunta).addClass("d_imagenHover").removeClass("d_select").removeAttr("seleccion");
      }

      //recorre todas las imagenes y verifica que ya se ha seleccionado alguna
      for(a = 1; a <= 6; a++){
            if($(".d_imagen"+a).attr("seleccion") == "1"){
                  numSeleccion++;
            }
      }

      //Si ya se selecciono alguna se activa eval
      (numSeleccion  >= 1) ?  activarBtn("#btngrleval") : desactivarBtn("#btngrleval");
      
}

function evaluaActividad(){
	/*
	* NOMBRE: evaluarActividad.
	* UTILIDAD: Evalua las soluciones en la actividad.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
      */
      var contaBien = 0;
      var contaMal = 0;

      $(".d_img").removeClass("d_imagenHover").css("cursor","default");
      $(".d_rob").removeAttr("onclick");
  

      //Recorre las imagenes, busca las seleccionadas y agrega evaluación
      for(a = 1; a <= 6; a++){
            if($(".d_imagen"+a).attr("seleccion") == "1"){
                  if($("#p_robot"+a).attr("num") == arrSeleccion[0]){
                        $(".d_imagen"+a).addClass("d_bien");
                        contaBien++;
                  }else{
                        $(".d_imagen"+a).addClass("d_mal");
                        contaMal++;
                  }
            }
      }

      //Si no hay errores y la seleccion fue correcta se agrega correcto.
      if(numImgSeleccion == contaBien && contaMal == 0){
            correctoDefault();
            aciertos++;
         $(".d_personaje").addClass("d_personaje_bien");
          $(".d_personaje1").addClass("d_personaje1_bien");
      }else{
            incorrectoDefault();
            errores++;
            $(".d_personaje").addClass("d_personaje_mal");
            $(".d_personaje1").addClass("d_personaje1_mal");
      }
      evaluaDefault();
  		desactivarBtn("#btngrleval");
  $("#btngrleval").removeAttr("style");
}

// function verSolucionCorr(){
// 	/*
// 	* NOMBRE: verSolucionCorr
// 	* UTILIDAD: Muestra la solución de un ejercicio.
// 	* ENTRADAS: Ninguna.
// 	* SALIDAS: Ninguna.
//       * VARIABLES****/
//       var htmlSolucion = $(".d_contegrlactinf").html();
//       /**************/
//       desactivarBtn("#idSolucion");

//       $(".d_img").removeClass("d_select").removeClass("d_bien").removeClass("d_mal");

//       //Busca las imagenes correctas 
//       for(let i = 1; i <= 6; i++){
//             if($("#p_robot"+i).attr("num") == arrSeleccion[0]){
//                   $(".d_imagen"+i).addClass("d_bien");
//             }
//       }

// 	tmpSolucion = setTimeout(function(){
//             activarBtn("#idSolucion");
//             $(".d_contegrlactinf").html(htmlSolucion);//regresa a valores evaluados

// 	}, 3000);
// }


function showSolution(){
	/*
	* NOMBRE: showSolution.
	* UTILIDAD: Muestra la solucion.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	* VARIABLES****/
      var htmlSolucion = $(".d_contegrlactcenter").html();
      /**************/

	$(".d_btnsolucion").removeClass("d_btnsolucion_pulse");//Quita efecto de pulse
      $(".d_btnsoluciontxt").css({"display":"flex"});//Muestra txt

      $(".d_img").removeClass("d_select").removeClass("d_bien").removeClass("d_mal");

      //Busca las imagenes correctas 
      for(let i = 1; i <= 6; i++){
            if($("#p_robot"+i).attr("num") == arrSeleccion[0]){
                  $(".d_imagen"+i).addClass("d_bien");
            }
      }

      tmpSolucion = setTimeout(function(){
            $(".d_btnsolucion").addClass("d_btnsolucion_pulse");//Agrega efecto de pulse
            $(".d_btnsoluciontxt").css({"display":"none"});//Oculta txt
            $(".d_contegrlactcenter").html(htmlSolucion);//regresa a valores evaluados

    },3500);
}

function siguienteActividad(){
	/*
	* NOMBRE: siguienteActividad.
	* UTILIDAD: Cambia al siguiente ejercicio.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
      */	
      clearTimeout(tmpSolucion);//Limpia tiempo
      arrSeleccion = [];
      numImgSeleccion = 0;
      // arrRob = [];
      arrRob.splice(0,1);
      $(".d_contegrlactcenter").html(htmlOriginal);//agrega html limpio
      $(".d_personaje").removeClass("d_personaje_bien").removeClass("d_personaje_mal");
      $(".d_personaje1").removeClass("d_personaje1_bien").removeClass("d_personaje1_mal");
      siguienteDefault();
      generaContenido();//genera el siguiente ejercicio.
 
}