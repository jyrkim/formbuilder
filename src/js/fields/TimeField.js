/*
Represents Date Field on the Web page
*/

function TimeField(dataObj) {

    var _fieldBase = new FieldBase();

    var _elementToAppendTo = _fieldBase._elementToAppendTo;

    var _advSettingsContentId = _fieldBase._advSettingsContentId;

    var _dataObject = dataObj;
    var _data = dataObj.getDataItemObj();


    this.renderDevelopmentView = renderDevelopmentView;
    this.getCompletedView = getCompletedView;
    this.getBootstrapView = getBootstrapView;

    var _text = {};

    _text["labelDuration"] = "Duration";

    _text["secondsOption"] = "Secs";
    _text["minuteOption"] = "Min";
    _text["minutesOption"] = "Mins";
    _text["betweenHourAndMinute"] = ":";
    _text["hoursOption"] = "Hrs";
    _text["hourOption"] = "Hr";
    _text["amPmOption"] = "AM/PM";

    function renderDevelopmentView() {

        //hide advanced content
        $(_advSettingsContentId).hide();

        var div = document.createElement("DIV");

        //var table = document.createElement("TABLE");
        //table.setAttribute("class", "advancedTable");

        var durTable = createTableForDurationMode();
        durTable.setAttribute("class", "durationTable");
        div.appendChild(durTable);

        var timeTable = createTableTime(true);
        timeTable.setAttribute("class", "timeTable");
        div.appendChild(timeTable);

        document.getElementById(_elementToAppendTo.substr(1)).appendChild(div);

        //return div;
    }

    function createTableForDurationMode() {

        var table = document.createElement("table");

        var row = document.createElement("TR");

        var td_1 = document.createElement("TD");

        var input = document.createElement("INPUT");

        input.setAttribute("id", "duration");

        input.setAttribute("type", "checkbox");

        var value = false;
        try {
            value = _dataObject.getDataItemObj().durationMode;

        } catch (e) { }

        if (value === true) {
            input.setAttribute("checked", "checked");
        }

        input.addEventListener('click', durationCheckBoxClicked, false);

        td_1.appendChild(input);

        var td_2 = document.createElement("TD");

        td_2.setAttribute("colspan", "4");

        var label = document.createElement("label");

        label.setAttribute("for", "duration");

        var txtLabel = document.createTextNode(_text["labelDuration"]);

        label.appendChild(txtLabel);

        td_2.appendChild(label);

        row.appendChild(td_1);

        row.appendChild(td_2);

        table.appendChild(row);

        return table;
    }

    function createTableTime(isDevView) {

        var durMode = false;
        try {
            durMode = _dataObject.getDataItemObj().durationMode;

        } catch (e) { }

        var table = document.createElement("table");

        var row = document.createElement("TR");

        var td_1 = document.createElement("TD");

        var table_inner = document.createElement("table");
        table_inner.setAttribute("class", "timeSelectTable");

        var tr_inner = document.createElement("tr");

        var td_inner_1 = document.createElement("td");

        // select 1
        var select_1 = document.createElement("select");
        if (isDevView)
            select_1.setAttribute("id", "selectHours");

        var op_for_select_1 = document.createElement("option");

        var text;
        
        durMode ? text = _text["hoursOption"] : text = _text["hourOption"];

        op_for_select_1.innerText = text;

        select_1.appendChild(op_for_select_1);

        td_inner_1.appendChild(select_1);

        text = document.createTextNode(_text["betweenHourAndMinute"]);

        td_inner_1.appendChild(text);

        // select 2
        var select_2 = document.createElement("select");
        if (isDevView)
            select_2.setAttribute("id", "selectMinutes");

        var op_for_select_2 = document.createElement("option");

        durMode ? text = _text["minutesOption"] : text = _text["minuteOption"];

        op_for_select_2.innerText = text;

        select_2.appendChild(op_for_select_2);

        td_inner_1.appendChild(select_2);

        var span = document.createElement("span");
        span.innerText = _text["betweenHourAndMinute"];

        if (isDevView)
            span.setAttribute("id", "between");

        if (durMode === false) {
            span.style.display = "none";
        }

        td_inner_1.appendChild(span);

        // select 3
        var select_3 = document.createElement("select");
        if (isDevView)
            select_3.setAttribute("id", "selectAmPm");

        var op_for_select_3 = document.createElement("option");

        durMode ? text = _text["secondsOption"] : text = _text["amPmOption"];

        op_for_select_3.innerText = text

        select_3.appendChild(op_for_select_3);

        td_inner_1.appendChild(select_3);
        tr_inner.appendChild(td_inner_1);

        //span
        var td_inner_2 = document.createElement("td");
        if (isDevView)
            td_inner_2.setAttribute("id", "tdWatch");

        var img = document.createElement("img");

        if (isDevView)
            img.setAttribute("id", "imgWatch");
        img.setAttribute("class", "dateAndTime");

        img.src = _fieldBase._watch_png_src;

        if (durMode === false) {
            td_inner_2.style.display = "none";
        }

        td_inner_2.appendChild(img);

        tr_inner.appendChild(td_inner_2);

        var td_inner_3 = document.createElement("td");
        if (isDevView)
            td_inner_3.setAttribute("id", "tdClock");

        var img2 = document.createElement("img");
        if (isDevView)
            img2.setAttribute("id", "imgClock");
        img2.setAttribute("class", "dateAndTime");

        img2.src = _fieldBase._clock_png_src;

        if (durMode === true) {
            td_inner_3.style.display = "none";
        }

        td_inner_3.appendChild(img2);

        tr_inner.appendChild(td_inner_3);

        table_inner.appendChild(tr_inner);
        td_1.appendChild(table_inner);

        row.appendChild(td_1);

        var td_2 = document.createElement("TD");

        row.appendChild(td_2);

        var td_3 = document.createElement("TD");   

        row.appendChild(td_3);

        var td_4 = document.createElement("TD");
     
        row.appendChild(td_4);

        var td_5 = document.createElement("TD");

        row.appendChild(td_5);

        table.appendChild(row);

        return table;
    }

    function durationCheckBoxClicked() {

        var _data = _dataObject.getDataItemObj();

        if (_data.durationMode === false) {

            _dataObject.setDurationMode(true, _fieldBase.saveDataItem);

            document.getElementById("tdClock").style.display = "none";
            document.getElementById("tdWatch").style.display = "table-cell";
  
        }
        else {
            _dataObject.setDurationMode(false, _fieldBase.saveDataItem);

            document.getElementById("tdClock").style.display = "table-cell";
            document.getElementById("tdWatch").style.display = "none";
        }

        setOptionTexts();

    }

    function setOptionTexts() {

        var durMode = false;
        try {
            durMode = _dataObject.getDataItemObj().durationMode;

        } catch (e) { }

        var text;

        durMode ? text = _text["hoursOption"] : text = _text["hourOption"];

        $("#selectHours option").text(text);

        durMode ? text = _text["minutesOption"] : text = _text["minuteOption"];

        $("#selectMinutes option").text(text);

        durMode ? text = _text["secondsOption"] : text = _text["amPmOption"];

        $("#selectAmPm option").text(text);

        if (durMode === false) {
            document.getElementById("between").style.display = "none";
        } else {
            document.getElementById("between").style.display = "inline";
        }
    }



    function getCompletedView() {

        var tableTime = createTableTime(false);

        var div = _fieldBase.addGeneralFieldsToCompletedView("timeField", tableTime, _dataObject);

        return div;
    }

    function getBootstrapView(orderNro) {

        var durMode = false;
        try {
            durMode = _dataObject.getDataItemObj().durationMode;

        } catch (e) { }

        var input = document.createElement("input");

        if (durMode) //todo
            input.setAttribute("type", "time");
        else
            input.setAttribute("type", "time");

        var div = _fieldBase.addGeneralFieldsToBootstrapForm("timeField", input, _dataObject, orderNro);

        return div;
    }
}