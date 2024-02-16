import createEntityManagement from "../common_project_management/entity_management.js"
import createDialogue from "../common_select_dialogue/common_dialogue.js"

var selectedArrayToObject = function (selectedArray) {
    var obj = {}
    for (let i = 0; i < selectedArray.length; i++) {
        obj[ selectedArray[i].uuid || selectedArray[i]  ] =true; //works if an object or an id
    }
    return obj
}

export function showEntitiesSelector ({
    selected=[], //uuid of selected items or object with uuid as prop names
    multipleSelection= true,
    customOptions= false,
    onChange=(e)=>console.log(e),
}={}) {
    console.log(selected);

    var options= undefined

    if (!customOptions) {
        var repo = createEntityManagement()
        var entities = repo.getAll()

        options = entities.map(e=>{
            return  {name:e.name, uuid:e.uuid, iconPath:e.attributes.iconPath}
        })
    }else{
        options = customOptions
    }
    

    var showSelectionDialogue = function () {
        createDialogue({
            fields:[
            //  {type:"text", name:"text",config:{
            //          label:"Property Name",
            //          value:"Property Name",
            //          autofocus:true,
            //      }
            //  },
             {type:"selection", name:"selection", config:{
                    multipleSelection:multipleSelection,
                     label:"Property Type",
                     list: options,
                     selected:selected,
                 }
             },
            ],
            onConfirm:(result)=>{
                var added = []
                var removed = []
                var newSelection = result.selection
                if (Array.isArray(selected)) {
                    selected = selectedArrayToObject(selected)
                }
                if (Array.isArray(result.selection)) {
                    newSelection = selectedArrayToObject(result.selection)
                }
                for (const key in selected) {
                    if (Object.hasOwnProperty.call(selected, key)) {
                        const originalUuid = selected[key];
                        if(!newSelection[key]){
                            removed.push(key)
                        }
                    }
                }
                for (const key in newSelection) {
                    if (Object.hasOwnProperty.call(newSelection, key)) {
                        const newUuid = newSelection[key];
                        if(!selected[key]){
                            added.push(key)
                        }
                    }
                }
                var change = {added, removed} //TODO check here
                onChange(result, change)
            } 
         })
    }

    showSelectionDialogue()

}

export function createEntitiesSelectionOptions(params) {
    var repo = createEntityManagement()
        var entities = repo.getAll()

    var options = entities.map(e=>{
        return  {name:e.name, uuid:e.uuid, iconPath:e.attributes.iconPath}
    })

    return options
}