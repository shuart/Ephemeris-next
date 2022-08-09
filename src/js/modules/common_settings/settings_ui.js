import projectManagement from "../common_project_management/project_management.js";
import userManagement from "../common_user_management/user_management.js";
import createAdler from "../../vendor/adler.js";

import table_component from "../common_ui_components/table/table.js";

// import {Tabulator} from "../../vendor/tabulator_esm.min.js";

var getCurrentUser = function(){
    return userManagement.getCurrentUser()
}
var getCurrentProject = function(){
    return projectManagement.getCurrent()
}

var addEntityToProject = function(event, data, instance){
    var projectId = projectManagement.getCurrent().id
    console.log(projectId)
    projectManagement.getProjectStore(projectId,"entities").add({theTime:Date.now()})
    instance.getNodes().table.do.softUpdate()
    // instance.update()
}
var getItemsList = function (){
    var projectId = projectManagement.getCurrent().id
    console.log(projectId)
    // return projectManagement.getProjectStore(projectId,"default").getAll().map((i)=> {return {value:i.name, onClick:(event, data, instance)=> console.log(i.id, instance)} } )
    return projectManagement.getProjectStore(projectId,"entities").getAll()
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



var common_settings =createAdler({
    content: p => /*html*/`
        <p class="action1">SETTINGS {p.currentUserName} world</p>
        <p class="action1">${p.currentProject} world</p>
        <div class="container">
            <nav class="navbar" role="navigation" aria-label="main navigation">

                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                    <a class="navbar-item action_settings_add_entity">
                        Add
                    </a>

                    <a class="navbar-item">
                        Documentation
                    </a>

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                        More
                        </a>

                        <div class="navbar-dropdown">
                        <a class="navbar-item">
                            About
                        </a>
                        <a class="navbar-item">
                            Jobs
                        </a>
                        <a class="navbar-item">
                            Contact
                        </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item">
                            Report an issue
                        </a>
                        </div>
                    </div>
                    </div>

                    <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                        <a class="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                        <a class="button is-light">
                            Log in
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
            </nav>
        

            <div class="example-table" a-id="table" a-props="test:test" adler="table_component" >table area</div>
        </div>
        `
        ,
    params:{
        props:{
            test:200,
        },
        listen:{
            test:function(){
                // alert("depli")
            },
        },
        data:{
            currentUserName:"Hello",
            currentProject:"push",
            currentItems:undefined,
            seen:true,
            list:[{test:"un"}, {test:"deux"}, {test:"trois"} ]
        },
        on:[
            // [".action1","click", (event, data)=> alert("test "+ data.test)],
            [".action_settings_add_entity","click", (event, data, instance)=> addEntityToProject(event, data, instance) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance)=> alert("MOUNTING"),
            onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
            onMount:(event, data, instance) => setUpTable(event, data, instance),
        },
    },
    components:{
        table_component: table_component
    }
})

export default common_settings