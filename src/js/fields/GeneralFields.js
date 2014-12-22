
/*

Represents title and helpText fields on the Web page

*/

function GeneralFields(type, dataObj) {

    var _fieldBase = new FieldBase();

    var _elementToAppendTo = _fieldBase._elementToAppendTo;
    var _formBuilderIdentifier = _fieldBase._formBuilderIdentifier;
    var _advSettingsContentId = _fieldBase._advSettingsContentId;
    var _advSettingsSummaryId = _fieldBase._advSettingsSummaryId;

    var _advSettingsContentId = _fieldBase._advSettingsContentId;

    var _popup = new PopupMenu(type);

    var _dataObject = dataObj;
    var _data = dataObj.getDataItemObj();

    var _prevType = type;
    var _style = _fieldBase._style;

    var _data;
    var _dataObject;

    var _text = {};

    _text["labelTextForSelectType"] = "Question Type:";
    _text["labelTextForTitle"] = "Question Title:";
    _text["placeholderForTitle"] = "Untitled Question";
    _text["labelTextForHelp"] = "Help Text:";
    _text["labelTextForLabel"] = "Label Text:";
    _text["textForDoneButton"] = "Done";
    _text["labelTextForRequired"] = "Required question";

    _text["popAddItem"] = "Add item";

    _text["popHeader1"] = "Basic";
    _text["textField"] = "Text";
    _text["paragraphField"] = "Paragraph field";
    _text["radioButton"] = "Multiple choice";
    _text["checkBox"] = "Checkboxes";
    _text["list"] = "Choose from a list";

    _text["popHeader2"] = "Advanced";
    _text["scaleField"] = "Scale";
    _text["grid"] = "Grid";
    _text["dateField"] = "Date";
    _text["timeField"] = "Time";

    _text["popHeader3"] = "Layout";
    _text["sectionHeader"] = "Section header";
    _text["pageBreak"] = "Page break";
    _text["image"] = "Image";
    _text["video"] = "Video";

    _text["advSettings"] = "Advanced Settings";


    this.render = render;
    this.switchFieldType = switchFieldType;


    /* append TextField for development */
    function render() {

        //var start = new Date().getTime();

        var table = document.createElement("TABLE");

        // id --> class
        table.setAttribute("class", "mainTable");

        var row_first = createFirstTableRow();
        table.appendChild(row_first);

        // row 1, select type
        var row_1 = createSelectTypeTableRow();
        row_1.setAttribute("class", "tblMain");

        table.appendChild(row_1);

        var title = _dataObject.getDataItemObj().title;

        //row 2, header
        var row_2 = createGeneralFieldsTableRow(_text["labelTextForTitle"], "inputTitle", title, _text["placeholderForTitle"]);
        row_2.setAttribute("class", "tblMain");

        table.appendChild(row_2);

        var helpText = _dataObject.getDataItemObj().helpText;
        //row 3, helpText
        var row_3 = createGeneralFieldsTableRow(_text["labelTextForHelp"], "inputHelpText", helpText);
        row_3.setAttribute("class", "tblMain");

        table.appendChild(row_3);

        var label = _dataObject.getDataItemObj().label;
        //row 4, label
        //var row_4 = createGeneralFieldsTableRow(_text["labelTextForLabel"], "inputLabel", label);
        //row_4.setAttribute("id", "inputLabelRow");
        //row_4.setAttribute("class", "tblMain");

        //if ((type == "grid") || (type == "scaleField")) {

          //  row_4.style.display = "none";

        //}

        //table.appendChild(row_4);

        // row 5, dev table
        var row_5 = createDevTableRow();

        table.appendChild(row_5);

        var row_6 = createAdvancedSettingsTableRow();
        if ((type == "scaleField") || (type == "dateField") || (type == "timeField")) {

            row_6.style.display = "none";

        }
        table.appendChild(row_6);
        

        // row 7, done button row
        var row_7 = createDoneButtonTableRow();
        row_7.setAttribute("class", "tblMain");

        table.appendChild(row_7);

        //var end = new Date().getTime();

        //var time = end - start;

        return table;

    }

    function createFirstTableRow() {

        var row = document.createElement("TR");

        row.setAttribute("class", "toggle");

        row.setAttribute("id", "first-row");

        var td = document.createElement("TD"); 

        //var span = document.createElement("span");

        //span.setAttribute("class", _fieldBase._classesForIconGrip);

        //td.appendChild(span);

        td.setAttribute("colspan", "2");

        row.appendChild(td);

        var td_2 = document.createElement("TD"); 
        td_2.setAttribute("rowspan", "3"); // 4 

        td_2.appendChild(new EditForm("active").render());
        row.appendChild(td_2);

        return row;

    }

    function createSelectTypeTableRow() {

        //first row
        var row = document.createElement("TR");

        row.setAttribute("class", "selectTypeTableRow");

        var td_1 = document.createElement("TD");

        var label = document.createElement("label");

        var textSelectType = document.createTextNode(_text["labelTextForSelectType"]);

        label.appendChild(textSelectType);

        td_1.appendChild(label);

        row.appendChild(td_1);

        var td_2 = document.createElement("TD");
        
        //popup menu
        var menuDiv = _popup.createPopupMenu();
        td_2.appendChild(menuDiv);

        row.appendChild(td_2);

        return row;

    }


    function createGeneralFieldsTableRow(labelText, inputId, inputText, placeholder) {

        var row = document.createElement("TR");

        row.setAttribute("class", "toggle");

        var td_1 = document.createElement("TD");

        var label = document.createElement("label");

        var text = document.createTextNode(labelText);

        label.appendChild(text);

        td_1.appendChild(label);

        row.appendChild(td_1);

        var td_2 = document.createElement("TD");

        var input = document.createElement("INPUT");
        input.setAttribute("id", inputId);
        if (inputText)
            input.setAttribute("value", inputText);
        else
            input.setAttribute("value", "");

        input.setAttribute("type", "text");

        if (placeholder)
            input.setAttribute("placeholder", placeholder);

        input.addEventListener("keyup", key_pressed, false);

        input.setAttribute("class", "inputLong");

        td_2.appendChild(input);

        row.appendChild(td_2);

        return row;

    }

    function switchFieldType(type, dataObj) {
    
        _dataObject = dataObj;

        //remove class for dev fields #dev-row 
        $(_fieldBase._parentElementToAddCSSClass).removeClass();

        //popup
        document.getElementsByClassName('selectFieldText')[0].innerHTML = _text[type];

        //exit function if multichoice switch
        if ((_prevType == "radioButton") || (_prevType == "list") || (_prevType == "checkBox")) {
            if ((type == "radioButton") || (type == "list") || (type == "checkBox")) {

                _prevType = type;
                return;
            }
        }

        //label hide or show
 /*       if ((type == "grid") || (type == "scaleField")) {

            document.getElementById('inputLabelRow').style.display = "none";

        } else {
            document.getElementById('inputLabelRow').style.display = "table-row";

            document.getElementById('inputLabel').value = _dataObject.getDataItemObj().label;
        }*/

        //empty field content
        document.getElementById(_elementToAppendTo.substr(1)).innerHTML = "";

        //console.log(type);

        //advanced settings hide or show
        if ((type == "scaleField") || (type == "dateField") || (type == "timeField")) {

            document.getElementById('advanced').style.display = "none";

        } else {
            document.getElementById(_advSettingsContentId.substr(1)).innerHTML = "";

            _fieldBase.advancedSettingsArrowRight();

            document.getElementById(_advSettingsSummaryId).innerHTML = "";

            document.getElementById('advanced').style.display = "table-row";
        }

        _prevType = type;

    }

    function updateRequiredField() {

        _dataObject.setRequiredQuestion(this.checked, _fieldBase.saveDataItem);

    }

    function key_pressed() {

        if (this.id === "inputTitle") {
            _dataObject.setTitle(this.value, _fieldBase.saveDataItem);
            return;
        }
        else if (this.id === "inputHelpText") {
            _dataObject.setHelpText(this.value, _fieldBase.saveDataItem);
            return;
        }
        else if (this.id === "inputLabel")
            _dataObject.setLabel(this.value, _fieldBase.saveDataItem);
    }

    function createDevTableRow() {

        var row = document.createElement("TR");

        row.setAttribute("class", "toggle");

        row.setAttribute("id", "dev-row");

        var td = document.createElement("TD");

        td.setAttribute("id", "dev-td");

        td.setAttribute("colspan", "3");

        row.appendChild(td);

        return row;

    }

    

    function createAdvancedSettingsTableRow() {

        var row = document.createElement("TR");

        row.setAttribute("class", "toggle");

        row.setAttribute("id", "advanced");

        var td_1 = document.createElement("TD");

        td_1.setAttribute("colspan", "3");

        var div_cont = document.createElement("DIV");

        //inner table
        div_cont.setAttribute("id", "divAdvanced");

        var table = document.createElement("table");

        table.addEventListener("click", advancedSettingsClick, false);

        table.setAttribute("id", "tblAdvanced");

        //inner row
        var row_inner_1 = document.createElement("TR");

        //inner td 1
        var td_inner_1 = document.createElement("TD");

        var div_1 = document.createElement("DIV");

        div_1.setAttribute("id", "div_triangle_e");

        var span_triangle_e = document.createElement("SPAN");

        span_triangle_e.setAttribute("id", "span_triangle_e");

        span_triangle_e.setAttribute("class", "ui-icon ui-icon-triangle-1-e");

        div_1.appendChild(span_triangle_e);

        td_inner_1.appendChild(div_1);

        var div_2 = document.createElement("DIV");

        div_2.setAttribute("id", "div_triangle_s");

        var span_triangle_s = document.createElement("SPAN");

        span_triangle_s.setAttribute("id", "span_triangle_s");

        span_triangle_s.setAttribute("class", "ui-icon ui-icon-triangle-1-s");

        div_2.style.display = "none";

        div_2.appendChild(span_triangle_s);

        td_inner_1.appendChild(div_2);

        row_inner_1.appendChild(td_inner_1);

        //inner td 2
        var td_inner_2 = document.createElement("TD");

        var div_3 = document.createElement("DIV");

        var span_header = document.createElement("SPAN");

        span_header.setAttribute("id", "advSettingsHeader");

        var text = document.createTextNode(_text["advSettings"]);

        span_header.appendChild(text);

        div_3.appendChild(span_header);

        var span_text = document.createElement("SPAN");

        div_3.appendChild(span_text);
        td_inner_2.appendChild(div_3);
        row_inner_1.appendChild(td_inner_2);

        span_text.setAttribute("id", "advSettingsSummary");


        table.appendChild(row_inner_1);

        div_cont.appendChild(table);

        // div 4 for content, below inner table

        var div_4 = document.createElement("DIV");

        div_4.setAttribute("id", "advSettingsContent");

        var span_title = document.createElement("SPAN");

        span_title.setAttribute("id", "advSettingTitle");

        div_4.appendChild(span_title);

        div_cont.appendChild(div_4);

        td_1.appendChild(div_cont);

        row.appendChild(td_1);

        return row;
    }
    

    function advancedSettingsClick() {

        var div_triangle_s = document.getElementById("div_triangle_s");
        var div_triangle_e = document.getElementById("div_triangle_e");

        if (div_triangle_s.style.display == "none") {

            div_triangle_s.style.display = "inline";
            div_triangle_e.style.display = "none";

            $(_advSettingsContentId).slideToggle("slow", function () {
                $("#advSettingsSummary").hide();
            });
        }
        else {
            div_triangle_e.style.display = "inline";
            div_triangle_s.style.display = "none";

            $(_advSettingsContentId).slideToggle("slow", function () {
                $("#advSettingsSummary").show();
            });        
        }
    }


    /* not for general fields - for done field */
    function createCompleteTableRow() {

        var div_1 = document.createElement("DIV");

        div_1.setAttribute("id", "advSettingsRow2");

        var span_title = document.createElement("SPAN");

        span_title.setAttribute("id", "questionTitle");

        div_1.appendChild(span_title);

        var div_2 = document.createElement("DIV");

        var span_helpText = document.createElement("SPAN");

        span_helpText.setAttribute("id", "questionHelpText");

        div_2.appendChild(span_helpText);

        var div_3 = document.createElement("DIV");

        var span_title = document.createElement("SPAN");

        span_title.setAttribute("id", "questionTitle");

        div_3.appendChild(span_title);

    }

    function createDoneButtonTableRow() {

        var row = document.createElement("TR");

        row.setAttribute("id", "lastRow");

        row.setAttribute("class", "toggle");

        var td_1 = document.createElement("TD");

        var button = document.createElement("DIV");
        button.setAttribute("id", "doneButton");

        var text = document.createTextNode(_text["textForDoneButton"]);

        button.appendChild(text);

        td_1.appendChild(button);

        row.appendChild(td_1);

        var td_2 = document.createElement("TD");

        var table_inner = document.createElement("TABLE");
        table_inner.setAttribute("id", "tblLastRowInner");

        var row_inner = document.createElement("TR");

        var td_1_inner = document.createElement("TD");

        var input = document.createElement("INPUT");
        input.setAttribute("id", "requiredQuestion");
        input.setAttribute("type", "checkbox");
        input.addEventListener('change', updateRequiredField, false);

        var value = false;
        try {
            value = _dataObject.getDataItemObj().requiredQuestion;

        } catch (e) { }
        if (value === true)
            input.setAttribute("checked", "checked");

        td_1_inner.appendChild(input)
     

        var td_2_inner = document.createElement("TD");

        var label = document.createElement("label");     

        var text2 = document.createTextNode(_text["labelTextForRequired"]);

        label.appendChild(text2);

        label.setAttribute("for", "requiredQuestion");

        td_2_inner.appendChild(label)

        row_inner.appendChild(td_1_inner);

        row_inner.appendChild(td_2_inner);

        table_inner.appendChild(row_inner);

        td_2.appendChild(table_inner);

        row.appendChild(td_2);

        var td_3 = document.createElement("TD");

        row.appendChild(td_3);

        return row;
    }
  
}