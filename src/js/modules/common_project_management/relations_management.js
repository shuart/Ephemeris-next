import createRepoManagement from "./repo_management.js";
import projectManagement from "./project_management.js";
import projectStores from "./project_data_store.js";
import nanoid from "../../vendor/nanoid.js";
import createEntityManagement from "./entity_management.js";

var relationAggregate = function(aggregate, projectStore){

    // //parameters "Properties"
    // var ownProperties = {}
    // for (const key in aggregate.attributes) {
    //     if (Object.hasOwnProperty.call(aggregate.attributes, key) && key.search("prop_")>=0) {
    //         const element = aggregate.attributes[key];
    //         //TODO check if ref is still used
    //         // ownProperties.push({uuid:key, value:aggregate.attributes[key]})
    //         var property = projectStore.get("properties").where("uuid").equals(key.substring(5))
    //         var propertyName = property.name
    //         // ownProperties[propertyName] = aggregate.attributes[key]
    //         ownProperties[propertyName] = property
    //     }
    // }
    // aggregate.properties = ownProperties

    //parameters "from"
    var from = {}
    var fromList = []
    var to = {}
    var toList = []
    var entityManagement = createEntityManagement()
    var currentFromEntities = entityManagement.getAll()
    for (let i = 0; i < currentFromEntities.length; i++) {
        const element = currentFromEntities[i];
        if (aggregate.attributes["from_"+element.uuid]) {
            fromList.push(element);
        }
        // fromlist.push(element);
        // console.log(fromlist);
    }
    for (let i = 0; i < currentFromEntities.length; i++) {
        const element = currentFromEntities[i];
        if (aggregate.attributes["to_"+element.uuid]) {
            toList.push(element);
        }
        // fromlist.push(element);
        // console.log(fromlist);
    }
    // console.log(aggregate);
    // console.log(fromlist);
    // alert()
    
    aggregate.fromList = fromList
    aggregate.toList = toList

    // //parameters "Relations"
    // var ownRelations = []
    // var currentRelations = projectStore.get("relations").toArray()
    // for (let i = 0; i < currentRelations.length; i++) {
    //     const element = currentRelations[i];
    //     if (element["from_"+aggregate.uuid]) {
    //         ownRelations.push(element);
    //     }
        
    // }
    // aggregate.relations = ownRelations

    // //methods
    // aggregate.addProperty = function (param, type) {
    //     var futureId = nanoid()
    //     var refId = 'prop_'+futureId
    //     projectStore.add("properties",{uuid:futureId,name:param, type:type})
    //     projectStore.add("entities",{uuid:aggregate.uuid,[refId]:true})
    // }

    //methods
    aggregate.addTarget = function (targetId) {
        var currentRelationTarget = projectStore.get("entities").where("uuid").equals(targetId)
        projectStore.add("relations",{uuid:aggregate.uuid,["to_"+currentRelationTarget.uuid]:true })
    }
    aggregate.addSource = function (targetId) {
        var currentRelationTarget = projectStore.get("entities").where("uuid").equals(targetId)
        projectStore.add("relations",{uuid:aggregate.uuid,["from_"+currentRelationTarget.uuid]:true })
    }
    aggregate.removeTarget = function (targetId) {
        var currentRelationTarget = projectStore.get("entities").where("uuid").equals(targetId)
        if (aggregate.attributes["to_"+currentRelationTarget.uuid]) {
            projectStore.add("relations",{uuid:aggregate.uuid,["to_"+currentRelationTarget.uuid]:false })
        }
        
    }
    aggregate.removeSource = function (targetId) {
        var currentRelationTarget = projectStore.get("entities").where("uuid").equals(targetId)

        if (aggregate.attributes["from_"+currentRelationTarget.uuid]) {
            projectStore.add("relations",{uuid:aggregate.uuid,["from_"+currentRelationTarget.uuid]:false })
        }
    }

    return aggregate
}

var createRelationManagement = function () {
    return createRepoManagement(projectManagement.getCurrent().id, 'relations', relationAggregate)
}

export default createRelationManagement