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
addComponents = ["resistance","jumper","protoboard","rgb","preset","acadapter"];//Componentes que van a estar disponibles para la practica
startComponents = ["protoboard","accontact"];//Lista de componentes de inicio
addentorno3dInstruccion = [
    "Observa el LED RGB (LED con 4 terminales) e identifica cuál de sus 4 terminales es la común. La patita más larga es la del ánodo común. Ahora, conecta las terminales del LED RGB en la Protoboard en las perforaciones (C, 25), la terminal común en (C, 24) y las restantes en (C,26) y (C,27)",
    "Arrastra la Resistencia (220 Ohms) a la Protoboard para que quede una de sus terminales en una perforación de la banda positiva y la otra en (A, 25)",
    "Coloca una punta del Cable (negro) en cualquier perforación de la banda negativa de la Protoboard, la otra punta en (E, 24)",
    "Arrastra el Adaptador de corriente y conecta sus puntas. (Positivo con positivo y negativo con negativo)",
    "Conecta el Adaptador a la corriente y observa qué color prende. Después, desprende la punta del mismo Cable en el (E, 24) y conéctala al (E, 26) y después al (E, 27). ¿Qué colores prendieron?",
    "Ahora, vamos a experimentar con los potenciómetros. Desconecta la Fuente de poder y conecta la punta del mismo Cable (cambia a rojo) a la (E, 24) y la otra punta a la (E, 36)",
    "Conecta las terminales de un Potenciómetro (rojo) en (A, 34), (A, 38) y (A, 36)",
    "Coloca una punta del Cable (negro) en cualquier perforación de la banda negativa del Protoboard y la otra punta en (E, 38)",
    "Coloca una punta del Cable (rojo) en (E, 26) y la otra punta en (E, 45)",
    "Conecta las terminales del segundo Potenciómetro (verde) en (A, 43), (A, 47), (A, 45)",
    "Coloca una punta del Cable (negro) en cualquier perforación de la banda negativa de la Protoboard y la otra punta en (E, 47)",
    "Coloca una punta del Cable (rojo) en (E, 27) y la otra punta en (E, 54)",
    "Conecta las terminales de un tercer Potenciómetro (azul) en las perforaciones de la Protoboard (A, 52), (A, 56), (A,54)",
    "Coloca una punta del Cable (negro) en cualquier perforación de la banda negativa de la Protoboard y la otra punta en (E, 56)",
    "Conecta el Adaptador a la corriente. Ya están los Potenciómetros conectados, ahora gira lentamente la perilla de los Potenciómetros para crea el color que más te guste."
];//Almacena instrucciones por cada paso
addSimulacion = [
    "¿Por qué el color de un inicio es negro al conectar los Potenciómetros? Porque la conexión con los Potenciómetros ofrecen la mayor resistencia en cada color del LED, esto es menor flujo de energía. ¿Cómo se conectan los cables para que el color de inicio sea blanco? Pista: El blanco es la combinación del flujo máximo de energía en cada color."
];//Almacena pasos de simulacion
//addReflexion = ["¿Por qué el color de un inicio es negro al conectar los Potenciómetros? Porque la conexión con los Potenciómetros ofrecen la mayor resistencia en cada color del LED, esto es menor flujo de energía. ¿Cómo se conectan los cables para que el color de inicio sea blanco? Pista: El blanco es la combinación del flujo máximo de energía en cada color."];//Almacena reflexion de la practica
valData = [//Almacena las caracteristicas a validar en los pasos
    ["RGB",["C-25","C-24","C-26","C-27"],"none"],
    ["Resistencia",["(+)","A-25"],"220 Ohms"],
    ["Cableenergia",["(+)","(-)"],null],
    ["Cableenergia",["(+)","(-)"],null],
    ["Cableenergia",["(+)","(-)"],null],
    ["Cable",["E-24","E-36"],"red"],
    ["Potenciómetro",["A-34","A-38","A-36"],"red"],
    ["Cable",["(-)","E-38"],"black"],
    ["Cable",["E-26","E-45"],"red"],
    ["Potenciómetro",["A-43","A-47","A-45"],"green"],
    ["Cable",["(-)","E-47"],"black"],
    ["Cable",["E-27","E-54"],"red"],
    ["Potenciómetro",["A-52","A-56","A-54"],"blue"],
    ["Cable",["(-)","E-56"],"black"]
];
/*************************************************************************************
*
* 								FUNCIONES Y PROCEDIMIENTOS
*
**************************************************************************************/
$(document).ready(function(){});
$(window).resize(function(){});
$(window).on('load',function(){});