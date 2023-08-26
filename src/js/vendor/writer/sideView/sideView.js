export var createSideView = function ({
    mountAt = undefined,
    entries = [{name:"test"}, {name:"test2"},{name:"test22"}],
    onEntryClick = (e)=> console.log(e),
    opened=false
}={}) {
    var self ={}
    var domElement = undefined;

    var setDom = function() {
        domElement= document.createElement("div")
        domElement.classList ='prosemirror-entries-menu'
        domElement.addEventListener("mouseleave", function () {
            hide()
        })
        domElement.innerHTML=`
            <div class="sideview"></div>
        `
        if (!opened) {
            domElement.style.display="none"
        }
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
        for (let i = 0; i < entries.length; i++) {
            addEntry(entries[i])
        }
    }

    var hide = function () {
        domElement.style.display="none"
        opened=false
    }
    var show = function () {
        domElement.style.display="block"
        opened=true
    }
    var toggleVisibility = function () {
        if (opened) {
            domElement.style.display="none"
        }else{
            domElement.style.display="block"
        }
        opened= !opened
    }


    
    var init = function () {
        setDom()
        updateEntries()
        mountAt.append(domElement)
    }
    init()

    self.toggleVisibility = toggleVisibility
    self.show = show
    self.hide = hide
    self.updateEntries = updateEntries
    return self
}

