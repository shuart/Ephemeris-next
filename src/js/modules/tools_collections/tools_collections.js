import { createAdler } from "../../vendor/adler.js";
import createEntityManagement from "../common_project_management/entity_management.js";
import folder_view_component from "../common_ui_components/folder_view/folder_view.js";
import state from "../common_state/state_manager.js";
import createInstancesManagement from "../common_project_management/instances_management.js";
import project_views from "../project_views/project_views.js";
import createStructuresManagement from "../common_project_management/structures_management.js";
import createCollectionsManagement from "../common_project_management/collections_management.js";
import { showEntitiesSelector } from "../common_selectors/entities_selector.js";
import nanoid from "../../vendor/nanoid.js";
// import { sortable } from "./tools_collections_storable.js";



// var showCollections = function (self) {
//     var entitiesRepo = createEntityManagement()
//     var entities = entitiesRepo.getAll()
//     var mountPlace = self.query(".instance_view_area")

//     for (let i = 0; i < entities.length; i++) {
//         const entity = entities[i];
//         var link = document.createElement("div")
//         link.innerHTML=entity.name+ self.instanceId
//         link.addEventListener("click", function () {
//             state.goTo("/:/collection/"+entity.uuid)
//         })
//         mountPlace.append(link)
//     }
// }

// var traverseStructures = function (rootId, structuresRep, listToPush) {
//     var structuresList = structuresRep.getChildrenOfId(rootId)
//     for (let i = 0; i < structuresList.length; i++) {
//         const element = structuresList[i];
//         var data={uuid:element.uuid, name:element.name,_children:[]}
//         // if (element.type == undefined) {
//             data.img = "./img/icons/folder.svg"
//         // }
//         traverseStructures(element.uuid, structuresRep,data._children )
//         listToPush.push(data)
//     }
// }

var addEntityToFolder = function(self, currentCollection,folderId,  callback) {
    var entitiesRepo = createEntityManagement()
    var structuresRep = createStructuresManagement()
    var structure = structuresRep.getById(folderId)
    var availableEntities = currentCollection.getEntities().map(e=>{
        var entity =entitiesRepo.getById(e)
        return  {name:entity.name, uuid:entity.uuid, iconPath:entity.attributes.iconPath}
    })
    showEntitiesSelector({
        // selected : hasEntitites,
        customOptions:availableEntities,
        multipleSelection:false,
        onChange: (e,f)=> {
            if (f.added[0]) {
                var entity =entitiesRepo.getById(f.added[0])
                var name = prompt("Name")
                if(entity && name  ){
                    var id = nanoid()
                    entity.addInstance({uuid:id, name:name})
                    
                    structure.addChild(id, self.instanceId)
                } 
            }
            
            if (callback) {
                callback()
            }
            // data.addEntities(f.added)
            // data.removeEntities(f.removed)
            // showCollections(self)
        },
    })
}

var loadSideMenu = function (self) {
    self.query(".collection_side_view").innerHTML='' //TODO, update the componenet properly
    var folderComponent = folder_view_component.instance()
    
    var instancesRepo = createInstancesManagement()
    var collectionRepo = createCollectionsManagement()
    
    var entitiesRepo = createEntityManagement()

    var currentCollection = collectionRepo.getById(self.instanceId)
    // var entities = entitiesRepo.getAll()

    
    folderComponent.onClick = sideMenuClickAction(self)
    folderComponent.addItem = addClickAction(self)
    folderComponent.onDropped = function (evt) {
        console.log(evt);
        var repo = createStructuresManagement()
        if (confirm()) {
            if (evt.target.isContainer && evt.dragged.isContainer) {
                repo.link(evt.target.data.uuid,evt.dragged.data.uuid )  
            }
            if (evt.target.isContainer && (!evt.dragged.isContainer) ) {
                repo.link(evt.target.data.uuid,evt.dragged.data.uuid, self.instanceId )  //provide a context to make this relation unique to it
            }
        }
        
        loadSideMenu(self)
    }

    folderComponent.list = [
        // {name:"Chapitre 2 ", _children:[
        //     {name:"Item 1"},
        //     {name:"Item 2"},
        // ]},
    ];

    var currentEntities = currentCollection.getEntities()
    for (let i = 0; i < currentEntities.length; i++) {
        const entityId = currentEntities[i];
        var entity = entitiesRepo.getById(entityId)
        
        if (entity) {
            var instances = instancesRepo.getByType(entityId)
            var instancesList = instances.map(i=>{
                return{name:i.name, uuid:i.uuid}
            })
            folderComponent.list.push({uuid:entityId, name:entity.name, _children:instancesList})
        }
        
    }

    
    

    var structuresRep = createStructuresManagement()
    var entitiesRep = createEntityManagement()
    console.log(structuresRep.getHierarchies())
    // var structuresList = structuresRep.getAll()
    var hierachStruct = structuresRep.getAllChildrenOfId(self.instanceId, function (item) {
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
                            loadSideMenu(self)
                        }
                    }, "./img/icons/edit.svg"],
                    ["Delete", ()=>{
                        var confirmed = confirm("Are you sure you want to delete this item")
                        if (confirmed) {
                            var instancesRep = createInstancesManagement()
                            var instanceToChange = instancesRep.getById(item.uuid)
                            console.log(instanceToChange);
                            instanceToChange.remove()
                            loadSideMenu(self)
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
                        loadSideMenu(self)
                    }
                }, "./img/icons/edit.svg"],
                ["Add item", ()=>{
                    addEntityToFolder(self, currentCollection, item.uuid, ()=> loadSideMenu(self))
                }, "./img/icons/plus.svg"],
            ]
        }
        
        return { uuid:item.element.uuid, name:item.element.name,_options:options,  _children:children, img}
    })

    




    console.log(hierachStruct);
    var listOfStruct = hierachStruct.list
    var struct = hierachStruct.root
    folderComponent.list= folderComponent.list.concat( hierachStruct.root._children )
    // traverseStructures(self.instanceId,structuresRep, folderComponent.list)

    
    self.query(".collection_side_view").append(folderComponent)
    // subscribeToChanges(event, data, instance, softUpdate)
}

