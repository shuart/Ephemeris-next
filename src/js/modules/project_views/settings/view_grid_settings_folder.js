import { createEntitiesSelectionOptions } from "../../common_selectors/entities_selector.js";
import createDialogue from "../../common_select_dialogue/common_dialogue.js";
import { createPropertiesSelectionOptions } from "../../common_selectors/properties_selector.js";
import createStructuresManagement from "../../common_project_management/structures_management.js";
import { createStructuresSelectionOptions } from "../../common_selectors/structures_selector.js";

var uuidFromSelection = function(data){
    if (data && data[0]) {
        return data.map(i=>i.uuid)
    }else{
        return []
    }
}

function createFolderSettings(comp, callback) {
    //OPTIONS
    var options = createEntitiesSelectionOptions()
    var propertiesOptions = createPropertiesSelectionOptions()
    var structuresOptions = createStructuresSelectionOptions()
    //DEFAULTS
    var useNodes = comp.renderSettings?.useNodes || false
    var focusOnSelected = comp.renderSettings?.focusOnSelected || false
    var showSearch = comp.renderSettings?.showSearch || false
    var showNodeList = comp.renderSettings?.showNodeList || false
    var allowEditing = comp.renderSettings?.allowEditing || false
    var relationsToDisplay = comp.renderSettings?.relationsToDisplay || []
    var entitiesToDisplay = comp.renderSettings?.entitiesToDisplay || []
    var propertiesToDisplay = comp.renderSettings?.fieldsToDisplay || []
    var structuresToDisplay = comp.renderSettings?.structuresToDisplay || []
    //DIALOGUE
    createDialogue({
        header:"Folder Settings",
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
        {type:"selection", name:"entitiesToDisplay", config:{
            multipleSelection:true,
                label:"Entities to Display",
                list: options,
                selected:entitiesToDisplay,
            }
        },
        {type:"selection", name:"structuresToDisplay", config:{
            multipleSelection:false,
                label:"Structure to Display",
                list: structuresOptions,
                selected:structuresToDisplay,
            }
        },
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
        {type:"boolean", name:"allowEditing",config:{
            label:"Allow Editing",
            value:allowEditing,
            }
        },  
        ],
        onConfirm:(result)=>{
            console.log(result);
            var newConfig = {
                useNodes : result.useNodes,
                entitiesToDisplay : uuidFromSelection(result.entitiesToDisplay),
                structuresToDisplay : uuidFromSelection(result.structuresToDisplay),
                // fieldsToDisplay : uuidFromSelection(result.propertiesToDisplay),
                relationsToDisplay : result.graph,
                focusOnSelected : result.focusOnSelected,
                showSearch : result.showSearch,
                showNodeList : result.showNodeList,
                allowEditing : result.allowEditing,
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

export {createFolderSettings}