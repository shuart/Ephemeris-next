import createRepoManagement from "./repo_management.js";
import projectManagement from "./project_management.js";
import projectStores from "./project_data_store.js";
import nanoid from "../../vendor/nanoid.js";
import createEntityManagement from "./entity_management.js";

var propertyAggregate = function(aggregate, projectStore){

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
    // var from = {}
    // var fromList = []
    // var to = {}
    // var toList = []
    // var entityManagement = createEntityManagement()
    // var currentFromEntities = entityManagement.getAll()
    // for (let i = 0; i < currentFromEntities.length; i++) {
    //     const element = currentFromEntities[i];
    //     if (aggregate.attributes["from_"+element.uuid]) {
    //         fromList.push(element);
    //     }
    //     // fromlist.push(element);
    //     // console.log(fromlist);
    // }
    // for (let i = 0; i < currentFromEntities.length; i++) {
    //     const element = currentFromEntities[i];
    //     if (aggregate.attributes["to_"+element.uuid]) {
    //         toList.push(element);
    //     }
    //     // fromlist.push(element);
    //     // console.log(fromlist);
    // }

    //Methods

    aggregate.getRelatedEntities = function(){
        var ownProperties = {}
        var entityRepo = createEntityManagement()
        var entities = entityRepo.getAll();
        var relatedEntities = []
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            for (const key in entity.attributes) {
                if (Object.hasOwnProperty.call(entity.attributes, key) && key.search("prop_")>=0) {
                    const element = entity.attributes[key];

                    if (key.substring(5) == aggregate.uuid) {
                        relatedEntities.push(entity)
                    }
                    // //TODO check if ref is still used
                    // // ownProperties.push({uuid:key, value:aggregate.attributes[key]})
                    // var property = projectStore.get("properties").where("uuid").equals(key.substring(5))
                    // var propertyName = property.name
                    // // ownProperties[propertyName] = aggregate.attributes[key]
                    // ownProperties[propertyName] = property
                }
            }
        }
        return relatedEntities
    }
    

    
    // aggregate.fromList = fromList
    // aggregate.toList = toList

    // //methods
    // aggregate.addProperty = function (param, type) {
    //     var futureId = nanoid()
    //     var refId = 'prop_'+futureId
    //     projectStore.add("properties",{uuid:futureId,name:param, type:type})
    //     projectStore.add("entities",{uuid:aggregate.uuid,[refId]:true})
    // }

    //////////////////methods

    // aggregate.addTarget = function (targetId) {
    //     var currentRelationTarget = projectStore.get("entities").where("uuid").equals(targetId)
    //     projectStore.add("relations",{uuid:aggregate.uuid,["to_"+currentRelationTarget.uuid]:true })
    // }
    // aggregate.addSource = function (targetId) {
    //     var currentRelationTarget = projectStore.get("entities").where("uuid").equals(targetId)
    //     projectStore.add("relations",{uuid:aggregate.uuid,["from_"+currentRelationTarget.uuid]:true })
    // }

    return aggregate
}

var customRepoMethods = function (projectStore,createAggregate) {
    var repo = {}
    const infos = {
        "text":{name:"Text", uuid:"text", iconPath:"text.svg"},
        "notebook":{name:"Notebook", uuid:"notebook", iconPath:"book-text.svg"},
        "choice":{name:"Choices", uuid:"choice", iconPath:"list-todo.svg"}
    }
    repo.getPropertiesTypes = function () {
        return infos
    }
    repo.getPropertyInfoById = function (id) {
        return {
            "text":{name:"Text", uuid:"text", iconPath:"text.svg"},
            "notebook":{name:"Notebook", uuid:"notebook", iconPath:"book-text.svg"},
            "choice":{name:"Choices", uuid:"choice", iconPath:"list-todo.svg"}
        }
    }
    repo.getPropertiesTypesList=function () {
        var list= []
        var objElement = repo.getPropertiesTypes()
        for (const key in objElement) {
            if (Object.hasOwnProperty.call(objElement, key)) {
                list.push(objElement[key]);
                
            }
        }
        return list
    }


    return repo
}

var createPropertyManagement = function () {
    return createRepoManagement(projectManagement.getCurrent().id, 'properties', propertyAggregate,customRepoMethods)
}

export default createPropertyManagement