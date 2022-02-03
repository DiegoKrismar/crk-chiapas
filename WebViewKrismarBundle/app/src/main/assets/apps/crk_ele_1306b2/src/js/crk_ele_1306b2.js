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
addComponents = ["led","resistance","jumper","protoboard","preset","acadapter"];//Componentes que van a estar disponibles para la practica
startComponents = ["protoboard","accontact"];//Lista de componentes de inicioo
addentorno3dInstruccion = [
    "Arrastra la Resistencia (220 Ohms) a la Protoboard para que quede una de sus terminales en una perforación de la banda positiva y la otra en (A, 25)",
    "Coloca el LED (rojo) sobre la Protoboard de tal forma que su terminal positiva quede en (E, 25) y la negativa en (E, 26)",
    "Coloca una punta del Cable (rojo) en (A, 26) y la otra punta en (E, 35)",
    "Conecta las terminales del Potenciómetro (rojo) en (A, 33), (A, 37) y (A, 35)",
    "Coloca una punta del Cable (negro) en cualquier perforación de la banda negativa de la Protoboard y la otra punta en (E, 37)",
    "Arrastra el Adaptador de corriente y conecta sus puntas. (Positivo con positivo y negativo con negativo)",
    "Conecta el Adaptador a la corriente."
];//Almacena instrucciones por cada paso
addSimulacion = [
    "Con la ayuda de los botones, mueve la perilla del Potenciómetro y observa la intensidad del LED.",
    "¿Notaste que el uso del Potenciómetro es más sencillo que estar conectando a muchas Resistencias?"
];//Almacena pasos de simulacion
//addReflexion = ["¿Notaste que el uso del Potenciómetro es más sencillo que estar conectando a muchas Resistencias?"];//Almacena reflexion de la practica
valData = [//Almacena las caracteristicas a validar en los pasos
    ["Resistencia",["(+)","A-25"],"220 Ohms"],
    ["LED",["E-25","E-26"],"red"],
    ["Cable",["A-26","E-35"],"red"],
    ["Potenciómetro",["A-33","A-37","A-35"],"red"],
    ["Cable",["(-)","E-37"],"black"],
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