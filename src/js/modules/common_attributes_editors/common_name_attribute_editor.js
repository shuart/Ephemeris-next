
import createEntityManagement from "../common_project_management/entity_management.js";
import createInstancesManagement from "../common_project_management/instances_management.js";
import createPropertyManagement from "../common_project_management/properties_management.js";
import createDialogue from "../common_select_dialogue/common_dialogue.js";
import { createPropertiesSelectionOptions } from "../common_selectors/properties_selector.js";

var uuidFromSelection = function(data){
    if (data && data[0]) {
        return data.map(i=>i.uuid)
    }else{
        return []
    }
}
export function renderNameAttribute(currentValue,bearingEntityId, callback){
    // var attRepo= createPropertyManagement()
    // var att = attRepo.getById(attributeId)
    if (!currentValue) {
        currentValue = ""
    }
    var domEl = document.createElement("div")
    domEl.innerHTML=`<div>${currentValue}</div>`
    domEl.addEventListener('click', function (event) {
        createNameAttributeEditor(attributeId,currentValue,bearingEntityId, callback)
        if (callback) {
            callback()
        }
    })
    return domEl
}
export function createNameAttributeEditor(currentValue,bearingEntityId, callback) {
    createDialogue({
        header:"Edit Name",
        
        fields:[ 
            {type:"text", name:"text",config:{
                    label:"Name",
                    confirmOnEnter:true,
                    value:currentValue,
                    autofocus:true,
                }
            },
        ],
        onConfirm:(result)=>{
            console.log(result);
            var instancesRepo = createInstancesManagement()
            var entity =instancesRepo.getById(bearingEntityId)
            if (entity && result.text) {
                var payload={uuid:bearingEntityId, name:result.text}
                instancesRepo.update(payload)
            }
        } 
     })
    
}