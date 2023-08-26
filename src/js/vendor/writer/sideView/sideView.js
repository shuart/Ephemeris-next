var createSideView = function ({
    mountTo = undefined
}={}) {
    var self ={}
    var domElement = undefined;

    var setDom = function() {
        domElement= document.createElement("div")
        domElement.innerHTML=`
            <div class="sideview"></div>
        `
    }
    


    return self
}