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
var elementBtnsave = null; //Almacena si se presiona el mismo btn en elementos (bloques)
var contId = 0; //Incremento del numero del id de cada elemento
var bloqueActual; //Indica cual es el bloque que al que se le ha dado "click"
var idActual; //Indica el ID del bloque actual
var addbloquesInstruccion = []; //Almacena instrucciones por cada paso
var contenedorCondicion;
var numBloques = 0;
var shield = 1;
var simulatedSort = false;

//Variable que indica el row seleccionado para cargar la práctica.
var currentSelected;

var shield0 = [
	//LED
	'<div class="d_pxbpopupcontetxt d_popupoptions d_led">Pin</div>' +
		'<select class="d_pxbpopupconteselect d_popupoptions d_led" id="d_led_pin">' +
		'  <option value="none" disabled selected>Selecciona un pin</option>' +
		"<option>0</option>" +
		"<option>1</option>" +
		"<option>2</option>" +
		"</select>",
	"",
	"",
	'<div class="d_pxbpopupcontetxt d_popupoptions d_pushbutton">Selecciona el push</div>' +
		'<select class="d_pxbpopupconteselect d_popupoptions d_pushbutton" id="d_push_op">' +
		'<option value="none" disabled selected>Selecciona una opción</option>' +
		'<option value="up">Push 1</option>' +
		'<option value="down">Push 2</option>' +
		'<option value="right">Push 3</option>' +
		'<option value="left">Push 4</option>' +
		"</select>",
];

var shield1 = [
	//LED
	'<div class="d_pxbpopupcontetxt d_popupoptions d_led">Color</div>' +
		'<select class="d_pxbpopupconteselect d_popupoptions d_led" id="d_led_col">' +
		'  <option value="none" disabled selected>Selecciona un color</option>' +
		"<option>Verde 1</option>" +
		"<option>Amarillo 1</option>" +
		"<option>Rojo 1</option>" +
		"<option>Azul  1</option>" +
		"<option>Verde 2</option>" +
		"<option>Amarillo 2</option>" +
		"<option>Rojo 2</option>" +
		"<option>Azul 2</option>" +
		"</select>",
	//RGB
	'<div class="d_pxbpopupcontetxt d_popupoptions d_rgb">LED RGB</div>' +
		'<select class="d_pxbpopupconteselect d_popupoptions d_rgb" id="d_rgb_opc">' +
		'<option value="none" disabled selected>Selecciona el LED</option>' +
		'<option value="1">RGB 1</option>' +
		'<option value="2">RGB 2</option>' +
		"</select>",
	//ZUMBADOR
	'<div class="d_pxbpopupcontetxt d_popupoptions d_buzzer">Selecciona el zumbador</div>' +
		'<select class="d_pxbpopupconteselect d_popupoptions d_buzzer" id="d_zum_op" disabled>' +
		'<option value="none" disabled >Selecciona una opción</option>' +
		'<option value="9" selected>Zumbador</option>' +
		"</select>",
	//PUSH
	'<div class="d_pxbpopupcontetxt d_popupoptions d_pushbutton">Selecciona el zumbador</div>' +
		'<select class="d_pxbpopupconteselect d_popupoptions d_pushbutton" id="d_push_op">' +
		'<option value="none" disabled selected>Selecciona una opción</option>' +
		'<option value="0">Push button 1</option>' +
		'<option value="1">Push button 2</option>' +
		'<option value="2">Push button 3</option>' +
		'<option value="3">Push button 4</option>' +
		"</select>",
];

var shield2 = [
	//LED
	'<div class="d_pxbpopupcontetxt d_popupoptions d_led">Pin</div>' +
		'<input class="d_pxbpopupconteinputtext d_popupoptions d_led" id="d_led_pin" type="text"placeholder="Escribe el pin">',
	//RGB
	'<div class="d_pxbpopupcontetxt d_popupoptions d_rgb">Pines</div>' +
		'<div class="d_pxbpopupcontergb d_popupoptions d_rgb">' +
		"<div>Pin R:</div>" +
		'<input id="r-p"  type="text" placeholder="Escribe el pin">' +
		"</div>" +
		'<div class="d_pxbpopupcontergb d_popupoptions d_rgb">' +
		"<div>Pin G:</div>" +
		'<input id="g-p"  type="text"  placeholder="Escribe el pin">' +
		"</div>" +
		'<div class="d_pxbpopupcontergb d_popupoptions d_rgb">' +
		"<div>Pin B:</div>" +
		'<input id="b-p"  type="text" placeholder="Escribe el pin">' +
		"</div>",
	//ZUMBADOR
	'<div class="d_pxbpopupcontetxt d_popupoptions d_buzzer">Pin</div>' +
		'<input class="d_pxbpopupconteinputtext d_popupoptions d_buzzer" type="text" id="d_zum_pin" placeholder="Escribe el pin">',
	//PUSH
	'<div class="d_pxbpopupcontetxt d_popupoptions d_pushbutton">Pin</div>' +
		'<input class="d_pxbpopupconteinputtext d_popupoptions d_pushbutton" id="d_push_op" type="text" placeholder="Escribe el pin">',
];
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
	creaYActualiza();
});
$(window).resize(function () {
	/*
	 * NOMBRE: resize.
	 * UTILIDAD: Detecta el resize del navegador
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	resetOpenbtnconte(); //Resetea acciones de btn de elemntos (bloques)
	resetResizebloques(); //Resetea la posicion del menu
});
$(window).on("load", function () {
	/*
	 * NOMBRE: load.
	 * UTILIDAD: Al cargar todo el contenido
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	clickElements(); //Asigna el click a cada uno de los elementos de bloques
	clickbloquesPasos(); //Click en btn de pasos instrucciones y preguntas bloques
});
$(window).on("orientationchange", function (event) {
	/*
	 * NOMBRE: orientationchange.
	 * UTILIDAD: Detecta el cambio de orientacion del dispositivo
	 * ENTRADAS: event > evento orientacion.
	 * SALIDAS: Ninguna.
	 */
	resetOpenbtnconte(); //Resetea acciones de btn de elemntos (bloques)
	resetResizebloques(); //Resetea la posicion del menu
	$(".d_pxbbloquespopup").hide(); //Oculta popup editar bloques
	deleteTooltip(); //Elimina tooltip de los bloques
});
$(document).on("change", "#d_rgb_col", function () {
	let valor = $(this).children("option:selected").val();
	$("#r-l").prop("disabled", true);
	$("#g-l").prop("disabled", true);
	$("#b-l").prop("disabled", true);
	switch (valor) {
		case "magenta":
			camposRGB(255, 0, 255);
			break;
		case "red":
			camposRGB(255, 0, 0);
			break;
		case "green":
			camposRGB(0, 255, 0);
			break;
		case "blue":
			camposRGB(0, 0, 255);
			break;
		case "white":
			camposRGB(255, 255, 255);
			break;
		case "yellow":
			camposRGB(255, 255, 0);
			break;
		case "cyan":
			camposRGB(0, 255, 255);
			break;
		case "otro":
			camposRGB(-1, -1, -1);
			$("#r-l").removeAttr("disabled");
			$("#g-l").removeAttr("disabled");
			$("#b-l").removeAttr("disabled");
			break;
	}
});
$(document).on("change", "#opcion_variable_pulsado", function () {
	let valor = $(this).children("option:selected").val();
	switch (valor) {
		case "variable_nueva_pulsado":
			$("#variable_creada_pulsado").hide();
			$("#variable_nueva_pulsado").show();
			break;
		case "variable_creada_pulsado":
			$("#variable_nueva_pulsado").hide();
			$("#variable_creada_pulsado").show();
			break;
	}
});
$(document).on("change", "#opcion_variable_para", function () {
	let valor = $(this).children("option:selected").val();
	switch (valor) {
		case "variable_nueva_para":
			$("#variable_creada_para").hide();
			$("#variable_nueva_para").show();
			break;
		case "variable_creada_para":
			$("#variable_nueva_para").hide();
			$("#variable_creada_para").show();
			break;
	}
});
$(document).on("change", "#opcion_variable", function () {
	let valor = $(this).children("option:selected").val();
	switch (valor) {
		case "usar":
			$("#variable_crear").hide();
			$("#variable_usar").show();
			break;
		case "crear":
			$("#variable_usar").hide();
			$("#variable_crear").show();
			//$("#oculta_boo").hide();
			break;
	}
});
$(document).on("change", "#variable_tipo", function () {
	let valor = $(this).children("option:selected").val();
	switch (valor) {
		case "boolean":
			$(".d_pxbbloquespopupin").css("height", "auto");
			$("#oculta_otro").hide();
			$("#oculta_boo").show();
			break;
		default:
			$("#oculta_boo").hide();
			$("#oculta_otro").show();
	}
});
$(document).on("change", "#valor_tipo", function () {
	let valor = $(this).children("option:selected").val();
	switch (valor) {
		case "boolean":
			$("#valor_otro").hide();
			$("#valor_boolean").show();
			break;
		default:
			$("#valor_boolean").hide();
			$("#valor_otro").show();
	}
});
$(document).on("change", "#variable_nombre", function () {
	nombreExistente("#variable_nombre");
});
$(document).on("change", "#d_led_pin", function () {
	/*let val = $("#d_led_pin").val();

    for(let i=0; i < pinesUno.length; i++){
        if(val === pinesUno[i].pin && pinesUno[i].disponible === false){
            $("#d_led_col").empty();
            switch(pinesUno[i].otro){
                case 'green':
                    $("#d_led_col").append('<option value="green" selected>Verde</option>');
                break;
                case 'yellow':
                    $("#d_led_col").append('<option value="yellow" selected>Amarillo</option>');
                break;
                case 'red':
                    $("#d_led_col").append('<option value="red" selected>Rojo</option>');
                break;
                case 'blue':
                    if(shield === 1){
                        $("#d_led_col").append('<option value="blue" selected>Azul</option>');
                    }
                break;
            }

            break;
        }else{
            $("#d_led_col").empty();
            $("#d_led_col").append('<option value="none" disabled selected>Selecciona un color</option>')+
            $("#d_led_col").append('<option value="green">Verde</option>');
            $("#d_led_col").append('<option value="yellow">Amarillo</option>');
            $("#d_led_col").append('<option value="red">Rojo</option>');
            if(shield === 1){
                $("#d_led_col").append('<option value="blue">Azul</option>');
            }
        }
    }*/
});

//CODIGO DE DISEÑO

