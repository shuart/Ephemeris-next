import { fadeNode, unFadeNode } from "./stellae_hide_fade_nodes.js";

var createConnectionHighlighter = function(){
    var self = {}
    var domElement = undefined;
    var nodesList = []
    var relationsList = []

    var highlight = function(node){
        //get connections
        var connectedNodes={};
        connectedNodes.mapping = {};
        for (let i = 0; i < relationsList.length; i++) {
            const relation = relationsList[i];
            if (relation.edata.from == node.edata.uuid) {
                connectedNodes.mapping[relation.edata.to] = node.edata.uuid
            }
            if (relation.edata.to == node.edata.uuid) {
                connectedNodes.mapping[relation.edata.from] = node.edata.uuid
            }
            
        }
        
        console.log(connectedNodes);

        for (let i = 0; i < nodesList.length; i++) {
            const element = nodesList[i];
            if ( node == element || connectedNodes.mapping[element.edata.uuid]) { //if element was marked as connection
                unFadeNode(element)
            }else{
                fadeNode(element)
            }
            
        }
    }

    var updateNodes = function(nodes){
        
        nodesList= nodes
        // populate()
    }
    var updateRelations = function(relations){
        
        relationsList= relations
        // populate()
    }

    // init()
    self.updateNodes = updateNodes
    self.updateRelations = updateRelations
    self.highlight = highlight

    return self
}

export default createConnectionHighlighter