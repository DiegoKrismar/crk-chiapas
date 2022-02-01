/***********************************************************************************
* 
*                                    CONSTANTES
*
*************************************************************************************/
var IMGPREFIJO = IP + "src/img/crk_ele_1309a_";//Prefijo de imágenes
var PREFIJOACT = "crk_ele_1309a";//	Variable que se usa para el local storage "NO LA OLVIDES"
var TOTACTIVIDADES = 1;//Almacena el total de actividades, definelo
var HAYNIVEL = false;//Indica si existe o no nivel en la aplicación para mostrar/ocultar icono
var HAYVELAPP = false;//Determina si la aplicación requiere fijar velocidad de ejecución (definela)
var NIVEL = 5;//Define el nivel de tu actividad
var MAXDIGIT = 2;//Es el tope de escritura de digitos en los divs
/***********************************************************************************
* 
*                                    VARIABLES GLOBALES
*
*************************************************************************************/
var totalPreguntas = 10;
var tmpSolucion = null;
var allSections = [
    ////SECTION 1(SINGLE)/////
   [
    {
        tipo: "om", 
        pregunta: "¿Cuál de los ejemplos mencionados tiene materia?", 
        respuesta: "Un gusano", 
        distractor1: "La alegría", 
        distractor2: "La paz", 
        distractor3: "La felicidad"}, 
    {
        tipo: "om", 
        pregunta: "¿Cuál de las opciones muestra características de la materia?", 
        respuesta: "Volumen ", 
        distractor1: "Velocidad", 
        distractor2: "Tiempo", 
        distractor3: "Conductividad "}, 
    {
        tipo: "om", 
        pregunta: "¿De qué están compuestos los átomos?", 
        respuesta: "De protones, neutrones y electrones", 
        distractor1: "De electrones y protones", 
        distractor2: "De materia indivisible", 
        distractor3: "De electrones y neutrones "}, 
    {
        tipo: "om", 
        pregunta: "¿Qué es lo que varía en los distintos átomos?", 
        respuesta: "Las tres cosas mencionadas", 
        distractor1: "El número de protones", 
        distractor2: "El número de electrones", 
        distractor3: "El número de neutrones"}, 
    {
        tipo: "om", 
        pregunta: "¿Qué tipo de carga tienen los protones?", 
        respuesta: "Positiva", 
        distractor1: "Negativa", 
        distractor2: "Neutra", 
        distractor3: "No tienen carga"}, 
    {
        tipo: "om", 
        pregunta: "¿Qué tipo de carga tienen los electrones?", 
        respuesta: "Negativa", 
        distractor1: "Positiva", 
        distractor2: "Neutra", 
        distractor3: "No tienen carga"}, 
    {
        tipo: "om", 
        pregunta: "¿Qué tipo de carga tienen los neutrones?", 
        respuesta: "No tienen carga", 
        distractor1: "Positiva", 
        distractor2: "Negativa", 
        distractor3: "A veces positiva y a veces negativa"}, 
    {
        tipo: "om", 
        pregunta: "¿Qué quiere decir que los átomos están balanceados?", 
        respuesta: "Que tienen la misma carga positiva que negativa", 
        distractor1: "Que no se pueden caer", 
        distractor2: "Que se sostienen mientras no los alteremos ", 
        distractor3: "Que pesan lo mismo de ambos lados"}, 
    {
        tipo: "om", 
        pregunta: "¿Qué es lo que circula en la corriente eléctrica?", 
        respuesta: "Electrones", 
        distractor1: "Protones", 
        distractor2: "Átomos", 
        distractor3: "Neutrones"}, 
   ],
    /////// SECTION 2
    [
        {
            tipo: "om", 
            pregunta: "¿Qué es un esquema pictórico?", 
            respuesta: "Es un dibujo que representa un circuito eléctrico", 
            distractor1: "Es una maqueta de un circuito eléctrico", 
            distractor2: "Es un dibujo realizado con símbolos", 
            distractor3: "Es un dibujo formado por letras o números"}, 
        {
            tipo: "om", 
            pregunta: "¿Qué es un diagrama esquemático?", 
            respuesta: "Es una imagen que representa un circuito eléctrico con símbolos universales", 
            distractor1: "Es un dibujo que representa un circuito eléctrico", 
            distractor2: "Es una maqueta de un circuito eléctrico", 
            distractor3: "Es un dibujo formado por letras o números"}, 
        {
            tipo: "om", 
            pregunta: "¿Cuál es la principal función de una protoboard?", 
            respuesta: "Facilitar la experimentación", 
            distractor1: "Conectar cualquier componente", 
            distractor2: "Estandarizar los tamaños ", 
            distractor3: "Establecer la ruta más corta"}, 
        {
            tipo: "om", 
            pregunta: "¿Para qué sirven las bandas laterales de una protoboard?", 
            respuesta: "Para conectar la alimentación", 
            distractor1: "Para conectar los componentes", 
            distractor2: "Para identificar cual es el anverso y el reverso", 
            distractor3: "Para lo que quiera el usuario"}, 
    ],
    //////SECTION 3
    [
        {
            tipo: "om", 
            pregunta: "¿Qué significan las siglas LED?", 
            respuesta: "Diodo emisor de luz", 
            distractor1: "Luz emitida por electrones", 
            distractor2: "Dispositivo eléctrico y luminoso", 
            distractor3: "Ligero, endeble y durable"}, 
        {
            tipo: "om", 
            pregunta: "¿De qué color fue el primer LED que se inventó?", 
            respuesta: "De color rojo", 
            distractor1: "De color blanco", 
            distractor2: "De color amarillo", 
            distractor3: "De color verde"}, 
        {
            tipo: "om", 
            pregunta: "¿Cuál LED fue el que más complejo de inventar?", 
            respuesta: "El blanco", 
            distractor1: "El azul", 
            distractor2: "El amarillo", 
            distractor3: "El morado"}, 
        {
            tipo: "om", 
            pregunta: "¿Qué característica tiene un LED RGB?", 
            respuesta: "Puede mostrar cualquier color", 
            distractor1: "Puede cambiar la intensidad de la luz", 
            distractor2: "Puede utilizar diferente voltaje", 
            distractor3: "Funciona con corriente alterna"}, 
        {
            tipo: "om", 
            pregunta: "Todas las opciones muestran ventajas de los focos de LEDs sobre los focos tradicionales, con excepción de:", 
            respuesta: "Es más barato", 
            distractor1: "No se calienta", 
            distractor2: "Reduce el impacto ambiental", 
            distractor3: "Dura más"}, 
        {
            tipo: "om", 
            pregunta: "Aproximadamente, ¿cuánto tiempo puede estar encendido un LED?", 
            respuesta: "50,000 horas", 
            distractor1: "1,000 horas", 
            distractor2: "Una semana", 
            distractor3: "Un mes"}, 
        {
            tipo: "om", 
            pregunta: "¿A qué familia pertenecen los LEDs?", 
            respuesta: "A los diodos", 
            distractor1: "A los transistores", 
            distractor2: "A los microchips", 
            distractor3: "A los componentes resistivos"}, 
        {
            //imagen
            tipo: "om", 
            pregunta: "¿Cuál es el símbolo universal del LED?", 
            respuesta: IMGPREFIJO+"img01.png" , 
            distractor1:  IMGPREFIJO+"img02.png",
            distractor2:  IMGPREFIJO+"img03.png",
            distractor3:  IMGPREFIJO+"img04.png"}, 
        {
            tipo: "om", 
            pregunta: "¿Por qué el LED tiene una pata más grande que otra?", 
            respuesta: "Para identificar el positivo", 
            distractor1: "Porque es más fácil detenerlo", 
            distractor2: "Por requerimientos de fabricación", 
            distractor3: "Para estabilidad en su instalación"}, 
    ],
    ///////////SECTION 4
    [
        {
            tipo: "om", 
            pregunta: "De los que se mencionan, selecciona al ejemplo de interruptor", 
            respuesta: "Un apagador de lámpara", 
            distractor1: "El timbre de una casa", 
            distractor2: "Los números de un teléfono", 
            distractor3: "El mouse"}, 
        {
            //////IMAGEN
            tipo: "om", 
            pregunta: "Selecciona el símbolo universal de un interruptor", 
            respuesta:  "img/d_respuesta_interruptor" ,
            distractor1: "img/d_respuesta_led" , 
            distractor2:  "img/d_respuesta_resistencia", 
            distractor3:  "img/d_respuesta_potenciometro" }, 
    ],
    //////SECTION 5
    [
        {
            tipo: "om", 
            pregunta: "¿A qué área pertenece la electrónica?", 
            respuesta: "A la física", 
            distractor1: "A la química", 
            distractor2: "A las matemáticas aplicadas", 
            distractor3: "A la electricidad"}, 
        {
            tipo: "om", 
            pregunta: "¿Cuál es la base de estudio de la electrónica?", 
            respuesta: "Los electrones", 
            distractor1: "Los átomos", 
            distractor2: "La materia", 
            distractor3: "La electricidad "}, 
        {
            tipo: "om", 
            pregunta: "¿De qué época data la electrónica?", 
            respuesta: "Del siglo XIX", 
            distractor1: "De principios del siglo XX", 
            distractor2: "De finales del siglo XX", 
            distractor3: "De principios del siglo XXI"}, 
        {
            tipo: "om", 
            pregunta: "De los que se mencionan, ¿cuál es un ejemplo de un aparato que usa corriente directa?", 
            respuesta: "Una tableta", 
            distractor1: "La lavadora", 
            distractor2: "Un horno de microondas", 
            distractor3: "Un elevador"}, 
        {
            tipo: "om", 
            pregunta: "De los que se mencionan, ¿cuál es un ejemplo de un aparato que usa corriente alterna?", 
            respuesta: "El refrigerador", 
            distractor1: "Un juguete de pilas", 
            distractor2: "El teléfono celular", 
            distractor3: "Una tableta"}, 
        {
            tipo: "om", 
            pregunta: "¿Cómo puedes identificar fácilmente si un aparato es de corriente directa?", 
            respuesta: "Porque utiliza pilas o batería", 
            distractor1: "Porque se conecta a un enchufe de 2 patas", 
            distractor2: "Porque el enchufe tiene 3 patas", 
            distractor3: "Porque es muy pequeño"}, 
        {
            tipo: "om", 
            pregunta: "¿Cómo puedes identificar fácilmente si un aparato es de corriente alterna?", 
            respuesta: "Porque utiliza un enchufe", 
            distractor1: "Porque tiene pilas", 
            distractor2: "Porque es muy grande", 
            distractor3: "Porque es muy pequeño"}, 
        {
            tipo: "om", 
            pregunta: "Además de la corriente directa, ¿cuál otra existe?", 
            respuesta: "La corriente alterna", 
            distractor1: "La corriente indirecta", 
            distractor2: "La corriente alta", 
            distractor3: "La corriente de potencia"}, 
        {
            tipo: "om", 
            pregunta: "¿Cómo se llaman los materiales que permiten fácilmente el paso de la corriente eléctrica?", 
            respuesta: "Conductores", 
            distractor1: "Aislantes", 
            distractor2: "Semiconductores", 
            distractor3: "Metales"}, 
        {
            tipo: "om", 
            pregunta: "¿Cómo se llaman los materiales que impiden el paso de la corriente eléctrica?", 
            respuesta: "Aislantes", 
            distractor1: "Semiconductores", 
            distractor2: "Conductores ", 
            distractor3: "Heterogéneos"}, 
        {
            tipo: "om", 
            pregunta: "¿Cuál de los materiales mostrados es un conductor?", 
            respuesta: "El cobre", 
            distractor1: "La madera", 
            distractor2: "El plástico", 
            distractor3: "El vidrio"}, 
        {
            tipo: "om", 
            pregunta: "¿Cuál de las opciones es un material que no permite el paso de la corriente eléctrica?", 
            respuesta: "La madera", 
            distractor1: "La plata", 
            distractor2: "El aluminio", 
            distractor3: "El agua"}, 
        {
            tipo: "om", 
            pregunta: "¿Cuál de los siguientes materiales es un semiconductor?", 
            respuesta: "La arena", 
            distractor1: "La madera", 
            distractor2: "El oro", 
            distractor3: "El agua"}, 
    ],
    ////////////SECTION 6
    [
        {
            tipo: "om", 
            pregunta: "¿Cuál es la función principal de una resistencia?", 
            respuesta: "Reducir, regular o impedir el paso de la corriente", 
            distractor1: "Proporcionar mayor voltaje", 
            distractor2: "Proporcionar mayor corriente", 
            distractor3: "Almacenar electrones"}, 
        {
            tipo: "om", 
            pregunta: "¿Cuál es la unidad en que se expresan las resistencias?", 
            respuesta: "En ohms", 
            distractor1: "En faraday", 
            distractor2: "En newtons", 
            distractor3: "En watts"}, 
        {
            ////IMAGEN
            tipo: "om", 
            pregunta: "¿Cuál es el símbolo de la resistencia?", 
            respuesta: "img/d_respuesta_resistencia" , 
            distractor1: "img/d_respuesta_potenciometro",
            distractor2: "img/d_respuesta_zumbador",
            distractor3: "img/d_respuesta_led"}, 
        {
            tipo: "om", 
            pregunta: "¿Cómo se puede saber el valor de una resistencia?", 
            respuesta: "Por su código de colores", 
            distractor1: "Por la etiqueta que trae pegada", 
            distractor2: "Por el empaque en el que viene", 
            distractor3: "Se mide en el protoboard"}, 
        {
            tipo: "om", 
            pregunta: "¿Cuántas bandas determinan el valor de la resistencia?", 
            respuesta: "3 bandas", 
            distractor1: "2 bandas", 
            distractor2: "4 bandas", 
            distractor3: "5 bandas"}, 
        {
            tipo: "om", 
            pregunta: "¿Para qué sirve la última banda de la resistencia?", 
            respuesta: "Para conocer la tolerancia", 
            distractor1: "Para conocer la potencia", 
            distractor2: "Para determinar la corriente que soporta", 
            distractor3: "Para conocer el valor nominal"}, 
        {
            tipo: "om", 
            pregunta: "¿Qué color me da menor tolerancia en una resistencia?", 
            respuesta: "El rojo", 
            distractor1: "El dorado", 
            distractor2: "El plateado", 
            distractor3: "El verde"}, 
        {
            tipo: "om", 
            pregunta: "¿Cómo podemos aumentar el brillo de un LED?", 
            respuesta: "Bajando el valor de la resistencia", 
            distractor1: "Subiendo el valor de la resistencia", 
            distractor2: "Cambiando el tipo de LED", 
            distractor3: "Bajando la tolerancia de la resistencia "}, 
        {
            tipo: "om", 
            pregunta: "¿Qué es un potenciómetro?", 
            respuesta: "Una resistencia variable ", 
            distractor1: "Un conjunto de resistencias en serie", 
            distractor2: "Un conjunto de resistencias en paralelo", 
            distractor3: "Una resistencia de alta precisión"}, 
        {
            tipo: "om", 
            pregunta: "¿Cómo se cambia el valor de un potenciómetro?", 
            respuesta: "Ajustando una perilla", 
            distractor1: "Comprando una de otro valor", 
            distractor2: "Con un arreglo de resistencias", 
            distractor3: "Con un puente de diodos"}, 
        {
            tipo: "om", 
            pregunta: "¿Cuál de los elementos mostrados utiliza un potenciómetro?", 
            respuesta: "Todos los mencionados", 
            distractor1: "La temperatura de un refrigerador", 
            distractor2: "El control del volumen del radio", 
            distractor3: "La intensidad de la luz de un foco"}, 
        {
            ////IMAGEN
            tipo: "om", 
            pregunta: "¿Cuál es el símbolo del potenciómetro?",
            respuesta: "img/d_respuesta_potenciometro",
            distractor1: "img/d_respuesta_zumbador",
            distractor2: "img/d_respuesta_led",
            distractor3: "img/d_respuesta_resistencia" }, 
        {
            tipo: "om", 
            pregunta: "¿Cuál de los componentes mencionados es muy similar a un potenciómetro?", 
            respuesta: "Una fotorresistencia", 
            distractor1: "Un diodo", 
            distractor2: "Un LED", 
            distractor3: "Un buzzer"}, 
        {
            tipo: "om", 
            pregunta: "¿Cómo se le llama al componente que convierte la energía eléctrica en sonido?", 
            respuesta: "Buzzer", 
            distractor1: "Fotorresistencia", 
            distractor2: "Potenciómetro", 
            distractor3: "Diodo"}, 
        {
            tipo: "om", 
            pregunta: "¿Dónde utilizamos los zumbadores?", 
            respuesta: "En las alarmas", 
            distractor1: "En el mouse", 
            distractor2: "En una lámpara", 
            distractor3: "En una pecera"}, 
        {
            ///////IMAGEN
            tipo: "om", 
            pregunta: "¿Cuál es el símbolo del zumbador?",
            respuesta: "img/d_respuesta_zumbador", 
            distractor1: "img/d_respuesta_led", 
            distractor2: "img/d_respuesta_interruptor", 
            distractor3: "img/d_respuesta_resistencia"}
    ]
];

/**
 * @param {Int} SC: Contador para cada sección, inciando desde el cero
 * @param {Int} NP: Número de preguntas de las que se dispone en cada sección
 * @param {Int} LC: Longitud de los ejercicios, cuantas preguntas desplegará la activiad de cada sección
 * @param {Int} PP: ¡Porcentaje! de Parecidos (No debe superar el 50%)
*/
valoresSecciones = [
	{
		SC: 0,
		NP: allSections[0].length,
		LC: 1,
		PP: 0
	},
	{
		SC: 1,
		NP: allSections[1].length,
		LC: 1,
		PP: 0
	},
	{
		SC: 2,
		NP: allSections[2].length,
		LC: 1,
		PP: 0
	},
	{
		SC: 3,
		NP: allSections[3].length,
		LC: 1,
		PP: 0
	},
    {
		SC: 4,
		NP: allSections[4].length,
		LC: 1,
		PP: 0
	}
    ,
    {
		SC: 5,
		NP: allSections[5].length,
		LC: 5,
		PP: 0
	}
];