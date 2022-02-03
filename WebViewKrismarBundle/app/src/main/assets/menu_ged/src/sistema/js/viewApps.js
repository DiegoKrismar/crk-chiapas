IP = "";
$botonAct = 0;
$botonActId = 0;
//$sesionNombre = "";
$nombre = "";
$nombreT = "";

$medidaIcon = 154;
$filterApp = 0;
$filterC = 0;
$filterCA = -1;
$cfilterCA = -1;
$busquedaActual = "";
$cbusquedaActual = "";
$filterP = 0;
$filterD = 0;

$pagActual = 1;
$totalAppsVisibles = 0;
$espacioF = 0;
$pressBtn = false;
$banderaInput = false;
$objetivos = "";
$objetivosHTML = "";
$inputActual = "";

$cleccionActual = "";
$cleccionActualF = "";
$cbuscarT = "";
inpt();
$moverB = false;
$aplicacionM = "";
$allSelect = false; //Bandera, selecciona todas las apps
$allSelectClone = false;

var filterName = new Array(
  "ninguno",
  "aplicacion",
  "lectura",
  "video",
  "evaluacion"
);
var filterClass = new Array(
  "ninguno",
  "c_btnFiltroAplicacion",
  "c_btnFiltroLectura",
  "c_btnFiltroVideo",
  "c_btnFiltroEvaluacion",
  "c_btnFiltroSimulador"
);
var filApps = new Array("Grado", "Asignatura", "Bloque", "Lección");
var offsetM;
var filterActual = new Array(
  "filtrosApps0",
  "filtrosApps01",
  "filtrosApps0101",
  "filtrosApps010101"
);
var cfilterActual = new Array("cfiltrosApps0", "", "", "");

//Variables implementadas 2019 estas variables se deben reestablecer al elegir otro curso
var AppsCurso = []; // Aplicaciones Seleccionadas Para Curso -->Array en dónde se van a agregar todos los clones asi sera más fácil elegirlos sin recorrer todos los div
var AppsCursoAll = []; //Cuando le damos selecionar todas las apps aqui se agregan
var AppsCursoClonadas = []; // Las aplicaciones que se clonaron se guardaran ahora en un array de objetos ya que se necesitan más datos la relacion entre el clon y las apps
var AppsCursoClonadasAux = [];
var DeletAppsClonadas = []; // Guardar en un array las aplicaciones que se van a eliminar.
var DeletAppsCopy = []; // Guardar en un array las aplicaciones que se van a eliminar.
var AppsFiltradas = []; //Disminuye el número de aplicaciones para implementar una busqueda
var materiaActual = "";

var leccionesUpdate = []; //agregamos las lecciones en donde se realizo algun cambio como cambiar de lugar una aplicacion o eliminarla
var GABLup = []; //Agregar el grado,asignatura,bloque o leccion para actualizar su información
var GABLdelet = []; //Agregar para eliminar grados,asignaturas o lecciones

var bFM = "0"; //Bandera del filtro materia
var bFT = "0";
var bFP = "0";

var LeccionesSinApps = []; //Lecciones sin Apps
var contentLeccionesSinApps = ""; //Contenido del archivo txt que informa sobre las llecciones que no contienen aplicaciones
var positionAppsC = []; // Posicion de las apps clonadas
$lastScrollTop = 0;

$totalClone = 0; //Total de clones
$leccionActual = "01010101"; //empezamos por el primer filtro
var contSelect = 0; //Contador de las apps clonadas seleccionadas
var divClikAux = ""; //Guardar el div que se le dio click para ver su menu
var FiltroSoloMateria = [];

//var  $jsonApps = [];

function mostrarApps() {
  /*
    	     * NOMBRE: mostrarApps
    	     * UTILIDAD: Mostras las aplicaciones que conincidieron con la implementacion de filtros
    	     			
    	     			Atributos del div(class="c_btn") a insertar
						1. id="btnX" ; IMPORTANTE en donde X es un numeros mayor a 1 pero menor al numero de aplicaciones filtradas 
						2. real="btnY"; IMPORTANTE en donde Y es un numeros mayor a 1 pero menor al numero de aplicaciones obtenidas despues de
									aplicar un filtro, si no se aplica ningun filtro el valor de real = id
						3. rel="N" ; es el id de la aplicacion en la DB 

							Atributos del hijo(class="c_btnIn c_eventos") del div(class="c_btn") a insertar
								1.1. id="Capa_X"; mismo valor X de su div padre
    	     * ENTRADAS: 
    	     * SALIDAS: 
             * NOTA : PUEDE SER UNA FUNCION GENERAL USADA EN MAS LUGARES
             * FECHA ULTIMA MODIFICACIÓN: 1 DE MARZO DEL 2019 
    	     */
  offsetM = $("#medida").offset(); //posicion del div#medida top,left
  var dispositivo = navigator.userAgent.toLowerCase();
  if (dispositivo.search(/iphone|ipod|ipad|android/) > -1) {
    // verificamos dispositivo
    if (offsetM.top != 0) {
      $espacioF = offsetM.top;
    }
  } else {
    if (offsetM.top != 0) {
      $espacioF = offsetM.top;
    }
  }
  $espacioHeader = 0;

  $espacioApps = $(window.parent).height() - ($espacioF + $espacioHeader + 102);
  $numeroApps =
    ($("#medida").width() / $medidaIcon) *
    Math.floor($espacioApps / $medidaIcon);
  if ($numeroApps <= ($("#medida").width() / $medidaIcon) * 3) {
    $numeroApps = ($("#medida").width() / $medidaIcon) * 3;
  }

  $totalAppsVisibles = AppsFiltradas.length; //Apps filtradas que se van a mostrar

  if ($pagActual == 0) {
    $pagActual = 1;
    $("#pagActual").text($pagActual);
  }
  if (Math.ceil($totalAppsVisibles / $numeroApps) < $pagActual) {
    $pagActual = Math.ceil($totalAppsVisibles / $numeroApps);
    $("#pagActual").text($pagActual);
  }

  $apps = "";
  AppsFiltradas.forEach(function (element) {
    $numBtn = element.real; //Numero secuencial de app despues de filtrar
    if (
      !(
        $numBtn > $numeroApps * $pagActual ||
        $numBtn <= $numeroApps * $pagActual - $numeroApps
      )
    ) {
      //Todas las apps que  deben pintarse
      //ajaxImgMin(element.p);
      if (
        $("#allSelectApp").prop("checked") ||
        $("#btn" + element.no)
          .find(":checkbox")
          .prop("disabled")
      ) {
        miniatura = element.p;
        if (
          miniatura.indexOf("fla_") != -1 ||
          miniatura.indexOf("fls_") != -1
        ) {
          min = "flash";
        } else if (miniatura.indexOf("red_pla") != -1) {
          min = "red_pla";
        } else {
          min = miniatura;
        }
        $apps =
          $apps +
          '<div class="c_btn" id="btn' +
          element.no +
          '" real="btn' +
          element.real +
          '" p="' +
          element.p +
          '" o="' +
          element.o +
          '" rel="' +
          element.i +
          '">' +
          '<div class="c_btnIn c_eventos" id="Capa_' +
          element.no +
          '">' +
          '<img class="c_btnIcon" ' +
          //'onerror="this.src ='+IP+'src/img/miniatura//const.png"'+
          //'a_src="'+IP+'src/img/miniatura//'+element.p+'.png"'+
          'src="' +
          IP +
          "src/img/miniatura/" +
          min +
          '.png">' +
          //'>'+
          '<img class="c_iconTipo" src="' +
          IP +
          "src/sistema/img/btn_" +
          element.c +
          '.png">' +
          "</div>" +
          '<input type="checkbox" class="c_checkbox" hidden onclick="SeleccionarApp(this)">' +
          "</div>";
      } else {
        miniatura = element.p;
        if (
          miniatura.indexOf("fla_") != -1 ||
          miniatura.indexOf("fls_") != -1
        ) {
          min = "flash";
        } else if (miniatura.indexOf("red_pla") != -1) {
          min = "red_pla";
        } else {
          min = miniatura;
        }
        $apps =
          $apps +
          '<div class="c_btn" id="btn' +
          element.no +
          '" real="btn' +
          element.real +
          '" p="' +
          element.p +
          '" o="' +
          element.o +
          '" rel="' +
          element.i +
          '">' +
          '<div class="c_btnIn c_eventos "  id="Capa_' +
          element.no +
          '">' +
          '<img class="c_btnIcon" ' +
          'src="' +
          IP +
          "src/img/miniatura/" +
          min +
          '.png">' +
          '<img class="c_iconTipo" src="' +
          IP +
          "src/sistema/img/btn_" +
          element.c +
          '.png">' +
          "</div>" +
          '<input type="checkbox" class="c_checkbox" hidden onclick="SeleccionarApp(this)">' +
          "</div>";
      }
    }
  });

  document.getElementById("medida").innerHTML = $apps;
  $("#pagTotal").text(Math.ceil($totalAppsVisibles / $numeroApps));
  mostrarNombre();
  mostrarMenu();
  $("#Tapps").text("Mostrar " + $totalAppsVisibles + " aplicaciones");
}

