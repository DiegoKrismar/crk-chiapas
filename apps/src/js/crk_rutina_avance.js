/**
* @fileoverview AGREGA EVENTOS A LAS APLICACIONES PARA OBTENER SUS AVANCES Y LOS ALMACENA EN LOCALSTORAGE
* @version 1.0
* @date 02/02/22
*/
/***********************************************************************************
 *                                    CONSTANTES
 *************************************************************************************/
const PREFIX = window.location.href.split("/")[4];
const CATEGORIA = defineCategoria;
const USUARIO = "Diego";
/***********************************************************************************
 *                                    VARIABLES
 *************************************************************************************/
var progressJSON;
var registered = false;
/***********************************************************************************
 *                                    FUNCIONES
 *************************************************************************************/
class progress{
    constructor(usuario, PREFIX) {
        let aux2 = {
            nombre: usuario,
            progreso: [PREFIX]
        }
        this.usuarios = [aux2];
    }
}

function insertUsr(json, usr){
    /* NOMBRE: insertUsr.
	* UTILIDAD: Inserta un usuario al JSON de progreso
	* ENTRADAS: usr --> Nombre del usuario, json --> Objeto JSON.
	* SALIDAS: json --> Objeto json con el nuevo usuario insertado. */
    let aux2 = {
        nombre: usr,
        progreso: []
    }
    json.usuarios.push(aux2);
    return json;
}

function insertProgress(json, usr, prefix){
    /* NOMBRE: insertProgress.
	* UTILIDAD: Inserta un PREFIX al array de avance de un usuario
	* ENTRADAS: usr --> Nombre del usuario, json --> Objeto JSON, prefix --> PREFIX a insertar.
	* SALIDAS: json --> Objeto json con el nuevo PREFIX Insertado. */
   let exists = false;
   json.usuarios.forEach( function(valor, indice) {
       if(valor.nombre == usr){ //Ya existe un registro de ese usuario, insertar solamente el PREFIX
            console.log(valor);
            if(valor.progreso.indexOf(prefix) == -1)valor.progreso.push(prefix);
            exists = true;
        }
    });
    if(!exists){
        json = insertUsr(json, usr);
        insertProgress(json, usr, prefix);
    }
    return json;
}

function getJSON(){
    /* NOMBRE: getJSON.
	* UTILIDAD: Recupera el JSON del Local Storage
	* ENTRADAS: Ninguna.
	* SALIDAS: JSON recuperado del localStorage.*/
   let json = localStorage.getItem('AVANCECRK'); 
   return JSON.parse(json); 
}

function setJSON(json){
    /* NOMBRE: setJSON.
	* UTILIDAD: Almacena el JSON del localStorage
	* ENTRADAS: josn --> JSON a almacenar.
	* SALIDAS: Ninguna. */
    json = JSON.stringify(json)
    localStorage.setItem('AVANCECRK', json);
}

function finishApp(){
    if(!registered){
        let progressJSON = getJSON();
    
        if(progressJSON == null){ //No existe el JSON de progreso
            console.log('No existe');
            progressJSON = new progress(USUARIO, PREFIX);
            localStorage.setItem("AVANCECRK", JSON.stringify(progressJSON));
        }else{
            console.log('Ya existe el JSON de progreso');
            progressJSON = insertProgress(progressJSON, USUARIO, PREFIX);
            setJSON(progressJSON);
        }

        registered = true;
    }
}

window.onload = (event) => { //Cuando el DOM etá totalmente cargado    
    $(".d_emergenteclose, .d_emergentesbackclose").click(function(){
        progressJSON = getJSON(); //Ir por el JSON en el local Storage
        setAppsFunction();
    });
};


function setAppsFunction(){
    /* NOMBRE: setAppsFunction.
	* UTILIDAD: Configura la funcionalidad de las apps, para registrar el avance
	* ENTRADAS: Ninguna
	* SALIDAS: Ninguna.*/
    console.log(PREFIX);
    console.log(CATEGORIA);

    if(CATEGORIA == 'lectura'){
        setTimeout(function() {
            let aux = lecturaHelper();
            if(aux[0] == null && aux[1] == null) setAppsFunction();
        }, 500);
    }else if(CATEGORIA == 'video'){
        document.getElementsByTagName("video")[1].addEventListener('ended', function(e) {finishApp();});
    }else if(CATEGORIA == 'apliacion' || CATEGORIA == 'evaluacion'){
        let target = document.getElementById('d_emergenteoconte');
        let target2 = $('#d_emergenteoconte');
        let observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if(target2.css('display') == 'block'){
                    finishApp();
                }  
            });    
        });
        observer.observe(target, { attributes : true, attributeFilter : ['style'] });
    }else if(CATEGORIA == 'simulador'){
        const SUBTIPO = getType;
        if(SUBTIPO == 'instructivo'){
            finishApp();
        }else if(SUBTIPO == 'armado'){// La funcionalidad se encuentra en crk_armado_rutina, funcion eventBtnspasos()
            
        }
    }
}

function listenerButton(){
    /* NOMBRE: listenerButton.
	* UTILIDAD: Listener para el clic del cambo de página en las lecturas
	* ENTRADAS: Ninguna
	* SALIDAS: Ninguna.*/
    var iframe = document.getElementById('actividad');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    innerDoc = innerDoc.getElementById("currentPageIndexTextField").value.split('/');
    if(innerDoc[0] == innerDoc[1]) finishApp();
}

function lecturaHelper(){
    /* NOMBRE: lecturaHelper (FLIP).
	* UTILIDAD: Obtiene los elementos en el DOM para asignarles eventos
	* ENTRADAS: Ninguna
	* SALIDAS: Ninguna.*/

    //Iframe
    let iframe = document.getElementById('actividad');
    let innerDoc = iframe.contentDocument || iframe.contentWindow.document;

    //BottonBar
    let toolBar = innerDoc.getElementById("fbToolBar");
    if(toolBar==null)return [null, null];
    let bottomBtn = toolBar.children[1].children[3];
    bottomBtn.onclick = listenerButton;
    
    //SideBtn
    let toolContainer = innerDoc.getElementById('tmpContainer');
    if(toolContainer==null)return [null, null];
    let rightBtn = toolContainer.children[17]
    rightBtn.onclick = listenerButton;

    //única página
    innerDoc = innerDoc.getElementById("currentPageIndexTextField").value.split('/');
    if(innerDoc[0] == innerDoc[1]) finishApp();

    return [bottomBtn];
}

function armadoHelper(){
    /* NOMBRE: armadoHelper.
	* UTILIDAD: Verifica si ya se llegó al 80% de pasos completados en el armado
	* ENTRADAS: Ninguna
	* SALIDAS: Ninguna.*/
    let pasos = $(".d_menupasosbtnsconte > div").length;    
    let goal = Math.floor(pasos * 0.8);
    if(pasosCompletados == goal) finishApp();
}