import iconPaths from "./iconArray.js"
import iconPathsExtended from "./iconArrayExtended.js"
import iconPathsStory from "./iconArrayStory.js"
import mainPopup from "../mainPopup/mainPopup.js"
import select from "../select/select.js"

var basic = false;
var extended = true;
var story = true;

var getBetterName = function (elem) {
    var capitalized =  elem.charAt(0).toUpperCase() + elem.slice(1);
    return capitalized.slice(0, -4).replace("-"," ")
}

var createIconPicker = function(data){
    var choices = []
    if (basic) {
        for (let i = 0; i < iconPaths.length; i++) {
            const element = iconPaths[i];
            choices.push({uuid:element, name:getBetterName(element), isIcon:true, iconPath:element})
        }
    }
    if (extended) {
        for (let i = 0; i < iconPathsExtended.length; i++) {
            const element = iconPathsExtended[i];
            choices.push({uuid:element, name:getBetterName(element), isIcon:true, iconPath:element})
        }
    }
    if (story) {
        for (let i = 0; i < iconPathsStory.length; i++) {
            const element = iconPathsStory[i];
            choices.push({uuid:"story/"+element, name:"story/"+getBetterName(element), isIcon:true, iconPath:"story/"+element})
        }
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