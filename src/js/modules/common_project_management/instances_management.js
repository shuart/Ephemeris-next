import createRepoManagement from "./repo_management.js";
import projectManagement from "./project_management.js";
import projectStores from "./project_data_store.js";
import nanoid from "../../vendor/nanoid.js";

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
            var propertyName = property.name
            propNameUuidMapping[propertyName]=key
            propUuidNameMapping[key]=propertyName
            ownProperties[propertyName] = aggregate.attributes[key]
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

    //methods
    aggregate.setProperty = function (propName, value) {
        var propRef = propNameUuidMapping[propName]
        if (propRef) {
            projectStore.add("instances",{uuid:aggregate.uuid,[ propRef ]:value})
        }
    }

    //methods
    aggregate.addRelation = function (type, targetId) {
        var currentRelationTarget = projectStore.get("entitiesInstances").where("uuid").equals(targetId)
        projectStore.add("relationsInstances",{name:`from ${aggregate.name} to ${currentRelationTarget.name}`, from:aggregate.uuid, to:currentRelationTarget.uuid, type:type})
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