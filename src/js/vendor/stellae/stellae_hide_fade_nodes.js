var fadeNode = function(node){
    node.children[2].visible = false
        node.traverse(o=>{
            if (o.material) {
                o.material.transparent = true;
                o.material.opacity = 0.1;
            }
        })
}
var unFadeNode = function(node){
    node.children[2].visible = false
        node.traverse(o=>{
            if (o.material) {
                o.material.transparent = false;
                o.material.opacity = 1;
            }
        })
}

export {fadeNode, unFadeNode}