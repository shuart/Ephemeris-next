import createInstancesManagement from "../common_project_management/instances_management.js";

var createEvaluator = function ({
    type=undefined,
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
    
    var evaluate = function () {
        
        return basicEvaluation()
    }

    self.evaluate = evaluate

    return self;
    
}

// var testEvaluat= createEvaluator()


export default createEvaluator;