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
vistaStart = "btnEntorno3d";//Vista con que se inicia
viewShow = ["d_viewEntorno3d"];//Vistas que se muestran al mismo tiempo
addComponents = ["led","resistance","jumper","protoboard","acadapter"];//Componentes que van a estar disponibles para la practica
startComponents = ["protoboard","accontact"];//Lista de componentes de inicio
addentorno3dInstruccion = [
    "Arrastra la Resistencia (220 Ohms) a la Protoboard para que quede una de sus terminales en una perforación de la banda positiva y la otra en (A, 22)",
    "Coloca el LED (rojo) sobre la Protoboard de tal forma que su terminal positiva quede en (E, 22) y la negativa en (E, 23)",
    "Coloca el LED (rojo) sobre la Protoboard de tal forma que su terminal positiva quede en (C, 23) y la negativa en (C, 24)",
    "Coloca el LED (rojo) sobre la Protoboard de tal forma que su terminal positiva quede en (A, 24) y la negativa en (A, 25)",
    "Coloca una punta del Cable (negro) en cualquier perforación de la banda negativa de la Protoboard y la otra punta en (E, 25). A este circuito le llamaremos el circuito rojo.",
    "Arrastra la Resistencia (220 Ohms) a la Protoboard para que quede una de sus terminales en una perforación de la banda positiva y la otra en (A, 35)",
    "Coloca el LED (verde) sobre la Protoboard de tal forma que su terminal positiva quede en (E, 35) y la negativa en (E, 36)",
    "Coloca el LED (verde) sobre la Protoboard de tal forma que su terminal positiva quede en (D, 35) y la negativa en (D, 36)",
    "Coloca el LED (verde) sobre la Protoboard de tal forma que su terminal positiva quede en (C, 35) y la negativa en (C, 36)",
    "Coloca una punta del Cable (negro) en cualquier perforación de la banda negativa de la Protoboard y la otra punta en (A, 36). A este circuito le llamaremos el circuito verde.",
    "Arrastra el Adaptador de corriente y conecta sus puntas. (Positivo con positivo y negativo con negativo)",
    "Para conectar el Adaptador a la corriente, da clic en el ícono que se encuentra en la sección de la  derecha y superior de tu pantalla."
];//Almacena instrucciones por cada paso
addSimulacion = [
    "En cuanto conectaste la Fuente de poder, se prendieron los dos circuitos: el rojo y el verde.",
    "Ahora, quita el LED que está en la fila C del circuito rojo y el LED que está en la fila D del circuito verde.",
    "¿Qué sucedió cuando quitaste los LEDs de en medio en cada circuito? y ¿por qué sucede esto? Escribe tu reflexión en un cuaderno y compártela con tus compañeros."
];//Almacena pasos de simulacion
//addReflexion = ["¿Qué sucedió cuando quitaste los LEDs de en medio en cada circuito? y ¿por qué sucede esto? Escribe tu reflexión en un cuaderno y compártela con tus compañeros."];//Almacena reflexion de la practica
valData = [//Almacena las caracteristicas a validar en los pasos
    ["Resistencia",["(+)","A-22"],"220 Ohms"],
    ["LED",["E-22","E-23"],"red"],
    ["LED",["C-23","C-24"],"red"],
    ["LED",["A-24","A-25"],"red"],
    ["Cable",["(-)","E-25"],"black"],
    ["Resistencia",["(+)","A-35"],"220 Ohms"],
    ["LED",["E-35","E-36"],"green"],
    ["LED",["D-35","D-36"],"green"],
    ["LED",["C-35","C-36"],"green"],
    ["Cable",["(-)","A-36"],"black"],
    ["Cableenergia",["(+)","(-)"],null]
];
/*************************************************************************************
*
* 								FUNCIONES Y PROCEDIMIENTOS
*
**************************************************************************************/
$(document).ready(function(){});
$(window).resize(function(){});
$(window).on('load',function(){});