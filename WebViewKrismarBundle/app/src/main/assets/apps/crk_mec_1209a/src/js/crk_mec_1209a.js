/***********************************************************************************
* 
*                                    CONSTANTES
*
*************************************************************************************/
var IMGPREFIJO = IP + "src/img/crk_mec_1209a_";//Prefijo de imágenes
var PREFIJOACT = "crk_mec_1209a";//	Variable que se usa para el local storage "NO LA OLVIDES"
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
    [
        // SECCION1
        {
            tipo: "om",
            pregunta: "¿Qué varía en la caída de objetos con distinto peso en un mismo plano inclinado?",
            respuesta: "El tiempo",
            distractor1: "La pendiente del plano",
            distractor2: "La gravedad",
            distractor3: "La distancia"
        },
        {
            tipo: "om",
            pregunta: "Respecto a la velocidad de caída de un mismo objeto por un plano inclinado, se puede decir:",
            respuesta: "que varía dependiendo de la pendiente del plano ",
            distractor1: "que es independiente de la pendiente del plano",
            distractor2: "que su variación depende del peso del objeto",
            distractor3: "que el peso no influye en la velocidad de caída"
        },
        {
            tipo: "om",
            pregunta: "Respecto a la fuerza que se requiere para subir un mismo objeto por un plano inclinado, se puede decir:",
            respuesta: "que es mayor mientras la pendiente sea mayor",
            distractor1: "que es menor mientras la pendiente sea mayor",
            distractor2: "que es mayor mientras la pendiente sea menor",
            distractor3: "que es independiente de la pendiente"
        },
        {
            tipo: "om",
            pregunta: "¿Cuál de los que se mencionan es un ejemplo de plano inclinado?",
            respuesta: "Una resbaladilla",
            distractor1: "Un martillo",
            distractor2: "Una rueda de la fortuna",
            distractor3: "Un columpio"
        },
        {
            tipo: "om",
            pregunta: "¿Cómo se le llama a la diferencia de altura entre dos puntos?",
            respuesta: "Pendiente o inclinación",
            distractor1: "Trabajo o fuerza",
            distractor2: "Hipotenusa",
            distractor3: "Triángulo"
        },
        {
            tipo: "om",
            pregunta: "¿Qué proyecto construiste en el curso para el uso del plano inclinado?",
            respuesta: "Un mecanismo para que bajaran canicas",
            distractor1: "Una catapulta",
            distractor2: "Una rueda de la fortuna",
            distractor3: "Una guillotina"
        }
    ],
    [
        //SECCION2
        {
            tipo: "om",
            pregunta: "Respecto a la velocidad de una rueda en el eje y la rueda, se puede decir:",
            respuesta: "que depende de la intensidad con la que es girada",
            distractor1: "que es independiente de la intensidad con la que es girada",
            distractor2: "que depende del diámetro del eje",
            distractor3: "que depende de la gravedad"
        },
        {
            tipo: "om",
            pregunta: "Respecto a la velocidad de una rueda en el eje y la rueda, se puede decir:",
            respuesta: "que depende de su fricción con el eje",
            distractor1: "que es independiente de su fricción con el eje",
            distractor2: "que es dependiente del diámetro del eje",
            distractor3: "que es independiente del diámetro del eje"
        },
        {
            tipo: "om",
            pregunta: "¿Qué influye en la velocidad de una llanta de bicicleta?",
            respuesta: "La intensidad con la que es girada, la fricción con el suelo y el aire",
            distractor1: "La fricción con el aire y la intensidad con la que es girada",
            distractor2: "La fricción con el suelo y la intensidad con la que es girada",
            distractor3: "El tamaño de la rueda"
        },
        {
            tipo: "om",
            pregunta: "¿Por qué va perdiendo velocidad una rueda después de ser girada?",
            respuesta: "Por la fricción con su eje y con el aire",
            distractor1: "Por la gravedad",
            distractor2: "Por el material con la cual está fabricada",
            distractor3: "Por el diámetro del eje"
        },
        {
            tipo: "om",
            pregunta: "¿Cuál de los que se mencionan es un ejemplo de la máquina simple eje y rueda?",
            respuesta: "Un volantín",
            distractor1: "Una resbaladilla",
            distractor2: "Un sube y baja",
            distractor3: "Un columpio"
        },
        {
            tipo: "om",
            pregunta: "¿Qué proyecto construiste en el curso para conocer el funcionamiento del eje y rueda?",
            respuesta: "Una rueda de la fortuna",
            distractor1: "Una catapulta",
            distractor2: "Una guillotina",
            distractor3: "Un mecanismo para cargar canicas"
        }
    ],
    [
        //SECCION3
        {
            tipo: "om",
            pregunta: "¿Cuál es la máquina simple que necesita un fulcro para funcionar?",
            respuesta: "Una palanca",
            distractor1: "El eje y la rueda",
            distractor2: "Un plano inclinado",
            distractor3: "Una cuña"
        },
        {
            tipo: "om",
            pregunta: "¿Qué es un fulcro?",
            respuesta: "Un punto de apoyo",
            distractor1: "Una unidad de medida",
            distractor2: "Una cueva",
            distractor3: "Un esfuerzo"
        },
        {
            tipo: "om",
            pregunta: "¿Qué es lo que diferencia a una palanca de otra?",
            respuesta: "El orden de sus elementos",
            distractor1: "El tamaño del punto de apoyo",
            distractor2: "La fuerza aplicada",
            distractor3: "El peso de la carga"
        },
        {
            tipo: "om",
            pregunta: "¿Cuáles son los elementos que componen una palanca?",
            respuesta: "Carga, fulcro y fuerza",
            distractor1: "Eje y rueda",
            distractor2: "Eje, cubo y canal",
            distractor3: "Cresta, cara, flanco y fondo"
        },
        {
            tipo: "om",
            pregunta: "¿Qué se puede decir de una carretilla y una pala?",
            respuesta: "Que son ejemplos de distintos tipos de palanca",
            distractor1: "Que la carretilla es ejemplo del eje y rueda y la pala de la cuña",
            distractor2: "Que la carretilla es ejemplo de una palanca y la pala de una cuña",
            distractor3: "Que no representan a la misma máquina simple"
        },
        {
            tipo: "om",
            pregunta: "¿Qué máquina simple estás utilizando en un destapador?",
            respuesta: "Una palanca",
            distractor1: "Un plano inclinado",
            distractor2: "Ninguna",
            distractor3: "Una cuña"
        },
        {
            tipo: "om",
            pregunta: "¿Qué mecanismo construiste en el curso para utilizar una palanca? ",
            respuesta: "Una catapulta",
            distractor1: "Una grúa",
            distractor2: "Una rueda de la fortuna",
            distractor3: "Una guillotina"
        }
    ],
    [
        //SECCION4
        {
            tipo: "om",
            pregunta: "¿Hasta cuántas poleas puedes tener en un sistema?",
            respuesta: "No existe un límite",
            distractor1: "3",
            distractor2: "5",
            distractor3: "99"
        },
        {
            tipo: "om",
            pregunta: "¿Cuál es la máquina simple que utiliza una cuerda o cadena para su funcionamiento? ",
            respuesta: "La polea",
            distractor1: "La palanca",
            distractor2: "El eje y la rueda",
            distractor3: "La cuña"
        },
        {
            tipo: "om",
            pregunta: "¿Cuáles son los elementos que componen a una polea?",
            respuesta: "Llanta, cuerpo, eje, cubo, armadura, gancho",
            distractor1: "Carga, fulcro y fuerza",
            distractor2: "Eje y rueda",
            distractor3: "Cresta, cara, flanco y fondo"
        },
        {
            tipo: "om",
            pregunta: "Selecciona la característica de una polea fija.",
            respuesta: "Su armadura o eje se encuentra fijo a un soporte",
            distractor1: "La cuerda se encuentra fija a uno de los extremos",
            distractor2: "Consta de varias poleas",
            distractor3: "Cuenta con un fulcro"
        },
        {
            tipo: "om",
            pregunta: "¿Qué tipo de polea utiliza un mecanismo para reducir notoriamente el esfuerzo de cargar?",
            respuesta: "La polea compuesta",
            distractor1: "La polea fija",
            distractor2: "La polea móvil",
            distractor3: "La polea rígida "
        },
        {
            tipo: "om",
            pregunta: "¿Qué proyecto construiste en el curso para conocer el funcionamiento de las poleas?",
            respuesta: "Un mecanismo para subir y bajar canicas",
            distractor1: "Un mecanismo para dejar caer canicas",
            distractor2: "Una catapulta",
            distractor3: "Un volantín"
        }
    ],
    [
        //SECCION5
        {
            tipo: "om",
            pregunta: "¿Cuál es la máquina simple que se asemeja a la unión de dos planos inclinados?",
            respuesta: "La cuña",
            distractor1: "La palanca",
            distractor2: "El tornillo",
            distractor3: "La pala"
        },
        {
            tipo: "om",
            pregunta: "¿Qué puedes hacer con una cuña?",
            respuesta: "Separar, cargar o mantener un objeto en su lugar",
            distractor1: "Unir dos piezas",
            distractor2: "Ensamblar varias piezas",
            distractor3: "Resbalar y caer"
        },
        {
            tipo: "om",
            pregunta: "¿De dónde a dónde se transfiere la fuerza en una cuña?",
            respuesta: "De su extremo más ancho al más angosto",
            distractor1: "De su extremo más angosto al más ancho",
            distractor2: "De su extremo angosto a la parte central",
            distractor3: "De su extremo ancho a la parte central"
        },
        {
            tipo: "om",
            pregunta: "¿Cuál cuña requiere más fuerza al aplicarse?",
            respuesta: "La que tiene un ángulo amplio",
            distractor1: "La que tiene un ángulo estrecho",
            distractor2: "La que tiene pendiente larga",
            distractor3: "La fuerza aplicada en una cuña no depende de su ángulo"
        },
        {
            tipo: "om",
            pregunta: "Ejemplo de una cuña",
            respuesta: "Hacha",
            distractor1: "Rampa",
            distractor2: "Cascanueces",
            distractor3: "Catapulta"
        },
        {
            tipo: "om",
            pregunta: "¿Qué tipo de cuñas existen?",
            respuesta: "Doble y sencilla",
            distractor1: "Corta y puntiaguda",
            distractor2: "Triangular y rectangular",
            distractor3: "Móvil y fija"
        },
        {
            tipo: "om",
            pregunta: "¿Qué proyecto construiste en el curso para demostrar el uso de la cuña?",
            respuesta: "Una guillotina",
            distractor1: "Una rueda de la fortuna",
            distractor2: "Un mecanismo para bajar canicas",
            distractor3: "Un mecanismo para subir y bajar canicas"
        }
    ],
    [
        //SECCION6
        {
            tipo: "om",
            pregunta: "¿Qué opción es la combinación del plano inclinado y un cilindro? ",
            respuesta: "El tornillo",
            distractor1: "La cuña",
            distractor2: "Ninguna de las mencionadas",
            distractor3: "El engrane"
        },
        {
            tipo: "om",
            pregunta: "¿Cuáles son las partes de un tornillo?",
            respuesta: "Cabeza, cuello y rosca",
            distractor1: "Cuerpo, eje y rosca",
            distractor2: "Eje y rueda",
            distractor3: "Dientes y cilindro"
        },
        {
            tipo: "om",
            pregunta: "¿Por qué se dice que el tornillo convierte la fuerza circular en fuerza rectilínea?",
            respuesta: "Porque se aplica una fuerza giratoria para empujar al tornillo hacia dentro de un objeto en línea recta",
            distractor1: "Porque se aplica la fuerza giratoria y cambia de sentido al entrar en un objeto",
            distractor2: "Porque une dos piezas",
            distractor3: "Porque tiene una rosca y una cabeza"
        },
        {
            tipo: "om",
            pregunta: "¿A qué máquina simple puede sustituir el tornillo en ciertas ocasiones?",
            respuesta: "A un plano inclinado",
            distractor1: "A un engrane",
            distractor2: "A una polea",
            distractor3: "Al eje y la rueda"
        },
        {
            tipo: "om",
            pregunta: "¿Cuál es la función principal de un tornillo?",
            respuesta: "Unir dos piezas",
            distractor1: "Separar dos piezas",
            distractor2: "Empujar un objeto",
            distractor3: "Cambiar de sentido un movimiento"
        }
    ],
    [
        //SECCCION7
        {
            tipo: "om",
            pregunta: "¿Cuál es la característica principal de un engrane?",
            respuesta: "Transmitir movimiento ",
            distractor1: "Separar dos piezas",
            distractor2: "Juntar dos piezas",
            distractor3: "Empujar un objeto"
        },
        {
            tipo: "om",
            pregunta: "¿Al menos cuántos engranes se requieren para que un mecanismo funcione?",
            respuesta: "Dos",
            distractor1: "Tres",
            distractor2: "Cuatro",
            distractor3: "Uno"
        },
        {
            tipo: "om",
            pregunta: "¿Cómo se le llama al engrane pequeño de un mecanismo?",
            respuesta: "Piñón",
            distractor1: "Corona",
            distractor2: "Fulcro",
            distractor3: "Estrella"
        },
        {
            tipo: "om",
            pregunta: "¿Cómo se le llama al engrane grande de un mecanismo?",
            respuesta: "Corona",
            distractor1: "Piñón",
            distractor2: "Estrella",
            distractor3: "Fulcro"
        },
        {
            tipo: "om",
            pregunta: "¿Qué efecto tiene la velocidad de un mecanismo si transmites el movimiento del piñón a la corona?",
            respuesta: "Disminuirá",
            distractor1: "Aumentará",
            distractor2: "Se detiene",
            distractor3: "Se mantiene igual"
        },
        {
            tipo: "om",
            pregunta: "¿Qué efecto tiene la velocidad de un mecanismo si transmites el movimiento de la corona al piñón?",
            respuesta: "Aumentará ",
            distractor1: "Disminuirá",
            distractor2: "Se detiene",
            distractor3: "Se mantiene igual"
        },
        {
            tipo: "om",
            pregunta: "¿Qué pasa con el sentido de un mecanismo si conectas un número par de engranes?",
            respuesta: "Se invierte",
            distractor1: "Se mantiene",
            distractor2: "No funcionará",
            distractor3: "Se rompe el mecanismo"
        }
    ],
    [
        //SECCION8
        {
            tipo: "om",
            pregunta: "¿Cuál es la característica común de las máquinas simples?",
            respuesta: "Multiplica la fuerza",
            distractor1: "Mueve un objeto",
            distractor2: "Carga un objeto",
            distractor3: "Separa un objeto"
        },
        {
            tipo: "om",
            pregunta: "¿Cómo se llama al objeto que transmite o modifica la fuerza o el movimiento?",
            respuesta: "Máquina simple",
            distractor1: "Herramienta",
            distractor2: "Trabajo",
            distractor3: "Pendiente"
        },
        {
            tipo: "om",
            pregunta: "¿Cómo se le llama a una fuerza para mover un objeto cierta distancia?",
            respuesta: "Trabajo",
            distractor1: "Elevación",
            distractor2: "Carga",
            distractor3: "Máquina simple"
        },
        {
            tipo: "om",
            pregunta: "Selecciona la ventaja mecánica de una máquina simple",
            respuesta: "Aplicar un menor esfuerzo para obtener un resultado",
            distractor1: "Hacer el trabajo en menor tiempo",
            distractor2: "Realizar el trabajo de una forma más económica",
            distractor3: "Conforme avanza el tiempo aumenta el esfuerzo"
        },
        {
            tipo: "om",
            pregunta: "¿Cuántas tipos diferentes de máquinas simples existen?",
            respuesta: "Seis",
            distractor1: "Nueve",
            distractor2: "Ocho",
            distractor3: "Diez"
        },
        {
            tipo: "om",
            pregunta: "¿Qué máquinas simples se utilizan en una bicicleta?",
            respuesta: "Engranes, eje y rueda",
            distractor1: "Plano inclinado, eje y rueda",
            distractor2: "Tornillos y cuñas",
            distractor3: "Polea y plano inclinado"
        }
    ]
];




/**
 * @param {Int} NP: Número de preguntas de las que se dispone 
 * @param {Int} LC: Longitud de los ejercicios, cuantas preguntas desplegará la actividad en cada ejercicio
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
    },
    {
        SC: 5,
        NP: allSections[5].length,
        LC: 1,
        PP: 0
    },
    {
        SC: 6,
        NP: allSections[6].length,
        LC: 1,
        PP: 0
    },
    {
        SC: 7,
        NP: allSections[7].length,
        LC: 1,
        PP: 0
    }
];