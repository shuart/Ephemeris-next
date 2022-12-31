import nanoid from "../../vendor/nanoid.js";
import createEvaluatorsManagement from "../common_project_management/evaluators_management.js";
import projectManagement from "../common_project_management/project_management.js";
import { getSummaryEvaluator } from "./evaluator_schema_summary.js";

var createSimpleSummaryPageForEntities = function(){

    //createEvaluator
    var schema = getSummaryEvaluator()
    var repoEvaluator = createEvaluatorsManagement()
    var evaluatorId = nanoid()
    repoEvaluator.add({uuid:evaluatorId,name:"Summary Evaluator", nodeLayout:JSON.stringify(schema)})

    var projectId = projectManagement.getCurrent().id
    var pageLayout = [{"settings":{},"cols":[{"settings":{},"components":[{"settings":{"evaluatorUuid":evaluatorId},"componentType":"table"}]}]},{"settings":{},"cols":[{"settings":{},"components":[]}]}];
    var pageName = prompt("Page Name")
    projectManagement.getProjectStore(projectId,"views").add({name:pageName,iconPath:'list.svg',  layout:JSON.stringify(pageLayout)})
}

export{createSimpleSummaryPageForEntities}