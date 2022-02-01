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
var editorCode; //Guarda objeto que pinta codigo en pantalla
var principal = []; //Arreglo que contendra la estructura logica del programa de bloques
var nombres_reservados = [
	{ nombre: "led1" },
	{ nombre: "led2" },
	{ nombre: "led0" },
	{ nombre: "rgb1" },
	{ nombre: "rgb2" },
	{ nombre: "rgb3" },
	{ nombre: "R" },
	{ nombre: "G" },
	{ nombre: "B" },
	{ nombre: "zumbador_8" },
	{ nombre: "M0" },
	{ nombre: "M1D" },
	{ nombre: "M1I" },
	{ nombre: "M2D" },
	{ nombre: "M2I" },
	{ nombre: "push1" },
];
var pinesUno = [];
var pool_variables_push = [];
var pool_variables_predefinidas = [];
var pool_de_variables = [];
var bandera_motor;
var elemento_previo;
var bandera_pulso_led;
var bandera_pulso_rgb;
var bandera_pulso_zum;
var bandera_pulso_motor;
var bandera_codigo = false;
var doc; //Variable para almacenar el documento XML
var no, bre_archivo;
var xml;
var nombre_estructura;
var datosPush = {
	variable: "",
	setup: ""
};
/*************************************************************************************
 *
 * 								FUNCIONES Y PROCEDIMIENTOS
 *
 **************************************************************************************/
