
function HeaderData() {

    var _data;

    this.initialize = initialize;
    this.getDataItemObj = getDataItemObj;

    this.setHeaderText = setHeaderText;
    this.setDescriptionText = setDescriptionText;

    function initialize(type, data, callback) {

        var headerText = "";
        var descriptionText = "";

        if (data) {

            (data.headerText === undefined) ? headerText = "" : headerText = data.headerText;

            (data.descriptionText === undefined) ? descriptionText = "" : descriptionText = data.descriptionText;
        }

        _data = {
            "type": type,
            "headerText": headerText,
            "descriptionText": descriptionText
        };

        this.callback(callback, _data);
    }

    function getDataItemObj() {
        return _data;
    }

    function setHeaderText(text, callback) {
        _data.headerText = text;
        this.parent.callback(callback, _data);
    }

    function setDescriptionText(text, callback) {
        _data.descriptionText = text;
        this.parent.callback(callback, _data);
    }
}

HeaderData.inheritsFrom(DataBase);

