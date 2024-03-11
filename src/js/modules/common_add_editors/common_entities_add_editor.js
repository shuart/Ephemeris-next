
import createEntityManagement from "../common_project_management/entity_management.js";
import createInstancesManagement from "../common_project_management/instances_management.js";
import createPropertyManagement from "../common_project_management/properties_management.js";
import createDialogue from "../common_select_dialogue/common_dialogue.js";
import { createEntitiesSelectionOptions } from "../common_selectors/entities_selector.js";
import { createPropertiesSelectionOptions } from "../common_selectors/properties_selector.js";

var uuidFromSelection = function(data){
    if (data && data[0]) {
        return data.map(i=>i.uuid)
    }else{
        return []
    }
}

export function createEntitiesAddEditor(entitiesID,name, callback) {
    //OPTIONS
    var options = createEntitiesSelectionOptions(entitiesID)
    // var propertiesOptions = createPropertiesSelectionOptions()
    //DEFAULTS
    // var useNodes = comp.renderSettings?.useNodes || false
    // var relationsToDisplay = comp.renderSettings?.relationsToDisplay || []
    // var entitiesToDisplay = comp.renderSettings?.entitiesToDisplay || []
    // var propertiesToDisplay = comp.renderSettings?.fieldsToDisplay || []
    //DIALOGUE
    createDialogue({
        header:"Add element",
        fields:[
        // {type:"boolean", name:"useNodes",config:{
        //         label:"Use Nodes",
        //         value:useNodes,
        //     }
        // },  
        {type:"text", name:"name",config:{
                label:"New Element Name",
                confirmOnEnter:true,
                value:name,
                autofocus:true,
            }
        },
        {type:"selection", name:"entitiesType", config:{
            multipleSelection:false,
                label:"Element type",
                list: options,
                selected:[entitiesID[0]],
            }
        },
        // {type:"selection", name:"propertiesToDisplay", config:{
        //     multipleSelection:true,
        //         label:"Properties to Display",
        //         list: propertiesOptions,
        //         selected:propertiesToDisplay,
        //     }
        // },
        // {type:"graph", name:"graph", config:{
        //     multipleSelection:true,
        //         label:"Show Relations With",
        //         list: options,
        //         selected:relationsToDisplay,
        //     }
        // },
        ],
        onConfirm:(result)=>{
            console.log(result);

            var instanceRepo = createInstancesManagement()
            var payload={name:result.name, type:result.entitiesType[0].uuid}
            instanceRepo.add(payload)

            if (callback) {
                callback(payload)
            }

        } 
     })
    
}