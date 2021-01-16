


$(document).ready(function () {
  //  $(".btn2_crono").hide("true");
   


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


    class Time  {
      hora= 0;
      minuto= 0;
      segundo= 0;
      des = '';
      constructor(p_des) {
        this.hora = 0;
        this.minuto = 0;
        this.segundo = 0;
        this.des = p_des;
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


  let pausas = [];
  let pausaInterval = 0;
   var WorkInterval =0;
  let workTime = new Time('WorkTime');
  let pauseTime;

function Conteo(Time,p_seg,p_min,p_hr) {

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

Time.setSegundo = p_seg;
Time.setMinuto = p_min;
Time.setHora = p_hr;
  

  return $("#crono").text(`${p_hr < 10 ? '0' + p_hr : p_hr}:${p_min < 10 ? '0' + p_min : p_min}:${p_seg < 10 ? '0' + p_seg : p_seg}`);
}





$('#btn_start').click(function(e){
  e.preventDefault();
  $('#Crono_Timer').text("My workday");
  $("#btn_restart").hide("true");
  $("#btn_pause").text('Pause');
  $("#btn_pause").addClass('btn btn-warning col-md-2');
  $("#btn_restart").text('Keep Working!');
  $("#btn_restart").addClass('btn btn-primary col-md-2');
  $("#btn_finish").text('Finish Day');
  $("#btn_finish").addClass('btn btn-danger col-md-2');

  $(this).parent().addClass('active-btn');
  $(this).hide("true");

  WorkInterval = setInterval(() => {
    Conteo(workTime, workTime.segundo, workTime.minuto, workTime.hora)
  }, 1000);

  return false;
});
  
  function startPause(des) {
    clearInterval(WorkInterval);
    
    
    $("#btn_restart").show("true");
    $("#btn_pause").hide("true");
    pauseTime = new Time(des);
    
    pausaInterval =setInterval(() => {
      Conteo(pauseTime, pauseTime.segundo, pauseTime.minuto, pauseTime.hora)
    }, 1000);
    pausas.push(pauseTime);
    // $("#staticBackdrop").hide("true");
    
  }

  // $('#btn_pause').click(function () {
  //   clearInterval(WorkInterval);
    
    
  //   $("#btn_restart").show("true");
  //   $("#btn_pause").hide("true");
  //   pauseTime = new Time();
  //   pausaInterval =setInterval(() => {
  //     Conteo(pauseTime, pauseTime.segundo, pauseTime.minuto, pauseTime.hora)
  //   }, 1000);
  //    pausas.push(pauseTime);
  // });

  $('#btn_pause_breakfast').click(function () {
    startPause('breakfast')
    $('#Crono_Timer').text("Enjoy your breakfast!");

  });
  $('#btn_pause_lunch').click(function () {
    startPause('Lunch')
    $('#Crono_Timer').text("Bon appetit!");
  });
  $('#btn_pause_dinner').click(function () {
    startPause('Dinner')
    $('#Crono_Timer').text("Enjoy your dinner!");
  });
  $('#btn_pause_other').click(function () {
    startPause('Other')
    $('#Crono_Timer').text("Don't be late!");
  });


  $('#btn_restart').click(function () {
    $('#Crono_Timer').text("My workday");
    $('#tbody_actions').append(`<tr><th scope="row">Pause</th><td>${pauseTime.getDuracion}</td><td>${pauseTime.getDes}</td></tr>`);
    
    clearInterval(pausaInterval);
    $("#btn_restart").hide("true");
    $("#btn_pause").show("true");
     WorkInterval = setInterval(() => {
      Conteo(workTime, workTime.segundo, workTime.minuto, workTime.hora)
    }, 1000);


  });

  $('#btn_finish').click(function () {
    swal('Well Done!!', 'Its all', 'success');
    clearInterval(pausaInterval);
    clearInterval(WorkInterval);
    $(".btn2_crono").hide("true");

    $("#crono").text('Is all for today!');

    // Aqui se hara la entrega de los timepos al servidor

    console.log(workTime.getDuracion);

    for (let tipo of pausas) {
      console.log(tipo.getDuracion );
    }

    console.log(workTime);
    console.log(pausas);
    //=====================================================


    // console.log(workTime.getDuracion);

    // for (let tipo of pausas) {
    //   console.log(tipo.getDuracion);
    // }

  });


  











});



