import createAdler from "../../vendor/adler.js";
import userManagement from "../common_user_management/user_management.js";
import projectManagement from "../common_project_management/project_management.js";
import project_card from "../common_ui_elements/project_card.js";

// var getCurrentUser = function () {
//     return userManagement.getCurrentUser()
// }

var addProject = function (event, data, instance) {
    projectManagement.add({name:prompt("project")})
    instance.setData({projects:setButtonList()});
}

var setButtonList = ()=>{
    return projectManagement.getAll().map((i)=> {return {value:i.name, onClick:(event, data, instance)=> console.log("projet")} } )
}

var project_selection =createAdler({
    content: p => /*html*/`
            <button class="action1 adlerButton">${p.currentUserName} world</button><p class="action2">${p.test2} here</p>
            <button class="action_project_selection_add_project button">Button</button>
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
            [".action1","click", (event, data)=> alert("test "+ data.test)],
            [".action2","click", (event, data, instance)=> instance.setData({test:"barr"}) ],
            [".action_project_selection_add_project","click", (event, data, instance)=> addProject(event, data, instance) ],
            
        ],
        events:{
            // onBeforeMount:(event, data, instance)=> alert("MOUNTING"),
            // onBeforeMount:(event, data, instance) => instance.setData({currentUserName:getCurrentUser().name}, false),
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
        
    `,
    components:{
        project_card: project_card
    }
})

export default project_selection