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
totalPiezas = 93;//El total de piezas que se agregaron
setCamerapos = [40,20,40];//Establece la posicion de la camara
setScenepos = [0,0,0];//Establece la posicion de la camara
var cssDiv1,cssDiv2,cssDiv3,cssDiv4,cssDiv5;//Almacena texto
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
    console.log(scene);
    
    
    //Instructivo 1
    gltfClone = new classClonegltf("b7x4",0,-2,0,0,girRad*90,girRad*90,false,0);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u4x",0,0.58,0,0,0,girRad*90,false,1);
    gltfClone.creaClonegltf();
    
    helperMesh = new classaddArrowhelper("helper1",0,-9,0,0,9,0,3,0x8CC63F,1,0.5,false);
    helperMesh.creaArrowhelper();
    helperMesh = new classaddArrowhelper("helper2",0,-9,0,0,9,0,3,0xff0000,1,0.5,false);
    helperMesh.creaArrowhelper();
    
    
    var labelDiv1 = document.createElement('div');
    labelDiv1.className = 'd_txtavoid';//Agrega clase
    labelDiv1.textContent = 'Evitar';
    cssDiv1 = new THREE.CSS2DObject(labelDiv1);
    cssDiv1.width = 100;
    cssDiv1.height = 100;
    cssDiv1.position.set( 0, 1, 0 );
    cssDiv1.visible = false;
    allHelpers.helper2.add(cssDiv1);
    
    //Instructivo 2
    gltfClone = new classClonegltf("flexLarge",0,-0.45,-5.18,0,0,0,false,2);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b7x1",2.7,0,0,girRad*90,0,girRad*90,false,3);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b7x1",-2.7,0,0,girRad*90,0,girRad*90,false,4);
    gltfClone.creaClonegltf();
    
    meshClone = new classCloneshape("straw",0,0,0,0,0,girRad*90,8,false,5);
    meshClone.creaClonemesh();
    
    meshClone = new classCloneshape("stick",0,0,0,0,0,girRad*90,10,false,6);
    meshClone.creaClonemesh();
    
    helperMesh = new classaddArrowhelper("helper3",-9,0,0,-9,0,0,3,0x8CC63F,1,0.5,false);
    helperMesh.creaArrowhelper();
    helperMesh = new classaddArrowhelper("helper4",9,0,0,-9,0,0,3,0x8CC63F,1,0.5,false);
    helperMesh.creaArrowhelper();
    
    //Instructivo 3
    gltfClone = new classClonegltf("poleaA",0,-0.3,0,0,0,0,false,7);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("poleaB",0,0,0,0,0,0,false,8);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("poleaA",0,0.3,0,0,0,0,false,9);
    gltfClone.creaClonegltf();
    
    gltfClone = new classClonegltf("poleaC",0,0,0.78,0,girRad*90,girRad*90,false,10);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("poleaC",0.67,0,-0.4,0,girRad*30,girRad*90,false,11);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("poleaC",-0.67,0,-0.4,0,-(girRad*30),girRad*90,false,12);
    gltfClone.creaClonegltf();
    
    meshClone = new classCloneshape("sticklight",0,0,0,0,0,girRad*90,10,false,13);
    meshClone.creaClonemesh();
    
    groupPolea[0] = new THREE.Group();
    groupPolea[0].add(allClones[7],allClones[8],allClones[9],allClones[10],allClones[11],allClones[12]);
    groupPolea[0].rotation.z = girRad*90;
    groupPolea[0].name = "polea"
    scene.add( groupPolea[0] );
    
    gltfClone = new classClonegltf("u3x",0,-1,3.9,0,girRad*90,girRad*90,false,14);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u3x",0,-1,-3.9,0,girRad*90,girRad*90,false,15);
    gltfClone.creaClonegltf();
    
    gltfClone = new classClonegltf("b7x1",2.6,0,0,0,0,girRad*90,false,16);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("b7x1",-2.6,0,0,0,0,girRad*90,false,17);
    gltfClone.creaClonegltf();
    
    gltfClone = new classClonegltf("topeL9mm",2,0,0,0,0,girRad*90,false,18);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",-2,0,0,0,0,girRad*90,false,19);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",1,0,0,0,0,girRad*90,false,20);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("topeL9mm",-1,0,0,0,0,girRad*90,false,21);
    gltfClone.creaClonegltf();
    
    helperMesh = new classaddArrowhelper("helper5",9,0,0,-9,0,0,5,0x8CC63F,1,0.5,false);
    helperMesh.creaArrowhelper();
    
    //Instructivo 4
    gltfClone = new classClonegltf("u5x",0,0,0,girRad*180,0,girRad*90,false,22);
    gltfClone.creaClonegltf();
    gltfClone = new classClonegltf("u5x",0,0,0,0,girRad*90,girRad*90,false,23);
    gltfClone.creaClonegltf();
    
    var geometryPush = new THREE.CylinderGeometry( 0.8, 0.8, 0.1, 32 );
    var materialPush = new THREE.MeshBasicMaterial( {color: 0x009eb3, transparent:true, opacity:0.75} );
    var cylinderPush1,cylinderPush2,cylinderPush3,cylinderPush4;
    
    cylinderPush1 = new THREE.Mesh(geometryPush, materialPush);
    cylinderPush1.rotation.z = -(girRad*90);
    cylinderPush1.position.set(0.6,0,1.6);
    allClones[22].add(cylinderPush1);
    cylinderPush2 = new THREE.Mesh(geometryPush, materialPush);
    cylinderPush2.rotation.z = -(girRad*90);
    cylinderPush2.position.set(0.6,0,-1.6);
    allClones[22].add(cylinderPush2);
    
    cylinderPush3 = new THREE.Mesh(geometryPush, materialPush);
    cylinderPush3.rotation.z = -(girRad*90);
    cylinderPush3.position.set(0.6,0,1.6);
    allClones[23].add(cylinderPush3);
    cylinderPush4 = new THREE.Mesh(geometryPush, materialPush);
    cylinderPush4.rotation.z = -(girRad*90);
    cylinderPush4.position.set(0.6,0,-1.6);
    allClones[23].add(cylinderPush4);
    
    
    helperMesh = new classaddArrowhelper("helper6",0,9,1.6,0,-9,1.6,3,0x8CC63F,1,0.5,false);
    helperMesh.creaArrowhelper();
    helperMesh = new classaddArrowhelper("helper7",0,9,-1.6,0,-9,-1.6,3,0x8CC63F,1,0.5,false);
    helperMesh.creaArrowhelper();
    
    helperMesh = new classaddArrowhelper("helper8",0,-9,1.6,1.6,9,0,3,0x8CC63F,1,0.5,false);
    helperMesh.creaArrowhelper();
    helperMesh = new classaddArrowhelper("helper9",0,-9,-1.6,-1.6,9,0,3,0x8CC63F,1,0.5,false);
    helperMesh.creaArrowhelper();
    
    var labelDiv2 = document.createElement('div');
    labelDiv2.className = 'd_txtfingers';//Agrega clase
    labelDiv2.textContent = 'Jalar';
    cssDiv2 = new THREE.CSS2DObject(labelDiv2);
    cssDiv2.width = 100;
    cssDiv2.height = 100;
    cssDiv2.position.set( 0, 1, 0 );
    cssDiv2.visible = false;
    allHelpers.helper6.add(cssDiv2);
    
    var labelDiv3 = document.createElement('div');
    labelDiv3.className = 'd_txtfingers';//Agrega clase
    labelDiv3.textContent = 'Jalar';
    cssDiv3 = new THREE.CSS2DObject(labelDiv3);
    cssDiv3.width = 100;
    cssDiv3.height = 100;
    cssDiv3.position.set( 0, 1, 0 );
    cssDiv3.visible = false;
    allHelpers.helper7.add(cssDiv3);
    
    var labelDiv4 = document.createElement('div');
    labelDiv4.className = 'd_txtfingers';//Agrega clase
    labelDiv4.textContent = 'Presionar';
    cssDiv4 = new THREE.CSS2DObject(labelDiv4);
    cssDiv4.width = 1004
    cssDiv4.height = 100;
    cssDiv4.position.set( 0, 1, 0 );
    cssDiv4.visible = false;
    allHelpers.helper8.add(cssDiv4);
    
    var labelDiv5 = document.createElement('div');
    labelDiv5.className = 'd_txtfingers';//Agrega clase
    labelDiv5.textContent = 'Presionar';
    cssDiv5 = new THREE.CSS2DObject(labelDiv5);
    cssDiv5.width = 1005
    cssDiv5.height = 100;
    cssDiv5.position.set( 0, 1, 0 );
    cssDiv5.visible = false;
    allHelpers.helper9.add(cssDiv5);
    
  
}
var groupPolea = [];
function setStepview(){
    /*
	* NOMBRE: setStepview.
	* UTILIDAD: Establece expand en cada paso.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    

    
    
    
    
    //arrowHelper1.position.y = 3;
    
    //addExpand();//Establece la expancion de las piezas por cada paso
    //addAnimacamera();//Establece la nueva posicion animada de camara y escena en cada paso
    //addPoscamera();//Establece la nueva posicion de camara y escena en cada paso
    
    
    
    
}
