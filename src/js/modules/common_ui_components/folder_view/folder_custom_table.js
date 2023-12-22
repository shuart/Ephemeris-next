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

    function toogleChildrenVisibility(did) {
        
        // console.log(dataMap, dataMap[did]);
        // alert(did)
        var currentItem = dataMap[did]
        for (let i = 0; i < currentItem.children.length; i++) {
            const child = currentItem.children[i];
            if (child.domElement.style.display =="none") {
                child.domElement.style.display ="block"
            }else{
                child.domElement.style.display ="none"
            }
            
            console.log(child);
        }
    }

    var dataToDomElement= function (record) {
        var itemData = record.data
        var itemElement = document.createElement("div")
        
        
        itemElement.style.margin = "10px"
        itemElement.style.cursor = "pointer"
        if (record.level>0) {
            itemElement.style.marginLeft = (record.level*childrenOffset) +10+ "px"
        }
        if (record.children && record.children[0]) {
            
            itemElement.innerHTML += "- "
        }

        if (record.children ) {
            
            var toogleElement = document.createElement("div")
            toogleElement.innerHTML += " open "
            itemElement.append(toogleElement)
            toogleElement.addEventListener("click", function (event) {
                toogleChildrenVisibility(record.id) 
            })
        }

        if (dragAndDrop) {
            itemElement.draggable=true
            itemElement.classList.add("dragging_placeholder")
        }

        var nameElement = document.createElement("div")
        nameElement.innerHTML += itemData.name
        itemElement.dataset.did = record.id
        itemElement.append(nameElement)

        nameElement.addEventListener("click", function (event) {
            onNameClick(event,record)
        })
        
        record.domElement = itemElement //update the record with the dom element
        return itemElement
    }

    var recordData = function (itemData, domElement, parent, level) {
        var getData= function () {
            return itemData
        }
        var isContainer = false
        var childrenType = undefined
        if (itemData._children) { //if item is a container
            childrenType = []
            isContainer = true
        }
        // var toRecord = {id:lastId, data:itemData, domElement:domElement, parent, level, children:itemData._children, getData}
        var toRecord = {id:lastId, data:itemData, domElement:domElement, parent, level, isContainer:isContainer, children:childrenType, getData}
        dataList.push(toRecord)
        dataMap[lastId]=toRecord
        lastId ++
        if (parent) { //record as child of parent
            parent.children.push(toRecord)
            console.log(parent);
            console.log(dataList);

        }
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
                processItems(element._children, domElement, record, currentLevel+1)
            }
        }
    }


    var init = function () {
        update()
    }

    init()



    return self
}