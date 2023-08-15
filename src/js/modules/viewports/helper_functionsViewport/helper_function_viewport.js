import createRelationManagement from "../../common_project_management/relations_management.js";
import createRelationInstancesManagement from "../../common_project_management/relationInstances_management.js";
import createInstancesManagement from "../../common_project_management/instances_management.js";
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";

var joinRelationsWithEntities  = function (entities, relationsNames) {
    var relationField = []
    var relationsRepo = createRelationInstancesManagement()
    var relationsTypeRepo = createRelationManagement()
    var instancesRepo = createInstancesManagement()
    console.log(relationsNames);
    var acceptableRelationsTypeIds = relationsTypeRepo.getAll().filter( r=>relationsNames.includes(r.name) ).map(r=>r.uuid)
    var relations = relationsRepo.getAll()
    for (let j = 0; j < entities.length; j++) {
        const entitiy = entities[j];
        var entityAttribute = []
        
        if (relationsNames) {
            for (let i = 0; i < relations.length; i++) {
                const relation = relations[i];
                // console.log(relation);
                // console.log(acceptableRelationsTypeIds);
                
                if (acceptableRelationsTypeIds.includes(relation.attributes.type)) {
                    var typeName = relationsTypeRepo.getById(relation.attributes.type).name
                    if (!entitiy[typeName]) {
                        entitiy[typeName] = [] //prepare the custom attribute field 
                    }
                    console.log(typeName);
                    console.log(relation);
                    // console.log(acceptableRelationsTypeIds);
                    console.log(entitiy.uuid);
                    if (relation.attributes.from == entitiy.uuid) {
                        var relationSource = instancesRepo.getById(relation.attributes.to)
                        entityAttribute.push({displayAs:"relation", relation:relation, direction:"outgoing", callback:(id)=>showPopupInstancePreview(id), target:relationSource})
                        entitiy[typeName].push({displayAs:"relation", relation:relation, direction:"outgoing", callback:(id)=>showPopupInstancePreview(id), target:relationSource})
                    }
                    if (relation.attributes.to == entitiy.uuid) {
                        var relationTarget= instancesRepo.getById(relation.attributes.from)
                        entityAttribute.push({displayAs:"relation", relation:relation, direction:"incoming", callback:(id)=>showPopupInstancePreview(id), target:relationTarget})
                        entitiy[typeName].push({displayAs:"relation", relation:relation, direction:"incoming", callback:(id)=>showPopupInstancePreview(id), target:relationTarget})
                    }
                }
                
            }
        }
        relationField.push(entityAttribute)
    }
    
    console.log(entities);
    console.log(relationField);
}


export {joinRelationsWithEntities}
