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
addComponents = ["led","resistance","jumper","protoboard","switch","acadapter"];//Componentes que van a estar disponibles para la practica
startComponents = ["protoboard","accontact"];//Lista de componentes de inicio
addentorno3dInstruccion = [
    "Arrastra la Resistencia (220 Ohms) a la Protoboard para que quede una de sus terminales en una perforación de la banda positiva y la otra en (A, 30)",
    "Conecta una terminal del Dip switch a la perforación en (E, 30), (E, 31), (E, 32), (E, 33), (F, 30), (F, 31), (F, 32) y (F, 33)",
    "Coloca el LED (verde) sobre la Protoboard de tal forma que su terminal positiva quede en el primer Switch deslizable (J, 30) y la negativa en el segundo Switch deslizable (J, 31)",
    "Coloca una punta del Cable (negro) en cualquier perforación de la banda negativa de la Protoboard y la otra punta en (A, 31)",
    "Arrastra el Adaptador de corriente y conecta sus puntas. (Positivo con positivo y negativo con negativo)",
    "Conecta el Adaptador a la corriente."
];//Almacena instrucciones por cada paso
addSimulacion = [
    "Desliza el Switch 1 y 2 hacia ON del Dip Switch para que el LED se prenda.",
    "¿Por qué necesitamos que ambos Switch deslizables estén en la posición ON para que el LED prenda?"
];//Almacena pasos de simulacion
//addReflexion = ["¿Por qué necesitamos que ambos Switch deslizables estén en la posición ON para que el LED prenda?"];//Almacena reflexion de la practica
valData = [//Almacena las caracteristicas a validar en los pasos
    ["Resistencia",["(+)","A-30"],"220 Ohms"],
    ["Interruptor",["E-30","E-31","E-32","E-33","F-30","F-31","F-32","F-33"],null],
    ["LED",["J-30","J-31"],"green"],
    ["Cable",["(-)","A-31"],"black"],
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