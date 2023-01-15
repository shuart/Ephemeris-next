
import mainPopup from "../../modules/common_ui_components/mainPopup/mainPopup.js"
import select from "../../modules/common_ui_components/select/select.js"
import input_selection from "../common_ui_elements/input_selection.js"
import input_text from "../common_ui_elements/input_text.js"


var createDialoguePage = function (params) {
    params.containerPopup.append([
        // select.instance({
        //     data:{
        //         list:[],
        //         callback:function(event){ //TODO add callback
        //             // currentSelectedInstance.addRelation(sourceItem,targetItem)
        //             // console.log(currentSelectedInstance.getRelations());
        //             // currentSelectedInstance.addRelation(eventInCallback.value.uuid,targetItem)
        //             // selectInstance.do.softUpdate();
        //             if (data.callback) {
        //                 data.callback(event)
        //             }
        //             // var element= document.createElement('div')
        //             // element.style.position="absolute";
        //             // element.style.right="50px";
        //             // element.style.zIndex="99999999999999";

        //             // element.innerHTML = `<img src="./img/icons/${event.value.uuid}" style="position:absolute; right:50px;filter: invert(100%);">`
        //             // document.body.appendChild(element)
        //         }
        //     }
        // }),
        input_selection.instance({
            data:{
                value:"select",
            }
        }),
        input_text.instance({
            data:{
                value:"test",
            }
        }),
    ], "main-slot")

    
    // params.containerPopup.update();
}

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
    var pageParams = Object.assign({}, params[0], {pagesNbr:parameters.length, page:1, choiceStore, containerPopup })
    createDialoguePage(pageParams)



    
    // for (let i = 0; i < iconPaths.length; i++) {
    //     const element = iconPaths[i];
    //     choices.push({uuid:element, name:element, isIcon:true, iconPath:element})
    // }
    containerPopup.mount()

}

export default createDialogue