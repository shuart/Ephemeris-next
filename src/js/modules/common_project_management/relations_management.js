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
    var fromlist = []
    var entityManagement = createEntityManagement()
    var currentFromEntities = entityManagement.getAll()
    for (let i = 0; i < currentFromEntities.length; i++) {
        const element = currentFromEntities[i];
        if (aggregate.attributes["from_"+element.uuid]) {
            fromlist.push(element);
        }
        // fromlist.push(element);
        // console.log(fromlist);
        
    }
    // console.log(aggregate);
    // console.log(fromlist);
    // alert()
    
    aggregate.fromlist = fromlist

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

    // //methods
    // aggregate.addRelation = function (type, targetId) {
    //     var currentRelationTarget = projectStore.get("entities").where("uuid").equals(targetId)
    //     projectStore.add("relations",{name:`from ${aggregate.name} to ${currentRelationTarget.name}`, type:type, ["from_"+aggregate.uuid]:true,["to_"+currentRelationTarget.uuid]:true })
    // }

    return aggregate
}

var createRelationManagement = function () {
    return createRepoManagement(projectManagement.getCurrent().id, 'relations', relationAggregate)
}

export default createRelationManagement