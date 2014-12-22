
function MultiChoiceData() {

    var _data;

    this.initialize = initialize;
    this.getDataItemObj = getDataItemObj;
    this.setTitle = setTitle;
    this.setHelpText = setHelpText;
    this.setRequiredQuestion = setRequiredQuestion;
    this.addOption = addOption;

    this.updateOptionText = updateOptionText;
    this.updateOptionsTextArray = updateOptionsTextArray;

    this.moveOptionText = moveOptionText;
    this.removeOptionByUsingIndex = removeOptionByUsingIndex;
    this.removeOptionByUsingOptionNro = removeOptionByUsingOptionNro;

    this.setUseOther = setUseOther;

    this.setDataValidation = setDataValidation;
    this.setCheckBoxValidationType = setCheckBoxValidationType;
    this.checkBoxValidationCheckCount = checkBoxValidationCheckCount;
    this.setErrorText = setErrorText;

    this.shuffleOrder = shuffleOrder;

     var _optionText = "Option";


     function initialize(type, data, callback) {


         //initialize _data object
         if (data === undefined) {

             _data = {
                 "type": type,
                 "title": "",
                 "helpText": "",
                 "optionsText": [],
                 "requiredQuestion": false
             };
             var optionNumber = 1;

             var option = {};
             option["option-1"] = _optionText + " 1";

             _data.optionsText.push(option);


         } else {

             //console.log("MultiChoiceData else");

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
                 "type": type,
                 "title": title,
                 "helpText": helpText,
                 "optionsText": [],
                 "requiredQuestion": requiredQuestion
             };

             //switch type or initialize if already MultiChoice field
             if ((data.type == "radioButton") || (data.type == "checkBox") || (data.type == "list")) {
                 _data.optionsText = data.optionsText.slice();
             } else {
                 var option = {};
                 option["option-1"] = _optionText + " 1";
                 _data.optionsText.push(option);

             }
         }

         if ((type == "radioButton") || (type == "checkBox")){
             if (data === undefined) {

                 _data.useOther = false;

             } else {

                 var useOther;
                 (data.useOther === undefined) ? useOther = false : useOther = data.useOther;

                 _data.useOther = useOther;

             }
        }

        var advSettingsUndefined = false;

        try {
            data.advancedSettings.shuffleOrder.length;

            if (data.type == "grid") {
                advSettingsUndefined = true;
            }

        } catch (e) { advSettingsUndefined = true; }

        var advancedSettings;

        //initialize _data object
        if (advSettingsUndefined) {
            //console.log(" ParagraphField Data: initialize: data === undefined");
         
            if ((type == "radioButton") || (type == "list")) {
                advancedSettings = {
                    "shuffleOrder": false
                };
            } else { //checkBox
                advancedSettings = {
                    "dataValidation": false,
                    "checkBoxValidation": { "type": "", "checkCount": "" },
                    "errorText": "",
                    "shuffleOrder": false
                };
            }

        } else {
            //console.log(" ParagraphField Data: initialize: else");

            var shuffleOrder;
            (data.advancedSettings.shuffleOrder === undefined) ? shuffleOrder = false : shuffleOrder = data.advancedSettings.shuffleOrder;

            if ((type == "radioButton") || (type == "list")) {
                advancedSettings = {
                    "shuffleOrder": shuffleOrder
                };
            } else { //checkBox

                var advCheckBoxSettingsUndefined = false;

                try {

                    data.advancedSettings.checkBoxValidation.length;

                } catch (e) { advCheckBoxSettingsUndefined = true; }

                if (advCheckBoxSettingsUndefined) {

                    advancedSettings = {
                        "dataValidation": false,
                        "checkBoxValidation": { "type": "", "checkCount": "" },
                        "errorText": "",
                        "shuffleOrder": shuffleOrder
                    };

                } else {

                    var dataValidation;
                    (data.advancedSettings.dataValidation === undefined) ? dataValidation = false : dataValidation = data.advancedSettings.dataValidation;

                    var checkBoxValidation = "";

                    var type = "";

                    var checkCount = "";

                    //checkBoxValidation
                    (data.advancedSettings.checkBoxValidation === undefined) ? checkBoxValidation = "" : checkBoxValidation = data.advancedSettings.checkBoxValidation;

                    (data.advancedSettings.checkBoxValidation.type === undefined) ? type = "" : type = data.advancedSettings.checkBoxValidation.type;

                    (data.advancedSettings.checkBoxValidation.checkCount === undefined) ? checkCount = "" : checkCount = data.advancedSettings.checkBoxValidation.checkCount;

                    //errorText
                    var errorText;
                    (data.advancedSettings.errorText === undefined) ? errorText = "" : errorText = data.advancedSettings.errorText;

                    advancedSettings = {
                        "dataValidation": dataValidation,
                        "checkBoxValidation": { "type": type, "checkCount": checkCount },
                        "errorText": errorText,
                        "shuffleOrder": shuffleOrder
                    };
                }
            
            }
        }

        _data.advancedSettings = advancedSettings;

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

     function addOption(optionText, callback) {

         var size = _data.optionsText.length;

         var optionNumber = size + 1;

         var option = {};

         option["option-" + optionNumber] = optionText;

         _data.optionsText.push(option);

         this.callback(callback, _data);

     }

     function updateOptionText(rowNumber, value, callback) {

         var optionKey = "option-" + rowNumber;

         _data.optionsText[(rowNumber - 1)][optionKey] = value

         this.callback(callback, _data);

     }

     function updateOptionsTextArray(from, to) {

         from = parseInt(from);

         to = parseInt(to);

         if (from < to) {

             while (from < to) {
                 //to value copy
                 var copyValue = _data.optionsText[(from + 1)]["option-" + (from + 2)];

                 //set from value to new position
                 var optionKey = "option-" + (from + 2);
                 _data.optionsText[(from + 1)][optionKey] = _data.optionsText[from]["option-" + (from + 1)];

                 //set copy value to new position
                 var optionKey2 = "option-" + (from + 1);
                 var option2 = {};
                 option2[optionKey2] = copyValue;

                 _data.optionsText[from][optionKey2] = copyValue;

                 from = from + 1;
             }
         } else if (from > to) {

             while (from > to) {
                 //to value copy
                 var copyValue = _data.optionsText[(from - 1)]["option-" + from];

                 //set from value to new position
                 var optionKey = "option-" + from;
                 _data.optionsText[(from - 1)][optionKey] = _data.optionsText[from]["option-" + (from + 1)];

                 //set copy value to new position
                 var optionKey2 = "option-" + (from + 1);

                 _data.optionsText[from][optionKey2] = copyValue;

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

     function moveOptionText(from, to, callback) {

         this.updateOptionsTextArray(from, to);

         this.callback(callback, _data);

     }

    //Remove Option Text Item, based on index
     function removeOptionByUsingIndex(index, callback) {

         _data.optionsText.splice(index, 1);

         this.callback(callback, _data);
     }

    //Remove Option Text Item, based on optionNro (it's order in the view)
     function removeOptionByUsingOptionNro(optionNro, callback) {

         this.moveOptionText((optionNro - 1), (_data.optionsText.length - 1));

         _data.optionsText.splice((_data.optionsText.length - 1), 1);

         this.callback(callback, _data);
     }

     function setUseOther(useOther, callback) {

         _data.useOther = useOther;

         this.callback(callback, _data);

     }
     
    //checkbox
     function setDataValidation(use, callback) {

         _data.advancedSettings.dataValidation = use;
         this.callback(callback, _data);

     }

    //check box validation type
    function setCheckBoxValidationType(type, callback) {

         _data.advancedSettings.checkBoxValidation.type = type;
         this.callback(callback, _data);
     }

    function checkBoxValidationCheckCount(checkCount, callback) {

         _data.advancedSettings.checkBoxValidation.checkCount = checkCount;
         this.callback(callback, _data);
    }

    function shuffleOrder(text, callback) {

        _data.advancedSettings.shuffleOrder = text;
        this.callback(callback, _data);

    }

    function setErrorText(text, callback) {

        _data.advancedSettings.errorText = text;
        this.callback(callback, _data);

    }

}

//inherit from DataBase
MultiChoiceData.inheritsFrom(DataBase);

