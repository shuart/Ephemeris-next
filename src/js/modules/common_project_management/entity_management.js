import createRepoManagement from "./repo_management.js";
import projectManagement from "./project_management.js";
import projectStores from "./project_data_store.js";
import nanoid from "../../vendor/nanoid.js";
import createPropertyManagement from "./properties_management.js";

var entityAggregate = function(aggregate, projectStore){

    //parameters "Properties"
    var ownProperties = {}
    for (const key in aggregate.attributes) {
        if (Object.hasOwnProperty.call(aggregate.attributes, key) && key.search("prop_")>=0) {
            const element = aggregate.attributes[key];
            //TODO check if ref is still used
            // ownProperties.push({uuid:key, value:aggregate.attributes[key]})
            var property = projectStore.get("properties").where("uuid").equals(key.substring(5))
            if (property) {
                var propertyName = property.name
                // ownProperties[propertyName] = aggregate.attributes[key]
                ownProperties[propertyName] = property
            }
        }
    }
    aggregate.properties = ownProperties

    //parameters "Relations"
    var ownRelations = []
    var currentRelations = projectStore.get("relations").toArray()
    for (let i = 0; i < currentRelations.length; i++) {
        const element = currentRelations[i];
        if (element["from_"+aggregate.uuid]) {
            ownRelations.push(element);
        }
        
    }
    aggregate.relations = ownRelations
    //methods
    aggregate.getOutgoingRelations = function (param, type) {
        var outgoingRelations = []
        var currentRelations = projectStore.get("relations").toArray()
        for (let i = 0; i < currentRelations.length; i++) {
            const element = currentRelations[i];
            if (element["from_"+aggregate.uuid]) {
                outgoingRelations.push(element);
            }
            
        }
        return outgoingRelations
    }
    aggregate.getIncomingRelations = function (param, type) {
        var incomingRelations = []
        var currentRelations = projectStore.get("relations").toArray()
        for (let i = 0; i < currentRelations.length; i++) {
            const element = currentRelations[i];
            if (element["to_"+aggregate.uuid]) {
                incomingRelations.push(element);
            }
            
        }
        return incomingRelations
    }
    aggregate.getInstances = function (param, type) {
        var instances = []
        var allInstances = projectStore.get("instances").toArray()
        for (let i = 0; i < allInstances.length; i++) {
            const element = allInstances[i];
            if (element.type== aggregate.uuid) {
                instances.push(element);
            }
            
        }
        return instances
    }

    aggregate.getAssignedProperties = function () {
        var ownProperties = []
        for (const key in aggregate.attributes) {
            if (Object.hasOwnProperty.call(aggregate.attributes, key)  && key.search("prop_")>=0 && aggregate.attributes[key]) {
                var property = projectStore.get("properties").where("uuid").equals(key.substring(5))
                ownProperties.push(property)
                // const element = aggregate.attributes[key];
                
            }
        }
        return ownProperties
    }
    aggregate.getHeritedProperties = function () {
        var selfRepo = createEntityManagement()
        var propertyRepo = createPropertyManagement()
        // var parent = selfRepo.getById(aggregate.attributes.parentId)
        var heritedProperties = []
        var foundProperties = {}
        var currentParent = selfRepo.getById(aggregate.attributes.parentId) || undefined
        var level =0
        console.log(aggregate.attributes);
        console.log(currentParent);
        while(currentParent && level <15){
            
            level ++
            for (const key in currentParent.attributes) {
                if (Object.hasOwnProperty.call(currentParent.attributes, key)  && key.search("prop_")>=0 && currentParent.attributes[key]) {
                    // var property = projectStore.get("properties").where("uuid").equals(key.substring(5))
                    var property = propertyRepo.getById(key.substring(5))
                    if (property && !foundProperties[property.uuid]) {
                        foundProperties[property.uuid] = true
                        // var property = Object.assign({},property,{assign:true})
                        property.herited = true;
                        heritedProperties.push(property)
                    }
                }
            }
            currentParent = selfRepo.getById(currentParent.attributes.parentId) || undefined
        }
        
        return heritedProperties
    }
    aggregate.getAllProperties = function () {
        var selfProps = aggregate.getAssignedProperties()
        var heritedProps = aggregate.getHeritedProperties()
        return selfProps.concat(heritedProps)
    }
    //methods
    aggregate.addProperty = function (param, type) {
        var futureId = nanoid()
        var refId = 'prop_'+futureId
        projectStore.add("properties",{uuid:futureId,name:param, type:type})
        projectStore.add("entities",{uuid:aggregate.uuid,[refId]:true})
    }

    aggregate.assignProperty = function (propertyId) { //TODO check if prop exisit
        if (!aggregate.attributes['prop_'+propertyId]) {
            projectStore.add("entities",{uuid:aggregate.uuid,['prop_'+propertyId]:true})
        }
    }
    aggregate.unassignProperty = function (propertyId) { //TODO check if prop exisit
        if (aggregate.attributes['prop_'+propertyId]) {
            projectStore.add("entities",{uuid:aggregate.uuid,['prop_'+propertyId]:false})
        }
    }

    //methods
    aggregate.addRelation = function (type, targetId) {
        var currentRelationTarget = projectStore.get("entities").where("uuid").equals(targetId)
        projectStore.add("relations",{name:`from ${aggregate.name} to ${currentRelationTarget.name}`, type:type, ["from_"+aggregate.uuid]:true,["to_"+currentRelationTarget.uuid]:true })
    }
    //methods
    aggregate.setDefaultViewId = function (targetId) {
        projectStore.add("entities",{uuid:aggregate.uuid, defaultViewId:targetId})
    }
    aggregate.getDefaultView = function () {
        var view = projectStore.get("views").where("uuid").equals(aggregate.attributes.defaultViewId) 
        return view
    }
    aggregate.getParent = function () {
        var selfRepo = createEntityManagement()
        var parent = selfRepo.getById(aggregate.attributes.parentId)
        return parent
    }
    aggregate.setParent = function (targetId) {
        projectStore.add("entities",{uuid:aggregate.uuid, parentId:targetId})
    }

    return aggregate
}

var createEntityManagement = function () {
    return createRepoManagement(projectManagement.getCurrent().id, 'entities', entityAggregate)
}

export default createEntityManagement