$(document).ready(function () {});
$(window).resize(function () {});
$(window).on("load", function () {
	inicializaPines();
});
$(window).on("orientationchange", function (event) {});
//No es relavante mientras no se manejen distintos Shields
function inicializaPines(tipo) {
	//Son digitales
	for (let i = 0; i < 14; i++) {
		pinesUno.push({
			pin: String(i), //Tipo entero
			disponible: true,
			total: 0,
			otro: "",
		});
	}
	for (let i = 0; i < 6; i++) {
		pinesUno.push({
			pin: "A" + String(i), //Tipo entero
			disponible: true,
			total: 0,
			otro: "",
		});
	}
}
/*********************************************************/
function viewCode(getId) {
	/*
	 * NOMBRE: viewCode.
	 * UTILIDAD: Abre vista de codigo
	 * ENTRADAS: getId > obtiene el id del btn presionado.
	 * SALIDAS: Ninguna.
	 */
	var getName = getId.split("btn")[1]; //Obtiene id de btn presionado
	viewActions(getName); //Muestra y agrega datos a la vista que se selecciono
	addCode(); //Agrega codigo del textarea con code mirror
	bandera_codigo = true;
}
function addCode() {
	/*
	 * NOMBRE: viewCode.
	 * UTILIDAD: Agrega codigo del textarea con code mirror
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	editorCode; //Limpia la variable
	$("#d_pxbviewprintcode").find("div").remove(); //Quita div creado a partir de un textarea
	editorCode = CodeMirror.fromTextArea(
		document.getElementById("d_pxbviewgetcode"),
		{
			//Agrega codigo desde un textarea en el html
			mode: "clike",
			styleActiveLine: true,
			//theme: "base16-light",
			lineNumbers: true,
			autoRefresh: true,
			//readOnly: true
		}
	);
	editorCode.save();
}
function refrescaCodigo(cadena) {
	/*
	 * NOMBRE: refrescaCodigo.
	 * UTILIDAD: Refresca Codemirror con el codigo generado.
	 * ENTRADAS: cadena > String con el codigo Arduino generado.
	 * SALIDAS: Ninguna.
	 */
	editorCode.setValue(cadena);
	editorCode.save();
	editorCode.refresh();
}
function creaYActualiza() {
	/*
	 * NOMBRE: creaYAactualiza.
	 * UTILIDAD: Llama a la funcion que genera el codigo Arduino y a la funcion que "refresca" Codemirror.
	 * ENTRADAS: Ninguno.
	 * SALIDAS: Ninguna.
	 */
	let codigo = generaCodigo(principal);
	$("#d_pxbviewgetcode").text(codigo);
	if (bandera_codigo) {
		refrescaCodigo(codigo);
	}
}
function verificaLed(led) {
	/*
	 * NOMBRE: verificaLed.
	 * UTILIDAD: Asigna los valores seleccionados del bloque a su contraparte logica.
	 * ENTRADAS: led > Array con los valores del bloque.
	 * SALIDAS: auxiliar > objeto que se asignara al "contenido" del bloque logico.
	 */
	let led_contenido = led.split(";");

	let auxiliar = {
		nombre: "led_" + led_contenido[2],
		color: led_contenido[0],
		estado: led_contenido[1],
		pin: led_contenido[2],
	};

	return auxiliar;
}
function verificaRGB(rgb) {
	/*
	 * NOMBRE: verificaRGB.
	 * UTILIDAD: Asigna los valores seleccionados del bloque a su contraparte logica.
	 * ENTRADAS: led > Array con los valores del bloque.
	 * SALIDAS: auxiliar > objeto que se asignara al "contenido" del bloque logico.
	 */
	let rgb_contenido = rgb.split(";");

	let colores = rgb_contenido[0].split(",");

	let auxiliar = {
		nombre: "",
		colorR: colores[0].substring(4),
		colorG: colores[1],
		colorB: colores[2].slice(0, -1),
		estado: rgb_contenido[1],
		pinR: rgb_contenido[2],
		pinG: rgb_contenido[3],
		pinB: rgb_contenido[4],
		color: rgb_contenido[6],
	};

	if (rgb_contenido[5] === "1") {
		auxiliar.nombre = "rgb1";
	} else if (rgb_contenido[5] === "2") {
		auxiliar.nombre = "rgb2";
	} else {
		auxiliar.nombre = "rgb3";
	}

	return auxiliar;
}
function verificaZumbador(zumbador) {
	/*
	 * NOMBRE: verificaZumbador.
	 * UTILIDAD: Asigna los valores seleccionados del bloque a su contraparte logica.
	 * ENTRADAS: zumbador > Array con los valores del bloque.
	 * SALIDAS: auxiliar > objeto que se asignara al "contenido" del bloque logico.
	 */
	let zum_contenido = zumbador.split(";");

	let auxiliar = {
		nombre: "zumbador_" + zum_contenido[3],
		pin: zum_contenido[3],
		frecuencia: zum_contenido[0],
		estado: zum_contenido[1],
		duracion: zum_contenido[2],
	};

	return auxiliar;
}
function verificaMotor(motor) {
	/*
	 * NOMBRE: verificaMotor.
	 * UTILIDAD: Asigna los valores seleccionados del bloque a su contraparte logica.
	 * ENTRADAS: motor > Array con los valores del bloque.
	 * SALIDAS: auxiliar > objeto que se asignara al "contenido" del bloque logico.
	 */
	let motor_contenido = motor.split(";");

	let auxiliar = {
		nombre: motor_contenido[0],
		varMotorR: "",
		varMotorL: "",
		varMotorH: "M0",
		pinR: "",
		pinL: "",
		pinH: "5",
		//para encenderlo se necesita habilitar el pin 5
		//para el motor_1 son 3 y 4
		// para el motor_2 son 6 y 7
		direccion: motor_contenido[1],
	};

	if (motor_contenido[0] === "motor_1") {
		auxiliar.pinR = "4";
		auxiliar.pinL = "3";
		(auxiliar.varMotorR = "M1D"), (auxiliar.varMotorL = "M1I");
	} else {
		auxiliar.pinR = "7";
		auxiliar.pinL = "6";
		(auxiliar.varMotorR = "M2D"), (auxiliar.varMotorL = "M2I");
	}

	return auxiliar;
}
function verificaPush(push) {
	/*
	 * NOMBRE: verificaPush.
	 * UTILIDAD: Asigna los valores seleccionados del bloque a su contraparte logica.
	 * ENTRADAS: push > Array con los valores del bloque.
	 * SALIDAS: auxiliar > objeto que se asignara al "contenido" del bloque logico.
	 */
	let push_contenido = push.split(";");

	let auxiliar = {
		nombre: "pushButton_" + push_contenido[0],
		pin: push_contenido[0],
		boton: push_contenido[0],
		estado: push_contenido[1],
	};

	return auxiliar;
}
function verificaDelay(delay) {
	/*
	 * NOMBRE: verificaDelay.
	 * UTILIDAD: Asigna los valores seleccionados del bloque a su contraparte logica.
	 * ENTRADAS: delay > Array con los valores del bloque.
	 * SALIDAS: auxiliar > objeto que se asignara al "contenido" del bloque logico.
	 */
	let delay_contenido = delay;

	let auxiliar = {
		tiempo: delay_contenido,
	};

	return auxiliar;
}
function verificaPulso(pulso) {
	/*
	 * NOMBRE: verificaPulso.
	 * UTILIDAD: Asigna los valores seleccionados del bloque a su contraparte logica.
	 * ENTRADAS: pulso > Array con los valores del bloque.
	 * SALIDAS: auxiliar > objeto que se asignara al "contenido" del bloque logico.
	 */
	let pulso_contenido = pulso.split(";");

	let auxiliar = {
		segundos: pulso_contenido[0],
		repeticiones: pulso_contenido[1],
	};

	return auxiliar;
}
function verificaPulsado(pulsado) {
	/*
	 * NOMBRE: verificaPulsado.
	 * UTILIDAD: Asigna los valores seleccionados del bloque a su contraparte logica.
	 * ENTRADAS: pulsado > Array con los valores del bloque.
	 * SALIDAS: auxiliar > objeto que se asignara al "contenido" del bloque logico.
	 */
	let pulsado_contenido = pulsado.split(";");

	let auxiliar = {
		nombre: pulsado_contenido[0],
		pin: "",
		estado: pulsado_contenido[2],
		tiempo: pulsado_contenido[3],
		tipo: "unsigned long",
		valor: "0",
	};

	switch (pulsado_contenido[1]) {
		case "up":
			auxiliar.pin = "11";
			break;
		case "down":
			auxiliar.pin = "12";
			break;
		case "right":
			auxiliar.pin = "13";
			break;
		case "left":
			auxiliar.pin = "A5";
			break;
	}

	return auxiliar;
}
function verificaPara(caja) {
	/*
	 * NOMBRE: verificaPara.
	 * UTILIDAD: Asigna los valores seleccionados del bloque a su contraparte logica.
	 * ENTRADAS: cajo > Array con los valores del bloque.
	 * SALIDAS: auxiliar > objeto que se asignara al "contenido" del bloque logico.
	 */
	let parametros = caja.split(";");

	let para = parametros[0].split("*");
	let hasta = parametros[1].split("*");

	let auxiliar = {
		nombre: para[0],
		valor_inicial: para[1],
		valor_final: hasta[1],
		comparacion: hasta[0],
		incremento: parametros[2],
	};

	return auxiliar;
}
function verificaVariable(variable) {
	/*
	 * NOMBRE: verificaVariable.
	 * UTILIDAD: Asigna los valores seleccionados del bloque a su contraparte logica.
	 * ENTRADAS: variable > Array con los valores del bloque.
	 * SALIDAS: auxiliar > objeto que se asignara al "contenido" del bloque logico.
	 */
	let var_contenido = variable.split(";");

	let auxiliar = {
		nombre: var_contenido[0],
		tipo: var_contenido[1],
		valor: var_contenido[2],
		opcion: var_contenido[3],
		alcance: var_contenido[4],
	};

	return auxiliar;
}
function verificaDato(dato) {
	/*
	 * NOMBRE: verificaDato.
	 * UTILIDAD: Asigna los valores seleccionados del bloque a su contraparte logica.
	 * ENTRADAS: dato > Array con los valores del bloque.
	 * SALIDAS: auxiliar > objeto que se asignara al "contenido" del bloque logico.
	 */
	let dato_contenido = dato.split(";");

	let auxiliar = {
		tipo: dato_contenido[0],
		valor: dato_contenido[1],
	};
	return auxiliar;
}
function verificaMatematicas(caja) {
	/*
	 * NOMBRE: verificaMatematicas.
	 * UTILIDAD: Asigna los valores seleccionados del bloque a su contraparte logica.
	 * ENTRADAS: caja > Array con los valores del bloque.
	 * SALIDAS: auxiliar > objeto que se asignara al "contenido" del bloque logico.
	 */
	let caja_contenido = caja.split(";");

	let auxiliar = {
		tipo: caja_contenido[0],
		eleccion: caja_contenido[1],
	};

	return auxiliar;
}

