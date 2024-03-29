import createAdler from "../../vendor/adlerLegacy.js";
import userManagement from "../common_user_management/user_management.js";
import projectManagement from "../common_project_management/project_management.js";
import project_card from "../common_ui_elements/project_card.js";
import state from "../common_state/state_manager.js";
import { createTemplateManager } from "../common_import_export/common_import_export.js";

var getCurrentUser = function () {
    return userManagement.getCurrentUser()
}

var addProject = function (event, data, instance) {
    var currentUserId = getCurrentUser()?.id
    projectManagement.add({name:prompt("project"), createdBy:currentUserId})
    instance.setData({projects:setButtonList()});
}
var addProjectFromTemplate = function (event, data, instance, template) {
    projectManagement.addFromTemplate({name:prompt("project"), template:template})
    instance.setData({projects:setButtonList()});
}

var setProjectAndGoTo = function (id) {
    // projectManagement.setCurrent(id)
    console.log(id);
    state.goTo("/"+id+"/dashboard")
}

var setButtonList = ()=>{
    var currentUserId = getCurrentUser()?.id
    return projectManagement.getAll().filter(function(p){
        if (p.createdBy && p.createdBy != currentUserId) {
            return false
        }else  {
            return true
        }
    }).map((i)=> {return {value:i.name, onClick:(event, data, instance)=> setProjectAndGoTo(i.id)} } )
}
var setUp = function (event, data, instance) {
    instance.setData({currentUserName:getCurrentUser().name}, false);
    instance.setData({projects:setButtonList()}, false);
}

var project_selection =createAdler({
    content: p => /*html*/`
            <div class="project_selection_logo"></div>
            <div class="has-text-centered project_selection_sub_title">
                ${p.currentUserName}'s projects
            </div>
            <div class="has-text-centered">
                <button class="action_project_selection_add_project button is-primary is-rounded">Add</button>
                <button class="action_project_selection_add_project_from_template button is-rounded is-light">Add from template</button>
            </div>
            
            <div a-for="projects" adler="project_card" class="masonry">

            </div><!-- .masonry -->
        `,
    params:{
        data:{
            test:"project seelction",
            test2:"seelction",
            projects:setButtonList(),
        },
        on:[
            // [".action1","click", (event, data)=> alert("test "+ data.test)],
            [".action2","click", (event, data, instance)=> instance.setData({test:"barr"}) ],
            [".action_project_selection_add_project","click", (event, data, instance)=> addProject(event, data, instance) ],
            [".action_project_selection_add_project_from_template","click", (event, data, instance)=> createTemplateManager().importTemplateFromFile(  (content)=>addProjectFromTemplate(event, data, instance, content)  ) ],
            
        ],
        events:{
            // onBeforeMount:(event, data, instance)=> alert("MOUNTING"),
            onBeforeMount:(event, data, instance) => setUp(event, data, instance),
        },
    },
    css:`
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
        
    `,
    components:{
        project_card: project_card
    }
})

export default project_selection