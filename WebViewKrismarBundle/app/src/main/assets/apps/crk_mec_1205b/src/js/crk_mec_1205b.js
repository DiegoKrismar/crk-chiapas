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
totalPasos = 47;//Total de pasos para el armado.
setCamerapos = [60,10,30];//Establece la posicion de la camara
setScenepos = [0,0,0];//Establece la posicion de la camara
gridPosy = -16;//Posicion de la reticula en cada modelo
setRope = true;//Establece si hay animacion para cuerda
ropeStep = "46";//Paso en donde se anima la cuerda
var addAnima = false;//Indica si se esta animando la cuerda
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
    groupClone = new classClonegroup(0,-10,3.8,0,0,0,objVis,3,125);
    groupClone.creaClonegroup();
    
    //Paso 46
    groupCatmull = new THREE.CatmullRomCurve3( [//Todos los puntos ancla de la linea
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
    ]);
    pointsCatmull = groupCatmull.getPoints( 8 );//Esto hace que la cuerva tenga mas puntos
    //geometryLine = new THREE.Geometry().setFromPoints( pointsCatmull );//Geometria de linea
    //materialLine = new THREE.LineBasicMaterial( { color : 0xd5c800 } );
    //strokeLine = new THREE.Line(geometryLine,materialLine);//Se crea la linea
    //scene.add(strokeLine);
    geometryTube = new THREE.TubeBufferGeometry(groupCatmull, 220, 0.1, 8, false);
    meshTube = new THREE.Mesh(geometryTube, ropeMaterial);
    meshTube.name = "rope";
    allClones[126] = meshTube;//Guarda objeto en array
    scene.add(meshTube);
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
    /*00*///null, null, null, null, null, null, null, null, null, null, null, null, null, null,
    /*00*/[null,null,null], [null,null,null], [null,null,null],
    /*00*/[null,null,null], [null,null,null],
    /*00*/[null,null,null],
    /*00*/[null,null,null], [null,null,null], [null,null,null], [null,null,null], [null,null,null],
        
    /*01*/[null,null,null], [null,null,null], [null,-8,null], [null,-7,null], [null,-6,null],/*PRIMER PASO*/
    /*02*/[null,null,+5], [null,null,+5], [null,null,+5],
    /*03*/[null,null,-5], [null,null,-5], [null,null,-5],
    /*04*/[null,+3,null], [null,+5,null], [null,+7,null], [null,+5,null], [null,+3,null],
    /*05*/[+10,null,null], [+20,null,null],
    /*06*/[null,null,null], [null,null,null], [null,-7,null], [null,-6,null], [null,-5,null],
    /*07*/[null,null,+5], [null,null,+5],
    /*08*/[null,null,-5], [null,null,-5],
    /*09*/[null,+3,null], [null,+5,null], [null,+8,null], [null,+5,null], [null,+3,null],
    /*10*/[+10,null,null],
    /*11*/[null,null,null], [null,null,null], [null,-8,null], [null,-7,null], [null,-6,null], [null,-5,null],
    /*12*/[null,null,+5], [null,null,+5],
    /*13*/[null,null,-5], [null,null,-5],
    /*14*/[null,+3,null], [null,+5,null], [null,+8,null], [null,+5,null], [null,+3,null],
    /*15*/[+10,null,null],
    /*16*/[null,+3,null], [null,+5,null], [null,+8,null], [null,+5,null], [null,+3,null],
    /*17*/[+10,null,null],
    /*18*/[null,null,null], [null,null,+5], [null,null,-5],
    /*19*/[+20,null,null], [+16,null,null], [+12,null,null], [+8,null,null], [+4,null,null], [null,null,null], [-4,null,null], [-8,null,null], [-12,null,null], [-16,null,null],
    /*20*/[null,null,null], [null,null,null], [null,-5,null], [null,-5,null],
    /*21*/[null,+5,null], [null,+8,null], [null,+5,null],
    /*22*/[+10,null,null],
    /*23*/[null,+5,null], [null,+8,null], [null,+5,null],
    /*24*/[+10,null,null],
    /*25*/[null,+5,null], [null,+8,null], [null,+5,null],
    /*26*/[+10,null,null], [+20,null,null], 
    /*27*/[null,+5,null], [null,+5,null],
    /*28*/[null,null,+5],
    /*29*/[null,null,-5],
    /*30*/[null,-5,null], [null,-5,null],
    /*31*/[null,-5,null], [null,-5,null],
    /*32*/[null,null,-5],
    /*33*/[null,null,-5], [null,null,-5],
    /*34*/[null,null,-5],
    /*35*/[null,-5,null], [null,-5,null],
    /*36*/[null,-5,null], [null,-5,null],
    /*37*/[null,null,+5],
    /*38*/[null,null,+5], [null,null,+5],
    /*39*/[null,null,+5],
    /*40*/[null,-5,null], [null,-5,null],
    /*41*/[null,-5,null], [null,-5,null],
    /*42*/[null,+5,null],
    /*43*/[null,+5,null],
    /*44*/[null,-5,null], [null,-5,null],
    /*45*/[+5,+5,null], [+5,+5,null],
    /*46*/[null,null,null],
    /*47*/[null,null,null]
    ];
    contPieza = [
    /*00*///"pieza inicio","pieza final"],

    /*01*/[11,15], 
    /*02*/[16,18],
    /*03*/[19,21],
    /*04*/[22,26],
    /*05*/[27,28],
    /*06*/[29,33],
    /*07*/[34,35],
    /*08*/[36,37],
    /*09*/[38,42],
    /*10*/[43,43],
    /*11*/[44,49],
    /*12*/[50,51],
    /*13*/[52,53],
    /*14*/[54,58],
    /*15*/[59,59],
    /*16*/[60,64],
    /*17*/[65,65],
    /*18*/[66,68],
    /*19*/[69,78],
    /*20*/[79,82],
    /*21*/[83,85],
    /*22*/[86,86],
    /*23*/[87,89],
    /*24*/[90,90],  
    /*25*/[91,93],
    /*26*/[94,95],  
    /*27*/[96,97],
    /*28*/[98,98],
    /*29*/[99,99],
    /*30*/[100,101],
    /*31*/[102,103],
    /*32*/[104,104],
    /*33*/[105,106],
    /*34*/[107,107],
    /*35*/[108,109],
    /*36*/[110,111],
    /*37*/[112,112],
    /*38*/[113,114],
    /*39*/[115,115],
    /*40*/[116,117],
    /*41*/[118,119],
    /*42*/[120,120],
    /*43*/[121,121],
    /*44*/[122,123],
    /*45*/[124,125],
    /*46*/[126,126],
    /*47*/[null,null]
    ];
    newLookat = [
    /*00*///[[40,20,40],[0,0,-30]],

    /*01*/[[20,10,20],[0,5,0]],
    /*02*/[[15,10,15],[0,3,-3]],
    /*03*/[[15,10,-15],[0,3,3]],
    /*04*/[[5,5,-20],[0,-3,0]],
    /*05*/[[10,5,-35],[0,-3,0]],
    /*06*/[[20,10,20],[0,5,0]],
    /*07*/[[15,10,15],[0,3,-3]],
    /*08*/[[15,10,-15],[0,3,3]],
    /*09*/[[5,5,-20],[0,-3,0]],
    /*10*/[[10,5,-35],[0,-3,0]],
    /*11*/[[20,10,20],[0,5,0]],
    /*12*/[[15,10,15],[0,3,-3]],
    /*13*/[[15,10,-15],[0,3,3]],
    /*14*/[[5,5,20],[0,-4,-2]],
    /*15*/[[10,5,35],[0,-3,-2]],
    /*16*/[[5,5,-20],[0,-4,2]],
    /*17*/[[10,5,-35],[0,-3,2]],
    /*18*/[[20,15,20],[0,-16,0]],
    /*19*/[[30,50,30],[0,-16,0]],
    /*20*/[[30,10,10],[0,-15,0]],
    /*21*/[[8,15,20],[0,-16,7.6]],
    /*22*/[[10,25,15],[0,-16,7.6]],
    /*23*/[[8,15,-20],[0,-16,-7.6]],
    /*24*/[[10,25,-15],[0,-16,-7.6]],
    /*25*/[[5,15,-15],[0,-16,-13]],
    /*26*/[[5,15,15],[0,-16,-13]],
    /*27*/[[30,20,30],[0,-16,0]],
    /*28*/[[20,10,20],[0,-16,-15]],
    /*29*/[[20,10,-20],[0,-16,15]],
    /*30*/[[15,10,-15],[0,-14,14]],
    /*31*/[[25,10,-25],[0,-8,14]],
    /*32*/[[15,10,-15],[0,-14,16]],
    /*33*/[[15,10,-15],[0,1,16]],
    /*34*/[[15,10,-15],[0,14,16]],
    /*35*/[[15,10,15],[0,-14,-14]],
    /*36*/[[25,10,25],[0,-8,-14]],
    /*37*/[[15,10,15],[0,-13,-16]],
    /*38*/[[15,10,15],[0,1,-16]],
    /*39*/[[15,10,15],[0,14,-16]],
    /*40*/[[15,10,-15],[0,16,-14]],
    /*41*/[[15,10,15],[0,16,14]],
    /*42*/[[-30,20,30],[5,16,0]],
    /*43*/[[30,20,30],[-5,16,0]],
    /*44*/[[30,-10,5],[0,16,0]],
    /*45*/[[50,10,20],[0,0,0]],
    /*46*/[[70,10,40],[0,0,0]],
    /*47*/[[55,10,30],[0,0,0]]
    ];
    svgNum = [
    /*00*///[["b7x4","u4x"],["2","2"]],

    /*01*/[["b4x3","u3x"],["x2","x3"]],
    /*02*/[["u3x"],["x3"]],
    /*03*/[["u3x"],["x3"]],
    /*04*/[["topeL9mm","hang8"],["x4","x1"]],
    /*05*/[["strawM","stickM5mm"],["x1","x1"]],
    /*06*/[["b4x3","u3x"],["x2","x3"]],
    /*07*/[["u3x"],["x2"]],
    /*08*/[["u3x"],["x2"]],
    /*09*/[["topeL9mm","poleaFull"],["x4","x1"]],
    /*10*/[["stickM4mm"],["x1"]],
    /*11*/[["b7x4","u3x"],["x2","x4"]],
    /*12*/[["u3x"],["x2"]],
    /*13*/[["u3x"],["x2"]],
    /*14*/[["topeL9mm","poleaFull"],["x4","x1"]],
    /*15*/[["stickM4mm"],["x1"]],
    /*16*/[["topeL9mm","poleaFull"],["x4","x1"]],
    /*17*/[["stickM4mm"],["x1"]],
    /*18*/[["b11x1","hsmall"],["x2","x1"]],
    /*19*/[["clone"],["x10"]],
    /*20*/[["u4x"],["x2"]],
    /*21*/[["topeL6mm","poleaFull"],["x2","x1"]],
    /*22*/[["stickS4mm"],["x1"]],
    /*23*/[["topeL6mm","poleaFull"],["x2","x1"]],
    /*24*/[["stickS4mm"],["x1"]],
    /*25*/[["topeL6mm","hang8"],["x2","x1"]],
    /*26*/[["strawM","stickM5mm"],["x1","x1"]],
    /*27*/[["move"],[""]],
    /*28*/[["u4x"],["x1"]],
    /*29*/[["u4x"],["x1"]],
    /*30*/[["hsmall"],["x2"]],
    /*31*/[["move"],[""]],
    /*32*/[["u4x"],["x1"]],
    /*33*/[["u4x"],["x2"]],
    /*34*/[["u4x"],["x1"]],
    /*35*/[["hsmall"],["x2"]],
    /*36*/[["move"],[""]],
    /*37*/[["u4x"],["x1"]],
    /*38*/[["u4x"],["x2"]],
    /*39*/[["u4x"],["x1"]],
    /*40*/[["u2x"],["x2"]],
    /*41*/[["u2x"],["x2"]],
    /*42*/[["move"],[""]],
    /*43*/[["move"],[""]],
    /*44*/[["u6x"],["x2"]],
    /*45*/[["move"],[""]],
    /*46*/[["cuerdaL"],["x1"]],
    /*47*/[["end"],[""]]
    ];
    svgNumtotal = [

        ["b7x4","x2"],
        ["b4x3","x4"],
        ["u3x","x24"],
        ["u2x","x4"],
        ["topeL9mm","x16"],
        ["stickM5mm","x2"],
        ["stickS4mm","x2"],
        ["stickM4mm","x3"],
        ["b11x1","x20"],
        ["hsmall","x14"],
        ["u4x","x12"],
        ["topeL6mm","x6"],
        ["strawM","x2"],
        ["hang8","x2"],
        ["u6x","x2"],
        ["cuerdaL","x1"],
        ["poleaFull","x5"]
    ];
}
function addTubeanima(){
    /*
	* NOMBRE: addTubeanima.
	* UTILIDAD: Establece la animacion con tween de la cuerda
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    addAnima = false;
    if(getBtnpress === ropeStep){
        addAnima = true;
        //Puntos cuerda
        var point1 = new TWEEN.Tween(groupCatmull.points[1])
        .to({
            x: 0,
            y: 0.8,
            z: 6.5
        },timeGrl)
        .yoyo(true)
        .delay(timeGrl)
        .easing(easeEffect)
        .repeat(1).start();
        var point2 = new TWEEN.Tween(groupCatmull.points[2])
        .to({
            x: 0,
            y: 0.8,
            z: 4.8
        },timeGrl)
        .yoyo(true)
        .delay(timeGrl)
        .easing(easeEffect)
        .repeat(1).start();
        var point5 = new TWEEN.Tween(groupCatmull.points[5])
        .to({
            x: 0,
            y: 0.8,
            z: 2.8
        },timeGrl)
        .yoyo(true)
        .delay(timeGrl)
        .easing(easeEffect)
        .repeat(1).start();
        var point6 = new TWEEN.Tween(groupCatmull.points[6])
        .to({
            x: 0,
            y: 0.8,
            z: 1
        },timeGrl)
        .yoyo(true)
        .delay(timeGrl)
        .easing(easeEffect)
        .repeat(1).start();
        var point9 = new TWEEN.Tween(groupCatmull.points[9])
        .to({
            x: 0,
            y: -8.5,
            z: -8.5
        },timeGrl)
        .yoyo(true)
        .delay(timeGrl)
        .easing(easeEffect)
        .repeat(1).start();
        //Canastas
        var canasta1 = new TWEEN.Tween(allClones[124].position)
        .to({
            x: 0,
            y: -11,
            z: -8.5
        },timeGrl)
        .yoyo(true)
        .delay(timeGrl)
        .easing(easeEffect)
        .repeat(1).start();
        var canasta2 = new TWEEN.Tween(allClones[125].position)
        .to({
            x: 0,
            y: -2,
            z: 3.8
        },timeGrl)
        .yoyo(true)
        .delay(timeGrl)
        .easing(easeEffect)
        .repeat(1).start();
        //Poleas
        var polea1 = new TWEEN.Tween(allClones[125].children[12].rotation)
        .to({
            x: girRad*360,
            y: 0,
            z: girRad*90
        },timeGrl)
        .delay(timeGrl)
        .yoyo(true)
        .onComplete(function(){
            addAnima = false;
        })
        .easing(easeEffect)
        .repeat(1).start();
        var polea2 = new TWEEN.Tween(allClones[88].rotation)
        .to({
            x: -(girRad*180),
            y: 0,
            z: girRad*90
        },timeGrl)
        .delay(timeGrl)
        .yoyo(true)
        .easing(easeEffect)
        .repeat(1).start();
        var polea3 = new TWEEN.Tween(allClones[125].children[18].rotation)
        .to({
            x: girRad*360,
            y: 0,
            z: girRad*90
        },timeGrl)
        .delay(timeGrl)
        .yoyo(true)
        .easing(easeEffect)
        .repeat(1).start();
        var polea4 = new TWEEN.Tween(allClones[84].rotation)
        .to({
            x: -(girRad*180),
            y: 0,
            z: girRad*90
        },timeGrl)
        .delay(timeGrl)
        .yoyo(true)
        .easing(easeEffect)
        .repeat(1).start();
    }
}
function setAnimation(){
    /*
	* NOMBRE: setAnimation.
	* UTILIDAD: Establece la animacion sin el Tween
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(addAnima === true && statusAnima === "PIEZA"){
        //Actualizacion de la animacion de la cuerda
        catmullFollow();//Points catmull siguen la posicion de las puntos clave
    }
}
function controlGroups(){
    /*
	* NOMBRE: controlGroups.
	* UTILIDAD: Modifica que piezas se muesran o se ocultan en determinados pasos para hacer los grupos.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(getBtnpress >= 1){
        for(i=0; i<=10; i++){
            allClones[i].visible = false;
        }
    }
    if(getBtnpress >= 6){
        for(i=0; i<=28; i++){
            allClones[i].visible = false;
        }
    }
    if(getBtnpress >= 11){
        for(i=0; i<=43; i++){
            allClones[i].visible = false;
        }
    }
    if(getBtnpress >= 18){
        for(i=0; i<=65; i++){
            allClones[i].visible = false;
        }
    }
    if(getBtnpress >= 20){
        for(i=0; i<=78; i++){
            allClones[i].visible = false;
        }
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
    var newCable = new THREE.TubeBufferGeometry(meshTube.geometry.parameters.path, 220, 0.1, 8, false);
    meshTube.geometry.copy(newCable);
    meshTube.geometry.needsUpdate = true;
}