function viewBlock(getId) {
	/*
	 * NOMBRE: viewBlock.
	 * UTILIDAD: Abre vista de bloques
	 * ENTRADAS: getId > obtiene el id del btn presionado.
	 * SALIDAS: Ninguna.
	 */
	var getName = getId.split("btn")[1]; //Obtiene id de btn presionado
	viewActions(getName); //Muestra y agrega datos a la vista que se selecciono
}
var statuselementsMenu = "hide"; //El menu aparece al inicio
function resizeBloques() {
	/*
	 * NOMBRE: resizeBloques.
	 * UTILIDAD: Escala el area de 3d, para que este visible junto con el menu de elements
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	var heightSteps = $("#d_pxbbloquessteps").outerHeight() - 2; //Obtiene el alto de pasos
	var widthMenu = $(".d_pxbviewelements").outerWidth(); //Obtiene el ancho del menu
	var heightMenu = $(".d_pxbviewelements").outerHeight(); //Obtiene el alto del menu
	if (statuselementsMenu === "show") {
		//Se muestra el menu
		$(".d_pxbviewelementsbtn").addClass(
			"d_pxbviewelementsbtn_hide",
			timeAnima,
			"easeInOutCubic"
		); //Animacion del btn que oculta y muestra menu
		if (getOrientation === "landscape") {
			//Orientacion landscape
			$(".d_pxbviewelements").transition(
				{
					left: "calc(" + -widthMenu + "px + 0.5rem)",
					top: heightSteps,
					height: "calc(100%  - " + heightSteps + "px)",
				},
				timeAnima
			); //Animacion menu
			$("#d_pxbbloques").transition(
				{
					left: "0.5rem",
					top: heightSteps,
					width: "calc(100% - 0.5rem)",
					height: "calc(100% - " + heightSteps + "px)",
				},
				timeAnima
			); //Animacion canvas
		} else {
			//Orientacion portrait
			$(".d_pxbviewelements").transition(
				{
					bottom: "calc(" + -heightMenu + "px + 0.5rem)",
					top: "initial",
					height: "13.6rem",
				},
				timeAnima
			); //Animacion menu
			$("#d_pxbbloques").transition(
				{
					left: "0",
					top: heightSteps,
					height: "calc(100% - " + heightSteps + "px - 0.5rem)",
					width: "100%",
				},
				timeAnima
			); //Animacion canvas
		}
		statuselementsMenu = "hide"; //El menu esta oculto
	} else {
		//Se oculta el menu
		$(".d_pxbviewelementsbtn").removeClass(
			"d_pxbviewelementsbtn_hide",
			timeAnima,
			"easeInOutCubic"
		); //Animacion del btn que oculta y muestra menu
		if (getOrientation === "landscape") {
			//Orientacion landscape
			$(".d_pxbviewelements").transition(
				{
					left: "0",
					top: heightSteps,
					height: "calc(100%  - " + heightSteps + "px)",
				},
				timeAnima
			); //Animacion menu
			$("#d_pxbbloques").transition(
				{
					left: widthMenu,
					top: heightSteps,
					width: "calc(100% - " + widthMenu + "px)",
					height: "calc(100% - " + heightSteps + "px)",
				},
				timeAnima
			); //Animacion canvas
		} else {
			//Orientacion portrait
			$(".d_pxbviewelements").transition(
				{ bottom: "0", top: "initial", height: "13.6rem" },
				timeAnima
			); //Animacion menu
			$("#d_pxbbloques").transition(
				{
					left: "0",
					top: heightSteps,
					height: "calc(100% - " + heightSteps + "px - " + heightMenu + "px)",
					width: "100%",
				},
				timeAnima
			); //Animacion canvas
		}
		statuselementsMenu = "show"; //El menu esta visible
	}
}
function resetResizebloques() {
	//Resetea la posicion del menu
	var heightSteps = $("#d_pxbbloquessteps").outerHeight() - 2; //Obtiene el alto de pasos
	var widthMenu = $(".d_pxbviewelements").outerWidth(); //Obtiene el ancho del menu
	var heightMenu = $(".d_pxbviewelements").outerHeight(); //Obtiene el alto del menu
	$(".d_pxbviewelementsbtn").removeClass("d_pxbviewelementsbtn_hide"); //Animacion del btn que oculta y muestra menu
	if (getOrientation === "landscape") {
		//Orientacion landscape
		$(".d_pxbviewelements").css({
			left: "0",
			top: heightSteps,
			height: "calc(100% - " + heightSteps + "px)",
		}); //Animacion menu
		$("#d_pxbbloques").css({
			left: widthMenu,
			top: heightSteps,
			width: "calc(100% - " + widthMenu + "px)",
			height: "calc(100% - " + heightSteps + "px)",
		}); //Animacion canvas
	} else {
		//Orientacion portrait
		$(".d_pxbviewelements").css({
			bottom: "0",
			top: "initial",
			height: "13.6rem",
		}); //Animacion menu
		$("#d_pxbbloques").css({
			left: "0",
			top: heightSteps,
			height: "calc(100% - " + heightSteps + "px - " + heightMenu + "px)",
			width: "100%",
		}); //Animacion canvas
	}
	statuselementsMenu = "show"; //El menu esta visible
}
function openbtnConte(getBtn) {
	/*
	 * NOMBRE: openbtnConte.
	 * UTILIDAD: Botones de menu elementos (bloques)
	 * ENTRADAS: getBtn > obtiene el elemento presionado
	 * SALIDAS: Ninguna.
	 */
	var getConte = $(getBtn).siblings(); //Almacena el btn que se presiona
	var getColor = $(getBtn).parent().css("background-color"); //Almacena el el color del padre del btn, que es el conte
	if (getBtn === elementBtnsave) {
		//El nuevo btn presionado es el mismo que el anterior
		if (getOrientation === "portrait") {
			//Orientacion portrait
			$(".d_pxbopcion").removeClass("d_pxbopcion_up"); //Quita estilos para encoger div btn
			$(".d_pxbviewelementsconte").css({ "background-color": "transparent" }); //Quita color de fondo
		}
		getBtn = null; //Resetea el btn que se presiona
	} else {
		//El nuevo btn presionado es diferente que el anterior
		if (getOrientation === "portrait") {
			//Orientacion portrait
			$(".d_pxbopcion").addClass("d_pxbopcion_up"); //Agrega estilos para encoger div btn
			$(".d_pxbviewelementsconte").css({ "background-color": getColor }); //Agrega mismo color de fondo del btn
			$(".d_pxbopcionconte").hide(); //Regresa la animacion de toggle
			$(".d_pxbopcionname")
				.find("svg")
				.transition({ transform: "rotate(-90deg)" }); //Resetea la animacion de la flecha*/
		} else {
			//$(".d_pxbopcionconte").removeClass('d_pxbopcionconte_up');//Quita estilos para alargar div conte
			//$(".d_pxbopcionconte").slideUp();//Regresa la animacion de toggle
		}
	}
	elementBtnsave = getBtn; //Almacena el btn que se presiono
	if (getOrientation === "portrait") {
		//Orientacion portrait
		$(getConte).addClass("d_pxbopcionconte_up"); //Agrega estilos para alargar div conte
	}
	$(getConte).slideToggle(function () {
		//Mostrar y ocultar div conte
		if ($(getConte).is(":visible")) {
			//El div conte es visible
			$(getConte)
				.parent()
				.find("svg")
				.transition({ transform: "rotate(0deg)" }); //Animacion de flechita
		} else {
			//El div conte NO es visible
			$(getConte)
				.parent()
				.find("svg")
				.transition({ transform: "rotate(-90deg)" }); //Animacion de flechita
		}
		resizeBtnelements(); //Ancho de btns de elementos (vista bloques), para hacer el drag clone
	});
}
function resetOpenbtnconte() {
	/*
	 * NOMBRE: resetOpenbtnconte.
	 * UTILIDAD: Resetea acciones de btn de elemntos (bloques)
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	$(".d_pxbopcion").removeClass("d_pxbopcion_up"); //Quita estilos para encoger div btn
	$(".d_pxbopcionconte").removeClass("d_pxbopcionconte_up"); //Quita estilos para alargar div
	$(".d_pxbopcionconte").hide(); //Regresa la animacion de toggle
	$(".d_pxbopcionname").find("svg").css({ transform: "rotate(-90deg)" }); //Resetea la animacion de la flecha
	$(".d_pxbviewelementsconte").css({ "background-color": "transparent" }); //Quita color de fondo
	elementBtnsave = null; //Almacena si se presiona el mismo btn en elementos (bloques)
}
function resizeBtnelements() {
	/*
	 * NOMBRE: resizeBtnelements.
	 * UTILIDAD: A los btns de elementos se agrega el ancho, para que en el drag clone tengan esa medida, y no en porcentaje de absoluto
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	var size; //Guarda el ancho del btn
	if (getOrientation === "portrait") {
		//Orientacion portrait
		size = $(".d_pxbviewelementsconte").width() / 2 - 1; //Ancho del conte a la mitad en portrait
	} else {
		size = $(".d_pxbviewelementsconte").width() - 1; //Ancho del conte
	}
	$(".d_pxbopcionbtn").css({ width: size }); //Asigna el ancho de los elementos drag
}
function clickElements() {
	/*
	 * NOMBRE: clickElements.
	 * UTILIDAD: Asigna el click a cada uno de los elementos de bloques
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	dragDropelements(); //Draggable y droppable de elementos
	sortableElements(); //Sortable de elementos
}
function dropHide() {
	/*
	 * NOMBRE: dropHide.
	 * UTILIDAD: Oculta menus, tooltips, emergentes al hacer click en un area neutral
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	deleteTooltip(); //Elimina tooltip de los bloques
}
var saveDrag; //Almacena el objeto de drag o sortable
var itemId; //Almacena el id del div drag o sortable
var getOrigin; //Define si se hace de inicio drag, o es sortable
var getColor; //Obtiene el color del elemento, para asignarlo al clon
var bandera_pasos = false;
function dragDropelements() {
	/*
	 * NOMBRE: dragDropelements.
	 * UTILIDAD: Draggable y droppable de elementos
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	$(".d_pxbopcionbtn").draggable({
		//Drag de los botones desde el menu
		containment: ".d_pxbbloques", //Contenedor de drag
		helper: "clone", //Se clona el elemento
		appendTo: ".d_pxbbloques", //Donde se coloca el clone
		connectToSortable: ".d_pxbdropblocks", //Se conecta con las areas del sortable
		start: function (e, ui) {
			arrastra(this, ui.helper);
		},
		drag: function () {},
		stop: function (e, ui) {
			simulatedSort = false;
			if ($(ui.helper).attr("subtipo") === "si_otro") {
				$(ui.helper).find("span.siotrotext").text("Si");
				$(ui.helper).find("span.ifelsetext").text("If");
			} else if ($(ui.helper).attr("subtipo") === "haz") {
				$(ui.helper).find("span.hazmientrastext").text("Mientras");
				$(ui.helper).find("span.dowhiletext").text("While");
			}else if($(ui.helper).attr("subtipo") === "si"){
				$(ui.helper).find("div.d_pxbopcionbtntxt2").show()
			}

			//     if($(ui.helper).attr('subtipo')==="si_otro"){
			//         if(idioma!=null){
			//             if(idioma.value=="Español"){
			//                 $(ui.helper).find("span.siotrotext").text('Si').css('display','block');
			//                 $(ui.helper).find("span.ifelsetext").text('If').css('display','none')
			//             }else if (idioma.value=="Ingles"){
			//                 $(ui.helper).find("span.siotrotext").text('Si').css('display','none');
			//                 $(ui.helper).find("span.ifelsetext").text('If').css('display','block')
			//             }
			//         }else{
			//             $(ui.helper).find("span.siotrotext").text('Si').css('display','block');
			//             $(ui.helper).find("span.ifelsetext").text('If').css('display','none')
			//         }

			//     }else if($(ui.helper).attr('subtipo')==="haz"){
			//         if(idioma!=null){
			//             if(idioma.value=="Español"){
			//                 $(ui.helper).find("span.hazmientrastext").text('Mientras').css('display','block');
			//                 $(ui.helper).find("span.dowhiletext").text('While').css('display','none');
			//             }else if (idioma.value=="Ingles"){
			//                 $(ui.helper).find("span.hazmientrastext").text('Mientras').css('display','none');
			//                 $(ui.helper).find("span.dowhiletext").text('While').css('display','block');
			//             }
			//         }else{
			//             $(ui.helper).find("span.hazmientrastext").text('Mientras').css('display','block');
			//             $(ui.helper).find("span.dowhiletext").text('While').css('display','none');
			//         }
			//    }
		},
	});
}
function sortableElements(indi) {
	/*
	 * NOMBRE: sortableElements.
	 * UTILIDAD: Sortable de elementos
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	simulatedSort = indi;
	var orderBlocks = []; //Guarda el orden de los bloques con id
	$(".sortable").sortable({
		tolerance: "pointer",
		//Sortable de los bloques colocados
		connectWith: ".sortable", //Todos los div con clase ".sortable"
		start: function (event, ui) {
			if (!simulatedSort) {
				itemId = ui.helper.attr("id"); //Se obtiene id de elemento sortable
				saveDrag = ui.helper; //Se obtiene objeto de elemento sortable
				var backgrounColor = $("#" + itemId).css("background-color"); //Obtiene el color de borde del div de donde se hace drag, para asignarlo al clon
				getColor = backgrounColor; //Guarda el color del elemento, para asignarlo al clon
			}

			if ($(saveDrag).attr("nuevo") === "no") {
				bandera_pasos = true;
			}
			ui.helper.attr("id", itemId); //Se le asiga el id del elemento del drag, al hacer sortable
			deleteTooltip(); //Elimina tooltip de los bloques
		},
		over: function () {
			var newSize = $(this).outerWidth(); //Obtiene el nuevo ancho del div drop
			var newColor = getColor.split(")")[0].split("(")[1]; //Se obtienen los valores rgb del color, para despues agregarle alpha
			$(".d_sortable_resalte").remove(); //Quita div de resalte al conte de sortable
			$(this).prepend('<div class="d_sortable_resalte"></div>'); //Agrega div de resalte al conte de sortable
			$(this)
				.find(".d_sortable_resalte")
				.css({
					"background-color": "rgba(" + newColor + ", .5)",
					border: "0.1rem solid #ffffff",
					"border-box": "box-sizing",
				}); //Asigna color y estilos del div de resalte, de acuerdo al color del elementro seleccionado
		},
		stop: function (event, ui) {
			alto();
			//Validacion para que las condiciones solo acepten 1 bloque
			if (
				$(saveDrag).parent("div").attr("tipo") === "condicion" ||
				($(saveDrag).parent("div").attr("tipo") === "entonces" &&
					$(saveDrag).parent("div").parent("div").attr("tipo") ===
						"matematicas")
			) {
				console.log("1");
				if (
					$(saveDrag).parent("div").attr("contenido") != 1 &&
					$(saveDrag).attr("tipo") != "estructura" &&
					$(saveDrag).attr("tipo") != "funcion"
				) {
					console.log("2");
					if (
						$(saveDrag).parent("div").attr("tipo") === "condicion" &&
						$(saveDrag).attr("subtipo") === "operacion"
					) {
						console.log("3");
						$(this).sortable("cancel");
					} else {
						console.log("4");
						$(saveDrag).parent("div").attr("contenido", "1");
					}
				} else {
					console.log("5");
					$(this).sortable("cancel");
				}
			}
			if (
				$(this).attr("tipo") === "condicion" ||
				($(this).attr("tipo") === "entonces" &&
					$(this).parent("div").attr("tipo") === "matematicas")
			) {
				$(this).attr("contenido", "0");
			} //Fin de validacion condiciones

			//if(banderaCondicion === false){
			agregaBloqueL(saveDrag);
			creaYActualiza();

			//Checar Nivel y asignar color
			let nivel = parseInt($(saveDrag).attr("nivel"));

			if ($(saveDrag).attr("tipo") === "estructura") {
				actualizaColor(saveDrag, nivel, true);
			} else if ($(saveDrag).attr("tipo") === "matematicas") {
				actualizaColor(saveDrag, nivel, false);
			}

			//Condicion para comparar pasos
			let b_sub = $(saveDrag).attr("subtipo");
			if (
				b_sub === "si" ||
				b_sub === "si_otro" ||
				b_sub === "mientras" ||
				b_sub === "haz" ||
				$(saveDrag).index() != $(saveDrag).parent("div").children().length - 1
			) {
				comparaPasos();
			} else if (bandera_pasos === true) {
				comparaPasos();
				bandera_pasos = false;
			}

			console.log(principal);

			//}
		},
		receive: function (event, ui) {},
		update: function (event, ui) {},
		sort: function (event, ui) {},
		change: function (event, ui) {},
	});
}
function clickBlocks() {
	/*
	 * NOMBRE: clickBlocks.
	 * UTILIDAD: Click en cada block
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	var statusBtnblock = true; //Almacena si se da un click solamente para evitar efecto bubbling
	$(".d_pxbopcionblockclick")
		.off()
		.on("mousedown", function (e) {
			/*
			 * NOMBRE: mousedown.
			 * UTILIDAD: Click en cada bloque ya colocado
			 * ENTRADAS: e > evento.
			 * SALIDAS: Ninguna.
			 */
			if (statusBtnblock === true) {
				//Se da solo un click. Esto es porque algunos div estan anidados, y hace el efecto dubbling. Y stopPropagation cancela el evento del btn al hacer sortable.
				if ($(this).attr("id") != undefined) {
					//Si tiene id, entra. Solo los div con id son bloques diferentes
					//itemId = $(this).attr('id');//Se obtiene de nuevo el id del bloque presionado
					deleteTooltip(); //Elimina tooltip de los bloques
					createTooltip($(this)); //Crea el tooltip de los bloques (Se envia el objeto como tal, para a ese agregarle el tooltip)
					bloqueActual = this; //Actuliza el bloque al cual se le esta dando click
					idActual = $(bloqueActual).attr("id");
					statusBtnblock = false; //Si se da un click, se vuelve false, para evitar efecto dubbling
					var timeClick = setTimeout(function () {
						statusBtnblock = true; //Se vuelve activar a que al hacer click entre el codigo de nuevo
						clearTimeout(timeClick); //Limpia tiempo
					}, 100);
				}
			}
		});
}
function createTooltip(thisElement) {
	/*
	 * NOMBRE: createTooltip.
	 * UTILIDAD: Crea el tooltip de los bloques
	 * ENTRADAS: thisElement > elemento bloque que se selecciona.
	 * SALIDAS: Ninguna.
	 */

	iniciaTooltips(thisElement);

	$(thisElement).append('<div class="d_pxbblockstooltip"></div>'); //Inserta div tooltip
	var getIdelement = thisElement[0].id.split("_")[1].split("-")[0]; //recupera id del elemento seleccionado
	$(".d_pxbblockstooltip").append(
		'<div class="d_pxbtooltipbtn d_pxbtooltip_anima1 d_pxbtooltip_delete"></div>'
	); //Inserta btn eliminar en tooltip
	if (
		getIdelement === "if" ||
		getIdelement === "ifelse" ||
		getIdelement === "while" ||
		getIdelement === "dowhile" ||
		getIdelement === "for"
	) {
		//Btn de reducir bloque
		$(".d_pxbblockstooltip").append(
			'<div class="d_pxbtooltipbtn d_pxbtooltip_anima2 d_pxbtooltip_hide"></div>'
		); //Inserta btn ocultar en tooltip
	}
	if (getIdelement != "break") {
		//Btn que no tiene btn de editar
		$(".d_pxbblockstooltip").append(
			'<div class="d_pxbtooltipbtn d_pxbtooltip_anima3 d_pxbtooltip_edit"></div>'
		); //Inserta btn editar en tooltip
	}
	var getColor = $(thisElement).css("background-color"); //Recupera el color del bloque que se selecciona
	$(".d_pxbtooltipbtn").css({ "background-color": getColor }); //Asigna el color de fondo a los btn tooltip
	$(".d_pxbblockstooltip").addClass("d_pxbblockstooltip_anima"); //Agrega animacion a btn de tooltip
	$(".d_pxbtooltip_delete")
		.off()
		.on("mousedown", function (e) {
			/*
			 * NOMBRE: mousedown.
			 * UTILIDAD: Click en eliminar bloque tooltip
			 * ENTRADAS: e > evento.
			 * SALIDAS: Ninguna.
			 */
			e.stopPropagation(); //Solo hace click en el btn presionado, sin importar si esta anidado
			buscaRutaLogica(idActual, principal, false); //Elimina logicamente el bloque

			if (
				$(this).parent().parent("div").parent("div").attr("tipo") ===
					"condicion" ||
				($(this).parent().parent("div").parent("div").attr("tipo") ===
					"entonces" &&
					$(this)
						.parent()
						.parent("div")
						.parent("div")
						.parent("div")
						.attr("tipo") === "matematicas")
			) {
				$(this).parent().parent("div").parent("div").attr("contenido", "0");
			}
			$(this).parent().parent().remove(); //Elimina el bloque completo
			numBloques = numBloques - 1;
			creaYActualiza();
			comparaPasos();
		});
	$(".d_pxbtooltip_hide")
		.off()
		.on("mousedown", function (e) {
			/*
			 * NOMBRE: mousedown.
			 * UTILIDAD: Click en ocultar bloque tooltip
			 * ENTRADAS: e > evento.
			 * SALIDAS: Ninguna.
			 */
			e.stopPropagation(); //Solo hace click en el btn presionado, sin importar si esta anidado
			getIdelement = thisElement[0].id; //recupera id del elemento seleccionado
			$("#" + getIdelement)
				.find(".d_pxbopcionbtnthen")
				.toggle(500, "swing");
		});
	$(".d_pxbtooltip_edit")
		.off()
		.on("mousedown", function (e) {
			/*
			 * NOMBRE: mousedown.
			 * UTILIDAD: Click en editar bloque tooltip
			 * ENTRADAS: e > evento.
			 * SALIDAS: Ninguna.
			 */
			configWindow = 4;
			e.stopPropagation(); //Solo hace click en el btn presionado, sin importar si esta anidado
			var getIdblock = $(this)
				.parent()
				.parent()
				.attr("id")
				.split("_")[1]
				.split("-")[0];
			var getColor = $(this).parent().parent().css("background-color"); //Obtiene el color de fondo del bloque seleccionado
			var getTxt = $(this).parent().siblings(".d_pxbopcionbtntxt")[0].innerText; //Obtiene el texto del bloque seleccionado
			var getPosition = $(this)
				.parent()
				.parent()
				.find(".d_pxbopcionbtnicon")
				.css("background-position"); //Obtiene la posicion de img icono del bloque seleccionado
			$("#d_pxbbloquespopup").show(); //Muestra popup de ajuste del bloque seleccionado
			$(".d_pxbbloquespopuptitle").css({ "background-color": getColor }); //Agrega color a pleca del popup del bloque seleccionado
			$(".d_pxbbloquespopuptitletxt").text(
				"Ajustes de " + getTxt.split(":", 1)
			); //Agrega texto a titulo del popup del bloque seleccionado
			$(".d_pxbbloquespopuptitleicon").css({
				"background-position": getPosition,
			}); //Agrega posicion de pleca del popup del bloque seleccionado
			$(".d_pxbbloquespopupin").removeAttr("style"); //Quita estilos que centran el popup, para despues asignarle nuevos
			$(".d_popupoptions").hide(); //Oculta todas las opciones dentro del contenedor de popup editar
			$(".d_" + getIdblock).show(); //Muestra las opciones que tengan la clase del bloque que se selecciono
			var getHeight = $(".d_pxbbloquespopupin").outerHeight(); //Obtiene el alto/2 del popup de editar el bloque, para centrarlo verticalmente
			$(".d_pxbbloquespopupin").css({
				top: "calc(50% - " + getHeight / 2 + "px)",
				height: getHeight,
			}); //Se centra el popup de editar verticalmente
		});
	$("#opcion_variable").on("change", function (e) {
		var getHeight = $(".d_pxbbloquespopupin").outerHeight(); //Obtiene el alto/2 del popup de editar el bloque, para centrarlo verticalmente
		if ($("#opcion_variable").val() == "crear") {
			$(".d_pxbbloquespopupin").css({
				top: "calc(25% - " + getHeight / 2 + "px)",
			});
			$(".d_pxbbloquespopupin").css("height", "calc(100% - 2.5rem)"); //Quita estilos que centran el popup, para despues asignarle nuevos
		} else {
			$(".d_pxbbloquespopupin").css({
				top: "calc(50% - " + getHeight / 2 + "px)",
			});
			$(".d_pxbbloquespopupin").css("height", "calc(100% - 21.5rem)"); //Quita estilos que centran el popup, para despues asignarle nuevos
		}
	});
	$("#valor_tipo").on("change", function (e) {
		//Cuando cambia el select entre int /boolean al crean un valor
		$(".d_pxbbloquespopupin").css("height", "auto");
	});
}
function deleteTooltip() {
	/*
	 * NOMBRE: deleteTooltip.
	 * UTILIDAD: Elimina tooltip de los bloques
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	$(".d_pxbblockstooltip").remove(); //Quita tooltipo de cada bloque
}
function popupbtnAccept() {
	/*
	 * NOMBRE: popupbtnAccept.
	 * UTILIDAD: Click en btn de aceptar de popup de bloques
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	let valores_correctos = validaValoresEntrada(bloqueActual);
	if (valores_correctos) {
		$("#d_pxbbloquespopup").hide(); //Oculta popup de editar bloque !NO FUNCIONA!
		creaYActualiza();
		comparaPasos();
		configWindow = 0;
	} else {
		showMessage(
			"Algunos valores no pueden ser aceptados, verificalos.",
			3,
			true,
			bloqueActual.getAttribute("tipo")
		);
	}
}
function popupbtnCancel() {
	/*
	 * NOMBRE: popupbtnCancel.
	 * UTILIDAD: Click en btn de cancelar de popup de bloques
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	$("#d_pxbbloquespopup").hide(); //Oculta popup de editar bloque
	configWindow = 0;
}
function removebloquesPasos() {
	/*
	 * NOMBRE: removebloquesPasos.
	 * UTILIDAD: Quita emergentes de pasos instrucciones
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	$("#d_pxbbloquesstepstxt").find("p").remove(); //Quita texto del div de instrucciones
	$("#d_pxbbloquesstepstxt").hide(); //Oculta div de instrucciones
	$(".d_pxbbloquesstepsbtns").removeClass("d_pxbbloquesstepsbtns_resalte"); //Quita resalte a btn de pasos de instrucciones
}
function clickbloquesPasos() {
	/*
	 * NOMBRE: clickbloquesPasos.
	 * UTILIDAD: Click en btn de pasos instrucciones y preguntas bloques
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */

	//PASOS PRIMEROS
	/*$("#d_pxbbloquesstepsscrollbtn").css({"width":(addbloquesInstruccion.length*2.4)+"rem"});//Asigna el width del div scroll de acuerdo a los pasos
    for(var i=1;i<=addbloquesInstruccion.length;i++){//Agrega los btn de los pasos
        $("#d_pxbbloquesstepsscrollbtn").append('<div class="d_pxbbloquesstepsbtns" id="d_pxbbloquesstepsbtns_'+i+'">'+i+'</div>');//Inserta los btn en relacion al total de pasos
    }*/
	//PREGUNTAS DE REFLEXION
	$("#d_pxbbloquesstepsscrollbtn").css({
		width: (addbloquesInstruccion.length + 1) * 2.4 + "rem",
	}); //Asigna el width del div scroll de acuerdo a los pasos
	$("#d_pxbbloquesstepsscrollbtn").append(
		'<div class="d_pxbbloquesstepsbtnsicon"><svg viewBox="0 0 50 50"><circle fill-rule="evenodd" clip-rule="evenodd" fill="#F15A24" cx="26.598" cy="37.121" r="2.604"/><circle fill-rule="evenodd" clip-rule="evenodd" fill="#FBAE17" cx="23.51" cy="41.749" r="1.833"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#009EB3" d="M41.91,17.824c-0.621-0.397-1.344-0.634-2.037-0.951 c0.05-0.335,0.146-0.724,0.16-1.115c0.086-2.446-1.446-4.472-3.82-5.05c-0.215-0.052-0.304-0.158-0.398-0.331 c-0.248-0.453-0.484-0.919-0.787-1.334c-1.644-2.254-4.79-3.163-7.367-2.109c-0.688,0.281-1.32,0.691-2.017,1.063 c-1.776-1.446-3.844-1.97-6.129-1.268c-2.275,0.699-3.698,2.287-4.383,4.554c-3.782-2.357-7.765-0.58-9.334,2.001 c-0.901,1.482-1.21,3.082-0.891,4.768c0.431,2.272,1.821,3.835,3.884,4.884c-0.899,0.967-1.387,2.092-1.438,3.381 c-0.052,1.293,0.298,2.498,1.169,3.459c1.916,2.111,4.189,2.438,6.717,1.176c1.208,2.121,2.975,3.355,5.458,3.369 c2.493,0.014,4.286-1.199,5.533-3.332c0.072,0.09,0.134,0.164,0.19,0.24c1.898,2.576,5.3,3.484,8.214,2.186 c1.175-0.525,2.144-1.301,2.832-2.404c0.126-0.201,0.239-0.395,0.553-0.363c0.917,0.088,1.804-0.082,2.655-0.416 c2.656-1.039,4.221-2.992,4.502-5.814S44.309,19.356,41.91,17.824z M24.629,28.773c-0.865,0-1.565-0.701-1.565-1.566 c0-0.863,0.7-1.564,1.565-1.564c0.864,0,1.564,0.701,1.564,1.564C26.193,28.072,25.494,28.773,24.629,28.773z M25.913,21.496v1.73 c0,0.709-0.575,1.285-1.284,1.285c-0.709,0-1.284-0.576-1.284-1.285v-2.863c0-0.709,0.575-1.283,1.284-1.283 c1.593,0,2.888-1.296,2.888-2.89c0-1.593-1.295-2.889-2.888-2.889s-2.889,1.296-2.889,2.889c0,0.709-0.575,1.284-1.284,1.284 s-1.284-0.575-1.284-1.284c0-3.008,2.448-5.456,5.457-5.456c3.008,0,5.457,2.448,5.457,5.456 C30.086,18.758,28.305,20.916,25.913,21.496z"/></svg></div>'
	); //Inserta los btn en relacion al total de pasos
	for (var i = 1; i <= addbloquesInstruccion.length; i++) {
		//Agrega los btn de los pasos
		if (i == 1 && !hasFinished) {
			$("#d_pxbbloquesstepsscrollbtn").append(
				'<div class="d_pxbbloquesstepsbtns d_flash" id="d_pxbbloquesstepsbtns_' +
					i +
					'">' +
					i +
					"</div>"
			); //Inserta los btn en relacion al total de pasos
		} else {
			$("#d_pxbbloquesstepsscrollbtn").append(
				'<div class="d_pxbbloquesstepsbtns" id="d_pxbbloquesstepsbtns_' +
					i +
					'">' +
					i +
					"</div>"
			); //Inserta los btn en relacion al total de pasos
		}
	}
	$(".d_pxbbloquesstepsbtns")
		.off()
		.on("mousedown", function () {
			//Mousedown btns pasos instrucciones
			var getBtn = $(this).attr("id").split("_")[2]; //Obtiene el Id del btn presionado
			$(".d_pxbbloquesstepsbtns").removeClass("d_pxbbloquesstepsbtns_resalte"); //Quita los resaltes de los btns
			$(this).addClass("d_pxbbloquesstepsbtns_resalte"); //Agrega resalte e btn seleccionado
			$("#d_pxbbloquesstepstxt").show(); //Muestra el div de la instruccion
			$("#d_pxbbloquesstepstxt").find("p").remove(); //Quita todas las etiquetas "p" para despues agregarlas de nuevo

			let idioma = document.getElementById("select-lenguaje");
			if (idioma.value === "Ingles") {
				let cambio = traduceTexto(addbloquesInstruccion[getBtn - 1]);
				$("#d_pxbbloquesstepstxt").append("<p>" + cambio + "</p>"); //Agrega txt que se recupera del arreglo de cada practica
			} else {
				$("#d_pxbbloquesstepstxt").append(
					"<p>" + addbloquesInstruccion[getBtn - 1] + "</p>"
				); //Agrega txt que se recupera del arreglo de cada practica
			}

			statuselementsMenu = "hide"; //El menu aparece al inicio
			resizeBloques(); //Escala el area de 3d, para que este visible junto con el menu de elements
		});
	$(".d_pxbbloquesstepstxtclose")
		.off()
		.on("mousedown", function () {
			$("#d_pxbbloquesstepstxt").hide(); //Oculta texto pasos
			$(".d_pxbbloquesstepsbtns").removeClass("d_pxbbloquesstepsbtns_resalte"); //Quita los resaltes de los btns
			statuselementsMenu = "hide"; //El menu aparece al inicio
			resizeBloques(); //Escala el area de 3d, para que este visible junto con el menu de elements
		});

	resizeBloques(); //Escala el area de 3d, para que este visible junto con el menu de elements

	for (var i = 1; i <= addbloquesInstruccion.length; i++) {
		//Agrega la funcionalidad de eliminar el parpadeo de los pasos al darle click
		$("#d_pxbbloquesstepsbtns_" + i).click(function (evt) {
			$("#" + $(this).attr("id")).removeClass("d_flash");
		});
	}
}

