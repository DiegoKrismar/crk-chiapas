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
    "Arrastra la Resistencia (220 Ohms) a la Protoboard para que quede una de sus terminales en una perforación positiva y la otra en (A, 18)",
    "Coloca el LED (rojo) sobre la Protoboard, de tal forma que su terminal positiva quede en (E, 18) y la negativa en (E, 19)",
    "Coloca una punta del Cable (negro) en cualquier perforación de la banda negativa de la Protoboard y la otra punta en (A, 19)",
    "Arrastra el Adaptador de corriente y conecta sus puntas. (Positivo con positivo y negativo con negativo)",
    "Para conectar el Adaptador a la corriente, da clic en el ícono que se encuentra en la sección de la  derecha y superior de tu pantalla."
];//Almacena instrucciones por cada paso
addSimulacion = [
    "En cuanto conectaste la Fuente de poder, prendió el LED.",
    "Ahora, invierte la polaridad del LED, es decir, conecta la terminal positiva del LED al Cable negativo y la terminal negativa a la Resistencia y observa qué sucede.",
    "¿Qué sucedió cuando invertiste la polaridad y por qué? Escribe tu reflexión en un cuaderno y compártela con tus compañeros."
];//Almacena pasos de simulacion
//addReflexion = ["¿Qué sucedió cuando invertiste la polaridad y por qué? Escribe tu reflexión en un cuaderno y compártela con tus compañeros."];//Almacena reflexion de la practica
valData = [//Almacena las caracteristicas a validar en los pasos
    ["Resistencia",["(+)","A-18"],"220 Ohms"],
    ["LED",["E-18","E-19"],"red"],
    ["Cable",["(-)","A-19"],"black"],
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