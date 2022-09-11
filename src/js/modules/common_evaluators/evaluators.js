import createInstancesManagement from "../common_project_management/instances_management.js";

var createEvaluator = function ({
    mainUiElement=undefined,
}={}) {
    var self = {};

    var basicEvaluation = function(){
        var result = {}
        var instancesRepo = createInstancesManagement()
        console.log(instancesRepo.getByType(mainUiElement));
        // alert()
        result.list = instancesRepo.getByType(mainUiElement)
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