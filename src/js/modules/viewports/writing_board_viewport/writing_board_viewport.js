import createAdler from "../../../vendor/adlerLegacy.js";
import table_component from "../../common_ui_components/table/table.js";
import projectManagement from "../../common_project_management/project_management.js";
import createEvaluator from "../../common_evaluators/evaluators.js";
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";
import instanceCard from "../../common_ui_components/instance_card/instance_card.js";
import createInstancesManagement from "../../common_project_management/instances_management.js";
import { subscribeToChanges } from "../../common_state/state_change_subscription.js";
import state from "../../common_state/state_manager.js";
import { getViewGridPlaceholder } from "../../project_views/view_grid_placeholders.js";


var addItem = function (event, data, instance) {
    instance.props.get("addAction" )()
}

var getEvaluatorData = function (event, data, instance){

    var data = {}
    var useNodes = false
    var renderSettings = instance.props.get("settings").renderSettings
    if (renderSettings) {
        useNodes = renderSettings.useNodes || false
    }
    // alert(useNodes)
    if (!useNodes) {

        data.instance ={}
        if (renderSettings?.useCurrentlySelected ) {
            data.instance =state.getSearchParam("selected") || {}
        }
        // data.cols =evaluator.evaluate().cols
        // data.actions =evaluator.evaluate().actions
        if (typeof data.instance == "string") {
            var instanceRepo = createInstancesManagement()
            data.instance = instanceRepo.getById(data.instance) || {}
        }
        
        console.log(data);

    }else{
        // alert("efsfs")
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
    }
    return data
}

var updateTable = function (event, data, instance) {
    var placeholder = getViewGridPlaceholder("instanceCard")
    var itemData = getEvaluatorData(event,data, instance)
     instance.getNodes().instance_card.setData({instance:itemData.instance, placeholder:placeholder })
    //  subscribeToDB(event, data, instance)
}

var setUpTable = function (event, data, instance) {
    updateTable(event, data, instance) 
    subscribeToChanges(event, data, instance, updateTable)
}

var writingBoardViewport =createAdler({
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

export default writingBoardViewport