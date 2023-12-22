import { sortableFolders } from "./folder_sortable.js";

export function createFolders({
    domElement = undefined,
    childrenOffset=15,
    dragAndDrop=true,
    onDropped = undefined,
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

    function getIcons(name) {
        var icons ={
            "closed":'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>',
            "open":'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>',
            "folder":'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-closed"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="M2 10h20"/></svg>',
            "file":'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>',
        }
        return icons[name]
    }

    function toogleChildrenVisibility(did, domElement) {
        
        // console.log(dataMap, dataMap[did]);
        // alert(did)
        var currentItem = dataMap[did]
        for (let i = 0; i < currentItem.children.length; i++) {
            const child = currentItem.children[i];
            if (child.domElement.style.display =="none") {
                child.domElement.style.display ="block"
                if (domElement) {
                    domElement.innerHTML = getIcons("open")
                }
            }else{
                child.domElement.style.display ="none"
                if (domElement) {
                    domElement.innerHTML = getIcons("closed")
                }
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
            toogleElement.innerHTML = getIcons("open")
            toogleElement.style.display = "inline-block"
            itemElement.append(toogleElement)
            toogleElement.addEventListener("click", function (event) {
                toogleChildrenVisibility(record.id, toogleElement);
            })
        }

        if (dragAndDrop) {
            itemElement.draggable=true
            itemElement.classList.add("dragging_placeholder")
        }

        var nameElement = document.createElement("div")
        nameElement.innerHTML += itemData.name
        nameElement.style.display = "inline-block"
        nameElement.dataset.did = record.id
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

        var onDragUpdate = function (evt, data) {
            
            var target = dataMap[data.target.dataset.did]
            var dragged = dataMap[data.dragged.dataset.did]
            console.log(target,dragged );
            if (onDropped) {
                onDropped({target,dragged})
            }
        }

        sortableFolders(self, domElement,onDragUpdate)
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