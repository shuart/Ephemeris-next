import createInstancesManagement from "../../common_project_management/instances_management.js";
import createRelationInstancesAggregate from "../../common_project_management/relationInstances_management.js";
import createRelationManagement from "../../common_project_management/relations_management.js";
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";

export function traverseGraphForRelations(roots, relations, nodes){
    var instancesRepo = createInstancesManagement()
    var relationsInstancesRepo = createRelationInstancesAggregate()
    var relationsRepo = createRelationManagement()
    console.log(relationsRepo.getAll());

    var relationsInstances = relationsInstancesRepo.getAll()
    var instances = instancesRepo.getAll()

    var isRelationTypeOfInterest = {}
    var isNodeTypeOfInterest = {}
    for (let i = 0; i < relations.length; i++) {
        isRelationTypeOfInterest[relations[i]] = true;
    }
    for (let i = 0; i < nodes.length; i++) {
        isNodeTypeOfInterest[nodes[i]] = true;
    }

    var uuidToNode = {}

    for (let i = 0; i < instances.length; i++) {
        uuidToNode[instances[i].uuid] = instances[i];
    }


    var nodesOutMapping = {}
    var nodesToNodesOutMapping = {}

    for (let i = 0; i < relationsInstances.length; i++) {
        const relationInstance = relationsInstances[i];
        console.log(relationInstance);
        if (isRelationTypeOfInterest[relationInstance.attributes.type]) {
            if (!nodesOutMapping[relationInstance.attributes.from]) { nodesOutMapping[relationInstance.attributes.from] = [] }
            nodesOutMapping[relationInstance.attributes.from].push(relationInstance)
        }
        if (isRelationTypeOfInterest[relationInstance.attributes.type]) {
            if (!nodesToNodesOutMapping[relationInstance.attributes.from]) { nodesToNodesOutMapping[relationInstance.attributes.from] = {} }
            if (!nodesToNodesOutMapping[relationInstance.attributes.from][relationInstance.attributes.type]) { nodesToNodesOutMapping[relationInstance.attributes.from][relationInstance.attributes.type] = [] }
            nodesToNodesOutMapping[relationInstance.attributes.from][relationInstance.attributes.type].push(uuidToNode[relationInstance.attributes.to])
        }
        
    }

    var nodesInMapping = {}
    var nodesToNodesInMapping = {}

    for (let i = 0; i < relationsInstances.length; i++) {
        const relationInstance = relationsInstances[i];
        if (isRelationTypeOfInterest[relationInstance.attributes.type]) {
            if (!nodesInMapping[relationInstance.attributes.to]) { nodesInMapping[relationInstance.attributes.to] = [] }
            nodesInMapping[relationInstance.attributes.to].push(relationInstance)
        }
        if (isRelationTypeOfInterest[relationInstance.attributes.type]) {
            if (!nodesToNodesInMapping[relationInstance.attributes.to]) { nodesToNodesInMapping[relationInstance.attributes.to] = {} }
            if (!nodesToNodesInMapping[relationInstance.attributes.to][relationInstance.attributes.type]) { nodesToNodesInMapping[relationInstance.attributes.to][relationInstance.attributes.type] = [] }
            nodesToNodesInMapping[relationInstance.attributes.to][relationInstance.attributes.type].push(uuidToNode[relationInstance.attributes.from])
        }
        
    }

    //forwardTraverse
    console.log(roots);
    for (let i = 0; i < roots.length; i++) {
        const root = roots[i];
        for (let i = 0; i < relations.length; i++) {
            if (nodesToNodesOutMapping[root.uuid] && nodesToNodesOutMapping[root.uuid][relations[i]]) {
                root.attributes["forward"] = nodesToNodesOutMapping[root.uuid][relations[i]].map(function (r) {
                    return {displayAs:"relation", relation:undefined, direction:"incoming", callback:(id)=>showPopupInstancePreview(id), target:r}
                })
                // root.attributes["forward"] = nodesToNodesOutMapping[root.uuid][relations[i]]
                // root.attributes["forward"] = {displayAs:"relation", relation:nodesToNodesOutMapping[root.uuid][relations[i]], direction:"incoming", callback:(id)=>showPopupInstancePreview(id), target:undefined}
            }
            if (nodesToNodesInMapping[root.uuid] && nodesToNodesInMapping[root.uuid][relations[i]]) {
                // root.attributes["backward"] = nodesToNodesInMapping[root.uuid][relations[i]]
                root.attributes["backward"] = nodesToNodesInMapping[root.uuid][relations[i]].map(function (r) {
                    return {displayAs:"relation", relation:undefined, direction:"incoming", callback:(id)=>showPopupInstancePreview(id), target:r}
                })
                // root.attributes["backward"] = {displayAs:"relation", relation:nodesToNodesInMapping[root.uuid][relations[i]], direction:"outgoing", callback:(id)=>showPopupInstancePreview(id), target:undefined}
            }
        }
        
    }

    console.log(isRelationTypeOfInterest);
    console.log(isNodeTypeOfInterest);
    console.log(nodesInMapping);
    console.log(nodesOutMapping);
    console.log(nodesToNodesInMapping);
    console.log(nodesToNodesOutMapping);
    // alert("nodetoenode")
    return {roots:roots, cols:[{name:"forward", field:"forward"}, {name:"backward", field:"backward"}]}
}