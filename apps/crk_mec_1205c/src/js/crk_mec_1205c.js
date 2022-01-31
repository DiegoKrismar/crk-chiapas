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
setCamerapos = [50,10,30];//Establece la posicion de la camara
setScenepos = [0,0,0];//Establece la posicion de la camara
gridPosy = -16;//Posicion de la reticula en cada modelo
setRope = true;//Establece si hay animacion para cuerda
slidesInd = null;//Cantidad de vistas para indicaciones
var addAnima = false;//Indica si se esta animando la cuerda
var posCanastas = {A1:null,A2:null,B:null};
var posCuerdas = {one:[],two:[]};
var groundMaterial, marbleMaterial, canaletaMaterial = [];//Materials phisi
var marbleColor, canaletaColor, groundCcolor;//Colors phisi
var canaletaSide = [];//Guarda las caras de canaletas phisis
var objetoCanaletas = [];//Guarda las canaletas phisis
var marbleGeometry, groundGeometry, canaletaGeometry;//Geometry phisi
var marbleMesh, groundMesh, canaletaMesh;//Mesh phisi
var cssDiv1, cssDiv2, cssDiv3;//Texto de canastas
var timeDelay = 1000;//Tiempo de delay
var timeAnima = 2000;//Tiempo de delay
var easingType = TWEEN.Easing.Quadratic.InOut;//Efecto ease
var groupCatmull_1, pointsCatmull_1, geometryTube_1, meshTube_1;//Variables para construir la primera cuerda
var groupCatmull_2, pointsCatmull_2, geometryTube_2, meshTube_2;//Variables para construir la segunda cuerda
var setCanasta = "ONE";//Almacena que canasta se selecciona
var raycaster, mouse, objRaycaster = [];//Almacena datos para raycaster
var mouseEvent = false;//Almacena si se esta haciendo click en el escenario
var pressEvent;//Guarda si se hace click en la canasta A o B
var posMarble = [];//Almacena la posicion de marble de acuerdo a la canasta y al numero de poleas
var saveMarble = {a:[],b:[]};//Almacena las marbles que se van agregando a las canastas
var optionMarble = false;//Saber si se agrega una marble nueva (solo agrega)
var marbleCollision = false;//Detecta si marbles tienen cambios
var distanceMarble = {a:[],b:[]};//Distancia de marble a la canasta
var statusFirst = true;//Obtener la distancia de marble a la canasta solo una vez
addReflexion = [
    "¿Cuántas canicas colocaste para nivelar las canastas para cada uno?",
    "¿Identificas alguna relación entre la cantidad de canicas que colocaste y la cantidad de poleas?",
    "¿Hasta cuántas poleas podrías tener en un sistema?",
    "¿Dónde has visto sistemas de una sola polea y qué beneficio tiene?"
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

    groupClone = new classClonegroup(-12,0,0,0,0,0,objVis,0,6);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(-6,0,0,0,0,0,objVis,0,7);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(0,0,0,0,0,0,objVis,0,8);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(6,0,0,0,0,0,objVis,0,9);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(12,0,0,0,0,0,objVis,0,10);
    groupClone.creaClonegroup();
    

    //Paso 1
    gltfClone = new classClonegltf("b4x3",-2.6,0,0,girRad*90,0,girRad*90,objVis,11);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x3",2.6,0,0,girRad*90,0,girRad*90,objVis,12);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-2.58,1.3,0,girRad*90,girRad*90,objVis,13);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-2.58,0,0,girRad*90,girRad*90,objVis,14);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-2.58,-1.3,0,girRad*90,girRad*90,objVis,15);
    gltfClone.creaClonegltf();
    
    //Paso 2
    gltfClone = new classClonegltf("u3x",0,0.63,1.95,0,girRad*90,0,objVis,16);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-1.93,1.95,0,girRad*90,0,objVis,17);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-0.63,1.95,0,girRad*90,0,objVis,18);
    gltfClone.creaClonegltf();
    
    //Paso 3
    gltfClone = new classClonegltf("u3x",0,0.63,-1.95,0,-(girRad*90),0,objVis,19);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-1.93,-1.95,0,-(girRad*90),0,objVis,20);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-0.63,-1.95,0,-(girRad*90),0,objVis,21);
    gltfClone.creaClonegltf();
    
    //Paso 4
    gltfClone = new classClonegltf("topeL9mm",-1.9,1.95,0,0,0,girRad*90,objVis,22);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",-0.9,1.95,0,0,0,girRad*90,objVis,23);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hang8",0,1.95,0,girRad*180,0,girRad*90,objVis,24);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",0.9,1.95,0,0,0,girRad*90,objVis,25);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",1.9,1.95,0,0,0,girRad*90,objVis,26);
    gltfClone.creaClonegltf();
    
      //Paso 5
    meshClone = new classCloneshape("straw",0,1.95,0,0,0,girRad*90,6.5,objVis,27);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("stick",0,1.95,0,0,0,girRad*90,7.3,objVis,28);
    meshClone.creaClonemesh();
    
    shapeGroup = new classGroup([[11,28]],objVis,1);
    shapeGroup.creaGroup();
    
    //Paso 6
    gltfClone = new classClonegltf("b4x3",-2.6,0,0,girRad*90,0,girRad*90,objVis,29);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x3",2.6,0,0,girRad*90,0,girRad*90,objVis,30);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-2.58,1.3,0,girRad*90,girRad*90,objVis,31);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-2.58,0,0,girRad*90,girRad*90,objVis,32);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-2.58,-1.3,0,girRad*90,girRad*90,objVis,33);
    gltfClone.creaClonegltf();
    
    //Paso 7
    gltfClone = new classClonegltf("u3x",0,-1.93,1.95,0,girRad*90,0,objVis,34);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-0.63,1.95,0,girRad*90,0,objVis,35);
    gltfClone.creaClonegltf();
    
    //Paso 8
    gltfClone = new classClonegltf("u3x",0,-1.93,-1.95,0,-(girRad*90),0,objVis,36);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-0.63,-1.95,0,-(girRad*90),0,objVis,37);
    gltfClone.creaClonegltf();
    
    //Paso 9
    gltfClone = new classClonegltf("topeL9mm",-1.9,1.95,0,0,0,girRad*90,objVis,38);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",-0.9,1.95,0,0,0,girRad*90,objVis,39);
    gltfClone.creaClonegltf();
    groupClone = new classClonegroup(0,1.95,0,girRad*180,0,girRad*90,objVis,0,40);
    groupClone.creaClonegroup();
    gltfClone = new classClonegltf("topeL9mm",0.9,1.95,0,0,0,girRad*90,objVis,41);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",1.9,1.95,0,0,0,girRad*90,objVis,42);
    gltfClone.creaClonegltf();
    
    //Paso 10
    meshClone = new classCloneshape("stick",0,1.95,0,0,0,girRad*90,10,objVis,43);
    meshClone.creaClonemesh();
    
    shapeGroup = new classGroup([[29,43]],objVis,2);
    shapeGroup.creaGroup();
    
    //Paso 11
    gltfClone = new classClonegltf("b7x4",-2.6,0,0,girRad*90,0,girRad*90,objVis,44);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b7x4",2.6,0,0,girRad*90,0,girRad*90,objVis,45);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-4.52,1.95,0,girRad*90,girRad*90,objVis,46);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-4.52,0.65,0,girRad*90,girRad*90,objVis,47);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-4.52,-0.65,0,girRad*90,girRad*90,objVis,48);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-4.52,-1.95,0,girRad*90,girRad*90,objVis,49);
    gltfClone.creaClonegltf();
    
    //Paso 12
    gltfClone = new classClonegltf("u3x",0,-3.87,2.58,0,girRad*90,0,objVis,50);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-2.57,2.58,0,girRad*90,0,objVis,51);
    gltfClone.creaClonegltf();
    
    //Paso 13
    gltfClone = new classClonegltf("u3x",0,-3.87,-2.58,0,-(girRad*90),0,objVis,52);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-2.57,-2.58,0,-(girRad*90),0,objVis,53);
    gltfClone.creaClonegltf();
    
    //Paso 14
    gltfClone = new classClonegltf("topeL9mm",-1.9,3.88,1.94,0,0,girRad*90,objVis,54);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",-0.9,3.88,1.94,0,0,girRad*90,objVis,55);
    gltfClone.creaClonegltf();
    groupClone = new classClonegroup(0,3.88,1.94,girRad*180,0,girRad*90,objVis,0,56);
    groupClone.creaClonegroup();
    gltfClone = new classClonegltf("topeL9mm",0.9,3.88,1.94,0,0,girRad*90,objVis,57);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",1.9,3.88,1.94,0,0,girRad*90,objVis,58);
    gltfClone.creaClonegltf();
    
    //Paso 15
    meshClone = new classCloneshape("stick",0,3.88,1.94,0,0,girRad*90,10,objVis,59);
    meshClone.creaClonemesh();
    
    //Paso 16
    gltfClone = new classClonegltf("topeL9mm",-1.9,3.88,-1.94,0,0,girRad*90,objVis,60);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",-0.9,3.88,-1.94,0,0,girRad*90,objVis,61);
    gltfClone.creaClonegltf();
    groupClone = new classClonegroup(0,3.88,-1.94,girRad*180,0,girRad*90,objVis,0,62);
    groupClone.creaClonegroup();
    gltfClone = new classClonegltf("topeL9mm",0.9,3.88,-1.94,0,0,girRad*90,objVis,63);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",1.9,3.88,-1.94,0,0,girRad*90,objVis,64);
    gltfClone.creaClonegltf();
    
    //Paso 17
    meshClone = new classCloneshape("stick",0,3.88,-1.94,0,0,girRad*90,10,objVis,65);
    meshClone.creaClonemesh();
    
    shapeGroup = new classGroup([[44,65]],objVis,3);
    shapeGroup.creaGroup();
    
    //Paso 18
    gltfClone = new classClonegltf("hsmall",0,16,0,0,0,0,objVis,66);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",0,16,7.65,0,0,girRad*90,objVis,67);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",0,16,-7.65,0,0,girRad*90,objVis,68);
    gltfClone.creaClonegltf();
    
    //Paso 19
    shapeGroup = new classGroup([[66,68]],objVis,4);
    shapeGroup.creaGroup();
    
    groupClone = new classClonegroup(-20,0,0,0,0,0,objVis,4,69);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(-16,0,0,0,0,0,objVis,4,70);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(-12,0,0,0,0,0,objVis,4,71);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(-8,0,0,0,0,0,objVis,4,72);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(-4,0,0,0,0,0,objVis,4,73);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(0,0,0,0,0,0,objVis,4,74);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(4,0,0,0,0,0,objVis,4,75);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(8,0,0,0,0,0,objVis,4,76);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(12,0,0,0,0,0,objVis,4,77);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(16,0,0,0,0,0,objVis,4,78);
    groupClone.creaClonegroup();
    
    //Paso 20
    groupClone = new classClonegroup(-1.3,0,0,0,0,0,objVis,4,79);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(1.3,0,0,0,0,0,objVis,4,80);
    groupClone.creaClonegroup();
    gltfClone = new classClonegltf("u4x",0,15,1.19,0,girRad*90,girRad*90,objVis,81);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u4x",0,15,-1.19,0,girRad*90,girRad*90,objVis,82);
    gltfClone.creaClonegltf();
    
    //Paso 21
    gltfClone = new classClonegltf("topeL6mm",-0.8,16,-7.65,0,0,girRad*90,objVis,83);
    gltfClone.creaClonegltf();
    groupClone = new classClonegroup(0,16,-7.65,girRad*180,0,girRad*90,objVis,0,84);
    groupClone.creaClonegroup();
    gltfClone = new classClonegltf("topeL6mm",0.8,16,-7.65,0,0,girRad*90,objVis,85);
    gltfClone.creaClonegltf();
    
    //Paso 22
    meshClone = new classCloneshape("stick",0,16,-7.65,0,0,girRad*90,5,objVis,86);
    meshClone.creaClonemesh();
    
    //Paso 23
    gltfClone = new classClonegltf("topeL6mm",-0.8,16,3.75,0,0,girRad*90,objVis,87);
    gltfClone.creaClonegltf();
    groupClone = new classClonegroup(0,16,3.75,girRad*180,0,girRad*90,objVis,0,88);
    groupClone.creaClonegroup();
    gltfClone = new classClonegltf("topeL6mm",0.8,16,3.75,0,0,girRad*90,objVis,89);
    gltfClone.creaClonegltf();
    
    //Paso 24
    meshClone = new classCloneshape("stick",0,16,3.75,0,0,girRad*90,5,objVis,90);
    meshClone.creaClonemesh();
    
    //Paso 25
    gltfClone = new classClonegltf("topeL6mm",-0.7,16,12.82,0,0,girRad*90,objVis,91);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hang8",0,16,12.82,0,0,girRad*90,objVis,92);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",0.7,16,12.82,0,0,girRad*90,objVis,93);
    gltfClone.creaClonegltf();
    
    //Paso 26
    meshClone = new classCloneshape("straw",0,16,12.82,0,0,girRad*90,6.5,objVis,94);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("stick",0,16,12.82,0,0,girRad*90,7.3,objVis,95);
    meshClone.creaClonemesh();
    
    //Paso 27
    groupClone = new classClonegroup(-3.85,0,0,0,0,0,objVis,4,96);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(3.85,0,0,0,0,0,objVis,4,97);
    groupClone.creaClonegroup();
    
    //Paso 28
    gltfClone = new classClonegltf("u4x",0,16,14.75,0,girRad*90,0,objVis,98);
    gltfClone.creaClonegltf();
    
    //Paso 29
    gltfClone = new classClonegltf("u4x",0,16,-14.75,0,girRad*90,girRad*180,objVis,99);
    gltfClone.creaClonegltf();
    
    //Paso 30
    gltfClone = new classClonegltf("hsmall",-3.85,14.4,-14.15,girRad*90,0,0,objVis,100);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",3.85,14.4,-14.15,girRad*90,0,0,objVis,101);
    gltfClone.creaClonegltf();
    
    //Paso 31
    groupClone = new classClonegroup(-3.85,-0.85,-30.15,girRad*90,0,0,objVis,4,102);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(3.85,-0.85,-30.15,girRad*90,0,0,objVis,4,103);
    groupClone.creaClonegroup();
    
    //Paso 32
    gltfClone = new classClonegltf("u4x",0,13.3,-15.15,0,girRad*90,girRad*180,objVis,104);
    gltfClone.creaClonegltf();
    
    //Paso 33
    gltfClone = new classClonegltf("u4x",0,0.3,-15.15,0,girRad*90,girRad*180,objVis,105);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u4x",0,-2,-15.15,0,girRad*90,girRad*180,objVis,106);
    gltfClone.creaClonegltf();
    
    //Paso 34
    gltfClone = new classClonegltf("u4x",0,-15,-15.15,0,girRad*90,girRad*180,objVis,107);
    gltfClone.creaClonegltf();
    
    //Paso 35
    gltfClone = new classClonegltf("hsmall",-3.85,14.4,14.15,girRad*90,0,0,objVis,108);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",3.85,14.4,14.15,girRad*90,0,0,objVis,109);
    gltfClone.creaClonegltf();
    
    //Paso 36
    groupClone = new classClonegroup(-3.85,-0.85,-1.85,girRad*90,0,0,objVis,4,110);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(3.85,-0.85,-1.85,girRad*90,0,0,objVis,4,111);
    groupClone.creaClonegroup();
    
    //Paso 37
    gltfClone = new classClonegltf("u4x",0,13.3,15.15,0,girRad*90,0,objVis,112);
    gltfClone.creaClonegltf();
    
    //Paso 38
    gltfClone = new classClonegltf("u4x",0,0.3,15.15,0,girRad*90,0,objVis,113);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u4x",0,-2,15.15,0,girRad*90,0,objVis,114);
    gltfClone.creaClonegltf();
    
    //Paso 39
    gltfClone = new classClonegltf("u4x",0,-15,15.15,0,girRad*90,0,objVis,115);
    gltfClone.creaClonegltf();
    
    //Paso 40
    gltfClone = new classClonegltf("u2x",-5.15,-15.6,14.15,0,girRad*90,girRad*90,objVis,116);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u2x",5.15,-15.6,14.15,0,girRad*90,girRad*90,objVis,117);
    gltfClone.creaClonegltf();
    
    //Paso 41
    gltfClone = new classClonegltf("u2x",-5.15,-15.6,-14.15,0,girRad*90,girRad*90,objVis,118);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u2x",5.15,-15.6,-14.15,0,girRad*90,girRad*90,objVis,119);
    gltfClone.creaClonegltf();
    
    //Paso 42
    groupClone = new classClonegroup(-6.45,-30.55,0,0,0,0,objVis,4,120);
    groupClone.creaClonegroup();
    
    //Paso 43
    groupClone = new classClonegroup(6.45,-30.55,0,0,0,0,objVis,4,121);
    groupClone.creaClonegroup();
    
    //Paso 44
    gltfClone = new classClonegltf("u6x",0,-15.55,-1.2,0,girRad*90,girRad*90,objVis,122);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u6x",0,-15.55,8.95,0,girRad*90,girRad*90,objVis,123);
    gltfClone.creaClonegltf();
    
    //Paso 45
    groupClone = new classClonegroup(0,-3,-8.5,0,0,0,objVis,1,124);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(0,-10,3.8,0,0,0,false,3,125);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(0,-10,3.8,0,0,0,false,2,126);
    groupClone.creaClonegroup();
    
    //Paso 46
    //Cuerda para polea simple
    groupCatmull_1 = new THREE.CatmullRomCurve3( [//Todos los puntos ancla de la linea
        //Nudo inicial
        new THREE.Vector3(0,15,12.7),
        //1ra polea
        new THREE.Vector3(0,-9.2,4.5),
        new THREE.Vector3(0,-9.2,2.8),
        //2ta polea
        new THREE.Vector3(0,17,-7),
        new THREE.Vector3(0,17,-8.5),
        //Nudo final
        new THREE.Vector3(0,-1,-8.5)
    ] );
    pointsCatmull_1 = groupCatmull_1.getPoints(8);//Esto hace que la cuerva tenga mas puntos
    geometryTube_1 = new THREE.TubeBufferGeometry(groupCatmull_1, 220, 0.1, 8, false);
    meshTube_1 = new THREE.Mesh(geometryTube_1, ropeMaterial);
    allClones[128] = meshTube_1;//Guarda objeto en array
    allClones[128].visible = false;
    scene.add(meshTube_1);
    
    //Cuerda para polea doble
    groupCatmull_2 = new THREE.CatmullRomCurve3( [//Todos los puntos ancla de la linea
        //Nudo inicial
        new THREE.Vector3(0,15,12.7),
        //1ra polea
        new THREE.Vector3(0,-7.1,6.5),
        new THREE.Vector3(0,-7.1,4.8),
        //2da polea
        new THREE.Vector3(0,17,4.7),
        new THREE.Vector3(0,17,2.8),
        //3ra polea
        new THREE.Vector3(0,-7.1,2.8),
        new THREE.Vector3(0,-7.1,1),
        //4ta polea
        new THREE.Vector3(0,17,-7),
        new THREE.Vector3(0,17,-8.5),
        //Nudo final
        new THREE.Vector3(0,-1,-8.5)
    ] );
    pointsCatmull_2 = groupCatmull_2.getPoints(8);//Esto hace que la cuerva tenga mas puntos
    geometryTube_2 = new THREE.TubeBufferGeometry(groupCatmull_2, 220, 0.1, 8, false);
    meshTube_2 = new THREE.Mesh(geometryTube_2, ropeMaterial);
    allClones[127] = meshTube_2;//Guarda objeto en array
    allClones[127].visible = false;
    scene.add(meshTube_2);
    
    //Oculta todas las piezas y deja solo los grupos y las piezas sueltas finales
    for(i=0; i<=78; i++){
        allClones[i].visible = false;
    }
    
    //Agrega las manos
    gltfClone = new classClonegltf("handleft",5,10.5,-5,girRad*0,-(girRad*120),-(girRad*0),false,129);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("handright",5,10.5,3,-(girRad*0),-(girRad*60),girRad*0,false,130);
    gltfClone.creaClonegltf();
    
    
    console.log(scene);
    
    
    //Texto para las canastas
    
    var labelDiv1 = document.createElement('div');
    labelDiv1.className = 'd_txtA d_txtpoleas1';//Agrega clase
    labelDiv1.textContent = '';
    labelDiv1.setAttribute("id", "txtA");//Agrega id
    cssDiv1 = new THREE.CSS2DObject(labelDiv1);
    cssDiv1.width = 100;
    cssDiv1.height = 100;
    cssDiv1.position.set( 0, 0, 0 );
    cssDiv1.visible = false;
    allClones[126].add(cssDiv1);
    
    var labelDiv2 = document.createElement('div');
    labelDiv2.className = 'd_txtA d_txtpoleas2';//Agrega clase
    labelDiv2.textContent = '';
    labelDiv2.setAttribute("id", "txtA");//Agrega id
    cssDiv2 = new THREE.CSS2DObject(labelDiv2);
    cssDiv2.width = 100;
    cssDiv2.height = 100;
    cssDiv2.position.set( 0, 0, 0 );
    cssDiv2.visible = false;
    allClones[125].add(cssDiv2);
    
    var labelDiv3 = document.createElement('div');
    labelDiv3.className = 'd_txtB d_txtpeso';//Agrega clase
    labelDiv3.textContent = '';
    labelDiv3.setAttribute("id", "txtB");//Agrega id
    cssDiv3 = new THREE.CSS2DObject(labelDiv3);
    cssDiv3.width = 100;
    cssDiv3.height = 100;
    cssDiv3.position.set( 0, 0, 0 );
    cssDiv3.visible = false;
    allClones[124].add(cssDiv3);
    
    
    var setTime = setTimeout(function(){//Un retraso para evitar errores de objetos creados
        pressOnepulley();//Inicia con una polea
        clearTimeout(setTime);//Limpia tiempo
    },100);
    
    
    getData();//Obtiene posiciones originales de canastas y cuerda
    
    raycasterAdd();//Agrega elementos y acciones para raycaster
    eventrayAdd();//Agrega eventos de raycaster
    
    addPhysis();//Agrega fisica 
}
function getData(){
    /*
	* NOMBRE: getData.
	* UTILIDAD: Obtiene posiciones originales de canastas y cuerda
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    //Posicion original de canastas
    posCanastas.A1 = allClones[126].position.y;
    posCanastas.A2 = allClones[125].position.y;
    posCanastas.B = allClones[124].position.y;
    //Posicion riginal de cuerdas
    posCuerdas.one[0] = groupCatmull_1.points[0].y;
    posCuerdas.one[1] = groupCatmull_1.points[1].y;
    posCuerdas.one[2] = groupCatmull_1.points[2].y;
    posCuerdas.one[3] = groupCatmull_1.points[3].y;
    posCuerdas.one[4] = groupCatmull_1.points[4].y;
    posCuerdas.one[5] = groupCatmull_1.points[5].y;
    posCuerdas.two[0] = groupCatmull_2.points[0].y;
    posCuerdas.two[1] = groupCatmull_2.points[1].y;
    posCuerdas.two[2] = groupCatmull_2.points[2].y;
    posCuerdas.two[3] = groupCatmull_2.points[3].y;
    posCuerdas.two[4] = groupCatmull_2.points[4].y;
    posCuerdas.two[5] = groupCatmull_2.points[5].y;
    posCuerdas.two[6] = groupCatmull_2.points[6].y;
    posCuerdas.two[7] = groupCatmull_2.points[7].y;
    posCuerdas.two[8] = groupCatmull_2.points[8].y;
    posCuerdas.two[9] = groupCatmull_2.points[9].y;
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
    canaletaColor = new THREE.Color("rgb(105, 105, 105)");//Color de canaletas fantasmas
    marbleColor = new THREE.Color("rgb(104, 104, 104)");//Asigna color a cada material
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
        .8, // high friction
        .4 // low restitution
    );
    //Canaleta
    for(i=0; i<=9; i++){
        canaletaMaterial[i] = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({color: canaletaColor, transparent:true, opacity: 0, wireframe: true}),
            0.1, // high friction
            0.1 // low restitution
        );
    }
    //Marble
    marbleMaterial = Physijs.createMaterial(
        new THREE.MeshPhongMaterial({color: marbleColor, transparent: false, opacity: 1, wireframe: false, shininess: 5}),
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
    marbleGeometry = new THREE.SphereBufferGeometry(0.8, 30, 30);
    groundGeometry = new THREE.CubeGeometry(1000, 1, 1000);
    canaletaGeometry = new THREE.CubeGeometry(10, 0.2, 10);
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
    groundMesh.position.set(0,-16,0);
    scene.add( groundMesh );
    
    //Base1
    objetoCanaletas[0] = new Physijs.BoxMesh(
        canaletaGeometry,
        canaletaMaterial[0],
        0 // mass
    );
    objetoCanaletas[0].position.set(0,-14.5,3.8);
    objetoCanaletas[0].rotation.set(0,0,0);
    //Side1
    canaletaSide[0] = new Physijs.BoxMesh(
        canaletaGeometry,
        canaletaMaterial[1],
        0 // mass
    );
    canaletaSide[0].position.set(2.5,5,0);
    canaletaSide[0].rotation.set(0,0,girRad*90);
    //Side2
    canaletaSide[1] = new Physijs.BoxMesh(
        canaletaGeometry,
        canaletaMaterial[2],
        0 // mass
    );
    canaletaSide[1].position.set(-2.5,5,0);
    canaletaSide[1].rotation.set(0,0,girRad*90);
    //Side3
    canaletaSide[2] = new Physijs.BoxMesh(
        canaletaGeometry,
        canaletaMaterial[3],
        0 // mass
    );
    canaletaSide[2].position.set(0,5,-2);
    canaletaSide[2].rotation.set(girRad*90,0,0);
    //Side4
    canaletaSide[3] = new Physijs.BoxMesh(
        canaletaGeometry,
        canaletaMaterial[4],
        0 // mass
    );
    canaletaSide[3].position.set(0,5,2);
    canaletaSide[3].rotation.set(girRad*90,0,0);
    //Se agregan los lados a la base 1
    objetoCanaletas[0].add(canaletaSide[0],canaletaSide[1],canaletaSide[2],canaletaSide[3]);
    scene.add(objetoCanaletas[0]);
    
    //Base2
    objetoCanaletas[1] = new Physijs.BoxMesh(
        canaletaGeometry,
        canaletaMaterial[5],
        0 // mass
    );
    objetoCanaletas[1].position.set(0,-7.5,-8.5);
    objetoCanaletas[1].rotation.set(0,0,0);
    //Side1
    canaletaSide[4] = new Physijs.BoxMesh(
        canaletaGeometry,
        canaletaMaterial[6],
        0 // mass
    );
    canaletaSide[4].position.set(2.5,5,0);
    canaletaSide[4].rotation.set(0,0,girRad*90);
    //Side2
    canaletaSide[5] = new Physijs.BoxMesh(
        canaletaGeometry,
        canaletaMaterial[7],
        0 // mass
    );
    canaletaSide[5].position.set(-2.5,5,0);
    canaletaSide[5].rotation.set(0,0,girRad*90);
    //Side3
    canaletaSide[6] = new Physijs.BoxMesh(
        canaletaGeometry,
        canaletaMaterial[8],
        0 // mass
    );
    canaletaSide[6].position.set(0,5,-2);
    canaletaSide[6].rotation.set(girRad*90,0,0);
    //Side4
    canaletaSide[7] = new Physijs.BoxMesh(
        canaletaGeometry,
        canaletaMaterial[9],
        0 // mass
    );
    canaletaSide[7].position.set(0,5,2);
    canaletaSide[7].rotation.set(girRad*90,0,0);
    //Se agregan los lados a la base 2
    objetoCanaletas[1].add(canaletaSide[4],canaletaSide[5],canaletaSide[6],canaletaSide[7]);
    scene.add(objetoCanaletas[1]); 
}
function addMarble(){
    /*
	* NOMBRE: addMarble.
	* UTILIDAD: Agrega los elemento balin
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    addAnima = true;//Activa animacion
    optionMarble = true;//Se agrega una marble nueva
    meshmarblePhysi();//Establece objeto que cae en physis
    $(".d_menupulleys").append('<div class="d_menupulleysblock"></div>');//Bloquea botons
    $(".d_menupulleys").addClass("d_menupulleys_inactive");//Desactiva btns
    var marbleTime = setTimeout(function(){
        $(".d_menupulleysblock").remove();//Desbloquea btns
        $(".d_menupulleys").removeClass("d_menupulleys_inactive");//Habilita btns
    },timeAnima+timeDelay);    
}
function removeMarble(){
    /*
	* NOMBRE: removeMarble.
	* UTILIDAD: Quita los elemento balin
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    addAnima = true;//Activar la animacion
    var marbleDeleted;//Guarda el marble eliminado
    var distancemarbleDeleted;//Guarda distancia de marble a canasta eliminado
    if(pressEvent === "A" && saveMarble.a.length > 0){
        marbleDeleted = saveMarble.a.pop();//Elimina el ultimo marble de A
        distancemarbleDeleted = distanceMarble.a.pop();//Elimina distancia de marble a canasta de A
        scene.remove(marbleDeleted);//Quita de escena el marble eliminado
        delete marbleDeleted;//Elimina objeto marble
    }
    if(pressEvent === "B"  && saveMarble.b.length > 0){
        marbleDeleted = saveMarble.b.pop();//Elimina el ultimo marble de B
        distancemarbleDeleted = distanceMarble.b.pop();//Elimina distancia de marble a canasta de B
        scene.remove(marbleDeleted);//Quita de escena el marble eliminado
        delete marbleDeleted;//Elimina objeto marble
    }
    fixPhysi();//Corrige la fisica de las marble al mover las canastas
    calcWeight();//Saber cuantas marbles hay en cada canasta al remover
    $(".d_menupulleys").append('<div class="d_menupulleysblock"></div>');//Bloquea botons
    $(".d_menupulleys").addClass("d_menupulleys_inactive");//Desactiva btns
    var marbleTime = setTimeout(function(){
        $(".d_menupulleysblock").remove();//Desbloquea btns
        $(".d_menupulleys").removeClass("d_menupulleys_inactive");//Habilita btns
    },timeAnima);
}
function meshmarblePhysi(){
    /*
	* NOMBRE: meshmarblePhysi.
	* UTILIDAD: Establece objeto que cae en physis
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    marbleMesh = new Physijs.SphereMesh(marbleGeometry,marbleMaterial);
    marbleMesh.collisions = 0;
    marbleMesh.name = "marble ";
    marbleMesh.position.set(posMarble[0],posMarble[1],posMarble[2]);//Agrega la posicion del marble
    if(pressEvent === "A"){//Guarda el marble en A
        saveMarble.a.push(marbleMesh);
        allClones[130].visible = true;//Muestra mano derecha
    }
    if(pressEvent === "B"){//Guarda el marble en B
        saveMarble.b.push(marbleMesh);
        allClones[129].visible = true;//Muestra mano izquierda
    }
    marbleMesh.addEventListener( 'collision', handleCollision );//Detecta collision para resolver problemas con la fisica
    scene.add(marbleMesh);//Agrega el marble a la escena
    eventrayRemove();//Quita eventos de raycaster
}
var handleCollision = function( ){
    /*
	* NOMBRE: handleCollision.
	* UTILIDAD: Detecta collision para resolver problemas con la fisica
	* ENTRADAS: action > Saber si se agrega o se quita marble
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    console.log("COLLISION");
    if(optionMarble === true){//Se agrega una marble nueva
        calcWeight();//Saber cuantas marbles hay en cada canasta al agregar
        eventrayAdd();//Agrega eventos de raycaster
        marbleMesh.removeEventListener("collision", handleCollision);//Colisiona una ves y despues deja de hacerlo, hasta que inicie una nueva marble
    }
    fixPhysi();//Corrige la fisica de las marble al mover las canastas
}
function fixPhysi(){
    /*
	* NOMBRE: fixPhysi.
	* UTILIDAD: Corrige la fisica de las marble al mover las canastas
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    marbleMesh.__dirtyPosition = true;
    if(saveMarble.a.length > 0){//Si hay marble en la canasta A
        for(i=0;i<=saveMarble.a.length-1;i++){
            saveMarble.a[i].__dirtyPosition = true;
        }
    }
    if(saveMarble.b.length > 0){//Si hay marble en la canasta B
        for(i=0;i<=saveMarble.b.length-1;i++){
            saveMarble.b[i].__dirtyPosition = true;
        }
    }
}
function calcWeight(){
    /*
	* NOMBRE: calcWeight.
	* UTILIDAD: Saber cuantas marbles hay en cada canasta
	* ENTRADAS: action > Saber si se agrega o se quita marble
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    //Se muestra el texto si alguna canasta tiene marble
    if(saveMarble.a.length >= 0 || saveMarble.b.length >= 0){
        addcountText();//Agrega el texto del conteo en cada canasta
    }else{
        $(".d_txtA, .d_txtB").fadeOut();//Oculta texto
    }
    if(setCanasta === "ONE"){//Inicia animacion para canasta A(1 polea) y B
        if(saveMarble.b.length === (saveMarble.a.length/2)){//Mismo peso canasta A y B
            animatePulley(-6.5,-6.5,-5.7,-5.7,-4,null,null);//Animacion de cuerda, canasta y polea.
        }else if(saveMarble.b.length > (saveMarble.a.length/2)){//Mas peso canasta B
            animatePulley(-2,-11,-1.3,-1.3,-8.5,null,null);//Animacion de cuerda, canasta y polea.
        }else{//Mas peso canasta A
            animatePulley(-10,-3,-9.2,-9.2,-0.5,null,null);//Animacion de cuerda, canasta y polea.
        }
    }
    if(setCanasta === "TWO"){//Inicia animacion para canasta A(2 poleas) y B
        if(saveMarble.b.length === (saveMarble.a.length/4)){//Mismo peso canasta A y B
            animatePulley(-6.5,-6.5,-3.6,-3.6,-3.6,-3.6,-4);//Animacion de cuerda, canasta y polea.
        }else if(saveMarble.b.length > (saveMarble.a.length/4)){//Mas peso canasta B
            animatePulley(-2,-11,0.8,0.8,0.8,0.8,-8.5);//Animacion de cuerda, canasta y polea.
        }else{//Mas peso canasta A
            animatePulley(-10,-3,-7.1,-7.1,-7.1,-7.1,-1);//Animacion de cuerda, canasta y polea.
        }
    }
    optionMarble = false;//Despues de agregar la marble, pasa a no agregar
    btnActions();//Acciones btns de agregar o quitar marble
}
function addcountText(){
    /*
	* NOMBRE: addcountText.
	* UTILIDAD: Agrega el texto del conteo en cada canasta
	* ENTRADAS: action > Saber si se agrega o se quita marble
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    
    $(".d_txtA, .d_txtB").fadeIn();//Muestra texto
    //Canasta A
    $(".d_txtA").text(saveMarble.a.length);//Agrega dato
    $(".d_txtB").text(saveMarble.b.length);//Agrega dato
    
}
function animatePulley(canastaposA,canastaposB,cuerda1,cuerda2,cuerda3,cuerda4,cuerda5){
    /*
	* NOMBRE: animatePulley.
	* UTILIDAD: Animacion de cuerda, canasta y polea.
	* ENTRADAS: canastaposA > Posicion canasta A, canastaposB > Posicion canasta B, cuerda1 > Posicion cuerda 1, cuerda2 > Posicion cuerda 2, cuerda3 > Posicion cuerda 3, cuerda4 > Posicion cuerda 4, cuerda5 > Posicion cuerda 5.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    
    
    $(".d_menupulleys").append('<div class="d_menupulleysblock"></div>');//Agrega bloqueo de menu
    $(".d_menupulleys").addClass("d_menupulleys_inactive");//Desactiva btns
    marbleCollision = true;//Detecta que marble tiene un cambio

    allClones[129].visible = false;//Oculta mano izquierda
    allClones[130].visible = false;//Oculta mano derecha
    
    statusFirst = true;//Porque solo se ocupa una vez en cada collision
    
    //ANIMACION CANASTA (A) (ONE)
    if(setCanasta === "ONE"){
        var animate = new TWEEN.Tween(allClones[126].position)
        .to({
            x: 0,
            y: canastaposA,
            z: 3.8
        },timeAnima)
        .easing(easingType)
        .repeat(0).start();
    }
    //ANIMACION CANASTA (A) (TWO)
    if(setCanasta === "TWO"){
        var animate = new TWEEN.Tween(allClones[125].position)
        .to({
            x: 0,
            y: canastaposA,
            z: 3.8
        },timeAnima)
        .easing(easingType)
        .repeat(0).start();
    }
    //ANIMACION CANASTA (B)
    var animate = new TWEEN.Tween(allClones[124].position)
    .to({
        x: 0,
        y: canastaposB,
        z: -8.5
    },timeAnima)
    .onComplete(function() {
        $(".d_menupulleysblock").remove();//Quita bloqueo de menu
        $(".d_menupulleys").removeClass("d_menupulleys_inactive");//Habilita btns
        marbleCollision = false;//Detecta que marble no tiene cambio
        fixPhysi();//Corrige la fisica de las marble al mover las canastas
    })
    .easing(easingType)
    .repeat(0).start();
    //ANIMACION CUERDA (A) (ONE)
    if(setCanasta === "ONE"){
        var point1 = new TWEEN.Tween(groupCatmull_1.points[1])
        .to({
            x: 0,
            y: cuerda1,
            z: 4.5
        },timeAnima)
        .onStart(function(){

        })
        .onComplete(function(){
            addAnima = false;
        })
        .easing(easingType)
        .repeat(0).start();
        var point2 = new TWEEN.Tween(groupCatmull_1.points[2])
        .to({
            x: 0,
            y: cuerda2,
            z: 2.8
        },timeAnima)
        .easing(easingType)
        .repeat(0).start();
        var point5 = new TWEEN.Tween(groupCatmull_1.points[5])
        .to({
            x: 0,
            y: cuerda3,
            z: -8.5
        },timeAnima)
        .easing(easingType)
        .repeat(0).start();
    }
    //ANIMACION CUERDA (A) (TWO)
    if(setCanasta === "TWO"){
        var point1 = new TWEEN.Tween(groupCatmull_2.points[1])
        .to({
            x: 0,
            y: cuerda1,
            z: 6.5
        },timeAnima)
        .onStart(function(){
            
        })
        .onComplete(function(){
            addAnima = false;
        })
        .easing(easingType)
        .repeat(0).start();
        var point2 = new TWEEN.Tween(groupCatmull_2.points[2])
        .to({
            x: 0,
            y: cuerda2,
            z: 4.8
        },timeAnima)
        .easing(easingType)
        .repeat(0).start();
        var point5 = new TWEEN.Tween(groupCatmull_2.points[5])
        .to({
            x: 0,
            y: cuerda3,
            z: 2.8
        },timeAnima)
        .easing(easingType)
        .repeat(0).start();
        var point6 = new TWEEN.Tween(groupCatmull_2.points[6])
        .to({
            x: 0,
            y: cuerda4,
            z: 1
        },timeAnima)
        .easing(easingType)
        .repeat(0).start();
        var point9 = new TWEEN.Tween(groupCatmull_2.points[9])
        .to({
            x: 0,
            y: cuerda5,
            z: -8.5
        },timeAnima)
        .easing(easingType)
        .repeat(0).start();
    }
}
function pressOnepulley(){
    /*
	* NOMBRE: pressOnepulley.
	* UTILIDAD: Acciones de una sola polea
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    setCanasta = "ONE";//Se selecciona la canasta A
    allClones[125].visible = false;
    allClones[127].visible = false;
    allClones[126].visible = false;
    allClones[128].visible = false;
    allClones[126].visible = true;
    allClones[128].visible = true;
    $("#d_onepulley").addClass("d_inactive");//Desactiva el icono de una polea
    $("#d_twopulley").removeClass("d_inactive");//Activa el icono de dos poleas
    $("#d_onepulley").find("input").prop( "disabled", true );//Desactiva el btn de una polea
    $("#d_twopulley").find("input").prop( "disabled", false );//Activa el btn de dos poleas
    $("#d_addBlock").hide();//Desbloquea agregar balines
    pressEvent = "NONE";//Click en ninguna canasta
    resetActy();//Resetea valores entre canasta de una polea y dos poleas.
    physiFollow();//Objeto phisic sigue la posicion de la canasta
    catmullFollow();//Points catmull siguen la posicion de las puntos clave
    raycasterFollow();//Objeto raycaster sigue la posicion de la canasta
    btnActions();//Acciones btns de agregar o quitar marble
    $("#d_npoleas").text("2");//Numero de poleas en data
    cssDiv1.visible = true;//Muestra info de canasta polea 1
    cssDiv2.visible = false;//Oculta info de canasta polea 1
    cssDiv3.visible = true;//Muestra info de canasta peso
    $(".d_txtA, .d_txtB").text("0");//Agrega dato
}
function pressTwopulley(){
    /*
	* NOMBRE: pressTwopulley.
	* UTILIDAD: Acciones con dos poleas
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    setCanasta = "TWO";//Se selecciona la canasta A
    allClones[125].visible = false;
    allClones[127].visible = false;
    allClones[126].visible = false;
    allClones[128].visible = false;
    allClones[125].visible = true;
    allClones[127].visible = true;
    $("#d_onepulley").removeClass("d_inactive");//Activa el icono de una polea
    $("#d_twopulley").addClass("d_inactive");//Desactiva el icono de dos poleas
    $("#d_onepulley").find("input").prop( "disabled", false );//Activa el btn de una polea
    $("#d_twopulley").find("input").prop( "disabled", true );//Desactiva el btn de dos poleas
    $("#d_addBlock").hide();//Desbloquea agregar balines
    pressEvent = "NONE";//Click en ninguna canasta
    resetActy();//Resetea valores entre canasta de una polea y dos poleas.
    physiFollow();//Objeto phisic sigue la posicion de la canasta
    catmullFollow();//Points catmull siguen la posicion de las puntos clave
    raycasterFollow();//Objeto raycaster sigue la posicion de la canasta
    btnActions();//Acciones btns de agregar o quitar marble
    $("#d_npoleas").text("4");//Numero de poleas en data
    cssDiv1.visible = false;//Oculta info de canasta polea 1
    cssDiv2.visible = true;//Muestra info de canasta polea 1
    cssDiv3.visible = true;//Muestra info de canasta pesode poleas
    $(".d_txtA, .d_txtB").text("0");//Agrega dato
}
function resetActy(){
    /*
	* NOMBRE: resetActy.
	* UTILIDAD: Resetea valores entre canasta de una polea y dos poleas.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    posMarble = [];//Almacena la posicion de marble de acuerdo a la canasta y al numero de poleas
    
    mouseEvent = false;//Almacena si se esta haciendo click en el escenario
    pressEvent;//Guarda si se hace click en la canasta A o B
    
    //Posicion original de canastas
    allClones[126].position.y = posCanastas.A1;
    allClones[125].position.y = posCanastas.A2;
    allClones[124].position.y = posCanastas.B;
    
    //Posicion original de cuerdas
    groupCatmull_1.points[0].y = posCuerdas.one[0];
    groupCatmull_1.points[1].y = posCuerdas.one[1];
    groupCatmull_1.points[2].y = posCuerdas.one[2];
    groupCatmull_1.points[3].y = posCuerdas.one[3];
    groupCatmull_1.points[4].y = posCuerdas.one[4];
    groupCatmull_1.points[5].y = posCuerdas.one[5];
    groupCatmull_2.points[0].y = posCuerdas.two[0];
    groupCatmull_2.points[1].y = posCuerdas.two[1];
    groupCatmull_2.points[2].y = posCuerdas.two[2];
    groupCatmull_2.points[3].y = posCuerdas.two[3];
    groupCatmull_2.points[4].y = posCuerdas.two[4];
    groupCatmull_2.points[5].y = posCuerdas.two[5];
    groupCatmull_2.points[6].y = posCuerdas.two[6];
    groupCatmull_2.points[7].y = posCuerdas.two[7];
    groupCatmull_2.points[8].y = posCuerdas.two[8];
    groupCatmull_2.points[9].y = posCuerdas.two[9];
    
    for(i=0;i<=saveMarble.a.length-1;i++){
        scene.remove(saveMarble.a[i]);//Quita de escena el marble eliminado
        delete saveMarble.a[i];//Elimina objeto marble
    }
    for(i=0;i<=saveMarble.b.length-1;i++){
        scene.remove(saveMarble.b[i]);//Quita de escena el marble eliminado
        delete saveMarble.b[i];//Elimina objeto marble
    }
    
    saveMarble = {a:[],b:[]};//Almacena las marbles que se van agregando a las canastas
    distanceMarble = {a:[],b:[]};//Almacena la distancia de marbles a canasta que se van agregando a las canastas
    
    console.log(objRaycaster[0]);
    
    objRaycaster[0].material.opacity = 0;//Aplica opacidad al objeto A de deteccion raycaster y clic
    objRaycaster[1].material.opacity = 0;//Aplica opacidad al objeto B de deteccion raycaster y clic
    
    $(".d_txtA, .d_txtB").fadeOut();//Oculta texto
}
function raycasterAdd(){
    /*
	* NOMBRE: raycasterAdd.
	* UTILIDAD: Agrega elementos y acciones para raycaster
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    //Agrega objetos para raycaster
    var geometry = new THREE.BoxBufferGeometry( 7, 11, 7 );
    var materialA = new THREE.MeshBasicMaterial( {color: ropeColor, transparent: true, opacity: 0} );
    var materialB = new THREE.MeshBasicMaterial( {color: ropeColor, transparent: true, opacity: 0} );
    objRaycaster[0] = new THREE.Mesh( geometry, materialA );
    objRaycaster[0].position.set(0,-10,3.8);
    objRaycaster[0].name = "CANASTA POLEA"
    scene.add( objRaycaster[0] );
    objRaycaster[1] = new THREE.Mesh( geometry, materialB );
    objRaycaster[1].position.set(0,-3,-8.5);
    objRaycaster[1].name = "CANASTA"
    scene.add( objRaycaster[1] );
    //Agrega accion de raycaster
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
}
function eventrayAdd(){
    /*
	* NOMBRE: eventrayAdd.
	* UTILIDAD: Agrega evento de raycaster
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    //Eventos para mouse y touch
    window.addEventListener('pointermove', onMouseMove, false);
    window.addEventListener('pointerout', clearMouseMove, false);
    window.addEventListener('pointerleave', clearMouseMove, false);
    window.addEventListener('touchstart', onTouchStart, false);
    window.addEventListener('touchleave', clearTouchLeave, false);
}
function eventrayRemove(){
    /*
	* NOMBRE: raycasterRemove.
	* UTILIDAD: Quita evento de raycaster
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    //Eventos para mouse y touch
    window.removeEventListener('pointermove', onMouseMove, false);
    window.removeEventListener('pointerout', clearMouseMove, false);
    window.removeEventListener('pointerleave', clearMouseMove, false);
    window.removeEventListener('touchstart', onTouchStart, false);
    window.removeEventListener('touchleave', clearTouchLeave, false);
}
function onMouseMove( event ) {
    /*
	* NOMBRE: onMouseMove.
	* UTILIDAD: Captura movimiento de mouse
	* ENTRADAS: event > posicion de mouse.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    event.preventDefault();
    var canvasW = $("#d_contegrl").innerWidth();//Alto de canvas
    var canvasH = $("#d_contegrl").innerHeight();//Alto de canvas
    //A event.client se le resta la posicion del canvas
    mouse.x = ( (event.clientX - $("#d_contegrl").position().left) / canvasW ) * 2 - 1;
    mouse.y = - ( (event.clientY - $("#d_contegrl").position().top) / canvasH ) * 2 + 1; 
}
function clearMouseMove() {
    /*
	* NOMBRE: clearMouseMove.
	* UTILIDAD: Limpia osicion de mouse
	* ENTRADAS: event > posicion de mouse.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    mouse.x = -100000;
    mouse.y = -100000;
}
function onTouchStart( event ) {
    /*
	* NOMBRE: onTouchStart.
	* UTILIDAD: Captura movimiento de touch
	* ENTRADAS: event > posicion de touch.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    //mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    //mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    var canvasW = $("#d_contegrl").innerWidth();//Ancho de canvas
    var canvasH = $("#d_contegrl").innerHeight();//Alto de canvas
    //A event.targetTouches[0].page se le resta la posicion del canvas
    mouse.x = +((event.targetTouches[0].pageX - $("#d_contegrl").position().left) / canvasW) * 2 +-1;
    mouse.y = -((event.targetTouches[0].pageY - $("#d_contegrl").position().top) / canvasH) * 2 + 1;
}
function clearTouchLeave() {
    /*
	* NOMBRE: clearTouchLeave.
	* UTILIDAD: Limpia posicion de touch
	* ENTRADAS: event > posicion de touch.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    mouse.x = -100000;
    mouse.y = -100000;
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
        physiFollow();//Objeto phisic sigue la posicion de la canasta
        raycasterFollow();//Objeto raycaster sigue la posicion de la canasta
    }
    raycasterIntersects();//Mouse intersecta con objeto
    if(reajusteAnima === true){//Reajusta canvas si se abre el menu
        reajusteConte3d();//Reajusta el contenido 3d en resize
    }
    if(marbleCollision === true){
        marbleFollow();//Marbles siguen a canasta en su posicion
    }
}
function marbleFollow(){
    /*
	* NOMBRE: marbleFollow.
	* UTILIDAD: Marbles siguen a canasta en su posicion
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(statusFirst === true){//Solo se guarda la distancia una vez de cada marble
        if(setCanasta === "ONE"){//Canasta de 1 polea
            for(i=0;i<=saveMarble.a.length-1;i++){
                distanceMarble.a[i] = saveMarble.a[i].position.y - allClones[126].position.y;//Posicion inicial de cada marble en canasta 1 polea
            }
        }
        if(setCanasta === "TWO"){//Canasta de 2 poleas
            for(i=0;i<=saveMarble.a.length-1;i++){
                distanceMarble.a[i] = saveMarble.a[i].position.y - allClones[125].position.y;//Posicion inicial de cada marble en canasta  2 poleas
            }
        }
        for(i=0;i<=saveMarble.b.length-1;i++){//Canasta sin polea
            distanceMarble.b[i] = saveMarble.b[i].position.y - allClones[124].position.y;//Posicion inicial de cada marble en canasta sin polea
        }
        statusFirst = false;//Porque solo se ocupa una vez en cada collision
    }
    if(setCanasta === "ONE"){//Canasta de 1 polea
        for(i=0;i<=saveMarble.a.length-1;i++){
            saveMarble.a[i].position.y = allClones[126].position.y + distanceMarble.a[i];//Marbles siguen a canasta 1 polea
        }
    }
    if(setCanasta === "TWO"){//Canasta de 2 poleas
        for(i=0;i<=saveMarble.a.length-1;i++){
            saveMarble.a[i].position.y = allClones[125].position.y + distanceMarble.a[i];//Marbles siguen a canasta 2 poleas
        }
    }
    for(i=0;i<=saveMarble.b.length-1;i++){//Canasta sin polea
        saveMarble.b[i].position.y = allClones[124].position.y + distanceMarble.b[i];//Marbles siguen a canasta sin poleas
    }
}
function catmullFollow(){
    /*
	* NOMBRE: catmullFollow.
	* UTILIDAD: Points catmull siguen la posicion de las puntos clave
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    //Animacion tubo cuerda una polea
    var newCable1 = new THREE.TubeBufferGeometry(meshTube_1.geometry.parameters.path, 220, 0.1, 8, false);
    meshTube_1.geometry.copy(newCable1);
    meshTube_1.geometry.needsUpdate = true;
    //Animacion tubo cuerda dos poleas
    var newCable2 = new THREE.TubeBufferGeometry(meshTube_2.geometry.parameters.path, 220, 0.1, 8, false);
    meshTube_2.geometry.copy(newCable2);
    meshTube_2.geometry.needsUpdate = true;
}
function physiFollow(){
    /*
	* NOMBRE: physiFollow.
	* UTILIDAD: Objeto phisic sigue la posicion de la canasta
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    objetoCanaletas[1].position.y = allClones[124].position.y-2.5;//Canaleta physi sigue a la canasta
    if(setCanasta === "ONE"){
        objetoCanaletas[0].position.y = allClones[126].position.y-2.5;//Canaleta physi sigue a la canasta
    }
    if(setCanasta === "TWO"){
        objetoCanaletas[0].position.y = allClones[125].position.y-4.5;//Canaleta physi sigue a la canasta
    }
    objetoCanaletas[0].__dirtyPosition = true;//Actualiza posicion de canasta en physi
    objetoCanaletas[1].__dirtyPosition = true;//Actualiza posicion de canasta en physi
}
function raycasterFollow(){
    /*
	* NOMBRE: raycasterFollow.
	* UTILIDAD: Objeto raycaster sigue la posicion de la canasta
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(setCanasta === "ONE"){
        objRaycaster[0].position.y = allClones[126].position.y;//Raycaster object sigue a canasta
    }
    if(setCanasta === "TWO"){
        objRaycaster[0].position.y = allClones[125].position.y;//Raycaster object sigue a canasta
    }
    objRaycaster[1].position.y = allClones[124].position.y;//Raycaster object sigue a canasta
}
function raycasterIntersects(){
    /*
	* NOMBRE: raycasterIntersects.
	* UTILIDAD: Mouse intersecta con objeto
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    raycaster.setFromCamera(mouse,camera);//Inicia el racaster
	var intersects = raycaster.intersectObjects(objRaycaster);//Interseccion de raycaster
    
    $("#d_contegrlcanvas").on('touchstart pointerdown', function(e) {
        e.preventDefault();
        mouseEvent = true;//Se hace click
    });
    $("#d_contegrlcanvas").on('touchend pointerup', function(e) {
        e.preventDefault();
        mouseEvent = false;//NO se hace click
    });
    if(intersects.length > 0){
        $("#d_contegrlcanvas").css({"cursor":"pointer"});//Agrega manita a cursor
    }else{
        $("#d_contegrlcanvas").css({"cursor":"default"});//Quita manita a cursor
    }
    if(intersects.length > 0 && mouseEvent === true){//Click dentro de objetos
        if(intersects[0].object.name === "CANASTA POLEA"){//Click canasta con poleas
            pressEvent = "A";//Click en canasta A
            setActivate(0.25,0);//Aplica opacidad a objeto de deteccion de raycaster y clic
            posMarblepulley();//Cambia la posicion de marble de acuerdo a las poleas de la canasta
            btnActions();//Acciones btns de agregar o quitar marble
        }
        else if(intersects[0].object.name === "CANASTA"){//Click canasta sin poleas
            pressEvent = "B";//Click en canasta B
            setActivate(0,0.25);//Aplica opacidad a objeto de deteccion de raycaster y clic
            posMarble = [1.2,10,-7.7];//Agrega la posicion de marble al caer en canasta A o B
            btnActions();//Acciones btns de agregar o quitar marble
        }
        mouseEvent = false;//Sirve para salir del click (el raycaster esta en setAnimation y se repite varias veces)
    }
    if(mouseEvent === true){//Click fuera de objetos
        //console.log("OUT");
        pressEvent = "NONE";//Click en ninguna canasta
        setActivate(0,0);//Aplica opacidad a objeto de deteccion de raycaster y clic
        mouseEvent = false;//Sirve para salir del click (el raycaster esta en setAnimation y se repite varias veces)
        btnActions();//Acciones btns de agregar o quitar marble
    }
}
function btnActions(){
    /*
	* NOMBRE: btnActions.
	* UTILIDAD: Acciones btns de agregar o quitar marble
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(pressEvent === "A"){
        $(".d_menupulleyaddmarble").removeClass("d_inactive");//Activa el btn de marble
        $("#d_addMarble").prop( "disabled", false );//Activa btn de marble
        if(saveMarble.a.length > 0){
            $(".d_menupulleyremovemarble").removeClass("d_inactive");//Activa el btn de marble
            $("#d_removeMarble").prop( "disabled", false );//Activa btn de marble
        }else{
            $(".d_menupulleyremovemarble").addClass("d_inactive");//Desactiva el btn de marble
            $("#d_removeMarble").prop( "disabled", true );//Desactiva btn de marble
        }
        //Bloquea en la capacidad maxima de las canastas
        if(saveMarble.a.length >= 16){
            $("#d_addBlock").show();//Bloquea agregar balines
            $(".d_menupulleyaddmarble").addClass("d_inactive");//Desactiva el btn de marble
        }else{
            $("#d_addBlock").hide();//Desbloquea agregar balines
            $(".d_menupulleyaddmarble").removeClass("d_inactive");//Activa el btn de marble
        }
    }
    if(pressEvent === "B"){
        $(".d_menupulleyaddmarble").removeClass("d_inactive");//Activa el btn de marble
        $("#d_addMarble").prop( "disabled", false );//Activa btn de marble
        if(saveMarble.b.length > 0){
            $(".d_menupulleyremovemarble").removeClass("d_inactive");//Activa el btn de marble
            $("#d_removeMarble").prop( "disabled", false );//Activa btn de marble
        }else{
            $(".d_menupulleyremovemarble").addClass("d_inactive");//Desactiva el btn de marble
            $("#d_removeMarble").prop( "disabled", true );//Desactiva btn de marble
        }
        //Bloquea en la capacidad maxima de las canastas
        if(saveMarble.b.length >= 16){
            $("#d_addBlock").show();//Bloquea agregar balines
            $(".d_menupulleyaddmarble").addClass("d_inactive");//Desactiva el btn de marble
        }else{
            $("#d_addBlock").hide();//Desbloquea agregar balines
            $(".d_menupulleyaddmarble").removeClass("d_inactive");//Activa el btn de marble
        }
    }
    if(pressEvent === "NONE"){
        $(".d_menupulleyaddmarble").addClass("d_inactive");//Desactiva el btn de marble
        $(".d_menupulleyremovemarble").addClass("d_inactive");//Desactiva el btn de marble
        $("#d_addMarble, #d_removeMarble").prop( "disabled", true );//Desactiva btn de marble
    }
}
function setActivate(opacityA,opacityB){
    /*
	* NOMBRE: setActivate.
	* UTILIDAD: Aplica opacidad a objeto de deteccion de raycaster y clic
	* ENTRADAS: opacityA > opacidad de canasta A, opacityB > opacidad de canasta B.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    objRaycaster[0].material.opacity = opacityA;//Aplica opacidad al objeto A de deteccion raycaster y clic
    objRaycaster[1].material.opacity = opacityB;//Aplica opacidad al objeto B de deteccion raycaster y clic
}
function posMarblepulley(){
    /*
	* NOMBRE: posMarblepulley.
	* UTILIDAD: Cambia la posicion de marble de acuerdo a las oleas de la canasta
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(setCanasta === "ONE"){//Cambia la posicion de caida de marble de acuerdo al numero de poleas
        posMarble = [1.2,10,2.8];//Agrega la posicion de marble al caer en canasta A o B
    }
    if(setCanasta === "TWO"){//Cambia la posicion de caida de marble de acuerdo al numero de poleas
        posMarble = [1.2,10,3.5];//Agrega la posicion de marble al caer en canasta A o B
    }
}