import createAdler from "../../../vendor/adlerLegacy.js";
import table_component from "../../common_ui_components/table/table.js";
import folder_view_component from "../../common_ui_components/folder_view/folder_view.js";
import projectManagement from "../../common_project_management/project_management.js";
import createEvaluator from "../../common_evaluators/evaluators.js";
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";
import { joinRelationsWithEntities } from "../helper_functionsViewport/helper_function_viewport.js";
import { subscribeToChanges } from "../../common_state/state_change_subscription.js";
import createInstancesManagement from "../../common_project_management/instances_management.js";
import createPropertyManagement from "../../common_project_management/properties_management.js";
import createStructuresManagement from "../../common_project_management/structures_management.js";
import createEntityManagement from "../../common_project_management/entity_management.js";
import state from "../../common_state/state_manager.js";
import { createEntitiesAddEditor } from "../../common_add_editors/common_entities_add_editor.js";
import nanoid from "../../../vendor/nanoid.js";


var softUpdate= function (event, data, instance) {
    var itemsData = getItemsList(event,data, instance)
    var currentTable = instance.query(".current-table")
    currentTable.list = itemsData.list

    currentTable.updateData()
}

// var attachPropToCleanedInstances = function (instances, cols) {
//     var newList = []
//     var cols = cols||[{title:"name", field:'name',},] //If not attributes are used, juste populate with basic ones

//     for (let i = 0; i < instances.length; i++) { //create a new list to keep original clean
//         const item = instances[i];
//         var newItem = {uuid: item.uuid, name:item.name, color:item.color, iconPath:item.iconPath}
//         newList.push(newItem)
//         for (let j = 0; j < cols.length; j++) {
//             const col = cols[j];
//             if (col.field) {
//                 if (item.attributes[col.field]) {
//                     newItem[col.field] = item.attributes[col.field]
//                 }
//                 if (item.properties && item.properties[col.field]) {//TODO remove property from object
//                     newItem[col.field] = item.properties[col.field].value
//                 }
//                 if (item[col.field]) {//also check if not in attribute (relations)
//                     newItem[col.field] = item[col.field]
//                 }
                
//             }
            
//         }
        
//     }
//     return newList
// }

var entityClickAction = function (self) {
    // console.log(e);
    // console.log(cell.getData());
    
    return function (e,cell) {
        console.log(e);
        console.log(cell.getData());
        console.log(self);
        // var instanceRepo = createInstancesManagement()
        // var currentInstance = instanceRepo.getById(cell.getData().uuid)
        // var sourceEntity = currentInstance.sourceEntity
        // var linkedView = project_views.instance({data:{
        //     viewId:sourceEntity.defaultViewId, 
        //     calledFromInstance:cell.getData().uuid,
        //     title:false,
            
        // }})
        
        state.setSearchParams("selected",cell.getData().uuid, "silent")
        // self.query(".instance_view_area").innerHTML=""
        // linkedView.mount(self.query(".instance_view_area"))
        // self.query(".graph_selection_select_area").append(linkedView)
    }
}
var addClickAction = function (event, data, instance) {
    // console.log(e);
    // console.log(cell.getData());
    var renderSettings = instance.props.get("settings").renderSettings
    if (renderSettings && renderSettings.structuresToDisplay[0]) {
        return function (event) {
            var name = prompt("Folder Name")
            if (name) {
                var repo = createStructuresManagement()
                var created = repo.createFrom(renderSettings.structuresToDisplay[0], {name:name, type:"folder"})
                console.log(created);
                // loadSideMenu(self)
                softUpdate(event, data, instance)
            }
            
        }
    }else{
        return undefined
    }
    
    
}

