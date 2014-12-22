/*
Represents top right corner edit/copy/and delete image buttons on formBuilder div.
*/

function EditForm(state, number) {

    var _state = state;

    var _fieldBase = new FieldBase();

    this.render = render;

    var _number = number;

    var _text = {};

    _text["editTooltip"] = "Edit";
    _text["duplicateTooltip"] = "Duplicate";
    _text["deleteTooltip"] = "Delete";

    function render() {

        //var div = document.createElement("DIV");
        var table = createTable();
        table.setAttribute("class", "editForm " + _state);

        if (number)
            table.setAttribute("data-nro", _number);
        //div.appendChild(table);

        return table;
        //return div;
    }
 

    function createTable() {

        var table = document.createElement("table");

        var row = document.createElement("TR");

        var td_1 = document.createElement("TD");
        td_1.title = _text["editTooltip"];
        td_1.setAttribute("class", "tdEdit");
        td_1.addEventListener("click", editClick, true);


        var img1 = document.createElement("img");
        img1.setAttribute("class", "edit");
        img1.src = _fieldBase._pencil_png_src;
        

        td_1.appendChild(img1);

        var td_2 = document.createElement("TD");
        td_2.title = _text["duplicateTooltip"];
        td_2.setAttribute("class", "tdCopy");
        //td_2.addEventListener("click", copyClick, false);

        var img2 = document.createElement("img");
        img2.setAttribute("class", "copy");
        img2.src = _fieldBase._copy_png_src;
        

        td_2.appendChild(img2);

        row.appendChild(td_1);
        
        row.appendChild(td_2);

        var td_3 = document.createElement("TD");   

        td_3.setAttribute("class", "tdDel");
        td_3.title = _text["deleteTooltip"];

        var img3 = document.createElement("img");
        img3.setAttribute("class", "remove");
        img3.src = _fieldBase._remove2_png_src;
        

        td_3.appendChild(img3);

        row.appendChild(td_3);

        table.appendChild(row);

        return table;
    }


    function editClick() {

        var itemNro = this.parentNode.parentNode.getAttribute("data-nro");

        itemNro = parseInt(itemNro);




    }

    function copyClick() {

    

    }

}