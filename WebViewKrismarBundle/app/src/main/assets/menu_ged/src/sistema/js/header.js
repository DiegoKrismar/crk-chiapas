const menuElements = {
  profesor: [
    {
      title: "• Manual de profesor",
      prefijo: "crk_help_4101a",
      id: 8253,
    },
    {
      title: "• Video general",
      prefijo: "crk_help_3102c",
      id: 8271,
    },
    {
      title: "• Video de introducción",
      prefijo: "crk_help_3102b",
      id: 8270,
    },
    {
      title: "• Video Subir usuarios",
      prefijo: "crk_help_6102a",
      id: 8279,
    },
  ],
  alumno: [
    // rol 3 - alumno , position 2

    {
      title: "• Manual de alumno",
      prefijo: "crk_help_3101a",
      id: 8254,
    },
    {
      title: "• Video general",
      prefijo: "crk_help_3102c",
      id: 8271,
    },
    {
      title: "• Video introducción",
      prefijo: "crk_help_3102b",
      id: 8270,
    },
  ],
};

$(document).ready(function () {
  resizeMenuayuda(); //Ajusta el menu ayuda a la ventana

  showHelpmenu(); //Muestra y oculta menu ayuda
});

$(window).resize(function () {
  resizeMenuayuda(); //Ajusta el menu ayuda a la ventana
});

$(window).on("orientationchange", function () {
  resizeMenuayuda(); //Ajusta el menu ayuda a la ventana
});

function showHelpmenu() {
  /*

	* NOMBRE: showHelpmenu.

	* UTILIDAD: Muestra y oculta menu ayuda

	* ENTRADAS: Ninguna.

	* SALIDAS: Ninguna.

    */

  /*for(){

    }*/
    let dataUsus = localStorage.getItem("dataUsu")
    if(dataUsus !== null){
        let {usu} = JSON.parse(dataUsus);
       menuElements[usu];
       console.log("menuElements[usu]",usu,menuElements[usu]);
       menuElements[usu].forEach(({id,title,prefijo}) => {

        //document.getElementById("medida").innerHTML
        $("#d_menuayudacenter").append(
            '<a onClick="abrirVentana(' +"'"+
              prefijo +"'"+
              ')">' +
              title +
              "</a>"
          ); //Inserta links del menu
       });
    }

 /* for (var i = 0; i < menuElements[1].length; i++) {
    $("#d_menuayudacenter").append(
      '<a onClick="getHelp(' +
        menuElements[1][i].id +
        ')">' +
        menuElements[1][i].title +
        "</a>"
    ); //Inserta links del menu
  }*/

  $(".h_conteName_ayuda")
    .off()
    .on("mousedown", function () {
      $("#d_menuayuda").slideToggle("ease"); //Muestra y oculta menu
    });

  $("#d_menuayudaclose")
    .off()
    .on("mousedown", function () {
      $("#d_menuayuda").slideToggle("ease"); //Oculta menu
    });
}

function resizeMenuayuda() {
  /*

	* NOMBRE: resizeMenuayuda.

	* UTILIDAD: Ajusta el menu ayuda a la ventana

	* ENTRADAS: Ninguna.

	* SALIDAS: Ninguna.

    */

  var getPosbtnayudaleft = $(".h_conteName_ayuda").offset().left; //Posicion left de btn ayuda

  var getPosbtnayudatop = $(".h_conteName_ayuda").offset().top; //Posicion top de btn ayuda

  var getWidthheader = $(".h_header").outerWidth(); //Tamaño header (total ancho)

  var getWidthhead = $(".h_head").outerWidth(); //Yamaño head (contenido centrado)

  $("#d_menuayuda").css({
    top: getPosbtnayudatop + 44,
    right: (getWidthheader - getWidthhead) / 2,
  }); //Posiciona el menu a la derecha y abajo del btn de ayuda

  $("#d_menuayuda").slideUp("ease"); //Oculta menu
}


const selectUsuario = (usu) => {
  //Ocultar
  console.log(usu);
  /*let varUsu = localStorage.setItem("tipoUsuario");
    
    ( varUsu !== null ) ? usu :  :*/
  let data = { usu: usu };
  localStorage.setItem("dataUsu", JSON.stringify(data));
  $("#d_emergenteingreso").hide();
  initCurso();
  showHelpmenu(); //Muestra y oculta menu ayuda

};

const cambiarUsuario = () => {
  localStorage.removeItem("dataUsu");
  location.reload();
};
