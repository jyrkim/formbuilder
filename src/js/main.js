


$(document).ready(function () {

    var _fieldBase = new FieldBase();

    var _dataObj;

    var _genFields;

    var _field;

    var _prevType = "";
    var _prevFieldType = "";

    var headerFound = false;

    $(".formBuilder").each(function (index, element) {

        var item = element.getAttribute("data-item");

        var state = element.getAttribute("data-state");

        var data;

        if (item) {
            data = JSON.parse(item);
        }


        if (data) {

            var dataObj = createDataObject(data.type);

            dataObj.initialize(data.type, data);

            var field = createFieldObject(data.type, dataObj);

            if (data.type !== "mainHeader") {

                $(element).append(field.getCompletedView());

                if (!state)
                    $(element).attr("data-state", "inactive");
            }
            else {
                $(element).append(field.renderDevelopmentView());

                $(element).attr("data-state", "mainHeader");

                headerFound = true;
            }

        } else {

            var popup = new PopupMenu();
            $(element).append(popup.createPopupMenu());

            $(element).attr("data-state", "addItem");
        }

       
    });

    if (!headerFound) {

        var dataObj = createDataObject("mainHeader");

        dataObj.initialize("mainHeader", undefined);

        var divMainHeader = createFormBuilderDivForMainHeader(JSON.stringify(dataObj.getDataItemObj()));

        $("body").append(divMainHeader);

        var mainHeader = $('.formBuilder[data-state="mainHeader"]').detach();

        $("div.formBuilder").before(mainHeader);

        var field = createFieldObject("mainHeader", dataObj);

        $('.formBuilder[data-state="mainHeader"]').append(field.renderDevelopmentView());
    }

    $("body").sortable({
        items: '.formBuilder[data-state="inactive"]',
        delay: 250,
        stop: clearCSSAttributes
    });

    $("body").delegate('.formBuilder[data-state="inactive"]', "click", function (event) {

        if ($(event.target).closest(".editForm").length > 0) {
            return;
        }

        this.setAttribute("class", "formBuilder");

        var formBuilder = $(event.target);

        var item = $(event.target).attr("data-item");
        var state = $(event.target).attr("data-state");

        if (!item) {

            item = $(event.target).closest(".formBuilder").attr("data-item");
            state = $(event.target).closest(".formBuilder").attr("data-state");
        }

        var data

        if (item) {
            data = JSON.parse(item);
        }

        // render development view
        if (item && data) {

            if (!state || (state === "inactive")) {

                $('.formBuilder[data-state="active"]').empty();

                if (_field)
                    $('.formBuilder[data-state="active"]').append(_field.getCompletedView());

                $('.formBuilder[data-state="active"]').attr("data-state", "inactive");
                $(event.target).closest(".formBuilder").attr("data-state", "active");

                var dataObj = createDataObject(data.type);

                dataObj.initialize(data.type, data);

                _field = createFieldObject(data.type, dataObj);

                _genFields = new GeneralFields(data.type, dataObj);

                $('.formBuilder[data-state="active"]').empty();

                if (data.type !== "sectionHeader") {

                    $('.formBuilder[data-state="active"]').append(_genFields.render());

                    _field.renderDevelopmentView();

                } else {

                    $('.formBuilder[data-state="active"]').append(_field.renderDevelopmentView());

                }
              

                //set previous type
                _prevType = data.type;
            }
        }

    });

    $(document).on("click", 'table.fieldMenuItem', function (event) {

        $(".popMenuTable").hide();

        var selectedFormBuilder = $(event.target).closest(".formBuilder");

        var item = selectedFormBuilder.attr("data-item");
        var state = selectedFormBuilder.attr("data-state");

        var popClass = this.getAttribute("data-fieldType");

        popClass = popClass.substr(3);
        var firstLetter = popClass.substr(0, 1).toLowerCase();
        popClass = firstLetter + popClass.substr(1);

        // render development view
        if (state) {

            //new Item add 
            if (state === "addItem") {

                //empty active and set completed view and set inactive
                $('.formBuilder[data-state="active"]').empty();
                if (_field)
                    $('.formBuilder[data-state="active"]').append(_field.getCompletedView());
                $('.formBuilder[data-state="active"]').attr("data-state", "inactive");

                //set addItem to active
                $(event.target).closest(".formBuilder").attr("data-state", "active");

                var dataObj = createDataObject(popClass);

                dataObj.initialize(popClass, undefined, _fieldBase.saveDataItem);

                _field = createFieldObject(popClass, dataObj);

                //empty addItem/active and render general fields and dev view for field.
                $('.formBuilder[data-state="active"]').empty();

                if (popClass !== "sectionHeader") {
                    _genFields = new GeneralFields(popClass, dataObj);

                    $('.formBuilder[data-state="active"]').append(_genFields.render());

                    _field.renderDevelopmentView();

                } else {

                    $('.formBuilder[data-state="active"]').append(_field.renderDevelopmentView());
                }

                if (popClass !== "sectionHeader") {

                    $("#inputTitle").focus();

                } else {

                    $("#inputHeaderText").focus();
                }

                //create a new add item below
                createFormBuilderDiv();

                //set previous type
                _prevType = popClass;

            } // switch to another type 
            else if (state === "active") {

                //if previous type same return
                if (_prevType === popClass) {
                    return;
                }

                var dataObj = createDataObject(popClass);

                var data

                if (item) {
                    data = JSON.parse(item);
                }

                dataObj.initialize(popClass, data, _fieldBase.saveDataItem);

                if (popClass !== "sectionHeader")
                    _genFields.switchFieldType(popClass, dataObj);

                //if multichoice switch
                if ((_prevType == "radioButton") || (_prevType == "list") || (_prevType == "checkBox")) {
                    if ((popClass == "radioButton") || (popClass == "list") || (popClass == "checkBox")) {

                        _field.multiChoiceSwitchTo(popClass, dataObj);

                        //set previous type
                        _prevType = popClass;

                        return;
                    }
                }

                _field = createFieldObject(popClass, dataObj);


                if (popClass !== "sectionHeader")
                    _field.renderDevelopmentView();
                else {
                    $('.formBuilder[data-state="active"]').empty();
                    $('.formBuilder[data-state="active"]').append(_field.renderDevelopmentView());
                }


                //set previous type
                _prevType = popClass;

            }
        }
    });


    //div mouseover ja mouseleave
    $('body').delegate('.formBuilder[data-state="inactive"]', 'mouseover mouseleave', function (e) {

        if (e.type == 'mouseleave') {

            if (this.className.indexOf("formBuilderHover") > -1) {

                this.setAttribute("class", "formBuilder");

                $(this).find(".editForm.inactive").css("display", "none");
            }
        } else if (e.type == 'mouseover') {

            if (this.className.indexOf("formBuilderHover") == -1) {

                this.setAttribute("class", "formBuilder formBuilderHover");

                $(this).find(".editForm.inactive").css("display", "table");
            }
        }

    });

    $(document).on("click", '#doneButton', function (event) {

        $('.formBuilder[data-state="active"]').empty();
        if (_field)
            $('.formBuilder[data-state="active"]').append(_field.getCompletedView());

        $('.formBuilder[data-state="active"]').attr("data-state", "inactive");

    });

    $(document).on("click", '*:not(.popSelectField)', function (event) {

        var isFieldMenuItem = false;

        if ($(event.target).closest("table.fieldMenuItem").length > 0)
            isFieldMenuItem = true;

        var isPopSelectItem = false;

        if ($(event.target).closest(".popSelectItem").length > 0)
            isPopSelectItem = true;

        var isPopSelectItemScale = false;

        if ($(event.target).closest(".popSelectItemScale").length > 0)
            isPopSelectItemScale = true;

        if ((!isPopSelectItem) && (!isPopSelectItemScale) && (!isFieldMenuItem))
            _fieldBase.unsetActiveSelectField();

    });

    $(document).on("click", 'table.editForm.inactive .tdEdit', function (event) {

        $(this).closest('.formBuilder[data-state="inactive"]').trigger("click");
    });

    $(document).on("click", 'table.editForm.active .tdEdit, table.editForm.activeHeader .tdEdit', function (event) {

        $("#doneButton").trigger("click");
    });

    $(document).on("click", 'table.editForm .tdCopy', function (event) {

        $selectedFormBuilder = $(this).closest(".formBuilder");

        var item = $selectedFormBuilder.attr("data-item");

        $('.formBuilder[data-state="active"]').empty();
        if (_field)
            $('.formBuilder[data-state="active"]').append(_field.getCompletedView());

        //create empty formBuilder div below current one
        var newDiv = createFormBuilderDivForCopy(item);

        //hide
        newDiv.style.display = "none";

        // $('.formBuilder[data-state="active"]').after(newDiv);
        $selectedFormBuilder.after(newDiv);

        $('.formBuilder[data-state="active"]').attr("data-state", "inactive");

        var data;

        if (item) {
            data = JSON.parse(item);
        }

        var dataObj = createDataObject(data.type);

        dataObj.initialize(data.type, data, _fieldBase.saveDataItem);

        _field = createFieldObject(data.type, dataObj);


        if (data.type !== "sectionHeader") {
            _genFields = new GeneralFields(data.type, dataObj);

            $('.formBuilder[data-state="new"]').append(_genFields.render());

            //slide
            $('.formBuilder[data-state="new"]').slideDown(300);

            _field.renderDevelopmentView();

        } else {

            //slide
            $('.formBuilder[data-state="new"]').slideDown(300);

            $('.formBuilder[data-state="new"]').append(_field.renderDevelopmentView());
        }

        if (data.type !== "sectionHeader") {
            $("#inputTitle").focus();
        } else {
            $("#inputHeaderText").focus();
        }


        $('.formBuilder[data-state="new"]').attr("data-state", "active");

    });


    $(document).on("click", 'table.editForm .tdDel', function (event) {

        $(this).closest(".formBuilder").remove();
    });


    $(document).on("click", '#saveDataItemsTest', function (event) {

        var dataItems = [];

        $(".formBuilder").each(function (index, element) {

            var item = element.getAttribute("data-item");

            var state = element.getAttribute("data-state");

            var data;

            if (item) {
                data = JSON.parse(item);
            }

            if (data) {


                if (state !== "active") {
                    var dataObj = createDataObject(data.type);

                    dataObj.initialize(data.type, data);

                }
                /*
                var nro = (index + 1);

                var n = nro.toString();
                n = '"' + (index + 1) + '"';*/

                dataItems.push(item);

            }
        });

        _fieldBase.saveDataItemsToLocalStorage(JSON.stringify(dataItems));

    });



    $(document).on("click", '#saveDataItems', function (event) {

        var dataItems = [];

        var fb = new FormBuilder();

        // var data = JSON.stringify(fb.getFormData());

        _fieldBase.saveDataItemsToLocalStorage(JSON.stringify(fb.getFormData()));

    });

});

