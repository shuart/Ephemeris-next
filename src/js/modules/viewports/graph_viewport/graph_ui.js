import createAdler from "../../../vendor/adler.js";
// import table_component from "../../common_ui_components/table/table.js";
// import projectManagement from "../../common_project_management/project_management.js";
import createEvaluator from "../../common_evaluators/evaluators.js";
import createStellae from "../../../vendor/stellae/stellae.js";


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
    if (!evaluator.evaluate()) {
        return {list:[{name:"undefined LIST"}], cols:[]}
    }
    data.list =evaluator.evaluate().list
    data.cols =evaluator.evaluate().cols
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
        data.graph = createStellae({container:element, fullSize:true,})
        for (let i = 0; i < itemsData.list.length; i++) {
            const element = itemsData.list[i];
    //         console.log(element);
    // alert(element)
            data.graph.getNodeManager().addNode("math_compare", { nodeLayout:"round",uuid:i, name:element.name})
        }
        
    
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