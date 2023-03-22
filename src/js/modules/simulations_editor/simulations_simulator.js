import topologicalOrdering from "./simulations_topologicalOrdering.js"
import { resolveSourceNode,resolveFluxNode, resolveStockNode, resolveProcessNode, resolveFrameNode, resolveWorkbenchNode, resolvePoolNode, resolveJunctionNode } from "./simulations_resolvers.js"

var createSimulator = function(graph){
    var self = {}
    var simulationState = "init"
    var renderer3d = undefined
    var chart = undefined
    var currentFrame = 0
    var lastFrameTime = 0
    var timeBetweenFrames = 1000
    var currentSimulationData  = undefined
    var currentGraph = undefined
    var callbacks = {
        onIterate : (data)=>console.log(data),
    }

    var report = {}

    var recordNodesValues = function (nodes) {
        for (const key in nodes) {
            if (Object.hasOwnProperty.call(nodes, key)) {
                const node = nodes[key];
                if (node.data && node.data.outValue && (node.data.type == "stock" || node.data.type == "source" || node.data.type == "process" || node.data.type == "simulation_workbench" || node.data.type == "simulation_pool") ) {
                    if (!report[node.params.name]) {
                        report[node.params.name] = []
                    }
                    report[node.params.name].push(node.data.outValue)
                }
                
            }
        }
        
    }

    var play =function(params) {
        if (simulationState == "init") {
            startSimulation() 
        }else{
            simulationState = "play"
        } 

    }
    var pause =function(params) {
        simulationState = "pause"

    }
    var reset =function(params) {
        simulationState = "init"
        currentFrame = 0
        lastFrameTime = 0
        if (renderer3d) {
            renderer3d.resetScene()
        }
    }
    var startSimulation = function (data) { //kickstart the sim
        console.log("Starting simulation");
        // updateData(data)
        resetSimulation()
        simulationState = "play"
        iterate();
        
    }

    var updateData = function (data) {
        currentGraph = data
    }
    var setRenderer = function (data) {
        renderer3d = data
    }
    var setChart = function (data) {
        chart = data
    }
    var updateCallbacks = function (newCallbacks) {
        callbacks = newCallbacks
    }

    var resetSimulation = function(){
        // start by sorting node with a topological ordering
        
        var nodes = currentGraph.exportNodes({withAllValues:true, withNodeObject:true})
        var sortedData = topologicalOrdering(nodes)
        // currentSimulationData = JSON.parse(JSON.stringify(sortedData))
        currentSimulationData = sortedData
        var nodes = currentSimulationData.orderedNodes
        //node data is the object used only for the simulation nodes temporary values. It's clean after each reset. EvalData is defined afterward to have access to the "normal" graph values. 
        //Nothing should be "written" to it appart if we want to modify the node graph directly
        for (let i = 0; i < nodes.length; i++) { nodes[i].data = JSON.parse(JSON.stringify(nodes[i].params.propsValueFromInput));nodes[i].data.type = nodes[i].templateName;  } //add simpler access to node data
        
    }

    var iterate = function () { //iterate every x secondes and increment frame
        if ((Date.now() - lastFrameTime > timeBetweenFrames)&& simulationState == "play") {
            currentFrame ++ 
            lastFrameTime = Date.now()
            processFrame(currentFrame, currentSimulationData)

            console.log(currentFrame)
            console.log(lastFrameTime)
        }
        window.requestAnimationFrame(iterate)
    } 
    var processFrame = function(frame, data){
        resolveNodes(frame, data) 
    }

    var resolveNodes = function (frame, data) {
        
        var nodes = data.orderedNodes
        // for (let i = 0; i < nodes.length; i++) { nodes[i].data = JSON.parse(JSON.stringify(nodes[i].params.propsValueFromInput));nodes[i].data.type = nodes[i].templateName;  } //add simpler access to node data
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.templateName =="simulation_frame") { //update simulation frames first to avoid offset
                resolveFrameNode(node, data, frame)
            }
            if (node && node.params.nodeObject.evaluate) { //update each node after the other with their evaluation function
                node.params.nodeObject.evaluate()
                
                var socketData = node.params.nodeObject.exportSockets()//TODO, could be return by evaluate fun
                node.evalData = socketData.propsValue;
            }
        }
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];

            if (node && node.params.nodeObject.evaluate) { //update each node after the other with their evaluation function
                node.params.nodeObject.evaluate()
                
                var socketData = node.params.nodeObject.exportSockets()//TODO, could be return by evaluate fun
                node.evalData = socketData.propsValue;
            }

            if (node.templateName =="source") {
                resolveSourceNode(node, data, frame)
            }
            if (node.templateName =="flux") {
                resolveFluxNode(node, data, frame)
            }
            if (node.templateName =="stock") {
                resolveStockNode(node, data, frame)
            }
            if (node.templateName =="process") {
                resolveProcessNode(node, data, frame)
            }
            if (node.templateName =="junction") {
                resolveJunctionNode(node, data, frame)
            }
            // if (node.templateName =="simulation_frame") {
            //     resolveFrameNode(node, data, frame)
            // }
            if (node.templateName =="simulation_workbench") {
                resolveWorkbenchNode(node, data, frame)
            }
            if (node.templateName =="simulation_pool") {
                resolvePoolNode(node, data, frame)
            }

            
            if (renderer3d) {
                renderer3d.updateView(data, node)
            }
            
        }
        recordNodesValues(data.orderedNodes)
        if (chart) {
            chart.updateFromData(report)
        }
        callbacks.onIterate(data.orderedNodes, frame);
    }
    
    
    self.setChart = setChart
    self.setRenderer = setRenderer
    self.play = play
    self.pause = pause
    self.reset = reset
    self.updateData = updateData
    self.updateCallbacks = updateCallbacks
    return self
}

export default createSimulator

