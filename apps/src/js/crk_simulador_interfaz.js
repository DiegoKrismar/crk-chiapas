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
var anchoSet;//Ancho del canvas
var altoSet;//Alto del canvas

//Local
//var IP = "http://"+document.domain+"/Interfaz_gltf/";//Dominio
//var gltfPrefijo = "src/gltf/crk_simulador_interfaz_";//Almacena parte de la ruta de archivos gltf
//var imgPrefijo = "src/img/crk_simulador_interfaz_";//Almacena parte de la ruta de archivos img

//Al subir
var gltfPrefijo = "../src/gltf/crk_simulador_interfaz_";//Almacena parte de la ruta de archivos gltf
var imgPrefijo = "../src/img/crk_simulador_interfaz_";//Almacena parte de la ruta de archivos img


var rutaSRC = "../src/img/";//Almacena parte de la ruta src
var renderer, scene, camera, controls, grid, axesHelper, labelRenderer;
var ambientLight, spotLight1, spotLight2;//Lights
var mdfTexture, ledlightTexture, ledposTexture, lednegTexture;//Textures
var mdfMaterial, strawMaterial, stickMaterial, ropeMaterial, metalMaterial, flexMaterial, ledlightMaterial, ledposMaterial, lednegMaterial,ultrasonicMaterial;//Materials
var mdfinColor, mdfoutColor, strawColor, stickColor, cuentasColor, ropeColor, ledColor, resistanceColor, resistanceStrip1, resistanceStrip2, resistanceMultiplier, resistanceTolerance, metalColor, arrowinColor, arrowoutColor;//Colors
var gltfClone, meshClone, helperClone, shapeGroup, groupClone;//Objects
var strawGeometry, stickGeometry, sticklightGeometry;//Geometry
var strawMesh, stickMesh,sticklightMesh, gltfMesh, helperMesh;//Mesh

var allGltf = {};//Guarda los GLTF originales
var allShapes = {};//Guarda los SHAPES originales
var allHelpers = {};//Guarda los HELPERS originales
var countPiezas = 0;//Conteo de piezas creadas gltf
var allClonegltf = [];//Guarda los clones de los gltf
var allClones = [];//Guarda los clones de los SHAPES

var turn180 = 3.14159;//Giro 180°
var turn90 = 1.5708;//Giro 90°
var turn45 = 0.785398;//Giro 45°
var turn20 = 0.349066;//Giro 20°
var turn10 = 0.174533;//Giro 10°
var turn5 = 0.0872665;//Giro 5°

var girRad = Math.PI/180;//Medida de 1º en radianes. Este se multiplica por los grados

var objVis = true;

var prevPosscene;//Posicion inicial de la escena antes de la animacion en cada paso
var prevPoscamera;//Posicion inicial de la camara antes de la animacion en cada paso

var setCamerapos = [];//Establece la posicion de la camara
var setScenepos = [];//Establece la posicion de la escena

var contPiezasshape = 0;//Conteo de construccion piezas SHAPE
var contPiezashelper = 0;//Conteo de construccion piezas HELPERS

var gridPosy;//Posicion de la reticula en cada modelo

var groupprov = [];//Guarga los grupos de cada armado, para despues clonarlos

var setRope = false;//Establece si hay animacion para cuerda
var groupCatmull, pointsCatmull, geometryLine, materialLine, strokeLine, geometryTube, meshTube;//Almacena elementos para la cuerda
var easeEffect = TWEEN.Easing.Quadratic.Out;//Efecto ease para tween
var startInit = false;//Determina si hay canvas 3d en la aplicacion

