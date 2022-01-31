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
setCamerapos = [20,30,0];//Establece la posicion de la camara
setScenepos = [0,0,-3];//Establece la posicion de la camara
gridPosy = -3.7;//Posicion de la reticula en cada modelo
slidesInd = 4;//Cantidad de vistas para indicaciones

var groundMaterial, marbleMaterial, canaletaMaterial = [],popoteMaterial;//Materials phisi
var marbleColor, canaletaColor, groundCcolor;//Colors phisi
var cssDiv1, cssDiv2, cssDiv3, cssDiv4, cssDiv5, cssDiv6;//Texto de canastas
var marbleGeometry, groundGeometry, canaletaGeometry,popoteGeometry;//Geometry phisi
var marbleMesh = [], groundMesh, popoteMesh, canaletaMesh;//Mesh phisi
var starAnimation = false;//Saber si camera va a seguir a marble o no
var pressBtn;//Btn de material usado
var canaletaSide = [];//Guarda las canaletas phisis
var frictionCanaleta;//Friction de canaleta
var restitutionCanaleta;//Retitution de canaleta
var newSetmaterial = false;//Indica si se asigna un nuevo material a canaleta y marble
var marbleTypematerial ;//Define el typo de material
var timeGrl = 500;//Tiempo general para animaciones
var velCalc;//Distancia recorrida en 1000
var intervalTime;//Intervalo de 1000 para la velocidad
var fallIncl = 0;//Guarda la inclinacion de la caida del objeto
var obj3dHand;//Objeto, para que lo siga la mano, por la reduccion de tamaño
var easingType = TWEEN.Easing.Quadratic.InOut;//Efecto ease
addReflexion = [
    "¿Cuántas vueltas tiene que dar la corona del tren para que todas las flechas se vuelvan a alinear?",
    "¿Cuál es el engrane que va más rápido y cuál es el que va más lento en el tren que construiste?",
    "¿Todos los engranes giran hacia el mismo lado o giran en sentidos opuestos?",
    "Si quieres que el último engrane de tu tren gire en el mismo sentido que la corona, ¿Tu tren debe estar conformado por un número par o un número impar de engranes?"
];//Preguntas de reflexion
/*************************************************************************************
*
* 								FUNCIONES Y PROCEDIMIENTOS
*
**************************************************************************************/
$(document).ready(function(){});
$(window).resize(function(){
    /*
	* NOMBRE: resize.
	* UTILIDAD: Detecta el resize del navegador
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    resizeMenu2d();//Resize menu 2d
});
$(window).on("orientationchange",function(event){
    /*
	* NOMBRE: orientationchange.
	* UTILIDAD: Detecta cambio de orientacion del dispositivo
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    resizeMenu2d();//Resize menu 2d
})
$(window).on('load',function(){});
function addClones(){
    /*
	* NOMBRE: addClones.
	* UTILIDAD: Crea los clones de los objetos
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    
    
    //Paso 1
    gltfClone = new classClonegltf("b7x4",0,0,0,0,0,0,objVis,0);
    gltfClone.creaClonegltf();
    meshClone = new classCloneshape("stick",1.95,1.25,-1.3,0,0,0,7.3,objVis,1);
    meshClone.creaClonemesh();
    gltfClone = new classClonegltf("topeL6mm",1.95,0.45,-1.3,0,0,0,objVis,2);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",1.95,1.05,-1.3,0,0,0,objVis,3);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("circleBig",1.95,1.6,-1.3,0,0,0,objVis,4);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",1.95,2.15,-1.3,0,0,0,objVis,5);
    gltfClone.creaClonegltf();
    
    //Paso 2
    gltfClone = new classClonegltf("b7x4",0,2.58,0,0,0,0,objVis,6);
    gltfClone.creaClonegltf();
    
    //Paso 3
    gltfClone = new classClonegltf("u3x",-2.58,0,3.9,turn90,0,0,objVis,7);
    gltfClone.creaClonegltf();
    
    //Paso 4
    gltfClone = new classClonegltf("hsmall",1.95,0,5.05,0,0,turn90,objVis,8);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",1.95,2.58,5.05,0,0,turn90,objVis,9);
    gltfClone.creaClonegltf();
    
    //Paso 5
    gltfClone = new classClonegltf("hsmall",1.95,0,6.1,0,0,0,objVis,10);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",1.95,2.58,6.1,0,0,0,objVis,11);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",1.95,0,6.6,turn90,0,-turn90,objVis,12);
    gltfClone.creaClonegltf();
    
    //Paso 6
    gltfClone = new classClonegltf("hsmall",1.95,0,-5.05,0,0,turn90,objVis,13);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-1.95,0,-5.05,0,0,turn90,objVis,14);
    gltfClone.creaClonegltf();
    
    //Paso 7
    gltfClone = new classClonegltf("hsmall",1.95,2.58,-5.05,0,0,turn90,objVis,15);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-1.95,2.58,-5.05,0,0,turn90,objVis,16);
    gltfClone.creaClonegltf();
    
    //Paso 8
    gltfClone = new classClonegltf("arrowS",1.95,3.5,-1.3,0,-turn90,0,objVis,17);
    gltfClone.creaClonegltf();
    
    //Paso 9
    gltfClone = new classClonegltf("b7x4",0,0,0,0,0,0,objVis,18);
    gltfClone.creaClonegltf();
    meshClone = new classCloneshape("stick",-0.65,1.25,-1.3,0,0,0,7.3,objVis,19);
    meshClone.creaClonemesh();
    gltfClone = new classClonegltf("topeL6mm",-0.65,0.45,-1.3,0,0,0,objVis,20);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",-0.65,1.05,-1.3,0,0,0,objVis,21);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("circleA",-0.65,1.6,-1.3,0,0,0,objVis,22);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",-0.65,2.15,-1.3,0,0,0,objVis,23);
    gltfClone.creaClonegltf();
    
    //Paso 10
    gltfClone = new classClonegltf("b7x4",0,2.58,0,0,0,0,objVis,24);
    gltfClone.creaClonegltf();
    
    //Paso 11
    gltfClone = new classClonegltf("u3x",-2.58,0,3.9,turn90,0,0,objVis,25);
    gltfClone.creaClonegltf();
    
    //Paso 12
    gltfClone = new classClonegltf("hsmall",3.1,0,2.58,0,turn90,turn90,objVis,26);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",3.1,2.58,2.58,0,turn90,turn90,objVis,27);
    gltfClone.creaClonegltf();
    
    //Paso 13
    gltfClone = new classClonegltf("hsmall",4.1,0,2.58,0,turn90,0,objVis,28);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",4.1,2.58,2.58,0,turn90,0,objVis,29);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",4.65,0,2.58,turn90,0,turn180,objVis,30);
    gltfClone.creaClonegltf();
    
    //Paso 14
    gltfClone = new classClonegltf("hsmall",1.95,0,-5.05,0,0,turn90,objVis,31);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-1.95,0,-5.05,0,0,turn90,objVis,32);
    gltfClone.creaClonegltf();
    
    //Paso 15
    gltfClone = new classClonegltf("hsmall",1.95,2.58,-5.05,0,0,turn90,objVis,33);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-1.95,2.58,-5.05,0,0,turn90,objVis,34);
    gltfClone.creaClonegltf();
    
    //Paso 16
    gltfClone = new classClonegltf("arrowS",-0.65,3.5,-1.3,0,-turn90,0,objVis,35);
    gltfClone.creaClonegltf();
    
    //Paso 17
    gltfClone = new classClonegltf("b7x4",0,0,0,0,0,0,objVis,36);
    gltfClone.creaClonegltf();
    meshClone = new classCloneshape("stick",-0.65,1.25,1.3,0,0,0,7.3,objVis,37);
    meshClone.creaClonemesh();
    gltfClone = new classClonegltf("topeL6mm",-0.65,0.45,1.3,0,0,0,objVis,38);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",-0.65,1.05,1.3,0,0,0,objVis,39);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("circleMiddle",-0.65,1.6,1.3,0,girRad*10,0,objVis,40);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",-0.65,2.15,1.3,0,0,0,objVis,41);
    gltfClone.creaClonegltf();
    
    //Paso 18
    meshClone = new classCloneshape("stick",-0.65,1.25,-3.9,0,0,0,7.3,objVis,42);
    meshClone.creaClonemesh();
    gltfClone = new classClonegltf("topeL6mm",-0.65,0.45,-3.9,0,0,0,objVis,43);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",-0.65,1.05,-3.9,0,0,0,objVis,44);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("circleC",-0.65,1.6,-3.9,0,girRad*14,0,objVis,45);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",-0.65,2.15,-3.9,0,0,0,objVis,46);
    gltfClone.creaClonegltf();
    
    //Paso 19
    gltfClone = new classClonegltf("b7x4",0,2.58,0,0,0,0,objVis,47);
    gltfClone.creaClonegltf();
    
    //Paso 20
    gltfClone = new classClonegltf("u3x",2.58,0,3.9,turn90,0,turn180,objVis,48);
    gltfClone.creaClonegltf();
    
    //Paso 21
    gltfClone = new classClonegltf("hsmall",-3.1,0,-2.58,0,turn90,turn90,objVis,49);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-3.1,2.58,-2.58,0,turn90,turn90,objVis,50);
    gltfClone.creaClonegltf();
    
    //Paso 22
    gltfClone = new classClonegltf("hsmall",-4.1,0,-2.58,0,turn90,0,objVis,51);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-4.1,2.58,-2.58,0,turn90,0,objVis,52);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",-4.65,0,-2.58,turn90,0,0,objVis,53);
    gltfClone.creaClonegltf();
    
    //Paso 23
    gltfClone = new classClonegltf("hsmall",1.95,0,-5.05,0,0,turn90,objVis,54);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-1.95,0,-5.05,0,0,turn90,objVis,55);
    gltfClone.creaClonegltf();
    
    //Paso 24
    gltfClone = new classClonegltf("hsmall",1.95,2.58,-5.05,0,0,turn90,objVis,56);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-1.95,2.58,-5.05,0,0,turn90,objVis,57);
    gltfClone.creaClonegltf();
    
    //Paso 25
    gltfClone = new classClonegltf("arrowS",-0.65,3.5,1.3,0,-turn90,0,objVis,58);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("arrowS",-0.65,3.5,-3.9,0,-turn90,0,objVis,59);
    gltfClone.creaClonegltf();
    
    //Paso 26
    gltfClone = new classClonegltf("b4x3",0,0,0,0,turn90,0,objVis,60);
    gltfClone.creaClonegltf();
    meshClone = new classCloneshape("stick",0,1.25,0,0,0,0,7.3,objVis,61);
    meshClone.creaClonemesh();
    gltfClone = new classClonegltf("topeL6mm",0,0.45,0,0,0,0,objVis,62);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",0,1.05,0,0,0,0,objVis,63);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("circle1x",0,1.6,0,0,girRad*15,0,objVis,64);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",0,2.15,0,0,0,0,objVis,65);
    gltfClone.creaClonegltf();
    
    //Paso 27
    meshClone = new classCloneshape("stick",1.95,1.25,-1.3,0,0,0,7.3,objVis,66);
    meshClone.creaClonemesh();
    gltfClone = new classClonegltf("topeL6mm",1.95,0.45,-1.3,0,0,0,objVis,67);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",1.95,1.05,-1.3,0,0,0,objVis,68);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("circle2x",1.95,1.6,-1.3,0,girRad*17,0,objVis,69);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",1.95,2.15,-1.3,0,0,0,objVis,70);
    gltfClone.creaClonegltf();
    
    //Paso 28
    gltfClone = new classClonegltf("b4x3",0,2.58,0,0,turn90,0,objVis,71);
    gltfClone.creaClonegltf();
    
    //Paso 29
    gltfClone = new classClonegltf("u3x",2.58,0,1.3,turn90,0,turn180,objVis,72);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",-1.95,0,-1.95,turn90,0,turn90,objVis,73);
    gltfClone.creaClonegltf();
    
    //Paso 30
    gltfClone = new classClonegltf("arrowS",0,3.5,0,0,-turn90,0,objVis,74);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("arrowS",1.95,3.5,-1.3,0,-turn90,0,objVis,75);
    gltfClone.creaClonegltf();
    
    //Paso 31
    
    //Group 1
    shapeGroup = new classGroup([[1,5],[17,17]],objVis,0);
    shapeGroup.creaGroup();
    groupClone = new classClonegroup(1.95,0,-1.3,0,0,0,objVis,0,76);
    groupClone.creaClonegroup();
    shapeGroup = new classGroup([[0,0],[6,16],[76,76]],objVis,1);
    shapeGroup.creaGroup();
    groupClone = new classClonegroup(0,0,15.2,0,0,0,objVis,1,77);
    groupClone.creaClonegroup();
    
    //Group 2
    shapeGroup = new classGroup([[19,23],[35,35]],objVis,2);
    shapeGroup.creaGroup();
    groupClone = new classClonegroup(-0.65,0,-1.3,0,0,0,objVis,2,78);
    groupClone.creaClonegroup();
    shapeGroup = new classGroup([[18,18],[24,34],[78,78]],objVis,3);
    shapeGroup.creaGroup();
    groupClone = new classClonegroup(0,0,5.07,0,0,0,objVis,3,79);
    groupClone.creaClonegroup();
    
    //Group 3
    shapeGroup = new classGroup([[37,41],[58,58]],objVis,4);
    shapeGroup.creaGroup();
    groupClone = new classClonegroup(-0.65,0,1.3,0,0,0,objVis,4,80);
    groupClone.creaClonegroup();
    shapeGroup = new classGroup([[42,46],[59,59]],objVis,5);
    shapeGroup.creaGroup();
    groupClone = new classClonegroup(-0.65,0,-3.9,0,0,0,objVis,5,81);
    groupClone.creaClonegroup();
    shapeGroup = new classGroup([[36,36],[47,57],[80,81]],objVis,6);
    shapeGroup.creaGroup();
    groupClone = new classClonegroup(0,0,-5.07,0,0,0,objVis,6,82);
    groupClone.creaClonegroup();
    
    //Group 4
    shapeGroup = new classGroup([[61,65],[74,74]],objVis,7);
    shapeGroup.creaGroup();
    groupClone = new classClonegroup(0,0,0,0,0,0,objVis,7,83);
    groupClone.creaClonegroup();
    shapeGroup = new classGroup([[66,70],[75,75]],objVis,8);
    shapeGroup.creaGroup();
    groupClone = new classClonegroup(1.95,0,-1.3,0,0,0,objVis,8,84);
    groupClone.creaClonegroup();
    shapeGroup = new classGroup([[60,60],[71,73],[83,84]],objVis,9);
    shapeGroup.creaGroup();
    groupClone = new classClonegroup(0,0,-12.6,0,0,0,objVis,9,85);
    groupClone.creaClonegroup();
    
    //Paso 32
    gltfClone = new classClonegltf("uLcorto",-2.95,2.95,13.9,0,turn90,-turn90,objVis,86);
    gltfClone.creaClonegltf();
    
    //Paso 33
    gltfClone = new classClonegltf("hlarge",-3.3,4.63,13.9,turn90,0,turn90,objVis,87);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u2x",-2,5.95,13.9,0,turn90,-turn90,objVis,88);
    gltfClone.creaClonegltf();
    
    //Paso 34
    gltfClone = new classClonegltf("uLcorto",-2.95,2.95,3.75,0,turn90,-turn90,objVis,89);
    gltfClone.creaClonegltf();
    
    //Paso 35
    gltfClone = new classClonegltf("hlarge",-3.3,4.63,3.75,turn90,0,turn90,objVis,90);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u1x",-2.65,5.95,3.75,0,turn90,-turn90,objVis,91);
    gltfClone.creaClonegltf();
    
    //Paso 36
    gltfClone = new classClonegltf("uLcorto",-2.95,2.95,-3.75,0,turn90,-turn90,objVis,92);
    gltfClone.creaClonegltf();
    
    //Paso 37
    gltfClone = new classClonegltf("hlarge",-3.3,4.63,-3.75,turn90,0,turn90,objVis,93);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u1x",-2.65,5.95,-3.75,0,turn90,-turn90,objVis,94);
    gltfClone.creaClonegltf();
    
    //Paso 38
    gltfClone = new classClonegltf("uLcorto",-2.95,2.95,-8.95,0,turn90,-turn90,objVis,95);
    gltfClone.creaClonegltf();
    
    //Paso 39
    gltfClone = new classClonegltf("hlarge",-3.3,4.63,-8.95,turn90,0,turn90,objVis,96);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u1x",-2.65,5.95,-8.95,0,turn90,-turn90,objVis,97);
    gltfClone.creaClonegltf();
    
    //Paso 40
    gltfClone = new classClonegltf("uLcorto",-2.95,2.95,-12.6,0,turn90,-turn90,objVis,98);
    gltfClone.creaClonegltf();
    
    //Paso 41
    gltfClone = new classClonegltf("hlarge",-3.3,4.63,-12.6,turn90,0,turn90,objVis,99);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u1x",-2.65,5.95,-12.6,0,turn90,-turn90,objVis,100);
    gltfClone.creaClonegltf();
    
    //Paso 42
    gltfClone = new classClonegltf("uLcorto",-2.95,2.95,-13.9,0,turn90,-turn90,objVis,101);
    gltfClone.creaClonegltf();
    
    //Paso 43
    gltfClone = new classClonegltf("hlarge",-3.3,4.63,-13.9,turn90,0,turn90,objVis,102);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u2x",-2,5.95,-13.9,0,turn90,-turn90,objVis,103);
    gltfClone.creaClonegltf();
    
    
    //Oculta todas las piezas y deja solo los grupos y las piezas sueltas finales
    for(i=0; i<=75; i++){
        allClones[i].visible = false;
    }
    allClones[76].visible = false;
    allClones[78].visible = false;
    allClones[80].visible = false;
    allClones[81].visible = false;
    allClones[83].visible = false;
    allClones[84].visible = false;
    
    //Posicion 0 en objetos que giran
    for(i=0; i<=5; i++){
        allClones[77].children[12].children[i].position.x = 0;
        allClones[77].children[12].children[i].position.z = 0;
    }
    for(i=0; i<=5; i++){
        allClones[79].children[12].children[i].position.x = 0;
        allClones[79].children[12].children[i].position.z = 0;
    }
    for(i=0; i<=5; i++){
        allClones[82].children[12].children[i].position.x = 0;
        allClones[82].children[12].children[i].position.z = 0;
        allClones[82].children[13].children[i].position.x = 0;
        allClones[82].children[13].children[i].position.z = 0;
    }
    for(i=0; i<=5; i++){
        allClones[85].children[4].children[i].position.x = 0;
        allClones[85].children[4].children[i].position.z = 0;
        allClones[85].children[5].children[i].position.x = 0;
        allClones[85].children[5].children[i].position.z = 0;
    }

    //Texto para los engranes
    var labelDiv1 = document.createElement('div');
    labelDiv1.className = 'd_txtlabel d_txtlabel1';//Agrega clase
    labelDiv1.textContent = '';
    //labelDiv1.setAttribute("id", "d_txtlabel1");//Agrega id
    cssDiv1 = new THREE.CSS2DObject(labelDiv1);
    cssDiv1.width = 100;
    cssDiv1.height = 100;
    cssDiv1.position.set( -2, 0, 2.5 );
    cssDiv1.visible = true;
    allClones[88].add(cssDiv1);
    var labelDiv2 = document.createElement('div');
    labelDiv2.className = 'd_txtlabel d_txtlabel2';//Agrega clase
    labelDiv2.textContent = '';
    //labelDiv2.setAttribute("id", "d_txtlabel2");//Agrega id
    cssDiv2 = new THREE.CSS2DObject(labelDiv2);
    cssDiv2.width = 100;
    cssDiv2.height = 100;
    cssDiv2.position.set( -2, 0, 0 );
    cssDiv2.visible = true;
    allClones[91].add(cssDiv2);
    var labelDiv3 = document.createElement('div');
    labelDiv3.className = 'd_txtlabel d_txtlabel3';//Agrega clase
    labelDiv3.textContent = '';
    //labelDiv3.setAttribute("id", "d_txtlabel3");//Agrega id
    cssDiv3 = new THREE.CSS2DObject(labelDiv3);
    cssDiv3.width = 100;
    cssDiv3.height = 100;
    cssDiv3.position.set( -2, 0, 0 );
    cssDiv3.visible = true;
    allClones[94].add(cssDiv3);
    var labelDiv4 = document.createElement('div');
    labelDiv4.className = 'd_txtlabel d_txtlabel4';//Agrega clase
    labelDiv4.textContent = '';
    //labelDiv4.setAttribute("id", "d_txtlabel4");//Agrega id
    cssDiv4 = new THREE.CSS2DObject(labelDiv4);
    cssDiv4.width = 100;
    cssDiv4.height = 100;
    cssDiv4.position.set( -2, 0, 0 );
    cssDiv4.visible = true;
    allClones[97].add(cssDiv4);
    var labelDiv5 = document.createElement('div');
    labelDiv5.className = 'd_txtlabel d_txtlabel5';//Agrega clase
    labelDiv5.textContent = '';
    //labelDiv5.setAttribute("id", "d_txtlabel5");//Agrega id
    cssDiv5 = new THREE.CSS2DObject(labelDiv5);
    cssDiv5.width = 100;
    cssDiv5.height = 100;
    cssDiv5.position.set( -2, 0, 0 );
    cssDiv5.visible = true;
    allClones[100].add(cssDiv5);
    var labelDiv6 = document.createElement('div');
    labelDiv6.className = 'd_txtlabel d_txtlabel6';//Agrega clase
    labelDiv6.textContent = '';
    //labelDiv6.setAttribute("id", "d_txtlabel6");//Agrega id
    cssDiv6 = new THREE.CSS2DObject(labelDiv6);
    cssDiv6.width = 100;
    cssDiv6.height = 100;
    cssDiv6.position.set( -2, 0, 2.5 );
    cssDiv6.visible = true;
    allClones[103].add(cssDiv6);
    var setTime = setTimeout(function(){
        $(".d_txtlabel1").append('<span class="d_txtlabela">1</span><Sup class="d_txtlabelb">0</sup><span class="d_txtlabelx">/</span><sub class="d_txtlabelc">0</sub>');//Agrega dato
        $(".d_txtlabel2").append('<span class="d_txtlabela">1</span><Sup class="d_txtlabelb">0</sup><span class="d_txtlabelx">/</span><sub class="d_txtlabelc">0</sub>');//Agrega dato
        $(".d_txtlabel3").append('<span class="d_txtlabela">1</span><Sup class="d_txtlabelb">0</sup><span class="d_txtlabelx">/</span><sub class="d_txtlabelc">0</sub>');//Agrega dato
        $(".d_txtlabel4").append('<span class="d_txtlabela">1</span><Sup class="d_txtlabelb">0</sup><span class="d_txtlabelx">/</span><sub class="d_txtlabelc">0</sub>');//Agrega dato
        $(".d_txtlabel5").append('<span class="d_txtlabela">1</span><Sup class="d_txtlabelb">0</sup><span class="d_txtlabelx">/</span><sub class="d_txtlabelc">0</sub>');//Agrega dato
        $(".d_txtlabel6").append('<span class="d_txtlabela">1</span><Sup class="d_txtlabelb">0</sup><span class="d_txtlabelx">/</span><sub class="d_txtlabelc">0</sub>');//Agrega dato
        clearTimeout(setTime);
    },100);
    
    //Hand 
    gltfClone = new classClonegltf("handright",0,0,0,0,-(girRad*90),0,false,104);
    gltfClone.creaClonegltf();
    allClones[104].scale.set(0.5,0.5,0.5);
    //Objeto que la mano va a seguir
    obj3dHand = new THREE.Object3D();
    obj3dHand.position.set(6,4,16.5);
    scene.add(obj3dHand);
    //Axes, para saber donde esta el objeto
    const axesHelper = new THREE.AxesHelper( 5 );
    axesHelper.visible = false;
    obj3dHand.add( axesHelper );
    //La mano sigue al objeto
    allClones[104].position.copy(obj3dHand.position);
    //Colores de flechas
    allClones[17].children[1].material.color = arrowoutColor;
    allClones[17].children[0].material.color = arrowinColor;
    allClones[35].children[1].material.color = arrowoutColor;
    allClones[35].children[0].material.color = arrowinColor;
    allClones[58].children[1].material.color = arrowoutColor;
    allClones[58].children[0].material.color = arrowinColor;
    allClones[59].children[1].material.color = arrowoutColor;
    allClones[59].children[0].material.color = arrowinColor;
    allClones[74].children[1].material.color = arrowoutColor;
    allClones[74].children[0].material.color = arrowinColor;
    allClones[75].children[1].material.color = arrowoutColor;
    allClones[75].children[0].material.color = arrowinColor;
    
    paintData();//Agrega datos de vueltas de engranes
    girMesh();//Click giro engrane
    setMenu2d();//Menu 2d
}

function paintData(){
    /*
	* NOMBRE: paintData.
	* UTILIDAD: Agrega datos de vueltas de engranes
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
}
function setMenu2d(){
    /*
	* NOMBRE: setMenu2d.
	* UTILIDAD: Menu 2d
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    $(".d_footerbtn2d").off().on('mousedown touchstart',function(e){
        e.preventDefault();
        $(".d_footermenu2d").fadeIn();
        $(".d_footerbtn2d").addClass('d_footerbtn2d_inactive');;
        allClones[104].visible = false;//Oculta mano
        resizeMenu2d();//Resize menu 2d 
    });
    $(".d_footermenu2dinclose").off().on('mousedown touchstart',function(e){
        e.preventDefault();
        $(".d_footermenu2d").fadeOut();
        $(".d_footerbtn2d").removeClass('d_footerbtn2d_inactive');
        allClones[104].visible = true;//Muestra mano
    });
};
function resizeMenu2d(){
    /*
	* NOMBRE: resizeMenu2d.
	* UTILIDAD: Resize menu 2d
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    var setTime = setTimeout(function(){
        var getHeight = $(".d_footermenu2d").outerHeight();
        var getWidth = $(".d_footermenu2din").outerWidth();
        
        if(getWidth/2 <= getHeight){
            $(".d_footermenu2din").css({"height":getWidth/2,"top":"calc(50% - "+(getWidth/4)+"px)"});
        }else{
            $(".d_footermenu2din").css({"height":"100%","top":"0%"});
        }
    },100);
}
var girDirection;//Almacena btn que se presiona
function girMesh(){
    /*
	* NOMBRE: girMesh.
	* UTILIDAD: Click giro engrane
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    $(".d_footerbtngirpress").on("mousedown touchstart",function(e){//Mousedown de btn
        e.preventDefault();
        var saveBtn = $(this).attr('id').split("_")[2];//Obtiene info de btn que se presiona
        allClones[104].visible = true;//Muestra mano
        girDirection = saveBtn;//Btn que se presiona
        starAnimation = true;//Inicia animacion
        $(".d_footerbtngirpress").on("mouseout touchleave",function(e){//Mouseout de btn
            e.preventDefault();
            allClones[104].visible = false;//Oculta mano
            starAnimation = false;//Detiene animacion
        });
    });
    $(".d_footerbtngirpress").on("mouseup touchend",function(e){//Mouseup de btn
        e.preventDefault();
        allClones[104].visible = false;//Oculta mano
        starAnimation = false;//Detiene animacion
    });
}
var getAngle = 0.6;//Velocidad de giro
var camera_angle = 0;//Angulo de giro mano
var camera_range = 5;//Apertura de giro
var contInteger = [0,0,0,0,0,0];//Almacena los enteros de giro de cada engrane
var degDiv = [0.5729578,0.7637527409,1.145916,1.526932524,2.291831,4.583662];
var incDeg = [0,0,0,0,0,0];
function setAnimation(){
    /*
	* NOMBRE: setAnimation.
	* UTILIDAD: Establece la animacion sin el Tween
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(starAnimation === true){//Si camera va a seguir marble. Esto no se puede con Tween
        if(girDirection === "right"){//Giro de mano derecha
            allClones[77].children[12].rotation.y = allClones[77].children[12].rotation.y+0.01;
            allClones[79].children[12].rotation.y = allClones[79].children[12].rotation.y-0.01333;
            allClones[82].children[12].rotation.y = allClones[82].children[12].rotation.y+0.02;
            allClones[82].children[13].rotation.y = allClones[82].children[13].rotation.y-0.02665;
            allClones[85].children[4].rotation.y = allClones[85].children[4].rotation.y+0.04;
            allClones[85].children[5].rotation.y = allClones[85].children[5].rotation.y-0.08;
            camera_angle += getAngle * Math.PI/180;//Angulo de giro mano
            if(camera_angle > 3.15){//Si objeto dio cierta vuelta
                camera_angle = 0;//Resetea conteo
            }
            girMeshcont(77,12,1,0,girDirection,'clockwise');//Establece el conteo de vueltas de cada engrane (primero)
            girMeshcont(79,12,2,1,girDirection,'clockotherwise');//Establece el conteo de vueltas de cada engrane (segundo)
            girMeshcont(82,12,3,2,girDirection,'clockwise');//Establece el conteo de vueltas de cada engrane (tercero)
            girMeshcont(82,13,4,3,girDirection,'clockotherwise');//Establece el conteo de vueltas de cada engrane (cuarto)
            girMeshcont(85,4,5,4,girDirection,'clockwise');//Establece el conteo de vueltas de cada engrane (quinto)
            girMeshcont(85,5,6,5,girDirection,'clockotherwise');//Establece el conteo de vueltas de cada engrane (sexto)
            
            
            $(".d_footermenu2dmesh1").css({"transform":"rotate("+incDeg[0]+"deg)"});
            incDeg[0] = incDeg[0]-degDiv[0];
            $(".d_footermenu2dmesh2").css({"transform":"rotate("+incDeg[1]+"deg)"});
            incDeg[1] = incDeg[1]+degDiv[1];
            $(".d_footermenu2dmesh3").css({"transform":"rotate("+incDeg[2]+"deg)"});
            incDeg[2] = incDeg[2]-degDiv[2];
            $(".d_footermenu2dmesh4").css({"transform":"rotate("+incDeg[3]+"deg)"});
            incDeg[3] = incDeg[3]+degDiv[3];
            $(".d_footermenu2dmesh5").css({"transform":"rotate("+incDeg[4]+"deg)"});
            incDeg[4] = incDeg[4]-degDiv[4];
            $(".d_footermenu2dmesh6").css({"transform":"rotate("+incDeg[5]+"deg)"});
            incDeg[5] = incDeg[5]+degDiv[5];
            
        }
        if(girDirection === "left"){//Giro de mano izquierda
            allClones[77].children[12].rotation.y = allClones[77].children[12].rotation.y-0.01;
            allClones[79].children[12].rotation.y = allClones[79].children[12].rotation.y+0.01333;
            allClones[82].children[12].rotation.y = allClones[82].children[12].rotation.y-0.02;
            allClones[82].children[13].rotation.y = allClones[82].children[13].rotation.y+0.02665;
            allClones[85].children[4].rotation.y = allClones[85].children[4].rotation.y-0.04;
            allClones[85].children[5].rotation.y = allClones[85].children[5].rotation.y+0.08;
            camera_angle -= getAngle * Math.PI/180;//Angulo de giro mano
            if(camera_angle <= 0){//Si objeto dio cierta vuelta
                camera_angle = 3.15;//Resetea conteo
            }
            girMeshcont(77,12,1,0,girDirection);//Establece el conteo de vueltas de cada engrane (primero)
            girMeshcont(79,12,2,1,girDirection);//Establece el conteo de vueltas de cada engrane (segundo)
            girMeshcont(82,12,3,2,girDirection);//Establece el conteo de vueltas de cada engrane (tercero)
            girMeshcont(82,13,4,3,girDirection);//Establece el conteo de vueltas de cada engrane (cuarto)
            girMeshcont(85,4,5,4,girDirection);//Establece el conteo de vueltas de cada engrane (quinto)
            girMeshcont(85,5,6,5,girDirection);//Establece el conteo de vueltas de cada engrane (sexto)
            
            
            //console.log($(".d_footermenu2dmesh1"));
            
            $(".d_footermenu2dmesh1").css({"transform":"rotate("+incDeg[0]+"deg)"});
            incDeg[0] = incDeg[0]+degDiv[0];
            $(".d_footermenu2dmesh2").css({"transform":"rotate("+incDeg[1]+"deg)"});
            incDeg[1] = incDeg[1]-degDiv[1];
            $(".d_footermenu2dmesh3").css({"transform":"rotate("+incDeg[2]+"deg)"});
            incDeg[2] = incDeg[2]+degDiv[2];
            $(".d_footermenu2dmesh4").css({"transform":"rotate("+incDeg[3]+"deg)"});
            incDeg[3] = incDeg[3]-degDiv[3];
            $(".d_footermenu2dmesh5").css({"transform":"rotate("+incDeg[4]+"deg)"});
            incDeg[4] = incDeg[4]+degDiv[4];
            $(".d_footermenu2dmesh6").css({"transform":"rotate("+incDeg[5]+"deg)"});
            incDeg[5] = incDeg[5]-degDiv[5];
            
        }
        obj3dHand.position.x = Math.sin(camera_angle) * camera_range+6;//Posicion de giro X
        obj3dHand.position.z = Math.cos(camera_angle) * camera_range+11.5;//Posicion de giro Z
        allClones[104].position.copy(obj3dHand.position);//Mano sigue objeto
        
    }
    if(reajusteAnima === true){//Reajusta canvas si se abre el menu
        reajusteConte3d();//Reajusta el contenido 3d en resize
    }
}
function girMeshcont(numClone,numClonechild,numLabel,posCont,meshDirection,clockwise){
    /*
	* NOMBRE: girMeshcont.
	* UTILIDAD: Establece el conteo de vueltas de cada engrane
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */

    //console.log(allClones[numClone].children[numClonechild].rotation.y);

    if(meshDirection === "left"){//Btn left
        if(allClones[numClone].children[numClonechild].rotation.y <= (0)){//Fraccion 0
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').hide();//Oculta etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelx').hide();//Oculta etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').hide();//Oculta etiqueta
        }
        if(allClones[numClone].children[numClonechild].rotation.y <= (-0.39)){//Fraccion 1/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').show();//Muestra etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelx').show();//Muestra etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').show();//Muestra etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('1');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y <= (-0.78)){//Fraccion 2/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('2');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y <= (-1.17)){//Fraccion 3/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('3');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y <= (-1.57)){//Fraccion 4/16 o 1/4
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('4');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y <= (-1.96)){//Fraccion 5/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('5');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y <= (-2.35)){//Fraccion 6/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('6');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y <= (-2.74)){//Fraccion 7/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('7');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y <= (-3.14)){//Fraccion 8/16 o 1/2
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('8');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y <= (-3.53)){//Fraccion 9/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('9');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y <= (-3.92)){//Fraccion 10/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('10');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y <= (-4.31)){//Fraccion 11/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('11');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y <= (-4.71)){//Fraccion 12/16 o 3/4
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('12');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y <= (-5.10)){//Fraccion 13/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('13');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y <= (-5.49)){//Fraccion 14/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('14');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y <= (-5.89)){//Fraccion 15/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('15');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y >= (0)){//Fraccion 0
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').hide();//Oculta etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelx').hide();//Oculta etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').hide();//Oculta etiqueta
        }
        if(allClones[numClone].children[numClonechild].rotation.y >= (0.39)){
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').show();//Muestra etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelx').show();//Muestra etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').show();//Muestra etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('1');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y >= (0.78)){//Fraccion 2/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('2');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y >= (1.17)){//Fraccion 3/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('3');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y >= (1.57)){//Fraccion 4/16 o 1/4
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('4');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y >= (1.96)){//Fraccion 5/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('5');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y >= (2.35)){//Fraccion 6/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('6');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y >= (2.74)){//Fraccion 7/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('7');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y >= (3.14)){//Fraccion 8/16 o 1/2
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('8');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y >= (3.53)){//Fraccion 9/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('9');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y >= (3.92)){//Fraccion 10/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('10');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y >= (4.31)){//Fraccion 11/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('11');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y >= (4.71)){//Fraccion 12/16 o 3/4
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('12');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y >= (5.10)){//Fraccion 13/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('13');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y >= (5.49)){//Fraccion 14/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('14');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y >= (5.89)){//Fraccion 15/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('15');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }

        
        if(allClones[numClone].children[numClonechild].rotation.y <= (-6.28319) || allClones[numClone].children[numClonechild].rotation.y >= (6.28319)){//Da vuelta completa
            contInteger[posCont]++;//Aumaneta conteo de entero
            $(".d_txtlabel"+numLabel).find('.d_txtlabela').show();//Muestra etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabela').text(contInteger[posCont]);//Agrega dato a etiqueta (entero)
            allClones[numClone].children[numClonechild].rotation.y = 0;//Resetea giro
            $(".d_footermenu2dmesh"+numClone).css({"transform":"rotate(0deg)"});
        }
        if(contInteger[posCont] >= 0 && allClones[77].children[12].rotation.y < (-0.01)){//Si el engrane 1 esta al inicio de su giro (activa btn right)
            $("#d_gir_right").removeClass('d_gir_right_opacity');//Muestra icono de retroceso engrane 1
            $('.d_gir_right_block').remove();//Quita bloqueo
        }
    }
    if(meshDirection === "right"){//Btn right
        if(allClones[numClone].children[numClonechild].rotation.y > (-0.39) && allClones[numClone].children[numClonechild].rotation.y < (0)){//Fraccion 0
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').hide();//Oculta etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelx').hide();//Oculta etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').hide();//Oculta etiqueta
        }else if(allClones[numClone].children[numClonechild].rotation.y > (-0.78) && allClones[numClone].children[numClonechild].rotation.y < (-0.39)){//Fraccion 1/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('1');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y > (-1.17) && allClones[numClone].children[numClonechild].rotation.y < (-0.78)){//Fraccion 2/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('2');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y > (-1.57) && allClones[numClone].children[numClonechild].rotation.y < (-1.17)){//Fraccion 3/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('3');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y > (-1.96) && allClones[numClone].children[numClonechild].rotation.y < (-1.57)){//Fraccion 4/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('4');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y > (-2.35) && allClones[numClone].children[numClonechild].rotation.y < (-1.96)){//Fraccion 5/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('5');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y > (-2.74) && allClones[numClone].children[numClonechild].rotation.y < (-2.35)){//Fraccion 6/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('6');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y > (-3.14) && allClones[numClone].children[numClonechild].rotation.y < (-2.74)){//Fraccion 7/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('7');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y > (-3.53) && allClones[numClone].children[numClonechild].rotation.y < (-3.14)){//Fraccion 8/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('8');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y > (-3.92) && allClones[numClone].children[numClonechild].rotation.y < (-3.53)){//Fraccion 9/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('9');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y > (-4.31) && allClones[numClone].children[numClonechild].rotation.y < (-3.92)){//Fraccion 10/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('10');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y > (-4.71) && allClones[numClone].children[numClonechild].rotation.y < (-4.31)){//Fraccion 11/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('11');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y > (-5.10) && allClones[numClone].children[numClonechild].rotation.y < (-4.71)){//Fraccion 12/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('12');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y > (-5.49) && allClones[numClone].children[numClonechild].rotation.y < (-5.10)){//Fraccion 13/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('13');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y > (-5.89) && allClones[numClone].children[numClonechild].rotation.y < (-5.49)){//Fraccion 14/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('14');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y > (-6.28) && allClones[numClone].children[numClonechild].rotation.y < (-5.89)){//Fraccion 15/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').show();//Muestra etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelx').show();//Muestra etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').show();//Muestra etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('15');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        if(allClones[numClone].children[numClonechild].rotation.y < (0.39) && allClones[numClone].children[numClonechild].rotation.y > (0)){//Fraccion 0
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').hide();//Oculta etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelx').hide();//Oculta etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').hide();//Oculta etiqueta
        }else if(allClones[numClone].children[numClonechild].rotation.y < (0.78) && allClones[numClone].children[numClonechild].rotation.y > (0.39)){//Fraccion 1/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('1');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y < (1.17) && allClones[numClone].children[numClonechild].rotation.y > (0.78)){//Fraccion 2/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('2');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y < (1.57) && allClones[numClone].children[numClonechild].rotation.y > (1.17)){//Fraccion 3/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('3');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y < (1.96) && allClones[numClone].children[numClonechild].rotation.y > (1.57)){//Fraccion 4/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('4');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y < (2.35) && allClones[numClone].children[numClonechild].rotation.y > (1.96)){//Fraccion 5/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('5');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y < (2.74) && allClones[numClone].children[numClonechild].rotation.y > (2.35)){//Fraccion 6/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('6');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y < (3.14) && allClones[numClone].children[numClonechild].rotation.y > (2.74)){//Fraccion 7/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('7');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y < (3.53) && allClones[numClone].children[numClonechild].rotation.y > (3.14)){//Fraccion 8/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('8');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y < (3.92) && allClones[numClone].children[numClonechild].rotation.y > (3.53)){//Fraccion 9/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('9');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y < (4.31) && allClones[numClone].children[numClonechild].rotation.y > (3.92)){//Fraccion 10/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('10');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y < (4.71) && allClones[numClone].children[numClonechild].rotation.y > (4.31)){//Fraccion 11/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('11');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y < (5.10) && allClones[numClone].children[numClonechild].rotation.y > (4.71)){//Fraccion 12/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('12');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y < (5.49) && allClones[numClone].children[numClonechild].rotation.y > (5.10)){//Fraccion 13/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('13');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y < (5.89) && allClones[numClone].children[numClonechild].rotation.y > (5.49)){//Fraccion 14/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('14');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }else if(allClones[numClone].children[numClonechild].rotation.y < (6.28) && allClones[numClone].children[numClonechild].rotation.y > (5.89)){//Fraccion 15/16
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').show();//Muestra etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelx').show();//Muestra etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').show();//Muestra etiqueta
            $(".d_txtlabel"+numLabel).find('.d_txtlabelb').text('15');//Agrega dato a etiqueta (fraccion)
            $(".d_txtlabel"+numLabel).find('.d_txtlabelc').text('16');//Agrega dato a etiqueta (fraccion)
        }
        
        if(clockwise === "clockwise"){//Direccion sentido manecillas
            if(allClones[numClone].children[numClonechild].rotation.y >= 0){//Regresa la vuelta
                contInteger[posCont]--;//Disminuye conteo de entero
                if(contInteger[posCont] === 0){//Si conteo es igual a 0
                    $(".d_txtlabel"+numLabel).find('.d_txtlabela').hide();//Oculta etiqueta
                    contInteger[posCont] = 0;//Disminuye conteo de entero
                }else{//Conteo diferente a 0
                    $(".d_txtlabel"+numLabel).find('.d_txtlabela').text(contInteger[posCont]);//Agrega dato a etiqueta (entero)
                } 
                allClones[numClone].children[numClonechild].rotation.y = -6.28319;//Resetea giro
                $(".d_footermenu2dmesh"+numClone).css({"transform":"rotate(-360deg)"});
            }
        }
        if(clockwise === "clockotherwise"){//Direccion contra manecillas
            if(allClones[numClone].children[numClonechild].rotation.y <= 0){//Regresa la vuelta
                contInteger[posCont]--;//Disminuye conteo de entero
                if(contInteger[posCont] === 0){//Si conteo es igual a 0
                    $(".d_txtlabel"+numLabel).find('.d_txtlabela').hide();//Oculta etiqueta
                    contInteger[posCont] = 0;//Disminuye conteo de entero
                }else{//Conteo diferente a 0
                    $(".d_txtlabel"+numLabel).find('.d_txtlabela').text(contInteger[posCont]);//Agrega dato a etiqueta (entero)
                } 
                allClones[numClone].children[numClonechild].rotation.y = 6.28319;//Resetea giro
                $(".d_footermenu2dmesh"+numClone).css({"transform":"rotate(360deg)"});
            }
        }
        if(contInteger[posCont] === 0 && allClones[77].children[12].rotation.y > (-0.01)){//Si el engrane 1 esta al inicio de su giro (bloquea btn right)
            $("#d_gir_right").addClass('d_gir_right_opacity');//Oculta icono de retroceso engrane 1
            $("#d_gir_right").parent().append('<div class="d_gir_right_block"></div>');//Agrega bloqueo
        } 
    }
}
function cleanData(){
    /*
	* NOMBRE: cleanData.
	* UTILIDAD: Limpia datos de engranes y label
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    for(var i=0; i<=5; i++){
        $(".d_txtlabel"+(i+1)).find('.d_txtlabela').hide();//Oculta etiqueta
        $(".d_txtlabel"+(i+1)).find('.d_txtlabelb').hide();//Oculta etiqueta
        $(".d_txtlabel"+(i+1)).find('.d_txtlabelx').hide();//Oculta etiqueta
        $(".d_txtlabel"+(i+1)).find('.d_txtlabelc').hide();//Oculta etiqueta
        contInteger[i] = 0;//Resetea conteo de entero
    }
    allClones[77].children[12].rotation.y = 0;//Resetea giro
    allClones[79].children[12].rotation.y = 0;//Resetea giro
    allClones[82].children[12].rotation.y = 0;//Resetea giro
    allClones[82].children[13].rotation.y = 0;//Resetea giro
    allClones[85].children[4].rotation.y = 0;//Resetea giro
    allClones[85].children[5].rotation.y = 0;//Resetea giro
    $(".d_footermenu2dmesh1").css({"transform":"rotate(0deg)"});
    $(".d_footermenu2dmesh2").css({"transform":"rotate(0deg)"});
    $(".d_footermenu2dmesh3").css({"transform":"rotate(0deg)"});
    $(".d_footermenu2dmesh4").css({"transform":"rotate(0deg)"});
    $(".d_footermenu2dmesh5").css({"transform":"rotate(0deg)"});
    $(".d_footermenu2dmesh6").css({"transform":"rotate(0deg)"});
    incDeg = [0,0,0,0,0,0];//Limpia conteo giro
    camera_angle = 0;//Resetea conteo
    $("#d_gir_right").addClass('d_gir_right_opacity');//Oculta icono de retroceso engrane 1
    $("#d_gir_right").parent().append('<div class="d_gir_right_block"></div>');//Agrega bloqueo
}