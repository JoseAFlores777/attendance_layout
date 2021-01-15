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
 
  let isPaused = false;
  let pausas = [];

  class pausa  {
    hora= 0;
    minuto= 0;
    segundo= 0;
    des = '';
    constructor() { 
      this.hora = 0;
      this.minuto = 0;
      this.segundo = 0;
    }

    set setHora(hora) { 
      this.hora = hora;
    }
    set setMinuto(minuto) { 
      this.minuto = minuto;
    }
    set setSegundo(segundo) { 
      this.segundo = segundo;
    }

    set setDes(des) { 
      this.des = des;
    }

    get getDuracion() { 
      return `${this.hora < 10 ? '0' + this.hora : this.hora}:${this.minuto < 10 ? '0' + this.minuto : this.minuto}:${this.segundo < 10 ? '0' + this.segundo : this.segundo}`;
    }

    get getDes() { 
      return this.des;
    }
    
  }



  let tiempo_trabajo = {
    hora: 0,
    minuto: 0,
    segundo: 0
  };


$("#btn_start").click(function(){

  $(this).parent().addClass('active-btn');    
  $(this).hide("true");   
  $(".btn2_crono").show("true");


  Cronometro_Trabajo(tiempo_trabajo.hora, tiempo_trabajo.minuto, tiempo_trabajo.segundo);

});
  
  $('#btn_pause').click(function () {    
    if ($(this).text() == ' Pause') {
      isPaused = true;
      $(this).text('Keep working');
      $(this).removeClass('btn-warning');
      $(this).addClass('btn-success');
      pausa_tmp =  new pausa();
      pausas.push(pausa_tmp);
      Cronometro_Pausas(pausa_tmp);
      
    } else if ($(this).text() == 'Keep working') {
      
      isPaused = false;
      $(this).text(' Pause');
      $(this).removeClass('btn-success');
      $(this).addClass('btn-warning');
      // pausa_tmp =  new pausa();
      // pausas.push(pausa_tmp);
      // Cronometro_Pausas(pausa_tmp);
    }

  });


  
  const Cronometro_Trabajo = (p_hr,p_min,p_seg) => { 


    setInterval(function () {
if (!isPaused) {
  
  // Segundos
  
  p_seg++;
  
  if (p_seg >= 60) {
    p_seg = 0;
    p_min++;
  }
  // Minutos
  if (p_min >= 60) {

    p_min = 0;
    p_hr++;
  }

tiempo_trabajo.segundo = p_seg;
tiempo_trabajo.minuto = p_min;
tiempo_trabajo.hora = p_hr;

  // console.log(p_seg,p_min,p_hr);
  // console.log(tiempo_trabajo);

  return $("#crono").text(`${p_hr < 10 ? '0' + p_hr : p_hr}:${p_min < 10 ? '0' + p_min : p_min}:${p_seg < 10 ? '0' + p_seg : p_seg}`);
}

    }, 1000);
    

    
    
  }


  const Cronometro_Pausas = (pausa) => { 
    p_hr = 0;
    p_min = 0;
    p_seg = 0;
    let tiempo =  setInterval(function () {
if (isPaused) {
  // Segundos

  p_seg++;
  
  if (p_seg >= 60) {
    p_seg = 0;
    p_min++;
  }
  // Minutos
  if (p_min >= 60) {

    p_min = 0;
    p_hr++;
  }

pausa.setSegundo = p_seg;
pausa.setMinuto = p_min;
pausa.setHora = p_hr;

  // console.log(p_seg,p_min,p_hr);
  // console.log(tiempo_trabajo);

  return $("#crono").text(`${p_hr < 10 ? '0' + p_hr : p_hr}:${p_min < 10 ? '0' + p_min : p_min}:${p_seg < 10 ? '0' + p_seg : p_seg}`);
}

    }, 1000);
    

  
    
  }

 
  
  
  

});
  


