/*
Represents header, helpText, tooltip and label fields on the Web page
*/

function ParagraphFieldAdvanced(dataObj) {

    var _fieldBase = new FieldBase();

    var _advSettingsContentId = _fieldBase._advSettingsContentId;

    var _dataObject = dataObj;
    var _data = dataObj.getDataItemObj();

    var _prev_type = "";

    var _inputError = false;

    this.render = render;
    var _text = {};
    _text["labelDataValidation"] = "Data Validation";

    _text["placeholderNumber"] = "Number";
    _text["labelNumber"] = "and";
    _text["placeholderText"] = "Text";
    _text["placeholderRegExp"] = "Pattern";
    _text["placeholderErrorText"] = "Custom error text";

    _text["numberInputErrorText"] = "Please enter a whole number greater than zero";

    /*For validation summary */
    _text["startOfValidationSummary"] = "Validation:";
    _text["andWord"] = "and";

    _text["charactersWord"] = "characters";

    _text["or_greater_than"] = "or greater than";

    /*Select 1 */
    var _select1_text = {};
    _select1_text[0] = "Text";
    _select1_text[1] = "Regular expression";

    var _select1_id = {};
    _select1_id[0] = "text";
    _select1_id[1] = "regular_expression";

    /*Select 2 for Text */
    var _select2_text = {};
    _select2_text[0] = new Array(2);
    _select2_text[0][0] = "Maximum character count";
    _select2_text[0][1] = "Minimum character count";


    /*Select 2 for Text, used in summary */
    var _select2_text_summary = {};
    _select2_text_summary[0] = new Array(2);
    _select2_text_summary[0][0] = "Must be fewer than";
    _select2_text_summary[0][1] = "Must be at least";

    var _select2_id = {};
    _select2_id[0] = new Array(2);
    _select2_id[0][0] = "max_char_count";
    _select2_id[0][1] = "min_char_count";


    /*Select 2 for Regular Expression */
    _select2_text[1] = new Array(4);
    _select2_text[1][0] = "Contains";
    _select2_text[1][1] = "Does not contain";
    _select2_text[1][2] = "Matches";
    _select2_text[1][3] = "Does not match";

    /*Select 2 for Regular Expression, used in summary */
    _select2_text_summary[1] = new Array(4);
    _select2_text_summary[1][0] = "Must contain pattern";
    _select2_text_summary[1][1] = "Must not contain pattern";
    _select2_text_summary[1][2] = "Must match pattern";
    _select2_text_summary[1][3] = "Must not match pattern";

    _select2_id[1] = new Array(4);
    _select2_id[1][0] = "contains";
    _select2_id[1][1] = "does_not_contain";
    _select2_id[1][2] = "matches";
    _select2_id[1][3] = "does_not_match";

    function render() {

        var div = document.createElement("DIV");

        var table = document.createElement("TABLE");
        table.setAttribute("class", "advancedTable");

        var row_1 = createRowDataValidation();

        table.appendChild(row_1);

        var row_2 = createRowSettings();

        table.appendChild(row_2);

        var divErr = createErrorMessageDiv();

        div.appendChild(table);

        div.appendChild(divErr);
        return div;
    }

    function createRowDataValidation() {

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
        //hide content
        $(_advSettingsContentId).hide();
        
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

        return row;
    }
 

    function createRowSettings() {

        var row = document.createElement("TR");
        row.setAttribute("class", "advanced2ndRow");

        var td_1 = document.createElement("TD");

        var div = document.createElement("DIV");

        div.setAttribute("id", "popSelectHeight");

        td_1.appendChild(div);

        row.appendChild(td_1);

        var td_2 = document.createElement("TD");

        var divSelect_1 = createSelectField("Select1", "AdvancedType");

        td_2.appendChild(divSelect_1);
      
        row.appendChild(td_2);

        var td_3 = document.createElement("TD");

        td_3.setAttribute("id", "tdSelect2");

        var divSelect_2 = createSelectField("Select2", "AdvancedNumber");

        td_3.appendChild(divSelect_2);

        row.appendChild(td_3);

        var validate = _dataObject.getDataItemObj().advancedSettings.dataValidation;

        var val_type = _dataObject.getDataItemObj().advancedSettings.validationType;

        //set previous type
        _prev_type = val_type;

        var td_4 = document.createElement("TD");

        var text_type_id = "";
        var charCount = "";

        if (val_type === "text") {
            try {
                text_type_id = _dataObject.getDataItemObj().advancedSettings.textValidation.type;
            } catch (e) { }

            try {
                charCount = _dataObject.getDataItemObj().advancedSettings.textValidation.charCount;

            } catch (e) { }
        }
 
        var divText = createInputFieldsForText(val_type, text_type_id, charCount, validate);

        td_4.appendChild(divText);

        var reg_exp_type_id = "";
        var pattern = "";

        if (val_type === "regular_expression") {
            try {
                reg_exp_type_id = _dataObject.getDataItemObj().advancedSettings.regExpValidation.type;
            } catch (e) { }

            try {
                pattern = _dataObject.getDataItemObj().advancedSettings.regExpValidation.pattern;
            } catch (e) { }
        }

        var divRegExp = createInputFieldsForRegExp(val_type, reg_exp_type_id, pattern, validate);

        td_4.appendChild(divRegExp);

        row.appendChild(td_4);

        var td_5 = document.createElement("TD");

        var errorText = _dataObject.getDataItemObj().advancedSettings.errorText;

        var divError = createInputFieldForErrorText(errorText, validate);

        td_5.appendChild(divError);

        row.appendChild(td_5);

        return row;

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

    function createSelectField(id, type) {

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

        var val_type = _dataObject.getDataItemObj().advancedSettings.validationType;

        var selectedText;

        if (type === "AdvancedType") {

            table.setAttribute("data-for", "popSelect" + type);

            if (validate && val_type) {
                selectedText = getTextForId(val_type, _select1_id, _select1_text);
            }
            else {
                selectedText = _select1_text[0];
            }
        } else {  // for 2nd select

            if (validate && val_type) {

                var val_2nd_select;

                if (val_type === "text") {
                    table.setAttribute("data-for", "popSelectAdvancedText");

                    val_2nd_select = _dataObject.getDataItemObj().advancedSettings.textValidation.type;

                    if (val_2nd_select) {
                        selectedText = getTextForId(val_2nd_select, _select2_id[0], _select2_text[0]);
                    }

                } else if (val_type === "regular_expression") {
                    table.setAttribute("data-for", "popSelectAdvancedRegExp");

                    val_2nd_select = _dataObject.getDataItemObj().advancedSettings.regExpValidation.type;

                    if (val_2nd_select) {
                        selectedText = getTextForId(val_2nd_select, _select2_id[1], _select2_text[1]);
                    }
                } else {
                    //greater than
                    selectedText = _select2_text[0][0];
                }
            }
            else {
                //greater than
                table.setAttribute("data-for", "popSelectAdvancedText");
                selectedText = _select2_text[0][0];
            }
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

        var select_PopUp;

        // 1st select
        if (type === "AdvancedType") {

            select_PopUp = createSelectPopUp(type, _select1_id, _select1_text);
            divFieldSelect.appendChild(select_PopUp);

        } else {  // 2nd select

            var select_PopUp_text = createSelectPopUp("AdvancedText", _select2_id[0], _select2_text[0]);
            var select_PopUp_regExp = createSelectPopUp("AdvancedRegExp", _select2_id[1], _select2_text[1]);

            divFieldSelect.appendChild(select_PopUp_text);
            divFieldSelect.appendChild(select_PopUp_regExp);
        }
 
        return divFieldSelect;
    }


    function createInputFieldsForText(val_type, text_type_id, charCount, validate) {

        var div = document.createElement("DIV");
        div.setAttribute("id", "divTextType");

        if ( validate && (val_type === "regular_expression"))
            div.style.display = "none";

        var input_1 = document.createElement("INPUT");
        input_1.setAttribute("id", "inputCharCount");
        input_1.setAttribute("type", "text");
        input_1.setAttribute("class", "inputShort");
        input_1.setAttribute("placeholder", _text["placeholderNumber"]);
        input_1.addEventListener("keyup", text_key_pressed, false);
        input_1.addEventListener("blur", text_input_blur, false);

        if (validate && (val_type === "text")) {

            var desc_text = _text["startOfValidationSummary"] + " " +
                getTextForId(text_type_id, _select2_id[0], _select2_text_summary[0]);

            desc_text = desc_text + " " + charCount + " " + _text["charactersWord"];

            _fieldBase.setAdvancedSettingsDescriptionText(desc_text);

            input_1.value = charCount;

        } else if (!validate) {

            input_1.disabled = true;
        }

        div.appendChild(input_1);

        return div;

    }

    function createInputFieldsForRegExp(val_type, reg_exp_type_id, pattern, validate) {

        var div = document.createElement("DIV");
        div.setAttribute("id", "divRegExpType");
        if ( !validate || (val_type !== "regular_expression"))
            div.style.display = "none";

        var input_1 = document.createElement("INPUT");
        input_1.setAttribute("id", "inputRegExp");
        input_1.setAttribute("class", "inputShort");
        input_1.setAttribute("type", "text");
        input_1.setAttribute("placeholder", _text["placeholderRegExp"]);
        input_1.addEventListener("keyup", reg_exp_key_pressed, false);

        if (validate && (val_type === "regular_expression")) {

            var desc_text = _text["startOfValidationSummary"] + " " +
                getTextForId(reg_exp_type_id, _select2_id[1], _select2_text_summary[1]);

            desc_text = desc_text + " " + pattern;

            _fieldBase.setAdvancedSettingsDescriptionText(desc_text);

            input_1.value = pattern;
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

        var _data = dataObj.getDataItemObj();

        _fieldBase.unsetActiveSelectField();

        if (_data.advancedSettings.dataValidation === false) {

            _dataObject.setDataValidation(true);
            _dataObject.setValidationType(_select1_id[0]); //set default value
            document.getElementById("selectFieldTextSelect1").innerHTML = _select1_text[0];

            _dataObject.setTextValidationType(_select2_id[0][0]);
            //clear previous 
            _dataObject.setRegExpValidationType("", _fieldBase.saveDataItem);
            document.getElementById("selectFieldTextSelect2").innerHTML = _select2_text[0][0];
            document.getElementById("popSelectFieldSelect2").setAttribute("data-for", "popSelectAdvancedText");

            document.getElementById("divTextType").style.display = "inline"
            document.getElementById("inputCharCount").style.display = "inline";

            document.getElementById("popSelectFieldSelect1").addEventListener("click", selectClick, false);
            document.getElementById("popSelectFieldSelect2").addEventListener("click", selectClick, false);

            document.getElementById("popSelectFieldSelect1").setAttribute("class", "popSelectField");
            document.getElementById("popSelectFieldSelect2").setAttribute("class", "popSelectField");

            document.getElementById("selectFieldTextSelect1").setAttribute("class", "selectFieldText");
            document.getElementById("selectFieldTextSelect2").setAttribute("class", "selectFieldText");

            document.getElementById("inputCharCount").disabled = false;
            document.getElementById("inputErrorText").disabled = false;

            var desc_text = _text["startOfValidationSummary"] + " "
                         + getTextForId(_select2_id[0][0], _select2_id[0], _select2_text_summary[0]);

            desc_text = desc_text + " " + _text["charactersWord"];

            _fieldBase.setAdvancedSettingsDescriptionText(desc_text);
                 
        }
        else {
            _dataObject.setDataValidation(false);
            _dataObject.setValidationType("");

            _dataObject.setTextValidationType("");
            _dataObject.setTextValidationCharCount("");

            _dataObject.setRegExpValidationType("");
            _dataObject.setRegExpValidationPattern("");

            _dataObject.setErrorText("", _fieldBase.saveDataItem);

            document.getElementById("divTextType").style.display = "inline";
            document.getElementById("divRegExpType").style.display = "none";

            $('#inputCharCount').val("");
            $('#inputRegExp').val("");
            $('#inputErrorText').val("");

            document.getElementById("popSelectFieldSelect1").removeEventListener("click", selectClick, false);
            document.getElementById("popSelectFieldSelect2").removeEventListener("click", selectClick, false);

            document.getElementById("popSelectFieldSelect1").setAttribute("class", "popSelectFieldDisabled");
            document.getElementById("popSelectFieldSelect2").setAttribute("class", "popSelectFieldDisabled");
            
            document.getElementById("selectFieldTextSelect1").setAttribute("class", "selectFieldTextDisabled");
            document.getElementById("selectFieldTextSelect2").setAttribute("class", "selectFieldTextDisabled");

            document.getElementById("inputCharCount").disabled = true;
            document.getElementById("inputErrorText").disabled = true;

            document.getElementById("selectFieldTextSelect1").innerHTML = _select1_text[0];

            document.getElementById("selectFieldTextSelect2").innerHTML = _select2_text[0][0];

            _fieldBase.setAdvancedSettingsDescriptionText("");

            if (document.getElementById("advErrorRow").style.display == "inline") {
                document.getElementById("advErrorRow").style.display = "none";
                document.getElementById("inputCharCount").setAttribute("class", "inputShort");
            }
        }
    }

    function popUpSelect() {

        var parentId = this.parentNode.id;
        var dataNro = this.getAttribute("data-nro");

        dataNro = parseInt(dataNro) - 1;

        if (parentId === "popSelectAdvancedType") {
            _dataObject.setValidationType(_select1_id[dataNro]);
            document.getElementById("selectFieldTextSelect1").innerHTML = _select1_text[dataNro];

            _fieldBase.setActiveSelectField("popSelectFieldSelect1");

            //check switch in type
            if (_prev_type !== _select1_id[dataNro]) {

                if (document.getElementById("advErrorRow").style.display == "inline") {
                    document.getElementById("advErrorRow").style.display = "none";
                    document.getElementById("inputCharCount").setAttribute("class", "inputShort");
                }

                if (_select1_id[dataNro] === "number") {

                    document.getElementById("selectFieldTextSelect2").innerHTML = _select2_text[0][0];
                    document.getElementById("popSelectFieldSelect2").setAttribute("data-for", "popSelectAdvancedNumber");

                    document.getElementById("divNumberType").style.display = "inline";
                    document.getElementById("divTextType").style.display = "none";
                    document.getElementById("divRegExpType").style.display = "none";

                    document.getElementById("inputNumber1").style.display = "inline";
                    document.getElementById("labelNumber").style.display = "none";
                    document.getElementById("inputNumber2").style.display = "none";

                    document.getElementById("inputNumber1").value = "";
                    document.getElementById("inputNumber2").value = "";

                    _dataObject.setNumberValidationType(_select2_id[0][0]);
                    //clear previous 
                    _dataObject.setTextValidationType("");
                    _dataObject.setTextValidationText("");
                    _dataObject.setRegExpValidationType("");
                    _dataObject.setRegExpValidationPattern("", _fieldBase.saveDataItem);

                    var desc_text = _text["startOfValidationSummary"] + " "
                            + getTextForId(_select2_id[0][0], _select2_id[0], _select2_text_summary[0]);

                    _fieldBase.setAdvancedSettingsDescriptionText(desc_text);

                    setErrorMsgPos();
                }
                else if (_select1_id[dataNro] === "text") {

                    document.getElementById("selectFieldTextSelect2").innerHTML = _select2_text[0][0];
                    document.getElementById("popSelectFieldSelect2").setAttribute("data-for", "popSelectAdvancedText");

                    document.getElementById("divTextType").style.display = "inline";
                    document.getElementById("divRegExpType").style.display = "none";

                    document.getElementById("inputCharCount").style.display = "inline";

                    _dataObject.setTextValidationType(_select2_id[0][0]);
                    //clear previous 
                    _dataObject.setRegExpValidationType("");
                    _dataObject.setRegExpValidationPattern("", _fieldBase.saveDataItem);

                    document.getElementById("inputCharCount").value = "";

                    var desc_text = _text["startOfValidationSummary"] + " "
                       + getTextForId(_select2_id[0][0], _select2_id[0], _select2_text_summary[0]);

                    desc_text = desc_text + " " + _text["charactersWord"] + " " + _text["charactersWord"];

                    _fieldBase.setAdvancedSettingsDescriptionText(desc_text);

                    setErrorMsgPos();

                } else if (_select1_id[dataNro] === "regular_expression") {
            
                    document.getElementById("selectFieldTextSelect2").innerHTML = _select2_text[1][0];
                    document.getElementById("popSelectFieldSelect2").setAttribute("data-for", "popSelectAdvancedRegExp");

                    document.getElementById("divTextType").style.display = "none";
                    document.getElementById("divRegExpType").style.display = "inline";

                    _dataObject.setRegExpValidationType(_select2_id[1][0]);
                    //clear previous 
                    _dataObject.setTextValidationType("");
                    _dataObject.setTextValidationCharCount("", _fieldBase.saveDataItem);

                    document.getElementById("inputRegExp").value = "";

                    var desc_text = _text["startOfValidationSummary"] + " "
                       + getTextForId(_select2_id[1][0], _select2_id[1], _select2_text_summary[1]);

                    _fieldBase.setAdvancedSettingsDescriptionText(desc_text);

                }
            }

            _prev_type = _select1_id[dataNro];

        } else if (parentId === "popSelectAdvancedText") {

            _fieldBase.setActiveSelectField("popSelectFieldSelect2");

            //check if type same as before
            var prev_type_id = _dataObject.getDataItemObj().advancedSettings.textValidation.type;

            if (prev_type_id === _select2_id[0][dataNro]) {
                $("#" + parentId).hide();
                return;
            }

            setErrorMsgPos();

            var type_id = _select2_id[0][dataNro];

            _dataObject.setTextValidationType(_select2_id[0][dataNro], _fieldBase.saveDataItem);
            document.getElementById("selectFieldTextSelect2").innerHTML = _select2_text[0][dataNro];

            document.getElementById("inputCharCount").style.display = "inline";

            var desc_text = _text["startOfValidationSummary"] + " "
                     + getTextForId(type_id, _select2_id[0], _select2_text_summary[0]);

            var charCount = _dataObject.getDataItemObj().advancedSettings.textValidation.charCount;

            if (charCount === undefined)
                charCount = "";

            desc_text = desc_text + " " + charCount + " " + _text["charactersWord"];

            _fieldBase.setAdvancedSettingsDescriptionText(desc_text);


        } else if (parentId === "popSelectAdvancedRegExp") {

            _fieldBase.setActiveSelectField("popSelectFieldSelect2");

            //check if type same as before
            var prev_type_id = _dataObject.getDataItemObj().advancedSettings.regExpValidation.type;

            if (prev_type_id === _select2_id[1][dataNro]) {
                $("#" + parentId).hide();
                return;
            }

            var type_id = _select2_id[1][dataNro];

            _dataObject.setRegExpValidationType(type_id, _fieldBase.saveDataItem);
            document.getElementById("selectFieldTextSelect2").innerHTML = _select2_text[1][dataNro];

            var desc_text = _text["startOfValidationSummary"] + " "
                  + getTextForId(type_id, _select2_id[1], _select2_text_summary[1]);

            var regExp = document.getElementById("inputRegExp").value;

            desc_text = desc_text + " " + regExp;

            _fieldBase.setAdvancedSettingsDescriptionText(desc_text);

        }      

        $("#" + parentId).hide();
     
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

        if (popSelect_Id === "#popSelectAdvancedType") {

            var val_type = _dataObject.getDataItemObj().advancedSettings.validationType;

            if (val_type) {
                selectNro = getSelectedPopUpNro(val_type, _select1_id);
            }

        } if (popSelect_Id === "#popSelectAdvancedText") {

            var type = _dataObject.getDataItemObj().advancedSettings.textValidation.type;

            if (type) {
                selectNro = getSelectedPopUpNro(type, _select2_id[0]);
            }

        } else if (popSelect_Id === "#popSelectAdvancedRegExp") {

            var type = _dataObject.getDataItemObj().advancedSettings.regExpValidation.type;

            if (type) {
                selectNro = getSelectedPopUpNro(type, _select2_id[1]);
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

        var text_type_id = _dataObject.getDataItemObj().advancedSettings.textValidation.type;

        var desc_text = _text["startOfValidationSummary"] + " "
                + getTextForId(text_type_id, _select2_id[0], _select2_text_summary[0]);
     
        var input1Val = _fieldBase.replaceCommaAndRemoveWhitespace(this.value);

        var isInput1Int = _fieldBase.is_integer(input1Val);

        //if input is not integer 
        if (!isInput1Int) {

            desc_text = desc_text + " " + _text["charactersWord"];

            _dataObject.setTextValidationCharCount("", _fieldBase.saveDataItem);

        } else {
            _dataObject.setTextValidationCharCount(parseInt(input1Val), _fieldBase.saveDataItem);
            desc_text = desc_text + " " + input1Val + " " + _text["charactersWord"];
        }

        _fieldBase.setAdvancedSettingsDescriptionText(desc_text);

    }

    function text_input_blur() {

        var input1Val = _fieldBase.replaceCommaAndRemoveWhitespace(document.getElementById("inputCharCount").value);

        var isInput1Int = _fieldBase.is_integer(input1Val);

        var input1Length = input1Val.length;

        var input1Empty = (input1Length == 0) ? true : false;

        if (!isInput1Int && !input1Empty) {

            setErrorMsgPos();

            document.getElementById("advErrorRow").style.display = "inline";
   
            document.getElementById("inputCharCount").setAttribute("class", "inputShort inputError");

        } else if (isInput1Int || input1Empty) {

            document.getElementById("inputCharCount").setAttribute("class", "inputShort");

            //just in case if contains whitespace
            if ((input1Empty) && (document.getElementById("inputCharCount").value.length > 0))
                document.getElementById("inputCharCount").value = "";

            document.getElementById("advErrorRow").style.display = "none";

        }
    }

    function reg_exp_key_pressed() {

        var reg_exp_type_id = _dataObject.getDataItemObj().advancedSettings.regExpValidation.type;

        var desc_text = _text["startOfValidationSummary"] + " " +
          getTextForId(reg_exp_type_id, _select2_id[1], _select2_text_summary[1]);

        desc_text = desc_text + " " + this.value;

        _fieldBase.setAdvancedSettingsDescriptionText(desc_text);

        _dataObject.setRegExpValidationPattern(this.value, _fieldBase.saveDataItem);
 
    }

    function error_key_pressed() {

        _dataObject.setErrorText(this.value, _fieldBase.saveDataItem);
    }

}