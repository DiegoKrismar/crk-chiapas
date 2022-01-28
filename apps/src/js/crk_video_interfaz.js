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
var imgPoster = $("#d_videogrlsource").attr("poster"); //Detectamos imagen del poster
var seekBar = false; //La barra no se mueve
defineCategoria = "video";//Define el tipo de categoria
/*************************************************************************************
 
 *
 
 * 								FUNCIONES Y PROCEDIMIENTOS
 
 *
 
 **************************************************************************************/
$(document).ready(function() {
    setControls(); //Muestra y oculta los controles
});
$(window).on('load',function(){
    getObjetivos();
});
function setControls(){
            /*
    * NOMBRE: setControls.
    * UTILIDAD: Muestra y oculta los controles
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    var movementTimer = null;//Almadena settime
    $("#d_controlsgrl").mousemove(function(e){//Al mover el mouse
        $("#d_controlsgrlemergente").fadeIn();//Aparecen controles
        $("#d_controlsgrlin").fadeIn();//Aparece pleca negra
        clearTimeout(movementTimer);//Limpia tiempo
        movementTimer = setTimeout(function(){
            $("#d_controlsgrlemergente").fadeOut();//Oculta controles
            $("#d_controlsgrlin").fadeOut();//Quita pleca negra
        },1000);
    })
    $("#d_contegrl").on("touchstart",function(){//Al touchstart el mouse
        $("#d_controlsgrlemergente").fadeIn();//Aparecen controles
        $("#d_controlsgrlin").fadeIn();//Aparece pleca negra
        clearTimeout(movementTimer);//Limpia tiempo
        movementTimer = setTimeout(function(){
            $("#d_controlsgrlemergente").fadeOut();//Oculta controles
            $("#d_controlsgrlin").fadeOut();//Quita pleca negra
        },1000);
    });
}
/*function setControls() {

    var indicaSeek = false;
    $("#d_contegrl").on("mouseup", function() {
        $("#d_controlsgrl").fadeIn();
        var time = setTimeout(function() {
            $("#d_controlsgrl").fadeOut();
        }, 3000);
    });
    $("#d_contegrl").on("touchstart", function() {
        $("#d_controlsgrl").fadeIn();
        var time = setTimeout(function() {
            $("#d_controlsgrl").fadeOut();
        }, 3000);
    });
}*/

function playPauseVideo() {
    /*
     
     * NOMBRE: playPauseVideo.
     
     * UTILIDAD: Reproduce/pausa el video de la actividad.
     
     * ENTRADAS: Ninguna.
     
     * SALIDAS: Ninguna.
     
     * VARIABLES****/
    var confIntro = JSON.parse(localStorage.getItem('configuraIntro'));
    if ($("#conf_primaria").length == 1) { //Abierto desde primaria
        if (confIntro.primaria == 'true') { //Intro se abre
            if ($("#d_videogrlsource").attr('intro') == 'true') {
                if ($("#d_controlgrlomitir").length == 0) $("body").append('<div class="d_controlgrlomitir" onclick="setIntro()" id="d_controlgrlomitir" >Omitir intro</div>');
            }
        } else {
            if (!($("[intro = 'true']").length == 0)) {
                $("[intro = 'true']").remove();
                //$($("video")[0]).remove();
                $("video").attr("id", "d_videogrlsource");
            }
        }
    } else {
        if (confIntro.mdt == 'true') { //Intro se abre
            if ($("#d_videogrlsource").attr('intro') == 'true') {
                if ($("#d_controlgrlomitir").length == 0) $("#d_controlsgrl").append('<div class="d_controlgrlomitir" onclick="setIntro()" id="d_controlgrlomitir" >Omitir intro</div>');
            }
        } else {
            if (!($("[intro = 'true']").length == 0)) {
                $("[intro = 'true']").remove();
                //$($("video")[0]).remove();
                $("video").attr("id", "d_videogrlsource");
            }
        }
    }
    var video = document.getElementById('d_videogrlsource');
    /**************/
    $("#d_controlgrlplaysvg").show();
    if (document.getElementById("d_videogrlsource").paused) { //El video está pausado
        document.getElementById("d_videogrlsource").play(); //Reproduce video
        $("#d_controlgrlpausesvg").show(); //Cambio de icono
        $("#d_controlgrlplaysvg").hide(); //Cambio de icono
    } else { //El video está en reproducción
        document.getElementById("d_videogrlsource").pause(); //Reproduce video
        $("#d_controlgrlpausesvg").hide(); //Cambio de icono
        $("#d_controlgrlplaysvg").show(); //Cambio de icono
    }
}

function muteVideo() {
    /*
     
     * NOMBRE: muteVideo.
     
     * UTILIDAD: Quita el audio del video de la actividad.
     
     * ENTRADAS: Ninguna.
     
     * SALIDAS: Ninguna.
     
     */
    if (document.getElementById("d_videogrlsource").muted) { //El video no tiene audio
        document.getElementById("d_videogrlsource").muted = false; //Agrega audio al video
        $("#d_controlgrlunmutesvg").show(); //Cambio de icono
        $("#d_controlgrlmutesvg").hide(); //Cambio de icono
    } else { //El video tiene audio
        document.getElementById("d_videogrlsource").muted = true; //Quita audio al video
        $("#d_controlgrlmutesvg").show(); //Cambio de icono
        $("#d_controlgrlunmutesvg").hide(); //Cambio de icono
    }
}

function barraBusqueda() {
    /*
     
     * NOMBRE: barraBusqueda.
     
     * UTILIDAD: Adelanta/Retrocede el video.
     
     * ENTRADAS: Ninguna.
     
     * SALIDAS: Ninguna.
     
     * VARIABLES****/
    var tiempo = null; //Almacena el tiempo 'actual' en la barra de duraciónd de video.
    /**************/
    tiempo = document.getElementById("d_videogrlsource").duration * (document.getElementById("d_controlgrlseekbar").value / 100);
    document.getElementById("d_videogrlsource").currentTime = tiempo;
    if (tiempo == 0 && document.getElementById('d_videogrlsource').getAttribute('intro') == "false") {
        abreIntro();
        playPauseVideo();
    }
}

function preparaBusqueda() {
    /*
     
     * NOMBRE: preparaBusqueda.
     
     * UTILIDAD: Detiene el video cuando se mueve la barra de progreso.
     
     * ENTRADAS: Ninguna.
     
     * SALIDAS: Ninguna.
     
     */
    document.getElementById("d_videogrlsource").pause(); //Detiene reproducción mientras se cambia la barra de progreso
}

function moveseekbar() {
    /*
     
     * NOMBRE: moveseekbar.
     
     * UTILIDAD: La barra de tienmpo esta en uso.
     
     * ENTRADAS: Ninguna.
     
     * SALIDAS: Ninguna.
     
     */
    seekBar = true; //La barra se esta moviendo
}

function estableceValor() {
    /*
     
     * NOMBRE: estableceValor.
     
     * UTILIDAD: Continua con la reproducción del video una vez terminada la busqueda.
     
     * ENTRADAS: Ninguna.
     
     * SALIDAS: Ninguna.
     
     */
    if (document.getElementById("d_videogrlsource").paused) {
        document.getElementById("d_videogrlsource").play();
        $("#d_controlgrlpausesvg").show(); //Cambio de icono
        $("#d_controlgrlplaysvg").hide(); //Cambio de icono
    }
    seekBar = false; //La barra no se usa
}

function actualizaVideo() {
    /*
     
     * NOMBRE: actualizaVideo.
     
     * UTILIDAD: Adelanta/Retrocede el video.
     
     * ENTRADAS: Ninguna.
     
     * SALIDAS: Ninguna.
     
     * VARIABLES****/
    var valor = null; //Tiempo que dura el video
    var bandFin = false; //Bandera que determina el fin de reproducción del video
    /**************/
    valor = (100 / document.getElementById("d_videogrlsource").duration) * document.getElementById("d_videogrlsource").currentTime;
    document.getElementById("d_controlgrlseekbar").value = valor; //Se establece el valor calculado
    if (valor === 100) { //Se terminó de reproducir el video
        console.log("END");
        bandFin = true;
        //skip();//Vuelve al inicio el video al terminar de reproducir
    }
    if (bandFin) {
        rebobinaVideo(); //Reestablece valores/parámetros origniales del video.
        bandFin = false;
    }
}

function skip() {
    /*
     
     * NOMBRE: skip.
     
     * UTILIDAD: Vuelve al inicio el video al terminar de reproducir
     
     * ENTRADAS: Ninguna.
     
     * SALIDAS: Ninguna.
     
     * VARIABLES****/
    var video = document.getElementById("d_videogrlsource");
    /**************/
    video.addEventListener("ended", resetVideo, false);
    //video.currentTime = 0;
    //video.currentTime += 0;
    //video.play();
    //console.log($("input[type=range]").val());
    //$("input[type=range]").val(0); //Se establece el valor a 0 del seekbar
    //console.log($("input[type=range]").val());
    function resetVideo() {
        //this.src = this.src
        video.load();
    }
    document.getElementById("d_controlgrlseekbar").value = "0";
}

function setIntro() {
    var confIntro = JSON.parse(localStorage.getItem('configuraIntro'));
    if ($("#conf_primaria").length == 1) { //Abierto desde primaria
        confIntro.primaria = "false";
    } else {
        confIntro.mdt = "false";
    }
    localStorage.setItem('configuraIntro', JSON.stringify(confIntro));
    cierraIntro();
}

function cierraIntro() {
    var videos = document.getElementsByTagName('video');
    //Removemos estilos del video intro
    videos[0].removeAttribute('id');
    videos[0].style.display = "none";
    videos[0].pause();
    //Agregamos atributos y estilos a video de la aplicación
    videos[1].setAttribute('id', 'd_videogrlsource');
    videos[1].style.display = "block";
    $("#d_controlgrlomitir").remove();
    playPauseVideo();
}

function abreIntro() {
    var videos = document.getElementsByTagName('video');
    //Removemos estilos del video intro
    videos[1].removeAttribute('id');
    videos[1].style.display = "none";
    videos[1].pause();
    //Agregamos atributos y estilos a video de la aplicación
    videos[0].setAttribute('id', 'd_videogrlsource');
    videos[0].style.display = "block";
    //$("#video").attr("poster",imgPoster);//Reestablece la imagen del video
    document.getElementById("d_videogrlsource").currentTime = tiempo;
    document.getElementById("d_videogrlsource").setAttribute('poster', imgPoster);
}

function rebobinaVideo() {
    /*
     
     * NOMBRE: rebobinaVideo.
     
     * UTILIDAD: Reestablece valores/parámetros origniales del video.
     
     * ENTRADAS: Ninguna.
     
     * SALIDAS: Ninguna.
     
     */
    $("#d_videogrlsource").attr("poster", imgPoster); //Reestablece la imagen del video
    $("#d_controlgrlpausesvg").hide(); //Cambio de icono
    $("#d_controlgrlplaysvg").show(); //Cambio de icono
    document.getElementById("d_controlgrlseekbar").value = 0;
    document.getElementById("d_videogrlsource").pause();
}