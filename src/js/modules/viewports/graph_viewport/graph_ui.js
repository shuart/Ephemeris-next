import createAdler from "../../../vendor/adlerLegacy.js";
// import table_component from "../../common_ui_components/table/table.js";
// import projectManagement from "../../common_project_management/project_management.js";
import createEvaluator from "../../common_evaluators/evaluators.js";
import createStellae from "../../../vendor/stellae/stellae.js";
import graphUiTemplates from "./graph_ui_node_templates.js";
import createInstancesManagement from "../../common_project_management/instances_management.js";
import createRelationInstancesAggregate from "../../common_project_management/relationInstances_management.js";
import { subscribeToSearchParam } from "../../common_state/state_change_subscription.js";
import state from "../../common_state/state_manager.js";
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";
import mainPopup from "../../common_ui_components/mainPopup/mainPopup.js"
import select from "../../common_ui_components/select/select.js"
import createRelationManagement from "../../common_project_management/relations_management.js";
import createEntityManagement from "../../common_project_management/entity_management.js";
import nanoid from "../../../vendor/nanoid.js";


var softUpdate= function (event, data, instance) {
    var itemsData = getItemsList(event,data, instance)
    console.log(itemsData);
    data.graph.getNodeManager().replaceData(itemsData.list, itemsData.links)
}

var addItem = function (event, data, instance) {

    instance.props.get("addAction" )()
    //update table
    var itemsData = getItemsList(event,data, instance)
    instance.getNodes().tablevp.setData({list:itemsData.list, cols:itemsData.cols}, false)
    instance.getNodes().tablevp.do.softUpdate()

}

var getItemsList = function (event, data, instance){
    var data = {}
    var useNodes = false
    var renderSettings = instance.props.get("settings").renderSettings
    if (renderSettings) {
        useNodes = renderSettings.useNodes || false
    }
    if (useNodes) {
        var evaluator = createEvaluator({originInstance:instance.props.get('settings').calledFromInstance, type:instance.props.get("settings").entityType , graphId:instance.props.get("settings").evaluatorId})
        console.log(evaluator);
        var evaluatorResult = evaluator.evaluate().output_graph
        if (!evaluatorResult) {
            return {list:[{name:"undefined LIST"}], cols:[]}
        }
        data.list =[]
        if (evaluatorResult.nodes && evaluatorResult.nodes[0]) {
            for (let i = 0; i < evaluatorResult.nodes.length; i++) {
                const entityGroup = evaluatorResult.nodes[i];
                if (entityGroup.uuid) { //in case the entity is not a field but a an isolated entity
                    data.list.push(entityGroup)
                }else{
                    for (let j = 0; j < entityGroup.length; j++) {
                        data.list.push(entityGroup[j])
                    }
                }
            }
        }
        data.links =[]
        // debugger
        if (evaluatorResult.links && evaluatorResult.links[0]) {
            for (let i = 0; i < evaluatorResult.links.length; i++) {
                const entityGroup = evaluatorResult.links[i];
                for (let j = 0; j < entityGroup.length; j++) {
                    console.log(entityGroup[j]);
                    if (entityGroup[j].uuid) {
                        data.links.push({uuid:entityGroup[j].uuid, from:entityGroup[j].from, from_socket:"out", to:entityGroup[j].to, to_socket:"in",})
                    }else{ //TODO Find why it is sometimes necessary
                        for (var prop in entityGroup[j]) { //TODO Should be optimized
                            for (let k = 0; k < entityGroup[j][prop].length; k++) {
                                data.links.push({uuid:entityGroup[j][prop][k].relation.uuid, from:entityGroup[j][prop][k].relation.from, from_socket:"out", to:entityGroup[j][prop][k].relation.to, to_socket:"in",})
                            }
                        }
                    }
                    
                    
                }
                
            }
        }
        data.actions =evaluatorResult.actions
        data.uiCallbacks={
            onConnect: evaluatorResult.onConnect,
            onNodeClick:evaluatorResult.onNodeClick
        } 
    }else if(renderSettings) {

        var instanceRepo = createInstancesManagement()
        var relationInstancesRepo = createRelationInstancesAggregate()
        var relationInstances= relationInstancesRepo.getAll()
        var instances = instanceRepo.getAll()
        var nodeInstances = []
        
        if (renderSettings.relationsToDisplay?.nodes) {
            for (let i = 0; i < instances.length; i++) {
                if ( renderSettings.relationsToDisplay?.nodes.includes(instances[i].attributes.type) ) {
                    nodeInstances.push(instances[i])
                }
            }
        }else{
            nodeInstances = instances
        }

        var relationsRepo = createRelationManagement() //create a mapping for adding name in relations
        var relationTypes = relationsRepo.getAll()
        var relationMapping = {}
        for (let i = 0; i < relationTypes.length; i++) {
            relationMapping[relationTypes[i].uuid] = relationTypes[i];
            
        }
        
        var arrowsInstances = []
        for (let j = 0; j < relationInstances.length; j++) {
            arrowsInstances.push({uuid:relationInstances[j].uuid, name:relationMapping[relationInstances[j].attributes.type]?.name, from:relationInstances[j].attributes.from, from_socket:"out", to:relationInstances[j].attributes.to, to_socket:"in",})
        }
        console.log(arrowsInstances);
        data.list =nodeInstances
        data.links =arrowsInstances
        if (!data.config) {
            data.config ={}
        }
        data.config.showSearch = renderSettings.showSearch
        data.config.showNodeList = renderSettings.showNodeList
        data.config.uiCallbacks = {
            onConnect:renderSettings.allowEditing ? (e)=>showConnectOptions(e.input.sourceItem, e.input.targetItem, data.graph) : undefined,
            onNodeClick:(e)=>showPopupInstancePreview(e.input.targetItem),
            onNodeAdd:(e)=>renderSettings.allowEditing ? addNodeCallback(e) : undefined,
        };
        data.config.allowEditing = renderSettings.allowEditing

    }else{

        var instanceRepo = createInstancesManagement()
        var relationInstancesRepo = createRelationInstancesAggregate()
        var relationInstances= relationInstancesRepo.getAll()
        var arrowsInstances = []
        for (let j = 0; j < relationInstances.length; j++) {
            arrowsInstances.push({uuid:relationInstances[j].uuid, from:relationInstances[j].attributes.from, from_socket:"out", to:relationInstances[j].attributes.to, to_socket:"in",})
        }
        console.log(arrowsInstances);
        data.list =instanceRepo.getAll()
        data.links =arrowsInstances
        
    }


    

    
    return data
}

