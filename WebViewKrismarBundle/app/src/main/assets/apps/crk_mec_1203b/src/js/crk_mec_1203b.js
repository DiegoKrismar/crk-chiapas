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
totalPasos = 32;//Total de pasos para el armado.
setCamerapos = [60,10,50];//Establece la posicion de la camara
setScenepos = [0,0,0];//Establece la posicion de la camara
gridPosy = -20.6;//Posicion de la reticula en cada modelo
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
    gltfClone = new classClonegltf("b11x1",1.3,0,0,0,0,girRad*90,objVis,0);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",-1.3,0,0,0,0,girRad*90,objVis,1);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u2x",0,1,3.9,girRad*90,-(girRad*90),0,objVis,2);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u2x",0,-1,-3.9,-(girRad*90),-(girRad*90),0,objVis,3);
    gltfClone.creaClonegltf();
    
    //Paso 2
    shapeGroup = new classGroup([[0,3]],objVis,0);
    shapeGroup.creaGroup();
    
    groupClone = new classClonegroup(0,0,0,0,0,0,objVis,0,4);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(-8,0,0,0,0,0,objVis,0,5);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(-16,0,0,0,0,0,objVis,0,6);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(-24,0,0,0,0,0,objVis,0,7);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(8,0,0,0,0,0,objVis,0,8);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(16,0,0,0,0,0,objVis,0,9);
    groupClone.creaClonegroup();
    
    //Paso 3
    gltfClone = new classClonegltf("circleBig",-1.75,0,0,girRad*30,0,girRad*90,objVis,10);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("circleBig",1.75,0,0,girRad*30,0,girRad*90,objVis,11);
    gltfClone.creaClonegltf();
    
    groupClone = new classClonegroup(0,10.37,0,girRad*90,0,0,objVis,0,12);
    groupClone.creaClonegroup();
    
    //Paso 4
    meshClone = new classCloneshape("straw",0,5.2,0,0,0,girRad*90,6.5,objVis,13);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,3.9,0,0,0,girRad*90,6.5,objVis,14);
    meshClone.creaClonemesh();
    
    //Paso 5
    groupClone = new classClonegroup(0,5.2,-8.98,girRad*30,0,0,objVis,0,15);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(0,-5.2,-8.98,-(girRad*30),0,0,objVis,0,16);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(0,-10.37,0,girRad*90,0,0,objVis,0,17);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(0,-5.2,8.98,-(girRad*150),0,0,objVis,0,18);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(0,5.2,8.98,girRad*150,0,0,objVis,0,19);
    groupClone.creaClonegroup();
    meshClone = new classCloneshape("straw",0,2.6,-4.5,0,0,girRad*90,6.5,objVis,20);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,1.96,-3.38,0,0,girRad*90,6.5,objVis,21);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-2.6,-4.5,0,0,girRad*90,6.5,objVis,22);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-1.96,-3.38,0,0,girRad*90,6.5,objVis,23);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-5.2,0,0,0,girRad*90,6.5,objVis,24);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-3.9,0,0,0,girRad*90,6.5,objVis,25);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-2.6,4.5,0,0,girRad*90,6.5,objVis,26);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-1.96,3.38,0,0,girRad*90,6.5,objVis,27);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,2.6,4.5,0,0,girRad*90,6.5,objVis,28);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,1.96,3.38,0,0,girRad*90,6.5,objVis,29);
    meshClone.creaClonemesh();
    
    //Paso 06
    gltfClone = new classClonegltf("arrow",1.6,17.97,0,girRad*180,0,girRad*90,objVis,30);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("arrow",-1.6,17.97,0,girRad*180,0,girRad*90,objVis,31);
    gltfClone.creaClonegltf();
    
    //Paso 07
    meshClone = new classCloneshape("straw",0,16.85,0,0,0,girRad*90,6.5,objVis,32);
    meshClone.creaClonemesh();
    
    //Paso 08
    gltfClone = new classClonegltf("arrow",1.6,9,-15.55,girRad*120,0,girRad*90,objVis,33);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("arrow",-1.6,9,-15.55,girRad*120,0,girRad*90,objVis,34);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("arrow",1.6,-9,-15.55,girRad*60,0,girRad*90,objVis,35);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("arrow",-1.6,-9,-15.55,girRad*60,0,girRad*90,objVis,36);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("arrow",1.6,-17.97,0,0,0,girRad*90,objVis,37);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("arrow",-1.6,-17.97,0,0,0,girRad*90,objVis,38);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("arrow",1.6,-9,15.55,-(girRad*60),0,girRad*90,objVis,39);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("arrow",-1.6,-9,15.55,-(girRad*60),0,girRad*90,objVis,40);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("arrow",1.6,9,15.55,-(girRad*120),0,girRad*90,objVis,41);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("arrow",-1.6,9,15.55,-(girRad*120),0,girRad*90,objVis,42);
    gltfClone.creaClonegltf();
    meshClone = new classCloneshape("straw",0,8.45,-14.58,0,0,girRad*90,6.5,objVis,43);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-8.45,-14.58,0,0,girRad*90,6.5,objVis,44);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-16.85,0,0,0,girRad*90,6.5,objVis,45);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-8.45,14.58,0,0,girRad*90,6.5,objVis,46);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,8.45,14.58,0,0,girRad*90,6.5,objVis,47);
    meshClone.creaClonemesh();
    
    //Paso 09
    gltfClone = new classClonegltf("b11x1",1.3,0,0,0,0,girRad*90,objVis,48);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",-1.3,0,0,0,0,girRad*90,objVis,49);
    gltfClone.creaClonegltf();
    
    gltfClone = new classClonegltf("u2x",0,1,5.2,girRad*90,-(girRad*90),0,objVis,50);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u2x",0,1,-5.2,girRad*90,-(girRad*90),0,objVis,51);
    gltfClone.creaClonegltf();
    
    //Paso 10
    shapeGroup = new classGroup([[48,51]],objVis,1);
    shapeGroup.creaGroup();
    
    groupClone = new classClonegroup(0,0,0,0,0,0,objVis,1,52);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(-8,0,0,0,0,0,objVis,1,53);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(-16,0,0,0,0,0,objVis,1,54);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(-24,0,0,0,0,0,objVis,1,55);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(8,0,0,0,0,0,objVis,1,56);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(16,0,0,0,0,0,objVis,1,57);
    groupClone.creaClonegroup();
    
    //Paso 11
    groupClone = new classClonegroup(0,15.45,-8.9,-(girRad*30),0,0,objVis,1,58);
    groupClone.creaClonegroup();
    
    //Paso 12
    meshClone = new classCloneshape("straw",0,18.7,-3.26,0,0,girRad*90,6.5,objVis,59);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,12.18,-14.57,0,0,girRad*90,6.5,objVis,60);
    meshClone.creaClonemesh();
    
    //Paso 13
    groupClone = new classClonegroup(0,0,-17.82,-(girRad*90),0,0,objVis,1,61);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(0,-15.45,-8.9,-(girRad*150),0,0,objVis,1,62);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(0,-15.45,8.9,-(girRad*210),0,0,objVis,1,63);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(0,0,17.82,-(girRad*270),0,0,objVis,1,64);
    groupClone.creaClonegroup();
    groupClone = new classClonegroup(0,15.45,8.9,-(girRad*330),0,0,objVis,1,65);
    groupClone.creaClonegroup();
    meshClone = new classCloneshape("straw",0,-6.56,-17.82,0,0,girRad*90,6.5,objVis,66);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,6.56,-17.82,0,0,girRad*90,6.5,objVis,67);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-18.7,-3.26,0,0,girRad*90,6.5,objVis,68);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-12.18,-14.57,0,0,girRad*90,6.5,objVis,69);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-18.7,3.26,0,0,girRad*90,6.5,objVis,70);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-12.18,14.57,0,0,girRad*90,6.5,objVis,71);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,-6.56,17.82,0,0,girRad*90,6.5,objVis,72);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,6.56,17.82,0,0,girRad*90,6.5,objVis,73);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,18.7,3.26,0,0,girRad*90,6.5,objVis,74);
    meshClone.creaClonemesh();
    meshClone = new classCloneshape("straw",0,12.18,14.57,0,0,girRad*90,6.5,objVis,75);
    meshClone.creaClonemesh();
    
    //Paso 14
    gltfClone = new classClonegltf("b11x1",1.3,-13,6.45,girRad*90,0,girRad*90,objVis,76);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",-1.3,-13,6.45,girRad*90,0,girRad*90,objVis,77);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u2x",0,-5.88,6.45,girRad*90,-(girRad*90),0,objVis,78);
    gltfClone.creaClonegltf();
    
    //Paso 15
    gltfClone = new classClonegltf("u3x",0,-20.14,6.45,girRad*90,-(girRad*90),0,objVis,79);
    gltfClone.creaClonegltf();
    
    //Paso 16
    gltfClone = new classClonegltf("u6x",2.57,-20.14,0,0,0,girRad*90,objVis,80);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u6x",-2.57,-20.14,0,0,0,girRad*90,objVis,81);
    gltfClone.creaClonegltf();
    
    //Paso 17
    gltfClone = new classClonegltf("u3x",0,-20.14,-6.45,girRad*90,-(girRad*90),0,objVis,82);
    gltfClone.creaClonegltf();
    
    //Paso 18
    gltfClone = new classClonegltf("b11x1",1.3,-13,-6.45,girRad*90,0,girRad*90,objVis,83);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",-1.3,-13,-6.45,girRad*90,0,girRad*90,objVis,84);
    gltfClone.creaClonegltf();
    
    //Paso 19
    gltfClone = new classClonegltf("u2x",0,-5.88,-6.45,girRad*90,-(girRad*90),0,objVis,85);
    gltfClone.creaClonegltf();
    
    //Paso 20
    gltfClone = new classClonegltf("grade7",0,-4.82,6.45,girRad*13.5,0,girRad*90,objVis,86);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("grade7",0,-4.82,-6.45,girRad*13.5,0,girRad*90,objVis,87);
    gltfClone.creaClonegltf();
    
    //Paso 21
    gltfClone = new classClonegltf("u2x",0,-3.88,6,-(girRad*115.71),-(girRad*90),0,objVis,88);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u2x",0,-3.88,-6,-(girRad*64.29),-(girRad*90),0,objVis,89);
    gltfClone.creaClonegltf();
    
    //Paso 22
    gltfClone = new classClonegltf("b11x1",-1.3,2.5,-2.5,(girRad*118.71),0,girRad*90,objVis,90);
    gltfClone.creaClonegltf();
    
    //Paso 23
    gltfClone = new classClonegltf("b11x1",1.3,2.5,2.5,(girRad*61.29),0,girRad*90,objVis,91);
    gltfClone.creaClonegltf();
    
    //Paso 24
    gltfClone = new classClonegltf("topeL9mm",0.7,7.05,0,0,0,girRad*90,objVis,92);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL6mm",0,7.05,0,0,0,girRad*90,objVis,93);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",-0.7,7.05,0,0,0,girRad*90,objVis,94);
    gltfClone.creaClonegltf();
    
    
    //Paso 25
    meshClone = new classCloneshape("straw",-1.1,7.05,0,0,0,girRad*90,6.5,objVis,95);
    meshClone.creaClonemesh();
    
    //Paso 26
    shapeGroup = new classGroup([[76,95]],objVis,2);
    shapeGroup.creaGroup();

    groupClone = new classClonegroup(6.45,0,0,0,0,0,objVis,2,96);
    groupClone.creaClonegroup();
    
    groupClone = new classClonegroup(-6.45,0,0,0,girRad*180,0,objVis,2,97);
    groupClone.creaClonegroup();
    
    //Paso 27
    gltfClone = new classClonegltf("u4x",0,-20.15,3.88,girRad*90,-(girRad*90),0,objVis,98);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u4x",0,-20.15,-3.85,girRad*90,-(girRad*90),0,objVis,99);
    gltfClone.creaClonegltf();
    
    //Paso 28
    gltfClone = new classClonegltf("topeL9mm",4.5,7.05,0,0,0,girRad*90,objVis,100);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",3.5,7.05,0,0,0,girRad*90,objVis,101);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",2.5,7.05,0,0,0,girRad*90,objVis,102);
    gltfClone.creaClonegltf();
    
    //Paso 29
    gltfClone = new classClonegltf("topeL9mm",-4.5,7.05,0,0,0,girRad*90,objVis,103);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",-3.5,7.05,0,0,0,girRad*90,objVis,104);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",-2.5,7.05,0,0,0,girRad*90,objVis,105);
    gltfClone.creaClonegltf();
    
    //Paso 30
    shapeGroup = new classGroup([[10,47],[58,75]],objVis,3);
    shapeGroup.creaGroup();

    groupClone = new classClonegroup(0,7.07,0,0,0,0,objVis,3,106);
    groupClone.creaClonegroup();
    
    //Paso 31
    meshClone = new classCloneshape("stick",0,7.07,0,0,0,girRad*90,22,objVis,107);
    meshClone.creaClonemesh();
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
    /*01*/[null,null,null], [null,null,null], [null,+5,null], [null,-5,null],
    /*02*/[0,null,null], [+8,null,null], [+16,null,null], [+24,null,null], [-8,null,null], [-16,null,null],
    /*03*/[null,null,null], [null,null,null], [null,+5,null],
    /*04*/[+10,null,null], [+10,null,null], 
    /*05*/[null,+3,-5],[null,-3,-5],[null,-5,null],[null,-3,+5],[null,+3,+5],[+15,null,null], [+15,null,null],[+15,null,null], [+15,null,null],[+15,null,null], [+15,null,null],[+15,null,null], [+15,null,null],[+15,null,null], [+15,null,null],
    /*06*/[+5,null,null], [-5,null,null],
    /*07*/[+15,null,null],
    /*08*/[+5,null,null], [-5,null,null],[+5,null,null], [-5,null,null],[+5,null,null], [-5,null,null],[+5,null,null], [-5,null,null],[+5,null,null], [-5,null,null],[15,null,null],[15,null,null],[15,null,null],[15,null,null],[15,null,null], 
    /*09*/[null,null,null], [null,null,null], [null,+5,null], [null,+5,null],
    /*10*/[0,null,null], [+8,null,null], [+16,null,null], [+24,null,null], [-8,null,null], [-16,null,null],  
    /*11*/[null,+5,-3],
    /*12*/[+15,null,null], [+15,null,null], 
        
    /*13*/[null,null,-5],[null,-5,-3],[null,-5,+3],[null,null,+5],[null,+5,+3],[+15,null,null], [+15,null,null],[+15,null,null], [+15,null,null],[+15,null,null], [+15,null,null],[+15,null,null], [+15,null,null],[+15,null,null], [+15,null,null],
        
    /*14*/[null,null,null], [null,null,null], [null,+5,null],
    /*15*/[null,-5,null],
    /*16*/[null,-5,null], [null,-5,null],
    /*17*/[null,+5,null],
    /*18*/[null,+5,null], [null,+5,null],
    /*19*/[null,+5,null],
    /*20*/[null,+5,null], [null,+5,null],
    /*21*/[null,+5,-3], [null,+5,+3],
    /*22*/[null,+5,+3],
    /*23*/[null,+5,-3],
    /*24*/[null,+5,null], [null,+8,null], [null,+5,null],
    /*25*/[+10,null,null],
    /*26*/[-6.45,null,null], [+6.45,null,null],
    /*27*/[null,+5,null], [null,+5,null],
    /*28*/[-3.5,null,null], [-3.6,null,null], [-3.7,null,null],
    /*29*/[+3.5,null,null], [+3.6,null,null], [+3.7,null,null], 
    /*30*/[null,+24,null],
    /*31*/[+22,null,null]
    ];
    contPieza = [
    /*00*///"pieza inicio","pieza final"],
    /*01*/[0,3],
    /*02*/[4,9],
    /*03*/[10,12],
    /*04*/[13,14], 
    /*05*/[15,29], 
    /*06*/[30,31],
    /*07*/[32,32],
    /*08*/[33,47],  
    /*09*/[48,51],
    /*10*/[52,57],  
    /*11*/[58,58],
    /*12*/[59,60], 
        
    /*13*/[61,75],
        
    /*14*/[76,78],
    /*15*/[79,79],
    /*16*/[80,81],
    /*17*/[82,82],
    /*18*/[83,84],
    /*19*/[85,85],
    /*20*/[86,87],
    /*21*/[88,89],
    /*22*/[90,90],
    /*23*/[91,91], 
    /*24*/[92,94],
    /*25*/[95,95],    
    /*26*/[96,97],
    /*27*/[98,99],   
    /*28*/[100,102],
    /*29*/[103,105], 
    /*30*/[106,106],
    /*31*/[107,107], 
    /*32*/[null,null]
    ];
    newLookat = [
    /*00*///[[40,20,40],[0,0,-30]],
    /*01*/[[25,10,15],[0,0,0]],
    /*02*/[[30,30,50],[0,0,0]],
    /*03*/[[40,10,20],[0,-4.5,0]],
    /*04*/[[15,5,15],[0,-4.5,0]], 
    /*05*/[[45,5,-15],[0,0,0]], 
    /*06*/[[25,20,10],[0,-17,0]],
    /*07*/[[20,20,-5],[0,-17,0]], 
    /*08*/[[45,5,15],[0,0,0]], 
    /*09*/[[25,10,15],[0,0,0]],
    /*10*/[[30,30,50],[0,0,0]],
    /*11*/[[40,5,0],[0,-15.5,9]],
    /*12*/[[30,30,-10],[0,-15.5,9]],
        
    /*13*/[[55,5,-25],[0,0,0]], 
        
    /*14*/[[25,10,25],[0,7,-6]],
    /*15*/[[25,-10,25],[0,19,-6]],
    /*16*/[[15,10,-30],[0,19,-6]],
    /*17*/[[25,10,-25],[0,19,6]],
    /*18*/[[30,10,30],[0,13,6]],
    /*19*/[[25,10,25],[0,7,6]],
    /*20*/[[30,15,0],[0,7,0]],
    /*21*/[[30,10,15],[0,7,0]],
    /*22*/[[30,20,-30],[2,4,6]],
    /*23*/[[30,20,30],[-2,4,-6]],
    /*24*/[[10,5,20],[0,-7,0]],
    /*25*/[[-10,5,20],[0,-7,0]],
    /*26*/[[20,20,50],[0,7,0]],
    /*27*/[[0,20,35],[0,20,0]],
    /*28*/[[-10,5,20],[-3,-7,0]],
    /*29*/[[10,5,20],[3,-7,0]],
    /*30*/[[40,20,40],[0,-7,0]],
    /*31*/[[45,20,45],[0,-7,0]],
    /*32*/[[60,10,50],[0,2,0]]
    ];
    svgNum = [
    /*00*///[["b7x4","u4x"],["2","2"]],
    /*01*/[["b11x1","u2x"],["x2","x2"]],
    /*02*/[["clone"],["x6"]],
    /*03*/[["circleBig"],["x2"]],
    /*04*/[["strawM"],["x2"]],  
    /*05*/[["strawM"],["x10"]],
    /*06*/[["arrow"],["x2"]],
    /*07*/[["strawM"],["x1"]],
    /*08*/[["arrow","strawM"],["x10","x5"]],
    /*09*/[["b11x1","u2x"],["x2","x2"]],
    /*10*/[["clone"],["x6"]],
    /*11*/[["move"],[""]],
    /*12*/[["strawM"],["x2"]],
        
    /*13*/[["strawM"],["x10"]],
        
    /*14*/[["b11x1","u2x"],["x2","x1"]],
    /*15*/[["u3x"],["x1"]],
    /*16*/[["u6x"],["x2"]],
    /*17*/[["u3x"],["x1"]],
    /*18*/[["b11x1"],["x2"]],
    /*19*/[["u2x"],["x1"]],
    /*20*/[["grade7"],["x2"]],
    /*21*/[["u2x"],["x2"]],
    /*22*/[["b11x1"],["x1"]],
    /*23*/[["b11x1"],["x1"]],
    /*24*/[["topeL9mm","topeL6mm"],["x2","x1"]],
    /*25*/[["strawM"],["x1"]],
    /*26*/[["clone"],["x2"]],
    /*27*/[["u4x"],["x2"]],
    /*28*/[["topeL9mm"],["x3"]],
    /*29*/[["topeL9mm"],["x3"]],
    /*30*/[["move"],[""]],
    /*31*/[["stickE5mm"],["x1"]],
    /*32*/[["end"],[""]]
    ];
    svgNumtotal = [
        ["b11x1","x36"],
        ["circleBig","x2"],
        ["strawM","x32"],
        ["arrow","x12"],
        ["u2x","x32"],
        ["u3x","x4"],
        ["u6x","x4"],
        ["u4x","x2"],
        ["grade7","x4"],
        ["topeL9mm","x10"],
        ["topeL6mm","x2"],
        ["stickE5mm","x1"]
    ];
    addExpand();//Establece la expancion de las piezas por cada paso
    addAnimacamera();//Establece la nueva posicion animada de camara y escena en cada paso
    controlGroups();//Modifica que piezas se muesran o se ocultan en determinados pasos para hacer los grupos. 
}
function controlGroups(){
    /*
	* NOMBRE: controlGroups.
	* UTILIDAD: Modifica que piezas se muesran o se ocultan en determinados pasos para hacer los grupos.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(getBtnpress >= 2){
        for(i=0; i<=3; i++){
            allClones[i].visible = false;
        }
    }
    if(getBtnpress >= 3){
        for(i=0; i<=9; i++){
            allClones[i].visible = false;
        }
    }
    if(getBtnpress >= 9){
        for(i=0; i<=47; i++){
            allClones[i].visible = false;
        } 
    }
    if(getBtnpress >= 10){
        for(i=0; i<=51; i++){
            allClones[i].visible = false;
        }
    }
    if(getBtnpress >= 11){
        for(i=0; i<=57; i++){
            allClones[i].visible = false;
        }
        for(i=10; i<=47; i++){
            allClones[i].visible = true;
        }
    }
    if(getBtnpress >= 14){
        for(i=0; i<=75; i++){
            allClones[i].visible = false;
        }
    }
    if(getBtnpress >= 26){
        for(i=0; i<=95; i++){
            allClones[i].visible = false;
        }
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