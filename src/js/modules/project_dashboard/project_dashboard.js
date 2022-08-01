import projectManagement from "../common_project_management/project_management.js";
import userManagement from "../common_user_management/user_management.js";
import createAdler from "../../vendor/adler.js";

var getCurrentUser = function(){
    return userManagement.getCurrentUser()
}
var getCurrentProject = function(){
    return projectManagement.getCurrent()
}

var setUpData = function (event, data, instance) {
    console.log(getCurrentProject);
    instance.setData({
        currentUserName:getCurrentUser().name,
        currentProject:getCurrentProject().name,

     }, false)
}

var project_dashboard =createAdler({
    content: p => `
        <p class="action1">${p.currentUserName} world</p>
        <p class="action1">${p.currentProject} world</p>
        <p class="action2">hoover area</p>

        `
        ,
    params:{
        data:{
            currentUserName:"Hello",
            currentProject:"push",
            seen:true,
            list:[{test:"un"}, {test:"deux"}, {test:"trois"} ]
        },
        on:[
            [".action1","click", (event, data)=> alert("test "+ data.test)],
            [".action2","click", (event, data, instance)=> instance.setData({test:"barr"}) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance)=> alert("MOUNTING"),
            onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
        },
    },
    components:{
        // button: button
    }
})

export default project_dashboard