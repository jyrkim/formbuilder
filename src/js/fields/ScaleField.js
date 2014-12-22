/*
Represents Scale on the Web page
*/

function ScaleField(dataObj) {

    var _fieldBase = new FieldBase();

    var _elementToAppendTo = _fieldBase._elementToAppendTo;

    var _advSettingsContentId = _fieldBase._advSettingsContentId;

    var _dataObject = dataObj;
    var _data = dataObj.getDataItemObj();


    this.renderDevelopmentView = renderDevelopmentView;
    this.getCompletedView = getCompletedView;
    this.getBootstrapView = getBootstrapView;

    var _text = {};


    _text["placeholderLabelOptional"] = "Label (optional)";

    _text["toWord"] = "to";

    _text["scaleLabel"] = "Scale";

    /*Select for Text */
    var _select1_text = {};
    _select1_text[0] = new Array(2);
    _select1_text[0][0] = "0";
    _select1_text[0][1] = "1";

    var _select1_id = {};
    _select1_id[0] = new Array(2);
    _select1_id[0][0] = 0;
    _select1_id[0][1] = 1;

    var _select2_text = {};
    _select2_text[0] = new Array(8);
    _select2_text[0][0] = "2";
    _select2_text[0][1] = "3";
    _select2_text[0][2] = "4";
    _select2_text[0][3] = "5";
    _select2_text[0][4] = "6";
    _select2_text[0][5] = "7";
    _select2_text[0][6] = "8";
    _select2_text[0][7] = "9";

    var _select2_id = {};
    _select2_id[0] = new Array(8);
    _select2_id[0][0] = 2;
    _select2_id[0][1] = 3;
    _select2_id[0][2] = 4;
    _select2_id[0][3] = 5;
    _select2_id[0][4] = 6;
    _select2_id[0][5] = 7;
    _select2_id[0][6] = 8;
    _select2_id[0][7] = 9;


    function renderDevelopmentView() {

        //hide advanced content
        $(_advSettingsContentId).hide();

        var div = document.createElement("DIV");

        var table = document.createElement("TABLE");
        table.setAttribute("class", "scaleTable");

        var row1 = createScaleSettingsRow();

        var row2 = createScaleLabel1Row();

        var row3 = createScaleLabel2Row();

        table.appendChild(row1);

        table.appendChild(row2);

        table.appendChild(row3);

        div.appendChild(table);

   /*     var scaleTable1 = createTableScaleSettings();
        scaleTable1.setAttribute("class", "scaleTable");
        scaleTable1.setAttribute("id", "scaleSettingsTable");
        div.appendChild(scaleTable1);

        var scaleTable1 = createTableScaleLabel1();
        scaleTable1.setAttribute("class", "scaleTable");
        scaleTable1.setAttribute("id", "scaleLabel1Table");
        div.appendChild(scaleTable1);

        var scaleTable2 = createTableScaleLabel2();
        scaleTable2.setAttribute("class", "scaleTable");
        scaleTable2.setAttribute("id", "scaleLabel2Table");
        div.appendChild(scaleTable2); */


        document.getElementById(_elementToAppendTo.substr(1)).appendChild(div);

        //return div;
    }

 

    function createScaleSettingsRow() {

      //  var table = document.createElement("table");

        var row = document.createElement("TR");
        //row.setAttribute("class", "advanced2ndRow");

        var td_1 = document.createElement("TD");

        var div = document.createElement("DIV");

        div.setAttribute("id", "divScaleLabel");

        div.innerText = _text["scaleLabel"];

        td_1.appendChild(div);

        row.appendChild(td_1);

        var td_2 = document.createElement("TD");

        var tableInner = document.createElement("table");

        var tr_inner = document.createElement("tr");

        var td_1_inner = document.createElement("TD");

        var divSelect_1 = createSelectField("Select1");

        td_1_inner.appendChild(divSelect_1);

        tr_inner.appendChild(td_1_inner);

      //  td_2.appendChild(divSelect_1);
      
        var td_2_inner = document.createElement("TD");


        var label_2 = document.createElement("label")

        //label_2.style.display = "inline";

        label_2.innerText = _text["toWord"];

        td_2_inner.appendChild(label_2);

        tr_inner.appendChild(td_2_inner);

       

        var td_3_inner = document.createElement("TD");

        //td_4.setAttribute("id", "tdSelect2");

        var divSelect_2 = createSelectField("Select2");



        td_3_inner.appendChild(divSelect_2);

        tr_inner.appendChild(td_3_inner);

        tableInner.appendChild(tr_inner);

        td_2.appendChild(tableInner);

        row.appendChild(td_2);  // td 2

        var td_3 = document.createElement("TD");

        row.appendChild(td_3);

        var td_4 = document.createElement("TD");

        row.appendChild(td_4);

        var td_5 = document.createElement("TD");

        row.appendChild(td_5);


        return row;
       // table.appendChild(row);

       // return table;
        //return row;

    }

    function createScaleLabel1Row() {

       // var table = document.createElement("table");

        var row = document.createElement("TR");
        //row.setAttribute("class", "advanced2ndRow");

        var td_1 = document.createElement("TD");

        var div = document.createElement("DIV");

       // div.setAttribute("id", "popSelectHeight");

        td_1.appendChild(div);

        row.appendChild(td_1);

        var td_2 = document.createElement("TD");
        td_2.setAttribute("colspan", 3);

        //var divSelect_1 = createSelectField("Select1");

        var label_2 = document.createElement("label")
        label_2.setAttribute("id", "scaleLabel1");


        try {
            var val_from = _dataObject.getDataItemObj().from;
        } catch (e) { }
        
        //set value for label
   
        if (/^[0-9]+[.]?$/.test(val_from)) {
            label_2.innerText = val_from + ":"
          
        }
        else {
            label_2.innerText = "1:";
        }

        td_2.appendChild(label_2);

        var fromLabel = "";

        try {
            fromLabel = _dataObject.getDataItemObj().fromLabel;
        } catch (e) { }

        var input = document.createElement("input")
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", _text["placeholderLabelOptional"]);
        input.addEventListener("keyup", label_1_key_pressed, false);

        //set value for input
        fromLabel ? input.value = fromLabel : "";


        td_2.appendChild(input);

        row.appendChild(td_2);

        var td_3 = document.createElement("TD");   

        row.appendChild(td_3);
     

        //table.appendChild(row);

        //return table;
        return row;

    }


    function createScaleLabel2Row() {

       // var table = document.createElement("table");

        var row = document.createElement("TR");
        //row.setAttribute("class", "advanced2ndRow");

        var td_1 = document.createElement("TD");

        var div = document.createElement("DIV");

        td_1.appendChild(div);

        row.appendChild(td_1);

        var td_2 = document.createElement("TD");
        td_2.setAttribute("colspan", 3);

        var label_2 = document.createElement("label")
        label_2.setAttribute("id", "scaleLabel2");


        try {
            var val_to = _dataObject.getDataItemObj().to;
        } catch (e) { }

        //set value for label
        _fieldBase.is_integer(val_to) ? label_2.innerText = val_to + ":" : label_2.innerText = "5:";

        var toLabel = "";

        try {
            toLabel = _dataObject.getDataItemObj().toLabel;
        } catch (e) { }

        var input = document.createElement("input")
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", _text["placeholderLabelOptional"]);
        input.addEventListener("keyup", label_2_key_pressed, false);

        //set value for input
        toLabel ? input.value = toLabel : "";

        td_2.appendChild(label_2);
        td_2.appendChild(input);

        row.appendChild(td_2);

        var td_3 = document.createElement("TD");

        row.appendChild(td_3);


       // table.appendChild(row);

        //return table;
        return row;

    }


    function createSelectField(id) {

        var divFieldSelect = document.createElement("DIV");


        divFieldSelect.setAttribute("id", "popSelectFieldDiv" + id);
        
        var table = document.createElement("table");

        table.setAttribute("id", "popSelectField" + id);
       

        table.addEventListener("click", selectClick, false);
        table.setAttribute("class", "popSelectField");
      
        var tr = document.createElement("TR");

        var td_1 = document.createElement("TD");

        // selected text
        var spanFieldSelectText = document.createElement("SPAN");
        spanFieldSelectText.setAttribute("id", "selectFieldText" + id);
        spanFieldSelectText.setAttribute("class", "selectFieldText"); 
        spanFieldSelectText.setAttribute("class", "selectFieldText");

        var selectedText;

        if (id == "Select1") {

            table.setAttribute("data-for", "popSelectFrom");

            var val_1st_select;

            try {
                val_1st_select = _dataObject.getDataItemObj().from;
            } catch (e) { }

            //console.log("val_1st_select " + val_1st_select);

            if (val_1st_select) {
                selectedText = getTextForId(val_1st_select, _select1_id[0], _select1_text[0]);
            } else {
                selectedText = _select1_text[0][0];
            }

        } else {

            table.setAttribute("data-for", "popSelectTo");

            var val_2nd_select;

            try {
                val_2nd_select = _dataObject.getDataItemObj().to;
            } catch (e) { }

            if (val_2nd_select) {
                selectedText = getTextForId(val_2nd_select, _select2_id[0], _select2_text[0]);
            } else {
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
        spanImageSelect.setAttribute("class", _fieldBase._triangleClassNorthSouth);

        divFieldSelect.appendChild(spanImageSelect);

        td_2.appendChild(spanImageSelect);

        tr.appendChild(td_2);

        table.appendChild(tr);

        table.style = "";

        divFieldSelect.appendChild(table);

        var select_PopUp_text = "";

        if (id == "Select1") {

            select_PopUp_text = createSelectPopUp("From", _select1_id[0], _select1_text[0]);

        } else {

            select_PopUp_text = createSelectPopUp("To", _select2_id[0], _select2_text[0]);
        }

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
            div_sub.setAttribute("class", "popSelectItemScale");

            div_sub.addEventListener("click", popUpSelect, false);

            var text = document.createTextNode(textArray[i]);
            div_sub.appendChild(text);
            div.appendChild(div_sub);
        }

        return div;
    }



    function popUpSelect() {

        var parentId = this.parentNode.id;
        var dataNro = this.getAttribute("data-nro");

        dataNro = parseInt(dataNro) - 1;

        if (parentId === "popSelectFrom") {

            _fieldBase.setActiveSelectField("popSelectFieldSelect1");

            //check if type same as before
            var prev_from_id = _dataObject.getDataItemObj().from;

            if (prev_from_id === _select1_id[0][dataNro]) {
                $("#" + parentId).hide();
                return;
            }


            _dataObject.setFrom(parseInt(_select1_id[0][dataNro]), _fieldBase.saveDataItem);
            document.getElementById("selectFieldTextSelect1").innerHTML = _select1_text[0][dataNro];
            document.getElementById("scaleLabel1").innerText = _select1_text[0][dataNro] + ":";

        } else if (parentId === "popSelectTo") {

            _fieldBase.setActiveSelectField("popSelectFieldSelect2");

            //check if type same as before
            var prev_to_id = _dataObject.getDataItemObj().to;

            if (prev_to_id === _select2_id[0][dataNro]) {
                $("#" + parentId).hide();
                return;
            }

            _dataObject.setTo(parseInt(_select2_id[0][dataNro]), _fieldBase.saveDataItem);
            document.getElementById("selectFieldTextSelect2").innerHTML = _select2_text[0][dataNro];
            document.getElementById("scaleLabel2").innerText = _select2_text[0][dataNro] + ":";

        } 

        $("#" + parentId).hide();

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

        if (popSelect_Id === "#popSelectFrom") {

            var from = _dataObject.getDataItemObj().from;

            if (from) {
                selectNro = getSelectedPopUpNro(from, _select1_id[0]);
            }
        }
        else if (popSelect_Id === "#popSelectTo") {

            var to = _dataObject.getDataItemObj().to;

            if (to) {
                selectNro = getSelectedPopUpNro(to, _select2_id[0]);
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

    function label_1_key_pressed() {

        _dataObject.setFromLabel(this.value, _fieldBase.saveDataItem);

    }

    function label_2_key_pressed() {

        _dataObject.setToLabel(this.value, _fieldBase.saveDataItem);

    }



    function getCompletedView() {

        _data = _dataObject.getDataItemObj();

        //var number = Math.floor((Math.random() * 100000) + 1); //todo change to field number
        var table = document.createElement("table");
        table.setAttribute("class", "c-view-scale-table");

        var thead = document.createElement("thead");

        var tr_1 = document.createElement("tr");
        tr_1.setAttribute("class", "c-view-scale-tr");

        var from = _data.from;
        var to = _data.to;

        var startIndex = from - 1;
        var endIndex = to + 1;

        // add headers
        //start from from - 1 to accomodate from label (column) text, 
        //loop until to + 1 to accomodate to label (column) text
        for (startIndex = from - 1; startIndex <= endIndex; startIndex++) {

            var td = document.createElement("td");

            var firstLoop = from - 1;
            var lastLoop = to + 1;

            if (!((startIndex == firstLoop) || (startIndex == lastLoop)) ){
                //console.log(startIndex);
                var div = document.createElement("div");
                div.innerText = startIndex;

                td.appendChild(div);
            }

            tr_1.appendChild(td);
        }

        thead.appendChild(tr_1);
        table.appendChild(thead);

        var tbody = document.createElement("tbody");

        var tr = document.createElement("tr");
        tr.setAttribute("class", "c-view-scale-tr");

        //start from from - 1 to accomodate from label (column) text, 
        //loop until to + 1 to accomodate to label (column) text
        for (startIndex = from - 1; startIndex <= endIndex; startIndex++) {

            var td = document.createElement("td");

            var firstLoop = from - 1;
            var lastLoop = to + 1;

            if (startIndex === firstLoop) {

                var div = document.createElement("div");

                if (_data.fromLabel.length > 0)
                    div.innerText = _data.fromLabel;

                td.appendChild(div);

            } else if (startIndex === lastLoop) {

                var div = document.createElement("div");
                if (_data.toLabel.length > 0)
                    div.innerText = _data.toLabel;

                td.appendChild(div);

            }
            else {

                var inputRadio = document.createElement("INPUT");
                inputRadio.setAttribute("type", "radio");
                inputRadio.addEventListener('click', stopDefAction, false);
                inputRadio.setAttribute("class", "c-view-scale-column");

                td.appendChild(inputRadio);
            }

            tr.appendChild(td);   
        }

        tbody.appendChild(tr);

        table.appendChild(tbody);

        var div = _fieldBase.addGeneralFieldsToCompletedView("scaleField", table, _dataObject);

        return div;
    }

    function getBootstrapView(orderNro) {


        _data = _dataObject.getDataItemObj();

        //var number = Math.floor((Math.random() * 100000) + 1); //todo change to field number
        var table = document.createElement("table");
        table.setAttribute("class", "table table-striped");

        var thead = document.createElement("thead");

        var tr_1 = document.createElement("tr");
        //tr_1.setAttribute("class", "c-view-scale-tr");

        var from = _data.from;
        var to = _data.to;

        var startIndex = from - 1;
        var endIndex = to + 1;

        // add headers
        //start from from - 1 to accomodate from label (column) text, 
        //loop until to + 1 to accomodate to label (column) text
        for (startIndex = from - 1; startIndex <= endIndex; startIndex++) {

            var td = document.createElement("td");

            var firstLoop = from - 1;
            var lastLoop = to + 1;

            if (!((startIndex == firstLoop) || (startIndex == lastLoop))) {
                //console.log(startIndex);
                var div = document.createElement("div");
                div.innerText = startIndex;

                td.appendChild(div);
            }

            tr_1.appendChild(td);
        }

        thead.appendChild(tr_1);
        table.appendChild(thead);

        var tbody = document.createElement("tbody");

        var tr = document.createElement("tr");
        //tr.setAttribute("class", "c-view-scale-tr");

        //start from from - 1 to accomodate from label (column) text, 
        //loop until to + 1 to accomodate to label (column) text
        for (startIndex = from - 1; startIndex <= endIndex; startIndex++) {

            var td = document.createElement("td");

            var firstLoop = from - 1;
            var lastLoop = to + 1;

            if (startIndex === firstLoop) {

                var div = document.createElement("div");

                if (_data.fromLabel.length > 0)
                    div.innerText = _data.fromLabel;

                td.appendChild(div);

            } else if (startIndex === lastLoop) {

                var div = document.createElement("div");
                if (_data.toLabel.length > 0)
                    div.innerText = _data.toLabel;

                td.appendChild(div);

            }
            else {

                var inputRadio = document.createElement("INPUT");
                inputRadio.setAttribute("type", "radio");
                inputRadio.setAttribute("name", "group_" + orderNro );
                //inputRadio.addEventListener('click', stopDefAction, false);
                //inputRadio.setAttribute("class", "c-view-scale-column");

                td.appendChild(inputRadio);
            }

            tr.appendChild(td);
        }

        tbody.appendChild(tr);

        table.appendChild(tbody);

        var div = _fieldBase.addGeneralFieldsToBootstrapForm("scaleField", table, _dataObject);

        return div;

    }

    function stopDefAction(evt) {
        evt.preventDefault();
    }
}