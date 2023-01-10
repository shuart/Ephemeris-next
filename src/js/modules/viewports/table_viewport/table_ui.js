import createAdler from "../../../vendor/adler.js";
import table_component from "../../common_ui_components/table/table.js";
import projectManagement from "../../common_project_management/project_management.js";
import createEvaluator from "../../common_evaluators/evaluators.js";
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";


var softUpdate= function (event, data, instance) {
    var itemsData = getItemsList(event,data, instance)
    instance.getNodes().tablevp.setData({list:itemsData.list, cols:itemsData.cols}, false)
    instance.getNodes().tablevp.do.softUpdate()
}

var addItem = function (event, data, instance) {
    // alert(data.value)
    // data.addAction()
    instance.props.get("addAction" )()
    //update table
    // var itemsData = getItemsList(event,data, instance)
    // instance.getNodes().tablevp.setData({list:itemsData.list, cols:itemsData.cols}, false)
    // instance.getNodes().tablevp.do.softUpdate()

}

var getItemsList = function (event, data, instance){
    // var evaluator = createEvaluator({type:instance.props.settings.get().entityType})
    // console.log(evaluator.evaluate().list);
    // return evaluator.evaluate().list

    // var repo = createEvaluatorsManagement()
    // var currentGraph = repo.getById(instance.props.get("settings").evaluatorId)
    // if (currentGraph.attributes.nodeLayout) {
    //     var layout = JSON.parse(currentGraph.attributes.nodeLayout)
    //     console.log(layout);
    //     return layout.nodes.find(e=>e.templateName == "output_table").params.propsValue.rows
    // }
    // return []
    var data = {}
    var evaluator = createEvaluator({originInstance:instance.props.get('settings').calledFromInstance, type:instance.props.get("settings").entityType , graphId:instance.props.get("settings").evaluatorId})
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
var subscribeToDB = function (event, data, instance) {
    var updateFunc = function (params) {
        if (instance && instance.getDOMElement() && instance.getDOMElement().isConnected) {
            softUpdate(event, data, instance)
            // alert("update")//TODO sometimes to update. Why?
        }else{
            window.removeEventListener("cluster_update", updateFunc);
        }
        
    }
    window.addEventListener("cluster_update", updateFunc);
}


var setUpTable = function (event, data, instance) {
     console.log(instance.getNodes());
     console.log(instance.props.settings.get());
     var itemsData = getItemsList(event,data, instance)
     data.addAction = itemsData.actions
     instance.props.set("addAction",itemsData.actions )
    //  data.value = Date.now()
    // // alert(data.value)
    //  console.log(data.addAction);
    // //  alert()
     instance.getNodes().tablevp.setData({list:itemsData.list, cols:itemsData.cols })
     subscribeToDB(event, data, instance)
}

var component =createAdler({
    content: p => /*html*/`
    <div class="Component container">
        <div class="action_add_entity button is-small" >Add</div>
        <div class="example-table" a-id="tablevp" adler="table_component" ></div>
        
    </div>
        `,
    params:{
        props:{
            test:15,
            addAction: undefined,
            settings:{
                entityType:false,
                evaluatorId:false,
                calledFromInstance:false,
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
        table_component: table_component,
    }
    // css:/*css*/` `,
})

export default component