var sideMenuClickAction = function (self) {
    // console.log(e);
    // console.log(cell.getData());
    
    return function (e,cell) {
        console.log(e);
        console.log(cell.getData());
        console.log(self);
        var instanceRepo = createInstancesManagement()
        var currentInstance = instanceRepo.getById(cell.getData().uuid)
        var sourceEntity = currentInstance.sourceEntity
        var linkedView = project_views.instance({data:{
            viewId:sourceEntity.defaultViewId, 
            calledFromInstance:cell.getData().uuid,
            title:false,
            
        }})
        self.query(".instance_view_area").innerHTML=""
        linkedView.mount(self.query(".instance_view_area"))
        // self.query(".graph_selection_select_area").append(linkedView)
    }
}

var addClickAction = function (self) {
    // console.log(e);
    // console.log(cell.getData());
    return function (event) {
        var name = prompt("Folder Name")
        if (name) {
            var repo = createStructuresManagement()
            var created = repo.createFrom(self.instanceId, {name:name, type:"folder"})
            console.log(created);
            loadSideMenu(self)
        }
        
    }
    
}


var toolsCollections =createAdler({
    tag:'collections-view',
    props:{
        onClick:function (e,cell) {
            alert("no action")
            // state_manager.setSearchParams("test","tas", "silent")
        }
        // test:15,
        // dataList:[],
        // height: "auto",
        // onAdd: ()=>alert("fefes"),
        // callback:(event)=>alert(event.name),
        // value:"Hello",
        // height: "auto",
        // list:[],
        // cols:[],
        // table:undefined,
    },
    attributes:[
    ],
    watch:[
        // ["list", softUpdate]
    ],
    methods:[
        // ["updateTable", (self)=>softUpdate(self)],
        // ["updateData", (self)=>softUpdate(self)]
    ],
    events : [
        // ["click", ".action-table-add", (ev,self)=>self.onAdd()],
        // [".action-table-add","click", (event, data, instance)=> instance.props.get("onAdd")() ],
    ],
    onRender:(self) =>{
        // setUpTable(self)
        // showCollections(self)
        loadSideMenu(self)
    },
    html: p => /*html*/`
    <link rel="stylesheet" href="css/bulma.min.css">
    <link rel="stylesheet" href="css/bulma.dark.css">
    <link rel="stylesheet" href="css/vendor/tabulator_semanticui.min.css">
    <link rel="stylesheet" href="css/vendor/tabulator_semanticui_dark.min.css">
    <link rel="stylesheet" href="css/main.css">

    
    <div class="component">
        
        <div class="main_view_area">
            <div class="instance_view_area container"></div>
        </div>
        <div class="collection_side_view"></div>
    </div>
        `,
    css:/*css*/`
    .component {
        width:100%;
        height:100%;
    }
    .adlerButton {
        background-color: blue;
        padding: 5px;
        border: none;
        color: white;
        margin: 3px;
    }
    .project_selection_logo{
        width: 150px;
        margin: auto;
        height: 150px;
        background-image: url("./img/observatoryR.png");
        background-size: contain;
        background-repeat: no-repeat;
    }
    .project_selection_sub_title{
        margin: auto;
        width: 50%;
        margin-top: 20px;
        border-bottom-style: solid;
        margin-bottom: 20px;
        border-color: #8a8a8a29;
        border-width: 1px;
        font-size: 1rem;
        color: #bfbcbc;
    }
    .collection_side_view{
        height: 100%;
        width: 250px;
        position: absolute;
        top: 0px;
    }
    .main_view_area{
        width: calc(100% - 250px);
        position:relative;
        left:250px;
    }
    
    @media (prefers-color-scheme: dark) {
        
        
      }
    `,
})

export default toolsCollections