function mostrarNombre() {
  /*
   * NOMBRE: mostrarNombre
   * UTILIDAD: Mejora al agregar el tooltip a todas las aplicaciones se agrega sólo el evento a todos los div con la clase c_btnIn
   * ENTRADAS:
   * SALIDAS:
   * NOTA : PUEDE SER UNA FUNCION GENERAL USADA EN MAS LUGARES
   * FECHA ULTIMA MODIFICACIÓN: 1 DE MARZO DEL 2019
   */
  $("div.c_eventos").mouseover(function () {
    $auxboton = $(this).attr("id");
    $auxboton = parseInt($auxboton.replace("Capa_", ""));
    if ($botonAct != $auxboton) {
      $("#tooltip").show();
      $("#flecha_tooltip").show();
      $nombreT = $jsonApps[$auxboton - 1].n;
      $prefijoT = $jsonApps[$auxboton - 1].p;
      var offset = $("#btn" + $auxboton).offset();
      $("#tooltip").text($nombreT);
      $("#tooltip").append("<br>");
      $izq = ($("#tooltip").width() - 134) / 2;
      $("#tooltip").css({
        top: offset.top - $("#tooltip").height() - 25,
        left: offset.left - $izq,
        position: "absolute",
      });
      var p = $("#tooltip");
      var position = p.position();
      $("#flecha_tooltip").css({
        top: offset.top - 1,
        left: position.left + $("#tooltip").width() / 2,
        position: "absolute",
      });
    }
  });
}

function mostrarMenu() {
  /*
                 * NOMBRE: mostrarMenu
                 * UTILIDAD: Se agrega el evento click a todos los div que tienen la clase c_btnIn, 
                             con esto se desplega un menú con información de la aplicación y el boton play
                 * ENTRADAS: 
                 * SALIDAS: 
                 * NOTA : PUEDE SER UNA FUNCION GENERAL USADA EN MAS LUGARES
                 * FECHA ULTIMA MODIFICACIÓN: 1 DE MARZO DEL 2019 
                 */
  if (divClikAux != "") {
    //Esto asegura que no exista un click previo cuando se hace una paginacion
    divClikAux = ""; //Y asi se garantizar el mostrar el menu
  }
  $("div.c_eventos").click(function () {
    $("#tooltip").hide();
    $("#flecha_tooltip").hide();
    var divClik = $(this); //Div que se le dio el click son los que tienen la clase c_eventos
    var divPadre = $(divClik).parent(); //Padre del div que se le dio click
    $data = $(divPadre).attr("o");
    $objetivosHTML = "";
    $objetivos = $data.split("-"); //separamos los objetivos en un array
    $objetivos.forEach(function (element) {
      //recorremos el array de objetivos
      if (element.length > 0) {
        //el primer elemento es vacio
        $objetivosHTML =
          $objetivosHTML + "<li class='a_lista'>" + element + "</li>";
      }
    });
    if (divClikAux == "") {
      //si es la primera vez que damos click en un div
      $(divPadre).attr("class", "c_btn_press");
      divClikAux = $(divClik).attr("id");
      generarMenu(divClik);
    } else if ($(divClik).attr("id") == divClikAux) {
      //si damos click en el mismo div
      $(divPadre).attr("class", "c_btn");
      $("#menu").slideUp("slow", function () {
        divClikAux = "";
        $("#menu").remove();
      });
    } else if (divClikAux != "" && $(divClik).attr("id") != divClikAux) {
      //Si ya dimos previamente click en un div y ahora lo damos en un div diferente
      var divPadreAux = $("#" + divClikAux).parent(); //Rescatamos el padre del div con el click
      $(divPadreAux).attr("class", "c_btn"); //Al padre le cambiamos la clase
      $(divPadre).attr("class", "c_btn_press"); //Al padre del nuevo div al que le dimos click le agregamos la clas
      divClikAux = $(divClik).attr("id"); //asignamos el nuevo div que le dimos click

      $("#menu").slideUp("slow", function () {
        $("#menu").remove();
        generarMenu(divClik);
      });
    }
  });
}

