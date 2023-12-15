export function createFolders({
    domElement = undefined,
    childrenOffset=15,
    data=[
        {name:"test", _children:[
            {name:"testChild"},
        ]},
        {name:"test2"},
        {name:"test3"},
    ]
    }={}) {
    var self = {}
    var dataMap = {}
    var dataList = []
    var lastId =0

    var dataToDomElement= function (record) {
        var itemData = record.data
        var itemElement = document.createElement("div")
        
        if (record.level>0) {
            itemElement.style.marginLeft = (record.level*childrenOffset) + "px"
        }
        if (record.children) {
            itemElement.innerHTML += "- "
        }

        itemElement.innerHTML += itemData.name
        itemElement.dataset.did = record.id
        
        record.domElement = itemElement //update the record with the dom element
        return itemElement
    }

    var recordData = function (itemData, domElement, parent, level) {
        var toRecord = {id:lastId, data:itemData, domElement:domElement, parent, level, children:itemData._children}
        dataList.push(toRecord)
        dataMap[lastId]=toRecord
        lastId ++
        return toRecord
    }
  
    
    var update = function () {
        dataMap = {}
        dataList = []

        domElement.innerHTML=""
        processItems(data, domElement)
    }

    var processItems = function (items, domElement, parent, level) {
        var currentLevel = level || 0
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            var record = recordData(element, undefined, parent, currentLevel)
            var elementToAppend = dataToDomElement(record)
            

            domElement.append(elementToAppend)
            if (element._children) {
                processItems(element._children, domElement, element, currentLevel+1)
            }
        }
    }


    var init = function () {
        update()
    }

    init()



    return self
}