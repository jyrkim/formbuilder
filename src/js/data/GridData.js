
function GridData() {

    var _data;

    var _rowText = "Row";
    var _columnText = "Column";

    this.initialize = initialize;
    this.getDataItemObj = getDataItemObj;
    this.setTitle = setTitle;
    this.setHelpText = setHelpText;
    this.setRow = setRow;
    this.setRequiredQuestion = setRequiredQuestion;
    this.limitOneResponsePerColumn = limitOneResponsePerColumn;
    this.setErrorText = setErrorText;
    this.shuffleOrder = shuffleOrder;
    this.addColumn = addColumn;
    this.updateColumnText = updateColumnText;
    this.updateColumnsTextArray = updateColumnsTextArray;
    this.moveColumnText = moveColumnText;
    this.removeColumnByUsingIndex = removeColumnByUsingIndex;
    this.removeColumnByUsingColumnNro = removeColumnByUsingColumnNro;

    this.addRow = addRow;
    this.updateRowText = updateRowText;
    this.updateRowsTextArray = updateRowsTextArray;
    this.moveRowText = moveRowText;
    this.removeRowByUsingIndex = removeRowByUsingIndex;
    this.removeRowByUsingRowNro = removeRowByUsingRowNro;

    function initialize(type, data, callback) {

        //console.log("Data: initialize:");
        //initialize _data object
        if (data === undefined) {
            //  console.log(" Data: initialize: data === undefined");
            _data = {
                "type": "grid",
                "title": "",
                "helpText": "",
                "columnsText": [],
                "rowsText": [],
                "requiredQuestion": false
            };

            var column = {};
            column["column-1"] = _columnText + " 1";
            _data.columnsText.push(column);

            var row = {};
            row["row-1"] = _rowText + " 1";

            _data.rowsText.push(row);

            advancedSettings = {
                "limitOneResponsePerColumn": false,
                "errorText": "",
                "shuffleOrder": false
            };

            _data.advancedSettings = advancedSettings;

        } else {
            //console.log("Data: initialize: else");

            //title
            var title;
            (!data.title) ? title = "" : title = data.title;

            //helpText
            var helpText;
            (!data.helpText) ? helpText = "" : helpText = data.helpText;

            // requiredQuestion
            var requiredQuestion;
            (data.requiredQuestion === undefined) ? requiredQuestion = false : requiredQuestion = data.requiredQuestion;

            _data = {
                "type": "grid",
                "title": title,
                "helpText": helpText,
                "columnsText": [],
                "rowsText": [],
                "requiredQuestion": requiredQuestion
            };

            if (data.type == "grid") {
                _data.columnsText = data.columnsText.slice();
                _data.rowsText = data.rowsText.slice();

                var limit;
                (data.advancedSettings.limitOneResponsePerColumn === undefined) ? limit = "" : limit = data.advancedSettings.limitOneResponsePerColumn;

                var errorText;
                (data.advancedSettings.errorText === undefined) ? errorText = "" : errorText = data.advancedSettings.errorText;

                var shuffleOrder;
                (data.advancedSettings.shuffleOrder === undefined) ? shuffleOrder = false : shuffleOrder = data.advancedSettings.shuffleOrder;

                advancedSettings = {
                    "limitOneResponsePerColumn": limit,
                    "errorText": errorText,
                    "shuffleOrder": shuffleOrder
                };

                _data.advancedSettings = advancedSettings;

            } else {
                var column = {};
                column["column-1"] = _columnText + " 1";
                _data.columnsText.push(column);

                var row = {};
                row["row-1"] = _rowText + " 1";
                _data.rowsText.push(row);

                advancedSettings = {
                    "limitOneResponsePerColumn": false,
                    "errorText": "",
                    "shuffleOrder": false
                };

                _data.advancedSettings = advancedSettings;
            }

        }
    
        this.parent.callback(callback, _data);
    }

    function getDataItemObj() {

        return _data;
    }

    function setTitle(text, callback) {
        _data.title = text;
        this.callback(callback, _data);
    }

    function setHelpText(text, callback) {
        _data.helpText = text;
        this.callback(callback, _data);
    }

    function setRow(text, callback) {
        _data.row = text;
        this.callback(callback, _data);

    }

    function setUseOther(useOther, callback) {
        _data.useOther = useOther;
        this.callback(callback, _data);

    }

    function setRequiredQuestion(requiredQuestion, callback) {
        _data.requiredQuestion = requiredQuestion;
        this.callback(callback, _data);

    }

    function limitOneResponsePerColumn(value, callback) {

        _data.advancedSettings.limitOneResponsePerColumn = value;
        this.callback(callback, _data);

    }

    function setErrorText(text, callback) {

        _data.advancedSettings.errorText = text;
        this.callback(callback, _data);

    }

    function shuffleOrder(value, callback) {

        _data.advancedSettings.shuffleOrder = value;
        this.callback(callback, _data);

    }

    //Add Row Text Item
    function addColumn(columnText, callback) {

        var size = _data.columnsText.length;

        var columnNumber = size + 1;

        var column = {};

        column["column-" + columnNumber] = columnText;

        _data.columnsText.push(column);

        this.callback(callback, _data);

    }

    function updateColumnText(rowNumber, value, callback) {

        var columnKey = "column-" + rowNumber;

        _data.columnsText[(rowNumber - 1)][columnKey] = value

        this.callback(callback, _data);

    }

    function updateColumnsTextArray(from, to) {

        from = parseInt(from);

        to = parseInt(to);

        if (from < to) {

            while (from < to) {
                //to value copy
                var copyValue = _data.columnsText[(from + 1)]["column-" + (from + 2)];

                //set from value to new position
                var columnKey = "column-" + (from + 2);
                _data.columnsText[(from + 1)][columnKey] = _data.columnsText[from]["column-" + (from + 1)];

                //set copy value to new position
                var columnKey2 = "column-" + (from + 1);
                var column2 = {};
                column2[columnKey2] = copyValue;

                _data.columnsText[from][columnKey2] = copyValue

                from = from + 1;

            }
        } else if (from > to) {

            while (from > to) {
                //to value copy
                var copyValue = _data.columnsText[(from - 1)]["column-" + from];

                //set from value to new position
                var columnKey = "column-" + from;
                var column = {};

                _data.columnsText[(from - 1)][columnKey] = _data.columnsText[from]["column-" + (from + 1)];

                //set copy value to new position
                var columnKey2 = "column-" + (from + 1);
                var column2 = {};

                _data.columnsText[from][columnKey2] = copyValue

                from = from - 1;
            }
        }
    }

    function getValue(text) {

        var indexOf = text.indexOf('":"') + 3;
        text = text.substr(indexOf);
        text = text.substr(0, text.length - 2);
        return text
    }

    // updatedColumnsTexts -> array of column's text
    function moveColumnText(from, to, callback) {

        this.updateColumnsTextArray(from, to);

        this.callback(callback, _data);

    }

    //Remove Column Text Item, based on columnNro (it's order in the view)
    function removeColumnByUsingIndex(index, callback) {

        _data.columnsText.splice(index, 1);

        this.callback(callback, _data);

    }

    //Remove Column Text Item, based on columnNro (it's order in the view)
    function removeColumnByUsingColumnNro(colNro, callback) {

        this.moveColumnText((colNro - 1), (_data.columnsText.length - 1));

        _data.columnsText.splice((_data.columnsText.length - 1), 1);

        this.callback(callback, _data);

    }

    //Add Row Text Item
    function addRow(rowText, callback) {

        var size = _data.rowsText.length;

        var rowNumber = size + 1;

        var row = {};

        row["row-" + rowNumber] = rowText;

        _data.rowsText.push(row);


        this.callback(callback, _data);

    }

    function updateRowText(rowNumber, value, callback) {
     
        var rowKey = "row-" + rowNumber;

        _data.rowsText[(rowNumber - 1)][rowKey] = value

        this.callback(callback, _data);
    }

    function updateRowsTextArray(from, to) {

        from = parseInt(from);

        to = parseInt(to);

        if (from < to) {

            while (from < to) {
                //to value copy
                var copyValue = _data.rowsText[(from + 1)]["row-" + (from + 2)];

                //set from value to new position
                var rowKey = "row-" + (from + 2);
                _data.rowsText[(from + 1)][rowKey] = _data.rowsText[from]["row-" + (from + 1)];

                //set copy value to new position
                var rowKey2 = "row-" + (from + 1);
                var row2 = {};
                row2[rowKey2] = copyValue;

                _data.rowsText[from][rowKey2] = copyValue

                from= from+ 1;

            }
        } else if (from > to) {

            while (from > to) {
                //to value copy
                var copyValue = _data.rowsText[(from - 1)]["row-" + from];

                //set from value to new position
                var rowKey = "row-" + from

                _data.rowsText[(from - 1)][rowKey] = _data.rowsText[from]["row-" + (from + 1)];

                //set copy value to new position
                var rowKey2 = "row-" + (from + 1);

                _data.rowsText[from][rowKey2] = copyValue

                from = from - 1;
            }
        }
    }

    // updatedRowsTexts -> array of row's text
    function moveRowText(from, to, callback) {

        this.updateRowsTextArray(from, to);

        this.callback(callback, _data);

    }

    //Remove Row Text Item, based on rowNro (it's order in the view)
    function removeRowByUsingIndex(index, callback) {

        _data.rowsText.splice(index, 1);

        this.callback(callback, _data);
    }

    //Remove Row Text Item, based on rowNro (it's order in the view)
    function removeRowByUsingRowNro(rowNro, callback) {

        this.moveRowText((rowNro - 1), (_data.rowsText.length - 1));

        _data.rowsText.splice((_data.rowsText.length - 1), 1);

        this.callback(callback, _data);

    }

}

GridData.inheritsFrom(DataBase);

