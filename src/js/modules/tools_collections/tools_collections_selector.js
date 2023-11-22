import { createAdler } from "../../vendor/adler.js";
import createEntityManagement from "../common_project_management/entity_management.js";
import state from "../common_state/state_manager.js";

var showCollections = function (self) {
    var entitiesRepo = createEntityManagement()
    var entities = entitiesRepo.getAll()
    var mountPlace = self.query(".graph_selection_select_area")

    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        var link = document.createElement("div")
        link.innerHTML=entity.name 
        link.addEventListener("click", function () {
            state.goTo("/:/collection/"+entity.uuid)
        })
        mountPlace.append(link)
    }
}


var toolsCollectionsSelector =createAdler({
    tag:'collections-selector',
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
    },
    html: p => /*html*/`
    <link rel="stylesheet" href="css/bulma.min.css">
    <link rel="stylesheet" href="css/bulma.dark.css">
    <link rel="stylesheet" href="css/vendor/tabulator_semanticui.min.css">
    <link rel="stylesheet" href="css/vendor/tabulator_semanticui_dark.min.css">
    <link rel="stylesheet" href="css/main.css">

    <div class="project_selection_logo"></div>
    <div class="has-text-centered project_selection_sub_title">
            Collections
    </div>
    <div class="has-text-centered">
        <button class="action_tools_graphs_selection_add button is-primary is-rounded">Add</button>
        <button class="action_project_selection_add_project_from_template button is-rounded is-light">Add from template</button>
    </div>
    
    <div class="graph_selection_select_area masonry">
        `,
    css:/*css*/`

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
    
    @media (prefers-color-scheme: dark) {
        
        
      }
    `,
})

export default toolsCollectionsSelector