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
startInit = true;//Determina que SI hay canvas 3d en la aplicacion
setCamerapos = [15,10,60];//Establece la posicion de la camara
setScenepos = [0,0,0];//Establece la posicion de la camara
gridPosy = -19;//Posicion de la reticula en cada modelo
setRope = true;//Establece si hay animacion para cuerda
slidesInd = null;//Cantidad de vistas para indicaciones
var addAnima = false;//Indica si se esta animando la cuerda
var cunaAnima = false;//Activar animacion de cuna siguiendo canasta
var crashAdd = false;//Palito se rompe
var numForce = 0;//Altura de cuna
var numCuna = 0;//Distancia a la que baja la cuna
var numCrash = 0;//Inclinacion de crash
var groundMaterial, cunaMaterial, palitoMaterial = [],popoteMaterial;//Materials phisi
var cunaColor, palitoColor, groundCcolor;//Colors phisi
var objetoPalito = [];//Guarda las palitos phisis
var cunaGeometry, groundGeometry, palitoGeometrylarge, palitoGeometrysmall, sideGeometry, popoteGeometry;//Geometry phisi
var cunaMesh, groundMesh, popoteMesh, palitoMesh;//Mesh phisi
var incCollision = false;//Almacena si hay solo una collision
var newEffectout = TWEEN.Easing.Quadratic.In;//Efecto ease para tween
var velCalc;//Distancia recorrida en 1000
var intervalTime;//Intervalo de 1000 para la velocidad
var guillotineUp = false;//Animacion guillotina up
var strongLevel = 0;//Fuerza de la barra
addReflexion = [
    "¿Cuál es la principal diferencia entre la caída de la cuña en cada una de las alturas?",
    "¿Qué es lo que causa el incremento de la velocidad en la cuña en cada una de las diferentes alturas?",
    "Usando tu modelo físico, cambia el sentido de la cuña, amarrando la punta en lugar del ocho y déjala caer a la altura máxima. ¿Se rompe el trozo de MDF?",
    "¿Todas las cuñas terminan en punta?"
];//Preguntas de reflexion
/*************************************************************************************
*
* 								FUNCIONES Y PROCEDIMIENTOS
*
**************************************************************************************/
$(document).ready(function(){});
$(window).resize(function(){});
$(window).on('load',function(){});
function addClones(){
    /*
	* NOMBRE: addClones.
	* UTILIDAD: Crea los clones de los objetos
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    
    //Armado polea
    gltfClone = new classClonegltf("poleaA",0,-0.3,0,0,0,0,objVis,0);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("poleaC",0,0,0.78,0,girRad*90,girRad*90,objVis,1);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("poleaB",0,0,0,0,0,0,objVis,2);
    gltfClone.creaClonegltf();
    
    gltfClone = new classClonegltf("poleaC",0.67,0,-0.4,0,girRad*30,girRad*90,objVis,3);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("poleaC",-0.67,0,-0.4,0,-(girRad*30),girRad*90,objVis,4);
    gltfClone.creaClonegltf();
    
    gltfClone = new classClonegltf("poleaA",0,0.3,0,0,0,0,objVis,5);
    gltfClone.creaClonegltf();
    
    shapeGroup = new classGroup([[0,5]],objVis,0);
    shapeGroup.creaGroup();
    
    //Paso 1
    gltfClone = new classClonegltf("b4x3",0,0,5.85,0,0,0,objVis,6);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x3",0,0.3,4.55,0,0,0,objVis,7);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x3",0,-0.3,4.55,0,0,0,objVis,8);
    gltfClone.creaClonegltf();
    
    //Paso 2
    meshClone = new classCloneshape("straw",1.3,0,3.9,0,0,0,2.2,objVis,9);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",-1.3,0,3.9,0,0,0,2.2,objVis,10);
    meshClone.creaClonemesh();
    
    //Paso 3
    gltfClone = new classClonegltf("b4x3",0,0.6,3.25,0,0,0,objVis,11);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x3",0,-0.6,3.25,0,0,0,objVis,12);
    gltfClone.creaClonegltf();
    
    //Paso 4
    gltfClone = new classClonegltf("b4x3",0,0.9,1.95,0,0,0,objVis,13);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x3",0,-0.9,1.95,0,0,0,objVis,14);
    gltfClone.creaClonegltf();
    
    //Paso 5
    gltfClone = new classClonegltf("hang8",0,0,0,0,-(girRad*90),0,objVis,15);
    gltfClone.creaClonegltf();
    
    //Paso 6
    meshClone = new classCloneshape("stick",0,0,0,0,0,0,5,objVis,16);
    meshClone.creaClonemesh();
    
    //Paso 7
    gltfClone = new classClonegltf("topeS6mm",0,1.4,0,0,-(girRad*90),0,objVis,17);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeS6mm",0,-1.4,0,0,-(girRad*90),0,objVis,18);
    gltfClone.creaClonegltf();
    
    shapeGroup = new classGroup([[6,18]],objVis,1);
    shapeGroup.creaGroup();
    
    //Paso 8
    gltfClone = new classClonegltf("b11x1",0,0,5,0,0,girRad*90,objVis,19);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",0,0,-2.65,0,0,0,objVis,20);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",0,0,-10.3,0,0,girRad*90,objVis,21);
    gltfClone.creaClonegltf();
    
    //Paso 9
    gltfClone = new classClonegltf("hsmall",0,0,12.65,0,0,0,objVis,22);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x1",0,0,15.75,0,0,girRad*90,objVis,23);
    gltfClone.creaClonegltf();
    
    shapeGroup = new classGroup([[19,23]],objVis,2);
    shapeGroup.creaGroup();
    
    //Paso 10
    groupClone = new classClonegroup(-15,0,0,0,0,0,objVis,2,24);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(-10,0,0,0,0,0,objVis,2,25);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(-5,0,0,0,0,0,objVis,2,26);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(0,0,0,0,0,0,objVis,2,27);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(5,0,0,0,0,0,objVis,2,28);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(10,0,0,0,0,0,objVis,2,29);
    groupClone.creaClonegroup();
    
    //Paso 11
    groupClone = new classClonegroup(0,0,0,girRad*90,0,0,objVis,2,30);
    groupClone.creaClonegroup();
    gltfClone = new classClonegltf("hsmall",0,-17.7,-1.53,0,0,0,objVis,31);
    gltfClone.creaClonegltf();
    
    //Paso 12
    gltfClone = new classClonegltf("hsmall",0,1.45,-1.53,0,0,0,objVis,32);
    gltfClone.creaClonegltf();
    
    //Paso 13
    gltfClone = new classClonegltf("hsmall",0,16.8,-1.53,0,0,0,objVis,33);
    gltfClone.creaClonegltf();
    
    //Paso 14
    groupClone = new classClonegroup(0,0,-3.05,girRad*90,0,0,objVis,2,34);
    groupClone.creaClonegroup();
    
    
    //Paso 15
    gltfClone = new classClonegltf("bu1x",0,-17.7,1.68,0,0,0,objVis,35);
    gltfClone.creaClonegltf();
    
    
    //Paso 16
    gltfClone = new classClonegltf("bu1x",0,1.45,1.68,0,0,0,objVis,36);
    gltfClone.creaClonegltf();
    
    //Paso 17
    gltfClone = new classClonegltf("bu1x",0,16.8,1.68,0,0,0,objVis,37);
    gltfClone.creaClonegltf();
    
    
    
    
    
    
    //Paso 18
    groupClone = new classClonegroup(0,0,3.36,girRad*90,0,0,objVis,2,38);
    groupClone.creaClonegroup();
    
    shapeGroup = new classGroup([[30,38]],objVis,3);
    shapeGroup.creaGroup();
    
    //Paso 19
    groupClone = new classClonegroup(3.85,0,0,0,0,0,objVis,3,39);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(-3.85,0,0,0,0,0,objVis,3,40);
    groupClone.creaClonegroup();
    
    //Paso 20
    gltfClone = new classClonegltf("u5x",0,-17.7,-4.05,0,-(girRad*90),girRad*180,objVis,41);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u5x",0,-17.7,4.37,0,-(girRad*90),0,objVis,42);
    gltfClone.creaClonegltf();
    
    //Paso 21
    gltfClone = new classClonegltf("u5x",0,17.44,-3.05,0,girRad*90,girRad*90,objVis,43);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u5x",0,17.44,0,0,girRad*90,girRad*90,objVis,44);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u5x",0,17.44,3.37,0,girRad*90,girRad*90,objVis,45);
    gltfClone.creaClonegltf();
    
    //Paso 22
    gltfClone = new classClonegltf("uLcorto",-5.15,-18.05,-4.45,0,0,girRad*90,objVis,46);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uLcorto",5.15,-18.05,-4.45,0,0,girRad*90,objVis,47);
    gltfClone.creaClonegltf();
    
    //Paso 23
    gltfClone = new classClonegltf("u6x",0,-18.4,-4.8,0,girRad*90,-(girRad*90),objVis,48);
    gltfClone.creaClonegltf();
    
    //Paso 24
    gltfClone = new classClonegltf("u3x",-6.5,-18.4,-6.1,0,0,-(girRad*90),objVis,49);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",6.5,-18.4,-6.1,0,0,-(girRad*90),objVis,50);
    gltfClone.creaClonegltf();
    
    //Paso 25
    gltfClone = new classClonegltf("u6x",0,-18.4,-8.65,0,girRad*90,girRad*90,objVis,51);
    gltfClone.creaClonegltf();
    
    //Paso 26
    gltfClone = new classClonegltf("uLcorto",-5.15,-18.05,4.77,0,girRad*180,girRad*90,objVis,52);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uLcorto",5.15,-18.05,4.77,0,girRad*180,girRad*90,objVis,53);
    gltfClone.creaClonegltf();
    
    //Paso 27
    gltfClone = new classClonegltf("u6x",0,-18.4,5.12,0,girRad*90,-(girRad*90),objVis,54);
    gltfClone.creaClonegltf();
    
    //Paso 28
    gltfClone = new classClonegltf("b11x1",-1.3,10.32,3.37,girRad*90,0,girRad*90,objVis,55);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",1.3,10.32,3.37,girRad*90,0,girRad*90,objVis,56);
    gltfClone.creaClonegltf();
    
    //Paso 29
    gltfClone = new classClonegltf("u2x",0,16.8,4.37,0,girRad*90,0,objVis,57);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u4x",0,3.85,4.37,0,girRad*90,0,objVis,58);
    gltfClone.creaClonegltf();
    
    //Paso 30
    gltfClone = new classClonegltf("b11x1",-1.3,10.32,-3.05,girRad*90,0,girRad*90,objVis,59);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",1.3,10.32,-3.05,girRad*90,0,girRad*90,objVis,60);
    gltfClone.creaClonegltf();
    
    //Paso 31
    gltfClone = new classClonegltf("u2x",0,16.8,-4.05,0,-(girRad*90),0,objVis,61);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u4x",0,3.85,-4.05,0,-(girRad*90),0,objVis,62);
    gltfClone.creaClonegltf();
    
    //Paso 32
    gltfClone = new classClonegltf("b4x1",-2.57,20,-3.05,girRad*90,0,girRad*90,objVis,63);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x1",2.57,20,-3.05,girRad*90,0,girRad*90,objVis,64);
    gltfClone.creaClonegltf();
    
    //Paso 33
    gltfClone = new classClonegltf("u3x",0,18.05,-4.05,0,-(girRad*90),0,objVis,65);
    gltfClone.creaClonegltf();
    
    //Paso 34
    gltfClone = new classClonegltf("topeL9mm",-1.9,22,-3.05,0,0,girRad*90,objVis,66);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",-0.9,22,-3.05,0,0,girRad*90,objVis,67);
    gltfClone.creaClonegltf();
    
    groupClone = new classClonegroup(0,22,-3.05,0,0,girRad*90,objVis,0,68);
    groupClone.creaClonegroup();
    
    gltfClone = new classClonegltf("topeL9mm",0.9,22,-3.05,0,0,girRad*90,objVis,69);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",1.9,22,-3.05,0,0,girRad*90,objVis,70);
    gltfClone.creaClonegltf();
    
    //Paso 35
    meshClone = new classCloneshape("stick",0,22,-3.05,0,0,girRad*90,10,objVis,71);
    meshClone.creaClonemesh();
    
    //Paso 36
    gltfClone = new classClonegltf("hlarge",3.88,16.8,-5.35,0,0,0,objVis,72);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hlarge",3.88,12.9,-5.35,0,0,0,objVis,73);
    gltfClone.creaClonegltf();
    
    //Paso 37
    gltfClone = new classClonegltf("b4x1",3.88,14.85,-7.35,girRad*90,0,girRad*90,objVis,74);
    gltfClone.creaClonegltf();
    
    //Paso 38
    gltfClone = new classClonegltf("hlarge",-3.88,16.8,-5.35,0,0,0,objVis,75);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hlarge",-3.88,12.9,-5.35,0,0,0,objVis,76);
    gltfClone.creaClonegltf();
    
    //Paso 39
    gltfClone = new classClonegltf("b4x1",-3.88,14.85,-7.35,girRad*90,0,girRad*90,objVis,77);
    gltfClone.creaClonegltf();
    
    //Paso 40
    gltfClone = new classClonegltf("b7x1",0,15.5,-9.4,0,girRad*90,0,objVis,78);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b7x1",0,14.2,-9.4,0,girRad*90,0,objVis,79);
    gltfClone.creaClonegltf();
    
    //Paso 41
    gltfClone = new classClonegltf("uE",3.88,14.85,-10.4,girRad*90,0,girRad*90,objVis,80);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uE",-3.88,14.85,-10.4,girRad*90,0,girRad*90,objVis,81);
    gltfClone.creaClonegltf();
    
    //Paso 42
    groupClone = new classClonegroup(0,-8.5,0,girRad*90,0,girRad*90,objVis,1,82);
    groupClone.creaClonegroup();
    
    //Paso 43
    gltfClone = new classClonegltf("topeL9mm",0,-0.6,0,0,0,0,objVis,83);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("bu1x",0,0,0,0,0,0,objVis,84);
    gltfClone.creaClonegltf();
    
    shapeGroup = new classGroup([[83,84]],objVis,4);
    shapeGroup.creaGroup();
    
    groupClone = new classClonegroup(0,13.8,-9.4,0,0,0,objVis,4,85);
    groupClone.creaClonegroup();
    
    //Paso 44
    groupCatmull = new THREE.CatmullRomCurve3( [//Todos los puntos ancla de la linea
        //Nudo inicial
        new THREE.Vector3(0,-8.5,0),//Animar
        //Polea
        new THREE.Vector3(0,21,-0.5),
        new THREE.Vector3(0,23.5,-3),
        new THREE.Vector3(0,21,-6.5),
        //Base
        new THREE.Vector3(0,16,-9.3),
        new THREE.Vector3(0,15,-9.4),
        //Nudo final
        new THREE.Vector3(0,7,-9.4)//Animar
    ]);
    pointsCatmull = groupCatmull.getPoints( 8 );//Esto hace que la cuerva tenga mas puntos
    geometryTube = new THREE.TubeBufferGeometry(groupCatmull, 220, 0.1, 8, false);
    meshTube = new THREE.Mesh(geometryTube, ropeMaterial);
    meshTube.name = "rope";
    allClones[86] = meshTube;//Guarda objeto en array
    scene.add(meshTube);
    
    //Hand
    gltfClone = new classClonegltf("handright",3,9,-14,-(girRad*40),-(girRad*90),0,false,87);
    gltfClone.creaClonegltf();
    
    //Oculta todas las piezas y deja solo los grupos y las piezas sueltas finales
    for(i=0; i<=38; i++){
        allClones[i].visible = false;
    }
    for(i=83; i<=84; i++){
        allClones[i].visible = false;
    }

    velControl();//Control de velocidad y accion de las manos
    addPhysis();//Agrega fisica
    meshcunaPhysi();//Establece objeto que sigue a cuna
}
function velControl(){
    /*
	* NOMBRE: velControl.
	* UTILIDAD: Control de velocidad y accion de las manos
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    var timeSet;//Tiempo de intervalo
    $(".d_forceopcbtn").on("mousedown touchstart",function(e){
        e.preventDefault();//Previene el tooltip de touchstart.
        console.log("PRESS");
        $(".d_footerbtngirscrewstrongline").removeClass('d_footerbtngirscrewstrongline_anima');//Quita clase de animacion
        guillotineUp = true;//Anima guillotina up
        addAnima = true;//Inicia animacion de cuerda
        reinAction();//Vuelve a 0 la posicion del palito
        $("#d_velocidad").text("--");//Pinta la velocidad en 0
    });
    $(".d_forceopcbtn").on("mouseup touchend",function(e){
        e.preventDefault();//Previene el tooltip de touchstart.
        console.log("UP");
        clearInterval(timeSet);//Limpia intervalo
        guillotineUp = false;//Detiene animacion guillotina up
        var dataGet = 0;//Valor para romper barra 1,3,5
        if(strongLevel >= 0 && strongLevel < 40){//La fuerza va de 0 a 36
            dataGet = 1;//Valor para romper barra 1
        }
        if(strongLevel >= 40 && strongLevel < 72){//La fuerza va de 40 a 68
            dataGet = 3;//Valor para romper barra 3
        }
        if(strongLevel >= 72 && strongLevel <= 96){//La fuerza va de 72 a 96
            dataGet = 5;//Valor para romper barra 5
        }
        numForce = (dataGet-1)*3.5;//Altura de cuna
        numCrash = (dataGet-1)*7.6;//Inclinacion de crash
        numCuna = (dataGet-1)*0.5;//Distancia a la que baja la cuna
        strongLevel = 0;//Resetea fuerza de barra
        
        $(".d_forceopc").append('<div class="d_forceopcblock"></div>');//Agrega bloquea de btns
        $(".d_forceopc").addClass("d_forceopc_inactive");//Deshabilita btns

        crashAdd = true;//Inicia animacion palito
        animatePalito();//Animacion del palito
        
    });
}
function addPhysis(){
    /*
	* NOMBRE: addPhysis.
	* UTILIDAD: Agrega fisica
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    colorPhysi();//Colores para simulacion physi
    materialPhysi();//Materiales para simulacion physi
    geometryPhysi();//Geometria para simulacion physi
    meshPhisi();//Establece suelo para physi
}
function colorPhysi(){
    /*
	* NOMBRE: colorPhysi.
	* UTILIDAD: Colores para simulacion physi
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    groundCcolor = new THREE.Color("rgb(255, 255, 255)");//Color de base
    palitoColor = new THREE.Color("rgb(127, 50, 23)");//Color de palitos fantasmas
    cunaColor = new THREE.Color("rgb(248, 104, 229)");//Asigna color a cada material
}
function materialPhysi(){
    /*
	* NOMBRE: materialPhysi.
	* UTILIDAD: Material para simulacion physi
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    //Ground
    groundMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({color: groundCcolor,transparent:true, opacity: 0}),
        4.9, // high friction
        0.1 // low restitution
    );
    //palito
    for(i=0; i<=1; i++){
        palitoMaterial[i] = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({color: palitoColor, transparent:true, opacity: 1, wireframe: false}),
            0.1, // high friction
            0.1 // low restitution
        );
    }
    //cuna
    cunaMaterial = Physijs.createMaterial(
        new THREE.MeshPhongMaterial({color: cunaColor, transparent: true, opacity: 0, wireframe: true, shininess: 5}),
        0.1, // high friction
        0.1 // low restitution
    ); 
}
function geometryPhysi(){
    /*
	* NOMBRE: setGeometry.
	* UTILIDAD: Establece geometria para simulacion phisi
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    cunaGeometry = new THREE.CubeGeometry(0.3, 10, 4);
    groundGeometry = new THREE.CubeGeometry(1000, 1, 1000);
    palitoGeometrylarge = new THREE.CubeGeometry(9.7, 0.4, 0.4);
    palitoGeometrysmall = new THREE.CubeGeometry(7.7, 0.4, 0.4);
    sideGeometry = new THREE.CubeGeometry(6, 0.5, 2);
}
function meshPhisi(){
    /*
	* NOMBRE: meshPhisi.
	* UTILIDAD: Establece suelo para physi
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    //Ground
    groundMesh = new Physijs.BoxMesh(
        groundGeometry,
        groundMaterial,
        0 // mass
    );
    groundMesh.position.set(0,-19,0);
    scene.add( groundMesh );
    
    //Base1
    objetoPalito[0] = new Physijs.BoxMesh(
        palitoGeometrylarge,
        palitoMaterial[0],
        0 // mass
    );
    objetoPalito[0].position.set(16.15,-15.75,0);
    objetoPalito[0].rotation.set(0,0,0);
    objetoPalito[0].visible = false;
    scene.add(objetoPalito[0]);
    
    //Base2
    objetoPalito[1] = new Physijs.BoxMesh(
        palitoGeometrysmall,
        palitoMaterial[1],
        0 // mass
    );
    objetoPalito[1].position.set(23.85,-15.75,0);
    objetoPalito[1].rotation.set(0,0,0);
    objetoPalito[1].visible = false;
    scene.add(objetoPalito[1]);
}
function meshcunaPhysi(){
    /*
	* NOMBRE: meshcunaPhysi.
	* UTILIDAD: Establece objeto que sigue a cuna
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    cunaMesh = new Physijs.BoxMesh(cunaGeometry,cunaMaterial);
    cunaMesh.collisions = 0;
    cunaMesh.name = "cuna";
    cunaMesh.position.set(0,0,0);//Agrega la posicion del cuna
    scene.add(cunaMesh);//Agrega el cuna a la escena
    cunaAnima = true;//Cuna sigue a canasta
}
var handleCollision = function( ){
    /*
	* NOMBRE: handleCollision.
	* UTILIDAD: Detecta collision para resolver problemas con la fisica
	* ENTRADAS: action > Saber si se agrega o se quita cuna
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(incCollision === true){//Solo hay una collision
        animateCrash();//Animacion de crash de palito al detectar colision
        incCollision = false;//Se sale de la collision, para que no se repita varias veces
        clearInterval(intervalTime);//Limpia el intervalo de tiempo cada 100 x 10 de la velocidad
    }
}
function reinAction(){
    /*
	* NOMBRE: reinAction.
	* UTILIDAD: Vuelve a 0 la posicion del palito
	* ENTRADAS: Ninguna
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    objetoPalito[0].position.set(16.15,-15.75,0);
    objetoPalito[1].position.set(23.85,-15.75,0);
    objetoPalito[0].rotation.set(0,0,0);
    objetoPalito[1].rotation.set(0,0,0);
    
    objetoPalito[0].visible = true;
    objetoPalito[1].visible = true;
    
    objetoPalito[0].__dirtyPosition = true;
    objetoPalito[0].__dirtyRotation = true;
    objetoPalito[1].__dirtyPosition = true;
    objetoPalito[1].__dirtyRotation = true;
    
    allClones[87].visible = true;
    allClones[87].position.set(3,9,-14);
}
function animatePalito(){
    /*
	* NOMBRE: animatePalito.
	* UTILIDAD: Animacion del palito
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    //Se conforma por dos palitos para hacer la division (efecto romper)
    var palito0 = new TWEEN.Tween(objetoPalito[0].position)
    .to({
        x: -3.85,
        y: -15.75,
        z: 0
    },1000)
    .delay(0)
    .onComplete(function(){
        animateGuillotinedown();//Animacion de la guillotina final
    })
    .easing(easeEffect)
    .start();
    var palito1 = new TWEEN.Tween(objetoPalito[1].position)
    .to({
        x: 3.85,
        y: -15.75,
        z: 0
    },1000)
    .delay(0)
    .easing(easeEffect)
    .start();
}
function animateGuillotinedown(){
    /*
	* NOMBRE: animateGuillotinedown.
	* UTILIDAD: Animacion de la guillotina final
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    console.log("IN");
    paintData();//Agrega datos de velocidad, angulo y otros
    //Puntos cuerda
    var point0 = new TWEEN.Tween(groupCatmull.points[0])
    .to({
        x: 0,
        y: -(5.5+numCuna),
        z: 0
    },600)
    .delay(0)
    .easing(newEffectout)
    .start();
    var point6 = new TWEEN.Tween(groupCatmull.points[6])
    .to({
        x: 0,
        y: 5+numCuna,
        z: -9.4
    },600)
    .delay(0)
    .easing(newEffectout)
    .start();
    
    //Objetos
    var cuna = new TWEEN.Tween(allClones[82].position)
    .to({
        x: 0,
        y: -(6.6+numCuna),
        z: 0
    },600)
    .delay(0)
    .easing(newEffectout)
    .start();
    var sujetadorPos = new TWEEN.Tween(allClones[85].position)
    .to({
        x: 0,
        y: 11.8+numCuna,
        z: -9.4
    },600)
    .delay(0)
    .easing(newEffectout)
    .start();
    var hand = new TWEEN.Tween(allClones[87].position)
    .to({
        x: 3,
        y: -(numForce+2.8),
        z: -34
    },400)
    .delay(0)
    .easing(newEffectout)
    .start();
    
    //Poleas
    var polea = new TWEEN.Tween(allClones[68].rotation)
    .to({
        x: 0,
        y: 0,
        z: girRad*90
    },600)
    .delay(0)
    .onComplete(function(){
        addAnima = false;//Termina animacion de cuerda
        $(".d_footerbtngirscrewstrongline").css({"left":"0%"});//Resetea fuerza barra div
        $(".d_footerbtngirscrewstrongline").addClass('d_footerbtngirscrewstrongline_anima');//Agrega clase de animacion
    })
    .onStart(function(){
        incCollision = true;//Activa la collision
        cunaMesh.addEventListener( 'collision', handleCollision );//Detecta collision de cuna con palito
        allClones[87].visible = false;//Desaparecer mano
    })
    .easing(newEffectout)
    .start();
}
function animateCrash(){
    /*
	* NOMBRE: animateCrash.
	* UTILIDAD: Animacion de crash de palito al detectar colision
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    console.log("numCrash");
    console.log(numCrash);
    var crash1 = new TWEEN.Tween(objetoPalito[0].rotation)
    .to({
        x: 0,
        y: 0,
        z: -(girRad*numCrash)
    },100)
    .delay(0)
    .easing(easeEffect)
    .start();
    var crash2 = new TWEEN.Tween(objetoPalito[1].rotation)
    .to({
        x: 0,
        y: 0,
        z: girRad*numCrash
    },100)
    .delay(0)
    .onComplete(function(){
        crashAdd = false;//Termina animacion palito
        $(".d_forceopcblock").remove();//Quita bloquea de btns
        $(".d_forceopc").removeClass("d_forceopc_inactive");//Habilita btns
    })
    .easing(easeEffect)
    .start();
}
function paintData(){
    /*
	* NOMBRE: paintData.
	* UTILIDAD: Agrega datos de velocidad, angulo y otros
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    var dateIn = new Date();//Timepo al iniciar
    var saveTime = dateIn;//Guarda tiempo de inicio
    var posIn = allClones[82].position.y;//Posicion de objeto al inicio
    var savePos = posIn;//Guarda posicion de objeto al inicio
    velCalc = 0;//Velocidad al inicio es de 0
    intervalTime = setInterval(function(){//Intervalo cada 100 y despues se multiplica x 10 y son los 1000
        var dateOut = new Date();//Tiempo cada 100
        var posOut = allClones[82].position.y;//Guarda posicion de objeto cada 100
        velCalc = ((Math.abs(posOut - savePos))*10).toFixed(2);//Distancia recorrida en 100*10 ya son los 1000
        $("#d_velocidad").text(velCalc+" cm/s");//Pinta la velocidad
        saveTime = dateOut;//Guarda el nuevo tiempo despiues de 100
        savePos = posOut;//Guarda la nueva posicion despues de 100
    },100);
}
function setAnimation(){
    /*
	* NOMBRE: setAnimation.
	* UTILIDAD: Establece la animacion sin el Tween
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(addAnima === true){
        catmullFollow();//Points catmull siguen la posicion de las puntos clave
    }
    if(cunaAnima === true){
        //console.log("ANIMA");
        cunaFollow();//Physics de deteccion sigue a cuna
    }
    if(crashAdd === true){
        palitoCrash();//Animacion de palito al romperse
    }
    if(reajusteAnima === true){//Reajusta canvas si se abre el menu
        reajusteConte3d();//Reajusta el contenido 3d en resize
    }
    if(guillotineUp){//Animacion de guillotina up
        animateGuillotineup();//Animacion de la guillotina inicial
    }
}
function animateGuillotineup(){
    /*
	* NOMBRE: animateGuillotineup.
	* UTILIDAD: Animacion de la guillotina inicial
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    allClones[82].position.y = allClones[82].position.y+0.15;//Cuña
    allClones[68].rotation.x = allClones[68].rotation.x-0.075;//Polea
    allClones[85].position.y = allClones[85].position.y-0.15;//Barra union 1x
    allClones[87].position.y = allClones[87].position.y-0.15;//Hand
    groupCatmull.points[0].y = groupCatmull.points[0].y+0.15;//Cuerda punto cuña
    groupCatmull.points[6].y = groupCatmull.points[6].y-0.15;//Cuerda punto hand
    
    if(strongLevel < 93){//Ultimo valor antes de que barra llegue a 96 (se realizo aqui la animacion, porque con setinterval, el tiempo es diferente al de la actualizacion del render)
        strongLevel = strongLevel+0.64;//Incrementa valor de barra de fuerza
        $(".d_footerbtngirscrewstrongline").css({"left":strongLevel+"%"});//Asigna fuerza barra div
    }else{
        guillotineUp = false;//Detiene animacion guillotina up
    }
}
function palitoCrash(){
    /*
	* NOMBRE: palitoCrash.
	* UTILIDAD: Animacion de palito al romperse
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    objetoPalito[0].__dirtyPosition = true;
    objetoPalito[1].__dirtyPosition = true;
    objetoPalito[0].__dirtyRotation = true;
    objetoPalito[1].__dirtyRotation = true;
}
function cunaFollow(){
    /*
	* NOMBRE: cunaFollow.
	* UTILIDAD: Physics de deteccion sigue a cuna
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    cunaMesh.position.set(0,0,0);
    cunaMesh.position.y = allClones[82].position.y-3.95;
    cunaMesh.rotation.set(0,0,0);
    cunaMesh.__dirtyPosition = true;
    cunaMesh.__dirtyRotation = true;
}
function catmullFollow(){
    /*
	* NOMBRE: catmullFollow.
	* UTILIDAD: Points catmull siguen la posicion de las puntos clave
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    //Actualizacion de la animacion de la cuerda
    var newCable = new THREE.TubeBufferGeometry(meshTube.geometry.parameters.path, 220, 0.1, 8, false);
    meshTube.geometry.copy(newCable);
    meshTube.geometry.needsUpdate = true;
}