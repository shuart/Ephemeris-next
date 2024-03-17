import { createEntitiesSelectionOptions } from "../../common_selectors/entities_selector.js";
import createDialogue from "../../common_select_dialogue/common_dialogue.js";
import { createPropertiesSelectionOptions } from "../../common_selectors/properties_selector.js";

var uuidFromSelection = function(data){
    if (data && data[0]) {
        return data.map(i=>i.uuid)
    }else{
        return []
    }
}

export function createWritingBoardSettings(comp, callback) {
    //OPTIONS
    var options = createEntitiesSelectionOptions()
    var propertiesOptions = createPropertiesSelectionOptions()
    //DEFAULTS
    var useNodes = comp.renderSettings?.useNodes || false
    var useCurrentlySelected = comp.renderSettings?.useCurrentlySelected || false
    var compactMode = comp.renderSettings?.compactMode || false
    var relationsToDisplay = comp.renderSettings?.relationsToDisplay || []
    var entitiesToDisplay = comp.renderSettings?.entitiesToDisplay || []
    var propertiesToDisplay = comp.renderSettings?.fieldsToDisplay || []
    //DIALOGUE
    createDialogue({
        header:"Writing Board Settings",
        fields:[
        {type:"boolean", name:"useNodes",config:{
                label:"Use Nodes",
                value:useNodes,
            }
        },
        {type:"boolean", name:"useCurrentlySelected",config:{
                label:"Use Currently Selected",
                value:useCurrentlySelected,
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
            multipleSelection:false,
                label:"Properties to Use",
                list: propertiesOptions,
                selected:propertiesToDisplay,
            }
        },
        // {type:"graph", name:"graph", config:{
        //         multipleSelection:true,
        //         label:"Show Relations With",
        //         list: options,
        //         selected:relationsToDisplay,
        //     }
        // },
        // {type:"boolean", name:"compactMode",config:{
        //         label:"Show compact table",
        //         value:compactMode,
        //     }
        // },  
        ],
        onConfirm:(result)=>{
            console.log(result);
            var newConfig = {
                useNodes : result.useNodes,
                useCurrentlySelected: result.useCurrentlySelected,
                entitiesToDisplay : uuidFromSelection(result.entitiesToDisplay),
                fieldsToDisplay : uuidFromSelection(result.propertiesToDisplay),
                // relationsToDisplay : result.graph,
                // compactMode : result.compactMode,
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