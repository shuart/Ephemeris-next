import createInstancesManagement from "../common_project_management/instances_management.js";
import createEvaluatorsManagement from "../common_project_management/evaluators_management.js";

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
        if (currentGraph.attributes.nodeLayout) {
            var layout = JSON.parse(currentGraph.attributes.nodeLayout)
            console.log(layout);
            // return layout.nodes.find(e=>e.templateName == "output_table").params.propsValue.rows
            result.list = layout.nodes.find(e=>e.templateName == "output_table").params.propsValue.rows
            result.cols = layout.nodes.find(e=>e.templateName == "output_table").params.propsValue.cols||undefined
            result.addAction = undefined
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