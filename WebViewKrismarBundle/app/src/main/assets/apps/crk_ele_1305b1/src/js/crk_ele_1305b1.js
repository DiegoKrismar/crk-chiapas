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
addComponents = ["led","resistance","jumper","protoboard","pushbutton","switch","acadapter"];//Componentes que van a estar disponibles para la practica
startComponents = ["protoboard","accontact"];//Lista de componentes de inicio
addentorno3dInstruccion = [
    
    "Arrastra la Resistencia (220 Ohms) a la Protoboard para que quede una de sus terminales en una perforación de la banda positiva y la otra en (A, 24)",
    "Conecta una terminal del Push button o Botón en (D, 24), (D, 26), (G, 24) y (G, 26)",
    "Coloca el LED (rojo) sobre la Protoboard de tal forma que su terminal positiva quede en (H, 26) y la negativa en (H, 27)",
    "Coloca una punta del Cable (negro) en cualquier perforación de la banda negativa de la protoboard y la otra punta en (J, 27)",
    "Para que exista corriente en ambos extremos de la Protoboard, utiliza un Cable (negro) para conectar las bandas negativas de la Protoboard (un cable de la banda negativa de la Protoboard a la otra banda negativa)",
    "Arrastra la Resistencia (220 Ohms) a la Protoboard para que quede una de sus terminales en una perforación de la banda positiva y la otra en (A, 35)",
    "Conecta una terminal del Dip switch a la perforación en (E, 35), (E, 36), (E, 37), (E, 38), (F, 35), (F, 36), (F, 37) y (F, 38)",
    "Coloca el LED (rojo) sobre la Protoboard de tal forma que su terminal positiva quede en (H, 35) y la negativa en (H, 34)",
    "Coloca una punta del Cable (negro) en cualquier perforación de la banda negativa y la otra punta en (J, 34)",
    "Arrastra el Adaptador de corriente y conecta sus puntas. (Positivo con positivo y negativo con negativo)",
    "Conecta el Adaptador a la corriente."
];//Almacena instrucciones por cada paso
addSimulacion = [
    "Mantén pulsado el Botón y observa qué sucede. Después, suelta el Botón.",
    "Desliza el Switch número uno del Dip switch y observa qué sucede.",
    "¿Cuál es la diferencia para que prenda un LED si utilizas un Botón o un Switch deslizable? Escribe la reflexión en tu cuaderno y compártela con tus compañeros."
];//Almacena pasos de simulacion
//addReflexion = ["¿Cuál es la diferencia para que prenda un LED si utilizas un Botón o un Switch deslizable? Escribe la reflexión en tu cuaderno y compártela con tus compañeros."];//Almacena reflexion de la practica
valData = [//Almacena las caracteristicas a validar en los pasos
    
    ["Resistencia",["(+)","A-24"],"220 Ohms"],
    ["Botón",["D-24","D-26","G-24","G-26"],null],
    ["LED",["H-26","H-27"],"red"],
    ["Cable",["(-)","J-27"],"black"],
    ["Cable",["(-)","(-)"],"black"],
    ["Resistencia",["(+)","A-35"],"220 Ohms"],
    ["Interruptor",["E-35","E-36","E-37","E-38","F-35","F-36","F-37","F-38"],null],
    ["LED",["H-35","H-34"],"red"],
    ["Cable",["(-)","J-34"],"black"],
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