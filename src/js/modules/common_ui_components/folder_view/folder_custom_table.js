import { sortableFolders } from "./folder_sortable.js";

export function createFolders({
    domElement = undefined,
    childrenOffset=15,
    dragAndDrop=true,
    onDropped = undefined,
    sessionId = undefined,
    dataId = "uuid",
    onNameClick=function (e, cell) {
        console.log("eee");
    },
    cols=[
        {field:"img", type:"image"},
        {field:"name", type:"name"},
        {field:"_options", type:"options"},
    ],
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

    function toogleElementClosedStatus(did, domElement) {
        var currentItem = dataMap[did]
        var existingStorage = localStorage.getItem("fv_uidofsfejfosie"); //check if the user as already a local storage data regarding the structures
        console.log(dataMap);
        console.log(existingStorage);
        if (existingStorage) {
            existingStorage = JSON.parse(existingStorage)
        }
        if (currentItem.isClosed == false || currentItem.isClosed == undefined) {
            currentItem.isClosed =true
            if (existingStorage && existingStorage[currentItem.id]) {
                existingStorage[currentItem.id].isClosed = true 
            }
            if (currentItem.domToggleElement) {
                currentItem.domToggleElement.innerHTML = getIcons("closed")
            }
            hideChildren(did, domElement)
        }else{
            currentItem.isClosed = false
            if (existingStorage && existingStorage[currentItem.id]) {
                existingStorage[currentItem.id].isClosed = false 
            }
            if (currentItem.domToggleElement) {
                currentItem.domToggleElement.innerHTML = getIcons("open")
            }
            restoreChildrendVisibility(did)
        }
        if (existingStorage) { //store back in local storage
            var toStore = JSON.stringify(existingStorage)
            localStorage.setItem("fv_uidofsfejfosie",toStore )
        }
    }

    function updateRootVisibility(params) {
        for (let i = 0; i < dataList.length; i++) {
            const element = dataList[i];
            if (element.level == 0) {
                restoreChildrendVisibility(element.id)
            }
        }
    }

    function restoreChildrendVisibility(rootId) {
        var currentItem = dataMap[rootId]
        if (currentItem.children) {
            for (let i = 0; i < currentItem.children.length; i++) {
                const child = currentItem.children[i];
                if (currentItem.isClosed == true) {
                    if (currentItem.domToggleElement) {
                        currentItem.domToggleElement.innerHTML = getIcons("closed")
                    }
                    child.domElement.style.display ="none"
                    hideChildren(child.id, domElement) 
                }else{
                    if (currentItem.domToggleElement) {
                        currentItem.domToggleElement.innerHTML = getIcons("open")
                    }
                    child.domElement.style.display ="block"
                    restoreChildrendVisibility(child.id)
                }
            } 
        }
        
    }

    function hideChildren(did, domElement) {
        var currentItem = dataMap[did]
        if (currentItem.children) {
            for (let i = 0; i < currentItem.children.length; i++) {
                const child = currentItem.children[i];
    
                child.domElement.style.display ="none"
                var childid = child.id
                hideChildren(childid, domElement)
            } 
        }
        
    }

    function showRCM(sourceItem, options) {
        var itemElement = document.createElement("div")
        itemElement.classList.add("folder_component_rcm")
        var deleteElement = function () {
            itemElement.remove()
        }
        
        itemElement.addEventListener("mouseleave", function (event) {
            deleteElement()
        })

        

        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            var optionElement = document.createElement("div")
            
            optionElement.classList.add("folder_component_rcm_option")
            
            if (option[2]) {
                optionElement.innerHTML= '<img src="'+option[2]+'" style="height:24px; width:17px; margin-right:4px">'+ option[0]
            }else{
                optionElement.innerText = option[0];
            }
            optionElement.addEventListener("mousedown", function (event) {
                event.preventDefault
                deleteElement()
                option[1]()
            })
            itemElement.append(optionElement)
        }

        sourceItem.append(itemElement)
        
    }


    var dataToDomElement= function (record) {
        var itemData = record.data
        var itemElement = document.createElement("div")
        var toogleElement = undefined
        
        
        itemElement.classList.add("folder_component_item")
        itemElement.style.margin = "10px"
        itemElement.style.cursor = "pointer"
        itemElement.style.position = "relative"
        if (record.level>0) {
            itemElement.style.marginLeft = (record.level*childrenOffset) +10+ "px"
        }
        if (record.children && record.children[0]) {
            
            itemElement.innerHTML += "- "
        }

        if (record.children ) {
            
            toogleElement = document.createElement("div")
            toogleElement.innerHTML = getIcons("open")
            toogleElement.classList = 
            toogleElement.style.display = "inline-block"
            itemElement.append(toogleElement)
            toogleElement.addEventListener("click", function (event) {
                // toogleChildrenVisibility(record.id, toogleElement);
                toogleElementClosedStatus(record.id, toogleElement);
            })
        }

        if (dragAndDrop) {
            itemElement.draggable=true
            itemElement.classList.add("dragging_placeholder")
        }

        //create layout
        for (let i = 0; i < cols.length; i++) {
            var field=cols[i].field
            var value = itemData[field]
            if (value) {
                var currentElement = document.createElement("div")
                currentElement.dataset.did = record.id
                if (cols[i].cellClick) {
                    currentElement.addEventListener("click", function (event) {
                        event.cellRecord = record
                        cols[i].cellClick(event)
                    })
                }
                if (cols[i].type == "name") {
                    currentElement.innerText += value
                    currentElement.style.display = "inline-block"
                    currentElement.addEventListener("click", function (event) {
                        onNameClick(event,record)
                    })
                }
         
                if (cols[i].type == "image") {
                    // filter: invert(100%)
                    currentElement.innerHTML += '<img src="'+value+'" style="height:24px; width:17px; margin-right:4px">'
                    currentElement.classList.add("folder_view_img")
                    currentElement.style.display = "inline-block"
                    if (Array.isArray(value)) {
                        currentElement.innerHTML = '<img src="'+value[0]+'" style="height:24px; width:17px; margin-right:4px">'
                        currentElement.classList.remove("folder_view_img")
                        currentElement.style.display = "inline-block"
                        currentElement.style.backgroundColor = value[1]
                        currentElement.style.borderRadius = "16px"
                        currentElement.style.paddingLeft = "4px"
                        currentElement.style.marginRight = "4px"
                    }
                    // if (Array.isArray(value)) { //if autogenerated image
                    //     currentElement.innerHTML = '<div src="" style="height:24px; width:17px; margin-right:4px; position: relative;padding-left: 4px;background-color:'+value[0]+';">'+value[1].slice(0, 2)+'</div>'
                    //     currentElement.classList.remove("folder_view_img")
                    // }
                }
                if (cols[i].type == "options") {
                    currentElement.innerHTML += ' :'
                    currentElement.style.display = "inline-block"
                    currentElement.style.marginRight = "10px"
                    currentElement.style.float = "right"
                    currentElement.style.fontWeight = "bold"
                    currentElement.addEventListener("click", function (event) {
                        showRCM(currentElement, value)
                    })

                }
                itemElement.append(currentElement)
            }
            
        }

        itemElement.dataset.did = record.id
        

        
        
        record.domElement = itemElement //update the record with the dom element
        record.domToggleElement = toogleElement //update the record with the dom element
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
        var toRecord = {id:itemData[dataId], isClosed:itemData.isClosed || false, data:itemData, domElement:domElement, parent, level, isContainer:isContainer, children:childrenType, getData}
        dataList.push(toRecord)
        dataMap[itemData[dataId]]=toRecord
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

        syncInLocalstorage(dataList)
        updateRootVisibility() //update visibility from local storage
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

    var syncInLocalstorage = function (recordList) {
        var containerRecords={} //save only containers info
        var existingStorage = localStorage.getItem("fv_uidofsfejfosie"); //check if the user as already a local storage data regarding the structures
        if (existingStorage) {
            existingStorage = JSON.parse(existingStorage)
        }
        for (let i = 0; i < recordList.length; i++) {
            if (recordList[i].isContainer) {
                if (existingStorage && existingStorage[ recordList[i].data[dataId] ]) {
                    containerRecords[ recordList[i].data[dataId] ] = existingStorage[ recordList[i].data[dataId] ]
                    recordList[i].isClosed= existingStorage[ recordList[i].data[dataId] ].isClosed
                }else{
                    containerRecords[ recordList[i].data[dataId] ] = {isClosed:containerRecords.isClosed}
                }
            }
        }
        
        var toStore = JSON.stringify(containerRecords)
        localStorage.setItem("fv_uidofsfejfosie",toStore )
    }


    var init = function () {
        update()
    }

    init()



    return self
}