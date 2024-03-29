import createAdler from "../../vendor/adlerLegacy.js";
import createStellae from "../../vendor/stellae/stellae.js";
import createEntityManagement from "../common_project_management/entity_management.js";
import createRelationManagement from "../common_project_management/relations_management.js";
import createEvaluatorsManagement from "../common_project_management/evaluators_management.js";
import createPropertyManagement from "../common_project_management/properties_management.js";
// import evaluatorTemplates from "./evaluator_nodes_templates.js";
import mainPopup from "../common_ui_components/mainPopup/mainPopup.js"
import table_viewport from "../viewports/table_viewport/table_ui.js"
import nanoid from "../../vendor/nanoid.js";
import createSimulationManagement from "../common_project_management/simulation_management.js";
import simulationNodesTemplates from "./simulations_node_templates.js";
import createSimulator from "./simulations_simulator.js";
import create3dSimulationRender from "./simulation_3d_view.js";
import createChartView from "./simulation_chart_view.js";
import imageStore from "../common_image_store/common_image_store.js";
import state from "../common_state/state_manager.js";
import { createSimulationTemplateManager } from "./simulation_import_export.js";

var softUpdate= function (event, data, instance) {

}
var setUp = function (event, data, instance) {
    setTimeout(() => {
        var element= instance.query('.graph')
        var renderArea= instance.query('.renderArea')
        element.innerHTML = ''//TODO GRAPH IS LOADED 2 TIMES. PREVENT THAT
        renderArea.innerHTML = ''//TODO GRAPH IS LOADED 2 TIMES. PREVENT THAT
        var customNewNodeList = function(data){
            return [
                {id:"in_out", value:"Entity", params:{ nodeLayout:"round",uuid:nanoid(), userData:{type:"entity"}, name:"Entity", headerColor:"#069c95", imgPath:'img/iconsPNG/box.svg'}},
                {id:"in_out", value:"Property", params:{ nodeLayout:"round",uuid:nanoid(), userData:{type:"property"}, name:"Property", headerColor:"#c0bfbc", imgPath:'img/iconsPNG/info.svg'}},
                {id:"in_out", value:"Group", params:{ nodeLayout:"group",uuid:nanoid(), userData:{type:"group"}, name:"Group", headerColor:"#c0bfbc", imgPath:'img/iconsPNG/info.svg'}},
            ]
        }
        data.render = create3dSimulationRender({
            container:renderArea,
        })
        data.currentChart = createChartView({container:instance.query('.chartArea')})
        data.graph = createStellae({
            container:element, 
            fullSize:true,
            simulateForces:true, 
            uiCallbacks:undefined,
            showNodeList: false,
            showSearchBox: true,
            highlightConnections: false,
            // addNodesFromCustomList: customNewNodeList,
            allowCustomNameForNodes:true,
            // allowCustomNameForRelations:true,
        })
    
        // var repo = createEvaluatorsManagement()
        var repoEntities = createEntityManagement()
        var repoRelations = createRelationManagement()
        var repoSims = createSimulationManagement()
        // var repoEntities = createEntityManagement()

        var currentGraph = repoSims.getById(instance.props.get("simId"))
        data.graph.getNodeManager().useTemplate(simulationNodesTemplates)

        var currentNodeLayout = undefined
        if (currentGraph.attributes.nodeLayout) {
            currentNodeLayout = JSON.parse(currentGraph.attributes.nodeLayout)
            data.graph.getNodeManager().importGraph(JSON.parse(currentGraph.attributes.nodeLayout))
        }
        if (currentGraph.attributes.previewImage) {
            data.graphPreviewId = currentGraph.attributes.previewImage
        }
        

        

        // data.graph.getNodeManager().addNode("in_out", { nodeLayout:"group",uuid:"feefsfesfsefsdfsd", name:"group", headerColor:"#c0bfbc", imgPath:'img/iconsPNG/info.svg'})
        data.currentSimulator = createSimulator()
        data.currentSimulator.setRenderer(data.render)
        data.currentSimulator.setChart(data.currentChart)
        // data.graph.getNodeManager().exportNodes({withAllValues:true})


        
        
    }, 500);

}

var playSimulation = function(event, data, instance){
    
    data.currentSimulator.updateData( data.graph.getNodeManager() )
    data.currentSimulator.updateCallbacks( {
        onIterate:function(nodes){
            console.log(nodes);
            var labels = []
            
            for (let i = 0; i < nodes.length; i++) {
                const element = nodes[i];
                
                labels.push({nodeId:element.params.uuid, label:element.data.outValue})
            }
            data.graph.getNodeManager().labelNodes(labels);
        }
    } )
    data.currentSimulator.play()
}

var pauseSimulation = function(event, data, instance){
    
    data.currentSimulator.pause()
}
var resetSimulation = function(event, data, instance){
    
    data.currentSimulator.reset()
}



