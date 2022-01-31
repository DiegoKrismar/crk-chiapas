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
var pantallaCompleta = false;
var elem =  document.documentElement;
var getOrientation;//Orientacion del dispositivo
var getType;//Variable para saber si es simulador, aplicacion
var getIframe;//Obtiene la ventana de iframe
var getTypeapp = false;//Obtiene si es una aplicacion
var intruccionTexto = "";//intrucciones de texto a voz
var iniciada = false;//Define si las instrucciones se abrieron al principio
var defineCategoria;//Define el tipo de categoria
/*************************************************************************************
*
* 								FUNCIONES Y PROCEDIMIENTOS
*
**************************************************************************************/
$(document).ready(function(){
    /*
	* NOMBRE: ready.
	* UTILIDAD: Documento listo
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    ///Creamos localstorage 
	var localConf = JSON.parse(localStorage.getItem('configuraIntro'));
	if(localConf == null){
		localStorage.setItem("configuraIntro", JSON.stringify(configuraIntro));
	}
	replaceIcons($('#d_emergenteinstrucciones').text());
});
$(window).resize(function() {
    /*
	* NOMBRE: resize.
	* UTILIDAD: Ajuste de tamaño de documento
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    getChangeorientation();//Detecta el cambio de orientacion del dispositivo
    resizeEmergentes();//Centra los emergentes en el centro de la pantalla.
    tootltipBtnsgrls();//Tooltip de botones generales
});
$(window).on('load',function(){
    /*
	* NOMBRE: onLoad.
	* UTILIDAD: Documento abierto
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    getChangeorientation();//Detecta el cambio de orientacion del dispositivo
    getObjetivos();//Obtiene objetivos
    setTimeout(function(){
        $("#d_preloadergrl").hide();
    },200);
    $("#helperResources").hide();
    
    setsizeIframe();//Establece el tamaño inicial de ventana del iframe
    resizeIframe();//Realiza el resize del iframe en PC
    tootltipBtnsgrls();//Tooltip de botones generales
});
$(window).on("orientationchange",function(event){
    /*
	* NOMBRE: orientationchange.
	* UTILIDAD: Detecta cambio de orientacion del dispositivo
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
})
$(window.parent).resize(function() {
    /*
	* NOMBRE: resize.
	* UTILIDAD: Ajuste de tamaño de documento fuera del Iframe
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    resizeIframe();//Realiza el resize del iframe en PC
});
function tootltipBtnsgrls(){
    /*
	* NOMBRE: tootltipBtnsgrls.
	* UTILIDAD: Tooltip de botones generales
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
    if(pantallaCompleta === false){//En pantalla completa no aparecen los tooltips (caso particular que no se ajusta de btn pantalla completa)
        $('.d_headergrlbtnsalir, .d_headergrlbtnsobjetivos, .d_headergrlbtnsinstrucciones, .d_footerbtnsexpand, .d_btngrlexpand, .d_btnsopcgrlrein, .d_btnsopcgrlnext, .d_btnsopcgrleval, .d_btnsopcgrldelete, .d_btnsopcgrllect').on("pointerover",function(){//Mouse over en btns
            var getWindowwidth = $(document).outerWidth();//Ancho documento
            var getWindowheight = $(document).outerHeight();//Alto documento
            var getOffsettop = $(this).offset().top;//Posicion top de btn en curso
            var getOffsetleft = $(this).offset().left;//Posicion left de btn en curso
            var getWidth = $(this).outerWidth();//Ancho de btn en curso
            var getHeight = $(this).outerHeight();//Alto de btn en curso
            var getOffsetright = getWindowwidth-getOffsetleft-getWidth;//Posicion right de btn en curso
            var getOffsetbottom = getWindowheight-getOffsettop;//Posicion bottom de btn en curso
            var getName = $(this).attr('class');//Obtiene el nom,bre de la clase del btn
            var setName;//Establece el nombre que va en el tooltip
            var typeBtnbottom = false;//Define si son botones inferiores o superiores
            switch (getName) {//Casos de btns
                case "d_headergrlbtnsalir":
                    setName = 'Salir';//Establece el nombre que va en el tooltip
                    break;
                case "d_headergrlbtnsobjetivos":
                    setName = 'Objetivos';//Establece el nombre que va en el tooltip
                    break;
                case "d_headergrlbtnsinstrucciones":
                    setName = 'Instrucciones';//Establece el nombre que va en el tooltip
                    break;
                case "d_footerbtnsexpand":
                case "d_btngrlexpand":
                    setName = 'Pantalla completa';//Establece el nombre que va en el tooltip
                    break;
                case "d_btnsopcgrlrein":
                    setName = 'Reiniciar';//Establece el nombre que va en el tooltip
                    if(getType === "pxb"){//Es actividad de pxb
                        typeBtnbottom = false;//Aqui el btn de reiniciar se paso al header
                    }else{
                        typeBtnbottom = true;//Son botones inferiores
                    }
                    break;
                case "d_btnsopcgrlnext":
                    setName = 'Siguiente';//Establece el nombre que va en el tooltip
                    typeBtnbottom = true;//Son botones inferiores
                    break;
                case "d_btnsopcgrleval":
                    setName = 'Evaluar';//Establece el nombre que va en el tooltip
                    typeBtnbottom = true;//Son botones inferiores
                    break;
                case "d_btnsopcgrldelete":
                    setName = 'Borrar';//Establece el nombre que va en el tooltip
                    typeBtnbottom = true;//Son botones inferiores
                    break;
                case "d_btnsopcgrllect":
                    setName = 'Descargar PDF';//Establece el nombre que va en el tooltip
                    typeBtnbottom = true;//Son botones inferiores
                    break;
                default:
                    break;
            }
            $('.d_headergrltooltip').remove();//Quita el tooltip
            if(getOrientation === "landscape"){//Caso horizontal
                $('body').append('<div class="d_headergrltooltip">'+setName+'<div class="d_headergrltooltiparrowside"></div></div>');//Agrega el tooltip
                $('.d_headergrltooltip').css({"top":getOffsettop,"right":"calc("+getWidth+"px + 1rem)","height":getHeight});//Posiciona el tooltip
            }
            if(getOrientation === "portrait"){//Caso vertical
                if(typeBtnbottom){
                    $('body').append('<div class="d_headergrltooltip">'+setName+'<div class="d_headergrltooltiparrowbottom"></div></div>');//Agrega el tooltip
                    $('.d_headergrltooltip').css({"bottom":"calc("+getOffsetbottom+"px + 1rem)","right":getOffsetright,"height":getHeight});//Posiciona el tooltip
                }else{
                    $('body').append('<div class="d_headergrltooltip">'+setName+'<div class="d_headergrltooltiparrowtop"></div></div>');//Agrega el tooltip
                    $('.d_headergrltooltip').css({"top":"calc("+getOffsettop+getHeight+"px + 1rem)","right":getOffsetright,"height":getHeight});//Posiciona el tooltip
                }
            }
        });
        $('.d_headergrlbtnsalir, .d_headergrlbtnsobjetivos, .d_headergrlbtnsinstrucciones, .d_footerbtnsexpand, .d_btngrlexpand, .d_btnsopcgrlrein, .d_btnsopcgrlnext, .d_btnsopcgrleval, .d_btnsopcgrldelete, .d_btnsopcgrllect').on("pointerout",function(){//Mouse out en btns
            $('.d_headergrltooltip').remove();//Quita el tooltip
        });
    }else{//En pantalla completa
        $('.d_headergrlbtnsalir, .d_headergrlbtnsobjetivos, .d_headergrlbtnsinstrucciones, .d_footerbtnsexpand, .d_btngrlexpand, .d_btnsopcgrlrein, .d_btnsopcgrlnext, .d_btnsopcgrleval, .d_btnsopcgrldelete, .d_btnsopcgrllect').off();//Quita evento mouseover y mouseout
    }
}
function setsizeIframe(){
    /*
	* NOMBRE: setsizeIframe.
	* UTILIDAD: Establece el tamaño inicial del iframe en PC
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
    getIframe = window.parent.document.getElementById('ventana');//Obtiene la ventana de iframe
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){//Es dispositivo
    }else{//Es PC
        $(getIframe).css({"width":"1200px","height":"800px","top":"calc(50% - 400px)","left":"calc(50% - 600px)","margin":"0","box-sizing":"border-box"});
    }
}
function resizeIframe(){
    /*
	* NOMBRE: resizeIframe.
	* UTILIDAD: Realiza el resize del iframe en PC
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
    var getWindowwidth = $(window.parent).outerWidth();//Obtiene tamaño ancho de parent de iframe
    var getWindowheight = $(window.parent).outerHeight();//Obtiene tamaño alto de parent de iframe
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){//Es dispositivo
        
    }else{//Es PC
        var calcWidth = getWindowwidth-100;//Calcula tamaño ancho de iframe
        var calcHeight = (calcWidth/3)*2;//Calcula tamaño alto de iframe
        var valBorder = 4;//Valor del borde asignado al iframe en ventanas.css
        if(calcHeight > (getWindowheight-100)){
            calcHeight = getWindowheight-100;
            calcWidth = (calcHeight/2)*3;
        }
        if(getWindowwidth < 650 || getWindowheight < 450){
            calcWidth = 500;
            calcHeight = 333;
        }
        if(calcHeight <= (getWindowheight-100)){
            $(getIframe).css({"margin":"0","width":calcWidth+"px","height":calcHeight+"px","left":"calc(50% - "+(calcWidth/2)+"px)","top":"calc(50% - "+(calcHeight/2)+"px)"});//Se aplica a ventana
            $(getIframe).find('iframe').css({"width":(calcWidth-valBorder)+"px","height":(calcHeight-valBorder)+"px"});//Se aplica a iframe
        }
    }
}
function muestraObjetivos(){
	/*
	* NOMBRE: muestraObjetivos.
	* UTILIDAD: Muestra los objetivos de la aplicación.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	$("#d_emergentes").show();//Muestra emergente
    $("#d_emergenteobjetivos, #d_emergenteinstrucciones, #d_emergentereiniciar, #d_emergentereiniciarpxb, #d_emergenteevaluacion, #d_emergenteborrar").hide();//Oculta todos los emergentes
    $("#d_emergenteobjetivos").show();//Muestra solo objetivos
    $("#d_emergentepleca").text("Objetivos");//Agrega texto de objetivos
    resizeEmergentes();//Centra los emergentes en el centro de la pantalla.
}
function muestraInstrucciones(){
	/*
	* NOMBRE: muestraInstrucciones.
	* UTILIDAD: Muestra las instrucciones de la aplicación.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	$("#d_emergentes").show();//Muestra emergente
    $("#d_emergenteobjetivos, #d_emergenteinstrucciones, #d_emergentereiniciar, #d_emergentereiniciarpxb, #d_emergenteevaluacion, #d_emergenteborrar").hide();//Oculta todos los emergentes
    $("#d_emergenteinstrucciones").show();//Muestra solo instrucciones
    $("#d_emergentepleca").text("Instrucciones");//Agrega texto de instrucciones
    resizeEmergentes();//Centra los emergentes en el centro de la pantalla.
}
function preguntaReinicio(){
	/*
	* NOMBRE: preguntaReinicio.
	* UTILIDAD: Muestra ventana reinicio
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/

	$("#d_emergentes").show();//Muestra emergente
    $("#d_emergenteobjetivos, #d_emergenteinstrucciones, #d_emergentereiniciar, #d_emergentereiniciarpxb, #d_emergenteevaluacion, #d_emergenteborrar").hide();//Oculta todos los emergentes
    $("#d_emergentereiniciar").show();//Muestra solo reiniciar
    $("#d_emergentepleca").text("Reiniciar");//Agrega texto de objetivos
    resizeEmergentes();//Centra los emergentes en el centro de la pantalla.
}
function preguntaReiniciopxb(){
	/*
	* NOMBRE: preguntaReinicio.
	* UTILIDAD: Muestra ventana reinicio
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	$("#d_emergentes").show();//Muestra emergente
    $("#d_emergenteobjetivos, #d_emergenteinstrucciones, #d_emergentereiniciar, #d_emergentereiniciarpxb, #d_emergenteevaluacion, #d_emergenteborrar").hide();//Oculta todos los emergentes
    $("#d_emergentereiniciarpxb").show();//Muestra solo reiniciar
    $("#d_emergentepleca").text("Reiniciar");//Agrega texto de objetivos
    resizeEmergentes();//Centra los emergentes en el centro de la pantalla.
}
function preguntaDelete(){
	/*
	* NOMBRE: preguntaDelete.
	* UTILIDAD: Muestra ventana borrar
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	$("#d_emergentes").show();//Muestra emergente
    $("#d_emergenteobjetivos, #d_emergenteinstrucciones, #d_emergentereiniciar, #d_emergentereiniciarpxb, #d_emergenteevaluacion, #d_emergenteborrar").hide();//Oculta todos los emergentes
    $("#d_emergenteborrar").show();//Muestra solo reiniciar
    $("#d_emergentepleca").text("Borrar");//Agrega texto de objetivos
    resizeEmergentes();//Centra los emergentes en el centro de la pantalla.
}
function preguntaEvaluar(){
	$("#d_emergentes").show();//Muestra emergente
    $("#d_emergenteobjetivos, #d_emergenteinstrucciones, #d_emergentereiniciar, #d_emergentereiniciarpxb, #d_emergenteevaluacion, #d_emergenteborrar").hide();//Oculta todos los emergentes
    $("#d_emergenteevaluacion").show();//Muestra solo reiniciar
    $("#d_emergentepleca").text("Evaluación");//Agrega texto de objetivos
    resizeEmergentes();//Centra los emergentes en el centro de la pantalla.
}
function ocultaEmergentes(){
	/*
	* NOMBRE: ocultaEmergentes.
	* UTILIDAD: Oculta los emergentes de la aplicación.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/

	$("#d_emergentes").hide();//Oculta emergente

    if(!iniciada){//Se cierran instrucciones por primera vez
    
        //iniciaActividad();
        
        console.log("CATEGORIA "+defineCategoria);
        console.log("TIPO SIMULADOR "+getType);
        
        switch(defineCategoria){//Define el tipo de categoria
            case "simulador":
                switch(getType){//Define el tipo de simulador
                    case "pxb":
                        if(startInit){//Hay canvas 3d en la aplicacion
                            $("#d_loadergrl").show();//Muestra cargador
                            iniciaSimulador();//Inicia simulador 3d
                            iniciaEntorno3dpxb();//Inicia entorno 3d de electronica
                        }
                        iniciaPxb();//nicia campos que se ocupan para programacion x bloques 
                        break;
                    case "armado":
                        $("#d_saltaranima").show();
                        $("#d_loadergrl").show();//Muestra cargador
                        iniciaSimulador();//Inicia simulador 3d
                        iniciaArmadomecanica();//Inicia armado de mecanica
                        break;
                    case "physi":
                        $("#d_loadergrl").show();//Muestra cargador
                        $("#d_emergentegestos").show();//Muestra cargador
                        iniciaSimulador();//Inicia simulador 3d
                        iniciaSimulacionmecanica();//Inicia simulacion mecanica
                        break;
                    case "instructivo":
                        $("#d_loadergrl").show();//Muestra cargador
                        iniciaSimulador();//Inicia simulador 3d
                        iniciaInstructivomecanica();//Inicia instructivo mecanica
                        break;
                    default:
                        break;
                }
                break;
            case "apliacion":
                iniciaActividad();
                break;
            case "evaluacion":
                iniciaActividad();
                break;
            case "video":
                break;
            case "lectura":
                break;
            default:
                break;
        }

        iniciada = true;//Define que las instrucciones ya se abrieron una vez
    }
}
function resizeEmergentes(){
    /*
	* NOMBRE: resizeEmergentes.
	* UTILIDAD: Centra los emergentes en el centro de la pantalla.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
    $("#d_emergenteoconte").css({"margin-left":"0","margin-top":"0","left":"0","top":"0"});//Limpia posicion de emergente
    if( navigator.userAgent.toLowerCase().search(/iphone|ipod|ipad|android/) > -1 ){
		$("#d_emergentes").addClass("d_devices");//Ajusta diseno de emergentes
	}else{
        $("#d_emergentes").removeClass("d_devices");//Ajusta diseno de emergentes
    }
    var outerWidth = $("#d_emergenteoconte").outerWidth();//Ancho del emergente
    var outerHeight = $("#d_emergenteoconte").outerHeight();//Alto del emergente
    $("#d_emergenteoconte").css({"margin-left":-(outerWidth/2),"margin-top":-(outerHeight/2)});//Centra mensaje emergente
    $("#d_emergenteoconte").css({"left":"50%","top":"50%"});//Centra mensaje emergente
}
function fullScreenVideo(){
	/*
	* NOMBRE: fullScreenVideo.
	* UTILIDAD: Habilita/Deshabilita el modo fullScreen del video.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	if(pantallaCompleta == false){
        if (elem.requestFullscreen) {
        elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
        }
        
        $("body").addClass("addfullscreen");//Reajusta elementos
        pantallaCompleta=true;
        if(getType === "armado" || getType === "instructivo" || getType === "physi"  || (getType === "pxb" && startInit === true)){//Acciones de 3D
            reajusteConte3d();//Reajusta el contenido 3d en resize
        }
	}
	else{
        if (document.exitFullscreen) {
        document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
        }		
        
        $("body").removeClass("addfullscreen");//Reajusta elementos
		if(typeof vistaPrevia !== 'undefined' && vistaPrevia){ //Está abierta la vista previa del simulador de bloques, ajustarla
			$('.d_pxbpreview').css({
				'top': '300px', 'right': '0', 'bottom': '0', 'left': '300px'});
		}
        pantallaCompleta=false;
        if(getType === "armado" || getType === "instructivo" || getType === "physi" || (getType === "pxb" && startInit === true)){//Acciones de 3D
            reajusteConte3d();//Reajusta el contenido 3d en resize
        }
	}
}
function getChangeorientation(){
    /*
    * NOMBRE: getChangeorientation.
    * UTILIDAD: Detecta el cambio de orientacion del dispositivo
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    var detectOrientation = $(".d_helperResources").css("position");//Obtiene propiedad del css para detectar la orientacion del dispositivo.
    //Detecta cambio de orientacion por medio del CSS
    if(detectOrientation === "fixed"){
        getOrientation = "portrait";//Portrait
    }else{
        getOrientation = "landscape";//Landscape
    }
}
function reiniciarVen(){
	/*
	* NOMBRE: cerrarVen
	* UTILIDAD: cierra la ventana
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
	var dispositivo = navigator.userAgent.toLowerCase();
	if( dispositivo.search(/iphone|ipod|ipad|android/) > -1 ){
		location.reload();
	}
}
function cerrarVen(){
	/*
	* NOMBRE: cerrarVen
	* UTILIDAD: cierra la ventana
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	* VARIABLES****/
    var dispositivo = navigator.userAgent.toLowerCase();
    /**************/
	if( dispositivo.search(/iphone|ipod|ipad|android/) > -1 ){
		window.close();
	}
}
function getObjetivos(){
	/*
	* NOMBRE: getObjetivos.
	* UTILIDAD: obtiene los objetivos.
	* ENTRADAS: Cadena de objetivos.
	* SALIDAS: Ninguna.
	*/
	$objetivos = document.getElementById('d_emergenteobjetivos').getAttribute("data");
	$objetivosHTML="";
	while($objetivos.indexOf("-")!=-1){
		$objetivos = $objetivos.slice($objetivos.indexOf("-")+1,$objetivos.length);
		if($objetivos.indexOf("-")!=-1){
			$objetivosHTML=$objetivosHTML+"<li>"+$objetivos.slice(0,$objetivos.indexOf("-"))+"</li>";
			$objetivos = $objetivos.slice($objetivos.indexOf("-"),$objetivos.length);
		}
		else{
			$objetivosHTML=$objetivosHTML+"<li>"+$objetivos.slice($objetivos.indexOf("-")+1,$objetivos.length)+"</li>";
			$objetivos = "";
		}
	}
	document.getElementById('d_emergenteobjetivos').innerHTML=$objetivosHTML;
}
//Creamos localStorage
var configuraIntro = {
    'primaria':'true',
    'mdt':'true'
}
//Controla el modo salir pantalla completa con la tecla esc.
document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);
function exitHandler() {
	/*
	* NOMBRE: exitHandler.
	* UTILIDAD: Cambiar animación y bandera de pantalla completa 
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
		//Cambiar animación de cerrado
        pantallaCompleta=false;
        $("body").removeClass("addfullscreen");//Reajusta elementos
    }
} 



function replaceIcons(inst){
	/*
	  * NOMBRE: replaceIcons.
	  * UTILIDAD: Incrusta las rutas de los iconos en las instrucciones.
	  * ENTRADAS: inst > cadena, son las instrucciones a cambiar.
	  * SALIDAS: instChanged > cadena, son las intrucciones con los iconos en ellas.
	  */
	/*** VARIABLES LOCALES ***/
	equivalencia = [
	  
		["*evaluar","*evaluar;","*evaluar,","*evaluar.","<svg class='d_btnsopcgrlevalsvg' viewBox='0 0 60 60' style='height: 14px;background-color: #f15a24;'><path fill-rule='evenodd' clip-rule='evenodd' d='M24.673,36.751c1.221-1.23,2.393-2.431,3.57-3.623c5.062-5.049,10.108-10.108,15.172-15.155c1.675-1.688,4.169-1.707,5.827-0.079c1.673,1.665,1.682,4.162-0.011,5.861c-4.764,4.793-9.544,9.553-14.333,14.329c-2.357,2.37-4.728,4.746-7.1,7.114c-1.994,1.992-4.336,1.986-6.324-0.006c-3.166-3.179-6.334-6.351-9.519-9.517c-1.238-1.238-1.675-2.705-1.085-4.368c0.603-1.667,1.849-2.608,3.625-2.76c1.217-0.109,2.287,0.329,3.164,1.206c2.192,2.198,4.395,4.393,6.593,6.589C24.368,36.458,24.487,36.559,24.673,36.751z'></path></svg>"],
		["*verifica","*verifica;","*verifica,","*verifica.","<svg class='d_btnsopcgrlevalsvg' viewBox='0 0 60 60' style='height: 14px;background-color: #f15a24;'><path fill-rule='evenodd' clip-rule='evenodd' d='M24.673,36.751c1.221-1.23,2.393-2.431,3.57-3.623c5.062-5.049,10.108-10.108,15.172-15.155c1.675-1.688,4.169-1.707,5.827-0.079c1.673,1.665,1.682,4.162-0.011,5.861c-4.764,4.793-9.544,9.553-14.333,14.329c-2.357,2.37-4.728,4.746-7.1,7.114c-1.994,1.992-4.336,1.986-6.324-0.006c-3.166-3.179-6.334-6.351-9.519-9.517c-1.238-1.238-1.675-2.705-1.085-4.368c0.603-1.667,1.849-2.608,3.625-2.76c1.217-0.109,2.287,0.329,3.164,1.206c2.192,2.198,4.395,4.393,6.593,6.589C24.368,36.458,24.487,36.559,24.673,36.751z'></path></svg>"],
	    ["*reiniciar","*reiniciar;","*reiniciar,","*reiniciar.",'<svg class="d_btnsopcgrlreinsvg" viewBox="0 0 60 60" style="height: 14px; background-color: #ef5a24; "> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.631,30.807c0.091-0.644,0.171-1.287,0.281-1.938 c0.277-1.583,0.815-3.071,1.584-4.479c0.679-1.253,2.103-1.687,3.308-1.043c1.188,0.636,1.613,2.056,0.962,3.301 c-0.792,1.536-1.249,3.156-1.269,4.883c-0.036,5.016,3.332,9.262,8.218,10.398c5.747,1.325,11.561-2.509,12.612-8.317 c1.078-5.982-2.973-11.561-8.988-12.357c-0.415-0.057-0.834-0.068-1.344-0.11c0.14,0.159,0.208,0.242,0.281,0.327 c0.468,0.47,0.958,0.927,1.411,1.419c0.838,0.911,0.786,2.289-0.082,3.136c-0.87,0.842-2.246,0.875-3.117,0.021 c-2.385-2.358-4.745-4.739-7.111-7.106c-0.021-0.022-0.028-0.04-0.142-0.164c0.112-0.063,0.249-0.107,0.333-0.191 c2.103-2.096,4.207-4.185,6.291-6.29c0.553-0.558,1.094-1.091,1.896-1.256c0.186,0,0.378,0,0.563,0 c0.065,0.028,0.129,0.061,0.188,0.074c0.931,0.237,1.525,0.812,1.723,1.75c0.174,0.79-0.053,1.481-0.615,2.059 c-0.441,0.447-0.886,0.885-1.333,1.322c1.016,0.144,1.995,0.235,2.951,0.43c8.162,1.712,13.498,9.841,11.837,18.012 c-1.424,7.009-7.411,12.096-14.563,12.344c-2.972,0.105-5.766-0.61-8.314-2.14c-3.976-2.396-6.394-5.9-7.279-10.455 c-0.129-0.64-0.189-1.287-0.28-1.939C14.631,31.932,14.631,31.37,14.631,30.807z"></path> </svg>'],
		["*siguiente","*siguiente;","*siguiente,","*siguiente.",'<svg class="d_btnsopcgrlnextsvg" viewBox="0 0 60 60" style="height: 14px; background-color: #ee5923; "> <path fill-rule="evenodd" clip-rule="evenodd" d="M28.523,26.98c3.78,0-1.348,0,2.434,0c0.12,0,0.239-0.002,0.36,0 c0.357,0.015,0.622-0.133,0.763-0.467c0.146-0.339,0.02-0.615-0.23-0.86c-0.969-0.97-1.949-1.926-2.902-2.909 c-1.117-1.172-1.449-2.558-0.941-4.1c0.915-2.735,4.433-3.599,6.485-1.572c3.892,3.855,7.755,7.732,11.617,11.622 c1.301,1.299,1.237,3.287-0.112,4.645c-2.282,2.296-4.575,4.581-6.866,6.866c-1.534,1.535-3.048,3.091-4.612,4.596 c-1.214,1.178-2.694,1.457-4.252,0.835c-1.549-0.618-2.375-1.851-2.474-3.514c-0.06-1.132,0.332-2.12,1.129-2.934 c0.95-0.96,1.897-1.903,2.844-2.851c0.279-0.273,0.485-0.557,0.313-0.956c-0.168-0.4-0.498-0.465-0.887-0.465 c-7.672,0.002-6.437,0.002-14.108,0.002c-1.706-0.002-3.19-1.008-3.756-2.546c-0.985-2.645,0.886-5.368,3.722-5.391 c3.039-0.014,6.073-0.002,9.113-0.002C26.946,26.98,27.733,26.98,28.523,26.98z"></path> </svg>',"siguiente"],
		
		
	];//Almacena las equivalencias en iconos para palabras clave
	instChanged = "";//Almacena las instrucciones transformadas
	tmpWord = null;//Almacena temporalmente la palabra a analizar
	/************************/

	instPalabras = inst.split(" ");//Separamos las instrucciones en palabras
	/*** Comenzamos a hacer la identificaciÃ³n de keywords para insertar iconos ***/
	for(i=0; i<instPalabras.length; i++){
	    tmpWord = instPalabras[i];//Reemplazamos por el icono respectivo
	    concaTxt = instPalabras[i];
  
	    for(j=0; j<equivalencia.length; j++){
		  if(tmpWord.localeCompare(equivalencia[j][0]) == 0){
			concaTxt = equivalencia[j][5];
			tmpWord = equivalencia[j][4];//Reemplazamos por el icono respectivo
			break;
		  }else if(tmpWord.localeCompare(equivalencia[j][1]) == 0){
			  concaTxt = equivalencia[j][5];
			tmpWord = equivalencia[j][4]+";";//Reemplazamos por el icono respectivo con punto y coma al final
			break;
		  }else if(tmpWord.localeCompare(equivalencia[j][2]) == 0){
			  concaTxt = equivalencia[j][5];
			tmpWord = equivalencia[j][4]+",";//Reemplazamos por el icono respectivo con coma al final
			break;
		  }else if(tmpWord.localeCompare(equivalencia[j][3]) == 0){
			  concaTxt = equivalencia[j][5];
			tmpWord = equivalencia[j][4]+".";//Reemplazamos por el icono respectivo con punto al final
			break;
		  }
	    }
  
	    intruccionTexto+= concaTxt+" ";
	    instChanged += tmpWord+" ";//Agregamos el temporal del icono respectivo
	}

	// var insfinal = "<img id='intruccionRepr' class='d_iconinstrucciones' src="+IP+ICOGRAL+"btnsoundoff.png>"+" "+instChanged+" ";//Agregamos el temporal del icono respectivo
	
	// instChanged += "<img id='intruccionRepr' onclick='reproduceIntrucciones()' class='d_iconinstrucciones' src="+IP+ICOGRAL+"btnsoundon.png>"+" ";//Agregamos el temporal del icono respectivo
	document.getElementById("d_emergenteinstrucciones").innerHTML = instChanged;
	// msg.text = intruccionTexto;//agrega texto
	// $("#intruccionRepr").css("cursor","pointer");
	
	// speakButton = document.querySelector('#intruccionRepr');//obtiene el elemento al que se le dio clic
	// speakButton.addEventListener('click', reproduceIntrucciones);//agrega el evento clic
  }