//CODIGO DE PROGRAMACION
function actualizaColor(padre, nivel, tipo) {
	if (tipo) {
		//Estructura
		$(padre).removeClass("d_pxb_estruct_color2");
		$(padre).removeClass("d_pxb_estruct_color1");

		switch (nivel) {
			case 1:
				break;
			case 2:
				$(saveDrag).addClass("d_pxb_estruct_color1");
				break;
			case 3:
				$(saveDrag).addClass("d_pxb_estruct_color2");
				break;
			case 4:
				break;
			case 5:
				$(saveDrag).addClass("d_pxb_estruct_color1");
				break;
			case 6:
				$(saveDrag).addClass("d_pxb_estruct_color2");
				break;
		}
	} else {
		//Matematicas
		$(padre).removeClass("d_pxb_mat_color2");
		$(padre).removeClass("d_pxb_mat_color1");

		switch (nivel) {
			case 1:
				break;
			case 2:
				$(saveDrag).addClass("d_pxb_mat_color1");
				break;
			case 3:
				$(saveDrag).addClass("d_pxb_mat_color2");
				break;
			case 4:
				break;
			case 5:
				$(saveDrag).addClass("d_pxb_mat_color1");
				break;
			case 6:
				$(saveDrag).addClass("d_pxb_mat_color2");
				break;
		}
	}

	let condicionA = $(padre).find("[tipo=entonces]");

	let hijos = $(condicionA).children("div");

	$.each(hijos, function () {
		if ($(this).attr("tipo") === "estructura") {
			actualizaColor(this, nivel + 1, true);
		}
	});

	/*$(padre).removeClass("d_pxb_mat_color2");
    $(padre).removeClass("d_pxb_mat_color1");

    if(nivel % 3 === 0){
        $(saveDrag).addClass("d_pxb_mat_color1");
    }else if(nivel % 2 === 0){
        $(saveDrag).addClass("d_pxb_mat_color3");
    }*/
}
function arrastra(raiz, clon) {
	/*
	 * NOMBRE: arrastra.
	 * UTILIDAD: Simula el drag al carril principal
	 * ENTRADAS: raiz > bloque original, clon > copia del bloque
	 * SALIDAS: Ninguna.
	 */
	sortableElements(true); //Sortable de elementos
	var size = $(raiz).outerWidth(); //Obtiene el tamano del div de donde se hace drag, para asignarlo al clon
	var bordeColor = $(raiz).css("border-color"); //Obtiene el color de borde del div de donde se hace drag, para asignarlo al clon
	var textColor = $(raiz).css("color"); //Obtiene el tamano del color de texto de donde se hace drag, para asignarlo al clon
	getColor = bordeColor; //Guarda el color del elemento, para asignarlo al clon
	$(clon).css({ width: size, "border-color": bordeColor, color: textColor }); //Se asignan estilos al clon generado con el drag
	itemId = $(raiz).attr("id").split("_")[1]; //Almacena el id de btn del drag, quitando distintivo de diseño "d_"
	itemId = "p_" + itemId + "-" + contId; //Con el id, se agrega distintivo de bloques "p_", para que del drag al sortable tenga diferente id
	contId++; //Incremento del numero del id de cada elemento
	saveDrag = clon; //Almacena el objeto del btn del drag
	getOrigin = "drag"; //Es drag
	deleteTooltip(); //Elimina tooltip de los bloques
}
function alto() {
	/*
	 * NOMBRE: alto.
	 * UTILIDAD: Agrega las clases a los bloques cuando llegan a un carril.
	 * ENTRADAS: Ninguna.
	 * SALIDAS: Ninguna.
	 */
	$(".d_pxbdropblocks").find("div").removeClass("d_pxbopcionbtn"); //Quita estilos de btn del menu lateral, para asignarle unos nuevos en la parte de bloques
	$(saveDrag).removeAttr("style"); //Quita estilos de tamaño, que se asignan en el over
	itemId = itemId.split("_")[1].split("-")[0]; //Recupera el nombre del elemento al quitarle "_" y "-" (p_led-5) = (led)
	$(saveDrag).addClass(
		"d_pxbopcionblock_" + (itemId + " d_pxbopcionblockclick")
	); //Se asigna el nuevo estilo de acuerdo al id del que se tomo en el drag o en sortable
	$(saveDrag).addClass("d_pxbopcionbtn_" + itemId); //Se agrega otra clase, para activar los div ocultos en estos casos (Se agrega la clase a todos, pero no todos tienen cambios significativos)
	orderBlocks = []; //Resetea el orden de los bloques con id
	var time = setTimeout(function () {
		//Tiempo para que se pinten todos los bloques correctamente
		$(".d_pxbdropblocks div").each(function () {
			//Busca los div que tengan id dentro de los bloques
			if ($(this).attr("id") != undefined) {
				//Si tiene id, entra. Solo los div con id son bloques diferentes
				orderBlocks.push($(this).attr("id")); //Agrega los id de los bloques
				clearTimeout(time); //Limpia tiempo
			}
		});
	}, 100);
	getOrigin = "sortable"; //Despues de drag, se vuelve sortable
	clickBlocks(); //Click en cada block
	deleteTooltip(); //Elimina tooltip de los bloques
	$(".sortable").find(".d_sortable_resalte").remove(); //Quita div de resalte al conte de sortable

	//Codigo para el intercambio de elementos entre carriles
}
function iniciaTooltips(objeto) {
	/*
	 * NOMBRE: iniciaTooltips.
	 * UTILIDAD: Genera los tooltips de lo bloques.
	 * ENTRADAS: objeto => nos proporciona el objeto al que se le ha dado clic.
	 * SALIDAS: Ninguna.
	 */
	//debugger;
	let subtipo = $(objeto).attr("subtipo");
	let info_bloque = buscaRutaLogica($(objeto).attr("id"), principal, true);

	let nuevo;

	let complemento = [];
	//No es relevante hasta que se manejen versiones de Shield
	switch (shield) {
		case 0:
			complemento = shield0;
			break;
		case 1:
			complemento = shield1;
			break;
		case 2:
			complemento = shield2;
			break;
		default:
			complemento = shield0;
	}
	//******************************************************* */
	if (info_bloque === false) {
		nuevo = true;
	} else {
		nuevo = false;
	}

	$(".d_pxbbloquespopupconte").empty();
	switch (subtipo) {
		case "led":
			//Limitar los pines
			/*$.each(pool_variables_predefinidas,function(){
                console.log(this);

                if(this.nombre === 'led0'){
                    lo22 = lo22 + " disabled";
                }
            })*/

			let t_led = $(
				"<!--OPCIONES LED-->" +
					complemento[0] +
					'<div class="d_pxbpopupcontestatus d_popupoptions d_led">' +
					'  <div class="d_pxbpopupcontestatustxt">Estado:</div>' +
					'<label class="d_pxbpopupcontestatusswitch">' +
					'<input type="checkbox" id="d_led_estado" >' +
					'<span class="d_slider d_round"></span>' +
					"</label>" +
					"</div>"
			);

			$(".d_pxbbloquespopupconte").append(t_led);

			if (shield === 1) {
				// $("#d_led_col").append('<option value="blue">Azul</option>');

				if (!nuevo) {
					// $("#d_led_col option").each(function () {
					// 	if ($(this).val() === info_bloque.color)
					// 		$(this).attr("selected", "selected");
					// });
				
					$("#d_led_col option").each(function () {
						let textoBloque = ($(this).text());
						if(textoBloque != undefined){
							textoBloque = textoBloque.slice(1, -1);
						}
						console.log(textoBloque);
						if (textoBloque === info_bloque.pin)
							$(this).attr("selected", "selected");
					});

					if (info_bloque.estado === "HIGH") {
						$("#d_led_estado").attr("checked", "checked");
					}
				}
			}
			break;
		case "rgb":
			let ro1 = "selected";
			let ro2 = "";
			let ro3 = "";
			let ro4 = "";
			let ro5 = "";
			let ro6 = "";
			let ro7 = "";
			let ro8 = "";
			let ro9 = "";
			let ro10 = "0";
			let ro11 = "0";
			let ro12 = "0";
			// let ro13 = "checked";
			let ro13 = "";

			if (!nuevo) {
				if (
					info_bloque.colorR == "0" &&
					info_bloque.colorG == "255" &&
					info_bloque.colorB == "0"
				) {
					ro2 = "selected";
				} else if (
					info_bloque.colorR == "0" &&
					info_bloque.colorG == "0" &&
					info_bloque.colorB == "255"
				) {
					ro3 = "selected";
				} else if (
					info_bloque.colorR == "255" &&
					info_bloque.colorG == "0" &&
					info_bloque.colorB == "0"
				) {
					ro4 = "selected";
				} else if (
					info_bloque.colorR == "255" &&
					info_bloque.colorG == "255" &&
					info_bloque.colorB == "0"
				) {
					ro5 = "selected";
				} else if (
					info_bloque.colorR == "0" &&
					info_bloque.colorG == "255" &&
					info_bloque.colorB == "255"
				) {
					ro6 = "selected";
				} else if (
					info_bloque.colorR == "255" &&
					info_bloque.colorG == "0" &&
					info_bloque.colorB == "255"
				) {
					ro7 = "selected";
				} else if (
					info_bloque.colorR == "255" &&
					info_bloque.colorG == "255" &&
					info_bloque.colorB == "255"
				) {
					ro8 = "selected";
				} else {
					ro9 = "selected";
				}

				ro10 = info_bloque.colorR;
				ro11 = info_bloque.colorG;
				ro12 = info_bloque.colorB;

				ro20 = info_bloque.pinR;
				ro21 = info_bloque.pinG;
				ro22 = info_bloque.pinB;

				if (info_bloque.estado === "LOW") {
					ro13 = "";
				}
			}

			let t_rgb = $(
				"<!--OPCIONES LED RGB-->" +
					complemento[1] +
					'<div class="d_pxbpopupcontetxt d_popupoptions d_rgb">Colores</div>' +
					'<select class="d_pxbpopupconteselect d_popupoptions d_rgb" id="d_rgb_col">' +
					'<option value="none" disabled ' +
					ro1 +
					">Selecciona un color</option>" +
					'<option value="green" ' +
					ro2 +
					">Verde</option>" +
					'<option value="blue" ' +
					ro3 +
					">Azul</option>" +
					'<option value="red" ' +
					ro4 +
					">Rojo</option>" +
					'<option value="yellow" ' +
					ro5 +
					">Amarillo</option>" +
					'<option value="cyan" ' +
					ro6 +
					">Cian</option>" +
					'<option value="magenta" ' +
					ro7 +
					">Magenta</option>" +
					'<option value="white" ' +
					ro8 +
					">Blanco</option>" +
					'<option value="otro" ' +
					ro9 +
					">Personalizado</option>" +
					"</select>" +
					'<div class="d_pxbpopupcontergb d_popupoptions d_rgb">' +
					"<div>R:</div>" +
					'<input id="r-l" disabled type="number" value="' +
					ro10 +
					'" max="255" min="0">' +
					"</div>" +
					'<div class="d_pxbpopupcontergb d_popupoptions d_rgb">' +
					"<div>G:</div>" +
					'<input id="g-l" disabled type="number" value="' +
					ro11 +
					'" max="255" min="0">' +
					"</div>" +
					'<div class="d_pxbpopupcontergb d_popupoptions d_rgb">' +
					"<div>B:</div>" +
					'<input id="b-l" disabled type="number" value="' +
					ro12 +
					'" max="255" min="0">' +
					"</div>" +
					'<div class="d_pxbpopupcontestatus d_popupoptions d_rgb">' +
					'<div class="d_pxbpopupcontestatustxt">Estado:</div>' +
					'<label class="d_pxbpopupcontestatusswitch">' +
					'<input type="checkbox" id="d_rgb_estado" ' +
					ro13 +
					">" +
					'<span class="d_slider d_round"></span>' +
					"</label>" +
					"</div>"
			);
			$(".d_pxbbloquespopupconte").append(t_rgb);
			if (!nuevo) {
				if (info_bloque.nombre === "rgb1") {
					$("#d_rgb_opc option[value='1']").attr("selected", "selected");
				} else if (info_bloque.nombre === "rgb2") {
					$("#d_rgb_opc option[value='2']").attr("selected", "selected");
				} else {
					$("#d_rgb_opc option[value='3']").attr("selected", "selected");
				}
			}
			break;
		case "zumbador":
			let t_zumbador = $(
				"<!--OPCIONES BUZZER-->" +
					complemento[2] +
					'<div class="d_pxbpopupcontetxt d_popupoptions d_buzzer">Frecuencia<span> en hertz(Hz)</span></div>' +
					'<input class="d_pxbpopupcontenumber d_popupoptions d_buzzer" type="number" value="31" min="31" id="d_zum_freq">' +
					'<div class="d_pxbpopupcontetxt d_popupoptions d_buzzer">Duración<span> en milisegundos(ms)</span></div>' +
					'<input class="d_pxbpopupcontenumber d_popupoptions d_buzzer" type="number" value="0" min="0" id="d_zum_dur">' +
					'<div class="d_pxbpopupcontestatus d_popupoptions d_buzzer">' +
					'<div class="d_pxbpopupcontestatustxt">Estado:</div>' +
					'<label class="d_pxbpopupcontestatusswitch">' +
					'<input type="checkbox" id="d_zum_estado" checked>' +
					'<span class="d_slider d_round"></span>' +
					"</label>" +
					"</div>"
			);
			$(".d_pxbbloquespopupconte").append(t_zumbador);

			if (!nuevo) {
				if (info_bloque.nombre === "zumbador_8") {
					$("#d_zum_op option[value='8']").attr("selected", "selected");
				} //else {
				//$("#d_zum_op option[value='9']").attr("selected", "selected");
				//}

				$("#d_zum_freq").val(info_bloque.frecuencia);
				$("#d_zum_dur").val(info_bloque.duracion);

				if (info_bloque.estado === "LOW") {
					$("#d_zum_estado").removeAttr("checked");
				}
			}
			break;
		case "motor":
			let mo1 = "selected";
			let mo2 = "";
			let mo3 = "";
			let mo4 = "checked";
			let mo5 = "";
			let mo6 = "";
			if (!nuevo) {
				if (info_bloque.nombre === "Motor 1") {
					mo2 = "selected";
				} else {
					mo3 = "selected";
				}
				switch (info_bloque.direccion) {
					case "right":
						mo4 = "checked";
						break;
					case "left":
						mo5 = "checked";
						break;
					case "stop":
						mo6 = "checked";
						break;
				}
			}
			let t_motor = $(
				"<!--OPCIONES MOTOR-->" +
					'<div class="d_pxbpopupcontetxt d_popupoptions d_motor">Selecciona el motor</div>' +
					'<select class="d_pxbpopupconteselect d_popupoptions d_motor" id="d_motor_op">' +
					'<option value="none" disabled ' +
					mo1 +
					">Selecciona una opción</option>" +
					'<option value="motor_1" ' +
					mo2 +
					">Motor 1</option>" +
					'<option value="motor_2" ' +
					mo3 +
					">Motor 2</option>" +
					"</select>" +
					'<form class="d_pxbpopupcontemotorgir d_popupoptions d_motor">' +
					'<div class="d_pxbpopupcontemotor">' +
					'<input class="d_d_pxbpopupcontemotorcheck" type="radio" name="typeMotor" value="right" id="clockWise" ' +
					mo4 +
					">" +
					'<label class="d_d_pxbpopupcontemotoricon d_clockwise" for="clockWise"></label>' +
					' <label class="d_d_pxbpopupcontemotortxt" for="clockWise">Hacia las agujas del reloj</label>' +
					"</div>" +
					'<div class="d_pxbpopupcontemotor">' +
					'<input class="d_d_pxbpopupcontemotorcheck" type="radio" name="typeMotor" value="left" id="otherClockwise" ' +
					mo5 +
					">" +
					'<label class="d_d_pxbpopupcontemotoricon d_otherclockwise" for="otherClockwise"></label>' +
					'<label class="d_d_pxbpopupcontemotortxt" for="otherClockwise">Contra las agujas del reloj</label>' +
					"</div>" +
					'<div class="d_pxbpopupcontemotor">' +
					'<input class="d_d_pxbpopupcontemotorcheck" type="radio" name="typeMotor" value="stop" id="stopClockwise" ' +
					mo6 +
					">" +
					'<label class="d_d_pxbpopupcontemotoricon d_stopclockwise" for="stopClockwise"></label>' +
					'<label class="d_d_pxbpopupcontemotortxt" for="stopClockwise">Parar</label>' +
					"</div>" +
					"</form>"
			);
			$(".d_pxbbloquespopupconte").append(t_motor);
			break;
		case "push":
			let t_push = $(
				"<!--OPCIONES PUSH BUTTON-->" +
					complemento[3] +
					'<div class="d_pxbpopupcontestatus d_popupoptions d_pushbutton">' +
					'<div class="d_pxbpopupcontestatustxt">Off</div>' +
					'<label class="d_pxbpopupcontestatusswitch">' +
					'<input type="checkbox" id="d_push_estado">' +
					'<span class="d_slider d_round"></span>' +
					"</label>" +
					'<div class="d_pxbpopupcontestatustxt">On</div>' +
					"</div>"
			);
			$(".d_pxbbloquespopupconte").append(t_push);

			if (!nuevo) {
				if (info_bloque.nombre === "pushButton_0") {
					$("#d_push_op option[value='0']").attr("selected", "selected");
				} else if (info_bloque.nombre === "pushButton_1") {
					$("#d_push_op option[value='1']").attr("selected", "selected");
				} else if (info_bloque.nombre === "pushButton_2"){
					$("#d_push_op option[value='2']").attr("selected", "selected");
				} else{
					$("#d_push_op option[value='3']").attr("selected", "selected");
				}

				if (info_bloque.estado === "HIGH") {
					$("#d_push_estado").attr("checked", "checked");
				}
			}
			break;
		case "delay":
			let do1 = "1";
			let do2 = "checked";
			let do3 = "";

			if (!nuevo) {
				// console.log("NUEVO");
				do1 = info_bloque.tiempo;
				// console.log(do1);
				let t = parseInt(info_bloque.tiempo);
				if (t % 1000 === 0) {
					do1 = do1 / 1000;
					do2 = "checked";
				} else {
					// console.log("milisss");
					do3 = "checked";
				}
			}

			let t_delay = $(
				"<!--OPCIONES DELAY-->" +
					'<div class="d_pxbpopupcontetxt d_popupoptions d_delay">Escribe y selecciona el tiempo</div>' +
					'<input class="d_pxbpopupcontenumber d_popupoptions d_delay" type="number" value="' +
					do1 +
					'" min="1" id="d_delay_ti">' +
					'<form class="d_pxbpopupconteradiosgen d_popupoptions d_delay">' +
					'<div class="d_pxbpopupconteradios">' +
					'<input class="d_d_pxbpopupconteradioscheck" type="radio" name="typeDelay" value="seg" ' +
					do2 +
					">" +
					'<label class="d_d_pxbpopupconteradiostxt" for="seconds">Segundos (s)</label>' +
					"</div>" +
					'<div class="d_pxbpopupconteradios">' +
					'<input class="d_d_pxbpopupconteradioscheck" type="radio" name="typeDelay" value="mili" ' +
					do3 +
					">" +
					'<label class="d_d_pxbpopupconteradiostxt" for="miliseconds">Milisegundos (ms)</label>' +
					"</div>" +
					"</form>"
			);
			$(".d_pxbbloquespopupconte").append(t_delay);
			break;
		case "pulso":
			let pu1 = "1";
			let pu2 = "1";

			if (!nuevo) {
				pu2 = info_bloque.repeticiones;
				pu1 = info_bloque.segundos;
			}
			let t_pulso = $(
				"<!--OPCIONES PULSE-->" +
					'<div class="d_pxbpopupcontetxt d_popupoptions d_pulse">Escribe el tiempo en segundos</div>' +
					'<input class="d_pxbpopupcontenumber d_popupoptions d_pulse" type="number" value="' +
					pu1 +
					'" min="1" max="10" id="d_pulso_seg">' +
					'<div class="d_pxbpopupcontetxt d_popupoptions d_pulse">Escribe el numero de pulsaciones por segundo</div>' +
					'<input class="d_pxbpopupcontenumber d_popupoptions d_pulse" type="number" value="' +
					pu2 +
					'" min="1" max="10" id="d_pulso_rep">'
			);
			$(".d_pxbbloquespopupconte").append(t_pulso);
			break;
		case "pulsado":
			let t_pul =
				"<!--OPCIONES TIME PUSHED-->" +
				'<div class="d_pxbpopupcontetxt d_popupoptions d_timepushed">Variable</div>' +
				'<select id="opcion_variable_pulsado" class="d_pxbpopupconteselect d_popupoptions d_timepushed">' +
				"<option disabled>Selecciona una opción</option>" +
				'<option value="variable_nueva_pulsado" selected>Nueva Variable</option>' +
				'<option value="variable_creada_pulsado">Variable existente</option>' +
				"</select>" +
				'<div id="variable_nueva_pulsado">' +
				'<div class="d_pxbpopupcontetxt d_popupoptions d_timepushed">Nombre de la variable</div>' +
				'<input class="d_pxbpopupconteinputtext d_popupoptions d_timepushed" id="nom_var_pul" type="text" placeholder="Nombre de la variable">' +
				"</div>" +
				'<div id="variable_creada_pulsado" style="display:none;">' +
				'<select id="variables_creadas_pul" class="d_pxbpopupconteselect d_popupoptions d_timepushed">' +
				"<option disabled selected>Selecciona una variable</option>";

			$.each(pool_de_variables, function () {
				console.log(this.tipo);
				if (this.tipo === "unsigned long") {
					t_pul =
						t_pul +
						'<option value="' +
						this.valor +
						'" tipo="' +
						this.tipo +
						'">' +
						this.nombre +
						"</option>";
				}
			});

			let t_sado =
				"</select>" +
				"</div>" +
				'<div class="d_pxbpopupcontetxt d_popupoptions d_timepushed">Selecciona el push button</div>' +
				'<select class="d_pxbpopupconteselect d_popupoptions d_timepushed" id="d_pulsado_push">' +
				'<option disabled selected value="none">Selecciona una opción</option>' +
				'<option value="up">Push adelante</option>' +
				'<option value="down">Push atras</option>' +
				'<option value="right">Push derecha</option>' +
				'<option value="left">Push izquierda</option>' +
				"</select>" +
				'<div class="d_pxbpopupcontestatus d_popupoptions d_timepushed">' +
				'<div class="d_pxbpopupcontestatustxt">Estado:</div>' +
				'<label class="d_pxbpopupcontestatusswitch">' +
				'<input type="checkbox" id="d_pulsado_estado">' +
				'<span class="d_slider d_round"></span>' +
				"</label>" +
				"</div>" +
				'<div class="d_pxbpopupcontetxt d_popupoptions d_timepushed">Escribe el tiempo en segundos</div>' +
				'<input class="d_pxbpopupcontenumber d_popupoptions d_timepushed" id="d_pulsado_tiempo" type="number" value="1" min="1">';

			let t_pulsado = $(t_pul + t_sado);
			$(".d_pxbbloquespopupconte").append(t_pulsado);
			break;
		case "si":
			let t_si = $(
				"<!--OPCIONES IF-->" +
					'<div class="d_pxbpopupcontetxt d_popupoptions d_if">Agrega o modifica una descripción</div>' +
					'<textarea class="d_pxbpopupcontetextarea d_popupoptions d_if" placeholder="Descripción">' +
					(!nuevo ? info_bloque : "") +
					"</textarea>"
			);
			$(".d_pxbbloquespopupconte").append(t_si);
			break;
		case "si_otro":
			let t_si_otro = $(
				"<!--OPCIONES IF ELSE-->" +
					'<div class="d_pxbpopupcontetxt d_popupoptions d_ifelse">Agrega o modifica una descripción</div>' +
					'<textarea class="d_pxbpopupcontetextarea d_popupoptions d_ifelse" placeholder="Descripción">' +
					(!nuevo ? info_bloque : "") +
					"</textarea>"
			);
			$(".d_pxbbloquespopupconte").append(t_si_otro);
			break;
		case "mientras":
			let t_mientras = $(
				"<!--OPCIONES WHILE-->" +
					'<div class="d_pxbpopupcontetxt d_popupoptions d_while">Agrega o modifica una descripción</div>' +
					'<textarea class="d_pxbpopupcontetextarea d_popupoptions d_while" placeholder="Descripción">' +
					(!nuevo ? info_bloque : "") +
					"</textarea>"
			);
			$(".d_pxbbloquespopupconte").append(t_mientras);
			break;
		case "haz":
			let t_haz = $(
				"<!--OPCIONES DO WHILE-->" +
					'<div class="d_pxbpopupcontetxt d_popupoptions d_dowhile">Agrega o modifica una descripción</div>' +
					'<textarea class="d_pxbpopupcontetextarea d_popupoptions d_dowhile" placeholder="Descripción">' +
					(!nuevo ? info_bloque : "") +
					"</textarea>"
			);
			$(".d_pxbbloquespopupconte").append(t_haz);
			break;
		case "para":
			let vo1 = "";
			let vo2 = "0";
			let vo3 = "selected";
			let vo4 = "";
			let vo5 = "";
			let vo6 = "";
			let vo7 = "";
			let vo8 = "";
			let vo9 = "";
			let vo10 = "";
			let vo11 = "";
			let vo12 = "";
			let bandera = false;

			if (!nuevo) {
				vo1 = info_bloque.nombre;
				vo2 = info_bloque.valor_inicial;
				vo3 = "";
				switch (info_bloque.comparacion) {
					case "<":
						vo4 = "selected";
						break;
					case ">":
						vo5 = "selected";
						break;
					case "<=":
						vo6 = "selected";
						break;
					case ">=":
						vo7 = "selected";
						break;
					case "==":
						vo8 = "selected";
						break;
				}

				if (isNaN(info_bloque.valor_final)) {
					vo10 = "selected";
					bandera = true;
				} else {
					vo9 = "selected";
					vo11 = info_bloque.valor_final;
				}

				vo12 = info_bloque.incremento;
			}

			let t_para1 =
				"<!--OPCIONES FOR-->" +
				"<div>" +
				'<div class="d_pxbpopupcontetxt d_popupoptions d_for">Para:</div>' +
				'<div class="d_pxbpopupcontetxt d_popupoptions d_for">Nombre de la variable</div>' +
				'<input class="d_pxbpopupconteinputtext d_popupoptions d_for" id="nom_var_for" type="text" value="' +
				vo1 +
				'" placeholder="Nombre de la variable">' +
				'<div class="d_pxbpopupcontetxt d_popupoptions d_for">Valor de la variable</div>' +
				'<input class="d_pxbpopupconteinputtext d_popupoptions d_for" id="val_var_for" type="number" value="' +
				vo2 +
				'">' +
				'<div class="d_pxbpopupcontetxt d_popupoptions d_for">Comparación:</div>' +
				'<select id="comparacion" class="d_pxbpopupconteselect d_popupoptions d_for">' +
				'<option value="none" disabled ' +
				vo3 +
				">Selecciona una opcion:</option>" +
				'<option value="<" ' +
				vo4 +
				"><(menor que)</option>" +
				'<option value=">" ' +
				vo5 +
				">>(mayor que)</option>" +
				'<option value="<=" ' +
				vo6 +
				"><=(menor igual que)</option>" +
				'<option value=">=" ' +
				vo7 +
				">>=(mayor igual que)</option>" +
				'<option value="==" ' +
				vo8 +
				">==(igual que)</option>" +
				"</select>" +
				'<div class="d_pxbpopupcontetxt d_popupoptions d_for">Hasta:</div>' +
				'<select id="opcion_variable_para" class="d_pxbpopupconteselect d_popupoptions d_for">' +
				"<option disabled>Selecciona una opción</option>" +
				'<option value="variable_nueva_para" ' +
				vo9 +
				">Nueva Valor</option>" +
				'<option value="variable_creada_para" ' +
				vo10 +
				">Variable existente</option>" +
				"</select>" +
				'<div id="variable_nueva_para">' +
				'<div class="d_pxbpopupcontetxt d_popupoptions d_for">Valor</div>' +
				'<input class="d_pxbpopupconteinputtext d_popupoptions d_for" id="val_com_for" type="text" value="' +
				vo11 +
				'" placeholder="Valor de la comparación">' +
				"</div>" +
				'<div id="variable_creada_para" style="display:none;">' +
				'<select id="variables_creadas_valor" class="d_pxbpopupconteselect d_popupoptions d_for">' +
				"<option disabled selected>Selecciona una variable</option>";

			$.each(pool_de_variables, function () {
				if (this.tipo === "int") {
					if (bandera) {
						if (this.nombre === info_bloque.valor_final) {
							t_para1 =
								t_para1 +
								'<option value="' +
								this.valor +
								'" selected>' +
								this.nombre +
								"</option>";
						} else {
							t_para1 =
								t_para1 +
								'<option value="' +
								this.valor +
								'">' +
								this.nombre +
								"</option>";
						}
					} else {
						t_para1 =
							t_para1 +
							'<option value="' +
							this.valor +
							'">' +
							this.nombre +
							"</option>";
					}
				}
			});

			let t_para2 =
				"</select>" +
				"</div>" +
				'<div class="d_pxbpopupcontetxt d_popupoptions d_for">Incremento:</div>' +
				'<input class="d_pxbpopupconteinputtext d_popupoptions d_for" id="incremento" type="number" value="' +
				vo12 +
				'">' +
				"</div>";
			//'<div class="d_pxbpopupcontetxt d_popupoptions d_for">Agrega o modifica una descripción</div>'+
			//'<textarea class="d_pxbpopupcontetextarea d_popupoptions d_for" placeholder="Descripción"></textarea>';

			let t_para = $(t_para1 + t_para2);
			$(".d_pxbbloquespopupconte").append(t_para);

			if (bandera) {
				$("#variable_creada_para").show();
				$("#variable_nueva_para").hide();
			}
			break;
		case "variable":
			let varo1 = "selected";
			let varo2 = "";
			let varo3 = "";
			let varo4 = "selected";
			let varo5 = "";
			let varo6 = "selected";
			let varo7 = "";
			let varo8 = "";
			let varo9 = "";
			let varo10 = "";
			let varo11 = "";
			let varo12 = "selected";
			let varo13 = "";
			let varo14 = "";
			let varo20 = "";
			let varo21 = "";
			let varo22 = "selected";
			let bandera_var = false;
			let bandera_boo = false;

			if (!nuevo) {
				// console.log("info",info_bloque);
				varo1 = "";
				varo4 = "";
				varo7 = "";
				varo12 = "";

				if (info_bloque.opcion === "crear") {
					varo2 = "selected";
					varo5 = info_bloque.nombre;
					switch (info_bloque.tipo) {
						case "int":
							varo7 = "selected";
							varo11 = info_bloque.valor;
							break;
						case "float":
							varo8 = "selected";
							varo11 = info_bloque.valor;
							break;
						case "boolean":
							varo9 = "selected";
							bandera_boo = true;
							if (info_bloque.valor === "true") {
								varo13 = "selected";
							} else {
								varo14 = "selected";
							}
							break;
						case "unsigned long":
							varo10 = "selected";
							varo11 = info_bloque.valor;
							break;
					}
					if (info_bloque.alcance === "global") {
						varo21 = "selected";
						varo22 = "";
					} else {
						varo21 = "";
						varo22 = "selected";
					}
				} else {
					varo3 = "selected";
					bandera_var = true;
				}
			}

			let t_variable1 =
				"<!--OPCIONES VARIABLE-->" +
				'<div class="d_pxbpopupcontetxt d_popupoptions d_variable">Crea o utiliza una variable</div>' +
				'<select class="d_pxbpopupconteselect d_popupoptions d_variable" id="opcion_variable">' +
				'<option value="none" disabled ' +
				varo1 +
				">Elige una opción</option>" +
				'<option value="crear" ' +
				varo2 +
				">Crea una variable</option>" +
				'<option value="usar" ' +
				varo3 +
				">Usar una variable</option>" +
				"</select>" +
				'<div id="variable_usar" style="display:none;">' +
				'<select class="d_pxbpopupconteselect d_popupoptions d_variable" id="var_u">' +
				"<option disabled " +
				varo4 +
				">Elige una variable</option>";

			$.each(pool_de_variables, function () {
				// console.log(pool_de_variables);
				// console.log(this.alcance);
				if (bandera_var) {
					if (this.nombre === info_bloque.nombre) {
						t_variable1 =
							t_variable1 +
							'<option value="' +
							this.valor +
							'" tipo="' +
							this.tipo +
							'" alcance="' +
							this.alcance +
							'" selected>' +
							this.nombre +
							"</option>";
					} else {
						t_variable1 =
							t_variable1 +
							'<option value="' +
							this.valor +
							'" tipo="' +
							this.tipo +
							'" alcance="' +
							this.alcance +
							'">' +
							this.nombre +
							"</option>";
					}
				} else {
					t_variable1 =
						t_variable1 +
						'<option value="' +
						this.valor +
						'" tipo="' +
						this.tipo +
						'" alcance="' +
						this.alcance +
						'">' +
						this.nombre +
						"</option>";
				}
			});
			let t_variable2 =
				"</select>" +
				"</div>" +
				'<div id="variable_crear" style="display:none;">' +
				'<div class="d_pxbpopupcontetxt d_popupoptions d_variable">Nombre de tu variable</div>' +
				'<input class="d_pxbpopupconteinputtext d_popupoptions d_variable" type="text" placeholder="p. ej. inCont" id="variable_nombre" value="' +
				varo5 +
				'">' +
				'<div class="d_pxbpopupcontetxt d_popupoptions d_variable">Tipo de variable</div>' +
				'<select class="d_pxbpopupconteselect d_popupoptions d_variable" id="variable_tipo">' +
				"<option disabled " +
				varo6 +
				">Selecciona una opción</option>" +
				'<option value="int" ' +
				varo7 +
				">Entero</option>" +
				//'<option value="float" '+varo8+'>Flotante</option>' +
				//'<option value="char">Caracter</option>' +
				'<option value="boolean" ' +
				varo9 +
				">Booleano</option>" +
				//'<option value="unsigned long" '+varo10+'>Variable sin signo</option>' +
				"</select>" +
				'<div class="d_pxbpopupcontetxt d_popupoptions d_variable">Alcance</div>' +
				'<select class="d_pxbpopupconteselect d_popupoptions d_variable" id="opcion_alcance">' +
				'<option value="none" disabled ' +
				varo20 +
				">Elige una opción</option>" +
				'<option value="global" ' +
				varo21 +
				">Global</option>" +
				'<option value="local" ' +
				varo22 +
				">Local</option>" +
				"</select>" +
				'<div class="d_pxbpopupcontetxt d_popupoptions d_variable">Valor de la variable</div>' +
				'<div id="oculta_otro">' +
				'<input class="d_pxbpopupconteinputtext d_popupoptions d_variable" min="0" type="number" placeholder="p. ej. 1" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" id="caja_valor" value="' +
				varo11 +
				'">' +
				"</div>" +
				'<div id="oculta_boo" style="display:none;">' +
				'<select class="d_pxbpopupconteselect d_popupoptions d_variable" id="caja_boleana">' +
				"<option disabled " +
				varo12 +
				">Selecciona una opción</option>" +
				'<option value="true" ' +
				varo13 +
				">true</option>" +
				'<option value="false" ' +
				varo14 +
				">false</option>" +
				"</select> " +
				"</div>" +
				"</div>";
			let t_variable = $(t_variable1 + t_variable2);
			$(".d_pxbbloquespopupconte").append(t_variable);

			if (!nuevo) {
				if (bandera_var) {
					$("#variable_usar").show();
					$("#variable_crear").hide();
				} else {
					$("#variable_crear").show();
				}
				if (bandera_boo) {
					$("#oculta_otro").hide();
					$("#oculta_boo").show();
				} else {
					$("#oculta_otro").show();
					$("#oculta_boo").hide();
				}
			}
			break;
		case "valor":
			let va1 = "selected";
			let va2 = "";
			let va3 = "";
			let va4 = "";
			let va5 = "";
			let va6 = "";
			let va7 = "";
			let bandera_valor = false;

			if (!nuevo) {
				va1 = "";
				switch (info_bloque.tipo) {
					case "int":
						va2 = "selected";
						va5 = info_bloque.valor;
						break;
					case "float":
						va3 = "selected";
						va5 = info_bloque.valor;
						break;
					case "boolean":
						va4 = "selected";
						if (info_bloque.valor === "true") {
							va6 = "selected";
						} else {
							va7 = "selected";
						}
						bandera_valor = true;
						break;
				}
			}
			let t_valor = $(
				"<!--OPCIONES VALOR-->" +
					'<div class="d_pxbpopupcontetxt d_popupoptions d_value">Tipo de valor</div>' +
					'<select class="d_pxbpopupconteselect d_popupoptions d_value" id="valor_tipo">' +
					"<option disabled " +
					va1 +
					">Selecciona una opción</option>" +
					'<option value="int" ' +
					va2 +
					">Entero</option>" +
					//'<option value="float" '+va3+'>Flotante</option>'+
					//'<option value="char">Caracter</option>'+
					'<option value="boolean" ' +
					va4 +
					">Booleano</option>" +
					"</select>" +
					'<div class="d_pxbpopupcontetxt d_popupoptions d_value">Valor</div>' +
					'<div id="valor_otro">' +
					'<input class="d_pxbpopupconteinputtext d_popupoptions d_value" type="number" placeholder="p. ej. 10" min="0" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" id="valor_valor" value="' +
					va5 +
					'">' +
					"</div>" +
					'<div id="valor_boolean" style="display:none;">' +
					'<select class="d_pxbpopupconteselect d_popupoptions d_value" id="valor_b">' +
					"<option disabled " +
					va1 +
					">Selecciona una opción</option>" +
					'<option value="true" ' +
					va6 +
					">true</option>" +
					'<option value="false" ' +
					va7 +
					">false</option>" +
					"</select>" +
					"</div>"
			);
			$(".d_pxbbloquespopupconte").append(t_valor);

			if (bandera_valor) {
				$("#valor_boolean").show();
				$("#valor_otro").hide();
			} else {
				$("#valor_boolean").hide();
				$("#valor_otro").show();
			}
			break;
		case "comparacion":
			let co1 = "";
			let co2 = "";
			let co3 = "";
			let co4 = "";
			let co5 = "";
			let co6 = "";
			let co7 = "selected";
			let co8 = "";
			let co9 = "";

			if (!nuevo) {
				co7 = "";
				switch (info_bloque.eleccion) {
					case "<":
						co2 = "selected";
						break;
					case ">":
						co3 = "selected";
						break;
					case "<=":
						co4 = "selected";
						break;
					case ">=":
						co5 = "selected";
						break;
					case "==":
						co6 = "selected";
						break;
					case "!=":
						co7 = "selected";
						break;
					case "&&":
						co8 = "selected";
						break;
					case "||":
						co9 = "selected";
						break;
				}
			}

			let t_comparacion = $(
				"<!--OPCIONES COMPARACION-->" +
					'<div class="d_pxbpopupcontetxt d_popupoptions d_compare">Elige la comparación</div>' +
					'<select class="d_pxbpopupconteselect d_popupoptions d_compare" id="comparacion_tipo">' +
					"<option disabled " +
					co1 +
					">Selecciona una opción</option>" +
					'<option value="<" ' +
					co2 +
					"><(menor que)</option>" +
					'<option value=">" ' +
					co3 +
					">>(mayor que)</option>" +
					'<option value="<=" ' +
					co4 +
					"><=(menor igual que)</option>" +
					'<option value=">=" ' +
					co5 +
					">>=(mayor igual que)</option>" +
					'<option value="==" ' +
					co6 +
					">==(igual que)</option>" +
					'<option value="!=" ' +
					co7 +
					">!=(diferente de)</option>" +
					'<option value="&&" ' +
					co8 +
					">&&(and)</option>" +
					'<option value="||" ' +
					co9 +
					">||(or)</option>" +
					"</select>"
				//'<div class="d_pxbpopupcontetxt d_popupoptions d_compare">Agrega o modifica una descripción</div>'
				//'<textarea class="d_pxbpopupcontetextarea d_popupoptions d_compare" placeholder="Descripción"></textarea>'
			);
			$(".d_pxbbloquespopupconte").append(t_comparacion);
			break;
		case "operacion":
			let oo1 = "";
			let oo2 = "";
			let oo3 = "";
			let oo4 = "";
			let oo5 = "selected";

			if (!nuevo) {
				oo5 = "";
				switch (info_bloque.eleccion) {
					case "+":
						oo1 = "selected";
						break;
					case "-":
						oo2 = "selected";
						break;
					case "/":
						oo3 = "selected";
						break;
					case "*":
						oo4 = "selected";
						break;
					case "=":
						oo5 = "selected";
						break;
				}
			}
			let t_operacion = $(
				"<!--OPCIONES OPERACION-->" +
					'<div class="d_pxbpopupcontetxt d_popupoptions d_operation">Elige la operación</div>' +
					'<select class="d_pxbpopupconteselect d_popupoptions d_operation" id="operacion_tipo">' +
					"<option disabled>Selecciona una opción</option>" +
					'<option value="+" ' +
					oo1 +
					">+ (adición)</option>" +
					'<option value="-" ' +
					oo2 +
					">- (sustracción)</option>" +
					'<option value="/" ' +
					oo3 +
					">/ (división)</option>" +
					'<option value="*" ' +
					oo4 +
					">* (multiplicación)</option>" +
					'<option value="=" ' +
					oo5 +
					">= (asignación)</option>" +
					"</select>"
				//'<div class="d_pxbpopupcontetxt d_popupoptions d_operation">Agrega o modifica una descripción</div>'
				//'<textarea class="d_pxbpopupcontetextarea d_popupoptions d_operation" placeholder="Descripción"></textarea>'
			);

			$(".d_pxbbloquespopupconte").append(t_operacion);
			break;
	}

	let t_mssgerror = $(
		'<div class="d_pxbbloquesviewspopupcontetxt" id="bloqueWarning"></div>'
	);

	let t_botones = $(
		"<!--BOTONES FINALES DE ACEPTAR Y CANCELAR-->" +
			'<div class="d_pxbbloquespopupbtns">' +
			' <div class="d_pxbbloquespopupbtnsconte">' +
			'<div class="d_pxbbloquespopupbtnsconteaccept" onclick="popupbtnAccept()">' +
			'<svg viewBox="0 0 40 40">' +
			'<path fill="#808080" d="M13.741,31.508C13.74,31.508,13.74,31.508,13.741,31.508c-0.718,0-1.405-0.285-1.912-0.791l-5.092-5.098c-1.055-1.055-1.054-2.766,0.001-3.822c1.056-1.055,2.767-1.055,3.822,0.002l3.181,3.184L29.439,9.285c1.057-1.056,2.768-1.056,3.822,0c1.056,1.055,1.056,2.767,0,3.821l-17.61,17.61C15.145,31.225,14.458,31.508,13.741,31.508z"/>' +
			"</svg>" +
			"</div>" +
			'<div class="d_pxbbloquespopupbtnscontecancel" onclick="popupbtnCancel()">' +
			'<svg viewBox="0 0 40 40">' +
			'<path fill="#808080" d="M23.822,20.001l7.096-7.096c1.056-1.056,1.056-2.767,0-3.821c-1.056-1.057-2.767-1.057-3.822,0L20,16.179l-7.095-7.095c-1.055-1.056-2.766-1.057-3.822,0c-1.056,1.055-1.056,2.766,0,3.821l7.095,7.096l-7.095,7.096c-1.056,1.055-1.056,2.766,0,3.82c0.528,0.529,1.219,0.793,1.911,0.793s1.383-0.264,1.911-0.793L20,23.824l7.095,7.094c0.527,0.529,1.219,0.793,1.911,0.793c0.691,0,1.384-0.264,1.911-0.793c1.056-1.055,1.056-2.766,0-3.82L23.822,20.001z"/>' +
			"</svg>" +
			"</div>" +
			"</div>" +
			"</div>"
	);
	$(".d_pxbbloquespopupconte").append(t_mssgerror);
	$(".d_pxbbloquespopupconte").append(t_botones);
}
function agregaBloqueL(clon) {
	/*
	 * NOMBRE: agregaBloqueL.
	 * UTILIDAD: Agrega un objeto al array logico "principal" en la posicion equivalente a su HTML.
	 * ENTRADAS: clon > Bloque que llegua a un carril.
	 * SALIDAS: Ninguna.
	 */
	let carril_logico = [];
	let carril_actual = [];
	let forma;
	//Esta condicion se lanza cuando los bloques llegan desde la pestaña de bloques
	if ($(clon).attr("nuevo") === "si") {
		numBloques = numBloques + 1;

		$(clon).attr("nuevo", "no");
		carril_actual = $(clon).parent("div").attr("tipo");

		forma = {
			tipo: $(clon).attr("tipo"),
			subtipo: $(clon).attr("subtipo"),
			id: $(clon).attr("id"),
			nivel: "",
			contenido: false,
			contenido_condicion: [],
			contenido_entonces: [],
			contenido_otro: [],
		};
		//Caso Bloque Break
		if ($(clon).attr("subtipo") === "break") {
			forma.contenido = "break";
		}
	} else {
		//Esta condicion se lanza cuando se mueven los bloques entre los diferentes "carriles" que hay en el programa
		let id_clon = $(clon).attr("id");
		carril_actual = $(clon).parent("div").attr("tipo");
		forma = buscaRutaLogica(id_clon, principal, false);
	}

	insertaBloqueL(carril_actual, carril_logico, forma, clon);
}
function insertaBloqueL(carril_actual, carril_logico, forma, clon) {
	if (carril_actual === "carril_principal") {
		carril_logico = principal;
		$(clon).attr("nivel", parseInt($(clon).parent("div").attr("nivel")) + 1);
		forma.nivel = $(clon).parent("div").attr("nivel");
	} else {
		carril_logico = encuentraCarril($(clon).parent("div"), carril_actual);
		$(clon).attr(
			"nivel",
			parseInt($(clon).parent("div").parent("div").attr("nivel")) + 1
		);
		forma.nivel = $(clon).parent("div").parent("div").attr("nivel");
	}

	//Aqui se insertan los nuevos valores segun sean colocados en el html
	if (carrilVacio(carril_logico)) {
		carril_logico.push(forma);
	} else {
		let vecinos = buscaVecinos(clon);
		if (vecinos[1] === false) {
			carril_logico.push(forma);
			adjustScroll(); //Ajustar el scroll
		} else if (vecinos[0] === false) {
			carril_logico.unshift(forma);
		} else {
			let indice = $(clon).index();
			carril_logico.splice(indice, 0, forma);
		}
	}
}
function buscaRutaLogica(idL, carril, datos) {
	/*
	 * NOMBRE: buscaRutaLogica.
	 * UTILIDAD: Regresa el bloque con el ID indicado
	 * ENTRADAS: Un ID, en arreglo principal, una estructura de datos con informacion nula o de bloques.
	 * SALIDAS: Booleano u Objeto de Bloque.
	 */
	let bandera = { tipo: 0 }; //Es el objeto logico del bloque que se regresa
	for (let i = 0; i < carril.length; i++) {
		if (carril[i].id === idL) {
			if (datos === false) {
				if (
					carril[i].tipo === "elemento" &&
					carril[i].subtipo != "motor" &&
					carril[i].contenido != false
				) {
					//Codigo para pines libres
					for (let j = 0; j < pinesUno.length; j++) {
						if (pinesUno[j].pin === carril[i].contenido.pin) {
							pinesUno[j].total--;
							if (pinesUno[j].total === 0) {
								pinesUno[j].disponible = true;
								pinesUno[j].otro = "";
							}
							break;
						}
					}
				}

				bandera = carril[i]; //Se crea un duplicado del elemento antes de eliminarlo
				carril.splice(i, 1); //Se borra el elemento en su posicion anterior
				return bandera; //Se regresa el elemento
			} else if (datos === true) {
				return carril[i].contenido;
			} else {
				carril[i].contenido = datos;
				return false;
			}
		}
		if (carril[i].tipo === "estructura" || carril[i].tipo === "matematicas") {
			if (carril[i].contenido_condicion.length != 0) {
				bandera = buscaRutaLogica(idL, carril[i].contenido_condicion, datos);
				if (bandera.tipo != 0) {
					return bandera;
				}
			}
			if (carril[i].contenido_entonces.length != 0) {
				bandera = buscaRutaLogica(idL, carril[i].contenido_entonces, datos);
				if (bandera.tipo != 0) {
					return bandera;
				}
			}
			if (carril[i].contenido_otro.length != 0) {
				bandera = buscaRutaLogica(idL, carril[i].contenido_otro, datos);
				if (bandera.tipo != 0) {
					return bandera;
				}
			}
		}
	}

	return bandera;
}
function encuentraCarril(padre, opc) {
	/*
	 * NOMBRE: encuentraCarril.
	 * UTILIDAD: Encuantra el "carril" donde se va a insertar el objeto bloque en el array "principal".
	 * ENTRADAS: padre > carril donde se empieza a buscar, opc > carril en el que se encuentra.
	 * SALIDAS: carril esperado.
	 */
	let ruta = [];
	let tipo = [];
	while ($(padre).attr("id") != "programa" && $(padre).attr("id") != false) {
		ruta.unshift($(padre).parent("div").index());
		tipo.unshift(opc);
		padre = $(padre).parent("div").parent("div");
		opc = $(padre).attr("tipo");
	}

	let carril = principal;

	for (let i = 0; i < ruta.length; i++) {
		switch (tipo[i]) {
			case "condicion":
				carril = carril[ruta[i]].contenido_condicion;
				break;
			case "entonces":
				carril = carril[ruta[i]].contenido_entonces;
				break;
			case "otro":
				carril = carril[ruta[i]].contenido_otro;
				break;
		}
	}

	return carril;
}
function carrilVacio(carril) {
	/*
	 * NOMBRE: carrilVacio.
	 * UTILIDAD: Indica si un carril esta vacio o no.
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Booleano.
	 */
	if (carril.length === 0) {
		return true;
	} else {
		return false;
	}
}
function buscaVecinos(clon) {
	/*
	 * NOMBRE: buscaVecinos.
	 * UTILIDAD: Nos ayuda a posicionar el objeto bloque en el array logico en base a sus vecinos.
	 * ENTRADAS: Copia del boque que llega.
	 * SALIDAS: Array de ids que indican los vecino vecinos arriba y abajo del bloque.
	 */
	let vecino_arriba = $(clon).prev().attr("id");
	let vecino_abajo = $(clon).next().attr("id");

	if (typeof vecino_arriba === "undefined") {
		vecino_arriba = false;
	}
	if (typeof vecino_abajo === "undefined") {
		vecino_abajo = false;
	}

	return [vecino_arriba, vecino_abajo];
}
function checaEstado(estado) {
	/*
	 * NOMBRE: checaEstado.
	 * UTILIDAD: Verifica el "estado" de un bloque.
	 * ENTRADAS: Booleano que representa el estado.
	 * SALIDAS: String que nos indica el estado.
	 */
	if (estado) {
		return "HIGH";
	} else {
		return "LOW";
	}
}
function camposRGB(r, g, b) {
	/*
	 * NOMBRE: camposRGB.
	 * UTILIDAD: En el tooltip de RGB cambia el valor los inputs segun el color seleccionado.
	 * ENTRADAS: 3 valores entre 0 y 256. r para el rojo, g para el verde, b para el azul.
	 * SALIDAS: Ninguna.
	 */
	$("#r-l").val(r);
	$("#g-l").val(g);
	$("#b-l").val(b);
}
//No son relevantes si no se manejan distintos Shields
// function validaPin(pin, otro){
//     let aux = false;