var saveNetwork = function (event, data, instance) {
    var exportGraph = data.graph.getNodeManager().exportNodes()
    console.log(exportGraph);

    var repoEntities = createEntityManagement()
    var repoRelations = createRelationManagement()
    var repoProperties = createPropertyManagement()
    var repoSims = createSimulationManagement()
    var properties = repoProperties.getAll()

    var entities = repoEntities.getAll()
    var relations = repoRelations.getAll()

    var render = data.graph.getNodeManager().getScreenshot({height:200})
    if (data.graphPreviewId) {
        imageStore.set({uuid:data.graphPreviewId, dataUri:render})
        repoSims.update({uuid:instance.props.get("simId"), lastSaved:Date.now(),  nodeLayout:JSON.stringify(exportGraph)})
    }else{
        var imageId = imageStore.set(render)
        repoSims.update({uuid:instance.props.get("simId"), previewImage:imageId,lastSaved:Date.now(), nodeLayout:JSON.stringify(exportGraph)})
    }
}

var saveNetworkAs = function (event, data, instance) {
    var exportGraph = data.graph.getNodeManager().exportNodes()
    console.log(exportGraph);

    var repoEntities = createEntityManagement()
    var repoRelations = createRelationManagement()
    var repoProperties = createPropertyManagement()
    var repoSims = createSimulationManagement()
    var properties = repoProperties.getAll()

    var entities = repoEntities.getAll()
    var relations = repoRelations.getAll()

    var render = data.graph.getNodeManager().getScreenshot({height:200})

    var newId = nanoid()
    var newName = prompt("Save As?")
    if (newName) {
        if (data.graphPreviewId) {
            imageStore.set({uuid:data.graphPreviewId, dataUri:render})
            repoSims.update({uuid:newId, name:newName, nodeLayout:JSON.stringify(exportGraph)})
        }else{
            var imageId = imageStore.set(render)
            repoSims.update({uuid:newId, name:newName, previewImage:imageId, nodeLayout:JSON.stringify(exportGraph)})
        }
        state.goTo("/:/simulation/"+newId)
    }
    
}

var exportNetwork = function (event, data, instance) {
    var exportManager = createSimulationTemplateManager()
    var exportGraph = data.graph.getNodeManager().exportNodes()
    var nodeLayout = JSON.stringify(exportGraph)
    exportManager.exportTemplate(nodeLayout)
}

// var showPreview = function (event,data,instance) {
//     mainPopup.mount()
//     mainPopup.append(table_viewport.instance({
//         props:{
//             settings:{evaluatorId:instance.props.get("evaluatorId")},
//         }
//     }), "main-slot")
//     mainPopup.update();
// }

var simulations_editor =createAdler({
    content: p => /*html*/`
    <div class="simulation_component">
        <nav class="navbar container" role="navigation" aria-label="main navigation">

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                <a class="navbar-item action_settings_save_network">
                    Save
                </a>
                <a class="navbar-item action_simulation_reset">
                    reset
                </a>
                
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link action_settings_show_preview">
                    More
                    </a>

                    <div class="navbar-dropdown">
                    <a class="navbar-item action_settings_save_network_as">
                        Save As
                    </a>
                    <hr class="navbar-divider">
                    <a class="navbar-item action_simulation_export">
                        Export
                    </a>
                    </div>
                </div>
                </div>

                <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                    <a class="button is-primary action_simulation_play">
                        <strong>play</strong>
                    </a>
                    <a class="button is-light action_simulation_pause">
                    pause
                    </a>
                    </div>
                </div>
                </div>
            </div>
        </nav>
        
        <div style="width:100%; height:800px; position:relative" class="graph" >GRAPH</div>
        <div style="" class="renderArea" >GRAPH</div>
        <div style="" class="chartArea" >Chart</div>
    </div>
        `,
    params:{
        props:{
            simId:false,
        },
        listen:{
            test:function (event, data, instance) {
                //alert("test")
            }
        },
        data:{
            value:"Hello",
            currentSimulator : undefined,
            list:[],
            table:undefined,
            evaluatorId:false,
            graph: undefined,
            // onClick:()=>console.log("click")
        },
        on:[
            [".action_settings_save_network","click", saveNetwork ],
            [".action_settings_save_network_as","click", saveNetworkAs ],
            // [".action_settings_show_preview","click", showPreview ],
            [".action_simulation_play","click", playSimulation  ],
            [".action_simulation_pause","click", pauseSimulation  ],
            [".action_simulation_reset","click", resetSimulation  ],
            [".action_simulation_export","click", exportNetwork  ],
            
        ],
        events:{
            // onBeforeMount:(event, data, instance) => setUp(event, data, instance),
            onMount:(event, data, instance) => setUp(event, data, instance),
            
        },
        methods:{
            softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
        replaceComponents:{
            //set here components to replace
        },
    },
    components:{
        // table_component: table_component
    },
    css:/*css*/`
    .chartArea{
        width: 30%;
        height: 30%;
        position: absolute;
        color: black;
        bottom: 0px;
        right: 0px;
    }
    .renderArea{
        width: 50%;
        height: 35%;
        position: absolute;
        min-height: 260.963px;
        color: black;
        bottom: 0px;
        left: 0px;
        overflow: hidden;
    }
    .simulation_component{
        width: 100%;
        height: 100%;
        position: relative;
    }

    `,
})

export default simulations_editor