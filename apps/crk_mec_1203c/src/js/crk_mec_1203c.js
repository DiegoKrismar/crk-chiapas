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
setCamerapos = [60,10,50];//Establece la posicion de la camara
setScenepos = [0,-7,0];//Establece la posicion de la camara
gridPosy = -21;//Posicion de la reticula en cada modelo
slidesInd = null;//Cantidad de vistas para indicaciones
var velAnima = 0;//Velocidad del giro de la rueda en grados, de acuerdo ala nivel seleccionado
var numGrados = 0;//Numero de nivel de la rueda
var activeHand = false;//No hay animacion de giro
var gir360 = 6.28319;//Radianes por cada 360º
var actHand;//Mano que se activa
var easingType = TWEEN.Easing.Quadratic.Out;//Efecto ease
var easingTypelineal = TWEEN.Easing.Linear.None;//Efecto ease
var strongLevel = 0;//Fuerza de la barra
var dataDestroy = false;//Determina si la rueda se desarma
addReflexion = [
    "¿Tarda lo mismo en detenerse la rueda?",
    "¿Qué es lo que influye en la velocidad de la vuelta?",
    "¿Qué podríamos hacer para que la vuelta fuera más rápida sin modificar la fuerza?",
    "Si te pararas en el centro de la rueda y después en la orilla exterior, ¿dónde recorrerías mayor distancia?",
    "¿Por qué va perdiendo velocidad la rueda conforme pasa el tiempo?",
    "Si en lugar de una rueda de la fortuna tenemos la llanta de una bicicleta, además del aire, ¿de dónde más proviene la fricción?",
    "Además de un juego, ¿qué aplicación práctica puede tener este sistema?",
    "Realiza el experimento con tu modelo físico, ¿obtuviste el mismo resultado cuando hiciste el experimento en el modelo físico que en el real?"
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
    
    //Arreglo para esta practica, porque el eje no se agrupo en el armado
    allClones[107].position.y = 0;
    allClones[106].add(allClones[107]);
    
    //Oculta todas las piezas y deja solo los grupos y las piezas sueltas finales
    for(i=0; i<=95; i++){
        allClones[i].visible = false;
    }
    
    //Estos son elemento extras
    //Agrega las manos
    gltfClone = new classClonegltf("handleft",0,45,0,girRad*10,-(girRad*120),-(girRad*30),false,108);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("handright",0,45,0,-(girRad*10),-(girRad*60),girRad*30,false,109);
    gltfClone.creaClonegltf();
    
    velControl();//Control de velocidad y accion de las manos
    //Colores de flechas
    allClones[30].children[1].material.color = arrowinColor;
    allClones[30].children[0].material.color = arrowoutColor;
    
    console.log(allClones[30].children[1].material.color);

}
function velControl(){
    /*
	* NOMBRE: velControl.
	* UTILIDAD: Control de velocidad y accion de las manos
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    var timeSet;//Tiempo de intervalo
    $(".d_forceopcbtn").on("mousedown touchstart",function(e){
        e.preventDefault();//Previene el tooltip de touchstart.
        console.log("PRESS");
        dataDestroy = false;//Valor para DESTROY
        timeSet = setInterval(incLevel,100);//Inicia intervalo, para incrementar valor de fuerza de barra
        $("#d_giros_a").text("--");//Agrega giros a html
        $("#d_giros_b").text("");//Agrega giros a html
        allClones[106].rotation.x = 0;//Vuelve a la rotacion original
    });
    $(".d_forceopcbtn").on("mouseup touchend",function(e){
        e.preventDefault();//Previene el tooltip de touchstart.
        console.log("UP");
        clearInterval(timeSet);//Limpia intervalo
        $(".d_footerbtngirscrewstrongline").css({"left":"0%"});//Resetea fuerza barra div
        
        var dataGet = 0;//Valor giro de rueda
        
        dataGet = (strongLevel*6)/96;//(Fuerza aplicada * maximo dataGet) / maximo fuerza aplicada
        //dataGet = Math.ceil((strongLevel*6)/96);//(Fuerza aplicada * maximo dataGet) / maximo fuerza aplicada
        if(dataGet > 5){//Maximo de fuerza para destruir
            dataDestroy = true;//Valor para DESTROY
        }
        console.log(dataGet);
        
        
        
        //console.log(finalGir);
        
        velAnima = 540*dataGet;//Giro en grados
        numGrados = velAnima/360;//Numero de vueltas (cada vuelta son 360º)
        
        strongLevel = 0;//Resetea fuerza de barra
        
        animaWheel("right");//Animacionde la rueda y mano
        activeHand = true;//Hay animacion de giro
        $("#d_giros_a").text("--");//Agrega giros a html
        $("#d_giros_b").text("");//Agrega giros a html
        
        
        
    });
    function incLevel(){
        /*
        * NOMBRE: incLevel.
        * UTILIDAD: Control de velocidad
        * ENTRADAS: Ninguna.
        * SALIDAS: Ninguna.
        * VARIABLES: Ninguna
        */
        if(strongLevel < 93){//Ultimo valor antes de que barra llegue a 96
            strongLevel = strongLevel+4;//Incrementa valor de barra de fuerza
            $(".d_footerbtngirscrewstrongline").css({"left":strongLevel+"%"});//Asigna fuerza barra div
        }else{
            clearInterval(timeSet);//Limpia intervalo
            guillotineUp = false;//Detiene animacion guillotina up
        }
    }
}
function eventReinall(){
    /*
	* NOMBRE: eventReinall.
    * UTILIDAD: Reinicia la rueda
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    allClones[106].position.set(0,7.07,0);//Resetea posicion de rueda
    allClones[106].rotation.set(0,0,0);//Resetea rotacion de rueda
    $(".d_forceopcbtnrein").hide();//Oculta btn reiniciar
    $(".d_forceopcbtn, .d_footerbtngirscrewstrong").show();//Muestra btn hand
    activeHand = false;//No hay animacion de giro
    $("#d_giros_a").text("--");//Agrega giros a html
    $("#d_giros_b").text("");//Agrega giros a html
    
    //Resetea posicion de piezas
    //Lado derecho
    allClones[96].children[14].position.set(-1.3,2.5,-2.5);
    allClones[96].children[15].position.set(1.3,2.5,2.5);
    allClones[96].children[16].position.set(0.7,7.05,0);
    allClones[96].children[17].position.set(-0.7,7.05,0);
    allClones[96].children[18].position.set(0,7.05,0);
    allClones[96].children[19].position.set(-1.1,7.05,0);
    allClones[100].position.set(4.5,7.05,0);
    allClones[101].position.set(3.5,7.05,0);
    allClones[102].position.set(2.5,7.05,0);
    //Lado izquierdo
    allClones[97].children[14].position.set(-1.3,2.5,-2.5);
    allClones[97].children[15].position.set(1.3,2.5,2.5);
    allClones[97].children[16].position.set(0.7,7.05,0);
    allClones[97].children[17].position.set(-0.7,7.05,0);
    allClones[97].children[18].position.set(0,7.05,0);
    allClones[97].children[19].position.set(-1.1,7.05,0);
    allClones[103].position.set(-4.5,7.05,0);
    allClones[104].position.set(-3.5,7.05,0);
    allClones[105].position.set(-2.5,7.05,0);
    
    //Resetea rotacion de piezas
    //Lado derecho
    allClones[96].children[14].rotation.set((girRad*118.71),0,girRad*90);
    allClones[96].children[15].rotation.set((girRad*61.29),0,girRad*90);
    allClones[96].children[16].rotation.set(0,0,girRad*90);
    allClones[96].children[17].rotation.set(0,0,girRad*90);
    allClones[96].children[18].rotation.set(0,0,girRad*90);
    allClones[96].children[19].rotation.set(0,0,girRad*90);
    allClones[100].rotation.set(0,0,girRad*90);
    allClones[101].rotation.set(0,0,girRad*90);
    allClones[102].rotation.set(0,0,girRad*90);
    //Lado izquierdo
    allClones[97].children[14].rotation.set((girRad*118.71),0,girRad*90);
    allClones[97].children[15].rotation.set((girRad*61.29),0,girRad*90);
    allClones[97].children[16].rotation.set(0,0,girRad*90);
    allClones[97].children[17].rotation.set(0,0,girRad*90);
    allClones[97].children[18].rotation.set(0,0,girRad*90);
    allClones[97].children[19].rotation.set(0,0,girRad*90);
    allClones[103].rotation.set(0,0,girRad*90);
    allClones[104].rotation.set(0,0,girRad*90);
    allClones[105].rotation.set(0,0,girRad*90);
}
function animaWheel(posHand){
    /*
	* NOMBRE: animaWheel.
	* UTILIDAD: Animacionde la rueda y mano
	* ENTRADAS: posHand > indica que mano fue seleccionada.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    actHand = posHand;
    allClones[108].visible = false;//Oculta las manos
    allClones[109].visible = false;//Oculta las manos
    var timeHands = 1300 - (velAnima/3);//Velocidad de la mano de acuerdo a la opcion seleccionada
    if(posHand === "left"){
        allClones[108].visible = true;//Muestra mano izquierda
        var animateHandleft = new TWEEN.Tween(allClones[108].position)
        .to({
            x: 0,
            y: 10,
            z: 30
        },timeHands)
        .onComplete(function(){
            allClones[108].position.set(0,45,0);//Vuelve a su posicion original
            allClones[108].visible = false;//Oculta mano izquierda 
        })
        .easing(easingType).repeat(0).start();
    }
    if(posHand === "right"){
        allClones[109].visible = true;//Muestra mano derecha
        var animateHandleft = new TWEEN.Tween(allClones[109].position)
        .to({
            x: 0,
            y: 10,
            z: -30
        },timeHands)
        .onComplete(function(){
            allClones[109].position.set(0,45,0);//Vuelve a su posicion original
            allClones[109].visible = false;//Oculta mano derecha
        })
        .easing(easingType).repeat(0).start();
    }
    $(".d_forceopc").append('<div class="d_forceopcblock"></div>');//Bloquea menu opciones en lo que esta girando
    $(".d_forceopc").addClass("d_forceopc_inactive");//Deshabilita btns
    
    //Animacion de la rueda
    var animaTime;
    console.log("DESTROY "+dataDestroy);
    
    if(dataDestroy){
        animaTime = 500;//Timpo de giro de la rueda en relacion a los grados
        velAnima = 540;
        var animateWheel = new TWEEN.Tween(allClones[106].rotation)
        .to({
            x: (posHand === "left")?girRad*velAnima:-(girRad*velAnima),//Cambia de direccion
            y: 0,
            z: 0
        },animaTime)
        .onComplete(function(){
            if(dataDestroy){
                animaDestroy(posHand);//Animacion de la rueda al destruirse
            }else{
                $(".d_forceopcblock").remove();//Quita bloqueo de menu
                $(".d_forceopc").removeClass("d_forceopc_inactive");//Habilita btns
            }
        })
        .delay(200).easing(easingTypelineal).repeat(0).start();
    }else{
        animaTime = velAnima*6;//Timpo de giro de la rueda en relacion a los grados
        var animateWheel = new TWEEN.Tween(allClones[106].rotation)
        .to({
            x: (posHand === "left")?girRad*velAnima:-(girRad*velAnima),//Cambia de direccion
            y: 0,
            z: 0
        },animaTime)
        .onComplete(function(){
            $(".d_forceopcblock").remove();//Quita bloqueo de menu
            $(".d_forceopc").removeClass("d_forceopc_inactive");//Habilita btns
            activeHand = false;//No hay animacion de giro
        })
        .delay(200).easing(easingType).repeat(0).start();
    }
}
function animaDestroy(getposHand){
    /*
	* NOMBRE: animaDestroy.
	* UTILIDAD: Animacion de la rueda al destruirse
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    var getanimaTime = 1000;//Tiempo de animacion de destruccion
    allClones[106].rotation.x = 0;//Vuelve a la rotacion original
    /////////Rotacion rueda
    var animateWheel = new TWEEN.Tween(allClones[106].rotation)
    .to({
        x: (getposHand === "left")?girRad*velAnima:-(girRad*velAnima),//Cambia de direccion
        y: girRad*30,
        z: girRad*64
    },getanimaTime*1.5)
    .onComplete(function(){
        //allClones[105].rotation.x = 0;//Vuelve a la rotacion original
        $(".d_forceopcblock").remove();//Quita bloqueo de menu
        $(".d_forceopc").removeClass("d_forceopc_inactive");//Habilita btns
        activeHand = false;//No hay animacion de giro

        $(".d_forceopcbtn, .d_footerbtngirscrewstrong").hide();//Oculta btn hand
        
        $(".d_forceopc").before('<div class="d_forceopcwarning"><div class="d_forceopcwarningin"><div class="d_forceopcwarninginicon"><svg viewBox="0 0 30 30"><path fill-rule="evenodd" clip-rule="evenodd" fill="#FFCB06" d="M14.989,23.79c-2.456-0.001-4.915,0.004-7.375-0.005 c-1.423-0.007-2.441-0.812-2.579-2.177c-0.056-0.545,0.093-1.194,0.365-1.676c1.869-3.326,3.798-6.618,5.71-9.923 c0.563-0.976,1.113-1.956,1.692-2.922c1.04-1.736,3.354-1.729,4.375,0.027c2.477,4.26,4.939,8.522,7.395,12.793 c1.074,1.87-0.096,3.869-2.256,3.879C19.873,23.796,17.43,23.79,14.989,23.79z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.26,12.872c-0.207,1.688-0.418,3.453-0.642,5.223 c-0.043,0.366-0.281,0.586-0.648,0.577c-0.357-0.013-0.586-0.229-0.633-0.6c-0.213-1.753-0.439-3.504-0.633-5.254 c-0.08-0.752,0.537-1.38,1.285-1.37C15.72,11.452,16.297,12.058,16.26,12.872z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.813,20.061c0.012,0.461-0.352,0.845-0.81,0.854 c-0.465,0.013-0.843-0.342-0.854-0.806c-0.014-0.452,0.356-0.85,0.809-0.861C15.416,19.235,15.806,19.604,15.813,20.061z"></path><path fill="#010101" d="M14.979,6.987c0.463,0,0.916,0.317,1.236,0.871c2.355,4.07,4.813,8.332,7.305,12.663 c0.287,0.503,0.322,1.019,0.092,1.421c-0.236,0.409-0.719,0.646-1.32,0.647c-0.873,0.003-1.813,0.004-2.957,0.004 c-0.729,0-1.455,0-2.186-0.001c-0.725,0-1.452,0-2.18,0h-0.674h-1.773H10.75c-1.002,0-2.003,0-3.005-0.001 c-0.652-0.003-1.162-0.239-1.398-0.648c-0.231-0.4-0.185-0.944,0.13-1.491c2.51-4.36,4.96-8.605,7.287-12.616 C14.074,7.299,14.519,6.987,14.979,6.987 M14.979,6.583c-0.581,0-1.159,0.352-1.564,1.053c-2.438,4.2-4.866,8.406-7.289,12.616 c-0.823,1.43-0.044,2.739,1.619,2.741c1.001,0.003,2.003,0.003,3.005,0.003c1.182,0,2.365,0,3.545,0c0.227,0,0.447,0,0.674,0 c1.456,0,2.911,0.002,4.366,0.002c0.986,0,1.973-0.001,2.959-0.005c1.557-0.003,2.348-1.336,1.578-2.672 c-2.432-4.227-4.865-8.447-7.305-12.664C16.154,6.941,15.564,6.583,14.979,6.583L14.979,6.583z"></path></svg></div><div class="d_forceopcwarningintxt">Ten cuidado con la fuerza que aplicas.</div></div></div>');//Agrega emergente de leyenda
        $(".d_forceopcwarning").fadeIn();//Aparece emergente de leyenda
        var timeSet = setTimeout(function(){
            $(".d_forceopcwarning").remove();//Quita emergente de leyenda
            $(".d_forceopcbtnrein").fadeIn();//Muestra btn reiniciar
            clearTimeout(timeSet);//Limpia tiempo
        },5000);
    })
    .easing(easingType).repeat(0).start();
    //Rotacion objetos derecha
    var animaObj1a = new TWEEN.Tween(allClones[96].children[14].rotation)
    .to({
        x: 0,
        y: girRad*30,
        z: 0
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj2a = new TWEEN.Tween(allClones[96].children[15].rotation)
    .to({
        x: 0,
        y: girRad*70,
        z: 0
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj3a = new TWEEN.Tween(allClones[96].children[16].rotation)
    .to({
        x: girRad*90,
        y: 0,
        z: 0
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj4a = new TWEEN.Tween(allClones[96].children[17].rotation)
    .to({
        x: 0,
        y: girRad*90,
        z: 0
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj5a = new TWEEN.Tween(allClones[96].children[18].rotation)
    .to({
        x: 0,
        y: girRad*30,
        z: girRad*90
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj5a2 = new TWEEN.Tween(allClones[96].children[19].rotation)
    .to({
        x: 0,
        y: girRad*30,
        z: girRad*90
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj6a = new TWEEN.Tween(allClones[100].rotation)
    .to({
        x: 0,
        y: 0,
        z: girRad*90
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj7a = new TWEEN.Tween(allClones[101].rotation)
    .to({
        x: girRad*90,
        y: 0,
        z: 0
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj8a = new TWEEN.Tween(allClones[102].rotation)
    .to({
        x: 0,
        y: girRad*90,
        z: 0
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    
    //Rotacion objetos izquierda
    var animaObj1b = new TWEEN.Tween(allClones[97].children[14].rotation)
    .to({
        x: 0,
        y: -girRad*30,
        z: 0
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj2b = new TWEEN.Tween(allClones[97].children[15].rotation)
    .to({
        x: 0,
        y: -girRad*70,
        z: 0
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj3b = new TWEEN.Tween(allClones[97].children[16].rotation)
    .to({
        x: -girRad*90,
        y: 0,
        z: 0
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj4b = new TWEEN.Tween(allClones[97].children[17].rotation)
    .to({
        x: 0,
        y: -girRad*90,
        z: 0
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj5b = new TWEEN.Tween(allClones[97].children[18].rotation)
    .to({
        x: 0,
        y: girRad*30,
        z: -girRad*90
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj5b2 = new TWEEN.Tween(allClones[97].children[19].rotation)
    .to({
        x: 0,
        y: girRad*30,
        z: -girRad*90
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj6b = new TWEEN.Tween(allClones[103].rotation)
    .to({
        x: 0,
        y: 0,
        z: -girRad*90
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj7b = new TWEEN.Tween(allClones[104].rotation)
    .to({
        x: -girRad*90,
        y: 0,
        z: 0
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj8b = new TWEEN.Tween(allClones[105].rotation)
    .to({
        x: 0,
        y: -girRad*90,
        z: 0
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    
    //////////Traslacion rueda
    var animateWheel = new TWEEN.Tween(allClones[106].position)
    .to({
        x: 0,//Cambia de direccion
        y: -10,
        z: -60
    },getanimaTime)
    .onComplete(function(){

    })
    .easing(easingType).repeat(0).start();
    //Traslacion objetos derecha
    var animaObj1a = new TWEEN.Tween(allClones[96].children[14].position)
    .to({
        x: 23,
        y: -20.5,
        z: -13
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj2a = new TWEEN.Tween(allClones[96].children[15].position)
    .to({
        x: 13,
        y: -20.5,
        z: 8
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj3a = new TWEEN.Tween(allClones[96].children[16].position)
    .to({
        x: 15,
        y: -20.5,
        z: 13
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj4a = new TWEEN.Tween(allClones[96].children[17].position)
    .to({
        x: 6,
        y: -20.5,
        z: -13
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj5a = new TWEEN.Tween(allClones[96].children[18].position)
    .to({
        x: 8,
        y: -20.5,
        z: 13
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj5a2 = new TWEEN.Tween(allClones[96].children[19].position)
    .to({
        x: 8,
        y: -20.5,
        z: 16
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj6a = new TWEEN.Tween(allClones[100].position)
    .to({
        x: 26,
        y: -20.5,
        z: -6
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj7a = new TWEEN.Tween(allClones[101].position)
    .to({
        x: 16,
        y: -20.5,
        z: 2
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj8a = new TWEEN.Tween(allClones[102].position)
    .to({
        x: 8,
        y: -20.5,
        z: 20
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    
    //Traslacion objetos izquierda
    var animaObj1b = new TWEEN.Tween(allClones[97].children[14].position)
    .to({
        x: 23,
        y: -20.5,
        z: -13
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj2b = new TWEEN.Tween(allClones[97].children[15].position)
    .to({
        x: 13,
        y: -20.5,
        z: 8
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj3b = new TWEEN.Tween(allClones[97].children[16].position)
    .to({
        x: 15,
        y: -20.5,
        z: 13
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj4b = new TWEEN.Tween(allClones[97].children[17].position)
    .to({
        x: 6,
        y: -20.5,
        z: -13
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj5b = new TWEEN.Tween(allClones[97].children[18].position)
    .to({
        x: 8,
        y: -20.5,
        z: 13
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj5b2 = new TWEEN.Tween(allClones[97].children[19].position)
    .to({
        x: 8,
        y: -20.5,
        z: 16
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj6b = new TWEEN.Tween(allClones[103].position)
    .to({
        x: -26,
        y: -20.5,
        z: -6
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj7b = new TWEEN.Tween(allClones[104].position)
    .to({
        x: -16,
        y: -20.5,
        z: 2
    },getanimaTime)
    .easing(easingType).repeat(0).start();
    var animaObj8b = new TWEEN.Tween(allClones[105].position)
    .to({
        x: -8,
        y: -20.5,
        z: 20
    },getanimaTime)
    .easing(easingType).repeat(0).start();
}
function setAnimation(){
    /*
	* NOMBRE: setAnimation.
	* UTILIDAD: Establece la animacion sin el Tween
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    if(reajusteAnima === true){//Reajusta canvas si se abre el menu
        reajusteConte3d();//Reajusta el contenido 3d en resize
    }
    if(activeHand === true){//Detecta animacion, para agregar el numero de giros
        getRotation();//Obtiene el numero de giros de la rueda
    }
}
function getRotation(){
    /*
	* NOMBRE: getRotation.
	* UTILIDAD: Obtiene el numero de giros de la rueda
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    var getValue = Number(Math.abs(allClones[106].rotation.x*1/6.28319).toFixed(2));//Obtiene el valor de giro en radianes en positivo / en valor de giro de 1 = 6.28319
    var getEntero = Math.trunc(getValue);//Obtiene los enteros
    var getDecimal = getValue - Math.floor(getValue);//Obtiene los decimales
    getDecimal = Number(getDecimal.toFixed(1));//Limita a un decimal
    if (getDecimal != 0 && getDecimal != 1){//Si son decimales
        var getFraccion = getDecimal.toString().split(".")[1]+'/10';//Pasa de decimal a franccion 1/10
        if(getEntero != 0){//Si el entero es diferente a 0
            $("#d_giros_a").text(getEntero+" ");//Agrega giros enteros a html
            $("#d_giros_b").text(getFraccion);//Agrega giros fraccion a html
        }else{//Entero es igual a 0
            $("#d_giros_a").text('');//Agrega giros a html
            $("#d_giros_b").text(getFraccion);//Agrega giros fraccion a html
        }
    }
    else if (getDecimal === 0){//Si son enteros y el decimal es 0
        $("#d_giros_a").text(getEntero);//Agrega giros enteros a html
        $("#d_giros_b").text('');//Agrega giros fraccion a html  
    }  
}