import { createEntitiesSelectionOptions } from "../../common_selectors/entities_selector.js";
import createDialogue from "../../common_select_dialogue/common_dialogue.js";

var uuidFromSelection = function(data){
    if (data && data[0]) {
        return data.map(i=>i.uuid)
    }else{
        return []
    }
}

export function createTableSettings(comp, callback) {
    //OPTIONS
    var options = createEntitiesSelectionOptions()
    //DEFAULTS
    var useNodes = comp.renderSettings?.useNodes || false
    var entitiesToDisplay = comp.renderSettings?.entitiesToDisplay || []
    //DIALOGUE
    createDialogue({
        header:"Table Settings",
        fields:[
        {type:"boolean", name:"useNodes",config:{
                label:"Use Nodes",
                value:useNodes,
            }
        },  
        {type:"text", name:"text",config:{
                label:"Property Name",
                value:"test",
                autofocus:true,
            }
        },
        {type:"selection", name:"entitiesToDisplay", config:{
            multipleSelection:true,
                label:"Entities to Display",
                list: options,
                selected:entitiesToDisplay,
            }
        },
        {type:"selection", name:"propertiesToDisplay", config:{
            multipleSelection:true,
                label:"Properties to Display",
                list: options,
                selected:[],
            }
        },
        ],
        onConfirm:(result)=>{
            console.log(result);
            var newConfig = {
                useNodes : result.useNodes,
                entitiesToDisplay : uuidFromSelection(result.entitiesToDisplay),
                fieldsToDisplay : uuidFromSelection(result.propertiesToDisplay),
            }
            console.log(newConfig);
            if (callback) {
                callback(newConfig)
            }
            // var added = []
            // var removed = []
            // var newSelection = result.selection
        } 
     })
    
}