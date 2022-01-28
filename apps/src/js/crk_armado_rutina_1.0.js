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
var largeConte;//El total de pasos entre los btns que entran en el conte, dan el % que debe de tener para mostrar todos los btns con las flechas de next y prev
var corOrishape = {x:[],y:[],z:[]};//Almacena el origen de la posiciond e los objetos
var numExpand = [];//Guarda el numero de expancion de las piezas
var contPieza = {};//Guarda el rango de piezas en cada paso
var newLookat = [];
var getBtnpress;//Guarda el BTN del paso que se presiona
getType = "armado";//Variable para saber si es simulador o armado
arrayGltf = ["mdf"];//Guarda los GLTF que se construyen en cada practica.
var timeGrl = 1000;//Tiempo general de animacion
var totalPasos;//Total de pasos para el armado.
var arrayJson = [];//Guarda los JSON que se construyen en cada practica.
var svgNum = [];//Guarda pieza y cantidad de cada paso para mostrar en PIEZAS
var svgNumtotal = [];//Guarda pieza y cantidad total para mostrar en PIEZAS
var animaIntro;//Se establece que en la animacion de intro no hay el mismo movimiento de camara como en los pasos
var sumAnima = 0;//Conteo para triggers
var interval;//Tiempo de intervalos para la animacion de intro
var newTime;//Al terminar la animacion de intro, hay un tiempo de espera
var animaEnd;//Detecta si la animacion de intro ya termino
var stepsStar;//Detecta que inician los pasos con el click en algun boton
var statusAnima;//Saber si la animacion es la camara o el movimiento de la pieza en cada paso
var finalName;//Nombre final de las piezas
var ropeStep = null;//Paso en donde se anima la cuerda
var specialCase = false;//Caso para armado de tornillo, que no se hizo fisicamente.
var typeAnima;//Identifica si es animacion de intro, o de cada paso
var addAnimatesteps = [];//Almacena animaciones tween de pasos (piezas)
/*************************************************************************************
*
* 								FUNCIONES Y PROCEDIMIENTOS
*
**************************************************************************************/
$(document).ready(function(){});
$(window).on('load',function(){});
function iniciaArmadomecanica(){
    /*
	* NOMBRE: iniciaArmadomecanica.
	* UTILIDAD: Inicia armado de mecanica
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    /*POR EL MOMENTO TODO ESTA CONTENIDO EN EL DOM DE LA INTERFAZ Y SE MUESTRAN SOLO LOS ELEMENTOS NECESARIOS, ESTO CAMBIARA AL HACER MODIFICACIONES EN LA INTERFAZ*/
    $("nav, div, section").remove(".d_simulacion");
    $("nav, div, section").remove(".d_instructivo");
    $("nav, div, section").remove(".d_programacionxbloques");
    /****************************************************/
    btnPasosajuste();
    $(window).resize(function() {
        /*
        * NOMBRE: resize.
        * UTILIDAD: Detecta el resize del navegador
        * ENTRADAS: Ninguno.
        * SALIDAS: Ninguna.
        */
        //btnPasos();//Modificacion de botones de los pasos
        btnPasosajuste();
        eventBtnspasos();//Clic para cada boton de pasos
        stepsResize();//Calcula el tamaño del contenedor de piezas
        reajusteConte3d();//Reajusta el contenido 3d en resize
    });
}
function stepsResize(){
    /*
	* NOMBRE: stepsResize.
	* UTILIDAD: Calcula el tamaño del contenedor de piezas
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    var conteparentSize = $(".d_piezasgrlconte").outerHeight();
    var contechildSize = $(".d_piezasgrlhead").outerHeight();
    var newSize = conteparentSize-contechildSize;
    $(".d_piezasgrlbody").css({"height":newSize+"px"});
}
function iniciaAnima(){
    /*
	* NOMBRE: iniciaAnima.
	* UTILIDAD: Inicia la animacion despues de construirse los modelos 3D
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    
    console.log("INICIA************");
    
    sumAnima = 1;//Conteo para triggers
    animaIntro = true;//Gira 360°
    getOrigin();//Obtener el origen de las piezas
    //btnPasos();//Modificacion de botones de los pasos
    btnPasosadd();
    eventBtnspasos();//Clic para cada boton de pasos
    //$("#d_avisogrl").fadeOut();//=culta mensaje de animacion o pasos
    $("body").addClass("d_hideAnima");//Oculta btns de navegacion y funcionamiento
    //$("#d_menupasosgrl").append('<div class="d_blockbarbtns"></div>');//Agrega div que bloquea barra btns
    
    reajusteConte3d();//Reajusta el contenido 3d en resize
    
    $("#d_saltaranima").fadeIn(0);//Muestra mensaje de animacion o pasos
    
    
    animaEnd = false;//Detecta si la animacion de intro ya termino
    stepsStar = false;//Detecta que inician los pasos con el click en algun boton
    
    $(".d_btnsopcgrlexpand").fadeOut(0);//Oculta btn pantalla completa
    
    console.log(totalPasos);

    typeAnima = false;//La animacion es de intro
    timeGrl = 200;//Tiempo general de animacion 200
    interval = setInterval(actionInterval,timeGrl*2);
    $("#"+sumAnima).trigger("mouseup");//Inicia en el primer paso
    function actionInterval(){
        if(sumAnima === totalPasos){
            clearInterval(interval);//Limpia intervalos
            console.log("END");
            newTime = setTimeout(function(){
                clearTimeout(newTime);//Limpia tiempo
                iniciaArmado();//Inicia todo lo del armado despues de construirse los modelos 3D
            },timeGrl*8);
        }else{
            sumAnima++;//Suma los pasos, hasta llegar a total de pasos
            $("#"+sumAnima).trigger("mouseup");//Inicia en el paso que sigue
        }
        console.log(timeGrl);
    }
};
function iniciaBtns(){
    
}
function iniciaArmado(){
    /*
	* NOMBRE: iniciaArmado.
	* UTILIDAD: Inicia todo lo del armado despues de construirse los modelos 3D
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    
    sumAnima = totalPasos;//Se establece que el conteo de trigger llega a su fin
    
    getBtnpress = totalPasos;//Se establece que conteo de pasos por cada btn llega a su fin
    clearInterval(interval);//Limpia intervalos
    clearTimeout(newTime);//Limpia tiempo
    
    typeAnima = true;//La animacion es de pasos
    timeGrl = 1000;//Tiempo general de animacion
    
    $(".d_btnsopcgrlexpand").fadeIn(0);//Muestra btn pantalla completa

    getOrigin();//Obtener el origen de las piezas
    
    controlGroups();//Modifica que piezas se muesran o se ocultan en determinados pasos para hacer los grupos.
    addTubeanima();//Establece la animacion con tween de la cuerda
    
    //btnPasos();//Modificacion de botones de los pasos
    btnPasosadd();
    
    eventBtnspasos();//Clic para cada boton de pasos
    
    animaEnd = true;//Detecta si la animacion de intro ya termino
    

    if(specialCase){//Caso especial de tornillo
        $(".d_pasospiezasgrl").fadeIn();//Muestra pasos de armado para tornillo
        $(".d_contegrl").addClass('d_contegrl_ajuste');
    }
    
    $(".d_btngrlnext").after('<div class="d_btngrltextstep"><span class="d_btngrltextstepnum">0</span>/<span class="d_btngrltextsteptotal">'+totalPasos+'</span></div>');
    
    $("#d_saltaranima").fadeOut(0);//Oculta mensaje de animacion o pasos
    
    contNext = 0;//Resetea contador, de btn presionado
    
    $("body").removeClass("d_hideAnima");//Muestra btns de navegacion y funcionamiento
    //$(".d_blockbarbtns").remove();//Quita div que bloquea barra btns
    
    reajusteConte3d();//Reajusta el contenido 3d en resize
    
    //$(window).trigger('resize');
    
        
    enabledDisabledbtns("enabled", "all");//Habilita o desabilita btns en los pasos
    enabledDisabledbtns("disabled", "next");//Habilita o desabilita btns en los pasos
    enabledDisabledbtns("disabled", "prev");//Habilita o desabilita btns en los pasos
    
    
    $("#d_btngrlnext, #d_btngrlprev").fadeOut(0);//Quita botones de next y prev
    
    
    $("#1").addClass("d_flash");//Agrega indicador en el primer paso
    
    
    $("#d_btnsopcgrlplay").hide();
    
    $(".d_contegrl").append('<div class="d_stepsfloat"></div>');
    
    //Sirve para visualizar algun paso en especifico desde el inicio
    //$("#1").trigger("mouseup");//Inicia en el primer paso
}
function getOrigin(){
    /*
	* NOMBRE: getOrigin.
	* UTILIDAD: Recupera posiion original de piezas.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    for(i=0; i<=allClones.length-1; i++){
        corOrishape.x.push(allClones[i].position.x);//Guarda la posicion de las piezas en x
        corOrishape.y.push(allClones[i].position.y);//Guarda la posicion de las piezas en y
        corOrishape.z.push(allClones[i].position.z);//Guarda la posicion de las piezas en z
        allClones[i].visible = true;//Oculta todas la piezas
    }
}
function addExpand(){
    /*
	* NOMBRE: addExpand.
	* UTILIDAD: Establece la expancion de las piezas por cada paso
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    //Todos los pasos anteriores al ultimo
    if(getBtnpress < totalPasos){
        //Oculta todas las piezas al clic en cada BTN
        for(i=0; i<=allClones.length-1; i++){
            allClones[i].visible = false;//Oculta todos los objetos
        }
        //Muestra todas las piezas que ya deben de visualizarse al clic del BTN
        for(i=0; i<=contPieza[getBtnpress-1][1]; i++){
            allClones[i].visible = true;//Muestra los objetos en su posicion, hasta el paso en curso
            allClones[i].position.set(corOrishape.x[i],corOrishape.y[i],corOrishape.z[i]);//Establece la posicion de origen a los objetos, hasta el paso en curso
        }
        //Cambia de posicion de EXPAND a las piezas que se ocupan en ese paso
        for(i=contPieza[getBtnpress-1][0]; i<=contPieza[getBtnpress-1][1]; i++){
            if(numExpand[i][0] != null){//Las piezas que no requieren moverse en X, tienen NULL
                allClones[i].position.x = (allClones[i].position.x+numExpand[i][0]);
            }
            if(numExpand[i][1] != null){//Las piezas que no requieren moverse en Y, tienen NULL
                allClones[i].position.y = (allClones[i].position.y+numExpand[i][1]);
            }
            if(numExpand[i][2] != null){//Las piezas que no requieren moverse en Z, tienen NULL
                allClones[i].position.z = (allClones[i].position.z+numExpand[i][2]);
            }
        }
    }else{//En el ultimo paso se muestran todos los objetos en su posicion de origen
        //Muestra todas las piezas en el ultimo paso
        for(i=0; i<=allClones.length-1; i++){
            allClones[i].visible = true;//Muestra todos los objetos
            allClones[i].position.set(corOrishape.x[i],corOrishape.y[i],corOrishape.z[i]);//Establece la posicion de origen a los objetos, todos en el ultimo paso
        }
    }
    setTween();//Establece render de Tween de animar piezas en cada paso, despues de animar camara
}
function addAnimacamera(){
    /*
	* NOMBRE: addAnimacamera.
	* UTILIDAD: Establece la nueva posicion animada de camara y escena en cada paso
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(animaIntro === false){//Animacion de la camara en cada paso
        console.log("ANIMA CAMERA");
        statusAnima = null;//Se quita el valor, para que no inicie con el ultimo que tenia guardado
        var addAnimatecamera = new TWEEN.Tween(prevPoscamera)//Animacion de la camara en cada paso
        .to({
            x: newLookat[getBtnpress-1][0][0],
            y: newLookat[getBtnpress-1][0][1],
            z: newLookat[getBtnpress-1][0][2]
        },timeGrl)
        //.delay(timeDelaycamera)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .repeat(0).start();
        var addAnimatescene = new TWEEN.Tween(prevPosscene)//Animacion de la escena en cada paso
        .to({
            x: newLookat[getBtnpress-1][1][0],
            y: newLookat[getBtnpress-1][1][1],
            z: newLookat[getBtnpress-1][1][2]
        },timeGrl)
        .onComplete(function(){
            //setTween();//Establece render de Tween de animar piezas en cada paso, despues de animar camara 
        })
        //.delay(timeDelaycamera)
        .onStart(function(){
            statusAnima = "CAMARA";//Se anima la camara en cada paso
        })
        .easing(TWEEN.Easing.Quadratic.InOut)
        .repeat(0).start();
        prevPosscene = scene.position;//Guarda la nueva posicion de la scena
        prevPoscamera = camera.position;//Guarda la nueva posicion de la camara
    }
}
function animationIntro(){
    /*
	* NOMBRE: animationIntro.
	* UTILIDAD: Establece la animacion sin el Tween del intro de armado
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    axesHelper.position.set(-scene.position.x,-scene.position.y,-scene.position.z);//Nueva posicion de axesHelper
    if(animaIntro === true){//Animacion de intro
        //scene.position.y -= 0.015;
        var speed = Date.now() * 0.00035;
        camera.position.x = Math.cos(speed) * 70;
        camera.position.z = Math.sin(speed) * 70;
        camera.position.y = 10;
    }
}
function setTween(){
    /*
	* NOMBRE: setTween.
	* UTILIDAD: Establece render animacion de Tween de pasos
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(contPieza[getBtnpress-1][1] != null){//Si tiene null no hay animacion y es para el ultimo paso
        for(i=contPieza[getBtnpress-1][0]; i<=contPieza[getBtnpress-1][1]; i++){
            addAnimatesteps.push(new TWEEN.Tween(allClones[i].position)
            .to({
                x: corOrishape.x[i],
                y: corOrishape.y[i],
                z: corOrishape.z[i]
            },timeGrl*2)
            .onStart(function(){
                statusAnima = "PIEZA";//Se anima la pieza en cada paso
            })
            .delay(timeGrl)
            .easing(easeEffect)
            .repeat((typeAnima)?Infinity:0).start());
        } 
    }
};
function enabledDisabledbtns(action,type){
    /*
	* NOMBRE: enabledDisabledbtns.
	* UTILIDAD: Habilita o desabilita btns en los pasos
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
    if(action === "enabled"){//Habilita
        if(type === "all"){//Habilita todo
            $(".d_menupasosgrlbtnsblock").remove();//Quita bloqueo de btns pasos
            $(".d_menupasosgrlbtns").removeClass("d_menupasosgrlbtnsinactive");//Quita desactivado a btn pasos
            $(".d_btnsopcgrlplayblock").remove();//Quita bloqueo de btn play
            $("#d_btnsopcgrlplay, #d_btnsopcgrlpiezas").removeClass("d_btngrlinactive");//Quita desactivado a btn play
            $(".d_btngrlnextblock").remove();//Quita bloqueo de btns next
            $("#d_btngrlnext").removeClass("d_btngrlinactive");//Quita desactivado a btn next
            $(".d_btngrlprevblock").remove();//Quita bloqueo de btns prev
            $("#d_btngrlprev").removeClass("d_btngrlinactive");//Quita desactivado a btn prev
        }
        if(type === "play"){//Habilita play
            $(".d_btnsopcgrlplayblock").remove();//Quita bloqueo de btn play
            $("#d_btnsopcgrlplay #d_btnsopcgrlpiezas").removeClass("d_btngrlinactive");//Quita desactivado a btn play
        }
        if(type === "prev"){//Habilita prev
            $(".d_btngrlprevblock").remove();//Quita bloqueo de btns prev
            $("#d_btngrlprev").removeClass("d_btngrlinactive");//Quita desactivado a btn prev
        }
        if(type === "next"){//habilita next
            $(".d_btngrlnextblock").remove();//Quita bloqueo de btns next
            $("#d_btngrlnext").removeClass("d_btngrlinactive");//Quita desactivado a btn next
        }
        if(type === "steps"){//Habilita pasos
            $(".d_menupasosgrlbtnsblock").remove();//Quita bloqueo de btns pasos
            $(".d_menupasosgrlbtns").removeClass("d_menupasosgrlbtnsinactive");//Quita desactivado a btn pasos
        }
        $(".d_menupasosbtnsconte").find("#"+contNext).addClass('d_addbtnok');//Agrega indicador de paso completado
    }
    if(action === "disabled"){//Deshabilita
        if(type === "all"){//Deshabilita todo
            $(".d_menupasosgrl").append('<div class="d_menupasosgrlbtnsblock"></div>');//Bloquea btns de pasos, hasta wue la animacion termine
            $(".d_menupasosgrlbtns").addClass("d_menupasosgrlbtnsinactive");//Agrega desactivado a btn pasos
            $("#d_btnsopcgrlplay, #d_btnsopcgrlpiezas").addClass("d_btngrlinactive");//Agrega desactivado a btn play
            $("#d_btnsopcgrlplay, #d_btnsopcgrlpiezas").append('<div class="d_btnsopcgrlplayblock"></div>');//Bloquea btns play
            $("#d_btngrlnext").addClass("d_btngrlinactive");//Agrega desactivado a btn next
            $("#d_btngrlnext").append('<div class="d_btngrlnextblock"></div>');//Bloquea btn next
            $("#d_btngrlprev").addClass("d_btngrlinactive");//Agrega desactivado a btn prev
            $("#d_btngrlprev").append('<div class="d_btngrlprevblock"></div>');//Bloquea btn prev
        }
        if(type === "play"){//Deshabilita play
            $("#d_btnsopcgrlplay, #d_btnsopcgrlpiezas").addClass("d_btngrlinactive");//Agrega desactivado a btn play
            $("#d_btnsopcgrlplay, #d_btnsopcgrlpiezas").append('<div class="d_btnsopcgrlplayblock"></div>');//Bloquea btns play
        }
        if(type === "prev"){//Deshabilita prev
            $("#d_btngrlprev").addClass("d_btngrlinactive");//Agrega desactivado a btn prev
            $("#d_btngrlprev").append('<div class="d_btngrlprevblock"></div>');//Bloquea btn prev
        }
        if(type === "next"){//Deshabilita next
            $("#d_btngrlnext").addClass("d_btngrlinactive");//Agrega desactivado a btn next
            $("#d_btngrlnext").append('<div class="d_btngrlnextblock"></div>');//Bloquea btn next
        }
        if(type === "steps"){//Deshabilita pasos
            $(".d_menupasosgrl").append('<div class="d_menupasosgrlbtnsblock"></div>');//Bloquea btns de pasos, hasta wue la animacion termine
            $(".d_menupasosgrlbtns").addClass("d_menupasosgrlbtnsinactive");//Agrega desactivado a btn pasos
        }
    }
}
function btnPasosadd(){
    
    
    
    $(".d_menupasosbtnsconte").empty();//Elimina los div insertados para volver a calcular e insertar de nuevo. Funciona para el resize
    //Agrega los btns de los pasos
    for(var i=1; i<=totalPasos; i++){
        $(".d_menupasosbtnsconte").append('<div class="d_menupasosnum" id="'+i+'">'+i+'</div>');//Inserta el div de los btns de los pasos
    }
}
function btnPasosajuste(){
    var getSizescroll = totalPasos*3;
    
    if(getOrientation === "portrait"){
        $(".d_menupasosbtnsconte").css({"width":+getSizescroll+"rem","height":"100%"});//Obtiene el tamaño del espacio de los botones 
    }else{
        $(".d_menupasosbtnsconte").css({"height":+getSizescroll+"rem","width":"100%"});//Obtiene el tamaño del espacio de los botones 
    }
}
function btnPasos(){
    /*
	* NOMBRE: btnPasos.
	* UTILIDAD: Modificacion de botones de los pasos
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
    
    
    
    var getFontsize = $("html").css("font-size").split("p")[0];//Obtiene el tamaño del REM
    var getBtnspace;//Obtiene el tamaño del espacio de los botones 
    //Se obtiene el tamaño del espacio de los botones de acuerdo a la orientacion del dispositivo
    if(getOrientation === "portrait"){
       getBtnspace = $(".d_menupasosgrlbtns").outerWidth();//Obtiene el tamaño del espacio de los botones 
    }else{
        getBtnspace = $(".d_menupasosgrlbtns").outerHeight();//Obtiene el tamaño del espacio de los botones 
    }
    var minSizebtn = getFontsize*3;//Tamano minimo de cada btn
    var conteo = 20;//Maximo total de btns que son visibles y disminuye hasta encontrar el tamano proximo a 3 REM del HTML
    var newSizebtn;//Tamano asigano al btn de acuerdo al ancho del contenedor de btns
    do{//Busca el nuevo tamaño del btn
        conteo--;//Disminuye conteo
        newSizebtn = getBtnspace/conteo;//Obtiene nuevo tamano del btn
        //console.log(newSizebtn);
    }while(newSizebtn < minSizebtn);//El tamano del btn queda lo mas cerca del tamano de 3 REM del HTML
    largeConte = Math.ceil(totalPasos/conteo);//El total de pasos entre los btns que entran en el conte, dan el % que debe de tener para mostrar todos los btns con las flechas de next y prev
    
    
    
    var arrayBtns = {portrait:[],landscape:[]};
    
    $(".d_menupasosbtnsconte").empty();//Elimina los div insertados para volver a calcular e insertar de nuevo. Funciona para el resize
    //Agrega los btns de los pasos
    for(var i=1; i<=totalPasos; i++){
        $(".d_menupasosbtnsconte").append('<div class="d_menupasosnum" id="'+i+'">'+i+'</div>');//Inserta el div de los btns de los pasos
    }
    
    
    
    //Se asigna el tamano del espacio para los btns deacuerdo a la orientacion
    if(getOrientation === "portrait"){
        //$(".d_menupasosgrlbtns").css({"overflow-x":"scroll","overflow-y":"hidden"});//Agrega scroll en X
        $(".d_menupasosbtnsconte").css({"width":(largeConte*100)+"%","height":"100%","top":"0%"});//Asigna el nuevo tamaño del conte de btns, de acuerdo al total de btns
        $(".d_menupasosnum").css({"width":newSizebtn+"px","height":"100%"});//Asigna el nuevo tamano del btn 
    }else{
        //$(".d_menupasosgrlbtns").css({"overflow-x":"hidden","overflow-y":"scroll"});//Agrega scroll en Y
        $(".d_menupasosbtnsconte").css({"height":(largeConte*100)+"%","width":"100%","left":"0%"});//Asigna el nuevo tamaño del conte de btns, de acuerdo al total de btns
        $(".d_menupasosnum").css({"height":newSizebtn+"px","width":"100%"});//Asigna el nuevo tamano del btn
    }
    $("#d_menupasosgrlprev").prop('disabled', true);//Deshabilita el btn prev al inicio.
    $("#d_menupasosgrlnext").prop('disabled', false);//Habilita el btn next al inicio.
    $("#d_menupasosgrlprevconte").addClass("d_menupasosgrldisable");//Agrega estilo de deshabilitado
    $("#d_menupasosgrlnextconte").removeClass("d_menupasosgrldisable");//Quita estilo de deshabilitado
    
    
    /////////////////Aqui hay que checar como hacer para cuando redimensione
    
    $(".d_menupasosnum").removeClass("d_addbtnpress");//Quita estilo de btn presionado a todos
    $(".d_menupasosbtnsconte").css({"top":"0%","left":"0%"});//Resetea posicion al cambio de orientacion
    conteClic = 0;//Resetea contador al cambio de orientacion
    
    ////////////////
    
    
    totalBtnsview = [0];
    
    for(i=1;i<=50;i++){
        
        var sumaCont = conteo*i;
        if(sumaCont <= totalPasos){
            totalBtnsview.push(sumaCont);
        }else{
            totalBtnsview.push(totalPasos);
            console.log(totalBtnsview);
            return false;
        }
    }
    
}

var totalBtnsview = [];

var conteClic = 0;
function prevBtns(){
    /*
    * NOMBRE: prevBtns.
    * UTILIDAD: Clic para prev de botones de pasos
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    conteClic--;
    if(getOrientation === "portrait"){
        $(".d_menupasosbtnsconte").transition({"left":-(conteClic*100)+"%"},1000);
    }else{
        $(".d_menupasosbtnsconte").transition({"top":-(conteClic*100)+"%"},1000);
    }
    
    if(conteClic < largeConte-1){
        $("#d_menupasosgrlnext").prop('disabled', false);//Habilita btn
        $("#d_menupasosgrlnextconte").removeClass("d_menupasosgrldisable");//Quita estilo de deshabilitado
    }
    if(conteClic === 0){
        $("#d_menupasosgrlprev").prop('disabled', true);//Deshabilita btn
        $("#d_menupasosgrlprevconte").addClass("d_menupasosgrldisable");//Agrega estilo de deshabilitado
        //console.log("PREV END");
    }
    //console.log(conteClic);
}
function nextBtns(){
    /*
    * NOMBRE: nextBtns.
    * UTILIDAD: Clic para next de botones de pasos
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    conteClic++;
    if(getOrientation === "portrait"){
        $(".d_menupasosbtnsconte").transition({"left":-(conteClic*100)+"%"},1000);
    }else{
        $(".d_menupasosbtnsconte").transition({"top":-(conteClic*100)+"%"},1000);
    }
    
    if(conteClic > 0){
        $("#d_menupasosgrlprev").prop('disabled', false);//Habilita btn
        $("#d_menupasosgrlprevconte").removeClass("d_menupasosgrldisable");//Quita estilo de deshabilitado
    }
    if(conteClic === largeConte-1){
        $("#d_menupasosgrlnext").prop('disabled', true);//Deshabilita btn
        $("#d_menupasosgrlnextconte").addClass("d_menupasosgrldisable");//Agrega estilo de deshabilitado
        //console.log("NEXT END");
    }
    //console.log(conteClic);
}
var statusGestos = true;//Indica que meergente de gestos aparece
function eventBtnspasos(){
    /*
    * NOMBRE: eventBtnspasos.
    * UTILIDAD: Clic para cada boton de pasos
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    
    console.log(contNext);
    
    $(".d_menupasosnum").off().on("mouseup",function(){

        
        //Detecta si la animacion de intro ya termino
        
        console.log("CLICK PASO ***********************");
        
        //$("#d_btnsopcgrlplaysvg").hide();//Cambia icon de play a reiniciar
        //$("#d_btnsopcgrlreinsvg").show();//Cambia icon de reiniciar a play
        $(".d_menupasosnum").removeClass("d_addbtnpress");//Quita estilo de btn presionado a todos
        $(this).addClass("d_addbtnpress");//Agrega estilo de press al btn presionado
        getBtnpress = $(this).attr("id");//Obtiene el texto (numero de boton)
        //console.log(getBtnpress);
        
        $(".d_btngrltextstepnum").text(getBtnpress);
        
        $("#"+getBtnpress).removeClass('d_addbtnok');//Si es un btn ya completado, quita indicador de paso completado
        
        
        
        //Indica cuando la animacion de iontro termina y se da click en el primer paso
        if(animaEnd === true){
            addTubeanima();//Establece la animacion con tween de la cuerda. En la animacion de intro no hace la animacion de cuerda
            animaIntro = false;//Ya no gira 360°
            stepsStar = true;//Detecta que inician los pasos con el click en algun boton
            $("#1").removeClass("d_flash");//Quita indicador en el primer paso
            
            //$("#d_btnsopcgrlpiezas").remove();//Quita btn de piezas, ya que se muestran flotantes en cada paso
            $("#d_btnsopcgrl").remove();//Quita btn de piezas, ya que se muestran flotantes en cada paso
            
            if(statusGestos){//Si ya el emergente de gestos aparecio
                $("#d_emergentegestos").show();//Aparece emergente de gestos
                addemergenteGestos();//Detecta el cambio de dispositivo para emergente de gestos
                statusGestos = false;//Indica que meergente de gestos desaparece
            }else{//Ya no aparece emergente de gestos
                emergenteGestosclose();//Cierra emergente de gestos
            }

            animaIntro = false;//Gira 360° ya no aplica
            
            $("#d_btngrlnext, #d_btngrlprev").fadeIn(0);//Muestra botones de next y prev
        }
        
        
        if(typeAnima){//Si es animacion de pasos (al inicio no se repite)
            for(var i = 0; i<=addAnimatesteps.length-1; i++){//Recorre las animaciones almacenadas
                addAnimatesteps[i].stop();//Detiene las animaciones tween. Esto es porque tienen repeticion
            }
        }
        
        
        setStepview();//Establece expand, camara, piezas y posicion de escenario en cada paso en arreglo.
        addExpand();//Establece la expancion y animacion de las piezas por cada paso
        addAnimacamera();//Establece la nueva posicion animada de camara y escena en cada paso
        controlGroups();//Modifica que piezas se muesran o se ocultan en determinados pasos para hacer los grupos.

        contNext = Number(getBtnpress);//Saber en que paso se esta, ya sea por btn de carrusel o por btn de next y prev
        
        console.log("Step "+contNext);
        
        $(".d_laminarope").remove();//Quita btn para abrir la lamina de cuerda
        $(".d_laminaropeconte").remove();//Quita la lamina de cuerda
        
        if(specialCase === false && animaEnd){//En armado tornillo no se agregan asi las piezas
            $(".d_piezasgrlopcfloat").remove();//Elimina todos las piezas
            imgPiezas("stepsfloat");//Establece la imagen de las piezas por paso
        }
        
        
        $("#d_btnsopcgrlplay").show();
        
        if(getBtnpress === ropeStep){//El paso de la cuerda ocupa mas tiempo
            $("#d_btnsopcgrl").append('<div class="d_laminarope d_laminarope_pulse" onclick="eventOpenlamina();"><svg viewBox="0 0 60 60"><path fill-rule="evenodd" clip-rule="evenodd" d="M37.275,38.219c-0.513,2.883-2.047,3.986-5.066,3.626 c-0.225,0.644-0.463,1.321-0.699,1.999c-2.504,7.175-10.991,9.713-16.894,4.989c-3.093-2.474-4.453-5.78-3.892-9.724 c0.585-4.096,2.885-6.943,6.719-8.524c0.801-0.328,1.639-0.582,2.444-0.858c0.149-3.708,0.683-4.468,3.654-5.212 c0.716-2.978,2.053-3.923,5.378-3.564c0.372-1.748,0.897-3.513,1.082-5.312c0.17-1.638-0.451-3.149-1.579-4.414 c-0.836-0.934-0.802-1.416,0.087-2.314c1.054-1.069,2.128-2.113,3.178-3.187c0.646-0.661,1.24-0.642,1.884,0.013 c1.649,1.682,2.729,3.682,3.389,6.041c3.568-0.745,6.8-0.051,9.579,2.322c1.961,1.67,3.153,3.812,3.555,6.346 c0.473,2.994-0.161,5.771-1.972,8.224c-1.785,2.413-4.336,3.65-6.892,4.276c-0.339,1.35-0.462,2.563-0.952,3.61 C39.744,37.705,38.543,38.094,37.275,38.219z M27.817,38.069c-0.517,1.503-0.955,2.967-1.52,4.382 c-1.441,3.646-6.072,4.607-8.795,1.867c-2.789-2.816-1.718-7.442,2.075-8.88c1.362-0.514,2.752-0.942,4.158-1.419 c-1.796-2.506-2.02-2.585-4.688-1.711c-0.267,0.09-0.53,0.178-0.791,0.28c-3.763,1.493-5.992,5.276-5.405,9.178 c0.589,3.9,3.776,6.906,7.694,7.256c3.994,0.362,7.556-2.016,8.847-5.906c0.965-2.903,0.965-2.903-1.333-4.933 C28.035,38.163,27.996,38.158,27.817,38.069z M37.679,17.277c-0.104,0.009-0.001,0.025,0.091-0.008 c3.3-1.172,6.192,0.917,6.956,3.434c0.93,3.072-1.03,6.17-3.972,6.888c-1.237,0.299-2.42,0.787-3.771,1.238 c0.34,0.341,0.602,0.529,0.77,0.782c1.041,1.568,2.278,1.639,3.977,0.948c2.069-0.849,3.862-1.889,5.076-3.808 c1.826-2.889,1.674-6.88-0.379-9.545c-2.199-2.852-5.777-4.121-8.831-3.168C37.626,15.127,37.654,16.201,37.679,17.277z M33.47,28.396c-1.604-1.603-3.198-3.216-4.813-4.807c-0.796-0.775-1.754-0.799-2.408-0.123c-0.668,0.684-0.616,1.604,0.183,2.403 c3.146,3.172,6.302,6.328,9.474,9.472c0.878,0.874,1.768,0.912,2.472,0.189c0.697-0.715,0.633-1.566-0.25-2.467 C36.584,31.5,35.023,29.95,33.47,28.396z M29.619,32.101c-1.605-1.607-3.191-3.229-4.82-4.808 c-0.721-0.706-1.707-0.677-2.349-0.035c-0.622,0.627-0.646,1.528,0.06,2.24c3.264,3.302,6.553,6.574,9.852,9.842 c0.682,0.674,1.534,0.645,2.157,0.062c0.667-0.629,0.719-1.506,0.124-2.261c-0.177-0.215-0.384-0.404-0.581-0.601 C32.582,35.059,31.099,33.577,29.619,32.101z M32.66,8.064c-0.747,0.746-1.492,1.49-2.229,2.227 c1.994,2.862,2.177,5.871,1.122,9.031c-0.275,0.822-0.575,1.64-0.797,2.484c-0.07,0.277-0.025,0.71,0.152,0.91 c0.604,0.706,1.294,1.335,1.974,2.014C36.15,19.074,36.044,11.727,32.66,8.064z M41.758,19.981 c-1.595-1.548-4.292-1.017-5.201,1.12c-0.692,1.635-1.194,3.346-1.739,5.032c-0.221,0.685,0.204,1.093,0.883,0.877 c1.693-0.548,3.4-1.047,5.042-1.725C42.895,24.401,43.388,21.577,41.758,19.981z M19.235,37.988 c-1.109,1.087-1.426,2.467-0.979,3.642c0.459,1.22,1.583,2.022,2.877,2.063c1.334,0.04,2.617-0.729,3.116-2.031 c0.628-1.621,1.161-3.274,1.695-4.931c0.239-0.751-0.166-1.141-0.922-0.899c-1.619,0.508-3.237,1.044-4.841,1.61 C19.765,37.59,19.404,37.89,19.235,37.988z"/></svg></div>');//Agrega btn para abrir lamina de cuerda
        }
        if(specialCase === false){//En tornillo no tiene evento de teclado
            document.removeEventListener('keydown', keyEvent, false );//Quita evento de teclado para atras y adelante
        }
        enabledDisabledbtns("disabled", "all");//Habilita o desabilita btns en los pasos
        var timeSteps = setTimeout(function(){
            if(specialCase === false){//En tornillo no tiene evento de teclado
                document.addEventListener('keydown', keyEvent, false );//Evento de teclado para atras y adelante
            }
            if(getBtnpress === ropeStep){//El paso de la cuerda ocupa mas tiempo
                var setTime = setTimeout(function(){
                    enabledDisabledbtns("enabled","all");//Habilita o desabilita btns en los pasos
                    clearTimeout(setTime);//Limpia tiempo
                },timeGrl);
            }else{//Tiempo de todos los pasos
                enabledDisabledbtns("enabled", "all");//Habilita o desabilita btns en los pasos
                if(contNext === 1){//Acciones para para el primer paso
                    console.log("INICIO");
                    enabledDisabledbtns("disabled", "prev");//Habilita o desabilita btns en los pasos
                }
                else if(contNext === totalPasos){//Acciones para el ultimo paso
                    console.log("FINAL");
                    enabledDisabledbtns("disabled", "next");//Habilita o desabilita btns en los pasos
                }else{//Acciones para pasos intermedios
                    enabledDisabledbtns("enabled", "all");//Habilita o desabilita btns en los pasos
                    console.log("INTERMWDIO");
                }
                clearTimeout(timeSteps);//Limpia tiempo
            }console.log("TIMEEEEEEEEEEEEEEE");
        },timeGrl*3);
        jumpBtns();//Rango de botones en que el se esta en el carrusel 
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
var contNext = 1;//Saber en que paso se esta, ya sea por btn de carrusel o por btn de next y prev
function eventBtnsprev(){
    /*
    * NOMBRE: eventBtnsprev.
    * UTILIDAD: Clic para preview
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    contNext--;
    $("#"+contNext).trigger("mouseup");
}
function eventBtnsnext(){
    /*
    * NOMBRE: eventBtnsnext.
    * UTILIDAD: Clic para next
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    contNext++;
    $("#"+contNext).trigger("mouseup");
}
function keyEvent(event) {
    /*
    * NOMBRE: keyEvent.
    * UTILIDAD: Evento de teclas para atras y siguiente
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    var codeKey = event.which || event.keyCode;//Obtiene tecla presionada
    //console.log(codeKey);
    if (codeKey === 37 && contNext > 0){//Desde paso inicial y ya no funciona el enter
        eventBtnsprev();//Clic para preview
    }
    if (codeKey === 39 && contNext < totalPasos){//Al paso final y ya no funciona el enter
        eventBtnsnext();//Clic para next
    }
}
var newVal = 0;//Rango de btns en el que estamos
function jumpBtns(){
    /*
    * NOMBRE: jumpBtns.
    * UTILIDAD: Rango de botones en que el se esta en el carrusel
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    //Establece en que rango de btns estamos (del 1 al 11 es 0, del 12 al 22 es 1, etc)
    for(i=0; i<=totalBtnsview.length-1; i++){
        if(contNext > totalBtnsview[i] && contNext <= totalBtnsview[i+1]){
            newVal = i;//Rango de btns
        }
    }
    
    //Avanzar btns
    if(contNext === totalBtnsview[conteClic+1]+1){
        nextBtns();//Clic para next de botones de pasos
        console.log("NEXT "+newVal);
    }
        
    //Retroceder btns
    for(i=0; i<=totalBtnsview.length; i++){
        if(newVal === i){//Solo si ya avanzo al siguiente rango de btns
            if(contNext === totalBtnsview[conteClic]){
                prevBtns();//Clic para prev de botones de pasos
                console.log("PREV "+newVal);
            }
        }
    }
        
    
}
function playAnima(){
    /*
    * NOMBRE: playAnima.
    * UTILIDAD: Clic para hacer animacion en cada paso
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    
    if(stepsStar === true){
        $("#"+contNext).trigger("mouseup");//Inicia en el primer paso
    }else{
        console.log("REINICIA");
        iniciaAnima();//Inicia la animacion despues de construirse los modelos 3D
    }
    
    
    
    //$("#d_btnsopcgrlplay").addClass("d_btngrlinactive");//Agrega desactivado
    //$("#d_btnsopcgrlplayinput").prop('disabled', true);//Deshabilita el btn play.
    
    /*
    var newTime;//Tiempo para esperar y animar cada paso
    newTime = setTimeout(function(){
        $("#d_btnsopcgrlplay").removeClass("d_btngrlinactive");//Quita desactivado
        $("#d_btnsopcgrlplayinput").prop('disabled', false);//Habilita el btn play.
    },timeGrl*2);
    */
    
    //$("#d_btnsopcgrlplay").addClass("d_btngrlinactive");//Agrega clase de deshabilitar a btn play.
    //$("#d_btnsopcgrlplayinput").prop('disabled', true);//Deshabilita el btn play.
    
    /*
    if(stateBtn === "rein"){
        //addExpand();//Establece la expancion de las piezas por cada paso
        //setTween();//Establece render de Tween
        //console.log("reiniciar");
        $("#d_btnsopcgrlplaysvg").show();//Cambia icon de reiniciar a play
        $("#d_btnsopcgrlreinsvg").hide();//Cambia icon de play a reiniciar
        stateBtn = "play";
    }else{
        //alert();
        $("#d_btnsopcgrlplaysvg").hide();//Cambia icon de play a reiniciar
        $("#d_btnsopcgrlreinsvg").show();//Cambia icon de reiniciar a play
        setTween();//Establece render de Tween
        stateBtn = "rein";
        //console.log("play");//Saber si el btn de reproducir animacion esta en "play" o "reiniciar"
    }
    */
}

