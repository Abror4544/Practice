$(document).ready(function () {
  /*-----------------------  Анимации -------------------------*/
  $(".block").animate(
    {
      width: "100%",
      height: "100%",
      opacity: "0",
    },
    2000
  );

  setTimeout(() => {
    $(".block").hide();
    $(".formWrap").show(500);
    $(".formWrap").css("display", "flex");
    setTimeout(() => {
      $(".circle").css("transform", "rotate(360deg)");
      setTimeout(() => {
        $(".circle").addClass("truth");
      }, 600);
    }, 2000);
  }, 2000);

  /*-----------------------  Событии -------------------------*/

  $(".circle").on("click", function () {
    if ($(".circle").hasClass("truth")) {
      $("form").show(500);
      $(".circle").hide();
    }
  });

  let markSelect = $("#mark");
  let modelSelect = $("#model");
  let yearSelect = $("#year");
  let groupedMark = [];
  let groupedModel = [];
  $.getJSON("./data.json", function (item) {

    item.forEach(function (a) {
      if (!this[a.mark]) {
        this[a.mark] = { mark: a.mark, model: [], year: [] };
        groupedMark.push(this[a.mark]);
      }
      this[a.mark].model.push(a.model);
      this[a.mark].year.push(a.year);
    }, Object.create(null));

    item.forEach(function (a) {
      if (!this[a.model]) {
        this[a.model] = { model: a.model, year: [] };
        groupedModel.push(this[a.model]);
      }
      this[a.model].year.push(a.year);
    }, Object.create(null));

    function findWithAttr(array, attr, value) {
      for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    }

    groupedMark.forEach(function (i) {
      markSelect.append(
        '<option value="' + i.mark + '">' + i.mark + "</option>"
      );
    });

    function Validate() {
      let mark = document.getElementById("mark").value;
      let model = document.getElementById("model").value;
      let year = document.getElementById("year").value;

      if (year != "a" && model != "a" && mark != "a") {
        $("input").slideDown(500);
      } else {
        $("input").slideUp(500);
        return false;
      }
    }

    $("#mark").change(function () {
      $(`#model option:not(:first), #year option:not(:first)`).remove();

      let indexOfChoice = findWithAttr(groupedMark, "mark", $("#mark").val());
      for (
        let d = 0;
        d <
        `${
          indexOfChoice !== -1 ? groupedMark[indexOfChoice].model.length : 1
        } `;
        d++
      ) {
        modelSelect.append(
          `<option value=${
            indexOfChoice !== -1 ? groupedMark[indexOfChoice].model[d] : "a"
          }>
          ${
            indexOfChoice !== -1
              ? groupedMark[indexOfChoice].model[d]
              : "Нет значений"
          }</option>`
        );
      }
      Validate();
    });

    $("#model").change(function () {
      $(`#year option:not(:first)`).remove();

      let indexOfChoice = findWithAttr(
        groupedModel,
        "model",
        $("#model").val()
      );
      for (
        let d = 0;
        d <
        `${indexOfChoice !== -1 ? groupedModel[indexOfChoice].year.length : 1}`;
        d++
      ) {
        yearSelect.append(
          `<option value=${
            indexOfChoice !== -1 ? groupedModel[indexOfChoice].year[d] : "a"
          }> 
              ${
                indexOfChoice !== -1
                  ? groupedModel[indexOfChoice].year[d]
                  : "Нет значений"
              }</option>`
        );
      }
      Validate();
    });

    $("#year").change(function () {
      Validate();
    });
  });

 /*  $('#datepicker').datepicker(
    {
    },
    function () {
      $("form").hide();
      $(".thank").append(`Вы выбрали ${$("#mark option:selected").text()} ${("#model option:selected").text()} ${("#year option:selected").text()}, доставка    `)
    }
  );
  $("#datepicker").on("change",function(){
    let selected = $(this).val();
    alert(selected);
  }); */

  $.datepicker.regional['ru'] = {
    closeText: 'Закрыть',
    prevText: 'Предыдущий',
    nextText: 'Следующий',
    currentText: 'Сегодня',
    monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
    dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
    dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
    dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    weekHeader: 'Не',
    dateFormat: 'dd.mm.yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
  };
  $.datepicker.setDefaults($.datepicker.regional['ru']);

  $("#datepicker").datepicker({
    opens: "left",
    minDate: "01.05.2021",
    maxDate: "21.03.2022"
	});
   
    
  
  $("#datepicker").on("change",function(){
    var selected = $(this).val();
    $("form").hide(500);
    $(".thank").show(500);
    $(".thank").append(`Вы выбрали ${$("#mark option:selected").text()} ${$("#model option:selected").text()} ${$("#year option:selected").text()}, доставка ${selected}, <a href="#/" onclick="location.reload();">начать заново</a>`)
    
  });

});
