export var createTopBar = function ({
    mountAt = undefined,
}={}) {
    var self ={}
    var domElement = undefined;

    var setDom = function() {
        domElement= document.createElement("div")
        domElement.classList ='prosemirror-top-bar-menu'
    }

    // var addEntry = function ({
    //     name="element",
    //     id=0,
    // }={}) {
    //     var element = document.createElement("div")
    //     element.innerHTML =`element ${name}`
    //     element.addEventListener("click", function (e) {
    //         onEntryClick({name,id})
    //     })
    //     domElement.append(element)
    // }

    // var updateEntries = function () {
    //     domElement.innerHTML=''
    //     for (let i = 0; i < entries.length; i++) {
    //         addEntry(entries[i])
    //     }
    // }

    var hide = function () {
        domElement.style.display="none"
    }
    var show = function () {
        domElement.style.display="block"
    }
    var getDomElement = function () {
        return domElement
    }

    
    var init = function () {
        setDom()
        mountAt.append(domElement)
    }
    init()

    self.getDomElement = getDomElement
    self.show = show
    self.hide = hide
    return self
}