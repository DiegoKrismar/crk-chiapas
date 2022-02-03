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
var corOrishape = {x:[],y:[],z:[]};//Almacena el origen de la posiciond e los objetos
getType = "instructivo";//Variable para saber si es simulador o armado
var totalBtns = 4;//Total de btns que se agregan
arrayGltf = ["mdf"];//Guarda los GLTF que se construyen en cada practica.
/*************************************************************************************
*
* 								FUNCIONES Y PROCEDIMIENTOS
*
**************************************************************************************/
$(document).ready(function(){});
$(window).resize(function(){});
$(window).on('load',function(){});
function iniciaInstructivomecanica(){
    /*
	* NOMBRE: iniciaInstructivomecanica.
	* UTILIDAD: Inicia instructivo mecanica
	* ENTRADAS: Ninguno.
	* SALIDAS: Ninguna.
    */
    /*POR EL MOMENTO TODO ESTA CONTENIDO EN EL DOM DE LA INTERFAZ Y SE MUESTRAN SOLO LOS ELEMENTOS NECESARIOS, ESTO CAMBIARA AL HACER MODIFICACIONES EN LA INTERFAZ*/
    $("nav, div, section").remove(".d_armado");
    $("nav, div, section").remove(".d_simulacion");
    $("nav, div, section").remove(".d_programacionxbloques");
    /****************************************************/
    addBtns();//Agrega btns de inicio
    clicBtns();//Clic en btn de cada instructivo
    $(window).resize(function(){
        /*
        * NOMBRE: resize.
        * UTILIDAD: Detecta el resize del navegador
        * ENTRADAS: Ninguno.
        * SALIDAS: Ninguna.
        */
        if(startInit){//Hay canvas 3d en la aplicacion
            reajusteConte3d();//Reajusta el contenido 3d en resize
        }
    });
    $(window).on("orientationchange",function(event){
        /*
        * NOMBRE: orientationchange.
        * UTILIDAD: Detecta el cambio de orientacion del dispositivo
        * ENTRADAS: event > evento orientacion.
        * SALIDAS: Ninguna.
        */
        if(startInit){//Hay canvas 3d en la aplicacion
            reajusteConte3d();//Reajusta el contenido 3d en resize
        }
    })
}
function iniciaArmado(){
    /*
	* NOMBRE: iniciaArmado.
	* UTILIDAD: Inicia todo lo del armado despues de construirse los modelos 3D
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    getOrigin();//Obtener el origen de las piezas
    setStepview();//Establece expand en cada paso.
}
function getOrigin(){
    /*
	* NOMBRE: getOrigin.
	* UTILIDAD: Recupera posiion original de piezas.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    for(i=0; i<=allClones.length-1; i++){
        corOrishape.x.push(allClones[i].position.x);//Guarda la posicion de las piezas en x
        corOrishape.y.push(allClones[i].position.y);//Guarda la posicion de las piezas en y
        corOrishape.z.push(allClones[i].position.z);//Guarda la posicion de las piezas en z
        //allClones[i].visible = true;//Oculta todas la piezas
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
    axesHelper.position.set(-scene.position.x,-scene.position.y,-scene.position.z);//Nueva posicion de axesHelper
}
function addBtns(){
    /*
    * NOMBRE: addBtns.
    * UTILIDAD: Agrega btns de inicio
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    for(i=1; i<=totalBtns; i++){//Agrega botns
        $("#d_instructivobtnsconte").append('<div class="d_instructivobtns"><div class="d_instructivobtnsin" id="'+i+'"><div class="d_instructivobtnlight"></div></div></div>');//Agrega opciones btns a menu
    }
}
function clicBtns(){
    /*
    * NOMBRE: clicBtns.
    * UTILIDAD: Clic en btn de cada instructivo
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    controls.enabled = false;//Desabilita opcion de manipulacion 3d
    $(".d_instructivobtnsin").on("pointerup touchend",function(){//Clic en botones de menu
        resetStep();//Resetea las animaciones y piezas
        $("#d_instructivobtnsconte").fadeOut();//Oculta menu de opciones
        var numBtn = $(this).attr("id");//Obtiene el id del btn que se presiona
        if(numBtn === "1"){//Caso boton 1
            instructivoOne();//Instructivo 1
            $(".d_instructivobtnsconte").after('<div class="d_instructivotitle">Armado de piezas</div><div class="d_instructivomessage">Las ranuras sirven para unir dos piezas y no deben ser forzadas al momento de desarmar el modelo.</div>');//Agrega titulo y mensaje
        }
        if(numBtn === "2"){//Caso boton 2
            instructivoTwo();//Instructivo 2
            $(".d_instructivobtnsconte").after('<div class="d_instructivotitle">Armado con popote y palito de papel</div><div class="d_instructivomessage">Se recomienda introducir el palito de papel más grueso en el popote para facilitar su paso entre los orificios de las piezas.</div>');//Agrega titulo y mensaje
        }
        if(numBtn === "3"){//Caso boton 3
            instructivoThree();//Instructivo 3
            $(".d_instructivobtnsconte").after('<div class="d_instructivotitle">Armado de poleas</div><div class="d_instructivomessage">En el armado de poleas, se recomienda introducir primero el palito en una de las estructuras, después colocar los topes correspondientes, seguido de la polea y al final, los últimos topes. Mientras se agregan las piezas, se va recorriendo el palito hasta atravesar la segunda estructura. Sigue el mismo procedimiento para el armado de engranes.</div>');//Agrega titulo y mensaje
        }
        if(numBtn === "4"){//Caso boton 4
            instructivoFour();//Instructivo 4
            $(".d_instructivobtnsconte").after('<div class="d_instructivotitle">Desarmado de piezas</div><div class="d_instructivomessage">Para separar dos piezas, mientras presionas una, jala la otra. Esta presión debe de ser en forma vertical y uniforme.</div>');//Agrega titulo y mensaje
        }
    });
}
function resetStep(){
    /*
	* NOMBRE: resetStep.
	* UTILIDAD: Resetea las animaciones y piezas
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    * VARIABLES: Ninguna
    */
    $("#d_instructivobtnsconte").fadeIn();//Muestra menu de opciones
    $(".d_instructivomessage").remove();//Quita mensaje
    $(".d_instructivotitle").remove();//Quita titulo
    
    allClones[0].visible = false;
    allClones[1].visible = false;
    
    allClones[2].visible = false;
    allClones[3].visible = false;
    allClones[4].visible = false;
    allClones[5].visible = false;
    allClones[6].visible = false;
    
    allClones[7].visible = false;
    allClones[8].visible = false;
    allClones[9].visible = false;
    allClones[10].visible = false;
    allClones[11].visible = false;
    allClones[12].visible = false;
    allClones[13].visible = false;
    allClones[14].visible = false;
    allClones[15].visible = false;
    allClones[16].visible = false;
    allClones[17].visible = false;
    allClones[18].visible = false;
    allClones[19].visible = false;
    allClones[20].visible = false;
    allClones[21].visible = false;
    
    allClones[22].visible = false;
    allClones[23].visible = false;

    allHelpers.helper1.visible = false;
    allHelpers.helper2.visible = false;
    allHelpers.helper2.children[2].visible = false;

    allHelpers.helper3.visible = false;
    allHelpers.helper4.visible = false;

    allHelpers.helper5.visible = false;
    
    allHelpers.helper6.visible = false;
    allHelpers.helper7.visible = false;
    allHelpers.helper8.visible = false;
    allHelpers.helper9.visible = false;   
}
var easingTween = TWEEN.Easing.Quadratic.InOut;
function instructivoOne(){
    /*
    * NOMBRE: instructivoOne.
    * UTILIDAD: Instructivo 1
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    
    allClones[1].position.y = 4;
    allClones[1].position.z = -2.58;
    
    allHelpers.helper1.position.y = 9;
    allHelpers.helper2.position.y = 4.5;
    
    camera.position.set(15,5,15);
    scene.position.set(0,0,0);
    
    allClones[0].visible = true;
    allClones[1].visible = true;
    
    allHelpers.helper1.visible = true;

    
    //ANIMA PIEZA 1ra PARTE
    var addAnimatepieza = new TWEEN.Tween(allClones[1].position)
    .to({
        x: corOrishape.x[1],
        y: corOrishape.y[1],
        z: -2.58
    },2000).easing(easingTween).repeat(0)
    .onComplete(function(){
        
        //ANIMA PIEZA 2da PARTE (delay)
        addAnimatepieza = new TWEEN.Tween(allClones[1].position)
        .to({},0)
        .onComplete(function(){

            console.log("END");
            //ANIMA PIEZA (QUE NO HACER)

            allHelpers.helper1.visible = false;
            allHelpers.helper2.visible = true;
            allHelpers.helper2.children[2].visible = true;

            addAnimatepieza = new TWEEN.Tween(allClones[1].position)
            .to({
                x: 0,
                y: 1.5,
                z: -2.58
            },1000)
            .easing(easingTween).repeat(0).start();
            var addAnimatepieza2 = new TWEEN.Tween(allClones[1].rotation)
            .to({
                x: girRad*20,
                y: 0,
                z: girRad*90
            },1000)
            .onComplete(function(){
                addAnimatepieza = new TWEEN.Tween(allClones[1].position)
                .to({
                    x: 0,
                    y: 0,
                    z: -2.58
                },1000)
                .easing(easingTween).repeat(0).start();
                var addAnimatepieza2 = new TWEEN.Tween(allClones[1].rotation)
                .to({
                    x: -(girRad*20),
                    y: 0,
                    z: girRad*90
                },1000)
                .onComplete(function(){
                    addAnimatepieza = new TWEEN.Tween(allClones[1].position)
                    .to({
                        x: corOrishape.x[1],
                        y: 2,
                        z: -2.58
                    },1000)
                    .easing(easingTween).repeat(0).start();
                    var addAnimatepieza2 = new TWEEN.Tween(allClones[1].rotation)
                    .to({
                        x: 0,
                        y: 0,
                        z: girRad*90
                    },1000)
                    .onComplete(function(){
                    })
                    .easing(easingTween).repeat(0).start();
                })
                .easing(easingTween).repeat(0).start();
            })
            .easing(easingTween).repeat(0).start();

        })
        .delay(2000).repeat(0).start();
        

    }).delay(500).start();
    
    
    
    //ANIMA ARROW 1ra PARTE
    var addAnimatearrow = new TWEEN.Tween(allHelpers.helper1.position)
    .to({
        x: 0,
        y: 4.5,
        z: 0
    },2000)
    .onComplete(function(){
                
        //ANIMA ARROW 2da PARTE (QUE NO HACER)
        addAnimatearrow = new TWEEN.Tween(allHelpers.helper2.position)
        .to({
            x: 0,
            y: 6,
            z: 0
        },1000)
        .delay(4000).easing(easingTween).repeat(0).start();
                
        
    }).delay(500).easing(easingTween).repeat(0).start();
    
    //ANIMA CAMERA 1ra PARTE
    var addAnimatecamera = new TWEEN.Tween(camera.position)
    .to({
        x: 10,
        y: 10,
        z: -10
    },2000)
    .onComplete(function(){

         var endTime = setTimeout(function(){
             allHelpers.helper1.visible = false;
             console.log('END');
             resetStep();//Resetea las animaciones y piezas
             clearTimeout(endTime);
         },5000);

    })
    .delay(2500).easing(easingTween).repeat(0).start();
    
}
function instructivoTwo(){
    /*
    * NOMBRE: instructivoTwo.
    * UTILIDAD: Instructivo 2
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    
    allClones[5].position.x = 10;
    allClones[6].position.x = 21;
    
    allHelpers.helper3.position.x = 18;
    allHelpers.helper3.position.z = 3;
    allHelpers.helper4.position.x = -1;
    allHelpers.helper4.position.z = 3;
    
    camera.position.set(5,10,20);
    scene.position.set(-10,0,0);
    
    allClones[2].visible = true;
    allClones[3].visible = true;
    allClones[4].visible = true;
    
    allClones[5].visible = true;
    allClones[6].visible = true;
    
    allHelpers.helper3.visible = true;
    allHelpers.helper4.visible = false;
    
    //ANIMA PALITO 1ra PARTE
    var addAnimatepalito = new TWEEN.Tween(allClones[6].position)
    .to({
        x: 10,
        y: corOrishape.y[6],
        z: corOrishape.z[6]
    },2000)
    .onComplete(function() {
        //addAnimatepopote.start();

        //ANIMA PALITO 2da PARTE
        addAnimatepalito = new TWEEN.Tween(allClones[6].position)
        .to({
            x: corOrishape.x[6],
            y: corOrishape.y[6],
            z: corOrishape.z[6]
        },3000)
        .onComplete(function() {

            //ANIMA PALITO 3ra PARTE
            addAnimatepalito = new TWEEN.Tween(allClones[6].position)
            .to({
                x: 19,
                y: corOrishape.y[6],
                z: corOrishape.z[6]
            },2000)
            
            .onComplete(function() {
                allClones[6].visible = false;
                
                
            }).easing(easingTween).repeat(0).start();

        }).easing(easingTween).repeat(0).start();

        //ANIMA POPOTE 1ra PARTE
        var addAnimatepopote = new TWEEN.Tween(allClones[5].position)
        .to({
            x: corOrishape.x[5],
            y: corOrishape.y[5],
            z: corOrishape.z[5]
        },3000).easing(easingTween).repeat(0).start();

    }).delay(500).easing(easingTween).repeat(0).start();

    
    
    //ANIMA CAMERA 1ra PARTE
    var addAnimatecamera = new TWEEN.Tween(camera.position)
    .to({
        x: 0,
        y: 5,
        z: 20
    },2000)
    .onComplete(function() {
        addAnimatecamera = new TWEEN.Tween(camera.position)
        .to({
            x: -10,
            y: 5,
            z: 20
        },2000)
        .onComplete(function() {
            var endTime = setTimeout(function(){
                console.log('END');
                resetStep();//Resetea las animaciones y piezas
                clearTimeout(endTime);
            },3000);
        })
        .delay(2000).easing(easingTween).repeat(0).start();
    })
    .delay(2500).easing(easingTween).repeat(0).start();
    
    //ANIMA SCENE 1ra PARTE
    var addAnimatescene = new TWEEN.Tween(scene.position)
    .to({
        x: 0,
        y: 0,
        z: 0
    },3000).delay(2500).easing(easingTween).repeat(0).start();
    
    //ANIMA ARROW 1ra PARTE
    var addAnimatearrow = new TWEEN.Tween(allHelpers.helper3.position)
    .to({
        x: 10,
        y: 0,
        z: 3
    },2000)
    .onComplete(function(){
        //ANIMA ARROW 2da PARTE
        addAnimatearrow = new TWEEN.Tween(allHelpers.helper3.position)
        .to({
            x: 0,
            y: 0,
            z: 3
        },3000)
        .onComplete(function(){
            allHelpers.helper3.visible = false;
            allHelpers.helper4.visible = true;
            //ANIMA ARROW 2da PARTE
            addAnimatearrow = new TWEEN.Tween(allHelpers.helper4.position)
            .to({
                x: 16,
                y: 0,
                z: 3
            },2000)
            .onComplete(function(){
                allHelpers.helper4.visible = false;
            })
            .easing(easingTween).repeat(0).start();
        })
        .easing(easingTween).repeat(0).start();
    }).delay(500).easing(easingTween).repeat(0).start();
      
}
function instructivoThree(){
    /*
    * NOMBRE: instructivoThree.
    * UTILIDAD: Instructivo 3
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    
    camera.position.set(5,5,20);
    scene.position.set(0,0,0);
    
    allClones[7].visible = true;
    allClones[8].visible = true;
    allClones[9].visible = true;
    allClones[10].visible = true;
    allClones[11].visible = true;
    allClones[12].visible = true;
    
    allClones[13].visible = true;
    
    allClones[14].visible = true;
    allClones[15].visible = true;
    
    allClones[16].visible = true;
    allClones[17].visible = true;
    
    allClones[18].visible = false;
    allClones[19].visible = false;
    allClones[20].visible = false;
    allClones[21].visible = false;
    
    groupPolea[0].visible = false;
    
    allClones[13].position.x = -20;
    
    allClones[18].position.y = 8;
    
    allClones[19].position.x = 1.3;
    allClones[19].position.y = 5;
    
    allClones[20].position.y = 8;
    
    allClones[21].position.x = 1.3;
    allClones[21].position.y = 5;
    
    groupPolea[0].position.x = 1.3;
    groupPolea[0].position.y = 7;
    
    allHelpers.helper5.visible = true;
    
    allHelpers.helper5.position.y = 3;
    allHelpers.helper5.position.x = -20;
    
    
    console.log(groupPolea);
    
    
    //groupPolea[0].position.y = 20;
    
    //ANIMA SCENE 1ra PARTE
    var addAnimatescene = new TWEEN.Tween(scene.position)
    .to({
        x: 5,
        y: 0,
        z: 0
    },2000)
    .onComplete(function(){
        //ANIMA SCENE 2da PARTE
        addAnimatescene = new TWEEN.Tween(scene.position)
        .to({
            x: 0,
            y: 0,
            z: 0
        },2000)
        .onComplete(function(){

        })
        .easing(easingTween).repeat(0).start();
        
    })
    .delay(500).easing(easingTween).repeat(0).start();
    
    //ANIMA POPOTE 1ra PARTE
    var addAnimatepopote = new TWEEN.Tween(allClones[13].position)
    .to({
        x: -10,
        y: 0,
        z: 0
    },2000)
    .onComplete(function(){
        //ANIMA POPOTE 2da PARTE
        addAnimatepopote = new TWEEN.Tween(allClones[13].position)
        .to({
            x: -4.6,
            y: 0,
            z: 0
        },2000)
        .onComplete(function(){
            addAnimatepopote = new TWEEN.Tween(allClones[13].position)
            .to({
                x: 0,
                y: 0,
                z: 0
            },2000)
            .onComplete(function(){

            })    
            .delay(21000).easing(easingTween).repeat(0).start();
        })    
        .easing(easingTween).repeat(0).start();
    })
    .delay(500).easing(easingTween).repeat(0).start();
    
    //ANIMA CAMERA 1ra PARTE
    var addAnimatecamera = new TWEEN.Tween(camera.position)
    .to({
        x: -5,
        y: 10,
        z: 15
    },2000)
    .onComplete(function() {
        allClones[19].visible = true;
        addAnimatecamera = new TWEEN.Tween(camera.position)
        .to({
            x: 0,
            y: 10,
            z: 15
        },2000)
        .onComplete(function() {
            allClones[20].visible = true;
            addAnimatecamera = new TWEEN.Tween(camera.position)
            .to({
                x: 5,
                y: 10,
                z: 20
            },2000)
            .onComplete(function() {
                
            })
            .delay(4000).easing(easingTween).repeat(0).start();
        })
        .delay(12000).easing(easingTween).repeat(0).start();
    })
    .delay(4500).easing(easingTween).repeat(0).start();
    
    //ANIMA CUENTA 1ra PARTE
    var addAnimatepieza1 = new TWEEN.Tween(allClones[19].position)
    .to({
        x: 1.3,
        y: corOrishape.y[19],
        z: corOrishape.z[19]
    },2000)
    .onComplete(function() {
        addAnimatepieza1 = new TWEEN.Tween(allClones[19].position)
        .to({
            x: corOrishape.x[19],
            y: corOrishape.y[19],
            z: corOrishape.z[19]
        },2000)
        .onComplete(function() {
            allClones[21].visible = true;
            var ddAnimatepieza2 = new TWEEN.Tween(allClones[21].position)
            .to({
                x: 1.3,
                y: corOrishape.y[21],
                z: corOrishape.z[21]
            },2000)
            .onComplete(function() {
                ddAnimatepieza2 = new TWEEN.Tween(allClones[21].position)
                .to({
                    x: corOrishape.x[21],
                    y: corOrishape.y[21],
                    z: corOrishape.z[21]
                },2000)
                .onComplete(function() {
                    groupPolea[0].visible = true;
                })
                .easing(easingTween).repeat(0).start();
            })
            .easing(easingTween).repeat(0).start();
        })
        .easing(easingTween).repeat(0).start();
    })
    .delay(6500).easing(easingTween).repeat(0).start();
    
    //ANIMA POLEA
    var addAnimatepolea = new TWEEN.Tween(groupPolea[0].position)
    .to({
        x: 1.3,
        y: 0,
        z: 0
    },2000)
    .onComplete(function() {
        addAnimatepolea = new TWEEN.Tween(groupPolea[0].position)
        .to({
            x: 0,
            y: 0,
            z: 0
        },2000)
        .onComplete(function() {
        })
        .easing(easingTween).repeat(0).start();
    })
    .delay(14500).easing(easingTween).repeat(0).start();
    
    //ANIMA CUENTA 2da PARTE
    var addAnimatepieza2 = new TWEEN.Tween(allClones[20].position)
    .to({
        x: corOrishape.x[20],
        y: corOrishape.y[20],
        z: corOrishape.z[20]
    },2000)
    .onComplete(function() {
        allClones[18].visible = true;
        addAnimatepieza2 = new TWEEN.Tween(allClones[18].position)
        .to({
            x: corOrishape.x[18],
            y: corOrishape.y[18],
            z: corOrishape.z[18]
        },2000)
        .onComplete(function() {
        })
        .easing(easingTween).repeat(0).start();
    })
    .delay(20500).easing(easingTween).repeat(0).start();
    
    //ANIMA POLEA
    var addAnimatepolea = new TWEEN.Tween(groupPolea[0].rotation)
    .to({
        x: girRad*90,
        y: 0,
        z: girRad*90
    },1000)
    .onComplete(function(){
        var endTime = setTimeout(function(){
            console.log('END');
            resetStep();//Resetea las animaciones y piezas
            clearTimeout(endTime);
        },3000);
        
    })
    .delay(28500).easing(TWEEN.Easing.Linear.None).start();
    
    //ANIMA ARROW
    var addAnimatearrow = new TWEEN.Tween(allHelpers.helper5.position)
    .to({
        x: -10,
        y: 3,
        z: 0
    },2000)
    .onComplete(function(){
        addAnimatearrow = new TWEEN.Tween(allHelpers.helper5.position)
        .to({
            x: -4.6,
            y: 3,
            z: 0
        },2000)
        .onComplete(function(){
            addAnimatearrow = new TWEEN.Tween(allHelpers.helper5.position)
            .onComplete(function(){
                allHelpers.helper5.rotation.x = girRad*90;
                allHelpers.helper5.rotation.y = girRad*90;
                allHelpers.helper5.rotation.z = girRad*90;

                allHelpers.helper5.position.x = -1;
                allHelpers.helper5.position.y = 11;

                addAnimatearrow = new TWEEN.Tween(allHelpers.helper5.position)
                .to({
                    y: 8
                },2000)
                .onComplete(function(){
                    addAnimatearrow = new TWEEN.Tween(allHelpers.helper5.position)
                    .onComplete(function(){
                        allHelpers.helper5.visible = false;
                        addAnimatearrow = new TWEEN.Tween(allHelpers.helper5.position)
                        .onComplete(function(){
                            allHelpers.helper5.rotation.x = 0;
                            allHelpers.helper5.rotation.y = 0;
                            allHelpers.helper5.rotation.z = -(girRad*90);

                            allHelpers.helper5.position.x = -2;
                            allHelpers.helper5.position.y = 4;
                            
                            allHelpers.helper5.visible = true;
                            
                            addAnimatearrow = new TWEEN.Tween(allHelpers.helper5.position)
                            .to({
                                x: 10,
                            },2000)
                            .onComplete(function(){
                                allHelpers.helper5.visible = false;
                            })
                            .delay(0).easing(easingTween).start();

                        })
                        .delay(7000).easing(easingTween).start();
                    })
                    .delay(500).easing(easingTween).start();
                })
                .repeat(4).yoyo(true).easing(easingTween).start();
            })
            .delay(1000).easing(easingTween).start();
        })
        .easing(easingTween).start();
    })
    .delay(500).easing(easingTween).start();
    
}
function instructivoFour(){
    /*
    * NOMBRE: instructivoFour.
    * UTILIDAD: Instructivo 4
    * ENTRADAS: Ninguna.
    * SALIDAS: Ninguna.
    */
    
    allClones[22].position.y = 0;
    allClones[23].position.y = 0;
    
    allHelpers.helper6.position.y = -10;
    allHelpers.helper7.position.y = -10;
    allHelpers.helper8.position.y = 10;
    allHelpers.helper9.position.y = 10;

    camera.position.set(10,10,10);
    scene.position.set(0,0,0);
    
    allClones[22].visible = true;
    allClones[23].visible = true;
    
    allClones[22].children[3].visible = false;
    allClones[22].children[4].visible = false;
    allClones[23].children[3].visible = false;
    allClones[23].children[4].visible = false;
    
    allHelpers.helper6.visible = false;
    allHelpers.helper7.visible = false;
    allHelpers.helper8.visible = true;
    allHelpers.helper9.visible = true;
    
    cssDiv2.visible = false;
    cssDiv3.visible = false;
    cssDiv4.visible = true;
    cssDiv5.visible = true;
    
    //ANIMA PALITO 1ra PARTE
    var addAnimatepieza = new TWEEN.Tween(allClones[23].position)
    .to({
        x: corOrishape.x[23],
        y: -5,
        z: corOrishape.z[23]
    },2000)
    .onComplete(function() {
        
        allClones[23].children[3].visible = false;
        allClones[23].children[4].visible = false;
        
    })
    .delay(15000).easing(easingTween).repeat(0).start();
    var addAnimatepieza = new TWEEN.Tween(allClones[22].position)
    .to({
        x: corOrishape.x[22],
        y: 5,
        z: corOrishape.z[22]
    },2000)
    .onComplete(function() {
        
        allClones[22].children[3].visible = false;
        allClones[22].children[4].visible = false;
        
    })
    .delay(15000).easing(easingTween).repeat(0).start();
    
    //ANIMA CAMERA 1ra PARTE
    var addAnimatecamera = new TWEEN.Tween(camera.position)
    .to({
        x: 10,
        y: -5,
        z: 10
    },2000)
    .onComplete(function() {

        allHelpers.helper6.visible = true;
        allHelpers.helper7.visible = true;
        allHelpers.helper8.visible = false;
        allHelpers.helper9.visible = false;
        
        cssDiv2.visible = true;
        cssDiv3.visible = true;
        cssDiv4.visible = false;
        cssDiv5.visible = false;
        
        allClones[23].children[3].visible = false;
        allClones[23].children[4].visible = false;
        
        addAnimatecamera = new TWEEN.Tween(camera.position)
        .to({
            x: 10,
            y: 10,
            z: 10
        },2000)
        .onComplete(function() {
            
            allHelpers.helper8.visible = true;
            allHelpers.helper9.visible = true;
            cssDiv4.visible = true;
            cssDiv5.visible = true;
            
            allClones[23].children[3].visible = true;
            allClones[23].children[4].visible = true;

            addAnimatecamera = new TWEEN.Tween(camera.position)
            .to({
                x: 10,
                y: 10,
                z: -10
            },2000)
            .onComplete(function() {
                
                cssDiv2.visible = false;
                cssDiv3.visible = false;
                cssDiv4.visible = false;
                cssDiv5.visible = false;
                
                addAnimatecamera = new TWEEN.Tween(camera.position)
                .to({
                    x: 15,
                    y: 15,
                    z: -15
                },2000)
                .onComplete(function() {
                    
                    var endTime = setTimeout(function(){
                        console.log('END');
                        resetStep();//Resetea las animaciones y piezas
                        clearTimeout(endTime);
                    },3000);

                })
                .delay(0).easing(easingTween).repeat(0).start();
            })
            .delay(0).easing(easingTween).repeat(0).start();
        })
        .delay(4500).easing(easingTween).repeat(0).start();
    })
    .delay(4500).easing(easingTween).repeat(0).start();
    
    
    //ANIMA ARROW 1ra PARTE
    var addAnimatearrow = new TWEEN.Tween(allHelpers.helper8.position)
    .to({
        x: 1.6,
        y: 4,
        z: 0
    },2000)
    .onComplete(function(){
        
        allClones[23].children[3].visible = true;
        allClones[23].children[4].visible = true;
        
        addAnimatearrow = new TWEEN.Tween(allHelpers.helper8.position)
        .to({
            x: 1.6,
            y: 7,
            z: 0
        },1000)
        .onComplete(function(){
            addAnimatearrow = new TWEEN.Tween(allHelpers.helper8.position)
            .to({
                x: 1.6,
                y: 4,
                z: 0
            },1000)
            .onComplete(function(){
                
                addAnimatearrow = new TWEEN.Tween(allHelpers.helper8.position)
                .to({
                    x: 1.6,
                    y: -1,
                    z: 0
                },2000)
                .onComplete(function(){
                    
                    allHelpers.helper8.visible = false;
                    cssDiv4.visible = false;

                })
                .delay(10500).easing(easingTween).repeat(0).start();
            }).delay(0).easing(easingTween).repeat(0).start();
        }).delay(0).easing(easingTween).repeat(0).start();
    }).delay(500).easing(easingTween).repeat(0).start();
    
    var addAnimatearrow = new TWEEN.Tween(allHelpers.helper9.position)
    .to({
        x: -1.6,
        y: 4,
        z: 0
    },2000)
    .onComplete(function(){
        addAnimatearrow = new TWEEN.Tween(allHelpers.helper9.position)
        .to({
            x: -1.6,
            y: 7,
            z: 0
        },1000)
        .onComplete(function(){
            addAnimatearrow = new TWEEN.Tween(allHelpers.helper9.position)
            .to({
                x: -1.6,
                y: 4,
                z: 0
            },1000)
            .onComplete(function(){
                
                addAnimatearrow = new TWEEN.Tween(allHelpers.helper9.position)
                .to({
                    x: -1.6,
                    y: -1,
                    z: 0
                },2000)
                .onComplete(function(){
                    
                    allHelpers.helper9.visible = false;
                    cssDiv5.visible = false;

                })
                .delay(10500).easing(easingTween).repeat(0).start();
            }).delay(0).easing(easingTween).repeat(0).start();
        }).delay(0).easing(easingTween).repeat(0).start();
    }).delay(500).easing(easingTween).repeat(0).start();
    
    //ANIMA ARROW 2d PARTE
    var addAnimatearrow = new TWEEN.Tween(allHelpers.helper6.position)
    .to({
        x: 0,
        y: -4,
        z: 1.6
    },2000)
    .onComplete(function(){
        
        allClones[22].children[3].visible = true;
        allClones[22].children[4].visible = true;
        
        addAnimatearrow = new TWEEN.Tween(allHelpers.helper6.position)
        .to({
            x: 0,
            y: -7,
            z: 1.6
        },1000)
        .onComplete(function(){
            addAnimatearrow = new TWEEN.Tween(allHelpers.helper6.position)
            .to({
                x: 0,
                y: -4,
                z: 1.6
            },1000)
            .onComplete(function(){
                addAnimatearrow = new TWEEN.Tween(allHelpers.helper6.position)
                .to({
                    x: 0,
                    y: 1,
                    z: 1.6
                },2000)
                .onComplete(function(){
                    
                    allHelpers.helper6.visible = false;
                    cssDiv2.visible = false;

                })
                .delay(4500).easing(easingTween).repeat(0).start();
            }).delay(0).easing(easingTween).repeat(0).start();
        }).delay(0).easing(easingTween).repeat(0).start();
    }).delay(6500).easing(easingTween).repeat(0).start();
    
    var addAnimatearrow = new TWEEN.Tween(allHelpers.helper7.position)
    .to({
        x: 0,
        y: -4,
        z: -1.6
    },2000)
    .onComplete(function(){
        addAnimatearrow = new TWEEN.Tween(allHelpers.helper7.position)
        .to({
            x: 0,
            y: -7,
            z: -1.6
        },1000)
        .onComplete(function(){
            addAnimatearrow = new TWEEN.Tween(allHelpers.helper7.position)
            .to({
                x: 0,
                y: -4,
                z: -1.6
            },1000)
            .onComplete(function(){
                addAnimatearrow = new TWEEN.Tween(allHelpers.helper7.position)
                .to({
                    x: 0,
                    y: 1,
                    z: -1.6
                },2000)
                .onComplete(function(){
                    
                    allHelpers.helper7.visible = false;
                    cssDiv3.visible = false;

                })
                .delay(4500).easing(easingTween).repeat(0).start();
            }).delay(0).easing(easingTween).repeat(0).start();
        }).delay(0).easing(easingTween).repeat(0).start();
    }).delay(6500).easing(easingTween).repeat(0).start();
 
}