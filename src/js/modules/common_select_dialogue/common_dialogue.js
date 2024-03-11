
import mainPopup from "../../modules/common_ui_components/mainPopup/mainPopup.js"
import select from "../../modules/common_ui_components/select/select.js"
import input_boolean from "../common_ui_elements/input_boolean.js"
import input_graph from "../common_ui_elements/input_graph.js"
import input_selection from "../common_ui_elements/input_selection.js"
import input_text from "../common_ui_elements/input_text.js"
import common_dialogue_footer from "./common_dialogue_footer.js"
import nanoid from "../../vendor/nanoid.js"

var selectedArrayToObject = function (selectedArray) {
    var obj = {}
    console.log(selectedArray);
    for (let i = 0; i < selectedArray.length; i++) {
        obj[ selectedArray[i].uuid || selectedArray[i]  ] =true; //works if an object or an id
    }
    return obj
}

var createDialoguePage = function (params) {
    var fieldsToAdd = []
    for (let i = 0; i < params.fields.length; i++) {
        const field = params.fields[i];
        // field.config.selected = []
        if (field.config.selected && field.config.selected[0]) { // copy it for keeping track of base selection before modification
            params.choiceStore[field.name] = field.config.selected.map(function (i) {
                return {uuid:i} //return in a form matching the input selection field output -> an object
            })
        }
        if (field.type=="selection") {
            if (Array.isArray(field.config.selected) ) {
                field.config.selected = selectedArrayToObject(field.config.selected) //if selected is a list transform it to an object as required by input select
                // params.choiceStore[field.name] = field.config.selected
            }
            if (!field.config.onChange) { //if an action is not setup the dialogue component will do it. 
                field.config.onChange=(data)=>{ //the text element use the focus out event to store the value in the local store
                    
                    params.choiceStore[field.name] = data.selectedList
                }
            }
            var item = input_selection.instance({
                data:field.config
            })
            // params.choiceStore[field.name] = field.config.selected
            fieldsToAdd.push(item) 
        }else if(field.type=="text"){ ////TEXT ELEMENT////
            if (!field.config.onFocusout) { //if an action is not setup the dialogue component will do it. 
                field.config.onFocusout=(event, data, instance)=>{ //the text element use the focus out event to store the value in the local store
                    
                    params.choiceStore[field.name] = data.value
                    console.log(params.choiceStore);
                }
            }
            if (field.config.confirmOnEnter) { //if an enter key up is supposed to confirm element
                field.config.onEnter=(event, data, instance)=>{ //use the same confirm action then the button but add the input value first
                    params.choiceStore[field.name] = data.value
                    console.log(params.choiceStore);
                    if (params.onConfirm) {
                        params.onConfirm(params.choiceStore)
                    }
                    params.containerPopup.unmount()
                }
                
            }
            
            var item = input_text.instance({
                data:field.config
            })
            
            fieldsToAdd.push(item)
        }else if (field.type  == "boolean"){
            
            if (!field.config.onChange) { //if an action is not setup the dialogue component will do it. 
                field.config.onChange=(event, data, instance)=>{ //the text element use the focus out event to store the value in the local store
                    params.choiceStore[field.name] = data.value
                }
            }
            field.config.uuid = "id"+nanoid()
            var item = input_boolean.instance({
                data:field.config,
                // uuid:nanoid()
            })
            params.choiceStore[field.name] = field.config.value || false
            fieldsToAdd.push(item)
        }else if (field.type=="graph") {
            if (field.config.selected ) {
                field.config.selected = field.config.selected 
                params.choiceStore[field.name] = field.config.selected
            }
            if (!field.config.onChange) { //if an action is not setup the dialogue component will do it. 
                field.config.onChange=(data)=>{ //the text element use the focus out event to store the value in the local store
                    
                    params.choiceStore[field.name] = data
                }
            }
            
            var item = input_graph.instance({
                data:field.config
            })
            // params.choiceStore[field.name] = field.config.selected
            fieldsToAdd.push(item) 
        }
    }
    //add footer
    var footer = common_dialogue_footer.with(
        {data:{
            onConfirm:(event, data, instance)=>{
                console.log(params.choiceStore);
                if (params.onConfirm) {
                    params.onConfirm(params.choiceStore)
                }
                params.containerPopup.unmount()
            },
            onCancel:(event, data, instance)=>{
                console.log(params.choiceStore);
                if (params.onCancel) {
                    params.onCancel(params.choiceStore)
                }
                params.containerPopup.unmount()
            },
        }}
    )
    fieldsToAdd.push(footer)

    params.containerPopup.append(fieldsToAdd, "main-slot")

    
    // params.containerPopup.update();
}

// params = {
//     fields:[
//
//      ],
//     name:"page1",
//     header: " a title",
//     confirmEvenWithoutChanges:false,
// }
var createDialogue = function(params){ 
    var choiceStore = {}
    var choices = []
    var parameters = undefined
    var containerPopup = mainPopup.with({data:{narrow:true,title:params.header || "Select Items"}})
    if (!Array.isArray(params)) {
        parameters = [params]
    }else{
        parameters = params
    }
    var pageParams = Object.assign({}, parameters[0], {pagesNbr:parameters.length, page:1, choiceStore, containerPopup })
    createDialoguePage(pageParams)



    
    // for (let i = 0; i < iconPaths.length; i++) {
    //     const element = iconPaths[i];
    //     choices.push({uuid:element, name:element, isIcon:true, iconPath:element})
    // }
    containerPopup.mount()

}

export default createDialogue