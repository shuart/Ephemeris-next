import createAdler from "../../vendor/adler.js";
import createStellae from "../../vendor/stellae/stellae.js";
import createEntityManagement from "../common_project_management/entity_management.js";
import createRelationManagement from "../common_project_management/relations_management.js";
import createEvaluatorsManagement from "../common_project_management/evaluators_management.js";
import createPropertyManagement from "../common_project_management/properties_management.js";
// import evaluatorTemplates from "./evaluator_nodes_templates.js";
import mainPopup from "../common_ui_components/mainPopup/mainPopup.js"
import table_viewport from "../viewports/table_viewport/table_ui.js"
import nanoid from "../../vendor/nanoid.js";
import createCyclesManagement from "../common_project_management/cycles_management.js";

var softUpdate= function (event, data, instance) {

}
var setUp = function (event, data, instance) {
    setTimeout(() => {
        var element= instance.query('.graph')
        element.innerHTML = ''//TODO GRAPH IS LOADED 2 TIMES. PREVENT THAT
        var customNewNodeList = function(data){
            return [
                {id:"in_out", value:"Entity", params:{ nodeLayout:"round",uuid:nanoid(), userData:{type:"entity"}, name:"Entity", headerColor:"#069c95", imgPath:'img/iconsPNG/box.svg'}},
                {id:"in_out", value:"Property", params:{ nodeLayout:"round",uuid:nanoid(), userData:{type:"property"}, name:"Property", headerColor:"#c0bfbc", imgPath:'img/iconsPNG/info.svg'}},
                {id:"in_out", value:"Group", params:{ nodeLayout:"group",uuid:nanoid(), userData:{type:"group"}, name:"Group", headerColor:"#c0bfbc", imgPath:'img/iconsPNG/info.svg'}},
            ]
        }
        data.graph = createStellae({
            container:element, 
            fullSize:true,
            simulateForces:true, 
            uiCallbacks:undefined,
            showNodeList: false,
            showSearchBox: true,
            highlightConnections: false,
            addNodesFromCustomList: customNewNodeList,
            allowCustomNameForNodes:true,
            allowCustomNameForRelations:true,
        })
    
        // var repo = createEvaluatorsManagement()
        var repoEntities = createEntityManagement()
        var repoRelations = createRelationManagement()
        var repoCycles = createCyclesManagement()
        // var repoEntities = createEntityManagement()
        var currentGraph = repoCycles.getById(instance.props.get("cycleId"))
        var currentNodeLayout = undefined
        if (currentGraph.attributes.nodeLayout) {
            currentNodeLayout = JSON.parse(currentGraph.attributes.nodeLayout)
            // data.graph.getNodeManager().importGraph(JSON.parse(currentGraph.attributes.nodeLayout))
        }
        // data.graph.getNodeManager().useTemplate(evaluatorTemplates)
        var entities = repoEntities.getAll()
        var relations = repoRelations.getAll()
        for (let i = 0; i < entities.length; i++) {
            const element = entities[i];
            var currentPosition = undefined
            if (currentNodeLayout && currentNodeLayout.nodes.find(n=> n.params.uuid == element.uuid)) {
                currentPosition = currentNodeLayout.nodes.find(n=> n.params.uuid == element.uuid).params.position
            }
            // data.graph.getNodeManager().addNode(element)
            data.graph.getNodeManager().addNode("in_out", { nodeLayout:"round",uuid:element.uuid, position: currentPosition||undefined, userData:{type:"entity"}, name:element.name, headerColor:element.attributes.color, imgPath:'img/iconsPNG/'+element.attributes.iconPath})
        }
        //unpack properties
        // debugger
        var repoProperties = createPropertyManagement()
        var properties = repoProperties.getAll()
        var propertyToEntityRelations = []
        for (let i = 0; i < properties.length; i++) {
            const property = properties[i];
            // data.graph.getNodeManager().addNode(element)
            data.graph.getNodeManager().addNode("in_out", { nodeLayout:"round",uuid:property.uuid,userData:{type:"property"},  name:property.name, headerColor:"#c0bfbc", imgPath:'img/iconsPNG/info.svg'})
            //unpack properties relations
            var relatedEntities = property.getRelatedEntities()
            for (let j = 0; j < relatedEntities.length; j++) {
                const relatedEntity = relatedEntities[j];
                propertyToEntityRelations.push({name:"is property of",userData:{}, dashed:true, from:property.uuid, from_socket:"output", to:relatedEntity.uuid, to_socket:"input"});
            }
        }

        // data.graph.getNodeManager().addNode("in_out", { nodeLayout:"group",uuid:"feefsfesfsefsdfsd", name:"group", headerColor:"#c0bfbc", imgPath:'img/iconsPNG/info.svg'})
        var unpackedRelations = [] //unpack relations in smaller relations for the graph
        for (let i = 0; i < relations.length; i++) {
            const relation = relations[i];
            for (let j = 0; j < relation.fromList.length; j++) {
                const unpackedSource = relation.fromList[j];
                for (let k = 0; k < relation.toList.length; k++) {
                    const unpackedTarget = relation.toList[k];
                    unpackedRelations.push({name:relation.name, from:unpackedSource.uuid, from_socket:"output", to:unpackedTarget.uuid, to_socket:"input"});
                }
            }
        }
        
        data.graph.getNodeManager().addLinks(unpackedRelations)
        data.graph.getNodeManager().addLinks(propertyToEntityRelations)

        
    }, 500);

}

