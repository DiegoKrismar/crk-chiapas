var _$_7515=[".d_cuadroCrucigrama","cursor","default","css","click","off",".d_inputOn",".d_input","fadeOut",".d_leyenda","#idSolucion","solution","addClass","mal","attr",".","removeClass","existe",".prueba","show","size","get","hide","push","length","eval","#palabra","bien","html",".d_contenido","remove","pulse","Da clic en la primera y \xFAltima letra de la palabra que ubicaste.","text","#significado","00:","0",":","00","#conteTiempo","<div class = \'d_cuadroCrucigrama\'></div>","append","#conteCuadro","<div class = \'fila\' id = \'idFila","\'></div>","<div class=\'d_inputOn\'  id = \'idInputOn","ren","\'><table class = \'d_input\' id = \'idFila","\'><tr><td></td></tr></table></div>","#idFila","width","%","id","splice","toLocaleUpperCase","","random","sort","di","ArAb","AbAr","DidArAb","DdiAbAr","DdiArAb","DdiAbAb","split","td","find","p","join",",","A","B","C","D","E","F","G","H","I","J","K","L","M","N","\xD1","O","P","Q","R","S","T","U","V","W","X","Y","Z","\xC1","\xC9","\xCD","\xD3","\xDA","#","table","bold","style","removeAttr","#btnEvaluarActividad","#btnEvaluar","indexOf","No formaste ninguna palabra","toUpperCase","fadeIn","color","left","position","top","height","<div class = \'prueba\' id = \'idLinea","before","pow","sqrt","atan","PI","absolute","#idLinea","transition","background-color","rotate(","deg)","z-index","n","r","a","parent","00:0","slideDown","pulseReloj"];var bandRetro=0;var colorLine=null;var bandCrono=true;var divConte=_$_7515[0];var numPosId=[];var arIds=[];var arIdOn=[];var bandSent=null;var contadorLines=0;var terminaCont=false;var dirTiempoCrono=null;var numAciertos=0;var numErrores=0;var tmpSolucion=null;var minutoAct=0;var segundoAct=0;var numPorc=0;var gradosGira=0;function evaluaActividad(){var _0xB3A97=0;var _0xB3AEE=0;var _0xB3B45=0;detieneCronometro();stopCrono();$(_$_7515[6])[_$_7515[5]](_$_7515[4])[_$_7515[3]](_$_7515[1],_$_7515[2]);$(_$_7515[7])[_$_7515[5]](_$_7515[4])[_$_7515[3]](_$_7515[1],_$_7515[2]);$(_$_7515[9])[_$_7515[8]]();addEval();_0xB3A97+= numAciertos;_0xB3AEE= numPalabras- numAciertos;aciertos+= _0xB3A97;errores+= _0xB3AEE;_0xB3B45= parseInt((100* aciertos)/ (aciertos+ errores));if(_0xB3A97== numPalabras){}else {activarBtn(_$_7515[10]);$(_$_7515[10])[_$_7515[12]](_$_7515[11])};(_0xB3B45>= 75)?fillBarBien():fillBarMal();evaluaDefault()}function evaluarAct(){var _0xB3A97=0;var _0xB3AEE=0;var _0xB3B45=0;detieneCronometro();stopCrono();$(_$_7515[7])[_$_7515[5]](_$_7515[4])[_$_7515[3]](_$_7515[1],_$_7515[2]);$(_$_7515[9])[_$_7515[8]]();addEval();_0xB3A97+= numAciertos;numErrores= numPalabras- numAciertos;aciertos+= _0xB3A97;errores+= numErrores;_0xB3B45= (100* aciertos)/ (aciertos+ errores);if(_0xB3B45>= 75){fillBarBien()}else {fillBarMal();activarBtn(_$_7515[10]);$(_$_7515[10])[_$_7515[12]](_$_7515[11])};evaluaDefault()}function verSolucionCorr(){desactivarBtn(_$_7515[10]);$(_$_7515[7])[_$_7515[5]](_$_7515[4])[_$_7515[3]](_$_7515[1],_$_7515[2]);$(_$_7515[6])[_$_7515[5]](_$_7515[4])[_$_7515[3]](_$_7515[1],_$_7515[2]);$(_$_7515[15]+ claseEvalMal)[_$_7515[14]](_$_7515[13],_$_7515[13]);$(_$_7515[15]+ claseEvalMal)[_$_7515[12]](claseEvalBien);$(_$_7515[15]+ claseEvalBien)[_$_7515[16]](claseEvalMal);if(bandRetro== 0){$(_$_7515[18])[_$_7515[14]](_$_7515[17],1);retroAlimenta()}else {$(_$_7515[18])[_$_7515[19]]()};tmpSolucion= setTimeout(function(){activarBtn(_$_7515[10]);var _0xB101C=$(_$_7515[18])[_$_7515[20]]();var _0xC03C7=[];var _0xC041E=[];for(g= 0;g< _0xB101C;g++){if($($(_$_7515[18])[_$_7515[21]](g))[_$_7515[14]](_$_7515[17])== undefined){$($(_$_7515[18])[_$_7515[21]](g))[_$_7515[22]]()}};for(y= 0;y< _0xB101C;y++){var _0xAD8B7=$(_$_7515[15]+ claseEvalBien)[_$_7515[21]](y);if($(_0xAD8B7)[_$_7515[14]](_$_7515[13])== _$_7515[13]){_0xC03C7[_$_7515[23]]($(_0xAD8B7))}};for(k= 0;k< _0xC03C7[_$_7515[24]];k++){_0xC03C7[k][_$_7515[12]](claseEvalMal);_0xC03C7[k][_$_7515[16]](claseEvalBien)}},noSegundoRetro)}function addEval(){for(e= 1;e<= arPalabras[_$_7515[24]];e++){if($(_$_7515[26]+ e)[_$_7515[14]](_$_7515[25])!= _$_7515[27]){$(elementosAgregaEval+ e)[_$_7515[12]](claseEvalMal)}}}function siguienteActividad(){siguienteDefault();arPalabras= [];numAciertos= 0;aciertosEval= 0;numErrores= 0;bandRetro= 0;$(_$_7515[29])[_$_7515[28]](htmlInicio);$(_$_7515[18])[_$_7515[30]]();generarPalabras();creaSopa()}function siguienteAct(){siguienteDefault();arPalabras= [];numAciertos= 0;aciertosEval= 0;numErrores= 0;bandRetro= 0;$(_$_7515[29])[_$_7515[28]](htmlInicio);$(_$_7515[18])[_$_7515[30]]();generarPalabras();creaSopa()}function creaSopa(){var _0xB1073=[];$(_$_7515[34])[_$_7515[33]](_$_7515[32])[_$_7515[12]](_$_7515[31]);minutoAct= minuto;segundoAct= segundo;$(_$_7515[39])[_$_7515[33]](_$_7515[35]+ _$_7515[36]+ (minutoAct+ 1)+ _$_7515[37]+ _$_7515[38]);startCrono();for(i= 0;i< arPalabras[_$_7515[24]];i++){_0xB1073[_$_7515[23]](arPalabras[i][0])};for(k= 0;k<= medidasSopaFilas;k++){numPosId[_$_7515[23]](k)};addCuadros();addPalabras(_0xB1073);addLetrasDis()}function addCuadros(){var _0x13A8C=1;$(_$_7515[42])[_$_7515[41]](_$_7515[40]);do{$(_$_7515[0])[_$_7515[41]](_$_7515[43]+ _0x13A8C+ _$_7515[44]);_0x13A8C++}while(_0x13A8C< medidasSopaFilas+ 1);;numPorc= 100/ medidasSopaColumnas;for(e= 1;e< medidasSopaColumnas+ 1;e++){for(r= 1;r< medidasSopaColumnas+ 1;r++){$(_$_7515[49]+ e)[_$_7515[41]](_$_7515[45]+ e+ _$_7515[46]+ r+ _$_7515[47]+ e+ _$_7515[46]+ r+ _$_7515[48])}};$(_$_7515[6])[_$_7515[3]](_$_7515[50],numPorc+ _$_7515[51]);$(_$_7515[6])[_$_7515[4]](function(){validaPalabra($(this)[_$_7515[14]](_$_7515[52]))})}function addPalabras(_0xADC1D){var _0xADC74=_0xADC1D;do{var _0xADB18=null;if(_0xADC74[_$_7515[24]]!= 0){_0xADB18= _0xADC74[0];addPal(_0xADB18);_0xADC74[_$_7515[53]](0,1)}}while(_0xADC74[_$_7515[24]]!= 0);}function addPal(_0xADB18){var _0xADAC1=null;var _0xADBC6=null;var _0xADB6F=null;var _0xADA6A=[1,2,3,4,5,6,7,8];_0xADB18= _0xADB18[_$_7515[54]]();do{_0xADAC1= getIdInput();if($(_0xADAC1)[_$_7515[33]]()== _$_7515[55]){_0xADBC6= 0}else {_0xADBC6= 1}}while(_0xADBC6!= 0);;_0xADA6A= _0xADA6A[_$_7515[57]](function(){return Math[_$_7515[56]]()- 0.5});_0xADB6F= _0xADA6A[0];switch(_0xADB6F){case 1:appendId(_0xADB18,numFila,numCol,_$_7515[52]);break;case 2:appendId(_0xADB18,numFila,numCol,_$_7515[58]);break;case 3:appendId(_0xADB18,numFila,numCol,_$_7515[59]);break;case 4:appendId(_0xADB18,numFila,numCol,_$_7515[60]);break;case 5:appendId(_0xADB18,numFila,numCol,_$_7515[61]);break;case 6:appendId(_0xADB18,numFila,numCol,_$_7515[62]);break;case 7:appendId(_0xADB18,numFila,numCol,_$_7515[63]);break;case 8:appendId(_0xADB18,numFila,numCol,_$_7515[64]);break}}function getIdInput(){var _0xADAC1=null;numPosId= numPosId[_$_7515[57]](function(){return Math[_$_7515[56]]()- 0.5});numFila= numPosId[0];numPosId= numPosId[_$_7515[57]](function(){return Math[_$_7515[56]]()- 0.5});numCol= numPosId[0];_0xADAC1= _$_7515[49]+ numFila+ _$_7515[46]+ numCol;return _0xADAC1}var numFila=null;var numCol=null;function appendId(_0xADB18,_0xAE64F,_0xAE5F8,_0xADB6F){var _0xAE54A=_0xADB18[_$_7515[24]];var _0xAE3EE=_0xADB18[_$_7515[65]](_$_7515[55]);var _0xAE445=_0xAE5F8;var _0x13A8C=0;var _0xAE6FD=[];var _0xAE4F3=null;if(_0xADB6F== _$_7515[59]|| _0xADB6F== _$_7515[60]|| _0xADB6F== _$_7515[61]|| _0xADB6F== _$_7515[62]|| _0xADB6F== _$_7515[63]|| _0xADB6F== _$_7515[64]){var _0xAE49C=_0xAE64F};do{if(_0xADB6F== _$_7515[59]|| _0xADB6F== _$_7515[60]){_0xAE4F3= $(_$_7515[49]+ _0xAE49C+ _$_7515[46]+ _0xAE5F8)}else {if(_0xADB6F== _$_7515[61]|| _0xADB6F== _$_7515[62]|| _0xADB6F== _$_7515[63]|| _0xADB6F== _$_7515[64]){_0xAE4F3= $(_$_7515[49]+ _0xAE49C+ _$_7515[46]+ _0xAE445)}else {_0xAE4F3= $(_$_7515[49]+ _0xAE64F+ _$_7515[46]+ _0xAE445)}};if($(_0xAE4F3)[_$_7515[33]]()== _$_7515[55]&& $(_0xAE4F3)[_$_7515[24]]!= 0){_0xAE6FD[_$_7515[23]]($(_0xAE4F3))}else {if($(_0xAE4F3)[_$_7515[33]]()== _0xAE3EE[_0x13A8C]&& $(_0xAE4F3)[_$_7515[24]]!= 0){_0xAE6FD[_$_7515[23]]($(_0xAE4F3))}else {_0x13A8C= _0xAE54A;_0xAE6FD= [];addPal(_0xADB18)}};_0x13A8C++;if(_0xADB6F== _$_7515[52]){_0xAE445++}else {if(_0xADB6F== _$_7515[58]){_0xAE445--}else {if(_0xADB6F== _$_7515[59]){_0xAE49C++}else {if(_0xADB6F== _$_7515[60]){_0xAE49C--}else {if(_0xADB6F== _$_7515[61]){_0xAE49C++;_0xAE445++}else {if(_0xADB6F== _$_7515[62]){_0xAE49C--;_0xAE445--}else {if(_0xADB6F== _$_7515[63]){_0xAE445--;_0xAE49C++}else {if(_0xADB6F== _$_7515[64]){_0xAE445++;_0xAE49C--}}}}}}}}}while(_0x13A8C< _0xAE54A);;for(o= 0;o< _0xAE3EE[_$_7515[24]];o++){var _0xAD860=_0xAE3EE[o];var _0xAE5A1=_0xAE6FD[o];$(_0xAE5A1)[_$_7515[67]](_$_7515[66])[_$_7515[33]](_0xAD860);if(o== 0){$(_0xAE5A1)[_$_7515[14]](_$_7515[68],_0xAE3EE[_$_7515[69]](_$_7515[55]))}else {if(o== _0xAE3EE[_$_7515[24]]- 1){if($(_0xAE5A1)[_$_7515[14]](_$_7515[68])!= undefined){var _0xAE6A6=$(_0xAE5A1)[_$_7515[14]](_$_7515[68]);$(_0xAE5A1)[_$_7515[14]](_$_7515[68],_0xAE3EE[_$_7515[69]](_$_7515[55])+ _$_7515[70]+ _0xAE6A6)}else {$(_0xAE5A1)[_$_7515[14]](_$_7515[68],_0xAE3EE[_$_7515[69]](_$_7515[55]))}}}}}function addLetrasDis(){var _0xAD809=[_$_7515[71],_$_7515[72],_$_7515[73],_$_7515[74],_$_7515[75],_$_7515[76],_$_7515[77],_$_7515[78],_$_7515[79],_$_7515[80],_$_7515[81],_$_7515[82],_$_7515[83],_$_7515[84],_$_7515[85],_$_7515[86],_$_7515[87],_$_7515[88],_$_7515[89],_$_7515[90],_$_7515[91],_$_7515[92],_$_7515[93],_$_7515[94],_$_7515[95],_$_7515[96],_$_7515[97],_$_7515[98],_$_7515[99],_$_7515[100],_$_7515[101],_$_7515[102]];for(i= 0;i< $(_$_7515[7])[_$_7515[24]];i++){var _0xAD8B7=$(_$_7515[7])[_$_7515[21]](i);var _0xAD860=$(_0xAD8B7)[_$_7515[33]]();_0xAD809= _0xAD809[_$_7515[57]](function(){return Math[_$_7515[56]]()- 0.5});if(_0xAD860== _$_7515[55]){$(_0xAD8B7)[_$_7515[67]](_$_7515[66])[_$_7515[33]](_0xAD809[0])}}}function validaPalabra(_0x29278){arIdOn[_$_7515[23]]([$(_$_7515[103]+ _0x29278)[_$_7515[14]](_$_7515[52])]);arIds[_$_7515[23]]([$(_$_7515[103]+ _0x29278)[_$_7515[67]](_$_7515[104])[_$_7515[14]](_$_7515[52]),$(_$_7515[103]+ _0x29278)[_$_7515[67]](_$_7515[104])[_$_7515[14]](_$_7515[68])]);for(i= 0;i< arIds[_$_7515[24]];i++){var _0xBE68D=arIds[i];var _0x29278=_0xBE68D[0];$(_$_7515[103]+ _0x29278)[_$_7515[3]]({"font-weight":_$_7515[105]})};if(arIds[_$_7515[24]]== 2){califica(arIds,arIdOn);arIds= [];arIdOn= []}}function califica(_0x31036,_0xAF43E){var _0x55B76=_0x31036[0][0];var _0xAF390=_0x31036[0][1];var _0x55BCD=_0x31036[1][0];var _0xAF3E7=_0x31036[1][1];var _0xAF28B=_0xAF43E[0][0];var _0xAF2E2=_0xAF43E[1][0];$(_$_7515[7])[_$_7515[107]](_$_7515[106]);if(_0xAF390== _0xAF3E7&& _0xAF390!= undefined&& _0xAF3E7!= undefined&& _0x55B76!= _0x55BCD){$(_$_7515[103]+ _0x55B76)[_$_7515[107]](_$_7515[68]);$(_$_7515[103]+ _0x55BCD)[_$_7515[107]](_$_7515[68]);if(bandRetro== 0){if(numInterfaz== 1){activarBtn(_$_7515[108])}else {activarBtn(_$_7515[109])}};muestraSigni(_0xAF390);trazaLinea(_0x55B76,_0x55BCD,_0xAF28B,_0xAF2E2,_0xAF390)}else {if(_0x55B76== _0x55BCD){}else {if(_0xAF390!= undefined&& _0xAF3E7!= undefined){var _0xAF495=_0xAF390[_$_7515[65]](_$_7515[70]);var _0xAF4EC=_0xAF3E7[_$_7515[65]](_$_7515[70]);var _0xAF339=null;var _0xAF543=null;if(_0xAF495[_$_7515[24]]== 2|| _0xAF4EC[_$_7515[24]]== 2){if(_0xAF495[_$_7515[24]]== 2){_0xAF543= _0xAF495;_0xAF339= _0xAF4EC[0]}else {if(_0xAF4EC[_$_7515[24]]== 2){_0xAF543= _0xAF4EC;_0xAF339= _0xAF495[0]}};for(j= 0;j< _0xAF543[_$_7515[24]];j++){var _0x1609C=_0xAF543[j];if(_0x1609C== _0xAF339){j= _0xAF543[_$_7515[24]];muestraSigni(_0x1609C);trazaLinea(_0x55B76,_0x55BCD,_0xAF28B,_0xAF2E2,_0xAF390);_0xAF234(_0x55B76,_0x1609C);_0xAF234(_0x55BCD,_0x1609C);function _0xAF234(_0x29278,_0xAF648){var _0xAF59A=$(_$_7515[103]+ _0x29278)[_$_7515[14]](_$_7515[68])[_$_7515[65]](_$_7515[70]);var _0xAF5F1=null;$(_$_7515[103]+ _0x29278)[_$_7515[107]](_$_7515[68]);if(_0xAF59A[_$_7515[24]]> 1){var _0x167BF=_0xAF59A[_$_7515[110]](_0xAF648);_0xAF59A[_$_7515[53]](_0x167BF,1);$(_$_7515[103]+ _0x29278)[_$_7515[14]](_$_7515[68],_0xAF59A[0])}}}}}}else {$(_$_7515[34])[_$_7515[16]](_$_7515[31])[_$_7515[33]](_$_7515[55]);$(_$_7515[34])[_$_7515[33]](_$_7515[111]);$(_$_7515[34])[_$_7515[107]](_$_7515[106]);playIncorrecto()}}}}function muestraSigni(_0xADB18){for(i= 0;i< arPalabras[_$_7515[24]];i++){var _0xAF339=null;_0xAF339= arPalabras[i][0][_$_7515[112]]();if(_0xAF339== _0xADB18){if(bandRetro== 0){$(_$_7515[34])[_$_7515[33]](arPalabras[i][2]);setTimeout(function(){$(_$_7515[34])[_$_7515[8]](function(){$(this)[_$_7515[33]](_$_7515[55]);$(_$_7515[34])[_$_7515[113]]()})},5000);i= arPalabras[_$_7515[24]]}}};for(e= 1;e<= arPalabras[_$_7515[24]];e++){var _0xB82FA=$(_$_7515[26]+ e)[_$_7515[33]]()[_$_7515[112]]();if(_0xB82FA== _0xADB18){$(elementosAgregaEval+ e)[_$_7515[12]](claseEvalBien);$(_$_7515[26]+ e)[_$_7515[14]](_$_7515[25],_$_7515[27]);colorLine= $(_$_7515[26]+ e)[_$_7515[3]](_$_7515[114]);e= arPalabras[_$_7515[24]]}}}function trazaLinea(_0x55B76,_0x55BCD,_0xAF28B,_0xAF2E2,_0xADB18){var _0xBC7F7=getOrden(_0x55B76,_0x55BCD,_0xAF28B,_0xAF2E2);var _0xBC84E=0;var _0xBC8A5=_0xBC7F7[0];var _0xBC8FC=_0xBC7F7[1];var x1=$(_$_7515[103]+ _0xBC8A5)[_$_7515[116]]()[_$_7515[115]];var y1=$(_$_7515[103]+ _0xBC8A5)[_$_7515[116]]()[_$_7515[117]];var x2=$(_$_7515[103]+ _0xBC8FC)[_$_7515[116]]()[_$_7515[115]];var y2=$(_$_7515[103]+ _0xBC8FC)[_$_7515[116]]()[_$_7515[117]];var _0xBC749=$(divConte)[_$_7515[50]]();var _0xBC6F2=$(divConte)[_$_7515[118]]();var _0xBCA01=((100* $(_$_7515[103]+ _0xBC8A5)[_$_7515[116]]()[_$_7515[117]])/ _0xBC6F2);var _0xBC9AA=((100* $(_$_7515[103]+ _0xBC8A5)[_$_7515[116]]()[_$_7515[115]])/ _0xBC749);$(_$_7515[34])[_$_7515[16]](_$_7515[31])[_$_7515[33]]();$(_$_7515[34])[_$_7515[107]](_$_7515[106]);$(divConte)[_$_7515[120]](_$_7515[119]+ contadorLines+ _$_7515[44]);_0xBC84E= Math[_$_7515[122]]((Math[_$_7515[121]]((x2- x1),2))+ (Math[_$_7515[121]]((y2- y1),2)));_0xBC84E= ((100* _0xBC84E)/ _0xBC749)+ numPorc;var _0xBC953=null;var _0xBC7A0=null;_0xBC953= ((y2- y1)/ (x2- x1));_0xBC7A0= ((180* Math[_$_7515[123]](_0xBC953))/ Math[_$_7515[124]]);if(bandRetro!= 0){$(_$_7515[126]+ contadorLines)[_$_7515[3]]({"position":_$_7515[125],"top":(_0xBCA01)+ _$_7515[51],"left":_0xBC9AA+ _$_7515[51],"width":_0xBC84E+ _$_7515[51]})}else {$(_$_7515[126]+ contadorLines)[_$_7515[127]]({"position":_$_7515[125],"top":(_0xBCA01)+ _$_7515[51],"left":_0xBC9AA+ _$_7515[51],"width":_0xBC84E+ _$_7515[51]})};$(_$_7515[126]+ contadorLines)[_$_7515[3]](_$_7515[128],colorLine);if(bandSent== 1){$(_$_7515[126]+ contadorLines)[_$_7515[3]]({"top":(_0xBCA01- 2.9)+ _$_7515[51],"left":_0xBC9AA+ 3.5+ _$_7515[51]});$(_$_7515[126]+ contadorLines)[_$_7515[3]]({"transform":_$_7515[129]+ _0xBC7A0+ _$_7515[130],"transform-origin":_$_7515[115]})}else {if(bandSent== 2){$(_$_7515[126]+ contadorLines)[_$_7515[3]]({"top":(_0xBCA01- 2)+ _$_7515[51],"left":_0xBC9AA+ 2+ _$_7515[51]});$(_$_7515[126]+ contadorLines)[_$_7515[3]]({"transform":_$_7515[129]+ _0xBC7A0+ _$_7515[130],"transform-origin":_$_7515[115]})}else {if(bandSent== 3){$(_$_7515[126]+ contadorLines)[_$_7515[3]]({"top":(_0xBCA01- 2)+ _$_7515[51],"left":_0xBC9AA+ 6+ _$_7515[51]});$(_$_7515[126]+ contadorLines)[_$_7515[3]]({"transform":_$_7515[129]+ (_0xBC7A0- 180)+ _$_7515[130],"transform-origin":_$_7515[115]})}}};if(bandRetro== 0){playCorrecto();if(bandCrono== true){numAciertos++;if(numAciertos== arPalabras[_$_7515[24]]){$(_$_7515[0])[_$_7515[3]](_$_7515[131],_$_7515[36]);detieneCronometro();stopCrono();if(numInterfaz== 1){evaluaActividad()}else {evaluarAct()};$(_$_7515[7])[_$_7515[5]](_$_7515[4])[_$_7515[3]](_$_7515[1],_$_7515[2])}}};setTimeout(function(){contadorLines++},200)}function getOrden(_0x55B76,_0x55BCD,_0xAF28B,_0xAF2E2){var _0xB5057=getFilaRen(_0x55B76,1);var _0xB50AE=getFilaRen(_0x55BCD,1);var _0xB5105=getFilaRen(_0x55B76,2);var _0xB515C=getFilaRen(_0x55BCD,2);var _0xB4FA9=[];var _0xB5000=[];if(_0xB5057== _0xB50AE){bandSent= 0;if(Number(_0xB5105)> Number(_0xB515C)){_0xB4FA9= [_0xAF2E2,_0xAF28B]}else {_0xB4FA9= [_0xAF28B,_0xAF2E2]}}else {if(_0xB5105== _0xB515C){bandSent= 1;if(Number(_0xB5057)> Number(_0xB50AE)){_0xB4FA9= [_0xAF2E2,_0xAF28B]}else {_0xB4FA9= [_0xAF28B,_0xAF2E2]}}else {if(Number(_0xB5057)> Number(_0xB50AE)){_0xB4FA9= [_0xAF2E2,_0xAF28B];_0xB5000= [_0x55BCD,_0x55B76]}else {_0xB4FA9= [_0xAF28B,_0xAF2E2];_0xB5000= [_0x55B76,_0x55BCD]};var _0xB51B3=_0xB5000[0][_$_7515[65]](_$_7515[134])[1][_$_7515[65]](_$_7515[133])[1][_$_7515[65]](_$_7515[132])[1];var _0xB520A=_0xB5000[1][_$_7515[65]](_$_7515[134])[1][_$_7515[65]](_$_7515[133])[1][_$_7515[65]](_$_7515[132])[1];if(Number(_0xB51B3)> Number(_0xB520A)){bandSent= 3}else {bandSent= 2}}};return _0xB4FA9}function getFilaRen(_0x29278,no){var _0xB4EFB=_0x29278[_$_7515[65]](_$_7515[134])[1][_$_7515[65]](_$_7515[133])[0];var _0xB4F52=_0x29278[_$_7515[65]](_$_7515[134])[1][_$_7515[65]](_$_7515[133])[1][_$_7515[65]](_$_7515[132])[1];if(no== 1){return _0xB4EFB}else {return _0xB4F52}}function retroAlimenta(){var _0xBACC7=[];var _0xBAC70=0;bandRetro= 1;$(_$_7515[9])[_$_7515[8]]();$(_$_7515[7])[_$_7515[5]](_$_7515[4])[_$_7515[3]](_$_7515[1],_$_7515[2]);for(i= 0;i< $(_$_7515[7])[_$_7515[24]];i++){var _0xAD8B7=$(_$_7515[7])[_$_7515[21]](i);var _0xAF59A=$(_0xAD8B7)[_$_7515[14]](_$_7515[68]);arIds= [];if(_0xAF59A!= undefined){_0xBAD1E($(_0xAD8B7)[_$_7515[14]](_$_7515[52]),i);i= $(_$_7515[7])[_$_7515[24]];_0xBAC70++}};if(_0xBAC70!= 0){_0xBAD75()};function _0xBAD75(){bandRetro= 1;validaPalabra($(_$_7515[103]+ _0xBACC7[0][0])[_$_7515[135]]()[_$_7515[14]](_$_7515[52]));validaPalabra($(_$_7515[103]+ _0xBACC7[0][1])[_$_7515[135]]()[_$_7515[14]](_$_7515[52]));setTimeout(function(){if(bandRetro== 1){retroAlimenta()}},500)}function _0xBAD1E(_0xBADCC,no){var _0x1655E=null;var _0xAF59A=null;for(p= (no+ 1);p< $(_$_7515[7])[_$_7515[24]];p++){_0x1655E= $(_$_7515[7])[_$_7515[21]](p);_0xAF59A= $(_0x1655E)[_$_7515[14]](_$_7515[68]);if(_0xAF59A== $(_$_7515[103]+ _0xBADCC)[_$_7515[14]](_$_7515[68])){_0xBACC7[_$_7515[23]]([_0xBADCC,$(_0x1655E)[_$_7515[14]](_$_7515[52])]);p= $(_$_7515[7])[_$_7515[24]]}}}}function startCrono(){dirTiempoCrono= setInterval(tiempoCal,1000)}function tiempoCal(){var _0x1655E=$(_$_7515[39]);segundoAct--;if(segundoAct== 0&& terminaCont== false){segundoAct= 60;minutoAct--};if(minutoAct== 0){if(segundoAct<= 9){if(segundoAct== 0){detieneCronometro();_0x1655E[_$_7515[28]](_$_7515[136]+ minutoAct+ _$_7515[37]+ _$_7515[36]+ segundoAct);stopCrono();if(aciertos== arPalabras[_$_7515[24]]){playCorrecto()}else {$(_$_7515[0])[_$_7515[3]](_$_7515[131],_$_7515[36]);playIncorrecto();$(_$_7515[9])[_$_7515[137]]();activarBtn(_$_7515[108])}}else {if(segundoAct== 1){terminaCont= true;_0x1655E[_$_7515[28]](_$_7515[136]+ minutoAct+ _$_7515[37]+ _$_7515[36]+ segundoAct)}else {_0x1655E[_$_7515[28]](_$_7515[136]+ minutoAct+ _$_7515[37]+ _$_7515[36]+ segundoAct)}}}else {_0x1655E[_$_7515[28]](_$_7515[136]+ minutoAct+ _$_7515[37]+ segundoAct)};_0x1655E[_$_7515[12]](_$_7515[138])}else {if(segundoAct<= 9){_0x1655E[_$_7515[28]](_$_7515[136]+ minutoAct+ _$_7515[37]+ _$_7515[36]+ segundoAct)}else {_0x1655E[_$_7515[28]](_$_7515[136]+ minutoAct+ _$_7515[37]+ segundoAct)}}}function stopCrono(){clearInterval(dirTiempoCrono)}