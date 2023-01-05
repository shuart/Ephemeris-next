import nanoid from "../../vendor/nanoid.js";

var updateNodeDisplayValue = function(node){
    
    if ( (node.data.outValue && node.data.outObjects) || (node.data.outValue == 0 && node.data.outObjects) ) {
        node.data.outValue = node.data.outObjects.length
    }else{
        console.log(node);
        alert()
    }
    
}

var resolveSourceNode =function(node, graphData){
    console.info("Resolve " + node.templateName + " " + node.params.uuid);
    console.info(node);
    let parents = graphData.parentsList
    let children = graphData.adgencyList[node.params.uuid]
    let nodes = graphData.orderedNodes
    for (let i = 0; i < node.data.qt; i++) {
        node.data.outObjects.push({uuid:nanoid(), name:"test"})
    }
    updateNodeDisplayValue(node)
}

var resolveFluxNode =function(node, graphData){
    console.info("Resolve " + node.templateName + " " + node.params.uuid);
    console.info(node);
        //check parents first
    let fluxValue = node.data.flux
    let parents = graphData.parentsList[node.params.uuid]
    let children = graphData.adgencyList[node.params.uuid]
    let nodes = graphData.orderedNodes
    
    parents.forEach(element => {
        var parentNode = nodes.find(n=> n.params.uuid == element)
        if (parentNode.data.type == "stock" || parentNode.data.type == "source" || parentNode.data.type == "process") {
            //check if enough in stock
            let stockValue = parentNode.data.outValue 
            // if (parentNode.properties.delay != 0) {
            //     console.log(frame, parentNode._sim.previousValue[frame-parentNode.properties.delay ])
            //     stockValue = parentNode._sim.previousValue[frame-parentNode.properties.delay ] || 0
            // }
            // console.log("trying check",fluxValue,stockValue)
            // if (!parentNode.properties.canGoNeg && (stockValue - fluxValue <0 ||parentNode.properties.value - fluxValue <0)) { 
            //     console.log("trying neeeeeeeeeeeeeg",fluxValue,stockValue)
            //     fluxValue = Math.min(stockValue,parentNode.properties.value ) 
            //     console.log(fluxValue, parentNode.properties.value)
            // }
            // console.log("reeeeeeeeeeeeeeo",parentNode.properties.value,fluxValue)
            var childrenNode = nodes.find(n=> n.params.uuid == children[0]) //TODO modify to allow multiple output
            if (fluxValue > 0 && (childrenNode.data.type == "stock" || childrenNode.data.type == "process") ) {
                // parentNode.data.outValue -= fluxValue
                for (let i = 0; i < fluxValue; i++) {
                    var removed = parentNode.data.outObjects.pop()
                    if (removed) {
                        childrenNode.data.inObjects.push(removed)
                        
                    }
                }
                updateNodeDisplayValue(childrenNode)
                updateNodeDisplayValue(parentNode)
                
            }
            
            // updateNodeDisplayValue(parentNode)

            // node._sim.flux = fluxValue
            // node._sim.left = parentNode.properties.value
        }
    });
    // children.forEach(element => {
    //     var childrenNode = nodes.find(n=> n.params.uuid == element)
    //     if (childrenNode.data.type == "stock") {
    //         childrenNode.data.outValue += fluxValue
    //     }
    // });
    
        
}

var resolveStockNode =function(node, graphData){
    console.info("Resolve " + node.templateName + " " + node.params.uuid);
    console.info(node);
    let parents = graphData.parentsList
    let children = graphData.adgencyList[node.params.uuid]
    let nodes = graphData.orderedNodes
    node.data.outObjects = node.data.outObjects.concat(node.data.inObjects)
    node.data.inObjects =[]
    updateNodeDisplayValue(node)
    
    
}

var resolveProcessNode =function(node, graphData, currentFrame){
    console.info("Resolve " + node.templateName + " " + node.params.uuid);
    console.info(node);
    let parents = graphData.parentsList
    let children = graphData.adgencyList[node.params.uuid]
    let nodes = graphData.orderedNodes
    
    node.data.bufferObjects[currentFrame] = node.data.inObjects
    node.data.inObjects =[]
    var objectsReadyToGetOut = node.data.bufferObjects[currentFrame - node.data.duration] || []
    node.data.bufferObjects[currentFrame - node.data.duration] = []
    node.data.outObjects = node.data.outObjects.concat(objectsReadyToGetOut)
    var out = node.data.outObjects 
    updateNodeDisplayValue(node)
    
    
}

export {resolveSourceNode,resolveFluxNode,resolveStockNode, resolveProcessNode }