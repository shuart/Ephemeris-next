import createRepoManagement from "./repo_management.js";
import projectManagement from "./project_management.js";
import createRelationsManagement from "./relations_management.js";
import projectStores from "./project_data_store.js";
import nanoid from "../../vendor/nanoid.js";
import createEntityManagement from "./entity_management.js";

var instanceAggregate = function(aggregate, projectStore){

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
    var currentRelations = projectStore.get("relationsInstances").toArray()
    for (let i = 0; i < currentRelations.length; i++) {
        const element = currentRelations[i];
        if (element.from == aggregate.uuid) {
            ownRelations.push(element);
        }
    }
    aggregate.relations = ownRelations
    aggregate.color = sourceEntity.color
    aggregate.sourceEntity = sourceEntity

    //methods
    aggregate.getRelations = function () {
        var ownRelations = []
        var currentRelations = projectStore.get("relationsInstances").toArray()
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
    aggregate.getRelated = function () {
        var entityRepo = createEntityManagement()
        var directRelations = aggregate.getRelations()
        var targets = []
        for (let i = 0; i < directRelations.length; i++) {
            const element = directRelations[i];
            if (element.from == aggregate.uuid) {
                var currentRelationTarget = projectStore.get("instances").where("uuid").equals(element.to)
                targets.push(currentRelationTarget);
            }
            if (element.to == aggregate.uuid) {
                var currentRelationTarget = projectStore.get("instances").where("uuid").equals(element.from)
                targets.push(currentRelationTarget);
            }
            
        }
        
        return targets
    }
    aggregate.getPotentialRelations = function () {
        var relationsRepo = createRelationsManagement()
        var relationsAvailable = relationsRepo.getAll()
        var availableList =[]
        for (let i = 0; i < relationsAvailable.length; i++) {
            const element = relationsAvailable[i];
            console.log(element);
            for (let j = 0; j < element.fromList.length; j++) {
                if (element.fromList[j].uuid == aggregate.attributes.type) {
                    availableList.push(element)
                }
            }
            for (let j = 0; j < element.toList.length; j++) {
                if (element.toList[j].uuid == aggregate.attributes.type) {
                    availableList.push(element)
                }
            }
        }
        return availableList
    }
    aggregate.getPotentialRelationsWithInstance = function (targetId) {
        var currentRelationTarget = projectStore.get("instances").where("uuid").equals(targetId)
        var availableRelationsList =aggregate.getPotentialRelations()
        var availableList = []
        for (let i = 0; i < availableRelationsList.length; i++) {
            const availableRelation = availableRelationsList[i];
            for (let j = 0; j < availableRelation.toList.length; j++) {
                const targetCat = availableRelation.toList[j];
                if (targetCat.uuid == currentRelationTarget.type) {
                    availableList.push(availableRelation)
                }
            }
        }

        return availableList
    }
    aggregate.getPotentialEntitiesForRelations = function () {
        var relationsRepo = createRelationsManagement()
        var relationsAvailable = relationsRepo.getAll()
        
        var availableRelationsList =aggregate.getPotentialRelations() 
        var availableTargetTypes = []
        for (let i = 0; i < availableRelationsList.length; i++) {
            const availableRelation = availableRelationsList[i];
            for (let j = 0; j < availableRelation.toList.length; j++) {
                const targetCat = availableRelation.toList[j];
                availableTargetTypes.push(targetCat.uuid)
            }
        }
        console.log(availableTargetTypes);
        var availableList =[]
        var allInstances = projectStore.get("instances").toArray()
        console.log(allInstances);

        for (let i = 0; i < allInstances.length; i++) {
            const instance = allInstances[i];
            for (let j = 0; j < availableTargetTypes.length; j++) {
                const availableTargetUuid = availableTargetTypes[j];
                if (availableTargetUuid == instance.type) {
                    availableList.push(instance)
                }
            }
        }

        return availableList
    }
    aggregate.getPotentialAndLinkedEntitiesForRelationType = function (typeUuid) {
        // var relationsRepo = createRelationsManagement()
        // var relationsAvailable = relationsRepo.getAll()
        var potentials = []
        var potentialsSource = []
        var alreadyLinked= []
        var alreadyLinkedSource= []
        var alreadyLinkedObjects= {}
        var alreadyLinkedSourceObjects= {}
        
        var availableRelationsList =aggregate.getPotentialRelations() 
        var availableTargetTypes = []
        var availableSourceTypes = []
        //find acceptable target type
        for (let i = 0; i < availableRelationsList.length; i++) {
            const availableRelation = availableRelationsList[i];
            console.log(typeUuid);
            console.log(availableRelation.attributes.type);
            if (availableRelation.uuid == typeUuid) {
                for (let j = 0; j < availableRelation.toList.length; j++) {
                    const targetCat = availableRelation.toList[j];
                    availableTargetTypes.push(targetCat.uuid)
                }
                for (let j = 0; j < availableRelation.fromList.length; j++) {
                    const sourceCat = availableRelation.fromList[j];
                    availableSourceTypes.push(sourceCat.uuid)
                }
            }
        }
        //find already targeted by relations or source of relation
        var currentRelations = projectStore.get("relationsInstances").toArray()
        for (let i = 0; i < currentRelations.length; i++) {
            const element = currentRelations[i];
            if (element.from == aggregate.uuid && element.type == typeUuid) {
                // alreadyLinked.push(element); //add it to the list afterward to do one loop only
                alreadyLinkedObjects[element.to] = true
            }
            if (element.to == aggregate.uuid && element.type == typeUuid) {
                // alreadyLinked.push(element); //add it to the list afterward to do one loop only
                alreadyLinkedSourceObjects[element.from] = true
            }
        }
        
        //find potential element to be linked
        var allInstances = projectStore.get("instances").toArray()
        console.log(allInstances);

        for (let i = 0; i < allInstances.length; i++) {
            const instance = allInstances[i];
            console.log(availableTargetTypes);
            for (let j = 0; j < availableTargetTypes.length; j++) {
                const availableTargetUuid = availableTargetTypes[j];
                if (availableTargetUuid == instance.type && !alreadyLinkedObjects[instance.uuid]) {
                    potentials.push(instance)
                }
                if (alreadyLinkedObjects[instance.uuid]) {
                    alreadyLinked.push(instance);
                }
            }
            for (let j = 0; j < availableSourceTypes.length; j++) {
                const availableSourceUuid = availableSourceTypes[j];
                if (availableSourceUuid == instance.type && !alreadyLinkedSourceObjects[instance.uuid]) {
                    potentialsSource.push(instance)
                }
                if (alreadyLinkedSourceObjects[instance.uuid]) {
                    alreadyLinkedSource.push(instance);
                }
            }
        }
        return {alreadyLinked:alreadyLinked, potentials:potentials, alreadyLinkedSource, potentialsSource}
    }

    //methods
    aggregate.setPropertyByName = function (propName, value) {
        var propRef = propNameUuidMapping[propName]
        if (propRef) {
            // var newObject = {uuid:aggregate.uuid,[ "prop_"+propRef ]:value}
            var newObject = {uuid:aggregate.uuid,[ propRef ]:value} //TODO check why 'prop' is not needed
            projectStore.add("instances",newObject)
        }else{
            console.warn("No property named "+ propRef);
        }
    }
    aggregate.setPropertyByUuid = function (propRef, value) {
        
        var newObject = {uuid:aggregate.uuid,[ "prop_"+propRef ]:value}
        projectStore.add("instances",newObject)
    }

    //methods
    aggregate.addRelation = function (type, targetId) {
        var currentRelationTarget = projectStore.get("instances").where("uuid").equals(targetId)
        projectStore.add("relationsInstances",{name:`from ${aggregate.name} to ${currentRelationTarget.name}`, from:aggregate.uuid, to:currentRelationTarget.uuid, type:type})
    }
    aggregate.addRelationFromSource = function (type, sourceId) {
        var currentRelationSource = projectStore.get("instances").where("uuid").equals(sourceId)
        projectStore.add("relationsInstances",{name:`from ${currentRelationSource.name} to ${aggregate.name} `, to:aggregate.uuid, from:currentRelationSource.uuid, type:type})
    }
    aggregate.removeRelation = function (type, targetId) {
        var currentRelationTarget = projectStore.get("relationsInstances").where("type").equals(type)
        var relationToRemove = undefined;
        for (let i = 0; i < currentRelationTarget.length; i++) {
            const element = currentRelationTarget[i];
            if (element.to == targetId) { relationToRemove = element  }
        }
        if (relationToRemove) {
            projectStore.remove("relationsInstances",relationToRemove.uuid)
        }
        
    }
    aggregate.removeRelationFromSource = function (type, sourceId) {
        var currentRelationTarget = projectStore.get("relationsInstances").where("type").equals(type)
        var relationToRemove = undefined;
        for (let i = 0; i < currentRelationTarget.length; i++) {
            const element = currentRelationTarget[i];
            if (element.from == sourceId) { relationToRemove = element  }
        }
        if (relationToRemove) {
            projectStore.remove("relationsInstances",relationToRemove.uuid)
        }
        
    }

    return aggregate
}

var customRepoMethods = function (projectStore,createAggregate) {
    var repo = {}

    repo.getByType = function(targetId){
        var exportedByType = []
        var entities = projectStore.get("instances").where("type").equals(targetId)
        for (let i = 0; i < entities.length; i++) {
            const element = entities[i];
            exportedByType.push(createAggregate(element))
        }
        return exportedByType
    }

    return repo
}

var createInstancesManagement = function () {
    return createRepoManagement(projectManagement.getCurrent().id, 'instances', instanceAggregate, customRepoMethods)
}

export default createInstancesManagement