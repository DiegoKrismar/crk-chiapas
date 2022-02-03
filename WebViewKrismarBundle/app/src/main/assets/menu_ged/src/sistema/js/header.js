var posUser = 0;//Tipo de usuario
var menuElements = [//Grupo de opciones por tipo de usuario
    [
        "• PDF Manual de súper administrador",
        "• PDF Manual de usuario",
        "• Video general",
        "• Video Introducción",
        "• Video Subir usuarios",
        "• Crear o modificar un grupo",
        "• Transferir alumnos de un grupo a otro",
        "• Estadísticas",
        "• Configuración de usuario"
    ],
    [
        "• PDF Manual de usuario",
        "• Video general",
        "• Video Introducción",
        "• Video Subir usuarios",
        "• Crear o modificar un grupo",
        "• Transferir alumnos de un grupo a otro",
        "• Estadísticas",
        "• Configuración de usuario"
    ],
    [
        "• PDF Manual de usuario",
        "• Video general",
        "• Video Introducción",
        "• Video Subir usuarios",
        "• Crear o modificar un grupo",
        "• Transferir alumnos de un grupo a otro",
        "• Estadísticas",
        "• Configuración de usuario"
    ],
    [
        "• PDF Manual de usuario",
        "• Video general",
        "• Video Introducción",
        "• Estadísticas",
        "• Configuración de usuario"
    ]
]
$(document).ready(function(){
    resizeMenuayuda();//Ajusta el menu ayuda a la ventana
    showHelpmenu();//Muestra y oculta menu ayuda
});
$(window).resize(function(){
    resizeMenuayuda();//Ajusta el menu ayuda a la ventana
});
$(window).on("orientationchange",function(){
    resizeMenuayuda();//Ajusta el menu ayuda a la ventana
})
function showHelpmenu(){
    /*
	* NOMBRE: showHelpmenu.
	* UTILIDAD: Muestra y oculta menu ayuda
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    for(var i=0; i<=menuElements[posUser].length-1; i++){
        $("#d_menuayudacenter").append('<a onClick="">'+menuElements[posUser][i]+'</a>');//Inserta links del menu
    }
    $(".h_conteName_ayuda").off().on("mousedown",function(){
        $("#d_menuayuda").slideToggle("ease");//Muestra y oculta menu
    });
    $("#d_menuayudaclose").off().on("mousedown",function(){
        $("#d_menuayuda").slideToggle("ease");//Oculta menu
    });
}
function resizeMenuayuda(){
    /*
	* NOMBRE: resizeMenuayuda.
	* UTILIDAD: Ajusta el menu ayuda a la ventana
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    var getPosbtnayudaleft = $(".h_conteName_ayuda").offset().left;//Posicion left de btn ayuda
    var getPosbtnayudatop = $(".h_conteName_ayuda").offset().top;//Posicion top de btn ayuda
    var getWidthheader = $(".h_header").outerWidth();//Tamaño header (total ancho)
    var getWidthhead = $(".h_head").outerWidth();//Yamaño head (contenido centrado)
    $("#d_menuayuda").css({"top":getPosbtnayudatop+44,"right":(getWidthheader-getWidthhead)/2});//Posiciona el menu a la derecha y abajo del btn de ayuda
    $("#d_menuayuda").slideUp("ease");//Oculta menu
}