function generarMenu(divClik) {
  /*
   * NOMBRE: generarMenu
   * UTILIDAD: Se agrega genera el menu con la informacion del div que se le dio click
   * ENTRADAS: div al que se le dio click
   * SALIDAS:
   * NOTA : PUEDE SER UNA FUNCION GENERAL USADA EN MAS LUGARES
   * FECHA ULTIMA MODIFICACIÓN: 1 DE MARZO DEL 2019
   */
  var divPadre = $(divClik).parent(); //Padre del div que se le dio click
  $id = parseInt($(divPadre).attr("rel")); //Id de la aplicacion
  $prefijo = "'" + $(divPadre).attr("p") + "'"; //prefijo de la aplicacion
  $boton = $(divPadre).attr("real"); //Boton de la aplicacion
  $boton = parseInt($boton.replace("btn", ""));
  $idName = $(divPadre).attr("id"); //Boton de la aplicacion
  $idName = parseInt($idName.replace("btn", ""));
  $nombre = $jsonApps[$idName - 1].n; //Nombre de la aplicacion
  $renglon = Math.ceil($boton / ($("#medida").width() / $medidaIcon));
  $botonM = $renglon * ($("#medida").width() / $medidaIcon);
  if ($botonM > $totalAppsVisibles) {
    $botonM = $totalAppsVisibles;
  }
  $text =
    '<div class="a_menuBtn" id="menu">' +
    '<div class="a_menuBtnIn">' +
    '<div class="a_tituloApp">' +
    $nombre +
    "</div>" +
    '<div class="a_nivelesApp">' +
    '<div class="a_tituloNivel">Nivel:</div>' +
    '<div class="a_nivelApp1"></div>' +
    '<div class="a_nivelApp2"></div>' +
    '<div class="a_nivelApp3"></div>' +
    '<div class="a_nivelApp4"></div>' +
    '<div class="a_nivelApp5"></div>' +
    "</div>" +
    '<div class="a_infoApp"> ' +
    $objetivosHTML +
    "</div>" +
    "</div>" +
    '<div class="a_btnPlay" onclick="abrirVentana(' +
    $id +
    "," +
    $boton +
    "," +
    $prefijo +
    ')"></div>' +
    "</div>";

  $("#medida > div").each(function () {
    //recorremos los div dentro de este contenedor
    if ($(this).attr("real") == "btn" + $botonM) {
      $(this).after($text);
    }
  });
  $("#menu").slideDown("slow", function () {}); //Mostramos el menú
}

/*INICIO FUNCIONES SOBRE EL CONTENEDOR DE LA APLICACION */

function abrirVentana2($id, $botonV, $prefijo) {
  /*
   * NOMBRE: abrirVentana
   * UTILIDAD:  Correr la aplicación de la cual se desplego su menú
   * ENTRADAS: $id de la aplicación
   * SALIDAS:
   * NOTA : PUEDE SER UNA FUNCION GENERAL USADA EN MAS LUGARES
   * FECHA ULTIMA MODIFICACIÓN: 5 DE FEBRERO 2019
   */
  var dispositivo = navigator.userAgent.toLowerCase();
  //if( dispositivo.search(/iphone|ipod|ipad|android/) > -1 ){
  //      var win = window.open(IP+"siteApps/cargarApp/"+$id, '_blank');
  //  }
  //else{
  //obtenemos la pagina que queremos cargar en la ventana y el titulo
  var strPagina = IP + "index.php/aplicaciones/load_app/" + $id;
  //var strPagina = IP + "aplicacion_sin_log/cargarApp/" + $id,
  strTitulo = $nombre;
  //creamos la nueva ventana para mostrar el contenido y la capa para el titulo
  var $objVentana = $('<div id="ventana" class="clsVentana">');
  //creamos la capa que va a mostrar el contenido
  var $objVentanaContenido = $('<div class="clsVentanaContenido">');
  //agregamos un iframe y en el source colocamos la pagina que queremos cargar
  $objVentanaContenido.append('<iframe id="appAct" src="' + strPagina + '">');
  //agregamos la capa de contenido a la ventana
  $objVentana.append($objVentanaContenido);
  //creamos el overlay con sus propiedades css y lo agregamos al body
  //$pref=$("#btn"+$botonV).attr("prefijo");
  /*console.log("Cargo...El prefijo de la aplicación a reproducir es: " + $pref);
                //if ($pref.substr(0, 7) == "red_rob") {
                if ($pref.indexOf("red_rob") > -1) {
                    var $objOverlay = $('<div id="divOverlay" class="divOverlay divOverlay_robotica">').css({
                        //opacity: .8,
                        display: 'none'
                    });
                } else {*/
  var $objOverlay = $('<div id="divOverlay" class="divOverlay">').css({
    //opacity: .8,
    display: "none",
  });
  //}
  $("body").append($objOverlay);
  //animamos el overlay y cuando su animacion termina seguimos con la ventana
  $objOverlay.fadeIn(function () {
    //agregamos la nueva ventana al body
    $("#divOverlay").append($objVentana);
    //mostramos la ventana suavemente ;)
    $objVentana.fadeIn();
  });
  $("#home").click(function () {
    alert("Handler for .click() called.");
  });
  //}
}

function cerrarVen() {
  /*
   * NOMBRE: cerrarVen
   * UTILIDAD: Cerrar la ventana de la aplicación que se abrio
   * ENTRADAS:
   * SALIDAS:
   * NOTA : PUEDE SER UNA FUNCION GENERAL USADA EN MAS LUGARES
   * FECHA ULTIMA MODIFICACIÓN: 5 DE FEBRERO 2019
   */
  var $objVentana = $("#ventana");
  //cerramos la ventana suavemente
  $objVentana.fadeOut(300, function () {
    //eliminamos la ventana del DOM
    $(this).remove();
    //ocultamos el overlay suavemente
    $("#divOverlay").fadeOut(500, function () {
      //eliminamos el overlay del DOM
      $(this).remove();
    });
  });
}

function reiniciaVen() {
  /*
   * NOMBRE: reiniciaVen
   * UTILIDAD: reiniciar la aplicación que se abrio
   * ENTRADAS:
   * SALIDAS:
   * NOTA : PUEDE SER UNA FUNCION GENERAL USADA EN MAS LUGARES
   * FECHA ULTIMA MODIFICACIÓN: 5 DE FEBRERO 2019
   */
  document.getElementById("appAct").contentWindow.location.reload(true);
}
/*INICIO FUNCIONES SOBRE EL CONTENEDOR DE LA APLICACION CON ID ="btn#" (en dónde el # es un número mayor o igual a 1) MOSTRADA EN EL DIV CON ID="medida" */