var addEntityToFolder = function(availableEntities, renderSettings, folderId) {
    var id= nanoid()
    createEntitiesAddEditor(availableEntities, {name:"New Element", uuid:id}, ()=>{
        if (folderId) {
            var structuresRep = createStructuresManagement()
            var structure = structuresRep.getById(folderId)
            structure.addChild(id, renderSettings.structuresToDisplay[0]) 
        }
    });
    
    // var entitiesRepo = createEntityManagement()
    // var structuresRep = createStructuresManagement()
    // var structure = structuresRep.getById(folderId)
    // var availableEntities = currentCollection.getEntities().map(e=>{
    //     var entity =entitiesRepo.getById(e)
    //     return  {name:entity.name, uuid:entity.uuid, iconPath:entity.attributes.iconPath}
    // })
    // showEntitiesSelector({
    //     // selected : hasEntitites,
    //     customOptions:availableEntities,
    //     multipleSelection:false,
    //     onChange: (e,f)=> {
    //         if (f.added[0]) {
    //             var entity =entitiesRepo.getById(f.added[0])
    //             var name = prompt("Name")
    //             if(entity && name  ){
    //                 var id = nanoid()
    //                 entity.addInstance({uuid:id, name:name})
                    
    //                 structure.addChild(id, folderId)
    //             } 
    //         }
            
    //         if (callback) {
    //             callback()
    //         }
    //         // data.addEntities(f.added)
    //         // data.removeEntities(f.removed)
    //         // showCollections(self)
    //     },
    // })
}

