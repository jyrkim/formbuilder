
function TextFieldData() {

    var _data;

    this.initialize = initialize;
    this.getDataItemObj = getDataItemObj;
    this.setTitle = setTitle;
    this.setHelpText = setHelpText;
    this.setRequiredQuestion = setRequiredQuestion;

    this.setDataValidation = setDataValidation;
    this.setValidationType = setValidationType;

    this.setNumberValidationType = setNumberValidationType;
    this.setNumberValidationNumber = setNumberValidationNumber;
    this.setNumberValidationNumber_2nd = setNumberValidationNumber_2nd;

    this.setTextValidationType = setTextValidationType;
    this.setTextValidationText = setTextValidationText;

    this.setRegExpValidationType = setRegExpValidationType;
    this.setRegExpValidationPattern = setRegExpValidationPattern;

    this.setErrorText = setErrorText;

    function initialize(type, data, callback) {

        //console.log(data);

        //this.parent.initialize(type, data, callback);

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
            "type": "textField",
            "title": title,
            "helpText": helpText,
            "requiredQuestion": requiredQuestion
        };

        var advSettingsUndefined = false;

        try {
            data.advancedSettings;

            data.advancedSettings.validationType.length;

            if (data.type !== "textField") {
                advSettingsUndefined = true;
            }
        }
        catch (e) {
            advSettingsUndefined = true;
        }

        //console.log("advSettingsUndefined: " + advSettingsUndefined)

        //initialize _data object
        if (advSettingsUndefined) {
            // console.log(" TextField Data: initialize: data === undefined");
            var advancedSettings = {
                "dataValidation": false,
                "validationType": "",
                "numberValidation": { "type": "", "number": "", "number_2nd": "" },
                "textValidation": { "type": "", "text": "" },
                "regExpValidation": { "type": "", "pattern": "" },
                "errorText": ""
            };

        } else {
            //console.log(" TextField Data: initialize: else");

            // dataValidation
            var dataValidation;
            (data.advancedSettings.dataValidation === undefined) ? dataValidation = false : dataValidation = data.advancedSettings.dataValidation;

            //validationType
            var validationType;
            (data.advancedSettings.validationType === undefined) ? validationType = "" : validationType = data.advancedSettings.validationType;

            //numberValidation
            var numberValidation = "";
            var numberType = "";
            var number = "";
            var number_2nd = "";

            (data.advancedSettings.numberValidation === undefined) ? numberValidation = "" : numberValidation = data.advancedSettings.numberValidation;

            (data.advancedSettings.numberValidation.type === undefined) ? numberType = "" : numberType = data.advancedSettings.numberValidation.type;

            (data.advancedSettings.numberValidation.number === undefined) ? number = "" : number = data.advancedSettings.numberValidation.number;

            (data.advancedSettings.numberValidation.number_2nd === undefined) ? number_2nd = "" : number_2nd = data.advancedSettings.numberValidation.number_2nd;

            var textValidation = "";

            var textType = "";

            var text = "";

            //textValidation

            (data.advancedSettings.textValidation === undefined) ? textValidation = "" : textValidation = data.advancedSettings.textValidation;

            (data.advancedSettings.textValidation.type === undefined) ? textType = "" : textType = data.advancedSettings.textValidation.type;

            (data.advancedSettings.textValidation.text === undefined) ? text = "" : text = data.advancedSettings.textValidation.text;

            // reg exp
            var regExpValidation = "";
            var regExpType = "";
            var pattern = "";

            (data.advancedSettings.regExpValidation === undefined) ? regExpValidation = "" : regExpValidation = data.advancedSettings.regExpValidation;

            (data.advancedSettings.regExpValidation.type === undefined) ? regExpType = "" : regExpType = data.advancedSettings.regExpValidation.type;

            (data.advancedSettings.regExpValidation.pattern === undefined) ? pattern = "" : pattern = data.advancedSettings.regExpValidation.pattern;

            //errorText
            var errorText;
            (data.advancedSettings.errorText === undefined) ? errorText = "" : errorText = data.advancedSettings.errorText;

            var advancedSettings = {
                "dataValidation": dataValidation,
                "validationType": validationType,
                "numberValidation": { "type": numberType, "number": number, "number_2nd": number_2nd },
                "textValidation": { "type": textType, "text": text },
                "regExpValidation": { "type": regExpType, "pattern": pattern },
                "errorText": errorText
            };
        }

        _data.advancedSettings = advancedSettings

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

    function setDataValidation(use, callback) {

        _data.advancedSettings.dataValidation = use;
        this.callback(callback, _data);
    }

    function setValidationType(type, callback) {

        _data.advancedSettings.validationType = type;
        this.callback(callback, _data);
    }

    function setNumberValidationType(type, callback) {

        _data.advancedSettings.numberValidation.type = type;
        this.callback(callback, _data);
    }

    function setNumberValidationNumber(number, callback) {

        _data.advancedSettings.numberValidation.number = number;
        this.callback(callback, _data);
    }

    function setNumberValidationNumber_2nd(number, callback) {

        _data.advancedSettings.numberValidation.number_2nd = number;
        this.callback(callback, _data);
    }

    function setTextValidationType(type, callback) {

        _data.advancedSettings.textValidation.type = type;
        this.callback(callback, _data);

    }

    function setTextValidationText(text, callback) {

        _data.advancedSettings.textValidation.text = text;
        this.callback(callback, _data);

    }

    function setRegExpValidationType(type, callback) {

        _data.advancedSettings.regExpValidation.type = type;
        this.callback(callback, _data);

    }

    function setRegExpValidationPattern(pattern, callback) {

        _data.advancedSettings.regExpValidation.pattern = pattern;
        this.callback(callback, _data);

    }

    function setErrorText(text, callback) {

        _data.advancedSettings.errorText = text;
        this.callback(callback, _data);

    }
}