/*INICIO FILTROS PARA BUSCAR APLICACIONES POR MATERIAS,PALABRAS ESPECIFICAS O POR TIPO*/
function BusquedaMateria(element) {
  //Busqueda por materia
  /*
   * NOMBRE: BusquedaMateria
   * UTILIDAD:  Buscar las aplicaciones por materia
   * ENTRADAS:
   * SALIDAS:
   * NOTA : PUEDE SER UNA FUNCION GENERAL USADA EN MAS LUGARES
   * FECHA ULTIMA MODIFICACIÓN: 1 DE FEBRERO 2019
   */
  var auxElement = "";
  $("#filtrosAsignaturas").text(element.textContent); //rescatamos el texto del div y lo agregamos al elemento con ahora = filtrosAsignaturas  antes =cfilApps0" para mostra la materia seleccionada
  $("#filtrosAsignaturas").attr("class", "c_btnFiltro"); //agregamos la clase al elemento con id="cfilApps0"
  $("#contAsignaturas").slideUp("slow", function () {
    //Cerrar el menu
    if (materiaActual === "") {
      //Si selecciona por primera vez la materia
      materiaActual = element.getAttribute("id");
    } else {
      //Ya se selecciono una materia previamente
      auxElement = materiaActual;
      materiaActual = element.getAttribute("id");
    }
    $("#" + auxElement).attr("class", "c_filtrostxt");
    $("#" + materiaActual).attr("class", "c_filtrostxt_press");

    AppsFiltradas = $jsonApps.slice(); //Solo en este filtro se asignan todas las apps pos su forma de actuar

    AppsFiltradasAux = AppsFiltradas.filter(function (element) {
      //buscamos sólo dentro de un  array en  el peor de los casos es el primer filtro y tiene todas las aplicaciones
      return element.p.toLowerCase().indexOf(materiaActual.toLowerCase()) > -1;
    });

    AppsFiltradas = AppsFiltradasAux.slice();
    FiltroSoloMateria = AppsFiltradasAux.slice();
    AppsFiltradasAux = [];
    bFM = "1";
    BusquedaGeneral();
  });
}

function BusquedaPalabras() {
  /*
   * NOMBRE: BusquedaPalabras
   * UTILIDAD:  Buscar las aplicaciones por coincidencias de palabras en los campos del array ;  n = NOMBRE, p = PREFIJO, pc = PALABRAS CLAVES
   * ENTRADAS:
   * SALIDAS:
   * NOTA : PUEDE SER UNA FUNCION GENERAL USADA EN MAS LUGARES
   * FECHA ULTIMA MODIFICACIÓN: 5 DE FEBRERO 2019
   */

  if (bFP === "1") {
    $("#cbuscarApps").addClass("c_cambio");
    document
      .getElementById("cbuscarApps")
      .addEventListener("click", LimpiarBusquedaPalabras);
    busqueda = $("#cinputB").val(); //Palabra que vamos a buscar
    AppsFiltradasAux = AppsFiltradas.filter(function (element) {
      //buscamos sólo dentro de un  array en  el peor de los casos es el primer filtro y tiene todas las aplicaciones
      return (
        element.n.toLowerCase().indexOf(busqueda.toLowerCase()) > -1 ||
        element.pc.toLowerCase().indexOf(busqueda.toLowerCase()) > -1 ||
        element.p.toLowerCase().indexOf(busqueda.toLowerCase()) > -1
      );
    });

    AppsFiltradas = AppsFiltradasAux.slice();
    AppsFiltradasAux = [];
  }
}

function LimpiarBusquedaPalabras() {
  /*
   * NOMBRE: LimpiarBusquedaPalabras
   * UTILIDAD:  Al dar click sobre la "X" se limpia el filtro de busqueda por palabras
   * ENTRADAS:
   * SALIDAS:
   * FECHA ULTIMA MODIFICACIÓN: 5 DE FEBRERO 2019
   */
  bFP = "0";
  $("#cbuscarApps").removeClass("c_cambio"); //Quitamos la clase
  $("#cinputB").val(""); //El input lo dejamos limpio
  document
    .getElementById("cbuscarApps")
    .removeEventListener("click", LimpiarBusquedaPalabras); //Removemos el evento click
  BusquedaGeneral();
}

function BusquedaTipo(element) {
  /*
   * NOMBRE: BusquedaTipo
   * UTILIDAD:  Buscar las aplicaciones por tipo de aplicacion
   * ENTRADAS:
   * SALIDAS:
   * NOTA : PUEDE SER UNA FUNCION GENERAL USADA EN MAS LUGARES
   * FECHA ULTIMA MODIFICACIÓN: 1 DE FEBRERO 2019
   */

  switch (element) {
    case 1: //Aplicacion
      AppsFiltradasAux = AppsFiltradas.filter(function (element) {
        //buscamos sólo dentro de un  array en  el peor de los casos es el primer filtro y tiene todas las aplicaciones
        return element.c == "aplicacion" || element.c == "aplicacionL";
      });
      break;

    case 2: //Lectura
      AppsFiltradasAux = AppsFiltradas.filter(function (element) {
        //buscamos sólo dentro de un  array en  el peor de los casos es el primer filtro y tiene todas las aplicaciones
        return element.c == "lectura";
      });
      break;

    case 3: //Video
      AppsFiltradasAux = AppsFiltradas.filter(function (element) {
        //buscamos sólo dentro de un  array en  el peor de los casos es el primer filtro y tiene todas las aplicaciones
        return element.c == "video";
      });
      break;

    case 4: //Evaluacion
      AppsFiltradasAux = AppsFiltradas.filter(function (element) {
        //buscamos sólo dentro de un  array en  el peor de los casos es el primer filtro y tiene todas las aplicaciones
        return element.c == "evaluacionE" || element.c == "evaluacionC";
      });
      break;

    case 5: //Simuladores crk
      AppsFiltradasAux = AppsFiltradas.filter(function (element) {
        //buscamos sólo dentro de un  array en  el peor de los casos es el primer filtro y tiene todas las aplicaciones
        return element.c == "simuladorcrk";
      });
      break;
  }

  AppsFiltradas = AppsFiltradasAux.slice();
  AppsFiltradasAux = [];
}

