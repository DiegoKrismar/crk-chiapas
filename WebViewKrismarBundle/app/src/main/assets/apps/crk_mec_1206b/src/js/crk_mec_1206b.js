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
totalPasos = 45;//Total de pasos para el armado.
setCamerapos = [60,10,30];//Establece la posicion de la camara
setScenepos = [0,0,0];//Establece la posicion de la camara
gridPosy = -19;//Posicion de la reticula en cada modelo
setRope = true;//Establece si hay animacion para cuerda
ropeStep = "44";//Paso en donde se anima la cuerda
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
    /*01*/[null,null,null], [null,+5,null], [null,-5,null],/*PRIMER PASO*/
    /*02*/[null,+5,null], [null,+5,null],
    /*03*/[null,+5,null], [null,-5,null],
    /*04*/[null,+5,null], [null,-5,null],
    /*05*/[null,null,-5],
    /*06*/[null,+5,null],
    /*07*/[null,+5,null], [null,-5,null],
    /*08*/[null,null,+5], [null,null,null], [null,null,-5], 
    /*09*/[null,null,+2.5], [null,null,+5],
    /*10*/[+15,null,null], [+10,null,null], [+5,null,null], [null,null,null], [-5,null,null], [-10,null,null], [null,null,null],
    /*11*/[null,null,-5],
    /*12*/[null,null,-5],
    /*13*/[null,null,-5],
    /*14*/[null,null,-5],
    /*15*/[null,null,+5],
    /*16*/[null,null,+5],
    /*17*/[null,null,+5],
    /*18*/[null,null,+5],
    /*19*/[-3.85,null,null], [+3.85,null,null],
    /*20*/[null,null,-5], [null,null,+5],
    /*21*/[null,+6,null], [null,+5,null], [null,+4,null],
    /*22*/[null,null,-5], [null,null,-5], 
    /*23*/[null,-5,null],
    /*24*/[null,-5,null], [null,-5,null],
    /*25*/[null,-5,null],
    /*26*/[null,null,+5], [null,null,+5], 
    /*27*/[null,-5,null],
    /*28*/[null,-5,null], [null,-5,null],
    /*29*/[null,null,+5], [null,null,+5],
    /*30*/[null,-5,null], [null,-5,null],
    /*31*/[null,null,-5], [null,null,-5],
    /*32*/[null,+5,null], [null,+5,null],
    /*33*/[null,null,-5],
    /*34*/[null,+2,null], [null,+3,null], [null,+5.5,null], [null,+3,null], [null,+2,null],
    /*35*/[-10,null,null],
    /*36*/[null,null,-5], [null,null,-5],
    /*37*/[null,null,-5],
    /*38*/[null,null,-5], [null,null,-5],
    /*39*/[null,null,-5],
    /*40*/[null,null,-5], [null,null,-5],
    /*41*/[null,null,-5], [null,null,-5],
    /*42*/[null,null,+10],
    /*43*/[null,null,null], [null,null,null], [null,-5,-5],//Los dos primero son para las piezas que conforman el grupo, y que no se crea en la posicion 0
    /*44*/[null,null,null],
    /*45*/[null,null,null]
    ];
    contPieza = [
    /*00*///"pieza inicio","pieza final"],

    /*01*/[6,8],
    /*02*/[9,10], 
    /*03*/[11,12],
    /*04*/[13,14], 
    /*05*/[15,15],
    /*06*/[16,16],
    /*07*/[17,18],
    /*08*/[19,21],
    /*09*/[22,23],
    /*10*/[24,29],
    /*11*/[30,31], 
    /*12*/[32,32],
    /*13*/[33,33],
    /*14*/[34,34],
    /*15*/[35,35],
    /*16*/[36,36],
    /*17*/[37,37],
    /*18*/[38,38],
    /*19*/[39,40],  
    /*20*/[41,42],
    /*21*/[43,45],
    /*22*/[46,47],
    /*23*/[48,48],
    /*24*/[49,50],
    /*25*/[51,51],
    /*26*/[52,53],
    /*27*/[54,54],
    /*28*/[55,56],  
    /*29*/[57,58],
    /*30*/[59,60],
    /*31*/[61,62],
    /*32*/[63,64],
    /*33*/[65,65],
    /*34*/[66,70],
    /*35*/[71,71],
    /*36*/[72,73],
    /*37*/[74,74],
    /*38*/[75,76],
    /*39*/[77,77],
    /*40*/[78,79],
    /*41*/[80,81],
    /*42*/[82,82],
    /*43*/[83,85],//Los dos primero son para las piezas que conforman el grupo, y que no se crea en la posicion 0
    /*44*/[86,86],
    /*45*/[null,null]
    ];
    newLookat = [
    /*00*///[[40,20,40],[0,0,0]],

    /*01*/[[15,10,-15],[0,0,-5]],
    /*02*/[[15,10,-15],[0,0,-4]],
    /*03*/[[15,10,15],[0,0,-3]],
    /*04*/[[15,10,15],[0,0,-2]],
    /*05*/[[15,10,-15],[0,0,0]],
    /*06*/[[15,5,-15],[0,0,0]],
    /*07*/[[15,-5,-15],[0,0,0]],
    /*08*/[[30,20,30],[0,0,2]],
    /*09*/[[30,20,30],[0,0,-12]],
    /*10*/[[40,40,40],[0,0,-2]],
    /*11*/[[20,10,-20],[0,13,0]],
    /*12*/[[20,10,-20],[0,-3,0]],
    /*13*/[[20,10,-20],[0,-16,0]], 
    /*14*/[[30,10,-30],[0,0,2]], 
    /*15*/[[20,10,20],[0,13,0]],
    /*16*/[[20,10,20],[0,-3,0]],
    /*17*/[[20,10,20],[0,-16,0]],
    /*18*/[[30,10,30],[0,0,-2]],
    /*19*/[[20,20,40],[0,0,0]],
    /*20*/[[30,20,10],[0,16,0]],
    /*21*/[[20,20,20],[0,-16,0]],
    /*22*/[[20,10,-20],[0,17,4]],
    /*23*/[[20,10,-20],[0,18,4]],
    /*24*/[[20,10,-20],[0,19,4]],
    /*25*/[[20,10,-20],[0,19,8]],  
    /*26*/[[20,10,20],[0,17,-4]], 
    /*27*/[[20,10,20],[0,18,-4]],   
    /*28*/[[5,10,20],[0,-14,-3]],
    /*29*/[[15,15,25],[0,-10,-4]],
    /*30*/[[5,10,-20],[0,-14,3]],
    /*31*/[[15,15,-25],[0,-10,4]],
    /*32*/[[20,10,-20],[0,-18,3]],
    /*33*/[[10,10,-20],[0,-18,5]], 
    /*34*/[[10,10,-20],[0,-22,3]], 
    /*35*/[[5,10,-30],[0,-22,3]],
    /*36*/[[-20,10,-20],[-4,-14,4]],
    /*37*/[[-20,10,-20],[-4,-14,8]], 
    /*38*/[[20,10,-20],[4,-14,4]],
    /*39*/[[20,10,-20],[4,-14,8]],
    /*40*/[[20,5,-20],[0,-15,8]],
    /*41*/[[20,10,-20],[0,-15,10]],
    /*42*/[[10,10,30],[0,10,0]],
    /*43*/[[20,10,-20],[0,-15,10]],
    /*44*/[[5,10,50],[0,-5,0]],
    /*45*/[[20,10,60],[0,0,0]]
    
    ];
    svgNum = [
    /*00*///[["b7x4","u4x"],["2","2"]],

    /*01*/[["b4x3"],["x3"]],
    /*02*/[["strawS"],["x2"]],
    /*03*/[["b4x3"],["x2"]],
    /*04*/[["b4x3"],["x2"]],
    /*05*/[["hang8"],["x1"]],
    /*06*/[["stickS4mm"],["x1"]],
    /*07*/[["topeS6mm"],["x2"]],
    /*08*/[["b11x1","hsmall"],["x2","x1"]],
    /*09*/[["b4x1","hsmall"],["x1","x1"]],
    /*10*/[["clone"],["x6"]],
    /*11*/[["hsmall"],["x1"]],
    /*12*/[["hsmall"],["x1"]],
    /*13*/[["hsmall"],["x1"]],
    /*14*/[["move"],[""]],
    /*15*/[["bu1x"],["x1"]],
    /*16*/[["bu1x"],["x1"]],
    /*17*/[["bu1x"],["x1"]],
    /*18*/[["move"],[""]], 
    /*19*/[["clone"],["x2"]],
    /*20*/[["u5x"],["x2"]],
    /*21*/[["u5x"],["x3"]],
    /*22*/[["uLcorto"],["x2"]],
    /*23*/[["u6x"],["x1"]],
    /*24*/[["u3x"],["x2"]],
    /*25*/[["u6x"],["x1"]],
    /*26*/[["uLcorto"],["x2"]],
    /*27*/[["u6x"],["x1"]],
    /*28*/[["b11x1"],["x2"]],
    /*29*/[["u4x","u2x"],["x1","x1"]],
    /*30*/[["b11x1"],["x2"]],
    /*31*/[["u4x","u2x"],["x1","x1"]],
    /*32*/[["b4x1"],["x2"]],
    /*33*/[["u3x"],["x1"]],
    /*34*/[["topeL9mm","poleaFull"],["x4","x1"]],
    /*35*/[["stickM4mm"],["x1"]],
    /*36*/[["hlarge"],["x2"]],
    /*37*/[["b4x1"],["x1"]], 
    /*38*/[["hlarge"],["x2"]],
    /*39*/[["b4x1"],["x1"]],
    /*40*/[["b7x1"],["x2"]],
    /*41*/[["uE"],["x2"]],
    /*42*/[["move"],[""]],
    /*43*/[["bu1x","topeL9mm"],["x1","x1"]],
    /*44*/[["cuerdaS"],["x1"]],
    /*45*/[["end"],[""]]
    ];
    svgNumtotal = [
        ["b4x3","x7"],
        ["stickM4mm","x1"],
        ["strawS","x2"],
        ["hang8","x1"],
        ["stickS4mm","x1"],
        ["topeS6mm","x2"],
        ["b11x1","x16"],
        ["b4x1","x10"],
        ["hsmall","x18"],
        ["u5x","x5"],
        ["bu1x","x7"],
        ["u6x","x3"],
        ["u3x","x3"],
        ["u4x","x2"],
        ["u2x","x2"],
        ["topeL9mm","x5"],
        ["hlarge","x4"],
        ["b7x1","x2"],
        ["uE","x2"],
        ["cuerdaS","x1"],
        ["poleaFull","x1"],
        ["uLcorto","x4"]
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
        var point0 = new TWEEN.Tween(groupCatmull.points[0])
        .to({
            x: 0,
            y: 14,
            z: 0
        },timeGrl)
        .yoyo(true)
        .delay(timeGrl)
        .easing(easeEffect)
        .repeat(1).start();
        var point6 = new TWEEN.Tween(groupCatmull.points[6])
        .to({
            x: 0,
            y: -18,
            z: -9.4
        },timeGrl)
        .yoyo(true)
        .delay(timeGrl)
        .easing(easeEffect)
        .repeat(1).start();
        
        //Objetos
        var cuna = new TWEEN.Tween(allClones[82].position)
        .to({
            x: 0,
            y: 14,
            z: 0
        },timeGrl)
        .yoyo(true)
        .delay(timeGrl)
        .easing(easeEffect)
        .repeat(1).start();
        var sujetadorPos = new TWEEN.Tween(allClones[85].position)
        .to({
            x: 0,
            y: -12,
            z: -9.4
        },timeGrl)
        .yoyo(true)
        .delay(timeGrl)
        .easing(easeEffect)
        .repeat(1).start();
        //Poleas
        var polea = new TWEEN.Tween(allClones[68].rotation)
        .to({
            x: -(girRad*360),
            y: 0,
            z: girRad*90
        },timeGrl)
        .delay(timeGrl)
        .onComplete(function(){
            addAnima = false;
        })
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
        //AActualizacion de la animacion de la cuerda
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
        for(i=0; i<=5; i++){
            allClones[i].visible = false;
        }
    }
    if(getBtnpress >= 8){
        for(i=0; i<=18; i++){
            allClones[i].visible = false;
        }
    }
    if(getBtnpress >= 11){
        for(i=0; i<=29; i++){
            allClones[i].visible = false;
        }
    }
    if(getBtnpress >= 19){
        for(i=0; i<=38; i++){
            allClones[i].visible = false;
        }
    }
    //Objetos del ultimo grupo, ya que este no se crea an la posicion 0
    for(i=83; i<=84; i++){
        allClones[i].visible = false;
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