//     for(let i=0; i < pinesUno.length; i++){

//         if(pin === pinesUno[i].pin){
//             if(pinesUno[i].disponible === true){
//                 aux = true;
//                 /*pinesUno[i].disponible = false;
//                 pinesUno[i].otro = otro;
//                 pinesUno[i].total++;*/
//             }else if(pinesUno[i].otro === otro){
//                 aux = true;
//             }else{
//                 aux = false;
//             }
//             break;
//         }
//     }
//     return aux;
// }
// function ocupaPin(pin, otro){
//     for(let i=0; i < pinesUno.length; i++){

//         if(pin === pinesUno[i].pin){
//             if(pinesUno[i].disponible === true){
//                 pinesUno[i].disponible = false;
//                 pinesUno[i].otro = otro;
//                 pinesUno[i].total++;
//             }else if(pinesUno[i].otro === otro){
//                 pinesUno[i].total++;
//             }
//             break;
//         }
//     }
// }
/************************************************ */
function validaElemento(bloque, subtipo) {
	/*
	 * NOMBRE: validaElemento.
	 * UTILIDAD: Valida las entradas de todos los bloques que vienen de la pestaña de Elementos.
	 * ENTRADAS: bloque > html del bloque, subtipo > subtipo del bloque.
	 * SALIDAS: bandera > booleano que nos indica si se aceptaron los valores.
	 */
	let bandera = false;
	let datos = "";

	switch (subtipo) {
		case "led":
			let led_pin;
			let led_color = $("#d_led_col").children("option:selected").val();
			let led_status = $("#d_led_estado").is(":checked");
			let led_color_Set;
			switch (shield) {
				case 0:
					switch (led_color) {
						case "green":
							led_pin = "0";
							break;
						case "yellow":
							led_pin = "1";
							break;
						case "red":
							led_pin = "2";
							break;
					}
					break;
				case 1:
					switch (led_color) {
						case "Verde 1":
							led_pin = "4";
							led_color_Set = "green";
							break;
						case "Amarillo 1":
							led_pin = "5";
							led_color_Set = "yellow";
							break;
						case "Rojo 1":
							led_pin = "6";
							led_color_Set = "red";
							break;
						case "Azul 1":
							led_pin = "7";
							led_color_Set = "blue";
							break
						case "Verde 2":
							led_pin = "10";
							led_color_Set = "green";
							break;
						case "Amarillo 2":
							led_pin = "11";
							led_color_Set = "yellow";
							break;
						case "Rojo 2":
							led_pin = "12";
							led_color_Set = "red";
							break;
						case "Azul 2":
							led_pin = "13"
							led_color_Set = "blue";
					}
					break;
				case 2:
					led_pin = $("#d_led_pin").val();
					break;
			}

			// let disponible = validaPin(led_pin,led_color);//Los diferentes shields

			if (led_color != "none" && led_pin != "") {
				console.log("Despues IF", led_color);
				console.log("Despues IF", led_pin);
				bandera = true;
				// ocupaPin(led_pin,led_color);//Los diferentes shields
				$(bloque).find("[tipo=icono]").css("background-color", led_color_Set);
				//Se crea el objeto de tipo LED con los valores del tooltip
				let led_stat = checaEstado(led_status);

				datos = verificaLed(led_color_Set + ";" + led_stat + ";" + led_pin);
			
				$(bloque).find("span.confconte").text("(" + led_color + "): = " + led_stat);
				resizeObserver.observe($(bloque)[0]); //Agregar el listener del resize
				$(bloque).find("span.confconte").prev().text(''); //Se le quitó el NOMBRE
			}
			break;
		case "rgb":
			let rgb_color = $("#d_rgb_col").children("option:selected").val();
			let rgb_status = $("#d_rgb_estado").is(":checked");
			let pinR;
			let pinG;
			let pinB;
			let rgb_opc = 0;

			switch (shield) {
				case 0:
					pinR = "A2";
					pinG = "A3";
					pinB = "A4";
					break;
				case 1:
					rgb_opc = parseInt($("#d_rgb_opc").children("option:selected").val());
					if (rgb_opc === 1) {
						//RGB1
						pinR = "A0";
						pinG = "A1";
						pinB = "A2";
					} else if (rgb_opc === 2) {
						//RGB2
						pinR = "A3";
						pinG = "A4";
						pinB = "A5";
					} else {
						//RGB3
						pinR = "11";
						pinG = "12";
						pinB = "13";
					}
					break;
				case 2:
					$("#r-p").val();
					$("#g-p").val();
					$("#b-p").val();
					break;
			}

			// let r_dis = validaPin(pinR,"pinR");
			// let g_dis = validaPin(pinG,"pinG");
			// let b_dis = validaPin(pinB,"pinB");

			if (rgb_color != "none") {
				// ocupaPin(pinR,"pinR");
				// ocupaPin(pinG,"pinG");
				// ocupaPin(pinB,"pinB");

				let colorR = $("#r-l").val();
				let colorG = $("#g-l").val();
				let colorB = $("#b-l").val();
				if (
					parseInt(colorR) >= -1 &&
					parseInt(colorR) <= 255 &&
					parseInt(colorG) >= -1 &&
					parseInt(colorG) <= 255 &&
					parseInt(colorB) >= -1 &&
					parseInt(colorB) <= 255
				) {
					//Ya se hizo la validacion
					bandera = true;

					let rgb_stat = checaEstado(rgb_status);

					if (rgb_stat === "LOW") {
						colorR = "0";
						colorG = "0";
						colorB = "0";
					}

					let color = "rgb(" + colorR + "," + colorG + "," + colorB + ")";
					$(bloque).find("[tipo=icono]").css("background-color", color);

					datos = verificaRGB(
						color +
							";" +
							rgb_stat +
							";" +
							pinR +
							";" +
							pinG +
							";" +
							pinB +
							";" +
							rgb_opc +
							";" +
							rgb_color
					);

					switch (rgb_color) {
						case "green":
							rgb_color = "Verde";
							break;
						case "red":
							rgb_color = "Rojo";
							break;
						case "yellow":
							rgb_color = "Amarillo";
							break;
						case "cyan":
							rgb_color = "Cian";
							break;
						case "blue":
							rgb_color = "Azul";
							break;
						case "magenta":
							rgb_color = "Magenta";
							break;
						case "white":
							rgb_color = "Blanco";
							break;
						case "otro":
							rgb_color = "Personalizado";
							break;
					}
					$(bloque).find("span.confconte").text("(" +pinR +"," +pinG +"," +pinB +"): " +color.substring(3, color.length) +" = " +rgb_stat);
					resizeObserver.observe($(bloque)[0]); //Agregar el listener del resize
					$(bloque).find("span.confconte").prev().text(''); //Se le quitó el NOMBRE
				}
			}
			break;
		case "zumbador":
			let zum_status = $("#d_zum_estado").is(":checked");
			let zum_freq = $("#d_zum_freq").val();
			let zum_dur = $("#d_zum_dur").val();
			let zum_pin;

			switch (shield) {
				case 0:
					zum_pin = "10";
					break;
				case 1:
					// zum_pin = $("#d_zum_op").children("option:selected").val();
					zum_pin = "9"
					break;
				case 2:
					zum_pin = $("#d_zum_pin").val();
					break;
			}

			// let zum_dis = validaPin(zum_pin, "zumbador");
			if (
				parseInt(zum_freq) >= 31 &&
				parseInt(zum_freq) <= 65535 &&
				(parseInt(zum_pin) == 8 || parseInt(zum_pin) == 9) &&
				parseInt(zum_dur) >= 0
			) {
				// ocupaPin(zum_pin,"zumbador");
				bandera = true;
				let zum_s = checaEstado(zum_status);

				if (zum_s === "HIGH") {
					$(bloque).find("[tipo=icono]").css("background-color", "#8cc63f");
				} else {
					$(bloque).find("[tipo=icono]").css("background-color", "#c63f48");
				}
				if (zum_s === "LOW") {
					datos = verificaZumbador("31" + ";" + zum_s + ";" + "0" + ";" + zum_pin);
					$(bloque).find("span.confconte").text("(" + zum_pin + "): LOW");
					$(bloque).find("span.confconte").prev().text(''); //Se le quitó el NOMBRE
				} else {
					datos = verificaZumbador(zum_freq + ";" + zum_s + ";" + zum_dur + ";" + zum_pin);
					//$(bloque).find("span.confconte").text("(" + zum_pin + "): " + zum_freq + " hz - " + zum_dur + " ms");
					$(bloque).find("span.confconte").text("(" + zum_pin + "): " + zum_freq + " hz."); // Se le quitó la duración
					resizeObserver.observe($(bloque)[0]); //Agregar el listener del resize
					$(bloque).find("span.confconte").prev().text(''); //Se le quitó el NOMBRE
				}
			}
			break;
		case "motor":
			let motor = $("#d_motor_op").children("option:selected").val();
			let direccion = $("input:radio[name=typeMotor]:checked").val();
			if (motor === "motor_1") {
				motor = "Motor 1";
			} else {
				motor = "Motor 2";
			}
			if (motor != "none") {
				bandera = true;
				switch (direccion) {
					case "right":
						$(bloque)
							.children("div .d_pxbopcionbtnimg")
							.children("span")
							.css("background-position", "88.88% 44.44%");
						$(bloque)
							.find("span.confconte")
							.text(": " + motor + ", Giro derecha");
						break;
					case "left":
						$(bloque)
							.children("div .d_pxbopcionbtnimg")
							.children("span")
							.css("background-position", "99.99% 33.33%");
						$(bloque)
							.find("span.confconte")
							.text(": " + motor + ", Giro izquierda");
						break;
					case "stop":
						$(bloque)
							.children("div .d_pxbopcionbtnimg")
							.children("span")
							.css("background-position", "88.88% 33.33%");
						$(bloque)
							.find("span.confconte")
							.text(": " + motor + ", Parar");
						break;
				}
				datos = verificaMotor(motor + ";" + direccion);
			}
			break;
		case "push":
			let push;
			switch (shield) {
				case 0:
					push = $("#d_push_op").children("option:selected").val();
					switch (push) {
						case "up":
							push = "11";
							break;
						case "down":
							push = "12";
							break;
						case "right":
							push = "13";
							break;
						case "left":
							push = "A5";
							break;
					}
					break;
				case 1:
					console.log("este caso");
					push = $("#d_push_op").children("option:selected").val();
					switch (push) {
						case "9":
							push = "9";
							break;
						case "10":
							push = "10";
							break;
						case "11":
							push = "11";
							break;
					}
					break;
				case 2:
					push = $("#d_push_op").val();
					break;
			}
			let push_status = $("#d_push_estado").is(":checked");
			// let push_dis = validaPin(push,"push");
			console.log(push);
			if (push != "" && push != "none") {
				bandera = true;
				let push_s = checaEstado(push_status);
				if (push_s === "HIGH") {
					$(bloque).find("[tipo=icono]").css("background-color", "#8cc63f");
				} else {
					$(bloque).find("[tipo=icono]").css("background-color", "#c63f48");
				}
				resizeObserver.observe($(bloque)[0]);
				$(bloque).find("span.confconte").prev().text(''); //Al PUSH de le quitó el NOMBRE
				$(bloque).find("span.confconte").text("(" + push + "): " + push_s); //Insertar el PIN y ESTADO
				datos = verificaPush(push + ";" + push_s);
			}
			break;
	}

	buscaRutaLogica(idActual, principal, datos);
	return bandera;
}
function validaFuncion(bloque, subtipo) {
	/*
	 * NOMBRE: validaFuncion.
	 * UTILIDAD: Valida las entradas de todos los bloques que vienen de la pestaña de Funciones.
	 * ENTRADAS: bloque > html del bloque, subtipo > subtipo del bloque.
	 * SALIDAS: bandera > booleano que nos indica si se aceptaron los valores.
	 */
	let bandera = false;
	let datos = "";
	switch (subtipo) {
		case "delay":
			let delay_medida = $("input:radio[name=typeDelay]:checked").val(); //Segundos o milisegundos
			let delay_tiempo = $("#d_delay_ti").val(); //Tiempo
			if (parseInt(delay_tiempo) > 0 && parseInt(delay_tiempo) <= 9999) {
				bandera = true;
				if (delay_medida === "seg") {
					datos = verificaDelay((parseInt(delay_tiempo) * 1000).toString());
				} else {
					datos = verificaDelay(delay_tiempo);
				}
			}
			$(bloque)
				.find("span.confconte")
				.text(": " + delay_tiempo + " " + delay_medida);
			break;
		case "pulso":
			let pulso_tiempo = $("#d_pulso_seg").val();
			let pulso_repeticiones = $("#d_pulso_rep").val();
			if (
				parseInt(pulso_tiempo) > 0 &&
				parseInt(pulso_tiempo) <= 10 &&
				parseInt(pulso_repeticiones) > 0 &&
				parseInt(pulso_repeticiones) <= 10
			) {
				bandera = true;
				$(bloque)
					.find("span.confconte")
					.text(
						": " +
							pulso_repeticiones +
							" Pulsaciones en " +
							pulso_tiempo +
							" seg"
					);
				datos = verificaPulso(pulso_tiempo + ";" + pulso_repeticiones);
			}
			break;
		case "pulsado":
			let bandera_nombre = false;
			let opc = $("#opcion_variable_pulsado").children("option:selected").val();
			let pulsado_nombre;
			if (opc === "variable_nueva_pulsado") {
				pulsado_nombre = $("#nom_var_pul").val();
				let verifica_nom = verificaNombreVar(pulsado_nombre);
				if (verifica_nom[0] === true) {
					bandera_nombre = true;
				} else {
					showMessage(
						verifica_nom[1],
						3,
						true,
						bloqueActual.getAttribute("tipo")
					);
				}
			} else {
				pulsado_nombre = $("#variables_creadas_pul")
					.children("option:selected")
					.text();
				bandera_nombre = true;
			}
			if (bandera_nombre === true) {
				let pulsado_push = $("#d_pulsado_push")
					.children("option:selected")
					.val();
				let pulsado_tiempo = $("#d_pulsado_tiempo").val();
				let pulsado_estado = $("#d_pulsado_estado").is(":checked");

				if (
					pulsado_push != "none" &&
					parseInt(pulsado_tiempo) > 0 &&
					parseInt(pulsado_tiempo) <= 100
				) {
					bandera = true;
					datos = verificaPulsado(
						pulsado_nombre +
							";" +
							pulsado_push +
							";" +
							checaEstado(pulsado_estado) +
							";" +
							pulsado_tiempo
					);

					if (checaEstado(pulsado_estado) === "HIGH") {
						$(bloque).find("[tipo=icono]").css("background-color", "#8cc63f");
					} else {
						$(bloque).find("[tipo=icono]").css("background-color", "#c63f48");
					}
				}
				switch (pulsado_push) {
					case "up":
						$(bloque)
							.find("span.confconte")
							.text(
								": Variable=" +
									pulsado_nombre +
									", Tiempo=" +
									pulsado_tiempo +
									", Push adelante"
							);
						break;
					case "down":
						$(bloque)
							.find("span.confconte")
							.text(
								": Variable=" +
									pulsado_nombre +
									", Tiempo=" +
									pulsado_tiempo +
									", Push atras"
							);
						break;
					case "right":
						$(bloque)
							.find("span.confconte")
							.text(
								": Variable=" +
									pulsado_nombre +
									", Tiempo" +
									pulsado_tiempo +
									", Push derecha"
							);
						break;
					case "left":
						$(bloque)
							.find("span.confconte")
							.text(
								": Variable=" +
									pulsado_nombre +
									", Tiempo" +
									pulsado_tiempo +
									" Push izquierda"
							);
						break;
				}
			}
			break;
	}
	buscaRutaLogica(idActual, principal, datos);
	return bandera;
}
function validaEstructura(bloque, subtipo) {
	/*
	 * NOMBRE: validaEstructura.
	 * UTILIDAD: Valida las entradas del bloque Para.
	 * ENTRADAS: bloque > html del bloque, subtipo > subtipo del bloque.
	 * SALIDAS: bandera > booleano que nos indica si se aceptaron los valores.
	 */
	let bandera = false;
	let datos = "";
	switch (subtipo) {
		case "para":
			let bandera_nombre = false;
			let para_nombre;

			para_nombre = $("#nom_var_for").val();

			let verifica_nom = verificaNombreVar(para_nombre);
			if (verifica_nom[0] === true) {
				bandera_nombre = true;
			} else {
				showMessage(
					verifica_nom[1],
					3,
					true,
					bloqueActual.getAttribute("tipo")
				);
			}
			if (bandera_nombre === true) {
				let para_valor_nombre = $("#val_var_for").val();
				let para_comparacion = $("#comparacion")
					.children("option:selected")
					.val();
				let opc = $("#opcion_variable_para").children("option:selected").val();

				let para_valor_hasta;

				if (opc === "variable_nueva_para") {
					para_valor_hasta = $("#val_com_for").val();
				} else {
					para_valor_hasta = $("#variables_creadas_valor")
						.children("option:selected")
						.text();
				}

				let incremento = $("#incremento").val();
				if (parseInt(incremento) != 0 && para_valor_hasta != "none") {
					bandera = true;

					$(bloque)
						.find("div.d_para_texto")
						.text(
							"(int " +
								para_nombre +
								"=" +
								para_valor_nombre +
								"; " +
								para_nombre +
								para_comparacion +
								para_valor_hasta +
								";" +
								para_nombre +
								"=" +
								para_nombre +
								"+" +
								incremento +
								")"
						);

					datos = verificaPara(
						para_nombre +
							"*" +
							para_valor_nombre +
							";" +
							para_comparacion +
							"*" +
							para_valor_hasta +
							";" +
							incremento
					);
				}
			}
			break;
		default:
			datos = $(".d_pxbpopupcontetextarea").val();
			bandera = true;
			break;
	}
	buscaRutaLogica(idActual, principal, datos);
	return bandera;
}
function validaVariable(bloque, subtipo) {
	/*
	 * NOMBRE: validaVariable.
	 * UTILIDAD: Valida las entradas de todos los bloques que vienen de la pestaña de Variables.
	 * ENTRADAS: bloque > html del bloque, subtipo > subtipo del bloque.
	 * SALIDAS: bandera > booleano que nos indica si se aceptaron los valores.
	 */
	let bandera = false;
	let datos = "";
	switch (subtipo) {
		case "variable":
			let opc = $("#opcion_variable").children("option:selected").val();
			let variable_valor;
			let variable_nombre;
			let variable_tipo;
			let variable_bandera = false;
			let variable_alcance;
			if (opc != "none") {
				if (opc === "crear") {
					//CREAR
					variable_nombre = $.trim($("#variable_nombre").val());
					variable_alcance = $("#opcion_alcance")
						.children("option:selected")
						.val();
					let verifica_nombre = verificaNombreVar(variable_nombre);
					if (verifica_nombre[0] === true) {
						variable_tipo = $("#variable_tipo")
							.children("option:selected")
							.val();
						switch (variable_tipo) {
							case "boolean":
								variable_valor = $("#caja_boleana").val();
								break;
							default:
								variable_valor = $("#caja_valor").val();
						}
						variable_bandera = true;
					}
				} else {
					//USAR
					variable_nombre = $("#var_u").children("option:selected").text();
					variable_valor = $("#var_u").children("option:selected").val();
					variable_tipo = $("#var_u").children("option:selected").attr("tipo");
					variable_alcance = $("#var_u")
						.children("option:selected")
						.attr("alcance");
					variable_bandera = true;
				}
				if (variable_bandera === true) {
					bandera = true;
					datos = verificaVariable(
						variable_nombre +
							";" +
							variable_tipo +
							";" +
							variable_valor +
							";" +
							opc +
							";" +
							variable_alcance
					);
					switch (variable_tipo) {
						case "int":
							variable_tipo = "Entero";
							break;
						case "float":
							variable_tipo = "Flotante";
							break;
						case "boolean":
							variable_tipo = "Booleano";
							break;
						case "char":
							variable_tipo = "Caracter";
							break;
					}
					$(bloque).find("div.d_variable_texto").text(variable_nombre);
				}
			}

			if ($("#opcion_variable").children("option:selected").val() == "none") {
				bandera = false;
			} else {
				if ($("#opcion_variable").children("option:selected").val() == "usar") {
					if (
						$("#var_u").children("option:selected").val() ==
						"Elige una variable"
					) {
						bandera = false;
					}
				} else if (
					$("#opcion_variable").children("option:selected").val() == "crear"
				) {
					if (
						$("#variable_tipo").children("option:selected").val() ==
						"Selecciona una opción"
					) {
						bandera = false;
					} else if (
						$("#variable_tipo").children("option:selected").val() == "boolean"
					) {
						if (
							$("#caja_boleana").children("option:selected").val() ==
							"Selecciona una opción"
						) {
							bandera = false;
						}
					}
					if (
						$(".d_pxbpopupconteinputtext").children("option:selected").val() ==
						""
					) {
						bandera = false;
					}
				}
			}
			break;
		case "valor":
			let valor_tipo = $("#valor_tipo").children("option:selected").val();
			let valor_valor;
			let valor_bandera = false;
			if (valor_tipo != "none") {
				if (valor_tipo === "boolean") {
					valor_valor = $("#valor_b").children("option:selected").val();
					if (valor_valor != "none") {
						valor_bandera = true;
					}
				} else {
					valor_valor = $("#valor_valor").val();
					valor_tipo = $("#valor_tipo").val();
					valor_bandera = true;
				}
			}
			if (valor_bandera === true) {
				bandera = true;
				datos = verificaDato(valor_tipo + ";" + valor_valor);
				switch (valor_tipo) {
					case "int":
						valor_tipo = "Entero";
						break;
					case "float":
						valor_tipo = "Flotante";
						break;
					case "boolean":
						valor_tipo = "Booleano";
						break;
					case "char":
						valor_tipo = "Caracter";
						break;
				}
				$(bloque).find("div.d_variable_texto").text(valor_valor);
			}
			if ($("#valor_tipo").children("option:selected").val() == "int") {
				//Seleccionó Entero
				if ($(".d_pxbpopupconteinputtext").val() == "") {
					bandera = false;
				}
			} else if (
				$("#valor_tipo").children("option:selected").val() == "boolean"
			) {
				//Seleccionó boolean
				if (
					$("#valor_b").children("option:selected").val() ==
					"Selecciona una opción"
				) {
					bandera = false;
				}
			} else {
				//No seleccionó nada
				bandera = false;
			}
			break;
	}
	buscaRutaLogica(idActual, principal, datos);
	console.log("validamethod", principal);
	return bandera;
}
function validaMatematicas(bloque, subtipo) {
	console.log(bloque);
	/*
	 * NOMBRE: validaMatematicas.
	 * UTILIDAD: Valida las entradas de todos los bloques que vienen de la pestaña de Matematicas.
	 * ENTRADAS: bloque > html del bloque, subtipo > subtipo del bloque.
	 * SALIDAS: bandera > booleano que nos indica si se aceptaron los valores.
	 */
	let bandera = true;
	let datos = "";
	let tipo;
	let eleccion;
	let idbloque = $(bloque).attr("id");
	switch (subtipo) {
		case "comparacion":
			tipo = "comparacion";
			eleccion = $("#comparacion_tipo").children("option:selected").val();
			break;
		case "operacion":
			tipo = "operacion";
			eleccion = $("#operacion_tipo").children("option:selected").val();
			break;
	}
	datos = verificaMatematicas(tipo + ";" + eleccion);
	// $(bloque).find("div.d_mat_texto").text(eleccion);
	$("#" + idbloque)
		.children("div.d_mat_texto")
		.text(eleccion);
	buscaRutaLogica(idActual, principal, datos);
	return bandera;
}
function validaValoresEntrada(bloque) {
	/*
	 * NOMBRE: validaValoresEntrada.
	 * UTILIDAD: Segun el tipo de bloque llama a la funcion que validara sus entradas.
	 * ENTRADAS: bloque > html del bloque.
	 * SALIDAS: bandera > booleano que nos indica si se aceptaron los valores.
	 */
	let bandera = false;
	let tipo = $(bloque).attr("tipo");
	let subtipo = $(bloque).attr("subtipo");
	switch (tipo) {
		case "elemento":
			bandera = validaElemento(bloque, subtipo);
			break;
		case "funcion":
			bandera = validaFuncion(bloque, subtipo);
			break;
		case "estructura":
			bandera = validaEstructura(bloque, subtipo);
			break;
		case "variable":
			bandera = validaVariable(bloque, subtipo);
			break;
		case "matematicas":
			bandera = validaMatematicas(bloque, subtipo);
			break;
	}

	return bandera;
}
function nombreExistente(selector) {
	/*
	 * NOMBRE: nombreExistente.
	 * UTILIDAD: Verifica que los nombres de las variables nuevas no esten repetidos o no sean palabras reservadas.
	 * ENTRADAS: selector > input que contiene el nombre.
	 * SALIDAS: Ninguna.
	 */
	let nombre = $(selector).val();
	$.each(pool_de_variables, function () {
		if (this.nombre === nombre) {
			$(selector).val("");
			showMessage(
				"Ese nombre ya existe o esta reservado. Intenta con otro.",
				3
			);
		}
	});

	$.each(nombres_reservados, function () {
		if (this.nombre === nombre) {
			$(selector).val("");
			showMessage(
				"Ese nombre ya existe o esta reservado. Intenta con otro.",
				3
			);
		}
	});
}
function verificaNombreVar(test) {
	/*
	 * NOMBRE: verificaNombreVar.
	 * UTILIDAD: Valida que el nombre de una variable sea correcto.
	 * ENTRADAS: test > String con el nombre a checar.
	 * SALIDAS: bandera > booleano que nos indica si se aceptaron los valores.
	 */
	let bandera = true;
	let error = "";
	if (
		(test.charCodeAt(0) > 64 && test.charCodeAt(0) < 91) ||
		(test.charCodeAt(0) > 96 && test.charCodeAt(0) < 123)
	) {
		let code;
		for (let i = 0; i < test.length; i++) {
			code = test.charCodeAt(i);
			if (
				!(code > 47 && code < 58) && // Numeros (0-9)
				!(code > 64 && code < 91) && // Mayusculas (A-Z)
				!(code > 96 && code < 123)
			) {
				// Minusculas (a-z)
				bandera = false;
				error =
					"El nombre de la variable debe contener caracteres alfanuméricos.";
			}
		}
	} else {
		bandera = false;
		error = "El nombre de la variable debe iniciar con una letra.";
	}

	return [bandera, error];
}
