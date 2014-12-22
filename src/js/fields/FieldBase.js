/* base class for Field classes
   it is used as general utility class for receving callbacks for saving data */
function FieldBase() {

    var _text = {};

    _text["untitledQuestionText"] = "Untitled Question";

    this._style = "default";
    this._elementToAppendTo = "#dev-td";
    this._parentElementToAddCSSClass = "#dev-row";

    this._formBuilderIdentifier = ".formBuilder";

    this._classesForIconGrip = "ui-icon ui-icon-grip-dotted-horizontal";

    this._classesForSorting = "ui-icon ui-icon-arrow-2-n-s handle";

    this._advSettingsSummaryId = "advSettingsSummary";

    this._advSettingsContentId = "#advSettingsContent";

    this._triangleClassEast = "ui-icon ui-icon-triangle-1-e";
    this._triangleClassSouth = "ui-icon ui-icon-triangle-1-s";

    this._triangleClassNorthSouth = "ui-icon ui-icon-triangle-2-n-s";

    this._select_png_src = "img/select_triangle.png";
    this._select2_png_src = "img/select_triangle4.png";

    this._pencil_png_src = "img/pencil.png";
    this._pencil_src = "SVG/pencil.svg";

    this._copy_src = "SVG/copy.svg";
    this._copy_png_src = "img/copy.png";

    this._remove2_src = "SVG/remove2.svg";
    this._remove2_png_src = "img/remove2.png";

    this._calendar_png_src = "img/calendar.png";
    this._calendar_src = "SVG/calendar.svg";

    this._clock_png_src = "img/clock.png";
    this._clock_src = "SVG/clock.svg";

    this._watch_src = "SVG/stopwatch.svg";
    this._watch_png_src = "img/stopwatch.png";

    this._embed_src = "SVG/embed.svg";
    this._embed_png_src = "img/embed.png";

    this._pilcrow_src = "SVG/pilcrow.svg";
    this._pilcrow_png_src = "img/pilcrow.png";

    this._table_src = "SVG/table.svg";
    this._table_png_src = "img/table.png";

    this._table2_src = "SVG/table2.svg";
    this._table2_png_src = "img/table2.png"

    this._radio_checked_src = "SVG/radio-checked.svg";
    this._radio_checked_png_src = "img/radio-checked.png";

    this._checkbox_checked_src = "SVG/checkbox-checked.svg";
    this._checkbox_checked_png_src = "img/checkbox-checked.png";

    this._insert_template_png_src = "img/insert-template.png";
    
    this.saveDataItem = saveDataItem;
    this.saveMainHeaderDataItem = saveMainHeaderDataItem;
    this.getDataItem = getDataItem;
    this.setActiveSelectField = setActiveSelectField;
    this.unsetActiveSelectField = unsetActiveSelectField;
    this.advancedSettingsArrowRight = advancedSettingsArrowRight;

    this.setAdvancedSettingsDescriptionText = setAdvancedSettingsDescriptionText;
    this.getAdvancedSettingsDescriptionText = getAdvancedSettingsDescriptionText
    this.hideAdvancedSettingsDescriptionText = hideAdvancedSettingsDescriptionText;

    this.replaceCommaAndRemoveWhitespace = replaceCommaAndRemoveWhitespace;

    this.is_integer = is_integer;

    this.is_float = is_float;

    this.addGeneralFieldsToCompletedView = addGeneralFieldsToCompletedView;

    this.addGeneralFieldsToBootstrapForm = addGeneralFieldsToBootstrapForm;

    this.saveDataItemsToLocalStorage = saveDataItemsToLocalStorage;

    this.getLocalStorageDataItems = getLocalStorageDataItems;

    this.detectIE = detectIE;

 //   this.addGeneralFieldsToForm = addGeneralFieldsToForm;

    // param data is passed for saving
    function saveDataItem(data) {
        /*
        document.body.dispatchEvent( new CustomEvent( "DataSaved", {
	                        detail: {
	                            message: "Data saved",
	                            time: new Date(),
	                        },
	                        bubbles: true,
	                        cancelable: true
	                    }
                    ));
                    */
        var dataJson = JSON.stringify(data);

        $('.formBuilder[data-state="active"]').attr("data-item", dataJson);

    }

    function saveMainHeaderDataItem(data) {

        var dataJson = JSON.stringify(data);

        $('.formBuilder[data-state="mainHeader"]').attr("data-item", dataJson);

    }


    function getDataItem() {

        var dataJson = $(".formBuilder").attr("data-item");

        var data;

        if (dataJson) {
            data = JSON.parse(dataJson);
        }

        return data;
    }

    function setActiveSelectField(id) {

        if (sessionStorage.activeSelectField) {
            //unset previous active field
            var elem = document.getElementById(sessionStorage.activeSelectField);

            if (elem)
                elem.style.borderColor = "#D0D0D0";
        }

        sessionStorage.activeSelectField = id;
        document.getElementById(id).style.borderColor = "#4d90fe";
       
    }

    function unsetActiveSelectField() {

        if (sessionStorage.activeSelectField) {
            //unset active field
            var element = document.getElementById(sessionStorage.activeSelectField);
            if (element)
                element.style.borderColor = "#D0D0D0";
        } 
    }

    function advancedSettingsArrowDown() {

        var div_triangle_s = document.getElementById("div_triangle_s");
        var div_triangle_e = document.getElementById("div_triangle_e");

        if (div_triangle_s.style.display == "none") {

            div_triangle_s.style.display = "inline";
            div_triangle_e.style.display = "none";
        }
    
    }

    function advancedSettingsArrowRight() {

        var div_triangle_s = document.getElementById("div_triangle_s");
        var div_triangle_e = document.getElementById("div_triangle_e");

        if (div_triangle_e.style.display == "none") {

            div_triangle_e.style.display = "inline";
            div_triangle_s.style.display = "none";
        }
    }


    function hideAdvancedSettingsDescriptionText() {

        document.getElementById("advSettingsSummary").style.display = "none";
    }

    function setAdvancedSettingsDescriptionText(text) {

        document.getElementById("advSettingsSummary").innerHTML = text;
    }

    function getAdvancedSettingsDescriptionText() {

        return document.getElementById("advSettingsSummary").value;
    }

    function replaceCommaAndRemoveWhitespace(text) {

        text = text.replace(/[,]/g, '.');

        return text.replace(/\s/g, '');
    }

    function is_float(value) {

        //if only contains dots... return false
        if (/^[.]+$/.test(value))
            return false;

    
        return /^[0-9]*[.]?[0-9]*$/.test(value);
    }

    function is_integer(value) {

        //if only contains dots... return false
        if (/^[0.]+$/.test(value))
            return false;
        //if only contains zeros... return false
       // if (/^[0]+$/.test(value))
        //    return false;

        return /^[0-9]+[.]?$/.test(value);
    }


    function addGeneralFieldsToCompletedView(type, element, dataObj) {

        var data = dataObj.getDataItemObj();

        var div = document.createElement("div");
        div.setAttribute("class", "c-view-item");

        var ef = new EditForm("inactive");

        div.appendChild(ef.render());

        var labelCont = document.createElement("label");
        labelCont.setAttribute("class", "c-view-container");

        try {
            if (data.title.length > 0) {

                var title = document.createElement("span");
                title.setAttribute("class", "c-view-title");
                var titleTxt = document.createTextNode(data.title);
                title.appendChild(titleTxt);
                labelCont.appendChild(title);

            } else if ((type === "textField") || (type === "paragraphField")) {

                var title = document.createElement("span");
                title.setAttribute("class", "c-view-title");
                var titleTxt = document.createTextNode(_text["untitledQuestionText"]);
                title.appendChild(titleTxt);
                labelCont.appendChild(title);

            }
        } catch (e) { }

        try {
            if (data.helpText.length > 0) {
                var spanHelpTxt = document.createElement("span");
                spanHelpTxt.setAttribute("class", "c-view-helpText");
                var helpText = document.createTextNode(data.helpText);
                spanHelpTxt.appendChild(helpText);
                labelCont.appendChild(spanHelpTxt);
            }
        } catch (e) { }



        //labelCont.style.display = "block";


        div.appendChild(labelCont);
        div.appendChild(element);


        return div;
    }

    function addGeneralFieldsToBootstrapForm(type, element, dataObj, nro) {

        var data = dataObj.getDataItemObj();

        var divFormGroup = document.createElement("div");
        divFormGroup.setAttribute("class", "form-group");

        try {
            //if (data.title.length > 0) {
                var title = document.createElement("label");
                if ((type === "textField") || (type === "paragraphField"))
                    title.setAttribute("for", "input_" + nro);
                var titleTxt;

                //console.log(data.title.length);

                if (data.title.length > 0) 
                    titleTxt = document.createTextNode(data.title);
                else 
                    titleTxt = document.createTextNode(_text["untitledQuestionText"]);
                title.appendChild(titleTxt);
                divFormGroup.appendChild(title);
            //}
        } catch (e) { }

        try {
            if (data.helpText.length > 0) {
                var p = document.createElement("p");
                p.setAttribute("class", "help-block");
                var helpText = document.createTextNode(data.helpText);
                p.appendChild(helpText);
                divFormGroup.appendChild(p);
            }
        } catch (e) { }


        if ((type === "textField") || (type === "paragraphField"))
            element.setAttribute("id", "input_" + nro);

        divFormGroup.appendChild(element);

        return divFormGroup;
    }

    
    function saveDataItemsToLocalStorage(dataItems) {

        localStorage.setItem("dataItems", dataItems);

    }

    function getLocalStorageDataItems() {

        return localStorage.getItem("dataItems");
    }

    function detectIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');

        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        if (trident > 0) {
            // IE 11 (or newer) => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        // other browser
        return false;
    }
} 