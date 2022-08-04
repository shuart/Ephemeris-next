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

var addToProject = function(event, data, instance){
    var projectId = projectManagement.getCurrent().id
    console.log(projectId)
    projectManagement.getProjectStore(projectId,"default").add({theTime:Date.now()})
    instance.update()
}
var getItemsList = function (){
    var projectId = projectManagement.getCurrent().id
    console.log(projectId)
    // return projectManagement.getProjectStore(projectId,"default").getAll().map((i)=> {return {value:i.name, onClick:(event, data, instance)=> console.log(i.id, instance)} } )
    return projectManagement.getProjectStore(projectId,"default").getAll()
    // return projectManagement.getProjectStore(projectId,"default").getAll().toString()
}

var setUpData = function (event, data, instance) {
    console.log(getCurrentProject);
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



var project_dashboard =createAdler({
    content: p => `
        <p class="action1">${p.currentUserName} world</p>
        <p class="action1">${p.currentProject} world</p>
        <p class="action2">hoover area</p>

        <div class="example-table" a-id="table" adler="table_component" >table area</div>

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
            onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
            onMount:(event, data, instance) => setUpTable(event, data, instance),
        },
    },
    components:{
        table_component: table_component
    }
})

export default project_dashboard