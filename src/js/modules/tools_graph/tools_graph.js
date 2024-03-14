import projectManagement from "../common_project_management/project_management.js";
import userManagement from "../common_user_management/user_management.js";
import createAdler from "../../vendor/adlerLegacy.js";
import createStellae from "../../vendor/stellae/stellae.js";
import projectStores from "../common_project_management/project_data_store.js";
import imageStore from "../common_image_store/common_image_store.js";
import mainPopup from "../common_ui_components/mainPopup/mainPopup.js"
import select from "../common_ui_components/select/select.js"

import createRelationManagement from "../common_project_management/relations_management.js";
import createInstancesManagement from "../common_project_management/instances_management.js";
import createRelationInstancesAggregate from "../common_project_management/relationInstances_management.js";
import project_views from "../project_views/project_views.js";
import createEntityManagement from "../common_project_management/entity_management.js";
import createSimulationManagement from "../common_project_management/simulation_management.js";
import table_component from "../common_ui_components/table/table.js";
import createGraphManagement from "../common_project_management/graph_management.js";
import nanoid from "../../vendor/nanoid.js";
import showPopupInstancePreview from "../popup_instance_preview/popup_instance_preview.js";

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

var saveGraph = function(event, data, instance){
    var render = data.graph.getNodeManager().getScreenshot({height:200})
    
    // var img = new Image();
    //         img.src = render;
    // document.body.appendChild(img)
    
    console.log(render);
    var exportGraph = data.graph.getNodeManager().exportNodes()
    if (data.instanceId =="new") {
        var name = prompt("Save As")
        if (name) {
            var imageId = imageStore.set(render)
            var uuid = nanoid()
            var repo = createGraphManagement()
            console.log(exportGraph);
            repo.add({uuid:uuid, name:name, previewImage:imageId, lastSaved:Date.now(), layout:JSON.stringify(exportGraph)})
            instance.query('.tools_graphs_name').innerHTML =name
            data.instanceId = uuid
        }
    }else{
        if (confirm("Save?") ) {
            var repo = createGraphManagement()
            repo.update({uuid:data.instanceId,lastSaved:Date.now(), layout:JSON.stringify(exportGraph)})
            if (data.graphPreviewId) {
                imageStore.set({uuid:data.graphPreviewId, dataUri:render})
            }
        }
    }
}

var showConnectOptions = function (sourceItemId, targetItemId, graph) {
    var instanceRepo = createInstancesManagement()
    var currentSelectedInstance = instanceRepo.getById(sourceItemId)
    var targetItem = instanceRepo.getById(targetItemId)
    var mainPopupNarrow = mainPopup.with({data:{narrow:true,title:"Select Items"}})
    console.log(targetItem,currentSelectedInstance)
    mainPopupNarrow.mount()
    mainPopupNarrow.append(select.instance({
        data:{
            list:currentSelectedInstance.getPotentialRelationsWithInstance(targetItem.uuid),
            callback:function(eventInCallback){ //TODO add callback
                currentSelectedInstance.addRelation(eventInCallback.value.uuid,targetItem.uuid)
                console.log(currentSelectedInstance.uuid, targetItem.uuid);
                graph.getNodeManager().addLinks([{name:eventInCallback.value.name, from:currentSelectedInstance.uuid, from_socket:"out", to:targetItem.uuid, to_socket:"in"}])
                mainPopupNarrow.unmount()
                
            }
        }
    }), "main-slot")
    mainPopupNarrow.update();
}

var customNewNodeList = function(data){
    var entityRepo = createEntityManagement()
    var allEntities = entityRepo.getAll()
    var addList  =[]
    for (let i = 0; i < allEntities.length; i++) {
        const entity = allEntities[i];
        addList.push({id:"action_Input", value:entity.name, params:{ nodeLayout:"round",uuid:nanoid(), userData:{type:entity.name, entityUuid:entity.uuid}, name:entity.name, headerColor:entity.attributes.color, imgPath:'img/icons/'+entity.attributes.iconPath}})
    }
    console.log(allEntities);
    return addList
}

var addNodeCallback = function (data) {
    console.log(data);
    var params = data.input.params;
    var instancesRepo = createInstancesManagement()
    instancesRepo.add({uuid:params.uuid,name:params.name,theTime:Date.now(), type:params.userData.entityUuid})
}


var createNewGraph =function(event,data, instance){
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
    for (let i = 0; i < itemsData.list.length; i++) {
        var currentInstance = itemsData.list[i];
        if (currentInstance && !currentInstance.properties) {
            currentInstance = instanceRepo.getById(currentInstance.uuid) //NEDED because instance repo cannot be loaded in the domain. TODO, find a workaround
        }
        data.graph.getNodeManager().addNode("action_Input", { nodeLayout:"round",uuid:currentInstance.uuid, name:currentInstance.name, headerColor:currentInstance.color, imgPath:'img/icons/'+currentInstance.sourceEntity.iconPath})
        // data.graph.getNodeManager().addNode("action_Input", { uuid:element.uuid, name:element.name})
    }
    data.graph.getNodeManager().addLinks(itemsData.links)
}


var setUpTable = function (event, data, instance) {
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
            uiCallbacks : {
                onConnect:(e)=>showConnectOptions(e.input.sourceItem, e.input.targetItem, data.graph),
                onNodeClick:(e)=>showPopupInstancePreview(e.input.targetItem),
                onNodeAdd:(e)=>addNodeCallback(e),
            },
            showNodeList:true,
            showSearchBox: true,
            showToolbar:true,
            highlightConnections: false,
            addNodesFromCustomList:customNewNodeList,
            allowCustomNameForNodes: true,
            allowCustomNameForRelations: false,
        })
        data.graph.getNodeManager().useTemplate(graphUiTemplates)

        if (data.instanceId =="new") {
            createNewGraph(event,data, instance)
        }else{
            var graphRepo = createGraphManagement()
            var graph = graphRepo.getById(data.instanceId)
            instance.query('.tools_graphs_name').innerHTML =graph.name
            data.graphPreviewId = graph.attributes.previewImage
            data.graph.getNodeManager().importGraph(JSON.parse(graph.attributes.layout))
        }
        // data.graph.getNodeManager().addNode("in_out", { nodeLayout:"group",uuid:"feefsfesfsefsdfsd", name:"group", headerColor:"#c0bfbc", imgPath:'img/iconsPNG/info.svg'})
    }, 100);
    // subscribeToDB(event, data, instance)
}


var tools_graph =createAdler({
    content: p => `
        <div class="instance_view_container">
            <div  class="container block graph_top_menu">
                <span class="tag tools_graphs_name">New Graph</span>
                <span class="button is-small action_tools_graphs_save_current">Save</span>
            </div>
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
            graphPreviewId : undefined,
            list:[{test:"un"}, {test:"deux"}, {test:"trois"} ]
        },
        on:[
            // [".action1","click", (event, data)=> alert("test "+ data.test)],
            [".action_tools_graphs_save_current","click", (event, data, instance)=> saveGraph(event, data, instance) ],
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
    .graph_top_menu{
        position:absolute;
        height:50px;
        width:500px;
        overflow:auto;
        z-index: 999;
        margin-left: 200px;
        padding: 9px;
    }
    
    
    
    `,
})

export default tools_graph