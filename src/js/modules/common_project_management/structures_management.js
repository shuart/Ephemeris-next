import createRepoManagement from "./repo_management.js";
import projectManagement from "./project_management.js";
import createRelationsManagement from "./relations_management.js";
import projectStores from "./project_data_store.js";
import nanoid from "../../vendor/nanoid.js";
import createEntityManagement from "./entity_management.js";

var structureAggregate = function(aggregate, projectStore){

    var propNameUuidMapping = {}
    var propUuidNameMapping = {}

    //parameters "Properties"
    var ownProperties = {}
    var sourceEntity = projectStore.get("entities").where("uuid").equals(aggregate.attributes.type)
    for (const key in sourceEntity) {
        if (Object.hasOwnProperty.call(sourceEntity, key) && key.search("prop_")>=0) {
            const element = sourceEntity[key];
            //TODO check if ref is still used
            // ownProperties.push({uuid:key, value:aggregate.attributes[key]})
            var property = projectStore.get("properties").where("uuid").equals(key.substring(5))
            if (property) {
                var propertyName = property.name
                propNameUuidMapping[propertyName]=key
                propUuidNameMapping[key]=propertyName
                ownProperties[propertyName] = aggregate.attributes[key]
                ownProperties[propertyName] = {property:property, value:aggregate.attributes[key]} 
            }
            
        }
    }      
    aggregate.properties = ownProperties
    
    //parameters "Relations"
    var ownRelations = []
    var currentRelations = projectStore.get("hierarchies").toArray()
    for (let i = 0; i < currentRelations.length; i++) {
        const element = currentRelations[i];
        if (element.from == aggregate.uuid) {
            ownRelations.push(element);
        }
    }
    aggregate.relations = ownRelations
    // aggregate.color = sourceEntity.color
    // aggregate.sourceEntity = sourceEntity

    //methods
    aggregate.getRelations = function () {
        var ownRelations = []
        var currentRelations = projectStore.get("hierarchies").toArray()
        for (let i = 0; i < currentRelations.length; i++) {
            const element = currentRelations[i];
            if (element.from == aggregate.uuid) {
                ownRelations.push(element);
            }
            if (element.to == aggregate.uuid) {
                ownRelations.push(element);
            }
        }
        return ownRelations
    }



    //methods
    aggregate.setPropertyByName = function (propName, value) {
        var propRef = propNameUuidMapping[propName]
        if (propRef) {
            // var newObject = {uuid:aggregate.uuid,[ "prop_"+propRef ]:value}
            var newObject = {uuid:aggregate.uuid,[ propRef ]:value} //TODO check why 'prop' is not needed
            projectStore.add("structures",newObject)
        }else{
            console.warn("No property named "+ propRef);
        }
    }
    aggregate.setPropertyByUuid = function (propRef, value) {
        
        var newObject = {uuid:aggregate.uuid,[ "prop_"+propRef ]:value}
        projectStore.add("structures",newObject)
    }

    //methods
    aggregate.addRelation = function (type, targetId) {
        var currentRelationTarget = projectStore.get("structures").where("uuid").equals(targetId)
        projectStore.add("hierarchies",{name:`from ${aggregate.name} to ${currentRelationTarget.name}`, from:aggregate.uuid, to:currentRelationTarget.uuid, type:type})
    }
    aggregate.addRelationFromSource = function (type, sourceId) {
        var currentRelationSource = projectStore.get("structures").where("uuid").equals(sourceId)
        projectStore.add("hierarchies",{name:`from ${currentRelationSource.name} to ${aggregate.name} `, to:aggregate.uuid, from:currentRelationSource.uuid, type:type})
    }
    aggregate.removeRelation = function (type, targetId) {
        var currentRelationTarget = projectStore.get("hierarchies").where("type").equals(type)
        var relationToRemove = undefined;
        for (let i = 0; i < currentRelationTarget.length; i++) {
            const element = currentRelationTarget[i];
            if (element.to == targetId) { relationToRemove = element  }
        }
        if (relationToRemove) {
            projectStore.remove("hierarchies",relationToRemove.uuid)
        }
        
    }
    aggregate.removeRelationFromSource = function (type, sourceId) {
        var currentRelationTarget = projectStore.get("hierarchies").where("type").equals(type)
        var relationToRemove = undefined;
        for (let i = 0; i < currentRelationTarget.length; i++) {
            const element = currentRelationTarget[i];
            if (element.from == sourceId) { relationToRemove = element  }
        }
        if (relationToRemove) {
            projectStore.remove("hierarchies",relationToRemove.uuid)
        }
        
    }

    return aggregate
}

var customRepoMethods = function (projectStore,createAggregate) {
    var repo = {}

    repo.getByType = function(targetId){
        var exportedByType = []
        var entities = projectStore.get("structures").where("type").equals(targetId)
        for (let i = 0; i < entities.length; i++) {
            const element = entities[i];
            exportedByType.push(createAggregate(element))
        }
        return exportedByType
    }

    repo.createFrom =function (sourceId, data) {
        var currentUuid = nanoid()
        data.uuid = currentUuid
        projectStore.add("structures",data)
        // projectStore.add("hierarchies",{name:`from ${sourceId} to ${data.name}`, from:sourceId, to:currentUuid, type:type || undefined})
        projectStore.add("hierarchies",{name:`from ${sourceId} to ${data.name}`, from:sourceId, to:currentUuid,})
    }

    repo.getChildrenOfId = function (sourceId) {
        var toReturn = []
        var sourceToChildMapping ={}
        var childToSourceMapping ={}
        var currentHierarchies = projectStore.get("hierarchies").toArray()
        var currentStructures = projectStore.get("structures").toArray()
        for (let i = 0; i < currentHierarchies.length; i++) {
            const element = currentHierarchies[i];
            sourceToChildMapping[element.from] = element.to  
            childToSourceMapping[element.to] = element.from  
        }
        for (let i = 0; i < currentStructures.length; i++) {
            const structure = currentStructures[i];
            if (childToSourceMapping[structure.uuid] == sourceId) {
                toReturn.push(structure)
            }
            
        }
        // console.log(sourceToChildMapping);
        // console.log(childToSourceMapping);
        // console.log(currentStructures);
        // console.log(currentHierarchies);
        // console.log(toReturn);
        // console.log(sourceId);
        // alert("eeefg")
        return toReturn
    }

    repo.link = function (sourceId, targetId) {
        var currentRelationTarget = projectStore.get("structures").where("uuid").equals(targetId)
        var currentRelationSource = projectStore.get("structures").where("uuid").equals(sourceId)
        if (currentRelationTarget && currentRelationSource) {
            projectStore.add("hierarchies",{name:`from ${currentRelationSource.name} to ${currentRelationSource.name}`, from:currentRelationSource.uuid, to:currentRelationTarget.uuid, type:type})
        }else{
            console.warn("Missing source or target")
        }
    }

    return repo
}

var createStructuresManagement = function () {
    return createRepoManagement(projectManagement.getCurrent().id, 'structures', structureAggregate, customRepoMethods)
}

export default createStructuresManagement