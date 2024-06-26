

var createSimulation = function (params) {
    var self = {}
    var simulation = undefined;
    var simulationNodes = [];
    var simulationLinks = [];
    var simulationLinksByUuid = {};
    var simulationNodesByUuid = {};
    var simulationNodesByRootUuid = {};
    var running = false;
    var d3ForceSimulation = undefined;
    var currentDraggedNode = undefined;

    var setUpForceSimulation = function () {
        if (!d3ForceSimulation) {
            //set up the simulation 
            //nodes only for now 
            d3ForceSimulation= d3.forceSimulation()
            //add nodes
            .nodes(simulationNodes);	
            //add forces
            //we're going to add a charge to each node 
            //also going to add a centering force
            d3ForceSimulation
            // .force("link", d3.forceLink(simulationLinks).distance(4).strength(0.1))
            .force("link", d3.forceLink(simulationLinks).id(d => d.id).distance(4).strength(0.1))
            // .force("link", d3.forceLink(simulationLinks).id(d => d.id).distance(0).strength(-1))
            // .force("link", d3.forceLink(links).id(d => d.id).distance(0).strength(-1))
            // .force("charge", d3.forceManyBody().strength(-50))
            .force("charge_force", d3.forceManyBody().strength(-0.07).distanceMax(18))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .alphaDecay(0.03)
            // .force("center_force", d3.forceCenter(1000 / 2, 1000 / 2));

            d3ForceSimulation.on("tick", forceTickActions );
        }
        
    }

    var forceTickActions = function () {
        // console.log(simulationNodes);
        updateNodesReferencePositions()
    }

    var simulate = function () {
        for (let i = 0; i < simulationNodes.length; i++) {
            const element = simulationNodes[i];
            element.x +=0.01
            element.y +=0.01
            element.reference.position.x = element.x
        }
        if (running) {
            requestAnimationFrame(simulate)
        }
        
    }
    var updateNodesReferencePositions = function () {
        for (let i = 0; i < simulationNodes.length; i++) {
            const element = simulationNodes[i];
            element.reference.position.x = element.x
            element.reference.position.z = element.y
            element.reference.edata.nodeData.setPosition(element.x,element.y)
        }
    }

    var startSimulation = function () {
        if (!d3ForceSimulation) {
            setTimeout(setUpForceSimulation,1000)
            // setUpForceSimulation()
        }
        if (!running) {
            running = true;
            // simulate() 
        }
    }
    var stopSimulation = function () {
        if (running) {
            running = false;
            d3ForceSimulation.stop()
        }
    }

    var createNode = function(element){
        if (!simulationNodesByUuid[element.edata.uuid]) {
            var node = {id:element.edata.uuid , x:element.position.x,y:element.position.y, uuid:element.edata.uuid, reference:element }
            simulationNodesByUuid[element.edata.uuid]=node
            simulationNodes.push(node)
        }else if (simulationNodesByUuid[element.edata.uuid]) {
            simulationNodesByUuid[element.edata.uuid].reference = element
        }
        

    }
    // var createNode = function(element){
    //     if (!simulationNodesByUuid[element.uuid]) {
    //         var node = {id:element.uuid , x:element.position.x,y:element.position.y, uuid:element.uuid, reference:element }
    //         simulationNodesByUuid[element.uuid]=node
    //         simulationNodes.push(node)
    //     }else if (simulationNodesByUuid[element.uuid]) {
    //         simulationNodesByUuid[element.uuid].reference = element
    //     }
    // }
    var createLink = function(element){
        if (!simulationLinksByUuid[element.uuid]) {
            var link = {source:element.from, target:element.to, reference:element }
            simulationLinksByUuid[element.uuid]=link
            simulationLinks.push(link)
        }else if (simulationLinksByUuid[element.uuid]) {
            simulationLinksByUuid[element.uuid].reference = element
        }
        
        // console.log(element);
        // console.log(simulationNodesByUuid);
        // console.log(simulationLinksByUuid);
        // alert("create link")
        

    }

    var addNodes = function(nodeOrArray){
        if (Array.isArray(nodeOrArray)) {
            for (let i = 0; i < nodeOrArray.length; i++) {
                createNode(nodeOrArray[i])
            }
        }else{
            createNode(nodeOrArray)
        }
        startSimulation()
        setTimeout(function () {
            stopSimulation()
        },3000)
    }
    var fixNodes = function(nodeOrArray){
        
        if (Array.isArray(nodeOrArray)) {
            for (let i = 0; i < nodeOrArray.length; i++) {
                if (nodeOrArray[i].edata.position.y !=0 && nodeOrArray[i].edata.position.x !=0) {
                    setNodeForcedPosition(nodeOrArray[i].edata.uuid,nodeOrArray[i].position.x,nodeOrArray[i].edata.position.y)
                }
            }
        }else{
            if (nodeOrArray.edata.position.y !=0 && nodeOrArray.edata.position.x !=0) {
                setNodeForcedPosition(nodeOrArray.edata.uuid,nodeOrArray.position.x,nodeOrArray.edata.position.y)
            }
            
        }
    }

    var addLinks = function(linkOrArray,state){
        if (Array.isArray(linkOrArray)) {
            for (let i = 0; i < linkOrArray.length; i++) {
                createLink(linkOrArray[i],state)
            }
        }else{
            createLink(linkOrArray,state)
        }
        if (d3ForceSimulation) {//if a force system is already setup, update it
            d3ForceSimulation.force("link", d3.forceLink(simulationLinks).id(d => d.id).distance(4).strength(0.1))
        }
        
        startSimulation()
        setTimeout(function () {
            stopSimulation()
        },3000)
    }

    var setNodeForcedPosition = function (uuid,x,y) {
        for (let i = 0; i < simulationNodes.length; i++) {
            const element = simulationNodes[i];
            
            if (element.uuid == uuid) {
                element.fx =x
                element.fy =y
            }
        }
    }
    var unfixNodes = function (nodesIds) {
        for (let k = 0; k < nodesIds.length; k++) {
            const nodeId = nodesIds[k];
            for (let i = 0; i < simulationNodes.length; i++) {
                const element = simulationNodes[i];
                if (element.uuid == nodeId) {
                    element.fx = undefined
                    element.fy = undefined
                }
            }
            
        }
        
    }

    var dragNode = function (uuid, x,y) {
        if (uuid != currentDraggedNode) {
            currentDraggedNode =uuid
            // d3ForceSimulation.alphaTarget(0.1).restart()
            // d3ForceSimulation.restart();
            // d3ForceSimulation.alpha(1.0);
            
        }
        // d3ForceSimulation.restart();
        // d3ForceSimulation.alpha(1.0);
        setNodeForcedPosition(uuid, x,y)
        // console.log(simulationLinks);
        // alert("simulation forces")
    }

    var dragNodeStart = function (uuid) {
        if (uuid != currentDraggedNode) {
            currentDraggedNode =uuid
            // d3ForceSimulation.alphaTarget(0.1).restart()
            // d3ForceSimulation.restart();
            // d3ForceSimulation.alpha(1.0);
            
        }
        // d3ForceSimulation.restart();
        // d3ForceSimulation.alpha(0.3);
        d3ForceSimulation.alphaTarget(0.3).restart()
        // setNodeForcedPosition(uuid, x,y)
        // console.log(simulationLinks);
        // alert("simulation forces")
    }
    var dragNodeEnd= function () {
        d3ForceSimulation.alphaTarget(0);
    }
    
    self.fixNodes = fixNodes
    self.unfixNodes = unfixNodes
    self.dragNode = dragNode
    self.dragNodeStart = dragNodeStart
    self.dragNodeEnd = dragNodeEnd
    self.addNodes = addNodes
    self.startSimulation= startSimulation
    self.addlinks= addLinks
    return self
}
// var simulation = createSimulation()
export default createSimulation