var getItemsList = function (event, data, instance){

    var data = {}
    var useNodes = false
    var renderSettings = instance.props.get("settings").renderSettings
    if (renderSettings) {
        useNodes = renderSettings.useNodes || false
    }
    // alert(useNodes)
    if (!useNodes && renderSettings) {

        // var instanceRepo = createInstancesManagement()
        // var instances = instanceRepo.getByType(renderSettings.entitiesToDisplay)
        

        var instancesRepo = createInstancesManagement()
        // var collectionRepo = createCollectionsManagement()
        var entitiesRepo = createEntityManagement()
    
        // var currentCollection = collectionRepo.getById(self.instanceId)
        // var entities = entitiesRepo.getAll()



        data.onClick = entityClickAction(self)
        data.addItem = addClickAction(event, data, instance)
        data.onDropped = function (evt) {
            console.log(evt);
            var repo = createStructuresManagement()
            setTimeout(function () {
                if (confirm("Move Item?")) {
                    if (evt.target.isContainer && evt.dragged.isContainer) {
                        repo.link(evt.target.data.uuid,evt.dragged.data.uuid )  
                    }
                    if (evt.target.isContainer && (!evt.dragged.isContainer) ) {
                        repo.link(evt.target.data.uuid,evt.dragged.data.uuid, renderSettings.structuresToDisplay[0] )  //provide a context to make this relation unique to it
                    }
                }
                
                softUpdate(event, data, instance)
            },100)
            
        }


    
        data.list = [
            // {name:"Chapitre 2 ", _children:[
            //     {name:"Item 1"},
            //     {name:"Item 2"},
            // ]},
        ];
    
        var currentEntities = renderSettings.entitiesToDisplay
        for (let i = 0; i < currentEntities.length; i++) {
            const entityId = currentEntities[i];
            var entity = entitiesRepo.getById(entityId)
            
            if (entity) {
                var instances = instancesRepo.getByType(entityId)
                var instancesList = instances.map(i=>{
                    var options=[
                        ["Rename", ()=>{
                            var newName = prompt("New name", i.name)
                            if (newName && newName != i.name && newName !="") {
                                i.rename(newName)
                                softUpdate(event, data, instance)
                            }
                        }, "./img/icons/edit.svg"],
                        
                    ]
                    return{name:i.name, uuid:i.uuid, img:["./img/icons/"+i.iconPath, i.color],_options:options}
                })
                var options=[
                    // ["Rename", ()=>{
                    //     var newName = prompt("New name", item.element.name)
                    //     if (newName && newName != item.element.name && newName !="") {
                    //         structuresRep.add({uuid:item.uuid, name:newName})
                    //         softUpdate(event, data, instance)
                    //     }
                    // }, "./img/icons/edit.svg"],
                    ["Add item", ()=>{
                        // addEntityToFolder(self, currentCollection, item.uuid, ()=> softUpdate(event, data, instance))
                        // createEntitiesAddEditor([entityId], "New Element");
                        addEntityToFolder([entityId], renderSettings)
                        softUpdate(event, data, instance);
                    }, "./img/icons/plus.svg"],
                ]
                data.list.push({uuid:entityId, name:entity.name, _children:instancesList, img:"./img/icons/folder.svg", _options:options})
            }
            
        }
        if (renderSettings.structuresToDisplay) {
            var structuresRep = createStructuresManagement()
            var entitiesRep = createEntityManagement()
            console.log(structuresRep.getHierarchies())
            // var structuresList = structuresRep.getAll()
            var hierachStruct = structuresRep.getAllChildrenOfId(renderSettings.structuresToDisplay[0], function (item) {
                var img="./img/icons/folder.svg"
                var children = item._children
                var tcolor = undefined
                var options = undefined
                if (item._isInstance) {
                    img="./img/icons/file.svg"
                    children = undefined //clear children if needed
                    var entity = entitiesRep.getById(item.element.type)
                    if (entity) {
                        img = ["./img/icons/"+entity.attributes.iconPath, entity.attributes.color]
                        console.log(entity);
                        options=[
                            ["Rename", ()=>{
                                var newName = prompt("New name", item.element.name)
                                if (newName && newName != item.element.name && newName !="") {
                                    var instancesRep = createInstancesManagement()
                                    
                                    var instanceToChange = instancesRep.getById(item.uuid)
                                    console.log(instanceToChange);
                                    instanceToChange.rename(newName)
                                    softUpdate(event, data, instance)
                                }
                            }, "./img/icons/edit.svg"],
                            ["Delete", ()=>{
                                var confirmed = confirm("Are you sure you want to delete this item")
                                if (confirmed) {
                                    var instancesRep = createInstancesManagement()
                                    var instanceToChange = instancesRep.getById(item.uuid)
                                    console.log(instanceToChange);
                                    instanceToChange.remove()
                                    softUpdate(event, data, instance)
                                }
                            }, "./img/icons/edit.svg"]
                        ]
                    }  
                }else{
                    options=[
                        ["Rename", ()=>{
                            var newName = prompt("New name", item.element.name)
                            if (newName && newName != item.element.name && newName !="") {
                                structuresRep.add({uuid:item.uuid, name:newName})
                                softUpdate(event, data, instance)
                            }
                        }, "./img/icons/edit.svg"],
                        ["Add item", ()=>{
                            // addEntityToFolder(self, currentCollection, item.uuid, ()=> softUpdate(event, data, instance))
                            addEntityToFolder(renderSettings.entitiesToDisplay, renderSettings, item.uuid)
                            softUpdate(event, data, instance);
                        }, "./img/icons/plus.svg"],
                    ]
                }
                
                return { uuid:item.element.uuid, name:item.element.name,_options:options,  _children:children, img}
            })
        }
        data.list= data.list.concat( hierachStruct.root._children )
        // console.log(renderSettings.relationsToDisplay);

        // // First get the props to know what should be displayed
        // var propRepo = createPropertyManagement()
        // var cols= [{title:"name", field:'name', customObject:true, cellClick:function (e,cell) {
        //     state.setSearchParams("selected",cell.getData().uuid, "silent")
        // }}]

        // if (renderSettings.fieldsToDisplay) {
        //     for (let i = 0; i < renderSettings.fieldsToDisplay.length; i++) {
        //         var newProp = propRepo.getById( renderSettings.fieldsToDisplay[i] )
        //         cols.push({title:newProp.name, field:'prop_'+newProp.uuid, isAttribute:true, attributeType:"text" })
        //     }
        // }
        // //Then clean the instance with simpler object having only the correct props attached
        // instances = attachPropToCleanedInstances(instances, cols)//clean Objects TODO segregate in custom attributes object
        
        // //then check for relation to display and add them as root props
        // var extendedList = {roots:instances, cols:[]}
        // var mode= "default"
        // if (renderSettings.compactMode) {
        //     mode = "compact"
        // }
        // if (renderSettings.relationsToDisplay?.nodes) {
        //     extendedList = traverseGraphForRelations(instances, renderSettings.relationsToDisplay.arrows, renderSettings.relationsToDisplay.nodes, mode)
        // }

        // // data.list = attachPropToCleanedInstances(data.list, data.cols)//clean Objects TODO segregate in custom attributes object
        
        // data.list =extendedList.roots
        // data.cols =cols.concat(extendedList.cols)
        // data.actions =renderSettings.actions 
        // data.renderSettings =renderSettings
        // data.buttons ={
        //     add:function() {
        //         createEntitiesAddEditor(renderSettings.entitiesToDisplay, "New Element")
        //     }
        // }

    }else{
        var evaluator = createEvaluator({originInstance:instance.props.get('settings').calledFromInstance, type:instance.props.get("settings").entityType , graphId:instance.props.get("settings").evaluatorId})
        console.log(evaluator);
        if (!evaluator.evaluate()) {
            return {list:[{name:"undefined LIST"}], cols:[]}
        }
        var evaluationResult = evaluator.evaluate().output_folder
        console.log(evaluator.evaluate());

        data.list =evaluationResult.list
        data.cols =evaluationResult.cols
        data.actions =evaluationResult.actions
        console.log(data);

        // joinRelationsWithEntities(data.list, data.cols.map(c=>c.field))
        
        //clean Objects TODO segregate in custom attributes object
        var newList = []
        //If not attributes are used, juste populate with basic ones
        if (!data.cols) {
            data.cols=[{name:"name", field:'name'}]
        }
        console.log(data);
        for (let i = 0; i < data.list.length; i++) {
            const item = data.list[i];
            var newItem = {uuid: item.uuid, name:item.name, color:item.color}
            newList.push(newItem)
            for (let j = 0; j < data.cols.length; j++) {
                const col = data.cols[j];
                if (col.field) {
                    if (item.attributes && item.attributes[col.field]) {
                        newItem[col.field] = item.attributes[col.field]
                    }
                    if (item.properties && item.properties[col.field]) {
                        newItem[col.field] = item.properties[col.field].value
                    }
                    
                }
                
            }
            
        }
        data.list =newList
        console.log(data);
        
        joinRelationsWithEntities(data.list, data.cols.map(c=>c.field))
        
        
        
    }

    console.log(data);
    return data
    
}
var subscribeToDB = function (event, data, instance) {
    var updateFunc = function (params) {
        if (instance && instance.getDOMElement() && instance.getDOMElement().isConnected) {
            softUpdate(event, data, instance)
            // alert("update")//TODO sometimes to update. Why?
        }else{
            window.removeEventListener("cluster_update", updateFunc);
        }
        
    }
    window.addEventListener("cluster_update", updateFunc);
}


