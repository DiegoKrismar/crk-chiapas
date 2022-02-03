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
totalPasos = 57;//Total de pasos para el armado.
setCamerapos = [50,20,50];//Establece la posicion de la camara
setScenepos = [0,-14,-3];//Establece la posicion de la camara
gridPosy = -0.5;//Posicion de la reticula en cada modelo
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
    /*01*/[null,null,null], [null,null,null], [null,-5,null], [null,-5,null],
    /*02*/[null,null,-5], [null,null,-5], [null,null,-5], [null,null,-5],
    /*03*/[null,null,-5], [null,null,-5],
    /*04*/[null,-5,null], [null,-5,null],
    /*05*/[null,null,-5], [null,null,-5], [null,null,-5], [null,null,-5],
    /*06*/[null,null,-5], [null,null,-5],
    /*07*/[null,-5,null], [null,-5,null],
    /*08*/[null,null,-5], [null,null,-5], [null,null,-5], [null,null,-5],
    /*09*/[null,null,-5], [null,null,-5],
    /*10*/[null,-5,null], [null,-5,null],
    /*11*/[null,+5,null], [null,+5,null],
    /*12*/[null,+5,null], [null,+5,null],
    /*13*/[null,null,-5],
    /*14*/[null,+5,null], [null,+5,null],
    /*15*/[null,+5,null], [null,+5,null],
    /*16*/[null,null,+5],
    /*17*/[null,+15,-5],
    /*18*/[-10,null,null],
    /*19*/[null,+5,null], [null,+5,null],
    /*20*/[null,+10,null],
    /*21*/[-10,null,null],
    /*22*/[null,+5,null], [null,+5,null],
    /*23*/[null,+5,null], [null,+5,null],
    /*24*/[null,+5,null], [null,+5,null],
    /*25*/[null,null,-3],
    /*26*/[null,+15,+5],
    /*27*/[-10,null,null],
    /*28*/[null,null,+5],
    /*29*/[null,+5,null], [null,+5,null],
    /*30*/[null,+5,null], [null,+5,null],
    /*31*/[null,null,-2],
    /*32*/[null,+5,-15],
    /*33*/[-10,null,null],
    /*34*/[null,+5,null], [null,+5,null],
    /*35*/[null,+5,null], [null,+5,null],
    /*36*/[null,+5,null], [null,+5,null],
    /*37*/[null,+5,null], [null,+5,null],
    /*38*/[null,+5,null],
    /*39*/[null,+5,null],
    /*40*/[null,+10,+10],
    /*41*/[-10,null,null],
    /*42*/[null,+5,null], [null,+5,null],
    /*43*/[null,+5,null], [null,+5,null],
    /*44*/[null,null,+3],
    /*45*/[null,+5,null], [null,+5,null],
    /*46*/[null,+5,null], [null,+5,null],
    /*47*/[null,+5,null],
    /*48*/[null,+5,-10],
    /*49*/[-10,null,null],
    /*50*/[null,+5,null],
    /*51*/[null,null,-3],
    /*52*/[null,+5,null], [null,+5,null],
    /*53*/[null,+5,null], [null,+5,null],
    /*54*/[null,null,-5],
    /*55*/[null,+5,-10],
    /*56*/[-10,null,null],
    /*57*/[null,null,null]
    ];
    contPieza = [
    /*00*///"pieza inicio","pieza final"],
    /*01*/[0,3],
    /*02*/[4,7],
    /*03*/[8,9],
    /*04*/[10,11],
    /*05*/[12,15],
    /*06*/[16,17],
    /*07*/[18,19],
    /*08*/[20,23],
    /*09*/[24,25],
    /*10*/[26,27],
    /*11*/[28,29],
    /*12*/[30,31],
    /*13*/[32,32],
    /*14*/[33,34],
    /*15*/[35,36],
    /*16*/[37,37],
    /*17*/[38,38],
    /*18*/[39,39],
    /*19*/[40,41],
    /*20*/[42,42],
    /*21*/[43,43],
    /*22*/[44,45],
    /*23*/[46,47],
    /*24*/[48,49],
    /*25*/[50,50],
    /*26*/[51,51],
    /*27*/[52,52],
    /*28*/[53,53],
    /*29*/[54,55],
    /*30*/[56,57],
    /*31*/[58,58],
    /*32*/[59,59],
    /*33*/[60,60],
    /*34*/[61,62],
    /*35*/[63,64],
    /*36*/[65,66],
    /*37*/[67,68],
    /*38*/[69,69],
    /*39*/[70,70],
    /*40*/[71,71],
    /*41*/[72,72],
    /*42*/[73,74],
    /*43*/[75,76],
    /*44*/[77,77],
    /*45*/[78,79],
    /*46*/[80,81],
    /*47*/[82,82],
    /*48*/[83,83],
    /*49*/[84,84],
    /*50*/[85,85],
    /*51*/[86,86],
    /*52*/[87,88],
    /*53*/[89,90],
    /*54*/[91,91],
    /*55*/[92,92],
    /*56*/[93,93],
    /*57*/[null,null]
    ];
    newLookat = [
    /*00*///[[40,20,40],[0,0,-30]],
    /*01*/[[15,10,-27],[0,0,-14]],
    /*02*/[[20,10,-20],[0,-2.5,-10]],
    /*03*/[[25,10,-15],[0,-2.5,-8]],
    /*04*/[[25,10,-15],[0,0,-4]],
    /*05*/[[25,10,-15],[0,-2.5,1]],
    /*06*/[[25,10,-15],[0,-2.5,3]],
    /*07*/[[25,10,-15],[0,0,7]],
    /*08*/[[25,10,-15],[0,-2.5,11]],
    /*09*/[[25,10,-15],[0,-2.5,13]],
    /*10*/[[25,10,-15],[0,0,17]],
    /*11*/[[15,10,25],[0,-6,20.5]],
    /*12*/[[15,10,25],[0,-8,20.5]],
    /*13*/[[20,10,-20],[0,-7,22.5]],
    /*14*/[[20,10,20],[0,-6,9]],
    /*15*/[[20,10,20],[0,-8,9]],
    /*16*/[[20,10,20],[0,-11,7]],
    /*17*/[[20,10,20],[0,-10,16]],
    /*18*/[[15,10,25],[0,-10,9]],
    /*19*/[[20,10,-20],[0,-6,-16.5]],
    /*20*/[[25,10,-15],[0,-3,-18.5]],
    /*21*/[[12,17,-22],[0,-3,-18.5]],
    /*22*/[[20,10,-20],[0,-8,-16.5]],
    /*23*/[[20,10,-20],[0,-6,-6.5]],
    /*24*/[[20,10,-20],[0,-8,-6.5]],
    /*25*/[[15,10,-3],[0,-20,-5]],
    /*26*/[[25,5,-15],[0,-9,-11.5]],
    /*27*/[[15,15,-15],[0,-10,-6]],
    /*28*/[[15,10,15],[0,-20,-18]],
    /*29*/[[20,8,-8],[0,-6,2.5]],
    /*30*/[[25,5,-13],[0,-8,2.5]],
    /*31*/[[15,10,3],[0,-19,8]],
    /*32*/[[30,15,5],[0,-13,2]],
    /*33*/[[12,15,12],[0,-14,2]],
    /*34*/[[20,10,-15],[0,-21,-17]],
    /*35*/[[25,10,-20],[0,-24,-17]],
    /*36*/[[20,10,-15],[0,-21,-6.5]],
    /*37*/[[25,10,-20],[0,-24,-6.5]],
    /*38*/[[15,5,-20],[0,-38,-16.5]],
    /*39*/[[15,5,20],[0,-38,-6.5]],
    /*40*/[[30,10,10],[0,-24,-11]],
    /*41*/[[15,5,20],[0,-26.5,-17]],
    /*42*/[[20,10,15],[0,-21,2.5]],
    /*43*/[[25,10,20],[0,-24,2.5]],
    /*44*/[[25,10,5],[0,-26,1.5]],
    /*45*/[[20,10,5],[0,-21,9]],
    /*46*/[[25,10,10],[0,-24,9]],
    /*47*/[[15,5,20],[0,-38,9]],
    /*48*/[[30,10,-10],[0,-27,2]],
    /*49*/[[13,10,-20],[0,-29.5,8.5]],
    /*50*/[[15,5,20],[0,-38,2.5]],
    /*51*/[[20,10,-5],[0,-32,10.5]],
    /*52*/[[20,10,5],[0,-21,20.5]],
    /*53*/[[25,10,10],[0,-24,20.5]],
    /*54*/[[15,5,20],[0,-38,20.5]],
    /*55*/[[30,10,-15],[0,-34,15.5]],
    /*56*/[[10,10,-25],[0,-34,15.5]],
    /*57*/[[50,20,50],[0,-15,-8]]
    ];
    svgNum = [
    /*00*///[["b7x4","u4x"],["2","2"]],
    /*01*/[["b7x4","u4x"],["x2","x2"]],
    /*02*/[["hsmall"],["x4"]],
    /*03*/[["b7x4"],["x2"]],
    /*04*/[["u4x"],["x2"]],
    /*05*/[["hsmall"],["x4"]],
    /*06*/[["b7x4"],["x2"]],
    /*07*/[["u4x"],["x2"]],
    /*08*/[["hsmall"],["x4"]],
    /*09*/[["b7x4"],["x2"]],
    /*10*/[["u4x"],["x2"]],
    /*11*/[["hsmall"],["x2"]],
    /*12*/[["b11x1"],["x2"]],
    /*13*/[["u3x"],["x1"]],
    /*14*/[["hsmall"],["x2"]],
    /*15*/[["b11x1"],["x2"]],
    /*16*/[["u3x"],["x1"]],
    /*17*/[["flexLarge"],["x1"]],
    /*18*/[["strawL"],["x1"]],
    /*19*/[["hsmall"],["x2"]],
    /*20*/[["flexLarge"],["x1"]],
    /*21*/[["strawL"],["x1"]],
    /*22*/[["b11x1"],["x2"]],
    /*23*/[["hsmall"],["x2"]],
    /*24*/[["b11x1"],["x2"]],
    /*25*/[["u3x"],["x1"]],
    /*26*/[["flexLarge"],["x1"]],
    /*27*/[["strawL"],["x1"]],
    /*28*/[["u3x"],["x1"]],
    /*29*/[["hsmall"],["x2"]],
    /*30*/[["b11x1"],["x2"]],
    /*31*/[["u3x"],["x1"]],
    /*32*/[["flexLarge"],["x1"]],
    /*33*/[["strawL"],["x1"]],
    /*34*/[["hlarge"],["x2"]],
    /*35*/[["b11x1"],["x2"]],
    /*36*/[["hlarge"],["x2"]],
    /*37*/[["b11x1"],["x2"]],
    /*38*/[["u3x"],["x1"]],
    /*39*/[["u3x"],["x1"]],
    /*40*/[["flexLarge"],["x1"]],
    /*41*/[["strawL"],["x1"]],
    /*42*/[["hlarge"],["x2"]],
    /*43*/[["b11x1"],["x2"]],
    /*44*/[["u3x"],["x1"]],
    /*45*/[["hlarge"],["x2"]],
    /*46*/[["b11x1"],["x2"]],
    /*47*/[["u3x"],["x1"]],
    /*48*/[["flexLarge"],["x1"]],
    /*49*/[["strawL"],["x1"]],
    /*50*/[["u3x"],["x1"]],
    /*51*/[["u3x"],["x1"]],
    /*52*/[["hlarge"],["x2"]],
    /*53*/[["b11x1"],["x2"]],
    /*54*/[["u3x"],["x1"]],
    /*55*/[["flexLarge"],["x1"]],
    /*56*/[["strawL"],["x1"]],
    /*57*/[["end"],[""]],
    ];
    svgNumtotal = [
        ["b7x4","x8"],
        ["hsmall","x22"],
        ["u4x","x8"],
        ["b11x1","x20"],
        ["flexLarge","x7"],
        ["strawL","x7"],
        ["u3x","x12"],
        ["hlarge","x10"]
    ];
    addExpand();//Establece la expancion de las piezas por cada paso
    addAnimacamera();//Establece la nueva posicion animada de camara y escena en cada paso
    //controlGroups();//Modifica que piezas se muesran o se ocultan en determinados pasos para hacer los grupos.
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