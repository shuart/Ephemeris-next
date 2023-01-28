import projectManagement from "../common_project_management/project_management.js";
import userManagement from "../common_user_management/user_management.js";
import createAdler from "../../vendor/adler.js";
import createStellae from "../../vendor/stellae/stellae.js";
import projectStores from "../common_project_management/project_data_store.js";

import createRelationManagement from "../common_project_management/relations_management.js";
import createInstancesManagement from "../common_project_management/instances_management.js";
import createRelationInstancesAggregate from "../common_project_management/relationInstances_management.js";
import project_views from "../project_views/project_views.js";
import createEntityManagement from "../common_project_management/entity_management.js";
import createSimulationManagement from "../common_project_management/simulation_management.js";
import table_component from "../common_ui_components/table/table.js";

// import {Tabulator} from "../../vendor/tabulator_esm.min.js";

var graphUiTemplates = {}
graphUiTemplates.actionInput = {
    templateName : "action_Input",
    name : "action_Input",
    props :[
        {id:"in", label:"clicked_item", type:"hidden", editable:false, socket:"input", value:()=>"test1"},
        {id:"out", label:"clicked_item_uuid", type:"hidden", editable:false, socket:"output", value:()=>"test2"},
    ],
    methods:{},
    event:{
        onEvaluate:(props) =>{
        },
        // onInit:(props) =>{
        // },
    },
}

var getCurrentUser = function(){
    return userManagement.getCurrentUser()
}
var getCurrentProject = function(){
    return projectManagement.getCurrent()
}

var setUpTable = function (event, data, instance) {
    var relationsRepo = createRelationManagement()
    var relationTypes = relationsRepo.getAll()
    var relationMapping = {}
    for (let i = 0; i < relationTypes.length; i++) {
        relationMapping[relationTypes[i].uuid] = relationTypes[i];
        
    }
    var instanceRepo = createInstancesManagement()
    var relationInstancesRepo = createRelationInstancesAggregate()
    var itemsData = {}
    itemsData.list = instanceRepo.getAll()
    var relationsFromDb = relationInstancesRepo.getAll()
    itemsData.links = relationsFromDb.map(r=> ({uuid:r.attributes.uuid,name:relationMapping[r.attributes.type]?.name, from:r.attributes.from, from_socket:"out", to:r.attributes.to, to_socket:"in",}) )
    // itemsData.links = []
    //  data.addAction = itemsData.actions
    //  instance.props.set("addAction",itemsData.actions )
     setTimeout(() => {
        var element= instance.query('.graph_component')
        element.innerHTML = ''//TODO GRAPH IS LOADED 2 TIMES. PREVENT THAT
        data.graph = createStellae({
            container:element, 
            fullSize:true,
            simulateForces:true, 
            // uiCallbacks:itemsData.uiCallbacks, 
            canvasHeight:1500,
            uiCallbacks : {},
            showNodeList:true,
            showSearchBox: true,
            showToolbar:true,
            highlightConnections: true,
            addNodesFromCustomList:false,
            allowCustomNameForNodes: false,
            allowCustomNameForRelations: false,
        })
        data.graph.getNodeManager().useTemplate(graphUiTemplates)
        for (let i = 0; i < itemsData.list.length; i++) {
            var currentInstance = itemsData.list[i];
            console.log(element);
            if (currentInstance && !currentInstance.properties) {
                currentInstance = instanceRepo.getById(currentInstance.uuid) //NEDED because instance repo cannot be loaded in the domain. TODO, find a workaround
            }
            data.graph.getNodeManager().addNode("action_Input", { nodeLayout:"round",uuid:currentInstance.uuid, name:currentInstance.name, headerColor:currentInstance.color, imgPath:'img/iconsPNG/'+currentInstance.sourceEntity.iconPath})
            // data.graph.getNodeManager().addNode("action_Input", { uuid:element.uuid, name:element.name})
        }
        data.graph.getNodeManager().addLinks(itemsData.links)
        // data.graph.getNodeManager().addNode("in_out", { nodeLayout:"group",uuid:"feefsfesfsefsdfsd", name:"group", headerColor:"#c0bfbc", imgPath:'img/iconsPNG/info.svg'})
    }, 100);

    // subscribeToDB(event, data, instance)
}


var tools_graph =createAdler({
    content: p => `
        <div class="instance_view_container">
            <div a-slot="main-slot" class="graph_component"></div>
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
    .graph_component{
        position:relative;
        height:100%;
        width:100;
        overflow:auto;
    }
    
    
    `,
})

export default tools_graph