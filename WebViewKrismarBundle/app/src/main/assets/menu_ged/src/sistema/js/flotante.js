/*************************************************************************************
*
* 								FUNCIONES Y PROCEDIMIENTOS
*
**************************************************************************************/

function linkss(){
    var info=document.getElementById("info");
    var avance=document.getElementById("avance");
    avance.onmouseover = function(){
        info.style.display = 'block';
    }
    avance.onmouseout = function(){
        info.style.display = 'none';
    }
}
window.addEventListener("load",linkss,true);
$(document).ready(function(){
    $("#a_btnbritannica").off().on("mouseover", function(){
        $("#a_btnbritannicamenu").fadeIn();
        $("#a_btnbritannica").hide();
    });
    $("#a_btnbritannicamenu").off().on("mouseout", function(){
        //$("#a_btnbritannicamenu").fadeOut();
        //$("#a_btnbritannica").show();
    });
});