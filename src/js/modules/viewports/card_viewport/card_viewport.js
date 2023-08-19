import createAdler from "../../../vendor/adlerLegacy.js";
import table_component from "../../common_ui_components/table/table.js";
import projectManagement from "../../common_project_management/project_management.js";
import createEvaluator from "../../common_evaluators/evaluators.js";
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";
import instanceCard from "../../common_ui_components/instance_card/instance_card.js";
import createInstancesManagement from "../../common_project_management/instances_management.js";


var softUpdate= function (event, data, instance) {
    var itemsData = getItemsList(event,data, instance)
    instance.getNodes().tablevp.setData({list:itemsData.list, cols:itemsData.cols}, false)
    instance.getNodes().tablevp.do.softUpdate()
}

var addItem = function (event, data, instance) {

    instance.props.get("addAction" )()

}

var getEvaluatorData = function (event, data, instance){

    var data = {}
    var evaluator = createEvaluator({originInstance:instance.props.get('settings').calledFromInstance, type:instance.props.get("settings").entityType , graphId:instance.props.get("settings").evaluatorId})
    console.log(evaluator);
    if (!evaluator.evaluate()) {
        return {instance:{}}
    }
    data.instance =evaluator.evaluate().output_instance_card.instance 
    // data.cols =evaluator.evaluate().cols
    // data.actions =evaluator.evaluate().actions
    if (typeof data.instance == "string") {
        var instanceRepo = createInstancesManagement()
        data.instance = instanceRepo.getById(data.instance)
    }
    
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
     var itemData = getEvaluatorData(event,data, instance)
     instance.getNodes().instance_card.setData({instance:itemData.instance })
    //  subscribeToDB(event, data, instance)
}

var cardViewport =createAdler({
    content: p => /*html*/`
    <div class="Component container">
        
        <div  a-id="instance_card" adler="instance_card" ></div>
        <div class="action_add_entity" ></div>
        
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
            // softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    components:{
        instance_card: instanceCard,
    }
    // css:/*css*/` `,
})

export default cardViewport