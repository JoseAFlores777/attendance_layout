$(document).ready(function () {
  $(".btn2_crono").hide("true");


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
  
  let tiempo_trabajo = {
    hora: 0,
    minuto: 0,
    segundo: 0
  };

  let tiempo_pausa = {
    hora: 0,
    minuto: 0,
    segundo: 0
};

let 
running_time = null;

$("#btn_start").click(function(){
    // if ($(this).text() == 'Start' || $(this).text() == 'Restart')
    // {
    //     $(this).text('Pause');
  $(this).parent().addClass('active-btn');    
  $(this).hide("true");   
  $(".btn2_crono").show("true");


  Cronometro(tiempo_trabajo.hora, tiempo_trabajo.minuto, tiempo_trabajo.hora);
        
        // running_time = setInterval(function(){
        //     // Segundos
        //     p_seg++;
        //   if (p_seg >= 60)
            
        //     {
        //     p_seg = 0;
        //         p_min++;
        //     }      

        //     // Minutos
        //   if (p_min >= 60)
            
        //     {
        //         p_min = 0;
        //         p_hr++;
        //     }
        //   console.log(p_seg);
        //    return  $("#crono").text(`${p_hr < 10 ? '0' + p_hr : p_hr}:${p_min < 10 ? '0' + p_min : p_min}:${p_seg < 10 ? '0' + p_seg : p_seg}`);

        // }, 1000);
  
  
  
    // }
    // else 
    // {
    //     $(this).text('Restart');
    //     $(this).parent().removeClass('active-btn');
    //     clearInterval(running_time);
    // }
});
  $('#btn_pause').click(function () {
    $('#btn_pause').
  // Cronometro(tiempo_pausa.hora, tiempo_pausa.minuto, tiempo_pausa.hora);
});
  
  
  
  const Cronometro = (p_seg,p_min,p_hr) => { 

    setInterval(function(){
      // Segundos
      p_seg++;
    if (p_seg >= 60)
      
      {
      p_seg = 0;
          p_min++;
      }      

      // Minutos
    if (p_min >= 60)
      
      {
          p_min = 0;
          p_hr++;
      }
      console.log({ p_seg,p_min,p_hr });


     return  $("#crono").text(`${p_hr < 10 ? '0' + p_hr : p_hr}:${p_min < 10 ? '0' + p_min : p_min}:${p_seg < 10 ? '0' + p_seg : p_seg}`);

  }, 1000);

    
  }
  
  
  

});
  


