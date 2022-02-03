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
addComponents = ["resistance","jumper","protoboard","pushbutton","buzzer","acadapter"];//Componentes que van a estar disponibles para la practica
startComponents = ["protoboard","accontact"];//Lista de componentes de inicio
addentorno3dInstruccion = [
    "Observa la carcasa del Zumbador e identifica su terminal positiva, tiene un símbolo de más (+).  Conecta esta terminal del Zumbador en la perforación (E, 25) de la Protoboard y la negativa en (E, 28)",
    "Arrastra la Resistencia (220 Ohms) a la Protoboard para que quede una de sus terminales en una perforación de la banda positiva y la otra en (A, 25)",
    "Conecta una terminal del Push button o Botón en la perforación de la Protoboard (D, 40), (D, 42), (G, 40) y (G, 42)",
    "Coloca una punta del Cable (rojo) en (A, 28) y la otra punta en (A, 40)",
    "Coloca una punta del Cable (negro) en cualquier perforación de la banda negativa de la Protoboard y la otra punta en (A, 42)",
    "Arrastra el Adaptador de corriente y conecta sus puntas. (Positivo con positivo y negativo con negativo)",
    "Conecta el Adaptador a la corriente."
];//Almacena instrucciones por cada paso
addSimulacion = [
    "Prueba el funcionamiento del Zumbador, presionando el Push button o Botón.",
    "Si colocas un Potenciómetro en lugar del Push button o Botón y lo giras, ¿va a variar el sonido del Zumbador? Si, porque al girar el Potenciómetro permite mayor o menor flujo de electrones. Para poder emitir un sonido se requiere mayor flujo de electrones."
];//Almacena pasos de simulacion
//addReflexion = ["Si colocas un Potenciómetro en lugar del Push button o Botón y lo giras, ¿va a variar el sonido del Zumbador? Si, porque al girar el Potenciómetro permite mayor o menor flujo de electrones. Para poder emitir un sonido se requiere mayor flujo de electrones."];//Almacena reflexion de la practica
valData = [//Almacena las caracteristicas a validar en los pasos
    ["Bocina",["E-25","E-28"],null],
    ["Resistencia",["(+)","A-25"],"220 Ohms"],
    ["Botón",["D-40","D-42","G-40","G-42"],null],
    ["Cable",["A-28","A-40"],"red"],
    ["Cable",["(-)","A-42"],"black"],
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