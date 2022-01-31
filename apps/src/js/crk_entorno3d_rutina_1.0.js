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
var addentorno3dInstruccion = [];//Almacena instrucciones por cada paso
var addSimulacion = [];//Almacena pasos de simulacion
var addReflexion;//Almacena reflexion de la practica
var reajusteAnima = false;//Actualizar canvas al abrir el menu
var addAnima = false;//Indica si se esta animando la cuerda
var valData = [];//Almacena las caracteristicas a validar en los pasos
var allComponents = ["components"];//Todos los componentes desde archivo
var viewComponents = ["led","powerbank","protoboard","rgb","resistance","rgbc","pushbutton","cdcable","usbcable","switch","preset","buzzer","ldr","arduino","ultrasonic","acadapter","accontact"];//Componentes agregados a la lista del menu
var addComponents = [];//Componentes que van a estar disponibles para la practica en especifico (se crean los gltf)
setCamerapos = [10,10,10];//Establece la posicion de la camara
setScenepos = [0,0,0];//Establece la posicion de la camara
gridPosy = -0.4;//Posicion de la reticula en cada modelo
arrayGltf = ["components"];//Guarda los GLTF que se construyen en cada practica.
is3D = true;//Determina si es entorno3d para guardar y abrir proyecto
/*************************************************************************************
*
* 								FUNCIONES Y PROCEDIMIENTOS
*
**************************************************************************************/
$(document).ready(function(){});
$(window).on('load',function(){
    /*
	* NOMBRE: load.
	* UTILIDAD: Una vez abierto el dom
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    muestraInstrucciones("pxbentorno3d");//Muestra las instrucciones de la aplicación.
});
function iniciaEntorno3dpxb(){
    /*
	* NOMBRE: iniciaEntorno3dpxb.
	* UTILIDAD: Inicia entorno 3d de electronica
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    is3D = true;//Determina si es entorno3d para guardar y abrir proyecto
    generalObjs();////Crea objetos generales
    dragDropcomponents();//Draggable, droppable y sortable de elementos
    startRaycaster();//Inicia raycaster
    clickentorno3dPasos("instruccion");//Click en btn de pasos instrucciones y preguntas simulacion
    var timeSet = setTimeout(function(){
        //$("#d_pxbentorno3dstepsbtns_1").trigger("pointerdown");//Inicia con el primer paso
        $("#d_pxbentorno3dstepsbtns_1").addClass('d_pxbentorno3dstepsbtnsanima');//Agrega animacion de paso 1
        clearTimeout(timeSet);//Limpia tiempo
    },1000);
    setlistComponents();//Establece los componentes que apareceran en cada practica
    resizelistComponents()//Ajusta el tamaño de la lista de componentes
    addemergenteGestos();//Detecta el cambio de dispositivo para emergente de gestos
    $(window).resize(function(){
        /*
        * NOMBRE: resize.
        * UTILIDAD: Detecta el resize del navegador
        * ENTRADAS: Ninguno.
        * SALIDAS: Ninguna.
        */
        if(startInit){//Hay canvas 3d en la aplicacion
            reajusteConte3d();//Reajusta el contenido 3d en resize
        }
        resetResize3darea();//Resetea la posicion del menu
        resizelistComponents()//Ajusta el tamaño de la lista de componentes
    });
    $(window).on("orientationchange",function(event){
        /*
        * NOMBRE: orientationchange.
        * UTILIDAD: Detecta el cambio de orientacion del dispositivo
        * ENTRADAS: event > evento orientacion.
        * SALIDAS: Ninguna.
        */
        console.log("ORIENTATION CHANGE");
        if(startInit){//Hay canvas 3d en la aplicacion
            reajusteConte3d();//Reajusta el contenido 3d en resize
        }
        resetResize3darea();//Resetea la posicion del menu
        resizelistComponents()//Ajusta el tamaño de la lista de componentes
        var timeSet = setTimeout(function(){
            $("#d_pxbentorno3dstepsbtns_1").trigger("pointerdown");//Inicia con el primer paso
            clearTimeout(timeSet);//Limpia tiempo
        },100);
    })
}
function addemergenteGestos(){
    /*
	* NOMBRE: addemergenteGestos.
	* UTILIDAD: Detecta el cambio de dispositivo para emergente de gestos
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    $("#d_pxbentorno3dgestoscenter").removeClass('d_pxbentorno3dgestos_tactil');//Quita clase dispositivo
    $("#d_pxbentorno3dgestoscenter").removeClass('d_pxbentorno3dgestos_mouse');//Quita clase pc
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){//Es dispositivo
        $("#d_pxbentorno3dgestoscenter").addClass('d_pxbentorno3dgestos_tactil');//Agrega clase de dispositivo
    }else{//Es PC
        $("#d_pxbentorno3dgestoscenter").addClass('d_pxbentorno3dgestos_mouse');//Agrega clase de pc
    }
}
function emergenteGestosclose(){
    /*
	* NOMBRE: emergenteGestosclose.
	* UTILIDAD: Cierra emergente de gestos
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    $("#d_pxbentorno3dgestos").remove();//Quita emergente de gestos
}
function viewEntorno3d(getId){
    /*
	* NOMBRE: viewEntorno3d.
	* UTILIDAD: Abre vista de entorno 3d
	* ENTRADAS: getId > id del objeto.
	* SALIDAS: Ninguna.
    */
    var getName = getId.split("btn")[1];//Obtiene id de btn presionado
    viewActions(getName);//Muestra y agrega datos a la vista que se selecciono
}
function setlistComponents(){
    /*
	* NOMBRE: setlistComponents.
	* UTILIDAD: Establece los componentes que apareceran en cada practica
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    viewComponents.forEach(function(item){//Recorre la lista de todos los componentes
        if(addComponents.includes(item) === false){//Compara la lista de todos los componentes, con la lista de componentes agregados en la practica
            $("#d_comp_"+item).parent().remove();//Elimina los que no incluya
        }
    });
}
function resizelistComponents(){
    /*
	* NOMBRE: resizelistComponents.
	* UTILIDAD: Ajusta el tamaño de la lista de componentes
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    var setTime = setTimeout(function(){
        var saveHeight = $(".d_pxbcomponentsbtn").outerHeight();//Altura de cada componente
        var saveWidth = $(".d_pxbcomponentsbtn").outerWidth();//Anchura de cada componente
        if(getOrientation === "portrait"){//Portrait
            $(".d_pxbcomponentsconte").css({"width":saveWidth*(addComponents.length+1),"height":"100%"});//Establece el ancho del contenedor de la lista de componentes
        }else{//Landscape
            $(".d_pxbcomponentsconte").css({"height":saveHeight*(addComponents.length+1),"width":"100%"});//Establece el alto del contenedor de la lista de componentes
        }
        clearTimeout(setTime);//Limpia tiempo
    },500);
    
}
var addNewcomponent = null;//Objeto que se agrega a escena
var autostartRaycaster = false;//Indica si el objeto se arrastra y suelta a la scena, o es manipulado de los que ya estan en scena
var mouseStart = false;//Status para evento en touch (targetTouches)
function dragDropcomponents(){
    /*
	* NOMBRE: dragDropcomponents.
	* UTILIDAD: Draggable, droppable y sortable de elementos
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    $(".d_pxbimg").draggable({//Drag de los botones desde el menu
        containment: '#viewEntorno3d',
        helper: 'clone',
        appendTo: '#viewEntorno3d',
        zIndex: 1,
        scrollSensitivity: 100,
        scrollSpeed: 10,
        start: function(event,ui){},
        drag: function(){},
        stop: function(){}
    });
    //var valor;
    $("#d_pxbentorno3d").droppable({//Al soltar componente
        over: function(event, ui){
            var getId = ui.helper.prevObject[0].id.split("_")[2];//Obtiene el nombre del componente con el id
            console.log(getId);
            addObjects(getId);//Agrega objetos con el drop
            emergenteGestosclose();//Cierra emergente de gestos
            ui.helper.remove();//Quita elemento de clone, al estar sobre lo droppable
            var getIddata = null;//Obtiene dato del componente en curso
            if(getId === "jumper"){
                getIddata = scene.children[scene.children.length-1].name.split(" ")[1];//Obtiene el numero del componente en curso (mediante el jumper)
                addObj();//Manipula componente que se arrastra
            }else{
                getIddata = scene.children[scene.children.length-1].name.split(" ")[0];//Obtiene el numero del componente en curso
                addObj();//Manipula componente que se arrastra
            }
            function addObj(){
                /*
                * NOMBRE: addObj.
                * UTILIDAD: Manipula componente que se arrastra
                * ENTRADAS: Ninguna.
                * SALIDAS: Ninguna.
                */
                console.log(getIddata);
                allClones.forEach(function(item){//Busca el componente agragado
                    if(item.name.split(" ")[0] === getIddata){
                        console.log(item);
                        addNewcomponent = item;//Objeto que se agrega a escena
                        autostartRaycaster = true;//Se arrastra y suelta a escena
                        mouseStart = true;//Status para evento en touch (targetTouches)
                        selectObj = item;//Asigna el nuevo componente a objeto que se mueve con el mouse
                        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){//Es dispositivo
                            startTouchStart();//Inicia click, como si fuera a ser click en raycaster
                        }else{//Es PC
                            startPointerDown();//Inicia click, como si fuera a ser click en raycaster
                        }
                    }
                });
            }
        }
        /*
        drop: function(event, ui){
            var getId = ui.helper.prevObject[0].id.split("_")[2];//Obtiene el nombre del componente con el id
            console.log(getId);
            addObjects(getId);//Agrega objetos con el drop
            emergenteGestosclose();//Cierra emergente de gestos
        }
        */
    });
}
var statuscomponentsMenu = "hide";//El menu aparece al inicio
function resize3darea(){
    /*
	* NOMBRE: resize3darea.
	* UTILIDAD: Escala el area de 3d, para que este visible junto con el menu de components
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    var heightSteps = $("#d_pxbentorno3dsteps").outerHeight()-2;//Obtiene el alto de pasos
    var widthMenu = $(".d_pxbviewcomponents").outerWidth();//Obtiene el ancho del menu
    var heightMenu = $(".d_pxbviewcomponents").outerHeight();//Obtiene el alto del menu
    reajusteAnima = true;//Actualiza canvas
    if(statuscomponentsMenu === "show"){//Se muestra el menu
        $(".d_pxbviewcomponentsbtn").addClass("d_pxbviewcomponentsbtn_hide", timeAnima,"easeInOutCubic");//Animacion del btn que oculta y muestra menu
        if(getOrientation === "landscape"){//Orientacion landscape
            $(".d_pxbviewcomponents").transition({"right":"calc("+(-widthMenu)+"px + 0.5rem)","top":heightSteps,"height":"calc(100%  - "+heightSteps+"px)"},timeAnima);//Animacion menu
            $("#d_pxbentorno3d").transition({"top":heightSteps,"width":"calc(100% - 0.5rem)","height":"calc(100% - "+heightSteps+"px)"},timeAnima);//Animacion canvas
        }else{//Orientacion portrait
            $(".d_pxbviewcomponents").transition({"bottom":"calc("+(-heightMenu)+"px + 0.5rem)","top":"initial","height":"11.5rem"},timeAnima);//Animacion menu
            $("#d_pxbentorno3d").transition({"top":heightSteps,"height":"calc(100% - "+heightSteps+"px - 0.5rem)","width":"100%"},timeAnima);//Animacion canvas
        }
        statuscomponentsMenu = "hide";//El menu esta oculto
    }else{//Se oculta el menu
        $(".d_pxbviewcomponentsbtn").removeClass("d_pxbviewcomponentsbtn_hide", timeAnima,"easeInOutCubic");//Animacion del btn que oculta y muestra menu
        if(getOrientation === "landscape"){//Orientacion landscape
            $(".d_pxbviewcomponents").transition({"right":"0","top":heightSteps,"height":"calc(100%  - "+heightSteps+"px)"},timeAnima);//Animacion menu
            $("#d_pxbentorno3d").transition({"top":heightSteps,"width":"calc(100% - "+widthMenu+"px)","height":"calc(100% - "+heightSteps+"px)"},timeAnima);//Animacion canvas
        }else{//Orientacion portrait
            $(".d_pxbviewcomponents").transition({"bottom":"0","top":"initial","height":"11.5rem"},timeAnima);//Animacion menu
            $("#d_pxbentorno3d").transition({"top":heightSteps,"height":"calc(100% - "+heightSteps+"px - "+heightMenu+"px)","width":"100%"},timeAnima);//Animacion canvas
        }
        statuscomponentsMenu = "show";//El menu esta visible
    }
    var setTime = setTimeout(function(){
        reajusteAnima = false;//Actualiza canvas
        clearTimeout(setTime);//Limpia tiempo
    },timeAnima);
    
}
function resetResize3darea(){
    /*
	* NOMBRE: resetResize3darea.
	* UTILIDAD: Resetea la posicion del menu
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    var heightSteps = $("#d_pxbentorno3dsteps").outerHeight()-2;//Obtiene el alto de pasos
    var widthMenu = $(".d_pxbviewcomponents").outerWidth();//Obtiene el ancho del menu
    var heightMenu = $(".d_pxbviewcomponents").outerHeight();//Obtiene el alto del menu
    $(".d_pxbviewcomponentsbtn").removeClass("d_pxbviewcomponentsbtn_hide");//Animacion del btn que oculta y muestra menu
    if(getOrientation === "landscape"){//Orientacion landscape
        $(".d_pxbviewcomponents").css({"right":"0","top":heightSteps,"height":"calc(100% - "+heightSteps+"px)"});//Animacion menu
        $("#d_pxbentorno3d").css({"top":heightSteps,"width":"calc(100% - "+widthMenu+"px)","height":"calc(100% - "+heightSteps+"px)"});//Animacion canvas
    }else{//Orientacion portrait
        $(".d_pxbviewcomponents").css({"bottom":"0","top":"initial","height":"11.5rem"});//Animacion menu
        $("#d_pxbentorno3d").css({"top":heightSteps,"height":"calc(100% - "+heightSteps+"px - "+heightMenu+"px)","width":"100%"});//Animacion canvas
    }
    statuscomponentsMenu = "show";//El menu esta visible
}
var contObj = 0;//Contador de objetos
var newInd;//Almacena el indicador creado
var statusBattery = false;//La bateria aun no esta agregada
var statusPlug = false;//El adaptador de corriente aun no esta agregado
var contPinjumper = 0;//Contador para las posiciones del pin del jumper
function addObjects(useId){
    /*
	* NOMBRE: addObjects.
	* UTILIDAD: Agrega objetos con el drop
	* ENTRADAS: useId > Recibe el nombre del id del drop
	* SALIDAS: Ninguna.
    */
    var setInitialpos = [];//Almacena posicion inicial de objetos en x y
    setPosition();//Establece la posicion inicial de cada componente
    if(useId === "jumper"){//Agrega jumpers
        jumper = new classaddJumper(useId,setInitialpos[0][0],0.7,setInitialpos[0][1],0xffffff,setInitialpos[1][0],0.7,setInitialpos[1][1],true,[contObj,(contObj+1)]);
        jumper.creaJumper();
        contObj = contObj+2;//Agrega 2 objetos, porque son dos pines en el jumper
        //console.log(jumper);
    }else if(useId === "arduino"){//Agrega arduino
        gltfClone = new classClonegltf(useId,-4.15,-0.45,6,0,0,0,true,null);
        gltfClone.creaClonegltf();
        blockComponent(useId);//Bloquea el componente del menu, para evitar tener dos objetos en el escenario
    }else if(useId === "protoboard"){//Agrega protoboard
        gltfClone = new classClonegltf(useId,0,0,0,0,girRad*90,0,true,null);
        gltfClone.creaClonegltf();
        blockComponent(useId);//Bloquea el componente del menu, para evitar tener dos objetos en el escenario
    }else if(useId === "powerbank"){//Agrega power bank
        gltfClone = new classClonegltf(useId,-13,0.1,-3,0,girRad*90,0,true,null);
        gltfClone.creaClonegltf();
        blockComponent(useId);//Bloquea el componente del menu, para evitar tener dos objetos en el escenario
        statusBattery = true;//La bateria un ya esta agregada
        statusPlug = false;//El adaptador de corriente no esta agregado
        showbtnPower();//Muestra btn de power play
        playBtn();//Ejecuta acciones de validacion proyecto al tener bateria o energia
    }else if(useId === "accontact"){//Agrega power bank
        gltfClone = new classClonegltf(useId,-10,-0.15,-8,0,girRad*90,0,true,null);
        gltfClone.creaClonegltf();
        blockComponent(useId);//Bloquea el componente del menu, para evitar tener dos objetos en el escenario
    }else if(useId === "cdcable"){//Agrega corriente cable
        usb = new classaddUsb(useId,-13,0.1,-2.8,-8.5,0.7,2.375,-8.5,0.7,1.375,-11,0.5,2.25,true,[contObj,(contObj+1),null]);
        usb.creaUsb();
        blockComponent(useId);//Bloquea el componente del menu, para evitar tener dos objetos en el escenario
        contObj = contObj+2;//Agrega 2 objetos, porque son dos pines en el jumper
    }else if(useId === "acadapter"){//Agrega corriente cable
        usb = new classaddUsb(useId,-10,3.5,-6.5,-8.5,0.7,2.375,-8.5,0.7,1.375,-11,0.5,2.25,true,[contObj,(contObj+1),null]);
        usb.creaUsb();
        blockComponent(useId);//Bloquea el componente del menu, para evitar tener dos objetos en el escenario
        contObj = contObj+2;//Agrega 2 objetos, porque son dos pines en el jumper
        statusPlug = true;//El adaptador de corriente esta agregado
        statusBattery = false;//La bateria aun no esta agregada
        showbtnPower();//Muestra btn de power play
        playBtn();//Ejecuta acciones de validacion proyecto al tener bateria o energia
    }else if(useId === "usbcable"){//Agrega usb cable
        usb = new classaddUsb(useId,-13,0.1,-2.8,null,null,null,null,null,null,-7.7,0.12,4.9,true,[null,null,null]);
        usb.creaUsb();
        blockComponent(useId);//Bloquea el componente del menu, para evitar tener dos objetos en el escenario
    }else{//Agrega objetos
        gltfClone = new classClonegltf(useId,setInitialpos[0],0.7,setInitialpos[1],0,0,0,true,contObj);
        gltfClone.creaClonegltf();
        contObj++;//Agrega 1 objeto
    }
    removetooltipObj();//Quita el tooltip y menu edit de cada objeto
    hideWarning();//Oculta las advertencias sobre objetos
    function setPosition(){
        /*
        * NOMBRE: setPosition.
        * UTILIDAD: Establece la posicion inicial de cada componente
        * ENTRADAS: Ninguna.
        * SALIDAS: Ninguna.
        * VARIABLES: Ninguna
        */
        var measurePinjumper = [-1,-0.75,-0.5,-0.25,0,0.25,0.5,0.75,1];
        if(useId === "jumper"){
            setInitialpos = [[1,-1.125],[measurePinjumper[contPinjumper],-1.125]];
            contPinjumper++;
            if(contPinjumper > 8){
                contPinjumper = 0;
            }
        }else if(useId === "pushbutton"){
            setInitialpos = [3.75,0.625];
        }else if(useId === "switch"){
            setInitialpos = [3.75,0.375];
        }else{//Todos los demas
            setInitialpos = [3.75, -0.875];
        }
    }
    addRestcomponent(useId);//Agrega btn de eliminar component y funcionalidad del btn
}
function blockComponent(useId){
    /*
	* NOMBRE: blockComponent.
	* UTILIDAD: Bloquea el componente del menu, para evitar tener dos objetos en el escenario
	* ENTRADAS: useId > id del objeto.
	* SALIDAS: Ninguna.
    */
    var getDiv = $("#d_comp_"+useId).parent();//Obtiene el div padre del drag
    var getDiva = $("#d_comp_"+useId);//Obtiene el div btn del drag
    var getDivb = $("#d_comp_"+useId).next();//Obtiene el div hermano txt del drag
    getDiva.css({"opacity":"0.35"});//Aplica opacidad para inhabilitado
    getDivb.css({"opacity":"0.35"});//Aplica opacidad para inhabilitado
    getDiv.append('<div class="d_pxbcomponentsbtn_block"></div>');//Agrega div que bloquea el drag al div interno
}
var wireGrl2,usbObj,energyadapter;//Almacena objetos que componen el cable de corriente
var getIdbtnrest;//Obtiene el btn del objeto a eliminar
function addRestcomponent(getIduse){
    /*
	* NOMBRE: addRestcomponent.
	* UTILIDAD: Agrega btn de eliminar component y funcionalidad del btn
	* ENTRADAS: getIduse > id del objeto.
	* SALIDAS: Ninguna.
    */
    if(getIduse === 'powerbank' || getIduse === 'cdcable' || getIduse === 'usbcable' || getIduse === 'arduino' || getIduse === 'protoboard' || getIduse === 'acadapter'){//Componentes que no se mueven
        $("#d_comp_"+getIduse).parent().append('<div class="d_pxbcomponentsbtnrest" id="d_comp_rest_'+getIduse+'"><svg viewBox="0 0 60 60"><path d="M43.354,22.902H16.646c-0.219,0-0.396,0.176-0.396,0.395v26.708c0,0.219,0.178,0.396,0.396,0.396h26.707 c0.219,0,0.396-0.178,0.396-0.396V23.296C43.75,23.078,43.572,22.902,43.354,22.902z M23.51,44.93 c0,0.947-0.768,1.715-1.713,1.715c-0.947,0-1.715-0.768-1.715-1.715V28.173c0-0.947,0.768-1.713,1.715-1.713 c0.945,0,1.713,0.766,1.713,1.713V44.93z M31.713,44.93c0,0.947-0.768,1.715-1.713,1.715s-1.713-0.768-1.713-1.715V28.173 c0-0.947,0.768-1.713,1.713-1.713s1.713,0.766,1.713,1.713V44.93z M39.918,44.93c0,0.947-0.768,1.715-1.713,1.715 c-0.947,0-1.715-0.768-1.715-1.715V28.173c0-0.947,0.768-1.713,1.715-1.713c0.945,0,1.713,0.766,1.713,1.713V44.93z"/><path d="M40.586,13.367h-6.039v-2.57c0-0.219-0.176-0.396-0.395-0.396h-8.305c-0.219,0-0.395,0.178-0.395,0.396 v2.57h-6.039c-1.746,0-3.164,1.414-3.164,3.162v3.953h27.5v-3.953C43.75,14.781,42.332,13.367,40.586,13.367z"/></svg></div>');//Agrega btn de eliminar
    }
    $(".d_pxbcomponentsbtnrest").off().on("pointerdown touchstart", function(){
        getIdbtnrest = $(this).attr('id').split("_")[3];//Obtiene el nombre del objeto que se va a eliminar
        console.log("ICON PRESSED "+getIdbtnrest);
        
        objetoGrl = null;//Resetea objeto almacenado
        objNamegrl = null;//Resetea objeto almacenado
        pinbGrl = null;//Resetea objeto almacenado
        wireGrl = null;//Resetea objeto almacenado
        wireGrl2 = null;//Resetea objeto almacenado
        usbObj = null;//Resetea objeto almacenado
        energyadapter = null;//Resetea objeto almacenado
        
        var statusDcfind = true;//Status para saber si es cable dc
        var contJUmperpow = true;//Conteo de solo un cable de jumper de corriente
        scene.children.some(function(item){//Busca todos los objetos
            if(item.name.split(" ")[1] === getIdbtnrest){//Busca el objeto a eliminar igual al del Id
                
                objetoGrl = item;//Obtiene el objeto a eliminar
                objNamegrl = getIdbtnrest;//Obtiene el nombre del objeto a eliminar
                
                console.log("OBJETOS GRLS");
                statusDcfind = false;//No es cable dc
                return true;//Sale del recorrido some  
            } 
        });
        if(statusDcfind){//Si es cable dc y no fue otro componente
            findOther();//Busca de nuevo los componentes del cable dc
        }
        function findOther(){
            /*
            * NOMBRE: findOther.
            * UTILIDAD: Busca de nuevo los componentes del cable dc
            * ENTRADAS: Ninguna.
            * SALIDAS: Ninguna.
            * VARIABLES: Ninguna
            */
            getpinpowerA = false;//Aplica para jumper de CD
            getpinpowerB = false;//Aplica para jumper de CD
            getpinA = false;//Aplica para jumper
            getpinB = false;//Aplica para jumper
            scene.children.some(function(item){//Busca todos los objetos
                if(item.name.split(" ")[1] === "pinPowerpos"){//Busca el objeto a eliminar cable DC
                    console.log("CABLE ENERGY");

                    objetoGrl = item;//Obtiene el objeto a eliminar
                    objNamegrl = getIdbtnrest;//Obtiene el nombre del objeto a eliminar
                    getpinpowerA = true;//Aplica para jumper de CD
                    getpinpowerB = true;//Aplica para jumper de CD
                    scene.children.forEach(function(itemIn){
                        if(itemIn.name.split(" ")[1] === "pinPowerneg"){//Busca el objeto a eliminar
                            pinbGrl = itemIn;//Obtiene el objeto a eliminar
                        }
                        if(itemIn.name.split(" ")[0] === "jumperPow" && contJUmperpow){//Busca el objeto a eliminar
                            wireGrl = itemIn;//Obtiene el objeto a eliminar
                            contJUmperpow = false;//Termina conteo de un solo cable de jumper de corriente
                        }
                        if(itemIn.name.split(" ")[0] === "jumperPow"){//Busca el objeto a eliminar
                            wireGrl2 = itemIn;//Obtiene el objeto a eliminar
                        }
                        if(itemIn.name.split(" ")[1] === "usb"){//Busca el objeto a eliminar
                            usbObj = itemIn;//Obtiene el objeto a eliminar
                        }
                        if(itemIn.name.split(" ")[1] === "energyadapter"){//Busca el objeto a eliminar
                            energyadapter = itemIn;//Obtiene el objeto a eliminar
                        }
                    });
                    return true;//Sale del recorrido some
                }
            });
        }
        deleteBtn();//Eliminacion de cada objeto
        console.log(scene.children);
        removeRestcomponent(getIdbtnrest);//Agrega btn de eliminar component y funcionalidad del btn
    });
}
function removeRestcomponent(getIduse){
    /*
	* NOMBRE: removeRestcomponent.
	* UTILIDAD: Quita btn de eliminar component y funcionalidad del btn
	* ENTRADAS: getIduse > id del objeto.
	* SALIDAS: Ninguna.
    */
    if(getIduse === 'powerbank' || getIduse === 'cdcable' || getIduse === 'usbcable' || getIduse === 'arduino' || getIduse === 'protoboard' || getIduse === 'acadapter'){//Componentes que no se mueven
        console.log("REMOVE ICON "+getIduse);
        $("#d_comp_rest_"+getIduse).siblings(".d_pxbtxt").css({"opacity":"1"});//Restaura la opacidad del txt
        $("#d_comp_rest_"+getIduse).siblings(".d_pxbimg").css({"opacity":"1"});//Restaura la opacidad del btn
        $("#d_comp_rest_"+getIduse).prev().remove();//Quita div de bloqueo
        $("#d_comp_rest_"+getIduse).remove();//Quita btn de rest
    }
}
var planeFollow;//Plano para movimiento con raycaster
var boxInd;//Box para indicadores
function generalObjs(){
    //Crea objetos generales
    // Plano que ayuda a mover el objeto con raycaster. El raycaster es con el mouse y el plano para asi posisiconar el objeto seleccionado
    planeFollow = new THREE.Mesh(new THREE.PlaneBufferGeometry(300, 300, 1, 1),new THREE.MeshBasicMaterial({color: 0xffffff,transparent:true,opacity:0,wireframe:true}));
    planeFollow.visible = true;
    planeFollow.rotation.set(-1.5708, 0, 0);
    planeFollow.name = "grl planeGeometry";
    scene.add(planeFollow);
    //Box de indicador
    boxInd = new THREE.Mesh(new THREE.BoxBufferGeometry( 0.2, 0.2, 0.2, 1, 1, 1),new THREE.MeshLambertMaterial({color: 0xe3cb00,transparent:true,opacity:0,wireframe:false}));
    boxInd.position.set(0,0,0);
    boxInd.name = "grl boxInd";
}
var startComponents = [];//Lista de componentes de inicio
function addClones(){
    /*
	* NOMBRE: addClones.
	* UTILIDAD: Crea los clones de los objetos al inicio
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    for(var i=0;i<=startComponents.length-1;i++){
        addObjects(startComponents[i]);//Agrega objetos "startComponents" de cada practica con al inicio
    }
}
var statusQuestions = false;//Determina si son preguntas de pasos o de reflexion, una vez terminada la practica
function clickentorno3dPasos(status){
    
    //Click en btn de pasos instrucciones y preguntas simulacion
    $(".d_pxbentorno3dstepsscrollbtn").empty();
    $(".d_pxbentorno3dstepstxt").find('p').remove();
    $(".d_pxbentorno3dstepstxt").hide();
    if(status === "instruccion"){//Pasos en instrucciones
        $("#d_pxbentorno3dstepsscrollbtn").css({"width":((statusQuestions ? addentorno3dInstruccion.length+1 : addentorno3dInstruccion.length)*2.4)+"rem"});//Asigna el width del div scroll de acuerdo a los pasos
        for(var i=1;i<=addentorno3dInstruccion.length;i++){//Agrega los btn de los pasos
            $("#d_pxbentorno3dstepsscrollbtn").append('<div class="d_pxbentorno3dstepsbtns" id="d_pxbentorno3dstepsbtns_'+i+'">'+i+'</div>');//Inserta los btn en relacion al total de pasos
        }
        $(".d_pxbentorno3dstepsbtns").off().on("pointerdown touchstart",function(){//pointerdown btns pasos instrucciones
            var getBtn = $(this).attr('id').split('_')[2];//Obtiene el Id del btn presionado
            $("#d_pxbentorno3dstepsbtns_1").removeClass('d_pxbentorno3dstepsbtnsanima');//Quita animacion de paso 1
            $(".d_pxbentorno3dstepsbtns").removeClass('d_pxbentorno3dstepsbtns_resalte');//Quita los resaltes de los btns
            $(this).addClass('d_pxbentorno3dstepsbtns_resalte');//Agrega resalte e btn seleccionado
            $("#d_pxbentorno3dstepstxt").show();//Muestra el div de la instruccion
            $("#d_pxbentorno3dstepstxt").find('p').remove();//Quita todas las etiquetas "p" para despues agregarlas de nuevo
            $("#d_pxbentorno3dstepstxt").append('<p>'+addentorno3dInstruccion[getBtn-1]+'</p>');//Agrega txt que se recupera del arreglo de cada practica
            statuscomponentsMenu = "hide";//El menu aparece al inicio
            resize3darea();//Escala el area de 3d, para que este visible junto con el menu de components
            emergenteGestosclose();//Cierra emergente de gestos
        });
        if(statusQuestions){//Agrega icono de prev, para ver los pasos
            $("#d_pxbentorno3dstepsscrollbtn").append('<div class="d_pxbentorno3dstepsscrolliconprev_giro"><svg viewBox="0 0 30 30"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.108,15.004c0.384,0.384,0.764,0.761,1.142,1.139 c1.56,1.557,3.12,3.116,4.679,4.675c0.31,0.309,0.394,0.719,0.228,1.104c-0.156,0.363-0.517,0.59-0.93,0.577 c-0.265-0.01-0.485-0.124-0.674-0.311c-1.296-1.297-2.592-2.593-3.889-3.889c-0.856-0.855-1.71-1.708-2.564-2.563 c-0.452-0.451-0.452-1.019,0.001-1.472c2.151-2.149,4.303-4.299,6.453-6.45c0.286-0.286,0.625-0.382,1.008-0.266 c0.367,0.112,0.596,0.374,0.662,0.755c0.055,0.32-0.027,0.608-0.261,0.842c-1.425,1.427-2.852,2.854-4.278,4.278 c-0.493,0.495-0.988,0.987-1.481,1.481C13.173,14.935,13.144,14.967,13.108,15.004z"/></svg></div>');
            $(".d_pxbentorno3dstepsscrolliconprev_giro").off().on("pointerdown touchstart",function(){//pointerdown btns pasos simulacion
                statuscomponentsMenu = "hide";//El menu aparece al inicio
                clickentorno3dPasos("simulacion");//Click en btn de pasos instrucciones y preguntas simulacion
            });
        }
    }
    if(status === "simulacion" && addSimulacion.length != 0){//Pasos en simulacion, si estan definidos
        $("#d_pxbentorno3dstepsscrollbtn").css({"width":((addSimulacion.length+2)*2.4)+"rem"});//Asigna el width del div scroll de acuerdo a los pasos
        $("#d_pxbentorno3dstepsscrollbtn").append('<div class="d_pxbentorno3dstepsscrolliconprev"><svg viewBox="0 0 30 30"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.108,15.004c0.384,0.384,0.764,0.761,1.142,1.139 c1.56,1.557,3.12,3.116,4.679,4.675c0.31,0.309,0.394,0.719,0.228,1.104c-0.156,0.363-0.517,0.59-0.93,0.577 c-0.265-0.01-0.485-0.124-0.674-0.311c-1.296-1.297-2.592-2.593-3.889-3.889c-0.856-0.855-1.71-1.708-2.564-2.563 c-0.452-0.451-0.452-1.019,0.001-1.472c2.151-2.149,4.303-4.299,6.453-6.45c0.286-0.286,0.625-0.382,1.008-0.266 c0.367,0.112,0.596,0.374,0.662,0.755c0.055,0.32-0.027,0.608-0.261,0.842c-1.425,1.427-2.852,2.854-4.278,4.278 c-0.493,0.495-0.988,0.987-1.481,1.481C13.173,14.935,13.144,14.967,13.108,15.004z"/></svg></div><div class="d_pxbentorno3dstepsscrolliconreflexion"><svg viewBox="0 0 50 50"><circle fill-rule="evenodd" clip-rule="evenodd" fill="#F15A24" cx="26.598" cy="37.121" r="2.604"/><circle fill-rule="evenodd" clip-rule="evenodd" fill="#FBAE17" cx="23.51" cy="41.749" r="1.833"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M41.91,17.824c-0.621-0.397-1.344-0.634-2.037-0.951 c0.05-0.335,0.146-0.724,0.16-1.115c0.086-2.446-1.446-4.472-3.82-5.05c-0.215-0.052-0.304-0.158-0.398-0.331 c-0.248-0.453-0.484-0.919-0.787-1.334c-1.644-2.254-4.79-3.163-7.367-2.109c-0.688,0.281-1.32,0.691-2.017,1.063 c-1.776-1.446-3.844-1.97-6.129-1.268c-2.275,0.699-3.698,2.287-4.383,4.554c-3.782-2.357-7.765-0.58-9.334,2.001 c-0.901,1.482-1.21,3.082-0.891,4.768c0.431,2.272,1.821,3.835,3.884,4.884c-0.899,0.967-1.387,2.092-1.438,3.381 c-0.052,1.293,0.298,2.498,1.169,3.459c1.916,2.111,4.189,2.438,6.717,1.176c1.208,2.121,2.975,3.355,5.458,3.369 c2.493,0.014,4.286-1.199,5.533-3.332c0.072,0.09,0.134,0.164,0.19,0.24c1.898,2.576,5.3,3.484,8.214,2.186 c1.175-0.525,2.144-1.301,2.832-2.404c0.126-0.201,0.239-0.395,0.553-0.363c0.917,0.088,1.804-0.082,2.655-0.416 c2.656-1.039,4.221-2.992,4.502-5.814S44.309,19.356,41.91,17.824z M24.629,28.773c-0.865,0-1.565-0.701-1.565-1.566 c0-0.863,0.7-1.564,1.565-1.564c0.864,0,1.564,0.701,1.564,1.564C26.193,28.072,25.494,28.773,24.629,28.773z M25.913,21.496v1.73 c0,0.709-0.575,1.285-1.284,1.285c-0.709,0-1.284-0.576-1.284-1.285v-2.863c0-0.709,0.575-1.283,1.284-1.283 c1.593,0,2.888-1.296,2.888-2.89c0-1.593-1.295-2.889-2.888-2.889s-2.889,1.296-2.889,2.889c0,0.709-0.575,1.284-1.284,1.284 s-1.284-0.575-1.284-1.284c0-3.008,2.448-5.456,5.457-5.456c3.008,0,5.457,2.448,5.457,5.456 C30.086,18.758,28.305,20.916,25.913,21.496z"/></svg></div>');
        for(var i=1;i<=addSimulacion.length;i++){//Agrega los btn de los pasos
            $("#d_pxbentorno3dstepsscrollbtn").append('<div class="d_pxbentorno3dstepsbtns" id="d_pxbentorno3dstepsbtns_'+i+'">'+i+'</div>');//Inserta los btn en relacion al total de pasos
        }
        $(".d_pxbentorno3dstepsbtns").off().on("pointerdown touchstart",function(){//pointerdown btns pasos simulacion
            var getBtn = $(this).attr('id').split('_')[2];//Obtiene el Id del btn presionado
            $("#d_pxbentorno3dstepsbtns_1").removeClass('d_pxbentorno3dstepsbtnsanima');//Quita animacion de paso 1
            $(".d_pxbentorno3dstepsbtns").removeClass('d_pxbentorno3dstepsbtns_resalte');//Quita los resaltes de los btns
            $(this).addClass('d_pxbentorno3dstepsbtns_resalte');//Agrega resalte e btn seleccionado
            $("#d_pxbentorno3dstepstxt").show();//Muestra el div de la simulacion
            $("#d_pxbentorno3dstepstxt").find('p').remove();//Quita todas las etiquetas "p" para despues agregarlas de nuevo
            $("#d_pxbentorno3dstepstxt").append('<p>'+addSimulacion[getBtn-1]+'</p>');//Agrega txt que se recupera del arreglo de cada practica
            statuscomponentsMenu = "hide";//El menu aparece al inicio
            resize3darea();//Escala el area de 3d, para que este visible junto con el menu de components
            if(stepslineStatus === 1){//Son pasos de simulacion
                $("#d_pxbentorno3dreflexiontxt").empty();//Quita texto de reflexion
                $("#d_pxbentorno3dreflexiontxt").hide();//Oculta texto de reflexion
            }
        });
        $(".d_pxbentorno3dstepsscrolliconprev").off().on("pointerdown touchstart",function(){//pointerdown btns prev next
            statusQuestions = true;//Ya termino la practica y estamos en simulacion
            statuscomponentsMenu = "hide";//El menu aparece al inicio
            clickentorno3dPasos("instruccion");//Click en btn de pasos instrucciones y preguntas simulacion
        });
    }
    $(".d_pxbentorno3dstepstxtclose").off().on("pointerdown touchstart",function(){
        $("#d_pxbentorno3dstepstxt").hide();//Oculta texto pasos
        $(".d_pxbentorno3dstepsbtns").removeClass('d_pxbentorno3dstepsbtns_resalte');//Quita los resaltes de los btns
        statuscomponentsMenu = "hide";//El menu aparece al inicio
        resize3darea();//Escala el area de 3d, para que este visible junto con el menu de components
    });
    resize3darea();//Escala el area de 3d, para que este visible junto con el menu de components
}
function removeentonor3dPasos(){
    /*
	* NOMBRE: removeentonor3dPasos.
	* UTILIDAD: Quita emergentes de pasos instrucciones
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    $("#d_pxbentorno3dstepstxt").find('p').remove();//Quita texto del div de instrucciones
    $("#d_pxbentorno3dstepstxt").hide();//Oculta div de instrucciones
    $(".d_pxbentorno3dstepsbtns").removeClass('d_pxbentorno3dstepsbtns_resalte');//Quita resalte a btn de pasos de instrucciones
}
var saveRaycaster;//Guarda raycaster
var posMouse;//Posicion de mouse dentro del canvas
var selectObj;//Guarda el objeto seleccionado en raycaster
function startRaycaster(){
    /*
	* NOMBRE: startRaycaster.
	* UTILIDAD: Inicia raycaster
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    saveRaycaster = new THREE.Raycaster();//Crea raycaster
    posMouse = new THREE.Vector2();//Almacena coordenadas de mouse
    saveRaycaster.setFromCamera( posMouse, camera );//Raycaster en relacion a camara y mouse
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){//Es dispositivo
        document.addEventListener('touchstart', startTouchStart, false);//Inicia listener
        document.addEventListener('touchmove', startTouchMove, false);//Inicia listener
        document.addEventListener('touchend', startTouchEnd, false);//Inicia listener
        document.getElementById("d_pxbentorno3dpopupin").addEventListener("touchstart", function(e){
            e.stopPropagation();//Evita la propagacion del touchstart
        }, false);//Inicia listener, para evitar que el touchstart evite hacer girar, eliminar o cambiar atributo del componente.
    }else{//Es PC
        document.addEventListener('pointerdown', startPointerDown, false );//Inicia listener
        document.addEventListener('pointermove', startPointerMove, false);//Inicia listener
        document.addEventListener('pointerup', startPointerUp, false);//Inicia listener
        document.getElementById("d_pxbentorno3dpopupin").addEventListener("pointerdown", function(e){
            e.stopPropagation();//Evita la propagacion del touchstart
        }, false);//Inicia listener, para evitar que el touchstart evite hacer girar, eliminar o cambiar atributo del componente.
    }
}
function stopRaycaster(){
    /*
	* NOMBRE: stopRaycaster.
	* UTILIDAD: Para raycaster
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    delete saveRaycaster;//Elimina el raycaster
    delete posMouse;//Elimina el mouse
    saveRaycaster;//Limpia raycaster
    posMouse;//Limpia mouse
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){//Es dispositivo
        document.removeEventListener('touchstart', startTouchStart, false);//Inicia listener
        document.removeEventListener('touchmove', startTouchMove, false);//Inicia listener
        document.removeEventListener('touchend', startTouchEnd, false);//Inicia listener
        document.getElementById("d_pxbentorno3dpopupin").removeEventListener("touchstart", function(e){
            e.stopPropagation();//Evita la propagacion del touchstart
        }, false);//Inicia listener, para evitar que el touchstart evite hacer girar, eliminar o cambiar atributo del componente.
    }else{//Es PC
        document.removeEventListener('pointerdown', startPointerDown, false );//Inicia listener
        document.removeEventListener('pointermove', startPointerMove, false);//Inicia listener
        document.removeEventListener('pointerup', startPointerUp, false);//Inicia listener
        document.getElementById("d_pxbentorno3dpopupin").removeEventListener("pointerdown", function(e){
            e.stopPropagation();//Evita la propagacion del touchstart
        }, false);//Inicia listener, para evitar que el touchstart evite hacer girar, eliminar o cambiar atributo del componente.
    }
}
function specialcaseRaycaster(intersectsFinal){
    /*
	* NOMBRE: specialcaseRaycaster.
	* UTILIDAD: Caso para arrastrar a escena, y que se posiciones con el movimiento de mouse o touch
	* ENTRADAS: intersectsFinal > variable para interseccion final, ya que no es global.
	* SALIDAS: Ninguna.
    */
    var savedPoscomponents = [
        ["led", [0,4.2,0]],
        ["rgbc", [0,4.2,0]],
        ["rgb", [0,4.2,0]],
        ["resistance", [0,3,0]],
        ["pinA", [0,2.2,0]],
        ["pushbutton",[0,3,0]],
        ["buzzer",[0,3,0]],
        ["switch",[0,2,0]],
        ["preset",[0,2.5,0]],
        ["ultrasonic",[0,2.5,0]],
        ["ldr",[0,3.5,0]],
    ];//Almacena datos de posicion de raycaster para cada componente
    console.log("NAME: "+addNewcomponent.name.split(" ")[1]);
    console.log(savedPoscomponents);
    var getNamepos;//Almacena el index del array (savedPoscomponents), para saber que objeto es, mediante el nombre

    savedPoscomponents.forEach(function(itemS,indexS){//Recorre array
        if(itemS[0] === addNewcomponent.name.split(" ")[1]){//Compara nombre de cada posicion de (savedPoscomponents), con el nombre del componente en curso
            getNamepos = indexS;//Almacena el index, para buscarlo en el array (savedPoscomponents)
        }
    });

    intersectsFinal.push(//Agrega datos de interseccion, ya que no hay un click sobre el objeto (estos datos se ocupan para el raycaster)
        {
            object: {
                parent: addNewcomponent//Almacena objeto que se toma
            },
            point: new THREE.Vector3(savedPoscomponents[getNamepos][1][0],savedPoscomponents[getNamepos][1][1],savedPoscomponents[getNamepos][1][2])//Asigana posicion raycaster manualmente del objeto en curso
        }
    );
}
var getpinA = false;//Establece si se selecciona un pin
var getpinB = false;//Establece si se selecciona un pin
var getpinPower = false;//Establece si se selecciona un pinPower
var getpinpowerA = false;//Establece si se selecciona un pinPower
var getpinpowerB = false;//Establece si se selecciona un pinPower
var raycasterStatus = false;//Establece se se presiona (onpointerdown) un objeto
function startPointerDown(){
    /*
	* NOMBRE: onpointerdown.
	* UTILIDAD: Inicia mouse
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    getposMouse();//Obtiene la posicion del mouse en el canvas
    saveRaycaster.setFromCamera( posMouse, camera );//Actualiza raycaster en relacion a camara y mouse
    controls.enableRotate = true;//Activa la rotacion de controls
    removetooltipObj();//Quita el tooltip y menu edit de cada objeto
    removeIndicador();//Elimina indicador de objeto
    hideLabels();//Oculta labels a ciertos objetos con nombre definido
    var intersects = saveRaycaster.intersectObjects(allClones,true);//Intersecciones de objetos con el mouse, y busca todos los hijos
    var intersectsFinal = [];//Almacena las intersecciones de objetos Mesh finales (no incluye labels)
    if(autostartRaycaster){//Si se arrastro y solto en escena
        specialcaseRaycaster(intersectsFinal);//Caso para arrastrar a escena, y que se posiciones con el movimiento de mouse o touch
        
    }else{//Agrega nuevos datos de interseccion con el click
        intersects.forEach(function(item,index){//Busca los objetos de intersects
            if(item.object.type === "Mesh" && (item.object.name != "labelpos" || item.object.name != "labelneg" || item.object.name != "label") && item.object.name != "limitObj"){//Si un objeto es Mesh (Para saber que es una forma, y no un label u otro objeto). Tambien no es el mesh de limite de objeto
                intersectsFinal.push(item);//Almacena las intersecciones de objetos Mesh finales (no incluye labels)
            }
            /*if(item.object.name === "coordinfo"){
                saveLabelcoord = item;
            }*/
        });
    }
    console.log(intersects);
    console.log(intersectsFinal);
    $(".d_pxbentorno3dcoordmove").addClass('d_hideImportant');//Oculta todas las coordenadas que siguen al objeto
    if(intersectsFinal.length != 0){//Intersecta con objeto dentro del canvas
        selectObj = intersectsFinal[0].object.parent;//Almacena el objeto que se selecciona
        planeFollow.position.copy(intersectsFinal[0].point);//El plano adopta la posicion del objeto seleccionado
        controls.enableRotate = false;//Desactiva la rotacion de controls para poder mover el objeto
        objetoGrl = selectObj;//Se almacena el objeto seleccionado para tooltip y edit
        posX = selectObj.position.x;//Captura la posicion inicial del objeto en X, antes de moverlo
        posZ = selectObj.position.z;//Captura la posicion inicial del objeto en Z, antes de moverlo
        ifgetPin(selectObj);//Saber si se selecciona un pin y saber que es jumper
        caseCable(selectObj);//Acciones para mover el cable del jumper y cableenergia, a traves de los pinA y pinB
        raycasterStatus = true;//Se presiona (onpointerdown) un objeto
        hideWarning();//Oculta las advertencias sobre objetos
        hidebtnPower();//Oculta btn de power play
        addIndicador(selectObj);//Agrega indicador de objetos
        updownObjs(selectObj,true);//Coloca los objetos en su posicion, excepto el que esta activo
        showLabels(selectObj);//Muestra labels a ciertos objetos con nombre definido
        $("#d_contegrlcanvas").addClass('d_pxbviewcomponentscursor');//Agrega cursor de mover
        $("#d_pxbentorno3dcoordmove_"+selectObj.name.replace(" ",'').toString()).removeClass('d_hideImportant');//Agrega coordenadas que siguen al objeto
        selectObj.newInfo.objManipulated = true;//Objeto ya fue manipulado
        if(getpinA || getpinB || getpinpowerA || getpinpowerB){//Aplica solo en jumper y cableenergia
            pinbGrl.newInfo.objManipulated = true;//Objeto ya fue manipulado
        }
        console.log("******OBJETO*******");
        console.log(objetoGrl);
        console.log("******SCENE*******");
        console.log(scene);
        console.log("******OBJ B*******");
        console.log(pinbGrl);
    }else{
        updownObjs(null);//Coloca los objetos en su posicion
        showbtnPower();//Muestra btn de power play
    }
}


var posX;//Almacena valor de posicion X al mover objeto
var posZ;//Almacena valor de posicion Y al mover objeto

var objetoGrl;//Guarda el elemento de cable que se va a a nimar al mover los objetos pines

function startPointerMove(){
    /*
	* NOMBRE: onMouseMove.
	* UTILIDAD: Mueve mouse
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    getposMouse();//Obtiene la posicion del mouse en el canvas
    controls.enableRotate = true;//Activa la rotacion de controls
    if(selectObj){//Hubo interseccion en el pointerdown
        saveRaycaster.setFromCamera( posMouse, camera );//Actualiza raycaster en relacion a camara y mouse
        var intersects = saveRaycaster.intersectObject(planeFollow);//Interseccion de plane con mouse al mover
        controls.enableRotate = false;//Desactiva la rotacion de controls para poder mover el objeto
        getDistance(intersects[0].point,selectObj);//Obtiene la distancia al mover los objetos a cada perforacion de la protoboard 
    }
}
function startPointerUp(){
    /*
	* NOMBRE: onPointerup.
	* UTILIDAD: Termina mouse
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    selectObj = null;//Al soltar el mouse, no debe de haber un objeto selecionado
    controls.enableRotate = true;//Activa la rotacion de controls
    if(raycasterStatus === true){//Se selecciono (onpointerdown) un objeto > Es para que el tooltip aparezca al soltar el mouse
        addtooltipObj();//Agrega tooltip y menu edit de cada objeto
        raycasterStatus = false;//Deselecciona el objeto seleccionado en onpointerdown
    }
    startAnima = false;//Pausa animacion de catmull
    $("#d_contegrlcanvas").removeClass('d_pxbviewcomponentscursor');//Restaura cursor
    autostartRaycaster = false;//Resetea dato de si es de arrastrar u objeto que ya existe en escena
}
function startTouchStart(){
    /*
	* NOMBRE: onTouchStart.
	* UTILIDAD: Inicia touch
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    getposTouch();//Obtiene la posicion del mouse en el canvas
    saveRaycaster.setFromCamera( posMouse, camera );//Actualiza raycaster en relacion a camara y mouse
    controls.enabled = true;//Activa la rotacion de controls
    removetooltipObj();//Quita el tooltip y menu edit de cada objeto
    removeIndicador();//Elimina indicador de objeto
    hideLabels();//Oculta labels a ciertos objetos con nombre definido
    var intersects = saveRaycaster.intersectObjects(allClones,true);//Intersecciones de objetos con el mouse, y busca todos los hijos
    var intersectsFinal = [];//Almacena las intersecciones de objetos Mesh finales (no incluye labels)
    if(autostartRaycaster){//Si se arrastro y solto en escena
        specialcaseRaycaster(intersectsFinal);//Caso para arrastrar a escena, y que se posiciones con el movimiento de mouse o touch
    }else{//Agrega nuevos datos de interseccion con el click
        intersects.forEach(function(item,index){//Busca los objetos de intersects
            if(item.object.type === "Mesh" && (item.object.name != "labelpos" || item.object.name != "labelneg" || item.object.name != "label") && item.object.name != "limitObj"){//Si un objeto es Mesh (Para saber que es una forma, y no un label u otro objeto). Tambien no es el mesh de limite de objeto
                intersectsFinal.push(item);//Almacena las intersecciones de objetos Mesh finales (no incluye labels)
            }
        });
    }
    $(".d_pxbentorno3dcoordmove").addClass('d_hideImportant');//Oculta todas las coordenadas que siguen al objeto
    if(intersectsFinal.length != 0){//Intersecta con objeto dentro del canvas
        selectObj = intersectsFinal[0].object.parent;//Almacena el objeto que se selecciona
        planeFollow.position.copy(intersectsFinal[0].point);//El plano adopta la posicion del objeto seleccionado
        controls.enabled = false;//Desactiva la rotacion de controls para poder mover el objeto
        objetoGrl = selectObj;//Se almacena el objeto seleccionado para tooltip y edit
        posX = selectObj.position.x;//Captura la posicion inicial del objeto en X, antes de moverlo
        posZ = selectObj.position.z;//Captura la posicion inicial del objeto en Z, antes de moverlo
        ifgetPin(selectObj);//Saber si se selecciona un pin y saber que es jumper
        caseCable(selectObj);//Acciones para mover el cable del jumper y cableenergia, a traves de los pinA y pinB
        raycasterStatus = true;//Se presiona (onTouchStart) un objeto
        hideWarning();//Oculta las advertencias sobre objetos
        hidebtnPower();//Oculta btn de power play
        addIndicador(selectObj);//Agrega indicador de objetos
        updownObjs(selectObj);//Coloca los objetos en su posicion, excepto el que esta activo
        showLabels(selectObj);//Muestra labels a ciertos objetos con nombre definido 
        $("#d_pxbentorno3dcoordmove_"+selectObj.name.replace(" ",'').toString()).removeClass('d_hideImportant');//Agrega coordenadas que siguen al objeto
        selectObj.newInfo.objManipulated = true;//Objeto ya fue manipulado
        if(getpinA || getpinB || getpinpowerA || getpinpowerB){//Aplica solo en jumper y cableenergia
            pinbGrl.newInfo.objManipulated = true;//Objeto ya fue manipulado
        }
    }else{
        updownObjs(null);//Coloca los objetos en su posicion
        showbtnPower();//Muestra btn de power play
    }
}
function startTouchMove(){
    /*
	* NOMBRE: onTouchMove.
	* UTILIDAD: Mueve touch
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    getposTouch();//Obtiene la posicion del mouse en el canvas
    if(selectObj){//Hubo interseccion en el pointerdown
        saveRaycaster.setFromCamera( posMouse, camera );//Actualiza raycaster en relacion a camara y mouse
        var intersects = saveRaycaster.intersectObject(planeFollow);//Interseccion de plane con mouse al mover
        getDistance(intersects[0].point,selectObj);//Obtiene la distancia al mover los objetos a cada perforacion de la protoboard 
    }   
}
function startTouchEnd(){
    /*
	* NOMBRE: onTouchEnd.
	* UTILIDAD: Termina touch
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    selectObj = null;//Al soltar el mouse, no debe de haber un objeto selecionado
    controls.enabled = true;//Activa la rotacion de controls
    if(raycasterStatus === true){//Se selecciono (onTouchStart) un objeto > Es para que el tooltip aparezca al soltar el touch
        addtooltipObj();//Agrega tooltip y menu edit de cada objeto
        raycasterStatus = false;//Deselecciona el objeto seleccionado en onTouchStart
    }
    startAnima = false;//Pausa animacion de catmull
    autostartRaycaster = false;//Resetea dato de si es de arrastrar u objeto que ya existe en escena
}
function addLimitsobj(getObject){
    //Agrega los limites del objeto, para evitar encimarlos
    getObject.children.forEach(function(item){
        if(item.name === "data"){
            item.children.forEach(function(item2){
                if(item2.name === "limitObj"){
                    console.log(item2.getWorldPosition(new THREE.Vector3()));
                    console.log(item2.geometry.parameters);
                }
            });
        }
    });
}
function getposMouse(){
    /*
	* NOMBRE: getposMouse.
	* UTILIDAD: Obtiene la posicion del mouse en el canvas
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    var canvasW = $("#d_contegrlcanvas").innerWidth();//Ancho de canvas
    var canvasH = $("#d_contegrlcanvas").innerHeight();//Alto de canvas
    posMouse.x = ( (event.clientX - $("#d_contegrlcanvas").offset().left) / canvasW ) * 2 - 1;//Pos del mouse dentro del canvas
    posMouse.y = - ( (event.clientY - $("#d_contegrlcanvas").offset().top) / canvasH ) * 2 + 1;//Pos del mouse dentro del canvas
}
function getposTouch(){
    /*
	* NOMBRE: getposTouch.
	* UTILIDAD: Obtiene la posicion del mouse en el canvas
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    var canvasW = $("#d_contegrlcanvas").innerWidth();//Ancho de canvas
    var canvasH = $("#d_contegrlcanvas").innerHeight();//Alto de canvas
    if(mouseStart){//Entra, porque cuando pasa del menu a la escena, el evento no tiene el targetTouches (solo una vez)
        posMouse.x = +((event.pageX - $("#d_contegrlcanvas").offset().left) / canvasW) * 2 +-1;
        posMouse.y = -((event.pageY - $("#d_contegrlcanvas").offset().top) / canvasH) * 2 + 1;
        mouseStart = false;//Status para evento en touch (targetTouches)
    }else{//Entra evento normal
        posMouse.x = +((event.targetTouches[0].pageX - $("#d_contegrlcanvas").offset().left) / canvasW) * 2 +-1;
        posMouse.y = -((event.targetTouches[0].pageY - $("#d_contegrlcanvas").offset().top) / canvasH) * 2 + 1; 
    }
}
function updownObjs(getObject){
    //Coloca los objetos en su posicion, excepto el que esta activo
    //getObject > objeto seleccionado
    if(getObject != null){
        getObject.position.y = 0.7;//Posicion de objeto al mover
        scene.children.forEach(function(item,index){//Busca todos los elementos hijos del objeto
            if(item.name != getObject.name && item.name.split(" ")[0] != "grl" && item.name.split(" ")[0] != "null" && item.name.split(" ")[0] != "jumper" && item.name.split(" ")[0] != "jumperPow"){//Elementos que se pueden mover
                setObjects(item,"single");//Posiciona los objetos en la protoboard, si estos estan en la posicion dentro de los margenes
            }
        });
    }else{
        scene.children.forEach(function(item,index){//Busca todos los elementos hijos del objeto
            if(item.name.split(" ")[0] != "grl" && item.name.split(" ")[0] != "null" && item.name.split(" ")[0] != "jumper" && item.name.split(" ")[0] != "jumperPow"){//Elementos que se pueden mover
                setObjects(item,"single");//Posiciona los objetos en la protoboard, si estos estan en la posicion dentro de los margenes
            }
        });
    }
}
function showActive(){
    //Muestra btn de objetos en escenario 3d
    $(".d_activatepushbutton, .d_activateswitch, .d_activatepreset, .d_activateldr").addClass('d_activate_show');//Agrega clase para mostrar div (no se puede con fadeIn o show)
}
function hideActive(){
    //Oculta btn de objetos en escenario 3d
    $(".d_activatepushbutton, .d_activateswitch, .d_activatepreset, .d_activateldr").removeClass('d_activate_show');//Agrega clase para mostrar div (no se puede con fadeOut o hide)
}
function showLabels(getObject){
    //Muestra labels a ciertos objetos con nombre definido
    //getObject > objeto seleccionado
    
    var getData;//Almacena grupo con datos del objeto
    getObject.children.forEach(function(item){//Busca los hijos del objeto
        if(item.name === "data"){//Busca el hijo "data", que contiene los datos requeridos
            getData = item;//Almacena grupo con datos del objeto
        }
    });
    for(let index in getObject.getObjectByName("data").children){//Busca todos los elementos hijos del objeto
        if(getData.getObjectByName("data").children[index].name === "labelpos" || getData.getObjectByName("data").children[index].name === "labelneg" || getData.getObjectByName("data").children[index].name === "label"){//Objetos con nombre de label
            getData.getObjectByName("data").children[index].visible = true;//Muestra labels
        }
    }
}
function hideLabels(){
    //Oculta labels a todos los objetos con un nombre definido
    scene.children.forEach(function(item,index){//Busca todos los elementos del escenario
        if(item.name.split(" ")[0] != "grl" && item.name.split(" ")[0] != "null" && item.name.split(" ")[0] != "jumper" && item.name.split(" ")[0] != "jumperPow"){//Objetos sin nombre definido
            item.getObjectByName("data").children.forEach(function(item1,index){//Busca todos los elementos del escenario
                if(item1.name === "labelpos" || item1.name === "labelneg" || item1.name === "label"){//Objetos con nombre de "label"
                    item1.visible = false;//Oculta labels
                }
            });
        }
    });
}
function showbtnPower(){
    //Muestra btn de power play
    if(statusBattery){
        $("#d_pxbentorno3dplay").fadeIn("slow");//Agrega icono de prender fuente de poder
        $("#d_pxbentorno3dplaysvgpower").show();
    }
    if(statusPlug){
        $("#d_pxbentorno3dplay").fadeIn("slow");//Agrega icono de prender fuente de poder
        $("#d_pxbentorno3dplaysvgplug").show();
    }
}
function hidebtnPower(){
    //Oculta btn de power play
    $("#d_pxbentorno3dplay").hide();//Agrega icono de prender fuente de poder
}
function ifgetPin(getObject){
    //Saber si se selecciona un pin y saber que es jumper o cableenergia (hay muchos casos para jumper o cableenergia en todo el codigo)
    var getobjName = getObject.name.split(" ")[1];//Obtiene el nombre el objeto, al quitarle el numero
    if(getobjName === "pinA"){//Casos se selecciona un pinA
        getpinpowerA = false;//Deselecciona pinPower
        getpinpowerB = false;//Deselecciona pinPower
        getpinA = true;//Se selecciona pinA
        getpinB = false;//Deselecciona pinB
    }else if(getobjName === "pinB"){//Casos se selcciona un pinB
        getpinpowerA = false;//Deselecciona pinPower
        getpinpowerB = false;//Deselecciona pinPower
        getpinA = false;//Deselecciona pinA
        getpinB = true;//Se selecciona pinB
    }else if(getobjName === "pinPowerpos"){//Casos se selcciona un pinB
        getpinpowerA = true;//Deselecciona pinPower
        getpinpowerB = false;//Deselecciona pinPower
        getpinA = false;//Deselecciona pinA
        getpinB = false;//Deselecciona pinB 
    }else if(getobjName === "pinPowerneg"){//Casos se selcciona un pinB
        getpinpowerA = false;//Deselecciona pinPower
        getpinpowerB = true;//Deselecciona pinPower
        getpinA = false;//Deselecciona pinA
        getpinB = false;//Deselecciona pinB 
    }else{//NO se selecciona ningun pin
        getpinpowerA = false;//Deselecciona pinPower
        getpinpowerB = false;//Deselecciona pinPower
        getpinA = false;//Deselecciona pinA
        getpinB = false;//Deselecciona pinB 
    }
}
var coordXval = [-7.75,-7.5,-7.25,-7,-6.75,-6.5,-6.25,-6,-5.75,-5.5,-5.25,-5,-4.75,-4.5,-4.25,-4,-3.75,-3.5,-3.25,-3,-2.75,-2.5,-2.25,-2,-1.75,-1.5,-1.25,-1,-0.75,-0.5,-0.25,0,0.25,0.5,0.75,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.25,3.5,3.75,4,4.25,4.5,4.75,5,5.25,5.5,5.75,6,6.25,6.5,6.75,7,7.25,7.5,7.75];//Array de posiciones en X permitidas para los objetos (letras)
var coordZval = [1.375,1.125,0.875,0.625,0.375,-0.375,-0.625,-0.875,-1.125,-1.375];//Array de posiciones en Z permitidas para los objetos (letras)
var coordXvalenergy = [-7.25,-7,-6.75,-6.5,-6.25,-5.75,-5.5,-5.25,-5,-4.75,-4.25,-4,-3.75,-3.5,-3.25,-2.75,-2.5,-2.25,-2,-1.75,-1.25,-1,-0.75,-0.5,-0.25,0.25,0.5,0.75,1,1.25,1.75,2,2.25,2.5,2.75,3.25,3.5,3.75,4,4.25,4.75,5,5.25,5.5,5.75,6.25,6.5,6.75,7,7.25];//Array de posiciones en X permitidas para los objetos (energia)
var coordZvalenergy = [2.375,2.125,-2.125,-2.375];//Array de posiciones en Z permitidas para los objetos (energia)
var coordXvaldigital = [-1.25,-1.5,-1.75,-2,-2.25,-2.5,-2.75,-3,-3.5,-3.75,-4,-4.25,-4.5,-4.75,-5,-5.25,-5.5,-5.75];//Array de posiciones en X permitidas para los objetos (arduino digital)
var coordZvaldigital = [3.625];//Array de posiciones en Z permitidas para los objetos (arduino digital)
var coordXvalanalog = [-1.25,-1.5,-1.75,-2,-2.25,-2.5,-3,-3.25,-3.5,-3.75,-4,-4.25,-4.5,-4.75];//Array de posiciones en X permitidas para los objetos (arduino analogo)
var coordZvalanalog = [8.375];//Array de posiciones en Z permitidas para los objetos (arduino analogo)
function getDistance(intersectsPoint,getObject){
    /*
	* NOMBRE: getDistance.
	* UTILIDAD: Obtiene la distancia al mover los objetos a cada perforacion de la protoboard
	* ENTRADAS: intersectsPoint > interseccion con el puntero, getObject > objeto en curso.
	* SALIDAS: Ninguna.
    */
    //console.log((posX+0.25)+" "+intersectsPoint.x);
    if(intersectsPoint.x > (posX+0.25)){//Movimiento en X positivo
        posX = posX+0.25;//Se incrementa la distancia entre perforaciones de la protoboard
        adjustX();//Ajusta la posicion del objeto en X en relacion a los limites de movimiento
    }
    if(intersectsPoint.x < (posX-0.25)){//Movimiento en X negativo
        posX = posX-0.25;//Se incrementa la distancia entre perforaciones de la protoboard
        adjustX();//Ajusta la posicion del objeto en X en relacion a los limites de movimiento
    }
    if(intersectsPoint.z > (posZ+0.25)){//Movimiento en Z positivo
        posZ = posZ+0.25;//Se incrementa la distancia entre perforaciones de la protoboard
        adjustZ();//Ajusta la posicion del objeto en Z en relacion a los limites de movimiento
    }
    if(intersectsPoint.z < (posZ-0.25)){//Movimiento en Z negativo
        posZ = posZ-0.25;//Se incrementa la distancia entre perforaciones de la protoboard
        adjustZ();//Ajusta la posicion del objeto en Z en relacion a los limites de movimiento
    }
    getObject.position.y = 0.7;//El objeto seleccionado cambia a posicion Y fija
    console.log(posX+" "+posZ);
    function adjustX(){
        /*
        * NOMBRE: adjustX.
        * UTILIDAD: Ajusta la posicion del objeto en X en relacion a los limites de movimiento
        * ENTRADAS: Ninguna.
        * SALIDAS: Ninguna.
        */
        //if((coordXval.includes(posX) === true && coordZval.includes(posZ) === true) || (coordXvalenergy.includes(posX) === true && coordZvalenergy.includes(posZ) === true) || (coordXvaldigital.includes(posX) === true && coordZvaldigital.includes(posZ) === true) || (coordXvalanalog.includes(posX) === true && coordZvalanalog.includes(posZ) === true)){
        if((coordXval.includes(posX) === true && coordZval.includes(posZ) === true) || (coordXvalenergy.includes(posX) === true && coordZvalenergy.includes(posZ) === true)){
            removeIndicador();//Elimina indicador de objeto
            getObject.position.x = posX;//Nueva posision del objeto
            getObject.updateMatrixWorld();//Actualiza posicion el objeto
            addIndicador(getObject);//Agrega indicador de objetos
        }
        //addLimitsobj(getObject);//Agrega los limites del objeto, para evitar encimarlos
    }
    function adjustZ(){
        /*
        * NOMBRE: adjustZ.
        * UTILIDAD: Ajusta la posicion del objeto en Z en relacion a los limites de movimiento
        * ENTRADAS: Ninguna.
        * SALIDAS: Ninguna.
        */
        //if((coordZval.includes(posZ) === true && coordXval.includes(posX) === true) || (coordZvalenergy.includes(posZ) === true && coordXvalenergy.includes(posX) === true) || (coordZvaldigital.includes(posZ) === true && coordXvaldigital.includes(posX) === true) || (coordZvalanalog.includes(posZ) === true && coordXvalanalog.includes(posX) === true)){
        if((coordZval.includes(posZ) === true && coordXval.includes(posX) === true) || (coordZvalenergy.includes(posZ) === true && coordXvalenergy.includes(posX) === true)){
            removeIndicador();//Elimina indicador de objeto
            getObject.position.z = posZ;//Nueva posision del objeto
            getObject.updateMatrixWorld();//Actualiza posicion el objeto
            addIndicador(getObject);//Agrega indicador de objetos
        }
        //addLimitsobj(getObject);//Agrega los limites del objeto, para evitar encimarlos
    }
}
var jumperwireGrl;//Almacena el cable del jumper seleccionado
var powerwireGrl;//Almacena el cable de cableenergia
var wireGrl;//Almacena el cable del jumper o cableenergia seleccionado
var pinbGrl;//Almacena el pin b del jumper o cableenergia seleccionado
var objNamegrl;//Almacena el nombre del objeto seleccionado
function caseCable(getObject){
    //Acciones para mover el cable del jumper y cableenergia, a traves de los pinA y pinB
    //getObject > objeto seleccionado
    var valObj = false;//Identifica si localiza el cable en la comparacion
    if(getpinA || getpinB){//Casos para jumper, ya que lo que se selecciona son los pines, y hay que manipular el cable tambien
        //console.log("*************JUMPER");
        scene.children.forEach(function(item,index){//Busca todos los elementos del escenario
            if(item.name.split(" ")[0] === "jumper"){//Solo los cables
                if((getObject.name.split(" ")[0] === item.name.split(" ")[1]) || (getObject.name.split(" ")[0] === item.name.split(" ")[2])){//Si el numero de cualquier de los dos pines (0 pinA) o (1 pinB), es igual al numero que tiene el cable ( wire 0 1), entonces el cable les pertenece.
                    wireGrl = item;//Guarda el elemento cable que pertenece al mover los pines
                    objNamegrl = item.name.split(" ")[0];//Almacena el nombre del objeto jumper seleccionado con pinA o pinB
                    valObj = true;//Localiza el cable, de acuerdo al pin seleccionado
                }
                if(valObj === true){//Entra, porque si encontro el cable
                    scene.children.forEach(function(item2,index){//Busca todos los elementos del escenario
                        if((item2.name.split(" ")[0] === wireGrl.name.split(" ")[1]) || (item2.name.split(" ")[0] === wireGrl.name.split(" ")[2])){//Encuentra el pin B
                            if(item2.name.split(" ")[0] != getObject.name.split(" ")[0]){//Encuentra el pin B
                                pinbGrl = item2;//Guarda el elemento pin b que pertenece al mover los pines
                                startAnima = true;//Inicia animacion de catmull 
                                valObj = false;//Resetea el valor
                            }
                        }
                    });
                }
            }
            
        });
    }
    else if(getpinpowerA || getpinpowerB){//Casos para cableenergia, y manipular su cable
        //console.log("*************CABLE");
        scene.children.forEach(function(item,index){//Busca todos los elementos del escenario
            if(item.name.split(" ")[0] === "jumperPow"){//Solo los cables
                if(getObject.name.split(" ")[0] === item.name.split(" ")[1]){//Si el numero del pinPower es igual al numero del cable
                    wireGrl = item;//Guarda el elemento cable que pertenece al mover el pinPower
                    objNamegrl = item.name.split(" ")[0];//Almacena el nombre del objeto jumper seleccionado con pinA o pinB
                    valObj = true;//Localiza el cable, de acuerdo al pin seleccionado
                }
                if(valObj === true){//Entra, porque si encontro el cable
                    scene.children.forEach(function(item2,index){//Busca todos los elementos del escenario
                        if(item2.name.split(" ")[0] === wireGrl.name.split(" ")[2]){//Encuentra el pin B
                            pinbGrl = item2;//Guarda el elemento pin b que pertenece al mover los pines
                            startAnima = true;//Inicia animacion de catmull 
                            valObj = false;//Resetea el valor
                        }
                    });
                }
            }
        });
    }
    else{
        objNamegrl = getObject.name.split(" ")[1];//Almacena el objeto seleccionado
    }
}
function addtooltipObj(){
    //Agrega tooltip y menu edit de cada objeto
    if(objNamegrl != "jumperPow"){//Si no es cable de energia (Este se elimina como los objetos que no se mueven)
        $(".d_pxbentorno3dpopupin").fadeIn("fast");//Muestra tooltip
        $(".d_visible").hide();//Oculta todos las opciones de ajustes de los objetos 3d
        $(".d_pxbentorno3dpopupin").find(".d_3d_"+objNamegrl).show();//Muestra las opciones de ajuste del obj que se selecciona
        var backPos = $(".d_comp_"+objNamegrl).css("background-position");//Almacena la posicion del obj seleccionado, de acuerdo ala imagen en "d_pxbviewcomponents"
        $(".d_pxbentorno3dpopupin").find(".d_pxbentorno3dpopuptitleicon").css({"background-position":backPos});//Asigna la posicion de la imagen al icono en el popup de cada obj 3d
        $(".d_pxbentorno3dpopupin").find(".d_pxbentorno3dpopuptitletxt").text(objetoGrl.newInfo.name);//Asigna el nombre en el popup de cada obj 3d
        if(getpinA || getpinB || getpinpowerA || getpinpowerB){//El jumper no es necesario el icono de rotacion
            $(".pxbentorno3drotatebtn").hide();//Oculta icono de rotacion
        }else{//Se anexa el icono de rotacion
            $(".pxbentorno3drotatebtn").show();//Muestra icono de rotacion
        }
        if(objNamegrl === "led" || objNamegrl === "resistance" || objNamegrl === "jumper" || objNamegrl === "preset"){//Objetos con info editable
            recoverInfo();//Agrega info guardada de tooltip al seleccionar un objeto
        }
    }
}
function removetooltipObj(){
    /*
	* NOMBRE: removetooltipObj.
	* UTILIDAD: Quita el tooltip y menu edit de cada objeto
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    $(".d_pxbentorno3dpopupin").hide();//Oculta tooltip
    $(".d_pxbpopupconteselect").hide();//Oculta todos las opciones de ajustes de los objetos 3d
}
function recoverInfo(){
    /*
	* NOMBRE: recoverInfo.
	* UTILIDAD: Agrega info guardada de tooltip al seleccionar un objeto
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    
    var dataObj = objetoGrl.newInfo.tooltipData[0];
    var selectGet = $(".d_3d_"+objNamegrl)[0];//Obtiene el elemento select del tooltip
	for(var i=0;i<selectGet.length;i++){
		if(selectGet.options[i].value.toString() === dataObj.toString()){//Si coincide con el dato guardado
			selectGet.selectedIndex = i;//Se selecciona el elemento con selected
		}
	}
}
function rotateBtn(){
    /*
	* NOMBRE: rotateBtn.
	* UTILIDAD: Rotacion de cada objeto
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    if(getpinA || getpinB || getpinpowerA || getpinpowerB){//Omite los cables al giro
    }else{
        objetoGrl.position.y = 0.7;//Posicion de objeto al mover o rotar
        var anima = new TWEEN.Tween(objetoGrl.rotation)
        .to({
            y: objetoGrl.rotation.y+girRad*90//Rotacion del objeto
        },300)
        .onStart(function(){
            $(".d_pxbentorno3dpopupin").append('<div class="d_pxbentorno3dpopupin_block"></div>');//Agrega div de bloqueo para menu opciones editar objeto
        })
        .onComplete(function(){
            var setTime = setTimeout(function(){
                removeIndicador();//Elimina indicador de objeto
                addIndicador(objetoGrl);//Agrega indicador de objetos
                $(".d_pxbentorno3dpopupin_block").remove();//Quita div bloqueo para el menu opciones objeto
                clearTimeout(setTime);//Limpia tiempo
            },100);
        })
        .easing(TWEEN.Easing.Quadratic.InOut).repeat(0).start();  
    }
}
function deleteBtn(){
    /*
	* NOMBRE: deleteBtn.
	* UTILIDAD: Eliminacion de cada objeto
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    removeIndicador();//Elimina indicador de objeto
    removetooltipObj();//Quita el tooltip y menu edit de cada objeto
    hideLabels();//Oculta labels a ciertos objetos con nombre definido

    if((getpinA || getpinB) || (getpinpowerA || getpinpowerB)){//Si es jumper o jumper DC
        
        console.log("ENTRA CABLE");
        console.log(getIdbtnrest);
        delete saveDelete;
        var saveDelete = [];//Almacena los objetos del jumper a eliminar

        saveDelete.push(wireGrl);//Agrega cable
        saveDelete.push(pinbGrl);//Agrega pinB
        saveDelete.push(objetoGrl);//Agrega pinA
        
        if(getpinpowerA || getpinpowerB){//Solo si es jumper DC
            saveDelete.push(wireGrl2);//Agrega segundo cable
            if(getIdbtnrest === "acadapter"){
                saveDelete.push(energyadapter);//Agrega energyadapter
            }
            if(getIdbtnrest === "cdcable"){
                saveDelete.push(usbObj);//Agrega usb
            }
        }
        
        console.log(saveDelete);

        for(i=0; i<=saveDelete.length-1; i++){//Recorre el array para eliminar los objetos de jumper
            console.log(saveDelete[i]);
            if(saveDelete[i].name.split(" ")[0] != "jumper" && saveDelete[i].name.split(" ")[0] != "jumperPow"){//Se descarta al cable, ya que este no esta en "allClones"
                allClones.forEach(function(item,index){//Recorre el array "allClones"
                    if(item.name === saveDelete[i].name){//Busca el objeto a eliminar en "allClones"
                        allClones.splice(index,1,new THREE.Object3D());//Remplaza de "allClones" el objeto a eliminar, por un objeto3D, para conservar posiciones de objetos
                        allClones[index].name = "deleted";//Asigna un nombre vacio al objeto creado
                    }
                });
            }
            scene.remove(saveDelete[i]);//Quita de la escena el objeto
            delete saveDelete[i];//Elimina el objeto
        }
        wireGrl;//Limpia variable del objeto jumper
        getpinA = false;//Resetea variable
        getpinB = false;//Resetea variable
        getpinpowerA = false;//Resetea variable
        getpinpowerB = false;//Resetea variable
    }
    else{//Demas objetos
        if(objNamegrl === "resistance" || objNamegrl === "pushbutton" || objNamegrl === "switch" || objNamegrl === "preset" || objNamegrl === "ldr" || objNamegrl === "ultrasonic"){//Elimina el div (label) que se crea para resistencia
            var getNameobj = objetoGrl.name.replace(" ",'');//Obtiene el nombre sin el espacio
            $("#"+getNameobj).remove();//Elimina el div (label) de la resistencia seleccionada
        }
        //console.log(allClones);
        //console.log(objetoGrl);
        
        allClones.forEach(function(item,index){//Recorre el array "allClones"
            if(item.name === objetoGrl.name){//Busca el objeto a eliminar en "allClones"
                allClones.splice(index,1,new THREE.Object3D());//Remplaza de "allClones" el objeto a eliminar, por un objeto3D, para conservar posiciones de objetos
                allClones[index].name = "deleted";//Asigna un nombre vacio al objeto creado
            }
        });
        
        scene.remove(objetoGrl);//Quita de la escena el objeto
        delete objetoGrl;//Elimina el objeto
        
    }
    objetoGrl = null;//Limpia variable del objeto
    objNamegrl = null;//Limpia nombre del objeto
}
function selectledChange(data){
    /*
	* NOMBRE: selectledChange.
	* UTILIDAD: Cambio de color en cada led
	* ENTRADAS: data > datos de option del select
	* SALIDAS: Ninguna.
    */
    var getvalLed = data.value;//Obtiene el valor de select en led
    switch(getvalLed){
        case "red":
            objetoGrl.children[1].material.color = new THREE.Color( 0xff0000 );//Color led apagado
            objetoGrl.children[2].children[2].material.color = new THREE.Color( 0xff0000 );//Color sprite
            break;
        case "green":
            objetoGrl.children[1].material.color = new THREE.Color( 0x00ff00 );//Color led apagado
            objetoGrl.children[2].children[2].material.color = new THREE.Color( 0x00ff00 );//Color sprite
            break;
        case "blue":
            objetoGrl.children[1].material.color = new THREE.Color( 0x0000ff );//Color led apagado
            objetoGrl.children[2].children[2].material.color = new THREE.Color( 0x0000ff );//Color sprite
            break;
        case "yellow":
            objetoGrl.children[1].material.color = new THREE.Color( 0xffff00 );//Color led apagado
            objetoGrl.children[2].children[2].material.color = new THREE.Color( 0xffff00 );//Color sprite
            break;
        case "white":
            objetoGrl.children[1].material.color = new THREE.Color( 0xffffff );//Color led apagado
            objetoGrl.children[2].children[2].material.color = new THREE.Color( 0xffffff );//Color sprite
            break;
        default:
            break;
    }
    objetoGrl.newInfo.tooltipData[0] = getvalLed;//Agrega el dato del valor de select a objeto
    objetoGrl.newInfo.val[2] = getvalLed;//Agrega el dato del valor de select a objeto
}
function selectpresetChange(data){
    /*
	* NOMBRE: selectledChange.
	* UTILIDAD: Cambio de color en cada preset
	* ENTRADAS: data > datos de option del select
	* SALIDAS: Ninguna.
    */
    var getvalLed = data.value;//Obtiene el valor de select en preset
    switch(getvalLed){
        case "red":
            objetoGrl.children[4].material.color = new THREE.Color( 0xff0000 );//Color led apagado
            break;
        case "green":
            objetoGrl.children[4].material.color = new THREE.Color( 0x00ff00 );//Color led apagado
            break;
        case "blue":
            objetoGrl.children[4].material.color = new THREE.Color( 0x0000ff );//Color led apagado
            break;
        case "white":
            objetoGrl.children[4].material.color = new THREE.Color( 0xffffff );//Color led apagado
            break;
        default:
            break;
    }
    objetoGrl.newInfo.tooltipData[0] = getvalLed;//Agrega el dato del valor de select a objeto
    objetoGrl.newInfo.val[2] = getvalLed;//Agrega el dato del valor de select a objeto
}
function selectjumperChange(data){
    /*
	* NOMBRE: selectjumperChange.
	* UTILIDAD: Cambio de color en cada jumper
	* ENTRADAS: data > datos de option del select
	* SALIDAS: Ninguna.
    */
    var getvalJumper = data.value;//Obtiene el valor de select en jumper
    switch(getvalJumper){
        case "red":
            wireGrl.material.color = new THREE.Color( 0xff0000 );//Color jumper
            break;
        case "orange":
            wireGrl.material.color = new THREE.Color( 0xff8000 );//Color jumper
            break;
        case "yellow":
            wireGrl.material.color = new THREE.Color( 0xffff00 );//Color jumper
            break;
        case "green":
            wireGrl.material.color = new THREE.Color( 0x00ff00 );//Color jumper
            break;
        case "turquoise":
            wireGrl.material.color = new THREE.Color( 0x5dc1b9 );//Color jumper
            break;
        case "blue":
            wireGrl.material.color = new THREE.Color( 0x0000ff );//Color jumper
            break;
        case "purple":
            wireGrl.material.color = new THREE.Color( 0x8c004b );//Color jumper
            break;
        case "pink":
            wireGrl.material.color = new THREE.Color( 0xff0080 );//Color jumper
            break;
        case "brown":
            wireGrl.material.color = new THREE.Color( 0x804000 );//Color jumper
            break;
        case "grey":
            wireGrl.material.color = new THREE.Color( 0x9b9b9b );//Color jumper
            break;
        case "white":
            wireGrl.material.color = new THREE.Color( 0xffffff );//Color jumper
            break;
        case "black":
            wireGrl.material.color = new THREE.Color( 0x000000 );//Color jumper
            break;
        default:
            break;
    }
    objetoGrl.newInfo.tooltipData[0] = getvalJumper;//Agrega el dato del valor de select a objeto
    pinbGrl.newInfo.tooltipData[0] = getvalJumper;//Agrega el dato del valor de select a objeto B
    objetoGrl.newInfo.val[2] = getvalJumper;//Agrega el dato del valor de select a objeto
}
function selectresistanceChange(data){
    /*
	* NOMBRE: selectresistanceChange.
	* UTILIDAD: Cambio de color en cada resistencia
	* ENTRADAS: data > datos de option del select
	* SALIDAS: Ninguna.
    */
    var getvalResistance = data.value;//Obtiene el valor de select en led
    switch(getvalResistance){
        case "220 Ohms":
            objetoGrl.children[1].material.color = new THREE.Color( 0xd9b477 );//Color
            objetoGrl.children[2].material.color = new THREE.Color( 0xc40808 );//Color 1 strip
            objetoGrl.children[3].material.color = new THREE.Color( 0xc40808 );//Color 2 strip
            objetoGrl.children[5].material.color = new THREE.Color( 0x8b4513 );//Color Multiplier
            objetoGrl.children[4].material.color = new THREE.Color( 0xd1ca41 );//Color Tolerance
            break;
        case "1000 Ohms":
            objetoGrl.children[1].material.color = new THREE.Color( 0xd9b477 );//Color
            objetoGrl.children[2].material.color = new THREE.Color( 0x8a3d06 );//Color 1 strip
            objetoGrl.children[3].material.color = new THREE.Color( 0x000000 );//Color 2 strip
            objetoGrl.children[5].material.color = new THREE.Color( 0xc40808 );//Color Multiplier
            objetoGrl.children[4].material.color = new THREE.Color( 0xd1ca41 );//Color Tolerance
            break;
        case "22000 Ohms":
            objetoGrl.children[1].material.color = new THREE.Color( 0xd9b477 );//Color
            objetoGrl.children[2].material.color = new THREE.Color( 0xc40808 );//Color 1 strip
            objetoGrl.children[3].material.color = new THREE.Color( 0xc40808 );//Color 2 strip
            objetoGrl.children[5].material.color = new THREE.Color( 0xf17624 );//Color Multiplier
            objetoGrl.children[4].material.color = new THREE.Color( 0xd1ca41 );//Color Tolerance
            break;
        default:
            break;
    }
    var getIdobj = objetoGrl.name.split(" ")[0];//Obtiene el id del objeto seleccionado
    $("#"+getIdobj+"resistance").text(getvalResistance);//Agrega el texto al div de label
    objetoGrl.newInfo.tooltipData[0] = getvalResistance;//Agrega el dato del valor de select a objeto
    objetoGrl.newInfo.val[2] = getvalResistance;//Agrega el dato del valor de select a objeto
}
var startAnima = false;//Establece si hay o no animacion
function setAnimation(){
    /*
	* NOMBRE: setAnimation.
	* UTILIDAD: Establece la animacion sin el Tween
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    if(startAnima === true){//Si hay animacion
        //console.log("ANIMA");
        curveFollow();//Points catmull siguen la posicion de las puntos clave  
    }
    if(reajusteAnima === true){//Reajusta canvas si se abre el menu
        reajusteConte3d();//Reajusta el contenido 3d en resize
    }
    if(animaAcadapter){
       moveAcadapter();//Animacion de cable de AC adapter
    }
}
function curveFollow(){
    /*
	* NOMBRE: curveFollow.
	* UTILIDAD: Points bezier siguen la posicion de las puntos clave
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    //Actualizacion de la animacion de la cuerda
    if(getpinA){//Wire sigue a pinA
        wireGrl.geometry.parameters.path.v0.x = objetoGrl.position.x;
        wireGrl.geometry.parameters.path.v0.z = objetoGrl.position.z;
        wireGrl.geometry.parameters.path.v1.x = objetoGrl.position.x;
        wireGrl.geometry.parameters.path.v1.z = objetoGrl.position.z;
        wireGrl.geometry.parameters.path.v0.y = objetoGrl.position.y+0.7;
    }
    if(getpinB){//Wire sigue a pinB
        wireGrl.geometry.parameters.path.v2.x = objetoGrl.position.x;
        wireGrl.geometry.parameters.path.v2.z = objetoGrl.position.z;
        wireGrl.geometry.parameters.path.v3.x = objetoGrl.position.x;
        wireGrl.geometry.parameters.path.v3.z = objetoGrl.position.z;
        wireGrl.geometry.parameters.path.v3.y = objetoGrl.position.y+0.7;
    }
    if(getpinpowerA || getpinpowerB){
        wireGrl.geometry.parameters.path.v2.x = objetoGrl.position.x;
        wireGrl.geometry.parameters.path.v2.z = objetoGrl.position.z;
        wireGrl.geometry.parameters.path.v3.x = objetoGrl.position.x;
        wireGrl.geometry.parameters.path.v3.z = objetoGrl.position.z;
        wireGrl.geometry.parameters.path.v3.y = objetoGrl.position.y+0.7;
    }
    //Actualizacion de geometria
    var newCable = new THREE.TubeBufferGeometry(wireGrl.geometry.parameters.path, 80, 0.05, 40, false);
    wireGrl.geometry.copy(newCable);
    wireGrl.geometry.needsUpdate = true;
}
/*function acceptMessage(){
    //Btn de aceptar mensaje final
    $("#d_pxbviewentorno3dmessagegrl").fadeOut();
    var setTime = setTimeout(function(){
        onLed(activeObj);//Acciones para prender el LED
    },300);
}*/
var stepslineStatus = 0;//Indica si los pasos son de instrucciones o simulacion
var activeObj = [];//Almacena los objetos que ya estan validados, para evitar prender un led, buzzer, rgb, etc que no este validado
var statusCableenergia = false;//Cable energia NO esta en escenario
var powerData = [];//Almacen posiicon de pin de energia (+)A (-)A (+)B (-)B
var contActive;//Conteo de pasos validados
var statusInstructions = false;//Almacena si ya se completaron instrucciones
var statusValidation = false;
var objManipulated;//Indica si hay objetos no manipulados

var setRgb = [0,0,0];//Almacena color rgb

function playBtn(){
    //Ejecuta acciones de validacion proyecto
    $("#d_pxbentorno3dplaycheckbox").change( function(){//Cambio en el checkbox
        if($("#d_pxbentorno3dplaycheckbox").is(':checked')){//Es checked
            stopRaycaster();//Para raycaster
            startCrono();//Inicia tiempo de simulacion
            
            hideWarning();//Oculta las advertencias sobre objetos
            hideLabels();//Oculta labels a ciertos objetos con nombre definido
            removeIndicador();//Elimina indicador de objeto
            removetooltipObj();//Quita el tooltip y menu edit de cada objeto
            //removeentonor3dPasos();//Quita emergentes de pasos instrucciones
            
            ///////
            //showActive();//Muestra btn de objetos en escenario
            ///////
            objManipulated = true;//Indica si hay objetos no manipulados
            checkManipulated();//Revisa si hay objetos que se mueven que no han sido manipulados

            if(statusInstructions === false){//Instrucciones sin completar
            
                //$("#d_pxbentorno3dsteps").append('<div class="d_pxbentorno3dsteps_block"></div>');//Agrega block a botones de pasos
                $(".d_pxbentorno3dstepsbtns").removeClass('d_pxbentorno3dstepsbtns_valida');//Quita estilo a los pasos, para despues volover a validar todos (se hace porque en cualquier momento se pueden mover de nuevo objetos, cuyos valores ya estaban validados)
                $(".d_pxbentorno3dstepsbtns").removeAttr('name');//Quita attr name para resetear la validacion del paso

                
                checkObjs();//Revisa conexion energia, y objetos colocados en su posicion dentro de la protoboard
                validaJumpers();//Valida que algun jumper no este conectado al + y - a la vez
                
                energyConected();//Si la energia + y - esta conectada a las lineas + y - respectivamente de la protoboard
                
                
                console.log("PINES EN LA MISMA DE POLARIDAD = "+samelineenergyStatus);
                console.log("OBJETOS MANIPULADOS = "+manipulatedStatus);
                console.log("OBJETOS DENTRO PROTOBOARD = "+insideprotoboardStatus);
                console.log("JUMPERS NO HACEN CORTO = "+crashpolarityStatus);
                console.log("CABLE ENERGIA CONECTADO = "+conectenergyStatus);
                
                //console.log("OBJETO MISMA FILA QUE CABLE ENERGIA = "+samerowStatus);
                console.log("CABLE ENERGIA CONECTADO A + Y - = "+polarutyenergyStatus);
                

                /////////El LED no va en esta parte
                
                
            }else{//Preguntas de simulacion
                //$("#d_pxbentorno3dsteps").append('<div class="d_pxbentorno3dsteps_block"></div>');//Agrega block a botones de pasos
                
                //Acciones de funcion general
                /////////Valida componentes correctamente conectados
                
            }
            
            
            if(samelineenergyStatus.includes(false) === false && manipulatedStatus === true && insideprotoboardStatus.includes(false) === false && crashpolarityStatus === true && conectenergyStatus === true && /*samerowStatus.includes(false) === false &&*/ polarutyenergyStatus === true){//Valida que todo este correctamente en la protoboard
                console.log("******TODO CORECTO******");
                
                valSteps();//Valida pasos instrucciones
                
                validarEnergyneg();//Valida que los objetos tengan la energia negativa para activar (led, buzzer, rgb, etc.)
                validarEnergypos();//Valida que los objetos tengan la energia positiva para activar (led, buzzer, rgb, etc.)
                
                joinEnergy();//Une lineas de energia, para crear una matriz de lineas finales
                
                creasoundBuzzer();//Crea el audio del zumbador
                valAllobjs();//Valida los objetos que estan en las lineas de energia finales
                showActive();//Muestra btn de objetos en escenario
                objPress();//Click en los btn de objetos de presionar que tienen algun movimiento
                objAction();//Interaccion con objetos con info de arduino
            }
            
            
        }else{//Es unchecked
            hideWarning();//Oculta las advertencias sobre objetos
            hideLabels();//Oculta labels a ciertos objetos con nombre definido
            removeIndicador();//Elimina indicador de objeto
            removetooltipObj();//Quita el tooltip y menu edit de cada objeto
            startRaycaster();//Inicia raycaster
            stopCrono();//Para tiempo de simulacion
            offPowerbank();//Apaga powerbank
            
            hideActive();//Oculta btn de objetos en escenario 3d
            
            if(statusInstructions === false){//Instrucciones sin completar
                 
            }else{//Preguntas de simulacion
                
                //Acciones de funcion general 
                
            }
            
            /////Esto es prtovisional, pero no va
            $("#d_pxbviewentorno3dmessagegrl").fadeOut();//Oculta mensaje de pasos terminados

            //statusValidation = false;
            
            offLed("all");//Acciones para apagar el LED
            offRgb("all");//Acciones para apagar el RGB
            offBuzzer("all");//Acciones para apagar el Buzzer
            offRgbc("all");//Acciones para apagar el RGBc
            
            resetobjPress();//Resetea las posiciones originales de los objetos que tienen algun movimiento (boton, interruptor, etc)
            resetobjAction();//Resetea interaccion con objetos con info de arduino
            
            $(".d_emergentectrlpushbutton").remove();//Quita leyenda de teclas a presionar en botones
            
            activatePushbutton = false;//Determina si hay pushbutton, para activar tecla CRTL
        }
        emergenteGestosclose();//Cierra emergente de gestos
    });
}

var buzzerRgbc = [];//Almacena si hay un RGBc y buzzer en paralelo conectados
var getBuzzerrgbc = [];//Determina si estan los dos componentes buzzer y rgbc
var activatePushbutton = false;//Determina si hay pushbutton, para activar tecla CRTL
function valAllobjs(){
    /*
	* NOMBRE: valAllobjs.
	* UTILIDAD: Valida los objetos que estan en las lineas de energia finales
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */

    var contPushbutton = 0;
    var contSwitch = 0;
    var contPreset = 0;
    var contLdr = 0;
    var contUltrasonic = 0;
    savedataButton = [];//Almacena el nombre del boton y los leds (objetos) que prende
    savedataSwitch = [];//Almacena el nombre del switch y los leds (objetos) que prende
    savedataPreset = [];//Almacena el nombre del preset y los leds (objetos) que prende
    savedataLdr = [];//Almacena el nombre del ldr y los leds (objetos) que prende
    savedataUltrasonic = [];//Almacena el nombre del ultrasonic
    
    addBuzzer = [];//Resetea almacenamiento de sonidos
    
    buzzerRgbc = [];//Resetea si hay un RGBc y buzzer en paralelo conectados
    
    var flowEnergy = [];//Almacena la corriente electrica que va en cada linea de energia
    
    var contResistance = [];//Contador de resistencias por linea de energia
    var contLed = [];//Contador de LEDs por linea de energia
    var contRgb = [];//Contador de RGBs por linea de energia
    var contRgbc = [];//Contador de RGBcs por linea de energia
    var contBuzzer = [];//Contador de Buzzers por linea de energia
    
    getBuzzerrgbc = [];//Resetea almacenamiento de buzzer rgbc

    console.log("LINE NAME ENERGY ************************");
    console.log(newLineenergyname);
    
    newLineenergyname.forEach(function(items,indexs){//Busca las lineas de energia por su nombre
        contResistance.push([0]);//Contador de resistencias por linea de energia
        contLed.push([0]);//Contador de LEDs por linea de energia
        contRgb.push([0]);//Contador de RGBs por linea de energia
        contRgbc.push([0]);//Contador de RGBcs por linea de energia
        contBuzzer.push([0]);//Contador de Buzzers por linea de energia
        buzzerRgbc.push([]);
        items.forEach(function(items2,indexs2){//Busca elementos de cada linea de energia
            if(items2.split(" ")[1] === "resistance"){//La linea si tiene resistencia
                contResistance[indexs]++;//Aumaneta 1 en conteo de resistencias
            }
            if(items2.split(" ")[1] === "buzzer"){//La linea si tiene buzzer
                contBuzzer[indexs]++;//Aumaneta 1 en conteo de LEDs
            }
            if(items2.split(" ")[1] === "led"){//La linea si tiene led
                contLed[indexs]++;//Aumaneta 1 en conteo de LEDs
            }
            if(items2.split(" ")[1] === "rgbc"){//La linea si tiene rgbc
                contRgbc[indexs]++;//Aumaneta 1 en conteo de RGBcs
            }
            if(items2.split(" ")[1] === "rgb"){//La linea si tiene rgb
                contRgb[indexs]++;//Aumaneta 1 en conteo de RGBs
            }
            if(items2.split(" ")[1] === "rgbc" || items2.split(" ")[1] === "buzzer"){//La linea si tiene RGBc y buzzer
                buzzerRgbc[indexs].push(true);//Almacena si hay un RGBc y buzzer en paralelo conectados
                getBuzzerrgbc.push(true);
            }
        });
        flowEnergy.push([1.3]);//Almacena la corriente electrica que va en cada linea de energia
    });
    
    console.log("?????????????????????????");
    
    newLineenergyname.forEach(function(items,indexs){//Busca las lineas de energia por su nombre

        console.log(items);

        console.log("LINEA "+indexs);

        var statusResistance = false;//Almacena si en la linea de energia hay resistencia
        var statusPushbutton = false;//Almacena si en la linea de energia hay pushbutton
        var statusSwitch = false;//Almacena si en la linea de energia hay switch
        var statusPreset = false;//Almacena si en la linea de energia hay preset
        var statusLdr = false;//Almacena si en la linea de energia hay preset
        var statusLed = false;//Almacena si en la linea de energia hay LED
        var statusRgbc = false;//Almacena si en la linea de energia hay RGBC
        var statusRgb = false;//Almacena si en la linea de energia hay RGB
        var statusBuzzer = false;//Almacena si en la linea de energia hay buzzer
        var statusUltrasonic = false;//Almacena si en la linea de energia hay ultrasonic
        var getObjresistance = "Componente";//Almacena nombre del objeto para warning de resistencia

        items.forEach(function(items2,indexs2){//Busca elementos de cada linea de energia

            //if(savenorepeatObjs.includes(items2) === false){

            if(items2.split(" ")[1] === "resistance"){//La linea si tiene resistencia
                statusResistance = true;//En la linea si hay resistencia
            }
            if(items2.split(" ")[1] === "pushbutton"){//La linea si tiene pushbutton
                statusPushbutton = true;//En la linea si hay pushbutton
            }
            if(items2.split(" ")[1] === "switch"){//La linea si tiene switch
                statusSwitch = true;//En la linea si hay switch
            }
            if(items2.split(" ")[1] === "preset"){//La linea si tiene preset
                statusPreset = true;//En la linea si hay preset
            }
            if(items2.split(" ")[1] === "buzzer"){//La linea si tiene buzzer
                console.log("ENTRA BUZZER");
                getObjresistance = "Buzzer";//Rescata nombre dle objeto
                statusBuzzer = true;//En la linea si hay buzzer
                addBuzzer.push(soundBuzzer.clone());//Agrega el sonido a la variable
                addBuzzer[addBuzzer.length-1].name = items2;//Le agrega el nombre del objeto buzzer en curso, para recuperarlo en onBuzzer();
            }
            if(items2.split(" ")[1] === "led"){//La linea si tiene led
                console.log("ENTRA LED");
                getObjresistance = "LED";//Rescata nombre dle objeto
                statusLed = true;//En la linea si hay LED
            }
            if(items2.split(" ")[1] === "rgbc"){//La linea si tiene rgbc
                console.log("ENTRA RGB camaleón");
                getObjresistance = "RGB camaleón";//Rescata nombre dle objeto
                statusRgbc = true;//En la linea si hay LED
            }
            if(items2.split(" ")[1] === "rgb"){//La linea si tiene rgb
                console.log("ENTRA RGB");
                getObjresistance = "RGB";//Rescata nombre dle objeto
                statusRgb = true;//En la linea si hay RGB
                setRgb = [0,0,0];//Almacena color rgb
            }
            if(items2.split(" ")[1] === "ldr"){//La linea si tiene ldr
                console.log("ENTRA LDR");
                getObjresistance = "Fotorresistencia";//Rescata nombre dle objeto
                statusLdr = true;//En la linea si hay ldr
            }
            if(items2.split(" ")[1] === "ultrasonic"){//La linea si tiene ldr
                console.log("ENTRA ULTRASONICO");
                getObjresistance = "Ultrasónico";//Rescata nombre dle objeto
                statusUltrasonic = true;//En la linea si hay ldr
            }
        });

        function conteoResistencias(){
            /*
            * NOMBRE: conteoResistencias.
            * UTILIDAD: Cuenta las resistencias en cada linea de energia
            * ENTRADAS: Ninguna.
            * SALIDAS: Ninguna.
            */
            console.log("NUMERO DE RESISTENCIAS LINEA "+indexs);
            console.log(contResistance[indexs]);
            var setvalIntensity;//Almacena temporalmente el dato de la linea de energia
            var dataOhms = 0;//Dato asignado por el tipo/valor de Resistencia
            items.forEach(function(items2,indexs2){//Busca elementos de cada linea de energia
                if(items2.split(" ")[1] === "resistance"){//La linea si tiene resistencia
                    scene.children.forEach(function(items3,index3){//Busca en todo, el rgb a activar
                        if(items3.name === items2){//Busca el objeto resistencia
                            switch(items3.newInfo.val[2]){//Caso de valor de ohms
                                case "220 Ohms"://Resistencia de 220 ohms
                                    dataOhms = 0.1;//Dato asignado por el tipo/valor de Resistencia
                                    break;
                                case "1000 Ohms"://Resistencia de 1k ohms
                                    dataOhms = 0.31;//Dato asignado por el tipo/valor de Resistencia
                                    break;
                                case "22000 Ohms"://Resistencia de 22000 ohms
                                    dataOhms = 0.5;//Dato asignado por el tipo/valor de Resistencia
                                    break;
                                default:
                                    break;
                            }
                        }
                    });
                }
            });
            setvalIntensity = Number((flowEnergy[indexs]-(dataOhms*contResistance[indexs])).toFixed(2));//Obtiene el valor de linea de energia, restandole el valor de componente
            if(setvalIntensity <= 0.4){//Si el valor es menor a 0.4, se establece este como minimo.
                setvalIntensity = 0.4;//Se establece el valor minimo.
            }
            flowEnergy[indexs] = setvalIntensity;//Almacena en variable el nuevo dato de flujo de energia
            console.log(setvalIntensity);
        }
        function conteoLeds(){
            /*
            * NOMBRE: conteoLeds.
            * UTILIDAD: Cuenta los LEDs en cada linea de energia
            * ENTRADAS: Ninguna.
            * SALIDAS: Ninguna.
            */
            console.log("NUMERO DE LEDs LINEA "+indexs);
            console.log(contLed[indexs]);
            var setvalIntensity;//Almacena temporalmente el dato de la linea de energia
            var dataOhms = 0.2;//Dato asignado por el tipo/valor de LED
            setvalIntensity = Number((flowEnergy[indexs]-(dataOhms*contLed[indexs])).toFixed(2));//Obtiene el valor de linea de energia, restandole el valor de componente
            if(setvalIntensity <= 0.4){//Si el valor es menor a 0.4, se establece este como minimo.
                setvalIntensity = 0.4;//Se establece el valor minimo.
            }
            flowEnergy[indexs] = setvalIntensity;//Almacena en variable el nuevo dato de flujo de energia
            console.log(setvalIntensity);
        }
        function conteoRgbs(){
            /*
            * NOMBRE: conteoRgbs.
            * UTILIDAD: Cuenta los RGBs en cada linea de energia
            * ENTRADAS: Ninguna.
            * SALIDAS: Ninguna.
            */
            console.log("NUMERO DE RGBs LINEA "+indexs);
            console.log(contRgb[indexs]);
            var setvalIntensity;//Almacena temporalmente el dato de la linea de energia
            var dataOhms = 0.2;//Dato asignado por el tipo/valor de RGB
            setvalIntensity = Number((flowEnergy[indexs]-(dataOhms*contRgb[indexs])).toFixed(2));//Obtiene el valor de linea de energia, restandole el valor de componente
            if(setvalIntensity <= 0.4){//Si el valor es menor a 0.4, se establece este como minimo.
                setvalIntensity = 0.4;//Se establece el valor minimo.
            }
            flowEnergy[indexs] = setvalIntensity;//Almacena en variable el nuevo dato de flujo de energia
            console.log(setvalIntensity);
        }
        function conteoRgbcs(){
            /*
            * NOMBRE: conteoRgbcs.
            * UTILIDAD: Cuenta los RGBcs en cada linea de energia
            * ENTRADAS: Ninguna.
            * SALIDAS: Ninguna.
            */
            console.log("NUMERO DE RGBcs LINEA "+indexs);
            console.log(contRgbc[indexs]);
            var setvalIntensity;//Almacena temporalmente el dato de la linea de energia
            var dataOhms = 0.2;//Dato asignado por el tipo/valor de RGBc
            setvalIntensity = Number((flowEnergy[indexs]-(dataOhms*contRgbc[indexs])).toFixed(2));//Obtiene el valor de linea de energia, restandole el valor de componente
            if(setvalIntensity <= 0.4){//Si el valor es menor a 0.4, se establece este como minimo.
                setvalIntensity = 0.4;//Se establece el valor minimo.
            }
            flowEnergy[indexs] = setvalIntensity; //Almacena en variable el nuevo dato de flujo de energia
            console.log(setvalIntensity);
        }
        function conteoBuzzers(){
            /*
            * NOMBRE: conteoBuzzers.
            * UTILIDAD: Cuenta los Buzzers en cada linea de energia
            * ENTRADAS: Ninguna.
            * SALIDAS: Ninguna.
            */
            console.log("NUMERO DE Buzzers LINEA "+indexs);
            console.log(contBuzzer[indexs]);
            var setvalIntensity;//Almacena temporalmente el dato de la linea de energia
            var dataOhms = 0.4;//Dato asignado por el tipo/valor de Buzzer
            setvalIntensity = Number((flowEnergy[indexs]-(dataOhms*contBuzzer[indexs])).toFixed(2));//Obtiene el valor de linea de energia, restandole el valor de componente
            if(setvalIntensity <= 0.4){//Si el valor es menor a 0.4, se establece este como minimo.
                setvalIntensity = 0.4;//Se establece el valor minimo.
            }
            flowEnergy[indexs] = setvalIntensity;//Almacena en variable el nuevo dato de flujo de energia
            console.log(setvalIntensity);
        }
        

        var pinRgb;
        var letterRgb;
        function setRgbs(){
            /*
            * NOMBRE: setRgbs.
            * UTILIDAD: Asigna los colores del rgb, de acuerdo a la conexion con negativo
            * ENTRADAS: Ninguna.
            * SALIDAS: Ninguna.
            */
            scene.children.forEach(function(itemes,indexes){//Busca en todo, el rgb a activar
                if(items.includes(itemes.name) === true && itemes.name.split(" ")[1] === "rgb"){//Encuantra el rgb el la linea de energia que se va a activar (como las tres lineas de energia tienen el mismo RGB, entonces lo va a hacer tres veces con la misma info)
                    console.log("RGBsssssssssssssssssssssssssssssssssssssss");
                    console.log(itemes.name);
                    newLineenergypostemporary[indexs].forEach(function(ite1,ind1){
                        itemes.newInfo.usedLines.forEach(function(ite3,ind3){
                            if(ite1 === ite3){
                                console.log("ind3*****************");
                                console.log(ind3);
                                if(ind3 === 1){//Linea de energia esta conectado al pin 1 = R
                                    setRgb[0] = 1;//Se agrega color R
                                    letterRgb = "r";//Almacena dato R del RGB
                                    pinRgb = 0;//Almacena posicion del pin RGB donde se agrega el dato
                                    itemes.newInfo.onrgbData.push(true);//Agrega pin conectado al RGB, para saber cuantas lineas tiene conectado
                                }
                                if(ind3 === 2){//Linea de energia esta conectado al pin 2 = G
                                    setRgb[1] = 1;//Se agrega color G
                                    letterRgb = "g";//Almacena dato G del RGB
                                    pinRgb = 1;//Almacena posicion del pin RGB donde se agrega el dato
                                    itemes.newInfo.onrgbData.push(true);//Agrega pin conectado al RGB, para saber cuantas lineas tiene conectado
                                }
                                if(ind3 === 3){//Linea de energia esta conectado al pin 3 = B
                                    setRgb[2] = 1;//Se agrega color B
                                    letterRgb = "b";//Almacena dato B del RGB
                                    pinRgb = 2;//Almacena posicion del pin RGB donde se agrega el dato
                                    itemes.newInfo.onrgbData.push(true);//Agrega pin conectado al RGB, para saber cuantas lineas tiene conectado
                                }
                            }

                        });
                    });
                    console.log("COLORES RGB");
                    console.log(setRgb);
                    console.log(pinRgb);
                }
            });
        }
        function setPreset(){
            /*
            * NOMBRE: setPreset.
            * UTILIDAD: Asigna la coneccion de los preset, ya que tiene tres pines
            * ENTRADAS: Ninguna.
            * SALIDAS: Ninguna.
            */

            scene.children.forEach(function(itemes,indexes){//Busca en todo, el rgb a activar
                if(items.includes(itemes.name) === true && itemes.name.split(" ")[1] === "preset"){//Encuantra el preset el la linea de energia que se va a activar (como las dos lineas de energia tienen el mismo RGB, entonces lo va a hacer tres veces con la misma info)
                    console.log("PRESETsssssssssssssssssssssssssssssssssssssss");
                    console.log(itemes.name);
                    newLineenergynegtemporary[indexs].forEach(function(ite1,ind1){

                        itemes.newInfo.usedLines.forEach(function(ite3,ind3){
                            if(ite1 === ite3){
                                console.log("PRESET LINE");
                                console.log(ind3);
                                if(ind3 === 0){//Linea de energia esta conectado al pin 1
                                    itemes.newInfo.onpresetData.push(0);//Agrega pin conectado al preset, para saber cuantas lineas tiene conectado
                                }
                                if(ind3 === 1){//Linea de energia esta conectado al pin 1
                                    itemes.newInfo.onpresetData.push(1);//Agrega pin conectado al preset, para saber cuantas lineas tiene conectado
                                }
                            }
                        });

                    });
                    console.log("PINES PRESET");
                    console.log(itemes.newInfo.onpresetData);
                }
            });
        }
        console.log("LINEA "+indexs+" TIENE RGBc "+statusRgbc+" Y BUZZER "+statusBuzzer);
        conteoResistencias();//Cuenta las resistencias en cada linea de energia
        conteoLeds();//Cuenta los LEDs en cada linea de energia
        conteoRgbs();//Cuenta los RGBs en cada linea de energia
        conteoRgbcs();//Cuenta los RGBcs en cada linea de energia
        conteoBuzzers();//Cuenta los Buzzers en cada linea de energia

        if(statusPushbutton){//Si tiene boton
            savedataButton.push([[],[],[],[],[]]);//Resetea el nombre del boton y los leds (objetos) que prende
            items.forEach(function(items2,indexs2){//Busca elementos de cada linea de energia
                if(items2.split(" ")[1] === "pushbutton"){//La linea si tiene pushbutton
                    savedataButton[contPushbutton][0] = items2;//Agrega pushbutton
                    activatePushbutton = true;//Determina si hay pushbutton, para activar tecla CRTL
                }
                if(items2.split(" ")[1] === "led"){//La linea si tiene led
                    savedataButton[contPushbutton][1].push([items2,flowEnergy[indexs],statusResistance]);//Agrega los leds a prender y la intensidad con el pushbutton
                }
                if(items2.split(" ")[1] === "buzzer"){//La linea si tiene buzzer
                    savedataButton[contPushbutton][2].push([items2,flowEnergy[indexs],statusResistance]);//Agrega los buzzer a prender con el pushbutton
                }
                if(items2.split(" ")[1] === "rgb"){//La linea si tiene rgb
                    setRgbs();//Asigna los colores del rgb, de acuerdo a la conexion con negativo
                    savedataButton[contPushbutton][3].push([items2,flowEnergy[indexs],[letterRgb,setRgb[pinRgb]],statusResistance]);//Agrega los rgbs a prender, la intensidad, y los colores rgb con el pushbutton
                }
                if(items2.split(" ")[1] === "rgbc"){//La linea si tiene rgbc
                    savedataButton[contPushbutton][4].push([items2,flowEnergy[indexs],statusResistance]);//Agrega los rgbc a prender y la intensidad con el pushbutton
                }
            })
            contPushbutton++//Agrega conteo para objeto
        }
        else if(statusSwitch){//Si tiene switch
            //console.log(contSwitch);
            //console.log("newpinSwitchget???????????");
            //console.log(newpinSwitchget);
            //conteoResistencias();//Cuenta las resistencias en cada linea de energia
            savedataSwitch.push([[],[],[],[],[]]);//Resetea el nombre del boton y los leds (objetos) que prende
            items.forEach(function(items2,indexs2){//Busca elementos de cada linea de energia
                if(items2.split(" ")[1] === "switch"){//La linea si tiene switch
                    savedataSwitch[contSwitch][0] = [items2,newpinSwitchget[indexs]];//Agrega switch
                    //savedataSwitch[contSwitch][0] = [items2,pinSwitchget];//Agrega switch
                }
                if(items2.split(" ")[1] === "led"){//La linea si tiene led
                    savedataSwitch[contSwitch][1].push([items2,flowEnergy[indexs],statusResistance]);//Agrega los leds a prender y la intensidad con el switch
                }
                if(items2.split(" ")[1] === "buzzer"){//La linea si tiene buzzer
                    savedataSwitch[contSwitch][2].push([items2,flowEnergy[indexs],statusResistance]);//Agrega los leds a prender con el switch
                }
                if(items2.split(" ")[1] === "rgb"){//La linea si tiene rgb
                    setRgbs();//Asigna los colores del rgb, de acuerdo a la conexion con negativo
                    savedataSwitch[contSwitch][3].push([items2,flowEnergy[indexs],[letterRgb,setRgb[pinRgb]],statusResistance]);//Agrega los rgbs a prender, la intensidad, y los colores rgb con el switch
                }
                if(items2.split(" ")[1] === "rgbc"){//La linea si tiene rgbc
                    savedataSwitch[contSwitch][4].push([items2,flowEnergy[indexs],statusResistance]);//Agrega los rgbc a prender y la intensidad con el switch
                }
            })
            contSwitch++//Agrega conteo para objeto
        }
        else if(statusPreset){//Si tiene preset
            //conteoResistencias();//Cuenta las resistencias en cada linea de energia
            savedataPreset.push([[],[],[],[],[]]);//Resetea el nombre del potenciometro y los leds (objetos) que prende
            items.forEach(function(items2,indexs2){//Busca elementos de cada linea de energia
                if(items2.split(" ")[1] === "preset"){//La linea si tiene preset
                    setPreset();//Asigna la coneccion de los preset, ya que tiene tres pines
                    savedataPreset[contPreset][0] = items2;//Agrega preset
                }
                if(items2.split(" ")[1] === "led"){//La linea si tiene led
                    savedataPreset[contPreset][1].push([items2,flowEnergy[indexs],statusResistance]);//Agrega los leds a prender y la intensidad con el preset
                }
                if(items2.split(" ")[1] === "buzzer"){//La linea si tiene buzzer
                    savedataPreset[contPreset][2].push([items2,flowEnergy[indexs],statusResistance]);//Agrega los leds a prender con el preset
                }
                if(items2.split(" ")[1] === "rgb"){//La linea si tiene rgb
                    setRgbs();//Asigna los colores del rgb, de acuerdo a la conexion con negativo
                    savedataPreset[contPreset][3].push([items2,flowEnergy[indexs],[letterRgb,setRgb[pinRgb]],statusResistance]);//Agrega los rgbs a prender, la intensidad, y los colores rgb con el preset
                }
                if(items2.split(" ")[1] === "rgbc"){//La linea si tiene rgbc
                    savedataPreset[contPreset][4].push([items2,flowEnergy[indexs],statusResistance]);//Agrega los rgbc a prender y la intensidad con el preset
                }
            })
            contPreset++//Agrega conteo para objeto
        }
        else if(statusLdr){//Si tiene ldr
            //conteoResistencias();//Cuenta las resistencias en cada linea de energia
            savedataLdr.push([[],[],[],[],[]]);//Resetea el nombre del potenciometro y los leds (objetos) que prende
            items.forEach(function(items2,indexs2){//Busca elementos de cada linea de energia
                if(items2.split(" ")[1] === "ldr"){//La linea si tiene ldr
                    savedataLdr[contLdr][0] = items2;//Agrega ldr
                }
                if(items2.split(" ")[1] === "led"){//La linea si tiene led
                    savedataLdr[contLdr][1].push([items2,flowEnergy[indexs],statusResistance]);//Agrega los leds a prender y la intensidad con el ldr
                }
                if(items2.split(" ")[1] === "buzzer"){//La linea si tiene buzzer
                    savedataLdr[contLdr][2].push([items2,flowEnergy[indexs],statusResistance]);//Agrega los leds a prender con el ldr
                }
                if(items2.split(" ")[1] === "rgb"){//La linea si tiene rgb
                    setRgbs();//Asigna los colores del rgb, de acuerdo a la conexion con negativo
                    savedataLdr[contLdr][3].push([items2,flowEnergy[indexs],[letterRgb,setRgb[pinRgb]],statusResistance]);//Agrega los rgbs a prender, la intensidad, y los colores rgb con el ldr
                }
                if(items2.split(" ")[1] === "rgbc"){//La linea si tiene rgbc
                    savedataLdr[contLdr][4].push([items2,flowEnergy[indexs],statusResistance]);//Agrega los rgbc a prender y la intensidad con el ldr
                }
            })
            contLdr++//Agrega conteo para objeto
        }
        else if(statusUltrasonic){//Si tiene ultrasonic
            savedataUltrasonic.push([[],[],[],[],[]]);//Resetea el nombre del ultrasonico
            items.forEach(function(items2,indexs2){//Busca elementos de cada linea de energia
                if(items2.split(" ")[1] === "ultrasonic"){//La linea si tiene ultrasonic
                    savedataUltrasonic[contUltrasonic][0] = items2;//Agrega ultrasonic
                }
                if(items2.split(" ")[1] === "led"){//La linea si tiene led
                    savedataUltrasonic[contUltrasonic][1].push([items2,flowEnergy[indexs],statusResistance]);//Agrega los leds a prender y la intensidad con el ultrasonic
                }
                if(items2.split(" ")[1] === "buzzer"){//La linea si tiene buzzer
                    savedataUltrasonic[contUltrasonic][2].push([items2,flowEnergy[indexs],statusResistance]);//Agrega los leds a prender con el ultrasonic
                }
                if(items2.split(" ")[1] === "rgb"){//La linea si tiene rgb
                    setRgbs();//Asigna los colores del rgb, de acuerdo a la conexion con negativo
                    savedataUltrasonic[contUltrasonic][3].push([items2,flowEnergy[indexs],[letterRgb,setRgb[pinRgb]],statusResistance]);//Agrega los rgbs a prender, la intensidad, y los colores rgb con el ultrasonic
                }
                if(items2.split(" ")[1] === "rgbc"){//La linea si tiene rgbc
                    savedataUltrasonic[contUltrasonic][4].push([items2,flowEnergy[indexs],statusResistance]);//Agrega los rgbc a prender y la intensidad con el ultrasonic
                }
            })
            contUltrasonic++//Agrega conteo para objeto
        }
        else{//No tiene boton/interruptor/sensor
            if(statusBuzzer){//Si tiene buzzer
                items.forEach(function(items2,indexs2){//Busca elementos de cada linea de energia
                    if(items2.split(" ")[1] === "buzzer"){//La linea si tiene buzzer
                        scene.children.forEach(function(itemes,indexes){//Busca en todo, el buzzer a activar
                            if(itemes.name === items2){//Encuantra el buzzer que se va a activar
                                onBuzzer(itemes,flowEnergy[indexs],statusResistance);//Acciones para prender el Buzzer
                            }
                        });
                    }
                })
            }
            if(statusLed){//Si tiene LED
                items.forEach(function(items2,indexs2){//Busca elementos de cada linea de energia
                    if(items2.split(" ")[1] === "led"){//La linea si tiene led
                        scene.children.forEach(function(itemes,indexes){//Busca en todo, el led a activar
                            if(itemes.name === items2){//Encuantra el led que se va a activar
                                onLed(itemes,flowEnergy[indexs],statusResistance);//Acciones para prender el LED
                            }
                        });
                    }
                })
            }
            if(statusRgb){//Si tiene RGB
                setRgbs();//Asigna los colores del rgb, de acuerdo a la conexion con negativo
                items.forEach(function(items2,indexs2){//Busca elementos de cada linea de energia
                    if(items2.split(" ")[1] === "rgb"){//La linea si tiene rgb
                        scene.children.forEach(function(itemes,indexes){//Busca en todo, el rgb a activar
                            if(itemes.name === items2){//Encuantra el rgb que se va a activar
                                onRgb(itemes,flowEnergy[indexs],[letterRgb,setRgb[pinRgb]],statusResistance);//Acciones para prender el RGB
                            }
                        });
                    }
                })
            }
            if(statusRgbc){//Si tiene RGBc
                items.forEach(function(items2,indexs2){//Busca elementos de cada linea de energia
                    if(items2.split(" ")[1] === "rgbc"){//La linea si tiene rgbc
                        scene.children.forEach(function(itemes,indexes){//Busca en todo, el led a activar
                            if(itemes.name === items2){//Encuantra el rgbc que se va a activar
                                onRgbc(itemes,flowEnergy[indexs],statusResistance);//Acciones para prender el RGBC
                            }
                        });
                    }
                })
            }
        }
    });
    
    console.log("FLOW ENERGY --------------------");
    console.log(flowEnergy);

    console.log("OBJETOS BUTTON, SWITCH, PRESET, LDR, ULTRASONIC");
    console.log(savedataButton);
    console.log(savedataSwitch);
    console.log(savedataPreset);
    console.log(savedataLdr);
    console.log(savedataUltrasonic);
    
    console.log("OBJETOS BUZZER");
    console.log(addBuzzer);

}
function valSteps(){
    /*
	* NOMBRE: valSteps.
	* UTILIDAD: Valida pasos instrucciones
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    if(stepslineStatus === 0){//Son pasos de instrucciones
        if(contActive === addentorno3dInstruccion.length){//Los pasos a validar ya estan completos
            hideWarning();//Oculta las advertencias sobre objetos

            $("#d_pxbviewentorno3dmessagegrl").fadeIn();//Muestra mensaje de pasos terminados
            var setTime = setTimeout(function(){
                $("#d_pxbviewentorno3dmessagegrl").fadeOut();//Oculta mensaje de pasos terminados

                stepslineStatus = 1;//Pasa a pasos de simulacion
                
                clickentorno3dPasos("simulacion");//Click en btn de pasos instrucciones y preguntas simulacion
                var timeSet = setTimeout(function(){
                    //$("#d_pxbentorno3dstepsbtns_1").trigger("pointerdown");//Inicia con el primer paso
                    $("#d_pxbentorno3dstepsbtns_1").addClass('d_pxbentorno3dstepsbtnsanima');//Agrega animacion de paso 1
                    clearTimeout(timeSet);//Limpia tiempo
                },2000);
                
                //reflectionQuestions();//Btn de pregunas de refelccion

                clearTimeout(setTime);//Limpia tiempo

            },5000);

        }else{
            showWarning("pasos",null);//Muestra las advertencias sobre objetos
        }
    }
}
function reflectionQuestions(){
    /*
	* NOMBRE: reflectionQuestions.
	* UTILIDAD: Btn de pregunas de reflexion
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    $(".d_pxbentorno3dreflexionicon").fadeIn();//Mustra icono de preguntas de reflexion
    $("#d_pxbentorno3dreflexionicon").off().on("pointerdown",function(){//Mouse down en icono de preguntas reflexion
        $("#d_pxbentorno3dreflexiontxt").empty();//Quita preguntas de reflexion
        $("#d_pxbentorno3dreflexiontxt").show();//Muestra div de preguntas
        for(var i=0; i<=addReflexion.length-1; i++){//Agrega dinamicamente preguntas reflexion
            $("#d_pxbentorno3dreflexiontxt").append('<p>'+addReflexion[i]+'</p>');//Agrega preguntas de reflexion
        }
    });
    $("#d_contegrlcanvas").off().on("pointerdown",function(){//Mouse down para cerra pregunta reflexion
        $("#d_pxbentorno3dreflexiontxt").empty();//Quita preguntas de reflexion
        $("#d_pxbentorno3dreflexiontxt").hide();//Oculta div preguntas reflexion
    });
}
function actionsOn(){
    //Acciones al validar los pasos
}
function actionsOff(){
    //Opciones al dejar de validar pasos
}
var manipulatedStatus = true;//Almacena si todos los objetos dentro del escenario han sido manipulados
function checkManipulated(){
    /*
	* NOMBRE: checkManipulated.
	* UTILIDAD: Revisa si hay objetos que se mueven que no han sido manipulados
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    manipulatedStatus = true;//Almacena si todos los objetos dentro del escenario han sido manipulados
    scene.children.forEach(function(item,index){//Busca todos los elementos hijos del objeto
        if(item.name.split(" ")[0] != "grl" && item.name.split(" ")[0] != "null"){//Objetos que se mueven
            if(item.name.split(" ")[0] != "jumperPow" && item.name.split(" ")[0] != "jumper"){//No considera cables
                if(item.name.split(" ")[1] != "pinPowerpos" && item.name.split(" ")[1] != "pinPowerneg"){//No considera cable energia
                    if(item.name.split(" ")[1] != "pinB"){//En cable, solo considera un pin, para borrarlo
                        if(item.newInfo.objManipulated === false){//El objeto no ha sido manipulado
                            showWarning("manipulacion",item.newInfo.name);//Muestra las advertencias sobre objetos de objetos no manipulados
                            objManipulated = false;//Hay objetos que no han sido manipulados
                            manipulatedStatus = false;//Algun objeto del escenario no ha sido manipulado
                        }
                    }
                }
            }
        }
    });
}
var savedataButton = [];
var savedataSwitch = [];
var savedataPreset = [];
var savedataLdr = [];
var savedataUltrasonic = [];

//var saveValled = [];//Almacena si la linea de energia tiene los leds en el orden correcto de + a -
//var saveValbuzzer = [];//Almacena si la linea de energia tiene los buzzer en el orden correcto de + a -
function objPress(){
    /*
	* NOMBRE: objPress.
	* UTILIDAD: Click en los btn de objetos de presionar que tienen algun movimiento
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    setPushbutton();//Acciones para pushbutton
    setSwitch();//Acciones para switch
    setPreset();//Acciones para preset
    setLdr();//Acciones para ldr
    
    var getElementclass;//Obtiene los elementos div para push button
    function setPushbutton(){
        /*
        * NOMBRE: setPushbutton.
        * UTILIDAD: Acciones para pushbutton
        * ENTRADAS: Ninguna.
        * SALIDAS: Ninguna.
        */
        var getobjBtn;//Obtiene el obj de btn del objeto seleccionado
        var getobjBtngroup = [];//Almacena los obj de btn del objeto seleccionado
        //var setIntensitylightaction;
        var keyPressed = false;//No hay tecla presionada para accion de pushbutton
        getElementclass = document.getElementsByClassName('d_activatepushbutton');//Obtiene los elementos div para push button
        for (var i = 0; i < getElementclass.length; i++) {//Recorre los elementos
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){//Es dispositivo
                getElementclass[i].addEventListener('touchstart', onactionPointerdown, false);//Inicia listener
                getElementclass[i].addEventListener('touchend', onactionPointerup, false);//Inicia listener
            }else{//Es PC
                getElementclass[i].addEventListener('pointerdown', onactionPointerdown, false );//Inicia listener
                getElementclass[i].addEventListener('pointerup', onactionPointerup, false);//Inicia listener
                
                console.log("contPushbutton++++++++++++++++");
                console.log(activatePushbutton);
                
                var saveKeysadded = [["1",49,97],["2",50,98],["3",51,99],["4",52,100],["5",53,101],["6",54,102],["7",55,103],["8",56,104],["9",57]];//Almacena las teclas, a las que se asignan un click en los botones
                if(activatePushbutton){
                    document.addEventListener('keydown', keyEventdown, false );//Evento de teclado para atras y adelante
                    document.addEventListener('keyup', keyEventup, false );//Evento de teclado para atras y adelante
                    $(".d_emergentectrlpushbutton").remove();//Quita leyenda de teclas a presionar en botones
                    var saveKeysval = [];//Almacena los numeros de las teclas a mostrar en el mensaje emergente
                    for(var k=0; k<=savedataButton.length-1; k++){
                        console.log(saveKeysadded[k][0]);
                        saveKeysval.push(saveKeysadded[k][0]);//Almacena los numeros de las teclas a mostrar en el mensaje emergente
                    }
                    var keysJoin = saveKeysval.join(', ');//Une el array de los numeros de las teclas a mostrar en el mensaje emergente
                    if(savedataButton.length === 1){
                        $("#d_pxbentorno3d").append('<div class="d_emergentectrlpushbutton"><div class="d_emergentectrlpushbuttonin">Para activar el botón, presiona la tecla '+keysJoin+'</div></div>');//Agrega leyenda de teclas a presionar en botones
                    }else{
                        $("#d_pxbentorno3d").append('<div class="d_emergentectrlpushbutton"><div class="d_emergentectrlpushbuttonin">Para activar los botones, presiona las teclas '+keysJoin+', según corresponda</div></div>');//Agrega leyenda de teclas a presionar en botones
                    }
                    $(".d_emergentectrlpushbutton").on("pointerdown touchstart", function(){
                        $(".d_emergentectrlpushbutton").remove();//Quita leyenda de teclas a presionar en botones
                    });
                }
            }
        }
        function keyEventdown(event) {
            /*
            * NOMBRE: keyEventdown.
            * UTILIDAD: Evento de tecla para presionar dos pushbutton a la vez
            * ENTRADAS: Ninguna.
            * SALIDAS: Ninguna.
            */
            var codeKey = event.which || event.keyCode;//Obtiene tecla presionada
            console.log(codeKey);
            for(var i = 0; i<=savedataButton.length-1; i++){
                if(codeKey === saveKeysadded[i][1] || codeKey === saveKeysadded[i][2]){//Tecla del array a presionar
                    onactionPointerdown(getElementclass[i]);//Inicia la funcion de boton en curso
                    keyPressed = true;//Si hay tecla presionada para accion de pushbutton
                }
            }
        }
        function keyEventup(event) {
            /*
            * NOMBRE: keyEventup.
            * UTILIDAD: Evento de tecla para presionar dos pushbutton a la vez
            * ENTRADAS: Ninguna.
            * SALIDAS: Ninguna.
            */
            keyPressed = false;//No hay tecla presionada para accion de pushbutton
            for (var i = 0; i < getElementclass.length; i++) {//Recorre los elementos
                onactionPointerup(getElementclass[i],true);//Ejecuta la funcion con el elemento en curso
            }
        }
        function onactionPointerdown(value){
            /*
            * NOMBRE: onactionPointerdown.
            * UTILIDAD: Pointerdown touchstart en btn div del objeto
            * ENTRADAS: Ninguna.
            * SALIDAS: Ninguna.
            */
            console.log("PRESSED");
            var getnameAttr;///Obtiene el nombre del attr, que es igual al nombre del objeto
            if(keyPressed){
                getnameAttr = $(value).attr('name');//Obtiene el nombre del attr, que es igual al nombre del objeto (viene de la tecla)
            }else{
                getnameAttr = $(this).attr('name');//Obtiene el nombre del attr, que es igual al nombre del objeto (viene del pointerdown)
            }
            scene.children.forEach(function(item,index){//Busca todos los elementos hijos del objeto
                if(item.name === getnameAttr){//Objetos con btn en el escenario
                    item.children[0].position.y = -0.15;//Baja el btn del obj
                    getobjBtn = item;//almacena el btn obj para despues subirlo en el Pointerup
                    getobjBtngroup.push(item);//Almacena los obj de btn del objeto seleccionado
                }
            });
            savedataButton.forEach(function(item2,index2){//Puede haber varios botones
                if(getnameAttr === savedataButton[index2][0].replace(/['"]+/g, '')){//Busca objeto por nombre
                    
                    savedataButton[index2][1].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "led"){
                            scene.children.forEach(function(item,index){
                                if(items[0] === item.name){
                                    onLed(item,items[1],items[2]);//Acciones para prender el LED
                                }
                            });
                        }
                    });

                    savedataButton[index2][2].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "buzzer"){
                            scene.children.forEach(function(item,index){
                                if(items[0] === item.name){
                                    onBuzzer(item,items[1],items[2]);//Acciones para prender el BUZZER
                                }
                            });
                        }
                    });

                    savedataButton[index2][3].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "rgb"){
                            scene.children.forEach(function(item,index){
                                if(items[0] === item.name){
                                    onRgb(item,items[1],items[2],items[3]);//Acciones para prender el RGB
                                }
                            });
                         }
                    });

                    savedataButton[index2][4].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "rgbc"){
                            scene.children.forEach(function(item,index){
                                if(items[0] === item.name){
                                    onRgbc(item,items[1],items[2]);//Acciones para prender el RGBc
                                }
                            });
                        }
                    });
                    
                }
            });
            
            
            for (var i = 0; i < getElementclass.length; i++) {//Recorre los elementos
                getElementclass[i].addEventListener('mouseleave', onactionPointerup, false);//Inicia listener
            }

        }
        function onactionPointerup(value,status){
            /*
            * NOMBRE: onactionPointerup.
            * UTILIDAD: Pointerup touchend en btn div del objeto
            * ENTRADAS: value > elemento div en curso, status > si proviene de haber presionado la tecla para varios puchbutton.
            * SALIDAS: Ninguna.
            */
            
            if(keyPressed === false){//Si no hay tecla presionada
                
                if(status){//Se ocupo la tecla para seleccionar varios pushbutton
                    var getnameAttr = $(value).attr('name');//Obtiene el nombre del attr, que es igual al nombre del objeto
                    getobjBtngroup.forEach(function(item){//Recorre todos los obj
                        item.children[0].position.y = 0;//Sube el btn del obj
                    });
                }else{//Pushbutton sin tecla
                    var getnameAttr = $(this).attr('name');//Obtiene el nombre del attr, que es igual al nombre del objeto
                    getobjBtn.children[0].position.y = 0;//Sube el btn del obj
                }

                savedataButton.forEach(function(item2,index2){//Puede haber varios botones
                    if(getnameAttr === savedataButton[index2][0].replace(/['"]+/g, '')){//Busca objeto por nombre

                        savedataButton[index2][1].forEach(function(items,indexs){
                            if(items[0].split(" ")[1] === "led"){
                                scene.children.forEach(function(item,index){
                                    if(items[0] === item.name){
                                        offLed(item.name);//Acciones para prender el LED
                                    }
                                });

                            }
                        });

                        savedataButton[index2][2].forEach(function(items,indexs){
                            if(items[0].split(" ")[1] === "buzzer"){
                                scene.children.forEach(function(item,index){
                                    if(items[0] === item.name){
                                        offBuzzer(item.name);//Acciones para prender el BUZZER
                                    }
                                });
                            }
                        });

                        savedataButton[index2][3].forEach(function(items,indexs){
                            if(items[0].split(" ")[1] === "rgb"){
                                scene.children.forEach(function(item,index){
                                    if(items[0] === item.name){
                                        offRgb(item.name,items[2]);//Acciones para prender el RGB
                                    }
                                });
                             }
                        });

                        savedataButton[index2][4].forEach(function(items,indexs){
                            if(items[0].split(" ")[1] === "rgbc"){
                                scene.children.forEach(function(item,index){
                                    if(items[0] === item.name){
                                        offRgbc(item.name);//Acciones para prender el RGBc
                                    }
                                });

                            }
                        });
                    }
                });
                for (var i = 0; i < getElementclass.length; i++) {//Recorre los elementos
                    getElementclass[i].removeEventListener('mouseleave', onactionPointerup, false);//Inicia listener
                }
            }
        }   
    }
    function setSwitch(){
        /*
        * NOMBRE: setSwitch.
        * UTILIDAD: Acciones para switch
        * ENTRADAS: Ninguna.
        * SALIDAS: Ninguna.
        */

        var saveChecked = [];//Almacena btn activados
        
        $(".d_activeswitchcheckbos").off().change( function(){//Cambio en el checkbox
            var getIdcheckbox = $(this).attr('id');//Obtiene el id del checkbox
            if($("#"+getIdcheckbox).is(':checked')){//Es checked
                var getnameAttr = $(this).parent().parent().parent().attr('name');//Obtiene el nombre del attr, que es igual al nombre del objeto
                var getNumbtn = $(this).attr('id').split("_")[4];//Obtiene el numero de btn del switch

                scene.children.forEach(function(item,index){//Busca todos los elementos hijos del objeto
                    if(item.name === getnameAttr){//Objetos con btn en el escenario
                        item.children.forEach(function(item2,index2){//Busca los btn del obj
                            if(Number(item2.name.split("_")[1]) === Number(getNumbtn)+4){//Busca el btn seleccionado en el div
                                console.log(item2.name);
                                item2.position.z = -0.22;//Nueva posicion
                            }
                        });
                    }
                });

                saveChecked.push(Number(getNumbtn));//Almacena btn activados

                savedataSwitch.forEach(function(item2,index2){//Busca info almacenada de pinSwitch

                    if(savedataSwitch[index2][0][1].includes(Number(getNumbtn)) === true){//Si la info de pinSwitch coincide con el btn activado

                        if(getnameAttr === savedataSwitch[index2][0][0].replace(/['"]+/g, '')){//Busca objeto por nombre

                            console.log("*************************************************IN");
                            console.log("SWITCH PIN IN = "+getNumbtn);
                            console.log("SWITCH PIN OUT = ");
                            console.log(savedataSwitch[index2][0][1]);
                            console.log(getnameAttr);

                            console.log("saveChecked------------IN");
                            console.log(saveChecked);
                            console.log("ALMACENADO "+savedataSwitch[index2][0][1].length);
                            
                            var contChecked = 0;//Conteo de btn, de acuerdo ala linea de energia
                            savedataSwitch[index2][0][1].forEach(function(item,index){//Busca btn de acuerdo a la linea de energia
                                if(saveChecked.includes(item) === true){//Comparacion de btns activados, con los btn almacenados de la linea de energia
                                    contChecked++;//Aumenta el conteo de coincidencias
                                }
                            });
                            
                            console.log("CONTEO "+contChecked);


                            if(contChecked === savedataSwitch[index2][0][1].length){//La cuenta de btn activados, coincide con la info de pinSwitch

                                savedataSwitch[index2][1].forEach(function(items,indexs){
                                    if(items[0].split(" ")[1] === "led"){
                                        scene.children.forEach(function(item,index){
                                            if(items[0] === item.name){
                                                onLed(item,items[1],items[2]);//Acciones para prender el LED
                                            }
                                        });
                                    }
                                });

                                savedataSwitch[index2][2].forEach(function(items,indexs){
                                    if(items[0].split(" ")[1] === "buzzer"){
                                        scene.children.forEach(function(item,index){
                                            if(items[0] === item.name){
                                                onBuzzer(item,items[1],items[2]);//Acciones para prender el BUZZER
                                            }
                                        });
                                    }
                                });

                                savedataSwitch[index2][3].forEach(function(items,indexs){
                                    if(items[0].split(" ")[1] === "rgb"){
                                        scene.children.forEach(function(item,index){
                                            if(items[0] === item.name){
                                                onRgb(item,items[1],items[2],items[3]);//Acciones para prender el RGB
                                            }
                                        });
                                    }
                                });

                                savedataSwitch[index2][4].forEach(function(items,indexs){
                                    if(items[0].split(" ")[1] === "rgbc"){
                                        scene.children.forEach(function(item,index){
                                            if(items[0] === item.name){
                                                onRgbc(item,items[1],items[2]);//Acciones para prender el RGBc
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    }
                });
            }else{//Es unchecked
                var getnameAttr = $(this).parent().parent().parent().attr('name');//Obtiene el nombre del attr, que es igual al nombre del objeto
                var getNumbtn = $(this).attr('id').split("_")[4];//Obtiene el numero de btn del switch
                //console.log(getnameAttr+" Inactive btn "+getNumbtn);
                scene.children.forEach(function(item,index){//Busca todos los elementos hijos del objeto
                    if(item.name === getnameAttr){//Objetos con btn en el escenario
                        item.children.forEach(function(item2,index2){//Busca los btn del obj
                            if(Number(item2.name.split("_")[1]) === Number(getNumbtn)+4){//Busca el btn seleccionado en el div
                                item2.position.z = 0;//Posicion original
                            }
                        });
                    }
                });
                
                saveChecked.forEach(function(item,index){//Busca btn activados
                    if(Number(getNumbtn) === item){//Se esta desactivando un btn
                        saveChecked.splice(index,1);//Quita btn desactivado
                    }
                });
                
                savedataSwitch.forEach(function(item2,index2){//Busca info almacenada de pinSwitch
                    
                    if(savedataSwitch[index2][0][1].includes(Number(getNumbtn)) === true){//Si la info de pinSwitch coincide con el btn activado
                    
                        if(getnameAttr === savedataSwitch[index2][0][0].replace(/['"]+/g, '')){//Busca objeto por nombre


                            console.log("*************************************************OUT");

                            console.log("saveChecked------------OUT");
                            console.log(saveChecked);

                            console.log("ALMACENADO "+savedataSwitch[index2][0][1].length);


                            var contChecked = 0;//Conteo de btn, de acuerdo ala linea de energia
                            savedataSwitch[index2][0][1].forEach(function(item,index){//Busca btn de acuerdo a la linea de energia
                                if(saveChecked.includes(item) === true){//Comparacion de btns activados, con los btn almacenados de la linea de energia
                                    contChecked++;//Aumenta el conteo de coincidencias
                                }
                            });

                            console.log("CONTEO "+contChecked);


                            if(contChecked != savedataSwitch[index2][0][1].length){//La cuenta de btn activados, coincide con la info de pinSwitch

                                savedataSwitch[index2][1].forEach(function(items,indexs){
                                    if(items[0].split(" ")[1] === "led"){
                                        scene.children.forEach(function(item,index){
                                            if(items[0] === item.name){
                                                offLed([item.name]);//Acciones para prender el LED
                                            }
                                        });
                                    }
                                });

                                savedataSwitch[index2][2].forEach(function(items,indexs){
                                    if(items[0].split(" ")[1] === "buzzer"){
                                        scene.children.forEach(function(item,index){
                                            if(items[0] === item.name){
                                                offBuzzer([item.name]);//Acciones para prender el BUZZER
                                            }
                                        });
                                    }
                                });

                                savedataSwitch[index2][3].forEach(function(items,indexs){
                                    if(items[0].split(" ")[1] === "rgb"){
                                        scene.children.forEach(function(item,index){
                                            if(items[0] === item.name){
                                                offRgb([item.name],items[2]);//Acciones para prender el RGB
                                            }
                                        });
                                    }
                                });

                                savedataSwitch[index2][4].forEach(function(items,indexs){
                                    if(items[0].split(" ")[1] === "rgbc"){
                                        scene.children.forEach(function(item,index){
                                            if(items[0] === item.name){
                                                offRgbc([item.name]);//Acciones para prender el RGBc
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    }
                });
            }
        });
    }
    function setPreset(){
        /*
        * NOMBRE: setPreset.
        * UTILIDAD: Acciones para preset
        * ENTRADAS: Ninguna.
        * SALIDAS: Ninguna.
        */
        
        var setRgbintensitylight = [];
        var getnameAttr;//Nombre del objeto en funcion
        var getidAttr;//Id del objeto en funcion
        var contGir;//Contador de giros de la perilla
        var contData;//Almacena temporalmente el nuevo tamaño de size light y opacidad light
        var rgbValue;
        var volumeSet;
        
        var girPerilla;
        
        var setIntensitylightaction;
        var getnumPerilla;

        var saveNamepreset = [];
        
        
        var valMin = 0.4;//Valor total que es entre 0.4 minimo a 1 maximo
        var valMax = 1;//Valor a restar como maximo en la linea de energia "flowEnergy". Varia si hay mas led, resistencia, rgb, buzzer, rgbc
        var jumpVal;//Cantidad de energia total de la linea, entre los pasos del ldr (27)
        
        
        $(".d_activatepresetbtnleft").off().on("pointerdown touchstart", function(){//Boton de giro a la izquierda de la perilla
            getValenergy(this);//Obtiene maximo de energia almacenado por la cantidad de resistencias, led, rgb, buzzer y rgbc
            getdirectionPreset();//Obtiene la direccion del preset
            getinfoPreset(this);//Obtiene la info attr del div label en curso
            console.log("PERILLA "+getnumPerilla);
            newValpreset("left");
        });
        $(".d_activatepresetbtnright").off().on("pointerdown touchstart", function(){//Boton de giro a la derecha de la perilla
            getValenergy(this);//Obtiene maximo de energia almacenado por la cantidad de resistencias, led, rgb, buzzer y rgbc
            getdirectionPreset();//Obtiene la direccion del preset
            getinfoPreset(this);//Obtiene la info attr del div label en curso
            console.log("PERILLA "+getnumPerilla);
            newValpreset("right");
        });
        var setTime = setTimeout(function(){//Tiempo para el click
            $(".d_activatepresetbtnright").trigger("pointerdown");//Trigger para el click de btn right
            clearTimeout(setTime);//Limpia el tiempo
        },100);
        
        //$(".d_activatepresetbtnleft").trigger("pointerdown");//Empieza con el primer click, para que inicie prendido

        function newValpreset(data){
            if(getnumPerilla === 1){
                console.log("ENTRA****** "+getnumPerilla);
                if(data === "left"){
                    if(contGir > 170 && contGir <= 270){
                       volumeSet = volumeSet-0.1;
                    }
                    if(contGir > 0 && contGir <= 270){//Dentro del rango de giro de la perilla
                        contGir = contGir-10;//Disminuye rados de giro de la perilla
                        girPerilla = girPerilla-10;
                        contData = contData-jumpVal;//Disminuye opacity light (temporalmente)
                        rgbValue = rgbValue-0.035;
                        //console.log(contGir);
                        setinfoPreset();//Establece acciones e info al giro del preset
                    }
                    console.log("VOLUMEN "+volumeSet);
                }
                if(data === "right"){
                    if(contGir >= 170 && contGir < 270){
                       volumeSet = volumeSet+0.1;
                    }
                    if(contGir >= 0 && contGir < 270){//Dentro del rango de giro de la perilla
                        contGir = contGir+10;//Aumenta rados de giro de la perilla
                        girPerilla = girPerilla+10;
                        contData = contData+jumpVal;//Disminuye opacity light (temporalmente)
                        rgbValue = rgbValue+0.035;
                        //console.log(contGir);
                        setinfoPreset();//Establece acciones e info al giro del preset
                    }
                    console.log("VOLUMEN "+volumeSet);
                }
            }
            if(getnumPerilla === 3){
                console.log("ENTRA****** "+getnumPerilla);
                if(data === "left"){
                    if(contGir < 270 && contGir >= 170){
                       volumeSet = volumeSet+0.1;
                    }
                    if(contGir < 270 && contGir >= 0){//Dentro del rango de giro de la perilla
                        contGir = contGir+10;//Aumenta rados de giro de la perilla
                        girPerilla = girPerilla-10;
                        contData = contData+jumpVal;//Disminuye opacity light (temporalmente)
                        rgbValue = rgbValue+0.035;
                        //console.log(contGir);
                        setinfoPreset();//Establece acciones e info al giro del preset
                    }
                    console.log("VOLUMEN "+volumeSet);
                }
                if(data === "right"){
                    if(contGir <= 270 && contGir > 170){
                       volumeSet = volumeSet-0.1;
                    }
                    if(contGir <= 270 && contGir > 0){//Dentro del rango de giro de la perilla
                        contGir = contGir-10;//Disminuye rados de giro de la perilla
                        girPerilla = girPerilla+10;
                        contData = contData-jumpVal;//Disminuye opacity light (temporalmente)
                        rgbValue = rgbValue-0.035;
                        //console.log(contGir);
                        setinfoPreset();//Establece acciones e info al giro del preset
                    }
                    console.log("VOLUMEN "+volumeSet);
                }
            }
        }
        
        function getValenergy(objAct){
            /*
            * NOMBRE: getValenergy.
            * UTILIDAD: Obtiene maximo de energia almacenado por la cantidad de resistencias, led, rgb, buzzer y rgbc
            * ENTRADAS: Ninguna.
            * SALIDAS: Ninguna.
            */
            getnameAttr = $(objAct).parent().parent().attr('name');//Obtiene el nombre del attr, que es igual al nombre del objeto en funcion
            savedataPreset.forEach(function(item2,index2){
                if(getnameAttr === savedataPreset[index2][0].replace(/['"]+/g, '')){//Busca objeto por nombre
                    savedataPreset[index2][1].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "led"){   
                            valMax = items[1];//Almacena maximo de energia de la linea
                        }
                    });
                    savedataPreset[index2][2].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "buzzer"){
                            valMax = items[1];//Almacena maximo de energia de la linea
                        }
                    });
                    savedataPreset[index2][3].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "rgb"){
                            valMax = items[1];//Almacena maximo de energia de la linea
                        }
                    });
                    savedataPreset[index2][4].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "rgbc"){
                            valMax = items[1];//Almacena maximo de energia de la linea
                        }
                    });
                }
                console.log("Energia total a dividir "+valMax+" - "+valMin+" = "+(valMax-valMin).toFixed(3));
            });
            jumpVal = (valMax-valMin)/27;//Cantidad de energia total de la linea, entre los pasos del ldr (27)
            console.log("Cantidad a restar o sumar: "+jumpVal.toFixed(3));
        }

        function getdirectionPreset(objAct){
            /*
            * NOMBRE: getdirectionPreset.
            * UTILIDAD: Obtiene la direccion del preset
            * ENTRADAS: objAct > btn que se presiona.
            * SALIDAS: Ninguna.
            */
            
            
            console.log(getnameAttr);
            console.log(saveNamepreset);
            
            if(saveNamepreset.includes(getnameAttr) === false){
                
                saveNamepreset.push(getnameAttr);
                    
                scene.children.forEach(function(item,index){//Busca todos los elementos hijos del objeto
                    if(item.name === getnameAttr){//Objetos con perilla en el escenario
                        item.newInfo.onpresetData.forEach(function(item3,index3){
                            if(item3 === 1){
                                $(".d_pxbviewcanvas").find("#"+item.name.replace(/ /g,'')).attr('contGir','0');
                                $(".d_pxbviewcanvas").find("#"+item.name.replace(/ /g,'')).attr('contData',valMin);
                                $(".d_pxbviewcanvas").find("#"+item.name.replace(/ /g,'')).attr('rgbValue','0');
                                $(".d_pxbviewcanvas").find("#"+item.name.replace(/ /g,'')).attr('getnumPerilla','1');
                                $(".d_pxbviewcanvas").find("#"+item.name.replace(/ /g,'')).attr('girPerilla','0');
                                $(".d_pxbviewcanvas").find("#"+item.name.replace(/ /g,'')).attr('volumeSet','0');
                            }
                            if(item3 === 0){
                                $(".d_pxbviewcanvas").find("#"+item.name.replace(/ /g,'')).attr('contGir','270');
                                $(".d_pxbviewcanvas").find("#"+item.name.replace(/ /g,'')).attr('contData',valMax);
                                $(".d_pxbviewcanvas").find("#"+item.name.replace(/ /g,'')).attr('rgbValue','1');
                                $(".d_pxbviewcanvas").find("#"+item.name.replace(/ /g,'')).attr('getnumPerilla','3');
                                $(".d_pxbviewcanvas").find("#"+item.name.replace(/ /g,'')).attr('girPerilla','0');
                                $(".d_pxbviewcanvas").find("#"+item.name.replace(/ /g,'')).attr('volumeSet','1');
                            }
                        });
                    }
                });
            }
        }
        function getinfoPreset(objAct){
            /*
            * NOMBRE: getinfoPreset.
            * UTILIDAD: Obtiene la info attr del div label en curso
            * ENTRADAS: objAct > btn que se presiona.
            * SALIDAS: Ninguna.
            */
            getnameAttr = $(objAct).parent().parent().attr('name');//Obtiene el nombre del attr, que es igual al nombre del objeto en funcion
            getidAttr = $(objAct).parent().parent().attr('id');//Obtiene el id del attr, que es igual al nombre del objeto en funcion
            contGir = Number($("#"+getidAttr).attr('contGir'));//Obtiene contador de giros de la perilla almacenado el el objeto en curso
            girPerilla = Number($("#"+getidAttr).attr('girPerilla'));
            contData = Number($("#"+getidAttr).attr('contData'));//Obtiene contador de opacity light (temporalmente) de la perilla almacenado el el objeto en curso
            rgbValue = Number($("#"+getidAttr).attr('rgbValue'));//Obtiene contador de opacity light (temporalmente) de la perilla almacenado el el objeto en curso
            getnumPerilla = Number($("#"+getidAttr).attr('getnumPerilla'));//Obtiene la coneccion del pin
            volumeSet = Number($("#"+getidAttr).attr('volumeSet'));//Obtiene volumen de buzzer
        }
        function setinfoPreset(){
            /*
            * NOMBRE: setinfoPreset.
            * UTILIDAD: Establece acciones e info al giro del preset
            * ENTRADAS: Ninguna.
            * SALIDAS: Ninguna.
            */
            
            console.log("#######");
            console.log(contData.toFixed(3));
            
            
            $("#"+getidAttr).attr('contGir',contGir);//Almacena en el div label la info de perilla giros
            $("#"+getidAttr).attr('contData',contData.toFixed(3));//Almacena en el div label la info de perilla opacity light
            $("#"+getidAttr).attr('rgbValue',rgbValue.toFixed(2));//Almacena en el div label la info de RGB
            $("#"+getidAttr).attr('girPerilla',girPerilla);
            $("#"+getidAttr).attr('volumeSet',volumeSet.toFixed(2));//Almacena en el div label el volumen
            $("#"+getidAttr).find('.d_activatepresetcircle').css({"transform":"rotate("+girPerilla+"deg)"});//Rotacion de imagen de la perilla
            setIntensitylightaction = 0.4;//Resetea la intensidad de los led o rgb
            setIntensitylightaction = contData.toFixed(2);//Opacity light
            
            console.log("ENERGIA BASE "+valMin+" ENERGIA TOPE "+valMax);
            console.log("ENERGIA ACTUAL "+setIntensitylightaction);
            
            
            setRgbintensitylight[1] = rgbValue.toFixed(2);

            scene.children.forEach(function(item,index){//Busca todos los elementos hijos del objeto
                if(item.name === getnameAttr){//Objetos con perilla en el escenario
                    item.children[3].rotation.z = -(girRad*girPerilla);//Rotacion de la perilla objeto
                    item.children[4].rotation.z = -(girRad*girPerilla);//Rotacion de la perilla objeto
                    //item.children[4].rotation.y = -(girRad*girPerilla);//Rotacion de la perilla objeto
                }
            });

            savedataPreset.forEach(function(item2,index2){
                if(getnameAttr === savedataPreset[index2][0].replace(/['"]+/g, '')){//Busca objeto por nombre
                    savedataPreset[index2][1].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "led"){    
                            scene.children.forEach(function(item,index){
                                if(items[0] === item.name){
                                    onLed(item,setIntensitylightaction,items[2]);//Acciones para prender el LED
                                }
                            });
                        }
                    });

                    savedataPreset[index2][2].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "buzzer"){
                            scene.children.forEach(function(item,index){
                                if(items[0] === item.name){
                                    onBuzzer(item,setIntensitylightaction,items[2]);//Acciones para prender el BUZZER
                                }
                            });
                        }
                    });

                    savedataPreset[index2][3].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "rgb"){
                            scene.children.forEach(function(item,index){
                                if(items[0] === item.name){
                                    setRgbintensitylight[0] = items[2][0];
                                    onRgb(item,setIntensitylightaction,setRgbintensitylight,items[3]);//Acciones para prender el RGB
                                }
                            });
                        }
                    });

                    savedataPreset[index2][4].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "rgbc"){    
                            scene.children.forEach(function(item,index){
                                if(items[0] === item.name){
                                    onRgbc(item,setIntensitylightaction,items[2]);//Acciones para prender el RGBc
                                }
                            });
                        }
                    });
                }
            });
            
            
            
            $("#"+getidAttr).find(".d_activatepresetbtnleft").removeClass('d_disablebtn');//Quita clase de inactivo
            $("#"+getidAttr).find(".d_activatepresetbtnright").removeClass('d_disablebtn');//Quita clase de inactivo
            if(contGir === 0){
                if(getnumPerilla === 1){
                    $("#"+getidAttr).find(".d_activatepresetbtnleft").addClass('d_disablebtn');//Agrega clase de inactivo a btn left
                }
                if(getnumPerilla === 3){
                    $("#"+getidAttr).find(".d_activatepresetbtnright").addClass('d_disablebtn');//Agrega clase de inactivo a btn right
                }
                
            }
            if(contGir === 270){
                if(getnumPerilla === 1){
                    $("#"+getidAttr).find(".d_activatepresetbtnright").addClass('d_disablebtn');//Agrega clase de inactivo a btn right
                }
                if(getnumPerilla === 3){
                    $("#"+getidAttr).find(".d_activatepresetbtnleft").addClass('d_disablebtn');//Agrega clase de inactivo a btn left
                }
            }
        }
        
        
    }
          
    function setLdr(){
        /*
        * NOMBRE: setLdr.
        * UTILIDAD: Acciones para ldr
        * ENTRADAS: Ninguna.
        * SALIDAS: Ninguna.
        */
        var setIntensitylightaction;
        var setRgbintensitylight = [];
        var contLight = 0;//Contador de giros de la perilla
        var volumeSet;
        var contLightcolor = 0;
        var contData;//Almacena temporalmente el nuevo tamaño de size light y opacidad light
        var getnameAttr;//Nombre del objeto en funcion
        var getidAttr;//Id del objeto en funcion
        var colorsLight = ["#977126","#9c7425","#a17725","#a67a24","#ab7d23","#b08022","#b58322","#ba8621","#bf8920","c48c1f","#ce931e","#d3961d","#d8991c","#dd9c1c","#e29f1b","#e7a21a","#eca519","#f1a819","#f6ab18","#fbae17"];
        var rgbValue = 0;
        //var saveObjinfo = [["none",[]]];
        var saveObjinfo = [];
        var valMin = 0.4;//Valor total que es entre 0.4 minimo a 1 maximo
        var valMax = 1;//Valor a restar como maximo en la linea de energia "flowEnergy". Varia si hay mas led, resistencia, rgb, buzzer, rgbc
        var jumpVal;//Cantidad de energia total de la linea, entre los pasos del ldr (20)
        
        
        $(".d_activateldr").find('input').click(function(event){
            event.preventDefault();
        });
        
        
        $(".d_activateldrleft").off().on("pointerdown touchstart", function(){//Boton de decremento de liminusidad
            console.log("LEFT");
            console.log(contLight);
            getinfoLdr(this);//Obtiene la info attr del div label en curso
            if(contLight > 100 && contLight <= 200){
                volumeSet = volumeSet-0.1;
            }
            console.log(volumeSet);
            if(contLight > 0 && contLight <= 200){//Dentro del rango de giro de la perilla
                contLight = contLight-10;//Disminuye rados de giro de la perilla
                contLightcolor = (contLight/10)-1;
                //if(contData[1] > 0.25){
                    getValenergy();//Obtiene maximo de energia almacenado por la cantidad de resistencias, led, rgb, buzzer y rgbc
                    
                    contData = contData-jumpVal;//Disminuye opacity light (temporalmente)
                //}
                rgbValue = rgbValue-0.05;
                //console.log(getidAttr);
                setinfoLdr();//Establece acciones e info al giro del preset
                $("#"+getidAttr).find(".d_activateldrlight").find("svg").find("path").css({"opacity":(contLight/2)/100});
                $("#"+getidAttr).find(".d_activateldrlight").find("svg").find("path").css({"fill":colorsLight[contLightcolor]});
                $("#"+getidAttr).find(".d_activateldrlight").find("svg").find("circle").css({"opacity":((contLight/4)/100)+0.5});
                $("#"+getidAttr).find(".d_activateldrlight").find("svg").find("circle").css({"fill":colorsLight[contLightcolor]});
            }
        });
        $(".d_activateldrright").off().on("pointerdown touchstart", function(){//Boton de incremento de liminusidad
            console.log("RIGHT");
            console.log(contLight);
            getinfoLdr(this);//Obtiene la info attr del div label en curso
            if(contLight >= 100 && contLight < 200){
                volumeSet = volumeSet+0.1;
            }
            console.log(volumeSet);
            if(contLight >= 0 && contLight < 200){//Dentro del rango de giro de la perilla
                contLight = contLight+10;//Aumenta rados de giro de la perilla
                contLightcolor = (contLight/10)+1;
                //if(contData[1] < 1){
                    getValenergy();//Obtiene maximo de energia almacenado por la cantidad de resistencias, led, rgb, buzzer y rgbc
                    
                    contData = contData+jumpVal;//Aumenta opacity light (temporalmente)
                //}
                rgbValue = rgbValue+0.05;
                //console.log(getidAttr);
                setinfoLdr();//Establece acciones e info al giro del preset
                $("#"+getidAttr).find(".d_activateldrlight").find("svg").find("path").css({"opacity":(contLight/2)/100});
                $("#"+getidAttr).find(".d_activateldrlight").find("svg").find("path").css({"fill":colorsLight[contLightcolor]});
                $("#"+getidAttr).find(".d_activateldrlight").find("svg").find("circle").css({"opacity":((contLight/4)/100)+0.5});
                $("#"+getidAttr).find(".d_activateldrlight").find("svg").find("circle").css({"fill":colorsLight[contLightcolor]});
            }
        });
        
        
        function getValenergy(){
            /*
            * NOMBRE: getValenergy.
            * UTILIDAD: Obtiene maximo de energia almacenado por la cantidad de resistencias, led, rgb, buzzer y rgbc
            * ENTRADAS: Ninguna.
            * SALIDAS: Ninguna.
            */
            savedataLdr.forEach(function(item2,index2){
                if(getnameAttr === savedataLdr[index2][0].replace(/['"]+/g, '')){//Busca objeto por nombre
                    savedataLdr[index2][1].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "led"){   
                            valMax = items[1];//Almacena maximo de energia de la linea
                        }
                    });
                    savedataLdr[index2][2].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "buzzer"){
                            valMax = items[1];//Almacena maximo de energia de la linea
                        }
                    });
                    savedataLdr[index2][3].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "rgb"){
                            valMax = items[1];//Almacena maximo de energia de la linea
                        }
                    });
                    savedataLdr[index2][4].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "rgbc"){
                            valMax = items[1];//Almacena maximo de energia de la linea
                        }
                    });
                }
                console.log("Energia total a dividir "+(valMax-valMin).toFixed(3));
            });
            jumpVal = (valMax-valMin)/20;//Cantidad de energia total de la linea, entre los pasos del ldr (20)
            console.log("Cantidad a restar o sumar: "+jumpVal.toFixed(3));
        }
        
        
        var setTime = setTimeout(function(){//Tiempo para el click
            $(".d_activateldrright").trigger("pointerdown");//Trigger para el click de btn right
            clearTimeout(setTime);//Limpia el tiempo
        },100);
        
        
        
        function getinfoLdr(objAct){
            /*
            * NOMBRE: getinfoLdr.
            * UTILIDAD: Obtiene la info attr del div label en curso
            * ENTRADAS: objAct > btn que se presiona.
            * SALIDAS: Ninguna.
            */
            getnameAttr = $(objAct).parent().attr('name');//Obtiene el nombre del attr, que es igual al nombre del objeto en funcion
            getidAttr = $(objAct).parent().attr('id');//Obtiene el id del attr, que es igual al nombre del objeto en funcion
            contLight = Number($("#"+getidAttr).attr('contLight'));//Obtiene contador datos sobre icono de light
            contData = Number($("#"+getidAttr).attr('contData'));//Obtiene contador de opacity light (temporalmente) de la perilla almacenado el el objeto en curso
            rgbValue = Number($("#"+getidAttr).attr('rgbValue'));//Obtiene contador de opacity light (temporalmente) de la perilla almacenado el el objeto en curso
            volumeSet = Number($("#"+getidAttr).attr('volumeSet'));//Obtiene volumen de buzzer de la perilla almacenado el el objeto en curso

        }
        function setinfoLdr(){
            /*
            * NOMBRE: setinfoLdr.
            * UTILIDAD: Establece acciones e info al giro del preset
            * ENTRADAS: Ninguna.
            * SALIDAS: Ninguna.
            */
            $("#"+getidAttr).attr('contLight',contLight);//Almacena en el div label la info de icono de light
            $("#"+getidAttr).attr('contData',contData.toFixed(3));//Almacena en el div label la info de perilla opacity light
            $("#"+getidAttr).attr('rgbValue',rgbValue.toFixed(2));//Almacena en el div label la info de RGB
            $("#"+getidAttr).attr('volumeSet',volumeSet.toFixed(3));//Almacena en el div label la info de Buzzer

            setIntensitylightaction = 0.4;//Resetea la intensidad de los led o rgb
            setIntensitylightaction = contData.toFixed(3);//Opacity light

            console.log("ENERGIA BASE "+valMin+" ENERGIA TOPE "+valMax);
            console.log("ENERGIA ACTUAL "+setIntensitylightaction);
            
            setRgbintensitylight[1] = rgbValue.toFixed(2);

            savedataLdr.forEach(function(item2,index2){
                if(getnameAttr === savedataLdr[index2][0].replace(/['"]+/g, '')){//Busca objeto por nombre
                    savedataLdr[index2][1].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "led"){   
                            scene.children.forEach(function(item,index){
                                if(items[0] === item.name){
                                    onLed(item,setIntensitylightaction,items[2]);//Acciones para prender el LED
                                }
                            });
                        }
                    });

                    savedataLdr[index2][2].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "buzzer"){
                            scene.children.forEach(function(item,index){
                                if(items[0] === item.name){
                                    onBuzzer(item,setIntensitylightaction,items[2]);//Acciones para prender el BUZZER
                                }
                            });
                        }
                    });

                    savedataLdr[index2][3].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "rgb"){
                            scene.children.forEach(function(item,index){
                                if(items[0] === item.name){
                                    
                                    setRgbintensitylight[0] = items[2][0];
                                    
                                    onRgb(item,setIntensitylightaction,setRgbintensitylight,items[3]);//Acciones para prender el RGB
                                }
                            });
                        }
                    });

                    savedataLdr[index2][4].forEach(function(items,indexs){
                        if(items[0].split(" ")[1] === "rgbc"){
                            scene.children.forEach(function(item,index){
                                if(items[0] === item.name){
                                    onRgbc(item,setIntensitylightaction,items[2]);//Acciones para prender el RGBc
                                }
                            });
                        }
                    });
                }
                
                
            });
            
            $("#"+getidAttr).find(".d_activateldrleft").removeClass('d_disablebtn');//Quita clase de inactivo
            $("#"+getidAttr).find(".d_activateldrright").removeClass('d_disablebtn');//Quita clase de inactivo
            if(contLight === 0){
                $("#"+getidAttr).find(".d_activateldrleft").addClass('d_disablebtn');//Agrega clase de inactivo a btn left
            }
            if(contLight === 200){
                $("#"+getidAttr).find(".d_activateldrright").addClass('d_disablebtn');//Agrega clase de inactivo a btn right
            }
        }
    }
}
function resetobjPress(){
    /*
	* NOMBRE: resetobjPress.
	* UTILIDAD: Resetea las posiciones originales de los objetos que tienen algun movimiento (boton, interruptor, etc)
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    scene.children.forEach(function(item,index){//Busca todos los elementos hijos del objeto
        if(item.name.split(" ")[1] === "pushbutton"){//Objetos con btn en el escenario
            item.children.forEach(function(item2,index2){//Busca elementos children del objeto
                if(item2.name === "btn"){//Busca el btn del objeto
                    item2.position.y = 0;//Sube el btn del obj
                }
            });
        }
        if(item.name.split(" ")[1] === "switch"){//Objetos con btn en el escenario
            item.children.forEach(function(item2,index2){//Busca los btn del obj
                if(item2.name.split("_")[0] === "switch"){//Busca el btn seleccionado en el div
                    item2.position.z = 0;//Posicion original
                }
            });
            $(".d_activeswitchcheckbos").prop("checked", false);//Posicion original de los checkbox
        }
        if(item.name.split(" ")[1] === "preset"){//Objetos con preset en el escenario
            item.children[3].rotation.z = 0;//Gira la perilla a posicion inicial
            item.children[4].rotation.z = 0;//Gira la perilla a posicion inicial
            //item.children[4].rotation.y = 0;//Gira la perilla a posicion inicial
            $(".d_activatepresetcircle").css({"transform":"rotate(0deg)"});//Rotacion de imagen de la perilla a posicion original
            $(".d_activatepresetbtnleft").addClass('d_disablebtn');//Agrega clase de inactivo a btn left
            $(".d_activatepresetbtnright").removeClass('d_disablebtn');//Quita clase de inactivo
            $(".d_activatepreset").attr('contGir',0);//Resetea info attr en el div label de perilla giros
            $(".d_activatepreset").attr('contData',0.4);//Resetea info attr en el div label de perilla opacity light
            $(".d_activatepreset").attr('getnumPerilla',1);//Resetea info attr en el div label de perilla num perilla
            $(".d_activatepreset").attr('girPerilla',0);//Resetea info attr en el div label de perilla giro perilla
            $(".d_activatepreset").attr('rgbValue',0);//Resetea info attr en el div label de RGB
            $(".d_activatepreset").attr('volumeSet',0);//Resetea info attr en el div volumen buzzer
        }
        if(item.name.split(" ")[1] === "ldr"){//Objetos con preset en el escenario
            $(".d_activateldrleft").addClass('d_disablebtn');//Agrega clase de inactivo a btn left
            $(".d_activateldrright").removeClass('d_disablebtn');//Quita clase de inactivo
            $(".d_activateldrlight").find("svg").find("path").css({"opacity":"0"});//Resetea a opacidad 0 las lineas
            $(".d_activateldrlight").find("svg").find("path").css({"fill":"#343434"});//Resetea color las lineas
            $(".d_activateldrlight").find("svg").find("circle").css({"opacity":"0.5"});//Resetea a opacidad 0 el punto
            $(".d_activateldrlight").find("svg").find("circle").css({"fill":"#343434"});//Resetea color el punto
            $(".d_activateldr").attr('contLight',0);//Resetea info attr en el div label de perilla giros
            $(".d_activateldr").attr('contData',0.4);//Resetea info attr en el div label de perilla opacity light
            $(".d_activateldr").attr('rgbValue',0);//Resetea info attr en el div label de RGB
            $(".d_activateldr").attr('volumeSet',0);//Resetea info attr en el div volumen buzzer
        }
    });
}
function objAction(){
    /*
	* NOMBRE: objAction.
	* UTILIDAD: Interaccion con objetos con info de arduino
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    setUltrasonic();//Acciones para ultrasonico
    function setUltrasonic(){
        /*
        * NOMBRE: setUltrasonic.
        * UTILIDAD: Acciones para ultrasonico
        * ENTRADAS: Ninguna.
        * SALIDAS: Ninguna.
        */
    }
}
function resetobjAction(){
    /*
	* NOMBRE: resetobjAction.
	* UTILIDAD: Resetea interaccion con objetos con info de arduino
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
}
var runTime = null;//Intervalo de tiempo para cronometro
function startCrono(){
    /*
	* NOMBRE: startCrono.
	* UTILIDAD: Inicia tiempo de simulacion
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    var setTime = {//Almacena tiempo
        hora: 0,
        minuto: 0,
        segundo: 0
    };              
    runTime = setInterval(function(){//setInterval para tiempo
        // Segundos
        setTime.segundo++;//Aumenta segundos
        if(setTime.segundo >= 60){//Al llegar a los 60 segundos
            setTime.segundo = 0;//Segundo a 0
            setTime.minuto++;//Aumenta minuto
        }      
        // Minutos
        if(setTime.minuto >= 60){//Al llegar a los 60 minutos
            setTime.minuto = 0;//Minuto a 0
            setTime.hora++;//Aumenta hora
        }
        $("#d_timehour").text(setTime.hora < 10 ? '0' + setTime.hora : setTime.hora);//Agrega hora
        $("#d_timeminute").text(setTime.minuto < 10 ? '0' + setTime.minuto : setTime.minuto);//Agrega minuto
        $("#d_timesecond").text(setTime.segundo < 10 ? '0' + setTime.segundo : setTime.segundo);//Agrega segundo
    }, 1000);
}
function stopCrono(){
    /*
	* NOMBRE: stopCrono.
	* UTILIDAD: Para tiempo de simulacion
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    clearInterval(runTime);//Limpia tiempo
    $("#d_timehour").text('00');//Agrega hora
    $("#d_timeminute").text('00');//Agrega minuto
    $("#d_timesecond").text('00');//Agrega segundo
}
function checkObjs(){
    //Revisa conexion energia, y objetos colocados en su posicion dentro de la protoboard
    activeObj = [];//Almacena los objetos que ya estan validados, para evitar prender un led, buzzer, rgb, etc que no este validado
    contActive;//Conteo de pasos validados
    statusCableenergia = false;//Cable energia NO esta en escenario
    powerData = [];//Almacen posicion de pin de energia (+)A (-)A (+)B (-)B
    correctEnergy = true;//La polaridad de energia esta correctamente
    nameEnergyfail;//Almacena el nombre del objeto mal conectado a energia
    scene.children.forEach(function(item,index){//Busca en escena los objetos
        if(item.name.split(" ")[1] === "pinPowerpos" || item.name.split(" ")[1] === "pinPowerneg"){//Busca objeto de cableenergia (son dos conexiones). Primero busca si hay cable energia, porque si el cable energia se agrego al final, no valida los objeto que estan antes, cuando se hace el barrido.
            powerData[0] = item.newInfo.posEnergy[0];//Almacena posicion de pin energia positivo
            powerData[1] = item.newInfo.posEnergy[1];//Almacena posicion de pin energia negativo
            statusCableenergia = true;//Cable energia esta en escenario
        }
    });
    insideprotoboardStatus = [];//Almacena si los objetos estan dentro de la protoboard
    samerowStatus = [];//Almacena si todos los objetos estan colocados en la misma columna de energia que el cableenergia
    samelineenergyStatus = [];//Almacena si los pines estan conectados en la misma linea de polaridad
    scene.children.forEach(function(item,index){//Busca en escena los objetos
        if(item.name.split(" ")[0] != "grl" && item.name.split(" ")[0] != "null"){//Objetos que se mueven
            if(item.name.split(" ")[0] != "jumperPow" && item.name.split(" ")[0] != "jumper"){//No considera cables
                setObjects(item,"all");//Posiciona los objetos en la protoboard si estos estan en la posicion dentro de los margenes
                //energyObjects(item);//Detecta si los objetos estan colocados en la misma columna de energia que el cableenergia
                samelineEnergy(item);//Detecta si los pines del objeto estan en la misma linea de polaridad
            }
        }
        if(item.name.split(" ")[1] === "powerbank"){//Hay powerbank en la scena
            onPowerbank(item,item.name.split(" ")[1]);//Prende el powerbank
        }
        if(item.name.split(" ")[1] === "energyadapter"){//Hay AC adapter en la scena
            onPowerbank(item,item.name.split(" ")[1]);//Prende el AC adapter
        }
        
        
        if(stepslineStatus === 0){
            validaObjects(item);//Hace la validacion de los objetos, en relacion a los datos de los pasos en "valData" 
        }
           
        
    });
    
}
var savelightPowerbank = null;//Almacena la luz del powerbank (inicia sin powerbank)
var saveconectedAcadapter = false;//Almacena hay AC adapter (inicia sin AC adapter)
var animaAcadapter = false;//Satatua para animar cable de ac adapter
function onPowerbank(item,objName){
    /*
	* NOMBRE: onPowerbank.
	* UTILIDAD: Prende el powerbank
	* ENTRADAS: item > objeto en curso, objName > nombre del objeto.
	* SALIDAS: Ninguna.
    */
    //console.log(scene);
    if(objName === "energyadapter"){//Es AC adapter
        animaAcadapter = true;//Anima cable ac adapter
        saveconectedAcadapter = true;//Si hay AC adapter
    }
    if(objName === "powerbank"){//Es powerbank
        item.children[4].material.color = new THREE.Color( 0x00ff00 );//Color verde ON
        savelightPowerbank = item.children[4].material;//Almacena el material, para despues apagarlo
    }
    if(statusQuestions === false){//Entra, si no son pasos despues de terminada la practica (entra al inicio)
        $("#d_pxbentorno3dstepsbtns_"+addentorno3dInstruccion.length).addClass('d_pxbentorno3dstepsbtns_valida');//Agrega estilo de validado al paso que cumple con los requisitos
        $("#d_pxbentorno3dstepsbtns_"+addentorno3dInstruccion.length).attr('name', "d_valida");//Agrega attr name para indicar que esta validado este paso
    }
    $(".d_pxbviewcomponentsconte").css({"opacity":"0.35"});//Opacidad para inhabilitar menu de componentes al prender la fuente de poder
    $(".d_pxbviewcomponentsconte").append('<div class="d_pxbviewcomponentsconte_block"></div>');//Div para bloquear menu de componentes al prender la fuente de poder
}
function offPowerbank(){
    /*
	* NOMBRE: offPowerbank.
	* UTILIDAD: Apaga powerbank
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    if(savelightPowerbank != null || saveconectedAcadapter === true){//Si ya hay powerbank en el escenario
        scene.children.forEach(function(item,index){//Busca en escena los objetos
            if(item.name.split(" ")[1] === "energyadapter"){//Es AC adapter
                scene.children.forEach(function(itemAll,index){//Busca en escena los objetos
                    if(itemAll.name.split(" ")[1] === "energyadapter"){//AC adapter en la scena
                        itemAll.position.y = 3.5;//Posicion original
                    }
                    if(itemAll.name.split(" ")[0] === "jumperPow"){//Jumper de AC adapter
                        itemAll.geometry.parameters.path.v0.y = 3.5;//Posicion original
                        itemAll.geometry.parameters.path.v1.y = 3.5;//Posicion original
                        //Actualizacion de geometria
                        var newCable = new THREE.TubeBufferGeometry(itemAll.geometry.parameters.path, 80, 0.05, 40, false);
                        itemAll.geometry.copy(newCable);
                        itemAll.geometry.needsUpdate = true;
                    }
                });
            }
            if(item.name.split(" ")[1] === "powerbank"){//Es powerbank
                savelightPowerbank.color = new THREE.Color( 0xff0000 );//Color verde OFF
            }
        });
        $(".d_pxbentorno3dstepsbtns").removeClass('d_pxbentorno3dstepsbtns_valida');//Quita estilo a los pasos, para despues volover a validar todos (se hace porque en cualquier momento se pueden mover de nuevo objetos, cuyos valores ya estaban validados)
        $(".d_pxbentorno3dstepsbtns").removeAttr('name');//Quita attr name para resetear la validacion del paso
        $("#d_pxbentorno3dplaycheckbox").prop("checked", false);//Cambia a unchecked el btn power play
        $(".d_pxbviewcomponentsconte").css({"opacity":"1"});//Opacidad para habilitar menu de componentes al prender la fuente de poder
        $(".d_pxbviewcomponentsconte_block").remove()//Quita div que bloquea menu de componentes al prender la fuente de poder
    }
}
function moveAcadapter(){
    /*
	* NOMBRE: moveAcadapter.
	* UTILIDAD: Animacion de cable de AC adapter
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    scene.children.forEach(function(itemAll,index){//Busca en escena los objetos
        if(itemAll.name.split(" ")[1] === "energyadapter"){//AC adapter en la scena
            itemAll.position.y = itemAll.position.y-0.3;
            if(itemAll.position.y <= 1){
                animaAcadapter = false;//Para animacion cable ac adapter
            }
        }
        if(itemAll.name.split(" ")[0] === "jumperPow"){
            itemAll.geometry.parameters.path.v0.y = itemAll.geometry.parameters.path.v0.y-0.3;
            itemAll.geometry.parameters.path.v1.y = itemAll.geometry.parameters.path.v1.y-0.3;
            //Actualizacion de geometria
            var newCable = new THREE.TubeBufferGeometry(itemAll.geometry.parameters.path, 80, 0.05, 40, false);
            itemAll.geometry.copy(newCable);
            itemAll.geometry.needsUpdate = true;
        }
    });
}
function onLed(activeObj,setFlowdata,statusResis){
    /*
    * NOMBRE: onLed.
    * UTILIDAD: Acciones para prender el LED.
    * ENTRADAS: activeObj > array de objetos que ya fueron validados en los pasos, setFlowdata > intensidad de iluminacion de acuerdo al numero de resistencias
    * SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    
    console.log("LED INICIA "+activeObj.name);
    console.log("flowEnergy: "+setFlowdata);
    
    if(setFlowdata <= 1 && statusResis === true){//Tiene resistencia
        startLed(activeObj);//Acciones para prender el LED.
    }else if(setFlowdata > 1 && statusResis === false){//No tiene resistencia
        activeObj.getObjectByName("data").children.forEach(function(item1,index1){//Busca objetos hijos
            if(item1.name === "crash"){//Busca el objeto de crash
                item1.visible = true;//Agrega crash
            }
        });
        showWarning("includeresistance",activeObj.newInfo.name);//Muestra las advertencias de linea de enertgia sin resistencia
    }
    
    function startLed(objLed){
        /*
        * NOMBRE: startLed.
        * UTILIDAD: Acciones para prender el LED.
        * ENTRADAS: objLed > objeto en curso.
        * SALIDAS: Ninguna.
        * VARIABLES: Ninguna
        */
        objLed.getObjectByName("data").children.forEach(function(item1,index1){//Busca objetos hijos
            if(item1.name === "light"){//Busca el objeto de sprite light
                //console.log(item1);
                item1.visible = true;//Prende light
                item1.material.opacity = setFlowdata-0.2;//Intensidad de light
                item1.scale.x = setFlowdata*3;//Tamaño de light
                item1.scale.y = setFlowdata*3;//Tamaño de light
                item1.scale.z = setFlowdata*3;//Tamaño de light

                //console.log(item1.scale);
            }
        });
        objLed.children[1].material.opacity = setFlowdata;//Opacidad de led
    }
}
function offLed(which){
    /*
    * NOMBRE: offLed.
    * UTILIDAD: Acciones para apagar el led.
    * ENTRADAS: which > si es solo un led o todos
    * SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    console.log("OFF LED");
    if(which === "all"){
        scene.children.forEach(function(item,index){//Busca en escena todos los objetos
            if(item.name.split(" ")[1] === "led"){//Busca en escena los objetos LED
                item.getObjectByName("data").children.forEach(function(item1,index1){//Busca objetos hijos
                    if(item1.name === "light"){//Busca el objeto de sprite light
                        item1.visible = false;//Apaga light
                        item1.material.opacity = 1;//Restaura la opacidad del led
                        item1.scale.x = 3;//Tamaño de light
                        item1.scale.y = 3;//Tamaño de light
                        item1.scale.z = 3;//Tamaño de light
                    }
                    if(item1.name === "crash"){//Busca el objeto de crash
                        item1.visible = false;//Quita crash
                    }
                });
                item.children[1].material.opacity = 0.4;//Restaura la opacidad del led
            }else{
                //console.log("NO HAY LEDs PRENDIDOS");
            }
        });
    }else{
        scene.children.forEach(function(item,index){//Busca en escena todos los objetos
            if(which.includes(item.name) === true){
                item.getObjectByName("data").children.forEach(function(item1,index1){//Busca objetos hijos
                    if(item1.name === "light"){//Busca el objeto de sprite light
                        item1.visible = false;//Apaga light
                        item1.material.opacity = 1;//Restaura la opacidad del led
                        item1.scale.x = 3;//Tamaño de light
                        item1.scale.y = 3;//Tamaño de light
                        item1.scale.z = 3;//Tamaño de light
                    }
                    if(item1.name === "crash"){//Busca el objeto de crash
                        item1.visible = false;//Quita crash
                    }
                });
                console.log("LED TERMINA");
                console.log(item.name);
                item.children[1].material.opacity = 0.4;//Restaura la opacidad del led
            }else{
                //console.log("NO HAY LEDs PRENDIDOS");
            }
        });
    }
}
var timeIntervalrgbc;//Almacena tiempo de cambio de colores RGBc
function onRgbc(activeObj,setFlowdata,statusResis){
    /*
    * NOMBRE: onRgbc.
    * UTILIDAD: Acciones para prender el RGBc.
    * ENTRADAS: activeObj > array de objetos que ya fueron validados en los pasos, setFlowdata > intensidad de iluminacion de acuerdo al numero de resistencias
    * SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    
    
    console.log("RGBc INICIA "+activeObj.name);
    console.log("flowEnergy: "+setFlowdata);
    
    if(setFlowdata <= 1 && statusResis === true){//Tiene resistencia
        startRgbc(activeObj);//Acciones para prender el RGBc.
    }else if(setFlowdata > 1 && statusResis === false){//No tiene resistencia
        activeObj.getObjectByName("data").children.forEach(function(item1,index1){//Busca objetos hijos
            if(item1.name === "crash"){//Busca el objeto de crash
                item1.visible = true;//Agrega crash
            }
        });
        showWarning("includeresistance",activeObj.newInfo.name);//Muestra las advertencias de linea de enertgia sin resistencia
    }
    
    function startRgbc(objRgbc){
        /*
        * NOMBRE: startRgbc.
        * UTILIDAD: Acciones para prender el RGBc.
        * ENTRADAS: objRgbc > objeto en curso.
        * SALIDAS: Ninguna.
        * VARIABLES: Ninguna
        */
        objRgbc.getObjectByName("data").children.forEach(function(item1,index1){//Busca objetos hijos
            if(item1.name === "light"){//Busca el objeto de sprite light
                //console.log(item1);
                item1.visible = true;//Prende light
                item1.material.opacity = setFlowdata-0.2;//Intensidad de light
                item1.scale.x = setFlowdata*3;//Tamaño de light
                item1.scale.y = setFlowdata*3;//Tamaño de light
                item1.scale.z = setFlowdata*3;//Tamaño de light

                //console.log(item1.scale);
            }
        });
        objRgbc.children[1].material.opacity = setFlowdata;//Opacidad de rgbc
        
        var contInterval = 0;//Conteo para cambiar de color
        var saveColor;//Almacena el color a cambiar
        var cronoSet = 750;//Velocidad entre colores
        var contFast = 0;//Almacena conteo para cambio de velocidad
        
        
        
        console.log("buzzerRgbc---------");
        //console.log(buzzerRgbc);
        console.log(getBuzzerrgbc);
        clearInterval(timeIntervalrgbc);//Limpia tiempo
        //buzzerRgbc.forEach(function(rgbcBuzzer){
            if(getBuzzerrgbc.length >= 2){//Si el RGBc tiene un buzzer en paralelo y el mismo componente de accion (button, preset, ldr)
                cronoSet = 100;//Velocidad entre colores
                changeRgb();//Cambio de colores RGBc
                function changeRgb() {
                    /*
                    * NOMBRE: changeRgb.
                    * UTILIDAD: Cambio de colores RGBc
                    * ENTRADAS: Ninguna.
                    * SALIDAS: Ninguna.
                    */
                    if(contInterval === 0){//Primer color
                        saveColor = 0xff0000;//Color R
                    }
                    if(contInterval === 1){//Segundo color
                        saveColor = 0x00ff00;//Color G
                    }
                    if(contInterval === 2){//Tercer color
                        saveColor = 0x0000ff;//Color B
                    }
                    objRgbc.children[1].material.color = new THREE.Color(saveColor);//Color rgbc
                    objRgbc.getObjectByName("data").children[2].material.color = new THREE.Color(saveColor);//Color sprite
                    contInterval++;//Incrementa conteo para cambiar de color
                    if(contInterval === 3){//Terminan colores
                        contInterval = 0;//Reinicia el conteo a color R
                    }
                    timeIntervalrgbc = setTimeout(changeRgb, cronoSet);//Reinicia el cambio de colores
                }
            }else{//Entra el RGBc normal
                changeRgb();//Cambio de colores RGBc
                function changeRgb() {
                    /*
                    * NOMBRE: changeRgb.
                    * UTILIDAD: Cambio de colores RGBc
                    * ENTRADAS: Ninguna.
                    * SALIDAS: Ninguna.
                    */
                    if(contInterval === 0){//Primer color
                        saveColor = 0xff0000;//Color R
                    }
                    if(contInterval === 1){//Segundo color
                        saveColor = 0x00ff00;//Color G
                    }
                    if(contInterval === 2){//Tercer color
                        saveColor = 0x0000ff;//Color B
                    }
                    objRgbc.children[1].material.color = new THREE.Color(saveColor);//Color rgbc
                    objRgbc.getObjectByName("data").children[2].material.color = new THREE.Color(saveColor);//Color sprite
                    contInterval++;//Incrementa conteo para cambiar de color
                    contFast++;//Incrementa conteo para cambio de velocidad
                    if(contInterval === 3){//Terminan colores
                        contInterval = 0;//Reinicia el conteo a color R
                    }
                    if(contFast === 12){//Termina tiempo
                        cronoSet = 100;//Disminuye velocidad entre colores
                    }
                    if(contFast === 60){//Termina tiempo
                        cronoSet = 750;//Aumenta velocidad entre colores
                        contFast = 0;//Reinicia conteo para cambio de velocidad
                    }
                    timeIntervalrgbc = setTimeout(changeRgb, cronoSet);//Reinicia el cambio de colores
                }
            }
        //});
    }
}
function offRgbc(which){
    /*
    * NOMBRE: offRgbc.
    * UTILIDAD: Acciones para apagar el RGBc.
    * ENTRADAS: which > si es solo un led o todos
    * SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    console.log("OFF RGBc");
    if(which === "all"){
        scene.children.forEach(function(item,index){//Busca en escena todos los objetos
            if(item.name.split(" ")[1] === "rgbc"){//Busca en escena los objetos RGBc
                item.getObjectByName("data").children.forEach(function(item1,index1){//Busca objetos hijos
                    if(item1.name === "light"){//Busca el objeto de sprite light
                        item1.visible = false;//Apaga light
                        item1.material.opacity = 1;//Restaura la opacidad del rgbc
                        item1.scale.x = 3;//Tamaño de light
                        item1.scale.y = 3;//Tamaño de light
                        item1.scale.z = 3;//Tamaño de light
                    }
                    if(item1.name === "crash"){//Busca el objeto de crash
                        item1.visible = false;//Quita crash
                    }
                });
                item.children[1].material.opacity = 0.4;//Restaura la opacidad del rgbc
                item.children[1].material.color = new THREE.Color(0x000000);//Color rgbc
                item.getObjectByName("data").children[2].material.color = new THREE.Color(0x000000);//Color sprite
                clearInterval(timeIntervalrgbc);//Limpia tiempo
            }else{
                //console.log("NO HAY RGBc PRENDIDOS");
            }
        });
        
    }else{
        scene.children.forEach(function(item,index){//Busca en escena todos los objetos
            if(which.includes(item.name) === true){
                item.getObjectByName("data").children.forEach(function(item1,index1){//Busca objetos hijos
                    if(item1.name === "light"){//Busca el objeto de sprite light
                        item1.visible = false;//Apaga light
                        item1.material.opacity = 1;//Restaura la opacidad del rgbc
                        item1.scale.x = 3;//Tamaño de light
                        item1.scale.y = 3;//Tamaño de light
                        item1.scale.z = 3;//Tamaño de light
                    }
                    if(item1.name === "crash"){//Busca el objeto de crash
                        item1.visible = false;//Quita crash
                    }
                });
                console.log("RGBc TERMINA");
                console.log(item.name);
                item.children[1].material.opacity = 0.4;//Restaura la opacidad del rgbc
                clearInterval(timeIntervalrgbc);//Limpia tiempo
                item.children[1].material.color = new THREE.Color(0x000000);//Color rgbc
                item.getObjectByName("data").children[2].material.color = new THREE.Color(0x000000);//Color sprite
            }else{
                //console.log("NO HAY RGBc PRENDIDOS");
            }
        });
    }
}
function onRgb(activeObj,setFlowdata,getRgb,statusResis){
    /*
    * NOMBRE: onRgb.
    * UTILIDAD: Acciones para prender el RGB.
    * ENTRADAS: activeObj > array de objetos que ya fueron validados en los pasos, setFlowdata > intensidad de iluminacion de acuerdo al numero de resistencias, getRgb > obtiene el color rgb del RGB
    * SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    
    
    
    console.log("RGB INICIA "+activeObj.name);
    console.log("flowEnergy: "+setFlowdata);
    console.log(getRgb);
    
    if(setFlowdata <= 1 && statusResis === true){//Tiene resistencia
        startRgb(activeObj);//Acciones para prender el RGB.
    }else if(setFlowdata > 1 && statusResis === false){//No tiene resistencia
        activeObj.getObjectByName("data").children.forEach(function(item1,index1){//Busca objetos hijos
            if(item1.name === "crash"){//Busca el objeto de crash
                item1.visible = true;//Agrega crash
            }
        });
        showWarning("includeresistance",activeObj.newInfo.name);//Muestra las advertencias de linea de enertgia sin resistencia
    }
    
    function startRgb(objRgb){
        /*
        * NOMBRE: startRgb.
        * UTILIDAD: Acciones para prender el RGB.
        * ENTRADAS: objRgb > objeto en curso.
        * SALIDAS: Ninguna.
        * VARIABLES: Ninguna
        */
        console.log("ENTRA ONRGBDATA");
        //console.log("RGB pin "+objRgb.newInfo.onrgbData);
        objRgb.getObjectByName("data").children.forEach(function(item1,index1){//Busca objetos hijos
            if(item1.name === "light"){//Busca el objeto de sprite light
                //console.log(item1);
                item1.visible = true;//Prende light
                console.log(objRgb.newInfo.onrgbData);
                if(objRgb.newInfo.onrgbData.length === 1){//Si solo hay un cable conectado al RGB
                    item1.material.opacity = setFlowdata-0.2;//Intensidad de light
                    item1.scale.x = setFlowdata*3;//Tamaño de light
                    item1.scale.y = setFlowdata*3;//Tamaño de light
                    item1.scale.z = setFlowdata*3;//Tamaño de light
                }else{
                    item1.material.opacity = 1;//Restaura la opacidad del rgb
                    item1.scale.x = 3;//Tamaño de light
                    item1.scale.y = 3;//Tamaño de light
                    item1.scale.z = 3;//Tamaño de light
                }
                eval("item1.material.color."+getRgb[0]+" = "+getRgb[1]+"");
            }
        });
        eval("objRgb.children[1].material.color."+getRgb[0]+" = "+getRgb[1]+"");
        if(objRgb.newInfo.onrgbData.length === 1){//Si solo hay un cable conectado al RGB
            objRgb.children[1].material.opacity = setFlowdata;//Opacidad de led
        }else{
            if(objRgb.children[1].material.color.r > 0.4 || objRgb.children[1].material.color.g > 0.4 || objRgb.children[1].material.color.b > 0.4){
                objRgb.children[1].material.opacity = 1;//Opacidad de led
            }else{
                objRgb.children[1].material.opacity = setFlowdata;//Opacidad de led
            }
            
        }
        
        
    }
}
function offRgb(which,getRgb){
    /*
    * NOMBRE: offRgb.
    * UTILIDAD: Acciones para apagar el RGB.
    * ENTRADAS: which > si es solo un led o todos
    * SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    console.log(getRgb);
    console.log("OFF RGB");
    console.log(which);
    if(which === "all"){
        scene.children.forEach(function(item,index){//Busca en escena todos los objetos
            if(item.name.split(" ")[1] === "rgb"){//Busca en escena los objetos RGB
                item.getObjectByName("data").children.forEach(function(item1,index1){//Busca objetos hijos
                    if(item1.name === "light"){//Busca el objeto de sprite light
                        item1.visible = false;//Apaga light
                        item1.material.opacity = 1;//Restaura la opacidad del rgb
                        item1.scale.x = 3;//Tamaño de light
                        item1.scale.y = 3;//Tamaño de light
                        item1.scale.z = 3;//Tamaño de light
                        
                        item1.material.color = new THREE.Color( 0, 0, 0 );//Restaura color rgb a light
                    }
                    if(item1.name === "crash"){//Busca el objeto de crash
                        item1.visible = false;//Quita crash
                    }
                });
                item.children[1].material.opacity = 0.4;//Restaura la opacidad del rgb
                item.children[1].material.color = new THREE.Color( 0, 0, 0 );//Restaura color rgb a cristal
                item.newInfo.onrgbData = [];//Resetea si solo hay un cable conectado al RGB
            }else{
                //console.log("NO HAY RGBs PRENDIDOS");
            }
        });
    }else{
        scene.children.forEach(function(item,index){//Busca en escena todos los objetos
            if(which.includes(item.name) === true){
                //item.newInfo.onrgbData = item.newInfo.onrgbData-1;
                item.getObjectByName("data").children.forEach(function(item1,index1){//Busca objetos hijos
                    if(item1.name === "light"){//Busca el objeto de sprite light
                        console.log("OPPSSSSSSS");
                        console.log(item.newInfo.onrgbData);
                        if(item.newInfo.onrgbData.length === 1){
                            item1.visible = false;//Apaga light
                        }else{
                            item1.visible = true;//Apaga light
                        }
                        item1.material.opacity = 1;//Restaura la opacidad del rgb
                        item1.scale.x = 3;//Tamaño de light
                        item1.scale.y = 3;//Tamaño de light
                        item1.scale.z = 3;//Tamaño de light
                        eval("item1.material.color."+getRgb[0]+" = 0");
                    }
                    if(item1.name === "crash"){//Busca el objeto de crash
                        item1.visible = false;//Quita crash
                    }
                });
                console.log("RGB TERMINA");
                console.log(item.name);
                console.log("RGB pin "+item.newInfo.onrgbData);
                if(item.newInfo.onrgbData.length === 1){//Si solo hay un cable conectado al RGB
                    item.children[1].material.opacity = 0.4;//Restaura la opacidad del rgb
                }else{
                    item.children[1].material.opacity = 1;//Restaura la opacidad del rgb
                }
                eval("item.children[1].material.color."+getRgb[0]+" = 0");
            }else{
                //console.log("NO HAY LEDs PRENDIDOS");
            }
        });
    }
}
var soundBuzzer;//Almacena el sonido original, con sus caracteristicas
var addBuzzer = [];
var intervalBuzzer;
function creasoundBuzzer(){
    /*
	* NOMBRE: creasoundBuzzer.
	* UTILIDAD: Crea el audio del zumbador
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    context.resume().then(() => {//Inicia esta funcion, porque si no, no lo reconoce Chome (tambien en el timbre.js, hay que agregar como variable global "var context;")
        console.log('Playback resumed successfully');
    });
    var freq = T(1900);//Establece la frecuencia del sonido
    soundBuzzer = T("sin", {freq:freq, mul:1});//Crea el objeto con las caracteristicas
}
function onBuzzer(activeObj,setFlowdata,statusResis){
    /*
	* NOMBRE: onBuzzer.
	* UTILIDAD: Acciones para prender el buzzer.
	* ENTRADAS: activeObj > objeto en curso.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    
    console.log("VOLUMEN BUZZER "+activeObj.name);
    console.log("flowEnergy: "+setFlowdata);
    
    
    var posBuzzer;//Almacena la posicion del objeto sonido del buzzer en curso
    addBuzzer.forEach(function(items,indexs){//Busca los sonidos buzzer almacenados
        if(items.name === activeObj.name){//El objeto sonido y el nombre coinciden
            posBuzzer = indexs;//Almacena la posicion del objeto sonido del buzzer en curso
        }
    });

    
    console.log("BUZZER INICIA");
    console.log(setFlowdata);
    console.log(activeObj.name);
    
    if(setFlowdata <= 0.8 && statusResis === true){//Tiene resistencia
        startBuzzer(activeObj);//Acciones para prender el Buzzer.
    }else if(setFlowdata > 0.8 && statusResis === false){//No tiene resistencia
        activeObj.getObjectByName("data").children.forEach(function(item1,index1){//Busca objetos hijos
            if(item1.name === "crash"){//Busca el objeto de crash
                item1.visible = true;//Agrega crash
            }
        });
        showWarning("includeresistance",activeObj.newInfo.name);//Muestra las advertencias de linea de enertgia sin resistencia
    }
    
    function startBuzzer(objBuzzer){
        /*
        * NOMBRE: startBuzzer.
        * UTILIDAD: Acciones para prender el Buzzer.
        * ENTRADAS: objBuzzer > objeto en curso.
        * SALIDAS: Ninguna.
        * VARIABLES: Ninguna
        */
        objBuzzer.getObjectByName("data").children.forEach(function(item1,index1){//Busca objetos hijos
            if(item1.name === "sound"){//Busca el objeto de label sound
                item1.visible = true;//Muestra icono de sonido
                addBuzzer[posBuzzer].play();//Empieza buzzer
                
                console.log("buzzerRgbc---------");
                //console.log(buzzerRgbc);
                console.log(getBuzzerrgbc);
                
                $(".d_buzzerline1, .d_buzzerline2, .d_buzzerline3").show();//Muestra todas las lineas del icono de sonido
                var status = true;//Permite intercambio entre sonido menos y mas sonido

                //buzzerRgbc.forEach(function(rgbcBuzzer){
                    //console.log(rgbcBuzzer);
                    if(getBuzzerrgbc.length >= 2){//Si el Buzzer tiene un RGBc en paralelo y el mismo componente de accion (button, preset, ldr)
                        console.log("BUZZER RGB ENTRA");
                        intervalSound();//Cambio de sonido del Buzzer
                        function intervalSound(){
                            /*
                            * NOMBRE: intervalSound.
                            * UTILIDAD: Cambio de sonido del Buzzer
                            * ENTRADAS: Ninguna.
                            * SALIDAS: Ninguna.
                            */
                            addBuzzer[posBuzzer].set({mul:setFlowdata});//Ajusta volumen
                            if(status){//Entra sonido fuerte
                                setFlowdata = setFlowdata-0.5;//Disminuye volumen
                                $(".d_buzzerline3").hide();
                                status = false;//Cmabia bandera
                            }else{//Entra sonido suave
                                setFlowdata = setFlowdata+0.5;//Aumenta volumen
                                $(".d_buzzerline3").show();
                                status = true;//Cmabia bandera
                            }
                            intervalBuzzer = setTimeout(intervalSound,400);//Vuelve a iniciar la funcion para hacerlo ciclico
                        };

                    }else{//Entra el buzzer normal
                        var setVol;//Volumen buzzer
                        if(setFlowdata <= 0.59){//Energia para prender buzzer
                            setVol = 0;//Volumen buzzer
                            $(".d_buzzerline1, .d_buzzerline2, .d_buzzerline3").hide();//Oculta todas las lineas del icono de sonido
                        }
                        if(setFlowdata >= 0.6 && setFlowdata < 0.75){//Energia para prender buzzer
                            setVol = 0.2;//Volumen buzzer
                            $(".d_buzzerline2, .d_buzzerline3").hide();//Muestra las lineas 2 y 3 del icono de sonido
                        }
                        /*if(setFlowdata > 0.8 && setFlowdata <= 0.85){//Energia para prender buzzer
                            setVol = 0.6;//Volumen buzzer
                            $(".d_buzzerline3").hide();//Muestra las lineas 3 del icono de sonido
                        }*/
                        if(setFlowdata >= 0.8 && setFlowdata < 0.9){//Energia para prender buzzer
                            setVol = 1;//Volumen buzzer
                        }
                        addBuzzer[posBuzzer].set({mul:setVol});//Ajusta volumen
                    }
                //});
            }
        });
    }
}
function offBuzzer(which){
    /*
	* NOMBRE: offBuzzer.
	* UTILIDAD: Acciones para apagar el buzzer.
	* ENTRADAS: which > si es solo un buzzer o todos
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    console.log("OFF BUZZER");
    var posBuzzer;//Almacena la posicion del objeto sonido del buzzer en curso
    addBuzzer.forEach(function(items,indexs){//Busca los sonidos buzzer almacenados
        if(which.includes(items.name) === true){//El objeto sonido y el nombre coinciden
            posBuzzer = indexs;//Almacena la posicion del objeto sonido del buzzer en curso
        }
    });
    if(which === "all"){
        scene.children.forEach(function(item,index){//Busca en escena todos los objetos
            if(item.name.split(" ")[1] === "buzzer"){//Busca en escena los objetos Buzzer
                item.getObjectByName("data").children.forEach(function(item1,index1){//Busca objetos hijos
                    if(item1.name === "sound"){//Busca el objeto de label sound
                        item1.visible = false;//Apaga light
                        addBuzzer.forEach(function(items,indexs){//Busca todos los sonidos buzzer
                            items.pause();//Stop buzzer
                            clearTimeout(intervalBuzzer);
                        });
                    }
                    if(item1.name === "crash"){//Busca el objeto de crash
                        item1.visible = false;//Quita crash
                    }
                });
            }else{
                //console.log("NO HAY LEDs PRENDIDOS");
            }
        });
    }else{
        scene.children.forEach(function(item,index){//Busca en escena todos los objetos
            if(which.includes(item.name) === true){
                item.getObjectByName("data").children.forEach(function(item1,index1){//Busca objetos hijos
                    if(item1.name === "sound"){//Busca el objeto de label sound
                        item1.visible = false;//Apaga light
                    }
                    if(item1.name === "crash"){//Busca el objeto de crash
                        item1.visible = false;//Quita crash
                    }
                });
                console.log("BUZZER TERMINA");
                console.log(item.name);
                addBuzzer[posBuzzer].pause();//Stop buzzer
                clearTimeout(intervalBuzzer);
            }else{
                //console.log("NO HAY LEDs PRENDIDOS");
            }
        });
    }
}
function showWarning(type,alertName){
    /*
	* NOMBRE: showWarning.
	* UTILIDAD: Muestra las advertencias sobre objetos
	* ENTRADAS: type > tipo de alerta, alertName > nombre del objeto de alerta
	* SALIDAS: Ninguna.
    */
    $('#d_pxbviewentorno3dwarning').show();//Muestra div de advertencias
    if(type === "pasos"){//MAdvertencia sobrer pasos
        $('#d_pxbviewentorno3dwarning').append('<li>Aún faltan pasos por completar</li>');//Agrega advertencia por cada objeto
    }else if(type === "energy"){//MAdvertencia sobrer pasos
        $('#d_pxbviewentorno3dwarning').append('<li><span>'+alertName+'</span> no está conectado(a) a la energía correctamente</li>');//Agrega advertencia por cada objeto
    }else if(type === "manipulacion"){//MAdvertencia sobrer objetos sin manipular
        $('#d_pxbviewentorno3dwarning').append('<li><span>'+alertName+'</span> todavía no ha sido usado(a)</li>');//Agrega advertencia por cada objeto
    }else if(type === "sameenergy"){//MAdvertencia sobrer objetos sin manipular
        $('#d_pxbviewentorno3dwarning').append('<li><span>'+alertName+'</span> está conectado(a) a la misma línea de energía</li>');//Agrega advertencia por cada objeto
    }else if(type === "choque"){//MAdvertencia sobrer jumpers haciendo corto
        $('#d_pxbviewentorno3dwarning').append('<li><span>'+alertName+'</span> hace corto</li>');//Agrega advertencia por cada objeto
    }else if(type === "noenergy"){//MAdvertencia sobrer jumpers haciendo corto
        $('#d_pxbviewentorno3dwarning').append('<li><span>'+alertName+'</span> no está conectado(a) a la protoboard (placa de pruebas)</li>');//Agrega advertencia por cada objeto
    }else if(type === "samepolarity"){//MAdvertencia sobrer jumpers haciendo corto
        $('#d_pxbviewentorno3dwarning').append('<li><span>'+alertName+'</span> no está conectado a las bandas + y - de la protoboard (placa de pruebas)</li>');//Agrega advertencia por cada objeto
    }else if(type === "position"){//Advertencia sobre objetos mal conectados
        $('#d_pxbviewentorno3dwarning').append('<li><span>'+alertName+'</span> no se puede conectar</li>');//Agrega advertencia por cada objeto
    }else if(type === "includeresistance"){//Advertencia sobre linea de energia sin resistencia
        $('#d_pxbviewentorno3dwarning').append('<li><span>'+alertName+'</span> no está conectado(a) a una resistencia</li>');//Agrega advertencia por cada objeto
    }else if(type === "positivetonegative"){//Advertencia sobre componentes que tienen que conectarse de + a -
        $('#d_pxbviewentorno3dwarning').append('<li><span>'+alertName+'</span> no está conectado(a) a su polaridad correctamente</li>');//Agrega advertencia por cada objeto
    }else if(type === "colorofled"){//Advertencia sobre componentes que no tienen color LED
        $('#d_pxbviewentorno3dwarning').append('<li><span>'+alertName+'</span> no tiene asigando un color</li>');//Agrega advertencia por cada objeto de LED sin color
    }else if(type === "colorofresistor"){//Advertencia sobre componentes que no tienen color LED
        $('#d_pxbviewentorno3dwarning').append('<li><span>'+alertName+'</span> no tiene asigando un valor</li>');//Agrega advertencia por cada objeto de resistencia sin valor
    }
}
function hideWarning(){
    /*
	* NOMBRE: hideWarning.
	* UTILIDAD: Oculta las advertencias sobre objetos
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    $('#d_pxbviewentorno3dwarning').hide();//Oculta div de advertencias
    $('#d_pxbviewentorno3dwarning').find('li').remove();//Quita p de advertencias
    $('#d_pxbviewentorno3dwarning').find('.d_pxbviewentorno3dwarningtitle').remove();//Quita div title de advertencias
}
function validaObjects(item){
    //Hace la validacion de los objetos, en relacion a los datos de los pasos en "valData"
    //item > objeto en curso.
    if(item.name.split(" ")[0] != "grl"){//Objetos que se arrastran y sueltan
        //console.log(item.newInfo.polarity);
        if(item.newInfo.polarity === "both" || item.newInfo.polarity === "none"){//Caso para posicion de pines donde NO importa la posicion de positivo
            for(var i=0; i<=valData.length-1; i++){//For para las posiciones de "valData" que son los pasos
                var incData = 0;//Conteo para saber si todos los items comparados (suma), coinciden con los items de "newInfo.val"
                valData[i].toString().split(",").forEach(function(item1,index1){//Busca cada posicion, para buscar cada item (que son los pasos)
                    item.newInfo.val.toString().split(",").forEach(function(item2,index2){//Busca cada item de "newInfo.val", para compararlo
                        if(item1 === item2){//Compara si cada item de cada paso de "valData[i]", coincide con cada item de "newInfo.val"
                            incData++;//Conteo para saber si todos los items comparados (suma), coinciden con los items de "newInfo.val"
                        }
                    });
                    if(incData === item.newInfo.val.toString().split(",").length){//Comparacion de los items sumados de cada paso, con los items de "newInfo.val"
                        var valStep = i+1;//Se almacena en que posicion de "valData" es la coincidencia (valData > tiene las pocisiones de acuerdo a las instrucciones de los pasos)
                        $("#d_pxbentorno3dstepsbtns_"+valStep).addClass('d_pxbentorno3dstepsbtns_valida');//Agrega estilo de validado al paso que cumple con los requisitos
                        $("#d_pxbentorno3dstepsbtns_"+valStep).attr('name', "d_valida");//Agrega attr name para indicar que esta validado este paso
                        activeObj.push(item);//Si todos los items son validados, el objeto se almacena
                    }
                });
            }
        }else if(item.newInfo.polarity === "defined"){//Caso para posicion de pines en donde SI importa el positivo
            valData.forEach(function(item2,index2){//Por cada objeto, se compara con el array de validacion de cada practica
                if(item.newInfo.val.toString().split(",").join(',') === item2.toString().split(",").join(',')){//Se une toda la info (string), para comparar la info
                    var valStep = index2+1;//Se almacena en que posicion de "valData" es la coincidencia (valData > tiene las pocisiones de acuerdo a las instrucciones de los pasos)
                    $("#d_pxbentorno3dstepsbtns_"+valStep).addClass('d_pxbentorno3dstepsbtns_valida');//Agrega estilo de validado al paso que cumple con los requisitos
                    $("#d_pxbentorno3dstepsbtns_"+valStep).attr('name', "d_valida");//Agrega attr name para indicar que esta validado este paso
                    activeObj.push(item);//Si todos los items son validados, el objeto se almacena
                } 
            });
        }
        contActive = 0;//Conteo de pasos validados
        $("#d_pxbentorno3dsteps div").each(function(){//Busca los div que que esten dentro del pasos
            if($(this).attr("name") === "d_valida"){//Si tiene un nombre de validado
                contActive++;//Suma pasos validaos
            }
        });   
    }
}
var correctEnergy = true;//Almacena si la polaridad de energia esta correctamente
var nameEnergyfail;//Almacena el nombre del objeto mal conectado a energia
var samerowStatus = [];//Almacena si todos los objetos estan colocados en la misma columna de energia que el cableenergia
function energyObjects(item){
    //Detecta si los objetos estan colocados en la misma columna de energia que el cableenergia
    //item > objeto en curso.
    if(statusCableenergia){//Si hay cable de energia conectado
        if(item.name.split(" ")[1] != "pinPowerpos" && item.name.split(" ")[1] != "pinPowerneg"){//Objetos diferentes a cableenergia (cable energia ya esta en escenario)
            var getName;//Almacena nombre del objeto mal conectado a energia
            var statusWarning = false;//Valida si hay o no warning en el objeto
            item.newInfo.posEnergy.forEach(function(item3,index3){//Busca la posicion de energia de cada objeto
                if(item3 != null){//Si es diferente a null
                    console.log(item3);
                    if(item3 != powerData[0] && item3 != powerData[1]){//Si tiene dato de positivo o negativo solamente
                        getName = item.newInfo.name;//Almacena el nombre dol objeto mal conectado a energia
                        nameEnergyfail = item.newInfo.name;//Almacena el nombre del objeto mal conectado a energia (para validar al final de todos los pasos conectados)
                        statusWarning = true;//Valida que se pinte el warning del objeto
                        correctEnergy = false;//La polaridad de energia NO esta correctamente
                    }
                }
            });
            if(statusWarning){//Existe warning en el objeto
                if(item.name.split(" ")[1] === "pinA" || item.name.split(" ")[1] === "pinB"){//Si es jumper
                    if(item.name.split(" ")[1] === "pinA"){//Solo imprime 1 warning, ya que el pin A y pin B tienen el mismo dato en "newInfo.posEnergy"
                        //showWarning("energy",getName);//Muestra las advertencias sobre coneccion de energia de objetos
                        //samerowStatus.push(false);//Objetos NO estan conectados a la misma columna de energia que cableenergia
                    }
                }else{//Todos los demas objetos
                    //showWarning("energy",getName);//Muestra las advertencias sobre coneccion de energia de objetos
                    //samerowStatus.push(false);//Objetos NO estan conectados a la misma columna de energia que cableenergia
                }
            }
        }
    }
    
}
var samelineenergyStatus = [];//Almacena si los pines estan conectados en la misma linea de polaridad
function samelineEnergy(item){
    //Detecta si los pines del objeto estan en la misma linea de polaridad
    //item > objeto en curso.
    var statusLine = true;//Misma linea
    item.newInfo.coordLine.forEach(function(item2,index2){//Busca en cada objeto
        if(item.newInfo.coordLine[0] != item2 || item2 === null){//Estan conectados en diferente linea y estan dentro de margenes protoboard
            statusLine = false;//Diferente linea
        }
    });
    if(statusLine){//Conectados en la misma linea
        var statusArea = true;//Misma area
        item.newInfo.areaLimit.forEach(function(item3,index2){
            if(item.newInfo.areaLimit[0] != item3){//Estan conectados en diferente area
                statusArea = false;//Diferente area
            }
        });
        if(statusArea){//Conectados en la misma area
            if(item.name.split(" ")[1] === "pinA" || item.name.split(" ")[1] === "pinB" || item.name.split(" ")[1] === "pinPowerpos" || item.name.split(" ")[1] === "pinPowerneg"){//Si es jumper o cable energia
                if(item.name.split(" ")[1] === "pinA" || item.name.split(" ")[1] === "pinPowerpos"){//Solo imprime 1 warning, ya que el pin A y pin B tienen el mismo dato
                    console.log("CRSH");
                    showWarning("sameenergy",item.newInfo.name);//Muestra las advertencias sobre coneccion de energia de objetos
                    samelineenergyStatus.push(false);//Objetos NO estan conectados en la misma linea de polaridad
                }

            }else{//Todos los demas objetos
                console.log("CRSH");
                showWarning("sameenergy",item.newInfo.name);//Muestra las advertencias sobre coneccion de energia de objetos
                samelineenergyStatus.push(false);//Objetos NO estan conectados en la misma linea de polaridad
            }
        }
    }
    
}
var insideprotoboardStatus = [];//Almacena si los objetos estan dentro de la protoboard
function setObjects(item,type){
    //Posiciona los objetos en la protoboard, si estos estan en la posicion dentro de los margenes
    //item > objeto en curso. type > si se comprueban solo unos objetos, o todos
    var statusWarning = false;//Valida si hay o no warning en el objeto
    item.newInfo.posLimite.forEach(function(item1,index1){
        if(item1 === false){//Si tiene un false, es porque el objeto tiene un pin fuera de los limites
            statusWarning = true;//Valida que se pinte el warning del objeto
        }
    });
    if(statusWarning){//Existe warning en el objeto y no se puede colocar
        if(type === "all"){//Esto es porque esta funcion "setObjects();" viene de mover cada objeto cuando se selecciona, y de validar todos con PLAY. Los mensajes de warning solo aparecen si se validan desde btn de PLAY
            var alertName = item.newInfo.name;//Almacena el nombre del obj que no esta dentro de los margenes 
            if(item.name.split(" ")[1] === "pinA" || item.name.split(" ")[1] === "pinB" || item.name.split(" ")[1] === "pinPowerpos" || item.name.split(" ")[1] === "pinPowerneg"){//Si es jumper o cableenergia
                if(item.name.split(" ")[1] === "pinA" || item.name.split(" ")[1] === "pinPowerpos"){//Solo imprime 1 warning, ya que el pin A y pin B tienen el mismo dato en "newInfo.posLimite"
                    showWarning("position",alertName);//Muestra las advertencias sobre objetos
                    insideprotoboardStatus.push(false);//Existen objetos fuera de la protoboard
                }
            }else{//Todos los demas objetos
                showWarning("position",alertName);//Muestra las advertencias sobre objetos
                insideprotoboardStatus.push(false);//Existen objetos fuera de la protoboard
            }
        }
    }else{//El objeto de coloca en la protoboard
        var anima = new TWEEN.Tween(item.position)
        .to({
            y: -0.1//Posicion de objeto al colocarse
        },300)
        .easing(TWEEN.Easing.Quadratic.InOut).repeat(0).start();
    }
}
var crashpolarityStatus = true;//Almacena si los jumpers hacen corto
function validaJumpers(){
    //Valida que algun jumper no este conectado al + y - a la vez, en el mismo lugar que el cable energia
    crashpolarityStatus = true;//Almacena si los jumpers hacen corto
    var saveConectionpos;//Almacena donde esta conectado el cable eergia +
    var saveConectionneg;//Almacena donde esta conectado el cable eergia -
    scene.children.forEach(function(item,index){
        if(item.name.split(" ")[1] === "pinPowerpos"){//Cable de energia, solo 1 tiene ambos datos
            saveConectionpos = item.newInfo.usedLines[0];//Almacena donde esta conectado el cable eergia +
            saveConectionneg = item.newInfo.usedLines[1];//Almacena donde esta conectado el cable eergia -
        }
        if(item.name.split(" ")[1] === "pinA" || item.name.split(" ")[1] === "pinB"){//Pines de cable
            if(item.name.split(" ")[1] === "pinA"){//Solo toma en cuenta 1 pin
                if((item.newInfo.usedLines[0] === saveConectionpos && item.newInfo.usedLines[1] === saveConectionneg) || (item.newInfo.usedLines[0] === saveConectionneg && item.newInfo.usedLines[1] === saveConectionpos)){//Si el cable esta conectado a + y -, y en la misma posicion del cable energia y hace corto
                    console.log("CRASHHHHHHHHHH");
                    showWarning("choque","Cable");//Muestra las advertencias jumpers haciendo corto
                    crashpolarityStatus = false;//Jumpers hacen corto
                }
            } 
        }
    });
}
var conectenergyStatus = true;//Almacena si los cables de energia estan conectados a la protoboard
var polarutyenergyStatus = true;//Almacena si los cables de energia estan conectados a la protoboard en su respectiva linea de energia
function energyConected(){
    //Si la energia + y - esta conectada a las lineas + y - respectivamente de la protoboard
    var contEnergizer = false;//Almacena si hay o no, energia correctamente conectada
    conectenergyStatus = true;//Almacena si los cables de energia estan conectados a la protoboard
    polarutyenergyStatus = true;//Almacena si los cables de energia estan conectados a la protoboard en su respectiva linea de energia
    scene.children.forEach(function(item,index){//Busca elemento en escenario
        if(item.name.split(" ")[1] === "pinPowerneg" || item.name.split(" ")[1] === "pinPowerpos" || item.name.split(" ")[1] === "powerbank"){//Cable de energia y bateria en escena
            if(item.name.split(" ")[1] === "pinPowerneg" || item.name.split(" ")[1] === "pinPowerpos"){//Si es solo cable de energia
                if(item.newInfo.posEnergy[0] != null && item.newInfo.posEnergy[1] != null){//Cable de energia + y - esta conectado a la protoboard en energia
                    if(item.newInfo.posEnergy[0] != item.newInfo.posEnergy[1] && item.newInfo.posEnergy[0].split("")[1] != item.newInfo.posEnergy[1].split("")[1]){//Cable de energia esta conectado a la protoboard energia con diferente polaridad
                        contEnergizer = true;//Hay energia correctamente
                    }else{
                        contEnergizer = false;//No hay energia
                    }
                }else{
                    contEnergizer = false;//No hay energia
                }
            }
        }
    });
    if(contEnergizer === true){//Hay energia correctamente
        //console.log("ENERGY CONECTED");
        polarutyenergyStatus = true;//Los cables de energia SI estan conectados a la protoboard en su respectiva linea de energia
    }else{
        //console.log("SAME POLARITY");//Conectado a la misma polaridad
        showWarning("samepolarity","Cable energia");//Muestra las advertencias cable energia no esta conectado a la protoboard en su respectiva linea de energia
        polarutyenergyStatus = false;//Los cables de energia NO estan conectados a la protoboard en su respectiva linea de energia
    }
}
var groupInd;//Grupo donde se guardan los indicadores
var insideTarget = false;//Guarda de los indicadores estan dentro de los margenes de la protoboard
var areaLocate = "none";//Almacena el area en donde se encuantra el pin
var saveCableval = [];//Almacena temporalmente las posiciones de energia 0 y 1 del pin B (cableenergia)
var saveCableenergy = [];//Almacena temporalmente las posiciones 1 y 2 del pin B (cableenergia)
var incNum;//Posicion en que se agregan los datos de coordenadas en newInfo (posicion 0 es el nombre del objeto)
var contCableenergy = false;
var contPines = 0;
function addIndicador(getObject){
    //Agrega indicador de objetos
    
    var getData = getObject.getObjectByName("data");//Obtiene los objetos del grupo, para saber su posicion de cada pin
    
    var getcenterposX = Number(getData.children[0].getWorldPosition(new THREE.Vector3()).x.toFixed(3));//Posicion X del centro del objeto
    var getcenterposY = 0.4;//Posicion Y estandar
    var getcenterposZ = Number(getData.children[0].getWorldPosition(new THREE.Vector3()).z.toFixed(3));//Posicion Z del centro del objeto
    var pincenterColor = 0x20e300;//Color para el indicador del centro del objeto y puntos de pines
    var pinlineColor = 0xe3cb00;//Color para los indicadores de linea de referencia respecto al pin centro o extras
    var positiveColor = 0xff0000;//Color para los indicadores de energia positiva
    var negativeColor = 0x000000;//Color para los indicadores de energia negativa
    
    groupInd = new THREE.Group();//Crea grupo de indicadores
    groupInd.name = "grl groupInd";//Nombre de grupo de indicadores 
    
    getObject.newInfo.posLimite = [];//Limpia los limites al seleccionar cada objeto (al inicio trae valores default)
    getObject.newInfo.areaLimit = [];//Limpia los limites al seleccionar cada objeto (al inicio trae valores default)
    getObject.newInfo.coordLine = [];//Limpia en que linea esta los pines "A,B,C..."
    getObject.newInfo.usedLines = [];
    
    //console.log(getcenterposX);
    //saveInd = [[null,null]];
    
    incNum = 0;//Resetea inicio de posicion para guardar coordenadas en newInfo (posicion 0 es el nombre del objeto)
    contPines = 0;
    
    contCableenergy = false;//Indica que SI va a entrar al pin A, pero al pin B NO (cableenergia)
    saveCableval = [];//Almacena temporalmente las posiciones de energia 0 y 1 del pin B (cableenergia)
    saveCableenergy = [];//Almacena temporalmente las posiciones 1 y 2 del pin B (cableenergia)
    
    areaLocate = "none";//Almacena el area en donde se encuantra el pin
    
    calcInside(getcenterposX,getcenterposZ);//Calcula si los indicadores que se crean, estan dentro de los margenes de la protoboard
    getCoordinates(getcenterposX,getcenterposZ,"coorA",getObject);//Obtiene las coordenadas de pinA
    addPoints(getcenterposX,getcenterposZ);//Indicador de pin central
    addEnergy(getcenterposX,getcenterposZ);//Indicadores de energia del centro del objeto
    addExtras(getcenterposX,getcenterposZ);//Fila de indicadores referencia
    areaPin(getcenterposX,getcenterposZ);//Determina en que area esta cada pin del objeto
    statusPos();//Determina si el objeto esta dentro de los margenes para que se pueda conectar en la protoboard
    
    var saveAreapin1 = areaLocate;//Se almacena en que area se encuentra el pin 1 (principal)
    
    if(getpinA || getpinB){//Agrega indicadores a jumper, en los dos pines

        var get1posX = Number(pinbGrl.getWorldPosition(new THREE.Vector3()).x.toFixed(3));//Posicion X del segundo pin del objeto
        var get1posZ = Number(pinbGrl.getWorldPosition(new THREE.Vector3()).z.toFixed(3));//Posicion Z del segundo pin del objeto

        calcInside(get1posX,get1posZ);//Calcula si los indicadores que se crean, estan dentro de los margenes de la protoboard
        getCoordinates(get1posX,get1posZ,"coorB",getObject);//Obtiene las coordenadas de pinB
        addPoints(get1posX,get1posZ);//Indicador de pin central
        addEnergy(get1posX,get1posZ);//Indicadores de energia
        addExtras(get1posX,get1posZ);//Fila de indicadores referencia
        areaPin(get1posX,get1posZ);//Determina en que area esta cada pin del objeto
        statusPos();//Determina si el objeto esta dentro de los margenes para que se pueda conectar en la protoboard
    }
    else if(getpinpowerA || getpinpowerB){//Agrega indicadores a cableenergia

        var get1posX = Number(pinbGrl.getWorldPosition(new THREE.Vector3()).x.toFixed(3));//Posicion X del segundo pin del objeto
        var get1posZ = Number(pinbGrl.getWorldPosition(new THREE.Vector3()).z.toFixed(3));//Posicion Z del segundo pin del objeto

        calcInside(get1posX,get1posZ);//Calcula si los indicadores que se crean, estan dentro de los margenes de la protoboard
        getCoordinates(get1posX,get1posZ,"coorB",getObject);//Obtiene las coordenadas de pinB
        addPoints(get1posX,get1posZ);//Indicador de pin central
        addEnergy(get1posX,get1posZ);//Indicadores de energia
        addExtras(get1posX,get1posZ);//Fila de indicadores referencia
        areaPin(get1posX,get1posZ);//Determina en que area esta cada pin del objeto
        statusPos();//Determina si el objeto esta dentro de los margenes para que se pueda conectar en la protoboard
    }
    else{//Si no es jumper, se agregan mas indicadores (empezando por el segundo indicador)
        
        var get2posX = Number(getData.children[1].getWorldPosition(new THREE.Vector3()).x.toFixed(3));//Posicion X del punto 1 del objeto
        var get2posZ = Number(getData.children[1].getWorldPosition(new THREE.Vector3()).z.toFixed(3));//Posicion Z del punto 1 del objeto

        calcInside(get2posX,get2posZ);//Calcula si los indicadores que se crean, estan dentro de los margenes de la protoboard
        getCoordinates(get2posX,get2posZ,"coorB",getObject);//Obtiene las coordenadas de pinB
        addPoints(get2posX,get2posZ);//Indicador de pin central
        addEnergy(get2posX,get2posZ);//Indicadores de energia
        addExtras(get2posX,get2posZ);//Fila de indicadores referencia
        areaPin(get2posX,get2posZ);//Determina en que area esta cada pin del objeto
        statusPos();//Determina si el objeto esta dentro de los margenes para que se pueda conectar en la protoboard
        
        if(getObject.name.split(" ")[1] === "rgb" || getObject.name.split(" ")[1] === "switch" || getObject.name.split(" ")[1] === "preset" || getObject.name.split(" ")[1] === "pushbutton" || getObject.name.split(" ")[1] === "ultrasonic"){//Se agrega tercer indicador
            var get3posX = Number(getData.children[2].getWorldPosition(new THREE.Vector3()).x.toFixed(3));//Posicion X del punto 1 del objeto
            var get3posZ = Number(getData.children[2].getWorldPosition(new THREE.Vector3()).z.toFixed(3));//Posicion Z del punto 1 del objeto

            calcInside(get3posX,get3posZ);//Calcula si los indicadores que se crean, estan dentro de los margenes de la protoboard
            getCoordinates(get3posX,get3posZ,"coorC",getObject);//Obtiene las coordenadas de pinC
            addPoints(get3posX,get3posZ);//Indicador de pin central
            addEnergy(get3posX,get3posZ);//Indicadores de energia
            addExtras(get3posX,get3posZ);//Fila de indicadores referencia
            areaPin(get3posX,get3posZ);//Determina en que area esta cada pin del objeto
            statusPos();//Determina si el objeto esta dentro de los margenes para que se pueda conectar en la protoboard
        }
        if(getObject.name.split(" ")[1] === "rgb" || getObject.name.split(" ")[1] === "switch" || getObject.name.split(" ")[1] === "pushbutton" || getObject.name.split(" ")[1] === "ultrasonic"){ //Se agrega cuarto indicador
            var get4posX = Number(getData.children[3].getWorldPosition(new THREE.Vector3()).x.toFixed(3));//Posicion X del punto 1 del objeto
            var get4posZ = Number(getData.children[3].getWorldPosition(new THREE.Vector3()).z.toFixed(3));//Posicion Z del punto 1 del objeto

            calcInside(get4posX,get4posZ);//Calcula si los indicadores que se crean, estan dentro de los margenes de la protoboard
            getCoordinates(get4posX,get4posZ,"coorD",getObject);//Obtiene las coordenadas de pinD
            addPoints(get4posX,get4posZ);//Indicador de pin central
            addEnergy(get4posX,get4posZ);//Indicadores de energia
            addExtras(get4posX,get4posZ);//Fila de indicadores referencia
            areaPin(get4posX,get4posZ);//Determina en que area esta cada pin del objeto
            statusPos();//Determina si el objeto esta dentro de los margenes para que se pueda conectar en la protoboard
        }
        if(getObject.name.split(" ")[1] === "switch"){ //Se agrega cuarto indicador
            var get5posX = Number(getData.children[4].getWorldPosition(new THREE.Vector3()).x.toFixed(3));//Posicion X del punto 1 del objeto
            var get5posZ = Number(getData.children[4].getWorldPosition(new THREE.Vector3()).z.toFixed(3));//Posicion Z del punto 1 del objeto

            calcInside(get5posX,get5posZ);//Calcula si los indicadores que se crean, estan dentro de los margenes de la protoboard
            getCoordinates(get5posX,get5posZ,"coorE",getObject);//Obtiene las coordenadas de pinD
            addPoints(get5posX,get5posZ);//Indicador de pin central
            addEnergy(get5posX,get5posZ);//Indicadores de energia
            addExtras(get5posX,get5posZ);//Fila de indicadores referencia
            areaPin(get5posX,get5posZ);//Determina en que area esta cada pin del objeto
            statusPos();//Determina si el objeto esta dentro de los margenes para que se pueda conectar en la protoboard
        }
        if(getObject.name.split(" ")[1] === "switch"){ //Se agrega cuarto indicador
            var get6posX = Number(getData.children[5].getWorldPosition(new THREE.Vector3()).x.toFixed(3));//Posicion X del punto 1 del objeto
            var get6posZ = Number(getData.children[5].getWorldPosition(new THREE.Vector3()).z.toFixed(3));//Posicion Z del punto 1 del objeto

            calcInside(get6posX,get6posZ);//Calcula si los indicadores que se crean, estan dentro de los margenes de la protoboard
            getCoordinates(get6posX,get6posZ,"coorF",getObject);//Obtiene las coordenadas de pinD
            addPoints(get6posX,get6posZ);//Indicador de pin central
            addEnergy(get6posX,get6posZ);//Indicadores de energia
            addExtras(get6posX,get6posZ);//Fila de indicadores referencia
            areaPin(get6posX,get6posZ);//Determina en que area esta cada pin del objeto
            statusPos();//Determina si el objeto esta dentro de los margenes para que se pueda conectar en la protoboard
        }
        if(getObject.name.split(" ")[1] === "switch"){ //Se agrega cuarto indicador
            var get7posX = Number(getData.children[6].getWorldPosition(new THREE.Vector3()).x.toFixed(3));//Posicion X del punto 1 del objeto
            var get7posZ = Number(getData.children[6].getWorldPosition(new THREE.Vector3()).z.toFixed(3));//Posicion Z del punto 1 del objeto

            calcInside(get7posX,get7posZ);//Calcula si los indicadores que se crean, estan dentro de los margenes de la protoboard
            getCoordinates(get7posX,get7posZ,"coorG",getObject);//Obtiene las coordenadas de pinD
            addPoints(get7posX,get7posZ);//Indicador de pin central
            addEnergy(get7posX,get7posZ);//Indicadores de energia
            addExtras(get7posX,get7posZ);//Fila de indicadores referencia
            areaPin(get7posX,get7posZ);//Determina en que area esta cada pin del objeto
            statusPos();//Determina si el objeto esta dentro de los margenes para que se pueda conectar en la protoboard
        }
        if(getObject.name.split(" ")[1] === "switch"){ //Se agrega cuarto indicador
            var get8posX = Number(getData.children[7].getWorldPosition(new THREE.Vector3()).x.toFixed(3));//Posicion X del punto 1 del objeto
            var get8posZ = Number(getData.children[7].getWorldPosition(new THREE.Vector3()).z.toFixed(3));//Posicion Z del punto 1 del objeto

            calcInside(get8posX,get8posZ);//Calcula si los indicadores que se crean, estan dentro de los margenes de la protoboard
            getCoordinates(get8posX,get8posZ,"coorH",getObject);//Obtiene las coordenadas de pinD
            addPoints(get8posX,get8posZ);//Indicador de pin central
            addEnergy(get8posX,get8posZ);//Indicadores de energia
            addExtras(get8posX,get8posZ);//Fila de indicadores referencia
            areaPin(get8posX,get8posZ);//Determina en que area esta cada pin del objeto
            statusPos();//Determina si el objeto esta dentro de los margenes para que se pueda conectar en la protoboard
        }
    }
    function addEnergy(x,z){
        //Indicadores de energia
        if(insideTarget){//Dentro del area de pines
            if((areaLocate === "energyA") || (areaLocate === "energyB")){//Energy
                var baseInd = -7.5;
                var incInd = 0.25;
                for(var j=0; j<=9; j++){
                    for(var i=0; i<=4; i++){
                        if((z === 2.125) || (z === -2.375)){//Energy negative
                            newInd = new classaddInd((baseInd+incInd),getcenterposY,z,negativeColor,0.3,"pCneg",0);
                            newInd.creaInd();
                        }
                        if((z === 2.375) || (z === -2.125)){//Energy positive
                            newInd = new classaddInd((baseInd+incInd),getcenterposY,z,positiveColor,0.3,"pCpos",0);
                            newInd.creaInd();
                        }
                        baseInd = baseInd+incInd;//Incrementa espacios entre pines
                    }
                    baseInd = baseInd+incInd;//Incrementa espacios entre pines
                }
            }
        }
    }
    function addPoints(x,z){
        //Indicadores de pines centrales
        if(insideTarget){//Dentro del area de pines
            newInd = new classaddInd(x,getcenterposY,z,pincenterColor,1,"p1",0);
            newInd.creaInd();
        }
    }
    function addExtras(x,z){
        //Fila de indicadores extras
        if(insideTarget){//Dentro del area de pines
            if(areaLocate === "conectA"){//Area A
                var baseInd = 0.125;
                var incInd = 0.25;
                for(i=0; i<=4; i++){
                    newInd = new classaddInd(x,getcenterposY,(baseInd+incInd),pinlineColor,0.3,"p1ext",0);
                    newInd.creaInd();
                    baseInd = baseInd+incInd;//Incrementa espacios entre pines
                }
            }
            if(areaLocate === "conectB"){//Area B
                var baseInd = -0.125;
                var incInd = 0.25;
                for(i=0; i<=4; i++){
                    newInd = new classaddInd(x,getcenterposY,(baseInd-incInd),pinlineColor,0.3,"p1ext",0);
                    newInd.creaInd();
                    baseInd = baseInd-incInd;//Incrementa espacios entre pines
                }
            }
        }
    }
    
    function areaPin(){
        //Determina en que area esta cada pin del objeto
        if(areaLocate != "none"){//Esta dentro de los margenes de la protoboard
            getObject.newInfo.areaLimit.push(areaLocate);//El pin esta dentro de los margenes
        }else{
            getObject.newInfo.areaLimit.push("none");//El pin esta fuera de los margenes
        }
        if(getpinA || getpinB || getpinpowerA || getpinpowerB){//Aplica solo en jumper y cableenergia
            pinbGrl.newInfo.areaLimit = getObject.newInfo.areaLimit;//El pin B tiene la misma info que pin A
        }
    }
    function statusPos(){
        //Determina si el objeto esta dentro de los margenes para que se pueda conectar en la protoboard
        if(areaLocate != "none"){//Esta dentro de los margenes de la protoboard
            getObject.newInfo.posLimite.push(true);//El pin esta dentro de los margenes
        }else{
            getObject.newInfo.posLimite.push(false);//El pin esta fuera de los margenes
        }
        if(getpinA || getpinB || getpinpowerA || getpinpowerB){//Aplica solo en jumper y cableenergia
            pinbGrl.newInfo.posLimite = getObject.newInfo.posLimite;//El pin B tiene la misma info que pin A en posicion limite
        }
    }
}
function calcInside(x,z){
    //Calcula si pines de objeto esta de los margenes de la protoboard
    var pointNot = [-7.75,-7.5,-6,-4.5,-3,-1.5,0,1.5,3,4.5,6,7.5,7.75];//Array de puntos intercalados de energia
    if(((z >= 0.375 && z <= 1.375) || (z <= -0.375 && z >= -1.375)) && (x >= -7.75 && x <= 7.75)){//Dentro de campos de conexion
        if(z >= 0.375 && z <= 1.375){//Lado A de la protoboard
            areaLocate = "conectA";//Se encuentra en coneccion A
        }
        if(z <= -0.375 && z >= -1.375){//Lado B de la protoboard
            areaLocate = "conectB";//Se encuentra en coneccion B
        }
        insideTarget = true;//Los indicadores estan dentro de los margenes de la protoboard
    }else if(((z >= 2.125 && z <= 2.375) || (z <= -2.125 && z >= -2.375)) && (x >= -7.75 && x <= 7.75)){//Dentro de campos de energia
        if(z >= 2.125 && z <= 2.375){//Lado A de la protoboard
            areaLocate = "energyA";//Se encuentra en energia A
        }
        if(z <= -2.125 && z >= -2.375){//Lado B de la protoboard
            areaLocate = "energyB";//Se encuentra en energia B
        }
        insideTarget = true;//Los indicadores estan dentro de los margenes de la protoboard
    }else if(z === 3.625 && x <= -1.25 && x >= -3){
        areaLocate = "digitalA";//Se encuentra en digital A
        insideTarget = true;//Los indicadores estan dentro de los margenes de la protoboard
    }else if(z === 3.625 && x <= -3.5 && x >= -5.75){
        areaLocate = "digitalB";//Se encuentra en digital B
        insideTarget = true;//Los indicadores estan dentro de los margenes de la protoboard
    }else if(z === 8.375 && x <= -1.25 && x >= -2.5){
        areaLocate = "analogIn";//Se encuentra en analog In
        insideTarget = true;//Los indicadores estan dentro de los margenes de la protoboard
    }else if(z === 8.375 && x <= -3 && x >= -4.75){
        areaLocate = "poweR";//Se encuentra en power
        insideTarget = true;//Los indicadores estan dentro de los margenes de la protoboard
    }else{//Fuera de los limites de protoboard
        areaLocate = "none";//Limpia area porque esta fuera de los margenes de la protoboard
        insideTarget = false;//Los indicadores estan fuera de los margenes de la protoboard
    }
    
    pointNot.forEach(function(item,index){//Recorre los puntos a evitar
        if(areaLocate === "energyA" || areaLocate === "energyB"){//Dentro del area de energia solamente
            if(x === item){//Si coincide con los puntos a evitar, no esta dentro de los margenes
                areaLocate = "none";//Limpia area porque esta fuera de los margenes de la protoboard
                insideTarget = false;//Los indicadores estan fuera de los margenes de la protoboard
            }
        }
    });
}
function getCoordinates(x,z,getPin,getObject){
    //Coordenadas de pines
    if(insideTarget){//Solo al area con pines
        var zPos = [8.375,3.625,2.375,2.125,1.375,1.125,0.875,0.625,0.375,-0.375,-0.625,-0.875,-1.125,-1.375,-2.125,-2.375];//Array de valores por posicion en columna
        var xPos = [-7.75,-7.5,-7.25,-7,-6.75,-6.5,-6.25,-6,-5.75,-5.5,-5.25,-5,-4.75,-4.5,-4.25,-4,-3.75,-3.5,-3.25,-3,-2.75,-2.5,-2.25,-2,-1.75,-1.5,-1.25,-1,-0.75,-0.5,-0.25,0,0.25,0.5,0.75,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.25,3.5,3.75,4,4.25,4.5,4.75,5,5.25,5.5,5.75,6,6.25,6.5,6.75,7,7.25,7.5,7.75];//Array de valores por posicion en fila
        var digitalXpos = [-1.25,-1.5,-1.75,-2,-2.25,-2.5,-2.75,-3,-3.5,-3.75,-4,-4.25,-4.5,-4.75,-5,-5.25,-5.5,-5.75];
        var zCoord = ["ANALOG IN","DIGITAL (PWM~)","(+)","(-)","A","B","C","D","E","F","G","H","I","J","(+)","(-)"];//Valores que se asignas de acuerdo a la posicion
        var xCoord = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63];//Valores que se asignas de acuerdo a la posicion
        var digitalCoord = [null,null,null,null,null,null,null,null,"17","16","AREF","GND","13","12","~11","~10","~9","8",null,"7","~6","~5","4","~3","2","TX ➝ 1","RX ← 0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];//Valores de digital
        //var digitalCoord = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","GND","AREF","16","17"];//Valores de digital
        var analoginCoord = ["A0","A1","A2","A3","A4","A5"];//Valores de analogo
        var powerCoord = ["Vin","GND","GND","5V","3.3V","RESET","IOREF"];//Valores power
        var getCoord = [];//Almacena los valores de x y y de cada pin
        zPos.forEach(function(item,index){//Recorre el array de posicion en columna
            if(item === z){//Un elemento del array "zPos" coincide con la posicion de un pin
                /*console.log(areaLocate);
                if(areaLocate === "digitalA"){
                    console.log("ENTRA");
                    getCoord.push(digitalCoord[index]);
                }else{*/
                    getCoord.push(zCoord[index]);//Se guarda el dato recuperado coordenada en z
                //}
                
                
            }
        });
        xPos.forEach(function(item,index){//Recorre el array de posicion en fila
            if(item === x){//Un elemento del array "xPos" coincide con la posicion de un pin
                
                if(areaLocate === "digitalA" || areaLocate === "digitalB"){
                    getCoord.push(digitalCoord[index]);
                }else{
                    getCoord.push(xCoord[index]);//Se guarda el dato recuperado coordenada en x
                }
            }
        });
        if(areaLocate === "conectA" || areaLocate === "conectB"){//Si no son energia, se agregan dos coordenadas (x,y)
            $(".d_"+getPin).show().find('span').text(getCoord[0]+","+getCoord[1]);//Muestra coordenadas en div
            getObject.newInfo.val[1][incNum] = getCoord[0]+"-"+getCoord[1];//Agrega coordenadas a newInfo
            getObject.newInfo.posEnergy[incNum] = null;//Se coloca null la referencia de polaridad, si no esta en "energia"
            getObject.newInfo.coordLine.push(getCoord[1]);//Agrega la linea en donde esta el pin
            
            if(areaLocate === "conectA"){
                var saveString = ["A-"+getCoord[1],"B-"+getCoord[1],"C-"+getCoord[1],"D-"+getCoord[1],"E-"+getCoord[1]];
                getObject.newInfo.usedLines.push(saveString.toString());
            }
            if(areaLocate === "conectB"){
                var saveString = ["F-"+getCoord[1],"G-"+getCoord[1],"H-"+getCoord[1],"I-"+getCoord[1],"J-"+getCoord[1]];
                getObject.newInfo.usedLines.push(saveString.toString());
            }
            
            if(getpinA || getpinB || getpinpowerA || getpinpowerB){//Aplica solo en jumper y cableenergia
                pinbGrl.newInfo.coordLine = getObject.newInfo.coordLine;//El pin B tiene la misma info que pin A
                pinbGrl.newInfo.usedLines = getObject.newInfo.usedLines;
            }
        }else if(areaLocate === "digitalA" || areaLocate === "digitalB" || areaLocate === "analogIn" || areaLocate === "poweR"){
            console.log("getCoord-------");
            console.log(getCoord);
            $(".d_"+getPin).show().find('span').text(getCoord[0]+", "+getCoord[1]);//Muestra coordenadas en div
        }else{//La energia se agrega solo una coordenada en x, porque en y no importa la posicion, ya que es negativo o positivo
            $(".d_"+getPin).show().find('span').text(getCoord[0]);//Muestra coordenadas en div
            getObject.newInfo.val[1][incNum] = getCoord[0];//Agrega coordenadas a newInfo
            //Info de polaridad
            if(areaLocate === "energyA"){//Esta en power A - Es para referencia de polaridad
                getObject.newInfo.posEnergy[incNum] = getCoord[0]+"A";//Agrega coordenadas  de polaridad a newInfo
                getObject.newInfo.coordLine.push(getCoord[0]+"A");//Agrega la linea en donde esta el pin
                var saveString = [getCoord[0]+"A"];
                getObject.newInfo.usedLines.push(saveString.toString());
            }else if(areaLocate === "energyB"){//Esta en power B - Es para referencia de polaridad
                getObject.newInfo.posEnergy[incNum] = getCoord[0]+"B";//Agrega coordenadas de polaridad a newInfo
                getObject.newInfo.coordLine.push(getCoord[0]+"B");//Agrega la linea en donde esta el pin
                var saveString = [getCoord[0]+"B"];
                getObject.newInfo.usedLines.push(saveString.toString());
            }else{
                getObject.newInfo.posEnergy[incNum] = null;//Se coloca null la referencia de polaridad, si no esta en "energia"
                getObject.newInfo.coordLine.push(null);//Agrega la linea en donde esta el pin
                getObject.newInfo.usedLines.push(null);
            }
            if(getpinA || getpinB || getpinpowerA || getpinpowerB){//Aplica solo en jumper y cableenergia
                pinbGrl.newInfo.posEnergy = getObject.newInfo.posEnergy;//El pin B tiene la misma info que pin A en polaridad
                pinbGrl.newInfo.coordLine = getObject.newInfo.coordLine;//El pin B tiene la misma info que pin A
                pinbGrl.newInfo.usedLines = getObject.newInfo.usedLines;
            }
        }
        incNum++;//Incrementa la posicion en "newInfo.val" para agregar coordenadas
        contPines++;
    }else{
        getObject.newInfo.val[1][incNum] = null;//Agrega null a coordenadas en newInfo
        getObject.newInfo.posEnergy[incNum] = null;//Se coloca null la referencia de polaridad, si no esta en "energia"
        getObject.newInfo.coordLine.push(null);//Agrega la linea en donde esta el pin
        getObject.newInfo.usedLines.push(null);
        incNum++;//Incrementa la posicion en "newInfo.val" para agregar coordenadas
        contPines++;
    }
    //Aplica para todas las posiciones
    if(getpinA || getpinB || getpinpowerA){//Aplica solo en jumper y pin A de cableenergia
        pinbGrl.newInfo.val = getObject.newInfo.val;//El pin B tiene la misma info que pin A
        pinbGrl.newInfo.posEnergy = getObject.newInfo.posEnergy;//El pin B tiene la misma info que pin A en polaridad
        pinbGrl.newInfo.coordLine = getObject.newInfo.coordLine;//El pin B tiene la misma info que pin A
        pinbGrl.newInfo.usedLines = getObject.newInfo.usedLines;
    }
    if(getpinpowerB && contCableenergy){//Aplica para cableenergia B y que sea el pin B (Esto es porque al seleccionar el B, los valores se invierten, y no deberia)
        //Info de posicion
        saveCableval.push(pinbGrl.newInfo.val[1][1]);//Almacena temporalmente la posicion de energia 2 del pin B
        saveCableval.push(pinbGrl.newInfo.val[1][0]);//Almacena temporalmente la posicion de energia 1 del pin B
        getObject.newInfo.val[1][0] = saveCableval[0];//Asigna la posicion de energia guardada temporalmente, pero de forma invertida (pin positivo va al inicio siempre)
        getObject.newInfo.val[1][1] = saveCableval[1];//Asigna la posicion de energia guardada temporalmente, pero de forma invertida (pin positivo va al inicio siempre)
        //Info de polaridad
        saveCableenergy.push(pinbGrl.newInfo.posEnergy[1]);//Almacena temporalmente la posicion 2 del pin B
        saveCableenergy.push(pinbGrl.newInfo.posEnergy[0]);//Almacena temporalmente la posicion 1 del pin B
        getObject.newInfo.posEnergy[0] = saveCableenergy[0];//Asigna la posicion guardada temporalmente, pero de forma invertida (pin positivo va al inicio siempre)
        getObject.newInfo.posEnergy[1] = saveCableenergy[1];//Asigna la posicion guardada temporalmente, pero de forma invertida (pin positivo va al inicio siempre)

        if(saveCableenergy[0] === null && saveCableenergy[1] != null){
            getObject.newInfo.usedLines[0] = saveCableenergy[0];
            getObject.newInfo.usedLines[1] = saveCableenergy[1].toString();
        }
        if(saveCableenergy[0] != null && saveCableenergy[1] === null){
            getObject.newInfo.usedLines[0] = saveCableenergy[0].toString();
            getObject.newInfo.usedLines[1] = saveCableenergy[1];
        }
        if(saveCableenergy[0] === null && saveCableenergy[1] === null){
            getObject.newInfo.usedLines[0] = saveCableenergy[0];
            getObject.newInfo.usedLines[1] = saveCableenergy[1];
        }
        if(saveCableenergy[0] != null && saveCableenergy[1] != null){
            getObject.newInfo.usedLines[0] = saveCableenergy[0].toString();
            getObject.newInfo.usedLines[1] = saveCableenergy[1].toString();
        }
    }
    contCableenergy = true;//Convierte a false, para que ya no entre en el pin B (cableenergia)
}

function removeIndicador(){
    /*
	* NOMBRE: removeIndicador.
	* UTILIDAD: Elimina indicador de objeto
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    scene.children.forEach(function(item,index){
        if(item.name === "grl groupInd"){//Busca grupo de indicadores
            scene.remove(item);//Elimina grupo de indicadores de la escena
        }
    })
    delete groupInd;//Elimina el objeto
    groupInd;//Limpia variable
    removeCoordinates();//Quita info de coordenadas
}
function removeCoordinates(){
    /*
	* NOMBRE: removeCoordinates.
	* UTILIDAD: Quita info de coordenadas
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    $(".d_coordtxt").hide();//Quita texto de coordenadas
}

var saveInd = [[null,null]];
var statusInd = false;

function classaddInd(posX,posY,posZ,color,opacity,name,num){
    //Crea indicadores
    this.creaInd = function(){
        this.clone = boxInd.clone();//Clona el gltf
        this.clone.position.set(posX,posY,posZ);
        this.clone.material = [{}];//Limpia material del clone
        this.clone.material = boxInd.material.clone();
        this.clone.material.color = new THREE.Color(color);//Asigna nuevo color
        this.clone.material.opacity = opacity;//Asigna nueva opacidad
        groupInd.add(this.clone);//Agrega los objetos al grupo
        scene.add(groupInd);
    }
}

var pinSwitchgetneg = [];//Almacena el pin del Switch, para ocuparlo al presionar los botones con checkbox
var saveenergyNeg = [];//Almacena todas las lineas de energia negativa
var temporaryEnergyneg = [[]];
var addnameObjsneg = [[]];//Almacena los nombres de los objetos que estan en linea de energia finales
function validarEnergyneg(){
    //Valida que los objetos tengan la energia negativa para activar (led, buzzer, rgb, etc.)
    
    temporaryEnergyneg = [[]];
    saveenergyNeg = [[]];//Almacena todas las lineas de energia negativa
    
    addnameObjsneg = [[]];//Almacena los nombres de los objetos que estan en linea de energia finales
    scene.children.forEach(function(item,index){//Busca los objetos en el escenario
        if(item.name.split(" ")[1] === "pinPowerneg"){//BUsca la energia negativa
            temporaryEnergyneg[0] = [item.newInfo.usedLines[1]];
            saveenergyNeg[0] = [item.newInfo.usedLines[01]];//Agrega la linea negativa
        }
    });
    
    
    //saveenergyNegnew = [[]];//Resetea las lineas de energia negativa finales
    //saveenergyNegnew[0] = saveenergyNeg[0];//Almacena la primer linea de energia del origen, a linea final
    
    //console.log("FIRS POSITIVE ENERGY");
    //console.log(saveenergyNeg);
    //console.log(temporaryEnergyneg);
    
    pinSwitchgetneg = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];//Resetea pin del Switch (solo de hace en energia negativa, porque es la primera que inicia. Si se resetea en positiva tambien, se borra lo guardado en negativo)

    
    var contSearch = 0;//Conteo de las veces que se ejecuta la funcion para buscar las lineas de energia
    
    var contLines = 0;
    
    //var saveindexEqual;//Almacena el la posicion del pin que coincide
    //var inPositive = false;//Almancena si hay un pin conectado que coincide a energia negativa
    //var saveItemsadd = [];//Almacena los pines que se van a agregar
    var saveallnameObjs = [];//Guarda nombre de objetos agregados
    var saveitemSwitch = [];
    
    //var contnewLines = 0;//Conteo de nuevas lineas de energia en positivo
    //var saveindexlineEqual = 0;//Almacena la posicion de la linea de energia en donde se almacenara los items del objeto
    
    var contNeg = 0;//Conteo para agregar linea de energia de objeto que choca con negativo
    
    
    
    var saveindexLine;//Almacena linea de energia donde se encuantra conectado el objeto en curso
    
    
    searchEnergy();//Busca los objetos que tienen energia
    function searchEnergy(){
        //Busca los objetos que tienen energia
        var contObjs = 0;//Conteo de objetos totales en escenario
        var conttPos = 0;//Conteo para agregar lineas de energia
        for(var i=0; i<=saveenergyNeg.length-1; i++){
            if(saveenergyNeg[i].length != 0){//Ya hay objeto agregado
                conttPos++;//Inicia conteo para agregar lineas de energia de objetos
            }
        }
        
        scene.children.forEach(function(item,index){//Busca todos los objetos en escenario
            if(item.name.split(" ")[0] != "grl" && item.name.split(" ")[0] != "null"){//Objetos que se mueven
                if(item.name.split(" ")[0] != "jumperPow" && item.name.split(" ")[0] != "jumper"){//No considera cables
                    if(item.name.split(" ")[1] != "pinPowerneg" && item.name.split(" ")[1] != "pinPowerpos"){//No considera cable energia
                        if(item.name.split(" ")[1] === "pinA" || item.name.split(" ")[1] === "pinB"){//Son cables
                            if(item.name.split(" ")[1] === "pinA"){//Solo agrega uno, porque A y B contienen la misma info
                                contObjs++;//Suma objetos en escenario
                            }
                        }else{
                            contObjs++;//Suma objetos en escenario
                        }
                    }
                }
            }
        });
        
        scene.children.forEach(function(item,index){//Busca todos los objetos en escenario
            if(item.name.split(" ")[0] != "grl" && item.name.split(" ")[0] != "null"){//Objetos que se mueven
                if(item.name.split(" ")[0] != "jumperPow" && item.name.split(" ")[0] != "jumper"){//No considera cables
                    if(item.name.split(" ")[1] != "pinPowerneg" && item.name.split(" ")[1] != "pinPowerpos"){//No considera cable energia
                        if(item.name.split(" ")[1] === "pinA" || item.name.split(" ")[1] === "pinB"){//Son cables
                            if(item.name.split(" ")[1] === "pinA"){//Solo agrega uno, porque A y B contienen la misma info
                                addenergyLines(item);//Agrega las nuevas lineas de energia negativa
                            }
                        }else{
                            addenergyLines(item);//Agrega las nuevas lineas de energia negativa
                        }
                    }
                }
            }
        });
        
        
        
        
        
        function addenergyLines(getObj){
            //Agrega las nuevas lineas de energia negativa
            //getObj > objeto en curso
            var saveindexEqual;//Almacena la posicion del pin que coincide
            var saveitemEqual;//Almacena los datos del pin que coincide
            var inPositive = false;//Resetea si hay un pin conectado que coincide a energia negativa
            var saveItemsadd = [];//Resetea los pines que se van a agregar
            var saveindexDifferent = [];//Almacena la posicion de los pines que son diferentes al que coincide
            var objConnected = false;//Almacena si hay objeto conectado
            var inNegative = false;//Resetea si hay un pin conectado que coincide a energia negativa
            
            
            var statusLastitem = false;//Indica que el item se guarda en la misma linea de energia
            var statusMiddleitem = false;//Indica que se crea una nueva linea de energia
            var statusLastindex;//Almacena el indice del ultimo item que coincide
            var statusMiddleindex;//Almacena el indice del item que coincide intermedio
            var saveitemsNew = [];//Almacena los items temporalmente previos, para formar la nueva linea de energia
            var saveitemsNewtemporary = [];//Almacena los items temporalmente previos de la linea temporal, para formar la nueva linea de energia
            
            var savenameObj;//Almacena el nombre del objeto en curso
            var saveMiddleitem;//Almacena el item de donde sale la nueva linea de energia
            
            var objnameEqual;//Almacena el nombre del objeto de donde parte hacia atras para copiar a la nueva linea de energia
            var savenamesNew = [];//Almacena los nombres de los objetos que se van a copiar a la nueva linea de energia
            
            var allowObj = true;//Determina si un objeto continua agregando info, ya que contiene un warning que no permitiria creae correctamente la linea de energia
            
            var statusIn = true;//Indicador para que switch y todos los componentes entren una linea de comparacion a la vez
            
            console.log("----------------------------------- "+getObj.name);
            getObj.newInfo.usedLines.forEach(function(item2,index2){//Busca la posicion del pin que coincide por objeto
                saveenergyNeg.forEach(function(item3,index3){//Busca la linea de energia en negativa
                    item3.forEach(function(item4,index4){//Busca los pines guardados en energia negativa
                        
                        if(item2 === item4 && statusIn === true){//Si un item de la linea de energia positiva incluye un pin del objeto, y es la primera vez que entra esa linea
                            console.log("-------PIN COINCIDE "+getObj.name+" ++++++++");
                            var statusSwitchin = false;//Status para saber si entra o no la info del switch
                            if(getObj.name.split(" ")[1] === "switch"){//Si es un Switch
                                if(saveitemSwitch.includes(item2) === false){//Si un item de "saveitemSwitch" NO incluye un pin del objeto

                                    console.log("saveallnameObjs!!!!!!!!!!!!!!!!!!!!!!");
                                    console.log(saveallnameObjs);
                                    console.log(getObj.name+" *********//////////------------");
                                    console.log(item2);

                                    console.log("index del switch "+index2);
                                    if(index2 === 0){
                                        saveitemSwitch.push(getObj.newInfo.usedLines[0]);
                                        saveitemSwitch.push(getObj.newInfo.usedLines[4]);
                                    }
                                    if(index2 === 1){
                                        saveitemSwitch.push(getObj.newInfo.usedLines[1]);
                                        saveitemSwitch.push(getObj.newInfo.usedLines[5]);
                                    }
                                    if(index2 === 2){
                                        saveitemSwitch.push(getObj.newInfo.usedLines[2]);
                                        saveitemSwitch.push(getObj.newInfo.usedLines[6]);
                                    }
                                    if(index2 === 3){
                                        saveitemSwitch.push(getObj.newInfo.usedLines[3]);
                                        saveitemSwitch.push(getObj.newInfo.usedLines[7]);
                                    }
                                    if(index2 === 4){
                                        saveitemSwitch.push(getObj.newInfo.usedLines[4]);
                                        saveitemSwitch.push(getObj.newInfo.usedLines[0]);
                                    }
                                    if(index2 === 5){
                                        saveitemSwitch.push(getObj.newInfo.usedLines[5]);
                                        saveitemSwitch.push(getObj.newInfo.usedLines[1]);
                                    }
                                    if(index2 === 6){
                                        saveitemSwitch.push(getObj.newInfo.usedLines[6]);
                                        saveitemSwitch.push(getObj.newInfo.usedLines[2]);
                                    }
                                    if(index2 === 7){
                                        saveitemSwitch.push(getObj.newInfo.usedLines[7]);
                                        saveitemSwitch.push(getObj.newInfo.usedLines[3]);
                                    }
                                    console.log("INNNNNNNNNNNNNNNN");
                                    console.log(getObj.name);
                                    console.log(saveitemSwitch);

                                    statusSwitchin = true;//Si entra info switch

                                }
                            }



                            if(getObj.name.split(" ")[1] != "switch" || statusSwitchin === true){//Entran todos los componentes, menos el switch, a excepcion de que si cumpla con la info de la anterior validacion

                                if(saveallnameObjs.includes(getObj.name) === false){//Si el objeto no esta agregado

                                    if(getObj.name.split(" ")[1] != "switch"){//Si es Switch NO se almacena, para que siga entrando al conteo y buscar mas conecicones
                                        saveallnameObjs.push(getObj.name);//Agrega nombre del objeto que coincide
                                    }

                                    saveindexEqual = index2;//Index del pin que esta conectado
                                    saveitemEqual = item2;//Item del pin que esta conectado
                                    inNegative = true;//Si hay un pin conectado que coincide a energia negativa
                                    objConnected = true;//Si hay objeto conectado

                                    saveindexLine = index3;//Linea de energia donde se encuantra conectado el objeto en curso

                                    if(item2 === item3[item3.length-1].toString()){//Si el item del objeto es igual al ultimo item de la linea de energia (esto es para agregarlo a la misma linea de energia)
                                        statusLastitem = true;//Indica que el item se guarda en la misma linea de energia
                                        statusLastindex = item3.length-1;//Almacena el indice del ultimo item que coincide
                                    }else{
                                        statusMiddleitem = true;//Indica que se crea una nueva linea de energia
                                        statusMiddleindex = index4;//Almacena el indice del item que coincide intermedio
                                        saveitemsNew = item3.slice(0, statusMiddleindex+1);//Almacena los items temporalmente previos, para formar la nueva linea de energia
                                        saveitemsNewtemporary = item3.slice(0, statusMiddleindex+1);//Almacena los items temporalmente previos de la linea temporal, para formar la nueva linea de energia. Esto es porque se esta igualando va variable y se tiene que almacenar de forma independiente

                                        saveMiddleitem = item4;//Almacena el item de donde sale la nueva linea de energia
                                    }
                                    savenameObj = getObj.name;//Almacena el nombre del objeto en curso
                                    
                                    statusIn = false;//Ya entro una vez la linea de energia, y ahora hasta que cambie el objeto

                                }
                            }

                        }

                        
                    }); 
                });
            });
            
            
            if(getObj.name.split(" ")[1] === "led" || getObj.name.split(" ")[1] === "rgb" || getObj.name.split(" ")[1] === "buzzer" || getObj.name.split(" ")[1] === "rgbc" || getObj.name.split(" ")[1] === "ultrasonic"){//Objetos que rompen ciclo de energia positiva a negativa / ultrasonico la rompe, pero ocupa de arduino
                inNegative = false;
                objConnected = false;
            }
            
            if(objConnected){//Hay un objeto conectado y se Obtienen las posiciones de los pines que se van a agregar
                //console.log("LINEAS CONECTADAS A "+getObj.name);

                //console.log("pinindexEqual = "+saveindexEqual);
                getObj.newInfo.pinDifferent = [];
                //getObj.newInfo.pinConected = {energizedLine:[],pinObj:[]};
                if(getObj.newInfo.val[0] === "Interruptor"){//Switch, tiene varios pines
                    
                    
                    switch(saveindexEqual){//Casos para el pin index entrada
                        case 0://Pin index entrada
                            saveindexDifferent.push(4);//Pin index salida
                            getObj.newInfo.pinDifferent.push(4);//Guarda pin index salida en objeto
                            pinSwitchgetneg[saveindexLine].push(1);//Almacena el pin que tiene energia, para validarlo al presionar un btn del switch
                            break;
                        case 1://Pin index entrada
                            saveindexDifferent.push(5);//Pin index salida
                            getObj.newInfo.pinDifferent.push(5);//Guarda pin index salida en objeto
                            pinSwitchgetneg[saveindexLine].push(2);//Almacena el pin que tiene energia, para validarlo al presionar un btn del switch
                            break;
                        case 2://Pin index entrada
                            saveindexDifferent.push(6);//Pin index salida
                            getObj.newInfo.pinDifferent.push(6);//Guarda pin index salida en objeto
                            pinSwitchgetneg[saveindexLine].push(3);//Almacena el pin que tiene energia, para validarlo al presionar un btn del switch
                            break;
                        case 3://Pin index entrada
                            saveindexDifferent.push(7);//Pin index salida
                            getObj.newInfo.pinDifferent.push(7);//Guarda pin index salida en objeto
                            pinSwitchgetneg[saveindexLine].push(4);//Almacena el pin que tiene energia, para validarlo al presionar un btn del switch
                            break;
                        case 4://Pin index entrada
                            saveindexDifferent.push(0);//Pin index salida
                            getObj.newInfo.pinDifferent.push(0);//Guarda pin index salida en objeto
                            pinSwitchgetneg[saveindexLine].push(1);//Almacena el pin que tiene energia, para validarlo al presionar un btn del switch
                            break;
                        case 5://Pin index entrada
                            saveindexDifferent.push(1);//Pin index salida
                            getObj.newInfo.pinDifferent.push(1);//Guarda pin index salida en objeto
                            pinSwitchgetneg[saveindexLine].push(2);//Almacena el pin que tiene energia, para validarlo al presionar un btn del switch
                            break;
                        case 6://Pin index entrada
                            saveindexDifferent.push(2);//Pin index salida
                            getObj.newInfo.pinDifferent.push(2);//Guarda pin index salida en objeto
                            pinSwitchgetneg[saveindexLine].push(3);//Almacena el pin que tiene energia, para validarlo al presionar un btn del switch
                            break;
                        case 7://Pin index entrada
                            saveindexDifferent.push(3);//Pin index salida
                            getObj.newInfo.pinDifferent.push(3);//Guarda pin index salida en objeto
                            pinSwitchgetneg[saveindexLine].push(4);//Almacena el pin que tiene energia, para validarlo al presionar un btn del switch
                            break;
                        default:
                            break;
                    }
                    
                }else if(getObj.newInfo.val[0] === "Potenciómetro"){//Preset, tiene varios pines y secuancia de + a -
                    getObj.newInfo.onpresetData = [];
                    switch(saveindexEqual){//Casos para el pin index entrada
                        case 0://Pin index entrada
                            saveindexDifferent.push(2);//Pin index salida
                            getObj.newInfo.pinDifferent.push(2);//Guarda pin index salida en objeto
                            break;
                        case 1://Pin index entrada
                            saveindexDifferent.push(2);//Pin index salida
                            getObj.newInfo.pinDifferent.push(2);//Guarda pin index salida en objeto
                            break;
                        case 2://Pin index entrada
                            saveindexDifferent.push(0,1);//Pin index salida
                            getObj.newInfo.pinDifferent.push(0,1);//Guarda pin index salida en objeto
                            break;
                        default:
                            break;
                    }
                }else if(getObj.newInfo.val[0] === "Botón"){//Button, tiene varios pines y secuancia de + a -
                    getObj.newInfo.onpresetData = [];
                    switch(saveindexEqual){//Casos para el pin index entrada
                        case 0://Pin index entrada
                            saveindexDifferent.push(1,3);//Pin index salida
                            getObj.newInfo.pinDifferent.push(1,3);//Guarda pin index salida en objeto
                            break;
                        case 1://Pin index entrada
                            saveindexDifferent.push(0,2);//Pin index salida
                            getObj.newInfo.pinDifferent.push(0,2);//Guarda pin index salida en objeto
                            break;
                        case 2://Pin index entrada
                            saveindexDifferent.push(3,2);//Pin index salida
                            getObj.newInfo.pinDifferent.push(3,2);//Guarda pin index salida en objeto
                            break;
                        case 3://Pin index entrada
                            saveindexDifferent.push(2,0);//Pin index salida
                            getObj.newInfo.pinDifferent.push(2,0);//Guarda pin index salida en objeto
                            break;
                        default:
                            break;
                    }
                }else if(getObj.newInfo.val[0] === "Resistencia"){//LED, tiene una sola salida de + a -
                    
                    if(getObj.newInfo.tooltipData.includes("Ohms") === true){
                        showWarning("colorofresistor",getObj.newInfo.val[0]);//Muestra las advertencias sobre valor de resistencia
                        allowObj = false;//Determina que el objeto NO continua agregando info, ya que contiene un warning que no permitiria creae correctamente la linea de energia
                    }
                    
                    switch(saveindexEqual){//Casos para el pin index entrada
                        case 0://Pin index entrada
                            saveindexDifferent.push(1);//Pin index salida
                            getObj.newInfo.pinDifferent.push(1);//Guarda pin index salida en objeto
                            break;
                        case 1://Pin index entrada
                            saveindexDifferent.push(0);//Pin index salida
                            getObj.newInfo.pinDifferent.push(0);//Guarda pin index salida en objeto
                            break;
                        default:
                            break;
                    }
                }else if(getObj.newInfo.val[0] === "Ultrasónico"){//Ultrasonico, tiene 1 pin en negativo solamente

                    switch(saveindexEqual){//Casos para el pin index entrada
                        case 3://Pin index entrada
                            saveindexDifferent.push(0,1,2);//Pin index salida
                            getObj.newInfo.pinDifferent.push(0,1,2);//Guarda pin index salida en objeto
                            break;
                        case 2://Pin index entrada
                        case 1://Pin index entrada
                        case 0://Pin index entrada
                            //console.log("ULTRASONIC NO CONECTADO CORECTAMENTE DE + a -");
                            showWarning("positivetonegative",getObj.newInfo.val[0]);//Muestra las advertencias sobre coneccion de energia de objetos de + a -
                            allowObj = false;//Determina que el objeto NO continua agregando info, ya que contiene un warning que no permitiria creae correctamente la linea de energia
                            break;
                        default:
                            break;
                    }
                }else{//Cable, etc. No importa la polaridad de (+ a -) o (- a +)
                    switch(saveindexEqual){//Casos para el pin index entrada
                        case 0://Pin index entrada
                            saveindexDifferent.push(1);//Pin index salida
                            getObj.newInfo.pinDifferent.push(1);//Guarda pin index salida en objeto
                            break;
                        case 1://Pin index entrada
                            saveindexDifferent.push(0);//Pin index salida
                            getObj.newInfo.pinDifferent.push(0);//Guarda pin index salida en objeto
                            break;
                        default:
                            break;
                    }
                }
                //console.log("NOMBRE = "+getObj.name);
                
                //console.log("indexDifferent = ");
                //console.log(saveindexDifferent);
            }

            
            
            if(inNegative && allowObj){//Si hay pines de un objeto conectado a la linea de energia negativa y NO hay algun warning al agregar objetos
                console.log("***ENTRA NEGATIVO "+getObj.name);
                
                if(statusLastitem){//Agrega
                    console.log("((((( MISMA LINEA )))))");
                    //console.log(statusLastitem);
                    console.log("LAST INDEX "+statusLastindex);
                }
                if(statusMiddleitem){//Se agrega una linea nueva, con info de un componente de esa linea
                    console.log("((((( LINEA NUEVA )))))");
                    //console.log(statusMiddleitem);
                    console.log("MIDDLE INDEX "+statusMiddleindex);
                    //console.log(saveitemsNew);
                    addnameObjsneg.push([]);//Agrega nueva linea de nombres
                    findNamelines();//Encuentra los items que se van a agregar a la nueva linea de energia
                    saveindexLine = saveenergyNeg.length;//Se aumenta para crear una nueva linea de energia
                    temporaryEnergyneg.push(saveitemsNewtemporary);
                    saveenergyNeg.push(saveitemsNew);//Se aumenta el nuevo array con los items obtenidos temporalmente
                    if(objnameEqual != undefined){//Cuando se crea nueva linea de energia desde positivo, el valor objnameEqual no esta definido, porque no hay nombre de objetos antes en esa linea
                        savenamesNew.forEach(function(item){//Cada nombre almacenado para la nueva linea de energia
                            addnameObjsneg[saveindexLine].push(item);//Agrega en la nueva linea de energia los nombres almacenados
                        });
                    }
                }

                //console.log("INDEX LINE "+saveindexLine);
                
                var saveDifferentitempin = [];//Almacena las lineas item de energia que son diferentes a energia negativa
                getObj.newInfo.usedLines.forEach(function(item2,index2){//Busca cada pin del objeto
                    if(saveindexDifferent.includes(index2) === true){//Pines que son diferentes a la energia que coincide
                        saveDifferentitempin.push(item2);//Agrega las lineas item de energia que son diferentes a energia negativa
                    }
                });
                

                var savelastItems = [];//Almacena datos de la lines de energia principal del objeto
                var statusObjpin = true;//Almacena si es el primer dato del objeto o no
                saveDifferentitempin.forEach(function(items,indexs){//Recorre los diferentes items, para agregarlos
                    if(getObj.name.split(" ")[1] === "rgb" || getObj.name.split(" ")[1] === "preset" || getObj.name.split(" ")[1] === "pushbutton" || getObj.name.split(" ")[1] === "ultrasonic"){//Caso de ciertos objetos con mas pines diferentes (RGB, preset, etc)
                        if(statusObjpin){//Si es el primer dato del objeto (esto es pora ocupar la primera linea de energia y en lugar de que sean 4 lineas, sean 3 lineas solamente)
                            saveenergyNeg[saveindexLine].forEach(function(ite,ind){//Busca los datos de la linea principal del objeto
                                savelastItems.push(ite);//Almacena datos de la lines de energia principal del objeto
                            });
                            temporaryEnergyneg[saveindexLine].push(items);
                            saveenergyNeg[saveindexLine].push(items);//Agrega en la linea de energia principal el nuevo item
                            statusObjpin = false;//Ya no es el primer dato del objeto
                        }else{//Los demas datos del objeto, para agregarlos como lineas nuevas
                            temporaryEnergyneg.push([]);
                            saveenergyNeg.push([]);//Agrega espacio de nueva linea de energia
                            var saveAddlines;//Almacena temporalmente la nueva linea que se va a agregar (su posicion, ya que al agregar dos componentes con varios pines, son varias las lineas que se agregan)
                            saveenergyNeg.forEach(function(ite,ind){//Busca las lineas de energia
                                if(ite.length === 0){//Encuantra la linea que se agrego, para agregar los datos correspondientes
                                    saveAddlines = ind;//Almacena temporalmente la nueva linea que se va a agregar (su posicion, ya que al agregar dos componentes con varios pines, son varias las lineas que se agregan)
                                }
                            });
                            savelastItems.forEach(function(ite,ind){//Recorre los datos almacenados previamente de la linea principal de energia
                                temporaryEnergyneg[saveAddlines].push(ite);
                                saveenergyNeg[saveAddlines].push(ite);//Agrega en la linea de energia el nuevo item copia del principal
                            });
                            temporaryEnergyneg[saveAddlines].push(items);
                            saveenergyNeg[saveAddlines].push(items);//Agrega en la linea de energia el item de items diferentes
                        }
                    }else{//Casos para objetos con un pin diferente
                        temporaryEnergyneg[saveindexLine].push(items);
                        saveenergyNeg[saveindexLine].push(items);//Agrega en la linea de energia el nuevo item
                    }
                });

                
                if(getObj.name.split(" ")[1] === "rgb" || getObj.name.split(" ")[1] === "preset" || getObj.name.split(" ")[1] === "pushbutton" || getObj.name.split(" ")[1] === "ultrasonic"){//Caso de ciertos objetos con mas pines diferentes (RGB, preset, etc)
                    addnameObjsneg[saveindexLine].push(savenameObj);//Agrega en la linea de energia el nuevo nombre (si choca con negativo, de todas formas se agrega el nombre)
                    for(var i=1; i<=saveDifferentitempin.length-1; i++){//Agrega los nuevos nombres de las nuevas lineas de energia, en relacion al total de los pines nuevos
                        addnameObjsneg.push([]);//Agrega espacio para nuevo nombre de linea de energia
                        var saveAddlines;//Almacena temporalmente la nueva linea de nombres que se va a agregar (su posicion, ya que al agregar dos componentes con varios pines, son varias las lineas que se agregan)
                        addnameObjsneg.forEach(function(ite,ind){//Busca las lineas de energia
                            if(ite.length === 0){//Encuantra la linea que se agrego, para agregar los datos correspondientes
                                saveAddlines = ind;//Almacena temporalmente la nueva linea de nombres que se va a agregar (su posicion, ya que al agregar dos componentes con varios pines, son varias las lineas que se agregan)
                            }
                            });
                        addnameObjsneg[saveindexLine].forEach(function(ite,ind){//Busca los nombres de la linea de energia principal
                            addnameObjsneg[saveAddlines].push(ite);//Agrega en la nueva linea de energia el nuevo item
                        });
                    }
                }else{//Casos para objetos con un pin diferente
                    addnameObjsneg[saveindexLine].push(savenameObj);//Agrega en la linea de energia el nuevo nombre (si choca con negativo, de todas formas se agrega el nombre)
                }
            }

            
            function findNamelines(){
                /*
                * NOMBRE: findNamelines.
                * UTILIDAD: Encuentra los items que se van a agregar a la nueva linea de energia
                * ENTRADAS: Ninguna.
                * SALIDAS: Ninguna.
                */
                scene.children.forEach(function(item,index){//Busca todos los objetos en escenario
                    if(item.name.split(" ")[0] != "grl" && item.name.split(" ")[0] != "null"){//Objetos que se mueven
                        if(item.name.split(" ")[0] != "jumperPow" && item.name.split(" ")[0] != "jumper"){//No considera cables
                            if(item.name.split(" ")[1] != "pinPowerneg" && item.name.split(" ")[1] != "pinPowerpos"){//No considera cable energia
                                if(item.name.split(" ")[1] === "pinA" || item.name.split(" ")[1] === "pinB"){//Son cables
                                    if(item.name.split(" ")[1] === "pinA"){//Solo agrega uno, porque A y B contienen la misma info
                                        findEqualitem(item);//Encuentra el nombre del objeto que tiene el mismo item del objeto de donde sale la nueva linea de energia, con el mismo del objeto anterior en sus pines extras
                                    }
                                }else{
                                    findEqualitem(item);//Encuentra el nombre del objeto que tiene el mismo item del objeto de donde sale la nueva linea de energia, con el mismo del objeto anterior en sus pines extras, para obtener de que nombre de objeto hacia atras se copian a la nueva linea de energia
                                }
                            }
                        }
                    }
                });
                function findEqualitem(objeto){
                    /*
                    * NOMBRE: findEqualitem.
                    * UTILIDAD: Encuentra el nombre del objeto que tiene el mismo item del objeto de donde sale la nueva linea de energia, con el mismo del objeto anterior en sus pines extras, para obtener de que nombre de objeto hacia atras se copian a la nueva linea de energia
                    * ENTRADAS: Ninguna.
                    * SALIDAS: Ninguna.
                    */
                    objeto.newInfo.pinDifferent.forEach(function(item2,index2){//Busca los pines indices diferentes de cada objeto
                        if(objeto.newInfo.usedLines[item2] === saveMiddleitem){//Busca los items que son diferentes a la energia negativa que coincide, y que sea igual al item del objeto de la nueva linea de energia
                            objnameEqual = objeto.name;//Almacena el nombre del objeto de donde parte hacia atras para copiar a la nueva linea de energia
                        }
                    });
                }
                //console.log("NOMBRE DE OBJETO QUE COINCIDE");
                //console.log(objnameEqual);
                addnameObjsneg[saveindexLine].forEach(function(item,index){//Busca en las linea en curso (antes de agregar nueva linea) de energia por nombre
                    if(item === objnameEqual){//El nombre coincide en la linea de energia, con el nombre de la nueva linea
                        //console.log("INDEX DE NOMBRE IGUAL");
                        //console.log(index);
                        savenamesNew = addnameObjsneg[saveindexLine].slice(0, index+1);//Almacena los nombres de los objetos que se van a copiar a la nueva linea de energia
                    }
                });
            }
        }
        
        contSearch++;//Aumenta el conteo para ejecutar la funcion
        if(contSearch <= contObjs){//Entra el total de veces que objetos en escenario (se hace porque no existe orden en el posicionamiento de objetos)
            searchEnergy();//Ejecuta de nuevo la funcion, para encontrar los objetos faltantes
        }
    }
    
    console.log("////////NEGATIVO////////");
    console.log(saveenergyNeg);
    console.log("-------------------------------");
    

    console.log("////////NEGATIVO FULL////////");
    console.log(temporaryEnergyneg);
    console.log("-------------------------------");
    
    console.log("////////NOMBRE NEGATIVO +////////");
    console.log(addnameObjsneg);
    console.log("---------------------------------");
    
}
var saveenergyPos = [[]];//Almacena todas las lineas de energia positiva
var temporaryEnergypos = [[]];
var addnameObjspos = [[]];//Almacena los nombres de los objetos que estan en linea de energia finales
var pinSwitchgetpos = [];//Almacena el pin del Switch, para ocuparlo al presionar los botones con checkbox
var saveintersectionPosneg = []//Almacena la interseccion de positivo con negativo de cada linea de energia
var savelineEnergized = [];//Almacena las lineas de energia que cierran ciclo de energia
function validarEnergypos(){
    //Valida que los objetos tengan la energia positiva para activar (led, buzzer, rgb, etc.)
    
    temporaryEnergypos = [[]];
    saveenergyPos = [[]];//Almacena todas las lineas de energia negativa
    
    savelineEnergized = [false];//Resetea las lineas de energia que cierran ciclo de energia
    addnameObjspos = [[]];//Almacena los nombres de los objetos que estan en linea de energia finales
    scene.children.forEach(function(item,index){//Busca los objetos en el escenario
        if(item.name.split(" ")[1] === "pinPowerpos"){//BUsca la energia positiva
            temporaryEnergypos[0] = [item.newInfo.usedLines[0]];
            saveenergyPos[0] = [item.newInfo.usedLines[0]];//Agrega la linea positiva
        }
    });

    //console.log("FIRS POSITIVE ENERGY");
    //console.log(saveenergyPos);
    //console.log(temporaryEnergypos);
    
    pinSwitchgetpos = [[],[],[],[],[],[],[],[],[],[]];//Resetea pin del Switch (solo de hace en energia negativa, porque es la primera que inicia. Si se resetea en positiva tambien, se borra lo guardado en negativo)
    
    var contSearch = 0;//Conteo de las veces que se ejecuta la funcion para buscar las lineas de energia
    
    var contLines = 0;
    
    //var saveindexEqual;//Almacena el la posicion del pin que coincide
    //var inPositive = false;//Almancena si hay un pin conectado que coincide a energia positiva
    //var saveItemsadd = [];//Almacena los pines que se van a agregar
    var saveallnameObjs = [];//Guarda nombre de objetos agregados
    var saveitemSwitch = [];
    
    //var contnewLines = 0;//Conteo de nuevas lineas de energia en positivo
    //var saveindexlineEqual = 0;//Almacena la posicion de la linea de energia en donde se almacenara los items del objeto
    var saveintersectionPosneg = []//Almacena la interseccion de positivo con negativo de cada linea de energia
    
    var contNeg = 0;//Conteo para agregar linea de energia de objeto que choca con negativo
    
    
    
    var saveindexLine;//Almacena linea de energia donde se encuantra conectado el objeto en curso
    
    
    
    searchEnergy();//Busca los objetos que tienen energia
    function searchEnergy(){
        //Busca los objetos que tienen energia
        var contObjs = 0;//Conteo de objetos totales en escenario
        var conttPos = 0;//Conteo para agregar lineas de energia
        for(var i=0; i<=saveenergyPos.length-1; i++){
            if(saveenergyPos[i].length != 0){//Ya hay objeto agregado
                conttPos++;//Inicia conteo para agregar lineas de energia de objetos
            }
        }
        
        scene.children.forEach(function(item,index){//Busca todos los objetos en escenario
            if(item.name.split(" ")[0] != "grl" && item.name.split(" ")[0] != "null"){//Objetos que se mueven
                if(item.name.split(" ")[0] != "jumperPow" && item.name.split(" ")[0] != "jumper"){//No considera cables
                    if(item.name.split(" ")[1] != "pinPowerneg" && item.name.split(" ")[1] != "pinPowerpos"){//No considera cable energia
                        if(item.name.split(" ")[1] === "pinA" || item.name.split(" ")[1] === "pinB"){//Son cables
                            if(item.name.split(" ")[1] === "pinA"){//Solo agrega uno, porque A y B contienen la misma info
                                contObjs++;//Suma objetos en escenario
                            }
                        }else{
                            contObjs++;//Suma objetos en escenario
                        }
                    }
                }
            }
        });
        
        scene.children.forEach(function(item,index){//Busca todos los objetos en escenario
            if(item.name.split(" ")[0] != "grl" && item.name.split(" ")[0] != "null"){//Objetos que se mueven
                if(item.name.split(" ")[0] != "jumperPow" && item.name.split(" ")[0] != "jumper"){//No considera cables
                    if(item.name.split(" ")[1] != "pinPowerneg" && item.name.split(" ")[1] != "pinPowerpos"){//No considera cable energia
                        if(item.name.split(" ")[1] === "pinA" || item.name.split(" ")[1] === "pinB"){//Son cables
                            if(item.name.split(" ")[1] === "pinA"){//Solo agrega uno, porque A y B contienen la misma info
                                addenergyLines(item);//Agrega las nuevas lineas de energia positiva
                            }
                        }else{
                            addenergyLines(item);//Agrega las nuevas lineas de energia positiva
                        }
                    }
                }
            }
        });
        
        
        
        function addenergyLines(getObj){
            //Agrega las nuevas lineas de energia positiva
            //getObj > objeto en curso
            var saveindexEqual;//Almacena la posicion del pin que coincide
            var saveitemEqual;//Almacena los datos del pin que coincide
            var inPositive = false;//Resetea si hay un pin conectado que coincide a energia positiva
            var saveItemsadd = [];//Resetea los pines que se van a agregar
            var saveindexDifferent = [];//Almacena la posicion de los pines que son diferentes al que coincide
            var objConnected = false;//Almacena si hay objeto conectado
            var inNegative = false;//Resetea si hay un pin conectado que coincide a energia negativa
            
            
            var statusLastitem = false;//Indica que el item se guarda en la misma linea de energia
            var statusMiddleitem = false;//Indica que se crea una nueva linea de energia
            var statusLastindex;//Almacena el indice del ultimo item que coincide
            var statusMiddleindex;//Almacena el indice del item que coincide intermedio
            var saveitemsNew = [];//Almacena los items temporalmente previos, para formar la nueva linea de energia
            var saveitemsNewtemporary = [];//Almacena los items temporalmente previos de la linea temporal, para formar la nueva linea de energia
            
            var savenameObj;//Almacena el nombre del objeto en curso
            var saveMiddleitem;//Almacena el item de donde sale la nueva linea de energia
            
            var objnameEqual;//Almacena el nombre del objeto de donde parte hacia atras para copiar a la nueva linea de energia
            var savenamesNew = [];//Almacena los nombres de los objetos que se van a copiar a la nueva linea de energia
            
            var allowObj = true;//Determina si un objeto continua agregando info, ya que contiene un warning que no permitiria creae correctamente la linea de energia
            
            var statusIn = true;//Indicador para que switch y todos los componentes entren una linea de comparacion a la vez
            
            console.log("----------------------------------- "+getObj.name);
            getObj.newInfo.usedLines.forEach(function(item2,index2){//Busca la posicion del pin que coincide por objeto
                saveenergyPos.forEach(function(item3,index3){//Busca la linea de energia en positiva
                    item3.forEach(function(item4,index4){//Busca los pines guardados en energia positiva
                        
                        if(item2 === item4 && statusIn === true){//Si un item de la linea de energia positiva incluye un pin del objeto, y es la primera vez que entra esa linea
                            console.log("-------PIN COINCIDE "+getObj.name+" ++++++++");
                            var statusSwitchin = false;//Status para saber si entra o no la info del switch
                            if(getObj.name.split(" ")[1] === "switch"){//Si es un Switch
                                if(saveitemSwitch.includes(item2) === false){//Si un item de "saveitemSwitch" NO incluye un pin del objeto

                                    //console.log("saveallnameObjs!!!!!!!!!!!!!!!!!!!!!!");
                                    //console.log(saveallnameObjs);
                                    console.log(getObj.name+" *********//////////------------");
                                    console.log(item2);

                                    console.log("index del switch "+index2);
                                    if(index2 === 0){
                                        saveitemSwitch.push(getObj.newInfo.usedLines[0]);
                                        saveitemSwitch.push(getObj.newInfo.usedLines[4]);
                                    }
                                    if(index2 === 1){
                                        saveitemSwitch.push(getObj.newInfo.usedLines[1]);
                                        saveitemSwitch.push(getObj.newInfo.usedLines[5]);
                                    }
                                    if(index2 === 2){
                                        saveitemSwitch.push(getObj.newInfo.usedLines[2]);
                                        saveitemSwitch.push(getObj.newInfo.usedLines[6]);
                                    }
                                    if(index2 === 3){
                                        saveitemSwitch.push(getObj.newInfo.usedLines[3]);
                                        saveitemSwitch.push(getObj.newInfo.usedLines[7]);
                                    }
                                    if(index2 === 4){
                                        saveitemSwitch.push(getObj.newInfo.usedLines[4]);
                                        saveitemSwitch.push(getObj.newInfo.usedLines[0]);
                                    }
                                    if(index2 === 5){
                                        saveitemSwitch.push(getObj.newInfo.usedLines[5]);
                                        saveitemSwitch.push(getObj.newInfo.usedLines[1]);
                                    }
                                    if(index2 === 6){
                                        saveitemSwitch.push(getObj.newInfo.usedLines[6]);
                                        saveitemSwitch.push(getObj.newInfo.usedLines[2]);
                                    }
                                    if(index2 === 7){
                                        saveitemSwitch.push(getObj.newInfo.usedLines[7]);
                                        saveitemSwitch.push(getObj.newInfo.usedLines[3]);
                                    }
                                    console.log("INNNNNNNNNNNNNNNN");
                                    console.log(getObj.name);
                                    console.log(saveitemSwitch);

                                    statusSwitchin = true;//Si entra info switch
                                    
                                    

                                }
                            }

                            if(getObj.name.split(" ")[1] != "switch" || statusSwitchin === true){//Entran todos los componentes, menos el switch, a excepcion de que si cumpla con la info de la anterior validacion
                                
                                

                                if(saveallnameObjs.includes(getObj.name) === false){//Si el objeto no esta agregado
                                    

                                    if(getObj.name.split(" ")[1] != "switch"){//Si es Switch NO se almacena, para que siga entrando al conteo y buscar mas conecicones
                                        saveallnameObjs.push(getObj.name);//Agrega nombre del objeto que coincide
                                    }

                                    saveindexEqual = index2;//Index del pin que esta conectado
                                    saveitemEqual = item2;//Item del pin que esta conectado
                                    inPositive = true;//Si hay un pin conectado que coincide a energia positiva
                                    objConnected = true;//Si hay objeto conectado

                                    saveindexLine = index3;//Linea de energia donde se encuantra conectado el objeto en curso
                                    

                                    if(item2 === item3[item3.length-1].toString() && savelineEnergized[saveindexLine] === false){//Si el item del objeto es igual al ultimo item de la linea de energia (esto es para agregarlo a la misma linea de energia), y tambien si esa linea no esta ya energizada. Porque si ya esta ewnergizada, se crea una nueva linea
                                        statusLastitem = true;//Indica que el item se guarda en la misma linea de energia
                                        statusLastindex = item3.length-1;//Almacena el indice del ultimo item que coincide
                                    }else{
                                        statusMiddleitem = true;//Indica que se crea una nueva linea de energia
                                        statusMiddleindex = index4;//Almacena el indice del item que coincide intermedio
                                        saveitemsNew = item3.slice(0, statusMiddleindex+1);//Almacena los items temporalmente previos, para formar la nueva linea de energia
                                        saveitemsNewtemporary = item3.slice(0, statusMiddleindex+1);//Almacena los items temporalmente previos de la linea temporal, para formar la nueva linea de energia. Esto es porque se esta igualando va variable y se tiene que almacenar de forma independiente

                                        saveMiddleitem = item4;//Almacena el item de donde sale la nueva linea de energia
                                    }
                                    savenameObj = getObj.name;//Almacena el nombre del objeto en curso
                                    
                                    
                                    statusIn = false;//Ya entro una vez la linea de energia, y ahora hasta que cambie el objeto

                                }
                            }
                            
                        }   
                        
                        
                    }); 
                });
            });

            if(objConnected){//Hay un objeto conectado y se Obtienen las posiciones de los pines que se van a agregar
                
                //console.log("LINEAS CONECTADAS A "+getObj.name);
                //console.log("pinindexEqual = "+saveindexEqual);
                getObj.newInfo.pinDifferent = [];
                //console.log("saveindexLine++++++++++++++++++++++++++");
                //console.log(saveindexLine);
                //getObj.newInfo.pinConected = {energizedLine:[],pinObj:[]};
                if(getObj.newInfo.val[0] === "Interruptor"){//Switch, tiene varios pines
                    switch(saveindexEqual){//Casos para el pin index entrada
                        case 0://Pin index entrada
                            saveindexDifferent.push(4);//Pin index salida
                            getObj.newInfo.pinDifferent.push(4);//Guarda pin index salida en objeto
                            pinSwitchgetpos[saveindexLine].push(1);//Almacena el pin que tiene energia, para validarlo al presionar un btn del switch
                            break;
                        case 1://Pin index entrada
                            saveindexDifferent.push(5);//Pin index salida
                            getObj.newInfo.pinDifferent.push(5);//Guarda pin index salida en objeto
                            pinSwitchgetpos[saveindexLine].push(2);//Almacena el pin que tiene energia, para validarlo al presionar un btn del switch
                            break;
                        case 2://Pin index entrada
                            saveindexDifferent.push(6);//Pin index salida
                            getObj.newInfo.pinDifferent.push(6);//Guarda pin index salida en objeto
                            pinSwitchgetpos[saveindexLine].push(3);//Almacena el pin que tiene energia, para validarlo al presionar un btn del switch
                            break;
                        case 3://Pin index entrada
                            saveindexDifferent.push(7);//Pin index salida
                            getObj.newInfo.pinDifferent.push(7);//Guarda pin index salida en objeto
                            pinSwitchgetpos[saveindexLine].push(4);//Almacena el pin que tiene energia, para validarlo al presionar un btn del switch
                            break;
                        case 4://Pin index entrada
                            saveindexDifferent.push(0);//Pin index salida
                            getObj.newInfo.pinDifferent.push(0);//Guarda pin index salida en objeto
                            pinSwitchgetpos[saveindexLine].push(1);//Almacena el pin que tiene energia, para validarlo al presionar un btn del switch
                            break;
                        case 5://Pin index entrada
                            saveindexDifferent.push(1);//Pin index salida
                            getObj.newInfo.pinDifferent.push(1);//Guarda pin index salida en objeto
                            pinSwitchgetpos[saveindexLine].push(2);//Almacena el pin que tiene energia, para validarlo al presionar un btn del switch
                            break;
                        case 6://Pin index entrada
                            saveindexDifferent.push(2);//Pin index salida
                            getObj.newInfo.pinDifferent.push(2);//Guarda pin index salida en objeto
                            pinSwitchgetpos[saveindexLine].push(3);//Almacena el pin que tiene energia, para validarlo al presionar un btn del switch
                            break;
                        case 7://Pin index entrada
                            saveindexDifferent.push(3);//Pin index salida
                            getObj.newInfo.pinDifferent.push(3);//Guarda pin index salida en objeto
                            pinSwitchgetpos[saveindexLine].push(4);//Almacena el pin que tiene energia, para validarlo al presionar un btn del switch
                            break;
                        default:
                            break;
                    }
                }else if(getObj.newInfo.val[0] === "RGB"){//RGB, tiene varios pines y secuancia de + a -
                    getObj.newInfo.onrgbData = [];
                    switch(saveindexEqual){//Casos para el pin index entrada
                        case 0://Pin index entrada
                            saveindexDifferent.push(1,2,3);//Pin index salida
                            getObj.newInfo.pinDifferent.push(1,2,3);//Guarda pin index salida en objeto
                            break;
                        case 1://Pin index entrada
                        case 2://Pin index entrada
                        case 3://Pin index entrada
                            //console.log("RGB NO CONECTADO CORECTAMENTE DE + a -");
                            showWarning("positivetonegative",getObj.newInfo.val[0]);//Muestra las advertencias sobre coneccion de energia de objetos de + a -
                            allowObj = false;//Determina que el objeto NO continua agregando info, ya que contiene un warning que no permitiria creae correctamente la linea de energia
                            break;
                        default:
                            break;
                    }
                }else if(getObj.newInfo.val[0] === "Potenciómetro"){//Preset, tiene varios pines y secuancia de + a -
                    getObj.newInfo.onpresetData = [];
                    switch(saveindexEqual){//Casos para el pin index entrada
                        case 0://Pin index entrada
                            saveindexDifferent.push(2);//Pin index salida
                            getObj.newInfo.pinDifferent.push(2);//Guarda pin index salida en objeto
                            break;
                        case 1://Pin index entrada
                            saveindexDifferent.push(2);//Pin index salida
                            getObj.newInfo.pinDifferent.push(2);//Guarda pin index salida en objeto
                            break;
                        case 2://Pin index entrada
                            saveindexDifferent.push(0,1);//Pin index salida
                            getObj.newInfo.pinDifferent.push(0,1);//Guarda pin index salida en objeto
                            break;
                        default:
                            break;
                    }
                }else if(getObj.newInfo.val[0] === "LED"){//LED, tiene una sola salida de + a -
                    
                    if(getObj.newInfo.tooltipData.includes("none") === true){
                        showWarning("colorofled",getObj.newInfo.val[0]);//Muestra las advertencias sobre color de LED
                        allowObj = false;//Determina que el objeto NO continua agregando info, ya que contiene un warning que no permitiria creae correctamente la linea de energia
                    }
                    
                    switch(saveindexEqual){//Casos para el pin index entrada
                        case 0://Pin index entrada
                            saveindexDifferent.push(1);//Pin index salida
                            getObj.newInfo.pinDifferent.push(1);//Guarda pin index salida en objeto
                            break;
                        case 1://Pin index entrada
                            //console.log("LED NO CONECTADO CORECTAMENTE DE + a -");
                            showWarning("positivetonegative",getObj.newInfo.val[0]);//Muestra las advertencias sobre coneccion de energia de objetos de + a -
                            allowObj = false;//Determina que el objeto NO continua agregando info, ya que contiene un warning que no permitiria creae correctamente la linea de energia
                            break;
                        default:
                            break;
                    }
                }else if(getObj.newInfo.val[0] === "Ultrasónico"){//Button, tiene 1 pin en positivo solamente

                    switch(saveindexEqual){//Casos para el pin index entrada
                        case 0://Pin index entrada
                            saveindexDifferent.push(1,2,3);//Pin index salida
                            getObj.newInfo.pinDifferent.push(1,2,3);//Guarda pin index salida en objeto
                            break;
                        case 1://Pin index entrada
                        case 2://Pin index entrada
                        case 3://Pin index entrada
                            //console.log("ULTRASONIC NO CONECTADO CORECTAMENTE DE + a -");
                            showWarning("positivetonegative",getObj.newInfo.val[0]);//Muestra las advertencias sobre coneccion de energia de objetos de + a -
                            allowObj = false;//Determina que el objeto NO continua agregando info, ya que contiene un warning que no permitiria creae correctamente la linea de energia
                            break;
                        default:
                            break;
                    }
                }else if(getObj.newInfo.val[0] === "Resistencia"){//LED, tiene una sola salida de + a -
                    
                    if(getObj.newInfo.tooltipData.includes("Ohms") === true){
                        showWarning("colorofresistor",getObj.newInfo.val[0]);//Muestra las advertencias sobre valor de resistencia
                        allowObj = false;//Determina que el objeto NO continua agregando info, ya que contiene un warning que no permitiria creae correctamente la linea de energia
                    }
                    
                    
                    switch(saveindexEqual){//Casos para el pin index entrada
                        case 0://Pin index entrada
                            saveindexDifferent.push(1);//Pin index salida
                            getObj.newInfo.pinDifferent.push(1);//Guarda pin index salida en objeto
                            break;
                        case 1://Pin index entrada
                            saveindexDifferent.push(0);//Pin index salida
                            getObj.newInfo.pinDifferent.push(0);//Guarda pin index salida en objeto
                            break;
                        default:
                            break;
                    }
                }else if(getObj.newInfo.val[0] === "RGBc"){//RGBc, tiene una sola salida de + a -
                    switch(saveindexEqual){//Casos para el pin index entrada
                        case 0://Pin index entrada
                            saveindexDifferent.push(1);//Pin index salida
                            getObj.newInfo.pinDifferent.push(1);//Guarda pin index salida en objeto
                            break;
                        case 1://Pin index entrada
                            //console.log("LED NO CONECTADO CORECTAMENTE DE + a -");
                            showWarning("positivetonegative",getObj.newInfo.val[0]);//Muestra las advertencias sobre coneccion de energia de objetos de + a -
                            allowObj = false;//Determina que el objeto NO continua agregando info, ya que contiene un warning que no permitiria creae correctamente la linea de energia
                            break;
                        default:
                            break;
                    }
                }else if(getObj.newInfo.val[0] === "Bocina"){//Buzzer, tiene una sola salida de + a -
                    switch(saveindexEqual){//Casos para el pin index entrada
                        case 0://Pin index entrada
                            saveindexDifferent.push(1);//Pin index salida
                            getObj.newInfo.pinDifferent.push(1);//Guarda pin index salida en objeto
                            break;
                        case 1://Pin index entrada
                            //console.log("BUZZER NO CONECTADO CORECTAMENTE DE + a -");
                            showWarning("positivetonegative",getObj.newInfo.val[0]);//Muestra las advertencias sobre coneccion de energia de objetos de + a -
                            allowObj = false;//Determina que el objeto NO continua agregando info, ya que contiene un warning que no permitiria creae correctamente la linea de energia
                            break;
                        default:
                            break;
                    }
                }else if(getObj.newInfo.val[0] === "Botón"){//Button, tiene varios pines y secuancia de + a -
                    getObj.newInfo.onpresetData = [];
                    switch(saveindexEqual){//Casos para el pin index entrada
                        case 0://Pin index entrada
                            saveindexDifferent.push(1,3);//Pin index salida
                            getObj.newInfo.pinDifferent.push(1,3);//Guarda pin index salida en objeto
                            break;
                        case 1://Pin index entrada
                            saveindexDifferent.push(0,2);//Pin index salida
                            getObj.newInfo.pinDifferent.push(0,2);//Guarda pin index salida en objeto
                            break;
                        case 2://Pin index entrada
                            saveindexDifferent.push(3,2);//Pin index salida
                            getObj.newInfo.pinDifferent.push(3,2);//Guarda pin index salida en objeto
                            break;
                        case 3://Pin index entrada
                            saveindexDifferent.push(2,0);//Pin index salida
                            getObj.newInfo.pinDifferent.push(2,0);//Guarda pin index salida en objeto
                            break;
                        default:
                            break;
                    }
                }else{//Cable, etc. No importa la polaridad de (+ a -) o (- a +)
                    switch(saveindexEqual){//Casos para el pin index entrada
                        case 0://Pin index entrada
                            saveindexDifferent.push(1);//Pin index salida
                            getObj.newInfo.pinDifferent.push(1);//Guarda pin index salida en objeto
                            break;
                        case 1://Pin index entrada
                            saveindexDifferent.push(0);//Pin index salida
                            getObj.newInfo.pinDifferent.push(0);//Guarda pin index salida en objeto
                            break;
                        default:
                            break;
                    }
                }
                //console.log("NOMBRE = "+getObj.name);
                
                console.log("indexDifferent = ");
                console.log(saveindexDifferent);
                
                //console.log("=========================");
                //console.log(getObj.name);
                //console.log(getObj.newInfo.pinDifferent);
                
                console.log("allowObj "+allowObj);
            }
            
            /*if(getObj.name.split(" ")[1] === "led" || getObj.name.split(" ")[1] === "rgb" || getObj.name.split(" ")[1] === "buzzer"){
                inNegative = false;
            }*/
            
            
            getObj.newInfo.usedLines.forEach(function(item2,index2){//Busca la posicion del pin que coincide por objeto
                if(saveindexDifferent.includes(index2) === true){//Pines que son diferentes a la energia que coincide
                    saveenergyNeg.forEach(function(item3,index3){
                        if(inPositive === true && item3.includes(item2) === true){//Coincide con energia positiva y negativa
                            inNegative = true;//Conincide con energia negativa
                        }
                    });
                }
            });
            
            if(inPositive && allowObj){//Si hay pines de un objeto conectado a la linea de energia positiva y NO hay algun warning al agregar objetos
                console.log("***ENTRA POSITIVO "+getObj.name);
                
                if(statusLastitem){//Agrega
                    console.log("((((( MISMA LINEA )))))");
                    console.log("LAST INDEX "+statusLastindex);
                }
                if(statusMiddleitem){//Se agrega una linea nueva, con info de un componente de esa linea
                    console.log("((((( LINEA NUEVA )))))");
                    console.log("MIDDLE INDEX "+statusMiddleindex);

                    addnameObjspos.push([]);//Agrega nueva linea de nombres
                    findNamelines();//Encuentra los items que se van a agregar a la nueva linea de energia
                    saveindexLine = saveenergyPos.length;//Se aumenta para crear una nueva linea de energia
                    temporaryEnergypos.push(saveitemsNewtemporary);
                    saveenergyPos.push(saveitemsNew);//Se aumenta el nuevo array con los items obtenidos temporalmente
                    savelineEnergized.push(false);//Agrega las lineas sin completar, y despues de cambian a true por los pines que no chocan con negativo
                    if(objnameEqual != undefined){//Cuando se crea nueva linea de energia desde positivo, el valor objnameEqual no esta definido, porque no hay nombre de objetos antes en esa linea
                        savenamesNew.forEach(function(item){//Cada nombre almacenado para la nueva linea de energia
                            addnameObjspos[saveindexLine].push(item);//Agrega en la nueva linea de energia los nombres almacenados
                        });
                    }
                }

                //console.log("INDEX LINE "+saveindexLine);
                //console.log("saveindexDifferent++++++++++++++");
                //console.log(saveindexDifferent);
                
                var saveDifferentitempin = [];//Almacena las lineas item de energia que son diferentes a energia positiva
                //var saveDifferentindexpin = [];//Almacena las lineas index de energia que son diferentes a energia positiva
                getObj.newInfo.usedLines.forEach(function(item2,index2){//Busca cada pin del objeto
                    if(saveindexDifferent.includes(index2) === true){//Pines que son diferentes a la energia que coincide
                        saveDifferentitempin.push(item2);//Agrega las lineas item de energia que son diferentes a energia positiva
                        //saveDifferentindexpin.push(index2);//Agrega las lineas index de energia que son diferentes a energia positiva
                    }
                });
                
                if(inNegative === false){//No hay pines de un objeto conectado a la linea de energia negativa (esta parte se agrega si no choca con negativo)
                    var savelastItems = [];//Almacena datos de la lines de energia principal del objeto
                    var statusObjpin = true;//Almacena si es el primer dato del objeto o no
                    console.log("saveDifferentitempin-------------");
                    console.log(saveDifferentitempin);
                    saveDifferentitempin.forEach(function(items,indexs){//Recorre los diferentes items, para agregarlos
                        if(getObj.name.split(" ")[1] === "rgb" || getObj.name.split(" ")[1] === "preset" || getObj.name.split(" ")[1] === "pushbutton" || getObj.name.split(" ")[1] === "ultrasonic"){//Caso de ciertos objetos con mas pines diferentes (RGB, preset, etc)
                            if(statusObjpin){//Si es el primer dato del objeto (esto es pora ocupar la primera linea de energia y en lugar de que sean 4 lineas, sean 3 lineas solamente)
                                saveenergyPos[saveindexLine].forEach(function(ite,ind){//Busca los datos de la linea principal del objeto
                                    savelastItems.push(ite);//Almacena datos de la lines de energia principal del objeto
                                });
                                temporaryEnergypos[saveindexLine].push(items);
                                saveenergyPos[saveindexLine].push(items);//Agrega en la linea de energia principal el nuevo item
                                statusObjpin = false;//Ya no es el primer dato del objeto
                            }else{//Los demas datos del objeto, para agregarlos como lineas nuevas
                                temporaryEnergypos.push([]);
                                saveenergyPos.push([]);//Agrega espacio de nueva linea de energia
                                var saveAddlines;//Almacena temporalmente la nueva linea que se va a agregar (su posicion, ya que al agregar dos componentes con varios pines, son varias las lineas que se agregan)
                                saveenergyPos.forEach(function(ite,ind){//Busca las lineas de energia
                                    if(ite.length === 0){//Encuantra la linea que se agrego, para agregar los datos correspondientes
                                        saveAddlines = ind;//Almacena temporalmente la nueva linea que se va a agregar (su posicion, ya que al agregar dos componentes con varios pines, son varias las lineas que se agregan)
                                    }
                                });
                                savelastItems.forEach(function(ite,ind){//Recorre los datos almacenados previamente de la linea principal de energia
                                    temporaryEnergypos[saveAddlines].push(ite);
                                    saveenergyPos[saveAddlines].push(ite);//Agrega en la linea de energia el nuevo item copia del principal
                                });
                                temporaryEnergypos[saveAddlines].push(items);
                                saveenergyPos[saveAddlines].push(items);//Agrega en la linea de energia el item de items diferentes
                                savelineEnergized.push(false);//Agrega si la linea de energia positiva, ya completo el ciclo con negativo
                            }
                        }else{//Casos para objetos con un pin diferente
                            temporaryEnergypos[saveindexLine].push(items);
                            saveenergyPos[saveindexLine].push(items);//Agrega en la linea de energia el nuevo item
                        }
                    });
                }
                
                
                if(inNegative === true){//Si choca con negativo agrega las intersecciones con negativo de las lineas de energia positivas
                    
                    
                    
                    getObj.newInfo.usedLines.forEach(function(item2,index2){//Busca cada pin del objeto
                        saveenergyNeg.forEach(function(item3,index3){
                            if(item3.includes(item2) === true){//Pines que son diferentes a la energia que coincide
                                if(saveintersectionPosneg.includes(item2) === false){//Si aun no esta inlcuido el item
                                    saveintersectionPosneg.push(item2);//Almacena items a donde la energia negativa choca.
                                }
                            }
                        });
                    });
                    
                    var savelastItems = [];//Almacena datos de la lines de energia principal del objeto
                    var savesilimarLines = [saveindexLine];//Almacena las lineas nuevas del objeto en curso, si son nuevas lineas o las que chocan con negativo (en automatico se almacena la linea de inicio del objeto)
                    if(getObj.name.split(" ")[1] === "rgb" || getObj.name.split(" ")[1] === "preset" || getObj.name.split(" ")[1] === "pushbutton" || getObj.name.split(" ")[1] === "ultrasonic"){//Caso de ciertos objetos con mas pines diferentes (RGB, preset, etc)
                        savelineEnergized[saveindexLine] = true;//Agrega los ciclos completados, a la linea en curso
                        for(var i=1; i<=saveDifferentitempin.length-1; i++){//Agrega las nuevas lineas de energia, en relacion al total de los pines nuevos
                            
                            temporaryEnergypos.push([]);
                            saveenergyPos.push([]);//Agrega espacio para nueva linea de energia
                            savelineEnergized.push(true);//Agrega los ciclos completados, y despues de cambian a false por los pines que no chocan con negativo
                            var saveAddlines;//Almacena temporalmente la nueva linea que se va a agregar (su posicion, ya que al agregar dos componentes con varios pines, son varias las lineas que se agregan)
                            saveenergyPos.forEach(function(ite,ind){//Busca las lineas de energia
                                if(ite.length === 0){//Encuantra la linea que se agrego, para agregar los datos correspondientes
                                    saveAddlines = ind;//Almacena temporalmente la nueva linea que se va a agregar (su posicion, ya que al agregar dos componentes con varios pines, son varias las lineas que se agregan)
                                    savesilimarLines.push(ind);//Almacena la linea de energia index en donde se agregaron las lineas
                                }
                            });
                            saveenergyPos[saveindexLine].forEach(function(ite,ind){//Busca la linea de energia principal
                                temporaryEnergypos[saveAddlines].push(ite);
                                saveenergyPos[saveAddlines].push(ite);//Agrega en la nueva linea de energia el nuevo item
                            });
                        }
                        //var saveInfoobj = [];//Almacena que pines de los diferentes items son los que NO estan conectados a negativo
                        var saveConnectionindex = [];//Almacena que pines de los diferentes items son los que SI estan conectados a negativo
                        var saveConnectionitem = [];
                        var infoConnections = [];
                        //console.log("FIXED??????????????????");
                        //console.log(saveDifferentitempin);
                        //console.log(saveDifferentindexpin);
                        //console.log(savesilimarLines);
                        
                        saveDifferentitempin.forEach(function(items,indexs){//Recorre los diferentes items, para agregarlos
                            var inPin = [];//Identifica si una linea choca con negativo o no
                            saveenergyNeg.forEach(function(itemes,indexes){
                                itemes.forEach(function(ite,ind){
                                    if(items === ite){//El item diferente es igual a un item de la energia negativa
                                        inPin.push(true);//Almacena que item si choca con energia
                                    }else{//El item diferente es diferente de la energia negativa
                                        inPin.push(false);//Almacena que item no choca con energia
                                    }
                                });
                            });
                            infoConnections.push(inPin);//Se agregan las lineas (si tiene "true", si choca con negativo, y si son puro false, la linea no choca y se agrega)
                            if(inPin.includes(true) === true){//Lineas que SI chocan con negativo
                                saveConnectionitem.push(items);//Almacena el ultimo item, que es el que choca con negativo
                            }
                        });
                        infoConnections.forEach(function(items,indexs){//Busca si en la lineas que se van a gregar, estan chocan con negativo, o se agregan directo
                            if(items.includes(true) === false){//Si no incluye "true", se agregan a las lineas nuevas, el item final (caso contrario, no se agrega nada a la linea)
                                temporaryEnergypos[savesilimarLines[indexs]].push(saveDifferentitempin[indexs]);
                                saveenergyPos[savesilimarLines[indexs]].push(saveDifferentitempin[indexs]);//Agrega en la linea de energia en curso el nuevo item
                                savelineEnergized[savesilimarLines[indexs]] = false;//No se completa el ciclo
                            }
                        });
                        //console.log("??????????????????????????????");
                        //console.log(infoConnections);
                        //console.log(saveConnectionitem);
                        var contItem = 0;//Contador para datos almacenados en "saveConnectionitem"
                        infoConnections.forEach(function(items,indexs){//Busca si en la lineas que se van a gregar, estan chocan con negativo, o se agregan directo
                            if(items.includes(true) === true){//Si incluye "true", se agregan a los items extras que chocan, a la linea temporal
                                temporaryEnergypos[savesilimarLines[indexs]].push(saveConnectionitem[contItem]);
                                console.log("CAMBIO DE LINEA DE ENERGIA "+savesilimarLines[indexs]);
                                contItem++;//Aumenta contador para datos almacenados en "saveConnectionitem"
                            }
                        }); 
                    }else{
                        savelineEnergized[saveindexLine] = true;//Agrega que linea de energia positiva, ya completo el ciclo con negativo
                        saveDifferentitempin.forEach(function(items,indexs){//Busca los items almacenados de pines diferentes a energia positiva
                            temporaryEnergypos[saveindexLine].push(items);
                        });
                        
                    }
                    
                }
                
                //addbtnswitchLine();
                
                if(getObj.name.split(" ")[1] === "rgb" || getObj.name.split(" ")[1] === "preset" || getObj.name.split(" ")[1] === "pushbutton" || getObj.name.split(" ")[1] === "ultrasonic"){//Caso de ciertos objetos con mas pines diferentes (RGB, preset, etc)
                    addnameObjspos[saveindexLine].push(savenameObj);//Agrega en la linea de energia el nuevo nombre (si choca con negativo, de todas formas se agrega el nombre)
                    for(var i=1; i<=saveDifferentitempin.length-1; i++){//Agrega los nuevos nombres de las nuevas lineas de energia, en relacion al total de los pines nuevos
                        addnameObjspos.push([]);//Agrega espacio para nuevo nombre de linea de energia
                        var saveAddlines;//Almacena temporalmente la nueva linea de nombres que se va a agregar (su posicion, ya que al agregar dos componentes con varios pines, son varias las lineas que se agregan)
                        addnameObjspos.forEach(function(ite,ind){//Busca las lineas de energia
                            if(ite.length === 0){//Encuantra la linea que se agrego, para agregar los datos correspondientes
                                saveAddlines = ind;//Almacena temporalmente la nueva linea de nombres que se va a agregar (su posicion, ya que al agregar dos componentes con varios pines, son varias las lineas que se agregan)
                            }
                            });
                        addnameObjspos[saveindexLine].forEach(function(ite,ind){//Busca los nombres de la linea de energia principal
                            addnameObjspos[saveAddlines].push(ite);//Agrega en la nueva linea de energia el nuevo item
                        });
                    }
                }else{//Casos para objetos con un pin diferente
                    addnameObjspos[saveindexLine].push(savenameObj);//Agrega en la linea de energia el nuevo nombre (si choca con negativo, de todas formas se agrega el nombre)
                }
            }
            
            function findNamelines(){
                /*
                * NOMBRE: findNamelines.
                * UTILIDAD: Encuentra los items que se van a agregar a la nueva linea de energia
                * ENTRADAS: Ninguna.
                * SALIDAS: Ninguna.
                */
                scene.children.forEach(function(item,index){//Busca todos los objetos en escenario
                    if(item.name.split(" ")[0] != "grl" && item.name.split(" ")[0] != "null"){//Objetos que se mueven
                        if(item.name.split(" ")[0] != "jumperPow" && item.name.split(" ")[0] != "jumper"){//No considera cables
                            if(item.name.split(" ")[1] != "pinPowerneg" && item.name.split(" ")[1] != "pinPowerpos"){//No considera cable energia
                                if(item.name.split(" ")[1] === "pinA" || item.name.split(" ")[1] === "pinB"){//Son cables
                                    if(item.name.split(" ")[1] === "pinA"){//Solo agrega uno, porque A y B contienen la misma info
                                        findEqualitem(item);//Encuentra el nombre del objeto que tiene el mismo item del objeto de donde sale la nueva linea de energia, con el mismo del objeto anterior en sus pines extras
                                    }
                                }else{
                                    findEqualitem(item);//Encuentra el nombre del objeto que tiene el mismo item del objeto de donde sale la nueva linea de energia, con el mismo del objeto anterior en sus pines extras, para obtener de que nombre de objeto hacia atras se copian a la nueva linea de energia
                                }
                            }
                        }
                    }
                });
                function findEqualitem(objeto){
                    /*
                    * NOMBRE: findEqualitem.
                    * UTILIDAD: Encuentra el nombre del objeto que tiene el mismo item del objeto de donde sale la nueva linea de energia, con el mismo del objeto anterior en sus pines extras, para obtener de que nombre de objeto hacia atras se copian a la nueva linea de energia
                    * ENTRADAS: Ninguna.
                    * SALIDAS: Ninguna.
                    */
                    //console.log("OBJETO°°°°°°°°°°°°");
                    //console.log(objeto.name);
                    //console.log(objeto.newInfo.pinDifferent);
                    //console.log(saveMiddleitem);
                    objeto.newInfo.pinDifferent.forEach(function(item2,index2){//Busca los pines indices diferentes de cada objeto
                        if(objeto.newInfo.usedLines[item2] === saveMiddleitem){//Busca los items que son diferentes a la energia positiva que coincide, y que sea igual al item del objeto de la nueva linea de energia
                            //console.log("ACCION==============");
                            //console.log(objeto);
                            objnameEqual = objeto.name;//Almacena el nombre del objeto de donde parte hacia atras para copiar a la nueva linea de energia
                        }
                    });
                }
                //console.log("NOMBRE DE OBJETO QUE COINCIDE");
                //console.log(objnameEqual);
                //console.log(addnameObjspos[saveindexLine]);
                addnameObjspos[saveindexLine].forEach(function(item,index){//Busca en las linea en curso (antes de agregar nueva linea) de energia por nombre
                    if(item === objnameEqual){//El nombre coincide en la linea de energia, con el nombre de la nueva linea
                        //console.log("INDEX DE NOMBRE IGUAL");
                        //console.log(index);
                        savenamesNew = addnameObjspos[saveindexLine].slice(0, index+1);//Almacena los nombres de los objetos que se van a copiar a la nueva linea de energia
                    }
                });
            }
        }
        
        contSearch++;//Aumenta el conteo para ejecutar la funcion
        if(contSearch <= contObjs){//Entra el total de veces que objetos en escenario (se hace porque no existe orden en el posicionamiento de objetos)
            searchEnergy();//Ejecuta de nuevo la funcion, para encontrar los objetos faltantes
        }
    }


    
    console.log("////////POSITIVO INICIAL////////");
    console.log(saveenergyPos);
    console.log("-------------------------------");
    
    console.log("////////POSITIVO FULL////////");
    console.log(temporaryEnergypos);
    console.log("-------------------------------");
    
    console.log("////////NOMBRE +////////");
    console.log(addnameObjspos);
    console.log("-------------------------------");
    
    console.log("////////INTERSECCIONES////////");
    console.log("////////INTERSECCIONES////////");
    console.log(saveintersectionPosneg);
    console.log("-------------------------------");
    
    console.log("////////LINEAS CON ENERGIA////////");
    console.log(savelineEnergized);
    console.log("-------------------------------");
    
    
}

var newLineenergyitem = [];//Almacena lineas final de energia items
var newLineenergyname = [];//Almacena lineas final de energia names
var newLineenergypostemporary = [];//Almacena lineas temporal de lineas finales positivo items
var newLineenergynegtemporary = [];//Almacena lineas temporal de lineas finales negativo items
var newpinSwitchget = [];//Almacena lineas final de btn de switch
function joinEnergy(){
    /*
	* NOMBRE: joinEnergy.
	* UTILIDAD: Une lineas de energia, para crear una matriz de lineas finales
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    newLineenergyitem = [];//Resetea lineas final de energia items
    newLineenergyname = [];//Resetea lineas final de energia names
    newLineenergypostemporary = [];//Resetea lineas temporal de lineas finales positivo items
    newLineenergynegtemporary = [];//Resetea lineas temporal de lineas finales negativo items
    
    newpinSwitchget = [];//Resetea lineas final de btn de switch
    
    var contLines = 0;//Contador para aumentar las nuevas lineas
    
    console.log("////////POSITIVO////////");
    console.log(temporaryEnergypos);
    console.log(addnameObjspos);
    console.log("////////NEGATIVO////////");
    console.log(saveenergyNeg);
    console.log(addnameObjsneg);
    console.log("////////PINSWITCHGET////////");
    console.log(pinSwitchgetpos);
    console.log(pinSwitchgetneg);
    
    
    temporaryEnergypos.forEach(function(itemPos,indexPos){
        
        saveenergyNeg.forEach(function(itemNeg,indexNeg){

                if(itemNeg.includes(itemPos[itemPos.length-1]) === true){//Si la linea negativa incluye algun item final de la linea positiva
                //if(itemPos[itemPos.length-1] === itemNeg[itemNeg.length-1]){//Si algun item final de la linea positiva es igual a un item final de la linea negativa
                    
                    console.log("LINE POS "+indexPos+" LINE NEG "+indexNeg);
                    newLineenergyitem.push([]);//Crea linea nueva de lineas final de energia items
                    newLineenergyname.push([]);//Crea linea nueva de lineas final de energia names
                    newLineenergypostemporary.push([]);//Crea linea temporal de lineas finales positivo items
                    newLineenergynegtemporary.push([]);//Crea linea temporal de lineas finales negativo items
                    
                    newpinSwitchget.push([]);//Crea linea nueva de btns switch de energia
                    
                    //Agrega pin switch
                    pinSwitchgetpos[indexPos].forEach(function(itePos,indPos){//Busca en linea positiva btns switch
                        newpinSwitchget[contLines].push(itePos);//Almacena btns positivos a linea final
                    });
                    pinSwitchgetneg[indexNeg].forEach(function(itePos,indPos){//Busca en linea negativa btns switch
                        newpinSwitchget[contLines].push(itePos);//Almacena btns negativos a linea final
                    });
                    
                    //Agrega items
                    temporaryEnergypos[indexPos].forEach(function(itePos,indPos){//Busca en linea temporal positiva items
                        newLineenergyitem[contLines].push(itePos);//Almacena items (positivos) de lineas final de energia items
                    });
                    saveenergyNeg[indexNeg].forEach(function(itePos,indPos){//Busca en linea negativa items
                        newLineenergyitem[contLines].push(itePos);//Almacena items (negativos) de lineas final de energia items
                    });
                    
                    //Agrega names
                    addnameObjspos[indexPos].forEach(function(itePos,indPos){//Busca en linea positiva items
                        newLineenergyname[contLines].push(itePos);//Almacena items (positivos) de lineas final de energia names
                    });
                    addnameObjsneg[indexNeg].forEach(function(itePos,indPos){//Busca en linea negativa items
                        newLineenergyname[contLines].push(itePos);//Almacena items (negativos) de lineas final de energia names
                    });
                    
                    //Agrega temporary pos
                    temporaryEnergypos[indexPos].forEach(function(itePos,indPos){//Busca en linea temporal positiva items
                        newLineenergypostemporary[contLines].push(itePos);//Almacena lineas temporal de lineas finales positivo items
                    });
                    
                    //Agrega temporary neg
                    saveenergyNeg[indexNeg].forEach(function(itePos,indPos){//Busca en linea negativa items
                        newLineenergynegtemporary[contLines].push(itePos);//Almacena lineas temporal de lineas finales negativo items
                    });
                    contLines++;//Aumenta contador para aumentar las nuevas lineas
                }
        });
    });
    console.log("/////////FINAL ENERGY/////////");
    console.log(newLineenergyitem);
    console.log("//////////FINAL NAME//////////");
    console.log(newLineenergyname);
    console.log("///////FINAL TEMPORARY POS////////");
    console.log(newLineenergypostemporary);
    console.log("///////FINAL TEMPORARY NEG////////");
    console.log(newLineenergynegtemporary);
    console.log("///////FINAL NEWPINSWITCHGET////////");
    console.log(newpinSwitchget);
}
function saveObjinf(){
    /*
	* NOMBRE: saveObjinf.
	* UTILIDAD: Guarda datos de práctica
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    
    save_components = [];//Almacena la practica (se define en pxb)
    scene.children.forEach(function(item){//Busca elementos de escena
        if(item.name.split(" ")[0] != "null" && item.name.split(" ")[0] != "grl" && item.name.split(" ")[0]){//Quita elementos que son default o que no se agregaron despues
            save_components.push(
                {
                    name: item.name,
                    newInfo: {
                        areaLimit: item.newInfo.areaLimit,
                        coordLine: item.newInfo.coordLine,
                        data: item.newInfo.data,
                        name: item.newInfo.name,
                        objManipulated: item.newInfo.objManipulated,
                        pinDifferent: item.newInfo.pinDifferent,
                        polarity: item.newInfo.polarity,
                        posEnergy: item.newInfo.posEnergy,
                        posLimite: item.newInfo.posLimite,
                        tooltipData: item.newInfo.tooltipData,
                        usedLines: item.newInfo.usedLines,
                        val: item.newInfo.val,
                        typeEnergy: item.newInfo.typeEnergy,
                    },
                    position: item.position,
                    rotation: item.rotation,
                    objColor: []
                }
            );//Agrega info de componentes
            if(item.name.split(' ')[1] === 'led' || item.name.split(' ')[1] === 'rgb' || item.name.split(' ')[1] === 'rgbc'){//Caso color 
                save_components[save_components.length-1].objColor = [item.children[1].material.color.r,item.children[1].material.color.g,item.children[1].material.color.b];//Almacena color
            }
            if(item.name.split(' ')[1] === 'preset'){//Caso color perilla
                save_components[save_components.length-1].objColor = [item.children[4].material.color.r,item.children[4].material.color.g,item.children[4].material.color.b];//Almacena color
            }
            if(item.name.split(' ')[1] === 'resistance'){//Caso color franjas
                save_components[save_components.length-1].objColor = [[item.children[1].material.color.r,item.children[1].material.color.g,item.children[1].material.color.b],
                [item.children[2].material.color.r,item.children[2].material.color.g,item.children[2].material.color.b], [item.children[3].material.color.r,item.children[3].material.color.g,item.children[3].material.color.b], [item.children[4].material.color.r,item.children[4].material.color.g,item.children[4].material.color.b], [item.children[5].material.color.r,item.children[5].material.color.g,item.children[5].material.color.b]];//Almacena color
            }
            if(item.name.split(' ')[0] === 'jumper'){//Caso color cable
                save_components[save_components.length-1].objColor = [item.material.color.r,item.material.color.g,item.material.color.b];//Almacena color
            }
        }

        
        if(item.name.split(" ")[1] === "powerbank"){
            save_components.push(
                {
                    name: item.name
                }
            );//Agrega info de componentes
        }
    });
    //uploadProject();
}
function openObjinf(){
    /*
	* NOMBRE: openObjinf.
	* UTILIDAD: Abre datos de práctica
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    deletePrev();//Elimina objetos en escena
    let nombre_estructura = $("#menuArchivo").val();
    for (var i = 0; i < dataPractices.length; i++) {
        if (nombre_estructura == dataPractices[i].saved_name) {
            var pos = i;
            break;
        }
    }
    var get_components = JSON.parse(dataPractices[pos].saved_json);
    console.log(get_components);
    openNew(get_components);//Abre el proyecto con la info almacenada
    showMessage('Práctica cargada con éxito', 1);
    emergenteGestosclose();//Cierra emergente de gestos
}
function deletePrev(){
    /*
    * NOMBRE: deletePrev.
    * UTILIDAD: Elimina objetos en escena
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    var saveComponentsdelete = [];//Almacena nombre de objetos a eliminar
    scene.children.forEach(function(item,index){//Busca elementos de escena
        //console.log(item.name);
        if(item.type != 'GridHelper' && item.type != 'AmbientLight' && item.type != 'SpotLight' && item.type != 'Object3D' && item.name.split(" ")[1] != 'protoboard' && item.name.split(" ")[1] != 'planeGeometry' && item.name.split(" ")[1] != 'accontact'){//Elementos que no se deben de borrar
            if(item.name.split(" ")[1] === "pinPowerpos"){//Busca el objeto a eliminar
                saveComponentsdelete.push(item.name);//Almacena nombre de objeto a eliminar
            }
            if(item.name.split(" ")[1] === "pinA"){//Busca el objeto a eliminar
                saveComponentsdelete.push(item.name);//Almacena nombre de objeto a eliminar
            }
            if(item.name.split(" ")[1] != "pinPowerpos" && item.name.split(" ")[1] != "pinPowerneg" && item.name.split(" ")[0] != "jumperPow" && item.name.split(" ")[1] != "pinA" && item.name.split(" ")[1] != "pinB" && item.name.split(" ")[0] != "jumper"){//Busca el objeto a eliminar
                saveComponentsdelete.push(item.name);//Almacena nombre de objeto a eliminar
            }
        }
    });
    console.log(saveComponentsdelete);
    $(".d_pxbentorno3dcoordmove").remove();//Quita coordenadas de cada objeto
    saveComponentsdelete.forEach(function(itemName){//Recorre los nombres guardados
        scene.children.forEach(function(item){//Busca elementos de escena
            objetoGrl = null;//Resetea variable de objeto almacenado
            objNamegrl = null;//Resetea variable de objeto almacenado
            pinbGrl = null;//Resetea variable de objeto almacenado
            wireGrl = null;//Resetea variable de objeto almacenado
            wireGrl2 = null;//Resetea variable de objeto almacenado
            usbObj = null;//Resetea variable de objeto almacenado
            energyadapter = null;//Resetea variable de objeto almacenado
            if(itemName === item.name){//Si el nombre almacenado coincide con un objeto
                if(itemName.split(" ")[1] === "pinPowerpos"){//Busca el objeto a eliminar
                    console.log("ENCUENTRA PIN A");
                    objetoGrl = item;//Obtiene el objeto a eliminar
                    objNamegrl = item.name.split(" ")[1];//Obtiene el nombre del objeto
                    var contJUmperpow = true;//Conteo de solo un cable de jumper de corriente
                    scene.children.forEach(function(item2,index2){//Busca elementos de escena
                        if(item2.name.split(" ")[1] === "pinPowerneg"){//Busca el objeto a eliminar
                            pinbGrl = item2;//Obtiene el objeto a eliminar
                        }
                        else if(item2.name.split(" ")[0] === "jumperPow" && contJUmperpow){//Busca el objeto a eliminar
                            wireGrl = item2;//Obtiene el objeto a eliminar
                            contJUmperpow = false;//Termina conteo de un solo cable de jumper de corriente
                        }
                        else if(item2.name.split(" ")[0] === "jumperPow"){//Busca el objeto a eliminar
                            wireGrl2 = item2;//Obtiene el objeto a eliminar
                        }
                        else if(item2.name.split(" ")[1] === "usb"){//Busca el objeto a eliminar
                            usbObj = item2;//Obtiene el objeto a eliminar
                        }
                        else if(item2.name.split(" ")[1] === "energyadapter"){//Busca el objeto a eliminar
                            energyadapter = item2;//Obtiene el objeto a eliminar
                        }
                    });
                }
                else if(itemName.split(" ")[1] === "pinA"){//Busca el objeto a eliminar
                    objetoGrl = item;//Obtiene el objeto a eliminar
                    objNamegrl = item.name.split(" ")[1];//Obtiene el nombre del objeto
                    var saveData = Number(item.name.split(" ")[0]);
                    scene.children.forEach(function(item2,index2){//Busca elementos de escena
                        if(item2.name === (saveData+1)+" pinB"){//Busca el objeto a eliminar
                            pinbGrl = item2;//Obtiene el objeto a eliminar
                        }
                        else if(item2.name === "jumper "+saveData+" "+(saveData+1)){//Busca el objeto a eliminar
                            wireGrl = item2;//Obtiene el objeto a eliminar
                        }
                    });
                }
                else{
                    objetoGrl = item;//Obtiene el objeto
                    objNamegrl = item.name.split(" ")[1];//Obtiene el nombre del objeto
                }
                if(objNamegrl === "pinA"){//Casos se selecciona un pinA
                    getpinpowerA = false;//Deselecciona pinPower
                    getpinpowerB = false;//Deselecciona pinPower
                    getpinA = true;//Se selecciona pinA
                    getpinB = false;//Deselecciona pinB
                }else if(objNamegrl === "pinB"){//Casos se selcciona un pinB
                    getpinpowerA = false;//Deselecciona pinPower
                    getpinpowerB = false;//Deselecciona pinPower
                    getpinA = false;//Deselecciona pinA
                    getpinB = true;//Se selecciona pinB
                }else if(objNamegrl === "pinPowerpos"){//Casos se selcciona un pinB
                    getpinpowerA = true;//Deselecciona pinPower
                    getpinpowerB = false;//Deselecciona pinPower
                    getpinA = false;//Deselecciona pinA
                    getpinB = false;//Deselecciona pinB 
                }else if(objNamegrl === "pinPowerneg"){//Casos se selcciona un pinB
                    getpinpowerA = false;//Deselecciona pinPower
                    getpinpowerB = true;//Deselecciona pinPower
                    getpinA = false;//Deselecciona pinA
                    getpinB = false;//Deselecciona pinB 
                }else{//NO se selecciona ningun pin
                    getpinpowerA = false;//Deselecciona pinPower
                    getpinpowerB = false;//Deselecciona pinPower
                    getpinA = false;//Deselecciona pinA
                    getpinB = false;//Deselecciona pinB 
                }
                var nameObj;//Almacena temporalmente el nombre del objeto que se elimina
                if(itemName.split(" ")[1] === "pinPowerpos"){//Caso de cdcable
                    nameObj = "cdcable";//Asigna el nombre de cd cable
                }else{
                    nameObj = itemName.split(" ")[1];//Asigna el nombre del objeto
                }
                removeRestcomponent(nameObj);//Quita btn de eliminar component y funcionalidad del btn
                deleteBtn();//Eliminacion de cada objeto
            }
        });
    });
}
function openNew(set_components){
    /*
    * NOMBRE: openNew.
    * UTILIDAD: Abre el proyecto con la info almacenada
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    contObj = 0;//Resetea el conteo de objetos
    var statusJumperpow = true;//Limita el cable de energia a solo 1 cable
    var getTypeenergy;//Almacena info de pinPowerpos en typeEnergy, para saber si es cdcable o acadapter
    set_components.forEach(function(item){//Recupera datos almacenado
        if(item.name.split(" ")[1] === "pinPowerpos"){//Siempre va antes del jumperPow, y se obtiene info para saber si es cdcable o acadapter - Se almacena antes, porque para contruir el modelo se ocupa el jumperPow, y esa info se almacena en el pinPowerpos
            getTypeenergy = item.newInfo.typeEnergy;//Almacena info de pinPowerpos en typeEnergy, para saber si es cdcable o acadapter
        }
        if(item.name.split(" ")[1] != "pinA" && item.name.split(" ")[1] != "pinB" && item.name.split(" ")[1] != "pinPowerpos" && item.name.split(" ")[1] != "pinPowerneg"){//No incluye pines, porque al crear el objeto solo se ocupa el dato principal (que es jumper), y el jumper crea 3 elementos
            if(item.name.split(" ")[0] === "jumper"){//Caso jumper
                addObjects("jumper");//Agrega objetos con el nombre solamente (la numeracion se agrega en la funcion)
                setNewdata('jumper');//Asigna el color a los componentes
            }else if(item.name.split(" ")[0] === "jumperPow"){//Caso cd cable (un solo cable)
                if(statusJumperpow){//Acepta solo un cable de energia
                    console.log(getTypeenergy);
                    if(getTypeenergy === "usb"){//Es cdcable
                        addObjects("cdcable");//Agrega objetos con el nombre solamente (la numeracion se agrega en la funcion)
                        setNewdata('cdcable');//Asigna el color a los componentes
                    }
                    if(getTypeenergy === "energyadapter"){//Es acadapter
                        addObjects("acadapter");//Agrega objetos con el nombre solamente (la numeracion se agrega en la funcion)
                        setNewdata('acadapter');//Asigna el color a los componentes
                    }
                    statusJumperpow = false;//Limita el cable de energia a solo 1 cable
                }
            }else if(item.name.split(" ")[1] === "powerbank"){//Caso cd cable
                addObjects("powerbank");//Agrega objetos con el nombre solamente (la numeracion se agrega en la funcion)
            }else{//Caso demas componentes
                addObjects(item.name.split(" ")[1]);//Agrega objetos con el nombre solamente (la numeracion se agrega en la funcion)
                setNewdata('all');//Asigna el color a los componentes
            }
        }
        function setNewdata(typeComponent){
            /*
            * NOMBRE: setNewdata.
            * UTILIDAD: Asigna el color a los componentes
            * ENTRADAS: typeComponent > tipo de componente.
            * SALIDAS: Ninguna.
            */
    
            if(typeComponent === "all"){//Caso componentes diferentes a jumper
                var saveDatacomponent = scene.children[scene.children.length-1];//Guarda el ultimo componente agregado
                //Aqui se cambian los valores de posicion, rotacion y newinfo
                saveDatacomponent.position.set(item.position.x,item.position.y,item.position.z);//Asigna posicion a componente
                saveDatacomponent.rotation.set(item.rotation._x,item.rotation._y,item.rotation._z);//Asigna rotacion a componente
                saveDatacomponent.newInfo = item.newInfo;//Asigna info a componente
                for(let index in saveDatacomponent.children){//Busca todos los elementos hijos del objeto
                    if(saveDatacomponent.children[index].name != 'data'){//Elementos que no sean tooltips
                        //LED, RGBc
                        if(saveDatacomponent.children[index].material.name === "led_color"){
                            saveDatacomponent.children[index].material.color = new THREE.Color(item.objColor[0], item.objColor[1], item.objColor[2]);//Asigna color
                        }
                        //RESISTANCE
                        if(saveDatacomponent.children[index].material.name === "resistance_color"){
                            saveDatacomponent.children[index].material.color = new THREE.Color(item.objColor[0][0], item.objColor[0][1], item.objColor[0][2]);//Asigna color
                        }
                        if(saveDatacomponent.children[index].material.name === "resistance_1strip"){
                            saveDatacomponent.children[index].material.color = new THREE.Color(item.objColor[1][0], item.objColor[1][1], item.objColor[1][2]);//Asigna color
                        }
                        if(saveDatacomponent.children[index].material.name === "resistance_2strip"){
                            saveDatacomponent.children[index].material.color = new THREE.Color(item.objColor[2][0], item.objColor[2][1], item.objColor[2][2]);//Asigna color
                        }
                        if(saveDatacomponent.children[index].material.name === "resistance_tolerance"){
                            saveDatacomponent.children[index].material.color = new THREE.Color(item.objColor[3][0], item.objColor[3][1], item.objColor[3][2]);//Asigna color
                        }
                        if(saveDatacomponent.children[index].material.name === "resistance_multiplier"){
                            saveDatacomponent.children[index].material.color = new THREE.Color(item.objColor[4][0], item.objColor[4][1], item.objColor[4][2]);//Asigna color
                        }
                        //PRESET
                        if(saveDatacomponent.children[index].material.name === "preset_texture_capucha_color"){
                            saveDatacomponent.children[index].material.color = new THREE.Color(item.objColor[0], item.objColor[1], item.objColor[2]);//Asigna color
                        }
                    }else{//Elemento tooltip light
                        
                        
                        saveDatacomponent.children[index].children.forEach(function(itemLight){//Busca elementos tooltip
                            if(itemLight.name === "light"){//Busca light
                                console.log("CAMBIA COLOR");
                                console.log(item.objColor);
                                //itemLight.material.color = new THREE.Color(0x0000ff);//Asigna color light
                                itemLight.material.color = new THREE.Color(item.objColor[0], item.objColor[1], item.objColor[2]);//Asigna color light
                                
                                //console.log(itemLight.material);
                                console.log(itemLight.material);
                            }
                        });
                    }
                }
            }
            if(typeComponent === "cdcable" || typeComponent === "acadapter"){//Caso componentes diferentes a jumper
                var saveDatacomponent_a = scene.children[scene.children.length-4];//Guarda el pinpowerA del ultimo componente agregado
                var saveDatacomponent_b = scene.children[scene.children.length-2];//Guarda el pinpowerB del ultimo componente agregado
                var saveDatacomponent_c = scene.children[scene.children.length-1];//Guarda el wire ultimo componente agregado
                var saveDatacomponent_d = scene.children[scene.children.length-3];//Guarda el wire del ultimo componente agregado
                set_components.forEach(function(itemObjsaved){//Busca los datos guardados
                    if(itemObjsaved.name === saveDatacomponent_a.name){//Busca el dato guardado con el pinA del jumper
                        saveDatacomponent_a.position.set(itemObjsaved.position.x,itemObjsaved.position.y,itemObjsaved.position.z);//Asigna posicion pinpowerA
                        saveDatacomponent_a.rotation.set(itemObjsaved.rotation._x,itemObjsaved.rotation._y,itemObjsaved.rotation._z);//Asigna rotacion pinpowerA
                        saveDatacomponent_a.newInfo = itemObjsaved.newInfo;//Asigna info pinpowerA
                    }
                    if(itemObjsaved.name === saveDatacomponent_b.name){//Busca el dato guardado con el pinB del jumper
                        saveDatacomponent_b.position.set(itemObjsaved.position.x,itemObjsaved.position.y,itemObjsaved.position.z);//Asigna posicion pinpowerB
                        saveDatacomponent_b.rotation.set(itemObjsaved.rotation._x,itemObjsaved.rotation._y,itemObjsaved.rotation._z);//Asigna rotacion pinpowerB
                        saveDatacomponent_b.newInfo = itemObjsaved.newInfo;//Asigna info pinpowerB
                    }
                });
                getpinA = false;//Deselecciona pinA
                getpinB = false;//Deselecciona pinB
                //Posiciona pinpowerA
                getpinpowerA = true;//Se selecciona pinpowerA
                wireGrl = saveDatacomponent_c;//Establece el cable
                objetoGrl = saveDatacomponent_a;//Establece el pinpowerA
                curveFollow();//Points catmull siguen la posicion de las puntos clave  
                getpinpowerA = false;//Deselecciona pinpowerA
                //Posiciona pinpowerB
                getpinpowerB = true;//Se selecciona pinpowerB
                wireGrl = saveDatacomponent_d;//Establece el cable
                objetoGrl = saveDatacomponent_b;//Establece el pinpowerB
                curveFollow();//Points catmull siguen la posicion de las puntos clave 
                getpinpowerB = false;//Deselecciona pinpowerB
            }
            if(typeComponent === "jumper"){//Caso jumper
                var saveDatacomponent_a = scene.children[scene.children.length-3];//Guarda el el pinA del ultimo componente agregado
                var saveDatacomponent_b = scene.children[scene.children.length-2];//Guarda el el pinB del ultimo componente agregado
                var saveDatacomponent_c = scene.children[scene.children.length-1];//Guarda el ultimo componente agregado (wire)
                set_components.forEach(function(itemObjsaved){//Busca los datos guardados
                    //console.log(itemObjsaved);
                    if(itemObjsaved.name === saveDatacomponent_a.name){//Busca el dato guardado con el pinA del jumper
                        saveDatacomponent_a.position.set(itemObjsaved.position.x,itemObjsaved.position.y,itemObjsaved.position.z);//Asigna posicion pinA
                        saveDatacomponent_a.rotation.set(itemObjsaved.rotation._x,itemObjsaved.rotation._y,itemObjsaved.rotation._z);//Asigna rotacion pinA
                        saveDatacomponent_a.newInfo = itemObjsaved.newInfo;//Asigna info pinA
                    }
                    if(itemObjsaved.name === saveDatacomponent_b.name){//Busca el dato guardado con el pinB del jumper
                        saveDatacomponent_b.position.set(itemObjsaved.position.x,itemObjsaved.position.y,itemObjsaved.position.z);//Asigna posicion pinB
                        saveDatacomponent_b.rotation.set(itemObjsaved.rotation._x,itemObjsaved.rotation._y,itemObjsaved.rotation._z);//Asigna rotacion pinB
                        saveDatacomponent_b.newInfo = itemObjsaved.newInfo;//Asigna info pinB
                    }
                    if(itemObjsaved.name === saveDatacomponent_c.name){//Busca el dato guardado con el cable del jumper
                        //console.log("ENTRA");
                        //console.log(saveDatacomponent_c);
                        saveDatacomponent_c.material.color = new THREE.Color(itemObjsaved.objColor[0], itemObjsaved.objColor[1], itemObjsaved.objColor[2]);//Asigna color wire
                    } 
                });
                getpinpowerA = false;//Deselecciona pinpowerA
                getpinpowerB = false;//Deselecciona pinpowerB
                //Posiciona pinA
                getpinA = true;//Se selecciona pinA
                wireGrl = saveDatacomponent_c;//Establece el cable
                objetoGrl = saveDatacomponent_a;//Establece el pinA
                curveFollow();//Points catmull siguen la posicion de las puntos clave  
                getpinA = false;//Deselecciona pinA
                //Posiciona pinB
                getpinB = true;//Se selecciona pinB
                wireGrl = saveDatacomponent_c;//Establece el cable
                objetoGrl = saveDatacomponent_b;//Establece el pinB
                curveFollow();//Points catmull siguen la posicion de las puntos clave 
                getpinB = false;//Deselecciona pinB
            }
        }
    });
    console.log("ABIERTO CORRECTAMENTE");
    console.log(scene.children); 
}