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
//¿Qué hacen un LED y un Retardo juntos?

startInit = false;//Determina que NO hay canvas 3d en la aplicacion
vistaStart = "btnBlock";//Vista con que se inicia
viewShow = ["d_viewBlock","d_viewCode"];//Vistas que se muestran al mismo tiempo
vistaPrevia = false;
//objetivo = "- Prender y apagar un LED en un tiempo determinado haciendo uso de un bloque retardo";
addbloquesInstruccion = [
    'Del menú Elementos, selecciona y arrastra al espacio de trabajo un elemento LED. Configura su color en Amarillo 1 y cambia su estado a Encendido. ',
    'Del menú Funciones, selecciona y arrastra al espacio de trabajo un Retardo, debajo del bloque LED. Selecciona esta función y configura su tiempo con 4 Segundos. ',
    'Del menú Elementos, selecciona y arrastra al espacio de trabajo un elemento LED, debajo del Retardo. Configura su color Amarillo 1 y cambia su estado a Apagado. ',
    'Del menú Funciones, selecciona y arrastra al espacio de trabajo un Retardo, debajo del LED. Configura esta función con 4 Segundos de tiempo.'
];//Almacena instrucciones por cada paso

preguntasRef = [
    '¿Qué pasa si quitas el retardo entre el LED encendido y el LED apagado?'
];

validacion = [{"tipo":"elemento","subtipo":"led","id":"p_led-0","nivel":"0","contenido":{"nombre":"led_5","color":"yellow","estado":"HIGH","pin":"5"},"contenido_condicion":[],"contenido_entonces":[],"contenido_otro":[]},{"tipo":"funcion","subtipo":"delay","id":"p_delay-1","nivel":"0","contenido":{"tiempo":"4000"},"contenido_condicion":[],"contenido_entonces":[],"contenido_otro":[]},{"tipo":"elemento","subtipo":"led","id":"p_led-2","nivel":"0","contenido":{"nombre":"led_5","color":"yellow","estado":"LOW","pin":"5"},"contenido_condicion":[],"contenido_entonces":[],"contenido_otro":[]},{"tipo":"funcion","subtipo":"delay","id":"p_delay-3","nivel":"0","contenido":{"tiempo":"4000"},"contenido_condicion":[],"contenido_entonces":[],"contenido_otro":[]}];
errores = [
    {error:"¡Atención! Paso 1: No se arrastró un elemento LED al espacio de trabajo o revisar su configuración (Amarillo 1, Encendido). ",estado:1},
    {error:"¡Atención! Paso 2: No se arrastró una función Retardo al espacio de trabajo o  revisar su configuración (4 Segundos). ",estado:1},
    {error:"¡Atención! Paso 3: No se arrastró un elemento LED al espacio de trabajo o revisar su configuración (Amarillo 1, Apagado). ",estado:1},
    {error:"¡Atención! Paso 4: No se arrastró una función Retardo al espacio de trabajo o  revisar su configuración (4 Segundos). ",estado:1},
]
utilizados = ["c_led","c_delay"];//Bloques que se utilizan en esta practica
//SON LOS MENUS QUE NO SE OCUPAN EN CADA PRACTICA, SI ALGUNO DE ELLOS SE OCUPA SOLO HAY QUE ELIMINARLO DEL ARRAY
//noUtilizados = ["d_pxbelementcolor","d_pxbfunctioncolor","d_pxbstructurecolor","d_pxbvariablecolor","d_pxbmatcolor"];
noUtilizados = ["d_pxbstructurecolor","d_pxbvariablecolor","d_pxbmatcolor"];
/*************************************************************************************
 *
 * 								FUNCIONES Y PROCEDIMIENTOS
 *
 **************************************************************************************/
$(document).ready(function(){});
$(window).resize(function(){});
$(window).on("load",function(){
    cargaPractica();
});


function cargaPractica(){
    banderaPreview = true;
    $("#validar").css('display','block');
    $(".d_pxbviewcodedownloadbtn").css('display','none');
    $(".libre").css('display','none');
    for(let i=0;i<noUtilizados.length;i++){
        $("."+noUtilizados[i]).css('display','none');
    }
    for(let i=0;i<utilizados.length;i++){
        $("."+utilizados[i]).css('display','block');
    }

}
