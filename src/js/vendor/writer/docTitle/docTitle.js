export var createTitle = function ({
    mountAt = undefined,
    title = undefined,
    onEntryClick = (e)=> console.log(e)
}={}) {
    var self ={}
    var domElement = undefined;

    var setDom = function() {
        domElement= document.createElement("div")
    }


    var update = function (newTitle) {
        domElement.innerHTML=newTitle
    }


    
    var init = function () {
        setDom()
        update(title)
        mountAt.append(domElement)
    }
    init()

    self.update = update
    return self
}