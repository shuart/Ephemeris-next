import { createEntitiesSelectionOptions } from "../../common_selectors/entities_selector.js";
import createDialogue from "../../common_select_dialogue/common_dialogue.js";

export function createTableSettings(params) {
    var options = createEntitiesSelectionOptions()
    createDialogue({
        fields:[
        {type:"boolean", name:"useNodes",config:{
                label:"Property Name",
                value:true,
            }
        },  
        {type:"text", name:"text",config:{
                label:"Property Name",
                value:"test",
                autofocus:true,
            }
        },
        {type:"selection", name:"selection", config:{
            multipleSelection:true,
                label:"Property Type",
                list: options,
                selected:[],
            }
        },
        ],
        onConfirm:(result)=>{
            console.log(result);
            alert("esfesf")
            var added = []
            var removed = []
            var newSelection = result.selection
        } 
     })
    
}