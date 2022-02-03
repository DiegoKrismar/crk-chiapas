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
addComponents = ["led","resistance","jumper","protoboard","ldr","acadapter"];//Componentes que van a estar disponibles para la practica
startComponents = ["protoboard","accontact"];//Lista de componentes de inicio
addentorno3dInstruccion = [
    "Arrastra la Resistencia (220 Ohms) a la Protoboard para que quede una de sus terminales en una banda positiva y la otra en (A, 25)",
    "Coloca el LED (verde) sobre la Protoboard de tal forma que su terminal positiva quede en (E, 25) y la negativa en (E, 26)",
    "Coloca una punta del Cable (rojo) en (A, 26) y la otra punta en (F, 40)",
    "Conecta una terminal de la Fotorresistencia a la perforación (H, 40) y la otra a (H, 41)",
    "Coloca una punta del Cable (negro) en cualquier perforación de la banda negativa de la Protoboard y la otra punta en (J, 41)",
    "Arrastra el Adaptador de corriente y conecta sus puntas. (Positivo con positivo y negativo con negativo)",
    "Conecta el Adaptador a la corriente."
];//Almacena instrucciones por cada paso
addSimulacion = [
    "Con ayuda de los botones, aumenta o disminuye la iluminación en la Fotorresistencia y describe lo que sucede con la intensidad del LED.",
    "¿Cuándo crees que es conveniente utilizar un Potenciómetro y cuándo una Fotorresistencia? ¿Dónde crees que se utilicen las Fotorresistencias actualmente?"
];//Almacena pasos de simulacion
//addReflexion = ["¿Cuándo crees que es conveniente utilizar un Potenciómetro y cuándo una Fotorresistencia? ¿Dónde crees que se utilicen las Fotorresistencias actualmente?"];//Almacena reflexion de la practica
valData = [//Almacena las caracteristicas a validar en los pasos
    ["Resistencia",["(+)","A-25"],"220 Ohms"],
    ["LED",["E-25","E-26"],"green"],
    ["Cable",["A-26","F-40"],"red"],
    ["LDR",["H-40","H-41"],null],
    ["Cable",["(-)","J-41"],"black"],
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