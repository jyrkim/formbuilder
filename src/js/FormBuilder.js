function FormBuilder ()  {
    
}

FormBuilder.prototype.getFormData = function () {

    var dataItems = [];

    $(".formBuilder").each(function (index, element) {

        var item = element.getAttribute("data-item");

        var state = element.getAttribute("data-state");

        var data;

        if (item) {
            data = JSON.parse(item);
        }

        if (data) {

            dataItems.push(item);

        }
    });

    return dataItems;
}