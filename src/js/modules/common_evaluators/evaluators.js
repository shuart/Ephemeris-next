import createInstancesManagement from "../common_project_management/instances_management.js";
import createEvaluatorsManagement from "../common_project_management/evaluators_management.js";
import createStellae from "../../vendor/stellae/stellae.js";
import evaluatorTemplates from "./evaluator_nodes_templates.js";


var createEvaluator = function ({
    type=undefined,
    graphId = undefined,
    originInstance = undefined,
}={}) {
    var self = {};
    // alert(originInstance)
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
                graphNodes.getNodeManager().setGlobalSetting("originInstance",originInstance)
                graphNodes.getNodeManager().importGraph(JSON.parse(currentGraph.attributes.nodeLayout))
                graphNodes.getNodeManager().evaluateTree()
                var exportGraph = graphNodes.getNodeManager().exportNodes({withAllValues:true})
                // console.log(exportGraph);
                // alert(54)

                var outputNodes = exportGraph.nodes.filter(e=>e.category == "output")
                console.log(outputNodes);
                for (let i = 0; i < outputNodes.length; i++) {
                    const node = outputNodes[i];
                    var output = result[node.templateName] ={}
                    var props = node.params.propsValue
                    output.instances = props.instances||undefined
                    output.instance = props.instance||undefined
                    output.relations = props.relations||undefined
                    
                    output.attributes = props.attributes||undefined
                    output.actions = props.actions||undefined
                    output.onConnect = props.onConnectAction||undefined
                    output.onInstanceClick = props.onInstanceClickAction||undefined
                    //to deprecate
                    output.list = props.rows||undefined
                    output.cols = props.cols||undefined
                    output.actions = props.actions||undefined
                    //
                    output.nodes = props.nodes||undefined
                    output.links = props.links||undefined
                    
                    output.onNodeClick = props.onNodeClickAction||undefined
                    output.actions = props.actions||undefined
                    output.propertyName = props.propertyName||undefined
                    
                }

                // if (exportGraph.nodes.find(e=>e.templateName == "output_properties")) {
                //     result.output_properties = {}
                //     result.output_properties.instance = exportGraph.nodes.find(e=>e.templateName == "output_properties").params.propsValue.instance||undefined
                // }
                // if (exportGraph.nodes.find(e=>e.templateName == "output_text_editor")) {
                //     result.output_text_editor = {}
                //     result.output_text_editor.instance = exportGraph.nodes.find(e=>e.templateName == "output_text_editor").params.propsValue.instance||undefined
                //     result.output_text_editor.propertyName = exportGraph.nodes.find(e=>e.templateName == "output_text_editor").params.propsValue.propName||undefined
                // }
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