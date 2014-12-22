/*
Represents header, helpText, tooltip and label fields on the Web page
*/

function MultiChoiceFieldAdvanced(type, dataObj) {

    var _fieldBase = new FieldBase();

    var _advSettingsContentId = _fieldBase._advSettingsContentId;

    var _dataObject = dataObj;
    var _data = dataObj.getDataItemObj();

    var _type = type;

    var _prev_type = "";

    var _inputError = false;

    this.render = render;
    this.multiChoiceSwitchTo = multiChoiceSwitchTo

    var _text = {};
    _text["labelDataValidation"] = "Data Validation";

    _text["labelShuffleOptionOrder"] = "Shuffle option order";

    _text["placeholderNumber"] = "Number";
    _text["labelNumber"] = "and";
    _text["placeholderText"] = "Text";
    _text["placeholderRegExp"] = "Pattern";
    _text["placeholderErrorText"] = "Custom error text";

    _text["numberInputErrorText"] = "Please enter a whole number greater than zero";

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

        //var table = document.createElement("TABLE");
        //table.setAttribute("class", "advancedTable");


        var datValTable = createTableForDataValidation();
        datValTable.setAttribute("class", "advancedTable");
        datValTable.setAttribute("id", "setValidationTable");

        if (_type !== "checkBox")
            datValTable.style.display = "none";

        div.appendChild(datValTable);

        var checkTable = createTableCheckSettings();
        checkTable.setAttribute("class", "advancedTableAlt");
        checkTable.setAttribute("id", "checkSettingsTable");

        if (_type !== "checkBox")
            checkTable.style.display = "none";

        div.appendChild(checkTable);

        var divErr = createErrorMessageDiv();

        //div.appendChild(table);

        div.appendChild(divErr);

        var validate = false;

        if (_type === "checkBox")
            validate = _dataObject.getDataItemObj().advancedSettings.dataValidation;

        var shuffleTable = createTableForShuffleOptionOrder(validate);
        shuffleTable.setAttribute("class", "advancedTable");

        div.appendChild(shuffleTable);

        updateSummaryText();
        return div;
    }

    function createTableForDataValidation() {

        var table = document.createElement("table");

        var row = document.createElement("TR");

        row.setAttribute("class", "dataValidationTableRow");

        var td_1 = document.createElement("TD");

        var input = document.createElement("INPUT");

        input.setAttribute("id", "dataValidation");

        input.setAttribute("type", "checkbox");

        var value = false;
        try {
            value = _dataObject.getDataItemObj().advancedSettings.dataValidation;

        } catch (e) { }

        if (value === true) {
            input.setAttribute("checked", "checked");
        } 
        
        input.addEventListener('click', checkBoxClicked, false);

        td_1.appendChild(input);

        var td_2 = document.createElement("TD");

        td_2.setAttribute("colspan", "4");

        var label = document.createElement("label");

        label.setAttribute("for", "dataValidation");

        var txtLabel = document.createTextNode(_text["labelDataValidation"]);

        label.appendChild(txtLabel);

        td_2.appendChild(label);

        row.appendChild(td_1);

        row.appendChild(td_2);

        table.appendChild(row);

        return table;
        //return row;
    }
 

    function createTableCheckSettings() {

        var table = document.createElement("table");

        var row = document.createElement("TR");
        row.setAttribute("class", "advanced2ndRow");

        var td_1 = document.createElement("TD");

        var div = document.createElement("DIV");

        div.setAttribute("id", "popSelectHeight");

        td_1.appendChild(div);

        row.appendChild(td_1);

        var td_2 = document.createElement("TD");

        //var divSelect_1 = createSelectField("Select1", "AdvancedType");

        //td_2.appendChild(divSelect_1);
      
        row.appendChild(td_2);

        var td_3 = document.createElement("TD");

        td_3.setAttribute("id", "tdSelect2");

        var divSelect_2 = createSelectField("Select2");

        td_3.appendChild(divSelect_2);

        row.appendChild(td_3);

        var validate = _dataObject.getDataItemObj().advancedSettings.dataValidation;

        var type = _dataObject.getDataItemObj().type;

        //set previous type
        _prev_type = type;

        var td_4 = document.createElement("TD");

        var select_type_id = "";
        var checkCount = "";

        var validate = false;

        if (type === "checkBox") {
            try {
                validate = _dataObject.getDataItemObj().advancedSettings.dataValidation;
            } catch (e) { }

            try {
                select_type_id = _dataObject.getDataItemObj().advancedSettings.checkBoxValidation.type;
            } catch (e) { }

            try {
                checkCount = _dataObject.getDataItemObj().advancedSettings.checkBoxValidation.checkCount;
            } catch (e) { }
        }
 
        var divCheckBox = createCheckBoxInput(type, select_type_id, checkCount, validate);

        td_4.appendChild(divCheckBox);

        row.appendChild(td_4);

        var td_5 = document.createElement("TD");

        var errorText;
        //try {
             errorText = _dataObject.getDataItemObj().advancedSettings.errorText;
        //} catch (e) { errorText = ""; }
        //console.log("errorText " + errorText);
        if (!errorText)
            errorText = "";

        var divError = createInputFieldForErrorText(errorText, validate);

        td_5.appendChild(divError);

        row.appendChild(td_5);

        table.appendChild(row);

        return table;
        //return row;

    }

    function createErrorMessageDiv() {

        var div = document.createElement("DIV");

        div.setAttribute("id", "advErrorRow");

        div.style.display = "none";

        var label = document.createElement("label");

        label.setAttribute("id", "advErrorMsg");

        var txtLabel = document.createTextNode(_text["numberInputErrorText"]);

        label.appendChild(txtLabel)

        div.appendChild(label);

        return div;
    }

    function createSelectField(id) {

        var divFieldSelect = document.createElement("DIV");

        divFieldSelect.setAttribute("id", "popSelectFieldDiv" + id);
        
        var table = document.createElement("table");

        table.setAttribute("id", "popSelectField" + id);
       
        var validate = _dataObject.getDataItemObj().advancedSettings.dataValidation;

        if (validate) {
            table.addEventListener("click", selectClick, false);
            table.setAttribute("class", "popSelectField");
        }
        else
            table.setAttribute("class", "popSelectFieldDisabled");

        var tr = document.createElement("TR");

        var td_1 = document.createElement("TD");

        // selected text
        var spanFieldSelectText = document.createElement("SPAN");
        spanFieldSelectText.setAttribute("id", "selectFieldText" + id);
        spanFieldSelectText.setAttribute("class", "selectFieldText");

        if (validate) 
           spanFieldSelectText.setAttribute("class", "selectFieldText");
        else
           spanFieldSelectText.setAttribute("class", "selectFieldTextDisabled");

        var selectedText;
    
        table.setAttribute("data-for", "popSelectAdvancedText");

        var val_2nd_select

        try {
            val_2nd_select = _dataObject.getDataItemObj().advancedSettings.checkBoxValidation.type;          
        } catch (e) { }

        if (val_2nd_select) {
            selectedText = getTextForId(val_2nd_select, _select2_id[0], _select2_text[0]);
        } else {
            selectedText = _select2_text[0][0];
        }

        var text;
        
        text = document.createTextNode(selectedText);

        spanFieldSelectText.appendChild(text);

        td_1.appendChild(spanFieldSelectText);

        tr.appendChild(td_1);

        var td_2 = document.createElement("TD");

        var spanImageSelect = document.createElement("SPAN");
        spanImageSelect.setAttribute("class", _fieldBase._triangleClassSouth);

        divFieldSelect.appendChild(spanImageSelect);

        td_2.appendChild(spanImageSelect);

        tr.appendChild(td_2);

        table.appendChild(tr);

        table.style = "";

        divFieldSelect.appendChild(table);

        select_PopUp_text = createSelectPopUp("AdvancedText", _select2_id[0], _select2_text[0]);

        divFieldSelect.appendChild(select_PopUp_text);
        
        return divFieldSelect;
    }


    function createCheckBoxInput(type, select_type_id, checkCount, validate) {

        var div = document.createElement("DIV");
        div.setAttribute("id", "divTextType");

        //if (type != "checkBox")
        //    div.style.display = "none";

        var input_1 = document.createElement("INPUT");
        input_1.setAttribute("id", "inputCheckCount");
        input_1.setAttribute("type", "text");
        input_1.setAttribute("class", "inputShort");
        input_1.setAttribute("placeholder", _text["placeholderNumber"]);
        input_1.addEventListener("keyup", text_key_pressed, false);
        input_1.addEventListener("blur", text_input_blur, false);

        if (!validate)
            input_1.disabled = true;

        if ((type === "checkBox") && (validate == true)) {

            input_1.value = checkCount;
        }

        div.appendChild(input_1);

        return div;
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

    function createTableForShuffleOptionOrder(validate) {

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
        //return row;
    }

    function getTextForId(id, idArray, textArray) {

        for (i = 0; i < Object.keys(textArray).length; i++) {

            if (id === idArray[i])
                return textArray[i];
        }

        return undefined;
    }

    function getSelectedPopUpNro(id, idArray) {

        for (i = 0; i < Object.keys(idArray).length; i++) {

            if (id === idArray[i])
                return (i + 1);
        }

        return undefined;
    }

    function createSelectPopUp(name, idArray, textArray) {

        var div = document.createElement("DIV");

        div.setAttribute("id", "popSelect" + name);
        div.setAttribute("class", "popSelect");

        for (i = 0; i < Object.keys(textArray).length; i++) {

            var div_sub = document.createElement("DIV");
            div_sub.setAttribute("id", idArray[i]);
            div_sub.setAttribute("data-nro", (i + 1));
            div_sub.setAttribute("class", "popSelectItem");

            div_sub.addEventListener("click", popUpSelect, false);

            var text = document.createTextNode(textArray[i]);
            div_sub.appendChild(text);
            div.appendChild(div_sub);
        }

        return div;
    }

    function checkBoxClicked() {

        var _data = _dataObject.getDataItemObj();

        if (_data.advancedSettings.dataValidation === false) {

            _dataObject.setDataValidation(true);
            _dataObject.setCheckBoxValidationType(_select2_id[0][0], _fieldBase.saveDataItem);

            document.getElementById("selectFieldTextSelect2").innerHTML = _select2_text[0][0];
            document.getElementById("popSelectFieldSelect2").setAttribute("data-for", "popSelectAdvancedText");

            document.getElementById("divTextType").style.display = "inline"
            document.getElementById("inputCheckCount").style.display = "inline";

            document.getElementById("popSelectFieldSelect2").addEventListener("click", selectClick, false);

            document.getElementById("popSelectFieldSelect2").setAttribute("class", "popSelectField");

            document.getElementById("selectFieldTextSelect2").setAttribute("class", "selectFieldText");

            document.getElementById("inputCheckCount").disabled = false;
            document.getElementById("inputErrorText").disabled = false;

            var desc_text = _text["startOfValidationSummary"] + " "
                         + getTextForId(_select2_id[0][0], _select2_id[0], _select2_text_summary[0]);

            desc_text = desc_text + " " + _text["optionsWord"];

            _fieldBase.setAdvancedSettingsDescriptionText(desc_text);
           
        }
        else {
            _dataObject.setDataValidation(false);
            _dataObject.setCheckBoxValidationType("");
            _dataObject.checkBoxValidationCheckCount("");

            _dataObject.setErrorText("", _fieldBase.saveDataItem);

            document.getElementById("divTextType").style.display = "inline";

            $('#inputCharCount').val("");

            document.getElementById("popSelectFieldSelect2").removeEventListener("click", selectClick, false);

            document.getElementById("popSelectFieldSelect2").setAttribute("class", "popSelectFieldDisabled");
            
            document.getElementById("selectFieldTextSelect2").setAttribute("class", "selectFieldTextDisabled");

            document.getElementById("inputCheckCount").disabled = true;

            document.getElementById("inputErrorText").disabled = true;

            document.getElementById("selectFieldTextSelect2").innerHTML = _select2_text[0][0];

            _fieldBase.setAdvancedSettingsDescriptionText("");

            if (document.getElementById("advErrorRow").style.display == "inline") {
                document.getElementById("advErrorRow").style.display = "none";
                document.getElementById("inputCheckCount").setAttribute("class", "inputShort");
            }
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

    function popUpSelect() {

        var parentId = this.parentNode.id;
        var dataNro = this.getAttribute("data-nro");

        dataNro = parseInt(dataNro) - 1;

        if (parentId === "popSelectAdvancedText") {

            _fieldBase.setActiveSelectField("popSelectFieldSelect2");

            //check if type same as before
            var prev_type_id = _dataObject.getDataItemObj().advancedSettings.checkBoxValidation.type;

            if (prev_type_id === _select2_id[0][dataNro]) {
                $("#" + parentId).hide();
                return;
            }

            setErrorMsgPos();

            var type_id = _select2_id[0][dataNro];

            _dataObject.setCheckBoxValidationType(_select2_id[0][dataNro], _fieldBase.saveDataItem);
            document.getElementById("selectFieldTextSelect2").innerHTML = _select2_text[0][dataNro];

            document.getElementById("inputCheckCount").style.display = "inline";

            var desc_text = _text["startOfValidationSummary"] + " "
                     + getTextForId(type_id, _select2_id[0], _select2_text_summary[0]);

            var checkCount = _dataObject.getDataItemObj().advancedSettings.checkBoxValidation.checkCount;

            if (checkCount === undefined)
                checkCount = "";

            desc_text = desc_text + " " + checkCount + " " + _text["optionsWord"];

            _fieldBase.setAdvancedSettingsDescriptionText(desc_text);
        } 

        $("#" + parentId).hide();

        updateSummaryText();
     
    }

    function setErrorMsgPos() {

        var posLeft1 = $("#tblAdvanced").offset().left;
        
        var posLeft2 = $("#popSelectFieldDivSelect2").offset().left;

        var posLeft = $("#tdSelect2").position().left;
        
        var outerWidth = $("#popSelectFieldDivSelect2").outerWidth();

        $("#advErrorMsg").css({
            position: "relative",
            left: (posLeft2 + outerWidth - posLeft1 + 3) + "px"
        }).show();
    
    }

    function selectClick() {

        _fieldBase.unsetActiveSelectField();

        var id = ("#" + this.parentNode.id);
        var posTop = $(id).offset().top;

        //table id
        //childNodes
        var selectField_id = "#" + this.id;

        var popSelect_Id = "#" + this.getAttribute("data-for");

        var popSelectPosition = $(popSelect_Id).css("position");

        var selectFieldPadding = $(popSelect_Id).css("padding-top");
        var selectFieldPaddingHeight = parseInt(selectFieldPadding);
    
        var nroOfItems = $( popSelect_Id + " div").length;

        var popHeight = $(popSelect_Id + " > div:first-child").css("min-height") || $(popSelect_Id + " > div:first-child").outerHeight();
        height = parseInt(popHeight);
        var itemPadding = $(popSelect_Id + " > div:first-child").css("padding-top");
        var itemPaddingHeight = parseInt(itemPadding);

        var heightPerItem = height + itemPaddingHeight;
       
        //get select Nro
        var selectNro = 1;       

        if (popSelect_Id === "#popSelectAdvancedText") {

            var type = _dataObject.getDataItemObj().advancedSettings.checkBoxValidation.type;

            if (type) {
                selectNro = getSelectedPopUpNro(type, _select2_id[0]);
            }

        } 

        //http://stackoverflow.com/questions/16569941/use-jquery-to-detect-when-an-element-is-near-the-bottom-of-the-page
        //if( ($(this).offset().top > ($(window).scrollTop() + $(window).height() - 20)) /

        var topSpaceNarrow = false;

        var pos = $(selectField_id).offset();

        //1. check if pop up close to top of the browser window
        var selectTopSize = (selectNro - 1) * heightPerItem; // -1 level item

        var spaceBetweenTop = pos.top - $(window).scrollTop();

        if (spaceBetweenTop < -1) {
            spaceBetweenTop = spaceBetweenTop * -1;
        }

        if (selectTopSize > spaceBetweenTop) {
            topSpaceNarrow = true;
            selectTopSize = spaceBetweenTop;
        } else {
            spaceBetweenTop = selectTopSize;
        }

        var spaceForNroOfItemsAbove = Math.floor(spaceBetweenTop / heightPerItem);

        var nroOfItemsBelow = nroOfItems - 1 - spaceForNroOfItemsAbove; // - 1 = level item

        //2.  check if pop up close to bottom of the browser window
        var selectBottomSize = (nroOfItems - selectNro) * heightPerItem;
        var spaceBetweenBottom = (pos.top + $(selectField_id).height()) - ($(window).scrollTop() + $(window).height());

        if (spaceBetweenBottom < -1) {
            spaceBetweenBottom = spaceBetweenBottom * -1;
        }

        if (spaceBetweenBottom > selectBottomSize) {
            spaceBetweenBottom = selectBottomSize;
        } 

        var spaceForNroOfItems = Math.floor(spaceBetweenBottom / heightPerItem);

        var nroOfItemsAbove = nroOfItems - 1 - spaceForNroOfItems; // - 1 = level item

        var reducedFromBottom = 0;

        
        var j = 0;

        var vertical = 0;

        if (topSpaceNarrow) {
            vertical = spaceForNroOfItemsAbove * heightPerItem;
        } else {  //avoid narrow bottom
            vertical = nroOfItemsAbove * heightPerItem;
        }
         
        // .outerWidth() takes into account border and padding.
        var width = $(selectField_id).outerWidth();

        //hide all pop ups
        $(".popSelect").hide();

        //show
        $(popSelect_Id).css({
               position: "absolute",
               top: ((pos.top - vertical) - selectFieldPaddingHeight - 1) + "px",
               left: (pos.left - 10) + "px"
        }).show();


        document.getElementById(popSelect_Id.substr(1)).addEventListener("mouseleave", function () {
            $(popSelect_Id).hide();
        } );

    }

    function text_key_pressed() {

        var text_type_id = _dataObject.getDataItemObj().advancedSettings.checkBoxValidation.type;
     
        var input1Val = _fieldBase.replaceCommaAndRemoveWhitespace(this.value);

        var input1Empty = (input1Val.length == 0) ? true : false;

        var isInput1Int = _fieldBase.is_integer(input1Val);

        if (isInput1Int || input1Empty) {

            if (!input1Empty)
                _dataObject.checkBoxValidationCheckCount(parseInt(input1Val), _fieldBase.saveDataItem);
            else
                _dataObject.checkBoxValidationCheckCount("", _fieldBase.saveDataItem);
        }

        updateSummaryText();

    }

    function text_input_blur() {

        var input1Val = _fieldBase.replaceCommaAndRemoveWhitespace(document.getElementById("inputCheckCount").value);

        var isInput1Int = _fieldBase.is_integer(input1Val);

        var input1Length = input1Val.length;

        var input1Empty = (input1Length == 0) ? true : false;

        if (!isInput1Int && !input1Empty) {

            setErrorMsgPos();

            document.getElementById("advErrorRow").style.display = "inline";
   
            document.getElementById("inputCheckCount").setAttribute("class", "inputShort inputError");

        } else if (isInput1Int || input1Empty) {

            document.getElementById("inputCheckCount").setAttribute("class", "inputShort");

            //just in case if contains whitespace
            if ((input1Empty) && (document.getElementById("inputCheckCount").value.length > 0))
                document.getElementById("inputCheckCount").value = "";

            document.getElementById("advErrorRow").style.display = "none";

        }

        updateSummaryText();
    }

    function error_key_pressed() {

        _dataObject.setErrorText(this.value, _fieldBase.saveDataItem);
    }

    function multiChoiceSwitchTo(type, dataObject) {

        _dataObject = dataObject;
    
        if ((type === "radioButton") || (type === "list")) {
            
            $("#setValidationTable").hide();
            $("#checkSettingsTable").hide();
            $("#divError").hide();

        } else { //checkBox
            $("#setValidationTable").show();
            $("#checkSettingsTable").show();
            $("#divError").show();
        }

        updateSummaryText();

    }

    function updateSummaryText() {

        var type = _dataObject.getDataItemObj().type;

        var shuffle = _dataObject.getDataItemObj().advancedSettings.shuffleOrder;

        if (shuffle == true) {

            if (type == "checkBox") {

                var validate = _dataObject.getDataItemObj().advancedSettings.dataValidation;

                var checkCount = _dataObject.getDataItemObj().advancedSettings.checkBoxValidation.checkCount;

                var select_type_id = _dataObject.getDataItemObj().advancedSettings.checkBoxValidation.type;

                if (validate) {

                    var desc_text = _text["startOfValidationSummary"] + " " +
                        getTextForId(select_type_id, _select2_id[0], _select2_text_summary[0]);

                    desc_text = desc_text + " " + checkCount + " " + _text["optionsWord"];

                    desc_text = desc_text + "; " + _text["shuffleOnText"];

                    _fieldBase.setAdvancedSettingsDescriptionText(desc_text);

                }
                else {

                    _fieldBase.setAdvancedSettingsDescriptionText(_text["shuffleOnText"]);
                }

            }
            else {

                console.log(_text["shuffleOnText"]);

                _fieldBase.setAdvancedSettingsDescriptionText(_text["shuffleOnText"]);
            }

        }
        else {

            if (type == "checkBox") {

                var validate = _dataObject.getDataItemObj().advancedSettings.dataValidation;

                var checkCount = _dataObject.getDataItemObj().advancedSettings.checkBoxValidation.checkCount;

                var select_type_id = _dataObject.getDataItemObj().advancedSettings.checkBoxValidation.type;

                if (validate) {

                    var desc_text = _text["startOfValidationSummary"] + " " +
                        getTextForId(select_type_id, _select2_id[0], _select2_text_summary[0]);

                    desc_text = desc_text + " " + checkCount + " " + _text["optionsWord"];

                    _fieldBase.setAdvancedSettingsDescriptionText(desc_text);

                }
                else {
                    _fieldBase.setAdvancedSettingsDescriptionText("");
                }

            } else {

                _fieldBase.setAdvancedSettingsDescriptionText("");
            }

        }

    }
}