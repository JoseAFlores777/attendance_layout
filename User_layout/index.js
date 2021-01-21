


$(document).ready(function () {
  ("use strict");

  //Muestra el sidebar en la version mobile
  $(".nav_btn_sidebar").click(function () {
    $(".mobile_nav_items_sidebar").toggleClass("active");
  });

  //muestra la fecha y la hora actual en el cronometro

  const Date_ac = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  /**
   * Esta funcion devuelve la fecha en formato ingles de US
   */
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

  /**
   * Esta funcion da formato a la hora
   * colocando un 0 antes de aquellos
   * numeros menores a 10
   * @param {number} i = hr,min o seg
   * @return {string}
   */
  function checkTime(i) {
    if (i < 10) i = "0" + i;
    return i;
  }

  /**
   * Esta funcion devuelve la hora actual en
   * un formato de HH:MM:SS
   * @return {string}
   */
  function current_time() {
    var today = new Date(),
      h = checkTime(today.getHours()),
      m = checkTime(today.getMinutes()),
      s = checkTime(today.getSeconds());
    // add a zero in front of numbers<10
    return h + ":" + m + ":" + s;
  }

  //=============================CRONÓMETO=============================

  /**
   *  Creacion de la clase Tiempo, la cual al instanciarse guardará
   * los datos obtenidos por los eventos de los botones
   */
  class Time {
    /**
     * Esta funcion realiza la funcion de instanciar cada uno de los objetos
     * convertidos de Json a tipo Object desde la LocalStorage
     * @param {object}
     *  @return {Time}
     */
    static fromJson({
      hora,
      minuto,
      segundo,
      Type,
      des,
      Date_Inicio,
      Date_Fin,
      Num_Event,
      createdIn,
    }) {
      const tempTime = new Time(des, Type, Date_Inicio, Num_Event);

      tempTime.hora = hora;
      tempTime.minuto = minuto;
      tempTime.segundo = segundo;
      tempTime.Date_Fin = Date_Fin;
      tempTime.createdIn = new Date(createdIn);

      return tempTime;
    }
    /**
     * Contructor de la clase Time
     * @param {String} p_des > Descripcion de la pausa o Tiempo de trabajo
     * @param {String} p_type > Tipo de Timer si es Pausa o WorkTime
     * @param {String} p_HInicio > Tiempo en que se instancio la clase
     * @param {number} p_event > Numero de Evento
     */
    constructor(p_des, p_type, p_HInicio, p_event) {
      this.hora = 0;
      this.minuto = 0;
      this.segundo = 0;
      this.des = p_des;
      this.Type = p_type;
      this.Date_Inicio = p_HInicio;
      this.Date_Fin = "";
      this.Num_Event = p_event;
      this.createdIn = new Date();
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
      this.Type = p_type;
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

    /**
     * Esta funcion pertenece a la clase Time y devuelve en formato HH:MM:SS
     * la duracion que tuvo el Timer
     * @return {String} > duracion de timer HH:MM:SS
     */
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

    /**
     * Esta funcion devuelve un objeto tipo DATE que contiene toda la informacion
     * de tiempo relacionado a la instanciacion de la clase Time
     * @return {Date}
     */
    get get_createIn() {
      return this.createdIn;
    }
  }

  //Inicializacion de Variables globales
  var TimeLine = [];
  var Evento = 0; //Esta variable indicará en que evento se quedó el programa antes de cerrarlo
  var pausaInterval; //Esta variable la utilizaremos para iniciar y parar el loop del conteo para las pausas
  var WorkInterval; //Esta variable la utilizaremos para iniciar y parar el loop del conteo para el Worktime
  var workTime; // hara referencia al espacio de memoria de la instancia Time de worktime
  var pauseTime; // hara referencia al espacio de memoria de la instancia Time para la pausa actual
  getDate();
  import_LStorage();

  /**
   * Esta funcion  hace el trabajo de un reloj, incrementa el valor de los seg,min y hrs en un loop
   * y devuenve un string que será la hora del conteo y lo escribira en el cronometro cada seg
   * @param {Time} Time
   * @param {number} p_seg
   * @param {number} p_min
   * @param {number} p_hr
   * @return {string}
   */
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

  /**
   * Esta funcion esconde y muetra los botones respectivos ya sea para empezar o terminar una pausa
   * @param {string} instance
   */
  function show_hide_btn(instance) {
    if (instance === "Pause") {
      $("#btn_pause").hide("true");
      $("#btn_restart").show("true");
    } else {
      $("#btn_pause").show("true");
      $("#btn_restart").hide("true");
    }
    $("#btn_finish").show("true");
  }

  /**
   * Esta funcion Modifica el titulo principal del panel del cronómetro
   * @param {String} message
   */
  function Crono_Title(message) {
    $("#Crono_message").text(message);
  }

  // Evento inicializa el contador de horas de trabajo
  $("#btn_start").click(function (e) {
    e.preventDefault();
    Crono_Title("You are Working!");
    show_hide_btn("WorkTime");
    $(this).parent().addClass("active-btn");
    $(this).hide("true");
    workTime = new Time("WorkTime", "Work", current_time(), ++Evento);
    TimeLine.push(workTime);
    WorkInterval = setInterval(() => {
      Conteo(workTime, workTime.segundo, workTime.minuto, workTime.hora);
      save_LStorage(TimeLine);
      workTime.setH_Fin = current_time();
    }, 1000);

    return false;
  });

  /**
   * Esta Funcion inicia el contador de la pausa e introduce una nueva pausa en el arreglo de TimeLine
  /**
   * @param {string} des >Descripcion de la Pausa
   */
  function startPause(des) {
    clearInterval(WorkInterval);
    show_hide_btn("Pause");
    pauseTime = new Time(des, "Pause", current_time(), ++Evento);
    workTime.setH_Fin = current_time();
    pausaInterval = setInterval(() => {
      Conteo(pauseTime, pauseTime.segundo, pauseTime.minuto, pauseTime.hora);
      save_LStorage(TimeLine);
      pauseTime.setH_Fin = current_time();
    }, 1000);
    TimeLine.push(pauseTime);
  }

  /**
   * Esta funcion escribe en la tabla @#tbody_actions los datos a cada evento Pausas y Worktime
   * @param {Time} Time
   */
  function AddRowToTable(Time) {
    let tmp = Time.get_createIn.getHours() < 12 ? "am" : "pm";

    $("#tbody_actions").append(
      Time.get_type == "Work"
        ? `<tr id="Fila" class="table-primary"><th scope="row">${Time.get_type}</th><th scope="row">${Time.getH_Inicio} ${tmp}</th><td>${Time.getDuracion}</td><td>${Time.getDes}</td></tr>`
        : `<tr id="Fila" ><th scope="row">${Time.get_type}</th><th scope="row">${Time.getH_Inicio} ${tmp}</th><td>${Time.getDuracion}</td><td>${Time.getDes}</td></tr>`
    );
  }

  // Evento al selecccionar que la pausa fue el desayuno
  $("#btn_pause_breakfast").click(function () {
    startPause("breakfast");
    Crono_Title("Enjoy your breakfast!");
  });
  // Evento al selecccionar que la pausa fue el almuezo
  $("#btn_pause_lunch").click(function () {
    startPause("Lunch");
    Crono_Title("Bon appetit!");
  });
  // Evento al selecccionar que la pausa fue la cena
  $("#btn_pause_dinner").click(function () {
    startPause("Dinner");
    Crono_Title("Enjoy your dinner!");
  });
  // Evento al selecccionar que la pausa fue Otro
  $("#btn_pause_other").click(function () {
    startPause("Other");
    Crono_Title("Don't be late!");
  });

  // Evento al al reanudar el trabajo luego de la pausa
  $("#btn_restart").click(function () {
    Crono_Title("You are Working!");
    pauseTime.setH_Fin = current_time();
    AddRowToTable(pauseTime);
    clearInterval(pausaInterval);
    show_hide_btn("WorkTime");
    workTime.setN_Event = ++Evento;
    WorkInterval = setInterval(() => {
      Conteo(workTime, workTime.segundo, workTime.minuto, workTime.hora);
      save_LStorage(TimeLine);
      workTime.setH_Fin = current_time();
    }, 1000);
  });

  
  // Evento al finalizar la Jornada
  $("#btn_finish").click(function () {
    // para que la funcion swal se ejecute bien, se necesita importar
    //el CDN - <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    if ($("#btn_restart").is(":visible")) {
      pauseTime.setH_Fin = current_time();
    } else {
      workTime.setH_Fin = current_time();
    }
    swal("Well Done!!", "Its all", "success");
    clearInterval(pausaInterval);
    clearInterval(WorkInterval);
    $(".btn2_crono").hide("true");
    $("#crono").text("Is all for today!");
    AddRowToTable(workTime);
    Crono_Title("See you soon!")


    // =======Aqui se hara la entrega de los timepos a la BD=======

    //pRIMERO SE GUARADARÁ EN LA BAD Y DESPUES SE ELIMINARA DEL LOCALSTORAGE

    //1.- Guardar en BD (Json)

    //2.- Eliminar Item del Local Storage
    console.log(workTime.get_createIn);
    localStorage.removeItem("Time");
  });



  
/**
 * Funcion que Calcula el tiempo que ha pasado desde que cerro la pestaña o refrescó
 * @param {Time} Time 
 * @param {String} hora_actual
 * @return {Time} > Retorna un objeto con sus tiempos modificados 
 */
  function Calculo_TiempoInactivo(Time, hora_actual) {
    var hora1 = Time.getH_Fin.split(":");
    var hora2 = hora_actual.split(":");

    let t1 = new Date();
    let t2 = new Date();
    t1.setHours(hora1[0], hora1[1], hora1[2]);
    t2.setHours(hora2[0], hora2[1], hora2[2]);

    //Aquí Se hace el calculo de el timepo que estuvo cerrada la pagina
    t2.setHours(
      t2.getHours() - t1.getHours(),
      t2.getMinutes() - t1.getMinutes(),
      t2.getSeconds() - t1.getSeconds()
    );

    //Aqui se le agrega el tiempo que estuvo fuera de la pagina + el tiempo que llevaba
    t1.setHours(
      Time.getHr + t2.getHours(),
      Time.getMin + t2.getMinutes(),
      Time.getSeg + t2.getSeconds()
    );

    Time.setSegundo = t1.getSeconds();
    Time.setMinuto = t1.getMinutes();
    Time.setHora = t1.getHours();

    return Time;
  }


  /**
   * rellena la tabla con los datos en los que se quedó
   */
  function add_AlltoTab() {
    for (let index = 0; index < TimeLine.length; index++) {
      if (TimeLine[index].get_type === "Pause" &&
        TimeLine[index].getN_Event != Evento) {
        AddRowToTable(TimeLine[index]);
      }
    }
  }

  //Busca el ultimo evento
  /**
   * Busca el ultimo evento en el que el cronometro se quedo antes de refrescar o cerrar la ventana 
   * devuelve la instancia correspondiente a ese evento, tambien actualiza el valor de la variable local
   * Eventos para continuar con el orden numerico seguido del ultimo evento ejecutado antes de refrescar 
   * @param {Array<Time>} TimeLine 
   * @return {Time}
   */
  function Search_lastEvt(TimeLine) {
    let mayor = 0;
    let tmp = 0;
    for (let index = 0; index < TimeLine.length; index++) {
      if (mayor < TimeLine[index].getN_Event) {
        mayor = TimeLine[index].getN_Event;
        tmp = index;
      }
    }
    Evento = TimeLine[tmp].getN_Event;
    return TimeLine[tmp];
  }

  
  /**
   * Esta funcion hace que al recargar la pagina continue el cronometro por donde se quedo 
   * @param {Time} Time 
   */
  function still_counting(Time) {
    Time = Calculo_TiempoInactivo(Time, current_time());
    $("#btn_start").hide("true");
    //btn_create();
    if (Time.get_type === "Work") {
      Crono_Title("You are Working!");
      show_hide_btn("WorkTime");
      workTime = Time;
      WorkInterval = setInterval(() => {
        Conteo(workTime, workTime.segundo, workTime.minuto, workTime.hora);
        save_LStorage(TimeLine);
        workTime.setH_Fin = current_time();
      }, 1000);
    } else if (Time.get_type === "Pause") {
      show_hide_btn("Pause");
      Crono_Title("Go back to work!");
      pauseTime = Time;
      workTime = TimeLine[0];
      pausaInterval = setInterval(() => {
        Conteo(pauseTime, pauseTime.segundo, pauseTime.minuto, pauseTime.hora);
        save_LStorage(TimeLine);
        pauseTime.setH_Fin = current_time();
      }, 1000);
    }
    add_AlltoTab();
  }

  //=============================FIN DEL CRONÓMETRO=============================

  /**
   * Esta funcion Exporta el arreglo de instancias de la clase Time (Timeline), 
   * al LocalStorage del navegador en formato Json
   */
  function save_LStorage() {
    localStorage.setItem("Time", JSON.stringify(TimeLine));
  }

  /**
   * Esta funcion Importa el archivo Json del LocalStorage al arreglo Timeline, 
   * en dado caso que no haya ningun archivo guardado, inicializa el Timeline 
   * como un arreglo vacio, luego de validar esto crea una instancia de la clase 
   * Time por cada objeto importado al arreglo Timeline desde el LocalStorage 
   */
  function import_LStorage() {
    TimeLine = localStorage.getItem("Time")
      ? JSON.parse(localStorage.getItem("Time"))
      : [];
    TimeLine = TimeLine.map((obj) => Time.fromJson(obj));
    if (TimeLine.length > 0) still_counting(Search_lastEvt(TimeLine));   
    //console.log({ TimeLine });
  }
});