var setUpTable = function (event, data, instance) {
     console.log(instance.getNodes());
     console.log(instance.props.settings.get());
     var itemsData = getItemsList(event,data, instance)
    //  data.addAction = itemsData.actions
    //  instance.props.set("addAction",itemsData.actions )
    //  data.value = Date.now()
    // // alert(data.value)
    //  console.log(data.addAction);
    // //  alert()

    setTimeout(function () {
        var mountPlace = instance.query(".folder_component")
        console.log(mountPlace);
        data.tablevp = folder_view_component.instance()
        data.tablevp.classList="current-table"
        data.tablevp.list = itemsData.list
        data.tablevp.cols = itemsData.cols
        data.tablevp.onClick = itemsData.onClick
        data.tablevp.addItem = itemsData.addItem
        data.tablevp.onDropped = itemsData.onDropped
        // if (itemsData.actions) {
        //     // tablevp.onClick = itemsData.actions
        //     tablevp.onClick = function (e, cell) {
        //         var actionData = {
        //             input:{
        //                 clickedItem:cell.getData().uuid,
        //                 clickedItemUuid:cell.getData().uuid,
        //                 contextualItemUuid:cell.getData().uuid,
        //                 clickedItemValue:cell.getValue(),
        //                 sourceItem:cell.getData().uuid,
        //                 targetItem:false,
        //             }
        //         }
        //         itemsData.actions(actionData)
        //     }

            
        // }
        mountPlace.append(data.tablevp)
        subscribeToChanges(event, data, instance, softUpdate)

    })


    //  instance.getNodes().tablevp.setData({list:itemsData.list, cols:itemsData.cols })
     
}



var folder_viewport =createAdler({
    content: p => /*html*/`
    <div class="folder_component container" style="height:100%;">
        
    </div>
        `,
    params:{
        props:{
            test:15,
            addAction: undefined,
            settings:{
                entityType:false,
                evaluatorId:false,
                calledFromInstance:false,
            },
        },
        listen:{
            test:function (event, data, instance) {
                //alert("test")
            }
        },
        data:{
            value:"Hello",
            list:[],
            table:undefined,
            addAction: undefined,
            // onClick:()=>console.log("click")
        },
        on:[
            // [".action_add_entity","click", (event, data, instance)=> addItem(event, data, instance) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
            onMount:(event, data, instance) => setUpTable(event, data, instance),
            
        },
        methods:{
            softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    components:{
        // table_component: table_component,
    },
    // css:/*css*/`  `,
})

export default folder_viewport