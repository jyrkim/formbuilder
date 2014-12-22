
function TimeData() {

    var _data;

    this.initialize = initialize;
    this.getDataItemObj = getDataItemObj;
    this.setTitle = setTitle;
    this.setHelpText = setHelpText;
    this.setRequiredQuestion = setRequiredQuestion;

    this.setDurationMode = setDurationMode;

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
            "type": "timeField",
            "title": title,
            "helpText": helpText,
            "requiredQuestion": requiredQuestion
        };

        if (data === undefined) {
            _data.durationMode = false;

        } else {
            var durationMode = false;

            (data.durationMode === undefined) ? durationMode = false : durationMode = data.durationMode;

            _data.durationMode = durationMode;
        }

        this.callback(callback, _data);
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

    function getDataItemObj() {

        return _data;
    }

    function setDurationMode(durationMode, callback) {

        _data.durationMode = durationMode;
        this.callback(callback, _data);

    }
 
}

TimeData.inheritsFrom(DataBase);

