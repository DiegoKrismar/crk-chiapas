/**
* @fileoverview Revisa si el dispositivo está ya registrado para la activación de la App.
* @version 1.0
* @date 24/01/22
*/

/***********************************************************************************
*                                    CONSTANTES
*************************************************************************************/
const endPoint = "https://krismar.mx/KrismarApps/APKActivation/checkActivation"; //EndPoint del servicio de activación de Krismar
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
const IP = "../apps/"; //Dominio
const titleNomenclatura = [
    ["Manual. Introducción a la robótica", "crk_rob_1100"],
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
    ["1. El eje y la rueda","crk_mec_1203a"],
    ["1. La palanca","crk_mec_1204a"],
    ["1. La polea","crk_mec_1205a"],
    ["1. La cuña","crk_mec_1206a"],
    ["1. El tornillo","crk_mec_1207a"],
    ["2. Ensambla un elevador de canicas","crk_mec_1207b"],
    ["1. Los engranes","crk_mec_1208a"],
    ["¿Qué tanto sabes de máquinas simples?", "crk_mec_1209a"],
    ["1. Corriente eléctrica","crk_ele_1301a"],
    ["2. Introducción a la electrónica","crk_ele_1301b"],
    ["3. Diagrama pictórico y esquemático","crk_ele_1301c"],
    ["1. La protoboard","crk_ele_1302a"],
    ["1. La resistencia", "crk_ele_1303a"],
    ["2. Pinta tu resistencia","crk_ele_1303b"],
    ["1. Diodo emisor de luz","crk_ele_1304a"],
    ["1. Interruptores y botones","crk_ele_1305a"],
    ["1. Potenciómetros y fotorresistencias","crk_ele_1306a"],
    ["1. Zumbador o buzzer","crk_ele_1307a"],
];
/***********************************************************************************
*                                    FUNCIONES
*************************************************************************************/
$(window).resize(function () {
	/*
	 * NOMBRE: resize.
	 * UTILIDAD: Detecta el resize del navegador
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	resizeSection();
});

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

function eventoTouchstart(getElement) {
	/*
	 * NOMBRE: eventoTouchstart.
	 * UTILIDAD: Obtiene la info del click
	 * ENTRADAS: getElement > elemento que se da click.
	 * SALIDAS: Ninguna.
	 */
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
    $.post(
        endPoint,
        {deviceData:deviceData},
        function(data){
            data = JSON.parse(data);
            alert(data.activated);
            if(data.activated == true){ //Se ha activado
                localStorage.setItem('validate', data.activated);
                showApps(); //Mostrar las apps
                resizeSection();
            }else{ //Ocurrió un error en la activación
                $('#row_1').text('¡Ups!, ha ocurrido un problema, asegurese de tener una conexión de Internet estable e intentelo de nuevo');
                $('#row_2, #row_3').text('');
            }
    });
}

$(document).ready(function() {
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
});