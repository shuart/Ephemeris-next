import createAdler from "../../../vendor/adlerLegacy.js";
import table_component from "../../common_ui_components/table/table.js";
import projectManagement from "../../common_project_management/project_management.js";
import createEvaluator from "../../common_evaluators/evaluators.js";
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";
import { joinRelationsWithEntities } from "../helper_functionsViewport/helper_function_viewport.js";
import createInstancesManagement from "../../common_project_management/instances_management.js";
import { traverseGraphForRelations } from "../helper_functionsViewport/helper_traverse_graph.js";
import createPropertyManagement from "../../common_project_management/properties_management.js";


var softUpdate= function (event, data, instance) {
    var itemsData = getItemsList(event,data, instance)
    var currentTable = instance.query(".current-table")
    console.log(instance.query(".current-table"));
    currentTable.list = itemsData.list
    // currentTable.cols = itemsData.cols
    currentTable.updateTable()
    // instance.getNodes().tablevp.setData({list:itemsData.list, cols:itemsData.cols}, false)
    // instance.getNodes().tablevp.do.softUpdate()
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
    
    var useNodes = true
    var renderSettings = instance.props.get("settings").renderSettings
    if (renderSettings) {
        useNodes = renderSettings.useNodes
    }

    if (useNodes) {
        var evaluator = createEvaluator({originInstance:instance.props.get('settings').calledFromInstance, type:instance.props.get("settings").entityType , graphId:instance.props.get("settings").evaluatorId})
        console.log(evaluator);
        if (!evaluator.evaluate()) {
            return {list:[{name:"undefined LIST"}], cols:[]}
        }
        var evaluationResult = evaluator.evaluate().output_table
        console.log(evaluator.evaluate());

        data.list =evaluationResult.list
        data.cols =evaluationResult.cols
        data.actions =evaluationResult.actions
        console.log(data);
    }else{
        var instanceRepo = createInstancesManagement()
        var instances = instanceRepo.getByType(renderSettings.entitiesToDisplay)
        console.log(renderSettings.relationsToDisplay);
         
        var extendedList = {roots:instances, cols:[]}
        if (renderSettings.relationsToDisplay?.nodes) {
            extendedList = traverseGraphForRelations(instances, renderSettings.relationsToDisplay.arrows, renderSettings.relationsToDisplay.nodes)
        }

        var propRepo = createPropertyManagement()
        // var props = propRepo.getAll()
        var cols= [{title:"name", field:'name'}]

        for (let i = 0; i < renderSettings.fieldsToDisplay.length; i++) {
            var newProp = propRepo.getById( renderSettings.fieldsToDisplay[i] )
            cols.push({title:newProp.name, field:'prop_'+newProp.uuid, isAttribute:true, attributeType:"text" })
        }
        
        data.list =extendedList.roots
        data.cols =cols.concat(extendedList.cols)
        data.actions =renderSettings.actions
        data.renderSettings =renderSettings

        
    }
    // joinRelationsWithEntities(data.list, data.cols.map(c=>c.field))
    
    //clean Objects TODO segregate in custom attributes object
    var newList = []
    //If not attributes are used, juste populate with basic ones
    if (!data.cols) {
        data.cols=[{title:"name", field:'name'},]
    }
    console.log(data);
    alert("ddd")
    for (let i = 0; i < data.list.length; i++) { //create a new list to keep original clean
        const item = data.list[i];
        var newItem = {uuid: item.uuid, name:item.name, color:item.color}
        newList.push(newItem)
        for (let j = 0; j < data.cols.length; j++) {
            const col = data.cols[j];
            if (col.field) {
                if (item.attributes[col.field]) {
                    newItem[col.field] = item.attributes[col.field]
                }
                if (item.properties && item.properties[col.field]) {//TODO remove property from object
                    newItem[col.field] = item.properties[col.field].value
                }
                if (item[col.field]) {//also check if not in attribute (relations)
                    newItem[col.field] = item[col.field]
                }
                
            }
            
        }
        
    }
    data.list =newList
    // joinRelationsWithEntities(data.list, data.cols.map(c=>c.field)) //TODO check if still needed
    
    
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

    setTimeout(function () {
        var mountPlace = instance.query(".example-table")
        console.log(mountPlace);
        var tablevp = table_component.instance()
        tablevp.classList="current-table"
        tablevp.list = itemsData.list
        tablevp.cols = itemsData.cols
        mountPlace.append(tablevp)
        subscribeToDB(event, data, instance)

    })


    //  instance.getNodes().tablevp.setData({list:itemsData.list, cols:itemsData.cols })
     
}



var component =createAdler({
    content: p => /*html*/`
    <div class="Component container">
        <div class="action_add_entity button is-small" >Add</div>
        <div class="example-table" a-id="tablevp"  ></div>
        
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
                renderSettings: undefined,
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