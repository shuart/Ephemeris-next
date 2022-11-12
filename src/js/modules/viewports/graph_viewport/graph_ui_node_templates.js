// import createInstancesManagement from "../common_project_management/instances_management.js";
// import createEntityManagement from "../common_project_management/entity_management.js";
// import createRelationsManagement from "../common_project_management/relations_management.js";
// import mainPopup from "../common_ui_components/mainPopup/mainPopup.js"
// import select from "../common_ui_components/select/select.js"


var graphUiTemplates = {}


graphUiTemplates.actionInput = {
    templateName : "action_Input",
    name : "action_Input",
    props :[
        {id:"in", label:"clicked_item", type:"hidden", editable:false, socket:"input", value:()=>"test1"},
        {id:"out", label:"clicked_item_uuid", type:"hidden", editable:false, socket:"output", value:()=>"test2"},
    ],
    methods:{
    },
    event:{
        onEvaluate:(props) =>{
            // var functionToUse = function (data) {
            //     return data.input.clickedItem
            // }
            // props.clicked_item.set(functionToUse)  
            // var functionToUse = function (data) {
            //     return data.input.clickedItemUuid
            // }
            // props.clicked_item_uuid.set(functionToUse)  
        },
        // onInit:(props) =>{

        // },
    },
}

export default graphUiTemplates