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
addComponents = ["resistance","jumper","protoboard","buzzer","rgbc","acadapter"];//Componentes que van a estar disponibles para la practica
startComponents = ["protoboard","accontact"];//Lista de componentes de inicio
addentorno3dInstruccion = [
    "Conecta la terminal positiva del Zumbador en la perforación (E, 25) de la Protoboard y la negativa en (E, 28)",
    "Arrastra la Resistencia (220 Ohms) a la Protoboard para que quede una de sus terminales en una perforación de la banda positiva y la otra en (A, 25)",
    "Coloca el RGB Multicolor sobre la Protoboard de tal forma que su terminal positiva quede en (B, 25) y la negativa en (B, 26)",
    "Coloca una punta del Cable (negro) en la perforación de la Protoboard (A, 26) y la otra punta en (A, 28)",
    "Coloca una punta del Cable (negro) en cualquier perforación de la banda negativa de la Protoboard y la otra punta en (C, 28)",
    "Arrastra el Adaptador de corriente y conecta sus puntas. (Positivo con positivo y negativo con negativo)",
    "Conecta el Adaptador a la corriente."
];//Almacena instrucciones por cada paso
addSimulacion = [
    "¿Por qué el RGB muestra distintos tonos si únicamente tiene 2 extremos? Porque internamente tiene un chip que controla la alimentación y la secuencia de iluminación de todos los colores."
];//Almacena pasos de simulacion
//addReflexion = ["¿Por qué el RGB muestra distintos tonos si únicamente tiene 2 extremos? Porque internamente tiene un chip que controla la alimentación y la secuencia de iluminación de todos los colores."];//Almacena reflexion de la practica
valData = [//Almacena las caracteristicas a validar en los pasos
    ["Bocina",["E-25","E-28"],null],
    ["Resistencia",["(+)","A-25"],"220 Ohms"],
    ["RGBc",["B-25","B-26"],"none"],
    ["Cable",["A-26","A-26"],"black"],
    ["Cable",["(-)","C-28"],"black"],
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