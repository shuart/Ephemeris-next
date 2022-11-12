import createAdler from "../../../vendor/adler.js";
// import table_component from "../../common_ui_components/table/table.js";
// import projectManagement from "../../common_project_management/project_management.js";
import createEvaluator from "../../common_evaluators/evaluators.js";
import createStellae from "../../../vendor/stellae/stellae.js";
import graphUiTemplates from "./graph_ui_node_templates.js";


var softUpdate= function (event, data, instance) {
    
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
    var evaluator = createEvaluator({type:instance.props.get("settings").entityType , graphId:instance.props.get("settings").evaluatorId})
    console.log(evaluator);
    var evaluatorResult = evaluator.evaluate()
    if (!evaluatorResult) {
        return {list:[{name:"undefined LIST"}], cols:[]}
    }
    data.list =[]
    if (evaluatorResult.nodes[0]) {
        for (let i = 0; i < evaluatorResult.nodes.length; i++) {
            const entityGroup = evaluatorResult.nodes[i];
            for (let j = 0; j < entityGroup.length; j++) {
                data.list.push(entityGroup[j])
            }
            
        }
    }
    data.links =[]
    if (evaluatorResult.links[0]) {
        for (let i = 0; i < evaluatorResult.links.length; i++) {
            const entityGroup = evaluatorResult.links[i];
            for (let j = 0; j < entityGroup.length; j++) {
                console.log(entityGroup[j]);
                
                for (let k = 0; k < entityGroup[j]['rel 1'].length; k++) {
                    data.links.push({from:entityGroup[j]['rel 1'][k].relation.from, from_socket:"out", to:entityGroup[j]["rel 1"][k].relation.to, to_socket:"in",})
                }
            }
            
        }
    }
    // console.log(evaluatorResult.links);
    // console.log(data.links);
    // alert("esf")
    data.actions =evaluator.evaluate().actions
    console.log(data);
    

    
    return data
}

var setUpTable = function (event, data, instance) {
    //  console.log(instance.getNodes());
    //  console.log(instance.props.settings.get());
     var itemsData = getItemsList(event,data, instance)
    //  data.addAction = itemsData.actions
    //  instance.props.set("addAction",itemsData.actions )

    //  instance.getNodes().tablevp.setData({list:itemsData.list, cols:itemsData.cols })
     setTimeout(() => {
        var element= instance.query('.graph_component')
        element.innerHTML = ''//TODO GRAPH IS LOADED 2 TIMES. PREVENT THAT
        data.graph = createStellae({container:element, fullSize:true,simulateForces:true})
        data.graph.getNodeManager().useTemplate(graphUiTemplates)
        for (let i = 0; i < itemsData.list.length; i++) {
            const element = itemsData.list[i];
    //         console.log(element);
    // alert(element)
            data.graph.getNodeManager().addNode("action_Input", { nodeLayout:"round",uuid:element.uuid, name:element.name})
            // data.graph.getNodeManager().addNode("action_Input", { uuid:element.uuid, name:element.name})
        }

        data.graph.getNodeManager().addLinks(itemsData.links)
        
    
        // var repo = createEvaluatorsManagement()
        // var currentGraph = repo.getById(instance.props.get("evaluatorId"))
        // data.graph.getNodeManager().useTemplate(evaluatorTemplates)
        
        // if (currentGraph.attributes.nodeLayout) {
            
        //     data.graph.getNodeManager().importGraph(JSON.parse(currentGraph.attributes.nodeLayout))
        // }
    }, 100);
}

var component =createAdler({
    content: p => /*html*/`
    <div class="Component container">
        <div class="action_add_entity" >Graph</div>
        <div style="width:100%; height:500px;" class="graph_component"></div>
        
    </div>
        `,
    params:{
        props:{
            test:15,
            addAction: undefined,
            settings:{
                entityType:false,
                evaluatorId:false,
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