var saveNetwork = function (event, data, instance) {
    var exportGraph = data.graph.getNodeManager().exportNodes()
    console.log(exportGraph);

    var repoEntities = createEntityManagement()
    var repoRelations = createRelationManagement()
    var repoProperties = createPropertyManagement()
    var repoCycles = createCyclesManagement()
    var properties = repoProperties.getAll()
    // var repoEntities = createEntityManagement()
    // var currentGraph = repo.getById(instance.props.get("cycleId"))
    // data.graph.getNodeManager().useTemplate(evaluatorTemplates)
    var entities = repoEntities.getAll()
    var relations = repoRelations.getAll()

    var newEntityNodes = []
    var newPropertyNodes = []
    var newEntityRelations = []
    var newTargetsInEntityRelations = []
    var newUnknownNodes = []
    var entitiesAlreadyInGraph = []
    for (let i = 0; i < exportGraph.nodes.length; i++) { //find new nodes
        const node = exportGraph.nodes[i];
        if (node.params.userData.type == "entity") {
            if (!entities.find(e=>e.uuid == node.params.uuid)) {
                newEntityNodes.push(node)
            }
        }else if (node.params.userData.type == "property") {
            if (!properties.find(e=>e.uuid == node.params.uuid)) {
                newPropertyNodes.push(node)
            }
        }else {
            if (!properties.find(e=>e.uuid == node.params.uuid)&&!entities.find(e=>e.uuid == node.params.uuid)) {
                newUnknownNodes.push(node)
            }
        }
        
    }
    for (let j = 0; j < exportGraph.links.length; j++) {
        const link = exportGraph.links[j];
        var foundRelation = false;
        var foundRelationTargets = false;
        for (let k = 0; k  < relations.length; ++k) {
            const relation = relations[k];
            if (relation.name == link.name) {
                foundRelation = relation.uuid;
                if (relation.attributes["from_"+link.from] && relation.attributes["to_"+link.to]) {
                    foundRelationTargets = true;
                }
            }
        }
        if (!foundRelation && !foundRelationTargets) { newEntityRelations.push(link) }
        if (foundRelation && !foundRelationTargets) { newTargetsInEntityRelations.push({existingRelationId:foundRelation, newRelation:link}) }
    }

    if (!newEntityNodes[0] && !newPropertyNodes[0] && !newEntityRelations[0]  && !newTargetsInEntityRelations[0] ) {
        alert("No changes to the model")
        repoCycles.update({uuid:instance.props.get("cycleId"), nodeLayout:JSON.stringify(exportGraph)})
    }else{
        var changeMessage1  ="Those entities will be added" + newEntityNodes.map(e => e.params.name).join(',')
        var changeMessage2  = "Those properties will be added"+ newPropertyNodes.map(e => e.params.name).join(',')
        var changeMessage3  = "Those links will be added"+ newEntityRelations.map(e => e.name).join(',')
        var acceptChanges = confirm(changeMessage1 + " AND "+  changeMessage2 + " AND "+ changeMessage3)
        if (acceptChanges) {
            for (let i = 0; i < newEntityNodes.length; i++) {
                const node = newEntityNodes[i];
                repoEntities.add({uuid:node.params.uuid, name:node.params.name, color:"#069c95", iconPath:'box.svg'})
            }
            for (let j = 0; j < newEntityRelations.length; j++) {
                const relation = newEntityRelations[j];
                repoRelations.add({name:relation.name,["to_"+relation.to]:true, ["from_"+relation.from]:true  })
            }
            for (let j = 0; j < newTargetsInEntityRelations.length; j++) {
                const relation = newTargetsInEntityRelations[j];
                repoRelations.add({uuid:relation.existingRelationId,["to_"+relation.newRelation.to]:true, ["from_"+relation.newRelation.from]:true  })
            }
            repoCycles.update({uuid:instance.props.get("cycleId"), nodeLayout:JSON.stringify(exportGraph)})
        }
    }
    
    // var repo = createEvaluatorsManagement()
    // repo.update({uuid:instance.props.get("evaluatorId"), nodeLayout:JSON.stringify(exportGraph)})
    // console.log(repo.getAll())
    // alert(instance.props.get("evaluatorId"))
}

var showPreview = function (event,data,instance) {
    mainPopup.mount()
    mainPopup.append(table_viewport.instance({
        props:{
            settings:{evaluatorId:instance.props.get("evaluatorId")},
        }
    }), "main-slot")
    mainPopup.update();
}

var cycles_editor =createAdler({
    content: p => /*html*/`
    <div class="Component">
        <nav class="navbar container" role="navigation" aria-label="main navigation">

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                <a class="navbar-item action_settings_add_entity">
                    Add
                </a>

                <a class="navbar-item action_settings_save_network">
                    Save
                </a>
                <a class="navbar-item action_settings_show_preview">
                    preview
                </a>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link action_settings_show_preview">
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
        <div style="width:100%; height:800px; position:relative" class="graph" >GRAPH</div>
    </div>
        `,
    params:{
        props:{
            cycleId:false,
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
            evaluatorId:false,
            graph: undefined,
            // onClick:()=>console.log("click")
        },
        on:[
            [".action_settings_save_network","click", saveNetwork ],
            [".action_settings_show_preview","click", showPreview ],
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
    }
    // css:/*css*/` `,
})

export default cycles_editor