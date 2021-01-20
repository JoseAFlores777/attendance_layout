


$(document).ready(function () {
  'use strict';

  

  //Muestra el sidebar en la version mobile
  $(".nav_btn_sidebar").click(function () {
    $(".mobile_nav_items_sidebar").toggleClass("active");
  });

  //inicializa el etilo de los tooltip mediante el popper.
  //necesario que esté importado <script src="../Styles/Bootstrap_themes/bootstrap-5.0.0-beta1-dist/js/popper.min.js"></script>
  $('[data-toggle="tooltip"]').tooltip();

  //muestra la fecha y la hora actual en el cronometro

  const Date_ac = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  getDate();
  
  function getDate() {
    $(".date_crono").html(
      `<h5 class="text-muted"> ${Date_ac.toLocaleDateString(
        "en-US",
        options
      )} </h5>`
    );
   
  }

  setTimeout(() => {
    getDate();
  }, 59000);


  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  

  function current_time() {

    var today = new Date(),
    h = checkTime(today.getHours()),
    m = checkTime(today.getMinutes()),
    s = checkTime(today.getSeconds());
    // add a zero in front of numbers<10
   return  h + ":" + m + ":" + s;
  }
  //=============================CRONÓMETO=============================

  //Creacion de la clase Tiempo, la cual al instanciarse guardará
  // los datos obtenidos por los eventos de los botones
  class Time {

    static fromJson({ hora, minuto, segundo, Type, des, Date_Inicio, Date_Fin, Num_Event }) { 
      
      const tempTime = new Time(des)

      tempTime.hora        = hora;
      tempTime.minuto      = minuto;
      tempTime.segundo     = segundo;
      tempTime.Type        = Type;
      tempTime.Date_Inicio = Date_Inicio;
      tempTime.Date_Fin    = Date_Fin;
      tempTime.Num_Event = Num_Event;
      
      return tempTime;
    }

    hora = 0;
    minuto = 0;
    segundo = 0;
    Type = "";
    des = "";
    Date_Inicio = "";
    Date_Fin = "";
    Num_Event = 0;
    constructor(p_des) {
      this.hora = 0;
      this.minuto = 0;
      this.segundo = 0;
      this.des = p_des;
      this.Type = "";
     
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
    
    set set_type(p_type) {
      this.Type = (p_type === 1) ? "Pause" : (p_type === 2) ? "Work" : "";
    }
    
    set setH_Inicio(p_Inicio) { 
      this.Date_Inicio = p_Inicio;
    }
    set setH_Fin(p_Fin) { 
      this.Date_Fin = p_Fin;
    }
    set setN_Event(p_evt) { 
      this.Num_Event = p_evt;
    }
    get getSeg() {
      return this.segundo;
    }
    get getMin() {
      return this.minuto;
    }
    get getHr() {
      return this.hora;
    }

    get getDuracion() {
      return `${this.hora < 10 ? "0" + this.hora : this.hora}:${
        this.minuto < 10 ? "0" + this.minuto : this.minuto
      }:${this.segundo < 10 ? "0" + this.segundo : this.segundo}`;
    }

    get getDes() {
      return this.des;
    }
    get get_type() {
      return this.Type;
    }
    get getH_Inicio() {
      return this.Date_Inicio;
    }
    get getH_Fin() {
      return this.Date_Fin;
    }
    get getN_Event() {
      return this.Num_Event;
    }

  }

  //Variables globales
  let TimeLine =[];
  import_LStorage(TimeLine);
  var pausaInterval = 0;
  var WorkInterval = 0;
  var workTime;

  
  var pauseTime;

  


  //Esta variable indicará en que evento se quedó el programa antes de cerrarlo
  let Evento = 0;

  //Esta funcion  hace el trabajo de un reloj, incrementa el valor de los seg,min y hrs en un loop
  function Conteo(Time, p_seg, p_min, p_hr) {
    // Segundos
    p_seg++;
    if (p_seg >= 60) {
      p_seg = 0;
      p_min++;
      getDate();
    }
    // Minutos
    if (p_min >= 60) {
      p_min = 0;
      p_hr++;
    }

    Time.setSegundo = p_seg;
    Time.setMinuto = p_min;
    Time.setHora = p_hr;
     
    return $("#crono").text(
      `${p_hr < 10 ? "0" + p_hr : p_hr}:${p_min < 10 ? "0" + p_min : p_min}:
    ${p_seg < 10 ? "0" + p_seg : p_seg}`
    );
    
  }

  function btn_create() {
    $("#btn_restart").hide("true");
    $("#btn_pause").text("Pause");
    $("#btn_pause").addClass("btn btn-warning col-md-2");
    $("#btn_restart").text("Keep Working!");
    $("#btn_restart").addClass("btn btn-primary col-md-2");
    $("#btn_finish").text("Finish Day");
    $("#btn_finish").addClass("btn btn-danger col-md-2");
  }

  // Evento inicializa el contador de horas de trabajo
  $("#btn_start").click(function (e) {
    e.preventDefault();
    $("#Crono_Timer").text("My workday");
    btn_create();

    $(this).parent().addClass("active-btn");
    $(this).hide("true");
    workTime = new Time("WorkTime");
    workTime.set_type = 2;
    TimeLine.push(workTime);
    workTime.setH_Inicio = current_time();
    workTime.setN_Event = ++Evento;
    WorkInterval = setInterval(() => {
      Conteo(workTime, workTime.segundo, workTime.minuto, workTime.hora);
      save_LStorage(TimeLine);
    }, 1000);

    return false;
  });

  //Esta Funcion inicia el contador de la pausa e introduce una nueva pausa en el arreglo de TimeLine
  function startPause(des) {
    clearInterval(WorkInterval);
    $("#btn_restart").show("true");
    $("#btn_pause").hide("true");
    pauseTime = new Time(des);
    workTime.setH_Fin = current_time();
    pauseTime.setH_Inicio = current_time();
    pauseTime.setN_Event = ++Evento;
    pauseTime.set_type = 1;
 
    
    pausaInterval = setInterval(() => {
      Conteo(pauseTime, pauseTime.segundo, pauseTime.minuto, pauseTime.hora);
      save_LStorage(TimeLine);
    }, 1000);
    
    TimeLine.push(pauseTime);
  }

  function AddRowToTable(Time) {
    $("#tbody_actions").append(
      Time.get_type == "Work"
        ? `<tr class="table-primary"><th scope="row">${Time.get_type}</th><th scope="row">${Time.getH_Inicio}</th><th scope="row">${Time.getH_Fin}</th><td>${Time.getDuracion}</td><td>${Time.getDes}</td><td>${Time.getN_Event}</td></tr>`
        : `<tr><th scope="row">${Time.get_type}</th><th scope="row">${Time.getH_Inicio}</th><th scope="row">${Time.getH_Fin}</th><td>${Time.getDuracion}</td><td>${Time.getDes}</td><td>${Time.getN_Event}</td></tr>`
    );
  }

  // Evento al selecccionar que la pausa fue el desayuno
  $("#btn_pause_breakfast").click(function () {
    startPause("breakfast");
    $("#Crono_Timer").text("Enjoy your breakfast!");
    
  });
  // Evento al selecccionar que la pausa fue el almuezo
  $("#btn_pause_lunch").click(function () {
    startPause("Lunch");
    $("#Crono_Timer").text("Bon appetit!");
  });
  // Evento al selecccionar que la pausa fue la cena
  $("#btn_pause_dinner").click(function () {
    startPause("Dinner");
    $("#Crono_Timer").text("Enjoy your dinner!");
  });
  // Evento al selecccionar que la pausa fue Otro
  $("#btn_pause_other").click(function () {
    startPause("Other");
    $("#Crono_Timer").text("Don't be late!");
  });

  // Evento al al reanudar el trabajo luego de la pausa
  $("#btn_restart").click(function () {
    $("#Crono_Timer").text("My workday");
    pauseTime.setH_Fin = current_time();
    AddRowToTable(pauseTime);

    clearInterval(pausaInterval);
    $("#btn_restart").hide("true");
    $("#btn_pause").show("true");
    workTime.setN_Event = ++Evento;
    WorkInterval = setInterval(() => {
      Conteo(workTime, workTime.segundo, workTime.minuto, workTime.hora);
      save_LStorage(TimeLine);
    }, 1000);
  });

  // Evento al finalizar la Jornada
  $("#btn_finish").click(function () {
    // para que la funcion swal se ejecute bien, se necesita importar
    //el CDN - <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    if ($('#btn_restart').is(':visible')) {
      pauseTime.setH_Fin = current_time();
      pauseTime.setN_Event = ++Evento;
      AddRowToTable(pauseTime);
    } else { 
      workTime.setH_Fin = current_time();
    }
    swal("Well Done!!", "Its all", "success");
    clearInterval(pausaInterval);
    clearInterval(WorkInterval);
    $(".btn2_crono").hide("true");
    $("#crono").text("Is all for today!");
    // TimeLine.push(workTime);
    
    AddRowToTable(workTime);
    // =======Aqui se hara la entrega de los timepos al servidor=======

    console.log(workTime.getDuracion);

    for (let tipo of TimeLine) {
      console.log(tipo.getDuracion);
    }
    console.log(current_time());
    console.log(workTime);
    console.log(TimeLine);

  });



  //Funcion que Calcula el timpo que ha pasado desde que cerro la pestaña o refrescó

  function Calculo_TiempoInactivo(Time,hora_actual){

    var hora1 = Time.getH_Fin.split(":");
     var  hora2 = hora_actual.split(":");
    // var hora1 = Time.getH_Fin.split(":");
    //  var  hora2 = hora_actual.split(":");
    let t1 = new Date();
    let t2 = new Date();
    t1.setHours(hora1[0], hora1[1], hora1[2]);
    t2.setHours(hora2[0], hora2[1], hora2[2]);
     
    //Aquí Se hace el calculo de el timepo que estuvo cerrada la pagina
    t2.setHours(t2.getHours() - t1.getHours(), t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());

    //Aqui se le agrega el tiempo que estuvo fuera de la pagina + el tiempo que llevaba
    t1.setHours(Time.getHr + t2.getHours(), Time.getMin + t2.getMinutes(), Time.getSeg + t2.getSeconds());

    
    Time.setSegundo = t1.getSeconds();
    Time.setMinuto = t1.getMinutes();
    Time.setHora = t1.getHours();
    

    return Time;

  }

  //rellena la tabla con los datos en los que se quedó
  function add_AlltoTab() { 
    for (let index = 0; index < TimeLine.length; index++) {
      AddRowToTable(TimeLine[index]);
      
    }

  }

  //Busca el ultimo evento
  function Search_lastEvt(Timeline) {
    let mayor = 0;
      let tmp = 0;
    for (let index = 0; index < Timeline.length; index++) {
      if (mayor < Timeline[index].getN_Event) {
        mayor = Timeline[index].getN_Event;
        tmp = index;
      }
      
    }
    return TimeLine[tmp];
  }
  
  //Esta funcion hace que al recargar la pagina continue por donde se quedo
  function still_counting(Time) {
    Time = Calculo_TiempoInactivo(Time, current_time());
    $("#btn_start").hide(true);
    btn_create();
    $("#Crono_Timer").text("My workday");
    if (Time.get_type === "Work") {
      $("#btn_restart").hide(true);
      $("#btn_pause").show(true);
      workTime = Time;
      WorkInterval = setInterval(() => {
        Conteo(Time, Time.segundo, Time.minuto, Time.hora);
        save_LStorage(TimeLine);
      }, 1000);
    } else if (Time.get_type === "Pause") {
      $("#btn_pause").hide(true);
      $("#btn_restart").show(true);
      pauseTime = Time;
      pausaInterval = setInterval(() => {
        Conteo(pauseTime, pauseTime.segundo, pauseTime.minuto, pauseTime.hora);
        save_LStorage(TimeLine);
      }, 1000);
    }
    add_AlltoTab();
  }


  //=============================FIN DEL CRONÓMETRO=============================

function save_LStorage(Timeline) {
  localStorage.setItem('Time', JSON.stringify(Timeline));
}
  
  
  function import_LStorage(Timeline) {
    //  TimeLine = (localStorage.getItem("Time"))
    //   ? JSON.parse(localStorage.getItem("Time"))
    //    : [];
       TimeLine = ( localStorage.getItem('Time') )
       ? JSON.parse( localStorage.getItem('Time') )
       : [];

      //  TimeLine = TimeLine.map( Time.fromJson );

    TimeLine = TimeLine.map(obj => Time.fromJson(obj));
    // TimeLine = TimeLine.map( Time.fromJson );
    if (TimeLine.length > 0) {
             still_counting(Search_lastEvt(Timeline));
      
    }
    console.log({ TimeLine });
     add_AlltoTab();
  }








});



