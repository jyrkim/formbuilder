
function ScaleData() {

    var _data;

    this.initialize = initialize;
    this.getDataItemObj = getDataItemObj;
    this.setTitle = setTitle;
    this.setHelpText = setHelpText;
    this.setRequiredQuestion = setRequiredQuestion;

    this.setFrom = setFrom;
    this.setTo = setTo;
    this.setFromLabel = setFromLabel;
    this.setToLabel = setToLabel;

    function initialize(type, data, callback) {

        var title = "";
        var helpText = "";
        var requiredQuestion = false;

        if (data) {
            (!data.title) ? title = "" : title = data.title;

            //helpText 
            (!data.helpText) ? helpText = "" : helpText = data.helpText;

            // requiredQuestion
            (data.requiredQuestion === undefined) ? requiredQuestion = false : requiredQuestion = data.requiredQuestion;
        }

        _data = {
            "type": "scaleField",
            "title": title,
            "helpText": helpText,
            "requiredQuestion": requiredQuestion
        };


        if (data === undefined) {

            _data.from = 1;
            _data.to = 5;
            _data.fromLabel = "";
            _data.toLabel = "";

        } else {

            var from;
            (data.from === undefined) ? from = 1 : from = data.from;

            var to;
            (data.to === undefined) ? to = 5 : to = data.to;

            var fromLabel;
            (data.fromLabel === undefined) ? fromLabel = "" : fromLabel = data.fromLabel;

            var toLabel;
            (data.toLabel === undefined) ? toLabel = "" : toLabel = data.toLabel;

            _data.from = from;
            _data.to = to;
            _data.fromLabel = fromLabel;
            _data.toLabel = toLabel;
        }


        this.callback(callback, _data);
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


    function setRequiredQuestion(requiredQuestion, callback) {
        _data.requiredQuestion = requiredQuestion;
        this.callback(callback, _data);
    }

    //set from value 
    function setFrom(from, callback) {

        _data.from = from;
        this.callback(callback, _data);
    }

    function setTo(to, callback) {

        _data.to = to;
        this.callback(callback, _data);
    }

    function setFromLabel(label, callback) {

        _data.fromLabel = label;
        this.callback(callback, _data);
    }

    function setToLabel(label, callback) {

        _data.toLabel = label;
        this.callback(callback, _data);
    }
 
}

ScaleData.inheritsFrom(DataBase);

/*
ScaleData.prototype.initialize = function (type, data, callback) {


    this.parent.initialize(type, data, callback);

    var advSettingsUndefined = false;

    if (data === undefined) {

        this.getDataItemObj().from = 1;
        this.getDataItemObj().to = 5;
        this.getDataItemObj().fromLabel = "";
        this.getDataItemObj().toLabel = "";


    } else {

        var from;
        (data.from === undefined) ? from = 1 : from = data.from;

        var to;
        (data.to === undefined) ? to = 5 : to = data.to;

        var fromLabel;
        (data.fromLabel === undefined) ? fromLabel = "" : fromLabel = data.fromLabel;

        var toLabel;
        (data.toLabel === undefined) ? toLabel = "" : toLabel = data.toLabel;

        this.getDataItemObj().from = from;
        this.getDataItemObj().to = to;
        this.getDataItemObj().fromLabel = fromLabel;
        this.getDataItemObj().toLabel = toLabel;
    }

    delete this.getDataItemObj().label;

    this.getDataItemObj().type = "scaleField";

    this.callback(callback, this.parent.getDataItemObj());

}

//set from value 
ScaleData.prototype.setFrom = function (from, callback) {

    var data = this.getDataItemObj();
    data.from = from;
    this.callback(callback, data);

}

ScaleData.prototype.setTo = function (to, callback) {

    var data = this.getDataItemObj();
    data.to = to;
    this.callback(callback, data);

}
 
ScaleData.prototype.setFromLabel = function (label, callback) {

    var data = this.getDataItemObj();
    data.fromLabel = label;
    this.callback(callback, data);

}

ScaleData.prototype.setToLabel = function (label, callback) {

    var data = this.getDataItemObj();
    data.toLabel = label;
    this.callback(callback, data);

}
*/