var arrayGltf = [];//Guarda los GLTF que se construyen en cada practica.
defineCategoria = "simulador";//Define el tipo de categoria
/*************************************************************************************
*
* 								FUNCIONES Y PROCEDIMIENTOS
*
**************************************************************************************/
$(document).ready(function(){});
$(window).resize(function() {});
$(window).on('load',function(){
    /*
	* NOMBRE: load.
	* UTILIDAD: Una vez abierto el dom
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    muestraInstrucciones();//Muestra las instrucciones de la aplicación.
});
$(window).on("orientationchange",function(event){})
function iniciaSimulador(){
    /*
	* NOMBRE: iniciaSimulador.
	* UTILIDAD: Inicia simulacion 3d
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    if(startInit){//Hay canvas 3d en la aplicacion
        if(getType === "pxb"){//Crea canvas para electronica
            $(".d_pxbviewcanvas").attr('id','d_contegrlcanvas');//Agrega id para crear canvas
        }else{//Crea canvas para mecanica
            $(".d_contegrlcanvas").attr('id','d_contegrlcanvas');//Agrega id para crear canvas
        }
        init();//Inicia ambiente 3D
    }else{
        $("#d_loadergrl").remove();//Oculta loader de construccion
    } 
}
function reajusteConte3d(){
    /*
	* NOMBRE: reajusteConte3d.
	* UTILIDAD: Reajusta el contenido 3d en resize
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES****/
    anchoSet = $("#d_contegrlcanvas").width();//Ancho del area de contenido
    altoSet = $("#d_contegrlcanvas").height();//Alto del area de contenido
    /**************/
    camera.aspect = anchoSet / altoSet;
    camera.updateProjectionMatrix();
    renderer.setSize(anchoSet, altoSet);
    //Crea render 2d de labels
    var timeRender = setTimeout(function(){
        labelRenderer.setSize(anchoSet,altoSet);
        clearTimeout(timeRender);
    },10);
}
function init(){
    /*
	* NOMBRE: init.
	* UTILIDAD: Inicia ambiente 3D
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
    setRenderer();//Establece el area del render
    setScene();//Establece la escena
    setCamera();//Establece camara
    setControl();//Establece movimiento 3d mouse y touch
    setGrid();//Establece reticula
    setLight();//Establece luces
    setTexture();//Establece las texturas de los objetos
    setColor();//Establece colores
    setMaterial();//Establece materiales
    setGeometry();//Establece geometria
    setMesh();//Establece las mallas
};
function setRenderer(){
    /*
	* NOMBRE: setRenderer.
	* UTILIDAD: Establece el area del render
	* ENTRADAS: Ninguna.
	* VARIABLES****/
    anchoSet = $("#d_contegrlcanvas").width();//Ancho del area de contenido
    altoSet = $("#d_contegrlcanvas").height();//Alto del area de contenido
    /**************/
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){//Es dispositivo
        renderer = new THREE.WebGLRenderer({antialias:false,powerPreference:"low-power"});
        //renderer = new THREE.WebGLRenderer({antialias:false,powerPreference:"low-power"});
    }else{//Es PC
        //renderer = new THREE.WebGLRenderer({antialias:false,powerPreference:"low-power"});
        renderer = new THREE.WebGLRenderer({precision:"highp",antialias:true,powerPreference:"high-performance"});
    }
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(anchoSet,altoSet);
    renderer.domElement.setAttribute('id','d_contegrlcanvas');
    document.getElementById("d_contegrlcanvas").appendChild(renderer.domElement);
    //Crea render 2d de labels
    labelRenderer = new THREE.CSS2DRenderer();
    labelRenderer.setSize(anchoSet,altoSet);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.left = '0px';
    labelRenderer.domElement.setAttribute('id','d_contegrllabels');
    document.getElementById("d_contegrlcanvas").appendChild(labelRenderer.domElement);
}
function setScene(){
    /*
	* NOMBRE: setScene.
	* UTILIDAD: Establece la escena
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * SALIDAS: Ninguna.
	*/
    if(getType === "armado" || getType === "instructivo" || getType === "pxb"){//Acciones de armado
        scene = new THREE.Scene();
        scene.background = new THREE.Color( "#eaeaea" );
    }
    if(getType === "physi"){//Acciones de physi
        scene = new Physijs.Scene;
        scene.setGravity(new THREE.Vector3( 0, -50, 0 ));
        scene.background = new THREE.Color("#eaeaea");
        scene.addEventListener('update', function() {
            scene.simulate( undefined, 1 );
        });
    }
    scene.position.set(setScenepos[0],setScenepos[1],setScenepos[2]);
    prevPosscene = scene.position;//Posicion inicial de la escena.
    scene.updateMatrixWorld();//Actualiza las nuevas posiciones de objetos
}
function setCamera(){
    /*
	* NOMBRE: setCamera.
	* UTILIDAD: Establece camara
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    camera = new THREE.PerspectiveCamera( 54, anchoSet / altoSet, 0.1, 1000 );
    camera.position.set(setCamerapos[0],setCamerapos[1],setCamerapos[2]);//La posicion cambia de acuerdo al paso, pero al construir inicia con esta.
    camera.updateProjectionMatrix();
    camera.aspect = anchoSet/altoSet;
    prevPoscamera = camera.position;//Posicion inicial de la camara.
}
function setControl(){
    /*
	* NOMBRE: setControl.
	* UTILIDAD: Establece movimiento 3d mouse y touch
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    controls = new THREE.OrbitControls(camera, labelRenderer.domElement);
    controls.maxDistance = 600;
    controls.minDistance = 8;
    if(getType === "armado" || getType === "physi" || getType === "instructivo"){//Acciones de physi
        controls.enablePan = false;
    }
    if(getType === "pxb"){
        controls.maxPolarAngle = 1.1;
    }
    controls.update();
}
function setGrid(){
    /*
	* NOMBRE: setGrid.
	* UTILIDAD: Establece reticula
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    grid = new THREE.GridHelper(1000, 100, "#c8c8c8", "#c8c8c8");
    grid.position.y = gridPosy;
    grid.name = "grl gridHelper";
    scene.add(grid);
    axesHelper = new THREE.AxesHelper( 25 );
    axesHelper.name = "grl axesHelper";
    //scene.add( axesHelper );
}
function setLight(){
    /*
	* NOMBRE: setLight.
	* UTILIDAD: Establece luces
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    ambientLight = new THREE.AmbientLight(0xAAAAAA);//Soft white light
    ambientLight.name = "grl ambientLight";
    scene.add(ambientLight);
    spotLight1 = new THREE.SpotLight(0xDDDDDD, 0.7);
    spotLight1.position.set(40,100,-15);
    spotLight1.target = scene;
    spotLight1.name = "grl spotLight1";
    scene.add(spotLight1);
    spotLight2 = new THREE.SpotLight(0xDDDDDD, 0.7);
    spotLight2.position.set(-40,-100,15);
    spotLight2.target = scene;
    spotLight2.name = "grl spotLight2";
    scene.add(spotLight2);
}
function setTexture(){
    /*
	* NOMBRE: setTexture.
	* UTILIDAD: Establece las texturas de los objetos
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    mdfTexture = new THREE.TextureLoader().load( IP+imgPrefijo+"flexLarge_texture.png" );
    mdfTexture.wrapS = THREE.RepeatWrapping;
    mdfTexture.wrapT = THREE.RepeatWrapping;
    mdfTexture.repeat.set( 1, 1 );
    
    ledlightTexture = new THREE.TextureLoader().load( IP+rutaSRC+'crk_entorno3d_rutina_sprite.png' );
    ledlightTexture.wrapS = THREE.RepeatWrapping;
    ledlightTexture.wrapT = THREE.RepeatWrapping;
    ledlightTexture.repeat.set( 0.1, 0.1 );
    ledlightTexture.offset.set( 0.7, 0.0 );
    
    ledposTexture = new THREE.TextureLoader().load( IP+rutaSRC+'crk_entorno3d_rutina_sprite.png' );
    ledposTexture.wrapS = THREE.RepeatWrapping;
    ledposTexture.wrapT = THREE.RepeatWrapping;
    ledposTexture.repeat.set( 0.1, 0.1 );
    ledposTexture.offset.set( 0.9, 0.0 );
    
    lednegTexture = new THREE.TextureLoader().load( IP+rutaSRC+'crk_entorno3d_rutina_sprite.png' );
    lednegTexture.wrapS = THREE.RepeatWrapping;
    lednegTexture.wrapT = THREE.RepeatWrapping;
    lednegTexture.repeat.set( 0.1, 0.1 );
    lednegTexture.offset.set( 0.8, 0.0 );
};
function setColor(){
     /*
	* NOMBRE: setColor.
	* UTILIDAD: Establece colores.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    mdfoutColor = new THREE.Color("rgb(127, 50, 23)");
    mdfinColor = new THREE.Color("rgb(221, 153, 64)");
    arrowinColor = new THREE.Color("rgb(0, 158, 179)");
    arrowoutColor = new THREE.Color("rgb(16, 85, 131)");
    cuentasColor = new THREE.Color("rgb(255, 103, 2)");
    strawColor = new THREE.Color("rgb(10, 131, 194)");
    stickColor = new THREE.Color("rgb(255, 255, 255)");
    ropeColor = new THREE.Color("rgb(0, 205, 230)");
    ledColor = new THREE.Color("rgb(0, 0, 0)");
    ultrasonicColor = new THREE.Color("rgb(0, 0, 0)");
    resistanceColor = new THREE.Color(0xd9b477);
    resistanceStrip1 = new THREE.Color(0xab947e);
    resistanceStrip2 = new THREE.Color(0x504f4f);
    resistanceMultiplier = new THREE.Color(0xdc494e);
    resistanceTolerance = new THREE.Color(0xd1ca41);
    metalColor = new THREE.Color("rgb(179, 179, 179)");
}
function setMaterial(){
    /*
	* NOMBRE: setMaterial.
	* UTILIDAD: Establece materiales
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    strawMaterial = new THREE.MeshLambertMaterial({color: strawColor, side: THREE.DoubleSide});
    stickMaterial = new THREE.MeshLambertMaterial({color: stickColor, side: THREE.DoubleSide});
    //mdfMaterial = new THREE.MeshLambertMaterial({ map: mdfTexture });
    ropeMaterial = new THREE.MeshLambertMaterial({color: ropeColor, side: THREE.DoubleSide});
    metalMaterial = new THREE.MeshPhongMaterial( {color: metalColor, shininess: 100, emissive: 0x000000, side: THREE.FrontSide} );
    flexMaterial = new THREE.MeshLambertMaterial({map: mdfTexture, color: mdfinColor, side: THREE.DoubleSide});
    ultrasonicMaterial = new THREE.MeshLambertMaterial({color: ultrasonicColor, transparent: true, opacity: 0.4, emissive: 0x000000});
    
    ledlightMaterial = new THREE.SpriteMaterial( { map: ledlightTexture, color: new THREE.Color( 0, 0, 0 ),transparent: true, blending: THREE.AdditiveBlending, opacity: 1});
    
    ledposMaterial = new THREE.SpriteMaterial({map:ledposTexture});
    lednegMaterial = new THREE.SpriteMaterial({map:lednegTexture});
}
function setGeometry(){
    /*
	* NOMBRE: setGeometry.
	* UTILIDAD: Establece geometria
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    strawGeometry = new THREE.CylinderGeometry( .28, .28, 1, 32, 1, true);
    stickGeometry = new THREE.CylinderGeometry( .25, .25, 1, 32, 1);
    sticklightGeometry = new THREE.CylinderGeometry( .21, .21, 1, 32, 1);
}
function setMesh(){
    /*
	* NOMBRE: setMesh.
	* UTILIDAD: Establece las mallas
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    
    //STRAW
    strawMesh = new classaddShape("straw",strawGeometry,strawMaterial,0,0,0,0,0,0,false,0);
    strawMesh.creaShape();
    //STICK
    stickMesh = new classaddShape("stick",stickGeometry,stickMaterial,0,0,0,0,0,0,false,1);
    stickMesh.creaShape();
    //STICK LIGHT
    sticklightMesh = new classaddShape("sticklight",sticklightGeometry,stickMaterial,0,0,0,0,0,0,false,1);
    sticklightMesh.creaShape();
    //GLTF
    for(i=0; i<=arrayGltf.length-1; i++){
        gltfMesh = new classaddGltf(arrayGltf[i],false,i);
        gltfMesh.creaGltf();
    }
}
function setRender(){
    /*
	* NOMBRE: setRender.
	* UTILIDAD: Establece render animacion
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    requestAnimationFrame(setRender);
    if(getType === "armado"){
        animationIntro();//Establece la animacion sin el Tween del intro de armado
    }
    if(getType === "armado" || getType === "instructivo" || getType === "pxb"){//Acciones de armado
        setAnimation();//Establece la animacion
        controls.update();//Actualiza orbitControl
        TWEEN.update();//Animacion de Tween.
        
    }
    if(getType === "physi"){//Acciones de physi
        setAnimation();//Establece la animacion
        controls.update();//Actualiza orbitControl
        scene.simulate();//Simulacion physis
        TWEEN.update();//Animacion de Tween.
        
    }
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
};
function classaddShape(namePieza,geometry,material,visible,num){
    /*
	* NOMBRE: classaddShape.
	* UTILIDAD: Clase para crear cuerpos directo de three.js
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    this.creaShape = function(){
        this.shape = new THREE.Object3D();
        this.shape = new THREE.Mesh(geometry, material);
        this.shape.name = namePieza;
        this.shape.visible = visible;
        eval("allShapes."+namePieza+" = this.shape;");
        contPiezasshape++;//Conteo piezas SHAPE
    }
}
function classaddArrowhelper(namePieza,oriX,oriY,oriZ,dirX,dirY,dirZ,lenght,color,headLength,headWidth,visible){
    /*
	* NOMBRE: classaddArrowhelper.
	* UTILIDAD: Clase para crear flechas de indicaciones
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    this.creaArrowhelper = function(){
        this.helper = new THREE.ArrowHelper(
            new THREE.Vector3( oriX, oriY, oriZ ),
            new THREE.Vector3( dirX, dirY, dirZ ),
            lenght,
            color,
            headLength,
            headWidth
        );
        this.helper.name = namePieza;
        this.helper.visible = visible;
        eval("allHelpers."+namePieza+" = this.helper;");
        scene.add(this.helper);
    }
}
function classaddGltf(namePieza,visible,num){
    /*
	* NOMBRE: classaddGltf.
	* UTILIDAD: Clase para crear piezas de gltf
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    this.creaGltf = function(){
        var loaders = new THREE.GLTFLoader();
        loaders.load(
            IP+gltfPrefijo+namePieza+".gltf",
            function(gltf){
                /*
                * NOMBRE: gltf.
                * UTILIDAD: construccion de gltf
                * ENTRADAS: gltf > llamado a piezas.
                * SALIDAS: Ninguna.
                * VARIABLES: Ninguna
                */
                console.log(gltf.scene);
                //Establece nuevo color para textura de MDF y color componentes
                gltf.scene.children.forEach(function(item1,index1){
                    /*
                    if(item1.name === "presetPres"){//La perilla del preset, tiene su pivot para el giro, en el pin principal. Por lo tanto la perilla se importa desde la construccion 3d, con desface.
                        item1.children[3].position.set(0.25,0,0.1);//La perilla se centra en el preset
                        item1.children[4].position.set(0.25,0,0.1);//La imagen de l aperilla se centra en el preset
                    }
                    */
                    if(item1.name === "preset"){//La perilla del preset, tiene su pivot para el giro, en el pin principal. Por lo tanto la perilla se importa desde la construccion 3d, con desface.
                        item1.children[3].position.set(0.5,1.6,0);//La perilla se centra en el preset
                        item1.children[4].position.set(0.5,1.6,0);//La perilla se centra en el preset
                    }
                    item1.children.forEach(function(item2,index2){
                        //Color de lado plano
                        if(item2.material.name === "Mdf_inside"){
                            item2.material.color = mdfinColor;
                        }
                        //Color de contorno
                        if(item2.material.name === "Mdf_outside"){
                            item2.material.color = mdfoutColor;
                        }
                        
                        //Material de pieza flexible
                        if(item2.material.name === "Flex_inside"){
                            item2.material = flexMaterial;
                        }
                        
                        //Material malla de ultrasonic
                        if(item2.material.name === "ultrasonic_malla"){
                            item2.material = ultrasonicMaterial;
                        }
                        
                        //Color de cuentas
                        if(item2.material.name === "Cuentas"){
                            item2.material.color = cuentasColor;
                        }
                        //Color manos
                        if(item2.material.name === "hand_color"){
                            item2.material.opacity = 0.3;
                            item2.material.transparent = true;
                        }
                        //Colores de LED
                        if(item2.material.name === "led_color"){
                            item2.material.color = ledColor;
                            item2.material.opacity = 0.4;
                            item2.material.transparent = true;
                        }
                        //Colores de RESISTANCE
                        if(item2.material.name === "resistance_color"){
                            item2.material.color = resistanceColor;
                        }
                        if(item2.material.name === "resistance_1strip"){
                            item2.material.color = resistanceStrip1;
                        }
                        if(item2.material.name === "resistance_2strip"){
                            item2.material.color = resistanceStrip2;
                        }
                        if(item2.material.name === "resistance_multiplier"){
                            item2.material.color = resistanceMultiplier;
                        }
                        if(item2.material.name === "resistance_tolerance"){
                            item2.material.color = resistanceTolerance;
                        }
                        //Colores de metal
                        if(item2.material.name === "texture_metal"){
                            item2.material.color = metalColor;
                        }
                    });
                });
                var getGltfobj;//Almacena el gltf en curso
                for(var i=0;i<=gltf.scene.children.length-1;i++){//Busca los objetos en el archivo gltf
                    getGltfobj = gltf.scene.children[i];//Almacena el gltf en curso
                    if(getGltfobj.name != "pushbuttonTwopin"){//Ignora el boton de dos pines
                        eval("allGltf."+getGltfobj.name+" = getGltfobj;");//Almacena el clon del gltf
                    }
                }
                console.log(allGltf);
                countGltf();//Cuenta los objetos creados para iniciar el render 3D
            },
            function (xhr) {
                /*
                * NOMBRE: xhr.
                * UTILIDAD: Carga de objetos, para iniciar el render 3D
                * ENTRADAS: xhr > carga de pieza.
                * SALIDAS: Ninguna.
                * VARIABLES: Ninguna
                */
                var preloaderBar = ( xhr.loaded / xhr.total * 100 ).toFixed(2);//Porcentahe cargado
                console.log(preloaderBar+'%');
                $(".d_loadergrlbar").css({"width":preloaderBar+"%"});//Asigna el % al width del div
            },
            function (error) {
                /*
                * NOMBRE: error.
                * UTILIDAD: Error al construir un objeto gltf
                * ENTRADAS: error > error al cargar una pieza pieza.
                * SALIDAS: Ninguna.
                * VARIABLES: Ninguna
                */
                $(".d_loadergrltext").text('Error al construir pieza 3d');//Mensaje de error al construir
            }
        );
    }; 
};
function countGltf(){
    /*
	* NOMBRE: countGltf.
	* UTILIDAD: Cuenta los objetos creados GLTF para iniciar el render 3D
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    addClones();//Agrega los clones
    setRender();//Establece render animacion
    if(getType === "armado"){//Acciones de armado
        iniciaAnima();//Inicia la animacion despues de construirse los modelos 3D
    }
    if(getType === "instructivo"){//Acciones de armado
        iniciaArmado();//Inicia todo lo del armado despues de construirse los modelos 3D
    }
    $("#d_loadergrl").remove();//Quita loader de construccion
}
function classaddJumper(name,aX,aY,aZ,jumperColor,bX,bY,bZ,visible,num){
    /*
	* NOMBRE: addaddJUmperCurve.
	* UTILIDAD: Clase para crear cables
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    this.creaJumper = function(){
        //CREA PIN A
        gltfClone = new classClonegltf("pinA",aX,aY,aZ,0,0,0,true,num[0]);
        gltfClone.creaClonegltf();
        this.cloneA = allClones[num[0]];
        //CREA PIN B
        gltfClone = new classClonegltf("pinB",bX,bY,bZ,0,0,0,true,num[1]);
        gltfClone.creaClonegltf();
        this.cloneB = allClones[num[1]];
        //CREA CURVA
        this.curveQuadbezier = new THREE.CubicBezierCurve3(
            new THREE.Vector4(
                this.cloneA.position.x,
                this.cloneA.position.y+0.7,
                this.cloneA.position.z,
                1
            ),
            new THREE.Vector4(
                this.cloneA.position.x,
                this.cloneA.position.y+6,
                this.cloneA.position.z,
                1
            ),
            new THREE.Vector4(
                this.cloneB.position.x,
                this.cloneB.position.y+6,
                this.cloneB.position.z,
                1
            ),
            new THREE.Vector4(
                this.cloneB.position.x,
                this.cloneB.position.y+0.7,
                this.cloneB.position.z,
                1
            )
        );
        this.curveGeometry = new THREE.TubeBufferGeometry(this.curveQuadbezier, 80, 0.05, 40, false);
        this.curveGeometry.dynamic = true;
        this.curveMaterial = new THREE.MeshLambertMaterial({color: jumperColor, side: THREE.DoubleSide});
        this.curveMesh = new THREE.Mesh(this.curveGeometry, this.curveMaterial);
        this.curveMesh.visible = visible;
        //this.curveMesh.name = "jumper "+num[0]+" "+num[1];
        this.curveMesh.name = "jumper "+num[0]+" "+num[1];
        this.curveMesh.newInfo = [];//Informacion adicional a objetos
        this.curveMesh.newInfo.val = ["wire"];
        scene.add(this.curveMesh);
    }
}
function classaddUsb(name,aX,aY,aZ,bX,bY,bZ,cX,cY,cZ,dX,dY,dZ,visible,num){
    /*
	* NOMBRE: classaddUsb.
	* UTILIDAD: Clase para crear usb
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    this.creaUsb = function(){

        //this.clone.name = "HOLA";
        
        if(name === "acadapter"){
            
            //CREA ADAPTER
            this.cloneA = new classClonegltf("energyadapter",aX,aY,aZ,0,-(girRad*90),0,true,num[2]);
            this.cloneA.creaClonegltf();

            //CREA JUMPERS

            this.cloneB = new classClonegltf("pinPowerpos",bX,bY,bZ,0,0,0,true,num[0]);
            this.cloneB.creaClonegltf();
            
            this.curveQuadbezier1 = new THREE.CubicBezierCurve3(
                new THREE.Vector4(
                    this.cloneA.clone.position.x,
                    this.cloneA.clone.position.y,
                    this.cloneA.clone.position.z+2.8,
                    1
                ),
                new THREE.Vector4(
                    this.cloneA.clone.position.x,
                    this.cloneA.clone.position.y,
                    this.cloneA.clone.position.z+8,
                    1
                ),
                new THREE.Vector4(
                    this.cloneB.clone.position.x,
                    this.cloneB.clone.position.y+8,
                    this.cloneB.clone.position.z,
                    1
                ),
                new THREE.Vector4(
                    this.cloneB.clone.position.x,
                    this.cloneB.clone.position.y+0.7,
                    this.cloneB.clone.position.z,
                    1
                )
            );
            this.curveGeometry1 = new THREE.TubeBufferGeometry(this.curveQuadbezier1, 80, 0.05, 40, false);
            this.curveGeometry1.dynamic = true;
            this.curveMaterial1 = new THREE.MeshLambertMaterial({color: 0x4d4d4d, side: THREE.DoubleSide});
            this.curveMesh1 = new THREE.Mesh(this.curveGeometry1, this.curveMaterial1);
            this.curveMesh1.visible = visible;
            this.curveMesh1.name = "jumperPow "+num[0]+" "+num[1];
            this.curveMesh1.newInfo = [];//Informacion adicional a objetos
            this.curveMesh1.newInfo.val = ["wire"];
            scene.add(this.curveMesh1);
            

            this.cloneC = new classClonegltf("pinPowerneg",cX,cY,cZ,0,0,0,true,num[1]);
            this.cloneC.creaClonegltf();
            

            //CREA CURVA
            this.curveQuadbezier2 = new THREE.CubicBezierCurve3(
                new THREE.Vector4(
                    this.cloneA.clone.position.x,
                    this.cloneA.clone.position.y,
                    this.cloneA.clone.position.z+2.8,
                    1
                ),
                new THREE.Vector4(
                    this.cloneA.clone.position.x,
                    this.cloneA.clone.position.y,
                    this.cloneA.clone.position.z+8,
                    1
                ),
                new THREE.Vector4(
                    this.cloneC.clone.position.x,
                    this.cloneC.clone.position.y+8,
                    this.cloneC.clone.position.z,
                    1
                ),
                new THREE.Vector4(
                    this.cloneC.clone.position.x,
                    this.cloneC.clone.position.y+0.7,
                    this.cloneC.clone.position.z,
                    1
                )
            );
            this.curveGeometry2 = new THREE.TubeBufferGeometry(this.curveQuadbezier2, 80, 0.05, 40, false);
            this.curveGeometry2.dynamic = true;
            this.curveMaterial2 = new THREE.MeshLambertMaterial({color: 0x4d4d4d, side: THREE.DoubleSide});
            this.curveMesh2 = new THREE.Mesh(this.curveGeometry2, this.curveMaterial2);
            this.curveMesh2.visible = visible;
            this.curveMesh2.name = "jumperPow "+num[1]+" "+num[0];
            this.curveMesh2.newInfo = [];//Informacion adicional a objetos
            this.curveMesh2.newInfo.val = ["wire"];
            scene.add(this.curveMesh2);
        }
        if(name === "cdcable"){
            
            //CREA USB
            this.cloneA = new classClonegltf("usb",aX,aY,aZ,0,-(girRad*90),0,true,num[2]);
            this.cloneA.creaClonegltf();

            //CREA JUMPERS

            this.cloneB = new classClonegltf("pinPowerpos",bX,bY,bZ,0,0,0,true,num[0]);
            this.cloneB.creaClonegltf();
            
            this.curveQuadbezier1 = new THREE.CubicBezierCurve3(
                new THREE.Vector4(
                    this.cloneA.clone.position.x,
                    this.cloneA.clone.position.y,
                    this.cloneA.clone.position.z+2.8,
                    1
                ),
                new THREE.Vector4(
                    this.cloneA.clone.position.x,
                    this.cloneA.clone.position.y,
                    this.cloneA.clone.position.z+8,
                    1
                ),
                new THREE.Vector4(
                    this.cloneB.clone.position.x,
                    this.cloneB.clone.position.y+8,
                    this.cloneB.clone.position.z,
                    1
                ),
                new THREE.Vector4(
                    this.cloneB.clone.position.x,
                    this.cloneB.clone.position.y+0.7,
                    this.cloneB.clone.position.z,
                    1
                )
            );
            this.curveGeometry1 = new THREE.TubeBufferGeometry(this.curveQuadbezier1, 80, 0.05, 40, false);
            this.curveGeometry1.dynamic = true;
            this.curveMaterial1 = new THREE.MeshLambertMaterial({color: 0xf7bb03, side: THREE.DoubleSide});
            this.curveMesh1 = new THREE.Mesh(this.curveGeometry1, this.curveMaterial1);
            this.curveMesh1.visible = visible;
            this.curveMesh1.name = "jumperPow "+num[0]+" "+num[1];
            this.curveMesh1.newInfo = [];//Informacion adicional a objetos
            this.curveMesh1.newInfo.val = ["wire"];
            scene.add(this.curveMesh1);
            

            this.cloneC = new classClonegltf("pinPowerneg",cX,cY,cZ,0,0,0,true,num[1]);
            this.cloneC.creaClonegltf();
            

            //CREA CURVA
            this.curveQuadbezier2 = new THREE.CubicBezierCurve3(
                new THREE.Vector4(
                    this.cloneA.clone.position.x,
                    this.cloneA.clone.position.y,
                    this.cloneA.clone.position.z+2.8,
                    1
                ),
                new THREE.Vector4(
                    this.cloneA.clone.position.x,
                    this.cloneA.clone.position.y,
                    this.cloneA.clone.position.z+8,
                    1
                ),
                new THREE.Vector4(
                    this.cloneC.clone.position.x,
                    this.cloneC.clone.position.y+8,
                    this.cloneC.clone.position.z,
                    1
                ),
                new THREE.Vector4(
                    this.cloneC.clone.position.x,
                    this.cloneC.clone.position.y+0.7,
                    this.cloneC.clone.position.z,
                    1
                )
            );
            this.curveGeometry2 = new THREE.TubeBufferGeometry(this.curveQuadbezier2, 80, 0.05, 40, false);
            this.curveGeometry2.dynamic = true;
            this.curveMaterial2 = new THREE.MeshLambertMaterial({color: 0xf7bb03, side: THREE.DoubleSide});
            this.curveMesh2 = new THREE.Mesh(this.curveGeometry2, this.curveMaterial2);
            this.curveMesh2.visible = visible;
            this.curveMesh2.name = "jumperPow "+num[1]+" "+num[0];
            this.curveMesh2.newInfo = [];//Informacion adicional a objetos
            this.curveMesh2.newInfo.val = ["wire"];
            scene.add(this.curveMesh2);
        }
        if(name === "usbcable"){
            //CREA USB
            this.cloneA = new classClonegltf("usb",aX,aY,aZ,0,-(girRad*90),0,true,num[2]);
            this.cloneA.creaClonegltf();
            //CREA USB DATA
            this.cloneB = new classClonegltf("usbdata",dX,dY,dZ,girRad*180,0,girRad*180,true,num[2]);
            this.cloneB.creaClonegltf();
            //CREA CURVA
            this.curveQuadbezier = new THREE.CubicBezierCurve3(
                new THREE.Vector4(
                    this.cloneA.clone.position.x,
                    this.cloneA.clone.position.y,
                    this.cloneA.clone.position.z+2.8,
                    1
                ),
                new THREE.Vector4(
                    this.cloneA.clone.position.x,
                    this.cloneA.clone.position.y,
                    this.cloneA.clone.position.z+8,
                    1
                ),
                new THREE.Vector4(
                    this.cloneB.clone.position.x-8,
                    this.cloneB.clone.position.y,
                    this.cloneB.clone.position.z,
                    1
                ),
                new THREE.Vector4(
                    this.cloneB.clone.position.x-2.8,
                    this.cloneB.clone.position.y,
                    this.cloneB.clone.position.z,
                    1
                )
            );
            this.curveGeometry = new THREE.TubeBufferGeometry(this.curveQuadbezier, 80, 0.12, 40, false);
            this.curveGeometry.dynamic = true;
            this.curveMaterial = new THREE.MeshLambertMaterial({color: 0xf7bb03, side: THREE.DoubleSide});
            this.curveMesh = new THREE.Mesh(this.curveGeometry, this.curveMaterial);
            this.curveMesh.visible = visible;
            this.curveMesh.name = "null wire";
            this.curveMesh.newInfo = [];//Informacion adicional a objetos
            this.curveMesh.newInfo.val = ["wire"];
            scene.add(this.curveMesh);
        }

        
    }
}
function classCloneshape(namePieza,posX,posY,posZ,rotX,rotY,rotZ,scaY,visible,num){
    /*
	* NOMBRE: classClone.
	* UTILIDAD: Clase para crear los clones de las piezas principales.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    this.creaClonemesh = function(){
        eval("this.clone = allShapes."+namePieza+".clone();")
        this.clone.name = namePieza;
        this.clone.position.set(posX,posY,posZ);
        this.clone.rotation.set(rotX,rotY,rotZ);
        this.clone.scale.y = scaY;
        //this.clone.scale.set(scaX,scaY,scaZ);
        this.clone.visible = visible;
        allClones[num] = this.clone;//Guarda objeto en array
        scene.add(this.clone);
    }
}
var saveTypeenergy = null;//Agrega dato para saber si es cdcable o acadapter
function classClonegltf(namePieza,posX,posY,posZ,rotX,rotY,rotZ,visible,num){
    /*
	* NOMBRE: classClone.
	* UTILIDAD: Clase para crear los clones de las piezas principales.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    this.creaClonegltf = function(){
        eval("this.clone = allGltf."+namePieza+".clone();")
        this.clone.name = num+" "+namePieza;
        this.clone.position.set(posX,posY,posZ);
        this.clone.rotation.set(rotX,rotY,rotZ);
        this.clone.visible = visible;
        for(i=0; i<=eval("allGltf."+namePieza+".children.length")-1; i++){
            this.clone.children[i].material = {};//Limpia material del clone
            eval("this.clone.children["+i+"].material = allGltf."+namePieza+".children["+i+"].material.clone();");//Asigna un nuevo clone material para editarlo individualmente
        }
        this.clone.newInfo = [];//Informacion adicional a objetos
        this.clone.newInfo.posEnergy = [null,null];
        this.clone.newInfo.data = [];
        this.clone.newInfo.coordLine = [null];
        this.clone.newInfo.objManipulated = false;
        this.clone.newInfo.usedLines = [];
        this.clone.newInfo.pinDifferent = [];
        this.clone.newInfo.typeEnergy = null;//Agrega dato para saber si es cdcable o acadapter
        //this.clone.newInfo.pinConected = [1,1,1];
        
        if(namePieza === "usb"){//Esta pieza siempre va antes que los cables "pinPowerpos" y "pinPowerneg" y es para cdcable
            saveTypeenergy = "usb";//Es cdcable
        }
        if(namePieza === "energyadapter"){//Esta pieza siempre va antes que los cables "pinPowerpos" y "pinPowerneg" y es para acadapter
            saveTypeenergy = "energyadapter";// Es acadapter
        }
        
        switch(namePieza){//Se asigna a cada componente el nombre
            case "protoboard":
                this.clone.newInfo.name = "Placa de pruebas";
                this.clone.newInfo.polarity = "none";
                this.clone.newInfo.val = ["Protoboard",[null,null],null];
                this.clone.newInfo.tooltipData = [null];
                this.clone.newInfo.posLimite = [false,false];
                this.clone.newInfo.areaLimit = ["none"];
                break;
            case "powerbank":
                this.clone.newInfo.name = "Bateria";
                this.clone.newInfo.polarity = "none";
                this.clone.newInfo.val = ["Bateria",[null,null],null];
                this.clone.newInfo.tooltipData = [null];
                this.clone.newInfo.posLimite = [false,false];
                this.clone.newInfo.areaLimit = ["none"];
                break;
            case "pinPowerpos":
                this.clone.newInfo.name = "Cable energia";
                this.clone.newInfo.polarity = "defined";
                this.clone.newInfo.val = ["Cableenergia",[null,null],null];
                this.clone.newInfo.tooltipData = [null];
                this.clone.newInfo.posLimite = [false,false];
                this.clone.newInfo.areaLimit = ["none"];
                this.clone.newInfo.typeEnergy = saveTypeenergy;//Agrega dato para saber si es cdcable o acadapter (sirve al momento de guardar y abrir practicas)
                break;
            case "pinPowerneg":
                this.clone.newInfo.name = "Cable energia";
                this.clone.newInfo.polarity = "defined";
                this.clone.newInfo.val = ["Cableenergia",[null,null],null];
                this.clone.newInfo.tooltipData = [null];
                this.clone.newInfo.posLimite = [false,false];
                this.clone.newInfo.areaLimit = ["none"];
                this.clone.newInfo.typeEnergy = saveTypeenergy;//Agrega dato para saber si es cdcable o acadapter (sirve al momento de guardar y abrir practicas)
                break;
            case "usbdata":
                this.clone.newInfo.name = "Cable datos";
                this.clone.newInfo.polarity = "none";
                this.clone.newInfo.val = ["Cabledatos",[null,null],null];
                this.clone.newInfo.tooltipData = [null];
                this.clone.newInfo.posLimite = [false,false];
                this.clone.newInfo.areaLimit = ["none"];
                break;
            case "pushbutton":
                this.clone.newInfo.name = "Botón";
                this.clone.newInfo.polarity = "both";
                this.clone.newInfo.val = ["Botón",[null,null],null];
                this.clone.newInfo.tooltipData = [null];
                this.clone.newInfo.posLimite = [true,true];
                this.clone.newInfo.areaLimit = ["conectA"];
                break;
            case "led":
                this.clone.newInfo.name = "LED";
                this.clone.newInfo.polarity = "defined";
                this.clone.newInfo.val = ["LED",[null,null],"none"];
                this.clone.newInfo.tooltipData = ["none"];
                this.clone.newInfo.posLimite = [true,true];
                this.clone.newInfo.areaLimit = ["conectA"];
                
                this.clone.newInfo.pinDifferent.push(1);//Guarda pin index salida en objeto
                break;
            case "rgbc":
                this.clone.newInfo.name = "RGBc";
                this.clone.newInfo.polarity = "defined";
                this.clone.newInfo.val = ["RGBc",[null,null],"none"];
                this.clone.newInfo.tooltipData = ["none"];
                this.clone.newInfo.posLimite = [true,true];
                this.clone.newInfo.areaLimit = ["conectA"];
                break;
            case "rgb":
                this.clone.newInfo.name = "RGB";
                this.clone.newInfo.polarity = "defined";
                this.clone.newInfo.val = ["RGB",[null,null],"none"];
                this.clone.newInfo.tooltipData = [null];
                this.clone.newInfo.posLimite = [true,true];
                this.clone.newInfo.areaLimit = ["conectA"];
                
                this.clone.newInfo.onrgbData = [];
                break;
            case "resistance":
                this.clone.newInfo.name = "Resistencia";
                this.clone.newInfo.polarity = "both";
                this.clone.newInfo.val = ["Resistencia",[null,null],"Ohms"];
                this.clone.newInfo.tooltipData = ["Ohms"];
                this.clone.newInfo.posLimite = [true,true];
                this.clone.newInfo.areaLimit = ["conectA"];
                break;
            case "pinA":
                this.clone.newInfo.name = "Cable";
                this.clone.newInfo.polarity = "both";
                this.clone.newInfo.val = ["Cable",[null,null],"white"];
                this.clone.newInfo.tooltipData = ["white"];
                this.clone.newInfo.posLimite = [true,true];
                this.clone.newInfo.areaLimit = ["conectA"];
                break;
            case "pinB":
                this.clone.newInfo.name = "Cable";
                this.clone.newInfo.polarity = "both";
                this.clone.newInfo.val = ["Cable",[null,null],"white"];
                this.clone.newInfo.tooltipData = ["white"];
                this.clone.newInfo.posLimite = [true,true];
                this.clone.newInfo.areaLimit = ["conectA"];
                break;
            case "buzzer":
                this.clone.newInfo.name = "Bocina";
                this.clone.newInfo.polarity = "defined";
                this.clone.newInfo.val = ["Bocina",[null,null],null];
                this.clone.newInfo.tooltipData = [null];
                this.clone.newInfo.posLimite = [true,true];
                this.clone.newInfo.areaLimit = ["conectA"];
                break;
            case "switch":
                this.clone.newInfo.name = "Interruptor";
                this.clone.newInfo.polarity = "both";
                this.clone.newInfo.val = ["Interruptor",[null,null],null];
                this.clone.newInfo.tooltipData = [null];
                this.clone.newInfo.posLimite = [true,true];
                this.clone.newInfo.areaLimit = ["conectA"];
                break;
            case "preset":
                this.clone.newInfo.name = "Potenciómetro";
                this.clone.newInfo.polarity = "both";
                this.clone.newInfo.val = ["Potenciómetro",[null,null],null];
                this.clone.newInfo.tooltipData = ["none"];
                this.clone.newInfo.posLimite = [true,true];
                this.clone.newInfo.areaLimit = ["conectA"];
                
                this.clone.newInfo.onpresetData = [];
                break;
            case "ldr":
                this.clone.newInfo.name = "LDR";
                this.clone.newInfo.polarity = "both";
                this.clone.newInfo.val = ["LDR",[null,null],null];
                this.clone.newInfo.tooltipData = [null];
                this.clone.newInfo.posLimite = [true,true];
                this.clone.newInfo.areaLimit = ["conectA"];
                break;
            case "ultrasonic":
                this.clone.newInfo.name = "Ultrasónico";
                this.clone.newInfo.polarity = "defined";
                this.clone.newInfo.val = ["Ultrasónico",[null,null],"none"];
                this.clone.newInfo.tooltipData = ["none"];
                this.clone.newInfo.posLimite = [true,true];
                this.clone.newInfo.areaLimit = ["conectA"];
                
                this.clone.newInfo.onpresetData = [];
                break;
            default:
                break;
        }
        //Indicadores
        this.geometry = new THREE.BoxBufferGeometry( 0.1, 0.1, 0.1 );
        this.material = new THREE.MeshBasicMaterial( {color: 0xff0000, transparent: true, opacity: 0} );
        
        //Grupo de objetos de datos
        this.data = new THREE.Group();
        this.data.parent = this.clone;
        this.data.name = "data";
        this.clone.children.push(this.data);
        
        //Indicador 1
        this.cube1 = new THREE.Mesh( this.geometry, this.material );
        this.cube1.position.set(0,0,0);
        this.cube1.name = "ind";
        this.data.add(this.cube1);
        
        if(namePieza === "pinA"){//JUmper extras
            addCoordlabel(this,1,2,0);//Asigna coordenada al objeto
        }
        if(namePieza === "pinB"){//JUmper extras
            addCoordlabel(this,1,2,0,true);//Asigna coordenada al objeto
        }
        if(namePieza === "pinPowerpos"){//cableenergia extras
            //Sprite positivo
            creaSprite(this.data,[0.3,0.3,0.3],[0,1.6,0.4],"labelpos",true);//Crea label positivo
            addCoordlabel(this,1,1,0);//Asigna coordenada al objeto
        }
        if(namePieza === "pinPowerneg"){//cableenergia extras
            //Sprite negativo
            creaSprite(this.data,[0.3,0.3,0.3],[0,1.6,-0.4],"labelneg",true);//Crea label negativo
            addCoordlabel(this,1,1,0);//Asigna coordenada al objeto
        }
        if(namePieza === "led"){//LED extras
            //Indicador 2
            this.cube2 = new THREE.Mesh( this.geometry, this.material );
            this.cube2.position.set(0.25,0,0);
            this.cube2.name = "ind";
            this.data.add(this.cube2);
            //Sprite light
            creaSprite(this.data,[2,2,2],[0.1,3.4,0],"light",false);//Crea los sprite para luces o label
            //Sprite positivo y negativo
            creaSprite(this.data,[0.3,0.3,0.3],[-0.2,2.4,0],"labelpos",true);//Crea label positivo
            creaSprite(this.data,[0.3,0.3,0.3],[0.43,2.4,0],"labelneg",true);//Crea label negativo
            //Activate
            this.labelDiv = document.createElement('div');
            this.labelDiv.className = 'd_activateled';
            this.labelDiv.textContent = '';
            this.labelDiv.setAttribute("id", this.clone.name.replace(" ",''));//Quita el espacio al agregar id
            this.labelDiv.setAttribute("name", this.clone.name);//Agrega nombre
            this.cssDiv = new THREE.CSS2DObject( this.labelDiv );
            this.cssDiv.width = 100;
            this.cssDiv.height = 100;
            this.cssDiv.position.set( 0.15, 3.3, 0 );
            this.cssDiv.name = "crash";
            this.cssDiv.visible = false;
            this.data.add( this.cssDiv );
            var setTime = setTimeout(function(){
                $("#"+num+"led").append('<svg viewBox="0 0 75.451 68.89"><polygon fill="#EC2227" points="25.137,50.862 3.612,62.594 16.004,39.772 1.169,35.801 15.269,25.983 1.533,11.229 22.75,16.71 29.685,0.95 40.583,14.362 66.906,3.361 54.151,22.332 74.065,29.584 55.052,37.368 67.269,59.589 44.647,48.588 41.581,67.824"/><path fill="#010101" d="M29.813,1.901l10.146,12.487l0.471,0.58l0.69-0.288l24.44-10.215L54.093,21.523l-0.713,1.061l1.201,0.437 l18.098,6.591l-17.298,7.082l-1.038,0.425l0.54,0.982l11.189,20.351L45.472,48.434l-1.213-0.589l-0.212,1.332l-2.803,17.583 L25.761,50.787l-0.529-0.545l-0.667,0.364L4.859,61.344l11.282-20.776l0.605-1.115l-1.226-0.328L2.338,35.596l12.743-8.873 l0.946-0.659l-0.785-0.844L3.065,12.142l19.148,4.946l0.823,0.212l0.343-0.778L29.813,1.901 M29.557,0l-7.094,16.12L0,10.317 l14.51,15.585L0,36.006l15.262,4.085L2.365,63.843l22.678-12.359L41.917,68.89l3.117-19.557l23.43,11.394L55.76,37.618 l19.691-8.062l-20.528-7.476L68.25,2.257l-27.515,11.5L29.557,0L29.557,0z"/><polygon fill="#F6EB16" points="29.945,44.503 15.459,51.346 24.409,37.722 12.429,33.548 22.163,28.424 15.355,20.105 27.277,22.656 31.627,12.376 39.5,22.128 55.959,11.868 48.374,24.184 63.158,29.702 48.288,36.222 57.326,49.613 41.939,43.09 39.019,57.945"/><path fill="#010101" d="M31.762,13.34l7.071,8.758l0.556,0.689l0.751-0.468l14.278-8.9l-6.15,9.985l-0.638,1.036l1.14,0.426 l13.059,4.875l-13.191,5.784l-1.098,0.481l0.67,0.994l7.758,11.495L42.701,42.87l-1.134-0.48l-0.238,1.208l-2.57,13.07 l-8.161-12.089l-0.48-0.711l-0.776,0.366l-12.49,5.9l7.622-11.603l0.704-1.071l-1.21-0.422L13.68,33.455l8.174-4.303l1.083-0.57 l-0.775-0.948l-5.516-6.741l10.122,2.167l0.808,0.173l0.322-0.761L31.762,13.34 M57.502,10.317L39.611,21.47l-8.119-10.057 l-4.514,10.668l-12.913-2.764l7.323,8.949l-10.21,5.375l12.461,4.342l-9.574,14.574l15.706-7.419l9.506,14.083l3.034-15.431 l16.373,6.94l-9.646-14.292l15.45-6.774l-15.37-5.737L57.502,10.317L57.502,10.317z"/><polygon fill="#FFFFFF" points="33.278,40.22 25.279,43.998 30.27,36.406 22.514,33.629 29.013,31.172 25.177,26.493 31.763,27.905 34.249,22.026 38.801,27.666 47.423,20.777 42.95,30.255 52.309,31.176 43.68,35.559 48.709,43.021 40.087,39.36 38.422,47.841"/><path fill="#010101" d="M46.051,22.513L42.8,29.4l-0.605,1.283l1.412,0.139l6.949,0.684l-6.597,3.35l-1.009,0.512l0.632,0.938 l3.771,5.594l-6.502-2.76l-1.134-0.482l-0.238,1.209l-1.314,6.695l-4.23-6.268l-0.48-0.711l-0.776,0.366l-6.003,2.835l3.665-5.575 l0.698-1.063l-1.197-0.428l-5.878-2.104l4.577-1.73l1.303-0.493l-0.883-1.077l-2.488-3.035l4.784,1.025l0.809,0.174l0.322-0.762 l1.999-4.729l3.715,4.603l0.625,0.774l0.777-0.621L46.051,22.513 M48.796,19.04l-9.918,7.925l-4.764-5.902l-2.649,6.267 l-7.58-1.625l4.301,5.246l-7.119,2.691l8.436,3.021l-5.619,8.548l9.22-4.354l5.577,8.263l1.778-9.057l9.607,4.079l-5.656-8.393 l9.652-4.901l-10.358-1.02L48.796,19.04L48.796,19.04z"/></svg>');//Agrega svg al div del objeto
                clearTimeout(setTime);//Limpia tiempo
            },100);
            addCoordlabel(this,1.5,1,0);//Asigna coordenada al objeto
        }
        if(namePieza === "rgbc"){//LED extras
            //Indicador 2
            this.cube2 = new THREE.Mesh( this.geometry, this.material );
            this.cube2.position.set(0.25,0,0);
            this.cube2.name = "ind";
            this.data.add(this.cube2);
            //Sprite light
            creaSprite(this.data,[2,2,2],[0.1,3.4,0],"light",false);//Crea los sprite para luces o label
            //Sprite positivo y negativo
            creaSprite(this.data,[0.3,0.3,0.3],[-0.2,2.4,0],"labelpos",true);//Crea label positivo
            creaSprite(this.data,[0.3,0.3,0.3],[0.43,2.4,0],"labelneg",true);//Crea label negativo
            //Activate
            this.labelDiv = document.createElement('div');
            this.labelDiv.className = 'd_activatergbc';
            this.labelDiv.textContent = '';
            this.labelDiv.setAttribute("id", this.clone.name.replace(" ",''));//Quita el espacio al agregar id
            this.labelDiv.setAttribute("name", this.clone.name);//Agrega nombre
            this.cssDiv = new THREE.CSS2DObject( this.labelDiv );
            this.cssDiv.width = 100;
            this.cssDiv.height = 100;
            this.cssDiv.position.set( 0.15, 3.3, 0 );
            this.cssDiv.name = "crash";
            this.cssDiv.visible = false;
            this.data.add( this.cssDiv );
            var setTime = setTimeout(function(){
                $("#"+num+"rgbc").append('<svg viewBox="0 0 75.451 68.89"><polygon fill="#EC2227" points="25.137,50.862 3.612,62.594 16.004,39.772 1.169,35.801 15.269,25.983 1.533,11.229 22.75,16.71 29.685,0.95 40.583,14.362 66.906,3.361 54.151,22.332 74.065,29.584 55.052,37.368 67.269,59.589 44.647,48.588 41.581,67.824"/><path fill="#010101" d="M29.813,1.901l10.146,12.487l0.471,0.58l0.69-0.288l24.44-10.215L54.093,21.523l-0.713,1.061l1.201,0.437 l18.098,6.591l-17.298,7.082l-1.038,0.425l0.54,0.982l11.189,20.351L45.472,48.434l-1.213-0.589l-0.212,1.332l-2.803,17.583 L25.761,50.787l-0.529-0.545l-0.667,0.364L4.859,61.344l11.282-20.776l0.605-1.115l-1.226-0.328L2.338,35.596l12.743-8.873 l0.946-0.659l-0.785-0.844L3.065,12.142l19.148,4.946l0.823,0.212l0.343-0.778L29.813,1.901 M29.557,0l-7.094,16.12L0,10.317 l14.51,15.585L0,36.006l15.262,4.085L2.365,63.843l22.678-12.359L41.917,68.89l3.117-19.557l23.43,11.394L55.76,37.618 l19.691-8.062l-20.528-7.476L68.25,2.257l-27.515,11.5L29.557,0L29.557,0z"/><polygon fill="#F6EB16" points="29.945,44.503 15.459,51.346 24.409,37.722 12.429,33.548 22.163,28.424 15.355,20.105 27.277,22.656 31.627,12.376 39.5,22.128 55.959,11.868 48.374,24.184 63.158,29.702 48.288,36.222 57.326,49.613 41.939,43.09 39.019,57.945"/><path fill="#010101" d="M31.762,13.34l7.071,8.758l0.556,0.689l0.751-0.468l14.278-8.9l-6.15,9.985l-0.638,1.036l1.14,0.426 l13.059,4.875l-13.191,5.784l-1.098,0.481l0.67,0.994l7.758,11.495L42.701,42.87l-1.134-0.48l-0.238,1.208l-2.57,13.07 l-8.161-12.089l-0.48-0.711l-0.776,0.366l-12.49,5.9l7.622-11.603l0.704-1.071l-1.21-0.422L13.68,33.455l8.174-4.303l1.083-0.57 l-0.775-0.948l-5.516-6.741l10.122,2.167l0.808,0.173l0.322-0.761L31.762,13.34 M57.502,10.317L39.611,21.47l-8.119-10.057 l-4.514,10.668l-12.913-2.764l7.323,8.949l-10.21,5.375l12.461,4.342l-9.574,14.574l15.706-7.419l9.506,14.083l3.034-15.431 l16.373,6.94l-9.646-14.292l15.45-6.774l-15.37-5.737L57.502,10.317L57.502,10.317z"/><polygon fill="#FFFFFF" points="33.278,40.22 25.279,43.998 30.27,36.406 22.514,33.629 29.013,31.172 25.177,26.493 31.763,27.905 34.249,22.026 38.801,27.666 47.423,20.777 42.95,30.255 52.309,31.176 43.68,35.559 48.709,43.021 40.087,39.36 38.422,47.841"/><path fill="#010101" d="M46.051,22.513L42.8,29.4l-0.605,1.283l1.412,0.139l6.949,0.684l-6.597,3.35l-1.009,0.512l0.632,0.938 l3.771,5.594l-6.502-2.76l-1.134-0.482l-0.238,1.209l-1.314,6.695l-4.23-6.268l-0.48-0.711l-0.776,0.366l-6.003,2.835l3.665-5.575 l0.698-1.063l-1.197-0.428l-5.878-2.104l4.577-1.73l1.303-0.493l-0.883-1.077l-2.488-3.035l4.784,1.025l0.809,0.174l0.322-0.762 l1.999-4.729l3.715,4.603l0.625,0.774l0.777-0.621L46.051,22.513 M48.796,19.04l-9.918,7.925l-4.764-5.902l-2.649,6.267 l-7.58-1.625l4.301,5.246l-7.119,2.691l8.436,3.021l-5.619,8.548l9.22-4.354l5.577,8.263l1.778-9.057l9.607,4.079l-5.656-8.393 l9.652-4.901l-10.358-1.02L48.796,19.04L48.796,19.04z"/></svg>');//Agrega svg al div del objeto
                clearTimeout(setTime);//Limpia tiempo
            },100);
            addCoordlabel(this,1.7,1,0);//Asigna coordenada al objeto
        }
        if(namePieza === "rgb"){//RGB extras
            //Indicador 2
            this.cube2 = new THREE.Mesh( this.geometry, this.material );
            this.cube2.position.set(-0.25,0,0);
            this.cube2.name = "ind";
            //Indicador 3
            this.cube3 = new THREE.Mesh( this.geometry, this.material );
            this.cube3.position.set(0.25,0,0);
            this.cube3.name = "ind";
            //Indicador 4
            this.cube4 = new THREE.Mesh( this.geometry, this.material );
            this.cube4.position.set(0.5,0,0);
            this.cube4.name = "ind";
            this.data.add(this.cube2, this.cube3, this.cube4);
            //Sprite light
            creaSprite(this.data,[2,2,2],[0.1,3.4,0],"light",false);//Crea los sprite para luces o label
            //Sprite positivo y negativo
            creaSprite(this.data,[0.3,0.3,0.3],[0,2.4,0.2],"labelpos",true);//Crea label positivo
            //Info color rgb
            creaInfo(this.data,[0.07,0.2],[-0.25,2.4,0],0xff0000,"label",true);//Crea label R
            creaInfo(this.data,[0.07,0.2],[0.25,2.4,0],0x00ff00,"label",true);//Crea label G
            creaInfo(this.data,[0.07,0.2],[0.5,2.4,0],0x0000ff,"label",true);//Crea label B
            //Activate
            this.labelDiv = document.createElement('div');
            this.labelDiv.className = 'd_activatergb';
            this.labelDiv.textContent = '';
            this.labelDiv.setAttribute("id", this.clone.name.replace(" ",''));//Quita el espacio al agregar id
            this.labelDiv.setAttribute("name", this.clone.name);//Agrega nombre
            this.cssDiv = new THREE.CSS2DObject( this.labelDiv );
            this.cssDiv.width = 100;
            this.cssDiv.height = 100;
            this.cssDiv.position.set( 0.15, 3.3, 0 );
            this.cssDiv.name = "crash";
            this.cssDiv.visible = false;
            this.data.add( this.cssDiv );
            var setTime = setTimeout(function(){
                $("#"+num+"rgb").append('<svg viewBox="0 0 75.451 68.89"><polygon fill="#EC2227" points="25.137,50.862 3.612,62.594 16.004,39.772 1.169,35.801 15.269,25.983 1.533,11.229 22.75,16.71 29.685,0.95 40.583,14.362 66.906,3.361 54.151,22.332 74.065,29.584 55.052,37.368 67.269,59.589 44.647,48.588 41.581,67.824"/><path fill="#010101" d="M29.813,1.901l10.146,12.487l0.471,0.58l0.69-0.288l24.44-10.215L54.093,21.523l-0.713,1.061l1.201,0.437 l18.098,6.591l-17.298,7.082l-1.038,0.425l0.54,0.982l11.189,20.351L45.472,48.434l-1.213-0.589l-0.212,1.332l-2.803,17.583 L25.761,50.787l-0.529-0.545l-0.667,0.364L4.859,61.344l11.282-20.776l0.605-1.115l-1.226-0.328L2.338,35.596l12.743-8.873 l0.946-0.659l-0.785-0.844L3.065,12.142l19.148,4.946l0.823,0.212l0.343-0.778L29.813,1.901 M29.557,0l-7.094,16.12L0,10.317 l14.51,15.585L0,36.006l15.262,4.085L2.365,63.843l22.678-12.359L41.917,68.89l3.117-19.557l23.43,11.394L55.76,37.618 l19.691-8.062l-20.528-7.476L68.25,2.257l-27.515,11.5L29.557,0L29.557,0z"/><polygon fill="#F6EB16" points="29.945,44.503 15.459,51.346 24.409,37.722 12.429,33.548 22.163,28.424 15.355,20.105 27.277,22.656 31.627,12.376 39.5,22.128 55.959,11.868 48.374,24.184 63.158,29.702 48.288,36.222 57.326,49.613 41.939,43.09 39.019,57.945"/><path fill="#010101" d="M31.762,13.34l7.071,8.758l0.556,0.689l0.751-0.468l14.278-8.9l-6.15,9.985l-0.638,1.036l1.14,0.426 l13.059,4.875l-13.191,5.784l-1.098,0.481l0.67,0.994l7.758,11.495L42.701,42.87l-1.134-0.48l-0.238,1.208l-2.57,13.07 l-8.161-12.089l-0.48-0.711l-0.776,0.366l-12.49,5.9l7.622-11.603l0.704-1.071l-1.21-0.422L13.68,33.455l8.174-4.303l1.083-0.57 l-0.775-0.948l-5.516-6.741l10.122,2.167l0.808,0.173l0.322-0.761L31.762,13.34 M57.502,10.317L39.611,21.47l-8.119-10.057 l-4.514,10.668l-12.913-2.764l7.323,8.949l-10.21,5.375l12.461,4.342l-9.574,14.574l15.706-7.419l9.506,14.083l3.034-15.431 l16.373,6.94l-9.646-14.292l15.45-6.774l-15.37-5.737L57.502,10.317L57.502,10.317z"/><polygon fill="#FFFFFF" points="33.278,40.22 25.279,43.998 30.27,36.406 22.514,33.629 29.013,31.172 25.177,26.493 31.763,27.905 34.249,22.026 38.801,27.666 47.423,20.777 42.95,30.255 52.309,31.176 43.68,35.559 48.709,43.021 40.087,39.36 38.422,47.841"/><path fill="#010101" d="M46.051,22.513L42.8,29.4l-0.605,1.283l1.412,0.139l6.949,0.684l-6.597,3.35l-1.009,0.512l0.632,0.938 l3.771,5.594l-6.502-2.76l-1.134-0.482l-0.238,1.209l-1.314,6.695l-4.23-6.268l-0.48-0.711l-0.776,0.366l-6.003,2.835l3.665-5.575 l0.698-1.063l-1.197-0.428l-5.878-2.104l4.577-1.73l1.303-0.493l-0.883-1.077l-2.488-3.035l4.784,1.025l0.809,0.174l0.322-0.762 l1.999-4.729l3.715,4.603l0.625,0.774l0.777-0.621L46.051,22.513 M48.796,19.04l-9.918,7.925l-4.764-5.902l-2.649,6.267 l-7.58-1.625l4.301,5.246l-7.119,2.691l8.436,3.021l-5.619,8.548l9.22-4.354l5.577,8.263l1.778-9.057l9.607,4.079l-5.656-8.393 l9.652-4.901l-10.358-1.02L48.796,19.04L48.796,19.04z"/></svg>');//Agrega svg al div del objeto
                clearTimeout(setTime);//Limpia tiempo
            },100);
            addCoordlabel(this,1.7,1,0);//Asigna coordenada al objeto
        }
        if(namePieza === "switch"){//RGB extras
            //Indicador 2
            this.cube2 = new THREE.Mesh( this.geometry, this.material );
            this.cube2.position.set(0.25,0,0);
            this.cube2.name = "ind";
            //Indicador 3
            this.cube3 = new THREE.Mesh( this.geometry, this.material );
            this.cube3.position.set(0.5,0,0);
            this.cube3.name = "ind";
            //Indicador 4
            this.cube4 = new THREE.Mesh( this.geometry, this.material );
            this.cube4.position.set(0.75,0,0);
            this.cube4.name = "ind";
            //Indicador 5
            this.cube5 = new THREE.Mesh( this.geometry, this.material );
            this.cube5.position.set(0,0,-0.75);
            this.cube5.name = "ind";
            //Indicador 6
            this.cube6 = new THREE.Mesh( this.geometry, this.material );
            this.cube6.position.set(0.25,0,-0.75);
            this.cube6.name = "ind";
            //Indicador 7
            this.cube7 = new THREE.Mesh( this.geometry, this.material );
            this.cube7.position.set(0.5,0,-0.75);
            this.cube7.name = "ind";
            //Indicador 8
            this.cube8 = new THREE.Mesh( this.geometry, this.material );
            this.cube8.position.set(0.75,0,-0.75);
            this.cube8.name = "ind";
            this.data.add(this.cube2, this.cube3, this.cube4, this.cube5, this.cube6, this.cube7, this.cube8);
            //Activate
            this.labelDiv = document.createElement('div');
            this.labelDiv.className = 'd_activateswitch';
            this.labelDiv.textContent = '';
            this.labelDiv.setAttribute("id", this.clone.name.replace(" ",''));//Quita el espacio al agregar id
            this.labelDiv.setAttribute("name", this.clone.name);//Agrega nombre
            this.cssDiv = new THREE.CSS2DObject( this.labelDiv );
            this.cssDiv.width = 100;
            this.cssDiv.height = 100;
            this.cssDiv.position.set(0.4,2.3,-0.35);
            this.cssDiv.name = "activate";
            this.cssDiv.visible = true;
            this.data.add( this.cssDiv );
            var setTime = setTimeout(function(){
                //$("#"+num+"pushbutton").attr('onclick','objPress(this)');//Agrega evento onclick
                $("#"+num+"switch").append('<div><label><input type="checkbox" class="d_activeswitchcheckbos" id="d_activateswitch_'+num+'_btn_1"><span class="d_activateswitchslider round"></span></label><p>1</p></div><div><label><input type="checkbox" class="d_activeswitchcheckbos" id="d_activateswitch_'+num+'_btn_2"><span class="d_activateswitchslider round"></span></label><p>2</p></div><div><label><input type="checkbox" class="d_activeswitchcheckbos" id="d_activateswitch_'+num+'_btn_3"><span class="d_activateswitchslider round"></span></label><p>3</p></div><div><label><input type="checkbox" class="d_activeswitchcheckbos" id="d_activateswitch_'+num+'_btn_4"><span class="d_activateswitchslider round"></span></label><p>4</p></div>');//Agrega svg al div del objeto
                clearTimeout(setTime);//Limpia tiempo
            },100);
            addCoordlabel(this,2,1,0);//Asigna coordenada al objeto
        }
        if(namePieza === "preset"){//RGB extras
            //Indicador 2
            this.cube2 = new THREE.Mesh( this.geometry, this.material );
            this.cube2.position.set(1,0,0);
            this.cube2.name = "ind";
            //Indicador 3
            this.cube3 = new THREE.Mesh( this.geometry, this.material );
            this.cube3.position.set(0.5,0,0);
            this.cube3.name = "ind";
            this.data.add(this.cube2, this.cube3);
            //Activate
            this.labelDiv = document.createElement('div');
            this.labelDiv.className = 'd_activatepreset';
            this.labelDiv.textContent = '';
            this.labelDiv.setAttribute("id", this.clone.name.replace(" ",''));//Quita el espacio al agregar id
            this.labelDiv.setAttribute("name", this.clone.name);//Agrega nombre
            this.labelDiv.setAttribute("getnumPerilla", 1);
            this.labelDiv.setAttribute("girPerilla", 0);
            this.labelDiv.setAttribute("volumeSet", 1);
            this.labelDiv.setAttribute("contGir", 0);
            this.cssDiv = new THREE.CSS2DObject( this.labelDiv );
            this.cssDiv.width = 100;
            this.cssDiv.height = 100;
            this.cssDiv.position.set( 0.5, 2.9, 0.1 );
            this.cssDiv.name = "activate";
            this.cssDiv.visible = true;
            this.data.add( this.cssDiv );
            var setTime = setTimeout(function(){
                //$("#"+num+"pushbutton").attr('onclick','objPress(this)');//Agrega evento onclick
                $("#"+num+"preset").append('<div class="d_activatepresetcircle"></div><div class="d_activatepresetbtns"><div class="d_activatepresetbtnleft d_disablebtn"><svg viewBox="0 0 30 30"><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M12.477,15.007c0.512,0.511,1.018,1.013,1.522,1.518 c2.081,2.077,4.16,4.155,6.238,6.233c0.414,0.413,0.525,0.959,0.304,1.473c-0.208,0.484-0.688,0.788-1.238,0.77 c-0.354-0.014-0.648-0.165-0.899-0.416c-1.728-1.729-3.457-3.457-5.187-5.186c-1.14-1.139-2.279-2.277-3.418-3.416 c-0.602-0.602-0.602-1.36,0.002-1.962c2.868-2.867,5.737-5.734,8.604-8.602c0.381-0.381,0.833-0.509,1.343-0.355 c0.489,0.149,0.794,0.498,0.882,1.007c0.074,0.426-0.035,0.811-0.347,1.123c-1.901,1.902-3.803,3.804-5.704,5.705 c-0.659,0.659-1.318,1.316-1.976,1.975C12.562,14.913,12.524,14.956,12.477,15.007z"/></svg></div><div class="d_activatepresetbtnright"><svg viewBox="0 0 30 30"><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M17.522,14.993c-0.512-0.511-1.019-1.013-1.522-1.518 c-2.081-2.077-4.16-4.155-6.238-6.233C9.348,6.829,9.237,6.283,9.458,5.77C9.667,5.285,10.147,4.981,10.697,5 c0.354,0.014,0.648,0.165,0.899,0.416c1.728,1.729,3.457,3.457,5.187,5.186c1.14,1.139,2.279,2.277,3.418,3.416 c0.602,0.602,0.602,1.36-0.002,1.962c-2.867,2.867-5.737,5.734-8.604,8.602c-0.381,0.381-0.833,0.509-1.343,0.354 c-0.489-0.149-0.794-0.498-0.882-1.007c-0.074-0.427,0.035-0.812,0.347-1.123c1.901-1.902,3.803-3.804,5.704-5.704 c0.659-0.659,1.318-1.316,1.976-1.976C17.438,15.087,17.476,15.044,17.522,14.993z"/></svg></div></div>');//Agrega svg al div del objeto
                clearTimeout(setTime);//Limpia tiempo
            },100);
            addCoordlabel(this,2,1,0);//Asigna coordenada al objeto
        }
        if(namePieza === "ultrasonic"){//Ultrasonic extras
            //Indicador 2
            this.cube2 = new THREE.Mesh( this.geometry, this.material );
            this.cube2.position.set(0.25,0,0);
            this.cube2.name = "ind";
            //Indicador 3
            this.cube3 = new THREE.Mesh( this.geometry, this.material );
            this.cube3.position.set(0.5,0,0);
            this.cube3.name = "ind";
            //Indicador 4
            this.cube4 = new THREE.Mesh( this.geometry, this.material );
            this.cube4.position.set(0.75,0,0);
            this.cube4.name = "ind";
            this.data.add(this.cube2, this.cube3, this.cube4);
            //Activate
            this.labelDiv = document.createElement('div');
            this.labelDiv.className = 'd_activateultrasonic';
            this.labelDiv.textContent = '';
            this.labelDiv.setAttribute("id", this.clone.name.replace(" ",''));//Quita el espacio al agregar id
            this.labelDiv.setAttribute("name", this.clone.name);//Agrega nombre
            this.cssDiv = new THREE.CSS2DObject( this.labelDiv );
            this.cssDiv.width = 100;
            this.cssDiv.height = 100;
            this.cssDiv.position.set( 0.4, 3.8, 0 );
            this.cssDiv.name = "activate";
            this.cssDiv.visible = true;
            this.data.add( this.cssDiv );
            var setTime = setTimeout(function(){
                //$("#"+num+"pushbutton").attr('onclick','objPress(this)');//Agrega evento onclick
                $("#"+num+"ultrasonic").append('<svg viewBox="0 0 203 149.264"><path fill="#F3F3F3" stroke="#818181" stroke-width="0.5" stroke-miterlimit="10" d="M143,149.264c0,0-16.5-10-41-10s-42,10-42,10 L0,40C0,40,32.5,0,103,0s100,40,100,40L143,149.264z"/></svg><input type="range" id="d_ultrasonicSlider" value="0" min="0.0" max="1.0" step="0.01"/>');//Agrega svg al div del objeto
                
                
                $(".d_activateultrasonic").on("pointerdown touchstart input", '#d_ultrasonicSlider', function(event){
                    event.stopPropagation();
                    console.log($(this).val());
                });

                
                clearTimeout(setTime);//Limpia tiempo
            },100);
            addCoordlabel(this,3.4,1,0);//Asigna coordenada al objeto
        }
        if(namePieza === "resistance"){//Resistance extras
            //Indicador 2
            this.cube2 = new THREE.Mesh( this.geometry, this.material );
            this.cube2.position.set(1,0,0);
            this.cube2.name = "ind";
            this.data.add(this.cube2);
            //Label
            this.labelDiv = document.createElement('div');
            this.labelDiv.className = 'd_labelresistance';
            this.labelDiv.textContent = 'Ohms';
            this.labelDiv.setAttribute("id", this.clone.name.replace(" ",''));//Quita el espacio
            this.cssDiv = new THREE.CSS2DObject( this.labelDiv );
            this.cssDiv.width = 100;
            this.cssDiv.height = 100;
            this.cssDiv.position.set( 0.5, 2.8, 0 );
            this.cssDiv.name = "label";
            this.cssDiv.visible = false;
            this.data.add( this.cssDiv );
            addCoordlabel(this,2,1,0);//Asigna coordenada al objeto
        }
        if(namePieza === "buzzer"){//Buzzer extras
            //Indicador 2
            this.cube2 = new THREE.Mesh( this.geometry, this.material );
            this.cube2.position.set(0.75,0,0);
            this.cube2.name = "ind";
            this.data.add(this.cube2);
            creaSprite(this.data,[0.3,0.3,0.3],[-0.2,0.8,0],"labelpos",true);//Crea label positivo
            creaSprite(this.data,[0.3,0.3,0.3],[0.95,0.8,0],"labelneg",true);//Crea label negativo
            //Activate
            this.labelDiv = document.createElement('div');
            this.labelDiv.className = 'd_activatebuzzer';
            this.labelDiv.textContent = '';
            this.labelDiv.setAttribute("id", this.clone.name.replace(" ",''));//Quita el espacio al agregar id
            this.labelDiv.setAttribute("name", this.clone.name);//Agrega nombre
            this.cssDiv = new THREE.CSS2DObject( this.labelDiv );
            this.cssDiv.width = 100;
            this.cssDiv.height = 100;
            this.cssDiv.position.set( 0.4, 3, 0 );
            this.cssDiv.name = "sound";
            this.cssDiv.visible = false;
            this.data.add( this.cssDiv );
            var setTime = setTimeout(function(){
                $("#"+num+"buzzer").append('<svg viewBox="0 0 68 54"><path fill="#009EB3" d="M35.235,53c-0.681,0-1.34-0.246-1.855-0.692L17.814,38.769H3.834C2.271,38.769,1,37.493,1,35.926V17.873 c0-1.568,1.271-2.845,2.834-2.845h14.21L33.379,1.696C33.894,1.247,34.554,1,35.236,1c0.409,0,0.806,0.087,1.179,0.258 c1.005,0.463,1.653,1.478,1.653,2.586v46.313c0,1.107-0.648,2.122-1.651,2.585C36.038,52.914,35.643,53,35.235,53z"/><path fill="#FFFFFF" d="M35.236,2c0.258,0,0.518,0.055,0.762,0.167c0.652,0.301,1.07,0.957,1.07,1.678v46.313 c0,0.721-0.418,1.376-1.07,1.677C35.753,51.945,35.494,52,35.235,52c-0.433,0-0.86-0.153-1.201-0.448L18.188,37.769H3.834 C2.821,37.769,2,36.944,2,35.926V17.873c0-1.018,0.821-1.845,1.834-1.845h14.584L34.035,2.45C34.375,2.154,34.803,2,35.236,2 M35.236,0c-0.924,0-1.817,0.334-2.514,0.942L17.671,14.028H3.834C1.72,14.028,0,15.753,0,17.873v18.053 c0,2.119,1.72,3.843,3.834,3.843H17.44l15.282,13.292c0.7,0.606,1.591,0.939,2.513,0.939c0.551,0,1.086-0.116,1.59-0.345 c1.366-0.631,2.243-2.002,2.243-3.498V3.845c0-1.497-0.877-2.869-2.232-3.494C36.327,0.118,35.79,0,35.236,0L35.236,0z"/><path class="d_buzzerline1" fill="#009EB3" d="M43.332,40.001c-0.553,0-1.091-0.162-1.557-0.47c-1.304-0.859-1.668-2.624-0.812-3.934 c3.393-5.198,3.393-11.918-0.001-17.119c-0.854-1.306-0.491-3.071,0.812-3.933c0.466-0.307,1.003-0.468,1.557-0.468 c0.96,0,1.847,0.48,2.373,1.284c4.629,7.094,4.629,16.26,0.001,23.353C45.175,39.521,44.288,40.001,43.332,40.001z"/><path class="d_buzzerline1" fill="#FFFFFF" d="M43.331,15.078c0.598,0,1.184,0.292,1.536,0.832c4.412,6.761,4.412,15.498,0,22.259 c-0.354,0.538-0.938,0.833-1.535,0.833c-0.346,0-0.695-0.1-1.006-0.305c-0.846-0.558-1.082-1.7-0.525-2.552 c3.61-5.531,3.61-12.679,0-18.212c-0.557-0.851-0.32-1.993,0.525-2.553C42.637,15.175,42.986,15.078,43.331,15.078 M43.331,13.078 c-0.749,0-1.478,0.218-2.105,0.632c-1.763,1.167-2.255,3.551-1.099,5.318c3.176,4.866,3.176,11.157-0.001,16.024 c-1.155,1.768-0.663,4.152,1.1,5.314c0.628,0.415,1.357,0.635,2.106,0.635c1.294,0,2.493-0.648,3.207-1.734 c4.849-7.431,4.849-17.025,0.003-24.451C45.829,13.727,44.629,13.078,43.331,13.078L43.331,13.078z"/><path class="d_buzzerline2" fill="#009EB3" d="M50.01,46.714c-0.608,0-1.19-0.193-1.684-0.558c-1.254-0.929-1.523-2.71-0.599-3.972 c6.642-9.06,6.642-21.233,0-30.292c-0.923-1.26-0.655-3.042,0.599-3.972c0.492-0.365,1.074-0.557,1.684-0.557 c0.898,0,1.752,0.433,2.284,1.159c3.96,5.403,6.054,11.806,6.054,18.515c0,6.71-2.094,13.112-6.054,18.517 C51.76,46.281,50.906,46.714,50.01,46.714z"/><path class="d_buzzerline2" fill="#FFFFFF" d="M50.01,8.364c0.563,0,1.118,0.259,1.478,0.75c3.833,5.229,5.86,11.428,5.86,17.924 c0,6.497-2.027,12.695-5.86,17.926c-0.36,0.49-0.915,0.75-1.478,0.75c-0.379,0-0.76-0.118-1.088-0.361 c-0.814-0.603-0.988-1.758-0.388-2.577c6.9-9.413,6.9-22.062,0-31.474c-0.601-0.819-0.427-1.973,0.388-2.577 C49.25,8.481,49.632,8.364,50.01,8.364 M50.01,6.364c-0.825,0-1.613,0.26-2.278,0.753c-1.695,1.258-2.058,3.665-0.811,5.367 c6.382,8.705,6.382,20.402,0,29.108c-1.249,1.705-0.885,4.112,0.812,5.367c0.665,0.493,1.453,0.754,2.277,0.754 c1.214,0,2.368-0.585,3.089-1.565c4.089-5.579,6.249-12.187,6.249-19.11c0-6.923-2.16-13.53-6.247-19.106 C52.381,6.95,51.226,6.364,50.01,6.364L50.01,6.364z"/><path class="d_buzzerline3" fill="#009EB3" d="M56.123,52.859c-0.645,0-1.276-0.224-1.777-0.63c-1.214-0.98-1.408-2.771-0.434-3.992 c9.813-12.283,9.813-30.113,0-42.396c-0.977-1.221-0.781-3.013,0.435-3.994c0.502-0.405,1.133-0.628,1.775-0.628 c0.866,0,1.672,0.389,2.213,1.066C63.922,9.277,67,18.068,67,27.038S63.922,44.8,58.334,51.794 C57.793,52.472,56.987,52.859,56.123,52.859z"/><path class="d_buzzerline3" fill="#FFFFFF" d="M56.122,2.218c0.537,0,1.068,0.236,1.431,0.69C63,9.725,66,18.294,66,27.038 c0,8.745-3,17.314-8.447,24.132c-0.362,0.453-0.895,0.689-1.43,0.689c-0.404,0-0.81-0.133-1.148-0.407 c-0.789-0.638-0.915-1.797-0.281-2.591c10.104-12.646,10.104-30.999,0-43.645c-0.634-0.793-0.508-1.955,0.281-2.592 C55.313,2.352,55.72,2.218,56.122,2.218 M56.122,0.218c-0.87,0-1.725,0.302-2.403,0.851c-1.643,1.325-1.906,3.747-0.588,5.396 c9.525,11.921,9.524,29.226,0,41.148c-1.316,1.649-1.054,4.069,0.587,5.395c0.678,0.549,1.532,0.852,2.405,0.852 c1.169,0,2.26-0.525,2.992-1.44C64.845,45.248,68,36.234,68,27.038c0-9.196-3.155-18.209-8.885-25.378 C58.386,0.744,57.294,0.218,56.122,0.218L56.122,0.218z"/></svg>');//Agrega svg al div del objeto
                clearTimeout(setTime);//Limpia tiempo
            },100);
            //Activate
            this.labelDiv_crash = document.createElement('div');
            this.labelDiv_crash.className = 'd_activatebuzzer_crash';
            this.labelDiv_crash.textContent = '';
            this.labelDiv_crash.setAttribute("id", num+"buzzer_crash");//Quita el espacio al agregar id
            this.labelDiv_crash.setAttribute("name", num+" buzzer_crash");//Agrega nombre
            this.cssDiv_crash = new THREE.CSS2DObject( this.labelDiv_crash );
            this.cssDiv_crash.width = 100;
            this.cssDiv_crash.height = 100;
            this.cssDiv_crash.position.set( 0.35, 2.6, 0 );
            this.cssDiv_crash.name = "crash";
            this.cssDiv_crash.visible = false;
            this.data.add( this.cssDiv_crash );
            var setTime_crash = setTimeout(function(){
                $("#"+num+"buzzer_crash").append('<svg viewBox="0 0 75.451 68.89"><polygon fill="#EC2227" points="25.137,50.862 3.612,62.594 16.004,39.772 1.169,35.801 15.269,25.983 1.533,11.229 22.75,16.71 29.685,0.95 40.583,14.362 66.906,3.361 54.151,22.332 74.065,29.584 55.052,37.368 67.269,59.589 44.647,48.588 41.581,67.824"/><path fill="#010101" d="M29.813,1.901l10.146,12.487l0.471,0.58l0.69-0.288l24.44-10.215L54.093,21.523l-0.713,1.061l1.201,0.437 l18.098,6.591l-17.298,7.082l-1.038,0.425l0.54,0.982l11.189,20.351L45.472,48.434l-1.213-0.589l-0.212,1.332l-2.803,17.583 L25.761,50.787l-0.529-0.545l-0.667,0.364L4.859,61.344l11.282-20.776l0.605-1.115l-1.226-0.328L2.338,35.596l12.743-8.873 l0.946-0.659l-0.785-0.844L3.065,12.142l19.148,4.946l0.823,0.212l0.343-0.778L29.813,1.901 M29.557,0l-7.094,16.12L0,10.317 l14.51,15.585L0,36.006l15.262,4.085L2.365,63.843l22.678-12.359L41.917,68.89l3.117-19.557l23.43,11.394L55.76,37.618 l19.691-8.062l-20.528-7.476L68.25,2.257l-27.515,11.5L29.557,0L29.557,0z"/><polygon fill="#F6EB16" points="29.945,44.503 15.459,51.346 24.409,37.722 12.429,33.548 22.163,28.424 15.355,20.105 27.277,22.656 31.627,12.376 39.5,22.128 55.959,11.868 48.374,24.184 63.158,29.702 48.288,36.222 57.326,49.613 41.939,43.09 39.019,57.945"/><path fill="#010101" d="M31.762,13.34l7.071,8.758l0.556,0.689l0.751-0.468l14.278-8.9l-6.15,9.985l-0.638,1.036l1.14,0.426 l13.059,4.875l-13.191,5.784l-1.098,0.481l0.67,0.994l7.758,11.495L42.701,42.87l-1.134-0.48l-0.238,1.208l-2.57,13.07 l-8.161-12.089l-0.48-0.711l-0.776,0.366l-12.49,5.9l7.622-11.603l0.704-1.071l-1.21-0.422L13.68,33.455l8.174-4.303l1.083-0.57 l-0.775-0.948l-5.516-6.741l10.122,2.167l0.808,0.173l0.322-0.761L31.762,13.34 M57.502,10.317L39.611,21.47l-8.119-10.057 l-4.514,10.668l-12.913-2.764l7.323,8.949l-10.21,5.375l12.461,4.342l-9.574,14.574l15.706-7.419l9.506,14.083l3.034-15.431 l16.373,6.94l-9.646-14.292l15.45-6.774l-15.37-5.737L57.502,10.317L57.502,10.317z"/><polygon fill="#FFFFFF" points="33.278,40.22 25.279,43.998 30.27,36.406 22.514,33.629 29.013,31.172 25.177,26.493 31.763,27.905 34.249,22.026 38.801,27.666 47.423,20.777 42.95,30.255 52.309,31.176 43.68,35.559 48.709,43.021 40.087,39.36 38.422,47.841"/><path fill="#010101" d="M46.051,22.513L42.8,29.4l-0.605,1.283l1.412,0.139l6.949,0.684l-6.597,3.35l-1.009,0.512l0.632,0.938 l3.771,5.594l-6.502-2.76l-1.134-0.482l-0.238,1.209l-1.314,6.695l-4.23-6.268l-0.48-0.711l-0.776,0.366l-6.003,2.835l3.665-5.575 l0.698-1.063l-1.197-0.428l-5.878-2.104l4.577-1.73l1.303-0.493l-0.883-1.077l-2.488-3.035l4.784,1.025l0.809,0.174l0.322-0.762 l1.999-4.729l3.715,4.603l0.625,0.774l0.777-0.621L46.051,22.513 M48.796,19.04l-9.918,7.925l-4.764-5.902l-2.649,6.267 l-7.58-1.625l4.301,5.246l-7.119,2.691l8.436,3.021l-5.619,8.548l9.22-4.354l5.577,8.263l1.778-9.057l9.607,4.079l-5.656-8.393 l9.652-4.901l-10.358-1.02L48.796,19.04L48.796,19.04z"/></svg>');//Agrega svg al div del objeto
                clearTimeout(setTime_crash);//Limpia tiempo
            },100);
            addCoordlabel(this,2,1,0);//Asigna coordenada al objeto
        }
        if(namePieza === "pushbutton"){//Push button extras
            //Indicador 2
            this.cube2 = new THREE.Mesh( this.geometry, this.material );
            this.cube2.position.set(0.5,0,0);
            this.cube2.name = "ind";
            //Indicador 3
            this.cube3 = new THREE.Mesh( this.geometry, this.material );
            this.cube3.position.set(0,0,-1.25);
            this.cube3.name = "ind";
            //Indicador 4
            this.cube4 = new THREE.Mesh( this.geometry, this.material );
            this.cube4.position.set(0.5,0,-1.25);
            this.cube4.name = "ind";
            this.data.add(this.cube2, this.cube3, this.cube4);
            //Activate
            this.labelDiv = document.createElement('div');
            this.labelDiv.className = 'd_activatepushbutton';
            this.labelDiv.textContent = '';
            this.labelDiv.setAttribute("id", this.clone.name.replace(" ",''));//Quita el espacio al agregar id
            this.labelDiv.setAttribute("name", this.clone.name);//Agrega nombre
            this.cssDiv = new THREE.CSS2DObject( this.labelDiv );
            this.cssDiv.width = 100;
            this.cssDiv.height = 100;
            this.cssDiv.position.set( 0.23, 2.6, -0.6 );
            this.cssDiv.name = "activate";
            this.cssDiv.visible = true;
            this.data.add( this.cssDiv );
            var setTime = setTimeout(function(){
                //$("#"+num+"pushbutton").attr('onclick','objPress(this)');//Agrega evento onclick
                $("#"+num+"pushbutton").append('<svg viewBox="0 0 50 50"><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M24.327,6.668c-2.749-1.83-6.51-1.854-9.351,0.214c-2.301,1.677-3.429,3.976-3.494,6.828c5.568,0,11.086,0,16.651,0C28.057,10.699,26.821,8.329,24.327,6.668z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M24.3,14.445c0,0.13,0,0.228,0,0.326 c0,2.176,0.003,2.518,0.003,4.693c0,4.226-0.004,4.787-0.002,9.014c0,1.035,0.81,1.851,1.819,1.854 c1.018,0.002,1.827-0.826,1.83-1.872c0.003-0.646,0.001-1.292,0.001-1.939c0-4.284,0-3.069,0-7.354c0-0.382,0-0.763,0-1.145 c-0.001-0.829-0.001-1.658-0.002-2.487c0-0.362,0-0.724,0-1.089C26.719,14.445,25.525,14.445,24.3,14.445z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M23.739,23.398c0.002-3.509,0-5.22,0-8.728 c0-0.079-0.007-0.158-0.011-0.249c-1.196,0-2.373,0-3.578,0c0,0.115,0,0.219,0,0.322c0,3.125,0,4.455-0.001,7.579 c0,0.334-0.011,0.667-0.027,1c-0.049,1.095,0.816,1.99,1.886,1.946C23.003,25.229,23.738,24.44,23.739,23.398z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M19.468,14.642c0-0.078-0.007-0.157-0.011-0.244 c-1.181,0-2.347,0-3.54,0c0,0.183,0,0.337,0,0.489c0,2.815,0,3.85,0.001,6.666c0,0.176,0.003,0.358,0.042,0.528 c0.208,0.924,1.013,1.513,1.915,1.411c0.933-0.105,1.593-0.856,1.594-1.82C19.47,18.734,19.469,17.578,19.468,14.642z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M15.174,19.778c-0.005-2.083-0.001-2.431-0.002-4.514 c0-0.219-0.002-0.438-0.006-0.657c-0.002-0.129-0.058-0.198-0.202-0.198c-1.077,0.004-2.153,0.002-3.269,0.002 c0,0.115,0.001,0.2,0,0.285c-0.011,1.852-0.026,1.97-0.031,3.821c-0.001,0.605-0.028,1.216,0.05,1.812 c0.088,0.675,0.519,1.146,1.171,1.349c0.672,0.207,1.29,0.076,1.796-0.446C15.077,20.825,15.175,20.323,15.174,19.778z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#343434" d="M13.759,38.66c-0.011,0.173-0.025,0.305-0.025,0.438 c-0.002,1.248-0.001,2.498-0.001,3.781c8.315,0,16.557,0,24.786,0c0-1.447,0-2.825,0-4.219 C30.248,38.66,22.012,38.66,13.759,38.66z"/> <path fill-rule="evenodd" clip-rule="evenodd" fill="#F15A24" d="M21.787,32.98c-2.04,0.039-3.459,1.885-3.042,3.841 c4.931,0,9.867,0,14.836,0c0.378-1.95-1.035-3.796-3.026-3.839C27.633,32.92,24.708,32.924,21.787,32.98z"/></svg>');//Agrega svg al div del objeto
                clearTimeout(setTime);//Limpia tiempo
            },100);
            addCoordlabel(this,2.4,1,0);//Asigna coordenada al objeto
        }
        /*if(namePieza === "pushbutton"){//Push button extras
            //Indicador 2
            this.cube2 = new THREE.Mesh( this.geometry, this.material );
            this.cube2.position.set(0.5,0,0);
            this.cube2.name = "ind";
            this.data.add(this.cube2);
            //Add btn
            this.btn = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.4, 32),new THREE.MeshLambertMaterial({color:0xc1272d}));
            this.btn.position.set(0.25,1.9,0);
            this.btn.name = "btn";
            this.btn.visible = true;
            this.data.add(this.btn);
            //Activate
            this.labelDiv = document.createElement('div');
            this.labelDiv.className = 'd_activatepushbutton';
            this.labelDiv.textContent = '';
            this.labelDiv.setAttribute("id", this.clone.name.replace(" ",''));//Quita el espacio al agregar id
            this.labelDiv.setAttribute("name", this.clone.name);//Agrega nombre
            this.cssDiv = new THREE.CSS2DObject( this.labelDiv );
            this.cssDiv.width = 100;
            this.cssDiv.height = 100;
            this.cssDiv.position.set( 0.3, 2.6, 0 );
            this.cssDiv.name = "activate";
            this.cssDiv.visible = true;
            this.data.add( this.cssDiv );
            var setTime = setTimeout(function(){
                //$("#"+num+"pushbutton").attr('onclick','objPress(this)');//Agrega evento onclick
                $("#"+num+"pushbutton").append('<svg viewBox="0 0 50 50"><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M24.327,6.668c-2.749-1.83-6.51-1.854-9.351,0.214c-2.301,1.677-3.429,3.976-3.494,6.828c5.568,0,11.086,0,16.651,0C28.057,10.699,26.821,8.329,24.327,6.668z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M24.3,14.445c0,0.13,0,0.228,0,0.326 c0,2.176,0.003,2.518,0.003,4.693c0,4.226-0.004,4.787-0.002,9.014c0,1.035,0.81,1.851,1.819,1.854 c1.018,0.002,1.827-0.826,1.83-1.872c0.003-0.646,0.001-1.292,0.001-1.939c0-4.284,0-3.069,0-7.354c0-0.382,0-0.763,0-1.145 c-0.001-0.829-0.001-1.658-0.002-2.487c0-0.362,0-0.724,0-1.089C26.719,14.445,25.525,14.445,24.3,14.445z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M23.739,23.398c0.002-3.509,0-5.22,0-8.728 c0-0.079-0.007-0.158-0.011-0.249c-1.196,0-2.373,0-3.578,0c0,0.115,0,0.219,0,0.322c0,3.125,0,4.455-0.001,7.579 c0,0.334-0.011,0.667-0.027,1c-0.049,1.095,0.816,1.99,1.886,1.946C23.003,25.229,23.738,24.44,23.739,23.398z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M19.468,14.642c0-0.078-0.007-0.157-0.011-0.244 c-1.181,0-2.347,0-3.54,0c0,0.183,0,0.337,0,0.489c0,2.815,0,3.85,0.001,6.666c0,0.176,0.003,0.358,0.042,0.528 c0.208,0.924,1.013,1.513,1.915,1.411c0.933-0.105,1.593-0.856,1.594-1.82C19.47,18.734,19.469,17.578,19.468,14.642z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M15.174,19.778c-0.005-2.083-0.001-2.431-0.002-4.514 c0-0.219-0.002-0.438-0.006-0.657c-0.002-0.129-0.058-0.198-0.202-0.198c-1.077,0.004-2.153,0.002-3.269,0.002 c0,0.115,0.001,0.2,0,0.285c-0.011,1.852-0.026,1.97-0.031,3.821c-0.001,0.605-0.028,1.216,0.05,1.812 c0.088,0.675,0.519,1.146,1.171,1.349c0.672,0.207,1.29,0.076,1.796-0.446C15.077,20.825,15.175,20.323,15.174,19.778z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#343434" d="M13.759,38.66c-0.011,0.173-0.025,0.305-0.025,0.438 c-0.002,1.248-0.001,2.498-0.001,3.781c8.315,0,16.557,0,24.786,0c0-1.447,0-2.825,0-4.219 C30.248,38.66,22.012,38.66,13.759,38.66z"/> <path fill-rule="evenodd" clip-rule="evenodd" fill="#F15A24" d="M21.787,32.98c-2.04,0.039-3.459,1.885-3.042,3.841 c4.931,0,9.867,0,14.836,0c0.378-1.95-1.035-3.796-3.026-3.839C27.633,32.92,24.708,32.924,21.787,32.98z"/></svg>');//Agrega svg al div del objeto
                clearTimeout(setTime);//Limpia tiempo
            },100);
        }*/
        if(namePieza === "ldr"){//Resistance extras
            //Indicador 2
            this.cube2 = new THREE.Mesh( this.geometry, this.material );
            this.cube2.position.set(0.25,0,0);
            this.cube2.name = "ind";
            this.data.add(this.cube2);
            //Label
            this.labelDiv = document.createElement('div');
            this.labelDiv.className = 'd_activateldr';
            this.labelDiv.textContent = '';
            this.labelDiv.setAttribute("id", this.clone.name.replace(" ",''));//Quita el espacio
            this.labelDiv.setAttribute("name", this.clone.name);//Agrega nombre
            this.labelDiv.setAttribute("contLight", 0);//Agrega attr de info icono de light
            this.labelDiv.setAttribute("contdata", 0.4);//Agrega attr de intensidad light de ldr
            this.labelDiv.setAttribute("rgbValue", 0);//Agrega attr de color RGB de ldr
            this.labelDiv.setAttribute("volumeSet", 0);//Agrega attr de volumen Buzzer de ldr
            this.cssDiv = new THREE.CSS2DObject( this.labelDiv );
            this.cssDiv.width = 100;
            this.cssDiv.height = 100;
            this.cssDiv.position.set( 0.1, 4, 0 );
            this.cssDiv.name = "activate";
            this.cssDiv.visible = true;
            this.data.add( this.cssDiv );
            var setTime = setTimeout(function(){
                //$("#"+num+"pushbutton").attr('onclick','objPress(this)');//Agrega evento onclick
                $("#"+num+"ldr").append('<div class="d_activateldrright"><svg viewBox="0 0 30 30"><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M14.993,12.478c-0.511,0.512-1.013,1.019-1.518,1.522 c-2.077,2.08-4.155,4.159-6.233,6.237c-0.413,0.414-0.959,0.525-1.473,0.304C5.285,20.333,4.981,19.853,5,19.303 c0.014-0.354,0.165-0.648,0.416-0.899c1.729-1.728,3.457-3.457,5.186-5.187c1.139-1.14,2.277-2.279,3.416-3.418 c0.602-0.602,1.36-0.602,1.962,0.002c2.867,2.867,5.734,5.736,8.602,8.604c0.381,0.381,0.509,0.833,0.354,1.343 c-0.149,0.489-0.498,0.794-1.007,0.882c-0.427,0.074-0.812-0.035-1.123-0.347c-1.902-1.901-3.804-3.803-5.704-5.704 c-0.659-0.658-1.316-1.317-1.976-1.976C15.087,12.563,15.044,12.524,14.993,12.478z"/></svg></div><div class="d_activateldrlight"><svg viewBox="0 0 38 38"><circle fill="#977126" cx="19" cy="19" r="7.948"/><path fill="#977126" d="M19,8.444c-0.823,0-1.49-0.667-1.49-1.49V1.49C17.51,0.667,18.177,0,19,0c0.823,0,1.491,0.667,1.491,1.49 v5.464C20.491,7.777,19.823,8.444,19,8.444z"/><path fill="#977126" d="M36.51,20.49h-5.465c-0.822,0-1.49-0.668-1.49-1.49s0.668-1.49,1.49-1.49h5.465 c0.822,0,1.49,0.668,1.49,1.49S37.333,20.49,36.51,20.49z"/><path fill="#977126" d="M6.954,20.49H1.49C0.667,20.49,0,19.822,0,19s0.667-1.49,1.49-1.49h5.464c0.823,0,1.49,0.668,1.49,1.49 S7.777,20.49,6.954,20.49z"/><path fill="#977126" d="M27.518,11.973c-0.382,0-0.763-0.146-1.055-0.437c-0.582-0.582-0.582-1.524,0-2.107l3.864-3.863 c0.581-0.583,1.525-0.583,2.107,0c0.582,0.582,0.582,1.524,0,2.106l-3.864,3.864C28.281,11.827,27.899,11.973,27.518,11.973z"/><path fill="#977126" d="M6.619,32.872c-0.381,0-0.763-0.146-1.054-0.438c-0.582-0.582-0.582-1.524,0-2.106l3.864-3.863 c0.582-0.582,1.525-0.582,2.107,0c0.582,0.582,0.582,1.524,0,2.107l-3.864,3.862C7.381,32.727,7,32.872,6.619,32.872z"/><path fill="#977126" d="M31.381,32.872c-0.381,0-0.763-0.146-1.054-0.438l-3.864-3.862c-0.582-0.583-0.582-1.525,0-2.107 s1.525-0.582,2.107,0l3.864,3.863c0.582,0.582,0.582,1.524,0,2.106C32.145,32.727,31.762,32.872,31.381,32.872z"/><path fill="#977126" d="M10.482,11.972c-0.381,0-0.763-0.146-1.054-0.437L5.565,7.672c-0.582-0.582-0.582-1.524,0-2.106 c0.581-0.583,1.525-0.583,2.107,0l3.864,3.863c0.582,0.582,0.582,1.524,0,2.106C11.245,11.826,10.864,11.972,10.482,11.972z"/><path fill="#977126" d="M19,38c-0.823,0-1.49-0.667-1.49-1.49v-5.464c0-0.823,0.667-1.49,1.49-1.49 c0.823,0,1.491,0.667,1.491,1.49v5.464C20.491,37.333,19.823,38,19,38z"/></svg></div><div class="d_activateldrleft d_disablebtn"><svg viewBox="0 0 30 30"><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M15.006,17.521c0.511-0.512,1.013-1.018,1.517-1.522 c2.078-2.08,4.156-4.159,6.234-6.237c0.413-0.414,0.959-0.525,1.473-0.304c0.484,0.208,0.788,0.688,0.77,1.238 c-0.014,0.354-0.165,0.648-0.416,0.899c-1.729,1.728-3.457,3.457-5.186,5.187c-1.139,1.139-2.277,2.279-3.417,3.418 c-0.602,0.602-1.36,0.602-1.962-0.002c-2.867-2.868-5.734-5.737-8.602-8.604c-0.381-0.381-0.509-0.833-0.354-1.343 c0.149-0.489,0.498-0.794,1.007-0.882c0.427-0.074,0.812,0.035,1.123,0.347c1.902,1.901,3.804,3.803,5.704,5.704 c0.659,0.658,1.316,1.317,1.976,1.975C14.913,17.438,14.956,17.475,15.006,17.521z"/></svg></div>');//Agrega svg al div del objeto
                clearTimeout(setTime);//Limpia tiempo
            },100);
            addCoordlabel(this,1,1,0);//Asigna coordenada al objeto
        }
        
        
        /*if(namePieza != "pushbuttonTwopin" && namePieza != "powerbank" && namePieza != "pinPowerneg" && namePieza != "usbdata" && namePieza != "usbenergy" && namePieza != "usb" && namePieza != "pinPowerpos" && namePieza != "arduino" && namePieza != "protoboard"){
            const geometrys = new THREE.BoxBufferGeometry( 1, 0.5, 0.7 );
            const materials = new THREE.MeshBasicMaterial( {color: 0x00ff00,wireframe:true} );
            const cubes = new THREE.Mesh( geometrys, materials );
            cubes.position.set(0.5,2.2,0);
            cubes.name = "limitObj";
            this.data.add( cubes );
        }*/
        
        function addCoordlabel(getThis, posX, posY, posZ, status){
            /*
            * NOMBRE: addCoordlabel.
            * UTILIDAD: Asigna coordenada al objeto
            * ENTRADAS: getThis > objeto en curso.
            * SALIDAS: Ninguna.
            * VARIABLES: Ninguna
            */
            getThis.labelDiv_coord = document.createElement('div');
            getThis.labelDiv_coord.className = 'd_pxbentorno3dcoordmove';
            getThis.labelDiv_coord.textContent = '';
            getThis.labelDiv_coord.setAttribute("id", 'd_pxbentorno3dcoordmove_'+getThis.clone.name.replace(" ",''));//Quita el espacio al agregar id
            getThis.cssDiv_coord = new THREE.CSS2DObject( getThis.labelDiv_coord );
            getThis.cssDiv_coord.width = 100;
            getThis.cssDiv_coord.height = 100;
            getThis.cssDiv_coord.position.set( posX, posY, posZ );
            getThis.cssDiv_coord.name = "coordinfo";
            getThis.cssDiv_coord.visible = true;
            getThis.data.add( getThis.cssDiv_coord );
            var setTimecoord = setTimeout(function(){
                //alert(getThis.clone.name.replace(" ",'').toString());
                $("#d_pxbentorno3dcoordmove_"+getThis.clone.name.replace(" ",'').toString()).append('<div class="d_coordtxt d_coorA">Pin A:<span>0</span></div><div class="d_coordtxt d_coorB">Pin B:<span>0</span></div><div class="d_coordtxt d_coorC">Pin C:<span>0</span></div><div class="d_coordtxt d_coorD">Pin D:<span>0</span></div><div class="d_coordtxt d_coorE">Pin E:<span>0</span></div><div class="d_coordtxt d_coorF">Pin F:<span>0</span></div><div class="d_coordtxt d_coorG">Pin G:<span>0</span></div><div class="d_coordtxt d_coorH">Pin H:<span>0</span></div>');
                console.log(status);
                console.log("d_pxbentorno3dcoordmove_"+getThis.clone.name.replace(" ",'').toString());
                if(status){//Si es jumper, un pin no muestra coordenada
                    $("#d_pxbentorno3dcoordmove_"+getThis.clone.name.replace(" ",'').toString()).addClass('d_hideImportant');//Oculta coordenada de un pin (caso jumper)
                }
                clearTimeout(setTimecoord);//Limpia tiempo
            },(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))?1000:100);
        }
        function creaSprite(thisObj,scaleSet,positionSet,spriteType,spriteVisible){
            /*
            * NOMBRE: creaSprite.
            * UTILIDAD: Crea los sprite para luces o label
            * ENTRADAS: thisObj > objeto que se crea, scaleSet > tamaño del sprite, positionSet > posicion del sprite, spriteType > si es luz o label, spriteVisible > visible o no vivible al inicio.
            * SALIDAS: Ninguna.
            * VARIABLES: Ninguna
            */
            if(spriteType === "light"){//LED y RGB extras
                this.spriteMaterial = {};
                this.spriteMaterial = ledlightMaterial.clone();
            }
            if(spriteType === "labelpos"){
                this.spriteMaterial = ledposMaterial;
            }
            if(spriteType === "labelneg"){
                this.spriteMaterial = lednegMaterial;
            }
            this.spriteAdd = new THREE.Sprite(this.spriteMaterial);
            this.spriteAdd.scale.set(scaleSet[0], scaleSet[1], scaleSet[2]);
            this.spriteAdd.position.set(positionSet[0], positionSet[1], positionSet[2]);
            this.spriteAdd.visible = spriteVisible;
            this.spriteAdd.name = spriteType;
            thisObj.add(this.spriteAdd);
        }
        function creaInfo(thisObj,sizeSet,positionSet,colorSet,infoType,infoVisible){
            /*
            * NOMBRE: creaInfo.
            * UTILIDAD: Crea los elementos de info como colores de RGB
            * ENTRADAS: thisObj > objeto que se crea, sizeSet > tamano de elemento, positionSet > posicion del elemento, colorSet > color del elemento, spriteVisible > visible o no vivible al inicio.
            * SALIDAS: Ninguna.
            * VARIABLES: Ninguna
            */
            this.infoGeometry = new THREE.CylinderBufferGeometry( sizeSet[0], sizeSet[0], sizeSet[1], 8 );
            this.infoMaterial = new THREE.MeshBasicMaterial( {color: colorSet} );
            this.infoAdd = new THREE.Mesh( this.infoGeometry, this.infoMaterial );
            this.infoAdd.position.set(positionSet[0], positionSet[1], positionSet[2]);
            this.infoAdd.visible = infoVisible;
            this.infoAdd.name = infoType;
            thisObj.add(this.infoAdd);
        }
        allClones[num] = this.clone;//Guarda objeto en array
        scene.add(this.clone);
    }
}
function classGroup(objGroup,visible,num){
    /*
	* NOMBRE: classGroup.
	* UTILIDAD: Clase para crear los grupos de objetos, pero estos solo se usan al unir sus piezas, orque al final se clonan
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    this.creaGroup = function(){
        this.group = new THREE.Group();
        this.group.name = "group"+num;
        this.group.visible = visible;
        for(i=0; i<=objGroup.length-1; i++){
            for(j=objGroup[i][0]; j<=objGroup[i][1]; j++){
                this.group.add(allClones[j]);
            }
        }
        groupprov[num] = this.group;//Guarda objeto en array
        scene.add(this.group);
    }
}
function classClonegroup(posX,posY,posZ,rotX,rotY,rotZ,visible,group,num){
    /*
	* NOMBRE: classClonegroup.
	* UTILIDAD: Clase para crear los clones de grupos de objetos
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    this.creaClonegroup = function(){
        this.clones = groupprov[group].clone();//Clona el grupo objeto guardado
        this.clones.position.set(posX,posY,posZ);
        this.clones.rotation.set(rotX,rotY,rotZ);
        this.clones.visible = visible;
        allClones[num] = this.clones;//Guarda objeto en array
        scene.add(this.clones);
    }
}