function limpiarFiltros() {
  /*
   * NOMBRE: limpiarFiltros
   * UTILIDAD:  Reestablecer todos los filtros implementados y mostrar todas las aplicaciones
   * ENTRADAS:
   * SALIDAS:
   * FECHA ULTIMA MODIFICACIÓN: 11 DE FEBRERO 2019
   */

  /*Limpiamos el filtro por busqueda de palabras*/
  if (bFP === "1") {
    bFP = "0";
    $("#cbuscarApps").removeClass("c_cambio"); //Quitamos la clase
    $("#cinputB").val(""); //El input lo dejamos limpio
    document
      .getElementById("cbuscarApps")
      .removeEventListener("click", LimpiarBusquedaPalabras); //Removemos el evento click
  }

  /*Limpiamos la busqueda por asignatura*/
  if (bFM === "1") {
    bFM = "0";
    $("#filtrosAsignaturas").text("Asignatura");
    $("#" + materiaActual).attr("class", "c_filtrostxt");
    materiaActual = "";
  }

  /*Limpiamos la busqueda por tipo*/
  if (bFT === "1") {
    bFT = "0"; //
    $filterApp = 0;
    $("#fil" + $filter).attr("class", filterClass[$filter]);
  }

  //AppsFiltradas = $jsonApps.slice();//Todas las aplicaciones son visibles
  BusquedaGeneral();
}

function BusquedaGeneral() {
  /*
                 * NOMBRE: BusquedaGeneral
                 * UTILIDAD:  Buscar las aplicaciones implementando ninguno, 1 o todos los filtros convinados
                    bFM  bFT  bFP
                     0    0    0    Ningún filtro aplicado
                     0    0    1    Filtro por solo  palabras 
                     0    1    0    Filtro por solo tipo
                     0    1    1    Filtro por tipo y palabras
                     1    0    0    Filtro por solo materia 
                     1    0    1    Filtro pot materia  y por palabras                              
                     1    1    0    Filtro por materias y tipo
                     1    1    1    Filtro por materia, tipo y palabras

					La variable AppsFiltradas es un array de objetos en donde:
						AppsFiltradas [
							explicacion 
							n: posicion en el array
								ca: categoria de la apliacion
								id: id de la aplicacion en la DB			
								n:  nombre de la aplicacion 
								no: numero secuencial que se les asigna a todas las apps recuperadas
								p: prefijo
								pc: palabras claves
								real: numero secuencial que se les asigna alas apps despues de filtrarlas
							ejemplo
							0:
								ca: "aplicacion"
								id: "47"			
								n: "Perímetro del terreno"
								no: "1"
								p: "mdt_mat_5110"
								pc: "perímetro- cálculo de perímetro-operaciones básicas-problemas-desafío 5"
								real: 1
						]

                 * ENTRADAS: 
                 * SALIDAS: 
                 * NOTA : PUEDE SER UNA FUNCION GENERAL USADA EN MAS LUGARES
                 * FECHA ULTIMA MODIFICACIÓN: 26 DE FEBRERO 2019
                 */

  if (bFM !== "1") {
    //Como el filtro por materia se hace primero y despues se llama esta funcion BusquedaGeneral() omitimos este paso
    AppsFiltradas = $jsonApps.slice();
  }

  if ($("#cinputB").val().length >= 1) {
    //se comprueba que hay mas de un elemento
    bFP = "1"; //Se busca por palabras
  } else {
    bFP = "0";
    $("#cbuscarApps").removeClass("c_cambio"); //Quitamos la clase
    $("#cinputB").val(""); //El input lo dejamos limpio
    document
      .getElementById("cbuscarApps")
      .removeEventListener("click", LimpiarBusquedaPalabras); //Removemos el evento click
  }

  var c = bFM + bFT + bFP;

  switch (c) {
    case "000": //console.log("Sin filtros");
      break;

    case "001": //console.log("Busqueda por palabras mejora 26/02/19");
      BusquedaPalabras();
      break;

    case "010": //console.log("Busqueda por tipo mejora mejora 26/02/19");
      BusquedaTipo($filterApp);
      break;

    case "011": //console.log("Busqueda por tipo y por palabras mejora 26/02/19");
      BusquedaTipo($filterApp);
      BusquedaPalabras();
      break;

    case "100": //console.log("Filtro por materia mejora 26/02/19");
      //AppsFiltradas  = FiltroSoloMateria.slice();
      break;

    case "101": //console.log("Filtro por materia y palabras mejora 26/02/19");
      //AppsFiltradas = FiltroSoloMateria.slice();
      BusquedaPalabras();
      break;

    case "110": //console.log("Filtro por materia y tipo mejora 26/02/19");
      AppsFiltradas = FiltroSoloMateria.slice();
      BusquedaTipo($filterApp);
      break;

    case "111": //console.log("Filtro por materia , tipo y palabras");
      AppsFiltradas = FiltroSoloMateria.slice();
      BusquedaTipo($filterApp);
      BusquedaPalabras();
      break;
  }
  //var items = AppsFiltradas.slice();
  /*AppsFiltradas.sort(function (a, b) {
    if (a.p > b.p) {
      return 1;
    }
    if (a.p < b.p) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });*/
  //console.log(items2);
  $secuencia = 1;
  AppsFiltradas.forEach(function (element) {
    //Agregamos una secuencias en el atributo real
    element["real"] = $secuencia;
    $secuencia++;
  });
  //console.log(AppsFiltradas);
  mostrarApps();
  // console.log(AppsFiltradas);
}

/*FIN FILTROS PARA BUSCAR APLICACIONES POR MATERIAS,PALABRAS ESPECIFICAS O POR TIPO*/

/*INICIO PRESENTACÓN DE LA INTERFAZ AL USUARIO*/

function inpt() {
  /*
   * NOMBRE: inpt.
   * UTILIDAD: Detecta la plataforma y cambia css del input.
   * ENTRADAS: Ninguna.
   * SALIDAS: Ninguna.
   */
  //
  if (
    navigator.platform == "iPad" ||
    navigator.platform == "iPhone" ||
    navigator.platform == "iPod"
  ) {
    //alert("Apple");
    $(".c_buscadorinput").attr("class", "c_buscadorinputIpad");
  } else {
    // alert("Otro");
  }
}
/*FIN PRESENTACÓN DE LA INTERFAZ AL USUARIO*/
/*FIN FUNCIONES MODIFICADAS 2019*/

//limpiar todos los filtros

var entradasInvalidas = 0;

////////////////////////////Mostrar palabras clave en menu emergente
function getPalabras($id) {
  //console.log("Mostrar las palabras claves");
  $palabrasC = "";
  if ($cbuscarT != "") {
    var palabras = document.getElementById($id).getAttribute("palabrasc");
    while (palabras.indexOf("-") != -1) {
      palabras = palabras.slice(palabras.indexOf("-") + 1, palabras.length);
      if (palabras.indexOf("-") != -1) {
        $palabrasC =
          $palabrasC +
          "<div class='a_palabrastxt'>" +
          palabras.slice(0, palabras.indexOf("-")) +
          ",</div>";
        palabras = palabras.slice(palabras.indexOf("-"), palabras.length);
      } else {
        $palabrasC =
          "<div class='a_palabrasclave'><div class='a_palabrasclavetxt'>Palabras clave</div>" +
          $palabrasC +
          "<div class='a_palabrastxt'>" +
          palabras.slice(palabras.indexOf("-") + 1, palabras.length) +
          ".</div></div>";
        palabras = "";
      }
    }
  } else {
    $palabrasC = "";
  }
}