function createFormBuilderDiv() {

    var div = document.createElement("DIV");
    div.setAttribute("class", "formBuilder");
    div.setAttribute("data-state", "addItem");

    $("div.formBuilder").last().after(div);

    var popup = new PopupMenu();
    $('.formBuilder[data-state="addItem"]').append(popup.createPopupMenu());

}

function createFormBuilderDivForCopy(item) {

    var div = document.createElement("DIV");
    div.setAttribute("class", "formBuilder");
    //set temporarily to new
    div.setAttribute("data-state", "new");

    div.setAttribute("data-item", item);

    return div;
}


function createFormBuilderDivForMainHeader(item) {

    var div = document.createElement("DIV");
    div.setAttribute("class", "formBuilder");

    div.setAttribute("data-state", "mainHeader");

    div.setAttribute("data-item", item);

    return div;
}



function createDataObject(type) {

    if (type === "textField") {

        return new TextFieldData();
    }
    else if (type === "paragraphField") {

        return new ParagraphFieldData();
    }
    else if (type === "radioButton") {

        return new MultiChoiceData();
    }
    else if (type === "checkBox") {

        return new MultiChoiceData();
    }
    else if (type === "list") {

        return new MultiChoiceData();
    }
    else if (type === "grid") {

        return new GridData();
    }
    else if (type === "scaleField") {

        return new ScaleData();
    }
    else if (type === "dateField") {

        return new DateData();
    }
    else if (type === "timeField") {

        return new TimeData();
    }
    else if (type === "mainHeader") {

        return new HeaderData();
    }
    else if (type === "sectionHeader") {

        return new HeaderData();
    }

}

function createFieldObject(type, dataObj) {

    if (type === "textField") {

        return new TextField(dataObj);

    }
    else if (type === "paragraphField") {

        return new ParagraphField(dataObj);
    }
    else if ((type === "radioButton") || (type === "list") || (type === "checkBox")) {

        return new MultiChoiceField(type, dataObj);
    }
    else if (type === "grid") {

        return new GridField(dataObj);

    }
    else if (type === "scaleField") {

        return new ScaleField(dataObj);

    }
    else if (type === "dateField") {

        return new DateField(dataObj);

    }
    else if (type === "timeField") {

        return new TimeField(dataObj);

    }
    else if (type === "mainHeader") {

        return new MainHeaderField(dataObj);
    }
    else if (type === "sectionHeader") {

        return new SectionHeaderField(dataObj);
    }

}

//used after sorting
function clearCSSAttributes() {

    $('.formBuilder[data-state="inactive"]').removeAttr("style");

}