var subscribeToDB = function (event, data, instance) {
    var updateFunc = function (params) {
        if (instance && instance.getDOMElement() && instance.getDOMElement().isConnected) {
            console.log(instance.getDOMElement());
            // alert("trigger event listen  enr") // TODO event is sometimes not cleared
            softUpdate(event, data, instance)
        }else{
            window.removeEventListener("cluster_update", updateFunc);
            // alert("removing event listener")
        }
        
    }
    window.addEventListener("cluster_update", updateFunc);
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

var updateSearchParam = function(event, data, instance){
    var selectedUuid =state.getSearchParam("selected")
    if (selectedUuid) {
        data.graph.getNodeManager().setFocus(selectedUuid, {mode:undefined,extendToRelations:true})
    }   
}

var setUpTable = function (event, data, instance) {
    var instanceRepo = createInstancesManagement()
    //  console.log(instance.getNodes());
    //  console.log(instance.props.settings.get());
     var itemsData = getItemsList(event,data, instance)
    //  data.addAction = itemsData.actions
    //  instance.props.set("addAction",itemsData.actions )
    //  instance.getNodes().tablevp.setData({list:itemsData.list, cols:itemsData.cols })
     setTimeout(() => {
        var element= instance.query('.graph_component')
        element.innerHTML = ''//TODO GRAPH IS LOADED 2 TIMES. PREVENT THAT
        data.graph = createStellae({
            container:element, 
            fullSize:true,
            showSearchBox : itemsData.config.showSearch,
            showNodeList : itemsData.config.showNodeList,
            simulateForces:true, 
            uiCallbacks:itemsData.uiCallbacks, 
            canvasHeight:1500,
            allowCustomNameForNodes: true,
            uiCallbacks : itemsData.config.uiCallbacks,
            addNodesFromCustomList:customNewNodeList,
            allowEditing: itemsData.config.allowEditing,
        })
        // showNodeList:true,
        //     showSearchBox: true,
        //     showToolbar:true,
        //     highlightConnections: false,
        data.graph.getNodeManager().useTemplate(graphUiTemplates)
        for (let i = 0; i < itemsData.list.length; i++) {
            var currentInstance = itemsData.list[i];
            console.log(element);
            if (currentInstance && !currentInstance.properties) {
                currentInstance = instanceRepo.getById(currentInstance.uuid) //NEDED because instance repo cannot be loaded in the domain. TODO, find a workaround
            }
            // console.log(currentInstance);
            // alert("currentInstance");
            
            data.graph.getNodeManager().addNode("action_Input", { nodeLayout:"round",uuid:currentInstance.uuid, name:currentInstance.name, headerColor:currentInstance.color, imgPath:'img/icons/'+currentInstance.sourceEntity.iconPath})
            // data.graph.getNodeManager().addNode("action_Input", { uuid:element.uuid, name:element.name})
        }

        data.graph.getNodeManager().addLinks(itemsData.links)
        var renderSettings = instance.props.get("settings").renderSettings
        if (renderSettings?.focusOnSelected == true) {
            updateSearchParam(event, data, instance)
            subscribeToSearchParam(event, data, instance, updateSearchParam)
        }
        
    
        // var repo = createEvaluatorsManagement()
        // var currentGraph = repo.getById(instance.props.get("evaluatorId"))
        // data.graph.getNodeManager().useTemplate(evaluatorTemplates)
        
        // if (currentGraph.attributes.nodeLayout) {
            
        //     data.graph.getNodeManager().importGraph(JSON.parse(currentGraph.attributes.nodeLayout))
        // }
    }, 100);

    subscribeToDB(event, data, instance)
}

var component =createAdler({
    content: p => /*html*/`
    <div class="Component" style="width:100%; height:100%; min-height:150px;">
        <div style="display:none;" class="action_add_entity" >Graph</div>
        <div style="width:100%; height:100%;position:relative;" class="graph_component"></div>
        
    </div>
        `,
    params:{
        props:{
            test:15,
            addAction: undefined,
            settings:{
                entityType:false,
                evaluatorId:false,
                calledFromInstance: false,
            },
            
        },
        listen:{
            test:function (event, data, instance) {
                //alert("test")
            }
        },
        data:{
            value:"Hello",
            list:[],
            table:undefined,
            addAction: undefined,
            graphConfig:{},
            // onClick:()=>console.log("click")
        },
        on:[
            [".action_add_entity","click", (event, data, instance)=> addItem(event, data, instance) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
            onMount:(event, data, instance) => setUpTable(event, data, instance),
            
        },
        methods:{
            softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    components:{
        // table_component: table_component,
    }
    // css:/*css*/` `,
})

export default component