$(window).resize(function () {
  // console.log("resize");
  $("#inputfiltros").hide();
  var dispositivo = navigator.userAgent.toLowerCase();
  BusquedaGeneral();
  acomodarFiltros();
});

const acomodarFiltros = () => {
  var max = 1024;
  var dispositivo = navigator.userAgent.toLowerCase();
  if (dispositivo.search(/iphone|ipod|ipad|android/) > -1) {
    //max=1024;
    max = 620;
  }
  // console.log("$(window.parent).width()", $(window.parent).width());
  if ($(window.parent).width() > max) {
    $("#subMenu").insertAfter($("#" + initSelectMenu.click));
  } else if ($(window.parent).width() <= max) {
    $("#subMenu").insertAfter($("#" + "mLeccion"));
  }
  /*if ($(window.parent).width() > 460) {
      $('#cfiltrosApps0').insertAfter('#cBuscar');
  } else if ($(window.parent).width() <= 460) {
      $('#cfiltrosApps0').insertAfter('#cfilApps0');
  }*/
};

let $jsonApps = [];

const ArraysRecursivos = (data, opc) => {
  data.forEach((e) => {
    if (opc !== null) {
      if (opc.tipo === e.tipo && opc.id === e.id) {
        console.log(e, opc);
        for (let x in e) {
          if (Array.isArray(e[x])) {
            if (x === "apps") {
              let aux = $jsonApps.slice();
              $jsonApps = aux.concat(e[x]);
            }
            ArraysRecursivos(e[x], null);
          }
        }
      }
    } else {
      for (let x in e) {
        if (Array.isArray(e[x])) {
          if (x === "apps") {
            let aux = $jsonApps.slice();
            $jsonApps = aux.concat(e[x]);
          }
          ArraysRecursivos(e[x], opc);
        }
      }
    }
  });
};

const getAplicacionesRecursivo = (data) => {
  //console.log(data);
  data.forEach((e) => {
    // console.log("e", e);
    if (initSelectMenu[e.tipo] === null) {
      // console.log("es nulo",initSelectMenu[e.tipo]);
      //si es nullo mostramos todas las apps
      for (let x in e) {
        if (Array.isArray(e[x])) {
          if (x === "apps") {
            let aux = $jsonApps.slice();
            $jsonApps = aux.concat(e[x]);
          }
          getAplicacionesRecursivo(e[x]);
        }
      }
    } else {
      //Empezamos a filtrar
      let { id, tipo } = { ...initSelectMenu[e.tipo] };
      if (id === e.id && tipo === e.tipo) {
        for (let x in e) {
          if (Array.isArray(e[x]) && e[x].length > 1) {
            // console.log("mas de un registro", e);
            if (x === "apps") {
              let aux = $jsonApps.slice();
              $jsonApps = aux.concat(e[x]);
            }
            getAplicacionesRecursivo(e[x]);
          } else if (Array.isArray(e[x]) && e[x].length === 1) {
            console.log("para automatizar cuando es 1", e);
            let opc = {
              id: e[x][0].id,
              tipo: e[x][0].tipo,
            };
            initSelectMenu[e[x][0].tipo] = opc;
            if (x === "apps") {
              let aux = $jsonApps.slice();
              $jsonApps = aux.concat(e[x]);
            }
            getAplicacionesRecursivo(e[x]);
            switch (opc.tipo) {
              case "grado":
                $("#mGrado").text(e[x][0].n);
                $("#mGradou").text(e[x][0].n);

                break;
              case "materia":
                $("#mAsignatura").text(e[x][0].n);
                $("#mAsignaturau").text(e[x][0].n);

                break;
              case "bloque":
                $("#mBloque").text(e[x][0].n);
                $("#mBloqueu").text(e[x][0].n);

                break;
              case "leccion":
                $("#mLeccion").text(e[x][0].n);
                $("#mLeccionu").text(e[x][0].n);

                break;
            }
          }
        }
      }
    }
  });
};

let initSelectMenu = {
  grado: null,
  materia: null,
  bloque: null,
  leccion: null,
  unico: null,
};

const filtrar = (data, padre) => {
  // console.log("filtrar", data, padre);

  let idPadre = $(padre).attr("id");
  $("#" + idPadre).text($(data).attr("name"));
  $("#" + idPadre + "u").text($(data).attr("name"));
  let opc = {
    id: parseInt($(data).attr("id")),
    tipo: $(data).attr("tipo"),
  };
  // console.log(opc);
  for (let x in initSelectMenu) {
    if (x === opc.tipo) {
      // console.log(opc);
      initSelectMenu[x] = opc;
      switch (x) {
        case "grado":
          initSelectMenu.materia =
            initSelectMenu.bloque =
            initSelectMenu.leccion =
              null;
          $("#mAsignatura").text("Asignatura");
          $("#mBloque").text("Bloque");
          $("#mLeccion").text("Lección");
          $("#mAsignaturau").text("---");
          $("#mBloqueu").text("---");
          $("#mLeccionu").text("---");
          break;
        case "materia":
          initSelectMenu.bloque = initSelectMenu.leccion = null;
          $("#mBloque").text("Bloque");
          $("#mLeccion").text("Lección");
          $("#mBloqueu").text("---");
          $("#mLeccionu").text("---");
          break;
        case "bloque":
          initSelectMenu.leccion = null;
          $("#mLeccion").text("Lección");
          $("#mLeccionu").text("---");
          break;
      }
    }
  }
  //initSelectMenu.grados = opc;
  $jsonApps = [];
  for (let x in curso) {
    if (Array.isArray(curso[x])) {
      //ArraysRecursivos(curso[x], opc);

      getAplicacionesRecursivo(curso[x]);
    }
  }
  let select;
  for (let x in initSelectMenu) {
    select = initSelectMenu[x] !== null && x !== "click" ? x : select;
  }
  //console.log("select",select);
  // initSelectMenu.click = (initSelectMenu.unico === null)?  opc.tipo : initSelectMenu.unico;

  switch (select) {
    case "grado":
      $("#mGrado").attr("class", "a_btnFiltro_press");
      $("#mAsignatura").attr("class", "a_btnFiltro");
      $("#mBloque").attr("class", "a_btnFiltro");
      $("#mLeccion").attr("class", "a_btnFiltro");
      $("#mAsignatura").attr("select", "true");

      break;
    case "materia":
      $("#mGrado").attr("class", "a_btnFiltro");
      $("#mAsignatura").attr("class", "a_btnFiltro_press");
      $("#mBloque").attr("class", "a_btnFiltro");
      $("#mLeccion").attr("class", "a_btnFiltro");
      $("#mGrado").attr("select", "true");
      $("#mAsignatura").attr("select", "true");
      $("#mBloque").attr("select", "true");
      break;
    case "bloque":
      $("#mGrado").attr("class", "a_btnFiltro");
      $("#mAsignatura").attr("class", "a_btnFiltro");
      $("#mBloque").attr("class", "a_btnFiltro_press");
      $("#mLeccion").attr("class", "a_btnFiltro");

      $("#mGrado").attr("select", "true");
      $("#mAsignatura").attr("select", "true");
      $("#mBloque").attr("select", "true");
      $("#mLeccion").attr("select", "true");
      break;
    case "leccion":
      $("#mGrado").attr("class", "a_btnFiltro");
      $("#mAsignatura").attr("class", "a_btnFiltro");
      $("#mBloque").attr("class", "a_btnFiltro");
      $("#mLeccion").attr("class", "a_btnFiltro_press");
      $("#mGrado").attr("select", "true");
      $("#mAsignatura").attr("select", "true");
      $("#mBloque").attr("select", "true");
      $("#mLeccion").attr("select", "true");
      break;
  }

  $secuencia = 1;
  $jsonApps.forEach(function (element) {
    //Agregamos una secuencias en el atributo real para poder hacer la páginacion en la función   mostrarApps()
    element["no"] = $secuencia;
    $secuencia++;
  });

  BusquedaGeneral();
  $("#subMenu").slideUp("fast", function () {
    $(padre).attr("select", "true");
    //  $("#subMenu").remove();
  });
};

