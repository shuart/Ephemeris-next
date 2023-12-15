import { sortableFolders } from "./folder_sortable.js";

export function createFolders({
    domElement = undefined,
    childrenOffset=15,
    dragAndDrop=true,
    onNameClick=function (e, cell) {
        console.log("eee");
    },
    data=[
        {name:"test", _children:[
            {name:"testChild"},
        ]},
        {name:"test2"},
        {name:"test3", _children:[
            {name:"testChild2", _children:[
                {name:"testChild3"},
            ]},
        ]},
    ]
    }={}) {
    var self = {}
    var dataMap = {}
    var dataList = []
    var lastId =0

    var dataToDomElement= function (record) {
        var itemData = record.data
        var itemElement = document.createElement("div")
        
        itemElement.style.margin = "10px"
        if (record.level>0) {
            itemElement.style.marginLeft = (record.level*childrenOffset) +10+ "px"
        }
        if (record.children) {
            itemElement.innerHTML += "- "
        }
        if (dragAndDrop) {
            itemElement.draggable=true
            itemElement.classList.add("dragging_placeholder")
        }

        itemElement.innerHTML += itemData.name
        itemElement.dataset.did = record.id

        itemElement.addEventListener("click", function (event) {
            onNameClick(event,record)
        })
        
        record.domElement = itemElement //update the record with the dom element
        return itemElement
    }

    var recordData = function (itemData, domElement, parent, level) {
        var getData= function () {
            return itemData
        }
        var toRecord = {id:lastId, data:itemData, domElement:domElement, parent, level, children:itemData._children, getData}
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

        sortableFolders(self, domElement)
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