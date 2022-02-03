/*************************************************************************************
*
* 								FUNCIONES Y PROCEDIMIENTOS
*
**************************************************************************************/

$(document).on('change', '.u_btn-file :file', function() {
  var input = $(this),
      numFiles = input.get(0).files ? input.get(0).files.length : 1,
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.trigger('fileselect', [numFiles, label]);
});

$(document).ready( function() {
    $('.u_btn-file :file').on('fileselect', function(event, numFiles, label) {
        
        var input = $(this).parents('.u_input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' Archivos seleccionados' : label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
        
    });
});
window.addEventListener("load",linkss,true);