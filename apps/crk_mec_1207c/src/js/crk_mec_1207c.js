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
setCamerapos = [50,15,-15];//Establece la posicion de la camara
setScenepos = [-10,-8,-2];//Establece la posicion de la camara
gridPosy = -0.5;//Posicion de la reticula en cada modelo
slidesInd = 4;//Cantidad de vistas para indicaciones

var groundMaterial, marbleMaterial, canaletaMaterial = [],popoteMaterial;//Materials phisi
var marbleColor, canaletaColor, groundCcolor;//Colors phisi

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
var easingType = TWEEN.Easing.Quadratic.InOut;//Efecto ease
addReflexion = [
    "¿Por qué se requiere mayor fuerza con el balín que con la canica?",
    "¿Subirían los balines si el ángulo del tornillo fuera de 90º?",
    "¿Qué aplicación tendría esta práctica en el uso cotidiano?"
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
    
    

    //Paso 2
    gltfClone = new classClonegltf("b7x1",-3.25,0.5,1.7,0,turn90,turn90,objVis,6);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",1.8,0.5,1.7,0,turn90,0,objVis,7);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",9.45,0.5,1.7,0,turn90,turn90,objVis,8);
    gltfClone.creaClonegltf();
    //Paso 3
    gltfClone = new classClonegltf("uLcorto",16.95,0.5,1.36,0,-turn90,0,objVis,9);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x1",17.3,1.15,0,turn90,0,turn90,objVis,10);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uLcorto",16.95,0.5,-1.36,0,0,0,objVis,11);
    gltfClone.creaClonegltf();
    //Paso 4
    gltfClone = new classClonegltf("b11x1",9.45,0.5,-1.7,0,turn90,turn90,objVis,12);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",1.8,0.5,-1.7,0,turn90,0,objVis,13);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x1",-1.31,0.5,-1.7,0,turn90,turn90,objVis,14);
    gltfClone.creaClonegltf();
    //Paso 5
    gltfClone = new classClonegltf("b4x1",-1.31,-1.21,0,0,turn90,0,objVis,15);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uLcorto",-3.25,-0.86,1.35,0,turn180,-turn90,objVis,16);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uLcorto",-3.25,-0.86,-1.33,-turn90,0,turn90,objVis,17);
    gltfClone.creaClonegltf();
    //Paso 6
    gltfClone = new classClonegltf("hsmall",15.91,2,1.7,turn90,0,-turn90,objVis,18);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",2.99,2,1.7,turn90,0,-turn90,objVis,19);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",9.45,3.55,1.7,0,turn90,turn90,objVis,20);
    gltfClone.creaClonegltf();
    //Paso 7
    gltfClone = new classClonegltf("hsmall",-0.65,2,1.7,turn90,0,-turn90,objVis,21);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-7.15,2,1.7,turn90,0,-turn90,objVis,22);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b7x1",-3.25,3.55,1.7,0,turn90,turn90,objVis,23);
    gltfClone.creaClonegltf();
    //Paso 8
    gltfClone = new classClonegltf("hsmall",15.91,2,-1.7,turn90,0,-turn90,objVis,24);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",2.99,2,-1.7,turn90,0,-turn90,objVis,25);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",9.45,3.55,-1.7,0,turn90,turn90,objVis,26);
    gltfClone.creaClonegltf();
    //Paso 9
    gltfClone = new classClonegltf("hsmall",0.65,2,-1.7,turn90,0,-turn90,objVis,27);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-3.25,2,-1.7,turn90,0,-turn90,objVis,28);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x1",-1.31,3.55,-1.7,0,turn90,turn90,objVis,29);
    gltfClone.creaClonegltf();
    //Paso 10
    gltfClone = new classClonegltf("b4x1",-4.9,0.5,-3.65,0,0,0,objVis,30);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u1x",-4.9,-0.15,-1.05,turn90,0,-turn90,objVis,31);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u1x",-5.9,-0.15,-1.7,turn90,0,0,objVis,32);
    gltfClone.creaClonegltf();
    //Paso 11
    gltfClone = new classClonegltf("tornillo",18.2,0,0,0,0,girRad*90,objVis,33);
    gltfClone.creaClonegltf();
    
    
    
    //gltfClone = new classClonegltf("tornillo",39.8,0,0,-turn90,0,turn90,objVis,101);
    //gltfClone.creaClonegltf();
    
    
    
    gltfClone = new classClonegltf("uLcorto",-8.1,0.5,1.36,0,turn180,0,objVis,34);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x1",-8.45,1.15,0,turn90,0,turn90,objVis,35);
    gltfClone.creaClonegltf();
    //Paso 12
    gltfClone = new classClonegltf("hsmall",13.35,5,1.7,turn90,0,-turn90,objVis,36);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("bu1x",14.65,5.2,1.7,turn90,0,-turn90,objVis,37);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x1",15.9,5.55,-2.35,0,0,turn90,objVis,38);
    gltfClone.creaClonegltf();
    //Paso 13
    gltfClone = new classClonegltf("uLcorto",15.55,5.55,-5.3,0,0,0,objVis,39);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",14.65,5.55,-5.65,0,turn90,turn90,objVis,40);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x1",13.1,5.55,-5,0,0,0,objVis,41);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uE",12.1,6.2,-5.65,turn90,0,0,objVis,42);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",12.6,6.85,-5.65,0,turn90,0,objVis,43);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hlarge",14.45,6.85,-5.65,0,turn90,turn90,objVis,44);
    gltfClone.creaClonegltf();
    
    
    
    //Paso 14
    gltfClone = new classClonegltf("topeL9mm",-9.2,0,0,turn90,0,turn90,objVis,45);
    gltfClone.creaClonegltf();
    
    shapeGroup = new classGroup([[0,5]],objVis,0);
    shapeGroup.creaGroup();
    groupClone = new classClonegroup(-10.3,0,0,turn90,0,turn90,objVis,0,46);
    groupClone.creaClonegroup();
    
    shapeGroup = new classGroup([[33,33],[45,46]/*,[101,101]*/],objVis,1);
    shapeGroup.creaGroup();
    groupClone = new classClonegroup(0,3.1,0,0,0,0,objVis,1,47);
    groupClone.creaClonegroup();
    
    shapeGroup = new classGroup([[6,32],[34,44],[47,47]],objVis,2);
    shapeGroup.creaGroup();
    groupClone = new classClonegroup(5.1,12.3,10.3,0,0,-(girRad*40.5),objVis,2,48);
    groupClone.creaClonegroup();
    

    
    
    //Paso 15
    gltfClone = new classClonegltf("u6x",0,0,0,0,0,-turn90,objVis,49);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u6x",5.15,0,5.15,0,turn90,turn90,objVis,50);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u6x",5.15,0,-5.15,0,turn90,turn90,objVis,51);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u2x",0,0,0,0,turn90,turn90,objVis,52);
    gltfClone.creaClonegltf();
    //Paso 16
    gltfClone = new classClonegltf("u5x",5.1,0,9,0,0,-turn90,objVis,53);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u5x",10.3,0,9,0,0,-turn90,objVis,54);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",7.7,0,14.15,0,turn90,turn90,objVis,55);
    gltfClone.creaClonegltf();
    //Paso 17
    gltfClone = new classClonegltf("u2x",11.6,0,6.45,0,0,-turn90,objVis,56);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u6x",18.05,0,7.75,0,turn90,turn90,objVis,57);
    gltfClone.creaClonegltf();
    //Paso 18
    gltfClone = new classClonegltf("u2x",11.6,0,-6.45,0,0,-turn90,objVis,58);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u6x",18.05,0,-7.75,0,turn90,turn90,objVis,59);
    gltfClone.creaClonegltf();
    //Paso 19
    gltfClone = new classClonegltf("u1x",24.5,0,8.355,0,0,-turn90,objVis,60);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u1x",24.5,0,-8.355,0,0,turn90,objVis,61);
    gltfClone.creaClonegltf();
    //Paso 20
    gltfClone = new classClonegltf("b11x1",-1.3,1,0,0,0,-turn90,objVis,62);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-1.3,2.55,5.15,turn90,0,0,objVis,63);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-1.3,2.55,-5.15,turn90,0,0,objVis,64);
    gltfClone.creaClonegltf();
    //Paso 21
    gltfClone = new classClonegltf("b4x3",-1.3,5.62,5.18,turn90,0,turn90,objVis,65);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x3",-1.3,5.62,-5.18,turn90,0,turn90,objVis,66);
    gltfClone.creaClonegltf();
    //Paso 22
    gltfClone = new classClonegltf("hsmall",-1.3,8.7,5.15,turn90,0,0,objVis,67);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-1.3,8.7,-5.15,turn90,0,0,objVis,68);
    gltfClone.creaClonegltf();
    //Paso 23
    gltfClone = new classClonegltf("b4x3",-1.3,11.85,5.18,turn90,0,turn90,objVis,69);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x3",-1.3,11.85,-5.18,turn90,0,turn90,objVis,70);
    gltfClone.creaClonegltf();
    //Paso 24
    gltfClone = new classClonegltf("hsmall",-1.3,14.9,5.15,turn90,0,0,objVis,71);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-1.3,14.9,-5.15,turn90,0,0,objVis,72);
    gltfClone.creaClonegltf();
    //Paso 25
    gltfClone = new classClonegltf("b4x3",-1.3,18.05,5.18,turn90,0,turn90,objVis,73);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x3",-1.3,18.05,-5.18,turn90,0,turn90,objVis,74);
    gltfClone.creaClonegltf();
    //Paso 26
    gltfClone = new classClonegltf("flexLargeopen",0.35,16.95,0,0,0,-(girRad*81),objVis,75);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uE",-0.65,20,7.1,0,turn90,0,objVis,76);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uE",-0.65,20,-7.1,turn180,turn90,0,objVis,77);
    gltfClone.creaClonegltf();
    //Paso 27
    gltfClone = new classClonegltf("hsmall",1.45,12.75,6.45,turn90,(girRad*25),0,objVis,78);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",1.45,12.75,-6.45,turn90,(girRad*25),0,objVis,79);
    gltfClone.creaClonegltf();
    //Paso 28
    gltfClone = new classClonegltf("flexLargeopen",3.9,9.2,0,0,0,-(girRad*50),objVis,80);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",6.9,6.1,6.45,turn90,(girRad*50),0,objVis,81);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",6.9,6.1,-6.45,turn90,(girRad*50),0,objVis,82);
    gltfClone.creaClonegltf();
    //Paso 29
    gltfClone = new classClonegltf("flexLargeopen",10.6,3.8,0,0,0,-(girRad*27.234),objVis,83);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",14.65,2.1,6.45,turn90,(girRad*71),0,objVis,84);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",14.65,2.1,-6.45,turn90,(girRad*71),0,objVis,85);
    gltfClone.creaClonegltf();
    //Paso 30
    gltfClone = new classClonegltf("flexLargeopen",18.85,1.1,0,0,0,-(girRad*9),objVis,86);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uLcorto",21.9,0.4,7.4,turn90,0,turn90,objVis,87);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uLcorto",21.9,0.4,-7.4,turn90,0,-turn90,objVis,88);
    gltfClone.creaClonegltf();
    //Paso 31
    gltfClone = new classClonegltf("hsmall",23.15,0.75,6.45,turn90,turn90,0,objVis,89);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",23.15,0.75,-6.45,turn90,turn90,0,objVis,90);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u6x",23.7,0.75,0,0,0,turn180,objVis,91);
    gltfClone.creaClonegltf();
    //Paso 32
    gltfClone = new classClonegltf("b11x1",5.1,7.1,7.75,turn90,0,0,objVis,92);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",5.1,7.1,12.9,turn90,0,0,objVis,93);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",4.1,7.1,10.3,0,0,0,objVis,94);
    gltfClone.creaClonegltf();
    //Paso 33
    meshClone = new classCloneshape("straw",5.1,12.3,10.3,turn90,0,0,6.5,objVis,95);
    meshClone.creaClonemesh();
    //Paso 34
    gltfClone = new classClonegltf("uLcorto",5.1,14.6,7.4,turn90,0,turn90,objVis,92);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("bu1x",5.1,14.95,6.4,turn90,turn90,turn90,objVis,97);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("bu1x",5.1,14.95,5.2,turn90,0,turn90,objVis,98);
    gltfClone.creaClonegltf();
    
    
    //Oculta todas las piezas y deja solo los grupos y las piezas sueltas finales
    for(i=0; i<=47; i++){
        allClones[i].visible = false;
    }

    
    //Hand 
    gltfClone = new classClonegltf("handright",25,25,10,0,(girRad*180),(girRad*40),false,99);
    gltfClone.creaClonegltf();
    
    gltfClone = new classClonegltf("handleft",-7,19,18,0,(girRad*180),-(girRad*45),false,100);
    gltfClone.creaClonegltf();
    
    addPhysis();//Agrega fisica
    
    //console.log(allClones[99]);
    
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
        new THREE.MeshLambertMaterial({color: groundCcolor,transparent:true, opacity: 0, wireframe:true}),
        .8, // high friction
        .4 // low restitution
    );
    //Canaleta y popote
    for(i=0; i<=6; i++){
        canaletaMaterial[i] = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({color:canaletaColor, transparent:true, opacity:0, side:THREE.DoubleSide, wireframe:true}),
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
    marbleGeometry = new THREE.SphereGeometry(0.9, 30, 30);
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
    
    canaletaMesh = new classCreacanaleta(0,20,0,0,0,-(girRad*90),1,2,1,0);
    canaletaMesh.creaCanaleta();

    canaletaMesh = new classCreacanaleta(0.25,17,0,0,0,-(girRad*81),1,2,1,1);
    canaletaMesh.creaCanaleta();

    canaletaMesh = new classCreacanaleta(0.95,14.1,0,0,0,-(girRad*73),1,2,1,2);
    canaletaMesh.creaCanaleta();

    canaletaMesh = new classCreacanaleta(2.2,11.4,0,0,0,-(girRad*57),1,2,1,3);
    canaletaMesh.creaCanaleta();

    canaletaMesh = new classCreacanaleta(4,9,0,0,0,-(girRad*50),1,2,1,4);
    canaletaMesh.creaCanaleta();

    canaletaMesh = new classCreacanaleta(6.1,6.85,0,0,0,-(girRad*42),1,2,1,5);
    canaletaMesh.creaCanaleta();

    canaletaMesh = new classCreacanaleta(8.45,5,0,0,0,-(girRad*35),1,2,1,6);
    canaletaMesh.creaCanaleta();

    canaletaMesh = new classCreacanaleta(10.9,3.55,0,0,0,-(girRad*27),1,2,1,7);
    canaletaMesh.creaCanaleta();

    canaletaMesh = new classCreacanaleta(13.65,2.4,0,0,0,-(girRad*18.5),1,2,1,8);
    canaletaMesh.creaCanaleta();

    canaletaMesh = new classCreacanaleta(16.5,1.52,0,0,0,-(girRad*15.5),1,2,1,9);
    canaletaMesh.creaCanaleta();

    canaletaMesh = new classCreacanaleta(19.4,0.92,0,0,0,-(girRad*7.5),1,2,1,10);
    canaletaMesh.creaCanaleta();

    canaletaMesh = new classCreacanaleta(22.55,0.72,0,0,0,0,1.1,2,1,11);
    canaletaMesh.creaCanaleta();
    
    /////////
    
    
    canaletaMesh = new classCreacanaleta(9.5,13,10.3,-(girRad*10),(girRad*10),-(girRad*40.5),10,2,0.3,12);
    //canaletaMesh = new classCreacanaleta(9.5,13,10.3,0,0,-(girRad*40.5),10,2,0.3,12);
    
    canaletaMesh.creaCanaleta();
    
    canaletaMesh = new classCreacanaleta(13.5,10.5,8.6,0,0,-(girRad*40.5),8,15,0.02,13);
    canaletaMesh.creaCanaleta();
    
    canaletaMesh = new classCreacanaleta(11.5,12.5,10.9,0,0,-(girRad*40.5),10,55,0.02,14);
    canaletaMesh.creaCanaleta();
    
    canaletaMesh = new classCreacanaleta(19,8,6.5,(girRad*5),-(girRad*5),-(girRad*40.5),2,2,0.31,15);
    canaletaMesh.creaCanaleta();
    
    canaletaMesh = new classCreacanaleta(20,8,4.65,0,0,-(girRad*40.5),2,45,0.02,16);
    canaletaMesh.creaCanaleta();
    
    canaletaMesh = new classCreacanaleta(21,6.5,8,0,0,-(girRad*130.5),5,2,0.5,17);
    canaletaMesh.creaCanaleta();
    
    canaletaMesh = new classCreacanaleta(2,16,6,-(girRad*5),(girRad*5),-(girRad*40.5),1,2,0.31,18);
    canaletaMesh.creaCanaleta();
    
    canaletaMesh = new classCreacanaleta(5.1,14.9,6.4,0,0,0,0.8,2,0.16,19);
    canaletaMesh.creaCanaleta();
    
    canaletaMesh = new classCreacanaleta(5.15,14.9,5.2,0,0,turn90,0.8,2,0.16,20);
    canaletaMesh.creaCanaleta();
    
    
    
    //Sube
    canaletaMesh = new classCreacanaleta(20.8,4,9.8,0,-(girRad*10),-(girRad*130.5),0.6,2,0.2,21);
    canaletaMesh.creaCanaleta();
    canaletaMesh = new classCreacanaleta(23.8,1.6,9.8,0,-(girRad*10),-(girRad*130.5),0.6,2,0.2,22);
    canaletaMesh.creaCanaleta();
    canaletaMesh = new classCreacanaleta(26.8,-1,9.8,0,-(girRad*10),-(girRad*130.5),0.6,2,0.2,23);
    canaletaMesh.creaCanaleta();
    canaletaMesh = new classCreacanaleta(29.8,-3.6,9.8,0,-(girRad*10),-(girRad*130.5),0.6,2,0.2,24);
    canaletaMesh.creaCanaleta();
    canaletaMesh = new classCreacanaleta(32.8,-6.2,9.8,0,-(girRad*10),-(girRad*130.5),0.6,2,0.2,25);
    canaletaMesh.creaCanaleta();
    canaletaMesh = new classCreacanaleta(35.8,-8.8,9.8,0,-(girRad*10),-(girRad*130.5),0.6,2,0.2,26);
    canaletaMesh.creaCanaleta();
    
    
    //////
    
    canaletaMesh = new classCreacanaleta(80,0.72,0,0,0,0,1.1,2,10,27);
    canaletaMesh.creaCanaleta();
    
    console.log(canaletaSide);

}
//var detector = false;
var strongDetected = 0;
var strongFirst = true;
var strongSecond = true;


