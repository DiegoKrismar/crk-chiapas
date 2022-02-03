/*************************************************************************************
* 
*                                    CONSTANTES
*
*************************************************************************************/
var PREFIJO = IP + "src/img/crk_ele_1303b_";//Almacena parte de la ruta donde se ubican los archivos de imagen
var TOTACTIVIDADES = 6;//Almacena el total de actividades, definelo
var HAYNIVEL = false;//Indica si existe o no nivel en la aplicación para mostrar/ocultar icono
var HAYVELAPP = false;//Determina si la aplicación requiere fijar velocidad de ejecución (definela)
const SI_PREFIXES_CENTER_INDEX = 8;
const siPrefixes = [
  'y', 'z', 'a', 'f', 'p', 'n', 'μ', 'm', '', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'
];
const NEGRO = '#000000';
const CAFE = '#8c6239';
const ROJO = '#ed1c24';
const NARANJA = '#f15a24';
const AMARILLO = '#ffff00';
const VERDE = '#39b54a'
const AZUL = '#29abe2';
const VIOLETA = '#93278f';
const GRIS = '#b3b3b3';
const BLANCO = '#ffffff';
const DORADO = '#efb810';
const PLATA = '#e3e4e5';
const CODIGOCOLOR = [
    {
        //NEGRO
        "valor": 0,
        "multiplicador": 1
    },
    {
        //CAFE
        "valor": 1,
        "multiplicador": 10
    },
    {
        //ROJO
        "valor": 2,
        "multiplicador": 100,
        "tolerancia": 2,
    },
    {
        //NARANJA
        "valor": 3,
        "multiplicador": 1000
    },
    {
        //AMARILLO
        "valor": 4,
        "multiplicador": 10000
    },
    {
        //VERDE
        "valor": 5,
        "multiplicador": 100000
    },
    {
        //AZUL
        "valor": 6,
        "multiplicador": 1000000
    },
    {
        //VIOLETA
        "valor": 7,
        "multiplicador": 10000000
    },
    {
        //GRIS
        "valor": 8,
        "multiplicador": 100000000
    },
    {
        //BLANCO
        "valor": 9,
        "multiplicador": 1000000000
    },
    {
        //DORADO
        "tolerancia": 5
    },
    {
        //PLATA
        "tolerancia": 10
    }
];
var arrColor = [NEGRO, CAFE, ROJO, NARANJA, AMARILLO, VERDE, AZUL, VIOLETA, GRIS, BLANCO]; //Array de los colores de resitencia
var arrTolerancia = [DORADO, PLATA,ROJO]; //Array que guarda los colores de la resistencia sin tolerancia
//Ninguno
/*************************************************************************************
* 
*                                    VARIABLES GLOBALES
*
*************************************************************************************/
var total = 0; //Almacena el valor total d ela resitencia 
var banda1 = 0; //Almacena el valor de banda 1, tiene asignado 2 porque la actividad empieza con el color de ese valor
var banda2 = 0; //Almacena el valor de banda 2, tiene asignado 2 porque la actividad empieza con el color de ese valor
var banda12 = 0; //Almacena el valor concatenado el valor de banda1 y banda 2 , tiene 22 porque asi empieza la actividad
var multiplicador = 0; //Almacena el valor de banda 3 que es el multiplicador de banda12, el valor asigando es con el que empieza la actividad
var tolerancia = 0; // Almacena el valor de banda 4 que es la tolerancia, el valor asigando es con el que empieza la actividad
var colorSelected = false;
var tmpSolucion=null;
var isEvaluada;
var arrEnunciados = [
    // [ROJO,ROJO,AZUL,PLATA,22000000,10],
	// [CAFE,NEGRO,NEGRO,ROJO,100,2],
    // [NEGRO,VERDE,NEGRO,DORADO,5,5] 
];
arrEnunciados = shuffle(arrEnunciados);
function shuffle(arr) {
	/*
	* NOMBRE: shuffle.
	* UTILIDAD: Mezcla un array de entrada de forma aleatoria y lo regresa.
	* ENTRADAS: arr --> Arreglo a mezclar.
	* SALIDAS: arr --> Arreglo mezclado.
	*/
    var j,temp; //Variables auxiliares
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr; //Regresar el array mezclado 
};
var finished = false;
//Ninguno
/*************************************************************************************
*
* 								FUNCIONES Y PROCEDIMIENTOS
*
*************************************************************************************/
$(document).ready(function () {
    /*
    * NOMBRE: ready.
    * UTILIDAD: Detecta el documento esta listo
    * SALIDAS: Ninguna.
    */
  
    tableColorcode();//Emergente de codigo de color
    addCursor();//Agrega cursor personalizado
    selectColor();//Selecciona el color de la paleta y lo asigan al puntero
    setColor();//Asigna el color seleccionado a las lineas
   
});



