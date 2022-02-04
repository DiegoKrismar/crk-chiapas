/**
* @fileoverview Revisa si el dispositivo está ya registrado para la activación de la App y despliega las apps en la vista.
* @version 1.0
* @date 03/02/22
*/
/***********************************************************************************
*                                    CONSTANTES
*************************************************************************************/
const endPoint = "https://krismar.mx/KrismarApps/APKActivation/checkActivation"; //EndPoint del servicio de activación de Krismar, sin licencia
//Obtener la información del dispositivo de la URL
const url_string = window.location.href
const url = new URL(url_string);

//PRODUCTION
/*const apiLevel = url.searchParams.get("apiLevel");
const device = url.searchParams.get("device");
const model = url.searchParams.get("model");
const product = url.searchParams.get("product");
const androidID = url.searchParams.get("androidID");*/

//DEVELOPMENT
const apiLevel = 'apiLevel-test';
const device = 'device-test';
const model = 'model-test';
const product = 'product-test';
const androidID = 'androidID-test';

const deviceData = {apiLevel:apiLevel, device:device, model:model, product:product, androidID:androidID} //Creación de objeto con la info del dispositivo
const validate = localStorage.getItem('validate'); //Buscar la bandera de validación en el Local Storage
const IP = "../apps/"; //Path de las apps