TextFieldData.inheritsFrom(DataBase);

/*
TextFieldData.prototype.initialize = function (type, data, callback) {

    console.log(data);

    this.parent.initialize(type, data, callback);

    var advSettingsUndefined = false;

    try {
        data.advancedSettings;

        data.advancedSettings.validationType.length;

        if (data.type !== "textField") {
            advSettingsUndefined = true;
        }

    } catch (e) { advSettingsUndefined = true; console.log("Exception") }

    console.log("advSettingsUndefined: " + advSettingsUndefined)

    //initialize _data object
    if (advSettingsUndefined) {
       // console.log(" TextField Data: initialize: data === undefined");
        var advancedSettings = {
            "dataValidation": false,
            "validationType": "",
            "numberValidation": { "type": "", "number": "", "number_2nd": "" },
            "textValidation": { "type": "", "text": "" },
            "regExpValidation": { "type": "", "pattern": "" },
            "errorText": ""
        };

    } else {
        console.log(" TextField Data: initialize: else");

        // dataValidation
        var dataValidation;
        (data.advancedSettings.dataValidation === undefined) ? dataValidation = false : dataValidation = data.advancedSettings.dataValidation;

        //validationType
        var validationType;
        (data.advancedSettings.validationType === undefined) ? validationType = "" : validationType = data.advancedSettings.validationType;

        //numberValidation
        var numberValidation = "";
        var numberType = "";
        var number = "";
        var number_2nd = "";

        (data.advancedSettings.numberValidation === undefined) ? numberValidation = "" : numberValidation = data.advancedSettings.numberValidation;

        (data.advancedSettings.numberValidation.type === undefined) ? numberType = "" : numberType = data.advancedSettings.numberValidation.type;

        (data.advancedSettings.numberValidation.number === undefined) ? number = "" : number = data.advancedSettings.numberValidation.number;

        (data.advancedSettings.numberValidation.number_2nd === undefined) ? number_2nd = "" : number_2nd = data.advancedSettings.numberValidation.number_2nd;

        var textValidation = "";

        var textType = "";

        var text = "";

        //textValidation

        (data.advancedSettings.textValidation === undefined) ? textValidation = "" : textValidation = data.advancedSettings.textValidation;

        (data.advancedSettings.textValidation.type === undefined) ? textType = "" : textType = data.advancedSettings.textValidation.type;

        (data.advancedSettings.textValidation.text === undefined) ? text = "" : text = data.advancedSettings.textValidation.text;

        // reg exp
        var regExpValidation = "";
        var regExpType = "";
        var pattern = "";

        (data.advancedSettings.regExpValidation === undefined) ? regExpValidation = "" : regExpValidation = data.advancedSettings.regExpValidation;

        (data.advancedSettings.regExpValidation.type === undefined) ? regExpType = "" : regExpType = data.advancedSettings.regExpValidation.type;

        (data.advancedSettings.regExpValidation.pattern === undefined) ? pattern = "" : pattern = data.advancedSettings.regExpValidation.pattern;

        //errorText
        var errorText;
        (data.advancedSettings.errorText === undefined) ? errorText = "" : errorText = data.advancedSettings.errorText;

        var advancedSettings = {
            "dataValidation": dataValidation,
            "validationType": validationType,
            "numberValidation": { "type": numberType, "number": number, "number_2nd": number_2nd },
            "textValidation": { "type": textType, "text": text },
            "regExpValidation": { "type": regExpType, "pattern": pattern },
            "errorText": errorText
        };

    }
    //data.advancedData = advancedData;

    this.getDataItemObj().type = "textField";

    this.getDataItemObj().advancedSettings = advancedSettings

    this.callback(callback, this.parent.getDataItemObj());

}

//use dataValidation 
TextFieldData.prototype.setDataValidation = function(use, callback) {

    var data = this.getDataItemObj();
    data.advancedSettings.dataValidation = use;
    this.callback(callback, data);

}

TextFieldData.prototype.setValidationType = function(type, callback) {

    var data = this.getDataItemObj();
    data.advancedSettings.validationType = type;
    this.callback(callback, data);

}

//number validation 
TextFieldData.prototype.setNumberValidationType = function(type, callback) {

    var data = this.getDataItemObj();
    data.advancedSettings.numberValidation.type = type;
    this.callback(callback, data);

}

TextFieldData.prototype.setNumberValidationNumber = function(number, callback) {

    var data = this.getDataItemObj();
    data.advancedSettings.numberValidation.number = number;
    this.callback(callback, data);

}

TextFieldData.prototype.setNumberValidationNumber_2nd = function (number, callback) {

    var data = this.getDataItemObj();
    data.advancedSettings.numberValidation.number_2nd = number;
    this.callback(callback, data);

}

//text validation 
TextFieldData.prototype.setTextValidationType = function (type, callback) {

    var data = this.getDataItemObj();
    data.advancedSettings.textValidation.type = type;
    this.callback(callback, data);

}

TextFieldData.prototype.setTextValidationText = function (text, callback) {

    var data = this.getDataItemObj();
    data.advancedSettings.textValidation.text = text;
    this.callback(callback, data);

}

//Regular Expression validation 
TextFieldData.prototype.setRegExpValidationType = function (type, callback) {

    var data = this.getDataItemObj();
    data.advancedSettings.regExpValidation.type = type;
    this.callback(callback, data);

}

TextFieldData.prototype.setRegExpValidationPattern = function (pattern, callback) {

    var data = this.getDataItemObj();
    data.advancedSettings.regExpValidation.pattern = pattern;
    this.callback(callback, data);

}

TextFieldData.prototype.setErrorText = function (text, callback) {

    var data = this.getDataItemObj();
    data.advancedSettings.errorText = text;
    this.callback(callback, data);

}
*/