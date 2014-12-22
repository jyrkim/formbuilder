
/*
append Multiple Choice (RadioButtons/CheckBox/List) field for development

text = array for options/list value texts
style  -> default, Bootstrap, Google
          if style == "", then default style is applied
elementIdToAppendTo ->  #dev-td, which is a TABLE td element
parentElementIdToAddCSSClass ->  #dev-row, which is a TABLE row element
*/

function MultiChoiceField(type, dataObj) {

    var _fieldBase = new FieldBase();

    var _dataObject = dataObj;
    var _data = dataObj.getDataItemObj();

    // var _text = text;
    var _type = type;

    var _advField = new MultiChoiceFieldAdvanced(_type, _dataObject);
    var _style = _fieldBase._style;

    // two places used _elementToAppendTo , check if changes
    var _elementToAppendTo = _fieldBase._elementToAppendTo;
    var _parentElementToAddCSSClass = _fieldBase._parentElementToAddCSSClass;
    var _formBuilderIdentifier = _fieldBase._formBuilderIdentifier;
    var _advSettingsContentId = _fieldBase._advSettingsContentId;
    var _advSettingsSummaryId = _fieldBase._advSettingsSummaryId;

    var _otherOption = "false";

    var _data;
    var _dataObject;

    var _optionText = "Option";
    var _addRowText = "Click to add option";
    var _orText = "or";
    var _addOtherText = 'Add "Other"';
    var _otherText = "Other: ";
    var _otherTextForAnswer = "Their answer";

    this.renderDevelopmentView = renderDevelopmentView;
    this.multiChoiceSwitchTo = multiChoiceSwitchTo;
    this.renderCompletedView = renderCompletedView;
    this.getCompletedView = getCompletedView;
    this.getBootstrapView = getBootstrapView;

    this.checkOtherFieldSettings = checkOtherFieldSettings

    /* append TextField for development */
    function renderDevelopmentView() {

        $(_parentElementToAddCSSClass).removeClass(); //note removes class toggle too

        var div = document.createElement("DIV");

        var table = document.createElement("TABLE");

        table.setAttribute("id", "multiChoiceTable");

        var rowCount = 3;
        var data = _data;
  
        var rowCount
        
        if (!(data.optionsText === undefined)) {
            //add 2 for rowCount, for add new row and for other option row 
            rowCount = data.optionsText.length + 2;
        } 

        for (rowNro = 1; rowNro <= rowCount; rowNro++) {

            var row;

            var optionText;

            if (rowNro <= data.optionsText.length) {
                if (data.optionsText[rowNro - 1]) {

                    var objectKey = "option-" + rowNro;
                    optionText = data.optionsText[rowNro - 1][objectKey];
                }
            } 

            //second to last row, add new row 
            if (rowNro == (rowCount - 1 )) {
                row = create_multi_choice_table_row(_addRowText, _type, "true", rowNro, "false");

                row.setAttribute("id", "addMultiChoiceRow");
            } // last row, other option row
            else if (rowNro == rowCount) {
                row = create_multi_choice_table_row(_otherText, _type, "false", rowNro, "true");

                row.setAttribute("id", "otherMultiChoiceRow");
            }
            else { // option row
                row = create_multi_choice_table_row(optionText, _type, "false", rowNro, "false");
                row.setAttribute("class", "optionMultiChoiceRow");
            }

            table.appendChild(row);
        }

        //default style
        if ((_style === undefined) || (_style == "default")) {

            div.setAttribute("class", "dev-div-multipleChoiceField");

            $(_parentElementToAddCSSClass).addClass("dev-row-multipleChoiceField");
        }

        div.appendChild(table);

        document.getElementById(_elementToAppendTo.substr(1)).appendChild(div);
        
        //http://stackoverflow.com/questions/4956039/jquery-sortable-change-event-element-position
        $("#multiChoiceTable").sortable({
            items: "tr[class=optionMultiChoiceRow]" ,
            handle: ".handle",
            stop: updateListAndOptionNro,
            start: function (event, ui) {
                var start_pos = ui.item.index();
                ui.item.data('start_pos', start_pos);
            },
            update: function (event, ui) {
                var start_pos = ui.item.data('start_pos');
                var end_pos = ui.item.index();
                _dataObject.moveOptionText(start_pos, end_pos, _fieldBase.saveDataItem);
            }
        }); 

        $("#multiChoiceTable tr").disableSelection();

        checkOtherFieldSettings();

        document.getElementById(_advSettingsContentId.substr(1)).appendChild(_advField.render());

       // return div;      
    }


    function updateListAndOptionNro() {

        updateIndex();
        updateOptionNro()
    }

    function updateIndex() {

        if (_type == "list") { //list

            $("#multiChoiceTable > tr > td:nth-child(2) label").each(function (index) {

                $(this).html(index + 1 + ".");

            });
        }
    }


    function updateOptionNro() {

        $(".optionMultiChoiceRow").each(function (index) { 

            $(this).attr("data-nro", index + 1);
        });
    }

    function checkOtherFieldSettings() {

        var rowCount = $("#multiChoiceTable > tr").length;

        if (_type == "list") {

            // 4 rows or more 
            if (rowCount >= 4) {

                //sorting visible
                $(".optionMultiChoiceRow > td:nth-child(1) div").visible();

                //show delete row span
                $(".optionMultiChoiceRow > td:nth-child(4) div").visible();

            } // 3 rows
            else {
                //sorting invisible
                $(".optionMultiChoiceRow > td:nth-child(1) div").invisible();

                // first row, don't show delete row span
                $(".optionMultiChoiceRow > td:nth-child(4) div").invisible();
            }

            $("#addMultiChoiceRow > td:nth-child(4) div").invisible();

            $("#otherMultiChoiceRow").hide();

            return;
        }

        if (_otherOption == "false") {

            // 4 rows or more 
            if (rowCount >= 4) {

                //sorting visible
                $(".optionMultiChoiceRow > td:nth-child(1) div").visible();
                // show delete row span
                $(".optionMultiChoiceRow > td:nth-child(4) div").visible();

            } // 3 rows
            else {
                //sorting invisible
                $(".optionMultiChoiceRow > td:nth-child(1) div").invisible();
                // first row, don't show delete row span
                $(".optionMultiChoiceRow > td:nth-child(4) div").invisible();
            }

            $("#addMultiChoiceRow > td:nth-child(4) div").visible();

            $("#otherMultiChoiceRow").hide();
        }
        else { 

            // 4 rows or more 
            if (rowCount >= 4) {

                //sorting visible
                $(".optionMultiChoiceRow > td:nth-child(1) div").visible();

                // show delete row span
                $(".optionMultiChoiceRow > td:nth-child(4) div").visible();

                // hide Add Other text
                $("#addMultiChoiceRow > td:nth-child(4) div").invisible();

                // other row visible
                $("#otherMultiChoiceRow").show();

            } // 3 rows
            else {
                //sorting invisible
                $(".optionMultiChoiceRow > td:nth-child(1) div").invisible();

                // first row, don't show delete row span
                $(".optionMultiChoiceRow > td:nth-child(4) div").invisible();

                // hide Add Other text
                $("#addMultiChoiceRow > td:nth-child(4) div").invisible();

                // other row visible
                $("#otherMultiChoiceRow").show();
            }
        }
    }


    /* append Multiple Choice (radio buttons) field for development
          optionText = array for options/list value texts
          type = radioButton, checkBox, list
          addRow = "true" or "false" (2nd to last row)
          rowNro = used for selectList's label's creation 
          otherRow = "true" or "false" (last row)
        */
    function create_multi_choice_table_row(optionText, type, addRow, rowNro, otherRow) {

        var row = document.createElement("TR");

        var columnCount = 5;

        //array for TD
        var tds = [];

        for (columnNro = 1; columnNro <= columnCount; columnNro++) {

            var td = document.createElement("TD");
            //td for sorting
            if (columnNro == 1) {

                var div = document.createElement("DIV");
                div.setAttribute("class", "td1MultiChoice");

                //option row and hidden input for
                if ((addRow == "false") && (otherRow == "false"))  {

                    var span = document.createElement("SPAN");
                    var classes = _fieldBase._classesForSorting;
                    span.setAttribute("class", classes);
                    row.setAttribute("data-nro", rowNro);

                    div.appendChild(span);
                    td.appendChild(div);


                } else if (addRow == "true") {

                    td.addEventListener("click", multi_choice_add_row_onclick, false);
                }

                tds.push(td);

            }  //td for radio button
            else if (columnNro == 2) {

                var div = document.createElement("DIV");
                div.setAttribute("class", "td2MultiChoice");

                if (type == "radioButton") {

                    var inputRadio = document.createElement("INPUT");
                    inputRadio.setAttribute("type", "radio");

                    inputRadio.addEventListener('click', uncheck, false);

                    div.appendChild(inputRadio);
                    // type
                } else if (type == "checkBox") {

                    var inputCheckBox = document.createElement("INPUT");
                    inputCheckBox.setAttribute("type", "checkbox");
                    inputCheckBox.addEventListener('click', stopDefAction, false);
                    div.appendChild(inputCheckBox);

                } else if (type == "list") {

                    var labelForListItem = document.createElement("LABEL");
                    var textForLabel = document.createTextNode(rowNro + ".");
                    labelForListItem.appendChild(textForLabel);
                    div.appendChild(labelForListItem);
                }

                if (addRow == "true") {

                    td.addEventListener("click", multi_choice_add_row_onclick, false);
                }

                td.appendChild(div);

                tds.push(td);

            }// td for text input
            else if (columnNro == 3) {
                var input2 = document.createElement("INPUT");
                input2.setAttribute("type", "text");

                var textForInput;

                //addRow
                if (addRow == "true") {

                    input2.disabled = true;
                    input2.setAttribute("value", optionText);
                    td.addEventListener("click", multi_choice_add_row_onclick, false);

                    td.appendChild(input2);

                //other row
                }
                else if (otherRow == "true") {

                    var tableInner = document.createElement("table");
                    tableInner.setAttribute("id", "tableMultiChoiceInner");
                    trInner = document.createElement("tr");
                    tdInner1 = document.createElement("td");

                    var label = document.createElement("label");
                    label.innerText = _otherText + " ";
                    label.setAttribute("id", "otherRowLabel");
                    tdInner1.appendChild(label);

                    tdInner2 = document.createElement("td");
                    input2.setAttribute("value", _otherTextForAnswer);
                    input2.disabled = true;
                    tdInner2.appendChild(input2);

                    trInner.appendChild(tdInner1);
                    trInner.appendChild(tdInner2);

                    tableInner.appendChild(trInner);
                    td.appendChild(tableInner);

                } //options row
                else {
                    input2.setAttribute("value", optionText);
                    input2.addEventListener("keyup", option_key_pressed, false);

                    td.appendChild(input2);
                }

                

                tds.push(td);
            }
                //td for delete
            else if (columnNro == 4) {

                var div = document.createElement("DIV");
               

                //isn't addRow
                if (addRow == "false") {
                    //div.setAttribute("class", "td4MultiChoice");

                    div.setAttribute("class", "multiChoiceDelete");
            
                    div.addEventListener("click", multi_choice_delete_row_onclick, false);

                    var text = document.createTextNode("x");

                    div.appendChild(text);
                    td.appendChild(div);

                } // Add Other hyperlink
                else {
                    div.setAttribute("class", "td4MultiChoiceAddOther");

                    var text = document.createTextNode(_orText + " ");
                    div.appendChild(text);

                    var anchor = document.createElement("A");
                    anchor.setAttribute("href", "javascript: void(0)");
                    var textAnchor = document.createTextNode(_addOtherText);
                    anchor.appendChild(textAnchor);
                    anchor.addEventListener("click", add_other_onclick, false);

                    div.appendChild(anchor);
                   td.appendChild(div);
                }

                tds.push(td);

            } // td for another page link
            else if (columnNro == 5) {

                tds.push(td);      
            }

        }
        //add td elements into row
        for (k = 0; k < tds.length; k++) {
            row.appendChild(tds[k]);
        }

        return row;

    }

    function add_other_onclick() {

        _otherOption = "true";

        _dataObject.setUseOther(true, _fieldBase.saveDataItem);

        checkOtherFieldSettings();

        return false;

    }

    function option_key_pressed() {

        var str = this.parentNode.parentNode.getAttribute("data-nro");
        var rowNro = parseInt(str);

        _dataObject.updateOptionText(rowNro, this.value, _fieldBase.saveDataItem);

    }

    function multi_choice_add_row_onclick() {

        var new_row;

        var optionNumber = _data.optionsText.length + 1;

        var optionText = _optionText + " " + optionNumber;

        _dataObject.addOption(optionText, _fieldBase.saveDataItem);

        if (_type == "radioButton") {

            new_row = create_multi_choice_table_row(optionText, "radioButton", "false", optionNumber, "false");

        } else if (_type == "checkBox") {

            new_row = create_multi_choice_table_row(optionText, "checkBox", "false", optionNumber, "false");
        }
        else { //list
            var lastRowNro = parseInt($("#addMultiChoiceRow").find("td:nth-child(2) label").text());

            new_row = create_multi_choice_table_row(optionText, "list", "false", lastRowNro, "false");

            lastRowNro = lastRowNro + 1;

            $("#addMultiChoiceRow").find("td:nth-child(2) label").html(lastRowNro + ".");
        }

        new_row.setAttribute("class", "optionMultiChoiceRow");

        $("#addMultiChoiceRow").before(new_row);

        //update Other field settings
        checkOtherFieldSettings();

        //update option attributes
        updateOptionNro();

        //select text for added row's input field
        $("#multiChoiceTable").find("tr:nth-child(" + optionNumber + ") > td:nth-child(3) > input").select();
        
    }

    function multi_choice_delete_row_onclick() {
       
        if (this.parentNode.parentNode.id == "otherMultiChoiceRow") {
            //hide other option row
            _otherOption = "false";

            _dataObject.setUseOther(false, _fieldBase.saveDataItem);

            //update Other field settings
            checkOtherFieldSettings();

            return;

        } else {

            var str = this.parentNode.parentNode.getAttribute("data-nro");
            var rowNro = parseInt(str);

            _dataObject.removeOptionByUsingOptionNro(rowNro, _fieldBase.saveDataItem)

            //delete Table row
            $("#multiChoiceTable > tr:nth-child(" + rowNro + ") ").remove();

            updateIndex();

            //update Other field settings
            checkOtherFieldSettings();

            //update option attributes
            updateOptionNro();

            if (rowNro > 1)
                rowNro = rowNro - 1;

            //the row that is moved up replacing the deleted row  has text selected 
            $("#multiChoiceTable > tr:nth-child(" + rowNro + ") > td:nth-child(3) > input").select();

        }

    }
    /* 
        switch to a different type MultiChoice field 
        for example from radioButton to list
        or from checkBox to radioButton
        type = radioButton, checkBox, list
    */
    function multiChoiceSwitchTo(type, dataObj) {

        _type = type;
        _dataObject = dataObj;
        _data = dataObj.getDataItemObj(); 

        if (type == "radioButton") {

            $("#multiChoiceTable > tr > td:nth-child(2)").each(function (index, td) {

                var div = document.createElement("DIV");
                div.setAttribute("class", "td2MultiChoice");

                var inputRadio = document.createElement("INPUT");
                inputRadio.setAttribute("type", "radio");
                inputRadio.addEventListener('click', stopDefAction, false);
                div.appendChild(inputRadio);
                td.innerHTML = "";
                td.appendChild(div);

            });

            document.getElementById(_advSettingsSummaryId).innerHTML = "";

            _advField.multiChoiceSwitchTo("radioButton", dataObj);

        } else if (type == "checkBox") {

            $("#multiChoiceTable > tr > td:nth-child(2)").each(function (index, td) {

                var div = document.createElement("DIV");
                div.setAttribute("class", "td2MultiChoice");

                var inputCheckBox = document.createElement("INPUT");
                inputCheckBox.setAttribute("type", "checkbox");
                inputCheckBox.addEventListener('click', stopDefAction, false);
                div.appendChild(inputCheckBox);
                td.innerHTML = "";
                td.appendChild(div);

            });

            document.getElementById(_advSettingsSummaryId).innerHTML = "";

            _advField.multiChoiceSwitchTo("checkBox", dataObj);

        } else if (type == "list") {

            $("#multiChoiceTable > tr > td:nth-child(2)").each(function (index, td) {

                var div = document.createElement("DIV");
                div.setAttribute("class", "td2MultiChoice");

                var labelForListItem = document.createElement("LABEL");
                var textForLabel = document.createTextNode(index + 1 + ".");
                labelForListItem.appendChild(textForLabel);
                div.appendChild(labelForListItem);
                td.innerHTML = "";
                td.appendChild(div);

            });

            document.getElementById(_advSettingsSummaryId).innerHTML = "";

            _advField.multiChoiceSwitchTo("list", dataObj);

            //other options
            _otherOption = "false";
        }

        //update Other field settings
        checkOtherFieldSettings();
    }

    function renderCompletedView() {

        $(_formBuilderIdentifier).append("<p>" + _type + "</p>");
    }

    function stopDefAction(evt) {
        evt.preventDefault();
    }

    function uncheck(evt) {
        this.checked = false;
    }

    function getCompletedView() {

        _data = _dataObject.getDataItemObj();

        var type = _data.type;

        if ((type == "radioButton") || (type == "checkBox")) {
              
            //var number = Math.floor((Math.random() * 100000) + 1); //todo change to field number
            var table = document.createElement("table");
            table.setAttribute("class", "c-view-multi-table");

            for (rowNro = 1; rowNro <= _data.optionsText.length; rowNro++) {

                var tr = document.createElement("tr");
                tr.setAttribute("class", "c-view-multi-tr");

                var td_2 = document.createElement("td");

                var inputRadio = document.createElement("INPUT");
                inputRadio.setAttribute("type", (type == "radioButton") ? "radio" : "checkbox");
                inputRadio.addEventListener('click', stopDefAction, false);

                td_2.appendChild(inputRadio);

                var td_3  = document.createElement("td");

                var div = document.createElement("div");

                var objectKey = "option-" + rowNro;
                var optionText = _data.optionsText[rowNro - 1][objectKey];
                div.innerText = optionText;

                td_3.appendChild(div);

                tr.appendChild(td_2);

                tr.appendChild(td_3);

                table.appendChild(tr);
            }

            if (_data.useOther === true) {

                var tr = document.createElement("tr");
                tr.setAttribute("class", "c-view-multi-tr");

                //var td_1 = document.createElement("td");

                var td_2 = document.createElement("td");

                var inputRadio = document.createElement("INPUT");
                inputRadio.setAttribute("type", (type == "radioButton") ? "radio" : "checkbox");
                inputRadio.addEventListener('click', stopDefAction, false);

                td_2.appendChild(inputRadio);

                var td_3 = document.createElement("td");

                var div = document.createElement("div");

                div.innerText = _otherText;

                var input = document.createElement("input");
                input.setAttribute("type", "text");
                input.disabled = true;

                div.appendChild(input);

                td_3.appendChild(div);

                //tr.appendChild(td_1);

                tr.appendChild(td_2);

                tr.appendChild(td_3);

                table.appendChild(tr);
            }


            var div = _fieldBase.addGeneralFieldsToCompletedView(type, table, _dataObject);

            return div;

        } else if (type == "list") {

            var select = document.createElement("select");
            select.setAttribute("class", "c-view-multi-select");

            //empty option
            var emptyOption = document.createElement("option");
            emptyOption.setAttribute("class", "c-view-multi-option");
            select.addEventListener("mousedown", stopDefAction, false);
            select.appendChild(emptyOption);
          
            for (rowNro = 1; rowNro <= _data.optionsText.length; rowNro++) {

                var option = document.createElement("option");
                option.setAttribute("class", "c-view-multi-option");

                var objectKey = "option-" + rowNro;
                var optionText = _data.optionsText[rowNro - 1][objectKey];

                option.value = objectKey;

                option.innerHTML = optionText;

                select.appendChild(option);
            }

            var div = _fieldBase.addGeneralFieldsToCompletedView(type, select, _dataObject);

            return div;

        }
    }


    function getBootstrapView(orderNro) {

        _data = _dataObject.getDataItemObj();

        var type = _data.type;

        if ((type == "radioButton") || (type == "checkBox")) {


            var divContainer = document.createElement("div");

            //var number = Math.floor((Math.random() * 100000) + 1); //todo change to field number

            for (rowNro = 1; rowNro <= _data.optionsText.length; rowNro++) {

                var div = document.createElement("div");
                div.setAttribute("class", (type == "radioButton") ? "radio" : "checkbox");

                var label = document.createElement("label");

                var input = document.createElement("INPUT");
                input.setAttribute("type", (type == "radioButton") ? "radio" : "checkbox");
                input.setAttribute("name", "group_" + orderNro);
                //input.addEventListener('click', stopDefAction, false);

                label.appendChild(input);

                var objectKey = "option-" + rowNro;
                var optionText = _data.optionsText[rowNro - 1][objectKey];

                label.appendChild(document.createTextNode(optionText));

                div.appendChild(label);

                divContainer.appendChild(div);
            }
            //http://stackoverflow.com/questions/10951340/create-a-blank-html-space-on-the-fly-javascript
            if (_data.useOther === true) {
      
                var div = document.createElement("div");
                div.setAttribute("class", (type == "radioButton") ? "radio" : "checkbox");

                var label = document.createElement("label");

                //table for other
                var table = document.createElement("tr");
                var tr = document.createElement("tr");
                var td_1 = document.createElement("td");

                var input = document.createElement("INPUT");
                input.setAttribute("type", (type == "radioButton") ? "radio" : "checkbox");
                input.setAttribute("name", "group_" + orderNro);
                //input.addEventListener('click', stopDefAction, false);

                //label.appendChild(input);

                var divTxt = document.createElement("div");

                divTxt.innerText = _otherText;

                td_1.appendChild(input);

                td_1.appendChild(divTxt);

                //label.appendChild(divTxt);

                var td_2 = document.createElement("td");

                var inputOther = document.createElement("input");
                inputOther.setAttribute("type", "text");
                inputOther.disabled = true;

                td_2.appendChild(inputOther);

                tr.appendChild(td_1);

                tr.appendChild(td_2);

                table.appendChild(tr);

                label.appendChild(table);

                div.appendChild(label);

                divContainer.appendChild(div);
            }

            var div = _fieldBase.addGeneralFieldsToBootstrapForm(type, divContainer, _dataObject);

            return div;

        } else if (type == "list") {

            var select = document.createElement("select");
            select.setAttribute("class", "form-control");

            //empty option
            var emptyOption = document.createElement("option");
            //emptyOption.setAttribute("class", "c-view-multi-option");
            //select.addEventListener("mousedown", stopDefAction, false);
            select.appendChild(emptyOption);

            var optionTextCount = 0;

            for (rowNro = 1; rowNro <= _data.optionsText.length; rowNro++) {

                var option = document.createElement("option");
                //option.setAttribute("class", "c-view-multi-option");

                var objectKey = "option-" + rowNro;
                var optionText = _data.optionsText[rowNro - 1][objectKey];

                option.value = objectKey;

                option.innerHTML = optionText;

                select.appendChild(option);

                if (optionText.length > optionTextCount)
                    optionTextCount = optionText.length;
            }

            console.log("optionTextCount " + optionTextCount);

            if (optionTextCount > 10) {
                var width = optionTextCount * 9;

                if (width > 350)
                    width = 350;

                select.style.width = width + "px";

            } else {
                select.style.width = "105px";
            }



            var div = _fieldBase.addGeneralFieldsToBootstrapForm(type, select, _dataObject);

            return div;

        }
    }

    
}