const createMenuContenedor = () => {
  $("#subMenu").remove();
  let newDiv = document.createElement("div");
  newDiv.classList.add("a_contFiltros");
  newDiv.setAttribute("id", "subMenu");
  $(newDiv).insertAfter($("#mLeccion"));
};

const crearSubMenu = (data, selectElement) => {
  //console.log("crear el subMenu",data,selectElement);
  let insertDespues = $(selectElement).attr("id");
  let permitirClick = $(selectElement).attr("select");
  //console.log("permitirClick", permitirClick);

  if (permitirClick === "true") {
    createMenuContenedor();
    data.forEach(({ id, n, tipo }) => {
      let newDiv = document.createElement("div");
      newDiv.classList.add("a_filtros");
      if (initSelectMenu[tipo] !== null) {
        if (initSelectMenu[tipo].id === id) {
          $(newDiv).css({
            fontWeight: "bold",
            textDecoration: "underline",
          });
        }
      }

      newDiv.setAttribute("id", id);
      newDiv.setAttribute("tipo", tipo);
      newDiv.setAttribute("name", n);
      let newContent = document.createTextNode(n);
      newDiv.appendChild(newContent); //añade texto al div creado.
      $("#subMenu").append(newDiv);
      $("#" + id).click(function () {
        filtrar(this, selectElement);
      });
    });
    initSelectMenu.click = insertDespues;
    acomodarFiltros();
    $("#subMenu").slideDown("fast", function () {
      $(selectElement).attr("select", "false");
      //$("#" + insertDespues).attr("class", "a_btnFiltro_press");
    });
  } else {
    $("#subMenu").slideUp("fast", function () {
      $(selectElement).attr("select", "true");
      $("#subMenu").remove();
      //$("#" + insertDespues).attr("class", "a_btnFiltro");
    });
  }

  for (let x in initSelectMenu) {
    if (initSelectMenu[x] !== null) {
      switch (x) {
        case "grado":
          $("#mAsignatura").attr("select", "true");
          break;
        case "materia":
          $("#mBloque").attr("select", "true");
          break;
        case "bloque":
          $("#mAsignatura").attr("select", "true");
          //  $("#mAsignatura").attr("class", "a_btnFiltro");
          break;
      }
    }
  }
};

const subMenuRecursivo = (data, selectElement) => {
  // console.log("menuRecursivo", data, selectElement);
  let tipo = $(selectElement).attr("tipo");
  if (Array.isArray(data)) {
    data.forEach((e) => {
      if (
        initSelectMenu[e.tipo].tipo === e.tipo &&
        initSelectMenu[e.tipo].id === e.id
      ) {
        subMenuRecursivo(e, selectElement);
      }
    });
  } else {
    for (let x in data) {
      if (x === tipo && Array.isArray(data[x])) {
        crearSubMenu(data[x], selectElement);
      } else if (x !== tipo && Array.isArray(data[x])) {
        subMenuRecursivo(data[x], selectElement);
      }
    }
  }
};

const menuPrincipal = () => {
  const menuPrincipal = [
    { name: "Grado", id: "mGrado", tipo: "grados", select: "true" },
    {
      name: "Asignatura",
      id: "mAsignatura",
      tipo: "materias",
      select: "false",
    },
    { name: "Bloque", id: "mBloque", tipo: "bloques", select: "false" },
    { name: "Lección", id: "mLeccion", tipo: "lecciones", select: "false" },
  ];

  let insertDespues = "a_buscador";
  menuPrincipal.forEach(({ name, id, tipo, select }) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("a_btnFiltro");
    newDiv.setAttribute("id", id);
    newDiv.setAttribute("tipo", tipo);
    newDiv.setAttribute("select", select);
    let newContent = document.createTextNode(name);
    newDiv.appendChild(newContent); //añade texto al div creado.
    $(newDiv).insertAfter($("#" + insertDespues));
    // $("#"+id).on( "click", buscarDatos(this));
    insertDespues = id;
  });

  $("div.a_btnFiltro").click(function () {
    subMenuRecursivo(crk.curso, this);
  });
};

const RecorridoRecursivo = (data) => {
  if (data.length > 1) {
    data.forEach((e) => {
      for (let x in e) {
        if (Array.isArray(e[x])) {
          RecorridoRecursivo(e[x]);
        }
      }
    });
  } else if (data.length === 1) {
  }
};

const  abrirVentana = (id,numero,prefijo)=> {
	/*
	 * NOMBRE: eventoTouchstart.
	 * UTILIDAD: Obtiene la info del click
	 * ENTRADAS: getElement > elemento que se da click.
	 * SALIDAS: Ninguna.
	 */
	/*var getId = $(getElement).attr("id").split("_")[2];
	var prefijo = titleNomenclatura[getId][1];*/
	window.location.href = "../apps/" +prefijo+'/'+ prefijo + ".html";
}
const { curso } = crk;

