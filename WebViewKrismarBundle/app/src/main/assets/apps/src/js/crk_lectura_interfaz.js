/***********************************************************************************
* 
*                                    CONSTANTES
*
*************************************************************************************/
var rutaPdf = "../src/pdf/"; //Ruta del pdf adicional
var prefijoPdf; //Prefijo del pdf adicional
defineCategoria = "lectura";//Define el tipo de categoria
/***********************************************************************************
* 
*                                    VARIABLES GLOBALES
*
*************************************************************************************/
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
});
$(window).on("orientationchange",function(event){
    /*
	* NOMBRE: orientationchange.
	* UTILIDAD: Detecta cambio de orientacion del dispositivo
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
})
function descargaPdf(){
    /*
	* NOMBRE: descargaPdf.
	* UTILIDAD: Descarga archivo PDF.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES****/
    url = '../'+prefijoPdf+'/src/pdf/'+prefijoPdf+".pdf";//Dirección
    window.location.href = url;
}