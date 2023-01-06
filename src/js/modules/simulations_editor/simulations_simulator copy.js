import topologicalOrdering from "./simulations_topologicalOrdering.js"
import { resolveSourceNode,resolveFluxNode, resolveStockNode, resolveProcessNode, resolveFrameNode } from "./simulations_resolvers.js"

var createSimulator = function(graph){
    var self = {}
    var simulationState = "init"
    var renderer3d = undefined
    var currentFrame = 0
    var lastFrameTime = 0
    var timeBetweenFrames = 1000
    var currentSimulationData  = undefined
    var currentGraph = undefined
    var callbacks = {
        onIterate : (data)=>console.log(data),
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
    var updateCallbacks = function (newCallbacks) {
        callbacks = newCallbacks
    }

    var resetSimulation = function(){
        // start by sorting node with a topological ordering
        var sortedData = topologicalOrdering(currentGraph)
        currentSimulationData = JSON.parse(JSON.stringify(sortedData))
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
        for (let i = 0; i < nodes.length; i++) { nodes[i].data = nodes[i].params.propsValueFromInput;nodes[i].data.type = nodes[i].templateName;  } //add simpler access to node data
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];

            if (node) {
                
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
            if (node.templateName =="simulation_frame") {
                resolveFrameNode(node, data, frame)
            }

            
            if (renderer3d) {
                renderer3d.updateView(data, node)
            }
        }
        callbacks.onIterate(data.orderedNodes, frame);
    }
    
    
    self.setRenderer = setRenderer
    self.play = play
    self.pause = pause
    self.reset = reset
    self.updateData = updateData
    self.updateCallbacks = updateCallbacks
    return self
}

export default createSimulator

