/***********************************************************************************
* 
*                                    CONSTANTES
*
*************************************************************************************/
var IMGPREFIJO = IP + "src/img/crk_rob_1106a_";//Prefijo de imágenes
var PREFIJOACT = "crk_rob_1106a";//	Variable que se usa para el local storage "NO LA OLVIDES"
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
            pregunta: "¿Cómo es que se popularizó la palabra robot?",
            respuesta: "En una obra de teatro",
            distractor1: "En el cine",
            distractor2: "En la radio",
            distractor3: "En el periódico"
        },
        {
            tipo: "om",
            pregunta: "¿De qué idioma proviene la palabra robot?",
            respuesta: "Del checo",
            distractor1: "Del ruso",
            distractor2: "Del alemán",
            distractor3: "Del inglés"
        },
        {
            tipo: "om",
            pregunta: "¿Para qué se utilizaba el término robota?",
            respuesta: "Para el trabajo forzado",
            distractor1: "Para algo novedoso",
            distractor2: "Para el trabajo aburrido",
            distractor3: "Para lo que estaba de moda"
        },
        {
            tipo: "om",
            pregunta: "¿Quién utilizó por primera vez el término de robótica?",
            respuesta: "Isaac Asimov",
            distractor1: "Los hermanos Čapek",
            distractor2: "Isaac Newton",
            distractor3: "Albert Einstein"
        },
        {
            tipo: "om",
            pregunta: "¿Cuál de los siguientes enunciados es verdadero?",
            respuesta: "Las máquinas solo pueden realizar una tarea",
            distractor1: "Las máquinas pueden realizar varias tareas",
            distractor2: "Los robots solo pueden realizar una tarea",
            distractor3: "El tamaño es la principal diferencia entre un robot y una máquina"
        },

    ],
    ///SECTION2///////////
    [
        {
            tipo: "om",
            pregunta: "¿Cuál de las siguientes oraciones es falsa?",
            respuesta: "Las máquinas y los robots son lo mismo",
            distractor1: "Un robot puede ser físico o virtual",
            distractor2: "Las máquinas no pueden tomar decisiones",
            distractor3: "Las máquinas son más sencillas que los robots"
        },
        {
            tipo: "om",
            pregunta: "¿Cuántos tipos de componentes diferentes tiene un robot?",
            respuesta: "Tres",
            distractor1: "Seis",
            distractor2: "Dos",
            distractor3: "No se pueden contar"
        },
        {
            tipo: "om",
            pregunta: "¿Cuál es la función del controlador?",
            respuesta: "Almacenar y comunicar las instrucciones que debe seguir el robot",
            distractor1: "Conectar el robot a un control remoto",
            distractor2: "Se encarga de mover las extremidades del robot",
            distractor3: "Controla todo lo que está en el entorno del robot"
        },
        {
            tipo: "om",
            pregunta: "¿Cuál es la función de las partes mecánicas de un robot?",
            respuesta: "Moverse, girar, alzar o tomar algún objeto",
            distractor1: "Mantener comunicado al robot",
            distractor2: "Dar instrucciones al robot",
            distractor3: "Consumir energía"
        },
        {
            tipo: "om",
            pregunta: "¿Para qué son los sensores de un robot?",
            respuesta: "Para recopilar información del entorno del robot",
            distractor1: "Para girar o mover un robot",
            distractor2: "Para comunicar al robot con otros robots",
            distractor3: "Para dar órdenes al robot"
        },

    ],
    ////////SECTION3////////
    [
        {
            tipo: "om",
            pregunta: "¿Cómo se le llama a los robots que están inspirados en los seres vivos que no son humanos?",
            respuesta: "Zoomórficos",
            distractor1: "Móviles",
            distractor2: "Androides",
            distractor3: "Poli articulados"
        },
        {
            tipo: "om",
            pregunta: "¿Qué distingue a los robots híbridos?",
            respuesta: "Que son la combinación de más de una arquitectura de robot",
            distractor1: "Que utilizan agua",
            distractor2: "Que consumen más de un tipo de energía",
            distractor3: "Que utilizan baterías para su funcionamiento"
        },
        {
            tipo: "om",
            pregunta: "¿Cuáles son los robots más famosos en las películas?",
            respuesta: "Androides",
            distractor1: "Híbridos",
            distractor2: "Zoomórficos",
            distractor3: "Poli articulados"
        },
        {
            tipo: "om",
            pregunta: "¿Qué tipo de robot es un brazo robótico?",
            respuesta: "Poli articulado",
            distractor1: "Zoomórfico",
            distractor2: "Móvil",
            distractor3: "Androide"
        },
        {
            tipo: "om",
            pregunta: "¿Cuáles son los robots que se utilizan para desplazar objetos?",
            respuesta: "Móviles",
            distractor1: "Poli articulados",
            distractor2: "Zoomórfico",
            distractor3: "Híbridos"
        },
        {
            tipo: "om",
            pregunta: "¿Cuál es una gran desventaja de los robots?",
            respuesta: "Reemplazan la mano de obra humana",
            distractor1: "Son muy caros",
            distractor2: "Son muy sensibles",
            distractor3: "Requieren de mucha atención"
        },
        {
            tipo: "om",
            pregunta: "¿Cuál de las siguientes oraciones es verdadera?",
            respuesta: "Los robots son más precisos que los humanos",
            distractor1: "Los robots nunca reemplazarán la mano de obra humana",
            distractor2: "Los robots atacan a los humanos",
            distractor3: "Los robots producen más lento que los humanos"
        },
        {
            tipo: "om",
            pregunta: "¿En dónde podemos encontrar la mayor cantidad de robots?",
            respuesta: "En la industria",
            distractor1: "En el espacio",
            distractor2: "En las calles",
            distractor3: "En las casas"
        },
        {
            tipo: "om",
            pregunta: "¿Cuál de las siguientes oraciones es falsa?",
            respuesta: "Los robots solo trabajan cuando uno los está vigilando",
            distractor1: "Los robots nunca se enferman como las personas",
            distractor2: "Los robots pueden trabajar todo el día y todos los días del año",
            distractor3: "Los robots nunca se cansan"
        },
        {
            tipo: "om",
            pregunta: "¿Por qué usan a los robots en la industria?",
            respuesta: "Porque son más rápidos, precisos y eficientes que un humano",
            distractor1: "Porque nadie más puede realizar la actividad",
            distractor2: "Porque ningún humano quiere realizar la actividad",
            distractor3: "Porque son sumamente baratos"
        },

    ],
    ////////SECTION4////////
    [
        {
            tipo: "om",
            pregunta: "¿Quién escribió las leyes de la robótica?",
            respuesta: "Isaac Asimov",
            distractor1: "Los hermanos Čapek",
            distractor2: "Isaac Newton",
            distractor3: "Thomas Alva Edison"
        },
        {
            tipo: "om",
            pregunta: "¿Qué tipo de novelas escribía Isaac Asimov?",
            respuesta: "De ciencia ficción",
            distractor1: "De comedia",
            distractor2: "Románticas",
            distractor3: "De historia"
        },
        {
            tipo: "om",
            pregunta: "¿De cuál de los siguientes inventos habló Isaac Asimov en sus libros?",
            respuesta: "De lentes de realidad virtual",
            distractor1: "De los cohetes",
            distractor2: "De los las tabletas",
            distractor3: "De las patinetas voladoras"
        },
        {
            tipo: "om",
            pregunta: "¿Cuántas leyes de la robótica hay?",
            respuesta: "Tres",
            distractor1: "Seis",
            distractor2: "Cuatro",
            distractor3: "Dos"
        },
        {
            tipo: "om",
            pregunta: "¿A qué se refiere la primera ley de la robótica?",
            respuesta: "A que un robot no puede hacerle daño a un ser humano",
            distractor1: "A que un robot no debe de lastimarse a sí mismo",
            distractor2: "A que los robots deben de respetar a otros robots",
            distractor3: "A que un robot no debe robar"
        },
        {
            tipo: "om",
            pregunta: "¿Qué dice la segunda ley de la robótica?",
            respuesta: "Que un robot siempre debe obedecer a un ser humano",
            distractor1: "Que un robot no puede hacer daño a una persona",
            distractor2: "Que un robot debe cuidarse a sí mismo",
            distractor3: "Que un robot no puede faltarle al respeto a otros robots"
        },
        {
            tipo: "om",
            pregunta: "¿En qué ley dice que un robot deberá de proteger su propia existencia?",
            respuesta: "En la tercera",
            distractor1: "En la segunda",
            distractor2: "En la cuarta",
            distractor3: "En la primera"
        },
        {
            tipo: "om",
            pregunta: "¿Cuáles son las partes de un robot?",
            respuesta: "El controlador, partes mecánicas y sensores",
            distractor1: "Cabeza, tronco, extremidades",
            distractor2: "Cabeza, tronco, llantas",
            distractor3: "Ojos, brazos, piernas"
        }
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
		LC: 5,
		PP: 0
	},
	{
		SC: 3,
		NP: allSections[3].length,
		LC: 3,
		PP: 0
	}
];