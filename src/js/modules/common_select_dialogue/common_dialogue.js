
import mainPopup from "../../modules/common_ui_components/mainPopup/mainPopup.js"
import select from "../../modules/common_ui_components/select/select.js"
import input_selection from "../common_ui_elements/input_selection.js"
import input_text from "../common_ui_elements/input_text.js"
import common_dialogue_footer from "./common_dialogue_footer.js"


var createDialoguePage = function (params) {
    var fieldsToAdd = []
    for (let i = 0; i < params.fields.length; i++) {
        const field = params.fields[i];
        if (field.type=="selection") {
            var item = input_selection.instance({
                data:field.config
            })
            fieldsToAdd.push(item) 
        }else if(field.type=="text"){ ////TEXT ELEMENT////
            if (!field.config.onFocusout) { //if an action is not setup the dialogue component will do it. 
                field.config.onFocusout=(event, data, instance)=>{ //the text element use the focus out event to store the value in the local store
                    
                    params.choiceStore[field.name] = data.value
                    console.log(params.choiceStore);
                }
            }
            var item = input_text.instance({
                data:field.config
            })
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
// }
var createDialogue = function(params){ 
    var choiceStore = {}
    var choices = []
    var parameters = undefined
    var containerPopup = mainPopup.with({data:{narrow:true,title:"Select Items"}})
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