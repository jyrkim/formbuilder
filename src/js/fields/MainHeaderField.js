
/*

Represents header, helpText, tooltip and label fields on the Web page

*/

function MainHeaderField(dataObj) {

    var _fieldBase = new FieldBase();

    var _dataObject = dataObj;
    var _data = dataObj.getDataItemObj();

    var _data;
    var _dataObject;

    var _text = {};

    //_text["defaultHeaderText"] = "First form";

    _text["placeholderForDescription"] = "Form Description";

    _text["placeholderForMainHeaderText"] = "Untitled form";


    this.renderDevelopmentView = renderDevelopmentView;
    this.getBootstrapView = getBootstrapView;
    //this.getCompletedView = getCompletedView;

    function renderDevelopmentView() {

        var divContainer = document.createElement("div");
        divContainer.setAttribute("class", "mainHeader");

        var div1 = document.createElement("div");

        div1.setAttribute("class", "mainHeaderTitle");

        var inputHeader = document.createElement("input");
        inputHeader.setAttribute("type", "text");
        inputHeader.addEventListener("keyup", header_key_pressed, false);

        var headerText = _dataObject.getDataItemObj().headerText;

        if (headerText.length > 0)
            inputHeader.value = headerText;
        else
            inputHeader.value = _text["placeholderForMainHeaderText"];

        div1.appendChild(inputHeader);

        var div2 = document.createElement("div");

        div2.setAttribute("class", "mainHeaderDescription");

        var textArea = document.createElement("textarea");
        textArea.setAttribute("placeholder", _text["placeholderForDescription"]);
        textArea.addEventListener("keyup", description_key_pressed, false);

        var descriptionText = _dataObject.getDataItemObj().descriptionText;

        if (descriptionText.length > 0 )
            textArea.appendChild(document.createTextNode(descriptionText));

        div2.appendChild(textArea);

        divContainer.appendChild(div1);

        divContainer.appendChild(div2);
       
        return divContainer;
    }

    function header_key_pressed() {

        _dataObject.setHeaderText(this.value, _fieldBase.saveMainHeaderDataItem);
    }

    function description_key_pressed() {

        _dataObject.setDescriptionText(this.value, _fieldBase.saveMainHeaderDataItem);
    }

    function getBootstrapView(orderNro) {

        var data = _dataObject.getDataItemObj();

        var header = document.createElement("H2");

        var br = document.createElement("br");
        header.appendChild(br);

        if (data.headerText.length > 0)
            header.appendChild(document.createTextNode(data.headerText));
        else {
            header.appendChild(document.createTextNode(_text["placeholderForMainHeaderText"]));
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