$(window).resize(function () {
    /*
    * NOMBRE: resize.
    * UTILIDAD: Detecta el resize del navegador
    * ENTRADAS: Ninguno.
    * SALIDAS: Ninguna.
    */
});
$(window).on('load', function () {
    /*
    * NOMBRE: load.
    * UTILIDAD: Una vez abierto el dom
    * ENTRADAS: Ninguno.
    * SALIDAS: Ninguna.
    */

});
$(window).on("orientationchange", function (event) {
    /*
    * NOMBRE: orientationchange.
    * UTILIDAD: Detecta cambio de orientacion del dispositivo
    * ENTRADAS: Ninguno.
    * SALIDAS: Ninguna.
    */
})
function tableColorcode() {

    $(".d_coloricon").on("pointerdown", function () {
        $(".d_tablacolores").fadeToggle();
    });
    $(".d_tablacoloresclose").on("pointerdown", function () {
        $(".d_tablacolores").fadeToggle();
    });
}

function addCursor() {

    $(".d_contegrlactinf").on("pointermove", function (event) {
        var topConte = $(".d_contegrlactinf").offset().top;
        var leftConte = $(".d_contegrlactinf").offset().left;
        if(topConte > 90){
            topConte = 90
        }
        if(leftConte > 68.5){
            topConte = 68.5 
        }
        // console.log(topConte);
        // console.log(leftConte);
        $(".d_puntero").show();
        $(".d_contegrlactinf").css({ "cursor": "none" });
        $(".d_puntero").css({ "top": (event.pageY - topConte + 1) + "px", "left": (event.pageX - leftConte + 1) + "px" });

    });
    $(".d_contegrlactinf").on("pointerout", function () {
        $(".d_puntero").hide();
        $(".d_contegrlactinf").css({ "cursor": "default" });
    });
}
var colorGrl = "#93278f";
function selectColor() {
    var allColors = ["#000000", "#8c6239", "#ed1c24", "#f15a24", "#ffff00", "#39b54a", "#29abe2", "#93278f", "#b3b3b3", "#ffffff", "#efb810", "#e3e4e5"];
    $(".d_paletacolorescolor").on("pointerdown", function () {
        colorGrl = $(this).css("background-color");
        $(".d_punterocolor").css({ "fill": colorGrl });
    });
}
function setColor() {
    $(".d_strip").on("pointerover", function () {
        $(this).addClass("d_resistenciastrip-selected");
    });
    $(".d_strip").on("pointerout", function () {
        $(this).removeClass("d_resistenciastrip-selected");
    });
    $(".d_strip").on("pointerdown", function () {
        if(!isEvaluada){
            $(this).css({ "background-color": colorGrl });
            colorSelected = true;
        }
        
       
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////
///
///
///
///                      CODIGO DE PROGRAMACIÓN
///
///
///////////////////////////////////////////////////////////////////////////////////////////////////



function shuffle(arr) {
    /*
   * NOMBRE: shuffle.
   * UTILIDAD: Mezcla el array que recibe
   * ENTRADAS: array.
   * SALIDAS: array mezclado.
   */
   var i,
       j,
       temp;
   for (i = arr.length - 1; i > 0; i--) {
       j = Math.floor(Math.random() * (i + 1));
       temp = arr[i];
       arr[i] = arr[j];
       arr[j] = temp;
   }
   return arr;    
};

function bandaone(evt){
    /*
     * NOMBRE: Sin nombre
     * UTILIDAD: Se ejecuta cada que se cambia el color de la banda 1 y hace los calculos del nuevo valor total de la resistencia
     * ENTRADAS: Ninguno.
     * SALIDAS: Ninguna.
     */
    let banda = "valor";
    let color = $(evt).css("background-color");
    let colorhex = rgbTohex(color);
    let valor_banda_1 = asignaValor(colorhex, banda)

    calculaValor(valor_banda_1, banda + 1);
    if (colorSelected) activarBtn("#btngrleval");
}

function bandatwo(evt){
      /*
    * NOMBRE: Sin nombre
    * UTILIDAD: Se ejecuta cada que se cambia el color de la banda 2 y hace los calculos del nuevo valor total de la resistencia
    * ENTRADAS: Ninguno.
    * SALIDAS: Ninguna.
    */
      let banda = "valor";
      let color = $(evt).css("background-color");
      let colorhex = rgbTohex(color);
      let valor_banda_2 = asignaValor(colorhex, banda)
  
      calculaValor(valor_banda_2, banda + 2);
      if (colorSelected) activarBtn("#btngrleval");
}

function bandathree(evt){
        /*
    * NOMBRE: Sin nombre
    * UTILIDAD: Se ejecuta cada que se cambia el color de la banda 3(Multiplicador) y hace los calculos del nuevo valor total de la resistencia
    * ENTRADAS: Ninguno.
    * SALIDAS: Ninguna.
    */
        let banda = "multiplicador";
        let color = $(evt).css("background-color");
        let colorhex = rgbTohex(color);
        let valor_multiplicador = asignaValor(colorhex, banda)
    
        calculaValor(valor_multiplicador, banda);
        if (colorSelected) activarBtn("#btngrleval");
}

function bandafour(evt){
       /*
     * NOMBRE: Sin nombre
     * UTILIDAD: Se ejecuta cada que se cambia el color de la banda 4(tolerancia) y hace los calculos del nuevo valor total de la resistencia
     * ENTRADAS: Ninguno.
     * SALIDAS: Ninguna.
     */
       let banda = "tolerancia";
       let color = $(evt).css("background-color");
       let colorhex = rgbTohex(color);
       var valor_tolerancia = asignaValor(colorhex, banda)
   
       calculaValor(valor_tolerancia, banda);
       if (colorSelected) activarBtn("#btngrleval");
}

function calculaValor(valor, banda) {
    /*
    * NOMBRE: calculaValor 
    * UTILIDAD: Calcula el nuevo valor de la resitencia cada  que se actualiza el color de una banda.
    * ENTRADAS: valor, es el valor que obtine de asignaValor que corresponde a datos del JSON
    *           banda, identifica que banda fue la que se actualizo para poder hacer la operacion correspondiente.
    * SALIDAS: Ninguna  .
    */

    switch (banda) {
        case 'valor1':
            banda1 = valor;
            break;
        case 'valor2':
            banda2 = valor;
            break;
        case 'multiplicador':
            multiplicador = valor;
            break;
        case 'tolerancia':
            tolerancia = valor;
            break;
    }
  
    if(String(banda2) === "undefined"){
      banda12 = "_"
    }else{
        banda12 = String(banda1) + String(banda2);
    }
    banda12 = parseInt(banda12);
    total = banda12 * multiplicador;
    if(isNaN(total)){
        $("#valorResistencia").text("Resistencia no válida");
        $("#valorResistenciaFormato").text("Resistencia no válida");
        $("#Ohms").css('display','none');
        $("#OhmsF").css('display','none');
    }else{
        // console.log("NUMERO",total);
        $("#valorResistencia").text(numberWithCommas(total));
        let valor = getSiPrefixedNumber(total)
        let prefijo = valor.split(" ");
        $("#valorResistenciaFormato").text(prefijo[0]);
        $("#Ohms").css('display','block');
        if(prefijo.length == 2){
            $("#OhmsF").text(prefijo[1]+"ohms").css('display','block');
        }else{
            $("#OhmsF").text("Ohms").css('display','block');
        }
        
    }

    if(tolerancia === undefined){
        $("#valorTolerancia").text("Tolerancia no válida");
        $("#porcentaje").css('display','none');
    }else{
        $("#valorTolerancia").text(tolerancia);
        $("#porcentaje").css('display','block');
    }
    

    
}

function numberWithCommas(x) {
     /*
    * NOMBRE: numberWithCommas
    * UTILIDAD: Le agrega comas a los numeroS que son demasiado grandes.
    * ENTRADAS: El numero sin comas
    * SALIDAS: El mismo numero pero con comas 
    */
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



const getSiPrefixedNumber = (number) => {
        /*
    * NOMBRE:  getSiPrefixedNumber
    * UTILIDAD: Agrega prefigo k,M,G dependiendo el valor del numero que recibe 
    * ENTRADAS: Numero a transformar 
    * SALIDAS: Regresa el numero con el prefijo k,M o G segun sea el valor 
    */
  if (number === 0) return number.toString();
  const EXP_STEP_SIZE = 3;
  const base = Math.floor(Math.log10(Math.abs(number)));
  const siBase = (base < 0 ? Math.ceil : Math.floor)(base / EXP_STEP_SIZE);
  const prefix = siPrefixes[siBase + SI_PREFIXES_CENTER_INDEX];

  if (siBase === 0) return number.toString();

  const baseNumber = parseFloat((number / Math.pow(10, siBase * EXP_STEP_SIZE)).toFixed(2));
  return `${baseNumber} ${prefix}`;
};




function asignaValor(colorhex, banda) {
    /*
    * NOMBRE: asignaValor.
    * UTILIDAD: Regresar el valor, multplicador, o tolerancia, segun la banda que actualiazo su color, valor para banda 1 y 2
    *           multiplicador para banda 3 y tolerancia para banda 4, valores se obtienen de un array de JSON
    * ENTRADAS: colorhex, es el color que se actualizo en formato hexadecimal.
    *           banda, hace referencia a la propiedad del json que quiere obtener(valor, multiplicador, tolerancia)
    * SALIDAS: Regresa el valor solicitado(valor(hace referencia al numero que tiene el color), multiplicador, tolerancia)
    */
 
    let valor;
    switch (colorhex) {
        case NEGRO:
            valor = CODIGOCOLOR[0][banda];
            break;
        case CAFE:
            valor = CODIGOCOLOR[1][banda];
            break;
        case ROJO:
            valor = CODIGOCOLOR[2][banda];
            break;
        case NARANJA:
            valor = CODIGOCOLOR[3][banda];
            break;
        case AMARILLO:
            valor = CODIGOCOLOR[4][banda];
            break;
        case VERDE:
            valor = CODIGOCOLOR[5][banda];
            break;
        case AZUL:
            valor = CODIGOCOLOR[6][banda];
            break;
        case VIOLETA:
            valor = CODIGOCOLOR[7][banda];
            break;
        case GRIS:
            valor = CODIGOCOLOR[8][banda];
            break;
        case BLANCO:
            valor = CODIGOCOLOR[9][banda];
            break;
        case DORADO:
            valor = CODIGOCOLOR[10][banda];
            break;
        case PLATA:
            valor = CODIGOCOLOR[11][banda];
            break;

    }

    return valor;
}

function rgbTohex(colorval) {
    /*
    * NOMBRE: rgbTohex.
    * UTILIDAD: Pasa el formado del color rgb(0,0,0) a formato hexadecimal #0000
    * ENTRADAS: Un string en formato rgb con el color.
    * SALIDAS: Regresa un string con el color en formato #0000.
    */
    let color;
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete (parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    color = '#' + parts.join('');
    return color;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//METODOS DE RUTINA DE INTERFAZ
function iniciaActividad(){

    iniciaDefault();
    isEvaluada = false; 
    colorSelected = false;
    arrTolerancia = shuffle(arrTolerancia); //Revuelve ArrayTolerancia
    arrColor = shuffle(arrColor); //Revuelve ArrayColor
    // console.log("before",arrTolerancia);
    // console.log("before",arrColor);
    
    $("#bandaone").css({ "background-color": arrColor[0] }); //Pega color aleatorio a banda 1
    $("#bandatwo").css({ "background-color": arrColor[1] }); //Pega color aleatorio a banda 2
    $("#bandathree").css({ "background-color": arrColor[2] }); //Pega color aleatorio a banda 3
    $("#bandafour").css({ "background-color": arrTolerancia[0] }); //Pega color aleatorio a banda 4
    arrEnunciados[0] =  arrColor[0] //Pega color aleatorio a banda 1
    arrEnunciados[1] =  arrColor[1]; //Pega color aleatorio a banda 2
    arrEnunciados[2] =  arrColor[2] //Pega color aleatorio a banda 3
    arrEnunciados[3] =  arrTolerancia[0]; //Pega color aleatorio a banda 4
     //Se llaman las funciones banda para calcular el valor al iniciar la apliacion
     bandaone($("#bandaone"));//recive el div con el id banda
     bandatwo($("#bandatwo"));//recive el div con el id banda
     bandathree($("#bandathree"));//recive el div con el id banda
     bandafour($("#bandafour"));//recive el div con el id banda
     arrEnunciados[4] = parseInt(($("#valorResistencia").text()).replace(/,/g, ''));
     arrEnunciados[5] =  parseInt(($("#valorTolerancia").text()));
     arrTolerancia.splice(0,1);
    if(actividad == 3){
        arrTolerancia = [DORADO, PLATA,ROJO]
    }
    
   
    ////////////////////////////QUITAR COLORES y VALORES/////////////////////////
    $("#valorResistencia").text("0");
    $("#valorResistenciaFormato").text("0");
    $("#valorTolerancia").text("0");
    $("#bandaone").css({ "background-color": "#d7ae99" }); //Pega color aleatorio a banda 1
    $("#bandatwo").css({ "background-color": "#d7ae99" }); //Pega color aleatorio a banda 2
    $("#bandathree").css({ "background-color": "#d7ae99" }); //Pega color aleatorio a banda 3
    $("#bandafour").css({ "background-color": "#d7ae99" }); //Pega color aleatorio a banda 4
    bandaone($("#bandaone"));//recive el div con el id banda
    bandatwo($("#bandatwo"));//recive el div con el id banda
    bandathree($("#bandathree"));//recive el div con el id banda
    bandafour($("#bandafour"));//recive el div con el id banda
    $("#valortxtres").text(numberWithCommas(arrEnunciados[4]));
    $("#valortxttol").text((arrEnunciados[5]));
    // console.log(arrEnunciados);
   
}
function evaluaActividad(){
	/*
	* NOMBRE: evaluarActividad.
	* UTILIDAD: Evalua las soluciones en la actividad.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
    */
    $("#bandaone").removeAttr('onclick');//Pega color aleatorio a banda 1
    $("#bandatwo").removeAttr('onclick'); //Pega color aleatorio a banda 2
    $("#bandathree").removeAttr('onclick'); //Pega color aleatorio a banda 3
    $("#bandafour").removeAttr('onclick'); //Pega color aleatorio a banda 4
    isEvaluada = true;
    let isCorrrect = false
    let txtvalres =  parseInt(($("#valortxtres").text()).replace(/,/g, ''));
    let txtvaltol = parseInt ( $("#valortxttol").text());
    if((total == txtvalres) && (tolerancia == txtvaltol)){
        isCorrrect = true;
        
    }
    if(!finished){
        if(isCorrrect == true){
            correctoDefault()
            $(".d_resistenciadatos1llenado, .d_resistenciadatos2llenado").addClass("d_resistenciadatos_bien");
            $(".d_resistenciastrip1, .d_resistenciastrip2, .d_resistenciastrip3, .d_resistenciastrip4").addClass("d_resistenciastrip_bien");
                      
        }else{
            
            let bien = 0;
            for(i=0; i<3; i++){
                if(rgbTohex($(".d_resistenciastrip"+(i+1)).css("background-color")) ==  arrEnunciados[i]){
                    $(".d_resistenciastrip"+(i+1)).addClass("d_resistenciastrip_bien");
                    bien++
                    if(bien == 2){
                        $(".d_resistenciadatos1llenado").addClass("d_resistenciadatos_bien");
                       
                    }
                    // if(i == 2){
                    //     aciertos = aciertos+2;
                    // }else{
                    //     aciertos++;
                    // }
                       
                }else{
                    $(".d_resistenciastrip"+(i+1)).addClass("d_resistenciastrip_mal");
                    $(".d_resistenciadatos1llenado").addClass("d_resistenciadatos_mal");
                    // if(i == 2){
                    //     errores = errores +2;

                    // }else{
                    //     errores++;
                    // }
                    activarBtn("#idSolucion");
                }
                   
            }
           if(rgbTohex($(".d_resistenciastrip4").css("background-color")) ==  arrEnunciados[3]){
                $(".d_resistenciastrip4").addClass("d_resistenciastrip_bien");
                $(".d_resistenciadatos2llenado").addClass("d_resistenciadatos_bien");
                // aciertos = aciertos + 2;
           }else{
                $(".d_resistenciastrip4").addClass("d_resistenciastrip_mal");
                $(".d_resistenciadatos2llenado").addClass("d_resistenciadatos_mal");
                // errores = errores + 2;
                activarBtn("#idSolucion");
           }
            incorrectoDefault();
        }
    }
    
   
    evaluaDefault();
}

function siguienteActividad(){
	/*
	* NOMBRE: siguienteActividad.
	* UTILIDAD: Cambia al siguiente ejercicio.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/	

    $(".d_resistenciadatos1llenado, .d_resistenciadatos2llenado").removeClass("d_resistenciadatos_bien d_resistenciadatos_mal");
    $(".d_resistenciastrip1, .d_resistenciastrip2, .d_resistenciastrip3, .d_resistenciastrip4").removeClass("d_resistenciastrip_bien d_resistenciastrip_mal");
	
    //tableColorcode();//Emergente de codigo de color
    addCursor();//Agrega cursor personalizado
    selectColor();//Selecciona el color de la paleta y lo asigan al puntero
    setColor();//Asigna el color seleccionado a las lineas
    $("#bandaone").attr('onclick','bandaone($("#bandaone"))');//Pega color aleatorio a banda 1
    $("#bandatwo").attr('onclick','bandatwo($("#bandatwo"))'); //Pega color aleatorio a banda 2
    $("#bandathree").attr('onclick','bandathree($("#bandathree"))'); //Pega color aleatorio a banda 3
    $("#bandafour").attr('onclick','bandafour($("#bandafour"))'); //Pega color aleatorio a banda 4
    siguienteDefault();
    iniciaActividad();
}



function showSolution(){
	/*
	* NOMBRE: showSolution.
	* UTILIDAD: Muestra la solucion.
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
    var htmlEvalua = $(".d_contegrl").html();
    
    let txtvalres =  parseInt(($("#valortxtres").text()).replace(/,/g, ''))
    let txtvaltol = parseInt ( $("#valortxttol").text());
    
	/**************/
    desactivarBtn("#idSolucion");
    $(".d_resistenciadatos1llenado, .d_resistenciadatos2llenado").removeClass("d_resistenciadatos_mal");
    $(".d_resistenciastrip1, .d_resistenciastrip2, .d_resistenciastrip3, .d_resistenciastrip4").removeClass("d_resistenciastrip_mal");
    // console.log("div",txtvalres);
    // console.log("div",txtvaltol);
    

    if(arrEnunciados[4] == txtvalres && arrEnunciados[5] == txtvaltol){

        $("#bandaone").css({ "background-color": arrEnunciados[0] }); //Pega color aleatorio a banda 1
        $("#bandatwo").css({ "background-color": arrEnunciados[1] }); //Pega color aleatorio a banda 2
        $("#bandathree").css({ "background-color": arrEnunciados[2] }); //Pega color aleatorio a banda 3
        $("#bandafour").css({ "background-color": arrEnunciados[3] }); //Pega color aleatorio a banda 4
        $("#valorResistencia").text(numberWithCommas(arrEnunciados[4]));
        let valor = getSiPrefixedNumber(arrEnunciados[4])
        let prefijo = valor.split(" ");
        $("#valorResistenciaFormato").text(prefijo[0]);
        $("#Ohms").css('display','block');
        if(prefijo.length == 2){
            $("#OhmsF").text(prefijo[1]+"ohms").css('display','block');
        }else{
            $("#OhmsF").text("Ohms").css('display','block');
        }
        $("#valorTolerancia").text(arrEnunciados[5])
    }

     $(".d_resistenciadatos1llenado, .d_resistenciadatos2llenado").addClass("d_resistenciadatos_bien");
    $(".d_resistenciastrip1, .d_resistenciastrip2, .d_resistenciastrip3, .d_resistenciastrip4").addClass("d_resistenciastrip_bien");
   
	$(".d_btnsolucion").removeClass("d_btnsolucion_pulse");//Quita efecto de pulse
    $(".d_btnsoluciontxt").css({"display":"flex"});//Muestra txt
     tmpSolucion = setTimeout(function(){
        $(".d_btnsolucion").addClass("d_btnsolucion_pulse");//Agrega efecto de pulse
        $(".d_btnsoluciontxt").css({"display":"none"});//Oculta txt
        clearTimeout(tmpSolucion);//Limpia tiempo
        $('#idSolucion').attr('onclick','showSolution()');
        $(".d_contegrl").html(htmlEvalua);
        addCursor();
    },5000);
}