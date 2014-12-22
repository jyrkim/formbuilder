
/*

Represents header, helpText, tooltip and label fields on the Web page

*/

function SectionHeaderField(dataObj) {

    var _fieldBase = new FieldBase();

    var _dataObject = dataObj;
    var _data = dataObj.getDataItemObj();

    var _data;
    var _dataObject;

    var _text = {};

    _text["labelHeaderText"] = "Header text";
    _text["placeholderForHeaderText"] = "Untitled Section";

    _text["labelTextForDescription"] = "Description";
    _text["labelTextForOptional"] = "(optional)";

    _text["textForDoneButton"] = "Done";

    this.renderDevelopmentView = renderDevelopmentView;
    this.getCompletedView = getCompletedView;
    this.getBootstrapView = getBootstrapView;

    function renderDevelopmentView() {

        var table = document.createElement("TABLE");

        table.setAttribute("class", "sectionHeaderTable");

        var row_0 = document.createElement("TR");

        var td_1 = document.createElement("TD");

        td_1.colSpan = "2"

        row_0.appendChild(td_1);

        var td_2 = document.createElement("TD");

        td_2.rowSpan = "3";

        var ef = new EditForm("activeHeader");

        td_2.appendChild(ef.render());

        row_0.appendChild(td_2);

        table.appendChild(row_0);

        var headerText = _dataObject.getDataItemObj().headerText;


        //row 1, header text
        var row_1 = createTableRowForHeaderText(_text["labelHeaderText"], "inputHeaderText", headerText, _text["placeholderForHeaderText"]);
        row_1.setAttribute("class", "sectionHeaderTableRow");

        table.appendChild(row_1);

        var descriptionText = _dataObject.getDataItemObj().descriptionText;


        //row 2, description
        var row_2 = createTableRowForDescriptionText(_text["labelTextForDescription"], "inputDescriptionText", descriptionText);
        row_2.setAttribute("class", "sectionHeaderTableRow");

        table.appendChild(row_2);

        var row_3 = createDoneButtonTableRow();
        row_3.setAttribute("class", "sectionHeaderTableRow");

        table.appendChild(row_3);

        return table;
    }

    function createTableRowForHeaderText(labelText, inputId, inputText, placeholder) {

        var row = document.createElement("TR");

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

    function createTableRowForDescriptionText(labelText, inputId, textAreaText) {

        var row = document.createElement("TR");

        var td_1 = document.createElement("TD");

        var label = document.createElement("label");

        label.style.display = "block";

        var text = document.createTextNode(labelText);

        var label2 = document.createElement("label");

        var text2 = document.createTextNode(_text["labelTextForOptional"]);

        label.appendChild(text);

        td_1.appendChild(label);

        label2.appendChild(text2);

        td_1.appendChild(label2);

        row.appendChild(td_1);

        var td_2 = document.createElement("TD");

        var textArea = document.createElement("textarea");
        textArea.setAttribute("id", inputId);
        if (textAreaText)
            textArea.setAttribute("value", textAreaText);
        else
            textArea.setAttribute("value", "");

        textArea.appendChild(document.createTextNode(textAreaText));

        //input.setAttribute("type", "text");

        textArea.addEventListener("keyup", key_pressed, false);

        //input.setAttribute("class", "inputLong");

        td_2.appendChild(textArea);

        row.appendChild(td_2);

        return row;

    }

    function createDoneButtonTableRow() {

        var row = document.createElement("TR");

        row.setAttribute("id", "lastRow");

        //row.setAttribute("class", "toggle");

        var td_1 = document.createElement("TD");

        var button = document.createElement("DIV");
        button.setAttribute("id", "doneButton");

        var text = document.createTextNode(_text["textForDoneButton"]);

        button.appendChild(text);

        td_1.appendChild(button);

        row.appendChild(td_1);

        var td_2 = document.createElement("TD");

     
        row.appendChild(td_2);

        var td_3 = document.createElement("TD");

        row.appendChild(td_3);

        return row;
    }

    function key_pressed() {

        if (this.id === "inputHeaderText") {
            _dataObject.setHeaderText(this.value, _fieldBase.saveDataItem);
            return;
        }
        else if (this.id === "inputDescriptionText") {
            _dataObject.setDescriptionText(this.value, _fieldBase.saveDataItem);
            return;
        }
    }

    function getCompletedView() {

        _data = _dataObject.getDataItemObj();

        var divContainer = document.createElement("DIV");

        divContainer.setAttribute("class", "c-view-sectionHeader-div");

        var ef = new EditForm("inactive");

        divContainer.appendChild(ef.render());

        var h2 = document.createElement("H2");
        h2.setAttribute("class", "c-view-sectionHeader-header");

        var t1;

        if (_data.headerText.length > 0) 
            t1 = document.createTextNode(_data.headerText);
        else 
            t1 = document.createTextNode(_text["placeholderForHeaderText"]);

        h2.appendChild(t1);

        divContainer.appendChild(h2);

        var divDescription = document.createElement("DIV");
        divDescription.setAttribute("class", "c-view-sectionHeader-description");

        var t2 = document.createTextNode(_data.descriptionText);

        divDescription.appendChild(t2);

        divContainer.appendChild(divDescription);

        return divContainer;
    }

    function getBootstrapView(orderNro) {

        var data = _dataObject.getDataItemObj();

        var header = document.createElement("H2");

        if (data.headerText.length > 0)
            header.appendChild(document.createTextNode(data.headerText));
        else {          
            header.appendChild(document.createTextNode(_text["placeholderForHeaderText"]));
        }

        if (data.descriptionText.length > 0) {

            var br = document.createElement("br");
            header.appendChild(br);
            var small = document.createElement("small");
            small.appendChild(document.createTextNode(data.descriptionText));
            header.appendChild(small);
        }

        return header;

       // var div = _fieldBase.addGeneralFieldsToBootstrapForm("sectionHeader", input, _dataObject, orderNro);

        //return div;
    }


}