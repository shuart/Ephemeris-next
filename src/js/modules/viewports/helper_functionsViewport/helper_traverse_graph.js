import createInstancesManagement from "../../common_project_management/instances_management.js";
import createRelationInstancesAggregate from "../../common_project_management/relationInstances_management.js";
import createRelationManagement from "../../common_project_management/relations_management.js";
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";

export function traverseGraphForRelations(roots, relations, nodes, mode){
    var mode=mode || "default" //compact mode or not?
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


    traverseLevel(roots,undefined, relations, nodesToNodesOutMapping, nodesToNodesInMapping)
    // console.log(roots);
    // alert("nodetoenode")
    var expandedTest = expandTable(roots, mode)

    // console.log(isRelationTypeOfInterest);
    // console.log(isNodeTypeOfInterest);
    // console.log(nodesInMapping);
    // console.log(nodesOutMapping);
    // console.log(nodesToNodesInMapping);
    // console.log(nodesToNodesOutMapping);
    // console.log(expandedTest);
    // // console.log(roots);
    // alert("nodetoenode2")
    return {roots:expandedTest.roots, cols:expandedTest.newCols}
}

function expandTable(roots, mode) {
    // var mode= "cmpact"
    var levels = levels || {tracker:-1, previous:-1} //use an object to keep track even out of the closure
    levels.previous = levels.tracker
    levels.tracker +=1
    var currentLevel = levels.tracker

    var newCols =[]
    var newColsDone = {}
    var newRoots = []
    for (let i = 0; i < roots.length; i++) {
        const root = roots[i];
        // var currentDeferedRoot = deferedRoot || root //check if elements should be attached to the main root
        // alert("root" + root.name)
        traverseForward(mode, root,root, newCols, newColsDone,newRoots)
        
    }
    if (mode != "compact") {
        roots = newRoots
        console.log(newRoots);
        // alert("newrrots")
    }
    return {roots, newCols}
}

function traverseForward(mode,root, deferedRoot, newColsToUpdate, newColsDoneToUpdate, newRoots, cyclicList) {
    var newCols =newColsToUpdate || []
    var newColsDone = newColsDoneToUpdate || {}
    var newRoots = newRoots || []
    var cyclicList = cyclicList || {}

    var currentDeferedRoot = deferedRoot || root
    
    if (!currentDeferedRoot._pushedToGraph) { //push to new roots if not done yet
        newRoots.push(currentDeferedRoot)
        currentDeferedRoot._pushedToGraph = true
    }

    if (root.forward && !cyclicList[currentDeferedRoot.uuid]) {//Does the current element has relations and has not been traversed yet

        cyclicList[currentDeferedRoot.uuid] = true
        //create a current safe copy at this level before registering any extra prop (to avoid having them marked as "copied")
        var newRoot = copyObject(currentDeferedRoot)

        if (!newColsDone[root.forward.name]) { //Build the cols definition for the table
            
            var relationRepo = createRelationManagement()
            var currentRel = relationRepo.getById(root.forward.name)
            newCols.push({title:currentRel?.name, field:root.forward.name})
            newColsDone[root.forward.name] = true 
        }
        if (!currentDeferedRoot[root.forward.name]) { //if prop does not exist yet, create it
            currentDeferedRoot[root.forward.name] = []
            
        }

        

        for (let j = 0; j < root.forward.list.length; j++) { //append each forwar element as a relation prop
            const forwardElement = root.forward.list[j];
            if (mode == "compact") {

                currentDeferedRoot[root.forward.name].push({displayAs:"relation", relation:undefined, direction:"incoming", callback:(id)=>showPopupInstancePreview(id), target:forwardElement})
                traverseForward(mode, forwardElement, currentDeferedRoot, newColsToUpdate, newColsDoneToUpdate, newRoots, cyclicList)

            }else{

                if (!currentDeferedRoot[root.forward.name][0]) { //check if origin field is empty , then push and proceed forward with the same root
                    currentDeferedRoot[root.forward.name]=[{displayAs:"relation", relation:undefined, direction:"incoming", callback:(id)=>showPopupInstancePreview(id), target:forwardElement}]
                    traverseForward(mode, forwardElement, currentDeferedRoot, newColsToUpdate, newColsDoneToUpdate, newRoots, cyclicList)
                }else{
                    // newRoots.push(currentDeferedRoot)
                    // var newRoot = Object.assign({}, currentDeferedRoot)
                    newRoot[root.forward.name]=[{displayAs:"relation", relation:undefined, direction:"incoming", callback:(id)=>showPopupInstancePreview(id), target:forwardElement}]
                    newRoots.push(newRoot)
                    traverseForward(mode, forwardElement, newRoot, newColsToUpdate, newColsDoneToUpdate, newRoots, cyclicList)
                }

            }
        }
    }else{
        console.log(cyclicList);
    }
}

