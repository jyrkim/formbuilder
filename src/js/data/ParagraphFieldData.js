
function ParagraphFieldData() {

    var _data;

    this.initialize = initialize;
    this.getDataItemObj = getDataItemObj;
    this.setTitle = setTitle;
    this.setHelpText = setHelpText;
    this.setRequiredQuestion = setRequiredQuestion;

    this.setDataValidation = setDataValidation;
    this.setValidationType = setValidationType;

    this.setTextValidationType = setTextValidationType;
    this.setTextValidationCharCount = setTextValidationCharCount;

    this.setRegExpValidationType = setRegExpValidationType;
    this.setRegExpValidationPattern = setRegExpValidationPattern;

    this.setErrorText = setErrorText;

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
            "type": "paragraphField",
            "title": title,
            "helpText": helpText,
            "requiredQuestion": requiredQuestion
        };


        var advSettingsUndefined = false;

        try {
            data.advancedSettings;

            data.advancedSettings.validationType.length;

            if (data.type !== "paragraphField") {
                advSettingsUndefined = true;
            }

        } catch (e) { advSettingsUndefined = true; }

        //initialize _data object
        if (advSettingsUndefined) {
            //console.log(" ParagraphField Data: initialize: data === undefined");
            var advancedSettings = {
                "dataValidation": false,
                "validationType": "",
                "textValidation": { "type": "", "charCount": "" },
                "regExpValidation": { "type": "", "pattern": "" },
                "errorText": ""
            };

        } else {
            //console.log(" ParagraphField Data: initialize: else");
            // dataValidation
            var dataValidation;
            (data.advancedSettings.dataValidation === undefined) ? dataValidation = false : dataValidation = data.advancedSettings.dataValidation;

            //validationType
            var validationType;
            (data.advancedSettings.validationType === undefined) ? validationType = "" : validationType = data.advancedSettings.validationType;

            var textValidation = "";

            var textType = "";

            var charCount = "";

            //textValidation

            (data.advancedSettings.textValidation === undefined) ? textValidation = "" : textValidation = data.advancedSettings.textValidation;

            (data.advancedSettings.textValidation.type === undefined) ? textType = "" : textType = data.advancedSettings.textValidation.type;

            (data.advancedSettings.textValidation.charCount === undefined) ? charCount = "" : charCount = data.advancedSettings.textValidation.charCount;

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
                "textValidation": { "type": textType, "charCount": charCount },
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


    function setTextValidationType(type, callback) {

        _data.advancedSettings.textValidation.type = type;
        this.callback(callback, _data);

    }

    function setTextValidationCharCount(charCount, callback) {

        _data.advancedSettings.textValidation.charCount = charCount;
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

ParagraphFieldData.inheritsFrom(DataBase);