$(document).ready(function () {
  menuPrincipal();

  for (let x in curso) {
    if (Array.isArray(curso[x])) {
      // ArraysRecursivos(curso[x], null);
      /*let opc = {
        id: e[x][0].id,
        tipo: e[x][0].tipo,
        
      };
      initSelectMenu[e[x][0].tipo] = opc;*/
      if (curso[x].length === 1) {
        let opc = {
          id: curso[x][0].id,
          tipo: curso[x][0].tipo,
        };
        $("#mGrado").text(curso[x][0].n);
        $("#mGradou").text(curso[x][0].n);
        initSelectMenu[curso[x][0].tipo] = opc;
      }
      getAplicacionesRecursivo(curso[x]);
    }
  }
  let select;
  for (let x in initSelectMenu) {
    select = initSelectMenu[x] !== null && x !== "click" ? x : select;
  }
  //console.log("select",select);
  // initSelectMenu.click = (initSelectMenu.unico === null)?  opc.tipo : initSelectMenu.unico;

  switch (select) {
    case "grado":
      $("#mGrado").attr("class", "a_btnFiltro_press");
      $("#mAsignatura").attr("class", "a_btnFiltro");
      $("#mBloque").attr("class", "a_btnFiltro");
      $("#mLeccion").attr("class", "a_btnFiltro");
      $("#mAsignatura").attr("select", "true");

      break;
    case "materia":
      $("#mGrado").attr("class", "a_btnFiltro");
      $("#mAsignatura").attr("class", "a_btnFiltro_press");
      $("#mBloque").attr("class", "a_btnFiltro");
      $("#mLeccion").attr("class", "a_btnFiltro");
      $("#mGrado").attr("select", "true");
      $("#mAsignatura").attr("select", "true");
      $("#mBloque").attr("select", "true");
      break;
    case "bloque":
      $("#mGrado").attr("class", "a_btnFiltro");
      $("#mAsignatura").attr("class", "a_btnFiltro");
      $("#mBloque").attr("class", "a_btnFiltro_press");
      $("#mLeccion").attr("class", "a_btnFiltro");

      $("#mGrado").attr("select", "true");
      $("#mAsignatura").attr("select", "true");
      $("#mBloque").attr("select", "true");
      $("#mLeccion").attr("select", "true");
      break;
    case "leccion":
      $("#mGrado").attr("class", "a_btnFiltro");
      $("#mAsignatura").attr("class", "a_btnFiltro");
      $("#mBloque").attr("class", "a_btnFiltro");
      $("#mLeccion").attr("class", "a_btnFiltro_press");
      $("#mGrado").attr("select", "true");
      $("#mAsignatura").attr("select", "true");
      $("#mBloque").attr("select", "true");
      $("#mLeccion").attr("select", "true");
      break;
  }


  $secuencia = 1;
  $jsonApps.forEach(function (element) {
    //Agregamos una secuencias en el atributo real para poder hacer la páginacion en la función   mostrarApps()
    element["no"] = $secuencia;
    $secuencia++;
  });

  BusquedaGeneral();
  $("#inputfiltros").focusout(function () {
    $("#inputfiltros").hide();
  });

  $("#organizarApps").hide();

  //////////////////FILTROS CURSOS

  /*INICIO EVENTO MOFIFICADAS 2019*/
  /*INICIO PÁGINACION DEL CONTENEDOR CONTENEDOR PRINCIPAL DIV.#content*/
  /*
   * NOMBRE:
   * UTILIDAD: Páginacion anterior- siguiente
   * ENTRADAS:
   * SALIDAS:
   * FECHA uLTIMA MODIFICACIÓN: 6 DE FEBRERO DEL 2019
   */
  $("#back").click(function () {
    //Página anterior
    if ($pagActual > 1) {
      $pagActual--;
      $("#pagActual").text($pagActual);
      BusquedaGeneral();
    }
  });

  $("#next").click(function () {
    //Página siguiente
    if ($pagActual < Math.ceil($totalAppsVisibles / $numeroApps)) {
      $pagActual++;
      $("#pagActual").text($pagActual);
      BusquedaGeneral();
    }
  });
  /*FIN  PÁGINACION DEL CONTENEDOR CONTENEDOR PRINCIPAL DIV.#content*/

  /*INICIO FILTROS CURSOS*/
  /*
   * NOMBRE:
   * UTILIDAD: Agregar el evento click para mostrar las asignaturas
   * ENTRADAS:
   * SALIDAS:
   * FECHA uLTIMA MODIFICACIÓN: 31 DE ENERO DEL 2019
   */
  $("#filtrosAsignaturas").click(function () {
    $("#contAsignaturas").slideToggle("slow"); //Mostrar y ocultar  antes se llamaba cfiltrosApps0
  });

  /*FIN FILTROS CURSOS*/

  /*INICIO FILTROS CATEGORIA*/
  /*
   * NOMBRE:
   * UTILIDAD: Se agrega el evento click para filtrar por categoria para las 4 categorias tomar en cuenta que las categorias pueden aumentar
   * ENTRADAS:
   * SALIDAS:
   * FECHA uLTIMA MODIFICACIÓN: 31 DE ENERO DEL 2019
   */
  for ($i = 1; $i <= 5; $i++) {
    $("#fil" + $i).click(function () {
      $filter = $(this).attr("id");
      $filter = parseInt($filter.replace("fil", ""));
      if ($filterApp == 0) {
        $(this).attr("class", filterClass[$filter] + "_press");
        $filterApp = $filter;
        bFT = "1";
        BusquedaGeneral();
        // BusquedaTipo($filterApp);
      } else {
        if ($filterApp == $filter) {
          $filterApp = 0;
          $(this).attr("class", filterClass[$filter]);
          bFT = "0"; //
          BusquedaGeneral();
        } else {
          $(this).attr("class", filterClass[$filter] + "_press");
          $("#fil" + $filterApp).attr("class", filterClass[$filterApp]);
          $filterApp = $filter;
          bFT = "1"; //
          BusquedaGeneral();
          // BusquedaTipo($filterApp);
        }
      }
    });
  }
  /*FIN FILTROS CATEGORIA*/

  /*INICIO EVENTO MOUSEOVER TOOLTIP*/
  $("#content").mouseout(function () {
    //Ocultamos el elemento flotante para las aplicaciones en el contenedor principal
    $("#tooltip").hide();
    $("#flecha_tooltip").hide();
  });
  $("#contentC").mouseout(function () {
    //Ocultamos el elemento flotante para las aplicaciones en el contenedor de las apps clonadas
    $("#tooltipC").hide();
    $("#flecha_tooltip").hide();
  });
  /*FIN EVENTO MOUSEOVER TOOLTIP*/
});
