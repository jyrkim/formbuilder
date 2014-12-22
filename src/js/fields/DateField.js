/*
Represents Date Field on the Web page
*/

function DateField(dataObj) {

    var _fieldBase = new FieldBase();

    var _elementToAppendTo = _fieldBase._elementToAppendTo;

    var _advSettingsContentId = _fieldBase._advSettingsContentId;

    var _dataObject = dataObj;
    var _data = dataObj.getDataItemObj();

    this.renderDevelopmentView = renderDevelopmentView;
    this.getCompletedView = getCompletedView;
    this.getBootstrapView = getBootstrapView;

    var _text = {};

    _text["labelIncludeYear"] = "Include year";
    _text["labelIncludeTime"] = "Include time";

    _text["dayOption"] = "Day";
    _text["monthOption"] = "Month";
    _text["yearOption"] = "Year";

    _text["minuteOption"] = "Min";
    _text["betweenHourAndMinute"] = ":";
    _text["hourOption"] = "Hr";
    _text["amPmOption"] = "AM/PM";

    function renderDevelopmentView() {

        //hide advanced content
        //$(_advSettingsContentId).hide();

        var div = document.createElement("DIV");

        var incYearTable = createTableForIncludeYear();
        incYearTable.setAttribute("class", "dateTable");
        div.appendChild(incYearTable);

        var incTimeTable = createTableForIncludeTime();
        incTimeTable.setAttribute("class", "timeTable");
        div.appendChild(incTimeTable);

        var dateAndTimeTable = createTableYearAndDate(true);
        dateAndTimeTable.setAttribute("class", "dateAndTimeTable");
        div.appendChild(dateAndTimeTable);

        document.getElementById(_elementToAppendTo.substr(1)).appendChild(div);
    }

    function createTableForIncludeYear() {

        var table = document.createElement("table");

        var row = document.createElement("TR");

        var td_1 = document.createElement("TD");

        var input = document.createElement("INPUT");

        input.setAttribute("id", "includeYear");

        input.setAttribute("type", "checkbox");

        var value = false;
        try {
            value = _dataObject.getDataItemObj().includeYear;

        } catch (e) { }

        if (value === true) {
            input.setAttribute("checked", "checked");
        }

        input.addEventListener('click', includeDateCheckBoxClicked, false);

        td_1.appendChild(input);

        var td_2 = document.createElement("TD");

        td_2.setAttribute("colspan", "4");

        var label = document.createElement("label");

        label.setAttribute("for", "includeYear");

        var txtLabel = document.createTextNode(_text["labelIncludeYear"]);

        label.appendChild(txtLabel);

        td_2.appendChild(label);

        row.appendChild(td_1);

        row.appendChild(td_2);

        table.appendChild(row);

        return table;
    }


    function createTableForIncludeTime() {

        var table = document.createElement("table");

        var row = document.createElement("TR");

        var td_1 = document.createElement("TD");

        var input = document.createElement("INPUT");

        input.setAttribute("id", "includeTime");

        input.setAttribute("type", "checkbox");

        var value = false;
        try {
            value = _dataObject.getDataItemObj().includeTime;

        } catch (e) { }

        if (value === true) {
            input.setAttribute("checked", "checked");
        }

        input.addEventListener('click', includeTimeCheckBoxClicked, false);

        td_1.appendChild(input);

        var td_2 = document.createElement("TD");

        td_2.setAttribute("colspan", "4");

        var label = document.createElement("label");

        label.setAttribute("for", "includeTime");

        var txtLabel = document.createTextNode(_text["labelIncludeTime"]);

        label.appendChild(txtLabel);

        td_2.appendChild(label);

        row.appendChild(td_1);

        row.appendChild(td_2);

        table.appendChild(row);

        return table;
  
    }

    function createTableYearAndDate(isDevView) {

        var value = false;
        try {
            value = _dataObject.getDataItemObj().includeYear;

        } catch (e) { }

        var table = document.createElement("table");

        var row = document.createElement("TR");

        var td_1 = document.createElement("TD");

        var table_inner = document.createElement("table");
        table_inner.setAttribute("class", "dateSelectTable");

        var tr_inner = document.createElement("tr");

        var td_inner_1 = document.createElement("td");

        // select 1
        var select_1 = document.createElement("select");

        var op_for_select_1 = document.createElement("option");

        op_for_select_1.innerText = _text["dayOption"];

        select_1.appendChild(op_for_select_1);


        td_inner_1.appendChild(select_1);

        // select 2
        var select_2 = document.createElement("select");

        var op_for_select_2 = document.createElement("option");

        op_for_select_2.innerText = _text["monthOption"];

        select_2.appendChild(op_for_select_2);


        td_inner_1.appendChild(select_2);

        // select 3
        var select_3 = document.createElement("select");
        if (isDevView)
            select_3.setAttribute("id", "selectYear");
        select_3.setAttribute("class", "selectYear");

        if (value === false) {
            select_3.style.display = "none";
        }

        var op_for_select_3 = document.createElement("option");

        op_for_select_3.innerText = _text["yearOption"];

        select_3.appendChild(op_for_select_3);

        td_inner_1.appendChild(select_3);
        tr_inner.appendChild(td_inner_1);

        //span
        var td_inner_2 = document.createElement("td");

        var img = document.createElement("img");
        if (isDevView)
            img.setAttribute("id", "imgCalendar");

        img.setAttribute("class", "dateAndTime");

        img.src = _fieldBase._calendar_png_src;

        if (value === false) {
            img.style.display = "none";
        }

        td_inner_2.appendChild(img);

        tr_inner.appendChild(td_inner_2);
        table_inner.appendChild(tr_inner);
        td_1.appendChild(table_inner);

        row.appendChild(td_1);

        var td_2 = document.createElement("TD");


        var table_inner_2 = document.createElement("table");
        if (isDevView)
            table_inner_2.setAttribute("id", "timeSelectTable");
        table_inner_2.setAttribute("class", "timeSelectTable");

        var incTime = false;
        try {
            incTime = _dataObject.getDataItemObj().includeTime;
        } catch (e) { }

        if (incTime === false) {
            table_inner_2.style.display = "none";
        }

        var tr_inner_2 = document.createElement("tr");

        var td_inner_1_2 = document.createElement("td");

        // select 4
        var select_4 = document.createElement("select");

        var op_for_select_4 = document.createElement("option");

        op_for_select_4.innerText = _text["hourOption"];

        select_4.appendChild(op_for_select_4);

        td_inner_1_2.appendChild(select_4);

        var text = document.createTextNode(_text["betweenHourAndMinute"]);

        td_inner_1_2.appendChild(text);

        // select 5
        var select_5 = document.createElement("select");

        var op_for_select_5 = document.createElement("option");

        op_for_select_5.innerText = _text["minuteOption"];

        select_5.appendChild(op_for_select_5);

        td_inner_1_2.appendChild(select_5);

        // select 6
        var select_6 = document.createElement("select");

        var op_for_select_6 = document.createElement("option");

        op_for_select_6.innerText = _text["amPmOption"];

        select_6.appendChild(op_for_select_6);

        td_inner_1_2.appendChild(select_6);

        tr_inner_2.appendChild(td_inner_1_2);

        var td_inner_2_2 = document.createElement("td");

        var img2 = document.createElement("img");

        if (isDevView)
            img2.setAttribute("id", "imgClock");
        img2.setAttribute("class", "dateAndTime");

        img2.src = _fieldBase._clock_png_src;

        td_inner_2_2.appendChild(img2);

        tr_inner_2.appendChild(td_inner_2_2);
        table_inner_2.appendChild(tr_inner_2);
        td_2.appendChild(table_inner_2);

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

    function includeDateCheckBoxClicked() {

        var _data = _dataObject.getDataItemObj();

        if (_data.includeYear === false) {

            _dataObject.setIncludeYear(true, _fieldBase.saveDataItem);
            document.getElementById("selectYear").style.display = "inline";
            document.getElementById("imgCalendar").style.display = "inline";

            
        }
        else {
            _dataObject.setIncludeYear(false, _fieldBase.saveDataItem);

            document.getElementById("selectYear").style.display = "none";
            document.getElementById("imgCalendar").style.display = "none";
        }

    }

    function includeTimeCheckBoxClicked() {

        var _data = _dataObject.getDataItemObj();

        if (_data.includeTime === false) {
            
            _dataObject.setIncludeTime(true, _fieldBase.saveDataItem);
            document.getElementById("timeSelectTable").style.display = "inline-block";

        }
        else {
            _dataObject.setIncludeTime(false, _fieldBase.saveDataItem);
              document.getElementById("timeSelectTable").style.display = "none";

        }

    }


    function label_1_key_pressed() {

        _dataObject.setFromLabel(this.value, _fieldBase.saveDataItem);

    }

    function label_2_key_pressed() {

        _dataObject.setToLabel(this.value, _fieldBase.saveDataItem);

    }


    function getCompletedView() {

        var tableDateTime = createTableYearAndDate(false);
        tableDateTime.setAttribute("class", "dateAndTimeTable");


        var div = _fieldBase.addGeneralFieldsToCompletedView("dateField", tableDateTime, _dataObject);

        return div;
    }

    function getBootstrapView(orderNro) {

        var data = _dataObject.getDataItemObj();

        var input = document.createElement("input");

        //Todo: without year date

        if (data.includeTime) {
            input.setAttribute("type", "datetime-local");
            input.style.width = "220px";
        }
        else {
            input.style.width = "160px";
            input.setAttribute("type", "date");
        }

        input.setAttribute("class", "form-control");

        var div = _fieldBase.addGeneralFieldsToBootstrapForm("dateField", input, _dataObject, orderNro);

        return div;
    }
}