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

function createGraphSettings(comp, callback) {
    //OPTIONS
    var options = createEntitiesSelectionOptions()
    var propertiesOptions = createPropertiesSelectionOptions()
    //DEFAULTS
    var useNodes = comp.renderSettings?.useNodes || false
    var focusOnSelected = comp.renderSettings?.focusOnSelected || false
    var showSearch = comp.renderSettings?.showSearch || false
    var showNodeList = comp.renderSettings?.showNodeList || false
    var relationsToDisplay = comp.renderSettings?.relationsToDisplay || []
    var entitiesToDisplay = comp.renderSettings?.entitiesToDisplay || []
    var propertiesToDisplay = comp.renderSettings?.fieldsToDisplay || []
    //DIALOGUE
    createDialogue({
        header:"Table Settings",
        fields:[
        {type:"boolean", name:"useNodes",config:{
                label:"Use Nodes",
                value:useNodes,
            }
        },  
        // {type:"text", name:"text",config:{
        //         label:"Property Name",
        //         value:"test",
        //         autofocus:true,
        //     }
        // },
        // {type:"selection", name:"entitiesToDisplay", config:{
        //     multipleSelection:true,
        //         label:"Entities to Display",
        //         list: options,
        //         selected:entitiesToDisplay,
        //     }
        // },
        // {type:"selection", name:"propertiesToDisplay", config:{
        //     multipleSelection:true,
        //         label:"Properties to Display",
        //         list: propertiesOptions,
        //         selected:propertiesToDisplay,
        //     }
        // },
        {type:"graph", name:"graph", config:{
                multipleSelection:true,
                label:"Show Relations With",
                list: options,
                selected:relationsToDisplay,
            }
        },
        {type:"boolean", name:"focusOnSelected",config:{
                label:"focus on current selection",
                value:focusOnSelected,
            }
        },  
        {type:"boolean", name:"showSearch",config:{
            label:"Show Search Box",
            value:showSearch,
            }
        },  
        {type:"boolean", name:"showNodeList",config:{
            label:"Show Node list",
            value:showNodeList,
            }
        },  
        ],
        onConfirm:(result)=>{
            console.log(result);
            var newConfig = {
                useNodes : result.useNodes,
                // entitiesToDisplay : uuidFromSelection(result.entitiesToDisplay),
                // fieldsToDisplay : uuidFromSelection(result.propertiesToDisplay),
                relationsToDisplay : result.graph,
                focusOnSelected : result.focusOnSelected,
                showSearch : result.showSearch,
                showNodeList : result.showNodeList,
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

export {createGraphSettings}