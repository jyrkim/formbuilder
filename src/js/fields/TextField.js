

function TextField(dataObj) {

    var _fieldBase = new FieldBase();

    var _dataObject = dataObj;
    var _data = dataObj.getDataItemObj();

    var _style = _fieldBase._style;

    // two places used _elementToAppendTo , check if changes
    var _elementToAppendTo = _fieldBase._elementToAppendTo;
    var _parentElementToAddCSSClass = _fieldBase._parentElementToAddCSSClass;
    var _formBuilderIdentifier = _fieldBase._formBuilderIdentifier;
    var _advSettingsContentId = _fieldBase._advSettingsContentId;
    var _advSettingsSummaryId = _fieldBase._advSettingsSummaryId;

    var _data;
    var _dataObject;

    this.renderDevelopmentView = renderDevelopmentView;
    this.renderCompletedView = renderCompletedView;
    this.getBootstrapView = getBootstrapView;
    this.getCompletedView = getCompletedView;

    var _advField = new TextFieldAdvanced(_dataObject);

    var _text = {};

    _text["textContentText"] = "Their answer";

    /* append TextField for development */
    function renderDevelopmentView() {

        $(_parentElementToAddCSSClass).removeClass(); //note removes class toggle too

        var div = document.createElement("DIV");

        var span = document.createElement("DIV");

        var t = document.createTextNode(_text["textContentText"]);

        //default style
        if ((_style === undefined) || (_style == "default")) {

            div.setAttribute("class", "dev-div-textField");

            span.setAttribute("class", "dev-span-textField");

            $(_parentElementToAddCSSClass).addClass("dev-row-textField");
        }
        
        span.appendChild(t);

        div.appendChild(span);

        document.getElementById(_elementToAppendTo.substr(1)).appendChild(div);

        document.getElementById(_advSettingsContentId.substr(1)).appendChild(_advField.render());

    }

    function renderCompletedView() {
    

        $(_formBuilderIdentifier).append("<p>TextField</p>");
    }

    function getCompletedView() {

        var input = document.createElement("div");
        input.setAttribute("class", "c-view-input-txt");

        var div = _fieldBase.addGeneralFieldsToCompletedView("textField", input, _dataObject);

        return div;
    }

    function getBootstrapView(orderNro) {

        var data = _dataObject.getDataItemObj();

        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "form-control");
        if (data.title.length > 0)
            input.setAttribute("placeholder", data.title);

        var div = _fieldBase.addGeneralFieldsToBootstrapForm("textField", input, _dataObject, orderNro);

        return div;
    }


    function getFormView() {

        var input = document.createElement("input");
        input.setAttribute("class", "f-view-input-txt");

        var div = _fieldBase.addGeneralFieldsToCompletedView("textField", input, _dataObject);

        return div;
    }

    function stopDefAction(evt) {
        evt.preventDefault();
    }
}