function copyObject(object){
    var newObj = {}
    var copied = {}

    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            // const element = object[key];
            newObj[key] = object[key]
            copied[key] = true
        }
    }
    newObj._copiedInTable = copied
    return newObj
}


function traverseLevel(roots,mainRoot, relations, nodesToNodesOutMapping, nodesToNodesInMapping, cyclicList) {
    for (let i = 0; i < roots.length; i++) {
        const root = roots[i];
        var rootToUpdate = root
        var cyclicList =cyclicList || {}
        if (mainRoot) { //check which root to update depending of the level
            rootToUpdate = mainRoot
        }
        if (!cyclicList[rootToUpdate.uuid]) {//prevent analysis of already traversed nodes
            cyclicList[rootToUpdate.uuid] = true

            for (let i = 0; i < relations.length; i++) {
                if (nodesToNodesOutMapping[root.uuid] && nodesToNodesOutMapping[root.uuid][relations[i]]) {
                    // rootToUpdate["forward"] = nodesToNodesOutMapping[root.uuid][relations[i]].map(function (r) {
                    //     return {displayAs:"relation", relation:undefined, direction:"incoming", callback:(id)=>showPopupInstancePreview(id), target:r}
                    // })
                    console.log(nodesToNodesOutMapping[root.uuid][relations[i]]);
                    for (let j = 0; j < nodesToNodesOutMapping[root.uuid][relations[i]].length; j++) {
                        const currentTarget = nodesToNodesOutMapping[root.uuid][relations[i]][j];
                        if (!rootToUpdate["forward"]) {rootToUpdate["forward"] ={name:relations[i], list:[]} }
                        // rootToUpdate["forward"].list.push({displayAs:"relation", relation:undefined, direction:"incoming", callback:(id)=>showPopupInstancePreview(id), target:currentTarget})
                        rootToUpdate["forward"].list.push(currentTarget)
                        
                    }
                    traverseLevel(nodesToNodesOutMapping[root.uuid][relations[i]],undefined, relations, nodesToNodesOutMapping, nodesToNodesInMapping,cyclicList)
                    // root.attributes["forward"] = nodesToNodesOutMapping[root.uuid][relations[i]]
                    // root.attributes["forward"] = {displayAs:"relation", relation:nodesToNodesOutMapping[root.uuid][relations[i]], direction:"incoming", callback:(id)=>showPopupInstancePreview(id), target:undefined}
                }
                if (nodesToNodesInMapping[root.uuid] && nodesToNodesInMapping[root.uuid][relations[i]]) {
                    for (let j = 0; j < nodesToNodesInMapping[root.uuid][relations[i]].length; j++) {
                        const currentTarget = nodesToNodesInMapping[root.uuid][relations[i]][j];
                        if (!rootToUpdate["backward"]) {rootToUpdate["backward"] ={name:relations[i], list:[]} }
                        // rootToUpdate["forward"].list.push({displayAs:"relation", relation:undefined, direction:"incoming", callback:(id)=>showPopupInstancePreview(id), target:currentTarget})
                        rootToUpdate["backward"].list.push(currentTarget)
                        
                    }
                    // traverseLevel(nodesToNodesInMapping[root.uuid][relations[i]],undefined, relations, nodesToNodesOutMapping, nodesToNodesInMapping)
                    // root.attributes["backward"] = nodesToNodesInMapping[root.uuid][relations[i]]
                    // rootToUpdate["backward"] = nodesToNodesInMapping[root.uuid][relations[i]].map(function (r) {
                    //     return {displayAs:"relation", relation:undefined, direction:"incoming", callback:(id)=>showPopupInstancePreview(id), target:r}
                    // })
                    // root.attributes["backward"] = {displayAs:"relation", relation:nodesToNodesInMapping[root.uuid][relations[i]], direction:"outgoing", callback:(id)=>showPopupInstancePreview(id), target:undefined}
                }
            }

        }else{
            console.log('cyclic')
        }
        // root.forward = "test"
        // root.backward= "test"
        
        
    }
    // return {roots, cols}
}