const titleNomenclatura = [
    //Apps de ayuda
    ["Manual de alumno", "crk_help_3101a"],
    ["Manual de profesor", "crk_help_4101a"],
    ["Manual de administrador", "crk_help_5101a"],
    ["Manual de súper administrador", "crk_help_6101a"],
    ["Video de introducción", "crk_help_3102b"],
    ["Video general", "crk_help_3102c"],
    ["Video crear o modificar un grupo", "crk_help_5103a"],
    ["Video transferir alumnos de un grupo a otro", "crk_help_5103b"],
    ["Video subir usuarios", "crk_help_6102a"],
    ["Video crear o modificar un curso", "crk_help_6103a"],
    ["Video administrar cursos", "crk_help_6103b"],
    //Apps de CRK
    ["Manual. Introducción a la robótica", "crk_rob_1100"],
    ["Contenido del Kit", "crk_rob_1100a"],
    ["1. ¿Quién es Aztek?", "crk_rob_1101"],
    ["2. Historia de la robótica", "crk_rob_1101a"],
    ["3. Los robots y su historia", "crk_rob_1101b"],
    ["4. Partes de un robot", "crk_rob_1102a"],
    ["5. Partes de un robot", "crk_rob_1102b"],
    ["6. Clasificación de los robots", "crk_rob_1103a"],
    ["7. Clasifica a los robots", "crk_rob_1103b"],
    ["8. Leyes de la robótica", "crk_rob_1105a"],
    ["9. Ventajas y desventajas de los robots", "crk_rob_1104a"],
    ["10. ¿Qué tanto sabes de la robótica?", "crk_rob_1106a"],
    ["Manual del docente. Introducción a la mecánica", "crk_mec_1200"],
    ["1. Introducción a la mecánica", "crk_mec_1201a"],
    ["2. Introducción a las máquinas simples","crk_mec_1201b"],
    ["1. Plano inclinado","crk_mec_1202a"],
    ["2. Sugerencias para armar tus modelos","crk_mec_1210a"],
    ["3. Ensamblando un plano inclinado","crk_mec_1202b"],
    ["4. Así funciona el plano inclinado","crk_mec_1202c"],
    ["1. El eje y la rueda","crk_mec_1203a"],
    ["2. Ensamblando una rueda de la fortuna","crk_mec_1203b"],
    ["3. Así funciona la rueda de la fortuna","crk_mec_1203c"],
    ["1. La palanca","crk_mec_1204a"],
    ["2. Ensamblando una catapulta","crk_mec_1204b"],
    ["3. Así funciona la catapulta","crk_mec_1204c"],
    ["1. La polea","crk_mec_1205a"],
    ["2. Ensamblando un sistema de poleas","crk_mec_1205b"],
    ["3. Así funciona el sistema de poleas","crk_mec_1205c"],
    ["1. La cuña","crk_mec_1206a"],
    ["2. Ensamblando una guillotina","crk_mec_1206b"],
    ["3. Así funciona la guillotina","crk_mec_1206c"],
    ["1. El tornillo","crk_mec_1207a"],
    ["2. Ensambla un elevador de canicas","crk_mec_1207b"],
    ["3. Así funciona el elevador","crk_mec_1207c"],
    ["1. Los engranes","crk_mec_1208a"],
    ["2. Ensamblando un tren de engranes","crk_mec_1208b"],
    ["3. Así funciona el tren de engranes","crk_mec_1208c"],
    ["¿Qué tanto sabes de máquinas simples?", "crk_mec_1209a"],
    ["Manual del docente. Introducción a la electrónica","crk_ele_1300"],
    ["1. Corriente eléctrica","crk_ele_1301a"],
    ["2. Introducción a la electrónica","crk_ele_1301b"],
    ["3. Diagrama pictórico y esquemático","crk_ele_1301c"],
    ["1. La protoboard","crk_ele_1302a"],
    ["1. La resistencia", "crk_ele_1303a"],
    ["2. Pinta tu resistencia","crk_ele_1303b"],
    ["1. Diodo emisor de luz","crk_ele_1304a"],
    ["2. Prende tu LED", "crk_ele_1304b1"],
    ["3. Conecta tus LEDs en paralelo y en serie", "crk_ele_1304b2"],
    ["1. Interruptores y botones","crk_ele_1305a"],
    ["2. Prende un LED con un push button y luego con un switch deslizable", "crk_ele_1305b1"],
    ["3. Interruptores de escalera", "crk_ele_1305b2"],
    ["1. Potenciómetros y fotorresistencias","crk_ele_1306a"],
    ["2. Incremento en una resistencia", "crk_ele_1306b1"],
    ["3. Uso del potenciómetro", "crk_ele_1306b2"],
    ["4. La fotorresistencia", "crk_ele_1306b3"],
    ["5. El LED multicolor, RGB","crk_ele_1306b4"],
    ["1. Zumbador o buzzer","crk_ele_1307a"],
    ["2. El botón de pánico", "crk_ele_1307b1"],
    ["3. La alarma y el camaleón", "crk_ele_1307b2"],
    ["¿Qué tanto sabes de máquinas simples?", "crk_ele_1309a"],
    ["3. Enciende tu LED", "crk_pro_2203b"],
    ["4. ¿Qué hacen un LED y un Retardo juntos?", "crk_pro_2204b"]
];
/***********************************************************************************
*                                    FUNCIONES
*************************************************************************************/
function resizeSection() {
	/*
	 * NOMBRE: resizeSection.
	 * UTILIDAD: Agrega la altura de la seccion, porque no acepta calc
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	var getHeader = $(".d_apkheader").outerHeight();
	var getDocument = $("body").outerHeight();
	$(".d_apksection").css({
		height: getDocument - getHeader - getDocument * 0.08,
	});
}
/**
 * @param  {Object} getElement: Elemento que se da click.
 */
function eventoTouchstart(getElement) {
	/*NOMBRE: eventoTouchstart.
    * UTILIDAD: Obtiene la info del click*/
	var getId = $(getElement).attr("id").split("_")[2];
	var prefijo = titleNomenclatura[getId][1];
	window.location.href = IP +prefijo+'/'+ prefijo + ".html";
}

function showApps() {
	/*
	* NOMBRE: showApps.
	* UTILIDAD: Agrega las miniaturas a la interfaz del menú
	* ENTRADAS: Ninguna.
	* SALIDAS: Ninguna.
	*/
    $('.d_apksectionminiaturatxt').remove();
	for (var i = 0; i <= titleNomenclatura.length - 1; i++) {
		$(".d_apksectionin_center").append(
			'<div class="d_apksectionminiatura"><div class="d_apksectionminiaturaimg" id="d_img_' +
				i +'" onclick="eventoTouchstart(this)"><div class="d_apksectionminiaturaimglight"></div></div><table class="d_apksectionminiaturatxt"><tr><td>' +titleNomenclatura[i][0] +
				"</td></tr></table></div>"
		);
		$("#d_img_" + i).css({"background-image":"url(" +IP +"src/img/miniaturas/" +titleNomenclatura[i][1] +".png)",});
	}
}

function activate(){
    /*
	 * NOMBRE: activate.
	 * UTILIDAD: Realiza un Request al servicio de Activación de Krismar
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	 $('#row_1').text('Activando, espere un momento ... ');
	 $('#row_2, #row_3').text('');
	 if(navigator.onLine){
        $.post(
            endPoint,
            {deviceData:deviceData},
            function(data){
                data = JSON.parse(data);
                console.log(data);
                if(data.activated == true){ //Se ha activado
                    localStorage.setItem('validate', data.activated);
                    showApps(); //Mostrar las apps
                    resizeSection();
                }else{ //Ocurrió un error en la activación
                    $('#row_1').text(data.msgg);
                    $('#row_2, #row_3').text('');
                }
        });
    }else{
        $('#row_1').text('Ups!, asegurese de contar con una conexión a internet estable e intentelo de nuevo');
        $('#row_2, #row_3').text('');
    }
}


document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        if(validate == null){ //Sin registro de la app
            $(".d_apksectionin_center").append(
                '<div class="d_apksectionminiaturatxt" style="font-size: 1.5rem" id="row_1">¡<b>Felicidades</b>, ha adquirido el <b>Nivel 1<b> de Crea Robótica con Krismar.!</div>'+
                '<div class="d_apksectionminiaturatxt" style="font-size: 1.5rem" id="row_2">Para <b>activar</b> su curso y tener acceso a las aplicaciones, haga clic en el siguiente <b>botón</b>.</div>'+
                '<div class="d_apksectionminiaturatxt id="row_3""><button class="btn" onclick="activate();">Activar</button></div>'
            );
        }else{ //Hay registro de la app
            showApps();
            resizeSection();
        }
        $(window).resize(function () {
            resizeSection();
        });
    }
}