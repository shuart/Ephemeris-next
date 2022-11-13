import createInstancesManagement from "../common_project_management/instances_management.js";
import createEvaluatorsManagement from "../common_project_management/evaluators_management.js";
import createStellae from "../../vendor/stellae/stellae.js";
import evaluatorTemplates from "./evaluator_nodes_templates.js";


var createEvaluator = function ({
    type=undefined,
    graphId = undefined,
}={}) {
    var self = {};

    var basicEvaluation = function(){
        var result = {}
        var instancesRepo = createInstancesManagement()
        console.log(instancesRepo.getByType(type));
        result.list = instancesRepo.getByType(type)
        result.addAction = instancesRepo.add
        return result;
    }

    var graphEvaluation = function(graphId){
        var result = {}
        var repo = createEvaluatorsManagement()
        var currentGraph = repo.getById(graphId)
        var graphNodes = undefined


        // if (currentGraph.attributes.nodeLayout) {
        //     var layout = JSON.parse(currentGraph.attributes.nodeLayout)
        //     console.log(layout);
        //     // return layout.nodes.find(e=>e.templateName == "output_table").params.propsValue.rows
        //     result.list = layout.nodes.find(e=>e.templateName == "output_table").params.propsValue.rows
        //     result.cols = layout.nodes.find(e=>e.templateName == "output_table").params.propsValue.cols||undefined
        //     result.addAction = layout.nodes.find(e=>e.templateName == "output_table").params.propsValue.actions||undefined
        //     console.trace(result)
        //     alert(53)
        //     return result;
        // }
        /////////////////


        if (currentGraph.attributes.nodeLayout) {
            graphNodes = createStellae({headless:true})
    
            var repo = createEvaluatorsManagement()
            // var currentGraph = repo.getById(instance.props.get("evaluatorId"))
            graphNodes.getNodeManager().useTemplate(evaluatorTemplates)
            
            if (currentGraph.attributes.nodeLayout) {
                graphNodes.getNodeManager().importGraph(JSON.parse(currentGraph.attributes.nodeLayout))
                graphNodes.getNodeManager().evaluateTree()
                var exportGraph = graphNodes.getNodeManager().exportNodes()
                // console.log(exportGraph);
                // alert(54)

                if (exportGraph.nodes.find(e=>e.templateName == "output_table")) {
                    result.list = exportGraph.nodes.find(e=>e.templateName == "output_table").params.propsValue.rows
                    result.cols = exportGraph.nodes.find(e=>e.templateName == "output_table").params.propsValue.cols||undefined
                    result.actions = exportGraph.nodes.find(e=>e.templateName == "output_table").params.propsValue.actions||undefined
                }
                if (exportGraph.nodes.find(e=>e.templateName == "output_graph")) {
                    result.nodes = exportGraph.nodes.find(e=>e.templateName == "output_graph").params.propsValue.nodes||undefined
                    result.links = exportGraph.nodes.find(e=>e.templateName == "output_graph").params.propsValue.links||undefined
                    result.onConnect = exportGraph.nodes.find(e=>e.templateName == "output_graph").params.propsValue.onConnectAction||undefined
                }
                
                // console.log(result);
                // alert(55)
                return result;
            }
            return result;
        }
        
    }
    
    var evaluate = function () {
        if (graphId) {
            return graphEvaluation(graphId)
        }
        if (type) {
            return basicEvaluation()
        }
        
    }

    self.evaluate = evaluate

    return self;
    
}

// var testEvaluat= createEvaluator()


export default createEvaluator;