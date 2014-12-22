
function GeneralData() {

    this._data;
}

GeneralData.inheritsFrom(DataBase);

//Initialize
GeneralData.prototype.initialize = function(type, data, callback) {

    //title
    var title = "";
    var helpText = "";
    var requiredQuestion = "";

    if (data) {
        (!data.title) ? title = "" : title = data.title;

        //helpText 
        (!data.helpText) ? helpText = "" : helpText = data.helpText;

        // requiredQuestion
        (data.requiredQuestion === undefined) ? requiredQuestion = false : requiredQuestion = data.requiredQuestion;
    }

    _data = {
        "type": type,
        "title": title,
        "helpText": helpText,
        "requiredQuestion": requiredQuestion
    };

   
    this.parent.callback(callback, _data);
}

GeneralData.prototype.getDataItemObj = function () {

    return _data;

}

GeneralData.prototype.setTitle = function (text, callback) {
    _data.title = text;
    this.parent.callback(callback, _data);
}

//Update HelpText
GeneralData.prototype.setHelpText = function(text, callback) {
    _data.helpText = text;
    this.parent.callback(callback, _data);
}


GeneralData.prototype.setRequiredQuestion = function(requiredQuestion, callback) {
    _data.requiredQuestion = requiredQuestion;
    this.parent.callback(callback, _data);

}

