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
getType = "physi";//Variable para saber si es simulador o armado
var slidesInd;//Cantidad de vistas para indicaciones
var contIndicaciones = 0;//Conteo de vistas de indicaciones
var addReflexion = [];//Preguntas de reflexion
arrayGltf = ["mdf"];//Guarda los GLTF que se construyen en cada practica.
/************************************************************************************
*
* 								FUNCIONES Y PROCEDIMIENTOS
*
*************************************************************************************/
$(document).ready(function(){});
$(window).on('load',function(){});
function iniciaSimulacionmecanica(){
    /*
	* NOMBRE: iniciaSimulacionmecanica.
	* UTILIDAD: Inicia simulacion mecanica
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    /*POR EL MOMENTO TODO ESTA CONTENIDO EN EL DOM DE LA INTERFAZ Y SE MUESTRAN SOLO LOS ELEMENTOS NECESARIOS, ESTO CAMBIARA AL HACER MODIFICACIONES EN LA INTERFAZ*/
    $("nav, div, section").remove(".d_armado");
    $("nav, div, section").remove(".d_instructivo");
    $("nav, div, section").remove(".d_programacionxbloques");
    /****************************************************/
    btnReflexionclose();//Click para cerrar preguntas de reflexion dando click general
    addemergenteGestos();//Detecta el cambio de dispositivo para emergente de gestos
    $(window).resize(function() {
        /*
        * NOMBRE: resize.
        * UTILIDAD: Detecta el resize del navegador
        * ENTRADAS: Ninguno.
        * SALIDAS: Ninguna.
        */
        removeStyle();//Quita estilos puestos por codigo en el menu
        reajusteConte3d();//Reajusta el contenido 3d en resize
    });
}
function addemergenteGestos(){
    /*
	* NOMBRE: addemergenteGestos.
	* UTILIDAD: Detecta el cambio de dispositivo para emergente de gestos
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    $("#d_emergentegestoscenter").removeClass('d_emergentegestos_tactil');//Quita clase dispositivo
    $("#d_emergentegestoscenter").removeClass('d_emergentegestos_mouse');//Quita clase pc
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){//Es dispositivo
        $("#d_emergentegestoscenter").addClass('d_emergentegestos_tactil');//Agrega clase de dispositivo
    }else{//Es PC
        $("#d_emergentegestoscenter").addClass('d_emergentegestos_mouse');//Agrega clase de pc
    }
}
function emergenteGestosclose(){
    /*
	* NOMBRE: emergenteGestosclose.
	* UTILIDAD: Cierra emergente de gestos
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    $("#d_emergentegestos").remove();//Quita emergente de gestos
}
var statusQuestions = false;//Saber si el menu de preguntas esta abiertp o cerrado
var reajusteAnima = false;//Actualizar canvas al abrir el menu
function eventOpenclosepreguntas(){
    /*
    * NOMBRE: eventOpenpreguntas.
    * UTILIDAD: Clic para abrir emergente de preguntas
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */

    reajusteAnima = true;//Actualiza canvas al abrir menu en el archivo individual
    if(statusQuestions === false){//Abre el menu
        statusQuestions = true;//Indica que el menu esta abierto
        if(getOrientation === "landscape"){
            $("#d_preguntasgrl").addClass("d_preguntasgrlmenuopen",1000,"easeInOutCubic");//Muestra ventana de preguntas
            $("#d_contegrl").addClass("d_contegrlmenuopen",1000,"easeInOutCubic",function(){
                reajusteConte3d();//Reajusta el contenido 3d en resize
                reajusteAnima = false;//Actualiza canvas al abrir menu
            });
            //$(".d_forceopcdata").addClass("d_forceopcdatamenuopen",1000,"easeInOutCubic");//Anima datos de simuacion
        }else{
            $("#d_preguntasgrl").addClass("d_preguntasgrlmenuopen",1000,"easeInOutCubic");//Muestra ventana de preguntas
            $("#d_contegrl").addClass("d_contegrlmenuopen",1000,"easeInOutCubic",function(){
                reajusteConte3d();//Reajusta el contenido 3d en resize
                reajusteAnima = false;//Actualiza canvas al abrir menu
            });
            $(".d_btnssimulador").addClass("d_btnsmenuopen",1000,"easeInOutCubic");//Anima btn expand y botones de simulador
        }
    }else{//Cierra el menu
        statusQuestions = false;//Indica que el menu esta cerrado
        if(getOrientation === "landscape"){
            $("#d_preguntasgrl").removeClass("d_preguntasgrlmenuopen",1000,"easeInOutCubic");//quita ventana de preguntas
            $("#d_contegrl").removeClass("d_contegrlmenuopen",1000,"easeInOutCubic",function(){
                reajusteConte3d();//Reajusta el contenido 3d en resize
                reajusteAnima = false;//Actualiza canvas al abrir menu
            });
            //$(".d_forceopcdata").removeClass("d_forceopcdatamenuopen");//Anima datos de simulacion
            //$(".d_forceopcdata").removeClass("d_forceopcdatamenuopen",1000,"easeInOutCubic");//Anima datos de simulacion
        }else{
            $("#d_preguntasgrl").removeClass("d_preguntasgrlmenuopen",1000,"easeInOutCubic");//quita ventana de preguntas
            $("#d_contegrl").removeClass("d_contegrlmenuopen",1000,"easeInOutCubic",function(){
                reajusteConte3d();//Reajusta el contenido 3d en resize
                reajusteAnima = false;//Actualiza canvas al cerrar menu
            });
            //$(".d_btnssimulador").removeClass("d_btnsmenuopen");//Anima btn expand y botones de simulador
            $(".d_btnssimulador").removeClass("d_btnsmenuopen",1000,"easeInOutCubic");//Anima btn expand y botones de simulador
        }
    }
}
var statusReflexion = false;//Preguntas de reflexion no se han a gregado
var statusBtnreflexion = false;//Preguntas de reflexion NO estan abiertas
function btnReflexion(){
    /*
	* NOMBRE: btnReflexion.
	* UTILIDAD: Click para abrir y cerrar preguntas de reflexion
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(statusBtnreflexion === false){
        $("#d_simulacionreflexiontxt").show();//Muestra preguntas
        if(statusReflexion === false){//Se agregan las preguntas de reflexion solo una vez al inicio
            for(var i=0;i<=addReflexion.length-1;i++){
                $("#d_simulacionreflexiontxt").append('<p>'+addReflexion[i]+'</p>');//Agrega preguntas de reflexion
            }
            statusReflexion = true;//Ya se agregaron las preguntas de reflexion (solo se agregan al inicio)
        }else{
            $("#d_simulacionreflexiontxt").show();//Muestra preguntas
        }
        statusBtnreflexion = true;//Preguntas de reflexion SI estan abiertas
    }else{
        $("#d_simulacionreflexiontxt").hide();//Oculta preguntas
        statusBtnreflexion = false;//Preguntas de reflexion NO estan abiertas
    }
    $("#d_contegrlcanvas").off().on("mousedown touchstart",function(){//Agrega mouse down a contegrlcanvas para cerrar preguntas al hacer click
        $("#d_simulacionreflexiontxt").hide();//Oculta preguntas
        statusBtnreflexion = false;//Preguntas de reflexion NO estan abiertas
        $("#d_contegrlcanvas").off();//Quita mousedown
    });
}
function btnReflexionclose(){
    /*
	* NOMBRE: btnReflexionclose.
	* UTILIDAD: Click para cerrar preguntas de reflexion dando click general
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    $("#d_contegrl").on("pointerdown touchstart",function(){
        $("#d_simulacionreflexiontxt").hide();//Oculta preguntas
        statusBtnreflexion = false;//Preguntas de reflexion NO estan abiertas
    });
}
function removeStyle(){
    /*
	* NOMBRE: removeStyle.
	* UTILIDAD: Quita estilos puestos por codigo en el menu
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    $("#d_preguntasgrl").removeClass("d_preguntasgrlmenuopen");//Quita estilos al menu de preguntas
    $("#d_contegrl").removeClass("d_contegrlmenuopen");//Quita estilos a canvas
    $(".d_btnssimulador").removeClass("d_btnsmenuopen");//Quita estilos a btn expand y botones de simulador
    //$(".d_forceopcdata").removeClass("d_forceopcdatamenuopen");//Posicion original de datos de simulacion
    statusQuestions = false;//Indica que el menu esta cerrado
}