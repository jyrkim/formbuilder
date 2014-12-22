
/*
style  -> default, Bootstrap, Google
          if style == "", then default style is applied
elementIdToAppendTo ->  #dev-td, which is a TABLE td element
parentElementIdToAddCSSClass ->  #dev-row, which is a TABLE row element
*/

function ParagraphField(dataObj) {

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

    var _advField = new ParagraphFieldAdvanced(_dataObject);

    var _text = {};

    _text["paragraphContentText"] = "Their longer answer";

    /* append TextField for development */
    function renderDevelopmentView(dataObj) {

        //$(_parentElementToAddCSSClass).removeClass(); //note removes class toggle too

        var div = document.createElement("DIV");

        var span = document.createElement("div");

        var br1 = document.createElement("BR");
        var br2 = document.createElement("BR");
        var br3 = document.createElement("BR");

        var t2 = document.createTextNode(_text["paragraphContentText"]);

        //default style
        if ((_style === undefined) || (_style == "default")) {

            div.setAttribute("class", "dev-div-paragField");

            span.setAttribute("class", "dev-span-paragField");

            $(_parentElementToAddCSSClass).addClass("dev-row-paragField");
        }

        span.appendChild(t2);

        div.appendChild(span);

        document.getElementById(_elementToAppendTo.substr(1)).appendChild(div);

        document.getElementById(_advSettingsContentId.substr(1)).appendChild(_advField.render());
    }


    function renderCompletedView() {

        $(_formBuilderIdentifier).append("<p>ParagraphField</p>");
    }

    function getCompletedView() {

        var txtArea = document.createElement("div");
        txtArea.setAttribute("class", "c-view-input-parag");
        //txtArea.setAttribute("rows", "5");
        //txtArea.setAttribute("cols", "5");

        var div = _fieldBase.addGeneralFieldsToCompletedView("paragraphField", txtArea, _dataObject);

        return div;


    }

    function getBootstrapView(orderNro) {

        var data = _dataObject.getDataItemObj();

        var txtArea = document.createElement("textarea");
        txtArea.setAttribute("class", "form-control");
        txtArea.setAttribute("rows", "3");
        //if (data.title.length > 0)
          //  txtArea.setAttribute("placeholder", data.title);

        var div = _fieldBase.addGeneralFieldsToBootstrapForm("paragraphField", txtArea, _dataObject, orderNro);

        return div;
    }

    function getFormView() {

        var txtArea = document.createElement("textarea");
        txtArea.setAttribute("class", "f-view-input-parag");
        txtArea.setAttribute("rows", "5");
        txtArea.setAttribute("cols", "5");
        var div = _fieldBase.addGeneralFieldsToCompletedView("paragraphField", txtArea, _dataObject);

        return div;
    }
}