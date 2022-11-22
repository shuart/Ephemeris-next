import iconPaths from "./iconArray.js"
import mainPopup from "../mainPopup/mainPopup.js"
import select from "../select/select.js"


var createIconPicker = function(data){
    var choices = []
    
    for (let i = 0; i < iconPaths.length; i++) {
        const element = iconPaths[i];
        choices.push({uuid:element, name:element, isIcon:true, iconPath:element})
    }
    mainPopup.mount()
    mainPopup.append(select.instance({
        data:{
            list:choices,
            callback:function(event){ //TODO add callback
                // currentSelectedInstance.addRelation(sourceItem,targetItem)
                // console.log(currentSelectedInstance.getRelations());
                // currentSelectedInstance.addRelation(eventInCallback.value.uuid,targetItem)
                // selectInstance.do.softUpdate();
                if (data.callback) {
                    data.callback(event)
                }
                // var element= document.createElement('div')
                // element.style.position="absolute";
                // element.style.right="50px";
                // element.style.zIndex="99999999999999";

                // element.innerHTML = `<img src="./img/icons/${event.value.uuid}" style="position:absolute; right:50px;filter: invert(100%);">`
                // document.body.appendChild(element)
            }
        }
    }), "main-slot")
    mainPopup.update();
}

export default createIconPicker