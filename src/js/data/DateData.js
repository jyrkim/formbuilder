
function DateData() {

    var _data;

    this.initialize = initialize;
    this.getDataItemObj = getDataItemObj;
    this.setTitle = setTitle;
    this.setHelpText = setHelpText;
    this.setRequiredQuestion = setRequiredQuestion;

    this.setIncludeYear = setIncludeYear;
    this.setIncludeTime = setIncludeTime;

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
            "type": "dateField",
            "title": title,
            "helpText": helpText,
            "requiredQuestion": requiredQuestion
        };

        if (data === undefined) {
            _data.includeYear = true;
            _data.includeTime = false;

        } else {
            var includeYear;
            (data.includeYear === undefined) ? includeYear = true : includeYear = data.includeYear;

            var includeTime;
            (data.includeTime === undefined) ? includeTime = false : includeTime = data.includeTime;

            _data.includeYear = includeYear;
            _data.includeTime = includeTime;
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

    function setIncludeYear(includeYear, callback) {

        _data.includeYear = includeYear;
        this.callback(callback, _data);

    }

    function setIncludeTime(includeTime, callback) {

        _data.includeTime = includeTime;
        this.callback(callback, _data);

    }
 
}

DateData.inheritsFrom(DataBase);

