import createAdler from "../../vendor/adler.js";
import userManagement from "../common_user_management/user_management.js";
import projectManagement from "../common_project_management/project_management.js";
import project_card from "../common_ui_elements/project_card.js";
import state from "../common_state/state_manager.js";
import { createTemplateManager } from "../common_import_export/common_import_export.js";
import imageStore from "../common_image_store/common_image_store.js";

import createGraphManagement from "../common_project_management/graph_management.js";
import createSimulationManagement from "../common_project_management/simulation_management.js";
import { EventDispatcher } from "../../vendor/three.module.js";
import { createSimulationTemplateManager } from "./simulation_import_export.js";

// var getCurrentUser = function () {
//     return userManagement.getCurrentUser()
// }

// var addProject = function (event, data, instance) {
//     projectManagement.add({name:prompt("project")})
//     instance.setData({projects:setButtonList()});
// }
var addSimulationFromTemplate = function (event, data, instance, template) {
    alert (template)
    var repoSims = createSimulationManagement()
    var name = prompt("New Item Name")
    var description = prompt("Description")
    if(name && description){
        // repoSims.update({uuid:instance.props.get("simId"), previewImage:imageId, nodeLayout:JSON.stringify(exportGraph)})//Check how to get a preview image id
        repoSims.update({name:name, desc:description, nodeLayout:template})
        instance.update()
    }
    
    // projectManagement.addFromTemplate({name:prompt("project"), template:template})
    // instance.setData({projects:setButtonList()});
}

var newItem = function (event, data, instance) {
    // state.goTo("/:/graph/new")
    var name = prompt("New Item Name")
    var description = prompt("Description")
    if(name && description){
        var repo = createSimulationManagement()
        repo.add({name:name, desc:description})
        instance.update()
    }
}
var goToItem = function (event) {
    event.preventDefault()
    state.goTo("/:/simulation/"+event.target.dataset.id)
}

var deleteGraph= function (event,instance) {
    if (confirm("Delete?") ) {
        var repo = createSimulationManagement()
        event.preventDefault()
        repo.remove(event.target.dataset.id) 
        instance.update()
    }
    
}

var editCardInfo= function (event,instance) {
    if (confirm("edit?") ) {
        event.preventDefault()
        var name = prompt("New Item Name")
        var description = prompt("Description")
        if(name && description){
            var repo = createSimulationManagement()
            repo.add({uuid:event.target.dataset.id, name:name, desc:description})
            instance.update()
        }
    }
    
}

// var setProjectAndGoTo = function (id) {
//     // projectManagement.setCurrent(id)
//     console.log(id);
//     state.goTo("/"+id+"/dashboard")
// }

// var setButtonList = ()=>{
//     return projectManagement.getAll().map((i)=> {return {value:i.name, onClick:(event, data, instance)=> setProjectAndGoTo(i.id)} } )
// }


var setUp = function (event, data, instance) {
    // instance.setData({currentUserName:getCurrentUser().name}, false);
    // instance.setData({projects:setButtonList()}, false);
    var repo = createSimulationManagement()
    
    var graphs = repo.getAll()
    var graphArea = instance.query('.graph_selection_select_area')
    graphArea.innerHTML=""
    for (let i = 0; i < graphs.length; i++) {
        const element = graphs[i];
        graphArea.appendChild( renderItemPreview({uuid:element.uuid, name:element.name,previewImage:element.attributes.previewImage, description:element.attributes.desc, instance}) )
        if (element.attributes.previewImage) {
            imageStore.get(element.attributes.previewImage,function(result){
                instance.query("."+element.attributes.previewImage).src=result.dataUri
            })
        }
    }


}

var renderItemPreview = function({
    name="No Name",
    description="",
    uuid=undefined,
    instance=undefined,
    previewImage=undefined,

    }={}){
    var card = document.createElement("div")
    card.classList ="card no_break_inside"
    var html = /*html*/`
        <div class="card-image">
            <figure class="image is-4by3">
            <img class="${previewImage}" src="./img/placeholders/img.gif" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-4">${name}</p>
                    <p class="subtitle is-6">Simulation</p>
                </div>
            </div>

            <div class="content">
                ${description}
            <br>
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            
            </div>
            
        </div>
        <footer class="card-footer">
                <a  data-id="${uuid}" class="action_tools_graphs_selection_go card-footer-item">Open</a>
                <a data-id="${uuid}" class="action_tools_graphs_selection_remove card-footer-item">Delete</a>
                <a data-id="${uuid}" class="action_tools_graphs_selection_edit card-footer-item">Edit</a>
        </footer>
    `
    card.innerHTML = html
    card.querySelector(".action_tools_graphs_selection_go").addEventListener("click",goToItem)
    card.querySelector(".action_tools_graphs_selection_remove").addEventListener("click",function (event) {
        deleteGraph(event, instance)
    })
    card.querySelector(".action_tools_graphs_selection_edit").addEventListener("click",function (event) {
        editCardInfo(event, instance)
    })
    return card
}

var simulation_selector =createAdler({
    content: p => /*html*/`
            <div class="project_selection_logo"></div>
            <div class="has-text-centered project_selection_sub_title">
                    projects
            </div>
            <div class="has-text-centered">
                <button class="action_tools_graphs_selection_add button is-primary is-rounded">Add</button>
                <button class="action_simulation_selection_add_from_template button is-rounded is-light">Add from template</button>
            </div>
            
            <div class="graph_selection_select_area masonry">

            </div><!-- .masonry -->
        `,
    params:{
        data:{
            test:"project seelction",
            test2:"seelction",
            projects:undefined,
        },
        on:[
            // [".action1","click", (event, data)=> alert("test "+ data.test)],
            // [".action2","click", (event, data, instance)=> instance.setData({test:"barr"}) ],
            [".action_tools_graphs_selection_add","click", (event, data, instance)=> newItem(event, data, instance) ],
            [".action_tools_graphs_selection_go","click", (event, data, instance)=> goToGraph(event, data, instance) ],
            [".action_simulation_selection_add_from_template","click", (event, data, instance)=> createSimulationTemplateManager().importTemplateFromFile(  (content)=>addSimulationFromTemplate(event, data, instance, content)  ) ],
            
        ],
        events:{
            // onBeforeMount:(event, data, instance)=> alert("MOUNTING"),
            onMount:(event, data, instance) => setUp(event, data, instance),
        },
    },
    css:`

        
    `,
    components:{
        // project_card: project_card
    }
})

export default simulation_selector