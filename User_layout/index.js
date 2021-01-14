$(document).ready(function () {
  //Muestra el sidebar en la version mobile
    $('.nav_btn_sidebar').click(function(){
      $('.mobile_nav_items_sidebar').toggleClass('active');
    });
  
  //inicializa el etilo de los tooltip mediante el popper.js como importado como cdn
  $('[data-toggle="tooltip"]').tooltip(); 
  



  //muestra la fecha y la hora actual en el cronometro

  const event = new Date();

   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
 
  $(".date_crono").html(`<h5 class="text-muted"> ${event.toLocaleDateString('en-US', options)} </h5>`);
  
  //Cronómetro

  let seg, min, hrs =0;
  


});
  