var canaletaPositionx;
var canaletaPositiony;
var screwRotationx;
var getAngle;
var calcRange = 93/12;

function classCreacanaleta(posX,posY,posZ,rotX,rotY,rotZ,scaleX,scaleY,scaleZ,num){
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
            canaletaMaterial[0],
            0 // mass
        );
        canaletaSide[num].position.set(posX,posY,posZ);
        canaletaSide[num].rotation.set(rotX,rotY,rotZ);
        canaletaSide[num].scale.set(scaleX,scaleY,scaleZ);
        //Detecta collision en cada cnaleta phisi
        canaletaSide[num].addEventListener( 'collision', function(marbleCollision){
            //console.log("COLLISION "+num);
            //console.log(marbleCollision);
            
            
            if(num === 27){//Detector ultimo para eliminar marble
                //detector = true;
                
                
                scene.remove(marbleCollision);//Quita de escena a marble
                delete marbleCollision;//Elimina objeto de marble
                detector = false;
                
                if(contMarble === 0){
                    console.log("ZERO");
                    marbleTrue = false;
                }
                //console.log(detector);
                
            }
            if(num === 15 && strongFirst){//Detector primero inicio tornillo

                //strongDetected++;
                
                
                
                strongFirst = false;
                console.log(strongDetected);
                
                //$('.d_footerbtngirscrewstrongline').css({"bottom":(strongDetected*calcRange)+"%"});
                //$(".d_strong_"+strongDetected).css({"opacity":"1"});
                
                if(contMarble >= 6){
                    $('.d_footerbtnmaterialgroup').append('<div class="d_footerbtnmaterialgroup_block"></div>');
                    $('.d_footerbtnmaterialgroup').addClass('d_footerbtnmaterialgroup_opacity');
                }
                
                
                canaletaPositionx = 0.0325;
                canaletaPositiony = 0.0286666666666667;
                screwRotationx = 0.139;
                getAngle = 5.9;
                /*
                strongDetected = 3;
                if(strongDetected === 1){
                    canaletaPositionx = 0.0325;
                    canaletaPositiony = 0.0286666666666667;
                    screwRotationx = 0.139;
                    getAngle = 5.9;
                }
                if(strongDetected === 2){
                    canaletaPositionx = 0.01625;
                    canaletaPositiony = 0.014333333;
                    screwRotationx = 0.0695;
                    getAngle = 4.9;
                }
                if(strongDetected === 3){
                    canaletaPositionx = 0.008125;
                    canaletaPositiony = 0.00716666;
                    screwRotationx = 0.03475;
                    getAngle = 3.9;
                }
                */

            }
            if(num === 19 && strongSecond){//Detector segundo fin tornillo

                //$(".d_strong_"+strongDetected).css({"opacity":"0"});

                contMarble--;
                //strongDetected--;
                strongSecond = false;
                strongDetected = strongDetected-marbleCollision.weightSet;
                
                console.log(marbleCollision.name);
                console.log(strongDetected);
                
                if(girActive){//Si se encuentra girando
                    $('.d_footerbtngirscrewstrongline').css({"left":(strongDetected*calcRange)+"%"});
                }
                
                if(contMarble < 6){
                   $('.d_footerbtnmaterialgroup_block').remove();
                    $('.d_footerbtnmaterialgroup').removeClass('d_footerbtnmaterialgroup_opacity');
                }
            }

            if(num === 3 && strongSecond === false){
                strongSecond = true;
                //console.log(strongDetected);
            }
            
            //console.log(strongDetected);
        });
        scene.add(canaletaSide[num]);
    }
}
var girActive = false;
function addMarble(){
    /*
	* NOMBRE: addMarble.
	* UTILIDAD: Agrega los elemento de rebote como canicas
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    
    var horaA, horaB, diferenciaHoras;
    
    var newTime = 16000;
    
    var animateBasescrew;
    var animateScrew;
    var status = false;
    $(".d_footerbtngirpress").on("mousedown touchstart",function(e){
        e.preventDefault();//Previene el tooltip de touchstart.
        console.log("PRESS");
        if(marbleTrue){
            for(var i=0; i<=marbleMesh.length-1; i++){
                marbleMesh[i].position.y = marbleMesh[i].position.y+0.2
                marbleMesh[i].__dirtyPosition = true;//Actualiza posicion de marble
            }
        }
        $('.d_footerbtngirscrew').find('.d_footerbtngirscrewcenter').addClass('d_footerbtngiranima');
        //$(this).find('.d_footerbtngirscrew').show();
        $('.d_footerbtngirscrew').addClass('d_footerbtngirscrew_active');
        starAnimation = true;
        allClones[100].visible = true;//Aparece mano
        
        girActive = true;//Si gira
        $('.d_footerbtngirscrewstrongline').css({"left":(strongDetected*calcRange)+"%"});
    });
    $(".d_footerbtngirpress").on("mouseup touchend",function(e){
        e.preventDefault();//Previene el tooltip de touchstart.
        console.log("UP");
        $('.d_footerbtngirscrew').find('.d_footerbtngirscrewcenter').removeClass('d_footerbtngiranima');
        //$(this).find('.d_footerbtngirscrew').hide();
        $('.d_footerbtngirscrew').removeClass('d_footerbtngirscrew_active');
        starAnimation = false;
        allClones[100].visible = false;//Desaparece mano
        
        girActive = false;//No gira
        $('.d_footerbtngirscrewstrongline').css({"left":"0%"});
    });
    
    $(".d_footerbtnmaterial").on("mousedown",function(e){
        e.preventDefault();//Previene el tooltip de touchstart.
        pressBtn = Number($(this).attr("id").split("l")[1]);//Recupera que btn de materiales se presiona
        //Btns de materiales
        $(".d_footerbtntooltip").remove();//Quita tooltip
        //$("#d_footerbtnmaterials").append('<div class="d_footerbtnblock"></div>');//Agrega div que bloquea nuevo clic
        //$("#d_footerbtnmaterials").addClass("d_footerbtnmaterials_inactive");//Deshabilita btns
        //Animaciones de intro
        $("#d_velocidad").text("--");//Pinta la velocidad en 0
        $("#d_angulo").text("--");//Pinta la velocidad en 0
        //moveCamera(30,20,20);//Establece animacion de camara con Tween
        //moveScene(0,-50,16);//Establece animacion de escena con Tween
        
        $('.d_footerbtngir_block').remove();
        $('.d_footerbtngir').removeClass('d_footerbtngir_inactive');
        
        //Acciones por cada btn (material)
        /*
        if(pressBtn === 1){
            //Establece materiales
            frictionCanaleta = 0.1;//Friction de canaleta
            restitutionCanaleta = 2;//Retitution de canaleta
            marbleTypematerial = "goma";//Define el typo de material
            //undateCanaleta(22.2,9.8,4);//Actualiza posicion de canaleta physi de acuerdo al material
            var times = setTimeout(function(){
                var animateBasescrew = new TWEEN.Tween(canaletaSide[21].position)
                .to({
                    x: 1.5,
                    y: 21,
                    z: 10.3
                },16000)
                .easing(TWEEN.Easing.Linear.None)
                .onUpdate(function(){
                    canaletaSide[21].__dirtyPosition = true;//Actualiza physi de canaleta giratoria
                })
                .repeat(0).start();
                var animateScrew = new TWEEN.Tween(allClones[48].children[38].rotation)
                .to({
                    x: 19,
                    y: 0,
                    z: 0
                },4000)
                .onComplete(function(){
                })
                .easing(TWEEN.Easing.Linear.None).repeat(4).start();
                allClones[99].visible = false;//Desaparece mano
            },4000);
        }
        */
        if(pressBtn === 2){
            //Establece materiales
            frictionCanaleta = 0.1;//Friction de canaleta
            restitutionCanaleta = 0;//Retitution de canaleta
            marbleTypematerial = "cristal";//Define el typo de material
            //undateCanaleta(22.2,9.8,4);//Actualiza posicion de canaleta physi de acuerdo al material
            var times = setTimeout(function(){
                
                allClones[99].visible = false;//Desaparece mano
                clearTimeout(times);//Limpia tiempo
            },2000);
        }
        if(pressBtn === 3){
            //Establece materiales
            frictionCanaleta = 100;//Friction de canaleta
            restitutionCanaleta = 0;//Retitution de canaleta
            marbleTypematerial = "metal";//Define el typo de material
            //undateCanaleta(23.4,13.3,4);//Actualiza posicion de canaleta physi de acuerdo al material
            var times = setTimeout(function(){
                
                allClones[99].visible = false;//Desaparece mano
                clearTimeout(times);//Limpia tiempo
            },2000);
        }
        
        newSetmaterial = true;//Indica si se asigna un nuevo material a canaleta y marble
        materialPhysi();//Establece nuevo material de marble y canaleta
        //newmaterialPhysi();//Establece nuevo material de marble y canaleta
        //Despues de la animacion de intro, se hace la animacion de marble
        //var times = setTimeout(function(){
            meshmarblePhysi();//Establece objeto que cae en physis
            //starAnimation = true;//Camara sigue marble
            //clearTimeout(times);//Limpia tiempo
            //paintData();//Agrega datos de velocidad, angulo y otros
        //},timeGrl);
    });
    $(".d_footerbtnmaterial").on("mouseover",function(){
        var overBtn = Number($(this).attr("id").split("l")[1]);//Recupera que btn de materiales se presiona
        /*if(overBtn === 1){
            $(this).append('<div class="d_footerbtngirtooltip">Gira el tornillo<div class="d_footerbtntooltip_arrow"></div></div>');//Agrega tooltip
        }*/
        if(overBtn === 2){
            $(this).append('<div class="d_footerbtntooltip">Canica<div class="d_footerbtntooltip_arrow"></div></div>');//Agrega tooltip
        }
        if(overBtn === 3){
            $(this).append('<div class="d_footerbtntooltip">Balín<div class="d_footerbtntooltip_arrow"></div></div>');//Agrega tooltip
        }
    });
    $(".d_footerbtnmaterial").on("mouseout",function(){
        $(".d_footerbtntooltip, .d_footerbtngirtooltip").remove();//Quita tooltip
    });
}
/*
function paintData(){
    /*
	* NOMBRE: paintData.
	* UTILIDAD: Agrega datos de velocidad, angulo y otros
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
/*
    var dateIn = new Date();//Timepo al iniciar
    var saveTime = dateIn;//Guarda tiempo de inicio
    var posIn = marbleMesh.position.z;//Posicion de objeto al inicio
    var savePos = posIn;//Guarda posicion de objeto al inicio
    velCalc = 0;//Velocidad al inicio es de 0
    intervalTime = setInterval(function(){//Intervalo cada 100 y despues se multiplica x 10 y son los 1000
        var dateOut = new Date();//Tiempo cada 100
        var posOut = marbleMesh.position.z;//Guarda posicion de objeto cada 100
        velCalc = ((Math.abs(posOut - savePos))*10).toFixed(1);//Distancia recorrida en 100*10 ya son los 1000
        $("#d_velocidad").text(velCalc+"cm/seg");//Pinta la velocidad
        $("#d_angulo").text(fallIncl+"º");//Pinta la velocidad
        saveTime = dateOut;//Guarda el nuevo tiempo despiues de 100
        savePos = posOut;//Guarda la nueva posicion despues de 100
    },100);
}
*/
function undateCanaleta(y,z,numCanaleta){
    /*
	* NOMBRE: undateCanaleta.
	* UTILIDAD: Actualiza posicion de canaleta physi de acuerdo al material
	* ENTRADAS: y > nueva pos canaleta y, z > nueva pos canaleta z, numCanaleta > numero de la canaleta a la que se le aplica el desface.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    //canaletaSide[numCanaleta].position.y = y;
    //canaletaSide[numCanaleta].position.z = z;
    //canaletaSide[numCanaleta].__dirtyPosition = true;//Actualiza posicion de canaleta en physi
}

//function endAnima(){
    /*
	* NOMBRE: endAnima.
	* UTILIDAD: Resetea despues de la animacion final
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    //scene.remove(marbleMesh);//Quita de escena a marble
    //delete marbleMesh;//Elimina objeto de marble
    //Animacion final
    //moveCamera(setCamerapos[0],setCamerapos[1],setCamerapos[2]);//Establece animacion de camara con Tween
    //moveScene(setScenepos[0],setScenepos[1],setScenepos[2]);//Establece animacion de escena con Tween
    //$(".d_footerbtnblock").remove();//Quita bloqueo de materiales
    //$("#d_footerbtnmaterials").removeClass("d_footerbtnmaterials_inactive");//Habilita btns
//}
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
var grade360 = 6.28319;//360 grados a radianes
var contGrades = 1;


var camera_angle = 0;
var camera_range = 2;

function setAnimation(){
    /*
	* NOMBRE: setAnimation.
	* UTILIDAD: Establece la animacion sin el Tween
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(starAnimation === true){//Si camera va a seguir marble. Esto no se puede con Tween
        //axesHelper.position.set(-scene.position.x,-scene.position.y,-scene.position.z);//Nueva posicion de axesHelper
        //canaletaSide[3].__dirtyRotation = true;//Actualiza physi de canaleta giratoria
        //scene.position.x = -marbleMesh.position.x;
        //scene.position.y = -marbleMesh.position.y;
        //scene.position.z = -marbleMesh.position.z;
        
        
        //console.log(canaletaSide14);
        //canaletaSide14.position.z = canaletaSide14.position.z+0.5;
        
        //console.log("ANIMA");
        
        //De: 21,3.8,9.8
        //A: 1.5,21,9.8
        //Trayecto X: 19.5
        //Trayecto Y: 17.2
        //Steps X son 19.5/600: 0.0325 "la division entre 600 es para aumentar o disminuir velocidad"
        //Steps Y son 17.2/600: 0.0286666666666667 "la division entre 600 es para aumentar o disminuir velocidad"
        
        
        canaletaSide[21].__dirtyPosition = true;//Actualiza physi de canaleta
        canaletaSide[21].__dirtyRotation = true;//Actualiza physi de canaleta
        canaletaSide[22].__dirtyPosition = true;//Actualiza physi de canaleta
        canaletaSide[22].__dirtyRotation = true;//Actualiza physi de canaleta
        canaletaSide[23].__dirtyPosition = true;//Actualiza physi de canaleta
        canaletaSide[23].__dirtyRotation = true;//Actualiza physi de canaleta
        canaletaSide[24].__dirtyPosition = true;//Actualiza physi de canaleta
        canaletaSide[24].__dirtyRotation = true;//Actualiza physi de canaleta
        canaletaSide[25].__dirtyPosition = true;//Actualiza physi de canaleta
        canaletaSide[25].__dirtyRotation = true;//Actualiza physi de canaleta
        canaletaSide[26].__dirtyPosition = true;//Actualiza physi de canaleta
        canaletaSide[26].__dirtyRotation = true;//Actualiza physi de canaleta
        //Base tornillo
        canaletaSide[21].position.x = canaletaSide[21].position.x-canaletaPositionx;
        canaletaSide[21].position.y = canaletaSide[21].position.y+canaletaPositiony;
        canaletaSide[22].position.x = canaletaSide[22].position.x-canaletaPositionx;
        canaletaSide[22].position.y = canaletaSide[22].position.y+canaletaPositiony;
        canaletaSide[23].position.x = canaletaSide[23].position.x-canaletaPositionx;
        canaletaSide[23].position.y = canaletaSide[23].position.y+canaletaPositiony;
        canaletaSide[24].position.x = canaletaSide[24].position.x-canaletaPositionx;
        canaletaSide[24].position.y = canaletaSide[24].position.y+canaletaPositiony;
        canaletaSide[25].position.x = canaletaSide[25].position.x-canaletaPositionx;
        canaletaSide[25].position.y = canaletaSide[25].position.y+canaletaPositiony;
        canaletaSide[26].position.x = canaletaSide[26].position.x-canaletaPositionx;
        canaletaSide[26].position.y = canaletaSide[26].position.y+canaletaPositiony;
        //canaletaSide[21].__dirtyPosition = true;//Actualiza physi de canaleta
        if(canaletaSide[21].position.x < 2.8 || canaletaSide[21].position.y > 19.6){
            canaletaSide[21].position.x = 20.8;
            canaletaSide[21].position.y = 4;
            if(marbleTrue){
                for(var i=0; i<=marbleMesh.length-1; i++){
                    marbleMesh[i].position.y = marbleMesh[i].position.y+0.2
                    marbleMesh[i].__dirtyPosition = true;//Actualiza posicion de marble
                }
            }
        }
        if(canaletaSide[22].position.x < 2.8 || canaletaSide[22].position.y > 19.6){
            canaletaSide[22].position.x = 20.8;
            canaletaSide[22].position.y = 4;
            if(marbleTrue){
                for(var i=0; i<=marbleMesh.length-1; i++){
                    marbleMesh[i].position.y = marbleMesh[i].position.y+0.2
                    marbleMesh[i].__dirtyPosition = true;//Actualiza posicion de marble
                }
            }
        }
        if(canaletaSide[23].position.x < 2.8 || canaletaSide[23].position.y > 19.6){
            canaletaSide[23].position.x = 20.8;
            canaletaSide[23].position.y = 4;
            if(marbleTrue){
                for(var i=0; i<=marbleMesh.length-1; i++){
                    marbleMesh[i].position.y = marbleMesh[i].position.y+0.2
                    marbleMesh[i].__dirtyPosition = true;//Actualiza posicion de marble
                }
            }
        }
        if(canaletaSide[24].position.x < 2.8 || canaletaSide[24].position.y > 19.6){
            canaletaSide[24].position.x = 20.8;
            canaletaSide[24].position.y = 4;
            if(marbleTrue){
                for(var i=0; i<=marbleMesh.length-1; i++){
                    marbleMesh[i].position.y = marbleMesh[i].position.y+0.2
                    marbleMesh[i].__dirtyPosition = true;//Actualiza posicion de marble
                }
            }
        }
        if(canaletaSide[25].position.x < 2.8 || canaletaSide[25].position.y > 19.6){
            canaletaSide[25].position.x = 20.8;
            canaletaSide[25].position.y = 4;
            if(marbleTrue){
                for(var i=0; i<=marbleMesh.length-1; i++){
                    marbleMesh[i].position.y = marbleMesh[i].position.y+0.2
                    marbleMesh[i].__dirtyPosition = true;//Actualiza posicion de marble
                }
            }
        }
        if(canaletaSide[26].position.x < 2.8 || canaletaSide[26].position.y > 19.6){
            canaletaSide[26].position.x = 20.8;
            canaletaSide[26].position.y = 4;
            if(marbleTrue){
                for(var i=0; i<=marbleMesh.length-1; i++){
                    marbleMesh[i].position.y = marbleMesh[i].position.y+0.2
                    marbleMesh[i].__dirtyPosition = true;//Actualiza posicion de marble
                }
            }
        }
        
        
        //Tornillo
        allClones[48].children[38].rotation.x = allClones[48].children[38].rotation.x-screwRotationx;
        if(allClones[48].children[38].rotation.x >= grade360*contGrades){
            contGrades++;
            //console.log(allClones[48].children[38].rotation.x);
            if(allClones[48].children[38].rotation.x > grade360*13){
                allClones[48].children[38].rotation.x = 0;
                contGrades = 1;
            }
        }
        
        
        //Giro de mano
        camera_angle += getAngle * Math.PI/180;
        allClones[100].position.z = Math.cos(camera_angle) * -camera_range+19;
        allClones[100].position.y = Math.sin(camera_angle) * -camera_range+18;
        

    }
    if(reajusteAnima === true){//Reajusta canvas si se abre el menu
        reajusteConte3d();//Reajusta el contenido 3d en resize
    }
    
    
    //console.log(scene);
    //console.log(canaletaSide14);
    //canaletaSide14.position.z = canaletaSide14.position.z+0.5;
}

var contMarble = 0;
var marbleTrue = false;
var addMarblecont = 0;
var marbleFull = false;
//var saveMarble;
var contTotalmarble = 0;
function meshmarblePhysi(){
    /*
	* NOMBRE: meshmarblePhysi.
	* UTILIDAD: Establece objeto que cae en physis
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */  
    
    marbleMesh.push([]);
    
    marbleMesh[addMarblecont] = new Physijs.SphereMesh(marbleGeometry,marbleMaterial);
    marbleMesh[addMarblecont].collisions = 0;
    marbleMesh[addMarblecont].position.set(20,25,6);
    marbleMesh[addMarblecont].name = "marble "+contTotalmarble;
    
    contMarble++;
    
    contTotalmarble++;
    
    marbleTrue = true;
    
    if(pressBtn === 2){
        marbleMesh[addMarblecont].weightSet = 1;
    }
    if(pressBtn === 3){
        marbleMesh[addMarblecont].weightSet = 2;
    }
    
    strongDetected = strongDetected+marbleMesh[addMarblecont].weightSet;
    
    
    scene.add( marbleMesh[addMarblecont] );
    allClones[99].visible = true;//Aparece mano
    
    //console.log(marbleMesh);
    
    //console.log(contMarble);
    
    strongFirst = true;
    
    addMarblecont++;
    
    $('.d_footerbtnmaterialgroup').append('<div class="d_footerbtnmaterialgroup_block"></div>');
    $('.d_footerbtngir').append('<div class="d_footerbtngirpress_block"></div>');
    $('.d_footerbtnmaterialgroup').addClass('d_footerbtnmaterialgroup_opacity');
    $('.d_footerbtngirpress').addClass('d_footerbtngirpress_inactive');
    var time = setTimeout(function(){
        if(contMarble < 6){
            $('.d_footerbtnmaterialgroup_block').remove();
            $('.d_footerbtnmaterialgroup').removeClass('d_footerbtnmaterialgroup_opacity');
        }
        $('.d_footerbtngirpress_block').remove();
        $('.d_footerbtngirpress').removeClass('d_footerbtngirpress_inactive');
    },2000);
}