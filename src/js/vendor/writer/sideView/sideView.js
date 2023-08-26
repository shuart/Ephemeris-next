export var createSideView = function ({
    mountAt = undefined,
    onEntryClick = (e)=> console.log(e)
}={}) {
    var self ={}
    var domElement = undefined;

    var setDom = function() {
        domElement= document.createElement("div")
        domElement.innerHTML=`
            <div class="sideview"></div>
        `
    }

    var addEntry = function ({
        name="element",
        id=0,
    }={}) {
        var element = document.createElement("div")
        element.innerHTML =`element ${name}`
        element.addEventListener("click", function (e) {
            onEntryClick({name,id})
        })
        domElement.append(element)
    }

    var updateEntries = function () {
        domElement.innerHTML=''
        var entries = [{name:"test"}, {name:"test2"},{name:"test22"}]
        for (let i = 0; i < entries.length; i++) {
            addEntry(entries[i])
        }
    }


    
    var init = function () {
        setDom()
        updateEntries()
        mountAt.append(domElement)
    }
    init()

    self.updateEntries = updateEntries
    return self
}

