/***********************************************************************************
 *
 *                                    VARIABLES GLOBALES
 *
 *************************************************************************************/
var IP = "../apps/"; //Dominio

var dispositivo = "Tabletas"; //Tableta u otro

var titleNomenclatura;
if (dispositivo == "Tableta") {
	titleNomenclatura = [
		["Clasifica la basura", "hab_bp_1406a1"],
		["Descubre la palabra", "red_esp_1904b"],
		["Sopa de letras", "red_esp_1910b"],
		["Interpreta el diagrama de Venn", "hab_rm_50412"],
		["Completa las analogías", "hab_rv_6051"],
		["Observa la cocina", "hab_bp_1101c"],
		["Identifica los órganos", "red_nat_5101h"],
		["El Universo", "red_nat_6504b"],
		["Utiliza las mayúsculas y minúsculas en palabras", "red_esp_1903b"],
	];
} else {
	titleNomenclatura = [
		//Completa
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
}

/*************************************************************************************
 *
 * 								FUNCIONES Y PROCEDIMIENTOS
 *
 **************************************************************************************/
$(document).ready(function () {
	/*
	 * NOMBRE: ready.
	 * UTILIDAD: Detecta el documento esta listo
	 * SALIDAS: Ninguna.
	 */
	addMiniatura();
	resizeSection();
});
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

Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

function addMiniatura() {
	/*
	 * NOMBRE: addMiniatura.
	 * UTILIDAD: Agrega las miniaturas
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	usuarioFinal = "Cliente"; //"Cliente" u otro

	if (usuarioFinal == "Cliente") {
		fechaLimite = "2022-12-12";
	} else {
		fechaLimite = "2022-12-12";
	}

	appDisponible = new Date() <= new Date(fechaLimite).addDays(1);

	if (appDisponible) {
		for (var i = 0; i <= titleNomenclatura.length - 1; i++) {
			$(".d_apksectionin_center").append(
				'<div class="d_apksectionminiatura"><div class="d_apksectionminiaturaimg" id="d_img_' +
					i +
					'" onclick="eventoTouchstart(this)"><div class="d_apksectionminiaturaimglight"></div></div><table class="d_apksectionminiaturatxt"><tr><td>' +
					titleNomenclatura[i][0] +
					"</td></tr></table></div>"
			);
			$("#d_img_" + i).css({
				"background-image":
					"url(" +
					IP +
					"src/img/miniaturas/" +
					titleNomenclatura[i][1] +
					".png)",
			});
		}
	} else {
		$(".d_apksectionin_center").append(
			`
				<div class="d_apksectionminiaturatxt" style="font-size: 1.5rem">Ha terminado su periodo de prueba.</div>
				<div class="d_apksectionminiaturatxt" style="font-size: 1.5rem">Para tener acceso a las aplicaciones de Krismar, haga clic en el siguiente botón.</div>
				<div class="d_apksectionminiaturatxt"><button class="btn" onclick="window.location.href = 'https://krismar.com.mx/productos.php?4';">Comprar</button></div>
			`
		);
	}
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
	console.log(titleNomenclatura[getId][1]);
}
