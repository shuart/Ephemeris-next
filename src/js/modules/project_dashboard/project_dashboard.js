import projectManagement from "../common_project_management/project_management.js";
import userManagement from "../common_user_management/user_management.js";
import createAdler from "../../vendor/adler.js";

import createEntityManagement from "../common_project_management/entity_management.js";
import createSimulationManagement from "../common_project_management/simulation_management.js";
import table_component from "../common_ui_components/table/table.js";

// import {Tabulator} from "../../vendor/tabulator_esm.min.js";

var getCurrentUser = function(){
    return userManagement.getCurrentUser()
}
var getCurrentProject = function(){
    return projectManagement.getCurrent()
}

var addToProject = function(event, data, instance){
    var projectId = projectManagement.getCurrent().id
    console.log(projectId)
    projectManagement.getProjectStore(projectId,"default").add({theTime:Date.now()})
    instance.getNodes().table.do.softUpdate()
    // instance.update()
}
var getItemsList = function (){
    var projectId = projectManagement.getCurrent().id
    console.log(projectId)
    // return projectManagement.getProjectStore(projectId,"default").getAll().map((i)=> {return {value:i.name, onClick:(event, data, instance)=> console.log(i.id, instance)} } )
    return projectManagement.getProjectStore(projectId,"default").getAll()
    // return projectManagement.getProjectStore(projectId,"default").getAll().toString()
}

var setUpData = function (event, data, instance) {
    console.trace(getCurrentProject);
    instance.setData({
        currentUserName:getCurrentUser().name,
        currentProject:getCurrentProject().name,
        // currentItems:getItemsList(),

     }, false)
}

var setUpTable = function (event, data, instance) {
     console.log(instance.getNodes());
     instance.getNodes().table.setData({list:getItemsList()})
}

var createItemLayout = function (image, name, color, qt, link) {
    return `
    <div class="media">
        <div class="media-left">
        <figure class="image is-24x24">
            <img class="darkModeCompatibleIcons" src="./img/icons/${image}">
        </figure>
        </div>
        <div class="media-content">
            <div class="tags is-small has-addons">
                <span style="background-color:${color};" class="tag is-primary">${name}</span>
                <span class="tag is-dark">${qt}</span>
            </div>
        </div>
    </div>`
}


var setUpDashboard = function (event, data, instance) {
    setUpData(event, data, instance)
    var entityRepo = createEntityManagement()
    var entities = entityRepo.getAll()
    var summaryArea= instance.query('.current_items')
    
    entities.forEach(e=>{
        summaryArea.innerHTML += createItemLayout(e.attributes.iconPath, e.name, e.attributes.color, e.getInstances().length)
    })
    
}


var project_dashboard =createAdler({
    content: p => `
        <div class="dashboard_logo"></div>
        <div class="has-text-centered dashboard_sub_title">
            <b>${p.currentProject}<b> dashboard
        </div>

        <div class="container is-widescreen">
            <div class="tile is-ancestor">
                <div class="tile is-vertical is-8">
                    <div class="tile">
                        <div class="tile is-parent is-vertical">
                            <article class="tile is-child notification box">
                            <p class="title">Events</p>
                            <p class="subtitle">Last Events</p>
                            </article>
                            <article class="tile is-child notification box">
                            <p class="title">Verifications</p>
                            <p class="subtitle">Current Verifications status</p>
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child notification box">
                            <p class="title">Graph</p>
                            <p class="subtitle">Current Graph</p>
                            <figure class="image is-4by3">
                                <img src="./img/icons/git-branch.svg">
                            </figure>
                            </article>
                        </div>
                    </div>
                    <div class="tile is-parent">
                    <article class="tile is-child notification box">
                        <p class="title">Last simulation</p>
                        <p class="subtitle">Jump back</p>
                        <div class="content">
                            
                        </div>
                    </article>
                    </div>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child notification box">
                    <div class="content">
                        <p class="title">Elements</p>
                        <p class="subtitle"></p>
                        <div class="content current_items">
                        
                        </div>
                    </div>
                    </article>
                </div>
            </div>
        </div>
        `
        ,
    params:{
        data:{
            currentUserName:"Hello",
            currentProject:"push",
            currentItems:undefined,
            seen:true,
            list:[{test:"un"}, {test:"deux"}, {test:"trois"} ]
        },
        on:[
            // [".action1","click", (event, data)=> alert("test "+ data.test)],
            [".action2","click", (event, data, instance)=> addToProject(event, data, instance) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance)=> alert("MOUNTING"),
            // onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
            onMount:(event, data, instance) => setUpDashboard(event, data, instance),
        },
    },
    components:{
        table_component: table_component
    },
    css:`
        .dashboard_logo{
            width: 150px;
            margin: auto;
            height: 150px;
            background-image: url("./img/logo.png");
            background-size: contain;
            background-repeat: no-repeat;
        }
        .dashboard_sub_title{
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
})

export default project_dashboard