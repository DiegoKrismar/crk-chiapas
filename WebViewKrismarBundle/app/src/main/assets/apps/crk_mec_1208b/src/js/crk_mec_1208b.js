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
totalPasos = 44;//Total de pasos para el armado.
setCamerapos = [35,15,10];//Establece la posicion de la camara
setScenepos = [0,0,-5];//Establece la posicion de la camara
gridPosy = -3.7;//Posicion de la reticula en cada modelo
setRope = false;//Establece si hay animacion para cuerda
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
}
function setStepview(){
    /*
	* NOMBRE: setStepview.
	* UTILIDAD: Establece expand, camara, piezas y posicion de escenario en cada paso.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    numExpand = [
    /*00*///[null, null, null], [null, null, null], [null, null, null], [null, null, null], [null, null, null],
    /*01*/[null, null, null], [null, +2, null], [null, +6, null], [null, +7, null], [null, +8, null], [null, +9, null],
    /*02*/[null, +5, null],
    /*03*/[-5, null, null],
    /*04*/[null, null, +5], [null, null, +5],
    /*05*/[null, null, +5], [null, null, +5], [null, null, +10],
    /*06*/[null, null, -5], [null, null, -5],
    /*07*/[null, null, -5], [null, null, -5],
    /*08*/[null, +3, null],
    /*09*/[null, null, null], [null, +2, null], [null, +6, null], [null, +7, null], [null, +8, null], [null, +9, null],
    /*10*/[null, +5, null],
    /*11*/[-5, null, null],
    /*12*/[+5, null, null], [+5, null, null],
    /*13*/[+5, null, null], [+5, null, null], [+10, null, null],
    /*14*/[null, null, -5], [null, null, -5],
    /*15*/[null, null, -5], [null, null, -5],
    /*16*/[null, +5, null],
    /*17*/[null, null, null], [null, +2, null], [null, +6, null], [null, +7, null], [null, +8, null], [null, +9, null],
    /*18*/[null, +2, null], [null, +6, null], [null, +7, null], [null, +8, null], [null, +9, null],
    /*19*/[null, +5, null],
    /*20*/[+5, null, null],
    /*21*/[-5, null, null], [-5, null, null],
    /*22*/[-5, null, null], [-5, null, null], [-10, null, null],
    /*23*/[null, null, -5], [null, null, -5],
    /*24*/[null, null, -5], [null, null, -5],
    /*25*/[null, +5, null], [null, +5, null],
    /*26*/[null, null, null], [null, +2, null], [null, +6, null], [null, +7, null], [null, +8, null], [null, +9, null],
    /*27*/[null, +2, null], [null, +6, null], [null, +7, null], [null, +8, null], [null, +9, null],
    /*28*/[null, +5, null],
    /*29*/[+5, null, null], [null, null, -5],
    /*30*/[null, +5, null], [null, +5, null],
    /*31*/[null, null, null], [null, null, +7.5], [null, null, null], [null, null, +2.5], [null, null, null], [null, null, null],  [null, null, -2.5], [null, null, null], [null, null, null],  [null, null, -7.5],
    /*32*/[-5, null, null], 
    /*33*/[null, +5, null], [null, +10, null],
    /*34*/[-5, null, null], 
    /*35*/[null, +5, null], [null, +10, null],
    /*36*/[-5, null, null], 
    /*37*/[null, +5, null], [null, +10, null],
    /*38*/[-5, null, null], 
    /*39*/[null, +5, null], [null, +10, null],
    /*40*/[-5, null, null], 
    /*41*/[null, +5, null], [null, +10, null],
    /*42*/[-5, null, null], 
    /*43*/[null, +5, null], [null, +10, null],
    /*44*/[null,null,null]
    ];
    contPieza = [
    /*00*///"pieza inicio","pieza final"],
    /*01*/[0,5],
    /*02*/[6,6],
    /*03*/[7,7],
    /*04*/[8,9],
    /*05*/[10,12],
    /*06*/[13,14],
    /*07*/[15,16],
    /*08*/[17,17],
    /*09*/[18,23],
    /*10*/[24,24],
    /*11*/[25,25],
    /*12*/[26,27],
    /*13*/[28,30],
    /*14*/[31,32],
    /*15*/[33,34],
    /*16*/[35,35],
    /*17*/[36,41],
    /*18*/[42,46],
    /*19*/[47,47],
    /*20*/[48,48],
    /*21*/[49,50],
    /*22*/[51,53],
    /*23*/[54,55],
    /*24*/[56,57],
    /*25*/[58,59],
    /*26*/[60,65],
    /*27*/[66,70],
    /*28*/[71,71],
    /*29*/[72,73],
    /*30*/[74,75],
    /*31*/[76,85],
    /*32*/[86,86],
    /*33*/[87,88],
    /*34*/[89,89],
    /*35*/[90,91],
    /*36*/[92,92],
    /*37*/[93,94],
    /*38*/[95,95],
    /*39*/[96,97],
    /*40*/[98,98],
    /*41*/[99,100],
    /*42*/[101,101],
    /*43*/[102,103],
    /*44*/[null,null]
    ];
    newLookat = [
    /*00*///[[40,20,40],[0,0,-30]],
    /*01*/[[20,10,-20],[-2,-2,1.5]],
    /*02*/[[20,10,20],[-2,-2,1.5]],
    /*03*/[[-20,10,20],[2,-2,-4]],
    /*04*/[[15,10,15],[-2,-1,-5]],
    /*05*/[[20,10,5],[-2,-1,-8]],
    /*06*/[[15,-5,-15],[0,0,5]],
    /*07*/[[15,10,-15],[0,-2,5]],
    /*08*/[[10,8,10],[-2,-3,1.5]],
    /*09*/[[20,10,-20],[1,-2,1.5]],
    /*10*/[[20,10,20],[1,-2,1.5]],
    /*11*/[[-20,10,20],[2,-2,-4]],
    /*12*/[[15,10,15],[-3,-1,-3]],
    /*13*/[[5,10,20],[-6,-1,-3]],
    /*14*/[[15,-5,-15],[0,0,5]],
    /*15*/[[15,10,-15],[0,-2,5]],
    /*16*/[[10,8,10],[1,-3,1.5]],
    /*17*/[[15,10,-15],[0,-2,-1]],
    /*18*/[[15,10,-15],[0,-2,4]],
    /*19*/[[20,10,20],[0,-2,0]],
    /*20*/[[15,10,15],[-3,-1,-4]],
    /*21*/[[-15,10,15],[3,-1,3]],
    /*22*/[[-5,10,25],[5,-1,3]],
    /*23*/[[15,-5,-15],[0,0,5]],
    /*24*/[[15,10,-15],[0,-2,5]],
    /*25*/[[15,15,-15],[0,0,1]],
    /*26*/[[15,10,15],[0,-2,0]],
    /*27*/[[15,8,-15],[-2,-3,1]],
    /*28*/[[15,10,-15],[0,-2,0]],
    /*29*/[[20,10,-10],[0,-2,0]],
    /*30*/[[15,10,5],[-1,-2,1]],
    /*31*/[[50,30,0],[0,-2,-4]],
    /*32*/[[-10,10,10],[4,-3,-14]],
    /*33*/[[-15,10,-15],[4,-7,-14]],
    /*34*/[[-10,10,10],[4,-3,-4]],
    /*35*/[[-15,10,-15],[4,-7,-4]],
    /*36*/[[-10,10,10],[4,-3,4]],
    /*37*/[[-15,10,-15],[4,-7,4]],
    /*38*/[[-10,10,10],[4,-3,9]],
    /*39*/[[-15,10,-15],[4,-7,9]],
    /*40*/[[-10,10,10],[4,-3,13]],
    /*41*/[[-15,10,-15],[4,-7,13]],
    /*42*/[[-10,10,-10],[4,-3,14]],
    /*43*/[[-15,10,-15],[4,-7,14]],
    /*44*/[[35,15,10],[0,0,-5]]
    ];
    svgNum = [
    /*00*///[["b7x4","u4x"],["2","2"]],
    /*01*/[["b7x4","stickM5mm","topeL6mm","circleBig"],["x1","x1","x3","x1"]],
    /*02*/[["b7x4"],["x1"]],
    /*03*/[["u3x"],["x1"]],
    /*04*/[["hsmall"],["x2"]],
    /*05*/[["hsmall","u3x"],["x2","x1"]],
    /*06*/[["hsmall"],["x2"]],
    /*07*/[["hsmall"],["x2"]],
    /*08*/[["arrowS"],["x1"]],
    /*09*/[["b7x4","stickM5mm","topeL6mm","circleA"],["x1","x1","x3","x1"]],
    /*10*/[["b7x4"],["x1"]],
    /*11*/[["u3x"],["x1"]],
    /*12*/[["hsmall"],["x2"]],
    /*13*/[["hsmall","u3x"],["x2","x1"]],
    /*14*/[["hsmall"],["x2"]],
    /*15*/[["hsmall"],["x2"]],
    /*16*/[["arrowS"],["x1"]],
    /*17*/[["b7x4","stickM5mm","topeL6mm","circleMiddle"],["x1","x1","x3","x1"]],
    /*18*/[["stickM5mm","topeL6mm","circleC"],["x1","x3","x1"]],
    /*19*/[["b7x4"],["x1"]],
    /*20*/[["u3x"],["x1"]],
    /*21*/[["hsmall"],["x2"]],
    /*22*/[["hsmall","u3x"],["x2","x1"]],
    /*23*/[["hsmall"],["x2"]],
    /*24*/[["hsmall"],["x2"]],
    /*25*/[["arrowS"],["x2"]],
    /*26*/[["b4x3","stickM5mm","topeL6mm","circle1x"],["x1","x1","x3","x1"]],
    /*27*/[["stickM5mm","topeL6mm","circle2x"],["x1","x3","x1"]],
    /*28*/[["b4x3"],["x1"]],
    /*29*/[["u3x"],["x2"]],
    /*30*/[["arrowS"],["x2"]],
    /*31*/[["move"],[""]],
    /*32*/[["uLcorto"],["x1"]],
    /*33*/[["hlarge","u2x"],["x1","x1"]],
    /*34*/[["uLcorto"],["x1"]],
    /*35*/[["hlarge","u1x"],["x1","x1"]],
    /*36*/[["uLcorto"],["x1"]],
    /*37*/[["hlarge","u1x"],["x1","x1"]],
    /*38*/[["uLcorto"],["x1"]],
    /*39*/[["hlarge","u1x"],["x1","x1"]],
    /*40*/[["uLcorto"],["x1"]],
    /*41*/[["hlarge","u1x"],["x1","x1"]],
    /*42*/[["uLcorto"],["x1"]],
    /*43*/[["hlarge","u2x"],["x1","x1"]],
    /*45*/[["end"],[""]]
    ];
    svgNumtotal = [
        ["b7x4","x6"],
        ["b4x3","x2"],
        ["hsmall","x24"],
        ["stickM5mm","x6"],
        ["topeL6mm","x18"],
        ["u3x","x8"],
        ["arrowS","x6"],
        ["circleBig","x1"],
        ["circleA","x1"],
        ["circleMiddle","x1"],
        ["circleC","x1"],
        ["circle1x","x1"],
        ["circle2x","x1"],
        ["uLcorto","x6"],
        ["hlarge","x6"],
        ["u2x","x2"],
        ["u1x","x4"]
    ];
    addExpand();//Establece la expancion de las piezas por cada paso
    addAnimacamera();//Establece la nueva posicion animada de camara y escena en cada paso
    controlGroups();//Modifica que piezas se muesran o se ocultan en determinados pasos para hacer los grupos.
}
function setAnimation(){
    /*
	* NOMBRE: setAnimation.
	* UTILIDAD: Establece la animacion sin el Tween
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
}
function controlGroups(){
    /*
	* NOMBRE: controlGroups.
	* UTILIDAD: Modifica que piezas se muesran o se ocultan en determinados pasos para hacer los grupos.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(getBtnpress >= 9){
        for(i=0; i<=17; i++){
            allClones[i].visible = false;
        }
    }
    if(getBtnpress >= 17){
        for(i=18; i<=35; i++){
            allClones[i].visible = false;
        }
    }
    if(getBtnpress >= 26){
        for(i=36; i<=59; i++){
            allClones[i].visible = false;
        }
    }
    if(getBtnpress >= 31){
        for(i=60; i<=75; i++){
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
    }
}
function addTubeanima(){
    /*
	* NOMBRE: addTubeanima.
	* UTILIDAD: Establece la animacion con tween de la cuerda
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
}