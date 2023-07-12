import createAdler from "../../../vendor/adlerLegacy.js";
import table_component from "../../common_ui_components/table/table.js";
import projectManagement from "../../common_project_management/project_management.js";
import createEvaluator from "../../common_evaluators/evaluators.js";
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";
import instanceCard from "../../common_ui_components/instance_card/instance_card.js";
import createInstancesManagement from "../../common_project_management/instances_management.js";
import mainPopup from "../../common_ui_components/mainPopup/mainPopup.js"
import select from "../../common_ui_components/select/select.js"
import input_selection from "../../common_ui_elements/input_selection.js"
import input_text from "../../common_ui_elements/input_text.js"
// import common_dialogue_footer from "./common_dialogue_footer.js"


var setUpTable = function (event, data, instance) {
    var itemData = getEvaluatorData(event,data, instance)
    
   //  instance.getNodes().instance_card.setData({instance:itemData.instance })
    var itemData= itemData.instance
    var fields = []
    for (const key in itemData.properties) {
        if (Object.hasOwnProperty.call(itemData.properties, key)) {
            const propertyInfo = itemData.properties[key];
            fields.push({
                type:"text", name:key,config:{
                label:propertyInfo.property.name,
                value:propertyInfo.value,
                autofocus:false,
                hiddenInput:true,
                onFocusout:(event, data, instance)=>{ 
                        if (data.value != propertyInfo.value) {
                            itemData.setPropertyByUuid(propertyInfo.property.uuid,data.value )
                        }
                    
                    }
                }
            })
        }
    }
    createPropertiesList(itemData, instance,{fields})
    // createPropertiesList(instance,{
    //    fields:[
    //     {type:"text", name:"text",config:{
    //             label:"Property Name",
    //             value:"Property Name",
    //             autofocus:true,
    //         }
    //     },
    //     {type:"selection", name:"selection", config:{
    //             label:"Property Type",
    //             list: [{name:"Text", uuid:"text", iconPath:"align-left.svg"},{name:"Rich Text", uuid:"rich_text", iconPath:"book.svg"},{name:"Date", uuid:"date", iconPath:"calendar.svg"},{name:"Boolean", uuid:"boolean", iconPath:"toggle-right.svg"}],
    //             selected:{},
    //         }
    //     },
    //    ],
    //    // onConfirm:(result)=>{
    //    //  if (result.text !="") {
    //    //      element.addProperty(result.text,result.selection[0].uuid)
    //    //      instance.getNodes().table.setData({list:getItemsList(data,instance)})
    //    //  }
    //    // } 
    // })

   //  subscribeToDB(event, data, instance)
}

var createPropertiesList = function (itemData, instance,params) {
    var fieldsToAdd = []
    for (let i = 0; i < params.fields.length; i++) {
        const field = params.fields[i];
        if (field.type=="selection") {
            if (!field.config.onChange) { //if an action is not setup the dialogue component will do it. 
                field.config.onChange=(data)=>{ //the text element use the focus out event to store the value in the local store
                    
                    params.choiceStore[field.name] = data.selectedList
                }
            }
            var item = input_selection.instance({
                data:field.config
            })
            fieldsToAdd.push(item) 
        }else if(field.type=="text"){ ////TEXT ELEMENT////
            // if (!field.config.onFocusout) { 
            //     field.config.onFocusout=(event, data, instance)=>{ 
            //         itemData.setPropertyByName(field.name,data.value )
            //     }
            // }
            var item = input_text.instance({
                data:field.config
            })
            fieldsToAdd.push(item)
        }
    }
    // //add footer
    // var footer = common_dialogue_footer.with(
    //     {data:{
    //         onConfirm:(event, data, instance)=>{
    //             console.log(params.choiceStore);
    //             if (params.onConfirm) {
    //                 params.onConfirm(params.choiceStore)
    //             }
    //             params.containerPopup.unmount()
    //         },
    //         onCancel:(event, data, instance)=>{
    //             console.log(params.choiceStore);
    //             if (params.onCancel) {
    //                 params.onCancel(params.choiceStore)
    //             }
    //             params.containerPopup.unmount()
    //         },
    //     }}
    // )
    // fieldsToAdd.push(footer)
    
    instance.append(fieldsToAdd, "main-slot")

    
    // params.containerPopup.update();
}


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
    data.instance =evaluator.evaluate().instance_card.instance 
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




var propertiesViewport =createAdler({
    content: p => /*html*/`
    <div class="Component container">
        <div  a-slot="main-slot"  ></div>
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
            onBeforeMount:(event, data, instance) => setUpTable(event, data, instance),
            
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

export default propertiesViewport