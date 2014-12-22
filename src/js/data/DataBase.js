/* base class for Data classes
   it is used as general utility for making callbacks for saving data */
function DataBase ()  {
    
}

// callback parameter is the method used for making callback
// data param is passed for saving with callback method call
DataBase.prototype.callback = function (callback, data) {

    if (callback && typeof (callback) === "function") {

        callback(data);

    }
}