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
totalPasos = 55;//Total de pasos para el armado.
setCamerapos = [60,10,30];//Establece la posicion de la camara
setScenepos = [0,-5,0];//Establece la posicion de la camara
gridPosy = -2;//Posicion de la reticula en cada modelo
setRope = true;//Establece si hay animacion para cuerda
ropeStep = "54";//Paso en donde se anima la cuerda
var addAnima = false;//Indica si se esta animando la cuerda
var guidePoint = [];//Guia para mover la cuerda
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
        new THREE.SphereBufferGeometry( 0.5, 32, 32 ),
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
        new THREE.SphereBufferGeometry( 0.5, 32, 32 ),
        new THREE.MeshBasicMaterial({color:0xffff00,transparent:true,opacity:0})
    );
    guidePoint[2].position.set(0,1,0);
    guidePoint[2].name = "Point1";
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
        new THREE.SphereBufferGeometry( 0.5, 32, 32 ),
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
    
    //console.log(allClones[17].getWorldPosition(new THREE.Vector3()));
    
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
}
function setStepview(){
    /*
	* NOMBRE: setStepview.
	* UTILIDAD: Establece expand, camara, piezas y posicion de escenario en cada paso.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    scene.updateMatrixWorld();//Actualiza las nuevas posiciones de objetos
    numExpand = [
    /*00*///null, null, null, null, null, null, null, null, null, null, null, null, null, null,
    /*01*/[null,null,null], [null,null,null], [null,-5,null], [null,null,+5],
    /*02*/[null,+5,null],
    /*03*/[+5,null,null], [-5,null,null],
    /*04*/[+10,null,null], [+10,null,null], [+10,null,null],
    /*05*/[null,+5,null], [null,+5,null],
    /*06*/[+10,null,null], [+10,null,null], [+10,null,null],
    /*07*/[null,-5,null], [null,-5,null],
    /*08*/[null,+5,null],
    /*09*/[+10,null,null], [+15,null,null],
    /*10*/[null,null,-5],
    /*11*/[-5,null,null], [-5,null,null],
    /*12*/[null,+5,null],
    /*13*/[+5,null,null], [+5,null,null],
    /*14*/[null,+5,null],
    /*15*/[null,+5,null],
    /*16*/[null,null,null], [null,null,null], [null,+5,null], [null,+5,null],
    /*17*/[null,-5,null], [null,-5,null],
    /*18*/[null,-5,null], [null,-5,null],
    /*19*/[null,-5,null], [null,-5,null],
    /*20*/[null,+5,null], [null,+5,null],
    /*21*/[null,+5,null], [null,+5,null],
    /*22*/[null,null,+5], [null,null,+5],
    /*23*/[null,+5,null],
    /*24*/[+10,null,null], [+10,null,null], [+10,null,null], [+10,null,null],
    /*25*/[null,+5,null],
    /*26*/[-10,null,null], [-10,null,null], [-10,null,null], [-10,null,null],
    /*27*/[15,null,null],[15,null,null],
    /*28*/[null,-5,null],
    /*29*/[null,+7,null], [null,+5,null],
    /*30*/[null,null,+5],
    /*31*/[null,null,+5], [null,null,+6.5], [null,null,+8],
    /*32*/[null,+5,null],
    /*33*/[null,+5,null], [null,+5,null],
    /*34*/[null,+5,null],
    /*35*/[null,+5,null], [null,+5,null],
    /*36*/[null,+5,null],
    /*37*/[null,null,+5],
    /*38*/[null,null,+5],
    /*39*/[null,+5,null],
    /*40*/[null,+5,null],
    /*41*/[null,null,+5],
    /*42*/[null,+5,null],
    /*43*/[null,+5,null],
    /*44*/[null,null,+5],
    /*45*/[null,+5,null],
    /*46*/[+10,null,null], [+20,null,null], 
    /*47*/[null,null,-5], 
    /*48*/[null,null,-5], 
    /*49*/[null,null,-3], [null,null,-4.5], [null,null,-6], [null,null,-11], [null,null,-12.5], [null,null,-14], [null,null,-8],
    /*50*/[-10,null,null], [-20,null,null],
        
    /*51*/[null,+5,null], [null,+5,null],
    /*52*/[null,+5,null], [null,+5,null],
    /*53*/[null,+5,null],
        
    /*54*/[null,null,null], 
    /*55*/[null,null,null]
    ];
    contPieza = [
    /*00*///"pieza inicio","pieza final"],
    /*01*/[0,3],
    /*02*/[4,4],
    /*03*/[5,6],
    /*04*/[7,9],
    /*05*/[10,11],
    /*06*/[12,14], 
    /*07*/[15,16],
    /*08*/[17,17],
    /*09*/[18,19],
    /*10*/[20,20],
    /*11*/[21,22],
    /*12*/[23,23],
    /*13*/[24,25],
    /*14*/[26,26],
    /*15*/[27,27],
    /*16*/[28,31],
    /*17*/[32,33],
    /*18*/[34,35],
    /*19*/[36,37],
    /*20*/[38,39],
    /*21*/[40,41],
    /*22*/[42,43],
    /*23*/[44,44],
    /*24*/[45,48],
    /*25*/[49,49],
    /*26*/[50,53],
    /*27*/[54,55],
    /*28*/[56,56],
    /*29*/[57,58],
    /*30*/[59,59],
    /*31*/[60,62], 
    /*32*/[63,63],
    /*33*/[64,65],  
    /*34*/[66,66],
    /*35*/[67,68],
    /*36*/[69,69],
    /*37*/[70,70],
    /*38*/[71,71],  
    /*39*/[72,72],
    /*40*/[73,73],
    /*41*/[74,74],
    /*42*/[75,75],
    /*43*/[76,76],
    /*44*/[77,77],
    /*45*/[78,78],
    /*46*/[79,80],
    /*47*/[81,81],
    /*48*/[82,82],
    /*49*/[83,89],
    /*50*/[90,91],
        
    /*51*/[92,93],
    /*52*/[94,95],
    /*53*/[96,96],
        
    /*54*/[97,97],
    /*55*/[null,null]
    ];
    newLookat = [
    /*00*///[[40,20,40],[0,0,-30]],
    /*01*/[[30,10,10],[0,1,1]],
    /*02*/[[30,10,-10],[0,1,1]],
    /*03*/[[30,20,10],[0,1,8]],
    /*04*/[[10,20,10],[0,1,7]],
    /*05*/[[30,20,10],[0,1,10]],
    /*06*/[[10,20,10],[0,1,10]],
    /*07*/[[30,20,-10],[0,1,16]],
    /*08*/[[10,30,-10],[0,1,16]],
    /*09*/[[10,20,-15],[0,1,16]],
    /*10*/[[20,10,-20],[0,1,22]],
    /*11*/[[15,20,-15],[2,1,25]],
    /*12*/[[15,20,-15],[3,-1,25]],
    /*13*/[[15,20,-15],[-2,1,25]],
    /*14*/[[15,20,-15],[-3,-1,25]],
    /*15*/[[15,20,15],[-3,-1,25]],
    /*16*/[[20,20,20],[0,0,0]],
    /*17*/[[20,20,10],[0,0,0]],
    /*18*/[[25,20,-15],[0,0,4]],
    /*19*/[[25,20,15],[0,0,-4]],
    /*20*/[[25,20,35],[0,0,0]],
    /*21*/[[10,15,30],[0,0,0]],
    /*22*/[[20,10,20],[0,-3,-4]],
    /*23*/[[20,15,20],[-4,-5,0]],
    /*24*/[[-10,5,20],[-4,-5,0]],
    /*25*/[[-20,15,20],[4,-5,0]],
    /*26*/[[10,5,20],[4,-5,0]],
    /*27*/[[10,5,-20],[-4,-5,0]],
    /*28*/[[20,10,-20],[0,0,10]],
    /*29*/[[30,10,30],[0,-3,-8]],
    /*30*/[[30,20,10],[0,-3,-8]],
    /*31*/[[30,20,10],[0,-3,-12]],
    /*32*/[[25,10,25],[0,-8,-4]],
    /*33*/[[20,15,20],[-3,-10,-4]],
    /*34*/[[20,15,20],[-3,-12,-5]],
    /*35*/[[-20,15,20],[3,-10,-4]],
    /*36*/[[-20,15,20],[3,-12,-5]],
    /*37*/[[20,20,20],[-8,-1,-10]],
    /*38*/[[-20,20,20],[8,-1,-10]],
    /*39*/[[20,15,20],[-6,-2,-6]],
    /*40*/[[20,15,20],[-6,-4,-6]],
    /*41*/[[20,15,20],[-10,-5,-10]],
    /*42*/[[-20,15,20],[6,-2,-6]],
    /*43*/[[-20,15,20],[6,-4,-6]],
    /*44*/[[-20,15,20],[10,-5,-10]],
    /*45*/[[-15,10,-15],[0,-7,2]],
    /*46*/[[-20,20,-20],[0,-7,4]],
    /*47*/[[15,10,-15],[-5,-7,4]],
    /*48*/[[-15,10,-15],[5,-7,2]],
    /*49*/[[25,10,-25],[0,-4,8]],
    /*50*/[[15,10,-25],[0,-4,4]],
        
    /*51*/[[15,10,5],[0,-2,12]],
    /*52*/[[15,10,-15],[0,-3,12]],
    /*53*/[[15,10,-25],[0,-4,12]],
        
    /*54*/[[10,30,20],[0,-10,4]],
    /*55*/[[45,20,35],[0,-12,0]]
        
    /*46*//*[[30,20,20],[0,-10,4]],*/
    /*47*//*[[40,20,30],[0,-12,0]]*/
    ];
    svgNum = [
    /*00*///[["b7x4","u4x"],["2","2"]],
    /*01*/[["b7x1","u2x"],["x2","x2"]],
    /*02*/[["u2x"],["x1"]],
    /*03*/[["bu3x"],["x2"]],
    /*04*/[["strawM"],["x3"]],
    /*05*/[["b11x1"],["x2"]],
    /*06*/[["strawM"],["x3"]],
    /*07*/[["u2x"],["x2"]],
    /*08*/[["hang8"],["x1"]],
    /*09*/[["strawM","stickM5mm"],["x1","x1"]],
    /*10*/[["b4x3"],["x1"]],
    /*11*/[["uLcorto"],["x2"]],
    /*12*/[["b4x1"],["x1"]],
    /*13*/[["uLcorto"],["x2"]],
    /*14*/[["b4x1"],["x1"]],
    /*15*/[["u2x"],["x1"]],
    /*16*/[["u4x","u3x"],["x2","x2"]],
    /*16*/[["u6x"],["x2"]],
    /*18*/[["u5x"],["x2"]],
    /*19*/[["u4x"],["x2"]],
    /*20*/[["b11x1"],["x2"]],
    /*21*/[["b7x4"],["x2"]],
    /*22*/[["u4x"],["x2"]],
    /*23*/[["b4x3"],["x1"]],
    /*24*/[["strawS"],["x4"]],
    /*25*/[["b4x3"],["x1"]],
    /*26*/[["strawS"],["x4"]],
    /*27*/[["stickL5mm"],["x2"]],
    /*28*/[["u4x"],["x1"]],
    /*29*/[["b7x4"],["x2"]],
    /*30*/[["strawM"],["x1"]],
    /*31*/[["topeL9mm","arrow"],["x2","x1"]],
    /*32*/[["b7x4"],["x1"]],
    /*33*/[["u1x"],["x2"]],
    /*34*/[["b4x3"],["x1"]],
    /*35*/[["u1x"],["x2"]],
    /*36*/[["b4x3"],["x1"]],
    /*37*/[["arrow"],["x1"]],
    /*38*/[["arrow"],["x1"]],
    /*39*/[["hsmall"],["x1"]],
    /*40*/[["uLcorto"],["x1"]],
    /*41*/[["arrow"],["x1"]],
    /*42*/[["hsmall"],["x1"]],
    /*43*/[["uLcorto"],["x1"]],
    /*44*/[["arrow"],["x1"]],
    /*45*/[["hang8"],["x1"]],
    /*46*/[["strawL","stickL5mm"],["x1","x1"]],
    /*47*/[["u2x"],["x1"]],
    /*48*/[["u2x"],["x1"]],
    /*49*/[["topeL9mm","topeL6mm"],["x2","x4"]],
    /*50*/[["strawL","stickL5mm"],["x1","x1"]],
        
    /*51*/[["hsmall"],["x2"]],
    /*52*/[["hsmall"],["x2"]],
    /*53*/[["u3x"],["x1"]],
        
    /*54*/[["liga"],["x1"]],
    /*55*/[["end"],[""]]
    ];
    svgNumtotal = [
        ["b7x1","x2"],
        ["u2x","x8"],
        ["bu3x","x2"],
        ["strawS","x8"],
        ["strawL","x2"],
        ["strawM","x8"],
        ["hang8","x2"],
        ["stickM5mm","x1"],
        ["stickL5mm","x4"],
        ["b4x3","x5"],
        ["uLcorto","x6"],
        ["b4x1","x2"],
        ["u4x","x7"],
        ["u3x","x3"],
        ["u6x","x2"],
        ["u5x","x2"],
        ["b11x1","x4"],
        ["b7x4","x5"],
        ["topeL9mm","x4"],
        ["arrow","x5"],
        ["u1x","x4"],
        ["hsmall","x6"],
        ["topeL6mm","x4"],
        ["liga","x1"]
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
        //Palanca 
        var palanca = new TWEEN.Tween(allClones[89].rotation)
        .to({
            x: girRad*20,
            y: 0,
            z: 0
        },timeGrl)
        .delay(timeGrl)
        .onComplete(function(){
            addAnima = false;
            
        })
        .yoyo(true)
        .easing(easeEffect)
        .repeat(1).start();
        var giro1 = new TWEEN.Tween(allClones[89].children[17].rotation)
        .to({
            x: -(girRad*95),
            y: 0,
            z: girRad*90
        },timeGrl)
        .delay(timeGrl)
        .yoyo(true)
        .easing(easeEffect)
        .repeat(1).start();
        var giro2 = new TWEEN.Tween(allClones[78].rotation)
        .to({
            x: girRad*90,
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
        //Se le resta la posicion de la scena en cada paso que se ocupe
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
    if(getBtnpress >= 16){
        for(i=0; i<=27; i++){
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
    
    meshTube.geometry.parameters.path.points[0].y = allClones[89].children[17].children[3].getWorldPosition(new THREE.Vector3()).y-newLookat[getBtnpress-1][1][1];
    meshTube.geometry.parameters.path.points[0].z = allClones[89].children[17].children[3].getWorldPosition(new THREE.Vector3()).z-newLookat[getBtnpress-1][1][2];

    meshTube.geometry.parameters.path.points[1].y = allClones[89].children[17].children[3].getWorldPosition(new THREE.Vector3()).y-newLookat[getBtnpress-1][1][1];
    meshTube.geometry.parameters.path.points[1].z = allClones[89].children[17].children[3].getWorldPosition(new THREE.Vector3()).z-newLookat[getBtnpress-1][1][2];

    meshTube.geometry.parameters.path.points[2].y = allClones[78].children[3].getWorldPosition(new THREE.Vector3()).y-newLookat[getBtnpress-1][1][1];
    meshTube.geometry.parameters.path.points[2].z = allClones[78].children[3].getWorldPosition(new THREE.Vector3()).z-newLookat[getBtnpress-1][1][2];

    meshTube.geometry.parameters.path.points[3].y = allClones[78].children[3].getWorldPosition(new THREE.Vector3()).y-newLookat[getBtnpress-1][1][1];
    meshTube.geometry.parameters.path.points[3].z = allClones[78].children[3].getWorldPosition(new THREE.Vector3()).z-newLookat[getBtnpress-1][1][2];

    meshTube.geometry.parameters.path.points[4].y = allClones[89].children[17].children[3].getWorldPosition(new THREE.Vector3()).y-newLookat[getBtnpress-1][1][1];
    meshTube.geometry.parameters.path.points[4].z = allClones[89].children[17].children[3].getWorldPosition(new THREE.Vector3()).z-newLookat[getBtnpress-1][1][2];

    meshTube.geometry.parameters.path.points[5].y = allClones[89].children[17].children[3].getWorldPosition(new THREE.Vector3()).y-newLookat[getBtnpress-1][1][1];
    meshTube.geometry.parameters.path.points[5].z = allClones[89].children[17].children[3].getWorldPosition(new THREE.Vector3()).z-newLookat[getBtnpress-1][1][2];
    
    //Actualizacion de geometria
    var newCable = new THREE.TubeBufferGeometry(meshTube.geometry.parameters.path, 220, 0.1, 8, false);
    meshTube.geometry.copy(newCable);
    meshTube.geometry.needsUpdate = true;
}