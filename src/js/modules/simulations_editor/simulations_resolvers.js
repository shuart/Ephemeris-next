import nanoid from "../../vendor/nanoid.js";

var resolveSourceNode =function(node, graphData){
    console.info("Resolve " + node.templateName + " " + node.params.uuid);
    console.info(node);
    let parents = graphData.parentsList
    let children = graphData.adgencyList[node.params.uuid]
    let nodes = graphData.orderedNodes
    for (let i = 0; i < node.data.qt; i++) {
        node.data.outObjects.push({uuid:nanoid(), name:"test"})
    }
    node.data.outValue = node.data.outObjects.length
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
        if (parentNode.data.type == "stock" || parentNode.data.type == "source") {
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
            parentNode.data.outValue -= fluxValue

            // node._sim.flux = fluxValue
            // node._sim.left = parentNode.properties.value
        }
    });
    children.forEach(element => {
        var childrenNode = nodes.find(n=> n.params.uuid == element)
        if (childrenNode.data.type == "stock") {
            childrenNode.data.outValue += fluxValue
        }
    });
    
        
}

var resolveStockNode =function(node, graphData){
    console.info("Resolve " + node.templateName + " " + node.params.uuid);
    console.info(node);
    let parents = graphData.parentsList
    let children = graphData.adgencyList[node.params.uuid]
    let nodes = graphData.orderedNodes
    
}

export {resolveSourceNode,resolveFluxNode,resolveStockNode }