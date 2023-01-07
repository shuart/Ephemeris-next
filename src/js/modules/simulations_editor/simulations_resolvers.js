import nanoid from "../../vendor/nanoid.js";
import createWorkbenchNodeLogic from "./simulations_resolvers_workbench.js";

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

    var qt = node.evalData.qt
    for (let i = 0; i < qt; i++) {
        node.data.outObjects.push({uuid:nanoid(), name:"test"})
    }
    updateNodeDisplayValue(node)
}

var resolveFrameNode =function(node, graphData, frame){
    console.info("Resolve " + node.templateName + " " + node.params.uuid);
    console.info(node);
    let parents = graphData.parentsList
    let children = graphData.adgencyList[node.params.uuid]
    let nodes = graphData.orderedNodes
    node.data.output = frame
    node.data.outValue = frame
    node.params.nodeObject.setProp("output",frame)
    node.params.nodeObject.setProp("outValue",frame)
    node.params.nodeObject.setProp("frame",frame)
    // updateNodeDisplayValue(node)
}

var resolveFluxNode =function(node, graphData){
    console.info("Resolve " + node.templateName + " " + node.params.uuid);
    console.info(node);
        //check parents first
    let parents = graphData.parentsList[node.params.uuid]
    let children = graphData.adgencyList[node.params.uuid]
    let nodes = graphData.orderedNodes
    var fluxValue = node.evalData.flux ||node.data.flux
    
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
            if (fluxValue > 0 && (childrenNode.data.type == "stock" || childrenNode.data.type == "process" || childrenNode.data.type == "simulation_workbench") ) {
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
    var duration = node.evalData.duration ||node.data.duration

    
    node.data.bufferObjects[currentFrame] = node.data.inObjects
    node.data.inObjects =[]
    var objectsReadyToGetOut = node.data.bufferObjects[currentFrame - duration] || []
    node.data.bufferObjects[currentFrame - duration] = []
    node.data.outObjects = node.data.outObjects.concat(objectsReadyToGetOut)
    var out = node.data.outObjects 
    updateNodeDisplayValue(node)
    
    
}

var resolveWorkbenchNode =function(node, graphData, currentFrame){
    console.info("Resolve " + node.templateName + " " + node.params.uuid);
    console.info(node);
    let parents = graphData.parentsList
    let children = graphData.adgencyList[node.params.uuid]
    let nodes = graphData.orderedNodes

    var currentNodeBuffer = undefined

    if (node.data.bufferObjects) {
        currentNodeBuffer = node.data.bufferObjects
    }else{
        currentNodeBuffer = createWorkbenchNodeLogic()
        node.data.bufferObjects = currentNodeBuffer
    }
    var injected = currentNodeBuffer.inject(node.data.inObjects)
    console.log();
    // node.data.bufferObjects[currentFrame] = node.data.inObjects
    node.data.inObjects =[]


    // var duration = node.evalData.duration ||node.data.duration

    
    // node.data.bufferObjects[currentFrame] = node.data.inObjects
    // node.data.inObjects =[]
    // var objectsReadyToGetOut = node.data.bufferObjects[currentFrame - duration] || []
    // node.data.bufferObjects[currentFrame - duration] = []
    // node.data.outObjects = node.data.outObjects.concat(objectsReadyToGetOut)
    // var out = node.data.outObjects 
    // updateNodeDisplayValue(node)
    
    
}

export {resolveSourceNode,resolveFluxNode,resolveStockNode, resolveProcessNode, resolveFrameNode, resolveWorkbenchNode }