function eventClosepiezas(){
    /*
    * NOMBRE: eventClosepiezas.
    * UTILIDAD: Clic para cerrar emergente de piezas
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    $(".d_piezasgrlopc").remove();//Elimina todos los trazos
    $("#d_piezasgrl").fadeOut();//Oculta ventana de piezas
}
function eventOpenpiezas(){
    /*
    * NOMBRE: eventOpenpiezas.
    * UTILIDAD: Clic para abrir emergente de piezas
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    if(stepsStar === true && animaEnd){
        imgPiezas("steps");//Establece la imagen de las piezas por paso
    }
    if(stepsStar === false && animaEnd){
        console.log("REINICIA");
        imgPiezas("general");//Establece la imagen de las piezas generales
    }
}
function eventOpenlamina(){
    /*
    * NOMBRE: eventOpenlamina.
    * UTILIDAD: Clic para abrir lamina de paso de cuerda
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    $(".d_contegrl").append('<div class="d_laminaropeconte"><div class="d_laminaropeconteclose" onclick="eventCloselamina();"><svg viewBox="0 0 58 58"><path d="M35.848,29l7.992-7.989c0.839-0.844,0.839-2.206,0-3.048l-3.802-3.803c-0.842-0.84-2.203-0.84-3.047,0 L29,22.154l-7.989-7.994c-0.844-0.84-2.205-0.84-3.048,0l-3.802,3.803c-0.838,0.842-0.838,2.204,0,3.048L22.154,29l-7.992,7.989 c-0.839,0.844-0.839,2.206-0.001,3.049l3.802,3.802c0.844,0.841,2.205,0.84,3.048,0L29,35.847l7.991,7.993 c0.844,0.841,2.205,0.84,3.047,0l3.802-3.802c0.839-0.843,0.839-2.205,0-3.049L35.848,29z"/></svg></div></div>');//Agrega btn para abrir lamina
    $(".d_laminarope").removeClass('d_laminarope_pulse');//Quita pulso de btn
}
function eventCloselamina(){
    /*
    * NOMBRE: eventCloselamina.
    * UTILIDAD: Clic para cerrar lamina de paso de cuerda
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    $(".d_laminaropeconte").remove();//Quita la lamina de cuerda
    $(".d_laminarope").addClass('d_laminarope_pulse');//Agrega pulso de btn
}
function imgPiezas(type){
    /*
	* NOMBRE: imgPiezas.
	* UTILIDAD: Establece la imagen de las piezas
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    
    if(type === "steps"){//Agrega piezas por paso
        $("#d_piezasgrl").fadeIn();//Muestra ventana de piezas
        stepsResize();//Calcula el tamaño del contenedor de piezas
        $(".d_piezasgrlhead").text("Localiza en tu kit todas las piezas necesarias para este paso");
        //Agrega las piezas por paso
        for(var i=0; i<=svgNum[contNext-1][0].length-1; i++){
            
            setName(i,"pasos");//Establece el nombre final de la pieza, en relacion al tecnico
            
            $("#d_piezasgrlbody").append('<div class="d_piezasgrlopc"><div class="d_piezasgrlopcin"><div class="d_piezasgrlimg '+svgNum[contNext-1][0][i]+'"></div><div class="d_piezasgrlname">'+finalName+'</div><div class="d_piezasgrldata">'+svgNum[contNext-1][1][i]+'</div></div></div>');
            //Paso de mover, quita cantidad
            if(svgNum[contNext-1][0][i] === "move"){//Ultimo paso
                $(".d_piezasgrldata").remove();//Quita cantidad de objetos
            }
        }
        //Ultimo paso, quita cantidad
        if(contNext === totalPasos){//Ultimo paso
            $(".d_piezasgrldata").remove();//Quita cantidad de objetos
        }
        
    }else if(type === "stepsfloat"){
        console.log("PASO_FLOAT "+contNext);
        var timeStep;//Tiempo de animacion piezas
        timeStep = setTimeout(function(){//Tiempo de animacion piezas
            //Agrega las piezas por paso
            for(var i=0; i<=svgNum[contNext-1][0].length-1; i++){

                setName(i,"pasos");//Establece el nombre final de la pieza, en relacion al tecnico

                $(".d_stepsfloat").append('<div class="d_piezasgrlopcfloat"><div class="d_piezasgrlopcin"><div class="d_piezasgrlimg '+svgNum[contNext-1][0][i]+'"></div><div class="d_piezasgrlname">'+finalName+'</div><div class="d_piezasgrldata">'+svgNum[contNext-1][1][i]+'</div></div></div>');
                //Paso de mover, quita cantidad
                if(svgNum[contNext-1][0][i] === "move"){//Ultimo paso
                    $(".d_piezasgrldata").remove();//Quita cantidad de objetos
                }
            }
            //Ultimo paso, quita cantidad
            if(contNext === totalPasos){//Ultimo paso
                $(".d_piezasgrldata").remove();//Quita cantidad de objetos
            }
            clearTimeout(timeStep);//Limpia tiempo
        },0/*(timeGrl*3)+10*/);
        
        
    }else{//Agrega todas las piezas que se ocupan para el modelo
        $("#d_piezasgrl").fadeIn();//Muestra ventana de piezas
        stepsResize();//Calcula el tamaño del contenedor de piezas
        $(".d_piezasgrlhead").text("Localiza en tu kit todas las piezas necesarias para construir tu modelo");
        //Agrega todas las piezas
        console.log("#####################");
        console.log(svgNumtotal);
        for(var i=0; i<=svgNumtotal.length-1; i++){
            
            setName(i,"general");//Establece el nombre final de la pieza, en relacion al tecnico
            
            $("#d_piezasgrlbody").append('<div class="d_piezasgrlopc"><div class="d_piezasgrlopcin"><div class="d_piezasgrlimg '+svgNumtotal[i][0]+'"></div><div class="d_piezasgrlname">'+finalName+'</div><div class="d_piezasgrldata">'+svgNumtotal[i][1]+'</div></div></div>');
        }
    }
    stepsResize();//Calcula el tamaño del contenedor de piezas
}
function setName(varPress,type){
    /*
	* NOMBRE: setName.
	* UTILIDAD: Establece el nombre final de la pieza, en relacion al tecnico
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    var allTecniconames = [//Arreglo de cambio de nombre tecnico - comun
        ["b11x1","Barra 11x1","b11x1"],
        ["b7x4","Barra 7x4","b7x4"],
        ["b7x1","Barra 7x1","b7x1"],
        ["b4x3","Barra 4x3","b4x3"],
        ["b4x1","Barra 4x1","b4x1"],
        ["u6x","Unión 6x5","u6x"],
        ["u5x","Unión 5x4","u5x"],
        ["u4x","Unión 4x3","u4x"],
        ["u3x","Unión 3x2","u3x"],
        ["u2x","Unión 2x1","u2x"],
        ["u1x","Unión 1x1","u1x"],
        ["poleaA","Polea A","pA"],
        ["poleaB","Polea B","pB"],
        ["poleaC","Polea C","pC"],
        ["hsmall","H corta","hCh"],
        ["hlarge","H larga","hG"],
        ["hang8","Unión 8","p8"],
        ["grade7","Heptágono","hep7"],
        ["flexLarge","Flexible 11x2","flexG"],
        ["circleBig","Engrane 56","cG"],
        ["circleA","Engrane 42","cA"],
        ["circleMiddle","Engrane 28","cM"],
        ["circleC","Engrane 21","cC"],
        ["circle1x","Engrane 14","c1x"],
        ["circle2x","Engrane 7","c2x"],
        ["arrow","Flecha 6","flecha"],
        ["arrowS","Flecha","flechaCh"],
        /*["topeS11mm","Tope 11 mm","tCh11mm"],*/
        ["topeL9mm","Tope 9 mm","tG9mm"],
        ["topeL6mm","Tope 6 mm","tG6mm"],
        ["topeS6mm","Tope angosto 6mm","tCh6mm"],
        ["cuerdaS","Cuerda 65 cm","cS"],
        ["cuerdaL","Cuerda 140 cm","cL"],
        ["bu3x","Barra unión 3x2","bu3x"],
        ["uLcorto","Unión L","uLch"],
        
        ["strawL","Popote 9.75 cm"],
        ["strawM","Popote 6.5 cm"],
        ["strawS","Popote 3.9 cm"],
        
        
        ["stickE5mm","Palito 5 mm x 22 cm"],
        ["stickL5mm","Palito 5 mm x 11 cm"],
        ["stickM5mm","Palito 5 mm x 7.3 cm"],
        ["stickS5mm","Palito 5 mm x 5.5 cm"],
        
        ["stickM4mm","Palito 4 mm x 10 cm"],
        ["stickS4mm","Palito 4 mm x 5 cm"],
        
        ["clone","Copia el armado"],
        ["end","Modelo completo"],
        ["move","Acomoda la pieza"],
        
        ["liga","Cuerda elástica 25cm","elástico"],
        
        ["bu1x","Barra unión 1x1","bu1x"],
        ["uE","Unión E","uE"],
        ["tornillo","Tornillo","tornillo"],
        ["poleaFull","Polea","poleaF"]
    ];
    if(type === "pasos"){
        for(var k=0; k<=allTecniconames.length-1; k++){
            if(svgNum[contNext-1][0][varPress].indexOf(allTecniconames[k][0]) != -1){
                finalName = allTecniconames[k][1];//Nombre comun de las piezas
            }
        }
    }
    if(type === "general"){
        for(var k=0; k<=allTecniconames.length-1; k++){
            if(svgNumtotal[varPress][0].indexOf(allTecniconames[k][0]) != -1){
                finalName = allTecniconames[k][1];//Nombre comun de las piezas
            }
        }
    }
}