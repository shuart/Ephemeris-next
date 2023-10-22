import createAdler from "../../../vendor/adlerLegacy.js";
import table_component from "../../common_ui_components/table/table.js";
import folder_view_component from "../../common_ui_components/folder_view/folder_view.js";
import projectManagement from "../../common_project_management/project_management.js";
import createEvaluator from "../../common_evaluators/evaluators.js";
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";
import { joinRelationsWithEntities } from "../helper_functionsViewport/helper_function_viewport.js";
import { subscribeToChanges } from "../../common_state/state_change_subscription.js";


var softUpdate= function (event, data, instance) {
    // var itemsData = getItemsList(event,data, instance)
    // var currentTable = instance.query(".current-table")
    // currentTable.list = itemsData.list

    // currentTable.updateTable()
}

var getItemsList = function (event, data, instance){

    var data = {}
    var evaluator = createEvaluator({originInstance:instance.props.get('settings').calledFromInstance, type:instance.props.get("settings").entityType , graphId:instance.props.get("settings").evaluatorId})
    console.log(evaluator);
    if (!evaluator.evaluate()) {
        return {list:[{name:"undefined LIST"}], cols:[]}
    }
    var evaluationResult = evaluator.evaluate().output_folder
    console.log(evaluator.evaluate());

    data.list =evaluationResult.list
    data.cols =evaluationResult.cols
    data.actions =evaluationResult.actions
    console.log(data);

    // joinRelationsWithEntities(data.list, data.cols.map(c=>c.field))
    
    //clean Objects TODO segregate in custom attributes object
    var newList = []
    //If not attributes are used, juste populate with basic ones
    if (!data.cols) {
        data.cols=[{name:"name", field:'name'}]
    }
    console.log(data);
    for (let i = 0; i < data.list.length; i++) {
        const item = data.list[i];
        var newItem = {uuid: item.uuid, name:item.name, color:item.color}
        newList.push(newItem)
        for (let j = 0; j < data.cols.length; j++) {
            const col = data.cols[j];
            if (col.field) {
                if (item.attributes && item.attributes[col.field]) {
                    newItem[col.field] = item.attributes[col.field]
                }
                if (item.properties && item.properties[col.field]) {
                    newItem[col.field] = item.properties[col.field].value
                }
                
            }
            
        }
        
    }
    data.list =newList
    console.log(data);
    
    joinRelationsWithEntities(data.list, data.cols.map(c=>c.field))
    
    
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
    //  data.addAction = itemsData.actions
    //  instance.props.set("addAction",itemsData.actions )
    //  data.value = Date.now()
    // // alert(data.value)
    //  console.log(data.addAction);
    // //  alert()

    setTimeout(function () {
        var mountPlace = instance.query(".folder_component")
        console.log(mountPlace);
        var tablevp = folder_view_component.instance()
        tablevp.classList="current-table"
        tablevp.list = itemsData.list
        tablevp.cols = itemsData.cols
        if (itemsData.actions) {
            // tablevp.onClick = itemsData.actions
            tablevp.onClick = function (e, cell) {
                var actionData = {
                    input:{
                        clickedItem:cell.getData().uuid,
                        clickedItemUuid:cell.getData().uuid,
                        contextualItemUuid:cell.getData().uuid,
                        clickedItemValue:cell.getValue(),
                        sourceItem:cell.getData().uuid,
                        targetItem:false,
                    }
                }
                itemsData.actions(actionData)
            }

            
        }
        mountPlace.append(tablevp)
        subscribeToChanges(event, data, instance, softUpdate)

    })


    //  instance.getNodes().tablevp.setData({list:itemsData.list, cols:itemsData.cols })
     
}



var folder_viewport =createAdler({
    content: p => /*html*/`
    <div class="folder_component container" style="height:100%;">
        
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
            // [".action_add_entity","click", (event, data, instance)=> addItem(event, data, instance) ],
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
    },
    // css:/*css*/`  `,
})

export default folder_viewport