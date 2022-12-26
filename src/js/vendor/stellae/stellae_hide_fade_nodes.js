var fadeNode = function(node){
        node.traverse(o=>{
            if (o.layoutItemType == "shadow") {
                o.visible = false
            } else if (o.material) {
                if (o.type != "Sprite") {
                    o.material.transparent = true; 
                }
                o.material.opacity = 0.1;
            }
        })
}
var unFadeNode = function(node){
        node.traverse(o=>{
            if (o.layoutItemType == "shadow") {
                o.visible = false
            } else if (o.material) {
                if (o.type != "Sprite") {
                    o.material.transparent = false; 
                }
                o.material.opacity = 1;
            }
        })
}

export {fadeNode, unFadeNode}