export var subscribeToChanges = function (event, data, instance, callback, dbArea) {
    var updateFunc = function (params) {
        if (instance && instance.getDOMElement() && instance.getDOMElement().isConnected) {
            callback(event, data, instance)
            // alert("update")//TODO sometimes to update. Why?
        }else{
            window.removeEventListener("cluster_update", updateFunc);
            window.removeEventListener("search_param_update", updateFunc);
        }
        
    }
    window.addEventListener("cluster_update", updateFunc);
    window.addEventListener("search_param_update", updateFunc);
}

export var subscribeToSearchParam = function (event, data, instance, callback, dbArea) {
    var updateFuncSP = function (params) {
        if (instance && instance.getDOMElement() && instance.getDOMElement().isConnected) {
            callback(event, data, instance)
            // alert("update")//TODO sometimes to update. Why?
        }else{
            window.removeEventListener("search_param_update", updateFuncSP);
        }
        
    }
    window.addEventListener("search_param_update", updateFuncSP);
}


