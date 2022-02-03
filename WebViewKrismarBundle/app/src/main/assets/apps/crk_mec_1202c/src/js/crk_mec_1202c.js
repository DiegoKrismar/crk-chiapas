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
setCamerapos = [50,20,50];//Establece la posicion de la camara
setScenepos = [0,-14,-8];//Establece la posicion de la camara
gridPosy = -0.5;//Posicion de la reticula en cada modelo
slidesInd = 4;//Cantidad de vistas para indicaciones

var groundMaterial, marbleMaterial, canaletaMaterial = [],popoteMaterial;//Materials phisi
var marbleColor, canaletaColor, groundCcolor;//Colors phisi

var marbleGeometry, groundGeometry, canaletaGeometry,popoteGeometry;//Geometry phisi
var marbleMesh, groundMesh, popoteMesh, canaletaMesh;//Mesh phisi
var starAnimation = false;//Saber si camera va a seguir a marble o no
var pressBtn;//Btn de material usado
var canaletaSide = [];//Guarda las canaletas phisis
var frictionCanaleta;//Friction de canaleta
var restitutionCanaleta;//Retitution de canaleta
var newSetmaterial = false;//Indica si se asigna un nuevo material a canaleta y marble
var marbleTypematerial ;//Define el typo de material
var timeGrl = 2000;//Tiempo general para animaciones
var velCalc;//Distancia recorrida en 1000
var intervalTime;//Intervalo de 1000 para la velocidad
var fallIncl = 0;//Guarda la inclinacion de la caida del objeto
var easingType = TWEEN.Easing.Quadratic.InOut;//Efecto ease
addReflexion = [
    "¿Qué variaciones notas en el tiempo?",
    "¿Existe una variación en el tiempo de caída cuando es el mismo objeto?",
    "¿Qué se debería modificar para que el tiempo de bajada sea mayor (o menor)?",
    "¿Qué provoca que exista un cambio de dirección en la ruta de caída del balín?",
    "Si la trayectoria fuera del doble de distancia ¿tardaría el doble de tiempo?",
    "¿Qué sucedería si la inclinación de las rampas fuera mayor?",
    "¿Qué crees que sucedería si el material del plano inclinado fuera otro (vidrio, metal, tela, etc.)?"
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
    gltfClone = new classClonegltf("b7x4",2.6,2.6,14.1,0,0,turn90,objVis,0);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b7x4",-2.6,2.6,14.1,0,0,turn90,objVis,1);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u4x",0,0,10.2,-turn90,turn90,0,objVis,2);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u4x",0,0,18,-turn90,turn90,0,objVis,3);
    gltfClone.creaClonegltf();
    //Paso 2
    gltfClone = new classClonegltf("hsmall",2.6,0.65,9,0,0,0,objVis,4);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-2.6,0.65,9,0,0,0,objVis,5);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",2.6,4.55,9,0,0,0,objVis,6);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-2.6,4.55,9,0,0,0,objVis,7);
    gltfClone.creaClonegltf();
    //Paso 3
    gltfClone = new classClonegltf("b7x4",2.6,2.6,3.9,0,0,turn90,objVis,8);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b7x4",-2.6,2.6,3.9,0,0,turn90,objVis,9);
    gltfClone.creaClonegltf();
    //Paso 4
    gltfClone = new classClonegltf("u4x",0,0,0,-turn90,turn90,0,objVis,10);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u4x",0,0,7.8,-turn90,turn90,0,objVis,11);
    gltfClone.creaClonegltf();
    //Paso 5
    gltfClone = new classClonegltf("hsmall",2.6,0.65,-1.2,0,0,0,objVis,12);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-2.6,0.65,-1.2,0,0,0,objVis,13);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",2.6,4.55,-1.2,0,0,0,objVis,14);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-2.6,4.55,-1.2,0,0,0,objVis,15);
    gltfClone.creaClonegltf();
    //Paso 6
    gltfClone = new classClonegltf("b7x4",2.6,2.6,-6.3,0,0,turn90,objVis,16);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b7x4",-2.6,2.6,-6.3,0,0,turn90,objVis,17);
    gltfClone.creaClonegltf();
    //Paso 7
    gltfClone = new classClonegltf("u4x",0,0,-10.2,-turn90,turn90,0,objVis,18);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u4x",0,0,-2.4,-turn90,turn90,0,objVis,19);
    gltfClone.creaClonegltf();
    //Paso 8
    gltfClone = new classClonegltf("hsmall",2.6,0.65,-11.4,0,0,0,objVis,20);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-2.6,0.65,-11.4,0,0,0,objVis,21);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",2.6,4.55,-11.4,0,0,0,objVis,22);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-2.6,4.55,-11.4,0,0,0,objVis,23);
    gltfClone.creaClonegltf();
    //Paso 9
    gltfClone = new classClonegltf("b7x4",2.6,2.6,-16.5,0,0,turn90,objVis,24);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b7x4",-2.6,2.6,-16.5,0,0,turn90,objVis,25);
    gltfClone.creaClonegltf();
    //Paso 10
    gltfClone = new classClonegltf("u4x",0,0,-20.4,-turn90,turn90,0,objVis,26);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u4x",0,0,-12.6,-turn90,turn90,0,objVis,27);
    gltfClone.creaClonegltf();
    //Paso 11
    gltfClone = new classClonegltf("hsmall",2.6,5.7,-20.4,turn90,0,0,objVis,28);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-2.6,5.7,-20.4,turn90,0,0,objVis,29);
    gltfClone.creaClonegltf();
    //Paso 12
    gltfClone = new classClonegltf("b11x1",2.6,13.4,-20.4,turn90,0,turn90,objVis,30);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",-2.6,13.4,-20.4,turn90,0,turn90,objVis,31);
    gltfClone.creaClonegltf();
    //Paso 13
    gltfClone = new classClonegltf("u3x",0,6.9,-21.4,0,-turn90,0,objVis,32);
    gltfClone.creaClonegltf();
    //Paso 14
    gltfClone = new classClonegltf("hsmall",2.6,5.7,-8.9,turn90,0,0,objVis,33);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-2.6,5.7,-8.9,turn90,0,0,objVis,34);
    gltfClone.creaClonegltf();
    //Paso 15
    gltfClone = new classClonegltf("b11x1",2.6,13.4,-8.9,turn90,0,turn90,objVis,35);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",-2.6,13.4,-8.9,turn90,0,turn90,objVis,36);
    gltfClone.creaClonegltf();
    //Paso 16
    gltfClone = new classClonegltf("u3x",0,19.9,-7.9,0,turn90,0,objVis,37);
    gltfClone.creaClonegltf();
    //Paso 17
    gltfClone = new classClonegltf("flexLarge",0,9.48,-15.85,-(girRad*2),0,0,objVis,38);
    gltfClone.creaClonegltf();
    //Paso 18
    meshClone = new classCloneshape("straw",0,10.15,-9.4,0,0,girRad*90,9.75,objVis,39);
    meshClone.creaClonemesh();
    //Paso 19
    gltfClone = new classClonegltf("hsmall",2.6,5.7,16.7,turn90,0,0,objVis,40);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-2.6,5.7,16.7,turn90,0,0,objVis,41);
    gltfClone.creaClonegltf();
    //Paso 20
    gltfClone = new classClonegltf("flexLarge",0,3.1,21.72,(girRad*9),0,0,objVis,42);
    gltfClone.creaClonegltf();
    //Paso 21
    meshClone = new classCloneshape("straw",0,4.55,15.4,0,0,girRad*90,9.75,objVis,43);
    meshClone.creaClonemesh();
    //Paso 22
    gltfClone = new classClonegltf("b11x1",2.6,13.4,16.7,turn90,0,turn90,objVis,44);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",-2.6,13.4,16.7,turn90,0,turn90,objVis,45);
    gltfClone.creaClonegltf();
    //Paso 23
    gltfClone = new classClonegltf("hsmall",2.6,5.7,6.5,turn90,0,0,objVis,46);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-2.6,5.7,6.5,turn90,0,0,objVis,47);
    gltfClone.creaClonegltf();
    //Paso 24
    gltfClone = new classClonegltf("b11x1",2.6,13.4,6.5,turn90,0,turn90,objVis,48);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",-2.6,13.4,6.5,turn90,0,turn90,objVis,49);
    gltfClone.creaClonegltf();
    //Paso 25
    gltfClone = new classClonegltf("u3x",0,19.9,5.5,0,-turn90,0,objVis,50);
    gltfClone.creaClonegltf();
    //Paso 26
    gltfClone = new classClonegltf("flexLarge",0,8.6,12.3,(girRad*10),0,0,objVis,51);
    gltfClone.creaClonegltf();
    //Paso 27
    meshClone = new classCloneshape("straw",0,10.17,6,0,0,girRad*90,9.75,objVis,52);
    meshClone.creaClonemesh();
    //Paso 28
    gltfClone = new classClonegltf("u3x",0,19.9,17.7,0,turn90,0,objVis,53);
    gltfClone.creaClonegltf();
    //Paso 29
    gltfClone = new classClonegltf("hsmall",2.6,5.7,-2.4,turn90,0,0,objVis,54);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-2.6,5.7,-2.4,turn90,0,0,objVis,55);
    gltfClone.creaClonegltf();
    //Paso 30
    gltfClone = new classClonegltf("b11x1",2.6,13.4,-2.4,turn90,0,turn90,objVis,56);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",-2.6,13.4,-2.4,turn90,0,turn90,objVis,57);
    gltfClone.creaClonegltf();
    //Paso 31
    gltfClone = new classClonegltf("u3x",0,19.9,-3.4,0,-turn90,0,objVis,58);
    gltfClone.creaClonegltf();
    //Paso 32
    gltfClone = new classClonegltf("flexLarge",0,13.62,-1.9,0,0,0,objVis,59);
    gltfClone.creaClonegltf();
    //Paso 33
    meshClone = new classCloneshape("straw",0,14.05,-1.9,0,0,girRad*90,9.75,objVis,60);
    meshClone.creaClonemesh();
    
    //Paso 34
    gltfClone = new classClonegltf("hlarge",2.6,21.85,16.7,turn90,0,0,objVis,61);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hlarge",-2.6,21.85,16.7,turn90,0,0,objVis,62);
    gltfClone.creaClonegltf();
    //Paso 35
    gltfClone = new classClonegltf("b11x1",2.6,30.3,16.7,turn90,0,turn90,objVis,63);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",-2.6,30.3,16.7,turn90,0,turn90,objVis,64);
    gltfClone.creaClonegltf();
    //Paso 36
    gltfClone = new classClonegltf("hlarge",2.6,21.85,6.5,turn90,0,0,objVis,65);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hlarge",-2.6,21.85,6.5,turn90,0,0,objVis,66);
    gltfClone.creaClonegltf();
    //Paso 37
    gltfClone = new classClonegltf("b11x1",2.6,30.3,6.5,turn90,0,turn90,objVis,67);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",-2.6,30.3,6.5,turn90,0,turn90,objVis,68);
    gltfClone.creaClonegltf();
    //Paso 38
    gltfClone = new classClonegltf("u3x",0,37.4,16.7,-turn90,turn90,0,objVis,69);
    gltfClone.creaClonegltf();
    //Paso 39
    gltfClone = new classClonegltf("u3x",0,37.4,6.5,-turn90,turn90,0,objVis,70);
    gltfClone.creaClonegltf();
    //Paso 40
    gltfClone = new classClonegltf("flexLarge",0,24.1,10.63,-(girRad*17),0,0,objVis,71);
    gltfClone.creaClonegltf();
    //Paso 41
    meshClone = new classCloneshape("straw",0,26.42,16.69,0,0,girRad*90,9.75,objVis,72);
    meshClone.creaClonemesh();
    
    //Paso 42
    gltfClone = new classClonegltf("hlarge",2.6,21.85,-2.4,turn90,0,0,objVis,73);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hlarge",-2.6,21.85,-2.4,turn90,0,0,objVis,74);
    gltfClone.creaClonegltf();
    //Paso 43
    gltfClone = new classClonegltf("b11x1",2.6,30.3,-2.4,turn90,0,turn90,objVis,75);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",-2.6,30.3,-2.4,turn90,0,turn90,objVis,76);
    gltfClone.creaClonegltf();
    //Paso 44
    gltfClone = new classClonegltf("u3x",0,26.4,-1.4,0,turn90,0,objVis,77);
    gltfClone.creaClonegltf();
    //Paso 45
    gltfClone = new classClonegltf("hlarge",2.6,21.85,-8.9,turn90,0,0,objVis,78);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hlarge",-2.6,21.85,-8.9,turn90,0,0,objVis,79);
    gltfClone.creaClonegltf();
    //Paso 46
    gltfClone = new classClonegltf("b11x1",2.6,30.3,-8.9,turn90,0,turn90,objVis,80);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",-2.6,30.3,-8.9,turn90,0,turn90,objVis,81);
    gltfClone.creaClonegltf();
    //Paso 47
    gltfClone = new classClonegltf("u3x",0,37.4,-8.9,-turn90,turn90,0,objVis,82);
    gltfClone.creaClonegltf();
    //Paso 48
    gltfClone = new classClonegltf("flexLarge",0,28.77,-1.98,(girRad*4),0,0,objVis,83);
    gltfClone.creaClonegltf();
    //Paso 49
    meshClone = new classCloneshape("straw",0,29.65,-8.4,0,0,girRad*90,9.75,objVis,84);
    meshClone.creaClonemesh();//Paso 43
    //Paso 50
    gltfClone = new classClonegltf("u3x",0,37.4,-2.4,-turn90,turn90,0,objVis,85);
    gltfClone.creaClonegltf();
    //Paso 51
    gltfClone = new classClonegltf("u3x",0,31.6,-9.9,0,-turn90,0,objVis,86);
    gltfClone.creaClonegltf();
    //Paso 52
    gltfClone = new classClonegltf("hlarge",2.6,21.85,-20.4,turn90,0,0,objVis,87);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hlarge",-2.6,21.85,-20.4,turn90,0,0,objVis,88);
    gltfClone.creaClonegltf();
    //Paso 53
    gltfClone = new classClonegltf("b11x1",2.6,30.3,-20.4,turn90,0,turn90,objVis,89);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",-2.6,30.3,-20.4,turn90,0,turn90,objVis,90);
    gltfClone.creaClonegltf();
    //Paso 54
    gltfClone = new classClonegltf("u3x",0,31.6,-21.4,turn180,turn90,0,objVis,91);
    gltfClone.creaClonegltf();
    //Paso 55
    gltfClone = new classClonegltf("flexLarge",0,34.43,-14,(girRad*5.5),0,0,objVis,92);
    gltfClone.creaClonegltf();
    //Paso 56
    meshClone = new classCloneshape("straw",0,35.5,-20.4,0,0,girRad*90,9.75,objVis,93);
    meshClone.creaClonemesh();
    
    //Hand
    gltfClone = new classClonegltf("handright",0,48,-20,-(girRad*40),-(girRad*90),0,false,94);
    gltfClone.creaClonegltf();
    
    addPhysis();//Agrega fisica
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
    addMarble();//Agrega los elemento de rebote como canicas
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
}
function materialPhysi(){
    /*
	* NOMBRE: materialPhysi.
	* UTILIDAD: Material para simulacion physi
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    // Ground
    groundMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({color: groundCcolor,transparent:true, opacity: 0}),
        .8, // high friction
        .4 // low restitution
    );
    //Canaleta y popote
    for(i=0; i<=6; i++){
        canaletaMaterial[i] = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({color: canaletaColor, transparent:true, opacity: 0,side: THREE.DoubleSide}),
            frictionCanaleta, // high friction
            restitutionCanaleta // low restitution
        );
    }
    // Marble
    if(newSetmaterial === true){
        //Material goma
        if(marbleTypematerial === "goma"){
            marbleColor = new THREE.Color("rgb(248, 104, 229)");//Asigna color a cada material
            marbleMaterial = Physijs.createMaterial(
                new THREE.MeshPhongMaterial({color: marbleColor, transparent: false, opacity: 1, wireframe: false, shininess: 0}),
                0.1, // high friction
                2.9 // low restitution
            ); 
        }
        //Material cristal
        if(marbleTypematerial === "cristal"){
            marbleColor = new THREE.Color("rgb(0, 134, 219)");//Asigna color a cada material
            marbleMaterial = Physijs.createMaterial(
                new THREE.MeshStandardMaterial({color: marbleColor, transparent: true, opacity: 0.7, wireframe: false, roughness: 0.3, metalness: 0}),
                0.1, // high friction
                0.1 // low restitution
            ); 
        }
        //Material metal
        if(marbleTypematerial === "metal"){
            marbleColor = new THREE.Color("rgb(160, 160, 160)");//Asigna color a cada material
            marbleMaterial = Physijs.createMaterial(
                new THREE.MeshPhysicalMaterial({color: marbleColor, transparent: false, opacity: 1, wireframe: false, roughness: 0.3, metalness: 0.3}),
                100, // high friction
                0 // low restitution
            ); 
        }
    }else{
        marbleMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial()
        );
    }
}
function geometryPhysi(){
    /*
	* NOMBRE: setGeometry.
	* UTILIDAD: Establece geometria para simulacion phisi
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    marbleGeometry = new THREE.SphereGeometry(1.1, 30, 30);
    groundGeometry = new THREE.CubeGeometry(1000, 1, 1000);
    canaletaGeometry = new THREE.CubeGeometry(3, 0.2, 15.2);
    popoteGeometry = new THREE.CylinderGeometry( .28, .28, 8, 32, 1, true);
}
function meshPhisi(){
    /*
	* NOMBRE: meshPhisi.
	* UTILIDAD: Establece suelo para physi
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    groundMesh = new Physijs.BoxMesh(
        groundGeometry,
        groundMaterial,
        0 // mass
    );
    groundMesh.position.set(0,-1,0);
    scene.add( groundMesh );
    
    //CANALETA
    canaletaMesh = new classCreacanaleta(0,9.7,-15.85,-(girRad*4),0,0,canaletaMaterial[0],0);
    canaletaMesh.creaCanaleta();
    
    canaletaMesh = new classCreacanaleta(0,3.52,21.8,(girRad*9),0,0,canaletaMaterial[1],1);
    canaletaMesh.creaCanaleta();
    
    canaletaMesh = new classCreacanaleta(0,8.65,11.65,(girRad*10),0,0,canaletaMaterial[2],2);
    canaletaMesh.creaCanaleta();
    
    canaletaMesh = new classCreacanaleta(0,14.05,-1.9,0,0,0,canaletaMaterial[3],3);
    canaletaMesh.creaCanaleta();
    
    canaletaMesh = new classCreacanaleta(0,24.32,10.58,-(girRad*19),0,0,canaletaMaterial[4],4);
    canaletaMesh.creaCanaleta();
    
    canaletaMesh = new classCreacanaleta(0,28.87,-1.97,(girRad*7),0,0,canaletaMaterial[5],5);
    canaletaMesh.creaCanaleta();
    
    canaletaMesh = new classCreacanaleta(0,34.43,-14.65,(girRad*5.5),0,0,canaletaMaterial[6],6);
    canaletaMesh.creaCanaleta();
    
    //POPOTES
    popoteMesh = new classCreapopote(0,10.15,-9.4,0,0,girRad*90,canaletaMaterial[0]);
    popoteMesh.creaPopote();
    
    popoteMesh = new classCreapopote(0,4.55,15.4,0,0,girRad*90,canaletaMaterial[1]);
    popoteMesh.creaPopote();
    
    popoteMesh = new classCreapopote(0,10.17,6,0,0,girRad*90,canaletaMaterial[2]);
    popoteMesh.creaPopote();
    
    popoteMesh = new classCreapopote(0,14.05,-1.9,0,0,girRad*90,canaletaMaterial[3]);
    popoteMesh.creaPopote();
    
    popoteMesh = new classCreapopote(0,26.42,16.7,0,0,girRad*90,canaletaMaterial[4]);
    popoteMesh.creaPopote();
    
    popoteMesh = new classCreapopote(0,29.65,-8.4,0,0,girRad*90,canaletaMaterial[5]);
    popoteMesh.creaPopote();
    
    popoteMesh = new classCreapopote(0,35.5,-20.4,0,0,girRad*90,canaletaMaterial[6]);
    popoteMesh.creaPopote();
}
function classCreacanaleta(posX,posY,posZ,rotX,rotY,rotZ,material,num){
    /*
	* NOMBRE: classCreacanaleta.
	* UTILIDAD: Clase para crear los clones de las canaletas
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    this.creaCanaleta = function(){
        //Base1
        canaletaSide[num] = new Physijs.BoxMesh(
            canaletaGeometry,
            material,
            0 // mass
        );
        canaletaSide[num].position.set(posX,(posY-1.8),posZ);
        canaletaSide[num].rotation.set(rotX,rotY,rotZ);
        //Base2
        var canaletaSide2 = new Physijs.BoxMesh(
            canaletaGeometry,
            material,
            0 // mass
        );
        canaletaSide2.position.set(-1.6,0.5,0);
        canaletaSide2.rotation.set(0,0,-(girRad*36));
        //Base3
        var canaletaSide3 = new Physijs.BoxMesh(
            canaletaGeometry,
            material,
            0 // mass
        );
        canaletaSide3.position.set(1.6,0.5,0);
        canaletaSide3.rotation.set(0,0,(girRad*36));
        //Base4
        var canaletaSide4 = new Physijs.BoxMesh(
            canaletaGeometry,
            material,
            0 // mass
        );
        canaletaSide4.position.set(-2,2,0);
        canaletaSide4.rotation.set(0,0,-(girRad*85));
        //Base5
        var canaletaSide5 = new Physijs.BoxMesh(
            canaletaGeometry,
            material,
            0 // mass
        );
        canaletaSide5.position.set(2,2,0);
        canaletaSide5.rotation.set(0,0,(girRad*85));
        //Agrega bases a la principal
        canaletaSide[num].add(canaletaSide2,canaletaSide3,canaletaSide4,canaletaSide5);
        canaletaSide[num].name = "obj "+num;//Asigna nombre acanaleta physi
        //Detecta collision en cada cnaleta phisi
        canaletaSide[num].addEventListener( 'collision', function(){
            objCollision(num);//Acciones de colision
        });
        //Agrega base principal a la escena
        scene.add( canaletaSide[num] );
    }
}
function classCreapopote(posX,posY,posZ,rotX,rotY,rotZ,material){
    /*
	* NOMBRE: classCreacanaleta.
	* UTILIDAD: Clase para crear los clones de las canaletas
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    this.creaPopote = function(){
        var popoteMesh1 = new Physijs.CylinderMesh (
            popoteGeometry,
            material,
            0 // mass
        );
        popoteMesh1.position.set(posX,posY,posZ);
        popoteMesh1.rotation.set(rotX,rotY,rotZ);
        scene.add(popoteMesh1);
    }
}
function addMarble(){
    /*
	* NOMBRE: addMarble.
	* UTILIDAD: Agrega los elemento de rebote como canicas
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    $(".d_footerbtnmaterial").on("mousedown touchstart",function(){
        pressBtn = Number($(this).attr("id").split("l")[1]);//Recupera que btn de materiales se presiona
        //Btns de materiales
        $(".d_footerbtntooltip").remove();//Quita tooltip
        $("#d_footerbtnmaterials").append('<div class="d_footerbtnblock"></div>');//Agrega div que bloquea nuevo clic
        $("#d_footerbtnmaterials").addClass("d_footerbtnmaterials_inactive");//Deshabilita btns
        //Animaciones de intro
        $("#d_velocidad").text("--");//Pinta la velocidad en 0
        $("#d_angulo").text("--");//Pinta la velocidad en 0
        moveCamera(30,20,20);//Establece animacion de camara con Tween
        moveScene(0,-50,16);//Establece animacion de escena con Tween
        //Acciones por cada btn (material)
        if(pressBtn === 1){
            //Establece materiales
            frictionCanaleta = 0.1;//Friction de canaleta
            restitutionCanaleta = 2;//Retitution de canaleta
            marbleTypematerial = "goma";//Define el typo de material
            undateCanaleta(22.2,9.8,4);//Actualiza posicion de canaleta physi de acuerdo al material
        }
        if(pressBtn === 2){
            //Establece materiales
            frictionCanaleta = 0.1;//Friction de canaleta
            restitutionCanaleta = 0;//Retitution de canaleta
            marbleTypematerial = "cristal";//Define el typo de material
            undateCanaleta(22.2,9.8,4);//Actualiza posicion de canaleta physi de acuerdo al material
        }
        if(pressBtn === 3){
            //Establece materiales
            frictionCanaleta = 100;//Friction de canaleta
            restitutionCanaleta = 0;//Retitution de canaleta
            marbleTypematerial = "metal";//Define el typo de material
            undateCanaleta(23.4,13.3,4);//Actualiza posicion de canaleta physi de acuerdo al material
        }
        newSetmaterial = true;//Indica si se asigna un nuevo material a canaleta y marble
        materialPhysi();//Establece nuevo material de marble y canaleta
        //newmaterialPhysi();//Establece nuevo material de marble y canaleta
        //Despues de la animacion de intro, se hace la animacion de marble
        var times = setTimeout(function(){
            meshmarblePhysi();//Establece objeto que cae en physis
            starAnimation = true;//Camara sigue marble
            clearTimeout(times);//Limpia tiempo
            paintData();//Agrega datos de velocidad, angulo y otros
        },timeGrl);
    });
    $(".d_footerbtnmaterial").on("mouseover",function(){
        var overBtn = Number($(this).attr("id").split("l")[1]);//Recupera que btn de materiales se presiona
        if(overBtn === 1){
            $(this).append('<div class="d_footerbtntooltip">Pelota de goma<div class="d_footerbtntooltip_arrow"></div></div>');//Agrega tooltip
        }
        if(overBtn === 2){
            $(this).append('<div class="d_footerbtntooltip">Canica<div class="d_footerbtntooltip_arrow"></div></div>');//Agrega tooltip
        }
        if(overBtn === 3){
            $(this).append('<div class="d_footerbtntooltip">Balín<div class="d_footerbtntooltip_arrow"></div></div>');//Agrega tooltip
        }
    });
    $(".d_footerbtnmaterial").on("mouseout",function(){
        $(".d_footerbtntooltip").remove();//Quita tooltip
    });
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
    var posIn = marbleMesh.position.z;//Posicion de objeto al inicio
    var savePos = posIn;//Guarda posicion de objeto al inicio
    velCalc = 0;//Velocidad al inicio es de 0
    intervalTime = setInterval(function(){//Intervalo cada 100 y despues se multiplica x 10 y son los 1000
        var dateOut = new Date();//Tiempo cada 100
        var posOut = marbleMesh.position.z;//Guarda posicion de objeto cada 100
        velCalc = ((Math.abs(posOut - savePos))*10).toFixed(1);//Distancia recorrida en 100*10 ya son los 1000
        $("#d_velocidad").text(velCalc+" cm/seg");//Pinta la velocidad
        $("#d_angulo").text(fallIncl+"º");//Pinta la velocidad
        saveTime = dateOut;//Guarda el nuevo tiempo despiues de 100
        savePos = posOut;//Guarda la nueva posicion despues de 100
    },100);
}
function undateCanaleta(y,z,numCanaleta){
    /*
	* NOMBRE: undateCanaleta.
	* UTILIDAD: Actualiza posicion de canaleta physi de acuerdo al material
	* ENTRADAS: y > nueva pos canaleta y, z > nueva pos canaleta z, numCanaleta > numero de la canaleta a la que se le aplica el desface.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    canaletaSide[numCanaleta].position.y = y;
    canaletaSide[numCanaleta].position.z = z;
    canaletaSide[numCanaleta].__dirtyPosition = true;//Actualiza posicion de canaleta en physi
}
function objCollision(contCanaleta){
    /*
	* NOMBRE: objCollision.
	* UTILIDAD: Establece en cual canaleta hay colision.
	* ENTRADAS: contCanaleta > numero de canaleta de la colision.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    //Despues de la ultima canaleta, la camara no sigue a marble y resetea
    if(contCanaleta === 0 || contCanaleta === 1){
        var times = setTimeout(function(){
            starAnimation = false;//Camara no sigue marble
            endAnima();//Resetea despues de la animacion final
            clearTimeout(times);//Limpia tiempo
            clearInterval(intervalTime);//Limpia el intervalo de tiempo cada 100 x 10 de la velocidad            
        },timeGrl); 
    }
    switch(contCanaleta){//Inclinacion de cada canaleta
        case 6:
            fallIncl = 5.5;
            break;
        case 5:
            fallIncl = 7;
            break;
        case 4:
            fallIncl = 19;
            break;
        case 3:
            fallIncl = (contCanaleta === 3 && pressBtn === 3)?11:8;
            break;
        case 2:
            fallIncl = 10;
            break;
        case 1:
            fallIncl = 9;
            var times = setTimeout(function(){
                fallIncl = 0;//Al llegar al suelo
                clearTimeout(times);//Limpia tiempo
            },timeGrl/2); 
            break;
        case 0:
            fallIncl = 4;
            var times = setTimeout(function(){
                fallIncl = 0;//Al llegar al suelo
                clearTimeout(times);//Limpia tiempo
            },timeGrl/2); 
            break;
        default:
            break;
    }
    //En la tercera canaleta hay cambio de posicion de camara
    if(contCanaleta === 4){
        moveCamera(30,20,-20);//Establece animacion de camara con Tween
    }
    //En la canaleta giratoria y es el metal (btn 3 de material)
    if(contCanaleta === 3 && pressBtn === 3){
        moveCamera(30,20,20);//Establece animacion de camara con Tween
        animateCanaleta(girRad*11);//Animacion de canaleta giratoria de acuerdo al material
    }
    //En la canaleta giratoria y es otro material menos metal (btn 1 o btn 2 de material)
    if((contCanaleta === 3 && pressBtn === 1) || (contCanaleta === 3 && pressBtn === 2)){
        animateCanaleta(-(girRad*8));//Animacion de canaleta giratoria de acuerdo al material
    }
    allClones[94].visible = false;//Desaparece mano
}
function animateCanaleta(newRot){
    /*
	* NOMBRE: animateCanaleta.
	* UTILIDAD: Animacion de canaleta giratoria de acuerdo al material
	* ENTRADAS: newRot > giro nuevo de acuerdo al material.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    var addAnimatecanaletaphysi = new TWEEN.Tween(canaletaSide[3].rotation)
    .to({
        x: newRot,
        y: 0,
        z: 0,
    },timeGrl/4)
    .easing(easingType)
    .repeat(0).start();
    
    var addAnimatecanaleta = new TWEEN.Tween(allClones[59].rotation)
    .to({
        x: newRot,
        y: 0,
        z: 0
    },timeGrl/4)
    .easing(easingType)
    .repeat(0).start();
}
function endAnima(){
    /*
	* NOMBRE: endAnima.
	* UTILIDAD: Resetea despues de la animacion final
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    scene.remove(marbleMesh);//Quita de escena a marble
    delete marbleMesh;//Elimina objeto de marble
    //Animacion final
    moveCamera(setCamerapos[0],setCamerapos[1],setCamerapos[2]);//Establece animacion de camara con Tween
    moveScene(setScenepos[0],setScenepos[1],setScenepos[2]);//Establece animacion de escena con Tween
    $(".d_footerbtnblock").remove();//Quita bloqueo de materiales
    $("#d_footerbtnmaterials").removeClass("d_footerbtnmaterials_inactive");//Habilita btns
}
function moveCamera(x,y,z){
    /*
	* NOMBRE: moveCamera.
	* UTILIDAD: Establece animacion de camara con Tween
	* ENTRADAS: x > posicion en X, y > posicion en Y, z > posicion en Z
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    var addAnimatecamera = new TWEEN.Tween(prevPoscamera)
    .to({
        x: x,
        y: y,
        z: z
    },timeGrl)
    .easing(easingType)
    .repeat(0).start();
}
function moveScene(x,y,z){
    /*
	* NOMBRE: moveScene.
	* UTILIDAD: Establece animacion de escena con Tween
	* ENTRADAS: x > posicion en X, y > posicion en Y, z > posicion en Z
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    var addAnimatescene = new TWEEN.Tween(prevPosscene)
    .to({
        x: x,
        y: y,
        z: z
    },timeGrl)
    .easing(easingType)
    .repeat(0).start();
}
function setAnimation(){
    /*
	* NOMBRE: setAnimation.
	* UTILIDAD: Establece la animacion sin el Tween
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(starAnimation === true){//Si camera va a seguir marble. Esto no se puede con Tween
        axesHelper.position.set(-scene.position.x,-scene.position.y,-scene.position.z);//Nueva posicion de axesHelper
        canaletaSide[3].__dirtyRotation = true;//Actualiza physi de canaleta giratoria
        scene.position.x = -marbleMesh.position.x;
        if(-marbleMesh.position.y >= scene.position.y){//Evita que camara (centro scena), siga el rebote  hacia arriba de la pelota
            scene.position.y = -marbleMesh.position.y;
        }
        scene.position.z = -marbleMesh.position.z;
    }
    if(reajusteAnima === true){//Reajusta canvas si se abre el menu
        reajusteConte3d();//Reajusta el contenido 3d en resize
    }
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
    marbleMesh.position.set(0,50,-16);
    scene.add( marbleMesh );
    allClones[94].visible = true;//Aparece mano
}