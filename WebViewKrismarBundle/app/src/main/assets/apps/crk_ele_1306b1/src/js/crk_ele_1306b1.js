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
    "Arrastra la Resistencia (220 Ohms) a la Protoboard para que quede una de sus terminales en una perforación de la banda positiva y la otra en (A, 21)",
    "Coloca el LED (rojo) sobre la Protoboard de tal forma que su terminal positiva quede en (E, 21) y la negativa en (E, 22)",
    "Coloca una punta del Cable (negro) en cualquier perforación de la banda negativa de la Protoboard y la otra punta en (A, 22)",
    "Arrastra la Resistencia (220 Ohms) a la Protoboard para que quede una de sus terminales en una perforación de la banda positiva y la otra en (A, 28)",
    "Conecta la segunda Resistencia(220 Ohms) para que quede conectada en  (E, 28) - (E,  32)",
    "Conecta la tercera Resistencia(220 Ohms) para que quede conectada en (C, 32) - (C, 36)",
    "Conecta la cuarta Resistencia(220 Ohms) para que quede conectada en (E, 36) - (E, 40)",
    "Conecta la quinta Resistencia(220 Ohms) para que quede conectada en (C, 40) al (C, 44)",
    "Coloca el LED (rojo) sobre la Protoboard de tal forma que su terminal positiva quede en (E, 44) y la negativa en (E, 45)",
    "Coloca una punta del Cable (negro) en cualquier perforación de la banda negativa de la Protoboard y la otra punta en (A, 45)",
    "Arrastra el Adaptador de corriente y conecta sus puntas. (Positivo con positivo y negativo con negativo)",
    "Conecta el Adaptador a la corriente."
];//Almacena instrucciones por cada paso
addSimulacion = [
    "¿Qué notaste?, además de que el segundo circuito ocupa mucho más espacio. ¿Notaste que el segundo LED tiene menor intensidad que el primero?"
];//Almacena pasos de simulacion
//addReflexion = ["¿Qué notaste?, además de que el segundo circuito ocupa mucho más espacio. ¿Notaste que el segundo LED tiene menor intensidad que el primero?"];//Almacena reflexion de la practica
valData = [//Almacena las caracteristicas a validar en los pasos
    ["Resistencia",["(+)","A-21"],"220 Ohms"],
    ["LED",["E-21","E-22"],"red"],
    ["Cable",["(-)","A-22"],"black"],
    ["Resistencia",["(+)","A-28"],"220 Ohms"],
    ["Resistencia",["E-28","E-32"],"220 Ohms"],
    ["Resistencia",["C-32","C-36"],"220 Ohms"],
    ["Resistencia",["E-36","E-40"],"220 Ohms"],
    ["Resistencia",["C-40","C-44"],"220 Ohms"],
    ["LED",["E-44","E-45"],"red"],
    ["Cable",["(-)","A-45"],"black"],
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