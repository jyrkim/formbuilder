/*
Represents header, helpText, tooltip and label fields on the Web page
*/

function GridFieldAdvanced(dataObj) {

    var _fieldBase = new FieldBase();

    var _advSettingsContentId = _fieldBase._advSettingsContentId;

    var _dataObject = dataObj;
    var _data = dataObj.getDataItemObj();

    var _inputError = false;

    this.render = render;

    var _text = {};
    _text["labelLimitToOneResponse"] = "Limit to one response per column";

    _text["labelShuffleOptionOrder"] = "Shuffle option order";

    _text["placeholderNumber"] = "Number";
    _text["labelNumber"] = "and";
    _text["placeholderText"] = "Text";
    _text["placeholderRegExp"] = "Pattern";
    _text["placeholderErrorText"] = "Custom error text";

    _text["limitToOneResponseMessage"] = "Please don't select more than one response per column";

    /*For validation summary */
    _text["startOfValidationSummary"] = "Validation:";
    _text["andWord"] = "and";

    _text["optionsWord"] = "options";

    _text["shuffleOnText"] = "Shuffle: on";

    /*Select for Text */
    var _select2_text = {};
    _select2_text[0] = new Array(3);
    _select2_text[0][0] = "Select at least";
    _select2_text[0][1] = "Select at most";
    _select2_text[0][2] = "Select exactly";

    /*Select used in summary */
    var _select2_text_summary = {};
    _select2_text_summary[0] = new Array(3);
    _select2_text_summary[0][0] = "Must select at least";
    _select2_text_summary[0][1] = "Must select at most";
    _select2_text_summary[0][2] = "Must select exactly";

    var _select2_id = {};
    _select2_id[0] = new Array(3);
    _select2_id[0][0] = "select_at_least";
    _select2_id[0][1] = "select_at_most";
    _select2_id[0][2] = "select_exactly";


    function render() {

        //hide advanced content
        $(_advSettingsContentId).hide();

        var div = document.createElement("DIV");

        var datValTable = createTableLimitResponsePerColumn();
        datValTable.setAttribute("class", "advancedTableAlt2");
        datValTable.setAttribute("id", "setValidationTable");
        div.appendChild(datValTable);


        var shuffleTable = createTableForShuffleOptionOrder();
        shuffleTable.setAttribute("class", "advancedTable");
        div.appendChild(shuffleTable);
        updateSummaryText();
        return div;
    }

    function createTableLimitResponsePerColumn() {

        var table = document.createElement("table");

        var row = document.createElement("TR");

        row.setAttribute("class", "dataValidationTableRow");

        var td_1 = document.createElement("TD");

        var input = document.createElement("INPUT");

        input.setAttribute("id", "dataValidation");

        input.setAttribute("type", "checkbox");

        var limit = false;
        try {
            limit = _dataObject.getDataItemObj().advancedSettings.limitOneResponsePerColumn;

        } catch (e) { }

        if (limit === true) {
            input.setAttribute("checked", "checked");
        } 
        
        input.addEventListener('click', checkBoxClicked, false);

        td_1.appendChild(input);

        var td_2 = document.createElement("TD");

        var div = document.createElement("DIV");

        var label = document.createElement("label");

        label.setAttribute("for", "dataValidation");

        var txtLabel = document.createTextNode(_text["labelLimitToOneResponse"]);

        label.appendChild(txtLabel);

        div.appendChild(label);

        td_2.appendChild(div);

        row.appendChild(td_1);

        row.appendChild(td_2);

        var td_3 = document.createElement("TD");

        var errorText;

        errorText = _dataObject.getDataItemObj().advancedSettings.errorText;

        if (!errorText)
            errorText = "";

        var errorInput = createInputFieldForErrorText(errorText, limit);

        td_3.appendChild(errorInput);

        row.appendChild(td_3);

        table.appendChild(row);

        return table;

    }
 
    
    function createInputFieldForErrorText(text, validate) {

        var div = document.createElement("DIV");
        div.setAttribute("id", "divErrorText");

        var input_1 = document.createElement("INPUT");
        input_1.setAttribute("id", "inputErrorText");
        input_1.setAttribute("type", "text");
        input_1.setAttribute("placeholder", _text["placeholderErrorText"]);
        input_1.addEventListener("keyup", error_key_pressed, false);
        
        input_1.value = text;

        if (!validate)
            input_1.disabled = true;

        div.appendChild(input_1);

        return div;
    }

    function createTableForShuffleOptionOrder() {

        var table = document.createElement("table");

        var row = document.createElement("TR");

        row.setAttribute("class", "shuffleOptionOrderTableRow");

        var td_1 = document.createElement("TD");

        var input = document.createElement("INPUT");

        input.setAttribute("id", "shuffle");

        input.setAttribute("type", "checkbox");

        var value = false;
        try {
            value = _dataObject.getDataItemObj().advancedSettings.shuffleOrder;

        } catch (e) { }

        if (value === true) {
            input.setAttribute("checked", "checked");
        }
        //hide content
        $(_advSettingsContentId).hide();

        input.addEventListener('click', shuffleCheckBoxClicked, false);

        td_1.appendChild(input);

        var td_2 = document.createElement("TD");

        td_2.setAttribute("colspan", "4");

        var label = document.createElement("label");

        label.setAttribute("for", "shuffle");

        var txtLabel = document.createTextNode(_text["labelShuffleOptionOrder"]);

        label.appendChild(txtLabel);

        td_2.appendChild(label);

        row.appendChild(td_1);

        row.appendChild(td_2);

        table.appendChild(row);

        _text["shuffleOnText"]

        return table;

    }

    function checkBoxClicked() {

        var _data = _dataObject.getDataItemObj();

        if (_data.advancedSettings.limitOneResponsePerColumn === false) {

            _dataObject.limitOneResponsePerColumn(true, _fieldBase.saveDataItem);

            document.getElementById("inputErrorText").disabled = false;
           
        }
        else {
            _dataObject.limitOneResponsePerColumn(false);

            _dataObject.setErrorText("", _fieldBase.saveDataItem);

            document.getElementById("inputErrorText").value = "";

            document.getElementById("inputErrorText").disabled = true;
        }

        updateSummaryText();
    }


    function shuffleCheckBoxClicked() {

        var shuffleOrder = _dataObject.getDataItemObj().advancedSettings.shuffleOrder;

        if ( shuffleOrder == false) {
            _dataObject.shuffleOrder(true, _fieldBase.saveDataItem);
        }
        else {
            _dataObject.shuffleOrder(false, _fieldBase.saveDataItem);
        }

        updateSummaryText();
    }



    function error_key_pressed() {

        _dataObject.setErrorText(this.value, _fieldBase.saveDataItem);
    }


    function updateSummaryText() {

        var limit = _dataObject.getDataItemObj().advancedSettings.limitOneResponsePerColumn;

        var shuffle = _dataObject.getDataItemObj().advancedSettings.shuffleOrder;

        var desc_text = "";

        if (limit) {
            desc_text = _text["startOfValidationSummary"] + " " + _text["limitToOneResponseMessage"];

            if (shuffle) {
                desc_text = desc_text + "; " + _text["shuffleOnText"];
            }
        } else {

            if (shuffle) {
                desc_text = _text["shuffleOnText"];
            }

        }

        _fieldBase.setAdvancedSettingsDescriptionText(desc_text);

    }
}