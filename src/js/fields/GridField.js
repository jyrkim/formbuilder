
/*
    append Grid field 

    text = array for options/list value texts
    style  -> default, Bootstrap, Google
              if style == "", then default style is applied
    elementIdToAppendTo ->  #dev-td, which is a TABLE td element
    parentElementIdToAddCSSClass ->  #dev-row, which is a TABLE row element
*/
function GridField(dataObj) {

    var _fieldBase = new FieldBase();

    var _dataObject = dataObj;
    var _data = dataObj.getDataItemObj();

    var _advField = new GridFieldAdvanced(_dataObject);

    var _style = _fieldBase._style;

    var _elementToAppendTo = _fieldBase._elementToAppendTo;
    var _parentElementToAddCSSClass = _fieldBase._parentElementToAddCSSClass;
    var _formBuilderIdentifier = _fieldBase._formBuilderIdentifier;
    var _advSettingsContentId = _fieldBase._advSettingsContentId;
    var _advSettingsSummaryId = _fieldBase._advSettingsSummaryId;

    var _data;
    var _dataObject;

    var _rowText = "Row";
    var _columnText = "Column";
    var _labelText = "Label";
    var _addRowText = "Click to add row";
    var _addColumnText = "Click to add column";

    this.renderDevelopmentView = renderDevelopmentView;
    this.renderCompletedView = renderCompletedView;
    this.getCompletedView = getCompletedView;

    this.getBootstrapView = getBootstrapView;


    /* append TextField for development */
    function renderDevelopmentView() {

        var div = document.createElement("DIV");

        //grid row table
        tableForRows = createGridFieldTable("row");

        tableForRows.setAttribute("id", "gridRowTable");

        div.appendChild(tableForRows);

        var divSeparator = document.createElement("DIV");

        divSeparator.setAttribute("class", "separator");

        div.appendChild(divSeparator);

        //grid column table
        tableForColumns = createGridFieldTable("column");

        tableForColumns.setAttribute("id", "gridColumnTable");

        div.appendChild(tableForColumns);

        //default style
        if ((_style === undefined) || (_style == "default")) {

            div.setAttribute("class", "dev-div-gridField");


            $(_parentElementToAddCSSClass).addClass("dev-row-gridField");
        }

        document.getElementById(_elementToAppendTo.substr(1)).appendChild(div);
        
        //sortable       
        $("#gridRowTable").sortable({
            items: "tr[id!=lastGridRow]",
            handle: ".handle",
            stop: updateRows,
            start: function (event, ui) {
                var start_pos = ui.item.index();
                ui.item.data('start_pos', start_pos);
            },
            update: function (event, ui) {
                var start_pos = ui.item.data('start_pos');
                var end_pos = ui.item.index();
                _dataObject.moveRowText(start_pos, end_pos, _fieldBase.saveDataItem);
            }
        });

        $("#gridColumnTable").sortable({
            items: "tr[id!=lastGridColumn]",
            handle: ".handle",
            stop: updateColumns,
            start: function (event, ui) {
                var start_pos = ui.item.index();
                ui.item.data('start_pos', start_pos);
            },
            update: function (event, ui) {
                var start_pos = ui.item.data('start_pos');
                var end_pos = ui.item.index();
                _dataObject.moveColumnText(start_pos, end_pos, _fieldBase.saveDataItem);
            }
        });
        
        checkSortingAndDeleteSettingsForRowTable();
        checkSortingAndDeleteSettingsForColumnTable();

        document.getElementById(_advSettingsContentId.substr(1)).appendChild(_advField.render());

    }

    /* create Grid field for development
             style = default, Bootstrap, Google
             if style = "", then default style is applied
         */
    function createGridFieldTable(type) {

        var table = document.createElement("TABLE");

        var rowCount = 2;


        if (type == "row") {
            if (!(_data.rowsText === undefined)) {
                //add 1 row for add row 
                rowCount = _data.rowsText.length + 1;
            }
        } else { // column
            if (!(_data.columnsText === undefined)) {
                //add 1 row for add column 
                rowCount = _data.columnsText.length + 1;
            }
        }

        for (rowNro = 1; rowNro <= rowCount; rowNro++) {

            var text;

            // get text
            if (type == "row") {
                if (_data.rowsText[rowNro - 1]) {

                    var objectKey = "row-" + rowNro;
                    var text = _data.rowsText[rowNro - 1][objectKey];
                    //text = getValue(text);

                }
                else {
                    text = _rowText + " " + rowNro;
                }
                
            } else { // column

                if (_data.columnsText[rowNro - 1]) {
                    var objectKey = "column-" + rowNro;
                    var text = _data.columnsText[rowNro - 1][objectKey];
                }
                else {       
                    text = _columnText + " " + rowNro;
                }       
            }

            var row;

            //last row
            if (rowNro == rowCount) {

                row = create_grid_table_row_or_column(text, type, "true", rowNro);

                if (type == "row") {

                    row.setAttribute("id", "lastGridRow");
                  

                } else if (type == "column") {

                    row.setAttribute("id", "lastGridColumn");
                }

            } else {
                row = create_grid_table_row_or_column(text, type, "false", rowNro);
                row.setAttribute("class", type + "GridRow");
            }

            table.appendChild(row);

        }

        return table;

    }

    function getValue(text) {

        var indexOf = text.indexOf('":"') + 3;
        text = text.substr(indexOf);
        text = text.substr(0, text.length - 2);
        return text
    }

    function checkSortingAndDeleteSettingsForRowTable() {

        var rowCount = $("#gridRowTable tr").length;

        if (rowCount >= 3) {

            //sorting visible
            $(".rowGridRow > td:nth-child(2) span").visible();

            // show delete row span
            $(".rowGridRow > td:nth-child(4) span").visible();

        } // 2 rows
        else {
            //sorting invisible
            $(".rowGridRow > td:nth-child(2) span").invisible();

            // hide delete row span
            $(".rowGridRow > td:nth-child(4) span").invisible();
        }

    }


    function checkSortingAndDeleteSettingsForColumnTable() {

        var rowCount = $("#gridColumnTable tr").length;

        if (rowCount >= 3) {
            //sorting visible
            $(".columnGridRow > td:nth-child(2) span").visible();

            // show delete row span
            $(".columnGridRow > td:nth-child(4) span").visible();

        } // 2 rows
        else {
            //sorting invisible
            $(".columnGridRow > td:nth-child(2) span").invisible();

            // hide delete row span
            $(".columnGridRow > td:nth-child(4) span").invisible();
        }

    }

    function updateRows() {

        updateRowTableLabelNros();
        updateRowNro();
    }

    function updateRowTableLabelNros() {

        var rowNro;

        $(".rowGridRow").find("td:nth-child(1) label").each(function (index, label) {
            rowNro = index + 1;
            label.innerHTML = _rowText + " " + rowNro + " " + _labelText;
        });

        rowNro = rowNro + 1;

        $("#lastGridRow > td:nth-child(1) label").text(_rowText + " " + rowNro + " " + _labelText);
    }

    function updateRowNro() {

        $(".rowGridRow > td:nth-child(4) span").each(function (index) {
 
            $(this).attr("data-row", index + 1);
        });
    }

    function updateColumns() {

        updateColumnTableLabelNros();
        updateColumnNro();
    }

    function updateColumnTableLabelNros() {

        var columnNro;

        $(".columnGridRow").find("td:nth-child(1) label").each(function (index, label) {
   
            columnNro = index + 1;
            label.innerHTML = _columnText + " " + columnNro + " " + _labelText;
        });

        columnNro = columnNro + 1;

        $("#lastGridColumn > td:nth-child(1) label").text(_columnText + " " + columnNro + " " + _labelText);

    }

    function updateColumnNro() {

        $(".columnGridRow > td:nth-child(4) span").each(function (index) {

            $(this).attr("data-column", index + 1);

        });
    }


    /* append grid for development
       text = array for options/list value texts
       type = row or column
       isLastRow = "true" or "false"
       rowNro = used for grid's label creation 
     */
    function create_grid_table_row_or_column(text, type, isLastRow, rowNro) {
        //console.log("create_grid_table_row_or_column");
        var row = document.createElement("TR");

        var columnCount = 5;  //last column nro 5 is empty.

        //array for TD
        var tds = [];

        for (columnNro = 1; columnNro <= columnCount; columnNro++) {

            var td = document.createElement("TD");

            //label 1., 2. 
            if (columnNro == 1) {

                var div = document.createElement("DIV");
                div.setAttribute("class", "td1Grid");

                if (type == "row") {

                    var labelForRowItem = document.createElement("LABEL");
                    var textForRowLabel = document.createTextNode(_rowText + " " + rowNro + " " + _labelText);
                    labelForRowItem.appendChild(textForRowLabel);
                    div.appendChild(labelForRowItem);
                    td.appendChild(div);

                } else if (type == "column") {

                    var labelForColumnItem = document.createElement("LABEL");
                    var textForColumnLabel = document.createTextNode(_columnText + " " + rowNro + " " + _labelText);
                    labelForColumnItem.appendChild(textForColumnLabel);
                    div.appendChild(labelForColumnItem);
                    td.appendChild(div);
                }

                //is last row
                if (isLastRow == "true") {

                    if (type == "row") {

                        td.addEventListener("click", grid_last_row_onclick, false);

                    } else if (type == "column") {

                        td.addEventListener("click", grid_last_column_onclick, false);
                    }
                }

                tds.push(td);

            }  //td for drag & drop
            else if (columnNro == 2) {

                //is not last row
                if (isLastRow == "false") {

                    var div = document.createElement("DIV");
                    div.setAttribute("class", "td2Grid");

                    var span = document.createElement("SPAN");
                    var classes = _fieldBase._classesForSorting;
                    span.setAttribute("class", classes);

                    div.appendChild(span);
                    td.appendChild(div);
                }

                //is last row
                if (isLastRow == "true") {

                    if (type == "row") {

                        td.addEventListener("click", grid_last_row_onclick, false);

                    } else if (type == "column") {

                        td.addEventListener("click", grid_last_column_onclick, false);
                    }
                }

                tds.push(td);

            }// td for text input
            else if (columnNro == 3) {

                var input2 = document.createElement("INPUT");
                input2.setAttribute("type", "text");
                
                //last row
                if (isLastRow == "true") {

                    input2.disabled = true;         

                    if (type == "row") {

                        input2.setAttribute("value", _addRowText);

                        td.addEventListener("click", grid_last_row_onclick, false);

                    } else if (type == "column") {

                        input2.setAttribute("value", _addColumnText);

                        td.addEventListener("click", grid_last_column_onclick, false);
                    }
                } else {
                    input2.setAttribute("value", text);

                    if (type == "row") {

                        input2.addEventListener("keyup", row_key_pressed, false);

                    } else if (type == "column") {

                        input2.addEventListener("keyup", column_key_pressed, false);
                    }
                }
                td.appendChild(input2);

                tds.push(td);
            }
                //td for delete
            else if (columnNro == 4) {
                // PaintX_2_1.png

                //is not last row
                if (isLastRow == "false") {

                    var div = document.createElement("DIV");
                    div.setAttribute("class", "td4Grid");

                    var span = document.createElement("SPAN");

                    if (type == "row") {

                        span.setAttribute("class", "gridRowDelete");
                        span.setAttribute("data-row", rowNro);
                        span.addEventListener("click", delete_grid_row_onclick, false);

                    } else if (type == "column") {

                        span.setAttribute("class", "gridColumnDelete");
                        span.setAttribute("data-column", rowNro);
                        span.addEventListener("click", delete_grid_column_onclick, false);
                    }

                    var textNode = document.createTextNode("x");
                    span.appendChild(textNode);
                    div.appendChild(span);
                    td.appendChild(div);
                }


                tds.push(td);

            } else if (columnNro == 5) {
                // Empty column
                tds.push(td);
            }

        }
        //add td elements into row
        for (k = 0; k < tds.length; k++) {
            row.appendChild(tds[k]);
        }

        return row;

    }

    function row_key_pressed() {

        var str = this.parentNode.parentNode.childNodes[3].childNodes[0].childNodes[0].getAttribute("data-row");
        var rowNro = parseInt(str);
        //console.log(rowNro);
        _dataObject.updateRowText(rowNro, this.value, _fieldBase.saveDataItem);

    }

    function column_key_pressed() {

        var str = this.parentNode.parentNode.childNodes[3].childNodes[0].childNodes[0].getAttribute("data-column");
        var rowNro = parseInt(str);
        //console.log(rowNro);
        _dataObject.updateColumnText(rowNro, this.value, _fieldBase.saveDataItem);

    }

    function delete_grid_row_onclick() {

        //delete Table row
        var str = this.getAttribute("data-row");
        console.log("data-row: " + str);
        var rowNro = parseInt(str);

        _dataObject.removeRowByUsingRowNro(rowNro, _fieldBase.saveDataItem)

        //this.parentNode.parentNode.parentNode.remove();
        $("#gridRowTable").find("tr:nth-child(" + rowNro + ") ").remove();
        checkSortingAndDeleteSettingsForRowTable();
        //updateRowTableLabelNros();
        updateRows();

        if (rowNro > 1)
            rowNro = rowNro - 1;

        //the row that is moved up replacing the deleted row  has text selected 
        $("#gridRowTable").find("tr:nth-child(" + rowNro + ") > td:nth-child(3) > input").select();
    }

    function delete_grid_column_onclick() {

        //delete Table row
        var str = this.getAttribute("data-column");
        console.log("data-column: " + str);
        var columnNro = parseInt(str);

        _dataObject.removeColumnByUsingColumnNro(columnNro, _fieldBase.saveDataItem);

        //this.parentNode.parentNode.parentNode.remove();
        $("#gridColumnTable").find("tr:nth-child(" + columnNro + ") ").remove();
        checkSortingAndDeleteSettingsForColumnTable();
        //updateColumnTableLabelNros();
        updateColumns();

        if (columnNro > 1)
            columnNro = columnNro - 1;

        $("#gridColumnTable").find("tr:nth-child(" + columnNro + ") > td:nth-child(3) > input").select();
    }

    function grid_last_row_onclick() {

        var rowNumber = _data.rowsText.length + 1;

        var rowText = _rowText + " " + rowNumber;

        _dataObject.addRow(rowText, _fieldBase.saveDataItem);

        new_row = create_grid_table_row_or_column(rowText, "row", "false", rowNumber);

        new_row.setAttribute("class", "rowGridRow");

        $("#lastGridRow").before(new_row);

        checkSortingAndDeleteSettingsForRowTable();
        updateRowTableLabelNros();

        //select text for added row's input field
        $("#gridRowTable").find("tr:nth-child(" + rowNumber + ") > td:nth-child(3) > input").select();

    }

    function grid_last_column_onclick() {

        var columnNumber = _data.columnsText.length + 1;

        var columnText = _columnText + " " + columnNumber;

        _dataObject.addColumn(columnText, _fieldBase.saveDataItem);

        new_row = create_grid_table_row_or_column(columnText, "column", "false", columnNumber);

        new_row.setAttribute("class", "columnGridRow");


        $("#lastGridColumn").before(new_row);

        checkSortingAndDeleteSettingsForColumnTable();
        updateColumnTableLabelNros();

        //select text for added columns's input field
        $("#gridColumnTable").find("tr:nth-child(" + columnNumber + ") > td:nth-child(3) > input").select();

    }

    function renderCompletedView() {

        $(_formBuilderIdentifier).append("<p>Grid</p>");
    }

    function getCompletedView() {

        _data = _dataObject.getDataItemObj();

        var table = document.createElement("table");
        table.setAttribute("class", "c-view-grid-table");

        var thead = document.createElement("thead");

        var tr_1 = document.createElement("tr");
        tr_1.setAttribute("class", "c-view-grid-tr");

        var columnWidth;

        columnWidth = Math.round( 650 / _data.columnsText.length);

        if (columnWidth > 100)
            columnWidth = 90;

        // add headers
        //start from 0 to accomodate row label (column) text
        for (columnNro = 0; columnNro <= _data.columnsText.length; columnNro++) {

            var td = document.createElement("td");         

            if (columnNro >= 1) {
                var div = document.createElement("div");

                var objectKey = "column-" + columnNro;
                var optionText = _data.columnsText[columnNro - 1][objectKey];
                div.innerText = optionText;

                //div.setAttribute("class", "c-view-grid-column");

                td.appendChild(div);

                //if (_data.columnsText.length > 6) {

                    td.width = columnWidth;

                //}

            //    th.style.width = colWidth + "%";
            }
            tr_1.appendChild(td);
        }

        thead.appendChild(tr_1);
        table.appendChild(thead);

        var tbody = document.createElement("tbody");

        for (rowNro = 1; rowNro <= _data.rowsText.length; rowNro++) {

            var tr = document.createElement("tr");
            tr.setAttribute("class", "c-view-grid-tr");

            //start from 0 to accomodate row label (column)
            for (columnNro = 0; columnNro <= _data.columnsText.length; columnNro++) {


                var td = document.createElement("td");

                if (columnNro === 0) {

                    var div = document.createElement("div");
                    var objectKey = "row-" + rowNro;
                    var optionText = _data.rowsText[rowNro - 1][objectKey];
                    div.innerText = optionText;

                    td.appendChild(div);

                } else if (columnNro >= 1) {

                    var inputRadio = document.createElement("INPUT");
                    inputRadio.setAttribute("type", "radio");
                    inputRadio.addEventListener('click', stopDefAction, false);
                    inputRadio.setAttribute("class","c-view-grid-column");

                    td.appendChild(inputRadio);
                    td.width = columnWidth;
                
                }

                tr.appendChild(td);
             
            }

            tbody.appendChild(tr);     
        }

        table.appendChild(tbody);

        var div = _fieldBase.addGeneralFieldsToCompletedView("grid", table, _dataObject);

        return div;
    }

    function getBootstrapView(orderNro) {

        _data = _dataObject.getDataItemObj();

        var table = document.createElement("table");
        table.setAttribute("class", "table table-striped");

        var thead = document.createElement("thead");

        var tr_1 = document.createElement("tr");
        //tr_1.setAttribute("class", "c-view-grid-tr");

        var columnWidth;

        columnWidth = Math.round(650 / _data.columnsText.length);

        if (columnWidth > 100)
            columnWidth = 90;

        // add headers
        //start from 0 to accomodate row label (column) text
        for (columnNro = 0; columnNro <= _data.columnsText.length; columnNro++) {

            var td = document.createElement("td");
            

            if (columnNro >= 1) {
                //var div = document.createElement("div");

                var objectKey = "column-" + columnNro;
                var optionText = _data.columnsText[columnNro - 1][objectKey];
                td.innerText = optionText;

                td.setAttribute("class", "text-center");
                //td.width = columnWidth;
            }
            tr_1.appendChild(td);
        }

        thead.appendChild(tr_1);
        table.appendChild(thead);

        var tbody = document.createElement("tbody");

        for (rowNro = 1; rowNro <= _data.rowsText.length; rowNro++) {

            var tr = document.createElement("tr");
            //tr.setAttribute("class", "c-view-grid-tr");

            //start from 0 to accomodate row label (column)
            for (columnNro = 0; columnNro <= _data.columnsText.length; columnNro++) {

                var td = document.createElement("td");
               

                if (columnNro === 0) {

                    //var div = document.createElement("div");
                    var objectKey = "row-" + rowNro;
                    var optionText = _data.rowsText[rowNro - 1][objectKey];
                    td.innerText = optionText;

                    //td.appendChild(div);

                } else if (columnNro >= 1) {

                    var inputRadio = document.createElement("INPUT");
                    inputRadio.setAttribute("type", "radio");
                    //inputRadio.addEventListener('click', stopDefAction, false);
                    //inputRadio.setAttribute("class", "c-view-grid-column");
                    inputRadio.setAttribute("name", "group_" + orderNro + " row_" + rowNro);


                    td.appendChild(inputRadio);
                   
                    td.setAttribute("class", "text-center");
                    //td.width = columnWidth;
                }

                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        }

        table.appendChild(tbody);

        var div = _fieldBase.addGeneralFieldsToBootstrapForm("grid", table, _dataObject);

        return div;

    };

    function stopDefAction(evt) {
        evt.preventDefault();
    }

}