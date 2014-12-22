
/*

Represents Popup Menu where use can choose

*/

function PopupMenu(type) {

    var _type = type;

    var _fieldBase = new FieldBase();

    this.createPopupMenu = createPopupMenu;

    var _text = {};

    _text["popAddItem"] = "Add item";

    _text["popHeader1"] = "BASIC";
    _text["textField"] = "Text";
    _text["paragraphField"] = "Paragraph field";
    _text["radioButton"] = "Multiple choice";
    _text["checkBox"] = "Checkboxes";
    _text["list"] = "Choose from a list";

    _text["popHeader2"] = "ADVANCED";
    _text["scaleField"] = "Scale";
    _text["grid"] = "Grid";
    _text["dateField"] = "Date";
    _text["timeField"] = "Time";

    _text["popHeader3"] = "LAYOUT";
    _text["sectionHeader"] = "Section header";
    _text["pageBreak"] = "Page break";
    _text["image"] = "Image";
    _text["video"] = "Video";

    function createPopupMenu() {

        var div = createSelectField();

        return div;

    }

    function createSelectField() {

        var divFieldSelect = document.createElement("DIV");

        var state;

        if (_type === undefined) {
            state = "addItem";
        }
        else {
            state = "active";
        }

        divFieldSelect.setAttribute("id", "popSelectMenu_" + state);


        var table = document.createElement("table");
        table.setAttribute("id", "popSelectField_" + state);
 

        table.addEventListener("click", menuSelectClick, false);
        table.setAttribute("class", "popSelectField");

        var tr = document.createElement("TR");

        var td_1 = document.createElement("TD");

        // selected text
        var spanFieldSelectText = document.createElement("SPAN");
        spanFieldSelectText.setAttribute("class", "selectFieldText");

        table.setAttribute("data-for", "popMenuTable_" + state); 

        var text;
        //selected text
        if (_type === undefined) {
            text = document.createTextNode(_text["popAddItem"]);
        }
        else {
            text = document.createTextNode(_text[_type]);
        }

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

        pop_Table = createSelectTypeTable();

        pop_Table.setAttribute("id", "popMenuTable_" + state);

        divFieldSelect.appendChild(pop_Table);

        return divFieldSelect;
    }

    function createSelectTypeTable() {

        var table = document.createElement("table");
        table.setAttribute("class", "popMenuTable");

        var thead = document.createElement("thead");

        var tr_1 = document.createElement("tr");

        var th_1 = document.createElement("th");

        var h_1 = document.createTextNode(_text["popHeader1"]);

        th_1.appendChild(h_1);

        tr_1.appendChild(th_1);

        thead.appendChild(tr_1); 

        var th_2 = document.createElement("th");

        var h_2 = document.createTextNode(_text["popHeader2"]);

        th_2.appendChild(h_2);

        tr_1.appendChild(th_2);


        var th_3 = document.createElement("th");

        var h_3 = document.createTextNode(_text["popHeader3"]);

        th_3.appendChild(h_3);

        tr_1.appendChild(th_3);

        thead.appendChild(tr_1);

        table.appendChild(thead);

        //TBODY

        var tbody = document.createElement("TBODY");

        // tr 2 ---

        var tr_2 = document.createElement("tr");

        var divTxt = document.createElement("div");
        divTxt.setAttribute("class", "divLabelTextField");

        var labelTextField = document.createElement("label");

        labelTextField.setAttribute("class", "labelTextField");

        labelTextField.innerText = "ABC";

        divTxt.appendChild(labelTextField);


        // td_2_1
        var td_2_1 = document.createElement("td");

        // id popTextField --> class popTextField

        var lbl_2_1 = document.createElement("label");

        var txt_2_1 = document.createTextNode(_text["textField"]);

        lbl_2_1.appendChild(txt_2_1);

        td_2_1.appendChild(createFieldMenuItemTable(divTxt, lbl_2_1, "popTextField"));

        tr_2.appendChild(td_2_1);


        var img_scale = document.createElement("img");
        img_scale.src = _fieldBase._embed_png_src;

        // td_2_2
        var td_2_2 = document.createElement("td");

        // id popScale --> class popScale

        var lbl_2_2 = document.createElement("label");


        var txt_2_2 = document.createTextNode(_text["scaleField"]);

        lbl_2_2.appendChild(txt_2_2);

        td_2_2.appendChild(createFieldMenuItemTable(img_scale, lbl_2_2, "popScaleField"));

        tr_2.appendChild(td_2_2);



        // td_2_3
        var td_2_3 = document.createElement("td");

        // id sectionHeader --> class sectionHeader

        var lbl_2_3 = document.createElement("label");

        var txt_2_3 = document.createTextNode(_text["sectionHeader"]);

        lbl_2_3.appendChild(txt_2_3);

        var img_section_header = document.createElement("img");
        img_section_header.src = _fieldBase._insert_template_png_src;

        td_2_3.appendChild(createFieldMenuItemTable(img_section_header, lbl_2_3, "popSectionHeader"));

        tr_2.appendChild(td_2_3);

        // tr 3 ---

        var tr_3 = document.createElement("tr");


        // td_3_1
        var td_3_1 = document.createElement("td");

        // id popParagraphField --> class popParagraphField

        var lbl_3_1 = document.createElement("label");


        var txt_3_1 = document.createTextNode(_text["paragraphField"]);

        lbl_3_1.appendChild(txt_3_1);

        var img_parag = document.createElement("img");
        img_parag.src = _fieldBase._pilcrow_png_src;

        td_3_1.appendChild(createFieldMenuItemTable(img_parag, lbl_3_1, "popParagraphField"));

        tr_3.appendChild(td_3_1);


        // td_3_2
        var td_3_2 = document.createElement("td");

        // id popGrid --> class popGrid

        var lbl_3_2 = document.createElement("label");


        var txt_3_2 = document.createTextNode(_text["grid"]);

        lbl_3_2.appendChild(txt_3_2);

        var img_grid = document.createElement("img");
        img_grid.src = _fieldBase._table2_png_src;

        td_3_2.appendChild(createFieldMenuItemTable(img_grid, lbl_3_2, "popGrid"));

        tr_3.appendChild(td_3_2);

        // td_3_3
        var td_3_3 = document.createElement("td");

        // id pageBreak --> class pageBreak

        //var lbl_3_3 = document.createElement("label");

        //var txt_3_3 = document.createTextNode(_text["pageBreak"]);

        //lbl_3_3.appendChild(txt_3_3);

        //td_3_3.appendChild(createFieldMenuItemTable(undefined, lbl_3_3, "pageBreak"));

        tr_3.appendChild(td_3_3);

        // tr 4 ---

        var tr_4 = document.createElement("tr");

        // td_4_1
        var td_4_1 = document.createElement("td");

        // id popRadioButton --> class popRadioButton

        var lbl_4_1 = document.createElement("label");


        var txt_4_1 = document.createTextNode(_text["radioButton"]);

        lbl_4_1.appendChild(txt_4_1);

        var img_radio = document.createElement("img");
        img_radio.src = _fieldBase._radio_checked_png_src;

        td_4_1.appendChild(createFieldMenuItemTable(img_radio, lbl_4_1, "popRadioButton"));

        tr_4.appendChild(td_4_1);


        // td_4_2
        var td_4_2 = document.createElement("td");

        // id popDate --> class popDate

        var lbl_4_2 = document.createElement("label");

        //lbl_4_2.setAttribute("class", "popDateField");

        var txt_4_2 = document.createTextNode(_text["dateField"]);

        lbl_4_2.appendChild(txt_4_2);

        var img_cal = document.createElement("img");
        img_cal.src = _fieldBase._calendar_png_src;

        td_4_2.appendChild(createFieldMenuItemTable(img_cal, lbl_4_2, "popDateField"));

        tr_4.appendChild(td_4_2);


        // td_4_3
        var td_4_3 = document.createElement("td");

        // id image --> class image

        //var lbl_4_3 = document.createElement("label");

        //var txt_4_3 = document.createTextNode(_text["image"]);

        //lbl_4_3.appendChild(txt_4_3);

        //td_4_3.appendChild(createFieldMenuItemTable(undefined, lbl_4_3, "image"));

        tr_4.appendChild(td_4_3);

        // tr 5 ---

        var tr_5 = document.createElement("tr");


        // td_5_1
        var td_5_1 = document.createElement("td");

        // id popCheckBox --> class popCheckBox

        var lbl_5_1 = document.createElement("label");

        var txt_5_1 = document.createTextNode(_text["checkBox"]);

        lbl_5_1.appendChild(txt_5_1);

        var img_cb = document.createElement("img");
        img_cb.src = _fieldBase._checkbox_checked_png_src;

        td_5_1.appendChild(createFieldMenuItemTable(img_cb, lbl_5_1, "popCheckBox"));

        tr_5.appendChild(td_5_1);


        // td_5_2
        var td_5_2 = document.createElement("td");

        // id time --> class time

        var lbl_5_2 = document.createElement("label");


        var txt_5_2 = document.createTextNode(_text["timeField"]);

        lbl_5_2.appendChild(txt_5_2);

        var img_clock = document.createElement("img");
        img_clock.src = _fieldBase._clock_png_src;

        td_5_2.appendChild(createFieldMenuItemTable(img_clock, lbl_5_2, "popTimeField"));

        tr_5.appendChild(td_5_2);


        // td_5_3
        var td_5_3 = document.createElement("td");

        // id video --> class video

        //var lbl_5_3 = document.createElement("label");

        //lbl_5_3.setAttribute("class", "video");

        //var txt_5_3 = document.createTextNode(_text["video"]);

        //lbl_5_3.appendChild(txt_5_3);

        //td_5_3.appendChild(lbl_5_3);

        tr_5.appendChild(td_5_3);

        // tr 6 ---

        var tr_6 = document.createElement("tr");


        // td_6_1
        var td_6_1 = document.createElement("td");

        // id popList --> class popList

        var lbl_6_1 = document.createElement("label");


        var txt_6_1 = document.createTextNode(_text["list"]);

        lbl_6_1.appendChild(txt_6_1);

        var borderSelect = document.createElement("div");
        borderSelect.setAttribute("class", "fieldMenuItemSelect");

        var spanImageSelect = document.createElement("SPAN");
        spanImageSelect.setAttribute("class", _fieldBase._triangleClassSouth);

        var imageSelect2 = document.createElement("IMG");
        imageSelect2.setAttribute("class", "fieldMenuItemImage");
        imageSelect2.setAttribute("src", _fieldBase._select2_png_src);

        borderSelect.appendChild(imageSelect2);


        td_6_1.appendChild(createFieldMenuItemTable(borderSelect, lbl_6_1, "popList"));

        tr_6.appendChild(td_6_1);


        // td_6_2
        var td_6_2 = document.createElement("td");

        tr_6.appendChild(td_6_2);

        // td_6_6
        var td_6_3 = document.createElement("td");     

        tr_6.appendChild(td_6_3);

        tbody.appendChild(tr_2);

        tbody.appendChild(tr_3);

        tbody.appendChild(tr_4);

        tbody.appendChild(tr_5);

        tbody.appendChild(tr_6);

        table.appendChild(tbody);

        return table;

    }

    function createFieldMenuItemTable(elem1, elem2, id) {

        var table = document.createElement("TABLE");
        table.setAttribute("class", "fieldMenuItem");
        table.setAttribute("data-fieldType", id);
        table.addEventListener("click", fieldMenuItemClick, false);

        var row = document.createElement("TR");

       // row.setAttribute("class", id);

        var td_1 = document.createElement("TD");

        if (elem1)
            td_1.appendChild(elem1);

        row.appendChild(td_1);

        var td_2 = document.createElement("TD");

        if (elem2)
            td_2.appendChild(elem2);

        row.appendChild(td_2);

        table.appendChild(row);

        return table;
    }

    function fieldMenuItemClick() {

        //console.log(_type);

        if (_type)
            _fieldBase.setActiveSelectField("popSelectField_active");

    }


    function menuSelectClick() {

        _fieldBase.unsetActiveSelectField();

        var id = ("#" + this.parentNode.id);

        var posTop = $(id).offset().top;
        var posLeft = $(id).offset().left;

        //table id
        //childNodes
       // var selectField_id = "#" + this.id;

        var thisId = ("#" + this.id);

        var popSelect_Id = "#" + this.getAttribute("data-for");

        //console.log(popSelect_Id);

        var parentHeight = $(id).css("min-height") || $(id).outerHeight();

       // console.log("parentHeight " + parentHeight);

        //var popSelectPosition = $(popSelect_Id).css("position");

       // var selectFieldPadding = $(popSelect_Id).css("padding-top");
        // var selectFieldPaddingHeight = parseInt(selectFieldPadding);

        var thisHeight = $(thisId).css("min-height") || $(thisId).outerHeight();

        // console.log(thisHeight);

       // thisHeight = parseInt(thisHeight);

       // console.log($(thisId).height());

      //  var nroOfItems = $(popSelect_Id + " div").length;

       //    var popHeight = $(popSelect_Id + " > div:first-child").css("min-height") || $(popSelect_Id + " > div:first-child").outerHeight();
       var popHeight = $(popSelect_Id ).css("min-height") || $(popSelect_Id).outerHeight();
       popHeight = parseInt(popHeight);

       popHeight = $(popSelect_Id).height();
       //console.log("popHeight " + popHeight);
        //console.log("popSelect_Id " + height);
       // var itemPadding = $(popSelect_Id + " > div:first-child").css("padding-top");
       // var itemPaddingHeight = parseInt(itemPadding);

        //  var heightPerItem = height + itemPaddingHeight;

        var heightPerItem = 1;


        var topSpaceNarrow = false;

      //  var pos = $(selectField_id).offset();

        //get select Nro


        var elementSize = ($(id).offset().top + $(id).height() + popHeight);
        //console.log(elementSize);
        var spaceBetweenBottom = elementSize - ($(window).scrollTop() + $(window).height());

        //console.log(spaceBetweenBottom);

        var adjust = 0;

        if (spaceBetweenBottom > 0) {

            if (spaceBetweenBottom > ($(id).height() + popHeight)) {
                console.log("adjust");
                adjust = ($(id).height() + popHeight);
            } else {
                adjust = spaceBetweenBottom;
            }

            adjust += 20;

        } else { // do nothing, enough space

            adjust = 2;
        }

        //console.log(spaceBetweenBottom);

        //hide all pop ups
        $(".popSelect").hide();
        //console.log(posTop);
        //show
        $(popSelect_Id).css({
            position: "absolute",
            //  top: ((pos.top - vertical) - selectFieldPaddingHeight - 1) + "px",
         //   top: ((posTop.top - 100) - 1) + "px",
            top: ($(id).offset().top + $(id).height() - adjust) + "px",
            left: ($(id).offset().left) + "px"
        }).show();


        document.getElementById(this.parentNode.id).addEventListener("mouseleave", function () {
            $(popSelect_Id).hide();
        });

    }


}