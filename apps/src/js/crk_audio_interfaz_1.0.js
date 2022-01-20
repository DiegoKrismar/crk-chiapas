/***********************************************************************************
* 
*                                    CONSTANTES
*
*************************************************************************************/
 //Almacena el path de donde se alojan los recursos
 var PREFIJOSOUNDD = "../src/audio/crk_";//Prefijo para las imÃ¡genes
 /***********************************************************************************
 * 
 *                                    CONSTANTES
 *
 *************************************************************************************/
 var sndCorrecto = new Audio();
 var sndIncorrecto = new Audio();
 /*************************************************************************************
 *
 * 								FUNCIONES Y PROCEDIMIENTOS
 *
 **************************************************************************************/
 function generaAleatorio(itm){
     /*
     * NOMBRE: generaAleatorio.
     * UTILIDAD: Generar nÃºmero aleatorio.
     * ENTRADAS: itm > entero que limita la generaciÃ³n de nÃºmeros aleatorios.
     * SALIDAS: entero > NÃºmero aleatorio generado.
     */
     /*** Variables locales ***/
     rand = null;//Almacena el nÃºmero a retornar.
     /*************************/
     do{
         rand = Math.floor(Math.random()*100);
     }while(rand > itm);
     return (rand);
 }
 
 function definirFormato(miAudio){
     /*
     * NOMBRE: definirFormato. 
     * UTILIDAD: Seleccionar quÃ© extensiÃ³n es la mÃ¡s indicada para reproducir audios en el dispositivo actual.
     * ENTRADAS: miAudio -> objeto tipo Audio(), un Audio que usaremos para probar que formato es el indicado.
     * SALIDAS: formato -> String, indica la extensiÃ³n que mÃ¡s conviene utilizar en audios.
     */
     /*** VARIABLES LOCALES ***/
     formato = null;
     /************************/    
     if(miAudio.canPlayType("audio/mpeg") != ""){
         formato = ".mp3";
     }else{
         if(miAudio.canPlayType("audio/ogg") != ""){
             formato = ".ogg";
         }else{
             if(miAudio.canPlayType("audio/mp4") != ""){
                 formato = ".aac";
             }
         }
     }
     
     return formato;
 }
 
 function playCorrecto(){
     /*
     * NOMBRE: playCorrecto.
     * UTILIDAD: Reproduce un audio aleatorio para respuesta correcta.
     * ENTRADAS: Ninguna.
     * SALIDAS: Ninguna.
     */
     switch(generaAleatorio(16)){
         case 0:
             sndCorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"bien1"+definirFormato(sndCorrecto));
             sndCorrecto.load(); // required for 'older' browsers
             break;
         case 1:
             sndCorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"bien2"+definirFormato(sndCorrecto));
             sndCorrecto.load(); // required for 'older' browsers
             break;
         case 2:
             sndCorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"bien3"+definirFormato(sndCorrecto));
             sndCorrecto.load(); // required for 'older' browsers
             break;
         case 3:
             sndCorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"bien4"+definirFormato(sndCorrecto));
             sndCorrecto.load(); // required for 'older' browsers
             break;
         case 4:
             sndCorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"bien5"+definirFormato(sndCorrecto));
             sndCorrecto.load(); // required for 'older' browsers
             break;
         case 5:
             sndCorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"bien6"+definirFormato(sndCorrecto));
             sndCorrecto.load(); // required for 'older' browsers
             break;
         case 6:
             sndCorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"bien7"+definirFormato(sndCorrecto));
             sndCorrecto.load(); // required for 'older' browsers
             break;
         case 7:
             sndCorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"bien8"+definirFormato(sndCorrecto));
             sndCorrecto.load(); // required for 'older' browsers
             break;
         case 8:
             sndCorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"bien9"+definirFormato(sndCorrecto));
             sndCorrecto.load(); // required for 'older' browsers
             break;
         case 9:
             sndCorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"bien10"+definirFormato(sndCorrecto));
             sndCorrecto.load(); // required for 'older' browsers
             break;
         case 10:
             sndCorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"bien11"+definirFormato(sndCorrecto));
             sndCorrecto.load(); // required for 'older' browsers
             break;
         case 11:
             sndCorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"bien12"+definirFormato(sndCorrecto));
             sndCorrecto.load(); // required for 'older' browsers
             break;
         case 12:
             sndCorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"bien13"+definirFormato(sndCorrecto));
             sndCorrecto.load(); // required for 'older' browsers
             break;
         case 13:
             sndCorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"bien14"+definirFormato(sndCorrecto));
             sndCorrecto.load(); // required for 'older' browsers
             break;
         case 14:
             sndCorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"bien15"+definirFormato(sndCorrecto));
             sndCorrecto.load(); // required for 'older' browsers
             break;
         case 15:
             sndCorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"bien16"+definirFormato(sndCorrecto));
             sndCorrecto.load(); // required for 'older' browsers
             break;
         case 16:
             sndCorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"bien17"+definirFormato(sndCorrecto));
             sndCorrecto.load(); // required for 'older' browsers
             break;
     }
     sndCorrecto.play();
 }
 
 function playIncorrecto(){
     /*
     * NOMBRE: playIncorrecto.
     * UTILIDAD: Reproduce un audio aleatorio para respuesta incorrecta.
     * ENTRADAS: Ninguna.
     * SALIDAS: Ninguna.
     */
     switch(generaAleatorio(8)){
         case 0:
             sndIncorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"mal1"+definirFormato(sndIncorrecto));
             sndIncorrecto.load(); // required for 'older' browsers
             break;
         case 1:
             sndIncorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"mal2"+definirFormato(sndIncorrecto));
             sndIncorrecto.load(); // required for 'older' browsers
             break;
         case 2:
             sndIncorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"mal3"+definirFormato(sndIncorrecto));
             sndIncorrecto.load(); // required for 'older' browsers
             break;
         case 3:
             sndIncorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"mal4"+definirFormato(sndIncorrecto));
             sndIncorrecto.load(); // required for 'older' browsers
             break;
         case 4:
             sndIncorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"mal5"+definirFormato(sndIncorrecto));
             sndIncorrecto.load(); // required for 'older' browsers
             break;
         case 5:
             sndIncorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"mal6"+definirFormato(sndIncorrecto));
             sndIncorrecto.load(); // required for 'older' browsers
             break;
         case 6:
             sndIncorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"mal7"+definirFormato(sndIncorrecto));
             sndIncorrecto.load(); // required for 'older' browsers
             break;
         case 7:
             sndIncorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"mal8"+definirFormato(sndIncorrecto));
             sndIncorrecto.load(); // required for 'older' browsers
             break;
         case 8:
             sndIncorrecto.setAttribute("src",IP+PREFIJOSOUNDD+"mal9"+definirFormato(sndIncorrecto));
             sndIncorrecto.load(); // required for 'older' browsers
             break;
     }
     sndIncorrecto.play();
 }