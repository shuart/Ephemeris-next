import projectManagement from "../common_project_management/project_management.js";
import userManagement from "../common_user_management/user_management.js";
import createAdler from "../../vendor/adlerLegacy.js";

import createInstancesManagement from "../common_project_management/instances_management.js";
import project_views from "../project_views/project_views.js";
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

var setUpTable = function (event, data, instance) {
    console.log(instance.getNodes());
    // instance.getNodes().table.setData({list:getItemsList()})
    var instanceRepo = createInstancesManagement()
    if (data.instanceId) {
        var currentInstance = instanceRepo.getById(data.instanceId)
        var sourceEntity = currentInstance.sourceEntity

        instance.append(project_views.instance({data:{viewId:sourceEntity.defaultViewId, calledFromInstance:data.instanceId}}), "main-slot")
        
        // mainPopup.append(select.instance({
        //     data:{
        //         list:[{name:instanceId, value:instanceId, uuid:instanceId}],
        //         // callback:function(event){ cell.getData().setDefaultViewId(event.value.uuid) }
        //     }
        // }), "main-slot")
        // instance.update();
    }
    
}


var instance_view =createAdler({
    content: p => `
        <div class="instance_view_container">
            <div class="container">
                <div a-slot="main-slot" class=""></div>
            </div>
        </div>
        `
        ,
    params:{
        data:{
            instanceId:false,
            currentUserName:"Hello",
            currentProject:"push",
            currentItems:undefined,
            seen:true,
            list:[{test:"un"}, {test:"deux"}, {test:"trois"} ]
        },
        on:[
            // [".action1","click", (event, data)=> alert("test "+ data.test)],
            // [".action2","click", (event, data, instance)=> addToProject(event, data, instance) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance)=> alert("MOUNTING"),
            // onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
            onBeforeMount:(event, data, instance) => setUpTable(event, data, instance),
        },
    },
    components:{
        // table_component: table_component
    },
    css:/*css*/`
    
    .instance_view_container{
        height:100%;
        width:100;
        overflow:auto;
    }
    
    
    `,
})

export default instance_view