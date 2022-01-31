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
setCamerapos = [60,10,30];//Establece la posicion de la camara
setScenepos = [0,-9,0];//Establece la posicion de la camara
gridPosy = -1;//Posicion de la reticula en cada modelo
setRope = true;//Establece si hay animacion para cuerda
slidesInd = null;//Cantidad de vistas para indicaciones
var guidePoint = [];//Guia para mover la cuerda
var addAnima = false;//Indica si se esta animando la cuerda
var marbleAnima = false;//Activar animacion de marble siguiendo canasta
var canastaAnima = false;//Animacion de la canasta
var throwAnima = false;//Animacion de lanzamiento de marble
var newEffectinout = TWEEN.Easing.Quadratic.InOut;//Efecto ease para tween
var timeGrade = 0;//Angulo de giro de la palanca
var numForce = 0;//Numero de fuerza de acuerdo a las barras
var groundMaterial, marbleMaterial, canaletaMaterial = [],popoteMaterial;//Materials phisi
var marbleColor, canaletaColor, groundCcolor;//Colors phisi
var canaletaSide = [];//Guarda las caras de canaletas phisis
var objetoCanaleta;//Guarda las canaletas phisis
var marbleGeometry, groundGeometry, canaletaGeometry, sideGeometry, popoteGeometry;//Geometry phisi
var marbleMesh, groundMesh, popoteMesh, canaletaMesh;//Mesh phisi
var incCollision = false;//Almacena si hay una nueva marble, para que exista solo una collision
var centerPoint = {x: 0,y: 0,z: 0}//Punto central del circulo de lanzamiento
var circunPoint = {x: 0,y: 30,z: 0}//Circunferencia del circulo de lanzamiento
var gradosGiro = 1;//Cada cuantos grados hay un cilindro
var addGrades = 90;//Grado donde inicia la rotacion
var addRotmarble = 1;//Giro de marble en su propio eje
var pushObj;//Objeto para empujar a marble al final de la animacion
var saveData = {//Centro del circulo y grado de soltar marble
    center:[0,-50,-160,-380,-940],//Centro del circulo
    gradeIn:[5,1.9,0.8,0.5,0.3],//Grados para restar e inicio de marble
    velGrade:[2,1,1,0.5,0.5],//Velocidad de de marble al seguir la circunferencia
    angleGrade:[45,90,90,180,180],//Anguloque va en relacion a la velocidad de marble
    posPushbox:[20,52,92,141,228]//Posicion en Z de pushObj para la caida de marble (para que rebote)
};
var moveTime;//Tiempo que pasa despues de ser lanzado el objeto
var getMove = false;//Movimiento de marble hasta el final
var cameraOption = "near";//Indica si la camara esta en la palanca o en los objetos lanzados
var posFar = [50,100,450];//Distancia de la camara de los objetos
var saveMarble = [];//Almacena los objetos lanzados
var savepaperBall = [];//Almacena los objetos lanzados paperball
var paperBall = false;//Almacena si paperball sigue marble
var addpaperBall;//Almacena paperBall
var strongLevel = 0;//Fuerza de la barra
var animaLever = false;//Animacion de bajar palanca
var endLever = false;//Detecta si la animacion de bajar palanca termino
addReflexion = [
    "¿Por qué el cubo no quedó a la misma distancia en todas las ocasiones? ",
    "¿Cuál es la distancia promedio de tus 5 lanzamientos?",
    "¿Qué sucede si cambiamos el peso del objeto?",
    "¿Qué sucede si cambias el ángulo de inclinación del brazo de la catapulta?",
    "¿A qué ángulo crees que se alcance la máxima distancia?",
    "¿Qué pasaría si lanzamos dos objetos con el mismo peso pero de diferente forma o tamaño?",
    "Con tu modelo físico realiza tu experimento al aire libre y en un espacio cerrado. ¿Cuáles son las diferencias?"
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
    
    //Paso 1
    gltfClone = new classClonegltf("b7x1",1.3,-0.5,-3.2,0,0,girRad*90,objVis,0);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b7x1",-1.3,-0.5,-3.2,0,0,girRad*90,objVis,1);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u2x",0,-1.5,-3.2,0,girRad*90,girRad*90,objVis,2);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u2x",0,-0.5,1.3,0,girRad*90,0,objVis,3);
    gltfClone.creaClonegltf();
    
    //Paso 2
    gltfClone = new classClonegltf("u2x",0,0.5,-1.9,0,girRad*90,-(girRad*90),objVis,4);
    gltfClone.creaClonegltf();
    
    //Paso 3
    gltfClone = new classClonegltf("bu3x",1.6,-0.5,-8.2,0,0,girRad*90,objVis,5);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("bu3x",-1.6,-0.5,-8.2,0,0,girRad*90,objVis,6);
    gltfClone.creaClonegltf();
    
    //Paso 4
    meshClone = new classCloneshape("straw",0,-0.5,-5.77,0,0,girRad*90,6.5,objVis,7);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-1,-6.43,0,0,girRad*90,6.5,objVis,8);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-0.5,-7.08,0,0,girRad*90,6.5,objVis,9);
    meshClone.creaClonemesh();
    
    //Paso 5
    gltfClone = new classClonegltf("b11x1",1.3,-0.5,-15.82,0,0,girRad*90,objVis,10);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",-1.3,-0.5,-15.82,0,0,girRad*90,objVis,11);
    gltfClone.creaClonegltf();
    
    //Paso 6
    meshClone = new classCloneshape("straw",0,-0.5,-9.36,0,0,girRad*90,6.5,objVis,12);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-1,-10,0,0,girRad*90,6.5,objVis,13);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-0.5,-10.65,0,0,girRad*90,6.5,objVis,14);
    meshClone.creaClonemesh();
    
    //Paso 7
    gltfClone = new classClonegltf("u2x",0,-1.5,-13.23,0,girRad*90,girRad*90,objVis,15);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u2x",0,-1.5,-18.4,0,girRad*90,girRad*90,objVis,16);
    gltfClone.creaClonegltf();
    
    //Paso 8
    gltfClone = new classClonegltf("hang8",0,0,-19.06,-(girRad*90),0,girRad*90,objVis,17);
    gltfClone.creaClonegltf();
    /****Agrega objeto como guia de la cuerda****/
    guidePoint[0] = new THREE.Mesh(//Punto guia para la cuerda
        new THREE.SphereGeometry( 0.5, 32, 32 ),
        new THREE.MeshBasicMaterial({color:0xffff00,transparent:true,opacity:0})
    );
    guidePoint[0].position.x = -0.8;
    guidePoint[0].name = "Point1";
    allClones[17].add(guidePoint[0]);
    /*******************************************/
    
    //Paso 9
    meshClone = new classCloneshape("straw",0,0,-19.06,0,0,girRad*90,6.5,objVis,18);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("stick",0,0,-19.06,0,0,girRad*90,7.3,objVis,19);
    meshClone.creaClonemesh();

    //Paso 10
    gltfClone = new classClonegltf("b4x3",0,-0.5,-25.5,0,0,0,objVis,20);
    gltfClone.creaClonegltf();
    /****Agrega objeto como guia de la cuerda****/
    guidePoint[2] = new THREE.Mesh(//Punto guia para la cuerda
        new THREE.SphereGeometry( 0.5, 32, 32 ),
        new THREE.MeshBasicMaterial({color:0xffff00,transparent:true,opacity:0})
    );
    guidePoint[2].position.set(0,2,0);
    guidePoint[2].name = "Point3";
    allClones[20].add(guidePoint[2]);
    /*******************************************/
    
    //Paso 11
    gltfClone = new classClonegltf("uLcorto",-2.3,-0.15,-23.55,0,girRad*90,-(girRad*90),objVis,21);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uLcorto",-2.3,-0.15,-27.45,0,girRad*90,-(girRad*90),objVis,22);
    gltfClone.creaClonegltf();
    
    //Paso 12
    gltfClone = new classClonegltf("b4x1",-2.6,1.23,-25.5,0,0,girRad*90,objVis,23);
    gltfClone.creaClonegltf();
    
    //Paso 13
    gltfClone = new classClonegltf("uLcorto",2.3,-0.15,-23.55,0,-(girRad*90),-(girRad*90),objVis,24);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uLcorto",2.3,-0.15,-27.45,0,-(girRad*90),-(girRad*90),objVis,25);
    gltfClone.creaClonegltf();
    
    //Paso 14
    gltfClone = new classClonegltf("b4x1",2.6,1.23,-25.5,0,0,girRad*90,objVis,26);
    gltfClone.creaClonegltf();
    
    //Paso 15
    gltfClone = new classClonegltf("u2x",0,0.5,-22.28,0,girRad*90,-(girRad*90),objVis,27);
    gltfClone.creaClonegltf();
    
    shapeGroup = new classGroup([[0,27]],objVis,0);
    shapeGroup.creaGroup();
    
    //Paso 16
    gltfClone = new classClonegltf("u3x",0,0,1.3,0,girRad*90,-(girRad*90),objVis,28);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,0,-1.3,0,girRad*90,-(girRad*90),objVis,29);
    gltfClone.creaClonegltf();

    gltfClone = new classClonegltf("u4x",1.3,0,0,0,0,-(girRad*90),objVis,30);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u4x",-1.3,0,0,0,0,-(girRad*90),objVis,31);
    gltfClone.creaClonegltf();
    
    //Paso 17
    gltfClone = new classClonegltf("u6x",0,0,3.85,0,girRad*90,girRad*90,objVis,32);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u6x",0,0,-3.85,0,girRad*90,girRad*90,objVis,33);
    gltfClone.creaClonegltf();
    
    //Paso 18
    gltfClone = new classClonegltf("u5x",2.58,0,-6.45,0,0,girRad*90,objVis,34);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u5x",-2.58,0,-6.45,0,0,girRad*90,objVis,35);
    gltfClone.creaClonegltf();
    
    //Paso 19
    gltfClone = new classClonegltf("u4x",2.58,0,5.16,0,0,girRad*90,objVis,36);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u4x",-2.58,0,5.16,0,0,girRad*90,objVis,37);
    gltfClone.creaClonegltf();
    
    //Paso 20
    gltfClone = new classClonegltf("b11x1",6.43,1,2.53,0,0,girRad*90,objVis,38);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",-6.43,1,2.53,0,0,girRad*90,objVis,39);
    gltfClone.creaClonegltf();
    
    //Paso 21
    gltfClone = new classClonegltf("b7x4",3.85,2.6,0,0,0,girRad*90,objVis,40);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b7x4",-3.85,2.6,0,0,0,girRad*90,objVis,41);
    gltfClone.creaClonegltf();
    
    //Paso 22
    gltfClone = new classClonegltf("u4x",0,1.95,4.55,0,girRad*90,0,objVis,42);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u4x",0,3.25,4.55,0,girRad*90,0,objVis,43);
    gltfClone.creaClonegltf();
    
    //Paso 23
    gltfClone = new classClonegltf("b4x3",4.15,5.18,0,0,0,girRad*90,objVis,44);
    gltfClone.creaClonegltf();
    
    //Paso 24
    meshClone = new classCloneshape("straw",3.15,4.54,1.3,0,0,girRad*90,3.9,objVis,45);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",3.15,3.9,0.65,0,0,girRad*90,3.9,objVis,46);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",3.15,3.9,-0.65,0,0,girRad*90,3.9,objVis,47);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",3.15,4.54,-1.3,0,0,girRad*90,3.9,objVis,48);
    meshClone.creaClonemesh();
    
    //Paso 25
    gltfClone = new classClonegltf("b4x3",-4.15,5.18,0,0,0,girRad*90,objVis,49);
    gltfClone.creaClonegltf();
    
    //Paso 26
    meshClone = new classCloneshape("straw",-3.15,4.54,1.3,0,0,girRad*90,3.9,objVis,50);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",-3.15,3.9,0.65,0,0,girRad*90,3.9,objVis,51);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",-3.15,3.9,-0.65,0,0,girRad*90,3.9,objVis,52);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",-3.15,4.54,-1.3,0,0,girRad*90,3.9,objVis,53);
    meshClone.creaClonemesh();
    
    //Paso 27
    meshClone = new classCloneshape("stick",0,4.54,1.3,0,0,girRad*90,11,objVis,54);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("stick",0,4.54,-1.3,0,0,girRad*90,11,objVis,55);
    meshClone.creaClonemesh();
    
    //Paso 28
    gltfClone = new classClonegltf("u4x",0,0,-10.3,0,girRad*90,-(girRad*90),objVis,56);
    gltfClone.creaClonegltf();
    
    //Paso 29
    gltfClone = new classClonegltf("b7x4",0,2.6,6.4,0,girRad*90,girRad*90,objVis,57);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b7x4",0,2.6,9,0,girRad*90,girRad*90,objVis,58);
    gltfClone.creaClonegltf();
    
    //Paso 30
    meshClone = new classCloneshape("straw",0,2.6,8.8,girRad*90,0,0,6.5,objVis,59);
    meshClone.creaClonemesh();
    
    //Paso 31
    gltfClone = new classClonegltf("topeL9mm",0,2.6,9.65,0,girRad*90,-(girRad*90),objVis,60);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("arrow",0,3.73,10.3,0,girRad*90,-(girRad*90),objVis,61);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",0,2.6,11,0,girRad*90,-(girRad*90),objVis,62);
    gltfClone.creaClonegltf();
    
    //Paso 32
    gltfClone = new classClonegltf("b7x4",0,7.8,3.85,0,girRad*90,girRad*90,objVis,63);
    gltfClone.creaClonegltf();
    
    //Paso 33
    gltfClone = new classClonegltf("u1x",3.9,10.4,4.47,0,0,-(girRad*90),objVis,64);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u1x",1.3,10.4,4.47,0,0,-(girRad*90),objVis,65);
    gltfClone.creaClonegltf();
    
    //Paso 34
    gltfClone = new classClonegltf("b4x3",3.25,12.35,5.15,0,girRad*90,girRad*90,objVis,66);
    gltfClone.creaClonegltf();
    
    //Paso 35
    gltfClone = new classClonegltf("u1x",-3.9,10.4,4.47,0,0,-(girRad*90),objVis,67);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u1x",-1.3,10.4,4.47,0,0,-(girRad*90),objVis,68);
    gltfClone.creaClonegltf();
    
    //Paso 36
    gltfClone = new classClonegltf("b4x3",-3.25,12.35,5.15,0,girRad*90,girRad*90,objVis,69);
    gltfClone.creaClonegltf();
    
    //Paso 37
    gltfClone = new classClonegltf("arrow",9.65,1,11.1,girRad*90,girRad*90,girRad*90,objVis,70);
    gltfClone.creaClonegltf();
    
    //Paso 38
    gltfClone = new classClonegltf("arrow",-9.65,1,11.1,girRad*90,girRad*90,girRad*90,objVis,71);
    gltfClone.creaClonegltf();
    
    //Paso 39
    gltfClone = new classClonegltf("hsmall",6.42,2.55,6.44,girRad*90,0,0,objVis,72);
    gltfClone.creaClonegltf();
    
    //Paso 40
    gltfClone = new classClonegltf("uLcorto",6.42,3.5,6.78,0,0,girRad*90,objVis,73);
    gltfClone.creaClonegltf();
    
    //Paso 41
    gltfClone = new classClonegltf("arrow",9.65,3.85,8.6,girRad*90,girRad*90,girRad*90,objVis,74);
    gltfClone.creaClonegltf();
    
    //Paso 42
    gltfClone = new classClonegltf("hsmall",-6.42,2.55,6.44,girRad*90,0,0,objVis,75);
    gltfClone.creaClonegltf();
    
    //Paso 43
    gltfClone = new classClonegltf("uLcorto",-6.42,3.5,6.78,0,0,girRad*90,objVis,76);
    gltfClone.creaClonegltf();
    
    //Paso 44
    gltfClone = new classClonegltf("arrow",-9.65,3.85,8.6,girRad*90,girRad*90,girRad*90,objVis,77);
    gltfClone.creaClonegltf();
    
    //Paso 45
    gltfClone = new classClonegltf("hang8",0,6.47,-1.95,girRad*180,0,girRad*90,objVis,78);
    gltfClone.creaClonegltf();
    /****Agrega objeto como guia de la cuerda****/
    guidePoint[1] = new THREE.Mesh(//Punto guia para la cuerda
        new THREE.SphereGeometry( 0.5, 32, 32 ),
        new THREE.MeshBasicMaterial({color:0xffff00,transparent:true,opacity:0})
    );
    guidePoint[1].position.x = -0.8;
    guidePoint[1].name = "Point2";
    allClones[78].add(guidePoint[1]);
    /*******************************************/
    
    //Paso 46
    meshClone = new classCloneshape("straw",0,6.47,-1.95,0,0,girRad*90,9.75,objVis,79);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("stick",0,6.47,-1.95,0,0,girRad*90,11,objVis,80);
    meshClone.creaClonemesh();
    
    //Paso 47
    gltfClone = new classClonegltf("u2x",4.15,6.45,-2.6,0,girRad*90,0,objVis,81);
    gltfClone.creaClonegltf();
    
    //Paso 48
    gltfClone = new classClonegltf("u2x",-4.15,6.45,-2.6,0,girRad*90,0,objVis,82);
    gltfClone.creaClonegltf();
    
    //Paso 49
    gltfClone = new classClonegltf("topeL9mm",3.21,4.55,-3.9,girRad*180,0,girRad*90,objVis,83);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",2.43,4.55,-3.9,girRad*180,0,girRad*90,objVis,84);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",1.79,4.55,-3.9,girRad*180,0,girRad*90,objVis,85);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",-1.79,4.55,-3.9,girRad*180,0,girRad*90,objVis,86);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",-2.43,4.55,-3.9,girRad*180,0,girRad*90,objVis,87);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",-3.21,4.55,-3.9,girRad*180,0,girRad*90,objVis,88);
    gltfClone.creaClonegltf();

    groupClone = new classClonegroup(0,4.55,-3.9,girRad*84,0,0,objVis,0,89);
    groupClone.creaClonegroup();

    //Paso 50
    meshClone = new classCloneshape("straw",0,4.55,-3.9,0,0,girRad*90,9.75,objVis,90);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("stick",0,4.55,-3.9,0,0,girRad*90,11,objVis,91);
    meshClone.creaClonemesh();
    
    //Paso 51
    gltfClone = new classClonegltf("hsmall",2.58,0.5,-11.6,girRad*90,0,0,objVis,92);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-2.58,0.5,-11.6,girRad*90,0,0,objVis,93);
    gltfClone.creaClonegltf();
    
    //Paso 52
    gltfClone = new classClonegltf("hsmall",2.58,1.52,-11.6,girRad*90,0,girRad*90,objVis,94);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-2.58,1.52,-11.6,girRad*90,0,girRad*90,objVis,95);
    gltfClone.creaClonegltf();
    
    //Paso 53
    gltfClone = new classClonegltf("u3x",0,2,-11.6,0,girRad*90,-(girRad*90),objVis,96);
    gltfClone.creaClonegltf();
    
    //Paso 54
    groupCatmull = new THREE.CatmullRomCurve3( [//Todos los puntos ancla de la linea
        //Inicio
        new THREE.Vector3(0,22.6,-5.9),
        new THREE.Vector3(0.3,22.6,-5.9),
        //Medio
        new THREE.Vector3(0.3,7.3,-2.1),
        new THREE.Vector3(-0.3,7.3,-2.1),
        //Final
        new THREE.Vector3(-0.3,22.6,-5.9),
        new THREE.Vector3(0,22.6,-5.9),
    ]);
    pointsCatmull = groupCatmull.getPoints( 8 );//Esto hace que la cuerva tenga mas puntos
    geometryTube = new THREE.TubeBufferGeometry(groupCatmull, 220, 0.1, 8, false);
    meshTube = new THREE.Mesh(geometryTube, ropeMaterial);
    meshTube.name = "rope";
    allClones[97] = meshTube;//Guarda objeto en array
    scene.add(meshTube);
    
    //Oculta todas las piezas y deja solo los grupos y las piezas sueltas finales
    for(i=0; i<=27; i++){
        allClones[i].visible = false;
    }
    
    //Hands
    gltfClone = new classClonegltf("handleft",0,0,0,0,-(girRad*90),0,false,98);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("handright",0,0,0,0,0,0,false,99);
    gltfClone.creaClonegltf();
    
    gltfClone = new classClonegltf("paperBall",0,0,0,0,0,0,false,100);
    gltfClone.creaClonegltf();
    
    velControl();//Control de velocidad y accion de las manos
    addPhysis();//Agrega fisica
    
    //Objeto para empujar a marble al final de la animacion de la palanca
    pushObj = new Physijs.BoxMesh(
        new THREE.CubeGeometry(15, 25, 20),
        canaletaMaterial[5],
        0 // mass
    );
    pushObj.visible = true;
    scene.add( pushObj );
}
function velControl(){
    /*
	* NOMBRE: velControl.
	* UTILIDAD: Control de velocidad y accion de las manos
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    $(".d_forceopcbtn").on("mousedown touchstart",function(e){
        e.preventDefault();//Previene el tooltip de touchstart.
        console.log("PRESS");

        
        
        animaLever = true;//Activa animacion de bajar palanca
        addAnima = true;//Activa animacion de cuerda
    });
    $(".d_forceopcbtn").on("mouseup touchend",function(e){
        e.preventDefault();//Previene el tooltip de touchstart.
        console.log("UP");
        var dataGet = 0;//Valor para romper barra 1,3,5
        
        dataGet = Math.ceil((strongLevel*5)/96);//(Fuerza aplicada * maximo dataGet) / maximo fuerza aplicada
        //dataGet = (strongLevel*5)/96;//(Fuerza aplicada * maximo dataGet) / maximo fuerza aplicada
        console.log(dataGet);
        /*
        if(strongLevel >= 0 && strongLevel < 19){//La fuerza va de 0 a 36
            dataGet = 1;//Valor para romper barra 1
        }
        if(strongLevel >= 19 && strongLevel < 38){//La fuerza va de 40 a 68
            dataGet = 2;//Valor para romper barra 3
        }
        if(strongLevel >= 38 && strongLevel < 56){//La fuerza va de 72 a 96
            dataGet = 3;//Valor para romper barra 5
        }
        if(strongLevel >= 56 && strongLevel < 75){//La fuerza va de 72 a 96
            dataGet = 4;//Valor para romper barra 5
        }
        if(strongLevel >= 75 && strongLevel <= 96){//La fuerza va de 72 a 96
            dataGet = 5;//Valor para romper barra 5
        }
        */
        timeGrade = 75-(15*dataGet);//Angulo de giro de la palanaca
        numForce = dataGet;//Numero de fuerza de acuerdo a las barras
        
        strongLevel = 0;//Resetea fuerza de barra
        dataLevertense()//Datos de la palanca al tensar
        $(".d_forceopc").append('<div class="d_forceopcblock"></div>');//Agrega bloquea de btns
        $(".d_forceopc").addClass("d_forceopc_inactive");//Deshabilita btns
        endLever = true;//Animacion de bajar palanca SI termino
    });
    
}
function dataLevertense(){
    /*
	* NOMBRE: dataLevertense.
	* UTILIDAD: Datos de la palanca al tensar
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    $("#d_forceopcbtnright").addClass("d_forceopcbtn_active");//Agrega activo al icono
    centerPoint = {x: 0,y: saveData.center[numForce-1],z: 0};//Punto central del circulo de lanzamiento
    addGrades = addGrades+saveData.gradeIn[numForce-1];//Grado donde inicia la rotacion
    gradosGiro = saveData.velGrade[numForce-1];//Cada cuantos grados hay un cilindro
    addGrades = saveData.angleGrade[numForce-1];//Grado donde inicia la rotacion
    pushObj.position.set(0,0,saveData.posPushbox[numForce-1]);//Posicion de pushObj en relacion a la fuerza aplicada
    pushObj.__dirtyPosition = true;//Actualiza posicion de marble
    clearTimeout(moveTime);//Limpia tiempo del objeto despues de ser lanzado
    getMove = false;//Movimiento de marble hasta el final
    $("#d_distancia").text("--");//Distancia de lanzamiento al html
    $("#d_angulo").text("--");//Agrega el angulo de inclinacion
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
    marbleColor = new THREE.Color("rgb(248, 104, 229)");//Asigna color a cada material
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
    //Canaleta
    for(i=0; i<=5; i++){
        canaletaMaterial[i] = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({color: canaletaColor, transparent:true, opacity: 0, wireframe: true}),
            0.1, // high friction
            0.1 // low restitution
        );
    }
    //Marble
    marbleMaterial = Physijs.createMaterial(
        new THREE.MeshPhongMaterial({color: marbleColor, transparent: true, opacity: 0, wireframe: true, shininess: 5}),
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
    marbleGeometry = new THREE.OctahedronGeometry(2, 0);
    groundGeometry = new THREE.CubeGeometry(1000, 1, 1000);
    canaletaGeometry = new THREE.CubeGeometry(6, 0.5, 6);
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
    groundMesh.position.set(0,-1,0);
    scene.add( groundMesh );
    
    //Base1
    objetoCanaleta = new Physijs.BoxMesh(
        canaletaGeometry,
        canaletaMaterial[0],
        0 // mass
    );
    objetoCanaleta.position.set(0,14.5,0);
    objetoCanaleta.rotation.set(0,0,0);
    //Side1
    canaletaSide[0] = new Physijs.BoxMesh(
        sideGeometry,
        canaletaMaterial[1],
        0 // mass
    );
    canaletaSide[0].position.set(2.5,1,0);
    canaletaSide[0].rotation.set(girRad*90,0,girRad*90);
    //Side2
    canaletaSide[1] = new Physijs.BoxMesh(
        sideGeometry,
        canaletaMaterial[2],
        0 // mass
    );
    canaletaSide[1].position.set(-2.5,1,0);
    canaletaSide[1].rotation.set(girRad*90,0,girRad*90);
    //Side3
    canaletaSide[2] = new Physijs.BoxMesh(
        sideGeometry,
        canaletaMaterial[3],
        0 // mass
    );
    canaletaSide[2].position.set(0,1,-2.5);
    canaletaSide[2].rotation.set(girRad*90,0,0);
    //Side1
    canaletaSide[3] = new Physijs.BoxMesh(
        sideGeometry,
        canaletaMaterial[4],
        0 // mass
    );
    canaletaSide[3].position.set(0,1,2.5);
    canaletaSide[3].rotation.set(girRad*90,0,0);
    
    //Se agregan los lados a la base 1
    objetoCanaleta.add(canaletaSide[0],canaletaSide[1],canaletaSide[2],canaletaSide[3]);
    scene.add(objetoCanaleta);
}
function meshmarblePhysi(){
    /*
	* NOMBRE: meshmarblePhysi.
	* UTILIDAD: Establece objeto que cae en physis
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    marbleMesh = new Physijs.ConvexMesh(marbleGeometry,marbleMaterial);
    marbleMesh.collisions = 0;
    marbleMesh.name = "marble";
    marbleMesh.position.set(0,allClones[89].children[20].getWorldPosition(new THREE.Vector3()).y+20,allClones[89].children[20].getWorldPosition(new THREE.Vector3()).z+2);//Agrega la posicion del marble
    incCollision = true;//Cuando agrega un nuevo marble, hay una nueva collision
    marbleMesh.addEventListener( 'collision', handleCollision );//Detecta collision para resolver problemas con la fisica
    scene.add(marbleMesh);//Agrega el marble a la escena
    saveMarble.push(marbleMesh);
    allClones[98].visible = true;//Muestra mano
    allClones[98].position.set(4,allClones[89].children[20].getWorldPosition(new THREE.Vector3()).y+22,allClones[89].children[20].getWorldPosition(new THREE.Vector3()).z+4);//Agrega la posicion de hand
    
    //Agrega paperball
    addpaperBall = allClones[100].clone();//Clona paerball para cada marble
    addpaperBall.visible = true;//Visible
    scene.add(addpaperBall);//Agrega a scena
    savepaperBall.push(addpaperBall);
    paperBall = true;//Paper ball sigue marble
    
    $(".d_forceopcclean").removeClass("d_forceopcclean_desc");//Activa boton clean
}
var handleCollision = function( ){
    /*
	* NOMBRE: handleCollision.
	* UTILIDAD: Detecta collision para resolver problemas con la fisica
	* ENTRADAS: action > Saber si se agrega o se quita marble
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(incCollision === true){//Solo hay una collision
        fixPhysi();//Corrige la fisica de las marble al mover las canastas
        animateLeverthrow();//Animacion de la palanca al lanzar
        incCollision = false;//Se sale de la collision, para que no se repita varias veces
    }
}
function fixPhysi(){
    /*
	* NOMBRE: fixPhysi.
	* UTILIDAD: Corrige la fisica de las marble al mover las canastas
	* ENTRADAS: action > Saber si se agrega o se quita marble
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    marbleMesh.__dirtyPosition = true;
    marbleMesh.__dirtyRotation = true;
    objetoCanaleta.__dirtyPosition = true;
    objetoCanaleta.__dirtyRotation = true;
}
function cleanData(){
    /*
	* NOMBRE: cleanData.
	* UTILIDAD: Limpia datos
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    console.log("CLEAN");
    $("#d_distancia").text("--");//Distancia de lanzamiento al html
    $("#d_angulo").text("--");//Agrega el angulo de inclinacion
    $("#d_forceopcbtnright").find("input").prop('disabled', true);//Deshabilita el btn de mano
    $(".d_forceopcbtn").removeClass("d_forceopcinput_active");//Quita clase para deshabilitar btn de mano
    $(".d_forceopcline").removeClass("d_forceopcline_activo");//Desactiva todo lo seleccionado
    $(".d_forceopcclean").addClass("d_forceopcclean_desc");//Desactiva boton clean
    $(".d_forceopcclean").append('<div class="d_forceopccleanblock"></div>');//Bloquea btn clean
    for(i=0;i<=saveMarble.length-1;i++){
        scene.remove(saveMarble[i]);//Quita de escena el marble eliminado
        delete saveMarble[i];//Elimina objeto marble
        
    }
    for(i=0;i<=savepaperBall.length-1;i++){
        scene.remove(savepaperBall[i]);//Quita de escena el marble eliminado
        delete savepaperBall[i];//Elimina objeto marble
    }
    saveMarble = [];//Almacena los objetos lanzados
    savepaperBall = [];//Almacena los objetos lanzados paperball
}
function cameraPos(){
    /*
	* NOMBRE: cameraPos.
	* UTILIDAD: Cambia la posicion de la camara
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(cameraOption === "far"){//
        var cameraPos = new TWEEN.Tween(camera.position)
        .to({
            x: 60,
            y: 10,
            z: 30
        },2000)
        .onStart(function(){
            $(".d_forceopc").append('<div class="d_forceopcblock"></div>');//Agrega bloquea de btns
            $(".d_forceopc").addClass("d_forceopc_inactive");//Deshabilita btns
        })
        .onComplete(function(){
            $(".d_forceopcblock").remove();//Quita bloquea de btns
            $(".d_forceopc").removeClass("d_forceopc_inactive");//Habilita btns
            paperBall = false;//Paper ball NO sigue marble
        })
        .easing(newEffectinout)
        .start();
        cameraOption = "near";//La camara pasa a palanca
    }else{
        var cameraPos = new TWEEN.Tween(camera.position)
        .to({
            x: posFar[0],
            y: posFar[1],
            z: posFar[2]
        },2000)
        .onStart(function(){
            $(".d_forceopc").append('<div class="d_forceopcblock"></div>');//Agrega bloquea de btns
            $(".d_forceopc").addClass("d_forceopc_inactive");//Deshabilita btns
        })
        .onComplete(function(){
            $(".d_forceopcblock").remove();//Quita bloquea de btns
            $(".d_forceopc").removeClass("d_forceopc_inactive");//Habilita btns
            paperBall = false;//Paper ball NO sigue marble
        })
        .easing(newEffectinout)
        .start();
        cameraOption = "far";//La camara pasa a objetos lanzados
    }
}
function animateLeverthrow(){
    /*
	* NOMBRE: animateLeverthrow.
	* UTILIDAD: Animacion de la palanca al lanzar
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    //Palanca 
    var palanca = new TWEEN.Tween(allClones[89].rotation)
    .to({
        x: girRad*84,
        y: 0,
        z: 0
    },1000-(numForce*150))
    .onComplete(function(){
        marbleAnima = false;//Quita animacion de marble siguiendo a canasta
        addAnima = false;//Quita animacion de cuerda
        throwAnima = true;//Inicia la animacion de marble lanzandose
        catmullFollow();//Points catmull siguen la posicion de las puntos clave
        marbleFollow();//Marble phisic sigue la posicion de la canasta
        $("#d_forceopcbtnright").removeClass("d_forceopcbtn_active");//Quita activo al icon
        getMove = true;//Movimiento de marble hasta el final
        moveTime = setTimeout(function(){
            $(".d_forceopcblock").remove();//Quita bloquea de btns
            $(".d_forceopc").removeClass("d_forceopc_inactive");//Habilita btns
            paperBall = false;//Paper ball NO sigue marble
            getMove = false;//Movimiento de marble hasta el final
            clearTimeout(moveTime);//Limpia tiempo del objeto despues de ser lanzado
        },5000);
        $(".d_footerbtngirscrewstrongline").css({"left":"0%"});//Resetea fuerza barra div
    })
    .onStart(function(){
        marbleAnima = true;//Activa animacion de marble siguiendo canasta
        addAnima = true;//Activa animacion de cuerda
        allClones[99].visible = false;//Oculta hand
    })
    .delay((cameraOption === "near")?3000:0)
    .easing(newEffectinout)
    .start(); 
    
    //Giro hang8
    var giro2 = new TWEEN.Tween(allClones[78].rotation)
    .to({
        x: girRad*180,
        y: 0,
        z: girRad*90
    },1000-(numForce*150))
    .onComplete(function(){
    })
    .delay((cameraOption === "near")?3000:0)
    .easing(newEffectinout)
    .start();  
    
    //Giro camara
    var cameraPos = new TWEEN.Tween(camera.position)
    .to({
        x: (cameraOption === "near")?70-(10*numForce):posFar[0],
        y: (cameraOption === "near")?20:posFar[1],
        z: (cameraOption === "near")?-60:posFar[2]
    },2000)
    .onComplete(function(){
        console.log(camera.position);
    })
    .onStart(function(){
        allClones[98].visible = false;//Oculta mano 
    })
    .delay((cameraOption === "near")?1000:0)
    .easing(newEffectinout)
    .start();
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
        handFollow();//Hand sigue la posicion de la canasta
    }
    if(marbleAnima === true){
        marbleFollow();//Marble phisic sigue la posicion de la canasta
    }
    if(canastaAnima === true){
        physiFollow();//Objeto phisic sigue la posicion de la canasta 
    }
    if(throwAnima === true){
        addGrades--;//Incrementa grados
        addRotmarble = addRotmarble+1;
        var rotacion = (addGrades*gradosGiro) * Math.PI/180;//Cada cuando hace el giro marble
        var cos = Math.cos(rotacion);//Obtiene el giro
        var sin = Math.sin(rotacion);//Obtiene el giro
        //Objetos circulo centro
        var pCenter = girarPunto(circunPoint,centerPoint);//Se crea el objeto con las coordenadas en Y y Z del giro
        marbleMesh.position.set(0,pCenter.y,pCenter.z);//Le asigna la posicion del marble al lanzarse
        //marbleMesh.rotation.set(girRad*addRotmarble,-girRad*addRotmarble,girRad*(addRotmarble*2));//Le asigna la rotacion de marble al lanzarse
        
        function girarPunto(p,centro){
            /*
            * NOMBRE: girarPunto.
            * UTILIDAD: Clase para crear la posicion dentro de la circunferencia del giro
            * ENTRADAS: p > punto de inicio de la circunferencia. centro > centro de la circunferencia
            * SALIDAS: Ninguna.
            * VARIABLES: Ninguna
            */
            return{//Regresa la posicion en X y Z dentro de la circunferencia
              y: centro.y + (p.y - centro.y) * sin - (p.z - centro.z) * sin,
              z: centro.z + (p.y - centro.y) * cos + (p.z - centro.z) * cos
            }
        }
        //marbleMesh.rotation.set(0,0,0);//Le asigna la rotacion de marble al lanzarse
        //Detecta antes de llegar al suelo para que haga phisics con ayuda de pushObj
        if(marbleMesh.position.y <= 3){
            throwAnima = false;//Desactiva animacion de lanzamiento
            marbleMesh.__dirtyPosition = true;//Actualiza posicion de marble
            marbleMesh.__dirtyRotation = true;//Actualiza rotacion de marble
            addGrades = 90;//Grado donde inicia la rotacion
        }
    }
    if(reajusteAnima === true){//Reajusta canvas si se abre el menu
        reajusteConte3d();//Reajusta el contenido 3d en resize
    }
    if(getMove === true){
        getDistance();//Obtiene la distancia del objeto al ser lanzado
    }
    if(paperBall === true){//Paperball sigue marble
        //console.log("************paperBall");
        addpaperBall.position.x = marbleMesh.position.x;
        addpaperBall.position.y = marbleMesh.position.y;
        addpaperBall.position.z = marbleMesh.position.z;
        addpaperBall.rotation.x = marbleMesh.rotation.x;
        addpaperBall.rotation.y = marbleMesh.rotation.y;
        addpaperBall.rotation.z = marbleMesh.rotation.z;
    }
    if(animaLever === true){//Animacion de bajar palanca
        console.log("ANIMA LEVER");
        if(strongLevel < 93){//Ultimo valor antes de que barra llegue a 96 (se realizo aqui la animacion, porque con setinterval, el tiempo es diferente al de la actualizacion del render)
            strongLevel = strongLevel+0.64;//Incrementa valor de barra de fuerza
            allClones[78].rotation.x = allClones[78].rotation.x-0.01;//Rotacion hang8
            allClones[89].rotation.x = allClones[89].rotation.x-0.01;//Rotacion lever
            $("#d_angulo").text(Math.round((90-(allClones[89].rotation.x * 180/Math.PI)))+"º");//Agrega el angulo de inclinacion
            $(".d_footerbtngirscrewstrongline").css({"left":strongLevel+"%"});//Asigna fuerza barra div
            canastaAnima = true;//Activa animacion de canasta
            allClones[99].visible = true;//Muestra hand
        }else{
            animaLever = false;//Cancela animacion de bajar palanca
            addAnima = false;//Quita animacion de cuerda
            canastaAnima = false;//Desactiva animacion de canasta
        }
    }
    if(endLever === true){//Termina animacion de bajar palanca
        console.log("END ANIMA");
        animaLever = false;//Cancela animacion de bajar palanca
        addAnima = false;//Quita animacion de cuerda
        canastaAnima = false;//Desactiva animacion de canasta
        meshmarblePhysi();//Establece objeto que cae en physis
        endLever = false;//Resetea terminar animacion bajar palanca
        $("#d_angulo").text("90º");//Agrega el angulo de inclinacion
    }
}
function getDistance(){
    /*
	* NOMBRE: getDistance.
	* UTILIDAD: Obtiene la distancia del objeto al ser lanzado
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    var roundDistance = Math.ceil(marbleMesh.position.z);//Guarda la distancia del objeto desde donde fue lanzado
    $("#d_distancia").text(roundDistance+" cm");//Distancia de lanzamiento al html
}
function handFollow(){
    /*
	* NOMBRE: handFollow.
	* UTILIDAD: Hand sigue la posicion de la canasta
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    allClones[99].position.x = allClones[89].children[20].children[1].getWorldPosition(new THREE.Vector3()).x-7;
    allClones[99].position.y = allClones[89].children[20].children[1].getWorldPosition(new THREE.Vector3()).y-setScenepos[1]+2;
    allClones[99].position.z = allClones[89].children[20].children[1].getWorldPosition(new THREE.Vector3()).z-7;
}
function marbleFollow(){
    /*
	* NOMBRE: marbleFollow.
	* UTILIDAD: Marble phisic sigue la posicion de la canasta
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    
    marbleMesh.position.x = allClones[89].children[20].children[1].getWorldPosition(new THREE.Vector3()).x;
    marbleMesh.position.y = allClones[89].children[20].children[1].getWorldPosition(new THREE.Vector3()).y-setScenepos[1];
    marbleMesh.position.z = allClones[89].children[20].children[1].getWorldPosition(new THREE.Vector3()).z+4;

    marbleMesh.rotation.x = allClones[89].children[20].children[1].getWorldQuaternion(new THREE.Quaternion()).x;
    marbleMesh.rotation.y = allClones[89].children[20].children[1].getWorldQuaternion(new THREE.Quaternion()).y;
    marbleMesh.rotation.z = allClones[89].children[20].children[1].getWorldQuaternion(new THREE.Quaternion()).z;

    marbleMesh.__dirtyPosition = true;
    marbleMesh.__dirtyRotation = true;
}
function physiFollow(){
    /*
	* NOMBRE: physiFollow.
	* UTILIDAD: Objeto phisic sigue la posicion de la canasta
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */

    objetoCanaleta.position.x = allClones[89].children[20].getWorldPosition(new THREE.Vector3()).x;
    objetoCanaleta.position.y = allClones[89].children[20].getWorldPosition(new THREE.Vector3()).y-setScenepos[1];
    objetoCanaleta.position.z = allClones[89].children[20].getWorldPosition(new THREE.Vector3()).z;

    objetoCanaleta.rotation.x = allClones[89].children[20].getWorldQuaternion(new THREE.Quaternion()).x;
    objetoCanaleta.rotation.y = allClones[89].children[20].getWorldQuaternion(new THREE.Quaternion()).y;
    objetoCanaleta.rotation.z = allClones[89].children[20].getWorldQuaternion(new THREE.Quaternion()).z;

    objetoCanaleta.__dirtyPosition = true;
    objetoCanaleta.__dirtyRotation = true;
}
function catmullFollow(){
    /*
	* NOMBRE: catmullFollow.
	* UTILIDAD: Points catmull siguen la posicion de las puntos clave
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    
    meshTube.geometry.parameters.path.points[0].y = allClones[89].children[17].children[3].getWorldPosition(new THREE.Vector3()).y+9;
    meshTube.geometry.parameters.path.points[0].z = allClones[89].children[17].children[3].getWorldPosition(new THREE.Vector3()).z;

    meshTube.geometry.parameters.path.points[1].y = allClones[89].children[17].children[3].getWorldPosition(new THREE.Vector3()).y+9;
    meshTube.geometry.parameters.path.points[1].z = allClones[89].children[17].children[3].getWorldPosition(new THREE.Vector3()).z;

    meshTube.geometry.parameters.path.points[2].y = allClones[78].children[3].getWorldPosition(new THREE.Vector3()).y+9,
    meshTube.geometry.parameters.path.points[2].z = allClones[78].children[3].getWorldPosition(new THREE.Vector3()).z,

    meshTube.geometry.parameters.path.points[3].y = allClones[78].children[3].getWorldPosition(new THREE.Vector3()).y+9,
    meshTube.geometry.parameters.path.points[3].z = allClones[78].children[3].getWorldPosition(new THREE.Vector3()).z,

    meshTube.geometry.parameters.path.points[4].y = allClones[89].children[17].children[3].getWorldPosition(new THREE.Vector3()).y+9;
    meshTube.geometry.parameters.path.points[4].z = allClones[89].children[17].children[3].getWorldPosition(new THREE.Vector3()).z;

    meshTube.geometry.parameters.path.points[5].y = allClones[89].children[17].children[3].getWorldPosition(new THREE.Vector3()).y+9;
    meshTube.geometry.parameters.path.points[5].z = allClones[89].children[17].children[3].getWorldPosition(new THREE.Vector3()).z;
    
    //Actualizacion de geometria
    var newCable = new THREE.TubeBufferGeometry(meshTube.geometry.parameters.path, 220, 0.1, 8, false);
    meshTube.geometry.copy(newCable);
    meshTube.geometry.needsUpdate = true;
}