import behaveAsNormalNode from "./stellae_utils_check_if_normal_node.js";

var getConnectedNodes = function(node, state){
    //get connections
    var relationsList = state.links
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
    
    var ConnectedNodesToReturn =[]
    var nodesList = state.nodes
    for (let i = 0; i < nodesList.length; i++) {
        const element = nodesList[i];
        if (behaveAsNormalNode(element)) {
            if ( node == element || connectedNodes.mapping[element.edata.uuid] ) { //if element was marked as connection
                ConnectedNodesToReturn.push(element)
            }
        }
    }

    return ConnectedNodesToReturn

}

export {getConnectedNodes}