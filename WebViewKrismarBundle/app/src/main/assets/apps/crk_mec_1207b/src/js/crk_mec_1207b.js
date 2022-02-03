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
totalPasos = 41;//Total de pasos para el armado.
setCamerapos = [50,15,-15];//Establece la posicion de la camara
setScenepos = [-10,-8,-2];//Establece la posicion de la camara
gridPosy = -0.5;//Posicion de la reticula en cada modelo
setRope = false;//Establece si hay animacion para cuerda
specialCase = true;//Caso para armado de tornillo, que no se hizo fisicamente.
/*************************************************************************************
*
* 								FUNCIONES Y PROCEDIMIENTOS
*
**************************************************************************************/
$(document).ready(function(){
    /*
	* NOMBRE: ready.
	* UTILIDAD: Detecta el documento esta listo
	* SALIDAS: Ninguna.
    */
    addMenupiezas();//Agrega menu de piezas a elegir
    changeTxt();
});
$(window).resize(function(){
      /*
	* NOMBRE: resize.
	* UTILIDAD: Detecta el resize del navegador
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    changeTxt();
});
$(window).on('load',function(){});
$(window).on("orientationchange",function(event){
    /*
	* NOMBRE: orientationchange.
	* UTILIDAD: Detecta cambio de orientacion del dispositivo
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    changeTxt();
})
function addClones(){
    /*
	* NOMBRE: addClones.
	* UTILIDAD: Crea los clones de los objetos
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    
    
    //Polea
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
    
    
    //Paso 1
    gltfClone = new classClonegltf("b7x1",-3.25,0.5,1.7,0,turn90,turn90,objVis,6);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",1.8,0.5,1.7,0,turn90,0,objVis,7);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",9.45,0.5,1.7,0,turn90,turn90,objVis,8);
    gltfClone.creaClonegltf();
    //Paso 2
    gltfClone = new classClonegltf("uLcorto",16.95,0.5,1.36,0,-turn90,0,objVis,9);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x1",17.3,1.15,0,turn90,0,turn90,objVis,10);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uLcorto",16.95,0.5,-1.36,0,0,0,objVis,11);
    gltfClone.creaClonegltf();
    //Paso 3
    gltfClone = new classClonegltf("b11x1",9.45,0.5,-1.7,0,turn90,turn90,objVis,12);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",1.8,0.5,-1.7,0,turn90,0,objVis,13);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x1",-1.31,0.5,-1.7,0,turn90,turn90,objVis,14);
    gltfClone.creaClonegltf();
    //Paso 4
    gltfClone = new classClonegltf("b4x1",-1.31,-1.21,0,0,turn90,0,objVis,15);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uLcorto",-3.25,-0.86,1.35,0,turn180,-turn90,objVis,16);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uLcorto",-3.25,-0.86,-1.33,-turn90,0,turn90,objVis,17);
    gltfClone.creaClonegltf();
    //Paso 5
    gltfClone = new classClonegltf("hsmall",15.91,2,1.7,turn90,0,-turn90,objVis,18);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",2.99,2,1.7,turn90,0,-turn90,objVis,19);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",9.45,3.55,1.7,0,turn90,turn90,objVis,20);
    gltfClone.creaClonegltf();
    //Paso 6
    gltfClone = new classClonegltf("hsmall",-0.65,2,1.7,turn90,0,-turn90,objVis,21);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-7.15,2,1.7,turn90,0,-turn90,objVis,22);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b7x1",-3.25,3.55,1.7,0,turn90,turn90,objVis,23);
    gltfClone.creaClonegltf();
    //Paso 7
    gltfClone = new classClonegltf("hsmall",15.91,2,-1.7,turn90,0,-turn90,objVis,24);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",2.99,2,-1.7,turn90,0,-turn90,objVis,25);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",9.45,3.55,-1.7,0,turn90,turn90,objVis,26);
    gltfClone.creaClonegltf();
    //Paso 8
    gltfClone = new classClonegltf("hsmall",0.65,2,-1.7,turn90,0,-turn90,objVis,27);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-3.25,2,-1.7,turn90,0,-turn90,objVis,28);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x1",-1.31,3.55,-1.7,0,turn90,turn90,objVis,29);
    gltfClone.creaClonegltf();
    //Paso 9
    gltfClone = new classClonegltf("b4x1",-4.9,0.5,-3.65,0,0,0,objVis,30);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u1x",-4.9,-0.15,-1.05,turn90,0,-turn90,objVis,31);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u1x",-5.9,-0.15,-1.7,turn90,0,0,objVis,32);
    gltfClone.creaClonegltf();
    //Paso 10
    gltfClone = new classClonegltf("tornillo",18.2,3.1,0,0,0,girRad*90,objVis,33);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uLcorto",-8.1,0.5,1.36,0,turn180,0,objVis,34);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x1",-8.45,1.15,0,turn90,0,turn90,objVis,35);
    gltfClone.creaClonegltf();
    //Paso 11
    gltfClone = new classClonegltf("hsmall",13.35,5,1.7,turn90,0,-turn90,objVis,36);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("bu1x",14.65,5.2,1.7,turn90,0,-turn90,objVis,37);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x1",15.9,5.55,-2.35,0,0,turn90,objVis,38);
    gltfClone.creaClonegltf();
    //Paso 12
    gltfClone = new classClonegltf("uLcorto",15.55,5.55,-5.3,0,0,0,objVis,39);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",14.65,5.55,-5.65,0,turn90,turn90,objVis,40);
    gltfClone.creaClonegltf();
    //Paso 13
    gltfClone = new classClonegltf("b4x1",13.1,5.55,-5,0,0,0,objVis,41);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uE",12.1,6.2,-5.65,turn90,0,0,objVis,42);
    gltfClone.creaClonegltf();
    //Paso 14
    gltfClone = new classClonegltf("hsmall",12.6,6.85,-5.65,0,turn90,0,objVis,43);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hlarge",14.45,6.85,-5.65,0,turn90,turn90,objVis,44);
    gltfClone.creaClonegltf();
    //Paso 15
    gltfClone = new classClonegltf("topeL9mm",-9.2,3.1,0,turn90,0,turn90,objVis,45);
    gltfClone.creaClonegltf();
    
    shapeGroup = new classGroup([[0,5]],objVis,0);
    shapeGroup.creaGroup();
    groupClone = new classClonegroup(-10.3,3.1,0,turn90,0,turn90,objVis,0,46);
    groupClone.creaClonegroup();
    //Paso 16
    gltfClone = new classClonegltf("u6x",0,0,0,0,0,-turn90,objVis,47);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u6x",5.15,0,5.15,0,turn90,turn90,objVis,48);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u6x",5.15,0,-5.15,0,turn90,turn90,objVis,49);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u2x",0,0,0,0,turn90,turn90,objVis,50);
    gltfClone.creaClonegltf();
    //Paso 17
    gltfClone = new classClonegltf("u5x",5.1,0,9,0,0,-turn90,objVis,51);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u5x",10.3,0,9,0,0,-turn90,objVis,52);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",7.7,0,14.15,0,turn90,turn90,objVis,53);
    gltfClone.creaClonegltf();
    //Paso 18
    gltfClone = new classClonegltf("u2x",11.6,0,6.45,0,0,-turn90,objVis,54);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u2x",11.6,0,-6.45,0,0,-turn90,objVis,55);
    gltfClone.creaClonegltf();
    //Paso 19
    gltfClone = new classClonegltf("b11x1",-1.3,1,0,0,0,-turn90,objVis,56);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-1.3,2.55,5.15,turn90,0,0,objVis,57);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-1.3,2.55,-5.15,turn90,0,0,objVis,58);
    gltfClone.creaClonegltf();
    //Paso 20
    gltfClone = new classClonegltf("b4x3",-1.3,5.62,5.18,turn90,0,turn90,objVis,59);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x3",-1.3,5.62,-5.18,turn90,0,turn90,objVis,60);
    gltfClone.creaClonegltf();
    //Paso 21
    gltfClone = new classClonegltf("hsmall",-1.3,8.7,5.15,turn90,0,0,objVis,61);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-1.3,8.7,-5.15,turn90,0,0,objVis,62);
    gltfClone.creaClonegltf();
    //Paso 22
    gltfClone = new classClonegltf("b4x3",-1.3,11.85,5.18,turn90,0,turn90,objVis,63);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x3",-1.3,11.85,-5.18,turn90,0,turn90,objVis,64);
    gltfClone.creaClonegltf();
    //Paso 23
    gltfClone = new classClonegltf("hsmall",-1.3,14.9,5.15,turn90,0,0,objVis,65);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",-1.3,14.9,-5.15,turn90,0,0,objVis,66);
    gltfClone.creaClonegltf();
    //Paso 24
    gltfClone = new classClonegltf("b4x3",-1.3,18.05,5.18,turn90,0,turn90,objVis,67);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b4x3",-1.3,18.05,-5.18,turn90,0,turn90,objVis,68);
    gltfClone.creaClonegltf();
    //Paso 25
    gltfClone = new classClonegltf("flexLargeopen",0.35,16.95,0,0,0,-(girRad*81),objVis,69);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uE",-0.65,20,7.1,0,turn90,0,objVis,70);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uE",-0.65,20,-7.1,turn180,turn90,0,objVis,71);
    gltfClone.creaClonegltf();
    //Paso 26
    gltfClone = new classClonegltf("hsmall",1.45,12.75,6.45,turn90,(girRad*25),0,objVis,72);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",1.45,12.75,-6.45,turn90,(girRad*25),0,objVis,73);
    gltfClone.creaClonegltf();
    //Paso 27
    gltfClone = new classClonegltf("flexLargeopen",3.9,9.2,0,0,0,-(girRad*50),objVis,74);
    gltfClone.creaClonegltf();
    //Paso 28
    gltfClone = new classClonegltf("hsmall",6.9,6.1,6.45,turn90,(girRad*50),0,objVis,75);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",6.9,6.1,-6.45,turn90,(girRad*50),0,objVis,76);
    gltfClone.creaClonegltf();
    //Paso 29
    gltfClone = new classClonegltf("flexLargeopen",10.6,3.8,0,0,0,-(girRad*27.234),objVis,77);
    gltfClone.creaClonegltf();
    //Paso 30
    gltfClone = new classClonegltf("hsmall",14.65,2.1,6.45,turn90,(girRad*71),0,objVis,78);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",14.65,2.1,-6.45,turn90,(girRad*71),0,objVis,79);
    gltfClone.creaClonegltf();
    //Paso 31
    gltfClone = new classClonegltf("flexLargeopen",18.85,1.1,0,0,0,-(girRad*9),objVis,80);
    gltfClone.creaClonegltf();
    //Paso 32
    gltfClone = new classClonegltf("uLcorto",21.9,0.4,7.4,turn90,0,turn90,objVis,81);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("uLcorto",21.9,0.4,-7.4,turn90,0,-turn90,objVis,82);
    gltfClone.creaClonegltf();
    //Paso 33
    gltfClone = new classClonegltf("u6x",18.05,0,7.75,0,turn90,turn90,objVis,83);
    gltfClone.creaClonegltf();
    //Paso 34
    gltfClone = new classClonegltf("u6x",18.05,0,-7.75,0,turn90,turn90,objVis,84);
    gltfClone.creaClonegltf();
    //Paso 35
    gltfClone = new classClonegltf("hsmall",23.15,0.75,6.45,turn90,turn90,0,objVis,85);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("hsmall",23.15,0.75,-6.45,turn90,turn90,0,objVis,86);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u6x",23.7,0.75,0,0,0,turn180,objVis,87);
    gltfClone.creaClonegltf();
    //Paso 36
    gltfClone = new classClonegltf("u1x",24.5,0,8.355,0,0,-turn90,objVis,88);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u1x",24.5,0,-8.355,0,0,turn90,objVis,89);
    gltfClone.creaClonegltf();
    //Paso 37
    gltfClone = new classClonegltf("b11x1",5.1,7.1,7.75,turn90,0,0,objVis,90);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b11x1",5.1,7.1,12.9,turn90,0,0,objVis,91);
    gltfClone.creaClonegltf();
    //Paso 38
    gltfClone = new classClonegltf("u3x",4.1,7.1,10.3,0,0,0,objVis,92);
    gltfClone.creaClonegltf();
    //Paso 39
    shapeGroup = new classGroup([[33,33],[45,46]],objVis,1);
    shapeGroup.creaGroup();
    groupClone = new classClonegroup(0,0,0,0,0,0,objVis,1,93);
    groupClone.creaClonegroup();
    
    shapeGroup = new classGroup([[6,32],[34,44],[93,93]],objVis,2);
    shapeGroup.creaGroup();
    groupClone = new classClonegroup(5.1,12.3,10.3,0,0,-(girRad*40.5),objVis,2,94);
    groupClone.creaClonegroup();
    //Paso 40
    meshClone = new classCloneshape("straw",5.1,12.3,10.3,turn90,0,0,6.5,objVis,95);
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
    /*00*///[null, null, null], [null, null, null], [null, null, null], [null, null, null], [null, null, null],
    /*01*/[null, null, null], [null, null, null], [null, null, null], [null, null, null], [null, null, null], [null, null, null], [-5, null, null], [null, null, null], [+5, null, null],/*Se agregan los primeros 5 de la polea por el conteo desde 0*/
    /*02*/[+5, null, null], [+5, null, -5], [+5, null, -10],
    /*03*/[-5, null, null], [-10, null, null], [-15, null, null],
    /*04*/[null, -5, null], [null, -5, +1], [null, -5, -1],
    /*05*/[null, +5, null], [null, +5, null], [null, +10, null],
    /*06*/[null, +5, null], [null, +5, null], [null, +10, null],
    /*07*/[null, +5, null], [null, +5, null], [null, +10, null],
    /*08*/[null, +5, null], [null, +5, null], [null, +10, null],
    /*09*/[-5, null, null], [-5, null, +2], [-10, null, null],
    /*10*/[-5, null, null], [-10, null, +2], [-10, null, null],
    /*11*/[null, +10, null], [null, +8, null], [null, +5, null],
    /*12*/[null, null, -5], [-2, null, -5],
    /*13*/[-5, null, null], [-10, null, null],
    /*14*/[+5, null, null], [+10, null, null],
    /*15*/[-5, null, null], [-10, null, null],
    /*16*/[null, null, null], [null, +5, null], [null, +5, null], [null, +5, null],
    /*17*/[null, -5, null], [null, -5, null], [null, -10, null],
    /*18*/[null, +5, null], [null, +5, null],
    /*19*/[null, +5, null], [null, +10, null], [null, +10, null],
    /*20*/[null, +5, null], [null, +5, null],
    /*21*/[null, +5, null], [null, +5, null],
    /*22*/[null, +5, null], [null, +5, null],
    /*23*/[null, +5, null], [null, +5, null],
    /*24*/[null, +5, null], [null, +5, null],
    /*25*/[+1, null, null], [null, null, +5], [null, null, -5],
    /*26*/[+1, -3, null], [+1, -3, null],
    /*27*/[+1, -3, null],
    /*28*/[+2, -2, null], [+2, -2, null],
    /*29*/[+2, -2, null],
    /*30*/[+2, -1, null], [+2, -1, null], 
    /*31*/[+2, -1, null],
    /*32*/[null, null, +3], [null, null, -3],
    /*33*/[null, -5, null],
    /*34*/[null, -5, null],
    /*35*/[+5, null, null], [+5, null, null], [+10, null, null],
    /*36*/[null, +5, null], [null, +5, null],
    /*37*/[null, +5, null], [null, +5, null],     
    /*38*/[-4, null, null],
    /*39*/[null, null, null], [null, +5, null],
    /*40*/[null, null, +10],
    /*41*/[null,null,null]
    ];
    contPieza = [
    /*00*///"pieza inicio","pieza final"],
    /*01*/[0,8],/*Se agregan los primeros 5 de la polea por el conteo desde 0*/
    /*02*/[9,11],
    /*03*/[12,14],
    /*04*/[15,17],
    /*05*/[18,20],
    /*06*/[21,23],
    /*07*/[24,26],
    /*08*/[27,29],
    /*09*/[30,32],
    /*10*/[33,35],
    /*11*/[36,38],
    /*12*/[39,40],  
    /*13*/[41,42],
    /*14*/[43,44],
    /*15*/[45,46],
    /*16*/[47,50],
    /*17*/[51,53],
    /*18*/[54,55],
    /*19*/[56,58],
    /*20*/[59,60],
    /*21*/[61,62],
    /*22*/[63,64],
    /*23*/[65,66],
    /*24*/[67,68],
    /*25*/[69,71],
    /*26*/[72,73],
    /*27*/[74,74],
    /*28*/[75,76],
    /*29*/[77,77],
    /*30*/[78,79],
    /*31*/[80,80],
    /*32*/[81,82],
    /*33*/[83,83],
    /*34*/[84,84],
    /*35*/[85,87],
    /*36*/[88,89],
    /*37*/[90,91],
    /*38*/[92,92],
    /*39*/[93,94],
    /*40*/[95,95],
    /*41*/[null,null]
    ];
    newLookat = [
    /*00*///[[40,20,40],[0,0,-30]],
    /*01*/[[15,15,20],[-4,0,0]],
    /*02*/[[20,15,20],[-16,0,0]],
    /*03*/[[20,15,-20],[-2,0,0]],
    /*04*/[[-20,-10,-10],[2,0,0]],
    /*05*/[[-10,10,20],[-10,-3,0]],
    /*06*/[[-10,10,20],[3,-3,0]],
    /*07*/[[-10,10,-20],[-10,-3,0]],
    /*08*/[[-10,10,-20],[3,-3,0]],
    /*09*/[[-20,10,-15],[3,0,0]],
    /*10*/[[-20,30,15],[3,0,0]],
    /*11*/[[15,15,15],[-16,-5,0]],
    /*12*/[[15,15,-15],[-16,-5,5]],
    /*13*/[[-15,15,-15],[-14,-5,5]],
    /*14*/[[15,15,-15],[-12,-6,5]],
    /*15*/[[-20,15,-20],[10,-3,0]],
    /*16*/[[-20,15,20],[-3,0,0]],
    /*17*/[[20,15,20],[-8,0,-10]],
    /*18*/[[20,15,20],[-12,0,0]],
    /*19*/[[20,15,20],[1,-2,0]],
    /*20*/[[20,15,20],[1,-6,0]],
    /*21*/[[20,15,20],[1,-9,0]],
    /*22*/[[20,15,20],[1,-12,0]],
    /*23*/[[20,15,20],[1,-15,0]],
    /*24*/[[20,15,20],[1,-18,0]],
    /*25*/[[20,15,20],[-1,-16,0]],
    /*26*/[[15,5,20],[-2,-13,0]],
    /*27*/[[20,15,25],[-4,-8,0]],
    /*28*/[[20,5,25],[-7,-6,0]],
    /*29*/[[20,15,25],[-9,-4,0]],
    /*30*/[[20,5,25],[-14,-2,0]],
    /*31*/[[20,15,25],[-18,-1,0]],
    /*32*/[[20,15,0],[-22,-1,0]],
    /*33*/[[5,15,20],[-18,0,-8]],
    /*34*/[[5,15,-20],[-18,0,8]],
    /*35*/[[15,15,-20],[-24,0,0]],
    /*36*/[[15,15,20],[-25,0,0]],
    /*37*/[[25,15,25],[-6,-8,-10]],
    /*38*/[[-20,15,20],[-4,-8,-10]],
    /*39*/[[30,15,30],[-6,-12,-8]],
    /*40*/[[-15,5,20],[-6,-12,-8]],
    /*41*/[[50,15,-15],[-10,-8,-2]]
    ];
    svgNum = [
    /*00*///[["b7x4","u4x"],["2","2"]],
    /*01*/[["b11x1","b7x1","hsmall"],["x1","x1","x1"]],
    /*02*/[["b4x1","uLcorto"],["x1","x2"]],
    /*03*/[["b11x1","b4x1","hsmall"],["x1","x1","x1"]],
    /*04*/[["b4x1","uLcorto"],["x1","x2"]],
    /*05*/[["b11x1","hsmall"],["x1","x2"]],
    /*06*/[["b7x1","hsmall"],["x1","x2"]],
    /*07*/[["b11x1","hsmall"],["x1","x2"]],
    /*08*/[["b4x1","hsmall"],["x1","x2"]],
    /*09*/[["b4x1","u1x"],["x1","x2"]],
    /*10*/[["b4x1","uLcorto","tornillo"],["x1","x1","x1"]],
    /*11*/[["b4x1","hsmall","bu1x"],["x1","x1","x1"]],
    /*12*/[["hsmall","uLcorto"],["x1","x1"]],
    /*13*/[["b4x1","uE"],["x1","x1"]],
    /*14*/[["hsmall","hlarge"],["x1","x1"]],
    /*15*/[["topeL9mm","poleaFull"],["x1","x1"]],
    /*16*/[["u6x","u2x"],["x3","x1"]],
    /*17*/[["u5x","u3x"],["x2","x1"]],
    /*18*/[["u2x"],["x2"]],
    /*19*/[["b11x1","hsmall"],["x1","x2"]],
    /*20*/[["b4x3"],["x2"]],
    /*21*/[["hsmall"],["x2"]],
    /*22*/[["b4x3"],["x2"]],
    /*23*/[["hsmall"],["x2"]],
    /*24*/[["b4x3"],["x2"]],
    /*25*/[["flexLarge","uE"],["x1","x2"]],
    /*26*/[["hsmall"],["x2"]],
    /*27*/[["flexLarge"],["x1"]],
    /*28*/[["hsmall"],["x2"]],
    /*29*/[["flexLarge"],["x1"]],
    /*30*/[["hsmall"],["x2"]],
    /*31*/[["flexLarge"],["x1"]],
    /*32*/[["uLcorto"],["x2"]],
    /*33*/[["u6x"],["x1"]],
    /*34*/[["u6x"],["x1"]],
    /*35*/[["hsmall","u6x"],["x2","x1"]],
    /*36*/[["u1x"],["x2"]],
    /*37*/[["b11x1"],["x2"]],
    /*38*/[["u3x"],["x1"]],
    /*39*/[["move"],[""]],
    /*40*/[["strawM"],["x1"]],
    /*41*/[["end"],[""]]
    ];
    svgNumtotal = [
        ["b11x1","x7"],
        ["b7x1","x2"],
        ["hsmall","x27"],
        ["b4x1","x8"],
        ["uLcorto","x8"],
        ["u1x","x4"],
        ["tornillo","x1"],
        ["bu1x","x1"],
        ["uE","x3"],
        ["hlarge","x1"],
        ["topeL9mm","x1"],
        ["poleaFull","x1"],
        ["u6x","x6"],
        ["u2x","x3"],
        ["u5x","x2"],
        ["u3x","x2"],
        ["flexLarge","x4"],
        ["strawM","x1"]
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
    if(getBtnpress >= 1){
        for(i=0; i<=5; i++){
            allClones[i].visible = false;
        }
    }
    if(getBtnpress >= 16){
        for(i=6; i<=46; i++){
            allClones[i].visible = false;
        }
    }
    if(getBtnpress >= 39){
        allClones[93].visible = false;
        allClones[33].position.y = 0;
        allClones[45].position.y = 0;
        allClones[46].position.y = 0;
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
function addMenupiezas(){
    /*
	* NOMBRE: addMenupiezas.
	* UTILIDAD: Agrega menu de piezas a elegir
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    var totalPiezasname = [
        ["b11x1","Barra 11x1"],
        ["b7x1","Barra 7x1"],
        ["hsmall","H corta"],
        ["b4x1","Barra 4x1"],
        ["b4x3","Barra 4x3"],
        ["uLcorto","Unión L chica"],
        ["u1x","Unión 1x1"],
        ["tornillo","Tornillo"],
        ["bu1x","Barra unión 1x1"],
        ["uE","Unión E"],
        ["hlarge","H larga"],
        ["topeL9mm","Tope 11 mm"],
        ["poleaFull","Polea"],
        ["u6x","Unión 6x5"],
        ["u2x","Unión 2x1"],
        ["u5x","Unión 5x4"],
        ["u3x","Unión 3x2"],
        ["flexLarge","Flexible 11x2"],
        ["strawM","Popote 5.5 cm"]
    ];
    
    var stepsPiezas = [
    /*01*/["b11x1","b7x1","hsmall"],
    /*02*/["b4x1","uLcorto"],
    /*03*/["b11x1","b4x1","hsmall"],
    /*04*/["b4x1","uLcorto"],
    /*05*/["b11x1","hsmall"],
    /*06*/["b7x1","hsmall"],
    /*07*/["b11x1","hsmall"],
    /*08*/["b4x1","hsmall"],
    /*09*/["b4x1","u1x"],
    /*10*/["b4x1","uLcorto","tornillo"],
    /*11*/["b4x1","hsmall","bu1x"],
    /*12*/["hsmall","uLcorto"],
    /*13*/["b4x1","uE"],
    /*14*/["hsmall","hlarge"],
    /*15*/["topeL9mm","poleaFull"],
    /*16*/["u6x","u2x"],
    /*17*/["u5x","u3x"],
    /*18*/["u2x"],
    /*19*/["b11x1","hsmall"],
    /*20*/["b4x3"],
    /*21*/["hsmall"],
    /*22*/["b4x3"],
    /*23*/["hsmall"],
    /*24*/["b4x3"],
    /*25*/["flexLarge","uE"],
    /*26*/["hsmall"],
    /*27*/["flexLarge"],
    /*28*/["hsmall"],
    /*29*/["flexLarge"],
    /*30*/["hsmall"],
    /*31*/["flexLarge"],
    /*32*/["uLcorto"],
    /*33*/["u6x"],
    /*34*/["u6x"],
    /*35*/["hsmall","u6x"],
    /*36*/["u1x"],
    /*37*/["b11x1"],
    /*38*/["u3x"],
    /*39*/["move"],
    /*40*/["strawM"],
    /*41*/["end"]
    ];
    
    var stepsfullnamePiezas = [
    /*01*/["Barra 11x1","Barra 7x1","H corta"],
    /*02*/["Barra 4x1","Unión L chica"],
    /*03*/["Barra 11x1","Barra 4x1","H corta"],
    /*04*/["Barra 4x1","Unión L chica"],
    /*05*/["Barra 11x1","H corta"],
    /*06*/["Barra 7x1","H corta"],
    /*07*/["Barra 11x1","H corta"],
    /*08*/["Barra 4x1","H corta"],
    /*09*/["Barra 4x1","Unión 1x1"],
    /*10*/["Barra 4x1","Unión L chica","Tornillo"],
    /*11*/["Barra 4x1","H corta","Barra unión 1x1"],
    /*12*/["H corta","Unión L chica"],
    /*13*/["Barra 4x1","Unión E"],
    /*14*/["H corta","H larga"],
    /*15*/["Tope 11mm","Polea"],
    /*16*/["Union 6x5","Union 2x1"],
    /*17*/["Union 5x4","Union 3x2"],
    /*18*/["Union 2x1"],
    /*19*/["Barra 11x1","H corta"],
    /*20*/["Barra 4x3"],
    /*21*/["H corta"],
    /*22*/["Barra 4x3"],
    /*23*/["H corta"],
    /*24*/["Barra 4x3"],
    /*25*/["Flexible 11x2","Unión E"],
    /*26*/["H corta"],
    /*27*/["Flexible 11x2"],
    /*28*/["H corta"],
    /*29*/["Flexible 11x2"],
    /*30*/["H corta"],
    /*31*/["Flexible 11x2"],
    /*32*/["Unión L chica"],
    /*33*/["Unión 6x5"],
    /*34*/["Unión 6x5"],
    /*35*/["H corta","Unión 6x5"],
    /*36*/["Unión 1x1"],
    /*37*/["Barra 11x1"],
    /*38*/["Unión 3x2"],
    /*39*/["move"],
    /*40*/["Popote 5.5 cm"],
    /*41*/["end"]
    ];
    
    
    
    for(var i=0; i<=totalPiezasname.length-1; i++){
        $(".d_menupiezasgrlinscroll").append('<div class="d_menupiezagrlpieza"><div class="d_menupiezagrlpiezaimg '+totalPiezasname[i][0]+'" name="'+totalPiezasname[i][1]+'"><input name="d_menupiezainput" type="checkbox" id="d_menupiezainput'+i+'"><label for="d_menupiezainput'+i+'"></label></div></div>');
        
    }
    
    $(".d_pasospiezagrlbtnsscroll").css({"width":(stepsPiezas.length*3)+"rem"});
    for(var i=0; i<=stepsPiezas.length-1; i++){
        $(".d_pasospiezagrlbtnsscroll").append('<div class="d_pasospiezagrlbtn" id="d_pasospiezagrlbtn_'+i+'">'+(i+1)+'</div>');
    }
    
    var savePiezasnamebtn = [];
    var getBtn;
    
    var savePiezasnameprov = [];
    var savePiezasname = [];
    
    var savePiezafullnameprov = [];
    var savePiezafullname = [];
    
    //var saveChecksprov = [];
    //var saveChecks = [];
    
    /*for(var i=0; i<=totalPiezasname.length-1; i++){
        saveChecksprov.push([]);
        saveChecks.push([]);
    }*/
    
    var saveStepsfull = [];
    
    $(".d_pasospiezagrlbtn").on("mouseup touchleave", function(){
        $(".d_pasospiezagrlbtn").removeClass('d_pasospiezagrlbtn_press');
        getBtn = Number($(this).attr('id').split("_")[2]);
        $(this).addClass('d_pasospiezagrlbtn_press');
        
        $("#d_emergentegestos").hide();//Oculta emergente de gestos
        
        $(".d_footerbtnsexpand").show();//Muestra btn expand, ya que se oculta para evitar agregar clases con el menu
        
        $(".d_pasospiezagrlopctionname").remove();
        
       
        
        $(".d_menupiezasgrl").show();
        $(".d_pasospiezasgrl").addClass('d_pasospiezasgrl_reajuste');
        $(".d_contegrl").addClass('d_contegrl_resize');
        
        $(".d_pasospiezagrltxt").show();
        $(".d_pasospiezagrlopction").show();
        reajusteConte3d();//Reajusta el contenido 3d en resize
        
        for(var i=0; i<=totalPiezasname.length-1; i++){
            $("#d_menupiezainput"+i).prop( "checked", false );
        }
        
        
        savePiezasnamebtn = [];
        
        for(var i=0; i<=stepsPiezas[getBtn].length-1; i++){
            $(".d_pasospiezagrlopction").append('<div class="d_pasospiezagrlopctionname" id="'+stepsPiezas[getBtn][i]+'">'+stepsfullnamePiezas[getBtn][i]+'</div>');
            savePiezasnamebtn.push(stepsPiezas[getBtn][i]);
        }
        
        console.log("PASO");
        console.log(savePiezasnamebtn);
        
        savePiezasnameprov = [];
        savePiezasname = [];
        
        savePiezafullnameprov = [];
        savePiezafullname = [];
        
        if(saveStepsfull.includes(getBtn) === true){
            $("#d_pasospiezagrlbtn_"+getBtn).removeClass("d_pasospiezagrlbtn_bien");
        }
        
        $(".d_pasospiezagrlopctionname_error").remove();//Quita todos los textos de piezas de mas
        
        $(".d_menupiezasgrl_block").remove();
        
        $(".d_menupiezasgrlin").removeClass('d_menupiezasgrlin_inactive');
        
        $(".d_btnsopcgrl").hide();
        
        console.log((getBtn+1));
        if((getBtn+1) === 39 || (getBtn+1) === 41){
            $("#"+(getBtn+1)).trigger("mouseup");//Inicia paso
            $(".d_menupiezasgrl").append('<div class="d_menupiezasgrl_block"></div>');
            $(".d_menupiezasgrlin").addClass('d_menupiezasgrlin_inactive');
            $(".d_pasospiezagrltxt").hide();
            $(".d_pasospiezagrlopction").hide();
            $("#d_pasospiezagrlbtn_"+getBtn).addClass("d_pasospiezagrlbtn_bien");
        }
        
    });
    
    
    
    
    
    var contEqual = [];
    
    for(var i=0; i<=totalPiezasname.length-1; i++){
        
        $('#d_menupiezainput'+i).change(function() {
            var nameCheck = $(this).parent().attr("class").split(" ")[1].toString();
            
            var getFullname = $(this).parent().attr("name");
            
            if(this.checked) {
                if(savePiezasnameprov.includes(nameCheck) === false){
                    savePiezasnameprov.push(nameCheck);
                    savePiezafullnameprov.push(getFullname);
                    //saveChecksprov[getBtn].push(i);
                    
                    $("#"+nameCheck).addClass('d_pasospiezagrlopctionname_resalte');
                }
            }else{
                savePiezasnameprov.forEach(function(item,index){
                    if(item === nameCheck){
                        delete savePiezasnameprov[index];//Elimina el objeto
                        delete savePiezafullnameprov[index];//Elimina el objeto
                        //delete saveChecksprov[getBtn][index];
                        
                        $("#"+nameCheck).removeClass('d_pasospiezagrlopctionname_resalte');
                    }
                });
            }  
            
            savePiezasname = [];
            savePiezafullname = [];
            //saveChecks[getBtn] = [];
            savePiezasnameprov.forEach(function(item,index){
                savePiezasname.push(item);
                //saveChecks[getBtn].push(index);
            });
            
            savePiezafullnameprov.forEach(function(item,index){
                savePiezafullname.push(item);
                //saveChecks[getBtn].push(index);
            });
            
            console.log("SELECTION");
            console.log(savePiezasname);
            console.log(savePiezafullname);
            //console.log(saveChecks);
            
            contEqual = [];
            
            savePiezasnamebtn.forEach( function(value){
                if(savePiezasname.includes(value) === false) {
                    contEqual.push(false);
                }
            });
            
            $(".d_pasospiezagrlopctionname_error").remove();//Quita todos los textos de piezas de mas
            savePiezasname.forEach( function(value,index){
                if(savePiezasnamebtn.includes(value) === false){
                    console.log("NO "+value);
                    $(".d_pasospiezagrlopction").append('<div class="d_pasospiezagrlopctionname_error" id="'+value+'">'+savePiezafullname[index]+'</div>');//Agrega textos de piezas de mas
                }
            });
            
            
            
            if(contEqual.includes(false) === false && savePiezasnamebtn.length === savePiezasname.length){ 
                $("#d_pasospiezagrlbtn_"+getBtn).addClass("d_pasospiezagrlbtn_bien");
                saveStepsfull.push(getBtn);
                
                $("#"+(getBtn+1)).trigger("mouseup");//Inicia paso
                
                $(".d_menupiezasgrl").append('<div class="d_menupiezasgrl_block"></div>');
                
                $(".d_menupiezasgrlin").addClass('d_menupiezasgrlin_inactive');
                
                $(".d_btnsopcgrl").show();
                
            }else{
                $("#d_pasospiezagrlbtn_"+getBtn).removeClass("d_pasospiezagrlbtn_bien");
                $(".d_menupiezasgrl_block").remove();
                
                $(".d_menupiezasgrlin").removeClass('d_menupiezasgrlin_inactive');
                
                $(".d_btnsopcgrl").hide();
            }
            
            console.log(saveStepsfull);

        });
        
    }
    
    
    $(".d_menupiezagrlpieza").on("mouseover", function(){
        //$(this).addClass('d_menupiezasgrlzoom');
        var getNamebtn = $(this).children().attr('name');
        var getClassbtn = $(this).children().attr('class').split(" ")[1];
        console.log(getClassbtn);
        $(".d_menupiezasgrlzoom").show();
        $(".d_menupiezasgrlzoom").append('<div class="d_menupiezasgrlzoomin '+getClassbtn+'"></div>');
    });
    $(".d_menupiezagrlpieza").on("mouseout", function(){
        //$(".d_menupiezagrlpieza").removeClass('d_menupiezasgrlzoom');
        $(".d_menupiezasgrlzoomin").remove();
        $(".d_menupiezasgrlzoom").hide();
    });
}
function changeTxt(){
    if(getOrientation === "portrait"){
        $(".d_pasospiezagrltxt").find('span').text('inferior');
    }else{
        $(".d_pasospiezagrltxt").find('span').text('lateral derecho');
    }
}