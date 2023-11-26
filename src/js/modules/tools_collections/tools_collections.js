import { createAdler } from "../../vendor/adler.js";
import createEntityManagement from "../common_project_management/entity_management.js";
import folder_view_component from "../common_ui_components/folder_view/folder_view.js";
import state from "../common_state/state_manager.js";
import createInstancesManagement from "../common_project_management/instances_management.js";
import project_views from "../project_views/project_views.js";
import createStructuresManagement from "../common_project_management/structures_management.js";



var showCollections = function (self) {
    var entitiesRepo = createEntityManagement()
    var entities = entitiesRepo.getAll()
    var mountPlace = self.query(".instance_view_area")

    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        var link = document.createElement("div")
        link.innerHTML=entity.name+ self.instanceId
        link.addEventListener("click", function () {
            state.goTo("/:/collection/"+entity.uuid)
        })
        mountPlace.append(link)
    }
}

var loadSideMenu = function (self) {
    var folderComponent = folder_view_component.instance()
    
    var instancesRepo = createInstancesManagement()
    var instances = instancesRepo.getByType(self.instanceId)
    var entitiesRepo = createEntityManagement()
    var currentEntity = entitiesRepo.getById(self.instanceId)
    // var entities = entitiesRepo.getAll()

    var instancesList = instances.map(i=>{
        return{name:i.name, uuid:i.uuid}
    })
    folderComponent.onClick = sideMenuClickAction(self)
    folderComponent.addItem = addClickAction(self)
    folderComponent.list = [
        {name:currentEntity.name, _children:instancesList},
        // {name:"Chapitre 2 ", _children:[
        //     {name:"Item 1"},
        //     {name:"Item 2"},
        // ]},
    ];

    var structuresRep = createStructuresManagement()
    // var structuresList = structuresRep.getAll()
    var structuresList = structuresRep.getChildrenOfId(self.instanceId)
    for (let i = 0; i < structuresList.length; i++) {
        const element = structuresList[i];
        folderComponent.list.push({name:element.name})
    }

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
        showCollections(self)
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
            <div class="project_selection_logo"></div>
            <div class="has-text-centered project_selection_sub_title">
                    Collections spec
            </div>
            
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