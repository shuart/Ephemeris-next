import behaveAsNormalNode from "./stellae_utils_check_if_normal_node.js";


var markSelected = function (nodesList) {
    if (!Array.isArray(nodesList)) {
        nodesList = [nodesList]
    }
    for (let i = 0; i < nodesList.length; i++) {
        const element = nodesList[i];
        if (behaveAsNormalNode(element)) {
            element.traverse(o=>{
                if (o.layoutItemType == "selectionMarker") {
                    o.visible = true
                }
            })
        }
        
        
    }
    
}

var markUnSelected = function (nodesList) {
    if (!Array.isArray(nodesList)) {
        nodesList = [nodesList]
    }
    for (let i = 0; i < nodesList.length; i++) {
        const element = nodesList[i];
        if (behaveAsNormalNode(element)) {
            element.traverse(o=>{
                if (o.layoutItemType == "selectionMarker") {
                    o.visible = false
                }
            })
        }
        
        
    }
    
}


export {markSelected, markUnSelected}