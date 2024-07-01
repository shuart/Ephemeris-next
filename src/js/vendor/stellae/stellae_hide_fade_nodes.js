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


function createNodeVisibilityManager() {
    var self = {};
    var state = undefined;
    var instanceEngine = undefined;

    var hide = function (id) {
        if (instanceEngine) {
            instanceEngine.getNode(id).hide()
        }
    }
    var show = function (id) {
        if (instanceEngine) {
            instanceEngine.getNode(id).show()
        }
    }
    var setState = function (id) {
        
    }
    var setInstanceEngine = function (engine) {
        instanceEngine =engine
    }

    self.hide=hide;
    self.show=show;
    self.setState=setState;
    self.setInstanceEngine=setInstanceEngine;
    return self
}
var nodeVisibilityManager = createNodeVisibilityManager()

export {fadeNode, unFadeNode, nodeVisibilityManager}