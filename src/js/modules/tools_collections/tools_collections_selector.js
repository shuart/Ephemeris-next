import { createAdler } from "../../vendor/adler.js";
import createCollectionsManagement from "../common_project_management/collections_management.js";
import createEntityManagement from "../common_project_management/entity_management.js";
import state from "../common_state/state_manager.js";
import { showEntitiesSelector } from "../common_selectors/entities_selector.js";

var showCollections = function (self) {
    var entitiesRepo = createEntityManagement()
    var entities = entitiesRepo.getAll()
    var collectionsRepo = createCollectionsManagement()
    var collections = collectionsRepo.getAll()
    var mountPlace = self.query(".graph_selection_select_area")
    mountPlace.innerHTML=""

    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        var link = document.createElement("div")
        link.innerHTML=entity.name 
        link.addEventListener("click", function () {
            state.goTo("/:/collection/"+entity.uuid)
        })
        mountPlace.append(link)
    }
    for (let i = 0; i < collections.length; i++) {
        const collection = collections[i];
        // var link = document.createElement("div")
        // link.innerHTML=collection.name 
        // link.addEventListener("click", function () {
        //     state.goTo("/:/collection/"+entity.uuid)
        // })
        mountPlace.append(createTile(collection, self))
    }
}

var createTile = function (data, self) {
    console.log(data);
    var hasEntitites = data.getEntities()
    var elem = document.createElement("div")
    elem.innerHTML=`
    <div class="card">
        <header class="card-header">
        <p class="card-header-title">
            ${data.name}
        </p>
        <button class="card-header-icon" aria-label="more options">
            <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
        </button>
        </header>
        <div class="card-content">
        <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
            <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
            <br>
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
        </div>
        <footer class="card-footer">
        <div href="#" data-id=${data.uuid} class="card-footer-item">Set entities</div>
        </footer>
    </div>
    `
    elem.querySelector(".card-header-title").addEventListener("click", function () {
        state.goTo("/:/collection/"+data.uuid)
    })
    elem.querySelector(".card-footer-item").addEventListener("click", function () {
        // state.goTo("/:/collection/"+data.uuid)
        showEntitiesSelector({
            selected : hasEntitites,
            onChange: (e,f)=> {
                data.addEntities(f.added)
                data.removeEntities(f.removed)
                showCollections(self)
            },
        })
    })
    return elem
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

        self.query(".action_tools_collections_selection_add").addEventListener("click", function () {
            var collectionName = prompt("name")
            if (collectionName !="") {
                var collectionsRepo = createCollectionsManagement()
                collectionsRepo.add({name:collectionName})
            }
            showCollections(self)
        })
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
        <button class="action_tools_collections_selection_add button is-primary is-rounded">Add</button>
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