/*****************************/
//Codigo que genera mas codigo
/*****************************/

function generaCodigo(orden) {
	/*
	 * NOMBRE: generaCodigo.
	 * UTILIDAD: Genera el codigo Arduino.
	 * ENTRADAS: orden > Array con de los objetos bloques.
	 * SALIDAS: codigo > String con el codigo Arduino generado.
	 */

	//Se resetean las variables globales
	pool_variables_predefinidas = [];
	pool_de_variables = [];
	bandera_motor = false;
	bandera_pulso_led = false;
	bandera_pulso_rgb = false;
	bandera_pulso_zum = false;
	bandera_pulso_motor = false;
	elemento_previo = { tipo: "" };

	let variables = "//*****DECLARACION DE VARIABLES*****\n\n";

	let setup = "\n//********ENTRADAS Y SALIDAS********\n" + "\nvoid setup(){\n";

	let main_loop =
		"\n//********PROGRAMA PRINCIPAL********\n" + "\nvoid loop(){\n";

	let otro = "\n//*******FUNCIONES ADICIONALES******\n\n";
	let codigo = "";

	orden.forEach((item, i) => {
		if (item.contenido != false || item.tipo === "estructura") {
			let dato = generaCodigoElemento(item);

			elemento_previo = item;

			variables = variables + dato.variable ;
			setup = setup + dato.setup;
			main_loop = main_loop + dato.loop;
			otro = otro + dato.otro;
		}
	});
	setup = setup + datosPush.setup + "}\n";
	main_loop = main_loop + "}\n";

	codigo = variables + datosPush.variable + setup + main_loop + otro;

	return codigo;
}
function verificaDuplicado(nombre, pool) {
	/*
	 * NOMBRE: verificaDuplicado.
	 * UTILIDAD: Verifica si hay bloques duplicados, verifica nombres de variables ya existentes.
	 * ENTRADAS: nomnbre > nombre del bloque, pool > array donde se va a buscar.
	 * SALIDAS: existe > Boolean que indica si existe o no.
	 */
	let existe = false;

	$.each(pool, function () {
		if (this.nombre === nombre) {
			existe = true;
			return false;
		}
	});

	return existe;
}
function generaCodigoElemento(elemento) {
	/*
	 * NOMBRE: generaCodigoElemento.
	 * UTILIDAD: Genera el codigo Arduino segun el bloque.
	 * ENTRADAS: elemento > Objeto bloque.
	 * SALIDAS: datos > Objeto que contiene el codigo arduino parcial del bloque.
	 */

	let sangria = calculaSangria(parseInt(elemento.nivel));
	let var_duplicada = false;

	let datos = {
		variable: "",
		setup: "",
		loop: "",
		otro: "",
		existe: verificaDuplicado(
			elemento.contenido.nombre,
			pool_variables_predefinidas
		),
	};

	if (datos.existe === false && elemento.tipo === "elemento") {
		pool_variables_predefinidas.push({ nombre: elemento.contenido.nombre });
	}

	if (elemento.subtipo === "variable" || elemento.subtipo === "pulsado") {
		var_duplicada = verificaDuplicado(
			elemento.contenido.nombre,
			pool_de_variables
		);

		if (!var_duplicada) {
			pool_de_variables.push({
				nombre: elemento.contenido.nombre,
				tipo: elemento.contenido.tipo,
				subtipo: elemento.contenido.subtipo,
				valor: elemento.contenido.valor,
				alcance: elemento.contenido.alcance,
			});
		}
	}

	if (elemento.tipo === "estructura") {
		let cadena_condicion = "";
		let condicion = "";

		if (elemento.contenido_condicion.length > 0) {
			// if(elemento.contenido_condicion[0].subtipo === 'push' && elemento.contenido_condicion[0].contenido != false){
			//   if(!verificaDuplicado(elemento.contenido_condicion[0].contenido.nombre,pool_variables_predefinidas)){
			//     pool_variables_predefinidas.push({nombre:elemento.contenido_condicion[0].contenido.nombre});
			//     datos.variable = "int " + elemento.contenido_condicion[0].contenido.nombre + " = " + elemento.contenido_condicion[0].contenido.pin + ";\n"
			//     datos.setup = "\tpinMode(" + elemento.contenido_condicion[0].contenido.nombre + ",INPUT);\n";
			//   }
			// }
			condicion = verificaCondicion(elemento.contenido_condicion[0]);
		}

		if (elemento.contenido_entonces.length > 0) {
			$.each(elemento.contenido_entonces, function (indice, bloque) {
				if (bloque.contenido != false || bloque.tipo === "estructura") {
					let dato = generaCodigoElemento(bloque);

					elemento_previo = bloque;

					datos.variable = datos.variable + dato.variable;
					datos.setup = datos.setup + dato.setup;
					datos.loop = datos.loop + dato.loop;
					datos.otro = datos.otro + dato.otro;
				}
			});
		}

		switch (elemento.subtipo) {
			case "si":
				cadena_condicion = sangria + "if(";

				cadena_condicion = cadena_condicion + condicion + "){\n";

				datos.loop = cadena_condicion + datos.loop + sangria + "}\n";
				break;
			case "si_otro":
				cadena_condicion = sangria + "if(";

				cadena_condicion = cadena_condicion + condicion + "){\n";

				datos.loop = cadena_condicion + datos.loop + sangria + "}else{\n";

				if (elemento.contenido_otro.length > 0) {
					$.each(elemento.contenido_otro, function (indice, bloque) {
						if (bloque.contenido != false || bloque.tipo === "estructura") {
							let dato = generaCodigoElemento(bloque);

							elemento_previo = bloque;

							datos.variable = datos.variable + dato.variable;
							datos.setup = datos.setup + dato.setup;
							datos.loop = datos.loop + dato.loop;
							datos.otro = datos.otro + dato.otro;
						}
					});
				}

				datos.loop = datos.loop + sangria + "}\n";
				break;
			case "mientras":
				cadena_condicion = sangria + "while(";

				cadena_condicion = cadena_condicion + condicion + "){\n";

				datos.loop = cadena_condicion + datos.loop + sangria + "}\n";
				break;
			case "haz":
				cadena_condicion = sangria + "}while(";

				cadena_condicion = cadena_condicion + condicion + ");\n";

				datos.loop = sangria + "do{\n" + datos.loop + cadena_condicion;
				break;
			case "para":
				cadena_condicion = sangria + "for(";
				if (elemento.contenido != false) {
					condicion = verificaCondicion(elemento);
				}
				cadena_condicion = cadena_condicion + condicion + "){\n";

				datos.loop = cadena_condicion + datos.loop + sangria + "}\n";
				break;
		}
	} else {
		switch (elemento.subtipo) {
			case "led":
				if (datos.existe === false) {
					datos.variable =
						"int " +
						elemento.contenido.nombre +
						" = " +
						elemento.contenido.pin +
						";\n";
					datos.setup =
						"\tpinMode(" + elemento.contenido.nombre + ",OUTPUT);\n";
				}

				datos.loop =
					sangria +
					"digitalWrite(" +
					elemento.contenido.nombre +
					"," +
					elemento.contenido.estado +
					");\n";

				break;
			case "rgb":
				if (datos.existe === false) {
					if (elemento.contenido.nombre === "rgb1") {
						datos.variable =
							"#define R1 " +
							elemento.contenido.pinR +
							"\n" +
							"#define G1 " +
							elemento.contenido.pinG +
							"\n" +
							"#define B1 " +
							elemento.contenido.pinB +
							"\n";

						datos.setup =
							"\tpinMode(R1, OUTPUT);\n" +
							"\tpinMode(G1, OUTPUT);\n" +
							"\tpinMode(B1, OUTPUT);\n";

						datos.otro =
							"//FUNCION QUE CONTROLA EL RGB1\n" +
							"void rgb1(int colorR ,int colorG ,int colorB){\n" +
							"\tanalogWrite(R1, colorR);\n" +
							"\tanalogWrite(G1, colorG);\n" +
							"\tanalogWrite(B1, colorB);\n}\n";
					} else if (elemento.contenido.nombre === "rgb2") {
						datos.variable =
							"#define R2 " +
							elemento.contenido.pinR +
							"\n" +
							"#define G2 " +
							elemento.contenido.pinG +
							"\n" +
							"#define B2 " +
							elemento.contenido.pinB +
							"\n";

						datos.setup =
							"\tpinMode(R2, OUTPUT);\n" +
							"\tpinMode(G2, OUTPUT);\n" +
							"\tpinMode(B2, OUTPUT);\n";

						datos.otro =
							"//FUNCION QUE CONTROLA EL RGB2\n" +
							"void rgb2(int colorR ,int colorG ,int colorB){\n" +
							"\tanalogWrite(R2, colorR);\n" +
							"\tanalogWrite(G2, colorG);\n" +
							"\tanalogWrite(B2, colorB);\n}\n";
					} else {
						datos.variable =
							"#define R3 " +
							elemento.contenido.pinR +
							"\n" +
							"#define G3 " +
							elemento.contenido.pinG +
							"\n" +
							"#define B3 " +
							elemento.contenido.pinB +
							"\n";

						datos.setup =
							"\tpinMode(R3, OUTPUT);\n" +
							"\tpinMode(G3, OUTPUT);\n" +
							"\tpinMode(B3, OUTPUT);\n";

						datos.otro =
							"//FUNCION QUE CONTROLA EL RGB3\n" +
							"void rgb3(int colorR ,int colorG ,int colorB){\n" +
							"\tanalogWrite(R3, colorR);\n" +
							"\tanalogWrite(G3, colorG);\n" +
							"\tanalogWrite(B3, colorB);\n}\n";
					}
				}

				if (elemento.contenido.color === "otro") {
					if (elemento.contenido.nombre === "rgb1") {
						datos.loop = datos.loop + sangria + "//RGB1\n";
						if (elemento.contenido.estado === "LOW") {
							datos.loop = datos.loop + sangria + "rgb1(0,0,0);\n";
						} else {
							if (
								parseInt(elemento.contenido.colorR) != -1 &&
								elemento.contenido.estado === "HIGH"
							) {
								datos.loop =
									datos.loop +
									sangria +
									"analogWrite(R1, " +
									elemento.contenido.colorR +
									");\n";
							}
							if (
								parseInt(elemento.contenido.colorG) != -1 &&
								elemento.contenido.estado === "HIGH"
							) {
								datos.loop =
									datos.loop +
									sangria +
									"analogWrite(G1, " +
									elemento.contenido.colorG +
									");\n";
							}
							if (
								parseInt(elemento.contenido.colorB) != -1 &&
								elemento.contenido.estado === "HIGH"
							) {
								datos.loop =
									datos.loop +
									sangria +
									"analogWrite(B1, " +
									elemento.contenido.colorB +
									");\n";
							}
						}
					} else if (elemento.contenido.nombre === "rgb2") {
						datos.loop = datos.loop + sangria + "//RGB2\n";
						if (elemento.contenido.estado === "LOW") {
							datos.loop = datos.loop + sangria + "rgb2(0,0,0);\n";
						} else {
							if (
								parseInt(elemento.contenido.colorR) != -1 &&
								elemento.contenido.estado === "HIGH"
							) {
								datos.loop =
									datos.loop +
									sangria +
									"analogWrite(R2, " +
									elemento.contenido.colorR +
									");\n";
							}
							if (
								parseInt(elemento.contenido.colorG) != -1 &&
								elemento.contenido.estado === "HIGH"
							) {
								datos.loop =
									datos.loop +
									sangria +
									"analogWrite(G2, " +
									elemento.contenido.colorG +
									");\n";
							}
							if (
								parseInt(elemento.contenido.colorB) != -1 &&
								elemento.contenido.estado === "HIGH"
							) {
								datos.loop =
									datos.loop +
									sangria +
									"analogWrite(B2, " +
									elemento.contenido.colorB +
									");\n";
							}
						}
					} else {
						datos.loop = datos.loop + sangria + "//RGB3\n";
						if (elemento.contenido.estado === "LOW") {
							datos.loop = datos.loop + sangria + "rgb3(0,0,0);\n";
						} else {
							if (
								parseInt(elemento.contenido.colorR) != -1 &&
								elemento.contenido.estado === "HIGH"
							) {
								datos.loop =
									datos.loop +
									sangria +
									"analogWrite(R3, " +
									elemento.contenido.colorR +
									");\n";
							}
							if (
								parseInt(elemento.contenido.colorG) != -1 &&
								elemento.contenido.estado === "HIGH"
							) {
								datos.loop =
									datos.loop +
									sangria +
									"analogWrite(G3, " +
									elemento.contenido.colorG +
									");\n";
							}
							if (
								parseInt(elemento.contenido.colorB) != -1 &&
								elemento.contenido.estado === "HIGH"
							) {
								datos.loop =
									datos.loop +
									sangria +
									"analogWrite(B3, " +
									elemento.contenido.colorB +
									");\n";
							}
						}
					}
				} else {
					if (elemento.contenido.estado === "HIGH") {
						if (elemento.contenido.nombre === "rgb1") {
							datos.loop =
								sangria +
								"rgb1(" +
								elemento.contenido.colorR +
								"," +
								elemento.contenido.colorG +
								"," +
								elemento.contenido.colorB +
								");\n";
						} else if (elemento.contenido.nombre === "rgb2") {
							datos.loop =
								sangria +
								"rgb2(" +
								elemento.contenido.colorR +
								"," +
								elemento.contenido.colorG +
								"," +
								elemento.contenido.colorB +
								");\n";
						} else {
							datos.loop =
								sangria +
								"rgb3(" +
								elemento.contenido.colorR +
								"," +
								elemento.contenido.colorG +
								"," +
								elemento.contenido.colorB +
								");\n";
						}
					} else {
						if (elemento.contenido.nombre === "rgb1") {
							datos.loop = sangria + "rgb1(0,0,0);\n";
						} else if (elemento.contenido.nombre === "rgb2") {
							datos.loop = sangria + "rgb2(0,0,0);\n";
						} else {
							datos.loop = sangria + "rgb3(0,0,0);\n";
						}
					}
				}

				break;
			case "zumbador":
				if (datos.existe === false) {
					datos.variable =
						"int " +
						elemento.contenido.nombre +
						" = " +
						elemento.contenido.pin +
						";\n";
					datos.setup =
						"\tpinMode(" + elemento.contenido.nombre + ",OUTPUT);\n";
				}

				if (elemento.contenido.estado === "HIGH") {
					if (elemento.contenido.duracion === "0") {
						datos.loop =
							sangria +
							"tone(" +
							elemento.contenido.nombre +
							"," +
							elemento.contenido.frecuencia +
							");\n";
					} else {
						datos.loop =
							sangria +
							"tone(" +
							elemento.contenido.nombre +
							"," +
							elemento.contenido.frecuencia +
							"," +
							elemento.contenido.duracion +
							");\n";
					}
				} else {
					datos.loop = sangria + "noTone(" + elemento.contenido.nombre + ");\n";
				}
				break;
			case "motor":
				if (bandera_motor === false) {
					datos.variable =
						"#define " +
						elemento.contenido.varMotorH +
						" " +
						elemento.contenido.pinH +
						"\n";
					datos.setup =
						"\tpinMode(" + elemento.contenido.varMotorH + ",OUTPUT);\n";
					datos.loop =
						sangria +
						"//SE PREPARAN LOS MOTORES\n" +
						sangria +
						"digitalWrite(" +
						elemento.contenido.varMotorH +
						",HIGH);\n";
					bandera_motor = true;
				}
				if (datos.existe === false) {
					datos.variable =
						datos.variable +
						"#define " +
						elemento.contenido.varMotorR +
						" " +
						elemento.contenido.pinR +
						"\n" +
						"#define " +
						elemento.contenido.varMotorL +
						" " +
						elemento.contenido.pinL +
						"\n";

					datos.setup =
						datos.setup +
						"\tpinMode(" +
						elemento.contenido.varMotorR +
						",OUTPUT);\n" +
						"\tpinMode(" +
						elemento.contenido.varMotorL +
						",OUTPUT);\n";
				}

				datos.loop =
					datos.loop + sangria + "//" + elemento.contenido.nombre + "\n";
				switch (elemento.contenido.direccion) {
					case "right":
						datos.loop =
							datos.loop +
							sangria +
							"digitalWrite(" +
							elemento.contenido.varMotorR +
							",HIGH);\n" +
							sangria +
							"digitalWrite(" +
							elemento.contenido.varMotorL +
							",LOW);\n";
						break;
					case "left":
						datos.loop =
							datos.loop +
							sangria +
							"digitalWrite(" +
							elemento.contenido.varMotorR +
							",LOW);\n" +
							sangria +
							"digitalWrite(" +
							elemento.contenido.varMotorL +
							",HIGH);\n";
						break;
					case "stop":
						datos.loop =
							datos.loop +
							sangria +
							"digitalWrite(" +
							elemento.contenido.varMotorR +
							",LOW);\n" +
							sangria +
							"digitalWrite(" +
							elemento.contenido.varMotorL +
							",LOW);\n";
						break;
				}

				break;
			case "push":
				// console.log(elemento);
				// datos.loop = sangria + "//Un bloque Push Button solo puede ir dentro de una Condición";
				break;
			case "delay":
				datos.loop = sangria + "delay(" + elemento.contenido.tiempo + ");\n";
				break;
			case "break":
				datos.loop = sangria + "break;\n";
				break;
			case "pulso":
				switch (elemento_previo.subtipo) {
					case "led":
						if (bandera_pulso_led === false) {
							datos.otro =
								"//FUNCION QUE SIMULA UN PULSO EN LEDS\n" +
								"void pulsoLed(int led,int segundos,int repeticiones){\n" +
								"\tfloat segundo = 1000;\n" +
								"\tfloat aux = segundo/repeticiones;\n" +
								"\tint tiempo = (int) aux/2;\n" +
								"\tfor(int i=0; i<segundos;i++){\n" +
								"\t\tfor(int j=0; j<repeticiones;j++){\n" +
								"\t\t\tdigitalWrite(led,HIGH);\n" +
								"\t\t\tdelay(tiempo);\n" +
								"\t\t\tdigitalWrite(led,LOW);\n" +
								"\t\t\tdelay(tiempo);\n" +
								"\t\t}\n" +
								"\t}\n" +
								"}\n";

							bandera_pulso_led = true;
						}

						datos.loop =
							sangria +
							"pulsoLed(" +
							elemento_previo.contenido.nombre +
							"," +
							elemento.contenido.segundos +
							"," +
							elemento.contenido.repeticiones +
							");\n";
						break;
					case "rgb":
						if (bandera_pulso_rgb === false) {
							datos.otro =
								"//FUNCION QUE SIMULA UN PULSO EN RGB\n" +
								"void pulsoRGB(int cR, int cG, int cB, int segundos,int repeticiones){\n" +
								"\tfloat segundo = 1000;\n" +
								"\tfloat aux = segundo/repeticiones;\n" +
								"\tint tiempo = (int) aux/2;\n" +
								"\tfor(int i=0; i<segundos;i++){\n" +
								"\t\tfor(int j=0; j<repeticiones;j++){\n" +
								"\t\t\trgb(cR,cG,cB);\n" +
								"\t\t\tdelay(tiempo);\n" +
								"\t\t\trgb(0,0,0);\n" +
								"\t\t\tdelay(tiempo);\n" +
								"\t\t}\n" +
								"\t}\n" +
								"}\n";

							bandera_pulso_rgb = true;
						}

						datos.loop =
							sangria +
							"pulsoRGB(" +
							elemento_previo.contenido.colorR +
							"," +
							elemento_previo.contenido.colorG +
							"," +
							elemento_previo.contenido.colorB +
							"," +
							elemento.contenido.segundos +
							"," +
							elemento.contenido.repeticiones +
							");\n";

						break;
					case "zumbador":
						if (bandera_pulso_zum === false) {
							datos.otro =
								"//FUNCION QUE SIMULA UN PULSO EN ZUMBADOR\n" +
								"void pulsoZumbador(int frecuencia,int segundos,int repeticiones){\n" +
								"\tfloat segundo = 1000;\n" +
								"\tfloat aux = segundo/repeticiones;\n" +
								"\tint tiempo = (int) aux/2;\n" +
								"\tfor(int i=0; i<segundos;i++){\n" +
								"\t\tfor(int j=0; j<repeticiones;j++){\n" +
								"\t\t\ttone(" +
								elemento_previo.contenido.nombre +
								",frecuencia);\n" +
								"\t\t\tdelay(tiempo);\n" +
								"\t\t\tnoTone(" +
								elemento_previo.contenido.nombre +
								");\n" +
								"\t\t\tdelay(tiempo);\n" +
								"\t\t}\n" +
								"\t}\n" +
								"}\n";

							bandera_pulso_zum = true;
						}

						datos.loop =
							sangria +
							"pulsoZumbador(" +
							elemento_previo.contenido.nombre +
							"," +
							elemento.contenido.segundos +
							"," +
							elemento.contenido.repeticiones +
							");\n";
						break;
					case "motor":
						if (bandera_pulso_motor === false) {
							datos.otro =
								"//FUNCION QUE SIMULA UN PULSO EN MOTORES\n" +
								"void pulsoMotor(int MD,int MI,int sentido,int segundos,int repeticiones){\n" +
								"\tfloat segundo = 1000;\n" +
								"\tfloat aux = segundo/repeticiones;\n" +
								"\tint tiempo = (int) aux/2;\n" +
								"\tint mDer,mIzq;\n" +
								"\tif(sentido == 0){\n" +
								"\t\tmDer = 1;\n" +
								"\t\tmIzq = 0;\n" +
								"\t}else{\n" +
								"\t\tmDer = 0;\n" +
								"\t\tmIzq = 1;\n" +
								"\t}\n" +
								"\tfor(int i=0; i<segundos;i++){\n" +
								"\t\tfor(int j=0; j<repeticiones;j++){\n" +
								"\t\t\tdigitalWrite(" +
								elemento_previo.contenido.varMotorR +
								",mDer);\n" +
								"\t\t\tdigitalWrite(" +
								elemento_previo.contenido.varMotorL +
								",mIzq);\n" +
								"\t\t\tdelay(tiempo);\n" +
								"\t\t\tdigitalWrite(" +
								elemento_previo.contenido.varMotorR +
								",LOW);\n" +
								"\t\t\tdigitalWrite(" +
								elemento_previo.contenido.varMotorL +
								",LOW);\n" +
								"\t\t\tdelay(tiempo);\n" +
								"\t\t}\n" +
								"\t}\n" +
								"}\n";

							bandera_pulso_motor = true;
						}

						let sentido;
						switch (elemento_previo.contenido.direccion) {
							case "right":
								sentido = 0;
								break;
							case "left":
								sentido = 1;
								break;
							default:
								sentido = 0;
						}
						datos.loop =
							sangria +
							"pulsoMotor(" +
							elemento_previo.contenido.varMotorR +
							"," +
							elemento_previo.contenido.varMotorL +
							"," +
							sentido +
							"," +
							elemento.contenido.segundos +
							"," +
							elemento.contenido.repeticiones +
							");\n";

						break;
					default:
						datos.loop = sangria + "//No hay un bloque anterior activo.\n";
				}
				break;
			case "pulsado":
				if (var_duplicada === false) {
					datos.variable =
						elemento.contenido.tipo + " " + elemento.contenido.nombre + ";\n";
				}
				datos.loop =
					sangria +
					elemento.contenido.nombre +
					" = pulseIn(" +
					elemento.contenido.pin +
					"," +
					elemento.contenido.estado +
					"," +
					parseInt(elemento.contenido.tiempo) * 1000000 +
					");\n";
				break;
			case "variable":
				if (var_duplicada === false) {
					if (elemento.contenido.alcance === "global") {
						datos.variable =
							elemento.contenido.tipo +
							" " +
							elemento.contenido.nombre +
							" = " +
							elemento.contenido.valor +
							";\n";
					} else {
						datos.loop =
							sangria +
							elemento.contenido.tipo +
							" " +
							elemento.contenido.nombre +
							" = " +
							elemento.contenido.valor +
							";\n";
					}
					//datos.variable = elemento.contenido.tipo + " " + elemento.contenido.nombre + ";\n"
				}

				break;
			case "operacion":
				let operaciones = verificaOperacion(elemento);
				datos.loop = sangria + operaciones.slice(1, -1) + ";\n";
				break;
			/********************************************************/
		}
	}

	return datos;
}
function verificaOperacion(bloque) {
	/*
	 * NOMBRE: verificaOperacion.
	 * UTILIDAD: Genera el codigo de las operaciones fuera de las condiciones.
	 * ENTRADAS: bloque > objeto.
	 * SALIDAS: String con la operacion.
	 */
	let operacion = "";
	let banderaB = false;
	if (bloque.contenido != false) {
		let eleccion = bloque.contenido.eleccion;

		let antes = bloque.contenido_condicion;
		if (antes.length === 1) {
			switch (antes[0].subtipo) {
				case "valor":
					operacion = antes[0].contenido.valor;
					break;
				case "variable":
					operacion = antes[0].contenido.nombre;
					break;
				case "operacion":
					operacion = verificaOperacion(antes[0]);
					break;
				case "delay":
					operacion = " delay(";
					banderaB = true;
					break;
				case "zumbador":
					operacion = " tone(zumbador,";
					banderaB = true;
					break;
			}
		}
		if (banderaB === false) {
			operacion = "(" + operacion + " " + eleccion + " ";
		}

		let despues = bloque.contenido_entonces;
		if (despues.length === 1) {
			switch (despues[0].subtipo) {
				case "valor":
					operacion = operacion + despues[0].contenido.valor;
					break;
				case "variable":
					if (banderaB === false) {
						operacion = operacion + despues[0].contenido.nombre;
					} else {
						operacion = operacion + despues[0].contenido.nombre + ")";
					}
					break;
				case "operacion":
					operacion = operacion + verificaOperacion(despues[0]);
					break;
			}
		}
	}

	return operacion + ")";
}
function verificaCondicion(bloque) {
	/*
	 * NOMBRE: verificaCondicion.
	 * UTILIDAD: Analiza y crea las condiciones de las estructuras.
	 * ENTRADAS: bloque > objeto.
	 * SALIDAS: String con la condicion.
	 */
	let condicion = "";

	switch (bloque.subtipo) {
		case "led":
			if (bloque.contenido.estado === "HIGH") {
				condicion = "digitalRead(" + bloque.contenido.nombre + ")";
			} else {
				condicion = "!digitalRead(" + bloque.contenido.nombre + ")";
			}
			break;
		case "push":
			let duplica = verificaDuplicado(bloque.contenido.nombre, pool_variables_push);
			if (duplica === false && bloque.contenido.nombre != undefined) {
				datosPush.variable =
					"int " +
					bloque.contenido.nombre +
					" = " +
					bloque.contenido.pin +
					";\n" + datosPush.variable;
				datosPush.setup = "\tpinMode(" + bloque.contenido.nombre + ",INPUT);\n" + datosPush.setup;
				console.log("push",datosPush);
				pool_variables_push.push({nombre: bloque.contenido.nombre});
			}
			if (bloque.contenido != false) {
				if (bloque.contenido.estado === "HIGH") {
					condicion = "digitalRead(" + bloque.contenido.nombre + ")";
				} else {
					condicion = "!digitalRead(" + bloque.contenido.nombre + ")";
				}
			}
			break;
		case "para":
			condicion =
				"int " +
				bloque.contenido.nombre +
				"=" +
				bloque.contenido.valor_inicial +
				";" +
				bloque.contenido.nombre +
				bloque.contenido.comparacion +
				bloque.contenido.valor_final +
				";" +
				bloque.contenido.nombre +
				"=" +
				bloque.contenido.nombre +
				"+" +
				bloque.contenido.incremento;
			break;
		case "variable":
			condicion = bloque.contenido.nombre;
			break;
		case "valor":
			condicion = bloque.contenido.valor;
			break;
		case "comparacion":
			condicion = analizaCondicionOperaciones(bloque);
			break;
		case "operacion":
			condicion = analizaCondicionOperaciones(bloque);
			break;
		default:
			condicion = "";
	}

	return condicion;
}
function analizaCondicionOperaciones(caja) {
	/*
	 * NOMBRE: verificaCondicionOperaciones.
	 * UTILIDAD: Verifica y genera las "operaciones".
	 * ENTRADAS: caja > objeto bloque tipo operacion.
	 * SALIDAS: cadena > codigo arduino parcial.
	 */
	let cadena = "(";

	if (caja.contenido != false) {
		let eleccion = caja.contenido.eleccion;

		let antes = caja.contenido_condicion;

		if (antes.length === 1) {
			cadena = cadena + verificaCondicion(antes[0]);
		}
		cadena = cadena + " " + eleccion + " ";

		let despues = caja.contenido_entonces;
		if (despues.length === 1) {
			cadena = cadena + verificaCondicion(despues[0]);
		}
	}

	return cadena + ")";
}
function calculaSangria(nivel) {
	/*
	 * NOMBRE: calculaSangria.
	 * UTILIDAD: Calcula la sangria para el codigo correspondiente.
	 * ENTRADAS: nivel > Numero que nos indica el "nivel" donde se encuentra el bloque.
	 * SALIDAS: sangria > String con la sangria.
	 */
	let sangria = "";
	for (let i = 0; i <= nivel; i++) {
		sangria = sangria + "\t";
	}
	return sangria;
}
